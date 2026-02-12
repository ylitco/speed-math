---
title: SVG Filter Rendering Issues Across Device Pixel Ratios
date: 2026-02-02
status: draft
---

# SVG Filter Rendering Issues Across Device Pixel Ratios

## Problem Statement

Inner shadows created via SVG filter elements render with different visual quality across devices with different pixel ratios:

- **Smooth rendering** on 3x displays;
- **Acceptable rendering** on 2x displays;
- **Poor rendering** on 1x displays;

This creates visual inconsistency, with the same filter code producing notably different quality depending on the user's display.

## Root Cause Analysis

### Device Pixel Ratio Fundamentals

**Device Pixel Ratio (DPR)** is the ratio between physical screen pixels and CSS pixels:

```
DPR = Physical Pixels / CSS Pixels
```

Common values:

- `1.0` - Standard displays (1 CSS px = 1 device pixel per dimension)
- `2.0` - Retina/HiDPI displays (1 CSS px = 2 device pixels per dimension)
- `3.0` - High-end mobile devices (1 CSS px = 3 device pixels per dimension)

> **Source**: [MDN - Window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
>
> _"The devicePixelRatio returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device."_

### SVG Filter Units and Coordinate Systems

#### Statement 1: SVG Values Without Units Are User Units

All numeric values in SVG without explicit unit designators (like `px`, `em`, `%`) are measured in **user units** within the **user coordinate system**.

> **Source**: [W3C SVG 1.1 - Terminology: User Units](https://www.w3.org/TR/SVG11/intro.html#TermUserUnits)
>
> _"A coordinate value or length expressed in user units represents a coordinate value or length in the current user coordinate system."_

> **Source**: [W3C SVG 1.1 - Terminology: User Coordinate System](https://www.w3.org/TR/SVG11/intro.html#TermUserCoordinateSystem)
>
> _"The coordinate system that is currently active and which is used to define how coordinates and lengths are located and computed."_

> **Source**: [W3C SVG 1.1 - Units](https://www.w3.org/TR/SVG11/coords.html#Units)
>
> _"When a coordinate or length value is a number without a unit identifier (e.g., "25"), then the given coordinate or length is assumed to be in user units"_

This applies to filter attributes like `stdDeviation="1"` and `dx="1"`.

SVG filter primitive attributes use `<number>` data types, not `<length>` types, therefore they do NOT support CSS length units like `em`, `px`, or `%`.

> **Source**: [W3C SVG 1.1 - feGaussianBlur stdDeviation](https://www.w3.org/TR/SVG11/filters.html#feGaussianBlurStdDeviationAttribute)
>
> _The `stdDeviation` attribute uses `<number-optional-number>` data type._ (numbers only, not lengths)

> **Source**: [W3C SVG 1.1 - feOffset dx/dy](https://www.w3.org/TR/SVG11/filters.html#feOffsetDxAttribute)
>
> _The `dx` and `dy` attributes use `<number>` data type._ (numbers only, not lengths)

#### Statement 2: User Units Equal px Units at Initialization

At the initial coordinate system, user units are equivalent to the parent environment's px units.

> **Source**: [W3C SVG 1.1 - Units](https://www.w3.org/TR/SVG11/coords.html#Units)
>
> _"At initialization, a user unit in the initial coordinate system is equivalenced to the parent environment's notion of a px unit."_

#### Statement 3: In Web Context, px Equals CSS Pixels

In web browsers (the parent environment for SVG), the `px` unit is defined as a **CSS pixel**, which is a reference pixel based on visual angle, not physical screen pixels.

> **Source**: [W3C CSS 2 - Length Units](https://www.w3.org/TR/CSS2/syndata.html#length-units)
>
> _"The reference pixel is the visual angle of one pixel on a device with a pixel density of 96dpi and a distance from the reader of an arm's length."_

#### Sumup

Therefore:

1. `stdDeviation="1"` → 1 user unit (Statement 1)
2. 1 user unit → 1 px (Statement 2)
3. 1 px → 1 CSS pixel (Statement 3)
4. **Conclusion**: `stdDeviation="1"` = 1 CSS pixel

#### Application to filterUnits

The `filterUnits` attribute defines the coordinate system for the filter's position and dimensions.

> **Source**: [W3C Filter Effects Module Level 1](https://drafts.csswg.org/filter-effects/#FilterEffectsRegion)
>
> _"The filterUnits attribute defines the coordinate system for attributes 'x', 'y', 'width' and 'height'."_

When using `filterUnits="userSpaceOnUse"`:

> **Source**: [W3C SVG 1.1 - Filter Effects](https://www.w3.org/TR/SVG11/filters.html)
>
> _"If filterUnits='userSpaceOnUse', then any length values within the filter definitions represent values in the current user coordinate system."_

This confirms that filter dimensions and positions use user units, which (as established above) equal CSS pixels in web context.

### Why Different DPR Devices Render Differently

#### Statement 4: Filters Are Rasterized

SVG filters are converted from vector operations to a pixel-based representation (raster) for rendering.

> **Source**: [W3C SVG 1.1 - Filter Effects](https://www.w3.org/TR/SVG11/filters.html#Introduction)
>
> _"For raster effects filter primitives, graphics elements are rasterized into an initially clear RGBA raster in image space."_

This means filters must be rendered onto a discrete pixel grid.

#### Statement 5: CSS Pixels Map to Different Physical Pixel Counts

The Device Pixel Ratio determines how many physical pixels represent one CSS pixel:

```
Physical Pixels = CSS Pixels × Device Pixel Ratio
```

> **Source**: [MDN - Window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
>
> _"The devicePixelRatio returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device."_

#### Connecting the Chain

Combining the established facts:

1. Filter parameters are defined in CSS pixels (from Statements 1-3)
2. Filters must be rasterized to a pixel grid (Statement 4)
3. CSS pixels correspond to different physical pixel counts on different displays (Statement 5)

**Therefore**: A filter defined as `stdDeviation="1"` (1 CSS pixel) results in:

- **1 physical pixel** blur radius on 1.0 DPR displays
- **2 physical pixels** blur radius on 2.0 DPR displays
- **3 physical pixels** blur radius on 3.0 DPR displays

#### Statement 6: Filters Are Rasterized at Device Pixel Resolution

SVG filters are computed and rasterized at device pixel resolution (physical pixels), not at CSS pixel resolution.

> **Source**: [Mozilla Bug 852100 - SVG filters shift and blur](https://bugzilla.mozilla.org/show_bug.cgi?id=852100)
>
> _"This function compute region in device units."_ (referring to nsFilterInstance::ComputeNeededBoxes() which calculates filter regions)

> **Source**: [Mozilla Bug 772787 - Firefox renders SVG filter effects blurrily](https://bugzilla.mozilla.org/show_bug.cgi?id=772787)
>
> _"the code that 'snap[s] the filter-space filter region out to filter device pixels'"_ confirms filters operate in device pixel space.

This means browsers first convert CSS-pixel-based filter parameters to device pixels, then rasterize the filter at that device pixel resolution.

#### The Complete Rendering Chain

1. Filter defined: `stdDeviation="1"` (1 CSS pixel - fixed in code)
2. Browser converts to device pixels: 1 CSS px × DPR = device pixels
3. Filter rasterized at device pixel resolution
4. Result displayed

**On 1.0 DPR displays**:

- Step 2: 1 CSS px × 1.0 = **1 device pixel**
- Step 3: Filter rasterized with only 1 pixel for blur gradient
- Result: Harsh, blocky edges (insufficient pixel resolution)

**On 3.0 DPR displays**:

- Step 2: 1 CSS px × 3.0 = **3 device pixels**
- Step 3: Filter rasterized with 3 pixels for blur gradient
- Result: Smooth, high-quality rendering (adequate pixel resolution)

**Key insight**: Filter parameters remain fixed in CSS pixels, but browsers rasterize filters at device pixel resolution. Higher DPR displays provide more device pixels for the same CSS-pixel-based filter definition, enabling smoother gradients.

## Comparison: Why Icon Fonts with CSS text-shadow Work Better

Both SVG filters and CSS `text-shadow` are rasterized at device pixel resolution (Statement 6 applies to both). However, there's a key difference in how the solution is implemented:

**SVG Filter Approach** (problematic):

```xml
<feGaussianBlur stdDeviation="1"/>  <!-- Fixed at 1 CSS pixel -->
```

- Filter parameter: 1 CSS pixel (absolute value, never changes)
- On 1x display: 1 device pixel blur → poor quality
- On 3x display: 3 device pixel blur → good quality
- **Problem**: Absolute CSS pixel values don't scale with display capabilities

**CSS text-shadow with em units** (solution):

```css
.icon {
  font-size: 24px; /* Scales with DPR for font rendering */
  text-shadow: 0.042em 0.083em 0.083em; /* Relative to font size */
}
```

- Shadow parameter: 0.042em (relative to font size)
- Font rendering already accounts for device pixels
- Shadow scales proportionally with font
- **Solution**: Relative units (`em`) scale with the rendered font size

> **Source**: [W3C CSS Text Decoration Module Level 3](https://www.w3.org/TR/css-text-decor-3/#text-shadow-property)
>
> _The text-shadow property accepts "[\<length\>](https://www.w3.org/TR/css-values-4/#length-value)" repeated 2-3 times per shadow layer._ (includes relative units like `em`)

**Key difference**: Using `em` units instead of fixed CSS `px` values allows the shadow to scale proportionally with font rendering, which browsers already optimize for device pixel resolution.

**Conclusion**: This fundamental limitation in the SVG filter specification means:

1. Filter primitive attributes MUST use absolute numbers (interpreted as user units = CSS pixels)
2. Relative scaling via `em` units is impossible within SVG filters
3. The CSS `text-shadow` solution works because CSS properties support `<length>` types with relative units

This explains why the icon font with CSS text-shadow approach is necessary - it's not just a workaround, but the only way to use relative units for shadow effects.
