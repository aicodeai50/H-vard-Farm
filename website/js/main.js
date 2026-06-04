(function () {
  const closeMobile = () => {
    document.getElementById("nav-mobile")?.classList.remove("open");
    document.body.style.overflow = "";
  };

  const openMobile = () => {
    document.getElementById("nav-mobile")?.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest(".nav-toggle")) openMobile();
    if (e.target.closest(".nav-mobile-close")) closeMobile();
    if (e.target.closest("#nav-mobile a")) closeMobile();
  });

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
