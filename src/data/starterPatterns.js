const WIDTH = 316;
const HEIGHT = 202;

const toDataUrl = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const pattern = (id, name, artwork) => ({
  id,
  name,
  width: WIDTH,
  height: HEIGHT,
  src: toDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">${artwork}</svg>`
  ),
  isTemplate: true,
});

export const STARTER_PATTERNS = [
  pattern(
    "starter-sunset",
    "Template — Sunset",
    `<defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#ff5f6d"/><stop offset="1" stop-color="#ffc371"/></linearGradient></defs><rect width="316" height="202" fill="url(#g)"/><circle cx="242" cy="52" r="34" fill="#fff" opacity=".75"/><path d="M0 166 70 105l43 39 51-58 94 80z" fill="#472f5f" opacity=".78"/>`
  ),
  pattern(
    "starter-grid",
    "Template — Grid",
    `<defs><pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#eef4ff"/><path d="M24 0H0v24" fill="none" stroke="#5b7cfa" stroke-width="2"/></pattern></defs><rect width="316" height="202" fill="url(#p)"/><rect x="105" y="0" width="106" height="202" fill="#ffcf33" opacity=".88"/>`
  ),
  pattern(
    "starter-waves",
    "Template — Waves",
    `<rect width="316" height="202" fill="#102a43"/><path d="M-30 58q55-42 110 0t110 0t110 0t110 0" fill="none" stroke="#2ec4b6" stroke-width="25"/><path d="M-30 126q55-42 110 0t110 0t110 0t110 0" fill="none" stroke="#ff6b6b" stroke-width="25"/><path d="M-30 194q55-42 110 0t110 0t110 0t110 0" fill="none" stroke="#ffe66d" stroke-width="25"/>`
  ),
];
