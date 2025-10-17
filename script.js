const menu_toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menu_toggle.onclick = function(){
    menu_toggle.classList.toggle('active');
    menu.classList.toggle('responsive');
}

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nom: form.nom.value,
    prenom: form.prenom.value,
    password: form.password.value,
    email: form.email.value,
    message: form.message.value,
  };

  status.textContent = "Envoi en cours...";

  try {
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    status.textContent = result.message || "Message envoyé ✅";
    form.reset();
  } catch (error) {
    console.error(error);
    status.textContent = "Erreur lors de l'envoi ❌";
  }
});