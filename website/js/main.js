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
})();
