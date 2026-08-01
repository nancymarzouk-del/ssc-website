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

**Activation checklist (when wedding photography is ready):**
1. Produce dedicated, non-reused photography for the seven `.ph` frames + a hero and a `…-hero.webp`/`.jpg` for the card, og:image, and schema image.
2. Replace the `.ph` placeholders in `why-cigar-lounge-wedding.html` with responsive, lazy-loaded WebP `<img>` (keep `fetchpriority="high"` on the hero).
3. Flip the page `robots` meta from `noindex, follow` → `index, follow, max-image-preview:large`.
4. Swap the `Weddings · Upcoming` teaser in `journal.html` for the staged Published card above.
5. Add the staged `<loc>` to `sitemap.xml`; bump `journal.html` `lastmod`.
6. Add reciprocal Related links from live pages where sensible (e.g. `autumn.html`, `client-appreciation-guide.html`) — do **not** edit the locked `art-of-the-cigar-moment.html`.
7. Move this row from *Drafts Held for Photography* to a numbered Weddings publication entry; verify the card → article → 200 and the live sitemap.

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
