class PlayfulNavbar {
  constructor() {
    this.navbar = document.querySelector('.playful-navbar');
    this.burger = document.getElementById('playfulBurger');
    this.menu = document.getElementById('playfulMenu');
    this.navItems = document.querySelectorAll('.playful-nav-item');
    this.progressBar = document.querySelector('.nav-progress');
    this.bubbleContainer = document.getElementById('bubbleContainer');
    this.lastScrollY = window.scrollY;
    this.scrollDirection = 'down';
    this.bubbles = [];
    
    this.init();
  }
  
  init() {
    // Burger menu toggle
    if (this.burger) {
      this.burger.addEventListener('click', () => {
        this.toggleMenu();
      });
    }
    
    // Close menu when clicking on nav items (mobile)
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (this.menu.classList.contains('active')) {
          this.toggleMenu();
        }
        this.createBubbleEffect(item);
      });
      
      // Enhanced hover effect for desktop
      if (window.innerWidth > 1023) {
        item.addEventListener('mouseenter', (e) => {
          this.createBubbleEffect(e.currentTarget);
          this.bounceText(e.currentTarget);
        });
      }
    });
    
    // Scroll events with direction detection
    window.addEventListener('scroll', () => {
      this.handleScrollDirection();
      this.handleScroll();
      this.updateProgressBar();
    });
    
    // Initialize progress bar
    this.updateProgressBar();
    
    // Handle resize events
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    
    // Initialize bubbles animation
    this.initBubbles();
  }
  
  toggleMenu() {
    this.burger.classList.toggle('active');
    this.menu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
    
    // Add animation class for menu items when opening
    if (this.menu.classList.contains('active')) {
      this.animateMenuItems();
    }
  }
  
  handleScrollDirection() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > this.lastScrollY) {
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }
    
    this.lastScrollY = currentScrollY;
  }
  
  handleScroll() {
    // Add/remove scrolled class based on scroll position and direction
    if (window.scrollY > 30) {
      this.navbar.classList.add('scrolled');
      
      // Hide navbar when scrolling down, show when scrolling up
      if (this.scrollDirection === 'down' && window.scrollY > 80) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }
    } else {
      this.navbar.classList.remove('scrolled');
      this.navbar.style.transform = 'translateY(0)';
    }
  }
  
  updateProgressBar() {
    // Calculate scroll progress
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    // Update progress bar width with smooth animation
    this.progressBar.style.width = scrollPercent + '%';
  }
  
  createBubbleEffect(element) {
    const rect = element.getBoundingClientRect();
    const count = 5;
    
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('nav-bubble');
      
      const size = Math.random() * 10 + 5;
      const posX = rect.left + (Math.random() * rect.width);
      const posY = rect.bottom;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${posX}px`;
      bubble.style.top = `${posY}px`;
      bubble.style.opacity = Math.random() * 0.7 + 0.3;
      bubble.style.animationDelay = `${Math.random() * 2}s`;
      
      document.body.appendChild(bubble);
      
      // Remove bubble after animation completes
      setTimeout(() => {
        bubble.remove();
      }, 3000);
    }
  }
  
  bounceText(element) {
    const text = element.querySelector('.nav-text');
    text.style.animation = 'none';
    setTimeout(() => {
      text.style.animation = 'bounce-in 0.5s ease';
    }, 10);
  }
  
  animateMenuItems() {
    // Animate menu items with staggered delay when menu opens
    this.navItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.animation = `bounce-in 0.5s ease ${index * 0.1}s both`;
      }, 100);
    });
  }
  
  handleResize() {
    // Close menu on resize if it's open and we're above mobile breakpoint
    if (window.innerWidth > 1023 && this.menu.classList.contains('active')) {
      this.toggleMenu();
    }
  }
  
  initBubbles() {
    // Create initial bubbles
    for (let i = 0; i < 10; i++) {
      this.createBubble();
    }
  }
  
  createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('nav-bubble');
    
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * 100;
    const delay = Math.random() * 5;
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${posX}%`;
    bubble.style.bottom = `-${size}px`;
    bubble.style.opacity = Math.random() * 0.6 + 0.1;
    bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
    bubble.style.animationDelay = `${delay}s`;
    
    this.bubbleContainer.appendChild(bubble);
    
    // Remove and recreate bubble after animation completes
    setTimeout(() => {
      bubble.remove();
      this.createBubble();
    }, (delay + 8) * 1000);
  }
}

// Initialize the navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PlayfulNavbar();
});



// Footer styles

// footer.js
document.addEventListener('DOMContentLoaded', function() {
  // Create floating bubbles
  const bubbleContainer = document.getElementById('footerBubbles');
  const numberOfBubbles = 15;
  
  for (let i = 0; i < numberOfBubbles; i++) {
    createBubble(bubbleContainer);
  }
  
  // Make animals interactive
  const animals = document.querySelectorAll('.footer-animal');
  animals.forEach(animal => {
    animal.addEventListener('mouseover', () => {
      animal.style.transform = 'scale(1.5)';
      animal.style.transition = 'transform 0.3s ease';
    });
    
    animal.addEventListener('mouseout', () => {
      animal.style.transform = '';
    });
    
    animal.addEventListener('click', () => {
      animal.style.animation = 'spin 1s ease';
      setTimeout(() => {
        animal.style.animation = '';
      }, 1000);
    });
  });
  
  // Add CSS for spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});

function createBubble(container) {
  const bubble = document.createElement('div');
  bubble.classList.add('footer-bubble');
  
  // Random size between 10 and 40px
  const size = Math.random() * 30 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  // Random position
  bubble.style.left = `${Math.random() * 100}%`;
  
  // Random animation delay and duration
  const delay = Math.random() * 5;
  const duration = Math.random() * 10 + 15;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.animationDuration = `${duration}s`;
  
  container.appendChild(bubble);
  
  // Remove bubble after animation completes and create a new one
  setTimeout(() => {
    bubble.remove();
    createBubble(container);
  }, (delay + duration) * 1000);
}