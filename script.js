/* =============================================================
   PORTAFOLIO AMGS — script.js
============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ─── Referencias ────────────────────────────────────────────
  const header       = document.querySelector("header");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const sections     = document.querySelectorAll("section[id]");
  const navItems     = document.querySelectorAll(".nav-links a");
  const menuToggle   = document.getElementById("menu-toggle");
  const navLinks     = document.querySelector(".nav-links");
  const skillCards   = document.querySelectorAll(".skill-card");
  const levelBars    = document.querySelectorAll(".level-bar");

  // ─── Menú móvil ─────────────────────────────────────────────
// ─── Dark mode toggle ────────────────────────────────────────
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Aplicar tema guardado
if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark-mode");
}

themeToggle?.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
document.querySelectorAll(".cert-card").forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});

  // ─── Scroll suave con offset del header ─────────────────────
  document.addEventListener("click", e => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    const offset = header ? header.offsetHeight : 0;
    window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  });

  // ─── Header + nav activo al hacer scroll ────────────────────
  const onScroll = debounce(() => {
    // Header compacto
    header?.classList.toggle("scrolled", window.scrollY > 50);

    // Botón ir arriba
    if (scrollTopBtn) {
      const visible = window.scrollY > 300;
      if (visible) {
        scrollTopBtn.style.display = "flex";
        requestAnimationFrame(() => scrollTopBtn.classList.add("visible"));
      } else {
        scrollTopBtn.classList.remove("visible");
        setTimeout(() => { scrollTopBtn.style.display = "none"; }, 300);
      }
    }

    // Enlace activo en nav
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - (header?.offsetHeight || 0) - 10) {
        current = sec.id;
      }
    });
    navItems.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  }, 15);

  window.addEventListener("scroll", onScroll, { passive: true });

  // ─── Botón ir arriba ────────────────────────────────────────
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ─── IntersectionObserver: fade-in de secciones ─────────────
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(20px)";
    sec.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    fadeObserver.observe(sec);
  });

  // Clase .visible aplica la transición
  document.head.insertAdjacentHTML("beforeend", `
    <style>
      section.visible { opacity: 1 !important; transform: translateY(0) !important; }
    </style>
  `);

  // ─── IntersectionObserver: barras de habilidades ────────────
  // Las barras arrancan en width:0 y se animan al entrar en viewport
  levelBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = "0";

    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Pequeño delay para que se vea después del fade-in de la sección
          setTimeout(() => { bar.style.width = targetWidth; }, 200);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    barObserver.observe(bar);
  });

  // ─── Animación escalonada en skill cards ────────────────────
  skillCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.04}s`;
  });

  // ─── Efecto typewriter en el subtítulo del hero ─────────────
  const subtitle = document.querySelector("#inicio h2 .azul");
  if (subtitle) {
    const roles = [
      "Desarrollador Web",
      "Full Stack Developer",
      "Infraestructura TI",
      "Laravel & React Dev",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

const type = () => {
  const current = roles[roleIndex];
  const displayed = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  // Nunca dejar el span vacío — usa espacio cero para mantener altura
  subtitle.textContent = displayed || "\u200B";

  let delay = deleting ? 60 : 100;

  if (!deleting && charIndex > current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    charIndex = 0;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
};

    // Arrancar después de 1.2s para que el fade-in de la sección haya terminado
    setTimeout(type, 1200);
  }

  // ─── Año actual en footer (si existiera) ────────────────────
  const yearEl = document.querySelector(".footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

// ─── Utilidades ──────────────────────────────────────────────
function debounce(fn, wait = 100) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}