# H-vard Farm App

Agriculture management platform — landing, dashboard, billing, and API.

## Quick start

```bash
cd app
cp .env.example .env
npm install
npm start
# http://localhost:3000
```

Demo login: any email on `/login.html` (creates session).

## Railway

Deploy as a **separate service** from `website/`:

- Root directory: `app`
- Start command: `npm start`
- Set env vars from `.env.example`

Or from repo root: `npm run start:app`

## PayPal

Set `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MODE=sandbox`.
Webhook URL: `https://your-domain/api/paypal/webhook`

## ZENTRO-OWN-API

Set `ZENTRO_API_URL` and `ZENTRO_API_KEY`. See `server/services/zentro.js`.
