# Søndre Haugen gård — farm.legal

Profesjonell nettside for Søndre Haugen gård: bryllup, selskaper, gårdsopplevelser og bobilhotell.

## Struktur

| Side | Fil |
|------|-----|
| Forside | `index.html` |
| Om gården | `om-garden.html` |
| Bryllup | `bryllup.html` |
| Selskap | `selskap.html` |
| Bobilhotell | `bobilhotell.html` |
| Gården — fakta | `garden-fakta.html` |
| Opplevelser | `opplevelser.html` |
| Nyheter | `nyheter.html` |
| Kontakt | `kontakt.html` |

## Lokal forhåndsvisning

```bash
cd website
npx --yes serve .
```

Åpne http://localhost:3000

## Live (Netlify)

**Produksjon:** https://sondre-haugen-gard.netlify.app

**Egendefinert domene:** `farm.legal` — legg til i Netlify → Domain management, deretter DNS hos domeneleverandør (se under).

### Koble farm.legal

1. [Netlify → sondre-haugen-gard → Domain management](https://app.netlify.com/projects/sondre-haugen-gard/domain-management)
2. **Add domain** → `farm.legal` og `www.farm.legal`
3. Hos domeneleverandør (der du kjøpte farm.legal):
   - **A-record** `@` → `75.2.60.5` (eller IP Netlify viser)
   - **CNAME** `www` → `sondre-haugen-gard.netlify.app`
4. Vent på SSL (automatisk, vanligvis under 24 timer)

### Ny deploy

```bash
cd website
netlify deploy --prod --dir .
```

## Skjema

Kontaktskjemaet viser bekreftelse i nettleseren. For ekte e-post:

- [Netlify Forms](https://docs.netlify.com/forms/setup/): legg `netlify` på `<form>`
- eller [Formspree](https://formspree.io) / egen backend

## Bilder

Erstatt Unsplash-placeholders med egne dronebilder i `assets/images/`. Legg til `hero-farm.jpg` og oppdater `.hero-bg` i `css/styles.css`.

## Kontaktinfo

Oppdater e-post/telefon i `js/components.js` om nødvendig.
