/**
 * Import best WhatsApp photos batch (2026-06-10).
 * Run: node scripts/import-whatsapp-batch2.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const assetsRoot =
  "C:/Users/sandr/.cursor/projects/c-Users-sandr-OneDrive-Documents-H-vard-Farm/assets";
const prefix =
  "c__Users_sandr_AppData_Roaming_Cursor_User_workspaceStorage_ff8c5c020eceb08493091341a8f4179e_images_";

const propertyDir = path.join(__dirname, "..", "assets", "images", "property");
const archiveDir = path.join(propertyDir, "_source", "whatsapp");

const PHOTOS = [
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.44-7218875e-6e14-46cd-978d-f32fca0f4a1e.png`,
    out: "house-dining.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.44__1_-d50895dc-2e99-4c55-ae05-3f3866636dad.png`,
    out: "house-kitchen.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.45__1_-70445175-df18-4727-8430-a0a4746ed747.png`,
    out: "barn-dining-formal.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.45-3d0f2797-eb61-43b4-8d83-b9658bcad0be.png`,
    out: "barn-hall-tables.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.45__2_-7a9ff9a1-6273-4c83-8a40-8077cc1003ac.png`,
    out: "pool-deck.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.45__4_-812ebff7-c9b8-4663-8f9f-1b448104e461.png`,
    out: "pool-evening.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.45__3_-18cd2625-d9d5-499f-8644-82271f5b9d04.png`,
    out: "farm-evening.jpg",
    hero: ["farm-overview.jpg"],
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-10_at_00.12.45__5_-81df5101-a2e2-4dea-bbb8-25fc23b9351c.png`,
    out: "hero-aerial.jpg",
  },
];

async function saveJpeg(inputPath, outPath, opts = {}) {
  const input = fs.readFileSync(inputPath);
  let img = sharp(input).rotate();
  if (opts.width && opts.height) {
    img = img.resize(opts.width, opts.height, { fit: "cover", position: "centre" });
  } else if (opts.width) {
    img = img.resize(opts.width, null, { withoutEnlargement: true });
  }
  await img.sharpen({ sigma: 0.35 }).jpeg({ quality: opts.quality ?? 90, mozjpeg: true }).toFile(outPath);
}

async function main() {
  fs.mkdirSync(archiveDir, { recursive: true });

  for (const photo of PHOTOS) {
    const input = path.join(assetsRoot, photo.src);
    if (!fs.existsSync(input)) {
      console.error("Missing source:", input);
      process.exit(1);
    }

    const archiveName = photo.out.replace(".jpg", path.extname(photo.src));
    await fs.promises.copyFile(input, path.join(archiveDir, archiveName));

    await saveJpeg(input, path.join(propertyDir, photo.out), { width: 1920, quality: 90 });
    console.log(" ", photo.out);

    if (photo.hero) {
      for (const heroName of photo.hero) {
        await saveJpeg(input, path.join(propertyDir, heroName), {
          width: 1920,
          height: 1080,
          quality: 92,
        });
        console.log(" ", heroName, "(hero crop)");
      }
    }
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
