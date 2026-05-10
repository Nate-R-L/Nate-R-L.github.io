/**
 * Nathan Lebherz Portfolio
 * Main JavaScript File
 */

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// ===== DARK MODE =====
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// ===== ION FLOW PARTICLES =====
class IonField {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animating = true;
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        const count = window.innerWidth < 768 ? 20 : 40;
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                r: Math.random() * 2 + 1,
                dx: Math.random() * 0.5 + 0.15,
                dy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.25 + 0.05
            });
        }
    }

    animate() {
        if (!this.animating) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x > this.canvas.width + 10) {
                p.x = -10;
                p.y = Math.random() * this.canvas.height;
            }
            if (p.y < -10 || p.y > this.canvas.height + 10) {
                p.y = Math.random() * this.canvas.height;
            }
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }

    stop() {
        this.animating = false;
    }
}

// ===== SCROLL PROGRESS & BATTERY =====
const scrollBattery = document.querySelector('.scroll-battery');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    document.documentElement.style.setProperty('--scroll-progress', progress);

    if (scrollBattery) {
        scrollBattery.classList.toggle('visible', scrollTop > 100);
        scrollBattery.classList.toggle('charged', progress > 0.98);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: prefersReducedMotion
    });

    // Initialize ion particles
    const ionCanvas = document.getElementById('ionCanvas');
    if (ionCanvas && !prefersReducedMotion) {
        const ionField = new IonField(ionCanvas);
        ionField.animate();
    }

    // Check for page hash on load
    if (window.location.hash) {
        setTimeout(() => {
            scrollToSection(window.location.hash);
        }, 100);
    }
});

// ===== MOBILE MENU =====
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            scrollToSection(targetId);
        }
    });
});

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const headerOffset = 70;
        const sectionPosition = section.getBoundingClientRect().top;
        const offsetPosition = sectionPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== FORM VALIDATION =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        resetErrors();
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name');
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Please enter your message');
            isValid = false;
        }

        if (isValid) {
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://formspree.io/f/xgvkjbne', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showSuccessMessage('Thanks for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        throw new Error(data.errors.map(error => error.message).join(', '));
                    } else {
                        throw new Error('Form submission failed');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormError('Sorry, there was an error sending your message. Please try emailing me directly at nlebherz44@gmail.com');
            }
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetErrors() {
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';
    formSuccess.style.display = 'none';
}

function showSuccessMessage(message) {
    formSuccess.textContent = message;
    formSuccess.style.display = 'block';
    formSuccess.style.color = 'var(--success-color)';
}

function showFormError(message) {
    formSuccess.textContent = message;
    formSuccess.style.display = 'block';
    formSuccess.style.color = 'var(--error-color)';
}

// ===== SCROLL EFFECTS =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    updateScrollProgress();
});
