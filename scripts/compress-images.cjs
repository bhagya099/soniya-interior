/**
 * Compresses every image in src/image so the site stays fast.
 *
 * Runs automatically before each build (see "prebuild" in package.json),
 * so new photos can be dropped in straight from a phone or camera.
 *
 * - Photos: fit inside 1800x1800 (portrait and landscape), EXIF rotation
 *   applied, all metadata (incl. GPS location) stripped, JPEG ~200-450 KB.
 * - Photos saved as PNG are converted to .jpg (the .png is removed).
 * - Logos (any file with "logo" in its name) stay PNG with transparency.
 * - Files that are already optimised are skipped, so running it on every
 *   build never re-compresses (and never degrades) the same photo twice.
 * - Also writes the Home hero into public/ (hero-mobile.jpg, hero-desktop.jpg)
 *   so index.html can preload it by a fixed URL. They're regenerated only when
 *   missing or older than the source photo, which stays in rooms/ for the gallery.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "src", "image");
const MAX_SIDE = 1800;
const PHOTO_TARGET = 450 * 1024;
const LOGO_MAX_WIDTH = 600;
const LOGO_TARGET = 150 * 1024;

const HERO_SOURCE = path.join(ROOT, "rooms", "living-room", "IMG_0034.jpeg");
const PUBLIC = path.join(__dirname, "..", "public");
const HERO_OUTPUTS = [
  { file: "hero-mobile.jpg", width: 900, quality: 72 },
  { file: "hero-desktop.jpg", width: null, quality: 78 }, // source size, capped at MAX_SIDE
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const kb = (n) => `${Math.round(n / 1024)}KB`;
const isLogo = (file) => /logo/i.test(path.basename(file));

async function compressPhoto(file) {
  const before = fs.statSync(file).size;
  const meta = await sharp(file).metadata();
  const isPng = /\.png$/i.test(file);
  const longest = Math.max(meta.width, meta.height);

  if (!isPng && before <= PHOTO_TARGET && longest <= MAX_SIDE) return null;

  const base = sharp(fs.readFileSync(file))
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true });

  let out;
  for (const quality of [80, 72, 64, 56]) {
    out = await base.clone().jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
    // Stop once it's under target and never end up bigger than the original.
    if (out.length <= Math.min(PHOTO_TARGET, before)) break;
  }

  const target = isPng ? file.replace(/\.png$/i, ".jpg") : file;
  fs.writeFileSync(target, out);
  if (target !== file) fs.unlinkSync(file);

  return { file: target, before, after: out.length, size: `${meta.width}x${meta.height}`, renamed: target !== file };
}

async function compressLogo(file) {
  const before = fs.statSync(file).size;
  const meta = await sharp(file).metadata();
  if (before <= LOGO_TARGET && meta.width <= LOGO_MAX_WIDTH) return null;

  const out = await sharp(fs.readFileSync(file))
    .resize({ width: LOGO_MAX_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  fs.writeFileSync(file, out);
  return { file, before, after: out.length, size: `${meta.width}x${meta.height}` };
}

async function writeHeroFiles() {
  const sourceTime = fs.statSync(HERO_SOURCE).mtimeMs;
  const written = [];
  for (const { file, width, quality } of HERO_OUTPUTS) {
    const target = path.join(PUBLIC, file);
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= sourceTime) continue;

    const resize = width
      ? { width, withoutEnlargement: true }
      : { width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true };
    const info = await sharp(fs.readFileSync(HERO_SOURCE))
      .rotate()
      .resize(resize)
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(target);
    written.push(`✓ public/${file}: ${info.width}x${info.height}, ${kb(info.size)}`);
  }
  return written;
}

(async () => {
  const results = [];
  let failed = 0;

  for (const file of walk(ROOT)) {
    try {
      const r = isLogo(file) ? await compressLogo(file) : await compressPhoto(file);
      if (r) results.push(r);
    } catch (err) {
      failed++;
      console.error(`✗ ${path.relative(ROOT, file)}: ${err.message}`);
    }
  }

  try {
    const heroes = await writeHeroFiles();
    console.log(heroes.length ? heroes.join("\n") : "Hero: public/hero-*.jpg up to date.");
  } catch (err) {
    failed++;
    console.error(`✗ hero: ${err.message}`);
  }

  if (!results.length) {
    console.log("Images: all already optimised.");
  } else {
    for (const r of results) {
      console.log(`✓ ${path.relative(ROOT, r.file)}: ${kb(r.before)} -> ${kb(r.after)} (was ${r.size})`);
    }
    const saved = results.reduce((s, r) => s + r.before - r.after, 0);
    console.log(`Saved ${(saved / 1024 / 1024).toFixed(1)} MB across ${results.length} file(s).`);

    const renamed = results.filter((r) => r.renamed && !r.file.includes(`${path.sep}rooms${path.sep}`));
    for (const r of renamed) {
      console.warn(`! ${path.relative(ROOT, r.file)} was converted from PNG — update its import to .jpg`);
    }
  }

  if (failed) process.exit(1);
})();