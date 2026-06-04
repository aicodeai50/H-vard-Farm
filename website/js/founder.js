/** Håvard / Gretsch block — compact on home, full detail on About */
function renderFounderBlock() {
  const root = document.getElementById("founder-block");
  if (!root || !window.SHG?.founder) return;

  const f = window.SHG.founder;
  const g = f.gretsch;
  const ver = window.SHG.assetVer || SITE?.assetVer || "1";
  const compact = root.dataset.gretsch === "compact";
  const highlights = (f.highlights || []).map((h) => `<li>${h}</li>`).join("");

  let gretschHtml = "";
  if (g) {
    if (compact) {
      gretschHtml = `
        <p class="gretsch-compact mb-1">
          Endorsed artist with <strong>the Gretsch Company</strong>.
          <a href="${g.moreUrl || "om-garden.html"}">About Håvard &amp; Gretsch →</a>
        </p>`;
    } else {
      gretschHtml = `
        <aside class="gretsch-note mt-2" aria-labelledby="gretsch-title">
          <p class="eyebrow" style="margin-bottom:0.35rem">${g.title}</p>
          <h3 id="gretsch-title" style="font-family:var(--font-serif);font-size:1.25rem;margin-bottom:0.5rem">Welcome to the Gretsch family</h3>
          <p class="mb-1" style="font-size:0.95rem">${g.body}</p>
          <p style="font-size:0.85rem;color:var(--earth-light);font-style:italic">${g.publicNote}</p>
        </aside>`;
    }
  }

  root.innerHTML = `
    <section class="section section--cream founder-section" aria-labelledby="founder-title">
      <div class="container">
        <div class="feature-row">
          <div class="founder-mark">
            <img src="assets/images/logo.svg?v=${ver}" alt="" width="140" height="140" />
            <p class="founder-brand">${window.SHG.farm?.brandLine || ""}</p>
            <p class="founder-music-tag">${f.musicTagline || ""}</p>
          </div>
          <div>
            <p class="eyebrow">Host</p>
            <h2 id="founder-title">${f.name}</h2>
            <p class="mb-1" style="color:var(--earth-light)">${f.role}</p>
            <p class="mb-1">${f.bioShort}</p>
            ${gretschHtml}
            <ul class="list-visible list-visible--light mb-1">${highlights}</ul>
            <div class="hero-buttons" style="justify-content:flex-start">
              <a href="${f.musicUrl}" class="btn btn-green" target="_blank" rel="noopener noreferrer">${f.musicLabel}</a>
              <a href="om-garden.html" class="btn btn-outline">About the farm</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

document.addEventListener("shg-data-ready", renderFounderBlock);
