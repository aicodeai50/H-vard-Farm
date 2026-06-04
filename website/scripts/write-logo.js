const fs = require("fs");
const path = require("path");

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="S\u00f8ndre Haugen g\u00e5rd">
  <defs>
    <linearGradient id="ring-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8dcc8"/>
      <stop offset="100%" stop-color="#c17f59"/>
    </linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a7a6e"/>
      <stop offset="100%" stop-color="#1a3c34"/>
    </linearGradient>
    <clipPath id="circle-clip">
      <circle cx="200" cy="200" r="168"/>
    </clipPath>
  </defs>
  <circle cx="200" cy="200" r="196" fill="#f6efe4" stroke="url(#ring-gold)" stroke-width="5"/>
  <circle cx="200" cy="200" r="176" fill="none" stroke="#1a3c34" stroke-width="1.5" opacity="0.35"/>
  <path id="top-arc" fill="none" d="M 72 118 A 128 128 0 0 1 328 118"/>
  <text font-family="Georgia, 'Cormorant Garamond', serif" font-size="17" font-weight="700" letter-spacing="0.22em" fill="#1a3c34">
    <textPath href="#top-arc" startOffset="50%" text-anchor="middle">S\u00d8NDRE HAUGEN</textPath>
  </text>
  <path id="bottom-arc" fill="none" d="M 328 282 A 128 128 0 0 1 72 282"/>
  <text font-family="Georgia, 'Cormorant Garamond', serif" font-size="15" font-weight="600" letter-spacing="0.28em" fill="#c17f59">
    <textPath href="#bottom-arc" startOffset="50%" text-anchor="middle">G\u00c5RD \u00b7 Svinndal</textPath>
  </text>
  <g clip-path="url(#circle-clip)">
    <rect x="32" y="32" width="336" height="336" fill="url(#sky)"/>
    <path d="M32 260 Q120 210 200 230 Q280 205 368 250 L368 368 L32 368 Z" fill="#2d5a4f"/>
    <path d="M32 285 Q150 245 200 260 Q250 240 368 278 L368 368 L32 368 Z" fill="#1a3c34"/>
    <g transform="translate(188 168)">
      <polygon points="-34,0 0,-22 34,0" fill="#5c4f3f"/>
      <rect x="-30" y="0" width="60" height="42" fill="#d4a855" stroke="#5c4f3f" stroke-width="1.2"/>
      <rect x="-18" y="12" width="10" height="14" fill="#f6efe4" opacity="0.9"/>
      <rect x="8" y="12" width="10" height="14" fill="#f6efe4" opacity="0.9"/>
      <rect x="-6" y="24" width="12" height="18" fill="#5c4f3f"/>
    </g>
    <g transform="translate(118 176)">
      <polygon points="-42,0 0,-28 42,0" fill="#5c4f3f"/>
      <rect x="-38" y="0" width="76" height="52" fill="#a64d3f" stroke="#5c4f3f" stroke-width="1.2"/>
      <rect x="-28" y="8" width="14" height="12" fill="#f6efe4" opacity="0.85"/>
      <rect x="-8" y="8" width="14" height="12" fill="#f6efe4" opacity="0.85"/>
      <rect x="12" y="8" width="14" height="12" fill="#f6efe4" opacity="0.85"/>
      <rect x="-18" y="28" width="36" height="24" fill="#5c4f3f" opacity="0.55"/>
    </g>
    <circle cx="92" cy="214" r="16" fill="#1a3c34" opacity="0.85"/>
    <circle cx="308" cy="220" r="18" fill="#1a3c34" opacity="0.85"/>
    <circle cx="278" cy="206" r="12" fill="#2d5a4f"/>
  </g>
  <circle cx="200" cy="200" r="168" fill="none" stroke="#f6efe4" stroke-width="2.5" opacity="0.9"/>
  <text x="200" y="318" text-anchor="middle" font-family="Georgia, serif" font-size="9.5" letter-spacing="0.14em" fill="#1a3c34" opacity="0.85">BRYLLUP \u00b7 SELSKAP \u00b7 FEST</text>
  <path transform="translate(200 338) scale(0.55)" d="M0 6 C-10 -5 -18 -2 -9 7 C0 16 0 16 0 16 C0 16 0 16 9 7 C18 -2 10 -5 0 6 Z" fill="#a64d3f"/>
</svg>
`;

fs.writeFileSync(path.join(__dirname, "..", "assets", "images", "logo.svg"), logo, "utf8");
console.log("wrote logo.svg");
