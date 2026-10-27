// Generates the favicon set, logo PNG and default social preview image into public/.
// Run with: npm run icons   (icons need only sharp; the social image also uses Playwright if installed)
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = new URL('../', import.meta.url);
const pub = (f) => fileURLToPath(new URL(`public/${f}`, root));

// Brand mark: solid ridge, twin lakes, clay trail marker on the summit. Same drawing as src/components/Logo.astro.
const mark = (rx = 16, pad = 0) => {
  const s = 64 + pad * 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${s} ${s}">
  <rect x="${-pad}" y="${-pad}" width="${s}" height="${s}" rx="${rx}" fill="#1F3D30"/>
  <path d="M10 42 25 19l8.5 11.5 6-6L54 42Z" fill="#F6F3EC" stroke="#F6F3EC" stroke-width="3" stroke-linejoin="round"/>
  <path d="M16 50.5h12M36 50.5h12" stroke="#8DB8BB" stroke-width="5" stroke-linecap="round"/>
  <circle cx="25" cy="19" r="4.5" fill="#EFA58E"/></svg>`);
};

const png = (svg, size) => sharp(svg, { density: 600 }).resize(size, size).png().toBuffer();

await writeFile(pub('apple-touch-icon.png'), await png(mark(0), 180));
await writeFile(pub('icon-192.png'), await png(mark(), 192));
await writeFile(pub('icon-512.png'), await png(mark(), 512));
await writeFile(pub('icon-maskable-512.png'), await png(mark(0, 12), 512));
await writeFile(pub('logo.png'), await png(mark(), 512));

// favicon.ico holding 16, 32 and 48 px PNGs.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(mark(), s)));
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
const fontFace = `@font-face{font-family:J;font-weight:200 800;src:url(data:font/woff2;base64,${await font('plus-jakarta-sans-latin-wght-normal.woff2')}) format('woff2')}`;
const html = `<!doctype html><html><head><style>
${fontFace}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:#1F3D30;color:#F6F3EC;font-family:J;position:relative}
.w{position:absolute;inset:0;padding:76px 84px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:20px}
.top svg{width:76px;height:76px}
.top svg rect{fill:#2A4A3B}
.name{font:800 40px/1 J;letter-spacing:-.03em}
.sub{font:600 20px/1 J;color:#A9BBAF;margin-top:8px}
h1{font:800 84px/1.02 J;letter-spacing:-.04em;margin:0;max-width:940px}
h1 span{color:#8DB8BB}
.foot{display:flex;align-items:center;gap:14px;font:600 24px/1 J;color:#C5D4C9}
.foot i{width:8px;height:8px;border-radius:50%;background:#EFA58E}
</style></head><body>
<div class="w"><div class="top">${mark().toString()}<div><div class="name">Trip with Darma</div><div class="sub">Munduk hiking guide · North Bali</div></div></div>
<h1>Hike Munduk's Twin Lakes <span>with a local guide</span></h1>
<div class="foot"><span>Twin Lakes</span><i></i><span>Waterfalls</span><i></i><span>Sekumpul &amp; Jatiluwih</span><i></i><span>Book on WhatsApp</span></div></div>
</body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: 'png' });
await sharp(shot).jpeg({ quality: 82, mozjpeg: true }).toFile(pub('og-default.jpg'));
console.log('og-default.jpg written.');

// Horizontal logo lockups for social profiles, Google Business Profile and print.
for (const [file, bg, fg, sub] of [['logo-horizontal.png', '#F6F3EC', '#1F3D30', '#59645C'], ['logo-horizontal-dark.png', '#1F3D30', '#F6F3EC', '#A9BBAF']]) {
  await page.setViewportSize({ width: 1200, height: 300 });
  await page.setContent(`<!doctype html><html><head><style>
  ${fontFace}
  html,body{margin:0;width:1200px;height:300px;background:${bg}}
  .l{display:flex;align-items:center;gap:36px;height:300px;padding:0 64px;box-sizing:border-box}
  .l svg{width:168px;height:168px}
  ${bg === '#1F3D30' ? '.l svg rect{fill:#2A4A3B}' : ''}
  .n{white-space:nowrap;font:800 96px/1 J;color:${fg};letter-spacing:-.035em}
  .s{font:600 32px/1 J;color:${sub};margin-top:14px}
  </style></head><body><div class="l">${mark().toString()}<div><div class="n">Trip with Darma</div><div class="s">Munduk hiking guide</div></div></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: fileURLToPath(new URL(`docs/brand/${file}`, root)) });
}
await browser.close();
console.log('Logo lockups written to docs/brand/.');
