/** Live site data — data/site.json with inline fallback if fetch fails */
(function () {
  const ASSET_VER = "20260604-fix";
  const FALLBACK = {
    assetVer: ASSET_VER,
    farm: {
      name: "Søndre Haugen Farm",
      brandLine: "Historic. Real. Yours.",
      location: "Svinndallinna 190 · 1593 Svinndal · Våler, Østfold",
    },
    founder: {
      name: "Håvard Pedersen",
      role: "Host & operations",
      musicUrl: "https://havardpederse.netlify.app",
      musicLabel: "Music · Håvard Pedersen",
      musicTagline: "Raw. Real. Live.",
      bioShort:
        "Norwegian guitarist, singer, and songwriter. At Søndre Haugen Farm he hosts weddings, celebrations, and motorhome guests; on stage he plays blues-rock with The Blues Is Alright Band.",
      traits: ["Authentic", "Quality", "100% live", "Tailored"],
      highlights: [
        "Endorsed artist · the Gretsch Company",
        "Mezzabarba · The Blues Is Alright Band",
        "Album guests: John Norum · Ronni Le Tekrø",
      ],
      gretsch: {
        title: "Gretsch endorsement",
        body: "Official Gretsch-endorsed artist — welcomed into the Gretsch family in the spirit of the 135th anniversary.",
        publicNote:
          "In public posts and social media, please reference the Gretsch Company only.",
        moreUrl: "om-garden.html",
      },
    },
  };

  function applyData(data) {
    window.SHG = { assetVer: ASSET_VER, ...data };
    document.dispatchEvent(new CustomEvent("shg-data-ready", { detail: window.SHG }));
  }

  window.SHG = { assetVer: ASSET_VER };

  fetch("data/site.json")
    .then((r) => {
      if (!r.ok) throw new Error("site.json " + r.status);
      return r.json();
    })
    .then(applyData)
    .catch(() => {
      console.warn("site.json unavailable — using inline fallback");
      applyData(FALLBACK);
    });
})();
