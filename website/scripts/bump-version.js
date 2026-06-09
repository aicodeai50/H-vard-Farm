const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const VER = "20260607-pro";

for (const name of fs.readdirSync(root)) {
  if (!name.endsWith(".html") || name.startsWith("google")) continue;
  let html = fs.readFileSync(path.join(root, name), "utf8").replace(/^\uFEFF/, "");
  html = html.replace(/20260607-simple/g, VER);
  fs.writeFileSync(path.join(root, name), html, "utf8");
  console.log("version:", name);
}

const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");

if (!index.includes("hero-photo-wrap")) {
  index = index.replace(
    /<section class="hero hero--simple"[^>]*>/,
    '<section class="hero hero--simple" data-i18n-aria="home.hero.h1" aria-label="Søndre Haugen Gård">'
  );
  index = index.replace(
    /(\s*)<img(\s+src="assets\/images\/property\/farm-overview\.jpg[^"]*")/,
    '$1<div class="hero-photo-wrap"><img$2'
  );
  index = index.replace(
    /(data-i18n-alt="home\.house\.img"\s*\/>)/,
    "$1</div>"
  );
  fs.writeFileSync(indexPath, index, "utf8");
  console.log("index hero wrap added");
}

for (const js of ["meta.js", "i18n.js", "main.js", "schema.js", "booking.js", "contact-form.js"]) {
  const p = path.join(root, "js", js);
  if (!fs.existsSync(p)) continue;
  let s = fs.readFileSync(p, "utf8");
  if (s.includes("20260607-simple")) {
    s = s.replace(/20260607-simple/g, VER);
    fs.writeFileSync(p, s, "utf8");
    console.log("js:", js);
  }
}
