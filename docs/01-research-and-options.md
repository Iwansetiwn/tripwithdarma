# Step 1 — Research and Options

Project: website for **Ketut Darma**, local hiking guide in Munduk, North Bali (Twin Lakes: Buyan and Tamblingan).
Goal: mobile visitors → WhatsApp bookings. Status: **awaiting approval before build.**

---

## 1. Research summary

### What the search results look like today

Searches for "Munduk hiking", "Munduk trekking guide" and "Lake Tamblingan trekking" are dominated by marketplaces:
Tripadvisor, GetYourGuide, Expedia/Travelocity, Airbnb Experiences and Klook. Very few independent Munduk guides
have their own site, and the ones that do usually leave out prices, itineraries or inclusions.

That is the opening for Ketut: **the most complete, transparent page for each hike** (price, timeline, difficulty,
what's included, pickup, map, real guide, real reviews), backed by a strong Google Business Profile for map results.
Marketplaces will keep the generic head terms; Ketut can win long-tail and local searches ("private Twin Lakes
hiking guide", "Lake Tamblingan trek with local guide", "how to get to Munduk from Ubud").

### Reference sites

| # | Site | Type | What works | What to avoid |
|---|------|------|-----------|---------------|
| 1 | [Munduk Trekking Guide](https://munduktrekkingguide.wordpress.com/) | Direct local competitor, Munduk | Tour cards show **duration, price and group size** up front (e.g. 3 waterfalls, 2 h, Rp250,000 per guide). WhatsApp is the main CTA. Included / not-included list. Blog targets "best time", "trekking map", "5 waterfalls". | Free WordPress.com theme, an off-topic promo bar, no clear guide identity. |
| 2 | [Rinjani Dawn Adventures](https://rinjanidawnadventures.com/) | Small trekking company, Lombok | Keyword-led H1 ("Mount Rinjani Treks & Lombok Adventures – Led by Local Experts"). Four value-prop blocks. Awards (Tripadvisor Travellers' Choice). FAQ with H3 questions. Responsible-trekking story. | No prices or tour cards on the homepage, no WhatsApp (phone + form only), 17-item tour menu. |
| 3 | [Sapa Sisters](https://www.sapasisters.com/) | Local guide collective, Vietnam | **The guide is the hero**: a named guide's photo, a guide photo strip, and an ownership story (Hmong, women-led). WhatsApp in the header. Blog targets comparison and packing keywords ("Ha Giang vs Sapa"). | No tour cards or prices on the homepage; heavy cookie banner. |
| 4 | [The Getaway Camp Bali – Private Trekking Tour Munduk](https://www.thegetawaycampbali.com/private-trekking-tour-munduk/) | Local operator, Munduk | WhatsApp number in the header and footer. Links to Tripadvisor and Airbnb listings as proof. | No price, no itinerary, no inclusions. Visitors must message just to learn the basics. |
| 5 | [Airbnb Experiences – Munduk Twin Lakes trek & canoe](https://www.airbnb.ca/experiences/7185358) | Marketplace listing, Munduk | The format travelers already trust: host photo and name, years guiding, "what you'll do" step list, included items as icons, group size, review quotes next to a sticky price/book bar on mobile. | Ketut doesn't control ranking, fees or the customer relationship. |
| 6 | [Tripadvisor – Munduk Hiking & Camping Tours](https://www.tripadvisor.com/Attractions-g608490-Activities-c61-t219-Munduk_Banjar_Buleleng_Regency_Bali.html) / [GetYourGuide – Munduk Hiking](https://www.getyourguide.com/munduk-l164885/hiking-tc71/) | Marketplaces that rank for the head terms | Fact badges at the top of every tour (duration, free cancellation, pickup, language). Highlights as bullets. Meeting point with a map. | Generic copy, the same itinerary resold by many operators. |
| 7 | [Bali Jungle Trekking – Munduk Waterfall & Trekking Tour](https://balijungletrekking.com/product/munduk-waterfall-jungle-trekkung-tour/) | Independent Bali trekking site | Descriptive, keyword-rich product title ("Munduk Waterfall & Trekking Tour, Balinese Coffee Making, Local Lunch") and a visible per-person price (USD 65). | Site returned HTTP 503 when checked; slow/unreliable hosting costs bookings. |

### Patterns to copy

1. **Price, duration and difficulty visible before the first scroll** on every tour card and tour page.
2. **The guide's face and name** near the top. People book a person, not a company.
3. **Timeline itinerary** ("08:00 pickup → 08:45 trailhead at Tamblingan → …").
4. **Included / not included** as two short lists.
5. **One CTA, repeated**: "Book on WhatsApp" in the hero, on each tour card, at the end of each tour page, and as a sticky bar on mobile.
6. **Real reviews next to the CTA**, with a link to the full Tripadvisor profile.
7. **FAQ answering the fears**: rain, leeches and mud, fitness, shoes, cancellation, pickup area.
8. **Blog posts that answer planning questions** (best time, packing list, lake comparison, getting there).

### Rules confirmed during research

- **No aggregate rating schema on Ketut's own site.** Google treats reviews about a business shown on that
  business's own site (in markup or via an embedded widget) as "self-serving" and does not show review stars for
  `LocalBusiness`/`Organization` in that case ([Google, 2019](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful)).
  Ketut's stars in Google will come from his **Google Business Profile**, which is unaffected. On the site we show the
  Tripadvisor rating and selected real reviews as visible content with a link, and no `aggregateRating` markup.
- **Tripadvisor**: the Widget Center offers free rating and review widgets for listed businesses
  ([Tripadvisor](https://www.tripadvisor.com/ForRestaurants/r832)). Widgets are third-party JavaScript, so we load
  them only on the Reviews page, lazily. Elsewhere we use short quoted excerpts (reviewer name, date, link to the
  original). I could not retrieve Tripadvisor's current badge/quote terms in full; Ketut should confirm them in his
  Tripadvisor Management Center before launch.
- **WhatsApp is the expected channel in Bali.** Klook tells travelers to install WhatsApp because local operators use it.

### Keyword refinements

The keywords in the brief stay. Research adds these, because competitors and marketplaces use them in titles:

- "Munduk waterfall trekking" / "Munduk waterfall trek" (very common product phrasing)
- "Twin Lakes trekking and canoe" / "Lake Tamblingan canoe" (canoe is a frequent add-on; only use if Ketut offers it)
- "Munduk local guide" / "private guide Munduk"
- "Banyumala waterfall hike" (often paired with the Twin Lakes)
- "Pura Ulun Danu Tamblingan" (temple on the lake trail, informational)

Each page gets one primary keyword in Step 2.

---

## 2. Design directions

All three use the WhatsApp brand green **#25D366 with dark text** for the booking button (8.8:1 contrast;
white text on that green fails at 2:1). That keeps the button instantly recognisable without breaking accessibility.

### A. Misty Lakes

- **Mood**: Calm, quiet, photographic. Early morning mist on Tamblingan, still water, old forest. Big photos, lots of air, few words.
- **Palette**: Lake `#1E4D5C` · Fern `#3E6B48` · Mist `#EEF2F0` · Basalt `#18211F` · Marigold `#E2A63B` (highlights)
- **Fonts**: Newsreader (headings) + Public Sans (body)
- **Homepage order**: full-bleed lake photo hero with headline + WhatsApp → 3 tour cards → "Walk with Ketut" intro with portrait → why choose Ketut (4 points) → reviews → photo strip → FAQ → blog → final CTA over a misty photo.
- **Logo/favicon**: two overlapping ovals (Buyan and Tamblingan) with a thin horizontal mist line through them; wordmark in Newsreader.
- **Risk**: needs excellent photos. Weak or few photos make the whole site look empty.

### B. Trail Map (recommended)

- **Mood**: Practical, outdoorsy, trustworthy. Borrowed from trail maps and signposts: contour lines, trail-marker colour, elevation profiles. Feels like a real guide who knows the ground.
- **Palette**: Canopy `#1E3B2C` · Lake `#2C6E7F` · Mist `#F2F5F1` · Basalt `#151B17` · Marker `#E4572E` (difficulty badges, highlights)
- **Fonts**: Barlow Condensed (headings, signpost feel) + Source Sans 3 (body). Both are variable, compact and fast.
- **Homepage order**: hero (photo + headline + "Book on WhatsApp" + Tripadvisor rating line) → tour cards with a fact row (hours · km · difficulty · price) → why choose Ketut → meet Ketut → reviews → Twin Lakes area map (static illustrated SVG) → FAQ → blog → final CTA.
- **Tour pages**: a small elevation profile per hike (the lakes sit around 1,200 m), a timeline itinerary and a facts strip.
- **Logo/favicon**: a rounded-square trail sign with two lake shapes joined by a dotted trail; wordmark in Barlow Condensed caps.
- **Risk**: can feel technical if overdone; Ketut's portrait and story keep it personal.

### C. Kampung Craft

- **Mood**: Warm, cultural, personal. Inspired by woven bamboo, temple sandstone (paras) and canang offerings. Village life and Balinese hospitality first, hiking second.
- **Palette**: Volcanic stone `#2B2A28` · Paras `#EFEDE8` · Bamboo `#C9A86A` · Temple moss `#5C7350` · Canang red `#B23A48`
- **Fonts**: Alegreya (headings) + Alegreya Sans (body)
- **Homepage order**: Ketut's portrait hero ("Hike Munduk with Ketut, born here") → his story in 3 lines → tours → village & culture moments → reviews → FAQ → blog → final CTA.
- **Logo/favicon**: a 2×2 woven-bamboo tile containing a "KD" monogram.
- **Risk**: weaker for search intent ("hiking", "trekking") and needs strong personal photos of Ketut.

### Recommendation: B. Trail Map

1. **It answers the booking questions fastest.** Hours, km, difficulty and price are part of the visual language, which is exactly what mobile visitors scan for (and what local competitors leave out).
2. **It doesn't depend on perfect photos.** Contours, maps and elevation profiles carry the design while photos are pending, and it still looks great when good photos arrive.
3. **It stands apart from the marketplaces** (white, generic) and from the "Bali villa" look (cream, gold, serif) that most Bali sites use.
4. **It suits SEO.** Tour pages naturally carry distance, elevation, duration, start point and route — the details that help both Google and travelers.
5. We borrow C's warmth for the **About Ketut** page (portrait, village story) so the trust builder stays personal.

---

## 3. Tech stack options

| | 1. Astro static site + Pages CMS on Cloudflare Pages | 2. WordPress (lightweight theme) on shared hosting | 3. Hosted builder (Wix / Squarespace) |
|---|---|---|---|
| **Speed** | Best. Plain HTML, near-zero JavaScript, built-in image optimisation (WebP/AVIF, responsive sizes). Lighthouse 95+ is realistic. | Good if kept lean (GeneratePress/Kadence, few plugins). Tends to slow down as plugins pile up. | Weakest. Heavy scripts; 90+ mobile Lighthouse is hard. |
| **Cost / year** | Domain only (~USD 10–15). Hosting and SSL free. | Hosting USD 40–100 + domain. | USD 200–400 + domain. |
| **Ease of editing for Ketut** | Simple web forms (tours, prices, photos, reviews, blog) at app.pagescms.org. Needs a free GitHub login, which we set up for him. | Familiar WordPress editor; many tutorials in Indonesian. | Easiest, drag-and-drop, phone app. |
| **Maintenance** | None. No plugins, no updates, nothing to hack. | Monthly core/plugin updates; security risk if ignored. | None. |
| **Hosting & SSL** | Cloudflare Pages: free, global CDN (incl. Singapore/Jakarta edges), automatic SSL. | Host-provided Let's Encrypt SSL. | Included. |
| **Backups** | Automatic: every edit is a saved version in GitHub; any change can be rolled back. | Needs a backup plugin or host backups. | Platform-managed; no export of the full site. |
| **SEO control** | Full: custom schema per page, clean URLs, sitemap, hreflang-ready. | Full with Yoast/Rank Math. | Partial; limited schema control. |

**Recommendation: Option 1 (Astro + Pages CMS + Cloudflare Pages).** It is the only option that hits the
performance targets reliably, costs only the domain, and never needs updates. Pages CMS is free, open source and
writes changes straight to the GitHub repo, so every edit is versioned. I avoid Netlify Identity–based CMS login
because its future has been uncertain. If the GitHub login turns out to be too much for Ketut, Sveltia CMS on the
same site is a drop-in alternative with other login options.

Analytics for WhatsApp click tracking is decided in Step 2 (GA4 events with a light consent banner, or a cookieless
tool such as Plausible). Every WhatsApp link will carry the tour name so we can count booking intent per tour.

---

## 4. What I need from you before building

1. **Brand name and domain.** The repo is `tripwithdarma` — is the brand "Trip with Darma", and is `tripwithdarma.com` registered?
2. **WhatsApp number** (and whether Ketut wants a separate business number).
3. **Tours**: name, duration, distance if known, difficulty, price (IDR, USD, or both; per person or per group), inclusions, meeting point / pickup area, and add-ons (canoe? lunch? coffee plantation?).
4. **Tripadvisor URL** and **Google Business Profile URL** (or confirm we need to create the GBP).
5. **Languages** Ketut speaks, and any **guide licence** (e.g. HPI membership) or first-aid certificate.
6. **Photos** and Ketut's profile/experience (you said these come later — the build can start with placeholders).
7. **Approval**: Direction B and Tech Option 1, or your preferred alternatives.
