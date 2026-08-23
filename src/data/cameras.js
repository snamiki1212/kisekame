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

// The RS1000 path is normalized from the white cutting line embedded in
// Ricoh's official color10.pdf. PDF Y coordinates are inverted for SVG/canvas.
const RS1000_FRONT_PATH = [
  "M3.11 0 C1.39 0 0 1.39 0 3.11 V147.12",
  "C0 148.84 1.39 150.23 3.11 150.23 H249.16",
  "C250.89 150.23 252.28 148.84 252.28 147.12 V3.11",
  "C252.28 1.39 250.89 0 249.16 0 Z",
  "M57.16 8.37 C53.17 8.37 49.92 11.62 49.92 15.61",
  "C49.92 19.6 53.17 22.84 57.16 22.84 H97.11",
  "C101.11 22.84 104.35 19.6 104.35 15.6",
  "C104.35 11.62 101.11 8.37 97.11 8.37 Z",
  "M13.87 10.2 C13.87 8.17 12.22 6.52 10.19 6.52",
  "C8.16 6.52 6.51 8.17 6.51 10.2 C6.51 12.24 8.16 13.89 10.19 13.89",
  "C12.22 13.89 13.87 12.24 13.87 10.2 Z",
  "M13.87 140.03 C13.87 138 12.22 136.34 10.19 136.34",
  "C8.16 136.34 6.51 138 6.51 140.03 C6.51 142.06 8.16 143.71 10.19 143.71",
  "C12.22 143.71 13.87 142.06 13.87 140.03 Z",
  "M245.75 10.2 C245.75 8.17 244.1 6.52 242.06 6.52",
  "C240.03 6.52 238.38 8.17 238.38 10.2 C238.38 12.24 240.03 13.89 242.06 13.89",
  "C244.1 13.89 245.75 12.24 245.75 10.2 Z",
  "M245.75 140.03 C245.75 138 244.1 136.34 242.06 136.34",
  "C240.03 136.34 238.38 138 238.38 140.03 C238.38 142.06 240.03 143.71 242.06 143.71",
  "C244.1 143.71 245.75 142.06 245.75 140.03 Z",
  "M148.45 15.64 C148.45 10.96 144.66 7.18 139.99 7.18",
  "C135.31 7.18 131.53 10.96 131.53 15.64 C131.53 20.31 135.31 24.1 139.99 24.1",
  "C144.66 24.1 148.45 20.31 148.45 15.64 Z",
  "M244.9 83.61 C244.9 51.52 218.89 25.5 186.79 25.5",
  "C154.7 25.5 128.69 51.52 128.69 83.61 C128.69 115.7 154.7 141.72 186.79 141.72",
  "C218.89 141.72 244.9 115.7 244.9 83.61 Z",
].join(" ");

// The LS465 path is normalized from the cutting lines embedded in Ricoh's
// official LS465_09.pdf. PDF Y coordinates are inverted for SVG/canvas.
const LS465_FRONT_PATH = [
  "M128.436 117.435 L3.118 117.435 L3.118 111.484",
  "C3.118 110.857 2.611 110.349 1.984 110.349 L0 110.349 L0 15.955",
  "L1.984 15.955 C2.611 15.955 3.118 15.448 3.118 14.822",
  "L3.118 7.735 L40.55 7.735 L40.55 17.316",
  "C40.55 19.195 42.073 20.718 43.952 20.718 L111.986 20.718",
  "C112.609 20.718 113.215 20.513 113.709 20.134 L124.024 12.232",
  "C124.725 11.696 125.135 10.864 125.135 9.982 L125.135 7.471",
  "C130.081 4.263 135.444 1.749 141.073 0 L179.243 0",
  "C185.026 1.797 190.528 4.4 195.584 7.735 L230.457 7.735",
  "L230.44 117.435 L191.879 117.435",
  "C187.063 120.165 181.915 122.261 176.561 123.671 L143.754 123.671",
  "C138.401 122.261 133.252 120.165 128.436 117.435 Z",
  "M210.821 27.578 L202.03 27.578",
  "C198.147 22.777 193.466 18.68 188.194 15.466",
  "C188.319 10.301 184.235 6.013 179.069 5.887",
  "C177.208 5.842 175.374 6.353 173.803 7.357",
  "C172.602 8.126 171.048 8.062 169.913 7.199",
  "C167.182 5.123 163.346 5.351 160.882 7.735 L153.385 7.735",
  "C139.436 9.494 126.719 16.609 117.923 27.578 L109.494 27.578",
  "C95.711 48.192 95.793 75.103 109.701 95.634 L109.701 97.872",
  "L112.823 100.995 L123.176 100.995",
  "C143.989 120.46 176.327 120.46 197.139 100.995 L206.532 100.995",
  "C224.231 80.24 225.983 50.252 210.821 27.578 Z",
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
        label: "Skin",
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
  {
    id: "pentax-rs1000",
    name: "PENTAX Optio RS1000",
    brand: "PENTAX",
    available: true,
    productSources: [
      "https://www.ricoh-imaging.co.jp/japan/products/optio-rs1000/feature.html",
      "https://www.ricoh-imaging.co.jp/english/products/optio-rs1000/feature.html",
    ],
    templateSources: [
      "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin_collection.html",
      "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin.html",
    ],
    templateSource:
      "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin/color10.pdf",
    panels: [
      {
        id: "front",
        label: "Skin",
        widthMm: 89,
        heightMm: 53,
        shape: {
          viewBox: "0 0 252.28 150.23",
          width: 252.28,
          height: 150.23,
          path: RS1000_FRONT_PATH,
          fillRule: "evenodd",
        },
      },
    ],
  },
  {
    id: "pentax-ls465",
    name: "PENTAX Optio LS465",
    brand: "PENTAX",
    available: true,
    productSources: [
      "https://www.ricoh-imaging.co.jp/japan/products/optio-ls465/",
      "https://www.ricoh-imaging.co.jp/english/products/optio-ls465/",
    ],
    templateSources: [
      "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin_collection_ls465.html",
    ],
    templateSource:
      "https://www.ricoh-imaging.co.jp/japan/support/download/digital/skin_ls465/skin/LS465_09.pdf",
    panels: [
      {
        id: "front",
        label: "Skin",
        widthMm: 81.3,
        heightMm: 43.63,
        shape: {
          viewBox: "0 0 230.457 123.671",
          width: 230.457,
          height: 123.671,
          path: LS465_FRONT_PATH,
          fillRule: "evenodd",
        },
      },
    ],
  },
];

export const PAPER_SIZES = [
  { id: "a4", label: "A4", widthMm: 210, heightMm: 297 },
  { id: "a3", label: "A3", widthMm: 297, heightMm: 420 },
  { id: "a2", label: "A2", widthMm: 420, heightMm: 594 },
  { id: "a5", label: "A5", widthMm: 148, heightMm: 210 },
  { id: "a6", label: "A6", widthMm: 105, heightMm: 148 },
  { id: "b4-jis", label: "B4 (JIS)", widthMm: 257, heightMm: 364 },
  { id: "b5-jis", label: "B5 (JIS)", widthMm: 182, heightMm: 257 },
  { id: "letter", label: "Letter", widthMm: 215.9, heightMm: 279.4 },
  { id: "legal", label: "Legal", widthMm: 215.9, heightMm: 355.6 },
  { id: "tabloid", label: "Tabloid", widthMm: 279.4, heightMm: 431.8 },
];
