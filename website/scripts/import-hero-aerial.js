/**
 * Import hero aerial from WhatsApp (drone view of farm).
 * Run: node scripts/import-hero-aerial.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const assetsRoot =
  "C:/Users/sandr/.cursor/projects/c-Users-sandr-OneDrive-Documents-H-vard-Farm/assets";
const src = path.join(
  assetsRoot,
  "c__Users_sandr_AppData_Roaming_Cursor_User_workspaceStorage_ff8c5c020eceb08493091341a8f4179e_images_WhatsApp_Image_2026-06-09_at_23.21.10-5c425f18-404d-4279-a1ef-a54100c6eb00.png"
);

const propertyDir = path.join(__dirname, "..", "assets", "images", "property");
const archiveDir = path.join(propertyDir, "_source", "whatsapp");

async function save(buf, name, opts = {}) {
  let img = sharp(buf);
  if (opts.width && opts.height) {
    img = img.resize(opts.width, opts.height, { fit: "cover", position: "centre" });
  } else if (opts.width) {
    img = img.resize(opts.width, null, { withoutEnlargement: true });
  }
  await img.rotate().sharpen({ sigma: 0.4 }).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(propertyDir, name));
}

async function main() {
  if (!fs.existsSync(src)) {
    console.error("Missing source:", src);
    process.exit(1);
  }

  fs.mkdirSync(archiveDir, { recursive: true });
  const buf = fs.readFileSync(src);
  fs.writeFileSync(path.join(archiveDir, "hero-aerial.png"), buf);

  await save(buf, "hero-aerial.jpg", { width: 1920 });
  await save(buf, "farm-overview.jpg", { width: 1920, height: 1080 });
  console.log("  hero-aerial.jpg");
  console.log("  farm-overview.jpg (hero crop)");
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
