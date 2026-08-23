/**
 * Camera definitions with skin panel dimensions (in mm).
 * Each panel represents a physical surface area that can be covered with a printed skin.
 */
export const CAMERAS = [
  {
    id: "pentax-rs1500",
    name: "PENTAX RS-1500",
    brand: "PENTAX",
    panels: [
      {
        id: "front",
        label: "Front",
        // Approximate dimensions in mm for PENTAX RS-1500 front face skin area
        widthMm: 94,
        heightMm: 58,
      },
      {
        id: "back",
        label: "Back",
        widthMm: 94,
        heightMm: 58,
      },
      {
        id: "top",
        label: "Top",
        widthMm: 94,
        heightMm: 20,
      },
      {
        id: "bottom",
        label: "Bottom",
        widthMm: 94,
        heightMm: 20,
      },
    ],
  },
];

export const PAPER_SIZES = [
  { id: "a4", label: "A4", widthMm: 210, heightMm: 297 },
  { id: "a3", label: "A3", widthMm: 297, heightMm: 420 },
  { id: "letter", label: "Letter", widthMm: 215.9, heightMm: 279.4 },
];
