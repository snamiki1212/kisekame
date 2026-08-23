# Kisekame — Digicam Skin Designer Specification

## Service Identity

- **Service name:** Kisekame
- **Logo / display wordmark:** KISEKAME
- **Descriptor:** Digicam Skin Designer
- **Name origin:** Japanese **着せ替えカメラ** (a camera that can change its outfit)

The naming decision and alternatives are recorded in
[`adr/20260823_app-name-candidates`](adr/20260823_app-name-candidates/README.md).

The product name is the distinctive brand; the descriptor explains the function
and carries descriptive search terms. The preferred lockup is:

> **KISEKAME**<br>
> Digicam Skin Designer

### Brand personality

Kisekame should feel like a small creative playground rather than a technical
print-production utility. The experience should be:

- **pop and kawaii:** cheerful, friendly, and collectible without becoming childish;
- **Heisei retro:** inspired by late-1990s and 2000s stationery, purikura,
  translucent electronics, compact cameras, and decorated flip phones;
- **creative:** choosing colours, patterns, and photos should feel like playing with stickers;
- **light:** white space and bright accents should dominate over grey tool chrome;
- **approachable:** controls should use familiar language and direct manipulation;
- **precise underneath:** physical sizing and print accuracy remain dependable, but are not the visual personality.

Avoid enterprise-dashboard styling, dense toolbars, dark industrial palettes,
technical jargon, and excessive borders. Prefer rounded shapes, generous white
space, large colour swatches, friendly microcopy, and small moments of playful
feedback when a skin is added or changed.

### Colour direction

- White is the dominant canvas and card colour.
- Bright colour is used generously enough to feel pop and creative, without
  reducing the white-space-led lightness.
- Text uses a warm tinted near-black rather than a cold tool-like black.
- Supporting colours represent creative variety rather than dashboard statuses.
- The adopted **Heisei Deco** palette uses Deep Green `#083920`, Deco Pink `#DF4385`, and
  Sticker Lime `#97CD3F` on a white or Milky White base.
- Deep Green carries text and dependable actions; Pink and Lime carry selection,
  decoration, and playful creative feedback.
- Text and interactive controls must meet WCAG AA independently of decorative
  swatches.

Palette candidates and the eventual colour decision are recorded in
[`adr/20260823_brand-identity`](adr/20260823_brand-identity/README.md).

## Overview

Kisekame is a web application for designing and printing custom skins (protective/decorative stickers) for digital cameras.
Users select a target camera, upload an artwork image, adjust its position and scale within each skin panel,
then export/print a print-ready PDF-quality layout.

---

## Target Cameras

| Camera | Status |
|--------|--------|
| PENTAX Optio RS1500 | ✅ Initial target |

Additional cameras will be added over time. Each camera definition describes that model's actual skin format; a model may have one shaped template or several panels.

---

## Features

### 1. Camera Selection

- A dropdown allows the user to choose the target digital camera model.
- The available skin panels update dynamically based on the selected camera.

### 2. Skin Preview

- Each skin panel is displayed as a canvas element scaled proportionally from its physical millimetre dimensions.
- Panels are labelled according to the camera-specific template.
- Non-rectangular templates and hardware cut-outs are clipped from the artwork.
- Physical dimensions (mm) are shown beneath each panel.

### 3. Image Upload

- Users can upload multiple images at once or over several upload actions.
- Uploaded images can be selected, assigned to a skin, and removed independently.
- Supported methods:
  - **Drag-and-drop** onto the upload zone.
  - **File picker** (click to browse).
- Accepted formats: JPEG, PNG, WebP, HEIC, and HEIF.

### 4. Image Positioning

- The active panel can be selected from a panel picker.
- Within the active panel's canvas, the image can be repositioned via **drag-and-drop** (mouse drag).
- An image **scale slider** (10%–300%) adjusts the image size within the panel.
- Each uploaded pattern and panel maintains an independent position and scale.
- Every uploaded pattern is always visible in the preview; selecting a preview makes its scale control active.
- Three empty skin slots are shown by default so users assign reusable sources to skins rather than creating skins from sources.
- Users create empty skin slots, then independently assign a reusable solid colour, vector pattern, or JPEG, PNG, WebP, HEIC, or HEIF upload to each slot.
- Solid colours may be selected from presets or the full colour picker; pattern foreground and background colours are independently customizable.
- Skin previews are numbered and displayed in rows of three.

### 5. Print / PDF Export

- A "Print / Export PDF" button triggers the browser's native print dialog.
- The print layout renders a `PrintSheet` component:
  - All created skins are tiled across the paper with 10 mm margins and 6 mm gaps.
  - The layout automatically chooses 0° or 90° orientation for the largest single-page capacity.
  - Each panel renders at its exact physical size so the printed skin matches the camera dimensions.
- The on-screen UI (header, sidebar) is hidden during printing via CSS `@media print`.

### 6. Paper Size Selection

- A dropdown allows the user to select the paper size for printing.
- Default: **A4** (210 × 297 mm).
- Available sizes:

| ID | Name | Size (mm) |
|----|------|-----------|
| a4 | A4 | 210 × 297 |
| a3 | A3 | 297 × 420 |
| letter | Letter | 215.9 × 279.4 |

### 7. Multiple Skins Per Print

- Every skin slot independently references a colour, pattern, uploaded image, or blank design.
- The layout maximizes patterns per sheet (9 RS1500 patterns on A4).
- The paper-size control displays the current and maximum skin count.
- Creation controls stop accepting skins at the selected paper's single-page capacity; paper sizes that cannot hold the current set are disabled.
- Empty skin slots remain printable as blank cut templates, and removing a skin requires confirmation.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 (JSX) |
| Build tool | Vite 8 |
| Styling | CSS Modules |
| Canvas rendering | HTML5 Canvas API |
| PDF export | Browser native print dialog (Save as PDF) |

---

## Directory Structure

```
digicam-skin-designer/
├── adr/                        # Architecture Decision Records
├── src/
│   ├── data/
│   │   └── cameras.js          # Camera and paper-size definitions
│   ├── components/
│   │   ├── SkinCanvas.jsx      # Canvas-based skin panel preview with image overlay
│   │   ├── ImageUploader.jsx   # Drag-and-drop / file upload component
│   │   └── PrintSheet.jsx      # Print-ready tiled layout
│   ├── App.jsx                 # Root application component
│   ├── App.module.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── spec.md                     # This document
└── vite.config.js
```

---

## Skin Template — PENTAX Optio RS1500

The RS1500 uses one dedicated skin. Its outer cutting size is 83.65 × 53.35 mm, with lens, flash, and indicator cut-outs traced from Ricoh's official skin PDF.

---

## Future Work

- Additional camera models (beyond PENTAX Optio RS1500).
- Per-panel colour fill / background colour picker.
- Text overlay on skin panels.
- Undo / redo history.
- Save / load project state (localStorage or file export).
- Precise panel dimension data validated against physical cameras.
