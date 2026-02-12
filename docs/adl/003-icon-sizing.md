# ADR-003: Icon sizing — rem grid with per-icon overrides

- Status: accepted
- Date: 2026-01-30

Technical Story: RFC-001

## Context and Problem Statement

Switching to icon fonts (ADR-002) exposed that the design has no consistent icon size system. Each icon has its own size, requiring hardcoded pixel values.

## Decision Drivers

- scales responsively with user zoom and root font-size;
- keeps a predictable baseline for the majority of icons;
- allows exact design sizes where required, without drifting to arbitrary values;

## Considered Options

1. **Height-only normalization** — all icons forced to a single size. Simple, but breaks icons where the design intentionally uses different sizes;
2. **Generic size scale only** — a fixed set of size classes (xs/sm/base/md/lg). Clean, but some design-specified sizes don't land on scale steps;
3. **Per-icon hardcoded sizes** — each icon gets its own rem value from the design spec. Precise, but no shared vocabulary, harder to maintain;
4. **Generic scale + per-icon overrides** (selected) — scale handles the common case; overrides handle design-specific sizes, snapped to a fine rem grid to avoid fully arbitrary values;

## Decision Outcome

All font-based icons are height-normalized to a 24px baseline. Sizing uses rem units on a 0.125rem grid for responsive scaling.

**Generic scale** (when exact design match is not critical):

| Class            | Rem     | Px equivalent   |
| ---------------- | ------- | --------------- |
| `text-icon-xs`   | 1rem    | 16px            |
| `text-icon-sm`   | 1.25rem | 20px            |
| `text-icon-base` | 1.5rem  | 24px (baseline) |
| `text-icon-md`   | 1.75rem | 28px            |
| `text-icon-lg`   | 2rem    | 32px            |
| `text-icon-xl`   | 2.5rem  | 40px            |
| `text-icon-2xl`  | 3rem    | 48px            |

**Per-icon overrides** (when design specifies exact size):
Design pixel values are converted to rem via CSS `round(calc(designPx / 16) * 1rem, 0.125rem)`, which rounds to the nearest 0.125rem step. This keeps the original design value visible in the source and accepts ≤1px variance (sub-pixel, imperceptible).

```css
.text-icon-difficulty {
  font-size: round(calc(26.52 / 16) * 1rem, 0.125rem); /* → 1.625rem */
  line-height: 1;
}
```

All icon size utilities are defined in `src/tailwind.css` under `@layer utilities` (Tailwind v4 native approach). Each utility bundles both `font-size` and `line-height: 1`, eliminating the need for a separate `leading-none` class.

### Positive Consequences

- Responsive scaling via rem units — scales naturally with root font-size and user zoom;
- Generic scale covers the common case without per-icon decisions;
- Per-icon overrides stay on a 0.125rem grid — no fully arbitrary values;
- Original design pixel values remain visible in source via the `round(calc(...))` pattern;

### Negative Consequences

- Per-icon overrides accept ≤1px variance from design (sub-pixel, imperceptible);
- New icons require a conscious choice: scale class or override;

## Links

- RFC-001: Icon system;
- ADR-002: Dual icon system — sizing applies to the svgtofont icons;
