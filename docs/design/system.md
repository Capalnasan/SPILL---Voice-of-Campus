# Spill frontend design system

## Product premise

Spill is a community-first pseudonymous conversation product for students and young communities. The frontend demonstrates the full local loop: discover a post, react or save it, open the conversation, reply, create a spill, and see the new post in the feed.

## Concept sources

- `spill-landing-concept.png`: public landing page and marketing rhythm.
- `spill-feed-concept.png`: 1440 × 1024 desktop app shell and primary feed.
- `spill-mobile-flow-concept.png`: 390 × 844 mobile feed, composer, and replies states.

## Locked visual system

- Canvas: true white `#ffffff`; rails/support surfaces: lavender-white `#f7f6ff`.
- Text: ink `#111019`; muted ink `#6d687d`; border `#ddd9e8`.
- Primary: coral `#ff514a`; pressed coral `#e63e3a`.
- Secondary/state: violet `#6c4bf4`; soft violet `#eeeaff`.
- Sparse highlight: acid lime `#d9ff63`; success `#16885f`.
- Display: expressive, high-contrast serif; UI/body: warm, clean sans.
- Geometry: open layouts and rule-separated feed rows; 10–16px controls; 14px primary radius; compact shadows only for modal/composer emphasis.
- Motifs: coral droplet brand mark, hand-drawn active underline, sparing ink-brush shapes.
- Icons: rounded outline family, 2px stroke, filled only for selected/liked states.

## Primary component families

Brand mark; quiet marketing header; primary/secondary buttons; left app navigation; bottom mobile navigation; tabs; composer trigger; full composer dialog; post row; reactions; topic row; safety rail; avatar glyph; auth field; notification row; moderation row.

## Above-the-fold copy lock

Marketing: `spill`, `How it works`, `Safety`, `Community`, `Log in`, `Say what everyone’s thinking.`, `A place for honest conversations, small confessions, and the thoughts that don’t fit anywhere else.`, `Enter the feed`, `See how it works`, `Pseudonymous by default. Human by design.`

Feed: `spill`, `Home`, `Explore`, `Activity`, `Saved`, `Profile`, `Spill something`, `For you`, `Fresh`, `Following`, `What’s on your mind?`, `Add photo`, `Create poll`, `Post anonymously`, `Happening now`, `Your space`.

## Responsive model

- Desktop ≥ 1180px: fixed 232px left rail, fluid 640–760px feed, 288px right rail.
- Tablet 760–1179px: compact icon-first left rail, fluid feed, no right rail.
- Mobile < 760px: edge-to-edge feed, quiet sticky header, persistent five-action bottom navigation, full-screen composer.

