document.addEventListener("DOMContentLoaded", async () => {
  const authed = await App.requireAuth();
  if (!authed) return;

  const { user } = await App.api("/api/me");
  document.getElementById("user-label").textContent = user.name;

  document.getElementById("logout-btn").addEventListener("click", async () => {
    await App.api("/api/auth/logout", { method: "POST" });
    window.location.href = "/login.html";
  });

  const overview = await App.api("/api/overview");
  document.getElementById("stats").innerHTML = `
    <div class="card stat-card"><div class="stat-card__value">${overview.stats.fields}</div><div class="stat-card__label">Fields</div></div>
    <div class="card stat-card"><div class="stat-card__value">${overview.stats.activeCrops}</div><div class="stat-card__label">Active crops</div></div>
    <div class="card stat-card"><div class="stat-card__value">${App.formatNok(overview.stats.balance_cents)}</div><div class="stat-card__label">Balance</div></div>
    <div class="card stat-card"><div class="stat-card__value" style="text-transform:capitalize">${overview.stats.plan}</div><div class="stat-card__label">Plan</div></div>
  `;

  async function loadFields() {
    const { fields } = await App.api("/api/fields");
    document.getElementById("fields-grid").innerHTML = fields
      .map(
        (f) => `
      <article class="card field-card">
        <span class="field-card__badge">${f.status}</span>
        <h3>${f.name}</h3>
        <p class="field-card__meta">${f.area_ha} ha · ${f.crop || "No crop set"}</p>
        ${f.harvest_at ? `<p class="field-card__meta">Harvest: ${f.harvest_at}</p>` : ""}
      </article>`
      )
      .join("");
  }
  await loadFields();

  const weather = await App.api("/api/weather");
  document.getElementById("weather-panel").innerHTML = `
    <p style="font-family:var(--font-mono);font-size:2rem">${weather.temp_c}°C</p>
    <p style="color:var(--text-muted)">${weather.location} · ${weather.condition}</p>
    <p style="font-size:0.875rem;margin-top:var(--space-1)">Wind ${weather.wind_kmh} km/h</p>
  `;

  const actHtml =
    overview.recentActivities.length === 0
      ? "<p style='color:var(--text-muted)'>No activity yet.</p>"
      : `<ul style="list-style:none">${overview.recentActivities
          .map(
            (a) =>
              `<li style="padding:8px 0;border-bottom:1px solid var(--border);font-size:0.9375rem"><strong>${a.type}</strong> ${a.field_name ? `· ${a.field_name}` : ""}<br><span style="color:var(--text-muted);font-size:0.8125rem">${a.description || ""}</span></li>`
          )
          .join("")}</ul>`;
  document.getElementById("activity-list").innerHTML = actHtml;

  const modal = document.getElementById("field-modal");
  document.getElementById("add-field-btn").addEventListener("click", () => modal.classList.add("open"));
  document.getElementById("modal-cancel").addEventListener("click", () => modal.classList.remove("open"));
  document.getElementById("field-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await App.api("/api/fields", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      modal.classList.remove("open");
      e.target.reset();
      await loadFields();
      App.toast("Field added");
    } catch (err) {
      App.toast(err.message);
    }
  });
});
