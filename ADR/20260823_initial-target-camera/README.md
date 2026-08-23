# ADR: Initial Target Camera — PENTAX Optio RS1500

**Date:** 2026-08-23
**Status:** Accepted

## Context

The application needs at least one supported camera to be useful from the start.
We need to choose the first camera model and define its model-specific skin template.

## Decision

The first supported camera is the **PENTAX Optio RS1500**.

The RS1500 has one dedicated front skin rather than independent front, back,
top, and bottom panels. The outer cut is 83.65 × 53.35 mm and includes the
lens, flash, and indicator cut-outs. Its geometry is traced from Ricoh's
official front-skin PDF and stored in `src/data/cameras.js`.

## Consequences

- The application ships with one camera model and is immediately usable.
- Additional cameras can define their own number of panels and template shapes.
- Printouts must use 100% / actual-size scaling to preserve the official dimensions.

## Planned cameras

- **PENTAX Optio RS1000** is supported with an 89 × 53 mm front skin. Its
  outer cut and six cut-outs are traced from Ricoh's official `color10.pdf`;
  product pages, the standard sheet collection, and the creator-collaboration
  sheet page are recorded with the camera definition.
- **PENTAX Optio LS465** is supported with an approximately 81.3 × 43.63 mm
  front skin. Its stepped outer cut and lens opening are traced from Ricoh's
  official `LS465_09.pdf`; Japanese and English product pages and the official
  sheet collection are recorded with the camera definition.
