/** SEO metadata first — canonical, robots, sitemap, Open Graph (farm.legal) */
(function () {
  const BASE = "https://farm.legal";
  const SITEMAP = BASE + "/sitemap.xml";
  const GOOGLE_VERIFY = "1iAOryKfYzwHdKX1Cw8k0UISIsqrgIic3TlDsAYub8M";

  const path = window.location.pathname.replace(/\\/g, "/");
  const canonicalPath =
    path === "/" || path === "/index.html" || path.endsWith("/index.html")
      ? "/"
      : path.startsWith("/")
        ? path
        : "/" + path;
  const canonical = BASE + canonicalPath;

  const isNoindexPage = /\/(takk|404)\.html$/i.test(path);

  function prependToHead(node) {
    const head = document.head;
    const anchor = head.querySelector("meta, link, title, script");
    if (anchor) head.insertBefore(node, anchor);
    else head.appendChild(node);
  }

  function setMeta(attr, key, content) {
    let el = document.querySelector("meta[" + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      prependToHead(el);
    }
    el.setAttribute("content", content);
  }

  function ensureLink(rel, href, attrs) {
    let el = document.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      prependToHead(el);
    }
    el.href = href;
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    }
    return el;
  }

  /* --- Metadata first (Search Console, crawlers) --- */
  setMeta("name", "google-site-verification", GOOGLE_VERIFY);
  setMeta("name", "robots", isNoindexPage ? "noindex, follow" : "index, follow");
  ensureLink("sitemap", SITEMAP, { type: "application/xml", title: "Sitemap" });

  /* --- Canonical --- */
  ensureLink("canonical", canonical);

  /* --- Open Graph / Twitter --- */
  setMeta("property", "og:url", canonical);
  setMeta("property", "og:site_name", "Søndre Haugen Farm");
  setMeta("property", "og:image", BASE + "/assets/images/property/hero-aerial.jpg?v=20260604-photos");
  setMeta("property", "og:image:width", "1920");
  setMeta("property", "og:image:height", "1080");
  setMeta("name", "twitter:image", BASE + "/assets/images/property/hero-aerial.jpg?v=20260604-photos");
  setMeta("name", "twitter:card", "summary_large_image");

  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    ensureLink("apple-touch-icon", "/assets/images/logo-icon.png");
  }

  if (!document.querySelector('link[rel="manifest"]')) {
    ensureLink("manifest", "/site.webmanifest");
  }

  let theme = document.querySelector('meta[name="theme-color"]');
  if (!theme) {
    theme = document.createElement("meta");
    theme.name = "theme-color";
    theme.content = "#1a3c34";
    document.head.appendChild(theme);
  }
})();
