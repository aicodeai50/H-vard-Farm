/** Shared header/footer — loads immediately (no empty page without menu) */
const SITE = {
  name: "Søndre Haugen",
  tag: "gård",
  phone: "901 98 671",
  phoneDisplay: "901 98 671",
  email: "post@sondrehaugen.no",
  emailBobil: "Bobil@sondrehaugen.no",
  address: "Søndre Haugen gård, 2436 Våler i Østfold",
  domain: "farm.legal",
  url: "https://farm.legal",
  tagline: "EVENT · SELSKAP · BRYLLUP · FEST",
  /** Sett Calendly-lenke når klar, f.eks. https://calendly.com/sondrehaugen/visning */
  calendly: "",
};

function headerHTML(active = "", transparent = false) {
  const t = transparent ? " site-header--transparent" : "";
  const links = [
    ["index.html", "Hjem", ""],
    ["om-garden.html", "Om gården", "om"],
    ["bryllup.html", "Bryllup", "bryllup"],
    ["selskap.html", "Selskap", "selskap"],
    ["bobilhotell.html", "Bobil", "bobil"],
    ["opplevelser.html", "Opplevelser", "opplevelser"],
    ["nyheter.html", "Nyheter", "nyheter"],
    ["kontakt.html", "Kontakt", "kontakt"],
  ];
  const navLinks = links
    .map(([href, label, key]) => {
      const cls = key === active ? ' class="nav-link active"' : ' class="nav-link"';
      return `<a href="${href}"${cls}>${label}</a>`;
    })
    .join("");
  const mobileLinks = links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("");

  return `
<header class="site-header${t}" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="Søndre Haugen gård — forsiden">
      <img src="assets/images/logo.svg" alt="" class="logo-img" width="52" height="52" />
      <div class="logo-text">SØNDRE HAUGEN<span>gård</span></div>
    </a>
    <nav class="nav-desktop" aria-label="Hovedmeny">${navLinks}<a href="kontakt.html" class="nav-link nav-cta">Send forespørsel</a></nav>
    <button type="button" class="nav-toggle" aria-label="Åpne meny"><span></span><span></span><span></span></button>
  </div>
</header>
<nav class="nav-mobile" aria-label="Mobilmeny" id="nav-mobile">
  <button type="button" class="nav-mobile-close" aria-label="Lukk meny">&times;</button>
  ${mobileLinks}
  <a href="kontakt.html" class="btn btn-primary" style="margin-top:1rem">Send forespørsel</a>
</nav>`;
}

function footerHTML() {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a href="index.html" class="logo" style="margin-bottom:1rem">
        <img src="assets/images/logo.svg" alt="" width="72" height="72" style="margin-bottom:0.75rem" />
        <div class="logo-text" style="color:var(--cream)">SØNDRE HAUGEN<span style="color:var(--gold)">gård</span></div>
      </a>
      <p class="footer-tagline">${SITE.tagline}</p>
      <p style="opacity:0.85;max-width:300px">Historiske omgivelser for livets store øyeblikk — bryllup, selskaper og bobilhotell i Våler, Østfold.</p>
    </div>
    <div>
      <h4>Oppdag</h4>
      <a href="bryllup.html">Bryllup</a>
      <a href="selskap.html">Selskap &amp; arrangementer</a>
      <a href="bobilhotell.html">Bobilhotell</a>
      <a href="garden-fakta.html">Gården — fakta</a>
      <a href="opplevelser.html">Opplevelser</a>
    </div>
    <div>
      <h4>Kontakt</h4>
      <a href="tel:+4790198671">${SITE.phoneDisplay}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
      <a href="mailto:${SITE.emailBobil}">${SITE.emailBobil}</a>
      <p style="margin-top:0.75rem;font-size:0.9rem;opacity:0.85">${SITE.address}</p>
    </div>
    <div>
      <h4>Nettsted</h4>
      <a href="${SITE.url}">${SITE.domain}</a>
      <a href="kontakt.html#visning">Book visning</a>
      <a href="nyheter.html">Nyheter</a>
      <a href="https://havardpederse.netlify.app" target="_blank" rel="noopener">Håvard Pedersen · musikk</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>&copy; ${year} Søndre Haugen gård · ${SITE.domain} · et prosjekt under Håvard Pedersen</span>
    <span>2436 Våler i Østfold</span>
  </div>
</footer>`;
}

function initLayout() {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.innerHTML = headerHTML(h.dataset.active || "", h.dataset.transparent === "true");
  if (f) f.innerHTML = footerHTML();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLayout);
} else {
  initLayout();
}
