# Aktiver kontaktskjema (FormSubmit)

Skjemaet på https://farm.legal/kontakt.html sender til **post@sondrehaugen.no** via [FormSubmit](https://formsubmit.co).

## Engangsaktivering (ca. 2 min)

1. Åpne https://farm.legal/kontakt.html  
2. Fyll ut et **testskjema** (navn, e-post, type, kort melding) → **Send**  
3. Sjekk innboks **post@sondrehaugen.no**  
4. Klikk **Activate Form** i e-posten fra FormSubmit  
5. Send et nytt testskjema — nå skal meldingen lande i innboksen og avsender får takk-side på farm.legal/takk.html  

## Teknisk

| Felt | Verdi |
|------|--------|
| Action | `https://formsubmit.co/post@sondrehaugen.no` |
| Redirect etter send | `https://farm.legal/takk.html` |
| Reply-To | Avsenders `email`-felt i skjemaet |

Ved problemer: sjekk søppelpost, eller kontakt FormSubmit support. Alternativ senere: Netlify Forms / egen SMTP.
