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
})();
