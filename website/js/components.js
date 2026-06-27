/** Shared header/footer + language switcher */
const SITE = {
  name: "Søndre Haugen",
  phone: "901 98 671",
  phoneDisplay: "901 98 671",
  email: "post@sondrehaugen.no",
  emailBobil: "Bobil@sondrehaugen.no",
  address: "Svinndallinna 190 · 1593 Svinndal · Våler, Østfold",
  domain: "farm.legal",
  url: "https://farm.legal",
  calendly: "",
  assetVer: "20260627-restore",
};

function t(key, fallback) {
  return window.I18N?.t?.(key, fallback) ?? fallback ?? key;
}

function assetUrl(path) {
  const sep = path.includes("?") ? "&" : "?";
  return path + sep + "v=" + SITE.assetVer;
}

function langSwitcherHTML() {
  const lang = window.I18N?.lang || "nb";
  return `
<div class="lang-switch" role="group" aria-label="${t("common.lang", "Language")}">
  <button type="button" class="lang-btn${lang === "nb" ? " lang-btn--active" : ""}" data-lang="nb" aria-pressed="${lang === "nb"}" title="${t("common.langNo", "Norwegian")}">
    <span class="lang-flag" aria-hidden="true">🇳🇴</span><span class="lang-code">NO</span>
  </button>
  <button type="button" class="lang-btn${lang === "en" ? " lang-btn--active" : ""}" data-lang="en" aria-pressed="${lang === "en"}" title="${t("common.langEn", "English")}">
    <span class="lang-flag" aria-hidden="true">🇬🇧</span><span class="lang-code">EN</span>
  </button>
</div>`;
}

function buildNav(active = "") {
  const links = [
    ["arrangement.html", "nav.arrangement", "arrangement"],
    ["bryllup.html", "nav.weddingsLove", "bryllup"],
    ["selskap.html", "nav.parties", "selskap"],
    ["moter-firma.html", "nav.corporate", "moter"],
    ["film-produksjon.html", "nav.film", "film"],
    ["mat-servering.html", "nav.catering", "mat"],
    ["lokaler.html", "nav.venues", "lokaler"],
    ["kontakt.html", "nav.contact", "kontakt"],
  ];
  const navLinks = links
    .map(([href, key, k]) => {
      const cls = k === active ? ' class="nav-link active"' : ' class="nav-link"';
      return `<a href="${href}"${cls}>${t(key)}</a>`;
    })
    .join("");
  const mobileLinks = links.map(([href, key]) => `<a href="${href}">${t(key)}</a>`).join("");

  return {
    skip: `<a class="skip-link" href="#main">${t("common.skip")}</a>`,
    header: `
<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="Søndre Haugen Gård — ${t("nav.home")}">
      <img src="${assetUrl("assets/images/logo-brand.png")}" alt="Søndre Haugen Gård" class="logo-lockup logo-lockup--full" width="72" height="72" />
    </a>
    <nav class="nav-desktop" aria-label="Main menu">${navLinks}<a href="kontakt.html" class="nav-link nav-cta">${t("common.enquire")}</a></nav>
    ${langSwitcherHTML()}
    <button type="button" class="nav-toggle" aria-label="${t("common.openMenu")}"><span></span><span></span><span></span></button>
  </div>
</header>`,
    mobile: `
<nav class="nav-mobile" aria-label="Mobile menu" id="nav-mobile">
  <button type="button" class="nav-mobile-close" aria-label="${t("common.closeMenu")}">&times;</button>
  ${langSwitcherHTML()}
  ${mobileLinks}
  <a href="film-produksjon.html" class="nav-mobile-extra">${t("nav.film")}</a>
  <a href="om-garden.html" class="nav-mobile-extra">${t("nav.about")}</a>
  <a href="bobilhotell.html" class="nav-mobile-extra">${t("nav.motorhomes")}</a>
  <a href="kontakt.html" class="btn btn-primary" style="margin-top:1rem">${t("common.enquire")}</a>
</nav>`,
  };
}

function footerHTML() {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a href="index.html" class="footer-brand">
        <img src="${assetUrl("assets/images/logo-brand.png")}" alt="Søndre Haugen Gård" class="footer-lockup" width="180" height="180" />
      </a>
      <p class="footer-tagline">${t("brand.tagline")}</p>
      <p style="opacity:0.85;max-width:300px">${t("footer.blurb")}</p>
    </div>
    <div>
      <h4>${t("footer.explore")}</h4>
      <a href="arrangement.html">${t("nav.arrangement")}</a>
      <a href="bryllup.html">${t("nav.weddingsLove")}</a>
      <a href="selskap.html">${t("nav.parties")}</a>
      <a href="moter-firma.html">${t("nav.corporate")}</a>
      <a href="mat-servering.html">${t("nav.catering")}</a>
      <a href="lokaler.html">${t("nav.venues")}</a>
      <a href="om-garden.html">${t("nav.about")}</a>
      <a href="garden-fakta.html">${t("footer.farmFacts")}</a>
      <a href="opplevelser.html">${t("nav.experiences")}</a>
      <a href="film-produksjon.html">${t("footer.film")}</a>
      <a href="nyheter.html">${t("nav.news")}</a>
      <a href="bobilhotell.html">${t("footer.motorhomeSmall")}</a>
    </div>
    <div>
      <h4>${t("footer.contact")}</h4>
      <a href="tel:+4790198671">${SITE.phoneDisplay}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
      <a href="mailto:${SITE.emailBobil}">${SITE.emailBobil}</a>
      <p style="margin-top:0.75rem;font-size:0.9rem;opacity:0.85">${SITE.address}</p>
    </div>
    <div>
      <h4>${t("footer.site")}</h4>
      <a href="${SITE.url}">${SITE.domain}</a>
      <a href="kontakt.html#visning">${t("common.bookVisit")}</a>
      <a href="https://www.facebook.com/share/1D2QnLT5sP/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">${t("footer.facebook")}</a>
      <a href="personvern.html">${t("common.privacy")}</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>&copy; ${year} Søndre Haugen ${t("brand.tag")} · ${SITE.domain}</span>
    <span>
      <a href="https://havardpederse.netlify.app/" target="_blank" rel="noopener noreferrer">${t("footer.musicLink")}</a>
      · <a href="personvern.html">${t("common.privacy")}</a> · Svinndallinna 190, 1593 Svinndal
    </span>
  </div>
</footer>`;
}

function ensureSkipLink(beforeEl, html) {
  const existing = document.querySelector(".skip-link");
  if (existing) existing.remove();
  const wrap = document.createElement("div");
  wrap.innerHTML = html.trim();
  beforeEl.parentNode.insertBefore(wrap.firstElementChild, beforeEl);
}

function ensureMobileNav(afterEl, html) {
  const wrap = document.createElement("div");
  wrap.innerHTML = html.trim();
  const fresh = wrap.firstElementChild;
  let nav = document.getElementById("nav-mobile");
  if (!nav) afterEl.insertAdjacentElement("afterend", fresh);
  else nav.replaceWith(fresh);
}

function wrapMainContent() {
  if (document.getElementById("main")) return;
  const headerMount = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (!headerMount || !footer) return;

  const main = document.createElement("main");
  main.id = "main";
  main.tabIndex = -1;

  let node = headerMount.nextSibling;
  const toMove = [];
  while (node && node !== footer) {
    const next = node.nextSibling;
    if (node.nodeType === 1 && node.id !== "nav-mobile" && node.id !== "site-header" && node.id !== "site-footer" && node.tagName !== "SCRIPT") {
      toMove.push(node);
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
    const parts = buildNav(h.dataset.active || "");
    ensureSkipLink(h, parts.skip);
    h.innerHTML = parts.header;
    ensureMobileNav(h, parts.mobile);
    window.I18N?.bindLangButtons?.();
  }
  if (f) f.innerHTML = footerHTML();
  wrapMainContent();
}

window.refreshSiteLayout = initLayout;

function bootSite() {
  initLayout();
  window.I18N?.applyPage?.();
  window.I18N?.bindLangButtons?.();
}

document.addEventListener("i18n-ready", bootSite);
document.addEventListener("shg-lang-changed", () => {
  initLayout();
  window.I18N?.bindLangButtons?.();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.I18N?.ready) bootSite();
  });
} else if (window.I18N?.ready) {
  bootSite();
}
