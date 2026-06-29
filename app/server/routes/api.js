import { Router } from "express";
import db from "../db.js";

const router = Router();

function requireUser(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

router.get("/me", requireUser, (req, res) => {
  const user = db.prepare("SELECT id, email, name, plan, balance_cents FROM users WHERE id = ?").get(req.session.userId);
  res.json({ user });
});

router.get("/fields", requireUser, (req, res) => {
  const fields = db
    .prepare("SELECT * FROM fields WHERE user_id = ? ORDER BY name")
    .all(req.session.userId);
  res.json({ fields });
});

router.post("/fields", requireUser, (req, res) => {
  const { name, area_ha, crop, status, planted_at, harvest_at, notes } = req.body;
  if (!name || !area_ha) {
    return res.status(400).json({ error: "name and area_ha required" });
  }
  const result = db
    .prepare(
      "INSERT INTO fields (user_id, name, area_ha, crop, status, planted_at, harvest_at, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      req.session.userId,
      name,
      area_ha,
      crop || null,
      status || "active",
      planted_at || null,
      harvest_at || null,
      notes || null
    );
  const field = db.prepare("SELECT * FROM fields WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json({ field });
});

router.get("/activities", requireUser, (req, res) => {
  const activities = db
    .prepare(
      `SELECT a.*, f.name as field_name FROM activities a
       LEFT JOIN fields f ON f.id = a.field_id
       WHERE a.user_id = ? ORDER BY a.created_at DESC LIMIT 50`
    )
    .all(req.session.userId);
  res.json({ activities });
});

router.post("/activities", requireUser, (req, res) => {
  const { field_id, type, description } = req.body;
  if (!type) return res.status(400).json({ error: "type required" });
  const result = db
    .prepare("INSERT INTO activities (user_id, field_id, type, description) VALUES (?, ?, ?, ?)")
    .run(req.session.userId, field_id || null, type, description || null);
  const activity = db.prepare("SELECT * FROM activities WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json({ activity });
});

router.get("/weather", requireUser, (_req, res) => {
  res.json({
    location: "Svinndal, Østfold",
    temp_c: 14,
    condition: "Partly cloudy",
    wind_kmh: 8,
    forecast: [
      { day: "Mon", high: 16, low: 9, icon: "cloud-sun" },
      { day: "Tue", high: 18, low: 10, icon: "sun" },
      { day: "Wed", high: 15, low: 8, icon: "rain" },
    ],
    note: "Connect MET/Yr API in production",
  });
});

router.get("/overview", requireUser, (req, res) => {
  const userId = req.session.userId;
  const fields = db.prepare("SELECT COUNT(*) as c FROM fields WHERE user_id = ?").get(userId).c;
  const activeCrops = db
    .prepare("SELECT COUNT(*) as c FROM fields WHERE user_id = ? AND status = 'active'")
    .get(userId).c;
  const user = db.prepare("SELECT balance_cents, plan FROM users WHERE id = ?").get(userId);
  const recent = db
    .prepare(
      `SELECT a.*, f.name as field_name FROM activities a
       LEFT JOIN fields f ON f.id = a.field_id
       WHERE a.user_id = ? ORDER BY a.created_at DESC LIMIT 5`
    )
    .all(userId);
  res.json({
    stats: { fields, activeCrops, balance_cents: user.balance_cents, plan: user.plan },
    recentActivities: recent,
  });
});

export default router;
