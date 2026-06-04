/** Kontaktskjema — FormSubmit + URL-forhåndsutfylling */
(function () {
  const FORM_NEXT = "https://farm.legal/takk.html";
  const form = document.getElementById("contact-form");
  if (!form) return;

  const next = document.getElementById("form-next");
  if (next) next.value = FORM_NEXT;

  const params = new URLSearchParams(location.search);
  const typeEl = document.getElementById("type");
  const typeMap = {
    bryllup: "bryllup",
    arrangement: "arrangement",
    bobil: "bobil",
    visning: "visning",
    opplevelser: "opplevelser",
  };
  const t = params.get("type");
  if (t && typeMap[t] && typeEl) typeEl.value = typeMap[t];

  const niva = (params.get("niva") || "").toLowerCase();
  const nivaLabel = { ute: "Ute", inne: "Inne", premium: "Premium" }[niva];
  if (nivaLabel && typeEl?.value === "bobil") {
    let hidden = form.querySelector('input[name="bobil_niva"]');
    if (!hidden) {
      hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "bobil_niva";
      form.appendChild(hidden);
    }
    hidden.value = nivaLabel;
    const melding = document.getElementById("melding");
    if (melding && !melding.value.trim()) {
      melding.placeholder = `Ønsker ${nivaLabel}-plass — beskriv kjøretøy, lengde og periode …`;
    }
  }

  form.addEventListener("submit", function () {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = "Sender …";
      btn.disabled = true;
    }
  });
})();
