/* PAGE DÉCOUVRIR – INTERACTIONS */

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scroll for anchor links
function smoothScroll(element, duration = 1000) {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + start;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutQuad(progress));
        if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    observer.observe(card);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const kiosk = document.querySelector('.kiosk-main');
    if (kiosk) {
        const scrollY = window.scrollY;
        kiosk.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
});

// Logo Fallback
const logoImg = document.querySelector('.nav-logo-img');
if (logoImg) {
    logoImg.addEventListener('error', function() {
        const logoText = document.querySelector('.logo-texte');
        if (logoText) {
            logoText.style.display = 'block';
            this.style.display = 'none';
        }
    });

    logoImg.addEventListener('load', function() {
        const logoText = document.querySelector('.logo-texte');
        if (logoText) {
            logoText.style.display = 'none';
        }
    });
}
