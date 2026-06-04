/** Shared header/footer — loads immediately (no empty page without menu) */
const SITE = {
  name: "Søndre Haugen",
  tag: "Farm",
  phone: "901 98 671",
  phoneDisplay: "901 98 671",
  email: "post@sondrehaugen.no",
  emailBobil: "Bobil@sondrehaugen.no",
  address: "Svinndallinna 190 · 1593 Svinndal · Våler, Østfold",
  domain: "farm.legal",
  url: "https://farm.legal",
  tagline: "EVENTS · CELEBRATIONS · WEDDINGS · FEST",
  calendly: "",
  assetVer: "20260604-fix",
};

function assetUrl(path) {
  const sep = path.includes("?") ? "&" : "?";
  return path + sep + "v=" + SITE.assetVer;
}

function buildNav(active = "", transparent = false) {
  const t = transparent ? " site-header--transparent" : "";
  const links = [
    ["index.html", "Home", ""],
    ["om-garden.html", "About", "om"],
    ["bryllup.html", "Weddings", "bryllup"],
    ["selskap.html", "Events", "selskap"],
    ["bobilhotell.html", "Motorhomes", "bobil"],
    ["opplevelser.html", "Experiences", "opplevelser"],
    ["nyheter.html", "News", "nyheter"],
    ["kontakt.html", "Contact", "kontakt"],
  ];
  const navLinks = links
    .map(([href, label, key]) => {
      const cls = key === active ? ' class="nav-link active"' : ' class="nav-link"';
      return `<a href="${href}"${cls}>${label}</a>`;
    })
    .join("");
  const mobileLinks = links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("");

  return {
    skip: `<a class="skip-link" href="#main">Skip to content</a>`,
    header: `
<header class="site-header${t}" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="Søndre Haugen Farm — home">
      <img src="${assetUrl("assets/images/logo.svg")}" alt="" class="logo-img" width="52" height="52" />
      <div class="logo-text">SØNDRE HAUGEN<span>Farm</span></div>
    </a>
    <nav class="nav-desktop" aria-label="Main menu">${navLinks}<a href="kontakt.html" class="nav-link nav-cta">Enquire</a></nav>
    <button type="button" class="nav-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
</header>`,
    mobile: `
<nav class="nav-mobile" aria-label="Mobile menu" id="nav-mobile">
  <button type="button" class="nav-mobile-close" aria-label="Close menu">&times;</button>
  ${mobileLinks}
  <a href="kontakt.html" class="btn btn-primary" style="margin-top:1rem">Enquire</a>
</nav>`,
  };
}

function footerHTML() {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a href="index.html" class="logo" style="margin-bottom:1rem">
        <img src="${assetUrl("assets/images/logo.svg")}" alt="" width="72" height="72" style="margin-bottom:0.75rem" />
        <div class="logo-text" style="color:var(--cream)">SØNDRE HAUGEN<span style="color:var(--gold)">Farm</span></div>
      </a>
      <p class="footer-tagline">${SITE.tagline}</p>
      <p style="opacity:0.85;max-width:300px">Historic farm estate for weddings, events, and motorhome storage — Svinndal, Østfold.</p>
    </div>
    <div>
      <h4>Explore</h4>
      <a href="bryllup.html">Weddings</a>
      <a href="selskap.html">Events &amp; parties</a>
      <a href="bobilhotell.html">Motorhome storage</a>
      <a href="garden-fakta.html">Farm facts</a>
      <a href="opplevelser.html">Experiences</a>
    </div>
    <div>
      <h4>Contact</h4>
      <a href="tel:+4790198671">${SITE.phoneDisplay}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
      <a href="mailto:${SITE.emailBobil}">${SITE.emailBobil}</a>
      <p style="margin-top:0.75rem;font-size:0.9rem;opacity:0.85">${SITE.address}</p>
    </div>
    <div>
      <h4>Site</h4>
      <a href="${SITE.url}">${SITE.domain}</a>
      <a href="kontakt.html#visning">Book a visit</a>
      <a href="nyheter.html">News</a>
      <a href="https://havardpederse.netlify.app" target="_blank" rel="noopener">Håvard Pedersen · music</a>
      <a href="personvern.html">Privacy</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>&copy; ${year} Søndre Haugen Farm · ${SITE.domain}</span>
    <span><a href="personvern.html">Privacy</a> · Svinndallinna 190, 1593 Svinndal</span>
  </div>
</footer>`;
}

function ensureSkipLink(beforeEl, html) {
  let skip = document.querySelector(".skip-link");
  if (!skip) {
    const wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    skip = wrap.firstElementChild;
    beforeEl.parentNode.insertBefore(skip, beforeEl);
  }
}

function ensureMobileNav(afterEl, html) {
  let nav = document.getElementById("nav-mobile");
  const wrap = document.createElement("div");
  wrap.innerHTML = html.trim();
  const fresh = wrap.firstElementChild;
  if (!nav) {
    afterEl.insertAdjacentElement("afterend", fresh);
  } else {
    nav.replaceWith(fresh);
  }
}

function wrapMainContent() {
  if (document.getElementById("main")) return;
  const headerMount = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (!headerMount || !footer) return;

  const main = document.createElement("main");
  main.id = "main";
  main.tabIndex = -1;

  const keepOutside = new Set(["site-header", "site-footer", "nav-mobile"]);
  let node = headerMount.nextSibling;
  const toMove = [];

  while (node && node !== footer) {
    const next = node.nextSibling;
    if (node.nodeType === 1) {
      const id = node.id;
      if (node.tagName !== "SCRIPT" && id !== "nav-mobile" && !keepOutside.has(id)) {
        toMove.push(node);
      }
    }
    node = next;
  }

  if (!toMove.length) return;
  footer.parentNode.insertBefore(main, footer);
  toMove.forEach((el) => main.appendChild(el));
}

function initLayout() {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) {
    const parts = buildNav(h.dataset.active || "", h.dataset.transparent === "true");
    ensureSkipLink(h, parts.skip);
    h.innerHTML = parts.header;
    ensureMobileNav(h, parts.mobile);
  }
  if (f) f.innerHTML = footerHTML();
  wrapMainContent();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLayout);
} else {
  initLayout();
}
