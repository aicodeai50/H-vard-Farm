/**
 * Crop official logo-brand.png into header (no aerial photo) and favicon mark.
 * Run: node scripts/crop-logo-header.js
 */
const sharp = require("sharp");
const path = require("path");

const src = path.join(__dirname, "..", "assets", "images", "logo-brand.png");
const outDir = path.join(__dirname, "..", "assets", "images");

async function main() {
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;

  // Official layout: gable ~top 14%, photo ~14–58%, typography ~58–100%
  const gableTop = 0;
  const gableH = Math.round(h * 0.14);
  const textTop = Math.round(h * 0.58);
  const textH = h - textTop;

  const gable = await sharp(src).extract({ left: 0, top: gableTop, width: w, height: gableH }).png().toBuffer();
  const text = await sharp(src).extract({ left: 0, top: textTop, width: w, height: textH }).png().toBuffer();

  const gMeta = await sharp(gable).metadata();
  const tMeta = await sharp(text).metadata();
  const gap = Math.round(h * 0.02);
  const totalH = gMeta.height + gap + tMeta.height;

  await sharp({
    create: {
      width: w,
      height: totalH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([
      { input: gable, top: 0, left: 0 },
      { input: text, top: gMeta.height + gap, left: 0 },
    ])
    .trim({ threshold: 12 })
    .png()
    .toFile(path.join(outDir, "logo-header.png"));

  // Favicon / small mark: gable only
  await sharp(gable).trim({ threshold: 12 }).resize(128, 128, { fit: "inside" }).png().toFile(path.join(outDir, "logo-icon.png"));

  console.log("Wrote logo-header.png and logo-icon.png from", w, "x", h);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
