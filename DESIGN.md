# Kisekame Design Guidelines

This document defines Kisekame's visual and interaction design. Product
behaviour and technical requirements belong in [`SPEC.md`](SPEC.md).

## Design Direction

Kisekame should feel like a small creative playground rather than a technical
print-production utility. The experience is:

- **pop and kawaii:** cheerful, friendly, and collectible without becoming childish;
- **Heisei retro:** inspired by late-1990s and 2000s stationery, purikura,
  translucent electronics, compact cameras, and decorated flip phones;
- **creative:** choosing colours, patterns, and photos feels like playing with stickers;
- **light:** white space and bright accents dominate over grey tool chrome;
- **approachable:** controls use familiar language and direct manipulation;
- **precise underneath:** physical sizing and print accuracy remain dependable,
  without becoming the visual personality.

Avoid enterprise-dashboard styling, dense toolbars, dark industrial palettes,
technical jargon, excessive borders, sepia, faded Showa palettes, heavy chrome,
and neon-on-black styling.

## Brand and Colour

The adopted **Heisei Deco** palette is:

| Role | Token | Colour |
|---|---|---|
| Main text and dependable actions | Deep Green | `#083920` |
| Brand, selection, and decoration | Deco Pink | `#DF4385` |
| Playful surfaces and secondary accents | Sticker Lime | `#97CD3F` |
| Page and card base | White / Milky White | `#FFFFFF` / `#FFFDF7` |

White remains dominant so user artwork stays central. Deep Green is the default
text colour. Pink and Lime communicate selection, decoration, and creative
feedback rather than status. Derived pale pink, lime, and neutral surfaces may
be used for grouping and hover states.

Text and controls must meet WCAG AA independently of decorative swatches. The
canonical contrast measurements and rationale are recorded in
[`adr/20260823_brand-identity`](adr/20260823_brand-identity/README.md).

## Shape, Type, and Depth

- Use rounded cards, pill controls, large swatches, and generous spacing.
- The wordmark uses a heavy rounded system-font stack, slight rotation, a solid
  offset shadow, and a small sparkle badge to evoke a physical sticker.
- Body text uses the system sans-serif stack for clarity across supported languages.
- Selection states use a pink border or ring; they must not rely on colour alone.
- Prefer short transitions and small lift effects that do not slow repeated editing.

The information modal uses a **hard offset shadow** (also called a **solid drop
shadow** or **neo-brutalist shadow**): `box-shadow: 8px 8px 0 #DF4385`. Its zero
blur radius creates the flat, misregistered-print/sticker-layer effect that gives
the modal its Heisei-retro character. The modal sits above a dark translucent,
`8px`-blurred backdrop; this backdrop blur is separate from the modal's shadow.

This depth language may also be used elsewhere when a particular element needs a
sticker-like emphasis, but it is an accent rather than a system applied across
the whole screen. Before adding it, confirm that it improves hierarchy without
making the editor heavier or distracting from skin artwork. Do not add it to
every page region, input, tab, swatch, icon button, or card; too many competing
shadow edges make the interface noisy and quickly turn the retro reference into
a generic neo-brutalist look. Minor controls should rely on borders, colour, or
a subtle soft shadow instead.

## Layout and Hierarchy

- The desktop editor uses a fixed-width control sidebar and a flexible preview area.
- Skin previews are the primary visual content and appear in rows of three when space allows.
- Cards group camera, paper, source, and image controls without dense toolbars.
- Primary print action uses a pink fill with a hard Deep Green bottom shadow.
- At widths up to `900px`, the sidebar moves above the preview and the preview grid adapts.
- At widths up to `520px`, header actions wrap, secondary labels are reduced, and
  previews form a single centred column.

## Modal and Navigation Behaviour

- About, usage, and print guidance share one centred modal shell.
- The modal has a maximum width of `560px`, remains within the viewport, and
  scrolls its body independently.
- A dark translucent blurred backdrop separates the modal from the editor.
- The modal closes through its close button or a pointer action on the backdrop.
- The active modal section is indicated in the footer navigation.
- Dialog semantics, an accessible name, visible keyboard focus, and keyboard-safe
  interaction must be preserved when changing the modal.

## Themes and Accessibility

- Light mode is white-led; dark mode uses deep green-black surfaces while retaining
  Pink and Lime as brand accents.
- Theme preference follows saved user choice, otherwise the operating-system preference.
- Keyboard focus uses a visible `3px` Deco Pink outline with offset.
- Interactive targets need clear hover, selected, disabled, and focus states.
- Controls and guidance must remain usable in every supported language.

## Print Separation

Brand chrome is screen-only. During printing, the header, sidebar, preview cards,
modal UI, shadows, and decorative colours are hidden. Only the neutral,
physically accurate `PrintSheet` output and cut geometry are printed.

## Design Source of Truth

- Design decision and palette rationale:
  [`adr/20260823_brand-identity`](adr/20260823_brand-identity/README.md)
- Implemented application styles: `src/App.module.css` and `src/index.css`
- Functional and print requirements: [`SPEC.md`](SPEC.md)
