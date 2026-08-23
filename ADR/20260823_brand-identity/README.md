# ADR: Kisekame Brand Identity and Colour Direction

- Status: Accepted
- Date: 2026-08-23

## Context

The naming ADR selected **Kisekame** as the product name, **KISEKAME** as the
display wordmark, and **Digicam Skin Designer** as the functional descriptor.
The product now needs a visual direction that supports the meaning of
**着せ替えカメラ**.

Kisekame is a precise print tool underneath, but it should not present itself as
technical production software. Creating a skin should feel playful, personal,
and closer to choosing stickers or dressing up an object.

## Decision drivers

The brand should:

- use white as its dominant base;
- feel bright, pop, and kawaii without becoming childish;
- evoke late-Heisei stationery, purikura, translucent electronics, and camera decoration;
- make creation feel enjoyable and low-pressure;
- weaken the visual impression of a conventional utility or dashboard;
- retain enough contrast and clarity for dependable editing and printing;
- work with user-selected artwork and colours without visually competing with them.

## Palette candidates

### 1. Heisei Deco

- Base: White `#FFFFFF` / Milky White `#FFFDF7`
- Anchor: Deep Green `#083920`
- Primary accent: Deco Pink `#DF4385`
- Secondary accent: Sticker Lime `#97CD3F`

This is the leading direction. The dark green prevents the white-led interface
from becoming overly sweet, while pink and yellow-green create a distinctive
late-Heisei stationery and camera-decoration contrast. The small three-colour
system is also more ownable and easier to keep consistent than a full rainbow.

The accessibility role split is important:

- Deep Green is the default text colour and the safest filled-action colour.
- Deco Pink is used for selection rings, brand moments, decorative highlights,
  and large display text rather than small text on white.
- Sticker Lime is used for playful surfaces and accents with Deep Green text.
- White or Milky White remains visually dominant.

Measured contrast ratios:

| Pair | Ratio | Usage |
|---|---:|---|
| Deep Green / White | `12.99:1` | Body text, controls, and filled actions |
| Deco Pink / White | `3.98:1` | Large text and non-text UI only; not normal body text |
| Sticker Lime / White | `1.89:1` | Decorative colour only |
| Deep Green / Sticker Lime | `6.88:1` | Accessible text on lime surfaces |
| Deep Green / Deco Pink | `3.27:1` | Large text or non-text UI only |

### 2. Heisei Candy

- Base: Milky White `#FFFDF7`
- Primary: Deco Pink `#FF72AD`
- Accents: Soda `#59D7D0`, Lemon `#FFE36E`, Melon `#A8E66B`, Grape `#927DFF`, Sky `#62BFFF`
- Text: Grape Ink `#433A59`

This direction references late-1990s and 2000s Japanese stationery, purikura,
translucent electronics, colourful compact cameras, and decorated flip phones.
The colours are bright but slightly milky, so the interface feels nostalgic and
kawaii without becoming dark, dusty, or conventionally vintage.

Use Deco Pink for the main creative action. Soda, Lemon, Melon, Grape, and Sky
should appear like collectible sticker colours across selections and small
feedback moments. White must remain dominant.

### 3. Candy Pop

- Base: Soft White `#FFFDFC`
- Primary: Candy Pink `#FF6B8A`
- Accents: Sunny `#FFD166`, Mint `#58D6B5`, Sky `#72C7FF`, Lavender `#A98BFF`
- Text: Grape Ink `#3A3450`

This is the recommended starting point. It balances pop and kawaii, provides a
varied set of joyful accents, and keeps enough saturation to avoid looking like
a generic pastel productivity app.

### 4. Pastel Sticker

- Base: Warm White `#FFFEFA`
- Primary: Cherry Milk `#FF7FA3`
- Accents: Peach `#FFB38A`, Butter `#FFE68A`, Aqua `#7FE0D2`, Periwinkle `#8EA7FF`
- Text: Soft Plum `#4B4563`

This is softer and sweeter than Candy Pop. It fits sticker-like cards and
collectible templates well, but risks making important actions feel too quiet.

### 5. Toy Camera

- Base: Pure White `#FFFFFF`
- Primary: Tangerine `#FF8A3D`
- Accents: Cyan `#26C6DA`, Lemon `#FFE156`, Pink `#FF70A6`, Blue `#5F8DFF`
- Text: Navy Ink `#25324A`

This is energetic and nostalgic, with a stronger connection to colourful compact
and toy cameras. It is less overtly kawaii and can become visually busy if every
accent is used at once.

### 6. Harajuku Pop

- Base: Pure White `#FFFFFF`
- Primary: Hot Pink `#FF4FA3`
- Accents: Lime `#B8F34A`, Electric Cyan `#49DDF0`, Violet `#8B5CF6`
- Text: Aubergine `#29223A`

This is the boldest and most fashion-led direction. It is memorable, but the
high-energy accents can compete with uploaded skin artwork and are easy to
overuse.

### 7. Film Candy

- Base: Cream White `#FFFDF7`
- Primary: Tomato `#FF6257`
- Accents: Sunflower `#FFC93D`, Teal `#4AC7B7`, Film Blue `#5F8DFF`
- Text: Cocoa Ink `#473C4A`

This is warmer and more analogue-camera-oriented. It feels crafted and friendly,
but less immediately kawaii than Candy Pop or Pastel Sticker.

## Decision

Adopt **Heisei Deco** as the Kisekame brand palette.

The initial role mapping is:

| Role | Colour |
|---|---|
| Page background | White `#FFFFFF` or Milky White `#FFFDF7` |
| Cards and editable surfaces | White `#FFFFFF` |
| Main text and dependable actions | Deep Green `#083920` |
| Brand, selection, and decoration | Deco Pink `#DF4385` |
| Playful surfaces and secondary accents | Sticker Lime `#97CD3F` |

Supporting accents express creative variety and selection. They should not be
used as conventional red/amber/green dashboard statuses.

Implementation in the actual editor at desktop and mobile widths must verify:

- whether the UI still feels white-led;
- whether the skin artwork remains the visual focus;
- whether adding and customizing skins feels playful;
- WCAG AA contrast for text, focus, and interactive controls;
- print-specific views remain neutral and unaffected by brand chrome.

These checks may refine individual UI tokens or derived tints, but the three core
brand colours remain canonical unless this ADR is superseded.

## Heisei-retro expression

Colour should carry most of the nostalgia. Supporting visual references may
include:

- glossy sticker-like selection rings and small highlights;
- translucent or frosted colour surfaces used sparingly;
- rounded labels reminiscent of stationery and purikura controls;
- tiny stars, hearts, sparkles, checks, or bubbles as optional decorative motifs;
- compact-camera and flip-phone colour blocking rather than metallic realism.

Avoid sepia, faded brown, muted Showa-era palettes, heavy cyber-Y2K chrome,
aggressive neon-on-black styling, and dense pixel-art decoration. These would
either move the brand into the wrong period or overpower user-created skins.

## Interaction and visual consequences

- Prefer rounded cards, generous spacing, large swatches, and sticker-like selection states.
- Use friendly direct language rather than print-production terminology where possible.
- Avoid dense toolbars, dark navigation, heavy grey borders, and enterprise-dashboard patterns.
- Small transitions may celebrate adding or changing a skin, but must not slow repeated editing.
- Printed skins and cut lines must never inherit decorative UI colours accidentally.

## Related decisions

- [Application name candidates and Kisekame decision](../20260823_app-name-candidates/README.md)

## Consequences

- `#083920`, `#DF4385`, and `#97CD3F` become the canonical brand colours.
- New UI work should derive lighter surfaces and interaction states from these
  colours rather than introduce unrelated accents.
- White remains the dominant visual area so uploaded artwork stays central.
- Existing application styling should migrate to Heisei Deco in a dedicated UI
  implementation change.
