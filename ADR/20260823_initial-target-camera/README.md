# ADR: Initial Target Camera — PENTAX RS-1500

**Date:** 2026-08-23
**Status:** Accepted

## Context

The application needs at least one supported camera to be useful from the start.
We need to choose the first camera model and define its skin panel dimensions.

## Decision

The first supported camera is the **PENTAX RS-1500**.

Panel dimensions (approximate, in mm):

| Panel | Width | Height |
|-------|-------|--------|
| Front | 94 mm | 58 mm |
| Back  | 94 mm | 58 mm |
| Top   | 94 mm | 20 mm |
| Bottom | 94 mm | 20 mm |

These values are initial estimates. Accurate dimensions should be validated by
physically measuring an RS-1500 unit and updating `src/data/cameras.js`.

## Consequences

- The application ships with one camera model and is immediately usable.
- Additional cameras can be added to `src/data/cameras.js` without code changes elsewhere.
- Inaccurate dimensions in the initial version may result in mis-fitted prints;
  physical validation is required before production use.
