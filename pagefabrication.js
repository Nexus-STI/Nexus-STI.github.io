// PAGE FABRICATION – INTERACTIONS & ANIMATIONS

document.addEventListener('DOMContentLoaded', () => {
    // Menu hamburger (réutilisé depuis JAVAsite.js)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Intersection Observer pour animations au scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les cartes de processus
    document.querySelectorAll('.process-card').forEach(card => {
        observer.observe(card);
    });

    // Observer les items de timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Stagger animation pour les cartes
    document.querySelectorAll('.process-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Parallax léger sur les éléments
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const kiskPlaceholder = document.querySelector('.kiosk-placeholder');
                if (kiskPlaceholder) {
                    const offset = scrollY * 0.05;
                    kiskPlaceholder.style.transform = `translateY(${offset}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Tooltip/infobulle au hover sur process cards (optionnel)
    document.querySelectorAll('.process-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Logo fallback (du fichier JAVAsite.js)
    const logoImg = document.querySelector('.nav-logo-img');
    const logoText = document.querySelector('.logo-texte');
    if (logoImg && logoText) {
        logoImg.addEventListener('error', () => {
            logoImg.style.display = 'none';
            logoText.removeAttribute('aria-hidden');
            logoText.style.position = 'static';
        });
        logoImg.addEventListener('load', () => {
            logoText.setAttribute('aria-hidden', 'true');
            logoText.style.position = 'absolute';
        });
        if (logoImg.complete && logoImg.naturalWidth === 0) {
            logoImg.dispatchEvent(new Event('error'));
        }
    }

    // Compteur animé (optionnel) pour afficher des statistiques
    const uniqueSection = document.querySelector('.unique-section');
    if (uniqueSection) {
        const observerUnique = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Déclencher des animations si nécessaire
                    // (exemple : animer les chiffres ou ajouter des effets)
                }
            });
        }, { threshold: 0.3 });
        observerUnique.observe(uniqueSection);
    }
});

// Fonction pour activer les transitions au chargement
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
