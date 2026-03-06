// Menu hamburger responsive
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Logo fallback: show text if image fails to load
(function() {
    const logoImg = document.querySelector('.nav-logo-img');
    const logoText = document.querySelector('.logo-texte');
    if (!logoImg || !logoText) return;

    // If image can't load, hide it and reveal accessible text
    logoImg.addEventListener('error', () => {
        logoImg.style.display = 'none';
        logoText.removeAttribute('aria-hidden');
        logoText.style.position = 'static';
    });

    // If image loads, keep text hidden for accessibility
    logoImg.addEventListener('load', () => {
        logoText.setAttribute('aria-hidden', 'true');
        logoText.style.position = 'absolute';
    });

    // If image is already broken (cached), run a quick check
    if (logoImg.complete && logoImg.naturalWidth === 0) {
        logoImg.dispatchEvent(new Event('error'));
    }
})();

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll fluide
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Ajouter du smooth scroll au clic des liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            scrollToSection(href);
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

/* GSAP + ScrollTrigger: Decomposition exploded view controlled by scroll */
if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#decomposition',
            start: 'top top',
            end: '+=500',
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    // Exploded view: scatter parts toward corners and sides for better clarity
    tl.to('.part-coque', { y: 0, x: 0 }, 0);  // stays centered
    tl.to('.part-capteurs', { y: -160, x: -130, rotation: -8 }, 0.1);  // top-left
    tl.to('.part-mecanisme', { y: -160, x: 130, rotation: 8 }, 0.25);  // top-right
    tl.to('.part-bacs', { y: 180, x: -140, rotation: -6 }, 0.4);  // bottom-left
    tl.to('.part-carte', { y: 180, x: 140, rotation: 7 }, 0.55);  // bottom-right

    // reveal captions as pieces move
    tl.fromTo('.decomp-canvas .part-caption', { opacity: 0 }, { opacity: 1, stagger: 0.12 }, 0.6);

} else {
    // Fallback: make captions visible if GSAP unavailable
    document.querySelectorAll('.decomp-canvas .part-caption').forEach(el => el.style.opacity = 1);
}
