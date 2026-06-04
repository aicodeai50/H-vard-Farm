# Koble farm.legal — DNS (Name.com)

**Domeneleverandør:** [Name.com](https://www.name.com)  
**Hosting:** [Railway](https://railway.app) *(primær — se [DEPLOY-RAILWAY.md](./DEPLOY-RAILWAY.md))*

---

## Railway (anbefalt)

1. Railway → prosjekt → **Settings → Networking → Custom Domain**
2. Legg til `farm.legal` og `www.farm.legal`
3. Kopier **CNAME / A-records** Railway viser
4. Hos Name.com → **farm.legal → DNS Records**:

| Type | Host | Verdi |
|------|------|--------|
| **CNAME** | `www` | `xxxx.up.railway.app` *(fra Railway)* |
| **A** eller **ALIAS** | `@` | Følg Railway apex-instruks |

5. Fjern parkering: **A** `@` → `91.195.240.94`

---

## Netlify (valgfri backup)

Hvis du fortsatt bruker Netlify i tillegg:

| Type | Host | Verdi |
|------|------|--------|
| **A** | `@` | `75.2.60.5` |
| **CNAME** | `www` | `sondre-haugen-gard.netlify.app` |

*Bruk enten Railway eller Netlify for apex — ikke begge samtidig.*

---

## Sjekkliste

- [ ] `farm.legal` viser gårdssiden  
- [ ] HTTPS aktiv (Railway / Name.com)  
- [ ] Kontaktskjema → `post@sondrehaugen.no` (FormSubmit aktivert)  
- [ ] Egne dronebilder i `assets/images/`
