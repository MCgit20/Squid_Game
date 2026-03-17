// ========== Menu Toggle ==========
function initMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  
  if (!menuToggle || !menu) return;
  
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    menu.classList.toggle("responsive");
  });
  
  // Fermer le menu au clic sur un lien
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      menu.classList.remove("responsive");
    });
  });
}

// ========== Formulaire de Contact ==========
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  
  const status = document.getElementById("status");
  const submitBtn = form.querySelector(".btn-submit");
  
  // Validation en temps réel
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      const errorId = `${input.id}-error`;
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.textContent = "";
      }
    });
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Valider tous les champs
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      setStatus("⚠️ Veuillez corriger les erreurs", "warning");
      return;
    }
    
    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    setStatus("Inscription confirmée ✅", "success");
    
    // Réinitialiser après 2 secondes
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      status.textContent = "";
      status.className = "status-message";
    }, 2000);
  });
  
  function validateField(field) {
    const value = field.value.trim();
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (!value) {
      if (errorElement) {
        errorElement.textContent = "Ce champ est requis";
      }
      return false;
    }
    
    if (field.id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        if (errorElement) {
          errorElement.textContent = "Email invalide";
        }
        return false;
      }
    }
    
    if (errorElement) {
      errorElement.textContent = "";
    }
    return true;
  }
  
  function setStatus(message, type) {
    status.textContent = message;
    status.className = `status-message ${type}`;
  }
}

// ========== Lazy Loading Images ==========
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback pour navigateurs sans IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
}

// ========== Optimisation des Performances ==========
function optimizePageLoad() {
  // Préchargement des ressources critiques
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}

function initialize() {
  initMenuToggle();
  initContactForm();
  initLazyLoading();
}

// Lancer l'optimisation au chargement
optimizePageLoad();