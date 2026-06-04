# Neste steg — farm.legal live

Sjekkliste i rekkefølge. Kryss av når ferdig.

## 1. Railway (5 min)

1. Gå til https://railway.app/new
2. **Deploy from GitHub repo** → `aicodeai50/H-vard-Farm`
3. **Settings → Root Directory:** la stå **tom** (bruker rot-`package.json`) *eller* sett `website`
4. Vent til deploy er **Success** — noter URL: `https://xxxx.up.railway.app`
5. Åpne URL i nettleser — du skal se Søndre Haugen gård

## 2. Domene farm.legal (10 min)

1. Railway → prosjekt → **Settings → Networking → + Custom Domain**
2. Legg til: `farm.legal` og `www.farm.legal`
3. Logg inn **Name.com** → **farm.legal** → DNS Records
4. Legg inn det Railway viser (CNAME / A-records)
5. Fjern gammel **A** `@` → `91.195.240.94` (parkering)
6. Vent 15 min–24 t — test https://farm.legal

Detaljer: `website/DEPLOY-DNS.md`

## 3. Kontaktskjema (2 min)

1. Send test via https://farm.legal/kontakt.html
2. Aktiver **FormSubmit** — første gang: klikk lenke i e-post til `post@sondrehaugen.no`

## 4. Bilder (når du har filer)

- Legg dronebilder i `website/assets/images/`
- Oppdater `website/css/styles.css` (`.hero-bg`)
- `git push origin main` → Railway deployer på nytt

## 5. Valgfritt

- [ ] Koble **havard50** og **aicodeai50** — begge har samme kode; bruk `.\PUSH-BOTH.ps1`
- [ ] Netlify backup: https://sondre-haugen-gard.netlify.app

## Hurtigkommandoer

```powershell
# Lokal forhåndsvisning
cd website
npm start

# Push begge GitHub
cd ..
.\PUSH-BOTH.ps1
```

## Lenker

| Hva | URL |
|-----|-----|
| GitHub | https://github.com/aicodeai50/H-vard-Farm |
| Domene | https://farm.legal |
| Railway dashboard | https://railway.app/dashboard |
