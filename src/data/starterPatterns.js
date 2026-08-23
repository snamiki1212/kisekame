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

export const STARTER_PATTERNS = COLOR_TEMPLATES.slice(0, 3);
