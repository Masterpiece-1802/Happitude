// Meditation page interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Get score from localStorage and display with animation
    const score = localStorage.getItem('score') || 50; // Default score if not set
    const scoreElement = document.getElementById('score');
    
    if (scoreElement) {
        scoreElement.innerHTML = `Your calmness score is <span class="score-value">${score}</span>`;
        
        // Add celebration for high scores
        if (score > 70) {
            scoreElement.innerHTML += ' 🧘‍♂️';
            createCalmEffects();
        } else if (score > 50) {
            scoreElement.innerHTML += ' 🙂';
        }
    }
    
    // Video modal functionality
    const sessionButtons = document.querySelectorAll('.session-button');
    const modal = document.querySelector('.meditation-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBackground = document.querySelector('.modal-background');
    const videoFrame = document.getElementById('meditation-video');
    
    sessionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeModal() {
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalBackground.addEventListener('click', closeModal);
    
    // Breathing exercise functionality
    const breathCircle = document.getElementById('breath-circle');
    const breathInstruction = document.getElementById('breath-instruction');
    const startButton = document.getElementById('start-breathing');
    const speedButtons = document.querySelectorAll('.speed-btn');
    
    let breathingActive = false;
    let breathSpeed = 'normal';
    let breathInterval;
    
    startButton.addEventListener('click', function() {
        if (!breathingActive) {
            startBreathing();
            this.textContent = 'Stop Breathing';
            breathingActive = true;
        } else {
            stopBreathing();
            this.textContent = 'Start Breathing';
            breathingActive = false;
        }
    });
    
    speedButtons.forEach(button => {
        button.addEventListener('click', function() {
            speedButtons.forEach(btn => btn.classList.remove('is-info', 'is-warning'));
            this.classList.add('is-info');
            if (this.getAttribute('data-speed') === 'fast') {
                this.classList.add('is-warning');
            }
            breathSpeed = this.getAttribute('data-speed');
            
            if (breathingActive) {
                stopBreathing();
                startBreathing();
            }
        });
    });
    
    function startBreathing() {
        let breatheInTime, breatheOutTime, holdTime;
        
        switch(breathSpeed) {
            case 'slow':
                breatheInTime = 5000;
                holdTime = 2000;
                breatheOutTime = 6000;
                break;
            case 'fast':
                breatheInTime = 2000;
                holdTime = 1000;
                breatheOutTime = 3000;
                break;
            default: // normal
                breatheInTime = 4000;
                holdTime = 1000;
                breatheOutTime = 5000;
        }
        
        // Start with breathe in
        breathInstruction.textContent = 'Breathe in...';
        breathCircle.style.transform = 'scale(1.5)';
        breathCircle.style.backgroundColor = '#38b000';
        
        breathInterval = setInterval(function() {
            // Breathe in
            breathInstruction.textContent = 'Breathe in...';
            breathCircle.style.transform = 'scale(1.5)';
            breathCircle.style.backgroundColor = '#38b000';
            
            setTimeout(function() {
                // Hold
                breathInstruction.textContent = 'Hold...';
                breathCircle.style.backgroundColor = '#4895ef';
                
                setTimeout(function() {
                    // Breathe out
                    breathInstruction.textContent = 'Breathe out...';
                    breathCircle.style.transform = 'scale(1)';
                    breathCircle.style.backgroundColor = '#4361ee';
                }, holdTime);
            }, breatheInTime);
        }, breatheInTime + holdTime + breatheOutTime);
    }
    
    function stopBreathing() {
        clearInterval(breathInterval);
        breathInstruction.textContent = 'Click Start to begin';
        breathCircle.style.transform = 'scale(1)';
        breathCircle.style.backgroundColor = '';
    }
    
    // Add hover effects to meditation cards
    const meditationCards = document.querySelectorAll('.meditation-card');
    meditationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
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
    
    // Observe meditation cards for scroll animation
    meditationCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Observe benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Add dynamic background elements
    createCalmElements();
    
    // Add tab animation
    const tabs = document.querySelectorAll('.activity-tabs li');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Create calm effects for high scores
function createCalmEffects() {
    const calmEmojis = ['🧘‍♂️', '🌿', '☁️', '🌊', '🌙', '✨'];
    const container = document.querySelector('.animated-score');
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'calm-emoji';
        emoji.textContent = calmEmojis[Math.floor(Math.random() * calmEmojis.length)];
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
            emoji.style.transition = 'all 2s ease';
            emoji.style.opacity = '1';
            emoji.style.transform = `translateY(-${Math.random() * 100 + 150}px) rotate(${Math.random() * 360}deg)`;
            
            setTimeout(() => {
                emoji.style.opacity = '0';
                setTimeout(() => emoji.remove(), 2000);
            }, 1800);
        }, i * 200);
    }
}

// Create additional dynamic elements for calming effect
function createCalmElements() {
    const shapes = ['circle', 'square', 'cloud'];
    const colors = ['rgba(72, 149, 239, 0.1)', 'rgba(56, 176, 0, 0.1)', 'rgba(67, 97, 238, 0.1)'];
    
    for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Random properties
        const size = Math.random() * 50 + 20;
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
        } else if (type === 'cloud') {
            shape.style.borderRadius = '50%';
            shape.style.width = `${size * 1.5}px`;
        }
        
        // Animation
        const duration = Math.random() * 30 + 25;
        shape.style.animation = `floatCalm ${duration}s infinite ease-in-out`;
        shape.style.animationDelay = `-${Math.random() * 20}s`;
        
        document.body.appendChild(shape);
    }
}

// Add CSS for additional styles
const style = document.createElement('style');
style.textContent = `
    .calm-emoji {
        position: absolute;
        animation: floatUpCalm 2s ease-out forwards;
    }
    
    @keyframes floatUpCalm {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-150px) rotate(360deg); opacity: 0; }
    }
    
    .score-value {
        font-weight: bold;
        font-size: 1.4em;
        background: linear-gradient(45deg, #38b000, #4895ef);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    /* Tab hover effect */
    .activity-tabs li {
        transition: transform 0.3s ease;
    }
    
    .activity-tabs li:hover {
        transform: translateY(-3px);
    }
    
    /* Breathing animation keyframes */
    @keyframes breatheIn {
        to { transform: scale(1.5); background-color: #38b000; }
    }
    
    @keyframes breatheOut {
        to { transform: scale(1); background-color: #4361ee; }
    }
`;
document.head.appendChild(style);