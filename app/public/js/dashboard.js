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

  let fieldsCache = [];

  function renderHarvest(fields) {
    const upcoming = fields
      .filter((f) => f.harvest_at)
      .sort((a, b) => String(a.harvest_at).localeCompare(String(b.harvest_at)))
      .slice(0, 6);
    document.getElementById("harvest-grid").innerHTML =
      upcoming.length === 0
        ? `<p class="card" style="grid-column:1/-1;color:var(--text-muted)">No harvest dates set. Add fields with a harvest target to plan the season.</p>`
        : upcoming
            .map(
              (f) => `
      <article class="card field-card">
        <span class="field-card__badge">Harvest</span>
        <h3>${f.name}</h3>
        <p class="field-card__meta">${f.crop || "Crop TBD"} · ${f.area_ha} ha</p>
        <p class="field-card__meta" style="font-family:var(--font-mono)">${f.harvest_at}</p>
      </article>`
            )
            .join("");
  }

  async function loadFields() {
    const { fields } = await App.api("/api/fields");
    fieldsCache = fields;
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
    renderHarvest(fields);

    const select = document.getElementById("activity-field-select");
    if (select) {
      select.innerHTML =
        `<option value="">— None —</option>` +
        fields.map((f) => `<option value="${f.id}">${f.name}</option>`).join("");
    }
  }
  await loadFields();

  async function loadActivity() {
    const overviewFresh = await App.api("/api/overview");
    const actHtml =
      overviewFresh.recentActivities.length === 0
        ? "<p style='color:var(--text-muted)'>No activity yet. Log seeding, fertilizing, or harvest work.</p>"
        : `<ul class="activity-list">${overviewFresh.recentActivities
            .map(
              (a) =>
                `<li><strong>${a.type}</strong> ${a.field_name ? `· ${a.field_name}` : ""}<br><span>${a.description || ""}</span></li>`
            )
            .join("")}</ul>`;
    document.getElementById("activity-list").innerHTML = actHtml;
  }
  await loadActivity();

  const weather = await App.api("/api/weather");
  document.getElementById("weather-panel").innerHTML = `
    <p style="font-family:var(--font-mono);font-size:2rem">${weather.temp_c}°C</p>
    <p style="color:var(--text-muted)">${weather.location} · ${weather.condition}</p>
    <p style="font-size:0.875rem;margin-top:var(--space-1)">Wind ${weather.wind_kmh} km/h</p>
    <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:var(--space-2)">${weather.note}</p>
  `;

  const fieldModal = document.getElementById("field-modal");
  document.getElementById("add-field-btn").addEventListener("click", () => fieldModal.classList.add("open"));
  document.getElementById("modal-cancel").addEventListener("click", () => fieldModal.classList.remove("open"));
  document.getElementById("field-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd);
    if (!body.planted_at) delete body.planted_at;
    if (!body.harvest_at) delete body.harvest_at;
    try {
      await App.api("/api/fields", { method: "POST", body: JSON.stringify(body) });
      fieldModal.classList.remove("open");
      e.target.reset();
      await loadFields();
      App.toast("Field added");
    } catch (err) {
      App.toast(err.message);
    }
  });

  const activityModal = document.getElementById("activity-modal");
  document.getElementById("log-activity-btn").addEventListener("click", () => activityModal.classList.add("open"));
  document.getElementById("activity-cancel").addEventListener("click", () => activityModal.classList.remove("open"));
  document.getElementById("activity-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd);
    if (!body.field_id) delete body.field_id;
    try {
      await App.api("/api/activities", { method: "POST", body: JSON.stringify(body) });
      activityModal.classList.remove("open");
      e.target.reset();
      await loadActivity();
      App.toast("Activity logged");
    } catch (err) {
      App.toast(err.message);
    }
  });
});
