# H-vard-Farm — Current State Investigation

**Date:** 2026-06-27  
**Repository:** `aicodeai50/H-vard-Farm` (main)  
**Production URLs:** `https://farm.legal`, `https://h-vard-farm-production.up.railway.app`

---

## Executive summary

The repository today is **not** an agriculture management application. It is a **static bilingual marketing website** for **Søndre Haugen Gård** — an event venue (weddings, corporate events, outdoor ceremonies) deployed on Railway via Node + `serve`.

There is **no backend**, **no database**, **no authentication**, **no billing**, **no dashboard**, and **no integration** with ZENTRO-OWN-API or PayPal.

This PR introduces a new **`app/`** package: the foundation for **H-vard Farm** as a professional farm-management product, while preserving the existing `website/` event-venue site for `farm.legal`.

---

## Tech stack (before this PR)

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, vanilla JavaScript |
| i18n | Custom client loader (`website/js/i18n.js` + `website/data/i18n.json`) |
| Runtime | Node.js ≥18 |
| Static server | `serve` v14.2.4 via `website/start.js` |
| Hosting | Railway (Nixpacks), backup Netlify |
| Forms | FormSubmit.co → `post@sondrehaugen.no` |
| Database | None |
| Auth | None |
| Payments | None (static pricing text only on bobil page) |

---

## Repository layout (before)

```
H-vard-Farm/
├── package.json          # Delegates start → website/
├── railway.toml
├── docs/                 # Marketing/venue briefs
└── website/              # 25 HTML pages, CSS, JS, images
    ├── index.html        # Event venue homepage
    ├── kontakt.html      # Contact form
    ├── bryllup.html, selskap.html, …
    └── scripts/          # Photo import utilities (sharp)
```

---

## Current features (website/)

- Event venue marketing pages (bryllup, konfirmasjon, firma, galleri, …)
- Bilingual UI (Norwegian / English)
- Contact form (external FormSubmit)
- JSON-LD EventVenue schema
- Motorhome storage pricing (display only)
- Film location page
- No user accounts, no farm/crop data

---

## Issues identified

1. **Product identity mismatch** — Repo name suggests farm software; deployed site is event-venue marketing.
2. **No application layer** — Cannot support dashboards, billing, or API integrations.
3. **No billing** — PayPal / subscription flows absent.
4. **No ZENTRO integration** — No references in codebase.
5. **Single deploy target** — Railway serves `website/` only; agriculture app needs separate service or route.
6. **Documentation drift** — `DOMAIN.md` vs `DEPLOY-RAILWAY.md` disagree on primary host.

---

## What `h-vard-farm-production.up.railway.app` serves

The Railway default hostname for this project. It serves the **same static `website/`** content as `farm.legal` (event venue site). The screenshot showing “Utearrangementer” confirms this is the marketing site, not farm management software.

---

## Recommended architecture (this PR)

| Component | Path | Purpose |
|-----------|------|---------|
| Legacy venue site | `website/` | Keep `farm.legal` unchanged |
| Agriculture product | `app/` | Landing, dashboard, billing, API |
| Product docs | `docs/PRODUCT-IDENTITY.md` | Brand & feature definition |
| Deploy | Railway service #2 or `APP_TARGET=app` | Separate production URL for SaaS |

---

## Environment variables (new app)

| Variable | Required | Purpose |
|----------|----------|---------|
| `PORT` | Auto (Railway) | HTTP port |
| `SESSION_SECRET` | Production | Session signing |
| `PAYPAL_CLIENT_ID` | Billing | PayPal REST |
| `PAYPAL_CLIENT_SECRET` | Billing | PayPal REST |
| `PAYPAL_MODE` | Billing | `sandbox` or `live` |
| `PAYPAL_WEBHOOK_ID` | Billing | IPN/webhook verification |
| `ZENTRO_API_URL` | Billing sync | ZENTRO-OWN-API base URL |
| `ZENTRO_API_KEY` | Billing sync | ZENTRO auth token |
| `DATABASE_PATH` | Optional | SQLite file path |

---

## Next steps after merge

1. Create second Railway service pointing to `app/` (or set root start script).
2. Configure PayPal sandbox credentials and webhook URL.
3. Obtain ZENTRO-OWN-API specification and wire real endpoints.
4. Add PostgreSQL for production (replace SQLite).
5. Implement OAuth / proper auth (currently demo session).
