/** Canonical URL and Open Graph — always farm.legal */
(function () {
  const BASE = "https://farm.legal";
  const path = window.location.pathname.replace(/\\/g, "/");
  const canonicalPath =
    path === "/" || path === "/index.html" || path.endsWith("/index.html")
      ? "/"
      : path.startsWith("/")
        ? path
        : "/" + path;
  const canonical = BASE + canonicalPath;

  function setMeta(attr, key, content) {
    let el = document.querySelector("meta[" + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = canonical;

  setMeta("property", "og:url", canonical);
  setMeta("property", "og:site_name", "Søndre Haugen gård");
  setMeta("property", "og:image", BASE + "/assets/images/og-share.svg");
  setMeta("property", "og:image:width", "1200");
  setMeta("property", "og:image:height", "630");
  setMeta("name", "twitter:image", BASE + "/assets/images/og-share.svg");

  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const apple = document.createElement("link");
    apple.rel = "apple-touch-icon";
    apple.href = "/assets/images/logo.svg";
    document.head.appendChild(apple);
  }

  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = "/site.webmanifest";
    document.head.appendChild(manifest);
  }

  let theme = document.querySelector('meta[name="theme-color"]');
  if (!theme) {
    theme = document.createElement("meta");
    theme.name = "theme-color";
    theme.content = "#1a3c34";
    document.head.appendChild(theme);
  }
})();
