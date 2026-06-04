# Komplett nettstruktur — farm.legal / Søndre Haugen gård

```
farm.legal/
│
├── /                          Forside (hero, teaser, CTA)
├── /om-garden                 Historie, filosofi, galleri
├── /bryllup                   Landingsside bryllup + skjema
├── /selskap-og-arrangementer  Jubileer, firma, julebord, konserter
├── /bobilhotell               Haugen Ute / Inne / Premium + priser
├── /garden-fakta              Arealer, bygg, kart
├── /opplevelser               Kommer: kafé, marked, konserter
├── /kontakt                   Skjema, kart, telefon, e-post
├── /nyheter                   Headliner-feed (nyheter & presse)
│   └── /nyheter/[slug]        Enkeltartikkel
├── /personvern
└── /informasjonskapsler
```

---

## Forside — wireframe

| Seksjon | Innhold |
|---------|---------|
| Hero (100vh) | Drone/video · H1 + undertittel · 3 knapper |
| Tillit | «Fra 1700-tallet» · ikoner: Bryllup · Selskap · Bobil · Opplevelser |
| Bryllup-teaser | 1 bilde + 2 setninger → Les mer |
| Selskap-teaser | 1 bilde + liste målgrupper → Les mer |
| Bobil-teaser | «Trygt hjem mellom eventyrene» → Bobilhotell |
| Om gården | Kort avsnitt + drone |
| Nyheter | 2–3 siste headliners |
| Footer | Kontakt · sosiale medier · Bobil-linje |

---

## Navigasjon (header)

```
Logo (stor på scroll-compact)
Om gården | Bryllup | Selskap | Bobilhotell | Opplevelser | Kontakt
                                                    [ Send forespørsel ]
```

Mobil: hamburger + sticky «Ring» / «Forespørsel»

---

## Bryllup — seksjonsrekkefølge

1. Hero — «Drømmebryllup på landet»
2. Vielse ute / fest inne
3. Kapasitet & lokaler (låve, våningshus, uteareal)
4. Fotogalleri / drone
5. Skreddersøm & planlegging
6. FAQ (overnatting, musikk, catering-partnere)
7. CTA — Send bryllupsforespørsel

---

## Selskap — seksjonsrekkefølge

1. Hero — «Arrangementer med sjel»
2. Hvem passer det for (kort kort per type)
3. Lokaler & kapasitet
4. Eksempler (julebord, konfirmasjon, firma)
5. Teknisk / PA / scene (for konserter)
6. CTA — Send arrangementsforespørsel

---

## Bobilhotell — seksjonsrekkefølge

1. Hero — «Et trygt hjem mellom eventyrene»
2. Tre kort: Ute · Inne · Premium (pris fra)
3. Pristabell (kjøretøytyper)
4. Tilleggstjenester
5. Første sesong / introtilbud (hvis aktivt)
6. Kart + «rolig, landlig»
7. Planlagt: strøm, sanitær, sesongarrangementer
8. CTA — Bobil@sondrehaugen.no / skjema

**Prisreferanse (fra materiell):**

| Nivå | Fra-pris | Høydepunkter |
|------|----------|--------------|
| Haugen Ute | 5 990 kr | Fast plass, kamera, låst område |
| Haugen Inne | 14 990 kr | Oppvarmet hall, frostfritt |
| Haugen Premium | 19 990 kr | + batteri, månedlig sjekk, prioritet |

---

## Skjemaer

| Skjema | Felter (minimum) |
|--------|------------------|
| Generell forespørsel | Navn, e-post, telefon, type, melding |
| Bryllup | + dato (ønsket), antall gjester, vielse ute/ inne |
| Arrangement | + type arrangement, dato, antall |
| Book visning | Dato-forslag, antall personer |
| Bobil | Kjøretøytype, ønsket nivå (ute/inne/premium), sesong |

---

## Nyheter — headliner-format

*(Inspirert av havardpederse.netlify.app «Updates»-seksjon)*

```
┌─────────────────────────────────────────────┐
│ 4 jun 2026 · Presse                         │
│ Gretsch family — offisiell endorsement      │
│ Kort ingress · [ Les mer ]                  │
└─────────────────────────────────────────────┘
```

Bruk for: sesongåpning bobil, julemarked, konserter, presse, salg/Finn (om ønsket).

---

## SEO-titler (utkast)

| Side | Title |
|------|-------|
| Forside | Søndre Haugen gård \| Bryllup og arrangementer i Våler |
| Bryllup | Bryllup på gård i Våler \| Søndre Haugen gård |
| Bobil | Bobilhotell Østfold \| Søndre Haugen Bobilhotell |
| Selskap | Selskap og konferanse på gård \| Søndre Haugen gård |

---

## Teknisk stack (forslag til byrå — ikke bindende)

- **CMS:** Sanity, WordPress eller Statamic for nyheter og priser  
- **Hosting:** Netlify / Vercel + CDN  
- **E-post:** Skjema → Bobil@ / info@ med auto-reply  
- **Analytics:** Plausible eller GA4  

---

## Fase 2 (etter lansering)

- Booking/kalender for visninger  
- Engelsk versjon av Bryllup  
- Gårdsbutikk / betaling  
- Integrasjon Facebook-events  
- Kafé/marked-sider når klare
