# THE JOURNAL — MANIFEST
*Internal editorial index. Not published. Updated whenever an article is created, promoted, or retired.*

The Journal is a **curated** publication, not a chronological blog. Volumes are numbered in editorial (curatorial) order, not by date. Every article belongs to exactly one **department**.

## Volumes

| Volume | Department | Title | Slug | Status |
|---|---|---|---|---|
| 01 | The Art of Celebration | Autumn — A Season of Gathering *(The Fall Issue)* | `autumn.html` | Published |
| 02 | The Host's Guide | Beyond the Gift Basket — A Host's Guide to Client Appreciation | `client-appreciation-guide.html` | **Published** |
| 03 | Weddings | Why a Cigar Lounge Becomes the Most Memorable Part of a Wedding | `why-cigar-lounge-wedding.html` | **Published** |
| 04 | The Pairing Table | Bourbon & Maduro | *(to be assigned)* | Planned |

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

### Published — Weddings publication (`why-cigar-lounge-wedding.html`) · Volume 03
**STATUS: Published — integrated and verified locally on 2026-08-01; pending only the final `git push` / Vercel deploy (held back per Publisher direction).** The article now carries seven pieces of dedicated wedding photography (optimized WebP, per-image art direction), `robots: index, follow, max-image-preview:large`, a dedicated 1200×630 social image, a live **Published** Weddings carousel card in `journal.html`, and a `sitemap.xml` entry. The `.ph` placeholders and the `noindex` hold are gone.

This piece is the inaugural feature of the **Weddings** collection; publication converted the former "Weddings — Upcoming" teaser into its Published photo card. The staged snippets and checklist below are retained as the completed record of the activation.

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

**Publication checklist — Weddings (`why-cigar-lounge-wedding.html`) — COMPLETE (local).** Executed 2026-08-01. Every integration and verification step is done; only the deploy-time steps remain, deliberately held per Publisher direction (no push / deploy).

*Photography*
- [x] Produced dedicated, non-reused wedding photography for all seven frames.
- [x] Produced the hero + a 1200×630 `.jpg` social image (`images/why-cigar-lounge-wedding-hero.jpg`); story images exported as optimized WebP (`images/weddings-01…07-*.webp`).
- [x] **Replaced the placeholders with final WebP images** — semantic `<figure>`/`<img>`, per-image art direction (hero cover · portrait 4:5 · landscapes native 16:9 · two full-bleed frames), `fetchpriority="high"` on the hero, `loading="lazy"` on the rest, descriptive `alt`.

*Metadata & indexing*
- [x] **Removed `noindex`; restored `index, follow, max-image-preview:large`** (HELD comment deleted).
- [x] **Updated the Open Graph + Twitter image** to the final hosted hero; added `og:image:width/height/type`; corrected `og:image:alt`.
- [x] **Updated the Article schema image** to the same hosted URL (returns 200).

*Journal integration*
- [x] **Promoted the Weddings carousel card Upcoming → Published** in `journal.html` (relocated to sit with the published cards).
- [x] **Added the `sitemap.xml` entry** (`priority 0.8`, `lastmod 2026-08-01`); bumped `journal.html` `lastmod`.
- [x] Added a reciprocal Related link from `client-appreciation-guide.html` (Autumn is a self-contained Edition with no Related grid → N/A; locked `art-of-the-cigar-moment.html` untouched).
- [x] Moved this row from *Drafts Held for Photography* to **Volume 03** in the Volumes table above.

*Verification & release*
- [x] **Verified internal links** — 38/38 internal links & images return 200; prev/next/home nav works.
- [ ] **Deploy** — push `main` to Production (Vercel). *Pending — held per Publisher direction.*
- [ ] **Submit the URL in Google Search Console.** *Pending — after deploy.*
- [x] **Verified reachability from the homepage** — Home → The Journal → Weddings card → article (200; no orphan) on the local preview.
- [x] **Ran Lighthouse** — Desktop 97 / A11y 100 / BP 100 / **SEO 100**; Mobile 76 / 100 / 100 / 100. **CLS 0**; desktop LCP 1.3 s (mobile LCP inflated by the local server + simulated throttling).
- [x] **Confirmed no broken links** — article, images, card, og:image, and schema image all 200; no placeholder paths remain.

### Weddings — content cluster & internal-linking plan (topical authority)
*The Weddings collection is being built as a hub-and-spoke cluster around the primary keyword **luxury wedding cigar lounge**. `why-cigar-lounge-wedding.html` is the **pillar** (the emotional "why"). Each companion (spoke) owns a distinct sub-intent and keyword set, links **up** to the pillar with a descriptive anchor, and links **across** to its sibling; the pillar links **down** to each spoke. No spoke is linked live until it is itself published with its own photography.*

| Role | Title | Slug | Owns (keywords) | Status |
|---|---|---|---|---|
| **Pillar** | Why a Cigar Lounge Becomes the Most Memorable Part of a Wedding | `why-cigar-lounge-wedding.html` | luxury wedding cigar lounge; why guests gather; wedding after party (the hour) | **Published** *(Vol 03)* |
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
