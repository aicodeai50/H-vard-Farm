# Søndre Haugen gård — farm.legal

Nettside for Søndre Haugen gård: bryllup, lovefest, selskap, møter og bobilhotell.

**Tagline:** *Et sted for livets store og små øyeblikk*

## Deploy (Railway)

1. [railway.app](https://railway.app) → **New Project** → GitHub → repo med `website/` som root
2. **Root Directory:** `website`
3. Railway kjører `npm start` (statisk server)
4. **Custom domain:** `farm.legal` under Networking

Guider: [DEPLOY-RAILWAY.md](./DEPLOY-RAILWAY.md) · [DEPLOY-DNS.md](./DEPLOY-DNS.md)

## Lokal

```bash
cd website
npm install
npm start
```

Åpne http://localhost:3000

## Sider

| Side | Fil |
|------|-----|
| Forside | `index.html` |
| Arrangement | `arrangement.html` |
| Bryllup & lovefest | `bryllup.html` |
| Dåp, konfirmasjon & selskap | `selskap.html` |
| Møter & firma | `moter-firma.html` |
| Mat & servering | `mat-servering.html` |
| Lokaler | `lokaler.html` |
| Bobilhotell | `bobilhotell.html` |
| Kontakt | `kontakt.html` |

Legacy-URLer (`om-garden.html`, `opplevelser.html`, `nyheter.html`, `garden-fakta.html`) omdirigerer til nye sider.

## Skjema

Kontakt sendes via [FormSubmit](https://formsubmit.co) til `post@sondrehaugen.no`. Bobil: `Bobil@sondrehaugen.no`.

## Bilder

Egne bilder ligger i `assets/images/property/`. Oppdater `?v=` i `js/components.js` (`assetVer`) ved cache-busting.

## Notater

- **Våningshus:** placeholder-tekst — oppdateres når copy er klar
- **Prospekt-PDF:** «Be om prospekt» på kontaktsiden — legg PDF i `assets/docs/` når tilgjengelig
- **Musikk:** kun lenke i footer til [havardpederse.netlify.app](https://havardpederse.netlify.app/)
