scrollingElement = (document.scrollingElement || document.body);

function scrollToBottom() {
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

function scrollToTop(id) {
    scrollingElement.scrollTop = 0;
}

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

function onScroll() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

window.onscroll = onScroll();

// New dynamic effects for the playful theme
document.addEventListener('DOMContentLoaded', function() {
    // Create floating elements animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        // Randomize animation duration and delay
        const duration = 5 + Math.random() * 5;
        const delay = Math.random() * 2;
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationDelay = `${delay}s`;
    });
    
    // Button hover effect
    const playfulButton = document.querySelector('.playful-button');
    if (playfulButton) {
        playfulButton.addEventListener('mouseenter', function() {
            createButtonSparkles(this);
        });
    }
    
    // Box hover effects
    const mainBox = document.getElementById('mainBox');
    if (mainBox) {
        mainBox.addEventListener('mouseenter', function() {
            createConfettiEffect();
        });
    }
    
    // Quote box effect
    const quoteBox = document.getElementById('quoteBox');
    if (quoteBox) {
        quoteBox.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #fdfcfb 0%, #f5e6d8 100%)';
        });
        
        quoteBox.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)';
        });
    }
});

// Create button sparkle effect
function createButtonSparkles(button) {
    const buttonRect = button.getBoundingClientRect();
    const sparkle = button.querySelector('.button-sparkle');
    
    if (sparkle) {
        sparkle.style.animation = 'none';
        setTimeout(() => {
            sparkle.style.animation = 'sparkle 1s ease forwards';
        }, 10);
    }
}

// Create confetti effect
function createConfettiEffect() {
    const confettiContainer = document.getElementById('confettiContainer');
    if (!confettiContainer) return;
    
    // Clear previous confetti
    confettiContainer.innerHTML = '';
    confettiContainer.style.opacity = '1';
    
    // Create new confetti
    const colors = ['#ff6b6b', '#4ecdc4', '#ffbe0b', '#7e57c2', '#ff9a8b'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const size = 5 + Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 2;
        const animationDuration = 2 + Math.random() * 3;
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.animationDelay = `${animationDelay}s`;
        confetti.style.animationDuration = `${animationDuration}s`;
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (animationDelay + animationDuration) * 1000);
    }
    
    // Hide container after all confetti is gone
    setTimeout(() => {
        confettiContainer.style.opacity = '0';
    }, 5000);
}

// Add subtle background animation
function animateBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let scale = 1;
    let direction = 0.0001;
    
    setInterval(() => {
        scale += direction;
        if (scale > 1.02 || scale < 1) {
            direction *= -1;
        }
        hero.style.transform = `scale(${scale})`;
    }, 50);
}

// Start background animation when page loads
window.addEventListener('load', animateBackground);