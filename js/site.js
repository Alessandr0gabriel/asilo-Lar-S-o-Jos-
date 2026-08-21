const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

const themeStorageKey = "acpic-theme";

function applyTheme(theme) {
  document.body.classList.toggle("theme-dark", theme === "dark");
}

function getSavedTheme() {
  return localStorage.getItem(themeStorageKey) || "light";
}

function createThemeButton() {
  const button = document.createElement("button");
  button.className = "theme-fab";
  button.type = "button";
  button.setAttribute("aria-label", "Alternar modo noturno");

  const refreshIcon = () => {
    const isDark = document.body.classList.contains("theme-dark");
    button.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  };

  button.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("theme-dark")
      ? "light"
      : "dark";
    localStorage.setItem(themeStorageKey, newTheme);
    applyTheme(newTheme);
    refreshIcon();
  });

  refreshIcon();
  document.body.appendChild(button);
}

applyTheme(getSavedTheme());
createThemeButton();

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;

    const target = event.target;
    if (target instanceof Node && !nav.contains(target)) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll(".currentYear").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}
