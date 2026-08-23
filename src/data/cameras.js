// The RS1500 path is traced from Ricoh's official front-skin PDF. Coordinates
// are PDF points, normalized to the cutting line's top-left corner.
const RS1500_FRONT_PATH = [
  "M2.48 0 C1.817 0 1.194 0.258 0.726 0.727 C0.257 1.195 0 1.818 0 2.48",
  "V148.749 C0 150.116 1.112 151.229 2.48 151.229 H233.22",
  "C235.369 151.229 237.118 149.48 237.118 147.332 V3.897",
  "C237.118 1.749 235.369 0 233.22 0 Z",
  "M153.526 24.295 C120.54 34.008 101.606 68.748 111.319 101.733",
  "C117.332 122.151 133.11 137.929 153.526 143.941 L188.838 143.93",
  "C209.174 137.929 224.953 122.151 230.964 101.733 L230.953 66.423",
  "C226.259 50.524 215.613 37.334 200.987 29.362",
  "C186.36 21.389 169.505 19.59 153.526 24.295 Z",
  "M81.567 23.513 C85.637 23.513 88.937 20.214 88.937 16.143",
  "C88.937 12.073 85.637 8.773 81.567 8.773 H41.599",
  "C37.528 8.773 34.229 12.073 34.229 16.143",
  "C34.229 20.214 37.528 23.513 41.599 23.513 Z",
  "M132.875 16.143 C132.875 11.447 129.067 7.639 124.37 7.639",
  "C119.674 7.639 115.867 11.447 115.867 16.143",
  "C115.867 20.84 119.674 24.647 124.37 24.647",
  "C129.067 24.647 132.875 20.84 132.875 16.143 Z",
].join(" ");

export const CAMERAS = [
  {
    id: "pentax-rs1500",
    name: "PENTAX Optio RS1500",
    brand: "PENTAX",
    templateSource:
      "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin_rs1500/skin/color07.pdf",
    panels: [
      {
        id: "front",
        label: "Front skin",
        widthMm: 83.65,
        heightMm: 53.35,
        shape: {
          viewBox: "0 0 237.118 151.229",
          width: 237.118,
          height: 151.229,
          path: RS1500_FRONT_PATH,
          fillRule: "evenodd",
        },
      },
    ],
  },
];

export const PAPER_SIZES = [
  { id: "a4", label: "A4", widthMm: 210, heightMm: 297 },
  { id: "a3", label: "A3", widthMm: 297, heightMm: 420 },
  { id: "letter", label: "Letter", widthMm: 215.9, heightMm: 279.4 },
];
