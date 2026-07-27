# The Simply Sexy Cigars Editorial Production Checklist

*Derived from the Editorial Style Guide v1.0. The production standard for preparing a Journal piece for publication — separate from, and subordinate to, the editorial review.*

**Version 1.0 — Frozen, 26 July 2026.** Part of the permanent editorial standard. Do not revise unless a Version 2 is explicitly requested.

The Rubric judges the *writing.* This checklist judges everything else required to publish the piece well — imagery, art direction, and technical hygiene. **Complete it only after a piece has earned *Publication Ready* on the Rubric.** It never overrides the Rubric or the Guide.

---

## Imagery & Art Direction

- [ ] **Every image carries the full brief.** Each image (hero and every figure) is accompanied by the ten-field art-direction brief: **Subject · Mood · Time of Day · Lighting · Composition · Lens · Color Palette · Textures · Atmosphere · Editorial Inspiration.**
- [ ] **Placeholders match their replacements.** Each `.ph` placeholder frame shares the *exact* aspect ratio of the image that will replace it, so final photography drops in with no reflow.
- [ ] **Drop-in ready.** Every image comment includes the replacement `<img>` snippet — suggested filename and descriptive alt — so the swap is a single, safe edit.
- [ ] **The photographic world holds.** Warm, cinematic, low-lit, human — golden hour into blue hour, candlelight and firelight, real occasions.
- [ ] **No logos on photography.** The brand is the feeling in the frame, never a watermark.
- [ ] **Inspiration stays in register.** References remain within the four titles — Robb Report, Four Seasons Magazine, Cigar Aficionado, Departures — plus Kinfolk for restraint.

## Technical Hygiene *(before publish)*

- [ ] **Alt text** on every image — descriptive and human, never keyword-stuffed.
- [ ] **Performance attributes** correct: hero `fetchpriority="high"`; all other images `loading="lazy"` and `decoding="async"`.
- [ ] **Filenames** are kebab-case and descriptive (e.g. `autumn-is-cigar-season-hero.jpg`).
- [ ] **Head is complete:** `<title>` and meta description present and in the house voice; favicons and fonts linked; `journal.css` linked.
- [ ] **Links resolve:** navigation, the return-to-Journal path, and any in-piece links.
- [ ] **Renders cleanly** at desktop and mobile widths; the reveal-on-scroll and reading-progress behavior intact; `prefers-reduced-motion` respected.

---

*Production serves the writing. If a production constraint ever pressures the prose, the prose wins.*
