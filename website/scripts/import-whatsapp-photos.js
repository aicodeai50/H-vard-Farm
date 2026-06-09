/**
 * Import original WhatsApp photos (not FINN screenshots).
 * Run: node scripts/import-whatsapp-photos.js
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
    src: `${prefix}WhatsApp_Image_2026-06-09_at_22.32.26-c4cd7871-aa34-45ae-8da6-4d951964f79e.png`,
    out: "farm-yard.jpg",
    hero: ["farm-overview.jpg", "hero-barn.jpg"],
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-09_at_22.32.26__4_-a5983b4f-1148-4648-8841-db12094d1649.png`,
    out: "barn-cinema.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-09_at_22.32.26__3_-1ff72d06-37bf-40d5-a357-dc72d8689f85.png`,
    out: "barn-pool.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-09_at_22.32.26__2_-f2d607c3-91f6-401b-9408-1e20f65ce011.png`,
    out: "barn-games.jpg",
  },
  {
    src: `${prefix}WhatsApp_Image_2026-06-09_at_22.32.26__1_-ee2422ad-093e-4633-80c7-6542a742cdfe.png`,
    out: "barn-exterior-red.jpg",
  },
];

async function saveJpeg(inputPath, outPath, opts = {}) {
  const input = fs.readFileSync(inputPath);
  let img = sharp(input);
  if (opts.width) {
    img = img.resize(opts.width, null, { withoutEnlargement: true });
  }
  if (opts.height && opts.width) {
    img = img.resize(opts.width, opts.height, {
      fit: "cover",
      position: "centre",
    });
  }
  await img
    .rotate()
    .sharpen({ sigma: 0.4 })
    .jpeg({ quality: opts.quality ?? 90, mozjpeg: true })
    .toFile(outPath);
}

async function main() {
  fs.mkdirSync(archiveDir, { recursive: true });

  for (const photo of PHOTOS) {
    const input = path.join(assetsRoot, photo.src);
    if (!fs.existsSync(input)) {
      console.error("Missing source:", input);
      process.exit(1);
    }

    const archiveName = photo.out.replace(".jpg", ".png");
    await fs.promises.copyFile(input, path.join(archiveDir, archiveName));

    const outPath = path.join(propertyDir, photo.out);
    await saveJpeg(input, outPath, { width: 1920, quality: 90 });
    console.log("  ", photo.out);

    if (photo.hero) {
      for (const heroName of photo.hero) {
        await saveJpeg(input, path.join(propertyDir, heroName), {
          width: 1920,
          height: 1080,
          quality: 92,
        });
        console.log("  ", heroName, "(hero)");
      }
    }
  }

  // Outdoor ceremonies alias
  await fs.promises.copyFile(
    path.join(propertyDir, "farm-yard.jpg"),
    path.join(propertyDir, "grounds.jpg")
  );
  console.log("  grounds.jpg ← farm-yard.jpg");

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
