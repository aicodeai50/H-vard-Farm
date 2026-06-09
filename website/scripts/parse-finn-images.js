const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "finn-page.html"), "utf8");

const chunks = html.split(/id="image-/);
const imgs = [];
for (let i = 1; i < chunks.length; i++) {
  const chunk = chunks[i];
  const index = parseInt(chunk, 10);
  const titleMatch = chunk.match(/title="([^"]*)"/);
  const srcMatch = chunk.match(
    /data-srcset="[^"]*?(https:\/\/images\.finncdn\.no\/dynamic\/1600w\/[^,\s"]+)/
  );
  if (srcMatch) {
    imgs.push({
      index,
      title: titleMatch ? titleMatch[1] : "",
      url: srcMatch[1],
    });
  }
}

const skip = /plantegning|floor|kart/i;
const filtered = imgs.filter((x) => !skip.test(x.title));

console.log(JSON.stringify(filtered.slice(0, 25), null, 2));

const picks = filtered.filter((x) =>
  /basseng|pool|svømme|eiendom|sjarm|låve|gård|ute|landskap|aerial|drone|våningshus|hovedstue|seremoni|tun/i.test(
    x.title
  )
);
console.log("\nkeyword picks:", JSON.stringify(picks, null, 2));

// Also search basseng in full html titles
const allTitles = imgs.map((x) => `${x.index}: ${x.title}`).filter((t) => t.length > 3);
const basseng = allTitles.filter((t) => /basseng|pool|låve|garasje|uteplass|gårdstun|landskap/i.test(t));
console.log("\nbasseng/barn related:", basseng.join("\n"));
