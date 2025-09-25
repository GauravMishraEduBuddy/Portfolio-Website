// Portfolio Website JavaScript - Dark Hacker Theme

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initMobileMenu();
    initTypingAnimation();
    initScrollEffects();
    initSkillBars();
    initParticles();
    initSmoothScrolling();
    initContactForm();
    initAnimationOnScroll();
    
});

// Mobile Navigation Menu
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const roles = [
        'Full Stack Developer',
        'Frontend Engineer', 
        'Backend Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation
    typeText();
}

// Scroll Effects for Navbar
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            const barPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barPosition < windowHeight - 100) {
                bar.style.width = percent + '%';
            }
        });
    }
    
    // Trigger on scroll
    window.addEventListener('scroll', animateSkillBars);
    // Trigger on load
    animateSkillBars();
}

// Particle Animation for Hero Section
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const numberOfParticles = 50;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ff88;
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
        `;
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particlesContainer.appendChild(particle);
        animateParticle(particle);
    }
    
    function animateParticle(particle) {
        const duration = Math.random() * 3000 + 2000; // 2-5 seconds
        const deltaX = (Math.random() - 0.5) * 200; // -100 to 100px
        const deltaY = (Math.random() - 0.5) * 200; // -100 to 100px
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(0)',
                opacity: 0
            },
            { 
                transform: `translate(${deltaX}px, ${deltaY}px) scale(1)`,
                opacity: 0.3
            },
            { 
                transform: `translate(${deltaX * 2}px, ${deltaY * 2}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
            createParticle(); // Create new particle
        };
    }
    
    // Create initial particles
    for (let i = 0; i < numberOfParticles; i++) {
        setTimeout(createParticle, Math.random() * 2000);
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#333'};
        color: ${type === 'success' || type === 'error' ? '#000' : '#fff'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Animation on Scroll
function initAnimationOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationPlayState = 'running';
                }
                
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .about-paragraph,
        .stat,
        .skills-category,
        .timeline-item,
        .project-card,
        .contact-method,
        .contact-form
    `);
    
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        
        // Stagger animation for timeline items
        if (el.classList.contains('timeline-item')) {
            el.style.animationPlayState = 'paused';
        }
        
        if (el.classList.contains('project-card')) {
            el.style.animationPlayState = 'paused';
        }
        
        observer.observe(el);
    });
}

// Matrix Rain Effect (Easter Egg)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    let matrixInterval = setInterval(draw, 33);
    
    // Stop matrix rain after 10 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        canvas.remove();
    }, 10000);
}

// Konami Code Easter Egg
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            createMatrixRain();
            showNotification('Matrix Mode Activated! 🕶️', 'success');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollEffects = throttle(initScrollEffects, 16);
const throttledSkillBars = throttle(initSkillBars, 16);

window.addEventListener('scroll', throttledScrollEffects);
window.addEventListener('scroll', throttledSkillBars);

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate animations on resize
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
    initSkillBars();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a subtle entrance animation to the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console easter egg
console.log(`
    ░██████╗░░█████╗░██╗░░░██╗██████╗░░█████╗░██╗░░░██╗
    ██╔════╝░██╔══██╗██║░░░██║██╔══██╗██╔══██╗██║░░░██║
    ██║░░██╗░███████║██║░░░██║██████╔╝███████║╚██╗░██╔╝
    ██║░░╚██╗██╔══██║██║░░░██║██╔══██╗██╔══██║░╚████╔╝░
    ╚██████╔╝██║░░██║╚██████╔╝██║░░██║██║░░██║░░╚██╔╝░░
    ░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░
    
    Welcome to my portfolio! 
    Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    
    Built with ❤️ by Gaurav Mishra
`);