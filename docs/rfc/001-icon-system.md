---
title: Establish icon system
date: 2026-01-30
tags:
  - icons
  - icon-system
  - architecture
related:
  - "[[kb/icon-rendering-comparison]]"
  - "[[adl/ADR-002]]"
  - "[[adl/ADR-003]]"
status: settled
---

# RFC: Establish icon system

## Status

Settled → [ADR-002](../adl/002-icon-system.md), [ADR-003](../adl/003-icon-sizing.md)

## Concern

The project has no cohesive icon system. Icons were added ad-hoc using four different approaches:

- `Glyphter` font for icons with a changeable state expressed in complex rule set transitions;
- `Icomoon` another custom icon font for the same purpose that above;
- `@iconify/react` several icons with quick access from iconfy community icon sets
- Custom SVG React components imported from design prototype in figma.

This fragmentation makes the icon layer hard to maintain, style consistently, and extend.

## Exploration

### What approaches exist

Evaluated consolidating onto a single delivery mechanism.
Alternatives:

- single icon font;
- iconify framework with cusomt icon set;
- custom SVG components;
- hybrid.

See [kb/icon-rendering-comparison.md](../kb/icon-rendering-comparison.md) for general SVG vs icon font tradeoffs.

### Parallel discovery: SVG filters break across pixel ratios

While evaluating SVG-based approaches, a rendering issue surfaced: inner shadow effects applied via SVG `<filter>` render inconsistently across devices with different pixel ratios. The effect looks correct on 2x+ displays but degrades visibly on 1x.

This wasn't the original concern — it emerged during research. But it ruled out all SVG-based approaches for icons that need shadow effects.

### Why icon fonts solve both concerns

Font-based icons with CSS `text-shadow` use `em` units, which scale with font size. This sidesteps the SVG filter rasterization problem entirely and supports CSS transitions for state changes natively.

### Icon sizing surfaced as a separate concern

During implementation, it became clear that the design has no consistent icon size system — each icon has its own size with hardcoded pixel values. This is a distinct decision with its own tradeoffs, not part of the icon system delivery question.

## Outcome

Two decisions emerged from this exploration:

- **[ADR-002](../adl/002-icon-system.md)** — Dual icon system: `svgtofont` for shadow icons, Iconify for the rest
- **[ADR-003](../adl/003-icon-sizing.md)** — Icon sizing: rem grid with generic scale and per-icon overrides
