# H-vard-Farm — Søndre Haugen gård

**Offisielt domene:** https://farm.legal

Nettside, Railway-deploy og dokumentasjon for Søndre Haugen gård (bryllup, selskap, bobilhotell, gårdsopplevelser).

## Mappestruktur

| Mappe | Innhold |
|-------|---------|
| **`website/`** | Hele nettsiden (HTML, CSS, JS, bilder) — deploy denne til Railway |
| **`docs/`** | Brief til webbyrå |
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

1. Push kode til GitHub (over)
2. [railway.app](https://railway.app) → Deploy from GitHub → `aicodeai50/H-vard-Farm`
3. **Root Directory:** `website`
4. Custom domain: **farm.legal**

Se `website/DEPLOY-RAILWAY.md` og `website/DEPLOY-DNS.md`.

## Lokal forhåndsvisning

```powershell
cd website
npm install
npm start
```

Åpne http://localhost:3000
