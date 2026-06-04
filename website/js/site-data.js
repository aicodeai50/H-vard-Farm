/** Live site data — loaded from data/site.json (real project, not hardcoded mock) */
window.SHG = window.SHG || {};

fetch("data/site.json")
  .then((r) => r.json())
  .then((data) => {
    window.SHG = { assetVer: "20260604-pro", ...data };
    document.dispatchEvent(new CustomEvent("shg-data-ready", { detail: data }));
  })
  .catch(() => {
    console.warn("site.json unavailable — using inline defaults");
  });
