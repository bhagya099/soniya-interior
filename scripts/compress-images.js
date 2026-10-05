const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "src", "image");

const PHOTO_FILES = [
  ...glob(path.join(ROOT, "rooms")),
  path.join(ROOT, "Soniya-pic.jpeg"),
];

const LOGO_FILES = [
  path.join(ROOT, "logo.png"),
  path.join(ROOT, "logo-footer.png"),
];

function glob(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...glob(full));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function compressPhoto(file) {
  const before = fs.statSync(file).size;
  const buf = fs.readFileSync(file);
  const img = sharp(buf).rotate();
  const meta = await img.metadata();

  let pipeline = img.resize({
    width: 1600,
    withoutEnlargement: true,
  });

  // Try a few quality levels to land in the 200-400KB target band.
  let out;
  for (const quality of [78, 68, 58, 48]) {
    out = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
    if (out.length <= 400 * 1024) break;
  }

  fs.writeFileSync(file, out);
  const after = out.length;
  console.log(
    `${path.relative(ROOT, file)}: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB (orig ${meta.width}x${meta.height})`
  );
}

async function compressLogo(file) {
  const before = fs.statSync(file).size;
  const buf = fs.readFileSync(file);
  const out = await sharp(buf)
    .resize({ width: 500, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(file, out);
  console.log(
    `${path.relative(ROOT, file)}: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(out.length / 1024).toFixed(0)}KB`
  );
}

(async () => {
  for (const file of PHOTO_FILES) {
    await compressPhoto(file);
  }
  for (const file of LOGO_FILES) {
    if (fs.existsSync(file)) await compressLogo(file);
  }
})();
