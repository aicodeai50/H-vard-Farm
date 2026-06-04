# H-vard-Farm — Søndre Haugen gård

**Offisielt domene:** https://farm.legal

Nettside, Railway-deploy og dokumentasjon for Søndre Haugen gård (bryllup, selskap, bobilhotell, gårdsopplevelser).

## Mappestruktur

| Mappe | Innhold |
|-------|---------|
| **`website/`** | Hele nettsiden (HTML, CSS, JS, bilder) — deploy denne til Railway |
| **`docs/`** | Brief til webbyrå |
| **`DOMAIN.md`** | Domene farm.legal |

## GitHub er tom?

Koden ligger på denne PC-en. **Dobbeltklikk eller kjør:**

```powershell
cd "c:\Users\sandr\OneDrive\Documents\Håvard-Farm"
.\PUSH-AICODEAI50.ps1
```

Logg inn som **aicodeai50** når Git spør.

**Repo:** https://github.com/aicodeai50/H-vard-Farm

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
