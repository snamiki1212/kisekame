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

const dataUrl = (body) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">${body}</svg>`
)}`;

export const createColorAsset = (color) => ({
  id: `color-${color.replace("#", "")}`,
  name: color.toUpperCase(),
  color,
  width: WIDTH,
  height: HEIGHT,
  src: dataUrl(`<rect width="100%" height="100%" fill="${color}"/>`),
  sourceType: "color",
});

export const COLOR_TEMPLATES = COLORS.map(([id, name, color]) => ({
  ...createColorAsset(color), id: `template-${id}`, name,
}));

export const PATTERN_DEFINITIONS = [
  ["checker", "Checker", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="${fg}"/><rect x="20" y="20" width="20" height="20" fill="${fg}"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["dots", "Dots", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="6" fill="${fg}"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["stripes", "Stripes", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><path d="M-60 202 70 0m-10 202L190 0m-10 202L310 0m-10 202L430 0" stroke="${fg}" stroke-width="28"/>`],
  ["waves", "Waves", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><path d="M-40 55q50-38 100 0t100 0t100 0t100 0M-40 125q50-38 100 0t100 0t100 0t100 0" fill="none" stroke="${fg}" stroke-width="22"/>`],
  ["grid", "Grid", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="${fg}" stroke-width="2"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["confetti", "Confetti", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><g stroke="${fg}" stroke-width="9"><path d="m25 30 12 12m55-7 15-8m45 22 4 16m52-34 14 11m50 8 14-9M55 112l15-4m55 20 10 13m55-28 15-9m55 28 8 15M25 175l14-10m93 13 16-5m67 12 11-13"/></g>`],
].map(([id, name, render]) => ({ id, name, render }));

export const createPatternAsset = (patternId, foreground, background) => {
  const pattern = PATTERN_DEFINITIONS.find((item) => item.id === patternId);
  return {
    id: `pattern-${patternId}-${foreground.slice(1)}-${background.slice(1)}`,
    name: pattern.name,
    width: WIDTH,
    height: HEIGHT,
    src: dataUrl(pattern.render(foreground, background)),
    sourceType: "pattern",
    patternId,
    foreground,
    background,
  };
};

export const PATTERN_TEMPLATES = PATTERN_DEFINITIONS.map((pattern) =>
  createPatternAsset(pattern.id, "#5c7cfa", "#f8f9fa")
);
