const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
console.log("stats:", html.includes("section--stats"));
console.log("intro:", html.includes("section-intro"));
console.log("dup aria:", /aria-label="[^"]*"\s*aria-label/.test(html));
console.log("dup alt:", /alt="[^"]*"\s*alt=/.test(html));
console.log("div balance:", (html.match(/<div/g) || []).length, (html.match(/<\/div/g) || []).length);
