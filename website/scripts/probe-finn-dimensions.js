/** Download and print dimensions for candidate dining/kitchen FINN photos */
const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const html = fs.readFileSync(path.join(__dirname, "..", "finn-page.html"), "utf8");

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
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
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

async function main() {
  const imgs = parseImages(html);
  for (const idx of [11, 12, 13, 14, 17, 18]) {
    const meta = imgs.get(idx);
    if (!meta) continue;
    const buf = await download(meta.url);
    const s = await sharp(buf).metadata();
    console.log(
      `[${idx}] ${s.width}x${s.height} ${Math.round(buf.length / 1024)}KB — ${meta.title.slice(0, 55)}`
    );
  }
}

main().catch(console.error);
