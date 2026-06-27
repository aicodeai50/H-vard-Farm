/**
 * Replace legacy screenshot crops with real photos across all HTML pages.
 * Run: node scripts/sync-real-photos.js
 */
const fs = require("fs");
const path = require("path");

const websiteDir = path.join(__dirname, "..");
const assetVer = "20260627-restore";

/** Old screenshot filename → real photo */
const REPLACEMENTS = [
  ["barn-hall-rustic.jpg", "barn-hall-tables.jpg"],
  ["barn-dining-set.jpg", "barn-dining-formal.jpg"],
  ["barn-dining.jpg", "barn-dining-formal.jpg"],
  ["barn-lounge.jpg", "finn-lounge.jpg"],
  ["farm-aerial.jpg", "hero-aerial.jpg"],
  ["farm-landscape.jpg", "pool-deck.jpg"],
  ["motorhome-garage.jpg", "finn-garage.jpg"],
  ["grounds.jpg", "pool-deck.jpg"],
  ["guest-house.jpg", "house-dining.jpg"],
];

const PAGE_OVERRIDES = {
  "mat-servering.html": [["barn-dining-formal.jpg", "house-dining.jpg"]],
};

function syncFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (!html.includes("assets/images/property/") && !html.includes(".js?v=") && !html.includes(".css?v=")) {
    return false;
  }

  for (const [from, to] of REPLACEMENTS) {
    html = html.split(from).join(to);
  }

  const base = path.basename(filePath);
  if (PAGE_OVERRIDES[base]) {
    for (const [from, to] of PAGE_OVERRIDES[base]) {
      html = html.split(from).join(to);
    }
  }

  html = html.replace(/\?v=20260607-refine/g, `?v=${assetVer}`);
  html = html.replace(/\?v=20260610-best/g, `?v=${assetVer}`);
  html = html.replace(/\?v=20260610-hero/g, `?v=${assetVer}`);
  html = html.replace(/\?v=20260609-finn-kitchen/g, `?v=${assetVer}`);
  html = html.replace(/\?v=20260609-hero/g, `?v=${assetVer}`);
  html = html.replace(/\?v=20260609-rooms/g, `?v=${assetVer}`);
  html = html.replace(/\?v=20260609-aerial/g, `?v=${assetVer}`);

  fs.writeFileSync(filePath, html, "utf8");
  return true;
}

const files = fs
  .readdirSync(websiteDir)
  .filter((f) => f.endsWith(".html"))
  .map((f) => path.join(websiteDir, f));

let count = 0;
for (const file of files) {
  if (syncFile(file)) {
    console.log(" synced:", path.basename(file));
    count++;
  }
}

console.log(`Done. ${count} HTML files updated (assetVer=${assetVer}).`);
