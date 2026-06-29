import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.dirname(process.env.DATABASE_PATH || path.join(__dirname, "..", "data", "store.json"));
const storePath = process.env.DATABASE_PATH || path.join(dataDir, "store.json");

fs.mkdirSync(dataDir, { recursive: true });

const defaultStore = {
  users: [],
  fields: [],
  activities: [],
  transactions: [],
  _seq: { users: 0, fields: 0, activities: 0, transactions: 0 },
};

function load() {
  if (!fs.existsSync(storePath)) {
    const store = structuredClone(defaultStore);
    seed(store);
    save(store);
    return store;
  }
  return JSON.parse(fs.readFileSync(storePath, "utf8"));
}

function save(store) {
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

function seed(store) {
  store._seq.users = 1;
  store.users.push({
    id: 1,
    email: "demo@hvard.farm",
    name: "Demo Farmer",
    plan: "farm",
    balance_cents: 500000,
    created_at: new Date().toISOString(),
  });
  store.fields.push(
    { id: 1, user_id: 1, name: "Nordmarka A", area_ha: 12.4, crop: "Havre", status: "active", planted_at: "2026-04-15", harvest_at: "2026-09-01", notes: null },
    { id: 2, user_id: 1, name: "Søndre eng", area_ha: 8.2, crop: "Gras", status: "active", planted_at: "2026-03-01", harvest_at: "2026-08-20", notes: null },
    { id: 3, user_id: 1, name: "Vestlund", area_ha: 5.0, crop: "Potet", status: "planning", planted_at: null, harvest_at: "2026-10-15", notes: null }
  );
  store._seq.fields = 3;
  store.activities.push({
    id: 1,
    user_id: 1,
    field_id: 1,
    type: "planting",
    description: "Havre sådd i Nordmarka A",
    created_at: new Date().toISOString(),
  });
  store._seq.activities = 1;
}

let store = load();

const db = {
  prepare(sql) {
    return {
      get(...params) {
        return runQuery(sql, params, "get");
      },
      all(...params) {
        return runQuery(sql, params, "all");
      },
      run(...params) {
        return runQuery(sql, params, "run");
      },
    };
  },
};

function runQuery(sql, params, mode) {
  store = load();
  const s = sql.replace(/\s+/g, " ").trim();

  if (s.startsWith("SELECT COUNT(*) as c FROM fields WHERE user_id")) {
    const c = store.fields.filter((f) => f.user_id === params[0]).length;
    return mode === "get" ? { c } : [{ c }];
  }
  if (s.includes("SELECT COUNT(*) as c FROM fields WHERE user_id = ? AND status = 'active'")) {
    const c = store.fields.filter((f) => f.user_id === params[0] && f.status === "active").length;
    return { c };
  }
  if (s.startsWith("SELECT id FROM users WHERE email = ?")) {
    const u = store.users.find((x) => x.email === params[0]);
    return u ? { id: u.id } : undefined;
  }
  if (s.startsWith("SELECT id, email, name, plan, balance_cents FROM users WHERE id = ?")) {
    const u = store.users.find((x) => x.id === params[0]);
    return u ? { id: u.id, email: u.email, name: u.name, plan: u.plan, balance_cents: u.balance_cents } : undefined;
  }
  if (s.startsWith("SELECT balance_cents, plan FROM users WHERE id = ?")) {
    const u = store.users.find((x) => x.id === params[0]);
    return u ? { balance_cents: u.balance_cents, plan: u.plan } : undefined;
  }
  if (s.startsWith("SELECT balance_cents FROM users WHERE id = ?")) {
    const u = store.users.find((x) => x.id === params[0]);
    return u ? { balance_cents: u.balance_cents } : undefined;
  }
  if (s.startsWith("SELECT * FROM fields WHERE user_id = ? ORDER BY name")) {
    return store.fields.filter((f) => f.user_id === params[0]).sort((a, b) => a.name.localeCompare(b.name));
  }
  if (s.startsWith("SELECT * FROM fields WHERE id = ?")) {
    return store.fields.find((f) => f.id === params[0]);
  }
  if (s.startsWith("SELECT * FROM transactions WHERE paypal_order_id = ? AND user_id = ?")) {
    return store.transactions.find((t) => t.paypal_order_id === params[0] && t.user_id === params[1]);
  }
  if (s.startsWith("SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 20")) {
    return store.transactions
      .filter((t) => t.user_id === params[0])
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 20);
  }
  if (s.includes("SELECT a.*, f.name as field_name FROM activities a") && s.includes("LIMIT 50")) {
    return store.activities
      .filter((a) => a.user_id === params[0])
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 50)
      .map((a) => ({
        ...a,
        field_name: store.fields.find((f) => f.id === a.field_id)?.name || null,
      }));
  }
  if (s.includes("SELECT a.*, f.name as field_name FROM activities a") && s.includes("LIMIT 5")) {
    return store.activities
      .filter((a) => a.user_id === params[0])
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 5)
      .map((a) => ({
        ...a,
        field_name: store.fields.find((f) => f.id === a.field_id)?.name || null,
      }));
  }
  if (s.startsWith("SELECT * FROM activities WHERE id = ?")) {
    return store.activities.find((a) => a.id === params[0]);
  }
  if (s.startsWith("SELECT COUNT(*) as c FROM users")) {
    return { c: store.users.length };
  }

  if (s.startsWith("INSERT INTO users (email, name) VALUES (?, ?)")) {
    store._seq.users += 1;
    const row = {
      id: store._seq.users,
      email: params[0],
      name: params[1],
      plan: "individual",
      balance_cents: 0,
      created_at: new Date().toISOString(),
    };
    store.users.push(row);
    save(store);
    return { lastInsertRowid: row.id };
  }
  if (s.startsWith("INSERT INTO users (email, name, plan, balance_cents)")) {
    store._seq.users += 1;
    const row = {
      id: store._seq.users,
      email: params[0],
      name: params[1],
      plan: params[2],
      balance_cents: params[3],
      created_at: new Date().toISOString(),
    };
    store.users.push(row);
    save(store);
    return { lastInsertRowid: row.id };
  }
  if (s.startsWith("INSERT INTO fields")) {
    store._seq.fields += 1;
    const row = {
      id: store._seq.fields,
      user_id: params[0],
      name: params[1],
      area_ha: params[2],
      crop: params[3],
      status: params[4],
      planted_at: params[5],
      harvest_at: params[6],
      notes: params[7],
    };
    store.fields.push(row);
    save(store);
    return { lastInsertRowid: row.id };
  }
  if (s.startsWith("INSERT INTO activities")) {
    store._seq.activities += 1;
    const row = {
      id: store._seq.activities,
      user_id: params[0],
      field_id: params[1],
      type: params[2],
      description: params[3],
      created_at: new Date().toISOString(),
    };
    store.activities.push(row);
    save(store);
    return { lastInsertRowid: row.id };
  }
  if (s.startsWith("INSERT INTO transactions")) {
    store._seq.transactions += 1;
    const row = {
      id: store._seq.transactions,
      user_id: params[0],
      type: params[1],
      amount_cents: params[2],
      currency: "NOK",
      paypal_order_id: params[3],
      status: params[4],
      zentro_ref: null,
      created_at: new Date().toISOString(),
    };
    store.transactions.push(row);
    save(store);
    return { lastInsertRowid: row.id };
  }
  if (s.startsWith("UPDATE transactions SET status = ? WHERE id = ?")) {
    const t = store.transactions.find((x) => x.id === params[1]);
    if (t) t.status = params[0];
    save(store);
    return {};
  }
  if (s.startsWith("UPDATE transactions SET zentro_ref = ? WHERE id = ?")) {
    const t = store.transactions.find((x) => x.id === params[1]);
    if (t) t.zentro_ref = params[0];
    save(store);
    return {};
  }
  if (s.startsWith("UPDATE users SET balance_cents = balance_cents + ? WHERE id = ?")) {
    const u = store.users.find((x) => x.id === params[1]);
    if (u) u.balance_cents += params[0];
    save(store);
    return {};
  }

  throw new Error(`Unsupported query: ${s.slice(0, 80)}`);
}

export default db;
