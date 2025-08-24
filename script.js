(() => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const menuToggleBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const languageSwitcher = document.getElementById("language-switcher");
  const slideshowImg = document.getElementById("gallery-img");
  const header = document.getElementById("main-header");

  // 🌄 Képváltó
  const slideshowImages = ["img1.jpg", "img2.jpg", "img3.jpg"];
  let currentSlide = 0;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slideshowImages.length;
    slideshowImg.src = slideshowImages[currentSlide];
  }, 3000);

  // 🍔 Menü toggle
  menuToggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // 🌐 Nyelvváltás
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

  // 🌙 Téma váltás
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("preferredTheme", isDark ? "dark" : "light");
  });

  // 🔄 Betöltéskor beállítások visszaállítása
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("preferredTheme") || "light";
    document.body.classList.toggle("dark", savedTheme === "dark");
    themeToggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    const savedLang = localStorage.getItem("preferredLang") || "hu";
    languageSwitcher.value = savedLang;
    applyLanguage(savedLang);
  });

  // 📏 Scroll hatás a fejlécen
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
})();
