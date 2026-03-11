import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = "database.json";

interface DbSchema {
  content: Record<string, string>;
  events: any[];
  gallery: any[];
  stats: any[];
  ads: any[];
}

let db: DbSchema = {
  content: {},
  events: [],
  gallery: [],
  stats: [],
  ads: []
};

// Initialize Database
if (fs.existsSync(DB_FILE)) {
  try {
    db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (e) {
    console.error("Error loading database, starting fresh");
  }
} else {
  // Seed initial content
  db.content = {
    'home_hero_title': 'Sinfonia de Louvor Jerusalém',
    'home_hero_subtitle': 'Coral Jovem de Caála | Huambo, Angola',
    'about_history': 'O Coral Jovem Sinfonia de Louvor Jerusalém nasceu com o propósito de louvar a Deus através da música sacra e coral...',
    'mission': 'Nossa missão é levar a palavra de Deus através do canto coral...',
    'values': 'Fé, União, Excelência e Serviço.',
  };
  saveDb();
}

function saveDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/content", (req, res) => {
    res.json(db.content);
  });

  app.get("/api/events", (req, res) => {
    const sortedEvents = [...db.events].sort((a, b) => a.date.localeCompare(b.date));
    res.json(sortedEvents);
  });

  app.get("/api/gallery", (req, res) => {
    res.json(db.gallery);
  });

  app.get("/api/ads", (req, res) => {
    const activeAds = db.ads.filter(ad => ad.active === 1);
    res.json(activeAds);
  });

  app.post("/api/stats", (req, res) => {
    const { type } = req.body;
    db.stats.push({ type, timestamp: new Date().toISOString() });
    saveDb();
    res.json({ success: true });
  });

  app.get("/api/stats/summary", (req, res) => {
    const visits = db.stats.filter(s => s.type === 'visit').length;
    const adClicks = db.stats.filter(s => s.type === 'ad_click').length;
    res.json({ visits, adClicks });
  });

  // Admin Routes (Simplified Auth for Demo)
  app.post("/api/admin/content", (req, res) => {
    const { key, value } = req.body;
    db.content[key] = value;
    saveDb();
    res.json({ success: true });
  });

  app.post("/api/admin/events", (req, res) => {
    const { title, date, location, description } = req.body;
    const newEvent = { id: Date.now(), title, date, location, description };
    db.events.push(newEvent);
    saveDb();
    res.json({ success: true });
  });

  app.delete("/api/admin/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.events = db.events.filter(e => e.id !== id);
    saveDb();
    res.json({ success: true });
  });

  app.post("/api/admin/gallery", (req, res) => {
    const { type, url, thumbnail, caption } = req.body;
    const newItem = { id: Date.now(), type, url, thumbnail, caption };
    db.gallery.push(newItem);
    saveDb();
    res.json({ success: true });
  });

  app.delete("/api/admin/gallery/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.gallery = db.gallery.filter(i => i.id !== id);
    saveDb();
    res.json({ success: true });
  });

  app.post("/api/admin/ads", (req, res) => {
    const { title, code } = req.body;
    const newAd = { id: Date.now(), title, code, active: 1 };
    db.ads.push(newAd);
    saveDb();
    res.json({ success: true });
  });

  app.delete("/api/admin/ads/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.ads = db.ads.filter(a => a.id !== id);
    saveDb();
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
