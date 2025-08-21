// Music page interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Music player functionality
    const audioPlayer = document.getElementById('music-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const currentTitle = document.getElementById('current-title');
    const currentArtist = document.getElementById('current-artist');
    const currentAlbum = document.getElementById('current-album');
    const musicPlayer = document.querySelector('.music-player');
    
    // Playlist items
    const playlistItems = document.querySelectorAll('.playlist-item');
    let currentSongIndex = 0;
    
    // Set initial volume
    audioPlayer.volume = volumeSlider.value;
    
    // Update volume when slider changes
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value;
    });
    
    // Play/Pause functionality
    playBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            musicPlayer.classList.add('playing');
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            musicPlayer.classList.remove('playing');
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
        totalTimeEl.textContent = formatTime(duration);
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
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Load song function
    function loadSong(index) {
        const song = playlistItems[index];
        const src = song.getAttribute('data-src');
        const title = song.getAttribute('data-title');
        const artist = song.getAttribute('data-artist');
        const image = song.getAttribute('data-image');
        
        audioPlayer.src = src;
        currentTitle.textContent = title;
        currentArtist.textContent = artist;
        currentAlbum.src = image;
        
        // Update active class
        playlistItems.forEach(item => item.classList.remove('active'));
        song.classList.add('active');
        
        // Play the song
        audioPlayer.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        musicPlayer.classList.add('playing');
    }
    
    // Click on playlist item
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        });
    });
    
    // Next song
    nextBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
        loadSong(currentSongIndex);
    });
    
    // Previous song
    prevBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
        loadSong(currentSongIndex);
    });
    
    // Auto-play next song when current ends
    audioPlayer.addEventListener('ended', function() {
        nextBtn.click();
    });
    
    // Video modal functionality
    const videoButtons = document.querySelectorAll('.video-button');
    const modal = document.querySelector('.music-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBackground = document.querySelector('.modal-background');
    const videoFrame = document.getElementById('music-video');
    
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
    
    // Instrument sounds
    const instrumentCards = document.querySelectorAll('.instrument-card');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Preload some instrument sounds (simplified version)
    instrumentCards.forEach(card => {
        card.addEventListener('click', function() {
            const instrument = this.getAttribute('data-sound');
            playInstrumentSound(instrument);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    function playInstrumentSound(instrument) {
        // Create a simple sound based on the instrument
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different sounds for different instruments
        switch(instrument) {
            case 'piano':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                break;
            case 'guitar':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
                break;
            case 'drums':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                break;
            case 'xylophone':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
                break;
        }
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }
    
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
    });
    
    const instrumentCardsAll = document.querySelectorAll('.instrument-card');
    instrumentCardsAll.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
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
    const allCards = document.querySelectorAll('.video-card, .category-card, .instrument-card');
    allCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
    });
    
    // Add dynamic background elements
    createMusicElements();
    
    // Add tab animation
    const tabs = document.querySelectorAll('.activity-tabs li');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Create additional dynamic elements for music theme
function createMusicElements() {
    const shapes = ['circle', 'music', 'note'];
    const colors = ['rgba(247, 37, 133, 0.1)', 'rgba(114, 9, 183, 0.1)', 'rgba(67, 97, 238, 0.1)'];
    
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
        if (type === 'music') {
            shape.style.borderRadius = '50% 50% 0 0';
        } else if (type === 'note') {
            shape.style.borderRadius = '50% 50% 0 50%';
        }
        
        // Animation
        const duration = Math.random() * 30 + 25;
        shape.style.animation = `floatMusic ${duration}s infinite ease-in-out`;
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
    
    /* Music note shapes */
    .music-note {
        position: relative;
    }
    
    .music-note::before {
        content: "♫";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: rgba(247, 37, 133, 0.3);
    }
`;
document.head.appendChild(style);