/**
 * Compresses every image in src/image so the site stays fast.
 *
 * Runs automatically before each build (see "prebuild" in package.json),
 * so new photos can be dropped in straight from a phone or camera.
 *
 * - Photos: fit inside 1800x1800 (portrait and landscape), EXIF rotation
 *   applied, all metadata (incl. GPS location) stripped, JPEG ~200-450 KB.
 * - Photos saved as PNG or iPhone HEIC/HEIF are converted to .jpg (the
 *   original is removed). If a HEIC can't be decoded, the build fails and
 *   names the file, so a photo is never silently left off the site.
 * - Any other file type in src/image (e.g. .webp, .mov) also fails the
 *   build, for the same reason. Hidden files (.gitkeep, .DS_Store) are ignored.
 * - Logos (any file with "logo" in its name) stay PNG with transparency.
 * - Files that are already optimised are skipped, so running it on every
 *   build never re-compresses (and never degrades) the same photo twice.
 * - Also writes the Home hero into public/ (hero-mobile.jpg, hero-desktop.jpg)
 *   so index.html can preload it by a fixed URL. They're regenerated only when
 *   missing or older than the source photo, which stays in rooms/ for the gallery.
 *   If that photo is deleted, the existing public/hero-*.jpg are kept as they are.
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

const HEIC_HELP =
  "Please re-upload this photo as JPG (iPhone: Settings → Camera → Formats → Most Compatible)";

// Every non-hidden file under dir
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const isSupported = (file) => /\.(jpe?g|png|hei[cf])$/i.test(file);
const isHeic = (file) => /\.hei[cf]$/i.test(file);

const kb = (n) => `${Math.round(n / 1024)}KB`;
const isLogo = (file) => /logo/i.test(path.basename(file));

// "photo.HEIC" -> "photo.jpg", or "photo-2.jpg" if that name is taken
function jpgName(file) {
  const stem = file.replace(/\.[^.]+$/, "");
  let target = `${stem}.jpg`;
  for (let n = 2; fs.existsSync(target); n++) target = `${stem}-${n}.jpg`;
  return target;
}

async function compressPhoto(file) {
  const before = fs.statSync(file).size;
  const meta = await sharp(file).metadata();
  const convert = /\.(png|hei[cf])$/i.test(file);
  const longest = Math.max(meta.width, meta.height);

  if (!convert && before <= PHOTO_TARGET && longest <= MAX_SIDE) return null;

  const base = sharp(fs.readFileSync(file))
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true });

  let out;
  for (const quality of [80, 72, 64, 56]) {
    out = await base.clone().jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
    // Stop once it's under target and never end up bigger than the original.
    if (out.length <= Math.min(PHOTO_TARGET, before)) break;
  }

  const target = convert ? jpgName(file) : file;
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
  if (!fs.existsSync(HERO_SOURCE)) {
    const missing = HERO_OUTPUTS.filter(({ file }) => !fs.existsSync(path.join(PUBLIC, file)));
    if (missing.length) throw new Error(`${path.relative(ROOT, HERO_SOURCE)} is missing and so is public/${missing[0].file}`);
    return [`! ${path.relative(ROOT, HERO_SOURCE)} not found; keeping the existing public/hero-*.jpg`];
  }
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
    const name = path.relative(ROOT, file);
    if (!isSupported(file)) {
      failed++;
      console.error(`✗ ${name}: not a JPG, PNG or HEIC photo, so it can't go on the site. Please re-upload it as JPG.`);
      continue;
    }
    try {
      const r = isLogo(file) ? await compressLogo(file) : await compressPhoto(file);
      if (r) results.push(r);
    } catch (err) {
      failed++;
      if (isHeic(file)) {
        console.error(`✗ ${name}: this iPhone photo (HEIC) couldn't be converted. ${HEIC_HELP}`);
        console.error(`  (${err.message.trim().split("\n").pop()})`);
      } else {
        console.error(`✗ ${name}: ${err.message}`);
      }
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
      console.warn(`! ${path.relative(ROOT, r.file)} was converted to JPG — update its import to .jpg`);
    }
  }

  if (failed) {
    console.error(`\n${failed} image(s) above need fixing before the site can be built.`);
    process.exit(1);
  }
})();