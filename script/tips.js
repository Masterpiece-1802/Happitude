$(document).ready(function() {
    // Tab switching functionality
    $('.tabs li').on('click', function() {
        const tab = $(this).data('tab');
        
        // Update active tab
        $('.tabs li').removeClass('is-active');
        $(this).addClass('is-active');
        
        // Show active content
        $('.tab-pane').removeClass('is-active');
        $(`#${tab}`).addClass('is-active');
    });
    
    // Positive Thinking Tab
    // Shuffle affirmations
    $('.shuffle-btn').on('click', function() {
        const affirmations = $('.affirmation');
        for (let i = affirmations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            affirmations.eq(i).before(affirmations.eq(j));
        }
        
        // Add animation effect
        $('.affirmation').css('transform', 'translateX(-10px)');
        setTimeout(() => {
            $('.affirmation').css('transform', 'translateX(0)');
        }, 300);
    });
    
    // Toggle affirmation/action completion
    $('.affirmation, .action-item').on('click', function() {
        $(this).toggleClass('is-active completed');
        updateProgress();
    });
    
    // Update progress tracker
    function updateProgress() {
        const completed = $('.action-item.completed').length;
        $('#progress-count').text(completed);
        $('.progress').val(completed);
        
        // Add celebration if all completed
        if (completed === 5) {
            $('.progress-container').append('<div class="notification is-success mt-3">🎉 Awesome! You completed all positive actions!</div>');
            setTimeout(() => {
                $('.notification').fadeOut();
            }, 3000);
        }
    }
    
    // Reset progress
    $('.reset-progress').on('click', function() {
        $('.action-item').removeClass('completed');
        updateProgress();
    });
    
    // Daily thought generator
    const positiveThoughts = [
        "You are capable of amazing things!",
        "Mistakes help you learn and grow!",
        "Your kindness makes the world better!",
        "You have the power to make today great!",
        "Challenges make you stronger!",
        "Your smile can brighten someone's day!",
        "You are unique and special just as you are!",
        "Every day is a fresh start!",
        "Your ideas matter!",
        "You make a difference in the world!"
    ];
    
    $('#new-thought').on('click', function() {
        const randomThought = positiveThoughts[Math.floor(Math.random() * positiveThoughts.length)];
        $('#daily-thought').fadeOut(300, function() {
            $(this).text(randomThought).fadeIn(300);
        });
    });
    
    // Health & Fitness Tab
    // Water tracker
    $('.cup').on('click', function() {
        $(this).toggleClass('filled');
    });
    
    $('.add-water').on('click', function() {
        const nextCup = $('.cup:not(.filled)').first();
        if (nextCup.length) {
            nextCup.addClass('filled');
            
            // Check if all cups are filled
            if ($('.cup.filled').length === 7) {
                $(this).after('<div class="notification is-success mt-3">💧 Great job! You reached your water goal!</div>');
                setTimeout(() => {
                    $('.notification').fadeOut();
                }, 3000);
            }
        }
    });
    
    $('.reset-water').on('click', function() {
        $('.cup').removeClass('filled');
        $('.notification').remove();
    });
    
    // Exercise timer
    let timerInterval;
    let timerRunning = false;
    let timerSeconds = 300; // 5 minutes
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        $('.timer-display').text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }
    
    $('.start-timer').on('click', function() {
        if (!timerRunning) {
            timerRunning = true;
            $(this).html('<span class="icon"><i class="fas fa-pause"></i></span><span>Pause</span>').removeClass('is-success').addClass('is-warning');
            
            timerInterval = setInterval(() => {
                if (timerSeconds > 0) {
                    timerSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    $('.start-timer').html('<span class="icon"><i class="fas fa-play"></i></span><span>Start Timer</span>').removeClass('is-warning').addClass('is-success');
                    $('.timer-display').css('color', '#23d160');
                    alert('⏰ Time\'s up! Great job exercising!');
                }
            }, 1000);
        } else {
            clearInterval(timerInterval);
            timerRunning = false;
            $('.start-timer').html('<span class="icon"><i class="fas fa-play"></i></span><span>Resume</span>').removeClass('is-warning').addClass('is-success');
        }
    });
    
    $('.reset-timer').on('click', function() {
        clearInterval(timerInterval);
        timerRunning = false;
        timerSeconds = 300;
        updateTimerDisplay();
        $('.start-timer').html('<span class="icon"><i class="fas fa-play"></i></span><span>Start Timer</span>').removeClass('is-warning').addClass('is-success');
        $('.timer-display').css('color', '#3273dc');
    });
    
    // Sleep calculator
    $('#calculate-sleep').on('click', function() {
        const bedtime = $('#bedtime').val();
        const waketime = $('#waketime').val();
        
        if (bedtime && waketime) {
            const [bedHour, bedMinute] = bedtime.split(':').map(Number);
            const [wakeHour, wakeMinute] = waketime.split(':').map(Number);
            
            let bedTotalMinutes = bedHour * 60 + bedMinute;
            let wakeTotalMinutes = wakeHour * 60 + wakeMinute;
            
            // If wake time is earlier than bedtime, assume it's the next day
            if (wakeTotalMinutes < bedTotalMinutes) {
                wakeTotalMinutes += 24 * 60;
            }
            
            const sleepMinutes = wakeTotalMinutes - bedTotalMinutes;
            const sleepHours = Math.floor(sleepMinutes / 60);
            const sleepMins = sleepMinutes % 60;
            
            let message;
            if (sleepHours >= 9) {
                message = `😴 You got ${sleepHours} hours ${sleepMins} minutes of sleep - great job!`;
            } else if (sleepHours >= 7) {
                message = `😊 You got ${sleepHours} hours ${sleepMins} minutes of sleep - pretty good!`;
            } else {
                message = `😔 You got ${sleepHours} hours ${sleepMins} minutes of sleep - try to get more rest tonight!`;
            }
            
            $('#sleep-result').text(message);
        } else {
            $('#sleep-result').text('Please enter both bedtime and wake time.');
        }
    });
    
    // Healthy Snacks Tab
    // Random snack suggestion
    $('#random-snack').on('click', function() {
        const snacks = $('.snack');
        const randomIndex = Math.floor(Math.random() * snacks.length);
        
        // Highlight the random snack
        snacks.removeClass('highlighted').css({
            'transform': '',
            'box-shadow': ''
        });
        
        const randomSnack = snacks.eq(randomIndex);
        randomSnack.addClass('highlighted');
        
        // Add animation
        randomSnack.css({
            'transform': 'scale(1.05)',
            'box-shadow': '0 5px 15px rgba(0,0,0,0.2)',
            'border-left-color': '#ff3860'
        });
        
        // Scroll to the snack if not fully visible
        $('html, body').animate({
            scrollTop: randomSnack.offset().top - 100
        }, 1000);
        
        // Reset after 3 seconds
        setTimeout(() => {
            randomSnack.css({
                'transform': '',
                'box-shadow': '',
                'border-left-color': '#ffdd57'
            });
        }, 3000);
    });
    
    // Rainbow tracker
    $('.color-option').on('click', function() {
        $(this).toggleClass('selected');
        
        // Check if all colors are selected
        if ($('.color-option.selected').length === 5) {
            $('#rainbow-badge').addClass('achieved');
            
            // Add celebration effect
            setTimeout(() => {
                $('#rainbow-badge').css('transform', 'scale(1.2)');
                setTimeout(() => {
                    $('#rainbow-badge').css('transform', 'scale(1)');
                }, 300);
            }, 100);
        } else {
            $('#rainbow-badge').removeClass('achieved');
        }
    });
    
    // Food facts carousel
    let currentFact = 0;
    const facts = $('.food-fact');
    
    $('#next-fact').on('click', function() {
        facts.eq(currentFact).removeClass('active');
        currentFact = (currentFact + 1) % facts.length;
        facts.eq(currentFact).addClass('active');
    });
    
    // Journaling Tab
    // Prompt completion
    $('.prompt-btn').on('click', function() {
        $(this).toggleClass('is-success').html('<span class="icon"><i class="fas fa-check"></i></span><span>Done!</span>');
        $(this).parent().css('border-left-color', '#23d160');
    });
    
    // Shuffle prompts
    $('.shuffle-prompts').on('click', function() {
        const prompts = $('.prompt');
        for (let i = prompts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            prompts.eq(i).before(prompts.eq(j));
        }
        
        // Reset buttons
        $('.prompt-btn')
            .removeClass('is-success')
            .html('I did this!');
            
        $('.prompt').css('border-left-color', 'transparent');
    });
    
    // Drawing canvas
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentColor = '#ff3860';
    
    // Set canvas size correctly
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40; // Account for padding
        canvas.height = 200;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = currentColor;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile devices
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', e => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Color selection
    $('.color-choice').on('click', function() {
        $('.color-choice').removeClass('selected');
        $(this).addClass('selected');
        currentColor = $(this).data('color');
        ctx.strokeStyle = currentColor;
    });
    
    // Clear canvas
    $('.clear-canvas').on('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // Save drawing (simulated)
    $('#save-drawing').on('click', function() {
        alert('🎨 Your drawing has been saved! (This is a simulation - in a real app, it would save to your device)');
    });
    
    // Fun Games Tab
    // Memory Game
    const memoryCards = ['🍎', '🍌', '🍒', '🍕', '🍦', '🚀', '🍎', '🍌', '🍒', '🍕', '🍦', '🚀'];
    let flippedCards = [];
    let matchedPairs = 0;
    let moveCount = 0;
    
    function initMemoryGame() {
        $('#memory-grid').empty();
        flippedCards = [];
        matchedPairs = 0;
        moveCount = 0;
        $('#move-count').text('0');
        $('#pairs-found').text('0');
        
        // Shuffle cards
        const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
        
        // Create card elements
        shuffledCards.forEach((emoji, index) => {
            const card = $('<div>')
                .addClass('memory-card')
                .attr('data-index', index)
                .attr('data-emoji', emoji)
                .text('?')
                .on('click', flipCard);
                
            $('#memory-grid').append(card);
        });
    }
    
    function flipCard() {
        const card = $(this);
        
        // Don't allow flipping if already flipped or matched, or if two cards are already flipped
        if (card.hasClass('flipped') || card.hasClass('matched') || flippedCards.length === 2) {
            return;
        }
        
        // Flip the card
        card.addClass('flipped').text(card.data('emoji'));
        flippedCards.push(card);
        
        // Check for match if two cards are flipped
        if (flippedCards.length === 2) {
            moveCount++;
            $('#move-count').text(moveCount);
            
            const [card1, card2] = flippedCards;
            
            if (card1.data('emoji') === card2.data('emoji')) {
                // Match found
                setTimeout(() => {
                    card1.addClass('matched');
                    card2.addClass('matched');
                    flippedCards = [];
                    matchedPairs++;
                    $('#pairs-found').text(matchedPairs);
                    
                    // Check if all pairs are found
                    if (matchedPairs === 6) {
                        setTimeout(() => {
                            alert(`🎉 Congratulations! You won in ${moveCount} moves!`);
                        }, 500);
                    }
                }, 500);
            } else {
                // No match - flip back
                setTimeout(() => {
                    card1.removeClass('flipped').text('?');
                    card2.removeClass('flipped').text('?');
                    flippedCards = [];
                }, 1000);
            }
        }
    }
    
    // Initialize memory game
    initMemoryGame();
    $('#reset-memory').on('click', initMemoryGame);
    
    // Breathing exercise
    let breathingInterval;
    let isBreathing = false;
    
    $('#start-breathing').on('click', function() {
        if (!isBreathing) {
            isBreathing = true;
            $(this).html('<span class="icon"><i class="fas fa-stop"></i></span><span>Stop</span>');
            
            const circle = $('#breathing-circle');
            let isInhaling = true;
            
            circle.text('Breathe In').removeClass('breathing-out').addClass('breathing-in');
            
            breathingInterval = setInterval(() => {
                isInhaling = !isInhaling;
                
                if (isInhaling) {
                    circle.text('Breathe In').removeClass('breathing-out').addClass('breathing-in');
                } else {
                    circle.text('Breathe Out').removeClass('breathing-in').addClass('breathing-out');
                }
            }, 4000);
        } else {
            clearInterval(breathingInterval);
            isBreathing = false;
            $('#breathing-circle').removeClass('breathing-in breathing-out');
            $(this).html('<span class="icon"><i class="fas fa-play"></i></span><span>Start Breathing Exercise</span>');
        }
    });
    
    // Would You Rather questions
    const wyrQuestions = [
        {
            question: "Would you rather be able to fly or be invisible?",
            optionA: "Fly",
            optionB: "Be invisible"
        },
        {
            question: "Would you rather have a pet dinosaur or a pet dragon?",
            optionA: "Dinosaur",
            optionB: "Dragon"
        },
        {
            question: "Would you rather live in a treehouse or on a boat?",
            optionA: "Treehouse",
            optionB: "Boat"
        },
        {
            question: "Would you rather be a famous scientist or a famous artist?",
            optionA: "Scientist",
            optionB: "Artist"
        },
        {
            question: "Would you rather be able to talk to animals or speak all languages?",
            optionA: "Talk to animals",
            optionB: "Speak all languages"
        }
    ];
    
    let currentQuestion = 0;
    
    function updateQuestion() {
        const question = wyrQuestions[currentQuestion];
        $('#wyr-question').text(question.question);
        $('.option-a').text(question.optionA);
        $('.option-b').text(question.optionB);
    }
    
    $('.option-a, .option-b').on('click', function() {
        $(this).addClass('is-selected').siblings().removeClass('is-selected');
    });
    
    $('#next-question').on('click', function() {
        currentQuestion = (currentQuestion + 1) % wyrQuestions.length;
        updateQuestion();
        $('.option-a, .option-b').removeClass('is-selected');
    });
    
    // Initialize the first question
    updateQuestion();
    
    // Audio functionality (simulated)
    $('.play-audio').on('click', function() {
        alert('🔊 In a real app, this would play audio. For now, use your imagination!');
    });
    
    // Initialize all components
    updateTimerDisplay();
});