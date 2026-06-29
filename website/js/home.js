(function () {
  document.documentElement.classList.add("js-anim");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    document.querySelectorAll(".hero-content--animate").forEach((el) => {
      el.classList.add("is-visible");
    });

    const revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  } else {
    document.querySelectorAll(".reveal, .hero-content--animate").forEach((el) => {
      el.classList.add("is-visible");
    });
  }
})();
