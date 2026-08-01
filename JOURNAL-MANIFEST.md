# THE JOURNAL — MANIFEST
*Internal editorial index. Not published. Updated whenever an article is created, promoted, or retired.*

The Journal is a **curated** publication, not a chronological blog. Volumes are numbered in editorial (curatorial) order, not by date. Every article belongs to exactly one **department**.

## Volumes

| Volume | Department | Title | Slug | Status |
|---|---|---|---|---|
| 01 | The Art of Celebration | Autumn — A Season of Gathering *(The Fall Issue)* | `autumn.html` | Published |
| 02 | The Host's Guide | Beyond the Gift Basket — A Host's Guide to Client Appreciation | `client-appreciation-guide.html` | **Published** |
| 03 | The Pairing Table | Bourbon & Maduro | *(to be assigned)* | Planned |

## Evergreen Cornerstones
*Timeless features that sit outside the seasonal volume sequence.*

| Ref | Department | Title | Slug | Status |
|---|---|---|---|---|
| E1 | Cornerstone Feature | The Art of the Cigar Moment | `art-of-the-cigar-moment.html` | Published *(locked)* |

## Drafts Held for Photography
*Writing approved; unpublished and unlinked until dedicated, non-reused editorial photography exists.*

| Department | Title | Slug | Status |
|---|---|---|---|
| The Art of Celebration | The Language of Luxury | `the-language-of-luxury.html` | Held — photography |
| Behind the Cart | Behind the Cart | `behind-the-cart.html` | Held — photography |
| The Pairing Table | Pairing Cigars with Celebration | `pairing-cigars-with-celebration.html` | Held — photography |
| The Host's Guide | An Autumn Wedding | `an-autumn-wedding.html` | Held — photography |
| Weddings | Why a Cigar Lounge Becomes the Most Memorable Part of a Wedding | `why-cigar-lounge-wedding.html` | Held — photography |

### Prepared, held — Weddings publication (`why-cigar-lounge-wedding.html`)
*The article is written and production-ready but intentionally kept out of the live Journal until it has its own dedicated, non-reused wedding photography (Publisher direction, 2026-08-01). The article page carries `robots: noindex, follow` and seven labeled `.ph` placeholder frames. The carousel card and sitemap entry below are **staged, not published** — do not paste them live until the photography exists.*

This piece is the inaugural feature for the already-planned **Weddings** publication (the "Weddings — Upcoming" teaser card currently in the `journal.html` carousel). At publish it converts that teaser to a Published photo card.

**Staged carousel card** — replaces the `Weddings · Upcoming` teaser `<article>` in `journal.html` once photography lands:
```html
<!-- Weddings · Published -->
<a class="jx-cc jx-cc--photo" href="why-cigar-lounge-wedding.html" aria-label="Open the Weddings publication — Why a Cigar Lounge Becomes the Most Memorable Part of a Wedding">
  <div class="jx-cc__media"><img src="images/why-cigar-lounge-wedding-hero.webp" alt="Wedding guests gathered around a candlelit cigar lounge at golden hour, champagne and premium cigars on the table" loading="lazy" decoding="async"></div>
  <div class="jx-cc__scrim" aria-hidden="true"></div>
  <span class="jx-cc__status jx-cc__status--live">Published</span>
  <div class="jx-cc__body">
    <h3 class="jx-cc__title">Weddings</h3>
    <p class="jx-cc__sub">The Most Memorable Part of the Wedding</p>
  </div>
</a>
```

**Staged sitemap entry** — add to `sitemap.xml` at publish (refresh `lastmod` to the publish date):
```xml
<url>
  <loc>https://www.simplysexycigars.com/why-cigar-lounge-wedding.html</loc>
  <lastmod>2026-08-01</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.7</priority>
</url>
```

**Publication checklist — Weddings (`why-cigar-lounge-wedding.html`).** Run top to bottom when the dedicated wedding photography is ready; the piece is not published until every box is checked. Report *incomplete* if any step fails (never claim success on a partial publish).

*Photography*
- [ ] Produce dedicated, non-reused wedding photography for all seven `.ph` frames (see the art-direction brief in each frame's `.ph__note`).
- [ ] Produce the hero + a card/social image and export as WebP (`images/why-cigar-lounge-wedding-hero.webp`) plus a `.jpg` fallback for og:image/schema.
- [ ] **Replace the placeholders with final WebP images** — swap every `.ph` block in `why-cigar-lounge-wedding.html` for a responsive, lazy-loaded `<img>` (keep `fetchpriority="high"` on the hero; `loading="lazy"` on the rest; descriptive `alt`).

*Metadata & indexing*
- [ ] **Remove `noindex` and restore `index, follow`** — flip the page `robots` meta to `index, follow, max-image-preview:large` (and delete the "HELD FOR PHOTOGRAPHY" comment).
- [ ] **Update the Open Graph image** — point `og:image` (and `twitter:image`) at the final hosted hero image; confirm `og:image:alt` still describes it.
- [ ] **Update the Article schema image** — set the JSON-LD `Article.image` to the same final hosted URL; confirm it returns 200 (not a placeholder path).

*Journal integration*
- [ ] **Promote the Weddings carousel card from Upcoming → Published** — replace the `Weddings · Upcoming` teaser `<article>` in `journal.html` with the staged Published card above.
- [ ] **Add the sitemap.xml entry** — insert the staged `<loc>` block; set its `lastmod` to the publish date and bump `journal.html`'s `lastmod`.
- [ ] Add reciprocal Related links from live pages where sensible (e.g. `autumn.html`, `client-appreciation-guide.html`) — do **not** edit the locked `art-of-the-cigar-moment.html`.
- [ ] Move this row from *Drafts Held for Photography* to a numbered Weddings publication entry in the tables above.

*Verification & release*
- [ ] **Verify internal links** — every link in the article resolves to a live page (Journal, Autumn, Beyond the Gift Basket, The Art of the Cigar Moment, Contact) and the prev/next/home nav works.
- [ ] **Deploy** — push `main` to Production (Vercel).
- [ ] **Submit the URL in Google Search Console** — request indexing for `https://www.simplysexycigars.com/why-cigar-lounge-wedding.html` and confirm the live sitemap entry is picked up.
- [ ] **Verify reachability from the homepage** — Home → The Journal → Weddings carousel card → article returns 200 (no orphan page).
- [ ] **Run Lighthouse** — confirm Performance / Accessibility / Best Practices / SEO hold to the site's existing scores; check LCP on the new hero image.
- [ ] **Confirm no broken links** — article, images, card, og:image, and schema image all return 200; nothing still points at a `…-hero.jpg`/`.ph` placeholder.

### Weddings — content cluster & internal-linking plan (topical authority)
*The Weddings collection is being built as a hub-and-spoke cluster around the primary keyword **luxury wedding cigar lounge**. `why-cigar-lounge-wedding.html` is the **pillar** (the emotional "why"). Each companion (spoke) owns a distinct sub-intent and keyword set, links **up** to the pillar with a descriptive anchor, and links **across** to its sibling; the pillar links **down** to each spoke. No spoke is linked live until it is itself published with its own photography.*

| Role | Title | Slug | Owns (keywords) | Status |
|---|---|---|---|---|
| **Pillar** | Why a Cigar Lounge Becomes the Most Memorable Part of a Wedding | `why-cigar-lounge-wedding.html` | luxury wedding cigar lounge; why guests gather; wedding after party (the hour) | Held — photography |
| Spoke 1 | The Wedding Cigar Bar — A Coordinator's Guide | `wedding-cigar-bar-guide.html` | wedding cigar bar; wedding reception ideas; luxury wedding entertainment; mobile cigar lounge; timeline & etiquette | **Recommended · to write** |
| Spoke 2 | A Northern California Wedding — The Open-Air Lounge | `northern-california-wedding-cigar-lounge.html` | Northern California weddings; Bay Area wedding entertainment; outdoor wedding reception; vineyard / estate / country-club terrace | **Recommended · to write** |

**Why these two.** Together with the pillar they cover the topic's four faces without cannibalizing it — the pillar answers *why*, Spoke 1 answers *what/how* (the planner's practical guide, mirroring the proven *Host's Guide* format), and Spoke 2 answers *where* (local-SEO intent that a Northern California mobile service should own outright). A later third spoke could take *Champagne & Cigars — The Wedding After-Party* (champagne and cigars; wedding after party) once the first two are live.

**Reciprocal link map (apply as each spoke is published — never link a held/unpublished page from a live one):**
- Pillar → Spoke 1 & Spoke 2: the two "Planned · Weddings" cards already staged in the pillar's *Related Stories* become live `<a>` cards.
- Spoke 1 → Pillar: descriptive in-body anchor, e.g. *"why the lounge becomes [the most memorable part of the night](why-cigar-lounge-wedding.html)."*
- Spoke 2 → Pillar: in-body anchor from its outdoor/vineyard passage back to the pillar's *Under an Open Sky* theme.
- Spoke 1 ↔ Spoke 2: reciprocal *Related Stories* cards.
- All three carry `articleSection: "Weddings"` and the `Weddings` eyebrow so the cluster is unambiguous to readers and crawlers.

**Collection front door.** While Weddings is a single-article publication, the `journal.html` Weddings carousel card (staged above) is its front door → the pillar. If the collection grows beyond ~3 features, consider promoting Weddings to a self-contained publication page (`weddings.html`, cover + inline stories, per the Autumn pattern) — a Publisher decision, not to be made unilaterally.

## Status legend
- **Planned** — commissioned, not yet written.
- **Draft** — written, in editorial review.
- **In Preview** — deployed to a Vercel Preview URL for review; never Production.
- **Held — photography** — writing approved; awaiting its own photography before publishing.
- **Published** — live in Production.
- **Locked** — Publisher-approved; read-only except by explicit approval.

## Departments
The Host's Guide · The Pairing Table · Cigar Academy · The Art of Celebration · Celebration Files · Behind the Cart · Weddings

---
*Volume 02 was revised from an essay to a practical Host's Guide (editorial direction). Headline "Beyond the Gift Basket"; slug renamed `the-hour-off-the-agenda` → `client-appreciation-guide` for keyword alignment (client appreciation / corporate hospitality). Original working title: "Client Appreciation That People Actually Remember."*
