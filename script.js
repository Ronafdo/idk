// Love notes array
const loveNotes = [
    "I'd choose you in every lifetime.",
    "Your smile makes my whole day better.",
    "You're the best decision I've ever made.",
    "I fall for you more and more each day.",
    "You're my favorite hello and hardest goodbye.",
    "Being with you feels like home.",
    "You make my heart skip a beat.",
    "I'm obsessed with you.",
    "You're my person.",
    "Forever with you isn't long enough.",
    "Every moment with you is a treasure.",
    "You're the reason I believe in love.",
    "I love you more than words can express.",
    "You're my greatest blessing.",
    "I'd do anything to see you smile."
];

// Pet names array
const petNames = [
    "My Love",
    "Sweetheart",
    "Darling",
    "Sunshine",
    "My Angel",
    "Beautiful",
    "My Heart",
    "Honey",
    "Love of My Life",
    "Baby",
    "My Treasure",
    "Gorgeous",
    "My World",
    "Sweet Soul",
    "My Everything"
];

// Wrap initialization and listeners so DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Carousel functions
    let currentSlide = 1;

    function showSlide(n) {
        const slides = document.getElementsByClassName('carousel-slide');
        const dots = document.getElementsByClassName('dot');
        if (slides.length === 0) return;

        if (typeof n === 'undefined' || n === null) n = currentSlide;
        if (n > slides.length) n = 1;
        if (n < 1) n = slides.length;
        currentSlide = n;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }

        slides[currentSlide - 1].classList.add('active');
        if (dots.length > 0) dots[currentSlide - 1].classList.add('active');
    }

    function changeSlide(n) {
        showSlide(currentSlide + n);
    }

    // exported for inline onclick attributes
    window.goToSlide = function (n) {
        showSlide(n);
    };

    // initialize carousel
    showSlide(currentSlide);

    // Expose changeSlide used by buttons
    window.changeSlide = changeSlide;

    // --- rest of initializations are below ---

    // Message reveal
    window.toggleReveal = function() {
        const hidden = document.getElementById('hidden-messages');
        if (!hidden) return;
        hidden.classList.toggle('hidden');
    };

    // Love note generator
    window.generateLoveNote = function() {
        const display = document.getElementById('love-note-display');
        if (!display) return;
        const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
        display.textContent = randomNote;
        // tiny flash animation
        display.classList.remove('flash');
        void display.offsetWidth;
        display.classList.add('flash');
    };

    // Pet name generator
    window.generatePetName = function() {
        const display = document.getElementById('pet-name-display');
        if (!display) return;
        const randomName = petNames[Math.floor(Math.random() * petNames.length)];
        display.textContent = randomName;
        display.classList.remove('flash');
        void display.offsetWidth;
        display.classList.add('flash');
    };

    // Gift box opener
    window.openGift = function() {
        const giftBox = document.getElementById('gift-box');
        const message = document.getElementById('gift-message');
        if (giftBox) giftBox.style.opacity = '0.6';
        if (message) {
            message.classList.remove('hidden');
        }
    };

    // Beat heart
    window.beatHeart = function() {
        const heart = document.getElementById('beating-heart');
        if (!heart) return;
        heart.style.animation = 'none';
        setTimeout(() => {
            heart.style.animation = 'beating 0.6s ease-out';
        }, 10);
    };

    // Heart game
    const HEART_GAME_DURATION = 20; // seconds
    let gameScore = 0;
    let gameActive = false;
    let heartGameTimeout;
    let heartGameTimerInterval;
    let heartSpawnInterval;
    let heartGameCountdown = HEART_GAME_DURATION;

    function updateHeartGameTimerDisplay(seconds) {
        const timerEl = document.getElementById('game-timer');
        if (!timerEl) return;
        const clamped = Math.max(0, seconds);
        const minutes = Math.floor(clamped / 60);
        const secs = clamped % 60;
        timerEl.textContent = `Time left: ${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function endHeartGame(endedByTimer = false) {
        if (!gameActive) return;
        gameActive = false;
        if (heartSpawnInterval) {
            clearInterval(heartSpawnInterval);
            heartSpawnInterval = null;
        }
        if (heartGameTimerInterval) {
            clearInterval(heartGameTimerInterval);
            heartGameTimerInterval = null;
        }
        if (heartGameTimeout) {
            clearTimeout(heartGameTimeout);
            heartGameTimeout = null;
        }
        updateHeartGameTimerDisplay(0);
        const gameArea = document.getElementById('game-area');
        if (gameArea) gameArea.innerHTML = '';
        showHeartGameResult(endedByTimer);
    }

    window.startHeartGame = function() {
        gameActive = false;
        if (heartSpawnInterval) {
            clearInterval(heartSpawnInterval);
            heartSpawnInterval = null;
        }
        if (heartGameTimerInterval) {
            clearInterval(heartGameTimerInterval);
            heartGameTimerInterval = null;
        }
        if (heartGameTimeout) {
            clearTimeout(heartGameTimeout);
            heartGameTimeout = null;
        }
        gameScore = 0;
        gameActive = true;
        heartGameCountdown = HEART_GAME_DURATION;
        const scoreEl = document.getElementById('game-score');
        if (scoreEl) scoreEl.textContent = 'Score: 0';
        const resultEl = document.getElementById('game-result');
        if (resultEl) {
            resultEl.textContent = 'Catch as many hearts as you can!';
            resultEl.classList.remove('flash');
        }
        updateHeartGameTimerDisplay(heartGameCountdown);
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;
        gameArea.innerHTML = '';
        
        heartSpawnInterval = setInterval(() => {
            if (!gameActive) return;
            if (Math.random() > 0.3) {
                const heart = document.createElement('div');
                heart.className = 'heart-to-catch';
                heart.textContent = '💗';
                const x = Math.random() * (gameArea.offsetWidth - 40);
                const y = Math.random() * (gameArea.offsetHeight - 40);
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                heart.onclick = (e) => {
                    e.stopPropagation();
                    gameScore++;
                    const s = document.getElementById('game-score');
                    if (s) s.textContent = 'Score: ' + gameScore;
                    heart.remove();
                };
                gameArea.appendChild(heart);
                setTimeout(() => { if (heart.parentNode) heart.remove(); }, 3000);
            }
        }, 500);
        heartGameTimerInterval = setInterval(() => {
            heartGameCountdown--;
            updateHeartGameTimerDisplay(heartGameCountdown);
            if (heartGameCountdown <= 0) {
                endHeartGame(true);
            }
        }, 1000);
        heartGameTimeout = setTimeout(() => endHeartGame(true), HEART_GAME_DURATION * 1000);
    };

    function showHeartGameResult(endedByTimer = false) {
        const resultEl = document.getElementById('game-result');
        if (!resultEl) return;
        let reaction;
        if (gameScore >= 25) {
            reaction = "Bhumi, you're scooping hearts faster than I fall for you.";
        } else if (gameScore >= 15) {
            reaction = "Princess, you're basically speed-running my love.";
        } else if (gameScore >= 8) {
            reaction = "Baby, each heart you caught felt like a hug from you.";
        } else {
            reaction = "Even one heart is perfect when it lands with you and me.";
        }
        const prefix = endedByTimer ? "Time's up! Game ended. " : '';
        resultEl.textContent = `${prefix}You caught ${gameScore} hearts — ${reaction}`;
        resultEl.classList.remove('flash');
        void resultEl.offsetWidth;
        resultEl.classList.add('flash');
    }

    // Floating hearts for hover and interactions
    let lastHoverHeart = 0;
    const HOVER_HEART_DELAY = 120;

    document.addEventListener('pointermove', (e) => {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        const now = Date.now();
        if (now - lastHoverHeart < HOVER_HEART_DELAY) return;
        lastHoverHeart = now;
        createFloatingHeart(e.clientX, e.clientY);
    });

    document.addEventListener('click', (e) => {
        createHeartBurst(e.clientX, e.clientY);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
    });

    function createHeartBurst(x, y) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFloatingHeart(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40);
            }, i * 60);
        }
    }

    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-particle';
        heart.textContent = '💕';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        const container = document.getElementById('floating-hearts');
        if (!container) return;
        container.appendChild(heart);
        const duration = 2000;
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            if (progress < 1) {
                heart.style.transform = `translateY(-${progress * 100}px) scale(${1 - progress * 0.5})`;
                heart.style.opacity = 1 - progress;
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        animate();
    }

    // Flip reason cards (toggle .flipped)
    const reasonCards = document.querySelectorAll('.reason-card');

    // Confetti spray every 10-20 seconds
    const CONFETTI_COLORS = ['#FF4D8D', '#FFD166', '#A7F3D0', '#9B5DE5', '#4FACFE', '#FEE440'];
    const CONFETTI_MESSAGES = ['I love you princess', 'I love you Bhumi', 'I love you baby'];

    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    function sprayConfetti() {
        const container = document.getElementById('floating-hearts');
        if (!container) return;
        const pieces = 25 + Math.floor(Math.random() * 15);
        for (let i = 0; i < pieces; i++) {
            setTimeout(() => {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                const directionRoll = Math.random();
                if (directionRoll < 0.6) {
                    // From top
                    piece.style.left = Math.random() * window.innerWidth + 'px';
                    piece.style.top = '-30px';
                    piece.style.setProperty('--confetti-dx', `${randomBetween(-5, 5)}vw`);
                    piece.style.setProperty('--confetti-dy', `${randomBetween(90, 130)}vh`);
                } else if (directionRoll < 0.8) {
                    // From left edge
                    piece.style.left = '-30px';
                    piece.style.top = Math.random() * window.innerHeight + 'px';
                    piece.style.setProperty('--confetti-dx', `${randomBetween(90, 140)}vw`);
                    piece.style.setProperty('--confetti-dy', `${randomBetween(-20, 40)}vh`);
                } else {
                    // From right edge
                    piece.style.left = window.innerWidth + 30 + 'px';
                    piece.style.top = Math.random() * window.innerHeight + 'px';
                    piece.style.setProperty('--confetti-dx', `${randomBetween(-140, -90)}vw`);
                    piece.style.setProperty('--confetti-dy', `${randomBetween(-20, 40)}vh`);
                }
                const useText = Math.random() < 0.3;
                if (useText) {
                    piece.classList.add('confetti-text');
                    piece.textContent = CONFETTI_MESSAGES[Math.floor(Math.random() * CONFETTI_MESSAGES.length)];
                } else {
                    const size = 6 + Math.random() * 6;
                    piece.style.width = size + 'px';
                    piece.style.height = size * 1.6 + 'px';
                    piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
                }
                piece.style.animationDuration = 2.5 + Math.random() * 1 + 's';
                container.appendChild(piece);
                setTimeout(() => piece.remove(), 4000);
            }, i * 50);
        }
    }

    function scheduleConfetti() {
        const delay = 5000 + Math.random() * 5000;
        setTimeout(() => {
            sprayConfetti();
            scheduleConfetti();
        }, delay);
    }

    scheduleConfetti();
    const toggleCardState = (card) => {
        const flipped = card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    };

    reasonCards.forEach(card => {
        card.addEventListener('click', () => toggleCardState(card));
        card.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                toggleCardState(card);
            }
        });
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', card.classList.contains('flipped') ? 'true' : 'false');
    });

    // Open-when cards (accessible flip on click/keyboard)
    const openCards = document.querySelectorAll('.open-card');
    const toggleOpenCard = (card) => {
        const flipped = card.classList.toggle('flipped');
        card.setAttribute('aria-expanded', flipped ? 'true' : 'false');
    };

    openCards.forEach(card => {
        card.addEventListener('click', () => toggleOpenCard(card));
        card.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                toggleOpenCard(card);
            }
        });
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', card.classList.contains('flipped') ? 'true' : 'false');
    });

    // Missing you timer
    const MEET_DATE = new Date('2025-10-18T00:00:00');
    const dayEl = document.getElementById('time-days');
    const hourEl = document.getElementById('time-hours');
    const minuteEl = document.getElementById('time-minutes');
    const secondEl = document.getElementById('time-seconds');

    function updateMissingTimer() {
        if (!dayEl || !hourEl || !minuteEl || !secondEl) return;
        const now = new Date();
        let diff = now - MEET_DATE;
        if (diff < 0) diff = 0;
        const dayMs = 24 * 60 * 60 * 1000;
        const hourMs = 60 * 60 * 1000;
        const minuteMs = 60 * 1000;
        const secondMs = 1000;
        const days = Math.floor(diff / dayMs);
        diff -= days * dayMs;
        const hours = Math.floor(diff / hourMs);
        diff -= hours * hourMs;
        const minutes = Math.floor(diff / minuteMs);
        diff -= minutes * minuteMs;
        const seconds = Math.floor(diff / secondMs);
        dayEl.textContent = days.toString();
        hourEl.textContent = hours.toString().padStart(2, '0');
        minuteEl.textContent = minutes.toString().padStart(2, '0');
        secondEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateMissingTimer();
    setInterval(updateMissingTimer, 1000);

});

// (All runtime behavior moved inside DOMContentLoaded above)
