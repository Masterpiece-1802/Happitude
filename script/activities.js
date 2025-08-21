// Enhanced Activities page interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Get score from localStorage and display with animation
    const score = localStorage.getItem('score') || 50; // Default score if not set
    const scoreElement = document.getElementById('score');
    
    if (scoreElement) {
        scoreElement.innerHTML = `Your happiness score is <span class="score-value">${score}</span>`;
        
        // Add celebration for high scores
        if (score > 70) {
            scoreElement.innerHTML += ' 🎉';
            createConfetti();
            setTimeout(createFloatingEmojis, 500);
        } else if (score > 50) {
            scoreElement.innerHTML += ' 🙂';
        }
    }
    
    // Add hover effects to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.play-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Open game in new tab after animation
            setTimeout(() => {
                ripple.remove();
                window.open(this.href, '_blank');
            }, 600);
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe game cards for scroll animation
    gameCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Observe category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Add dynamic background elements
    createDynamicElements();
    
    // Add tab animation
    const tabs = document.querySelectorAll('.activity-tabs li');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Create confetti animation for high scores
function createConfetti() {
    const colors = ['#4361ee', '#f72585', '#4cc9f0', '#38b000', '#ff9e00', '#7209b7'];
    const container = document.querySelector('.animated-score');
    
    for (let i = 0; i < 25; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.width = `${Math.random() * 12 + 5}px`;
        confetti.style.height = `${Math.random() * 12 + 5}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'absolute';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.opacity = '0';
        confetti.style.zIndex = '10';
        confetti.style.transform = 'translateY(0) rotate(0deg)';
        
        container.appendChild(confetti);
        
        // Animate confetti
        setTimeout(() => {
            confetti.style.transition = 'all 1s ease';
            confetti.style.opacity = '1';
            confetti.style.transform = `translateY(-${Math.random() * 100 + 50}px) rotate(${Math.random() * 360}deg)`;
            
            setTimeout(() => {
                confetti.style.opacity = '0';
                setTimeout(() => confetti.remove(), 1000);
            }, 800);
        }, i * 100);
    }
}

// Create floating emojis for celebration
function createFloatingEmojis() {
    const emojis = ['🎮', '😊', '🎯', '👍', '🎉', '😄', '⭐'];
    const container = document.querySelector('.score-display');
    
    for (let i = 0; i < 12; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'absolute';
        emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100 + 100}%`;
        emoji.style.opacity = '0';
        emoji.style.zIndex = '10';
        emoji.style.pointerEvents = 'none';
        
        container.appendChild(emoji);
        
        // Animate emoji
        setTimeout(() => {
            emoji.style.transition = 'all 1.5s ease';
            emoji.style.opacity = '1';
            emoji.style.transform = `translateY(-${Math.random() * 100 + 150}px) rotate(${Math.random() * 360}deg)`;
            
            setTimeout(() => {
                emoji.style.opacity = '0';
                setTimeout(() => emoji.remove(), 1500);
            }, 1200);
        }, i * 150);
    }
}

// Create additional dynamic elements for playful effect
function createDynamicElements() {
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['rgba(67, 97, 238, 0.1)', 'rgba(247, 37, 133, 0.1)', 'rgba(76, 201, 240, 0.1)', 'rgba(114, 9, 183, 0.1)'];
    
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Random properties
        const size = Math.random() * 60 + 20;
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.backgroundColor = color;
        shape.style.position = 'fixed';
        shape.style.zIndex = '-1';
        
        // Position randomly
        shape.style.left = `${Math.random() * 90 + 5}%`;
        shape.style.top = `${Math.random() * 90 + 5}%`;
        
        // Different shapes
        if (type === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (type === 'triangle') {
            shape.style.backgroundColor = 'transparent';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
            shape.style.width = '0';
            shape.style.height = '0';
        }
        
        // Animation
        const duration = Math.random() * 25 + 20;
        shape.style.animation = `float ${duration}s infinite ease-in-out`;
        shape.style.animationDelay = `-${Math.random() * 15}s`;
        
        document.body.appendChild(shape);
    }
}

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-shape {
        animation: float 20s infinite ease-in-out;
    }
    
    .score-value {
        font-weight: bold;
        font-size: 1.4em;
        background: linear-gradient(45deg, #f72585, #4361ee);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .floating-emoji {
        position: absolute;
        animation: floatUp 1.5s ease-out forwards;
    }
    
    @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-150px) rotate(360deg); opacity: 0; }
    }
    
    /* Tab hover effect */
    .activity-tabs li {
        transition: transform 0.3s ease;
    }
    
    .activity-tabs li:hover {
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);