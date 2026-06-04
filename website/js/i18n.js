/** Bilingual UI — Norwegian (nb) and English (en) */
(function () {
  const STORAGE_KEY = "shg-lang";
  const DEFAULT_LANG = "nb";

  const I18N = {
    lang: DEFAULT_LANG,
    dict: { en: {}, nb: {} },
    ready: false,
  };

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "nb") return saved;
    const nav = (navigator.language || "").toLowerCase();
    return nav.startsWith("en") ? "en" : "nb";
  }

  function t(key, fallback) {
    const val = I18N.dict[I18N.lang]?.[key];
    if (val != null && val !== "") return val;
    const alt = I18N.lang === "en" ? I18N.dict.nb?.[key] : I18N.dict.en?.[key];
    return alt || fallback || key;
  }

  function applyPage() {
    document.documentElement.lang = I18N.lang === "nb" ? "nb" : "en";

    const page = document.body?.dataset?.page;
    if (page) {
      const title = t("meta." + page + ".title");
      const desc = t("meta." + page + ".description");
      if (title && title !== "meta." + page + ".title") document.title = title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && desc) metaDesc.setAttribute("content", desc);
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = t(key);
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = val;
      else el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    document.querySelectorAll("[data-i18n-value]").forEach((el) => {
      el.value = t(el.getAttribute("data-i18n-value"));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.alt = t(el.getAttribute("data-i18n-alt"));
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const on = btn.getAttribute("data-lang") === I18N.lang;
      btn.classList.toggle("lang-btn--active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    document.dispatchEvent(new CustomEvent("shg-lang-changed", { detail: { lang: I18N.lang } }));
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "nb") return;
    I18N.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyPage();
    if (typeof window.refreshSiteLayout === "function") window.refreshSiteLayout();
    if (typeof window.updateContactFormI18n === "function") window.updateContactFormI18n();
  }

  function bindLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }

  I18N.bindLangButtons = bindLangButtons;

  I18N.lang = detectLang();
  I18N.t = t;
  I18N.setLang = setLang;
  I18N.applyPage = applyPage;
  window.I18N = I18N;

  fetch("data/i18n.json")
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((data) => {
      I18N.dict = data;
      I18N.ready = true;
      applyPage();
      bindLangButtons();
      document.dispatchEvent(new CustomEvent("i18n-ready"));
    })
    .catch(() => {
      console.warn("i18n.json unavailable");
      I18N.ready = true;
      applyPage();
      bindLangButtons();
      document.dispatchEvent(new CustomEvent("i18n-ready"));
    });
})();
