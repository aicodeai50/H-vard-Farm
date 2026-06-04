# Offisielt domene — farm.legal

| | |
|--|--|
| **Produksjons-URL** | https://farm.legal |
| **WWW** | https://www.farm.legal → 301 til apex |
| **Hosting (nå)** | Netlify (`sondre-haugen-gard`) |
| **Alternativ hosting** | Railway — se `website/DEPLOY-RAILWAY.md` |
| **DNS** | Name.com |
| **Repo** | https://github.com/aicodeai50/H-vard-Farm |

All SEO, skjema og deling skal bruke **farm.legal** — ikke Netlify- eller Railway-underdomener i markedsføring.

## E-post

| Bruk | Adresse |
|------|---------|
| Generell / bryllup / selskap | `post@sondrehaugen.no` |
| Bobilhotell | `Bobil@sondrehaugen.no` |
| Telefon | `901 98 671` |

## Besøksadresse (kart)

**Søndre Haugen gård** · Svinndallinna, 2436 Våler i Østfold  
*(Poststed kan stå som Våler; gården ligger i Svinndal.)*

## DNS — Name.com (Netlify, anbefalt nå)

1. Logg inn på [Name.com](https://www.name.com) → **farm.legal** → DNS Records  
2. **Fjern** parkerings-A: `@` → `91.195.240.94`  
3. **Legg inn:**

| Type | Host | Verdi |
|------|------|--------|
| **A** | `@` | `75.2.60.5` |
| **CNAME** | `www` | `sondre-haugen-gard.netlify.app` |

4. I [Netlify](https://app.netlify.com) → **sondre-haugen-gard** → Domain management → legg til `farm.legal` og `www.farm.legal`  
5. Vent 5 min–48 t på propagering → test https://farm.legal

Detaljer og Railway-variant: `website/DEPLOY-DNS.md`

## Sjekkliste «live»

- [ ] https://farm.legal viser gårdssiden (ikke parkering/tom side)  
- [ ] Kontaktskjema sendt én gang → aktiver FormSubmit i `post@sondrehaugen.no` (se `docs/KONTAKT-SKJEMA.md`)  
- [ ] Egne bilder i `website/assets/images/`  
- [ ] Google Business — `docs/GOOGLE-BUSINESS.md`

## Neste steg i prosjektet

Se **`NEXT-STEPS.md`** i rotmappen.
