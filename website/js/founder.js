/** Håvard / Gretsch block — uses i18n */
function t(key, fb) {
  return window.I18N?.t?.(key, fb) ?? fb ?? key;
}

function renderFounderBlock() {
  const root = document.getElementById("founder-block");
  if (!root) return;

  const ver = window.SHG?.assetVer || SITE?.assetVer || "1";
  const compact = root.dataset.gretsch === "compact";
  const brandLine = t("brand.line");
  const musicTag = "Raw. Real. Live.";

  let gretschHtml = "";
  if (compact) {
    gretschHtml = `<p class="gretsch-compact mb-1" data-i18n-html="founder.gretschCompact">${t("founder.gretschCompact")}</p>`;
  } else {
    gretschHtml = `
      <aside class="gretsch-note mt-2" aria-labelledby="gretsch-title">
        <p class="eyebrow" style="margin-bottom:0.35rem">${t("founder.gretschTitle")}</p>
        <h3 id="gretsch-title" style="font-family:var(--font-serif);font-size:1.25rem;margin-bottom:0.5rem">${t("founder.gretschWelcome")}</h3>
        <p class="mb-1" style="font-size:0.95rem">${t("founder.gretschBody")}</p>
        <p style="font-size:0.85rem;color:var(--earth-light);font-style:italic">${t("founder.gretschNote")}</p>
      </aside>`;
  }

  root.innerHTML = `
    <section class="section section--cream founder-section" aria-labelledby="founder-title">
      <div class="container">
        <div class="feature-row">
          <div class="founder-mark">
            <img src="assets/images/logo.svg?v=${ver}" alt="" width="140" height="140" />
            <p class="founder-brand">${brandLine}</p>
            <p class="founder-music-tag">${musicTag}</p>
          </div>
          <div>
            <p class="eyebrow">${t("founder.eyebrow")}</p>
            <h2 id="founder-title">Håvard Pedersen</h2>
            <p class="mb-1" style="color:var(--earth-light)">${t("founder.role")}</p>
            <p class="mb-1">${t("founder.bio")}</p>
            ${gretschHtml}
            <ul class="list-visible list-visible--light mb-1">
              <li>${t("founder.h3")}</li>
              <li>${t("founder.h2")}</li>
              <li>${t("founder.h1")}</li>
            </ul>
            <div class="hero-buttons" style="justify-content:flex-start">
              <a href="https://havardpederse.netlify.app" class="btn btn-green" target="_blank" rel="noopener noreferrer">${t("founder.musicLabel")}</a>
              <a href="om-garden.html" class="btn btn-outline">${t("founder.aboutFarm")}</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  if (compact && window.I18N) {
    const el = root.querySelector("[data-i18n-html]");
    if (el) el.innerHTML = t("founder.gretschCompact");
  }
}

window.renderFounderBlock = renderFounderBlock;

document.addEventListener("shg-data-ready", renderFounderBlock);
document.addEventListener("i18n-ready", renderFounderBlock);
document.addEventListener("shg-lang-changed", renderFounderBlock);
