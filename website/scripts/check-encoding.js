const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const bad = /SÃ|ï¿½|â€|Â·|Â«|Â»/;

for (const f of fs.readdirSync(root).filter((x) => x.endsWith(".html") && !x.startsWith("google"))) {
  const s = fs.readFileSync(path.join(root, f), "utf8");
  const title = (s.match(/<title>([^<]+)/) || [])[1] || "";
  console.log(f, s.charCodeAt(0) === 0xfeff ? "BOM" : "noBOM", bad.test(s) ? "MOJIBAKE" : "clean", "|", title.slice(0, 55));
}
