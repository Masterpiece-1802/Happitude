// Motivation page interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Video modal functionality
    const videoButtons = document.querySelectorAll('.video-button');
    const modal = document.querySelector('.motivation-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBackground = document.querySelector('.modal-background');
    const videoFrame = document.getElementById('motivation-video');
    
    videoButtons.forEach(button => {
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
    
    // Daily quote generator
    const quoteElement = document.getElementById('daily-quote');
    const newQuoteButton = document.getElementById('new-quote');
    
    const motivationalQuotes = [
        {
            text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
            author: "A.A. Milne (Winnie the Pooh)"
        },
        {
            text: "Every day may not be good, but there's something good in every day.",
            author: "Alice Morse Earle"
        },
        {
            text: "Make each day your masterpiece.",
            author: "John Wooden"
        },
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "You're off to great places! Today is your day! Your mountain is waiting, so get on your way!",
            author: "Dr. Seuss"
        },
        {
            text: "It's not what happens to you, but how you react to it that matters.",
            author: "Epictetus"
        },
        {
            text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
            author: "Dr. Seuss"
        },
        {
            text: "Why fit in when you were born to stand out?",
            author: "Dr. Seuss"
        },
        {
            text: "Be the change you wish to see in the world.",
            author: "Mahatma Gandhi"
        },
        {
            text: "No one is perfect - that's why pencils have erasers.",
            author: "Wolfgang Riebe"
        }
    ];
    
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[randomIndex];
    }
    
    function displayQuote(quote) {
        quoteElement.textContent = quote.text;
        document.querySelector('.quote-author').textContent = `- ${quote.author}`;
    }
    
    // Display initial random quote
    displayQuote(getRandomQuote());
    
    // New quote button event
    newQuoteButton.addEventListener('click', function() {
        displayQuote(getRandomQuote());
        
        // Add a little animation
        quoteElement.style.opacity = 0;
        setTimeout(() => {
            quoteElement.style.transition = 'opacity 0.5s ease';
            quoteElement.style.opacity = 1;
        }, 300);
    });
    
    // Affirmation carousel
    const affirmations = document.querySelectorAll('.affirmation');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentAffirmation = 0;
    
    function showAffirmation(index) {
        affirmations.forEach(affirmation => affirmation.classList.remove('active'));
        affirmations[index].classList.add('active');
    }
    
    nextBtn.addEventListener('click', function() {
        currentAffirmation = (currentAffirmation + 1) % affirmations.length;
        showAffirmation(currentAffirmation);
    });
    
    prevBtn.addEventListener('click', function() {
        currentAffirmation = (currentAffirmation - 1 + affirmations.length) % affirmations.length;
        showAffirmation(currentAffirmation);
    });
    
    // Auto-rotate affirmations
    setInterval(() => {
        currentAffirmation = (currentAffirmation + 1) % affirmations.length;
        showAffirmation(currentAffirmation);
    }, 5000);
    
    // Checkbox animation
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.style.textDecoration = 'line-through';
                this.parentElement.style.color = '#38b000';
                
                // Celebrate completion
                const challengeCard = this.closest('.challenge-card');
                challengeCard.style.boxShadow = '0 0 20px rgba(56, 176, 0, 0.3)';
                
                setTimeout(() => {
                    challengeCard.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                }, 1000);
            } else {
                this.parentElement.style.textDecoration = 'none';
                this.parentElement.style.color = '#555';
            }
        });
    });
    
    // Add hover effects to cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
        });
    });
    
    const badgeCards = document.querySelectorAll('.badge-card');
    badgeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
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
    
    // Observe cards for scroll animation
    const allCards = document.querySelectorAll('.video-card, .challenge-card, .badge-card');
    allCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Add dynamic background elements
    createMotivationElements();
    
    // Add tab animation
    const tabs = document.querySelectorAll('.activity-tabs li');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Create additional dynamic elements for motivation theme
function createMotivationElements() {
    const shapes = ['circle', 'star', 'heart'];
    const colors = ['rgba(255, 107, 0, 0.1)', 'rgba(255, 158, 0, 0.1)', 'rgba(247, 37, 133, 0.1)'];
    
    for (let i = 0; i < 8; i++) {
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
        if (type === 'star') {
            shape.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        } else if (type === 'heart') {
            shape.style.clipPath = 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")';
        }
        
        // Animation
        const duration = Math.random() * 30 + 25;
        shape.style.animation = `floatMotivation ${duration}s infinite ease-in-out`;
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
    
    /* Star and heart shapes */
    .star-shape {
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }
    
    .heart-shape {
        clip-path: path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
    }
`;
document.head.appendChild(style);