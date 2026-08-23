# ADR: Initial Target Camera — PENTAX RS-1500

**Date:** 2026-08-23
**Status:** Accepted

## Context

The application needs at least one supported camera to be useful from the start.
We need to choose the first camera model and define its model-specific skin template.

## Decision

The first supported camera is the **PENTAX RS-1500**.

The RS1500 has one dedicated front skin rather than independent front, back,
top, and bottom panels. The outer cut is 83.65 × 53.35 mm and includes the
lens, flash, and indicator cut-outs. Its geometry is traced from Ricoh's
official front-skin PDF and stored in `src/data/cameras.js`.

## Consequences

- The application ships with one camera model and is immediately usable.
- Additional cameras can define their own number of panels and template shapes.
- Printouts must use 100% / actual-size scaling to preserve the official dimensions.
