document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------
    // Configuración inicial
    // ----------------------------
    const body = document.body;
    const header = document.querySelector("header");
    const scrollTopBtn = document.querySelector(".scroll-top");
    const sections = document.querySelectorAll("section");
    const skillCards = document.querySelectorAll(".skill-card");
    const proyectos = document.querySelectorAll(".proyecto");
    const navLinks = document.querySelectorAll(".nav-link");
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNavLinks = document.querySelector('.nav-links');

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

                // Cerrar menú móvil si está abierto
                if (mobileNavLinks.classList.contains('active')) {
                    mobileNavLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        }
    });

    // ----------------------------
    // Efecto de header al hacer scroll
    // ----------------------------
    window.addEventListener("scroll", debounce(() => {
        // Header que se reduce
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Actualizar enlaces activos
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }, 15));

    // ----------------------------
    // Botón "ir arriba" mejorado
    // ----------------------------
    if (scrollTopBtn) {
        // Mostrar/ocultar con animación
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = "flex";
                setTimeout(() => {
                    scrollTopBtn.classList.add("visible");
                }, 10);
            } else {
                scrollTopBtn.classList.remove("visible");
                setTimeout(() => {
                    scrollTopBtn.style.display = "none";
                }, 300);
            }
        });

        // Click handler
        scrollTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            
            // Efecto de click
            scrollTopBtn.classList.add("clicked");
            setTimeout(() => {
                scrollTopBtn.classList.remove("clicked");
            }, 300);
        });
    }

    // ----------------------------
    // Menú móvil (hamburguesa)
    // ----------------------------
    if (menuToggle && mobileNavLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNavLinks.classList.toggle('active');
            
            // Bloquear/desbloquear scroll del body
            body.style.overflow = mobileNavLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ----------------------------
    // Observer para animación de secciones
    // ----------------------------
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
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

    // Ejemplo de uso (descomenta para activar)
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