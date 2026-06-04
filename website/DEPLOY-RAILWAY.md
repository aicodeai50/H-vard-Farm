# Deploy på Railway (farm.legal)

Statisk side som kjører med Node + `serve`. Railway setter `PORT` automatisk.

---

## 1. Opprett prosjekt

1. [railway.app](https://railway.app) → **New Project**
2. **Deploy from GitHub repo** → `aicodeai50/H-vard-Farm`
3. **Settings → Root Directory** → `website`
4. Railway oppdager `package.json` og kjører `npm start`

Første deploy gir en URL som `*.up.railway.app`.

---

## 2. Egendefinert domene (farm.legal)

1. Railway → prosjektet → **Settings → Networking → Custom Domain**
2. Legg til `farm.legal` og `www.farm.legal`
3. Railway viser **CNAME** (eller A-records for apex)

### DNS hos Name.com

| Type | Host | Verdi |
|------|------|--------|
| **CNAME** | `www` | `*.up.railway.app` *(fra Railway)* |
| **CNAME** eller **ALIAS** | `@` | Railway sin apex-instruks *(følg Railway UI)* |

Name.com støtter ikke alltid CNAME på apex — bruk da **A-records** Railway viser for `farm.legal`.

Fjern gammel parkering (`91.195.240.94`) når Railway-domene er aktivt.

---

## 3. Miljøvariabler (valgfritt)

| Variabel | Bruk |
|----------|------|
| `CONTACT_EMAIL` | *(fremtidig)* hvis du bytter til backend for skjema |

Kontaktskjema bruker **FormSubmit** (statisk) — ingen Railway-variabel nødvendig.

---

## 4. Auto-deploy

Hver push til `main` på GitHub (mappe `website/`) trigger ny deploy hvis GitHub er koblet.

```bash
git add website/
git commit -m "Update site"
git push origin main
```

---

## 5. Lokal test (samme som Railway)

```bash
cd website
npm install
npm start
# Åpne http://localhost:3000
```

---

## Netlify

Netlify-deploy kan ligge som backup (`sondre-haugen-gard.netlify.app`). **Primær produksjon:** Railway + `farm.legal`.
