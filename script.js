document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------
    // Configuración inicial
    // ----------------------------
    const body = document.body;
    const header = document.querySelector("header");
    const scrollTopBtn = document.querySelector(".scroll-top");
    const sections = document.querySelectorAll(".seccion");
    const skillCards = document.querySelectorAll(".skill-card");
    const proyectos = document.querySelectorAll(".proyecto");
  
    // ----------------------------
    // Scroll suave para enlaces
    // ----------------------------
    document.addEventListener("click", (e) => {
      // Manejar clicks en enlaces del menú
      if (e.target.matches("nav a[href^='#']")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
  
          // Cerrar menú móvil si está abierto (podrías añadir esta funcionalidad después)
          // mobileMenu.classList.remove("active");
        }
      }
    });
  
    // ----------------------------
    // Efecto de header al hacer scroll
    // ----------------------------
    window.addEventListener("scroll", () => {
      // Header que se reduce
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
  
      // Botón "ir arriba"
      if (scrollTopBtn) {
        if (window.scrollY > 300) {
          scrollTopBtn.style.display = "flex";
        } else {
          scrollTopBtn.style.display = "none";
        }
      }
    });
  
    // ----------------------------
    // Botón "ir arriba"
    // ----------------------------
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  
    // ----------------------------
    // Observer para animación de secciones
    // ----------------------------
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          
          // Opcional: Dejar de observar después de la animación
          // sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
  
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  
    // ----------------------------
    // Efectos para tarjetas de habilidades
    // ----------------------------
    skillCards.forEach((card, index) => {
      // Retraso escalonado para la animación
      card.style.transitionDelay = `${index * 0.05}s`;
      
      // Efecto de tooltip al pasar el mouse
      card.addEventListener("mouseenter", () => {
        const skillName = card.querySelector(".skill-name").textContent;
        card.setAttribute("data-tooltip", skillName);
      });
    });
  
    // ----------------------------
    // Efectos para proyectos
    // ----------------------------
    proyectos.forEach(proyecto => {
      const proyectoImg = proyecto.querySelector("img");
      
      proyecto.addEventListener("mouseenter", () => {
        proyectoImg.style.transform = "scale(1.05)";
      });
      
      proyecto.addEventListener("mouseleave", () => {
        proyectoImg.style.transform = "scale(1)";
      });
    });
  
    // ----------------------------
    // Carga perezosa de imágenes
    // ----------------------------
    const lazyLoadImages = (images) => {
      const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: "200px"
      });
  
      images.forEach(img => imgObserver.observe(img));
    };
  
    // Selecciona todas las imágenes con data-src
    const lazyImages = document.querySelectorAll("img[data-src]");
    if (lazyImages.length > 0) {
      lazyLoadImages(lazyImages);
    }
  
    // ----------------------------
    // Efecto de máquina de escribir (opcional)
    // ----------------------------
    const typeWriter = (element, text, speed = 50) => {
      let i = 0;
      element.textContent = "";
      
      const typing = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typing, speed);
        }
      };
      
      typing();
    };
  
    // Ejemplo de uso (puedes activarlo para tu título principal):
    // const titleElement = document.querySelector("#inicio h1");
    // if (titleElement) {
    //   typeWriter(titleElement, titleElement.textContent);
    // }
  });
  
  // ----------------------------
  // Funciones utilitarias globales
  // ----------------------------
  function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }
  
  function throttle(func, limit = 100) {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});
const toggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
