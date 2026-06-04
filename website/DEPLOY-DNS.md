# Koble farm.legal til Netlify

**Domeneleverandør:** [Name.com](https://www.name.com) *(nameservers: `ns1kpv.name.com` osv.)*  
**Netlify-site:** sondre-haugen-gard  
**Midlertidig URL:** https://sondre-haugen-gard.netlify.app

---

## Steg 1 — Legg til domene i Netlify

1. Åpne https://app.netlify.com/projects/sondre-haugen-gard/domain-management  
2. **Add domain** → `farm.legal`  
3. Velg **Add domain** også for `www.farm.legal` (anbefalt)  
4. Noter DNS-verdiene Netlify viser (IP kan avvike fra tabellen under).

---

## Steg 2 — DNS hos Name.com

1. Logg inn på https://www.name.com/account/domain/list  
2. Klikk **farm.legal** → **DNS Records** (eller Manage DNS)  
3. Legg inn / oppdater:

| Type | Host | Answer / Value |
|------|------|----------------|
| **A** | `@` | `75.2.60.5` *(bruk IP Netlify viser hvis annen)* |
| **CNAME** | `www` | `sondre-haugen-gard.netlify.app` |

4. **Fjern** gamle A/CNAME som peker til `91.195.240.94` (parkert side) når du går live.  
5. Lagre — propagering tar ofte 15 min–48 timer.

### Alternativ: la Netlify styre DNS

I Netlify → **Set up Netlify DNS** → bytt nameservers hos Name.com til Netlify sine (4 stk). Da administrerer du alt i Netlify.

---

## Steg 3 — HTTPS

Når DNS er grønn i Netlify: **HTTPS** aktiveres automatisk (Let's Encrypt).

---

## Steg 4 — Skjema og e-post

**Site settings → Forms** → aktiver varsler til `post@sondrehaugen.no` / `Bobil@sondrehaugen.no`.

---

## Sjekkliste

- [ ] `farm.legal` åpner gårdssiden (ikke parkeringsside)  
- [ ] `www.farm.legal` redirecter til apex eller omvendt (Netlify-innstilling)  
- [ ] Kontaktskjema sender til `/takk.html`  
- [ ] Erstatt placeholder-bilder i `assets/images/`
