/** Book visning — Calendly når SITE.calendly er satt i components.js */
(function () {
  const slot = document.getElementById("booking-visning");
  if (!slot || typeof SITE === "undefined") return;

  if (SITE.calendly) {
    slot.innerHTML =
      '<div class="calendly-wrap"><iframe src="' +
      SITE.calendly +
      '" title="Book visning" style="width:100%;min-height:620px;border:0;border-radius:4px" loading="lazy"></iframe></div>';
  }
})();
