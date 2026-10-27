import { getImage } from 'astro:assets';
import { resolveImage } from './images';

/** 1200×630 JPEG for social previews, or undefined to fall back to the default card. */
export async function ogImageUrl(path?: string) {
  const img = resolveImage(path);
  if (!img) return undefined;
  const out = await getImage({ src: img, width: 1200, height: 630, fit: 'cover', format: 'jpg', quality: 80 });
  return out.src;
}
