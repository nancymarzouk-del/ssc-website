# THE JOURNAL — PRODUCTION PUBLISHING WORKFLOW
*Version 1.0 · Internal process document. Not a served page.*

## Definition

**"Publish to Production" means publishing the ENTIRE Journal issue — atomically.**
It is triggered only by the Publisher's exact words: **"Publish to Production."**

A production deployment is **NOT complete** until **every** item in the checklist below is done. If any single item fails or is skipped, the deployment is **incomplete** and must be reported as such (do not report success).

This supersedes the earlier practice of publishing the article page alone. From now on, the article page **and** its full Journal integration ship together in the same "Publish to Production."

## The mandatory checklist (all required)

| # | Item | Concrete action |
|---|---|---|
| 1 | **Publish article** | Merge the approved article page to `main` so it is live at its canonical URL. |
| 2 | **Update `journal.html`** | Edit the front door to surface the new issue (the carousel is the front door's only content). |
| 3 | **Add to Featured Stories carousel** | Add a `.jx-cc jx-cc--photo` **Published** card to `.jx-shelf__track`, placed after existing published cards and before the Upcoming teasers. Card = cover image + `jx-cc__status--live` "Published" + `jx-cc__title` + `jx-cc__sub`, linking to the article. **Never replace or remove an existing featured card** — only add. |
| 4 | **Add to its editorial department** | Assign the piece to one department (The Host's Guide · The Pairing Table · Cigar Academy · The Art of Celebration · Celebration Files · Behind the Cart). Reflect it on the card and in the Manifest. |
| 5 | **Update Related Articles** | Ensure the article's own "Related Stories" cards are correct. Add reciprocal links from other **editable, unlocked** pieces where it makes sense. *Do not edit locked pages (e.g., `art-of-the-cigar-moment.html`) without explicit approval.* |
| 6 | **Update Previous / Next navigation** | If the department/issue has an ordered sequence, wire prev/next. If not applicable (single piece), the "← Back to The Journal" link stands in — note it as N/A. |
| 7 | **Update Journal Manifest** | Set the issue's status in `JOURNAL-MANIFEST.md` to **Published** (Volume / Department / Title / Slug / Status). |
| 8 | **Update `sitemap.xml`** | Add the article `<url>` (`loc` on the `www` host, `lastmod` = publish date, sensible `changefreq`/`priority`). Refresh `lastmod` on any page changed this publish (e.g., `journal.html`). |
| 9 | **Verify article in `sitemap.xml`** | Confirm the new `<loc>` is present and the file is served **200 / `application/xml`** at `https://www.simplysexycigars.com/sitemap.xml` (test with Googlebot UA too). |
| 10 | **Verify homepage reachability** | Confirm the article is reachable by navigating from the Journal homepage: the carousel card links to it and the destination returns **200**. No orphaned pages. |
| 11 | **Deploy production** | Push `main`; let Vercel auto-deploy production. |
| 12 | **Provide production URL** | Return the live article URL (and the Journal homepage URL). |
| 13 | **Confirm production verification** | Report the live checks: article 200, images 200, carousel card present, sitemap entry present, internal links resolve, no new orphans. |

## Completion gate
- **All 13 → report "Publication complete."**
- **Any failure → report "Publication incomplete," name the failed item(s), and stop for direction.** Do not claim success on a partial publish.

## Recommended pre-publish QA (learned from Vol 02)
Not part of the 13-item gate, but check and flag before/at publish:
- **Social/Schema image resolves** — `og:image` and the Article schema `image` must point to a real, live asset (not a placeholder path that 404s).
- **Image optimization** — photography should be WebP (site standard ~q90); flag large PNGs.
- **Structured data valid** — Article + BreadcrumbList + Organization parse; canonical on the `www` host.

## Standing constraints (always apply)
- **Preview first.** Issues are reviewed on a Vercel **Preview** (feature branch) and approved before "Publish to Production." Never publish to production without the exact trigger phrase.
- **Carousel = publications, departments, and cornerstone features — not every individual article.** A department card (or a cornerstone card) is appropriate; do not auto-card every article.
- **Locked pages are read-only** unless the Publisher explicitly authorizes a change (currently `art-of-the-cigar-moment.html`).
- **No reused photography between collections.** Each publication uses its own imagery; upcoming collections use abstract editorial covers.
- **Never remove, hide, or orphan a previously approved piece** to add a new one.

## Change log
- **v1.0** — Established. "Publish to Production" now means the full issue (article + `journal.html` + carousel + department + Related + Prev/Next + Manifest + sitemap + verification + deploy + confirmation), completed automatically and atomically.
