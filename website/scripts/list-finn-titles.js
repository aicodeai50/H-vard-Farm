const fs = require("fs");
const html = fs.readFileSync("finn-page.html", "utf8");
const chunks = html.split(/id="image-/);
for (let i = 1; i < chunks.length; i++) {
  const chunk = chunks[i];
  const index = parseInt(chunk, 10);
  const titleMatch = chunk.match(/title="([^"]*)"/);
  const title = titleMatch ? titleMatch[1] : "";
  if (/plantegning/i.test(title)) continue;
  if (title || index < 50) console.log(index + ":", title || "(no title)");
}
