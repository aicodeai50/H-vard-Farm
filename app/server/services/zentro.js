/**
 * ZENTRO-OWN-API client — centralized billing sync.
 * Configure ZENTRO_API_URL and ZENTRO_API_KEY in environment.
 */

const BASE = process.env.ZENTRO_API_URL?.replace(/\/$/, "") || "";
const API_KEY = process.env.ZENTRO_API_KEY || "";

export function zentroConfigured() {
  return Boolean(BASE && API_KEY);
}

export async function syncTransaction(payload) {
  if (!zentroConfigured()) {
    return { ok: false, skipped: true, reason: "ZENTRO_API_URL or ZENTRO_API_KEY not set" };
  }

  try {
    const res = await fetch(`${BASE}/billing/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "X-Service": "h-vard-farm",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, status: res.status, error: text };
    }

    const data = await res.json();
    return { ok: true, ref: data.id || data.reference || null, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export async function getBalance(userId) {
  if (!zentroConfigured()) return null;

  try {
    const res = await fetch(`${BASE}/billing/balance/${encodeURIComponent(userId)}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "X-Service": "h-vard-farm",
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
