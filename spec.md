# Digicam Skin Designer — Specification

## Overview

A web application for designing and printing custom skins (protective/decorative stickers) for digital cameras.
Users select a target camera, upload an artwork image, adjust its position and scale within each skin panel,
then export/print a print-ready PDF-quality layout.

---

## Target Cameras

| Camera | Status |
|--------|--------|
| PENTAX RS-1500 | ✅ Initial target |

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
- Accepted formats: any browser-supported image type (JPEG, PNG, WebP, etc.).

### 4. Image Positioning

- The active panel can be selected from a panel picker.
- Within the active panel's canvas, the image can be repositioned via **drag-and-drop** (mouse drag).
- An image **scale slider** (10%–300%) adjusts the image size within the panel.
- Each panel maintains an independent position and scale.

### 5. Print / PDF Export

- A "Print / Export PDF" button triggers the browser's native print dialog.
- The print layout renders a `PrintSheet` component:
  - Skin panels are tiled across the paper with 10 mm margins and 6 mm gaps.
  - Panels wrap to new rows when the paper width is exhausted.
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

- All skin templates for the selected camera are rendered on the single print sheet.
- The layout automatically wraps panels to fit the chosen paper size.

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

## Skin Template — PENTAX RS-1500

The RS1500 uses one dedicated front skin, not separate front/back/top/bottom panels. Its outer cutting size is 83.65 × 53.35 mm, with lens, flash, and indicator cut-outs traced from Ricoh's official skin PDF.

---

## Future Work

- Additional camera models (beyond PENTAX RS-1500).
- Per-panel colour fill / background colour picker.
- Text overlay on skin panels.
- Undo / redo history.
- Save / load project state (localStorage or file export).
- Precise panel dimension data validated against physical cameras.
