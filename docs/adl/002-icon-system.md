# ADR-002: Dual icon system — svgtofont for shadow icons, Iconify for the rest

- Status: accepted
- Date: 2026-01-30

Technical Story: RFC-001

## Context and Problem Statement

There are four approaches in the project for working with icons:

- Use icon font based on `Glyphter` font;
- Use `icomoon` custom generated icon font;
- Use `@iconify/react` package;
- Use custom SVG React components;

This fragmentation reduces maintainability and modifiability. A single unified approach is needed.

## Decision Drivers

- Quick access to comunity icons out of the scope of defined icons in the design;
- Stateful icons (active/inactive states) require dynamic color and shadow changes with CSS transitions;
- SVG `<filter>`-based inner shadows render inconsistently across devices with different pixel ratios;

## Considered Options

1. Use single icon font for all icons;
2. Use `@iconify/react` for all icons;
3. Use alternative icons from `lucide-react` package;
4. Use custom SVG React components;
5. Dual system: `svgtofont` for shadow icons + `Iconify` for the rest;

## Decision Outcome

Use a **dual icon system** (Alternative 5):

### Positive Consequnces

- Clear separation: shadow icons → font, everything else → Iconify
- Consistent visual rendering across all devices and pixel ratios
- Smooth CSS transitions for stateful icons
- Centralized shadow effect implementation via `text-shadow`
- Access to community icon libraries via Iconify (no manual SVG required for non-shadow icons)
- Build-time font generation (no runtime dependency for font icons)
- License-compatible toolchain

### Negative Consequences

- Two build pipelines to maintain (`src/icon-font/build.ts`, `src/icon-set/build.ts`)
- Font icons are single-color only (acceptable for this project's design)
- Font regeneration required when adding shadow icons (run build script)
- Need to strip decorations from SVG sources before font generation

## Links

- RFC-001: Icon system;
- ADR-003: Icon sizing strategy for font-based icons;
