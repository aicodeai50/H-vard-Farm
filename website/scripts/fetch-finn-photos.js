/**
 * Download curated high-res photos from FINN listing 427386872.
 * Run: node scripts/fetch-finn-photos.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const propertyDir = path.join(__dirname, "..", "assets", "images", "property");
const sourceDir = path.join(propertyDir, "_source", "finn");
const htmlPath = path.join(__dirname, "..", "finn-page.html");

/** House interior + barn — dining/kitchen use widest FINN shots (1600w) */
const PICKS = [
  { index: 6, out: "finn-living-room.jpg" },
  { index: 12, out: "finn-dining-room.jpg" }, // spisestue / TV-stue
  { index: 13, out: "finn-kitchen.jpg" }, // hovedkjøkken — main wide kitchen
  { index: 14, out: "finn-kitchen-detail.jpg" }, // Sigdal kitchen angle
  { index: 48, out: "finn-barn-hall.jpg" },
  { index: 57, out: "finn-games-room.jpg" },
  { index: 58, out: "finn-lounge.jpg" },
  { index: 73, out: "finn-garage.jpg" },
  { index: 82, out: "finn-pool.jpg" },
];

function parseImages(html) {
  const chunks = html.split(/id="image-/);
  const imgs = new Map();
  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const index = parseInt(chunk, 10);
    const titleMatch = chunk.match(/title="([^"]*)"/);
    const srcsetMatch = chunk.match(/data-srcset="([^"]+)"/);
    let url = null;
    if (srcsetMatch) {
      const entries = srcsetMatch[1].split(",").map((part) => {
        const [u, w] = part.trim().split(/\s+/);
        return { url: u, w: parseInt(w, 10) || 0 };
      });
      entries.sort((a, b) => b.w - a.w);
      url = entries[0]?.url;
    }
    if (url) {
      imgs.set(index, {
        index,
        title: titleMatch ? titleMatch[1] : "",
        url,
      });
    }
  }
  return imgs;
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function saveJpeg(buf, outPath) {
  const meta = await sharp(buf).metadata();
  let img = sharp(buf).rotate();
  // Keep native FINN resolution (up to 1600w) — no upscaling
  if (meta.width && meta.width > 1920) {
    img = img.resize(1920, null, { withoutEnlargement: true });
  }
  await img.sharpen({ sigma: 0.25 }).jpeg({ quality: 92, mozjpeg: true }).toFile(outPath);
  const out = await sharp(outPath).metadata();
  return out;
}

async function main() {
  console.log("Fetching FINN listing HTML…");
  const { execSync } = require("child_process");
  execSync(
    'curl.exe -sL -A "Mozilla/5.0" "https://www.finn.no/427386872" -o "' + htmlPath.replace(/\\/g, "/") + '"',
    { stdio: "inherit" }
  );

  fs.mkdirSync(sourceDir, { recursive: true });
  const html = fs.readFileSync(htmlPath, "utf8");
  const imgs = parseImages(html);

  for (const pick of PICKS) {
    const meta = imgs.get(pick.index);
    if (!meta) {
      console.error("Missing image index", pick.index);
      process.exit(1);
    }

    console.log(`↓ ${pick.out} ← [${pick.index}] ${meta.title || "(no title)"}`);
    const buf = await download(meta.url);
    fs.writeFileSync(path.join(sourceDir, pick.out.replace(".jpg", ".raw.jpg")), buf);
    const saved = await saveJpeg(buf, path.join(propertyDir, pick.out));
    console.log(`   ${pick.out} (${saved.width}×${saved.height})`);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
