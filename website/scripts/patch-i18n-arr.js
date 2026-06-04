const fs = require("fs");
const p = require("path").join(__dirname, "..", "data", "i18n.json");
const d = JSON.parse(fs.readFileSync(p, "utf8"));
Object.assign(d.en, {
  "arr.p1":
    "Søndre Haugen Farm is for life's great and small moments — from weddings and celebrations to meetings and memorial gatherings.",
  "arr.types.h2": "Popular events",
  "arr.types.wedding": "Outdoor ceremony and barn reception.",
  "arr.types.party": "Family celebrations and private parties.",
  "arr.types.corp": "Courses, seminars and corporate events.",
});
fs.writeFileSync(p, JSON.stringify(d, null, 2) + "\n", "utf8");
console.log("patched en arr.types");
