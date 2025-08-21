// Yoga page interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Video modal functionality
    const sessionButtons = document.querySelectorAll('.session-button');
    const modal = document.querySelector('.yoga-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBackground = document.querySelector('.modal-background');
    const videoFrame = document.getElementById('yoga-video');
    
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
    
    // Add hover effects to yoga cards
    const yogaCards = document.querySelectorAll('.yoga-card');
    yogaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add hover effects to pose cards
    const poseCards = document.querySelectorAll('.pose-card');
    poseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
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
    
    // Observe yoga cards for scroll animation
    yogaCards.forEach(card => {
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
    
    // Observe pose cards
    poseCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Add dynamic background elements
    createYogaElements();
    
    // Add tab animation
    const tabs = document.querySelectorAll('.activity-tabs li');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Create additional dynamic elements for yoga theme
function createYogaElements() {
    const shapes = ['circle', 'leaf', 'cloud'];
    const colors = ['rgba(56, 176, 0, 0.1)', 'rgba(72, 149, 239, 0.1)', 'rgba(67, 97, 238, 0.1)'];
    
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
        } else if (type === 'leaf') {
            shape.style.borderRadius = '50% 0';
            shape.style.transform = 'rotate(45deg)';
        }
        
        // Animation
        const duration = Math.random() * 30 + 25;
        shape.style.animation = `floatYoga ${duration}s infinite ease-in-out`;
        shape.style.animationDelay = `-${Math.random() * 20}s`;
        
        document.body.appendChild(shape);
    }
}

// Add CSS for additional styles
const style = document.createElement('style');
style.textContent = `
    /* Tab hover effect */
    .activity-tabs li {
        transition: transform 0.3s ease;
    }
    
    .activity-tabs li:hover {
        transform: translateY(-3px);
    }
    
    /* Custom animations for yoga elements */
    @keyframes floatYoga {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    .leaf-shape {
        border-radius: 50% 0;
        transform: rotate(45deg);
    }
`;
document.head.appendChild(style);