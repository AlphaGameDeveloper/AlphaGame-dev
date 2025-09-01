// Debug logging setup
const DEBUG = {
    particles: false,
    mouse: false,
    stars: true
};

function log(category, ...args) {
    if (DEBUG[category]) {
        console.log(`[${category.toUpperCase()}]`, ...args);
    }
}

// Create floating particles with mouse interaction
const particles = document.querySelector('.particles');
const particlesArray = [];
const mouseInfluenceRadius = 100; // pixels
const mouseForce = 0.5;
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

// Shooting star configuration
const SHOOTING_STAR_CONFIG = {
    minInterval: 3000,    // Minimum time between stars (ms)
    maxInterval: 8000,    // Maximum time between stars (ms)
    minHeight: 5,         // Minimum height percentage
    maxHeight: 30,        // Maximum height percentage
    activeStars: new Set()
};

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Particle {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'particle';
        const size = Math.random() * 3 + 1;
        this.element.style.width = size + 'px';
        this.element.style.height = size + 'px';
        
        // Initial position
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        
        // Velocity
        this.vx = 0;
        this.vy = -0.5 - Math.random();
        
        // Base animation properties
        this.element.style.animationDuration = (Math.random() * 15 + 10) + 's';
        this.element.style.animationDelay = (Math.random() * 2) + 's';
        this.element.style.opacity = Math.random() * 0.5 + 0.1;
        
        this.updatePosition();
        particles.appendChild(this.element);
    }

    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    update() {
        // Apply mouse influence
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInfluenceRadius) {
            const mouseSpeedX = mouseX - lastMouseX;
            const mouseSpeedY = mouseY - lastMouseY;
            const force = (1 - distance / mouseInfluenceRadius) * mouseForce;
            
            this.vx += mouseSpeedX * force;
            this.vy += mouseSpeedY * force;
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Add some natural movement
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.vy += 0.01; // Gentle upward drift
        
        // Wrap around screen
        if (this.x < -10) this.x = window.innerWidth + 10;
        if (this.x > window.innerWidth + 10) this.x = -10;
        if (this.y < -10) this.y = window.innerHeight + 10;
        if (this.y > window.innerHeight + 10) this.y = -10;
        
        this.updatePosition();
    }
}

// Create particles
for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
}

// Animation loop
function animate() {
    particlesArray.forEach(particle => particle.update());
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    requestAnimationFrame(animate);
}
animate();

// Shooting star management
function createShootingStar() {
    if (SHOOTING_STAR_CONFIG.activeStars.size >= 2) {
        return;
    }

    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Position star in top left portion of screen
    const startX = Math.random() * window.innerWidth * 0.3; // First 30% of screen width
    const startY = Math.random() * window.innerHeight * 0.3; // First 30% of screen height
    
    // Calculate trajectory angle (30-45 degrees)
    const angle = 30 + (Math.random() * 15);
    const distance = Math.max(window.innerWidth, window.innerHeight);
    const endX = startX + (distance * Math.cos(angle * Math.PI / 180));
    const endY = startY + (distance * Math.sin(angle * Math.PI / 180));
    
    // Set up the animation
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.animation = 'none'; // Reset animation
    star.style.transform = `translate(0, 0)`;
    
    // Custom animation
    const keyframes = [
        { opacity: 0, transform: 'translate(0, 0)' },
        { opacity: 0.3, transform: 'translate(20px, 20px)' },
        { opacity: 0.3, transform: `translate(${endX * 0.6}px, ${endY * 0.6}px)` },
        { opacity: 0, transform: `translate(${endX}px, ${endY}px)` }
    ];
    
    const timing = {
        duration: 2000,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards'
    };
    
    particles.appendChild(star);
    SHOOTING_STAR_CONFIG.activeStars.add(star);
    
    // Start animation
    const animation = star.animate(keyframes, timing);
    animation.onfinish = () => {
        star.remove();
        SHOOTING_STAR_CONFIG.activeStars.delete(star);
        scheduleNextStar();
    };
    
    log('stars', '🌠 New shooting star created');
}

function scheduleNextStar() {
    const nextDelay = Math.random() * 
        (SHOOTING_STAR_CONFIG.maxInterval - SHOOTING_STAR_CONFIG.minInterval) + 
        SHOOTING_STAR_CONFIG.minInterval;
    
    setTimeout(createShootingStar, nextDelay);
    log('stars', '⏰ Next star scheduled in:', Math.round(nextDelay / 1000), 'seconds');
}

// Start shooting star system with a single initial star
setTimeout(createShootingStar, 3000);
setTimeout(createShootingStar, 2000);

// Mouse tracking with debug info
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    log('mouse', '🖱️ Mouse position:', { 
        x: mouseX, 
        y: mouseY, 
        speed: Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY)
    });
});

// Performance monitoring
let lastFrameTime = performance.now();
let frameCount = 0;

function monitorPerformance() {
    frameCount++;
    const now = performance.now();
    
    if (now - lastFrameTime >= 1000) {
        log('particles', '📊 Performance:', {
            fps: frameCount,
            activeParticles: particlesArray.length
        });
        frameCount = 0;
        lastFrameTime = now;
    }
    
    requestAnimationFrame(monitorPerformance);
}

monitorPerformance();

// Add floating code effect
const codeEffect = document.querySelector('.code-effect');
const codeSnippets = [
    'const createAwesome = () => {\n  return "Something Amazing";\n}',
    'class Innovation {\n  constructor() {\n    this.ideas = [];\n  }\n}',
    'function solveProblems() {\n  return elegantSolution;\n}',
    'let passion = "coding";\nwhile(passion === "coding") {\n  create();\n}',
];

function updateCodeEffect() {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    codeEffect.textContent = randomSnippet;
    codeEffect.style.left = Math.random() * 80 + 10 + '%';
    codeEffect.style.top = Math.random() * 80 + 10 + '%';
    codeEffect.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    
    setTimeout(updateCodeEffect, 5000);
}

updateCodeEffect();

// Intersection Observer for animations and hash updates
const observerOptions = {
    threshold: 0.6
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Handle animations
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Update URL hash when section comes into view
            const section = entry.target.closest('section');
            if (section && section.id) {
                const currentHash = window.location.hash;
                const newHash = '#' + section.id;
                if (currentHash !== newHash) {
                    history.replaceState(null, null, newHash);
                }
            }
        }
    });
}, observerOptions);

// Observe sections for hash updates and elements for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('h2, p, .social-links').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Set initial hash if none exists
if (!window.location.hash && document.querySelector('section')) {
    history.replaceState(null, null, '#' + document.querySelector('section').id);
}

// Scroll indicator click handler
document.querySelectorAll('.scroll-indicator').forEach(indicator => {
    indicator.addEventListener('click', function() {
        const nextSection = this.closest('section').nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
