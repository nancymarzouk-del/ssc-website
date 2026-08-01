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
