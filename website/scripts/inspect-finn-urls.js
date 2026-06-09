const fs = require("fs");
const html = fs.readFileSync("finn-page.html", "utf8");
const chunks = html.split(/id="image-/);
for (let i = 1; i < chunks.length; i++) {
  const chunk = chunks[i];
  const index = parseInt(chunk, 10);
  if (index < 10 || index > 20) continue;
  const titleMatch = chunk.match(/title="([^"]*)"/);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, "&") : "";
  const srcMatch = chunk.match(
    /data-srcset="[^"]*?(https:\/\/images\.finncdn\.no\/dynamic\/1600w\/[^,\s"]+)/
  );
  const uuid = srcMatch ? srcMatch[1].split("/").pop() : "?";
  console.log(`${index}\t${uuid.slice(0, 8)}…\t${title.slice(0, 70)}`);
}
