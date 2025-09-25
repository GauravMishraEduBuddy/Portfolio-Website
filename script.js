// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix');
        this.ctx = this.canvas.getContext('2d');
        this.isMobile = window.innerWidth <= 768;
        this.resizeCanvas();
        this.initializeMatrix();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
            this.resizeCanvas();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Optimize for mobile performance
        const columnWidth = this.isMobile ? 25 : 20;
        this.columns = Math.floor(this.canvas.width / columnWidth);
        this.drops = new Array(this.columns).fill(1);
        
        // Reduce frame rate on mobile
        this.frameRate = this.isMobile ? 60 : 30;
        this.lastFrame = 0;
    }
    
    initializeMatrix() {
        this.matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        this.matrix = this.matrix.split("");
    }
    
    animate(timestamp = 0) {
        // Throttle frame rate for better performance
        if (timestamp - this.lastFrame < 1000 / this.frameRate) {
            requestAnimationFrame((ts) => this.animate(ts));
            return;
        }
        this.lastFrame = timestamp;
        
        // Semi-transparent black background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = this.isMobile ? '12px monospace' : '15px monospace';
        
        const columnWidth = this.isMobile ? 25 : 20;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.matrix[Math.floor(Math.random() * this.matrix.length)];
            this.ctx.fillText(text, i * columnWidth, this.drops[i] * columnWidth);
            
            const resetChance = this.isMobile ? 0.98 : 0.975;
            if (this.drops[i] * columnWidth > this.canvas.height && Math.random() > resetChance) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame((ts) => this.animate(ts));
    }
}

// Typing Animation
class TypeWriter {
    constructor(element, words, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.words = words;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed = this.deleteSpeed;
        }
        
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.initializeScrolling();
    }
    
    initializeScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Prevent body scroll when menu is open
        this.preventScroll();
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        this.isOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger bars
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
    
    preventScroll() {
        // Handle touch events to prevent scrolling when menu is open
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            if (this.isOpen && this.navMenu.contains(e.target)) {
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: false });
        
        document.addEventListener('touchmove', (e) => {
            if (this.isOpen && this.navMenu.contains(e.target)) {
                const touchY = e.touches[0].clientY;
                const touchDelta = touchY - touchStartY;
                
                // Prevent scrolling of the menu if at top/bottom
                const menuScrollTop = this.navMenu.scrollTop;
                const menuScrollHeight = this.navMenu.scrollHeight;
                const menuClientHeight = this.navMenu.clientHeight;
                
                if ((menuScrollTop === 0 && touchDelta > 0) ||
                    (menuScrollTop + menuClientHeight >= menuScrollHeight && touchDelta < 0)) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }
}

// Terminal Commands Simulation
class TerminalSimulation {
    constructor() {
        this.terminalLines = document.querySelectorAll('.terminal-line');
        this.currentLine = 0;
        this.startSimulation();
    }
    
    startSimulation() {
        this.typeLines();
    }
    
    typeLines() {
        if (this.currentLine < this.terminalLines.length - 1) {
            setTimeout(() => {
                this.terminalLines[this.currentLine].style.opacity = '1';
                this.currentLine++;
                this.typeLines();
            }, 800);
        }
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        this.initializeAnimations();
    }
    
    initializeAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .achievement-card, .timeline-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            this.observer.observe(el);
        });
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            this.showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.form.reset();
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showMessage(text, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
            ${type === 'success' 
                ? 'background: rgba(0, 255, 65, 0.1); color: #00ff41; border: 1px solid #00ff41;'
                : 'background: rgba(255, 0, 64, 0.1); color: #ff0040; border: 1px solid #ff0040;'
            }
        `;
        
        this.form.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Skill Progress Animation
class SkillProgress {
    constructor() {
        this.skills = document.querySelectorAll('.skill-tag');
        this.animateSkills();
    }
    
    animateSkills() {
        this.skills.forEach((skill, index) => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateX(-20px)';
            skill.style.transition = 'all 0.3s ease-out';
            
            setTimeout(() => {
                skill.style.opacity = '1';
                skill.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
}

// Console Commands Easter Egg
class ConsoleCommands {
    constructor() {
        this.commands = {
            'help': 'Available commands: help, about, skills, projects, contact, clear, matrix, code',
            'about': 'I am Gaurav Mishra - Full Stack Developer & Technical Enthusiast passionate about building innovative solutions!',
            'skills': '.NET Blazor, React, Node.js, MongoDB, JavaScript, Python, and modern web technologies!',
            'projects': 'Check out The Home Ease, EduBuddy Analytics, and my interactive portfolio!',
            'contact': 'Reach me at gauravmishra.geek@gmail.com or +91 7080165976',
            'clear': 'Console cleared!',
            'matrix': 'Welcome to the Matrix of Code... Reality is what you make it! 💊',
            'code': 'while(alive) { eat(); code(); sleep(); repeat(); } // Life of a developer! �'
        };
        
        this.initializeConsole();
    }
    
    initializeConsole() {
        console.log('%c🚀 Welcome to Gaurav\'s Digital World!', 'color: #00ff41; font-size: 20px; font-weight: bold;');
        console.log('%cFull Stack Developer | Technical Enthusiast | Problem Solver', 'color: #00ffff; font-size: 14px;');
        console.log('%cType "help" to see available commands', 'color: #00ffff; font-size: 14px;');
        
        // Override console.log to handle commands
        const originalLog = console.log;
        window.help = () => console.log(this.commands.help);
        window.about = () => console.log(this.commands.about);
        window.skills = () => console.log(this.commands.skills);
        window.projects = () => console.log(this.commands.projects);
        window.contact = () => console.log(this.commands.contact);
        window.matrix = () => console.log(this.commands.matrix);
        window.code = () => console.log(this.commands.code);
        window.clear = () => console.clear();
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.lastScroll = 0;
        
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > this.lastScroll && currentScroll > 500) {
            this.nav.style.transform = 'translateY(-100%)';
        } else {
            this.nav.style.transform = 'translateY(0)';
        }
        
        this.lastScroll = currentScroll;
    }
}

// Responsive Handler
class ResponsiveHandler {
    constructor() {
        this.breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024
        };
        
        this.currentDevice = this.getCurrentDevice();
        this.optimizeForDevice();
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newDevice = this.getCurrentDevice();
                if (newDevice !== this.currentDevice) {
                    this.currentDevice = newDevice;
                    this.optimizeForDevice();
                }
            }, 100);
        });
    }
    
    getCurrentDevice() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.mobile) return 'mobile';
        if (width <= this.breakpoints.tablet) return 'tablet';
        return 'desktop';
    }
    
    optimizeForDevice() {
        document.body.setAttribute('data-device', this.currentDevice);
        
        // Optimize animations for mobile
        if (this.currentDevice === 'mobile') {
            this.reducedMotionOptimizations();
        }
        
        // Adjust terminal text size based on device
        this.adjustTerminalDisplay();
        
        // Optimize touch targets
        this.optimizeTouchTargets();
    }
    
    reducedMotionOptimizations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion || this.currentDevice === 'mobile') {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
    
    adjustTerminalDisplay() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        const isMobile = this.currentDevice === 'mobile';
        
        terminalLines.forEach(line => {
            if (isMobile) {
                // Shorten long terminal lines on mobile
                const text = line.textContent;
                if (text.length > 50) {
                    line.style.fontSize = '0.7rem';
                }
            } else {
                line.style.fontSize = '';
            }
        });
    }
    
    optimizeTouchTargets() {
        const touchTargets = document.querySelectorAll('.btn, .nav-link, .social-link, .project-link');
        
        touchTargets.forEach(target => {
            if (this.currentDevice === 'mobile') {
                target.style.minHeight = '44px';
                target.style.minWidth = '44px';
            }
        });
    }
}

// Theme Toggle (Optional future enhancement)
class ThemeToggle {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = {
            dark: {
                primary: '#0a0a0a',
                secondary: '#111111',
                text: '#ffffff',
                accent: '#00ff41'
            },
            blue: {
                primary: '#0a0a1a',
                secondary: '#111122',
                text: '#ffffff',
                accent: '#00ffff'
            }
        };
    }
    
    toggleTheme(themeName) {
        if (this.themes[themeName]) {
            const theme = this.themes[themeName];
            document.documentElement.style.setProperty('--bg-primary', theme.primary);
            document.documentElement.style.setProperty('--bg-secondary', theme.secondary);
            document.documentElement.style.setProperty('--text-secondary', theme.text);
            document.documentElement.style.setProperty('--text-primary', theme.accent);
            this.currentTheme = themeName;
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.checkPerformance();
    }
    
    checkPerformance() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`%c⚡ Site loaded in ${Math.round(loadTime)}ms`, 'color: #ffff00; font-weight: bold;');
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MatrixRain();
    new SmoothScroll();
    new MobileNav();
    new TerminalSimulation();
    new ScrollAnimations();
    new ContactForm();
    new SkillProgress();
    new ConsoleCommands();
    new NavbarScroll();
    new PerformanceMonitor();
    new ResponsiveHandler(); // Add responsive handler
    
    // Initialize typing animation for name
    const nameElement = document.getElementById('typed-name');
    if (nameElement) {
        new TypeWriter(nameElement, [
            'GAURAV MISHRA',
            'Full Stack Developer',
            'Technical Enthusiast', 
            'Problem Solver',
            '.NET Blazor Expert',
            'React Developer',
            'Code Architect'
        ], 150, 100, 2000);
    }
    
    // Add some interactive console messages
    setTimeout(() => {
        console.log('%c💻 Full Stack Development Console Active', 'color: #00ff41; font-size: 16px;');
        console.log('%c🎯 Status: Ready to build amazing solutions!', 'color: #ffff00; font-size: 14px;');
        console.log('%c🌟 Let\'s create something extraordinary together!', 'color: #00ffff; font-size: 14px;');
    }, 2000);
    
    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #ff00ff; font-size: 20px; font-weight: bold;');
            console.log('%c🚀 Welcome to the secret developer zone!', 'color: #00ffff; font-size: 16px;');
            console.log('%c🎯 Easter egg found! You have excellent debugging skills! 🕵️‍♂️', 'color: #ffff00; font-size: 14px;');
            
            // Add some fun effects
            document.body.style.animation = 'glitch-anim-1 0.3s infinite';
            setTimeout(() => {
                document.body.style.animation = 'none';
            }, 3000);
        }
    });
    
    // Add loading screen fade out
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.location.reload();
        }, 100);
    });
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export classes for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MatrixRain,
        TypeWriter,
        SmoothScroll,
        MobileNav,
        ContactForm
    };
}