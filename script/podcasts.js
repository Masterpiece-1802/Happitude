// Podcasts page interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Podcast player functionality
    const audioPlayer = document.getElementById('podcast-player');
    const playBtn = document.getElementById('play-podcast-btn');
    const playIcon = document.getElementById('play-podcast-icon');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const speedSelect = document.getElementById('speed-select');
    const progressFill = document.getElementById('podcast-progress-fill');
    const currentTimeEl = document.getElementById('current-podcast-time');
    const totalTimeEl = document.getElementById('total-podcast-time');
    const currentTitle = document.getElementById('current-podcast-title');
    const currentSeries = document.getElementById('current-podcast-series');
    const currentArt = document.getElementById('current-podcast-art');
    const podcastPlayer = document.querySelector('.podcast-player');
    const audioWaves = document.querySelector('.audio-waves');
    
    // Podcast cards
    const podcastCards = document.querySelectorAll('.podcast-card');
    let currentPodcastIndex = 0;
    
    // Set initial playback speed
    audioPlayer.playbackRate = parseFloat(speedSelect.value);
    
    // Update playback speed when selection changes
    speedSelect.addEventListener('change', function() {
        audioPlayer.playbackRate = parseFloat(this.value);
    });
    
    // Rewind functionality (15 seconds)
    rewindBtn.addEventListener('click', function() {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 15);
    });
    
    // Forward functionality (30 seconds)
    forwardBtn.addEventListener('click', function() {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 30);
    });
    
    // Play/Pause functionality
    playBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            podcastPlayer.classList.add('playing');
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            podcastPlayer.classList.remove('playing');
        }
    });
    
    // Update progress bar
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercent = (currentTime / duration) * 100;
        
        progressFill.style.width = `${progressPercent}%`;
        
        // Update time displays
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Only update total time if it's a valid number
        if (!isNaN(duration)) {
            totalTimeEl.textContent = formatTime(duration);
        }
    });
    
    // Click on progress bar to seek
    document.querySelector('.progress-bar').addEventListener('click', function(e) {
        const progressBar = this;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.offsetWidth;
        const seekTime = (clickPosition / progressBarWidth) * audioPlayer.duration;
        
        audioPlayer.currentTime = seekTime;
    });
    
    // Format time function
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Load podcast function
    function loadPodcast(index) {
        const podcast = podcastCards[index];
        const src = podcast.getAttribute('data-src');
        const title = podcast.getAttribute('data-title');
        const series = podcast.getAttribute('data-series');
        const episode = podcast.getAttribute('data-episode');
        const image = podcast.getAttribute('data-image');
        
        audioPlayer.src = src;
        currentTitle.textContent = title;
        currentSeries.textContent = series;
        currentArt.src = image;
        
        // Update episode info
        document.querySelector('.episode-info span').textContent = episode;
        
        // Update active class
        podcastCards.forEach(card => card.classList.remove('active'));
        podcast.classList.add('active');
        
        // Play the podcast
        audioPlayer.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        podcastPlayer.classList.add('playing');
    }
    
    // Click on podcast card
    podcastCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            currentPodcastIndex = index;
            loadPodcast(currentPodcastIndex);
        });
    });
    
    // Auto-play next podcast when current ends
    audioPlayer.addEventListener('ended', function() {
        // For demo purposes, just restart the same podcast
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });
    
    // Subscribe form
    const subscribeForm = document.querySelector('.subscribe-form');
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            // Show success message
            alert(`Thanks for subscribing! We'll send podcast updates to ${emailInput.value}`);
            emailInput.value = '';
        }
    });
    
    // Add hover effects to cards
    podcastCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
        });
        
        // Filter podcasts by category on click (simplified)
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            alert(`Showing podcasts in ${category} category!`);
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
    const allCards = document.querySelectorAll('.podcast-card, .category-card');
    allCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Add dynamic background elements
    createPodcastElements();
    
    // Add tab animation
    const tabs = document.querySelectorAll('.activity-tabs li');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Create additional dynamic elements for podcast theme
function createPodcastElements() {
    const shapes = ['circle', 'podcast', 'wave'];
    const colors = ['rgba(67, 97, 238, 0.1)', 'rgba(76, 201, 240, 0.1)', 'rgba(114, 9, 183, 0.1)'];
    
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
        if (type === 'podcast') {
            shape.style.borderRadius = '10px';
        } else if (type === 'wave') {
            shape.style.borderRadius = '50% 50% 0 0';
        }
        
        // Animation
        const duration = Math.random() * 30 + 25;
        shape.style.animation = `floatPodcast ${duration}s infinite ease-in-out`;
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
    
    /* Active podcast card */
    .podcast-card.active {
        box-shadow: 0 0 0 3px var(--podcast-blue), 0 12px 30px rgba(0, 0, 0, 0.1) !important;
    }
    
    .podcast-card.active:hover {
        box-shadow: 0 0 0 3px var(--podcast-blue), 0 20px 40px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* Loading animation for podcast player */
    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
    
    .loading .podcast-art::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 15px;
        animation: pulse 1.5s infinite;
    }
`;
document.head.appendChild(style);