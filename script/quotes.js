document.addEventListener("DOMContentLoaded", function () {
  // Create glitter particles in the background
  const glitterContainer = document.getElementById("glitterBurst");
  for (let i = 0; i < 50; i++) {
    const glitter = document.createElement("div");
    glitter.classList.add("glitter-particle");
    glitter.style.left = `${Math.random() * 100}%`;
    glitter.style.animationDelay = `${Math.random() * 5}s`;
    glitter.style.animationDuration = `${5 + Math.random() * 5}s`;
    glitter.style.background = `radial-gradient(circle, ${getRandomColor()} 40%, transparent 60%)`;
    glitterContainer.appendChild(glitter);
  }

  // Create floating shapes
  const floatingShapesContainer = document.querySelector(".floating-shapes");
  const shapeTypes = ["star", "heart", "circle"];
  
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement("div");
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    
    shape.classList.add("floating-shape", `shape-${shapeType}`);
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;
    shape.style.animationDelay = `${Math.random() * 20}s`;
    shape.style.animationDuration = `${15 + Math.random() * 15}s`;
    shape.style.opacity = `${0.1 + Math.random() * 0.2}`;
    
    floatingShapesContainer.appendChild(shape);
  }

  // Create rainbow border effect
  const rainbowColors = [
    "#ff6b6b", "#ff9e6d", "#ffd166", "#06d6a0", 
    "#6ecbf5", "#9d4edd", "#ff6b6b"
  ];
  
  const rainbowBorder = document.createElement("div");
  rainbowBorder.classList.add("rainbow-border");
  document.body.appendChild(rainbowBorder);
  
  for (let i = 0; i < rainbowColors.length; i++) {
    const line = document.createElement("div");
    line.classList.add("rainbow-line");
    line.style.backgroundColor = rainbowColors[i];
    line.style.top = `${i * 5}px`;
    line.style.width = `${30 + i * 10}%`;
    line.style.animationDelay = `${i * 0.5}s`;
    rainbowBorder.appendChild(line);
  }

  // Create sparkles for each quote card
  for (let i = 1; i <= 10; i++) {
    const sparklesContainer = document.getElementById(`sparkles${i}`);
    for (let j = 0; j < 15; j++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      sparkle.style.animationDuration = `${1 + Math.random() * 2}s`;
      sparklesContainer.appendChild(sparkle);
    }
  }

  // Like button functionality
  const sparkleButtons = document.querySelectorAll(".sparkle-btn");
  sparkleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      this.classList.toggle("liked");

      if (this.classList.contains("liked")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        createConfetti(5);
        
        // Add a little bounce animation to the card
        const card = this.closest('.quote-card');
        card.style.animation = 'card-bounce 0.5s ease';
        setTimeout(() => {
          card.style.animation = 'card-float 6s infinite alternate ease-in-out';
        }, 500);
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
      }
    });
  });

  // Create confetti effect
  function createConfetti(count) {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.width = `${5 + Math.random() * 10}px`;
      confetti.style.height = `${5 + Math.random() * 10}px`;
      confetti.style.background = getRandomColor();
      confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
      document.body.appendChild(confetti);

      // Remove confetti after animation completes
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }

  // Add CSS for bounce animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes card-bounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Helper function to get random bright color
  function getRandomColor() {
    const colors = [
      "#ff9e6d",
      "#ffd166",
      "#6ecbf5",
      "#a5ecd7",
      "#ff6b6b",
      "#9d4edd",
      "#06d6a0",
      "#ffce5c",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});