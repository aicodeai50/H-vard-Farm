/** Sync HTML fallback text from i18n.json (nb). Run: node scripts/fix-all-html-utf8.js */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const i18n = JSON.parse(fs.readFileSync(path.join(root, "data/i18n.json"), "utf8")).nb;

const metaPage = {
  "index.html": "home",
  "kontakt.html": "contact",
  "personvern.html": "privacy",
  "takk.html": "thanks",
  "404.html": "notfound",
};

function fixFile(name) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, "utf8");

  html = html.replace(/(<[^>]+data-i18n="([^"]+)"[^>]*>)([^<]*)(<\/)/g, (m, open, key, _text, close) => {
    const val = i18n[key];
    if (!val || val.includes("<")) return m;
    return open + val + close;
  });

  html = html.replace(/(<[^>]+data-i18n-html="([^"]+)"[^>]*>)([^<]*)(<\/)/g, (m, open, key) => {
    const val = i18n[key];
    if (!val) return m;
    return open + val + "</";
  });

  const page = metaPage[name];
  if (page) {
    if (i18n[`meta.${page}.description`]) {
      html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${i18n[`meta.${page}.description`]}$2`);
    }
    if (i18n[`meta.${page}.title`]) {
      html = html.replace(/(<title>)[^<]*(<\/title>)/, `$1${i18n[`meta.${page}.title`]}$2`);
    }
  }

  fs.writeFileSync(file, html, "utf8");
  console.log("fixed:", name);
}

for (const name of fs.readdirSync(root)) {
  if (name.endsWith(".html") && !name.startsWith("google")) fixFile(name);
}
