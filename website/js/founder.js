/** Renders Håvard Pedersen / musician cross-brand block when site.json is ready */
function renderFounderBlock() {
  const root = document.getElementById("founder-block");
  if (!root || !window.SHG?.founder) return;
  const f = window.SHG.founder;
  const ver = window.SHG?.assetVer || "1";
  const highlights = (f.highlights || [])
    .map((h) => `<li>${h}</li>`)
    .join("");
  root.innerHTML = `
    <section class="section section--cream founder-section" aria-labelledby="founder-title">
      <div class="container">
        <div class="feature-row">
          <div class="founder-mark">
            <img src="assets/images/logo.svg?v=${ver}" alt="" width="160" height="160" />
            <p class="founder-brand">${window.SHG.farm?.brandLine || ""}</p>
            <p class="founder-music-tag">${f.musicTagline || ""}</p>
          </div>
          <div>
            <p class="eyebrow">Vertskap — samme person, to verdener</p>
            <h2 id="founder-title">${f.name} — ${f.role}</h2>
            <p class="mb-1">${f.bioShort}</p>
            <ul class="list-visible list-visible--light mb-1">${highlights}</ul>
            <p class="mb-2" style="font-size:0.9rem;color:var(--earth-light)">
              ${(f.traits || []).map((t) => `<span class="badge" style="margin:0.25rem">${t}</span>`).join("")}
            </p>
            <div class="hero-buttons" style="justify-content:flex-start">
              <a href="${f.musicUrl}" class="btn btn-green" target="_blank" rel="noopener noreferrer">${f.musicLabel}</a>
              <a href="om-garden.html" class="btn btn-outline">Om gården</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

document.addEventListener("shg-data-ready", renderFounderBlock);
if (window.SHG?.founder) renderFounderBlock();
