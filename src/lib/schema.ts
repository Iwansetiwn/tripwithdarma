// JSON-LD builders. No aggregateRating anywhere: reviews shown on a business's own
// site are "self-serving" under Google's review snippet guidelines.
import type { CollectionEntry } from 'astro:content';
import { getSite, getGuide } from './site';

type Site = Awaited<ReturnType<typeof getSite>>;
type Guide = Awaited<ReturnType<typeof getGuide>>;

export const ORG_ID = 'https://tripwithdarma.my.id/#business';
export const PERSON_ID = 'https://tripwithdarma.my.id/#ketut';
export const WEBSITE_ID = 'https://tripwithdarma.my.id/#website';

const compact = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0)),
  );

export function businessSchema(site: Site, guide: Guide, origin: URL, image?: string) {
  const a = site.address;
  const sameAs = [site.tripadvisorUrl, site.googleBusinessUrl, site.instagramUrl, site.facebookUrl].filter(Boolean);
  return compact({
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: site.businessName,
    alternateName: `${site.guideName} – Munduk Hiking Guide`,
    description: site.tagline,
    url: origin.href,
    image,
    logo: new URL('/logo.png', origin).href,
    telephone: site.whatsapp ? `+${site.whatsapp.replace(/\D/g, '')}` : undefined,
    email: site.email,
    address: compact({
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: `${a.village}, ${a.district}`,
      addressRegion: `${a.regency}, ${a.province}`,
      postalCode: a.postalCode,
      addressCountry: a.country,
    }),
    geo:
      site.latitude != null && site.longitude != null
        ? { '@type': 'GeoCoordinates', latitude: site.latitude, longitude: site.longitude }
        : undefined,
    areaServed: site.serviceArea.map((name) => ({ '@type': 'Place', name })),
    openingHours: site.openingHours,
    knowsLanguage: guide.languages,
    founder: { '@id': PERSON_ID },
    sameAs,
  });
}

export function personSchema(guide: Guide, origin: URL, image?: string) {
  return compact({
    '@type': 'Person',
    '@id': PERSON_ID,
    name: guide.name,
    jobTitle: 'Hiking guide',
    description: guide.shortIntro,
    image,
    url: new URL('/meet-your-guide/', origin).href,
    knowsLanguage: guide.languages,
    worksFor: { '@id': ORG_ID },
    hasCredential: guide.certifications.map((name) => ({ '@type': 'EducationalOccupationalCredential', name })),
  });
}

export function websiteSchema(site: Site, origin: URL) {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, name: site.businessName, url: origin.href, inLanguage: 'en', publisher: { '@id': ORG_ID } };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  };
}

export function tourSchema(tour: CollectionEntry<'tours'>, url: string, image?: string) {
  const d = tour.data;
  return compact({
    '@type': 'TouristTrip',
    name: d.title,
    description: d.metaDescription,
    url,
    image,
    touristType: ['Hikers', 'Nature lovers'],
    provider: { '@id': ORG_ID },
    itinerary: d.itinerary.length
      ? {
          '@type': 'ItemList',
          numberOfItems: d.itinerary.length,
          itemListElement: d.itinerary.map((step, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: compact({ '@type': 'TouristAttraction', name: step.title, description: step.text }),
          })),
        }
      : undefined,
    offers:
      d.price && d.price > 0
        ? {
            '@type': 'Offer',
            price: d.price,
            priceCurrency: d.priceCurrency,
            availability: 'https://schema.org/InStock',
            url,
            description: d.priceUnit,
          }
        : undefined,
  });
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })),
  };
}

export function articleSchema(post: CollectionEntry<'blog'>, url: string, image?: string) {
  const d = post.data;
  return compact({
    '@type': 'BlogPosting',
    headline: d.title,
    description: d.description,
    url,
    mainEntityOfPage: url,
    image,
    datePublished: d.date.toISOString(),
    dateModified: (d.updated ?? d.date).toISOString(),
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
  });
}

export function graph(...nodes: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
