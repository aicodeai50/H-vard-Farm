import "dotenv/config";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";
import apiRoutes from "./routes/api.js";
import paypalRoutes from "./routes/paypal.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use("/api", apiRoutes);
app.use("/api/billing", paypalRoutes);

app.post("/api/auth/login", (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ error: "email required" });

  let user = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (!user) {
    const r = db.prepare("INSERT INTO users (email, name) VALUES (?, ?)").run(email, name || email.split("@")[0]);
    user = { id: r.lastInsertRowid };
  }
  req.session.userId = user.id;
  res.json({ ok: true, userId: user.id });
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/auth/session", (req, res) => {
  if (!req.session?.userId) return res.json({ authenticated: false });
  const user = db
    .prepare("SELECT id, email, name, plan, balance_cents FROM users WHERE id = ?")
    .get(req.session.userId);
  res.json({ authenticated: true, user });
});

const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  if (path.extname(req.path)) return next();
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`H-vard Farm app listening on http://0.0.0.0:${PORT}`);
});
