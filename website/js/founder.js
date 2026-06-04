/** Renders Håvard Pedersen / musician cross-brand block when site.json is ready */
function renderFounderBlock() {
  const root = document.getElementById("founder-block");
  if (!root || !window.SHG?.founder) return;
  const f = window.SHG.founder;
  root.innerHTML = `
    <section class="section section--cream founder-section" aria-labelledby="founder-title">
      <div class="container">
        <div class="feature-row">
          <div class="founder-mark">
            <img src="assets/images/logo.svg" alt="" width="160" height="160" />
            <p class="founder-brand">${window.SHG.farm?.brandLine || ""}</p>
          </div>
          <div>
            <p class="eyebrow">Vertskap</p>
            <h2 id="founder-title">${f.name} — ${f.role}</h2>
            <p class="mb-1">${f.bioShort}</p>
            <p class="mb-2" style="font-size:0.9rem;color:var(--earth-light)">
              ${(f.traits || []).map((t) => `<span class="badge" style="margin:0.25rem">${t}</span>`).join("")}
            </p>
            <a href="${f.musicUrl}" class="btn btn-green" target="_blank" rel="noopener noreferrer">${f.musicLabel} → havardpederse.netlify.app</a>
          </div>
        </div>
      </div>
    </section>`;
}

document.addEventListener("shg-data-ready", renderFounderBlock);
if (window.SHG?.founder) renderFounderBlock();
