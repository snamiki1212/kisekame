const WIDTH = 316;
const HEIGHT = 202;
const PATTERN_SCALE = 12;

const COLORS = [
  ["kisekame-pink", "KISEKAME Pink", "#df4385"],
  ["kisekame-lime", "KISEKAME Lime", "#97cd3f"],
  ["peach-pop", "Peach Pop", "#ff8fab"], ["strawberry-milk", "Strawberry Milk", "#ffc2d1"],
  ["butter", "Butter", "#ffe08a"], ["pistachio", "Pistachio", "#b7d88a"],
  ["soda", "Soda Blue", "#86d3e8"], ["lilac", "Soft Lilac", "#c6b4e9"],
  ["cherry", "Dark Cherry", "#b82f63"], ["cobalt", "Cobalt", "#3157a4"],
  ["teal", "Deep Teal", "#147d74"], ["racing-green", "Racing Green", "#184d3b"],
  ["ink", "Midnight Ink", "#20263a"], ["cocoa", "Cocoa", "#6f4e45"],
];

const dataUrl = (body, width = WIDTH, height = HEIGHT) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${body}</svg>`
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
  ["kisekame", "KISEKAME", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><g transform="translate(1738 1111)"><g fill="#97cd3f" opacity=".72"><circle cx="137" cy="37" r="10"/><circle cx="298" cy="166" r="17"/><circle cx="17" cy="178" r="7"/></g><path d="M124 175q24-26 48 0t48 0t48 0" fill="none" stroke="#df4385" stroke-width="8" stroke-linecap="round" opacity=".42"/><g transform="rotate(-3 59 105)"><rect x="10" y="55" width="98" height="98" rx="22" fill="#083920"/><rect x="5" y="49" width="98" height="98" rx="22" fill="${fg}" stroke="#083920" stroke-width="5"/><text x="54" y="92" text-anchor="middle" fill="#fff" font-family="Arial Rounded MT Bold,Arial,sans-serif" font-size="23" font-weight="900" letter-spacing="2">KISE</text><text x="54" y="121" text-anchor="middle" fill="#fff" font-family="Arial Rounded MT Bold,Arial,sans-serif" font-size="23" font-weight="900" letter-spacing="2">KAME</text></g><circle cx="92" cy="45" r="15" fill="#97cd3f" stroke="#083920" stroke-width="4"/><path d="m92 34 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#083920"/></g>`],
  ["checker", "Checker", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="${fg}"/><rect x="20" y="20" width="20" height="20" fill="${fg}"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["dots", "Dots", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="6" fill="${fg}"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["stripes", "Stripes", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(33)"><rect width="28" height="120" fill="${fg}"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["waves", "Waves", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="100" height="70" patternUnits="userSpaceOnUse"><path d="M-50 35q25-35 50 0t50 0t50 0t50 0" fill="none" stroke="${fg}" stroke-width="16"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["grid", "Grid", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="${fg}" stroke-width="2"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["confetti", "Confetti", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="110" height="92" patternUnits="userSpaceOnUse"><g stroke="${fg}" stroke-width="8" stroke-linecap="round"><path d="m18 18 12 12m45-15 14 8M25 68l15-5m42 14 9-13"/></g></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["gingham", "Gingham", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse"><rect width="24" height="48" fill="${fg}" opacity=".38"/><rect width="48" height="24" fill="${fg}" opacity=".38"/><rect width="24" height="24" fill="${fg}" opacity=".42"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["scallops", "Scallops", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="42" height="28" patternUnits="userSpaceOnUse"><path d="M0 0a21 21 0 0 0 42 0M-21 28a21 21 0 0 0 42 0M21 28a21 21 0 0 0 42 0" fill="none" stroke="${fg}" stroke-width="5"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["diamonds", "Diamonds", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="42" height="42" patternUnits="userSpaceOnUse"><path d="m21 3 18 18-18 18L3 21Z" fill="none" stroke="${fg}" stroke-width="4"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["stars", "Stars", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="58" height="58" patternUnits="userSpaceOnUse"><path d="m18 5 4 9 10 1-8 7 3 10-9-5-9 5 3-10-8-7 10-1Z" fill="${fg}"/><path d="m48 34 2 5 6 1-5 4 2 6-5-3-5 3 2-6-5-4 6-1Z" fill="${fg}" opacity=".6"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["hearts", "Hearts", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="54" height="48" patternUnits="userSpaceOnUse"><path d="M27 39C7 27 9 10 20 10c5 0 7 4 7 4s2-4 7-4c11 0 13 17-7 29Z" fill="${fg}"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
  ["sprinkles", "Sprinkles", (fg, bg) => `<rect width="100%" height="100%" fill="${bg}"/><pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse"><path d="m8 9 9 5m20-4-5 10M11 36l10-3m14 7 6-8" stroke="${fg}" stroke-width="5" stroke-linecap="round"/></pattern><rect width="100%" height="100%" fill="url(#p)"/>`],
].map(([id, name, render]) => ({ id, name, render }));

export const createPatternAsset = (patternId, foreground, background) => {
  const pattern = PATTERN_DEFINITIONS.find((item) => item.id === patternId);
  const width = WIDTH * PATTERN_SCALE;
  const height = HEIGHT * PATTERN_SCALE;
  return {
    id: `pattern-${patternId}-${foreground.slice(1)}-${background.slice(1)}`,
    name: pattern.name,
    width,
    height,
    src: dataUrl(pattern.render(foreground, background), width, height),
    sourceType: "pattern",
    patternId,
    foreground,
    background,
  };
};

export const PATTERN_TEMPLATES = PATTERN_DEFINITIONS.map((pattern) =>
  createPatternAsset(pattern.id, "#5c7cfa", "#f8f9fa")
);
