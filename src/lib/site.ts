import { getCollection, getEntry } from 'astro:content';

export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('Missing src/content/settings/site.json');
  return entry.data;
}

export async function getGuide() {
  const entry = await getEntry('guide', 'guide');
  if (!entry) throw new Error('Missing src/content/settings/guide.json');
  return entry.data;
}

export async function getReviews() {
  const entry = await getEntry('reviews', 'reviews');
  return entry?.data ?? { reviews: [], rating: undefined, reviewCount: undefined, widgetCode: undefined };
}

/** True when there is something real to show in a reviews block: quoted reviews or a Tripadvisor link. */
export async function hasReviews() {
  const [data, site] = await Promise.all([getReviews(), getSite()]);
  return data.reviews.length > 0 || Boolean(site.tripadvisorUrl);
}

export async function getFaq() {
  const entry = await getEntry('faq', 'faq');
  return entry?.data.items ?? [];
}

export async function getTours() {
  const tours = await getCollection('tours', ({ data }) => !data.draft);
  return tours.sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** wa.me link. Without a number it opens WhatsApp's contact picker with the text filled in. */
export function waLink(number: string | undefined, message: string) {
  const digits = (number ?? '').replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(tourName: string, date = '[date]', people = '[number]') {
  return `Hi Ketut, I'd like to book the ${tourName} for ${date}, ${people} people.`;
}

export function formatPrice(price: number | undefined, currency: 'IDR' | 'USD') {
  if (price == null || price <= 0) return undefined;
  return currency === 'IDR'
    ? `IDR ${price.toLocaleString('en-US')}`
    : `USD ${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Escapes CMS text and turns *words* into <em>words</em> for coloured headline accents. */
export function accent(text: string) {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*(.+?)\*/g, '<em>$1</em>');
}
