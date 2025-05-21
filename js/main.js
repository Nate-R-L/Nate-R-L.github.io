/**
 * Nathan Lebherz Portfolio
 * Main JavaScript File
 *
 * This file contains the main JavaScript functionality for the portfolio:
 * 1. Mobile menu toggle
 * 2. Smooth scrolling
 * 3. Animation on scroll initialization
 * 4. Form validation
 * 5. Scroll to top button
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

// Initialize AOS (Animation On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Check for page hash on load
    if (window.location.hash) {
        const hash = window.location.hash;
        
        // Wait a bit for page to fully load before scrolling
        setTimeout(() => {
            scrollToSection(hash);
        }, 100);
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Get the href attribute
        const targetId = link.getAttribute('href');
        
        // Check if it's an anchor link
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scroll to section
            scrollToSection(targetId);
        }
    });
});

// Function to scroll to section
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    
    if (section) {
        // Offset for fixed header
        const headerOffset = 70;
        const sectionPosition = section.getBoundingClientRect().top;
        const offsetPosition = sectionPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Form validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset errors
        resetErrors();
        
        // Validate inputs
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Please enter your message');
            isValid = false;
        }
        
        // If all valid, submit the form (or show success message for demo)
        if (isValid) {
            // In a real scenario, you would use AJAX to submit the form
            // For demo purposes, just show a success message
            showSuccessMessage('Thanks for your message! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show input error
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Helper function to reset all errors
function resetErrors() {
    // Reset input styles
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
    
    // Hide error messages
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';
    
    // Hide success message
    formSuccess.style.display = 'none';
}

// Helper function to show success message
function showSuccessMessage(message) {
    formSuccess.textContent = message;
    formSuccess.style.display = 'block';
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '5px 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '0';
    }
});