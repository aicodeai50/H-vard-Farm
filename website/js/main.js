(function () {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("nav-mobile");
  const closeBtn = document.querySelector(".nav-mobile-close");

  const openMobile = () => {
    mobileNav?.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMobile = () => {
    mobileNav?.classList.remove("open");
    document.body.style.overflow = "";
  };

  toggle?.addEventListener("click", openMobile);
  closeBtn?.addEventListener("click", closeMobile);
  mobileNav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobile));

  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn?.textContent;
      if (btn) {
        btn.textContent = "Thank you — we will be in touch";
        btn.disabled = true;
      }
      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
        }
      }, 4000);
    });
  });
})();
