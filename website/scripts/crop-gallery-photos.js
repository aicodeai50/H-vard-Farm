/**
 * Extract photos from FINN/WhatsApp gallery screenshots.
 * Sources live in assets/images/property/_screenshots/ (archived originals).
 * Run: node scripts/crop-gallery-photos.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const propertyDir = path.join(__dirname, "..", "assets", "images", "property");
const archiveDir = path.join(propertyDir, "_screenshots");

function srcPath(name) {
  const archived = path.join(archiveDir, name);
  if (fs.existsSync(archived)) return archived;
  return path.join(propertyDir, name);
}

async function cropStack(src, outName, rows, pickRow, opts = {}) {
  const input = srcPath(src);
  const { width, height } = await sharp(input).metadata();
  const top = Math.round(height * (opts.topRatio ?? 0.16));
  const bottom = Math.round(height * (opts.bottomRatio ?? 0.02));
  const usable = height - top - bottom;
  const rowH = Math.floor(usable / rows);
  const y = top + rowH * pickRow + Math.round(rowH * (opts.insetY ?? 0.015));
  const h = Math.floor(rowH * (1 - (opts.insetY ?? 0.015) * 2));

  await sharp(input)
    .extract({
      left: Math.round(width * (opts.leftRatio ?? 0.02)),
      top: y,
      width: Math.round(width * (1 - (opts.leftRatio ?? 0.02) * 2)),
      height: h,
    })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(propertyDir, outName));

  console.log(`  ${outName} ← ${src} row ${pickRow + 1}/${rows}`);
}

async function cropHero(src, outName, pickRow, rows = 3, opts = {}) {
  const input = srcPath(src);
  const { width, height } = await sharp(input).metadata();
  const top = Math.round(height * (opts.topRatio ?? 0.16));
  const bottom = Math.round(height * (opts.bottomRatio ?? 0.02));
  const usable = height - top - bottom;
  const rowH = Math.floor(usable / rows);
  const y = top + rowH * pickRow;
  const h = rowH;

  await sharp(input)
    .extract({ left: 0, top: y, width, height: h })
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(propertyDir, outName));

  console.log(`  ${outName} ← hero ${src} row ${pickRow + 1}`);
}

/** Red barn ground shot from farm-aerial screenshot (top panel, skip gallery chrome). */
async function cropRedBarnGround() {
  const input = srcPath("farm-aerial.jpg");
  const { width, height } = await sharp(input).metadata();
  const top = Math.round(height * 0.19);
  const h = Math.round(height * 0.28);

  await sharp(input)
    .extract({
      left: Math.round(width * 0.02),
      top,
      width: Math.round(width * 0.96),
      height: h,
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(propertyDir, "barn-exterior-red.jpg"));

  await sharp(input)
    .extract({ left: 0, top, width, height: h })
    .resize(1920, 1080, { fit: "cover", position: "centre" })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(propertyDir, "hero-barn.jpg"));

  console.log("  barn-exterior-red.jpg + hero-barn.jpg ← farm-aerial (red barn)");
}

async function cropSinglePhoto(src, outName, topRatio = 0.06) {
  const input = srcPath(src);
  const { width, height } = await sharp(input).metadata();
  const top = Math.round(height * topRatio);
  await sharp(input)
    .extract({ left: 0, top, width, height: height - top - 8 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(propertyDir, outName));
  console.log(`  ${outName} ← ${src} (single)`);
}

async function main() {
  if (!fs.existsSync(archiveDir)) {
    console.error("Missing _screenshots/ — archive gallery screenshots first.");
    process.exit(1);
  }

  console.log("Cropping from _screenshots/…");

  // barn-exterior-red screenshot file = 3 aerial drone photos
  await cropHero("barn-exterior-red.jpg", "hero-aerial.jpg", 1, 3);
  await cropStack("barn-exterior-red.jpg", "farm-overview.jpg", 3, 1);
  await cropStack("barn-exterior-red.jpg", "farm-landscape.jpg", 3, 0);

  await cropRedBarnGround();

  await cropStack("barn-dining.jpg", "barn-dining.jpg", 3, 0);
  await cropStack("barn-dining.jpg", "barn-dining-set.jpg", 3, 2);
  await cropStack("barn-hall-rustic.jpg", "barn-hall-rustic.jpg", 3, 1);
  await cropStack("barn-games.jpg", "barn-games.jpg", 3, 1);
  await cropStack("barn-lounge.jpg", "barn-lounge.jpg", 2, 1, { topRatio: 0.1 });

  if (fs.existsSync(srcPath("guest-house.jpg"))) {
    await cropSinglePhoto("guest-house.jpg", "guest-house.jpg", 0.05);
  }

  const motorMeta = await sharp(srcPath("motorhome-garage.jpg")).metadata();
  if (motorMeta.height / motorMeta.width > 1.4) {
    await cropStack("motorhome-garage.jpg", "motorhome-garage.jpg", 2, 0, { topRatio: 0.14 });
  }

  // Alias for legacy CSS paths
  await fs.promises.copyFile(
    path.join(propertyDir, "farm-landscape.jpg"),
    path.join(propertyDir, "grounds.jpg")
  );
  console.log("  grounds.jpg ← farm-landscape.jpg");

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
