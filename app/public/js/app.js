/** Shared H-vard Farm client utilities */
const App = {
  async api(path, options = {}) {
    const res = await fetch(path, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
      credentials: "same-origin",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.statusText);
    return data;
  },

  toast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  },

  formatNok(cents) {
    return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }).format(cents / 100);
  },

  initTheme() {
    const saved = localStorage.getItem("hf-theme");
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("hf-theme", next);
      });
    });
  },

  async requireAuth(redirect = "/login.html") {
    const { authenticated } = await this.api("/api/auth/session");
    if (!authenticated) {
      window.location.href = redirect;
      return null;
    }
    return authenticated;
  },
};

document.addEventListener("DOMContentLoaded", () => App.initTheme());
