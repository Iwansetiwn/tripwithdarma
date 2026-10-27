import type { ImageMetadata } from 'astro';

// Pages CMS uploads into src/assets/images and writes "/images/<file>" into content.
// Map those paths to optimisable image modules.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function resolveImage(path?: string): ImageMetadata | undefined {
  if (!path) return undefined;
  const clean = path.replace(/^\.?\/?(src\/assets)?\/?images\//, '');
  return modules[`/src/assets/images/${clean}`]?.default;
}
