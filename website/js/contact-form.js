/** Contact form — FormSubmit + URL prefill + i18n */
function t(key, fb) {
  return window.I18N?.t?.(key, fb) ?? fb ?? key;
}

function updateContactFormI18n() {
  const form = document.getElementById("contact-form");
  if (!form || !window.I18N) return;
  const subj = form.querySelector('input[name="_subject"]');
  const auto = form.querySelector('input[name="_autoresponse"]');
  if (subj) subj.value = t("form.subject");
  if (auto) auto.value = t("form.autoresponse");
}

window.updateContactFormI18n = updateContactFormI18n;

(function () {
  const FORM_NEXT = "https://farm.legal/takk.html";
  const form = document.getElementById("contact-form");
  if (!form) return;

  const next = document.getElementById("form-next");
  if (next) next.value = FORM_NEXT;
  document.addEventListener("i18n-ready", updateContactFormI18n);
  document.addEventListener("shg-lang-changed", updateContactFormI18n);
  if (window.I18N?.ready) updateContactFormI18n();

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
  const nivaLabel = { ute: "Outdoor", inne: "Indoor", premium: "Premium" }[niva];
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
      melding.placeholder = `Interested in ${nivaLabel} storage — describe vehicle, length, and season …`;
    }
  }

  form.addEventListener("submit", function () {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = t("form.sending", "Sending …");
    }
  });
})();
