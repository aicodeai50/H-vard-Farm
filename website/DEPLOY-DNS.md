# Koble farm.legal til Netlify

Site: **sondre-haugen-gard**  
Midlertidig URL: https://sondre-haugen-gard.netlify.app

## Steg

1. Åpne https://app.netlify.com/projects/sondre-haugen-gard/domain-management  
2. Klikk **Add a domain** → skriv `farm.legal`  
3. Netlify viser DNS-poster — bruk disse hos domeneleverandøren (f.eks. Domeneshop, GoDaddy, Namecheap):

| Type | Host | Verdi |
|------|------|--------|
| A | `@` | *(IP fra Netlify, ofte 75.2.60.5)* |
| CNAME | `www` | `sondre-haugen-gard.netlify.app` |

4. I Netlify: aktiver **HTTPS** (Let's Encrypt) når DNS er propagert.

## Skjema

Kontaktskjemaet bruker Netlify Forms. Etter første deploy:  
**Site settings → Forms** — bekreft at innsendinger kommer inn, og sett varsel til `post@sondrehaugen.no`.

## Bilder

Last opp dronebilder til `assets/images/` og oppdater `css/styles.css` (`.hero-bg`) for å erstatte placeholder-bilder.
