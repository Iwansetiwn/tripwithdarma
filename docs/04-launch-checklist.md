# Launch Checklist

Work through the sections in order. Items marked **(you)** need a person with account access; everything else is already built.

## 1. Content to confirm before launch

All starter content was written from the brief and general knowledge of the area. It must be checked by Ketut.

- [ ] **WhatsApp number** in *Site settings* (digits only, e.g. `6281234567890`) and the display version (`+62 812-3456-7890`).
- [ ] **Address** (street/banjar, postal code 81152 to confirm) exactly as it will appear on Google Business Profile.
- [ ] **Map pin**: latitude/longitude from Google Maps (right-click the spot → copy coordinates).
- [ ] **Tripadvisor** and **Google Business Profile** links; Instagram/Facebook if used.
- [ ] **Each hike** (3 starter hikes are drafts): name, route, duration, distance, difficulty, **price** (empty = "Price on WhatsApp"), price unit, group size, start time, meeting point, pickup, included/not included, itinerary times. Add or delete hikes as needed.
- [ ] **Canoe ride**: offered? If yes, add to the Twin Lakes hike and its title/keywords.
- [ ] **About Ketut**: replace the placeholder story, add years guiding, home village, languages, licences/certificates (e.g. HPI membership, first aid).
- [ ] **FAQ**: especially the cancellation/deposit answer and pickup area.
- [ ] **Homepage** "Why choose Ketut" points: keep only claims that are true.
- [ ] **Reviews**: copy 3–6 real Tripadvisor reviews (name, date, text, link). Never edit the meaning or invent reviews. Add rating and review count.
- [ ] **Photos**: hero (landscape, ≥ 1600 px wide), Ketut portrait (portrait orientation), one cover per hike (≥ 1600 px), 3–9 gallery photos per hike. Fill in every photo description.
- [ ] Confirm Tripadvisor's current rules for quoting reviews and using badges in the Tripadvisor Management Center → Widgets/Marketing.

## 2. Publish the code (you)

- [ ] Merge the `claude/ecstatic-tesla-xsygp4` branch into `main` (Cloudflare and Pages CMS will both use `main`).

## 3. Hosting on Cloudflare Pages (you, ~15 min, free)

1. [ ] Create a free account at <https://dash.cloudflare.com>.
2. [ ] **Workers & Pages → Create → Pages → Connect to Git** → choose `Iwansetiwn/tripwithdarma`.
3. [ ] Build settings: Framework preset **Astro**, build command `npm run build`, output directory `dist`, production branch `main`.
4. [ ] Environment variable: `NODE_VERSION` = `22`.
5. [ ] Deploy. Check the `*.pages.dev` preview URL on your phone.

## 4. Domain `tripwithdarma.my.id` (you)

1. [ ] In Cloudflare: **Add a domain** → `tripwithdarma.my.id` → Free plan. Cloudflare shows two nameservers.
2. [ ] At the registrar where you bought the `.my.id` domain, replace the nameservers with Cloudflare's two. (Takes from minutes up to 24 h.)
3. [ ] In the Pages project → **Custom domains** → add `tripwithdarma.my.id` and `www.tripwithdarma.my.id`.
4. [ ] Add a redirect rule `www` → apex (Cloudflare: Rules → Redirect Rules → "Redirect from WWW to root" template).
5. [ ] Confirm `https://tripwithdarma.my.id` loads with a padlock (SSL is automatic).

## 5. Editing for Ketut: Pages CMS (you + Ketut, ~10 min)

1. [ ] Ketut creates a free GitHub account (email + password; enable two-factor login).
2. [ ] Repository owner: GitHub repo → **Settings → Collaborators → Add people** → Ketut's username (Write access).
3. [ ] Ketut opens <https://app.pagescms.org>, signs in with GitHub, opens `tripwithdarma`, branch `main`.
4. [ ] Make a small test edit (e.g. a FAQ answer), save, and confirm the live site updates within ~2 minutes.
5. [ ] Give Ketut the owner guide: [owner-guide-en.md](owner-guide-en.md) / [panduan-pemilik-id.md](panduan-pemilik-id.md).

Backups are automatic: every save is a version in GitHub and can be restored from the repository history.

## 6. Google Search Console (you)

1. [ ] <https://search.google.com/search-console> → **Add property → Domain** → `tripwithdarma.my.id`.
2. [ ] Verify with the DNS TXT record (Cloudflare → DNS → Add record → TXT, paste Google's value).
   Alternative: URL-prefix property and paste the meta code into *Site settings → Google Search Console verification code*.
3. [ ] **Sitemaps** → submit `https://tripwithdarma.my.id/sitemap-index.xml`.
4. [ ] **URL inspection** → request indexing for `/`, `/tours/` and each hike page.
5. [ ] After a week: check *Pages* (indexing) and *Enhancements* (breadcrumbs, FAQ) for errors.

## 7. Google Business Profile (you + Ketut)

This is what puts Ketut on Google Maps and gives star ratings in Google.

- [ ] Create or claim the profile at <https://business.google.com> with the **same name** as the website: "Trip with Darma" (or "Trip with Darma – Ketut Darma" only if that is the real-world name used everywhere).
- [ ] Primary category: **Tour operator**. Add a secondary category if a hiking/trekking-specific one is offered in the list.
- [ ] Business type: **service-area business** if there is no office guests visit; set the service area (Munduk, Gobleg, Wanagiri, Lake Buyan/Tamblingan area, Banjar, Buleleng).
- [ ] Phone = WhatsApp number (same format as the website). Turn on **chat/WhatsApp** if available.
- [ ] Website: `https://tripwithdarma.my.id/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- [ ] Hours: e.g. daily 07:00–18:00 (same as the website).
- [ ] Description (750 chars max): who Ketut is, the hikes, languages, area. No URLs or prices.
- [ ] **Products/Services**: add each hike with name, short description, price, photo and link to its page.
- [ ] Photos: logo (`public/logo.png`), cover (`docs/brand/logo-horizontal.png` or a lake photo), 10+ real hiking photos, and new photos monthly.
- [ ] Verify the profile (Google chooses the method: video, phone or postcard).
- [ ] Copy the "Ask for reviews" link and send it to happy guests after each hike (also ask for Tripadvisor reviews).
- [ ] Reply to every review, good or bad, within a few days.
- [ ] Add the GBP link to *Site settings → Google Business Profile link* (it then appears in the footer, contact page and `sameAs` schema).
- [ ] Use the same NAP on Tripadvisor, Instagram and Facebook.

## 8. Analytics and WhatsApp click tracking (you)

1. [ ] Create a GA4 property at <https://analytics.google.com> → Web data stream for `https://tripwithdarma.my.id`.
2. [ ] Paste the Measurement ID (`G-XXXXXXXXXX`) into *Site settings → Google Analytics 4 ID*. The site then loads GA after the page is idle and shows a small consent prompt.
3. [ ] In GA4 **Admin → Events**, after the first click arrives, mark `whatsapp_click` as a **key event**.
4. [ ] **Admin → Custom definitions** → add event-scoped dimensions `tour` and `placement` (where the button was: hero, tour-card, tour-booking, sticky, footer…).
5. [ ] Link GA4 to Search Console (Admin → Product links).
6. [ ] Optional, cookieless page views: Cloudflare Pages → project → **Metrics → Web Analytics → Enable**.

Reading the data: *Reports → Engagement → Events → whatsapp_click*, broken down by `tour`, shows booking intent per hike.

## 9. Final checks on launch day

- [ ] Tap every "Book on WhatsApp" button on a phone: WhatsApp opens to Ketut's number with the right hike name.
- [ ] Hike page: choose a date and group size → the WhatsApp message contains them.
- [ ] Contact page: "Show Google Map" loads the map at the right place.
- [ ] Share the homepage and one hike link in WhatsApp → the preview image and title look right.
- [ ] Run PageSpeed Insights (<https://pagespeed.web.dev>) on the home page and one hike page (mobile): target 90+ in all four scores.
- [ ] Rich Results Test on one hike page and the FAQ page.
- [ ] Remove the "DRAFT CONTENT" comments in hike files (Pages CMS removes them automatically when a hike is saved).
