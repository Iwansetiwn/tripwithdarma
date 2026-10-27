# Trip with Darma

Website for **Ketut Darma**, private hiking guide in Munduk, North Bali (Twin Lakes: Lake Buyan and Lake Tamblingan).
Live domain: **https://tripwithdarma.my.id**. All bookings go to WhatsApp.

- **Framework:** [Astro](https://astro.build) 7, static output, near-zero JavaScript
- **Editing:** [Pages CMS](https://pagescms.org) (config in `.pages.yml`)
- **Hosting:** Cloudflare Pages (free, automatic SSL, global CDN)

## Documents

| File | What it is |
|---|---|
| [docs/01-research-and-options.md](docs/01-research-and-options.md) | Research, design directions, tech stack decision |
| [docs/02-sitemap-and-wireframes.md](docs/02-sitemap-and-wireframes.md) | Site structure and page wireframes |
| [docs/03-seo-plan.md](docs/03-seo-plan.md) | Keyword map, meta, structured data, 10 blog outlines |
| [docs/04-launch-checklist.md](docs/04-launch-checklist.md) | Deploy, DNS, Search Console, Google Business Profile, analytics, content to confirm |
| [docs/owner-guide-en.md](docs/owner-guide-en.md) | One-page editing guide for Ketut (English) |
| [docs/panduan-pemilik-id.md](docs/panduan-pemilik-id.md) | Panduan edit satu halaman untuk Ketut (Bahasa Indonesia) |
| [docs/brand/](docs/brand/) | Logo mark and horizontal logo files |

## Where content lives

| Content | File(s) | Edited in Pages CMS as |
|---|---|---|
| Hikes | `src/content/tours/*.md` | Hikes / Tours |
| Blog posts | `src/content/blog/*.md` | Blog / Guides |
| Reviews | `src/content/settings/reviews.json` | Reviews |
| FAQ | `src/content/settings/faq.json` | FAQ |
| Ketut's profile | `src/content/settings/guide.json` | About Ketut |
| Contact, WhatsApp, links, homepage text | `src/content/settings/site.json` | Site settings & contact |
| Photos | `src/assets/images/` | Media (referenced as `/images/...`) |

Photos in `src/assets/images` are converted to AVIF/WebP in several sizes at build time. Empty photo fields show a
designed "Photo coming soon" placeholder, so the site can launch before photos are ready.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run check      # type and content checks
npm run icons      # regenerate favicons, logo.png and og-default.jpg (needs Playwright for the social image)
```

Node 22.12 or newer is required (see `.nvmrc`).

## How booking works

- Every "Book on WhatsApp" button is a `wa.me` link with a pre-filled message:
  "Hi Ketut, I'd like to book the [Tour Name] for [date], [number] people."
- On hike pages, the date and group-size fields fill the message in before WhatsApp opens.
- If `whatsapp` in `site.json` is empty, links still work but WhatsApp asks the visitor to choose a contact.
  **Set the number before launch.**
- Each tap fires a GA4 event `whatsapp_click` with `tour`, `placement` and `page` parameters (when a GA4 ID is set).

## SEO notes

- One primary keyword per page; unique titles and descriptions; canonical, Open Graph and Twitter tags on every page.
- JSON-LD: `TravelAgency`, `Person`, `WebSite`, `TouristTrip` per hike, `FAQPage`, `BlogPosting`, `BreadcrumbList`.
- **No `aggregateRating`.** Google treats reviews shown on a business's own site as self-serving, so review stars
  would not appear anyway. Stars in Google come from the Google Business Profile.
- `sitemap-index.xml` and `robots.txt` are generated/included automatically. Draft posts are excluded.
- hreflang-ready: `en` and `x-default` alternates are in `src/layouts/Base.astro`; add an `id` alternate when an
  Indonesian version is added under `/id/`.
