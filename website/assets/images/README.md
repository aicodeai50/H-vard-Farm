# Bilder for farm.legal

**Merk:** Siden bruker nå egne merkevare-SVG (`hero-backdrop.svg`, `content-frame.svg`) — ikke stock-foto. Bytt til ekte JPG når du har dem.

## Anbefalte filnavn

| Fil | Bruk |
|-----|------|
| `hero-drone.jpg` | Forside hero (1920×1080+) — erstatt `hero-backdrop.svg` i `css/styles.css` |
| `gard-bygg.jpg` | Om gården, historie |
| `laave-selskap.jpg` | Selskap / låve |
| `bryllup-ute.jpg` | Bryllup |
| `bobil-omrade.jpg` | Bobilhotell |
| `og-share.jpg` | Facebook deling (1200×630 PNG) — valgfritt; SVG finnes allerede |

## Etter opplasting

1. Erstatt `content-frame.svg` i HTML med `assets/images/filnavn.jpg`
2. Oppdater `.hero-bg` i `css/styles.css` til `hero-drone.jpg`
3. `git add website/assets/images/` → `git push` → auto-deploy

Komprimer gjerne på [squoosh.app](https://squoosh.app) — under 500 KB per bilde.
