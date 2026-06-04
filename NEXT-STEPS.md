# Neste steg — farm.legal

## ✅ Ferdig (kode)

- [x] Alle sider live — arrangement, bryllup, selskap, lokaler, om gården, fakta, opplevelser, nyheter, kontakt, bobil, prospekt
- [x] Ekte gårdsbilder (WhatsApp/drone) — ikke stock
- [x] Norsk + engelsk (i18n)
- [x] GitHub → Railway auto-deploy på **https://farm.legal**
- [x] SEO: schema.org, sitemap, Google Search Console
- [x] Kontaktskjema (FormSubmit → post@sondrehaugen.no)
- [x] Utskriftsvennlig prospekt (`prospekt.html`)

## 🔲 Gjør manuelt (Håvard / Sandra)

### 1. Test kontaktskjema ← **viktigst nå**

1. Gå til https://farm.legal/kontakt.html
2. Send en testforespørsel
3. **Aktiver FormSubmit** — første e-post til `post@sondrehaugen.no` krever bekreftelse  
   → Steg for steg: **`docs/KONTAKT-SKJEMA.md`**

### 2. Google Business

Følg **`docs/GOOGLE-BUSINESS.md`** — adresse, åpningstider, bilder, lenke til farm.legal

### 3. Flere bilder (valgfritt)

Legg nye foto i `website/assets/images/property/` og push — se `website/assets/images/README.md`

### 4. Senere (når du har det)

| Ting | Hvor |
|------|------|
| PDF-prospekt | `website/assets/docs/` + lenke fra kontakt |
| Calendly visningsbooking | `website/js/components.js` → `calendly: "https://..."` |

---

## Lenker

| | |
|--|--|
| Side | https://farm.legal |
| GitHub | https://github.com/aicodeai50/H-vard-Farm |
| Push-guide | `PUSH-TO-GITHUB.md` |
