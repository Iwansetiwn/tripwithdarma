# SEO Plan

## Keyword map (one primary keyword per page)

| Page | Primary keyword | Supporting keywords | Title tag |
|---|---|---|---|
| `/` | Munduk hiking guide | Munduk trekking, Twin Lakes Bali, local guide Munduk | Munduk Hiking Guide \| Twin Lakes Treks with Ketut Darma |
| `/tours/` | Munduk trekking | Munduk trekking tours, Munduk hikes | Munduk Trekking Tours \| Private Hikes with a Local Guide |
| `/tours/twin-lakes-jungle-hike-canoe-waterfall/` | Twin Lakes Bali hike | Lake Tamblingan trekking, Tamblingan canoe, Pura Ulun Danu Tamblingan, Banyumala waterfall | Twin Lakes Jungle Hike, Canoe & Waterfall \| Munduk, North Bali |
| `/tours/munduk-waterfalls-trek/` | Munduk waterfall trekking | Munduk waterfall tour, Melanting waterfall, Golden Valley waterfall | Munduk Waterfall Trekking \| Private Waterfall Hike with a Local Guide |
| `/tours/sekumpul-ulun-danu-jatiluwih/` | Sekumpul Ulun Danu Jatiluwih tour | Sekumpul waterfall tour, Ulun Danu Beratan, Jatiluwih rice terraces, North Bali day tour | Sekumpul Waterfall, Ulun Danu Beratan & Jatiluwih Day Tour \| North Bali |
| `/meet-your-guide/` | Munduk local guide | Ketut Darma, private guide Munduk | Meet Ketut Darma \| Your Local Munduk Hiking Guide |
| `/reviews/` | Munduk hiking guide reviews | Ketut Darma Tripadvisor | Reviews \| Munduk Hiking with Ketut Darma on Tripadvisor |
| `/faq/` | Munduk hiking FAQ | what to wear hiking Bali, Munduk weather | Munduk Hiking FAQ \| Booking, Weather, Fitness & What to Wear |
| `/blog/` | Munduk hiking guides | Twin Lakes tips | Munduk Hiking Guides \| Twin Lakes Tips, Seasons & Packing Lists |
| `/contact/` | Munduk hiking guide contact | how to get to Munduk | Contact Ketut Darma \| Munduk Hiking Guide, North Bali |

If Ketut offers a canoe ride on Tamblingan, add "Lake Tamblingan canoe" to the Twin Lakes hike (it is a frequent
search phrase and marketplace title).

## On-page rules (already built in)

- Unique `<title>` and meta description per page (editable per hike/post in Pages CMS).
- One `<h1>` per page; H2 for sections, H3 for items. Clean, lowercase, hyphenated URLs with trailing slashes.
- Canonical URL, Open Graph and Twitter card on every page. Social image = the page's photo (cropped 1200×630) or `og-default.jpg`.
- Every photo field has a matching "description" field used as alt text. Write what is in the photo, e.g. "Hikers on the forest trail above Lake Tamblingan in the morning mist".
- Internal links: tour cards on home, blog posts link to related hikes, footer lists all hikes.

## Structured data (JSON-LD)

| Page | Types |
|---|---|
| Home | `TravelAgency` (NAP, area served, languages, sameAs links), `Person` (Ketut), `WebSite` |
| Hikes overview | `TravelAgency`, `ItemList` of hikes, `BreadcrumbList` |
| Hike page | `TouristTrip` (itinerary as `ItemList`, `Offer` when a price is set, provider), `TravelAgency`, `BreadcrumbList` |
| Meet your guide | `ProfilePage` → `Person` (languages, credentials) |
| FAQ | `FAQPage` |
| Blog post | `BlogPosting` (author = Ketut, dates, image), `Person`, `BreadcrumbList` |
| Contact | `ContactPage`, `TravelAgency` |

**Aggregate rating: deliberately not used.** Google does not show review stars for `LocalBusiness`/`Organization`
pages when the reviews are shown on the business's own site ("self-serving reviews", Google Search Central, 2019),
and the Tripadvisor reviews are not collected by this site. Stars will come from the Google Business Profile.

Test after launch with the [Rich Results Test](https://search.google.com/test/rich-results) and the
[Schema Markup Validator](https://validator.schema.org/).

## Technical

- `sitemap-index.xml` (auto, drafts excluded), `robots.txt` pointing to it, `404` page with `noindex`.
- Static HTML, self-hosted fonts (preloaded), responsive AVIF/WebP images, lazy loading below the fold.
- Third-party code kept off the critical path: Google Map loads on click, Tripadvisor widget loads on scroll, GA4 loads after the page is idle.
- Lighthouse (mobile, local build with placeholders): 100 / 100 / 100 / 100 on all pages; LCP ≈ 1.2 s, CLS 0. Re-test after real photos are added.
- hreflang-ready: `en` + `x-default` now; add `id` alternates when an Indonesian version is created under `/id/`.

## Local SEO: NAP consistency

Use exactly the same **Name, Address, Phone** everywhere (website footer, contact page, Google Business Profile,
Tripadvisor, Instagram/Facebook bio):

```
Trip with Darma (Ketut Darma)
[street / banjar], Munduk, Banjar, Buleleng, Bali 81152, Indonesia
+62 [WhatsApp number]
```

The site reads these from `src/content/settings/site.json`, so update them once there.
The Google Business Profile setup checklist is in [04-launch-checklist.md](04-launch-checklist.md).

## 10 blog posts

Two are written and published; eight are drafts with outlines in `src/content/blog/` (open them in Pages CMS,
write under the headings, then switch off "Hidden (draft)").

| # | Title | Primary keyword | Status | Outline |
|---|---|---|---|---|
| 1 | Best Time to Hike the Twin Lakes in Munduk | best time to hike Twin Lakes Bali | Published | Dry season · wet season · best time of day · temperature · ceremonies · summary table |
| 2 | Munduk Hiking Packing List | Munduk hiking packing list | Published | Shoes · clothes · temple clothes · daypack · leeches · printable checklist |
| 3 | Lake Tamblingan vs Lake Buyan | Lake Tamblingan vs Lake Buyan | Draft | Quick answer · each lake · comparison table · the forest ridge · one-morning choice · respect · FAQ |
| 4 | How to Get to Munduk from Ubud (and the Airport) | Ubud to Munduk | Draft | Times · private driver · scooter · shuttle · from airport/south · route via Bedugul · stops · stay overnight |
| 5 | Munduk Waterfalls: A Local Guide | Munduk waterfalls | Draft | Map · each fall · walking between · fees · season · safety · guided vs alone |
| 6 | How Hard Is the Twin Lakes Hike? | Twin Lakes Bali hike difficulty | Draft | Quick answer · terrain · distance/elevation · seasons · kids/older hikers · alternatives · preparation |
| 7 | Pura Ulun Danu Tamblingan: The Temple on the Lake | Pura Ulun Danu Tamblingan | Draft | What & where · history · what you'll see · etiquette · fee · visiting on the trek |
| 8 | Hiking in Munduk in the Rainy Season | Munduk rainy season hiking | Draft | Rain patterns · trail conditions · leeches · packing · green-season upside · postponements |
| 9 | Do You Need a Guide to Hike in Munduk? | Munduk trekking guide | Draft | Trails alone · what a guide adds · private vs group vs marketplace · cost · choosing a guide |
| 10 | Munduk Itinerary: 2 Days in the Highlands | Munduk itinerary | Draft | Day 1 lakes · Day 1 afternoon · Day 2 waterfalls · coffee & cloves · where to stay · transport · rain plan |

Publishing rhythm: one post every 2–3 weeks. Each post should link to at least one hike page and end with the WhatsApp CTA (built in).
