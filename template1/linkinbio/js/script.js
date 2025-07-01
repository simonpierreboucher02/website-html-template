// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || this.getPreferredTheme();
        this.init();
    }

    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.setupMediaQueryListener();
    }

    setupEventListeners() {
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Keyboard navigation
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    setupMediaQueryListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Add animation class for smooth transition
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }
}

// Link Analytics (Optional)
class LinkAnalytics {
    constructor() {
        this.links = document.querySelectorAll('.link-card');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackClick(e.target.closest('.link-card'));
            });
        });
    }

    trackClick(linkElement) {
        const linkTitle = linkElement.querySelector('.link-title')?.textContent || 'Unknown Link';
        const linkUrl = linkElement.href;
        
        // You can integrate with Google Analytics or other tracking services here
        console.log(`Link clicked: ${linkTitle} -> ${linkUrl}`);
        
        // Example: Send to Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'link_click', {
                'link_title': linkTitle,
                'link_url': linkUrl
            });
        }
    }
}

// Particle Animation Enhancement
class ParticleManager {
    constructor() {
        this.particles = document.querySelectorAll('.particle');
        this.init();
    }

    init() {
        this.addMouseInteraction();
        this.addScrollInteraction();
    }

    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            this.particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    addScrollInteraction() {
        let ticking = false;
        
        document.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParticlesOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParticlesOnScroll() {
        const scrollY = window.scrollY;
        const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
        
        this.particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.3;
            const y = scrollPercent * speed * 50;
            
            particle.style.transform += ` translateY(${y}px)`;
        });
    }
}

// Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
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

// Loading Animation Manager
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Add loading animation to links
        this.addLinkLoadingStates();
    }

    addLinkLoadingStates() {
        document.querySelectorAll('.link-card').forEach(link => {
            link.addEventListener('click', (e) => {
                // Add loading state
                link.classList.add('loading');
                
                // Remove loading state after a delay (simulating navigation)
                setTimeout(() => {
                    link.classList.remove('loading');
                }, 2000);
            });
        });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.addSkipLinks();
        this.addFocusIndicators();
        this.addKeyboardNavigation();
    }

    addSkipLinks() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Passer au contenu principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    addFocusIndicators() {
        // Add focus indicators for all interactive elements
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });
    }

    addKeyboardNavigation() {
        // Add keyboard navigation for social links
        const socialLinks = document.querySelectorAll('.social-link');
        let currentIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey === false) {
                // Forward tab navigation
                if (document.activeElement.classList.contains('social-link')) {
                    currentIndex = Array.from(socialLinks).indexOf(document.activeElement);
                    currentIndex = (currentIndex + 1) % socialLinks.length;
                    socialLinks[currentIndex].focus();
                    e.preventDefault();
                }
            } else if (e.key === 'Tab' && e.shiftKey === true) {
                // Backward tab navigation
                if (document.activeElement.classList.contains('social-link')) {
                    currentIndex = Array.from(socialLinks).indexOf(document.activeElement);
                    currentIndex = currentIndex === 0 ? socialLinks.length - 1 : currentIndex - 1;
                    socialLinks[currentIndex].focus();
                    e.preventDefault();
                }
            }
        });
    }
}

// Performance Optimizations
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
        this.addIntersectionObserver();
    }

    lazyLoadImages() {
        // Lazy load any images that might be added later
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    optimizeAnimations() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency <= 2) {
            document.body.classList.add('reduced-motion');
        }
    }

    addIntersectionObserver() {
        // Animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.link-card, .social-link').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new LinkAnalytics();
    new ParticleManager();
    new SmoothScroller();
    new LoadingManager();
    new AccessibilityManager();
    new PerformanceManager();

    // Add some fun interactions
    addFunInteractions();
});

// Fun Interactions
function addFunInteractions() {
    // Add confetti effect on profile click
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', createConfetti);
    }

    // Add typing effect to bio
    const profileBio = document.querySelector('.profile-bio');
    if (profileBio) {
        typeWriter(profileBio, profileBio.textContent, 50);
    }
}

// Confetti Effect
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: confetti-fall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Typewriter Effect
function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .loading {
        position: relative;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid var(--accent-primary);
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .focused {
        outline: 2px solid var(--accent-primary) !important;
        outline-offset: 2px !important;
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .theme-transitioning {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
`;
document.head.appendChild(style); 