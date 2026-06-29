# H-vard-Farm — Søndre Haugen gård

**Offisielt domene:** https://farm.legal

Nettside, Railway-deploy og dokumentasjon for Søndre Haugen gård (bryllup, selskap, bobilhotell, gårdsopplevelser).

## Mappestruktur

| Mappe | Innhold |
|-------|---------|
| **`app/`** | **H-vard Farm** — agriculture management platform (landing, dashboard, billing, API) |
| **`website/`** | Event venue marketing site for **farm.legal** |
| **`docs/`** | Product docs, investigation, agency briefs |
| **`DOMAIN.md`** | Domene farm.legal |

## GitHub — push til begge kontoer

| Konto | Repo | Status |
|-------|------|--------|
| **havard50** | https://github.com/havard50/H-vard-Farm | ✅ Synket (siste kode) |
| **aicodeai50** | https://github.com/aicodeai50/H-vard-Farm | ⏳ Du må pushe én gang (innlogging) |

**Kjør i PowerShell på din PC** (Cursor kan ikke logge inn som aicodeai50):

```powershell
cd "c:\Users\sandr\OneDrive\Documents\Håvard-Farm"
.\PUSH-BOTH.ps1
```

Eller: `git push origin main` (pusher til begge når begge er innlogget i Git).

## Deploy (Railway)

**Two products, two services recommended:**

| Service | Start command | Domain |
|---------|---------------|--------|
| Agriculture app | `npm start` (runs `app/`) | `h-vard-farm-production.up.railway.app` |
| Event venue site | `npm run start:website` | `farm.legal` |

1. Push code to GitHub
2. [railway.app](https://railway.app) → Deploy from GitHub → `aicodeai50/H-vard-Farm`
3. See `app/README.md` and `website/DEPLOY-RAILWAY.md`

Docs: `docs/INVESTIGATION.md`, `docs/PRODUCT-IDENTITY.md`

## Lokal forhåndsvisning

```powershell
cd website
npm install
npm start
```

Åpne http://localhost:3000
