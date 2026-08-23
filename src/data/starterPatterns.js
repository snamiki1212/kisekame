const WIDTH = 316;
const HEIGHT = 202;

const COLORS = [
  ["coral", "Coral", "#ff6b6b"], ["sunshine", "Sunshine", "#ffd43b"],
  ["mint", "Mint", "#63e6be"], ["sky", "Sky", "#74c0fc"],
  ["indigo", "Indigo", "#5c7cfa"], ["lavender", "Lavender", "#b197fc"],
  ["blush", "Blush", "#faa2c1"], ["terracotta", "Terracotta", "#e07a5f"],
  ["forest", "Forest", "#2b8a3e"], ["navy", "Navy", "#183153"],
  ["charcoal", "Charcoal", "#343a40"], ["ivory", "Ivory", "#fff9db"],
];

const toDataUrl = (color) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><rect width="100%" height="100%" fill="${color}"/></svg>`
  )}`;

export const COLOR_TEMPLATES = COLORS.map(([id, name, color]) => ({
  id: `template-${id}`,
  name,
  color,
  width: WIDTH,
  height: HEIGHT,
  src: toDataUrl(color),
  isTemplate: true,
}));

const patternDataUrl = (body) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">${body}</svg>`
  )}`;

export const PATTERN_TEMPLATES = [
  ["checker", "Checker", `<pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#212529"/><rect x="20" y="20" width="20" height="20" fill="#212529"/><rect x="20" width="20" height="20" fill="#f8f9fa"/><rect y="20" width="20" height="20" fill="#f8f9fa"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["dots", "Dots", `<rect width="100%" height="100%" fill="#ffe3e3"/><pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="6" fill="#fa5252"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["stripes", "Stripes", `<rect width="100%" height="100%" fill="#d0ebff"/><path d="M-60 202 70 0m-10 202L190 0m-10 202L310 0m-10 202L430 0" stroke="#339af0" stroke-width="28"/>`],
  ["waves", "Waves", `<rect width="100%" height="100%" fill="#102a43"/><path d="M-40 55q50-38 100 0t100 0t100 0t100 0" fill="none" stroke="#2ec4b6" stroke-width="22"/><path d="M-40 125q50-38 100 0t100 0t100 0t100 0" fill="none" stroke="#ff6b6b" stroke-width="22"/>`],
  ["grid", "Grid", `<rect width="100%" height="100%" fill="#fff"/><pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="#5c7cfa" stroke-width="2"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["confetti", "Confetti", `<rect width="100%" height="100%" fill="#fff9db"/><g stroke-width="9"><path d="m25 30 12 12m55-7 15-8m45 22 4 16m52-34 14 11m50 8 14-9M55 112l15-4m55 20 10 13m55-28 15-9m55 28 8 15M25 175l14-10m93 13 16-5m67 12 11-13" stroke="#ff6b6b"/><path d="m55 65 12-8m60 25 14 12m50-24 12-10m60 31 16 2M86 160l8-15m90 17 13 8" stroke="#5c7cfa"/></g>`],
].map(([id, name, body]) => ({
  id: `pattern-${id}`,
  name,
  width: WIDTH,
  height: HEIGHT,
  src: patternDataUrl(body),
  isTemplate: true,
}));
