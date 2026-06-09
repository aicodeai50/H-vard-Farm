const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const i18n = JSON.parse(fs.readFileSync(path.join(root, "data/i18n.json"), "utf8")).nb;

function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function setAttr(tag, name, value) {
  const re = new RegExp(`\\s${name}="[^"]*"`, "g");
  const clean = tag.replace(re, "");
  return clean.replace(/\/?>$/, (end) => ` ${name}="${escAttr(value)}"${end}`);
}

function fixFile(name) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");

  html = html.replace(/(<[^>]+data-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/)/g, (m, open, key, _text, close) => {
    const val = i18n[key];
    if (!val || val.includes("<")) return m;
    return open + val + close;
  });

  html = html.replace(/(<([a-z]+)[^>]+data-i18n-html="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi, (m, open, tag, key) => {
    const val = i18n[key];
    if (!val) return m;
    return open + val + `</${tag}>`;
  });

  html = html.replace(/<input[^>]+data-i18n-value="([^"]+)"[^>]*>/g, (tag, key) => {
    const val = i18n[key];
    return val ? setAttr(tag, "value", val) : tag;
  });

  html = html.replace(/<[^>]+data-i18n-placeholder="([^"]+)"[^>]*>/g, (tag, key) => {
    const val = i18n[key];
    return val ? setAttr(tag, "placeholder", val) : tag;
  });

  html = html.replace(/<[^>]+data-i18n-aria="([^"]+)"[^>]*>/g, (tag, key) => {
    const val = i18n[key];
    return val ? setAttr(tag, "aria-label", val) : tag;
  });

  html = html.replace(/<img[^>]+data-i18n-alt="([^"]+)"[^>]*>/g, (tag, key) => {
    const val = i18n[key];
    return val ? setAttr(tag, "alt", val) : tag;
  });

  const pageMatch = html.match(/<body[^>]*data-page="([^"]+)"/);
  const page = pageMatch?.[1];
  if (page) {
    const desc = i18n[`meta.${page}.description`];
    const title = i18n[`meta.${page}.title`];
    if (desc) html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escAttr(desc)}$2`);
    if (title) html = html.replace(/(<title>)[^<]*(<\/title>)/, `$1${title}$2`);
  }

  fs.writeFileSync(file, html, "utf8");
  console.log("fixed:", name);
}

for (const name of fs.readdirSync(root)) {
  if (name.endsWith(".html") && !name.startsWith("google")) fixFile(name);
}
