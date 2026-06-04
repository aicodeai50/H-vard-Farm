/** Book a visit — Calendly when SITE.calendly is set in components.js */
(function () {
  const slot = document.getElementById("booking-visning");
  if (!slot || typeof SITE === "undefined") return;

  if (SITE.calendly) {
    slot.innerHTML =
      '<div class="calendly-wrap"><iframe src="' +
      SITE.calendly +
      '" title="Book a visit" style="width:100%;min-height:620px;border:0;border-radius:4px" loading="lazy"></iframe></div>';
  }
})();
