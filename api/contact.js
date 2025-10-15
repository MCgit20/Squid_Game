import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { nom, prenom, email, password, message } = req.body;

  if (!nom || !prenom || !email || !password || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT,
      prenom TEXT,
      email TEXT,
      password TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.run(
    "INSERT INTO contacts (nom, prenom, email, password, message) VALUES (?, ?, ?, ?, ?)",
    [nom, prenom, email, password, message]
  );

  res.status(200).json({ message: "Votre inscription a été enregistrée avec succès !" });
}
