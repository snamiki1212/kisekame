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

Additional cameras will be added over time. Each camera definition includes named skin panels with physical dimensions in millimetres.

---

## Features

### 1. Camera Selection

- A dropdown allows the user to choose the target digital camera model.
- The available skin panels update dynamically based on the selected camera.

### 2. Skin Preview

- Each skin panel is displayed as a canvas element scaled proportionally from its physical millimetre dimensions.
- Panels are labelled (e.g. Front, Back, Top, Bottom).
- Physical dimensions (mm) are shown beneath each panel.

### 3. Image Upload

- Users can upload an image to apply to skin panels.
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

- All skin panels for the selected camera are rendered on the single print sheet.
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
├── ADR/                        # Architecture Decision Records
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

## Physical Skin Dimensions — PENTAX RS-1500

Approximate panel dimensions (may need adjustment after physical measurement):

| Panel | Width (mm) | Height (mm) |
|-------|-----------|------------|
| Front | 94 | 58 |
| Back | 94 | 58 |
| Top | 94 | 20 |
| Bottom | 94 | 20 |

---

## Future Work

- Additional camera models (beyond PENTAX RS-1500).
- Per-panel colour fill / background colour picker.
- Text overlay on skin panels.
- Undo / redo history.
- Save / load project state (localStorage or file export).
- Precise panel dimension data validated against physical cameras.
