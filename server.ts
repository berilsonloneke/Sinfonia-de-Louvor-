import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.sqlite");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    location TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT, -- 'image' or 'video'
    url TEXT,
    thumbnail TEXT,
    caption TEXT
  );

  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT, -- 'visit' or 'ad_click'
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    code TEXT,
    active INTEGER DEFAULT 1
  );
`);

// Seed initial content if empty
const contentCount = db.prepare("SELECT COUNT(*) as count FROM content").get() as { count: number };
if (contentCount.count === 0) {
  const seedContent = [
    ['home_hero_title', 'Sinfonia de Louvor Jerusalém'],
    ['home_hero_subtitle', 'Coral Jovem de Caála | Huambo, Angola'],
    ['about_history', 'O Coral Jovem Sinfonia de Louvor Jerusalém nasceu com o propósito de louvar a Deus através da música sacra e coral...'],
    ['mission', 'Nossa missão é levar a palavra de Deus através do canto coral...'],
    ['values', 'Fé, União, Excelência e Serviço.'],
  ];
  const insert = db.prepare("INSERT INTO content (key, value) VALUES (?, ?)");
  seedContent.forEach(([key, value]) => insert.run(key, value));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/content", (req, res) => {
    const rows = db.prepare("SELECT * FROM content").all();
    const content = rows.reduce((acc: any, row: any) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    res.json(content);
  });

  app.get("/api/events", (req, res) => {
    const rows = db.prepare("SELECT * FROM events ORDER BY date ASC").all();
    res.json(rows);
  });

  app.get("/api/gallery", (req, res) => {
    const rows = db.prepare("SELECT * FROM gallery").all();
    res.json(rows);
  });

  app.get("/api/ads", (req, res) => {
    const rows = db.prepare("SELECT * FROM ads WHERE active = 1").all();
    res.json(rows);
  });

  app.post("/api/stats", (req, res) => {
    const { type } = req.body;
    db.prepare("INSERT INTO stats (type) VALUES (?)").run(type);
    res.json({ success: true });
  });

  app.get("/api/stats/summary", (req, res) => {
    const visits = db.prepare("SELECT COUNT(*) as count FROM stats WHERE type = 'visit'").get() as { count: number };
    const adClicks = db.prepare("SELECT COUNT(*) as count FROM stats WHERE type = 'ad_click'").get() as { count: number };
    res.json({ visits: visits.count, adClicks: adClicks.count });
  });

  // Admin Routes (Simplified Auth for Demo)
  app.post("/api/admin/content", (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)").run(key, value);
    res.json({ success: true });
  });

  app.post("/api/admin/events", (req, res) => {
    const { title, date, location, description } = req.body;
    db.prepare("INSERT INTO events (title, date, location, description) VALUES (?, ?, ?, ?)").run(title, date, location, description);
    res.json({ success: true });
  });

  app.delete("/api/admin/events/:id", (req, res) => {
    db.prepare("DELETE FROM events WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/admin/gallery", (req, res) => {
    const { type, url, thumbnail, caption } = req.body;
    db.prepare("INSERT INTO gallery (type, url, thumbnail, caption) VALUES (?, ?, ?, ?)").run(type, url, thumbnail, caption);
    res.json({ success: true });
  });

  app.delete("/api/admin/gallery/:id", (req, res) => {
    db.prepare("DELETE FROM gallery WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/admin/ads", (req, res) => {
    const { title, code } = req.body;
    db.prepare("INSERT INTO ads (title, code) VALUES (?, ?)").run(title, code);
    res.json({ success: true });
  });

  app.delete("/api/admin/ads/:id", (req, res) => {
    db.prepare("DELETE FROM ads WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
