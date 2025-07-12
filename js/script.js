// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll indicator click
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// Video optimization for mobile
const video = document.querySelector('video');
if (video) {
    // Pause video on mobile to save bandwidth
    function handleVideoPlayback() {
        if (window.innerWidth <= 768) {
            video.pause();
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
            video.play();
        }
    }

    // Initial check
    handleVideoPlayback();

    // Check on resize
    window.addEventListener('resize', handleVideoPlayback);

    // Intersection Observer for video performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (video.paused && window.innerWidth > 768) {
                    video.play();
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    });

    videoObserver.observe(video);
}

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'public/img/logo.png',
        'public/img/logo3.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    preloadResources();
    
    // Add loading class removal after page load
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to top functionality (if needed later)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
}, 10);

window.addEventListener('scroll', debouncedScroll);

// CTA Functions
function openConsultation() {
    // Aquí puedes agregar tu lógica para abrir el formulario de consultoría
    // Por ejemplo, abrir un modal, redirigir a un formulario, etc.
    alert('¡Excelente! Te contactaremos pronto para tu consultoría gratuita.\n\nPróximamente: Formulario de contacto integrado.');
    
    // Ejemplo de cómo podrías integrar con un servicio de formularios
    // window.open('https://calendly.com/nextlab/consultoria', '_blank');
}

function openPortfolio() {
    // Aquí puedes redirigir a tu sección de portafolio
    // Por ahora, scroll suave a la sección de servicios
    document.querySelector('#services').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Ejemplo de cómo podrías redirigir a una página de portafolio
    // window.location.href = 'portfolio.html';
}

// Animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all service cards and stat items
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const statItems = document.querySelectorAll('.stat-item');
    const whyFeatures = document.querySelectorAll('.why-feature');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    [...serviceCards, ...statItems, ...whyFeatures, ...timelineItems, ...accordionItems].forEach(el => {
        observer.observe(el);
    });
});

// Accordion functionality
function toggleAccordion(element) {
    const accordionItem = element.parentElement;
    const accordionContent = accordionItem.querySelector('.accordion-content');
    
    // Toggle active class
    accordionItem.classList.toggle('active');
    
    // Close other accordions (optional - remove if you want multiple open at once)
    const allAccordions = document.querySelectorAll('.accordion-item');
    allAccordions.forEach(item => {
        if (item !== accordionItem) {
            item.classList.remove('active');
        }
    });
}

// Console log for debugging
console.log('NextLab - Website loaded successfully! 🚀');
console.log('Dark theme with purple accents active ✨'); 