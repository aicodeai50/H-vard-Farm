# Søndre Haugen gård — farm.legal

Profesjonell nettside for Søndre Haugen gård: bryllup, selskaper, gårdsopplevelser og bobilhotell.

## Deploy (Railway — anbefalt)

1. [railway.app](https://railway.app) → **New Project** → GitHub → `aicodeai50/H-vard-Farm`
2. **Root Directory:** `website`
3. Railway kjører `npm start` (statisk server via `serve`)
4. **Custom domain:** `farm.legal` under Networking

**Full guide:** [DEPLOY-RAILWAY.md](./DEPLOY-RAILWAY.md)  
**DNS (Name.com):** [DEPLOY-DNS.md](./DEPLOY-DNS.md) — bruk Railway sine CNAME/A-records, ikke Netlify.

## Lokal

```bash
cd website
npm install
npm start
```

Åpne http://localhost:3000

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

## Skjema

Kontakt skickes via [FormSubmit](https://formsubmit.co) til `post@sondrehaugen.no` — fungerer på Railway uten backend. Bekreft e-postadresse første gang FormSubmit sender en aktiveringslenke.

## Backup (Netlify)

Valgfri backup: https://sondre-haugen-gard.netlify.app — `netlify deploy --prod --dir .`

## Bilder

Erstatt Unsplash-placeholders i `css/styles.css` og `assets/images/`.
