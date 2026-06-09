const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const statsBlock = `
  <section class="section section--dark section--stats">
    <div class="container stats">
      <div class="stat">
        <div class="stat-value">1760</div>
        <div class="stat-label" data-i18n="home.stats.established">etablert</div>
      </div>
      <div class="stat">
        <div class="stat-value">463</div>
        <div class="stat-label" data-i18n="home.stats.barn">m² låve</div>
      </div>
      <div class="stat">
        <div class="stat-value">100</div>
        <div class="stat-label" data-i18n="home.stats.guests">gjester innendørs</div>
      </div>
      <div class="stat">
        <div class="stat-value">10+</div>
        <div class="stat-label" data-i18n="home.stats.grounds">mål tomt</div>
      </div>
    </div>
  </section>
`;

const offersIntro = `
      <div class="section-intro">
        <h2 data-i18n="home.suits.h2">Søndre Haugen Gård passer for</h2>
        <p class="lead" data-i18n="home.capacity">Vi har plass til arrangementer for inntil ca. 100 personer innendørs, og gode muligheter for større eller mer uformelle arrangementer ute på gården.</p>
      </div>
`;

if (!html.includes("section--stats")) {
  html = html.replace(
    /(<section class="section section--cream">[\s\S]*?<\/section>)\s*/,
    "$1\n" + statsBlock + "\n"
  );
}

if (!html.includes("section-intro")) {
  html = html.replace(
    '<div class="home-offers">',
    offersIntro + '\n      <div class="home-offers">'
  );
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("index enhanced");
