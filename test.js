import nodemailer from "nodemailer";

async function testMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "makechen2016@gmail.com",
      pass: "afls ktcm dczy tbss",
    },
  });

  try {
    await transporter.sendMail({
      from: "m.chen1@ecole-ipssi.net",
      to: "makechen2016@gmail.com",
      subject: "Test Squid Game",
      text: "Ceci est un test d'envoi de mail.",
    });
    console.log("Mail envoyé ✅");
  } catch (err) {
    console.error("Erreur :", err);
  }
}

testMail();
