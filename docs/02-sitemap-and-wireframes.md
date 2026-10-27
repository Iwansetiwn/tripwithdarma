# Sitemap and Wireframes

Design direction: **B. Trail Map** (approved). Mobile-first; a sticky WhatsApp bar sits at the bottom of every page on phones.

## Sitemap

```
/                                   Home                         "Munduk hiking guide"
├── /tours/                         Hikes overview               "Munduk trekking"
│   ├── /tours/twin-lakes-forest-trek/            "Twin Lakes Bali hike"
│   ├── /tours/munduk-waterfalls-trek/            "Munduk waterfall tour"
│   └── /tours/twin-lakes-and-waterfalls-day-hike/ "private hiking guide North Bali"
├── /meet-your-guide/               About Ketut                  "Munduk local guide"
├── /reviews/                       Tripadvisor reviews          "Munduk hiking guide reviews"
├── /blog/                          Hiking guides                "Munduk hiking guides"
│   ├── /blog/best-time-to-hike-the-twin-lakes/
│   ├── /blog/munduk-hiking-packing-list/
│   └── … 8 drafts (see 03-seo-plan.md)
├── /faq/                           FAQ                          "Munduk hiking FAQ"
├── /contact/                       Contact, map, service area   "Munduk hiking guide contact"
└── /404                            Not found (noindex)

Generated: /sitemap-index.xml, /robots.txt, /site.webmanifest, favicons
Redirects: /about/ → /meet-your-guide/, /hikes/ → /tours/   (public/_redirects)
Future:    /id/… Indonesian mirror (hreflang already in place for en + x-default)
```

## Wireframes (mobile order; desktop uses two columns where noted)

### Home
```
┌──────────────────────────────┐
│ Logo                     ☰   │  header (desktop: nav + WhatsApp pill)
├──────────────────────────────┤
│ MUNDUK · BUYAN · TAMBLINGAN  │  hero on canopy green + contour lines
│ HIKE MUNDUK'S TWIN LAKES     │  H1
│ WITH A LOCAL GUIDE           │
│ Short intro                  │
│ [ Book on WhatsApp ] [Hikes] │
│ ★ Rated x/5 on Tripadvisor   │  (only when filled in)
│ [ hero photo ] (desktop right; hidden on phone until a photo exists)
├──────────────────────────────┤
│ CHOOSE YOUR MUNDUK HIKE      │  tour cards: photo, name,
│ ┌──────────┐ ┌──────────┐    │  [4 h][km][Moderate][IDR …]
│ │ card     │ │ card     │ …  │  summary, [Book] Details →
├──────────────────────────────┤
│ WHY HIKE WITH KETUT          │  4 icon points
├──────────────────────────────┤
│ [portrait]  MEET KETUT       │  intro, languages, licence, → story
├──────────────────────────────┤
│ WHAT HIKERS SAY              │  3 real Tripadvisor excerpts + link
├──────────────────────────────┤
│ THE MUNDUK HIGHLANDS  [map]  │  illustrated area map (SVG)
├──────────────────────────────┤
│ QUESTIONS BEFORE YOU HIKE    │  5 FAQ accordions → all questions
├──────────────────────────────┤
│ PLAN YOUR MUNDUK TRIP        │  latest 3 blog posts
├──────────────────────────────┤
│ READY FOR THE TWIN LAKES?    │  final CTA
├──────────────────────────────┤
│ Footer: NAP, hikes, links    │
└──────────────────────────────┘
[ sticky: Book on WhatsApp ]      phones only
```

### Hike page
```
Breadcrumbs › H1 hike name › summary
[duration][distance][difficulty][price]  [Book on WhatsApp]      (cover photo right on desktop)
──────────────────────────────────────────────────────────────
Main column                              │ Booking card (sticky on desktop)
• Highlights (ticks)                     │  Price / unit
• Description (rich text)                │  Duration · Distance · Difficulty
• Itinerary timeline (time ◆ step)       │  Group · Start · Meeting point
• Elevation profile (when data entered)  │  Pickup note
• Included / Not included                │  Date [    ]  People [  ]
• What to bring                          │  [ Book on WhatsApp ] (message pre-filled)
• Pickup & meeting point                 │
• Photo gallery                          │
──────────────────────────────────────────────────────────────
Reviews for this hike → Other hikes
[ sticky: price/duration · Book on WhatsApp ]   phones only
```

### Meet your guide
```
H1 Ketut Darma · role
[portrait]  Intro (large) · story paragraphs
            Facts: home village · years guiding · languages · certifications
            Promises (ticks) · [Ask Ketut on WhatsApp]
Reviews about Ketut
```

### Reviews
```
H1 Hiker reviews
★ rating · count · Read all on Tripadvisor
Review cards (real excerpts, reviewer, date, link to original)
Optional official Tripadvisor widget (lazy-loaded when scrolled into view)
```

### Blog index / post
```
Index: H1 + grid of post cards (photo, date, title, description)
Post:  breadcrumbs · H1 · author (links to Ketut) · date · cover · article
       CTA box "Hike it with a local guide" · related hike cards
```

### FAQ
```
H1 · topic chips (Booking, Weather, Fitness, What to wear, Cancellations, Pickup)
Accordion groups per topic · "Still wondering?" WhatsApp CTA
```

### Contact
```
H1 · [Message on WhatsApp]
Left: WhatsApp · email · address (NAP) · hours · service area chips · how to get to Munduk
Right: illustrated map with [Show Google Map] (click-to-load iframe) · Open in Google Maps
```
