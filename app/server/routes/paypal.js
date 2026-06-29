import { Router } from "express";
import db from "../db.js";
import { syncTransaction, zentroConfigured } from "../services/zentro.js";

const router = Router();
const PAYPAL_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function requireUser(req, res, next) {
  if (!req.session?.userId) return res.status(401).json({ error: "Unauthorized" });
  next();
}

async function paypalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) return null;

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token;
}

router.get("/status", (_req, res) => {
  res.json({
    paypal: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
    zentro: zentroConfigured(),
    mode: process.env.PAYPAL_MODE || "sandbox",
  });
});

router.get("/balance", requireUser, (req, res) => {
  const user = db.prepare("SELECT balance_cents, plan FROM users WHERE id = ?").get(req.session.userId);
  const transactions = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20")
    .all(req.session.userId);
  res.json({ balance_cents: user.balance_cents, plan: user.plan, transactions });
});

router.post("/create-order", requireUser, async (req, res) => {
  const amountNok = Number(req.body.amount_nok);
  if (!amountNok || amountNok < 50) {
    return res.status(400).json({ error: "Minimum top-up is 50 NOK" });
  }

  const token = await paypalAccessToken();
  if (!token) {
    const demoId = `demo-${Date.now()}`;
    db.prepare(
      "INSERT INTO transactions (user_id, type, amount_cents, paypal_order_id, status) VALUES (?, ?, ?, ?, ?)"
    ).run(req.session.userId, "topup", Math.round(amountNok * 100), demoId, "pending");
    return res.json({
      demo: true,
      orderId: demoId,
      amount_nok: amountNok,
      hint: "Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET for live PayPal",
    });
  }

  const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "NOK", value: amountNok.toFixed(2) },
          description: "H-vard Farm balance top-up",
        },
      ],
    }),
  });

  const order = await orderRes.json();
  if (!orderRes.ok) {
    return res.status(orderRes.status).json({ error: order.message || "PayPal order failed", details: order });
  }

  db.prepare(
    "INSERT INTO transactions (user_id, type, amount_cents, paypal_order_id, status) VALUES (?, ?, ?, ?, ?)"
  ).run(req.session.userId, "topup", Math.round(amountNok * 100), order.id, "pending");

  const approve = order.links?.find((l) => l.rel === "approve")?.href;
  res.json({ orderId: order.id, approveUrl: approve });
});

router.post("/capture-order", requireUser, async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ error: "orderId required" });

  const tx = db
    .prepare("SELECT * FROM transactions WHERE paypal_order_id = ? AND user_id = ?")
    .get(orderId, req.session.userId);
  if (!tx) return res.status(404).json({ error: "Transaction not found" });

  const token = await paypalAccessToken();
  if (!token) {
    db.prepare("UPDATE transactions SET status = ? WHERE id = ?").run("completed", tx.id);
    db.prepare("UPDATE users SET balance_cents = balance_cents + ? WHERE id = ?").run(
      tx.amount_cents,
      req.session.userId
    );
    return res.json({ ok: true, demo: true, amount_cents: tx.amount_cents });
  }

  const capRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  const capture = await capRes.json();
  if (!capRes.ok) {
    return res.status(capRes.status).json({ error: "Capture failed", details: capture });
  }

  db.prepare("UPDATE transactions SET status = ? WHERE id = ?").run("completed", tx.id);
  db.prepare("UPDATE users SET balance_cents = balance_cents + ? WHERE id = ?").run(
    tx.amount_cents,
    req.session.userId
  );

  const zentro = await syncTransaction({
    userId: req.session.userId,
    amount_cents: tx.amount_cents,
    currency: "NOK",
    paypal_order_id: orderId,
    service: "h-vard-farm",
  });
  if (zentro.ref) {
    db.prepare("UPDATE transactions SET zentro_ref = ? WHERE id = ?").run(zentro.ref, tx.id);
  }

  const user = db.prepare("SELECT balance_cents FROM users WHERE id = ?").get(req.session.userId);
  res.json({ ok: true, balance_cents: user.balance_cents, zentro });
});

router.post("/webhook", (req, res) => {
  res.status(200).send("OK");
});

export default router;
