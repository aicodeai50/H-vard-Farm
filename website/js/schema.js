/** JSON-LD for Google — Søndre Haugen Gård */
(function () {
  const data = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Søndre Haugen Gård",
    alternateName: "Søndre Haugen Farm",
    url: "https://farm.legal/",
    image: "https://farm.legal/assets/images/property/hero-aerial.jpg",
    description:
      "Historisk gård fra 1760 — selskapslokale i låven (463 m²), bryllup utendørs, bobilparkering. Leie uten tvungen catering.",
    telephone: "+4790198671",
    email: "post@sondrehaugen.no",
    foundingDate: "1760",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Svinndallinna 190",
      postalCode: "1593",
      addressLocality: "Svinndal",
      addressRegion: "Østfold",
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 59.385,
      longitude: 10.946,
    },
    sameAs: [
      "https://www.facebook.com/share/1D2QnLT5sP/",
      "https://maps.app.goo.gl/iENmA7WZw2iqWbvR7",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Barn event hall", value: "463 m²" },
      { "@type": "LocationFeatureSpecification", name: "Outdoor ceremony area" },
      { "@type": "LocationFeatureSpecification", name: "Motorhome parking" },
      { "@type": "LocationFeatureSpecification", name: "Film & production location", value: "Commercial shoots, photography and creative projects" },
    ],
    maximumAttendeeCapacity: 100,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
})();
