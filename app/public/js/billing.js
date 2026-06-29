document.addEventListener("DOMContentLoaded", async () => {
  if (!(await App.requireAuth())) return;

  const status = await App.api("/api/billing/status");
  document.getElementById("paypal-status").textContent = status.paypal ? "Connected" : "Demo mode";

  const params = new URLSearchParams(window.location.search);
  const captured = params.get("capture");
  const orderId = params.get("token");
  if (captured && orderId) {
    try {
      await App.api("/api/billing/capture-order", { method: "POST", body: JSON.stringify({ orderId }) });
      App.toast("Payment captured");
      history.replaceState({}, "", "/billing.html");
    } catch (e) {
      App.toast(e.message);
    }
  }

  async function refresh() {
    const data = await App.api("/api/billing/balance");
    document.getElementById("balance").textContent = App.formatNok(data.balance_cents);
    document.getElementById("plan").textContent = data.plan;
    document.getElementById("tx-body").innerHTML =
      data.transactions.length === 0
        ? "<tr><td colspan='4'>No transactions yet.</td></tr>"
        : data.transactions
            .map(
              (t) => `<tr>
            <td class="mono">${t.created_at?.slice(0, 10) || "—"}</td>
            <td>${t.type}</td>
            <td class="mono">${App.formatNok(t.amount_cents)}</td>
            <td>${t.status}</td>
          </tr>`
            )
            .join("");
  }
  await refresh();

  document.getElementById("topup-btn").addEventListener("click", async () => {
    const amount_nok = Number(document.getElementById("amount").value);
    try {
      const res = await App.api("/api/billing/create-order", {
        method: "POST",
        body: JSON.stringify({ amount_nok }),
      });
      if (res.approveUrl) {
        window.location.href = res.approveUrl;
        return;
      }
      if (res.demo && res.orderId) {
        await App.api("/api/billing/capture-order", {
          method: "POST",
          body: JSON.stringify({ orderId: res.orderId }),
        });
        App.toast("Demo top-up applied (PayPal not configured)");
        await refresh();
      }
    } catch (e) {
      App.toast(e.message);
    }
  });
});
