# ADR: PDF Export Strategy — Browser Native Print

**Date:** 2026-08-23
**Status:** Accepted

## Context

Printed skins must be physically accurate in size (exact mm dimensions) so they can be
cut out and applied to the camera. Several approaches were considered:

1. **Browser native print dialog** (`window.print()`) with CSS `@media print`.
2. **PDF generation library** (e.g. jsPDF, pdf-lib) running client-side.
3. **Server-side PDF rendering** (Puppeteer / headless Chrome on a backend).

## Decision

Use the **browser native print dialog** (`window.print()`).

- Zero additional dependencies.
- Modern browsers support "Save as PDF" natively.
- Physical accuracy is achieved by rendering panels at exact mm dimensions using
  a `3.78px/mm` conversion at 96 DPI screen resolution combined with explicit
  `@page` CSS rules.
- The `PrintSheet` component is hidden on screen and shown only during print via
  `@media print`, giving a clean separation between preview and print layout.

## Consequences

- Relies on the user choosing "Save as PDF" in the print dialog; no programmatic
  PDF file download without a library.
- Physical accuracy depends on the printer DPI and OS print scaling settings;
  users should ensure "100% scale / actual size" is selected in the print dialog.
- If programmatic PDF export becomes a requirement, jsPDF or pdf-lib can be
  added without changing the overall architecture.
