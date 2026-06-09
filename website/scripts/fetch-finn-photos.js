/**
 * Download selected high-res photos from FINN listing 427386872.
 * Run: node scripts/fetch-finn-photos.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const propertyDir = path.join(__dirname, "..", "assets", "images", "property");
const sourceDir = path.join(propertyDir, "_source", "finn");
const htmlPath = path.join(__dirname, "..", "finn-page.html");

const PICKS = [
  { index: 0, out: "finn-estate.jpg", hero: "farm-overview.jpg" },
  { index: 82, out: "finn-pool.jpg" },
  { index: 48, out: "finn-barn-hall.jpg" },
];

function parseImages(html) {
  const chunks = html.split(/id="image-/);
  const imgs = new Map();
  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const index = parseInt(chunk, 10);
    const titleMatch = chunk.match(/title="([^"]*)"/);
    const srcMatch = chunk.match(
      /data-srcset="[^"]*?(https:\/\/images\.finncdn\.no\/dynamic\/1600w\/[^,\s"]+)/
    );
    if (srcMatch) {
      imgs.set(index, {
        index,
        title: titleMatch ? titleMatch[1] : "",
        url: srcMatch[1],
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

async function saveJpeg(buf, outPath, opts = {}) {
  let img = sharp(buf);
  if (opts.width && opts.height) {
    img = img.resize(opts.width, opts.height, { fit: "cover", position: "centre" });
  } else if (opts.width) {
    img = img.resize(opts.width, null, { withoutEnlargement: true });
  }
  await img.rotate().sharpen({ sigma: 0.35 }).jpeg({ quality: 90, mozjpeg: true }).toFile(outPath);
}

async function main() {
  if (!fs.existsSync(htmlPath)) {
    console.log("Fetching FINN listing HTML…");
    const { execSync } = require("child_process");
    execSync(
      'curl.exe -sL -A "Mozilla/5.0" "https://www.finn.no/427386872" -o "' + htmlPath.replace(/\\/g, "/") + '"',
      { stdio: "inherit" }
    );
  }

  if (!fs.existsSync(htmlPath)) {
    console.error("Missing finn-page.html — fetch listing HTML first.");
    process.exit(1);
  }

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
    const rawPath = path.join(sourceDir, pick.out.replace(".jpg", ".raw.jpg"));
    fs.writeFileSync(rawPath, buf);

    await saveJpeg(buf, path.join(propertyDir, pick.out), { width: 1920 });
    console.log("  ", pick.out);

    if (pick.hero) {
      await saveJpeg(buf, path.join(propertyDir, pick.hero), {
        width: 1920,
        height: 1080,
      });
      console.log("  ", pick.hero, "(hero)");
    }
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
