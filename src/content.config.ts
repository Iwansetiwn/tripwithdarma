import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Pages CMS saves cleared fields as "" or null. Treat both as "not set".
const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);
const optString = z.preprocess(blankToUndefined, z.string().optional());
const optNumber = z.preprocess(blankToUndefined, z.coerce.number().optional());
const stringList = z.preprocess((v) => (v == null ? [] : v), z.array(z.string()));

// Image paths are stored as "/images/..." (see .pages.yml) and resolved in src/lib/images.ts.
const imagePath = optString;

const tours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: z.object({
    title: z.string(),
    shortTitle: optString,
    order: z.coerce.number().default(10),
    featured: z.boolean().default(true),
    draft: z.boolean().default(false),
    metaTitle: optString,
    metaDescription: z.string(),
    primaryKeyword: optString,
    summary: z.string(),
    duration: z.string(),
    durationHours: optNumber,
    distanceKm: optNumber,
    elevationGainM: optNumber,
    highestPointM: optNumber,
    difficulty: z.enum(['Easy', 'Moderate', 'Challenging']),
    price: optNumber,
    priceCurrency: z.enum(['IDR', 'USD']).default('IDR'),
    priceUnit: z.string().default('per person'),
    groupSize: optString,
    startTime: optString,
    meetingPoint: optString,
    pickup: optString,
    highlights: stringList,
    itinerary: z
      .preprocess((v) => (v == null ? [] : v), z.array(z.object({ time: optString, title: z.string(), text: optString })))
      .default([]),
    included: stringList,
    notIncluded: stringList,
    whatToBring: stringList,
    elevationProfile: z.preprocess((v) => (v == null ? [] : v), z.array(z.coerce.number())).default([]),
    cover: imagePath,
    coverAlt: optString,
    gallery: z
      .preprocess((v) => (v == null ? [] : v), z.array(z.object({ image: z.string(), alt: z.string().default('') })))
      .default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    metaTitle: optString,
    description: z.string(),
    date: z.coerce.date(),
    updated: z.preprocess(blankToUndefined, z.coerce.date().optional()),
    draft: z.boolean().default(false),
    primaryKeyword: optString,
    cover: imagePath,
    coverAlt: optString,
    relatedTours: stringList,
  }),
});

const site = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/settings' }),
  schema: z.object({
    businessName: z.string(),
    guideName: z.string(),
    tagline: z.string(),
    whatsapp: optString,
    phoneDisplay: optString,
    email: optString,
    address: z.object({
      street: optString,
      village: z.string(),
      district: z.string(),
      regency: z.string(),
      province: z.string(),
      postalCode: optString,
      country: z.string().default('ID'),
    }),
    latitude: optNumber,
    longitude: optNumber,
    serviceArea: stringList,
    openingHours: optString,
    mapQuery: z.string(),
    tripadvisorUrl: optString,
    googleBusinessUrl: optString,
    instagramUrl: optString,
    facebookUrl: optString,
    ga4Id: optString,
    googleSiteVerification: optString,
    defaultWhatsappMessage: z.string(),
    home: z.object({
      heroHeadline: z.string(),
      heroText: z.string(),
      heroImage: imagePath,
      heroImageAlt: optString,
      metaTitle: z.string(),
      metaDescription: z.string(),
      gallery: z.preprocess((v) => (v == null ? [] : v), z.array(z.object({ image: z.string(), alt: z.string().default('') }))),
      whyChoose: z.preprocess((v) => (v == null ? [] : v), z.array(z.object({ title: z.string(), text: z.string() }))),
    }),
  }),
});

const guide = defineCollection({
  loader: glob({ pattern: 'guide.json', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: imagePath,
    photoAlt: optString,
    shortIntro: z.string(),
    story: z.string(),
    yearsGuiding: optNumber,
    homeVillage: optString,
    languages: stringList,
    certifications: stringList,
    promises: stringList,
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: 'reviews.json', base: './src/content/settings' }),
  schema: z.object({
    rating: optNumber,
    reviewCount: optNumber,
    widgetCode: optString,
    reviews: z
      .preprocess(
        (v) => (v == null ? [] : v),
        z.array(
          z.object({
            author: z.string(),
            from: optString,
            date: optString,
            title: optString,
            text: z.string(),
            rating: optNumber,
            url: optString,
            tour: optString,
            featured: z.boolean().default(true),
          }),
        ),
      )
      .default([]),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: 'faq.json', base: './src/content/settings' }),
  schema: z.object({
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
        category: z.enum(['Booking', 'Weather', 'Fitness', 'What to wear', 'Cancellations', 'Pickup & meeting point']),
        onHome: z.boolean().default(false),
      }),
    ),
  }),
});

export const collections = { tours, blog, site, guide, reviews, faq };
