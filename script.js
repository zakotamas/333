const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const languageSwitcher = document.getElementById("language-switcher");
const galleryImg = document.getElementById("gallery-img");

let currentImage = 0;
const images = ["img1.jpg", "img2.jpg", "img3.jpg"];

setInterval(() => {
  currentImage = (currentImage + 1) % images.length;
  galleryImg.src = images[currentImage];
}, 3000);

// Hamburger menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



// Nyelvváltás
function applyLanguage(lang) {
  fetch("lang.json")
    .then(res => res.json())
    .then(data => {
      const translations = data[lang];
      Object.keys(translations).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = translations[id];
      });
    });
}

languageSwitcher.addEventListener("change", (e) => {
  const selectedLang = e.target.value;
  localStorage.setItem("preferredLang", selectedLang);
  applyLanguage(selectedLang);
});

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang") || "hu";
  languageSwitcher.value = savedLang;
  applyLanguage(savedLang);
});




// Téma váltása és mentése
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("preferredTheme", isDark ? "dark" : "light");
});

// Oldal betöltésekor téma visszaállítása
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("preferredTheme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }

  // Nyelv visszaállítása is itt történik
  const savedLang = localStorage.getItem("preferredLang") || "hu";
  languageSwitcher.value = savedLang;
  applyLanguage(savedLang);
});


window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
