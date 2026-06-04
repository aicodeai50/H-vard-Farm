/** Fix index.html fallback text from i18n.json (UTF-8). Run: node scripts/fix-index-utf8.js */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const i18n = JSON.parse(fs.readFileSync(path.join(root, "data/i18n.json"), "utf8")).nb;
const file = path.join(root, "index.html");
let html = fs.readFileSync(file, "utf8");

html = html.replace(/(<[^>]+data-i18n="([^"]+)"[^>]*>)([^<]*)(<\/)/g, (m, open, key, _text, close) => {
  const val = i18n[key];
  if (!val || val.includes("<")) return m;
  return open + val + close;
});

html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${i18n["meta.home.description"]}$2`);
html = html.replace(/(<title>)[^<]*(<\/title>)/, `$1${i18n["meta.home.title"]}$2`);
html = html.replace(/(aria-label=")[^"]*(")/, `$1Søndre Haugen Gård$2`);

fs.writeFileSync(file, html, "utf8");
console.log("Fixed index.html UTF-8 fallbacks from i18n.json");
