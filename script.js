const menu_toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menu_toggle.onclick = function(){
    menu_toggle.classList.toggle('active');
    menu.classList.toggle('responsive');
}

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, prenom, password, email, message }),
  });

  const data = await res.json();
  document.getElementById("responseMsg").textContent = data.message;
});