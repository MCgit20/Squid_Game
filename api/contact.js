export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { nom, prenom, email, password, message } = req.body;

  if (!nom || !prenom || !email || !password || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  // Enregistre simplement dans les logs (test)
  console.log("💬 Nouveau message :", { nom, prenom, email, password, message });

  // Réponse côté client
  res.status(200).json({ message: "Votre inscription a bien été enregistrée !" });
}