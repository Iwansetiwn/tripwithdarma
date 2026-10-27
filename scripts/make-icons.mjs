// Generates the favicon set, logo PNG and default social preview image into public/.
// Run with: npm run icons   (icons need only sharp; the social image also uses Playwright if installed)
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = new URL('../', import.meta.url);
const pub = (f) => fileURLToPath(new URL(`public/${f}`, root));

const mark = (rx = 12, pad = 0) => {
  const s = 64 + pad * 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${s} ${s}">
  <rect x="${-pad}" y="${-pad}" width="${s}" height="${s}" rx="${rx}" fill="#1E3B2C"/>
  <ellipse cx="20" cy="40" rx="10" ry="7" fill="#2C6E7F"/><ellipse cx="44" cy="24" rx="10" ry="7" fill="#2C6E7F"/>
  <path d="M27 35C34 32 30 28 37 27" fill="none" stroke="#E4572E" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 5"/>
  <path d="M10 14h12" stroke="#E4572E" stroke-width="4" stroke-linecap="round"/></svg>`);
};

const png = (svg, size) => sharp(svg, { density: 600 }).resize(size, size).png().toBuffer();

await writeFile(pub('apple-touch-icon.png'), await png(mark(0), 180));
await writeFile(pub('icon-192.png'), await png(mark(12), 192));
await writeFile(pub('icon-512.png'), await png(mark(12), 512));
await writeFile(pub('icon-maskable-512.png'), await png(mark(0, 12), 512));
await writeFile(pub('logo.png'), await png(mark(12), 512));

// favicon.ico holding 16, 32 and 48 px PNGs.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(mark(12), s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
await writeFile(pub('favicon.ico'), Buffer.concat([header, ...images]));
console.log('Icons written.');

// Default social preview (1200×630), rendered in a browser so the brand fonts are used.
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  try {
    // Falls back to a global install found via NODE_PATH.
    ({ chromium } = createRequire(import.meta.url)('playwright'));
  } catch {}
}
if (!chromium) {
  console.log('Playwright not installed; skipped og-default.jpg.');
  process.exit(0);
}
const font = async (f) => (await readFile(pub(`fonts/${f}`))).toString('base64');
const html = `<!doctype html><html><head><style>
@font-face{font-family:B;font-weight:100 900;src:url(data:font/woff2;base64,${await font('fraunces-latin-wght-normal.woff2')}) format('woff2')}
@font-face{font-family:S;font-weight:200 900;src:url(data:font/woff2;base64,${await font('source-sans-3-latin-wght-normal.woff2')}) format('woff2')}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:#1E3B2C;color:#F2F5F1;font-family:S;position:relative}
svg.c{position:absolute;inset:0;width:100%;height:100%;opacity:.18}
.w{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:20px}
.top svg{width:84px;height:84px}
.name{font:600 46px/1 B;letter-spacing:-.01em}
.sub{font:600 20px/1 S;text-transform:uppercase;letter-spacing:.16em;color:#E4572E;margin-top:8px}
h1{font:560 84px/1.02 B;letter-spacing:-.02em;margin:0;max-width:960px}
.chips{display:flex;gap:12px;font:600 22px/1 S;text-transform:uppercase;letter-spacing:.06em}
.chips span{background:#F2F5F1;color:#151B17;padding:12px 16px;border-radius:6px}
.chips span.m{background:#E4572E}
</style></head><body>
<svg class="c" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#F2F5F1" stroke-width="1.4">
<path d="M120 260c40-140 240-220 400-180s220 180 140 280-300 120-420 60-160-60-120-160z"/><path d="M170 262c32-104 196-164 324-132s172 136 108 208-240 88-336 44-124-44-96-120z"/>
<path d="M222 264c24-72 144-112 240-88s124 92 76 144-172 60-244 28-92-28-72-84z"/><path d="M276 266c16-40 92-64 156-48s80 52 48 84-108 36-156 16-60-16-48-52z"/>
<path d="M-40 140c120-120 360-170 520-110s300 40 380-30"/><path d="M-40 420c160 30 260 120 420 80s300-40 460 20"/></g></svg>
<div class="w"><div class="top">${mark(12).toString()}<div><div class="name">Trip with Darma</div><div class="sub">Munduk hiking guide · North Bali</div></div></div>
<h1>Hike the Twin Lakes with a local guide</h1>
<div class="chips"><span>Lake Buyan</span><span>Lake Tamblingan</span><span>Waterfalls</span><span class="m">Book on WhatsApp</span></div></div>
</body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: 'png' });
await sharp(shot).jpeg({ quality: 82, mozjpeg: true }).toFile(pub('og-default.jpg'));
console.log('og-default.jpg written.');

// Horizontal logo lockups for social profiles, Google Business Profile and print.
for (const [file, bg, fg] of [['logo-horizontal.png', '#F2F5F1', '#1E3B2C'], ['logo-horizontal-dark.png', '#1E3B2C', '#F2F5F1']]) {
  await page.setViewportSize({ width: 1200, height: 300 });
  await page.setContent(`<!doctype html><html><head><style>
  @font-face{font-family:B;font-weight:100 900;src:url(data:font/woff2;base64,${await font('fraunces-latin-wght-normal.woff2')}) format('woff2')}
  @font-face{font-family:S;font-weight:200 900;src:url(data:font/woff2;base64,${await font('source-sans-3-latin-wght-normal.woff2')}) format('woff2')}
  html,body{margin:0;width:1200px;height:300px;background:${bg}}
  .l{display:flex;align-items:center;gap:36px;height:300px;padding:0 60px;box-sizing:border-box}
  .l svg{width:180px;height:180px}
  .n{white-space:nowrap;font:600 104px/1 B;color:${fg};letter-spacing:-.01em}
  .s{font:600 32px/1 S;text-transform:uppercase;letter-spacing:.16em;color:${bg === '#F2F5F1' ? '#B53D1A' : '#F59B76'};margin-top:12px}
  </style></head><body><div class="l">${mark(12).toString()}<div><div class="n">Trip with Darma</div><div class="s">Munduk hiking guide</div></div></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: fileURLToPath(new URL(`docs/brand/${file}`, root)) });
}
await browser.close();
console.log('Logo lockups written to docs/brand/.');
