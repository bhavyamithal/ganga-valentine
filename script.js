/**
 * ========================================
 * GANGA'S VALENTINE - PREMIUM EDITION
 * Professional-Grade Interactive Experience
 * ========================================
 */

// Personalization - Customize these!
const PERSONALIZATION = {
    name: "Ganga",
    heading: "Ganga, Will You Be My Valentine?",

    // Reasons why you love her - these will cycle through
    loveReasons: [
        "Your smile lights up my entire world",
        "Your laugh is my favorite sound",
        "You understand me like no one else",
        "Every day with you is an adventure",
        "I love how we can talk for hours",
        "You're my best friend and soulmate"
    ],

    // Messages when NO is clicked
    noMessages: [
        "Are you sure? 🥺",
        "Think again, please! 💭",
        "Really? My heart hurts 😢",
        "But... but why? 😿",
        "Look at the puppy! 🐾",
        "The puppy is getting sad...",
        "Pretty please? 🥺",
        "Don't break our hearts 💔",
        "I'll keep asking forever! 💕",
        "The button is scared now!",
        "Okay okay I give up... JK! 😜"
    ],

    // Love quotes for the final section
    loveQuotes: [
        { text: "In all the world, there is no heart for me like yours.", author: "Bhavya Mithal" },
        { text: "I have found the one whom my soul loves.", author: "Bhavya Mithal" },
        { text: "You are my today and all of my tomorrows.", author: "Bhavya Mithal" },
        { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Bhavya Mithal" },
        { text: "Whatever our souls are made of, his and mine are the same.", author: "Bhavya Mithal" }
    ],

    valentineDate: new Date(new Date().getFullYear(), 1, 14), // February 14th
    whatsappNumber: "919759133629", // Your number with country code
    whatsappMessage: "I said YES! 💕 Can't wait for Valentine's Day!"
};

// Adjust date if it's already passed
if (PERSONALIZATION.valentineDate < new Date()) {
    PERSONALIZATION.valentineDate = new Date(new Date().getFullYear() + 1, 1, 14);
}

// State Management
const state = {
    noAttempts: 0,
    hasClickedYes: false,
    lastInteraction: Date.now(),
    easterEggShown: false,
    loveLevel: 0,
    soundEnabled: false,
    envelopeOpened: false,
    currentReasonIndex: 0,
    konamiProgress: 0
};

// Konami Code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// DOM Elements
const elements = {};

// Detect device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Sound Effects (using Howler.js)
let sounds = {};

/**
 * ========================================
 * INITIALIZATION
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    cacheElements();

    // Initialize loading screen
    initLoadingScreen();
});

function cacheElements() {
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.envelopeContainer = document.getElementById('envelope-container');
    elements.envelope = document.getElementById('envelope');
    elements.mainContainer = document.getElementById('main-container');
    elements.headingText = document.getElementById('heading-text');
    elements.cursorBlink = document.querySelector('.cursor-blink');
    elements.loveReasons = document.getElementById('love-reasons');
    elements.loveReasonText = document.getElementById('love-reason-text');
    elements.shitzuDog = document.getElementById('shitzu-dog');
    elements.shitzuContainer = document.getElementById('shitzu-container');
    elements.thoughtBubble = document.getElementById('thought-bubble');
    elements.yesBtn = document.getElementById('btn-yes');
    elements.noBtn = document.getElementById('btn-no');
    elements.noBtnWrapper = document.getElementById('btn-no-wrapper');
    elements.buttonsArea = document.getElementById('buttons-area');
    elements.questionSection = document.getElementById('question-section');
    elements.successSection = document.getElementById('success-section');
    elements.finalSection = document.getElementById('final-section');
    elements.escalationMsg = document.getElementById('escalation-message');
    elements.surrenderMsg = document.getElementById('surrender-message');
    elements.easterEgg = document.getElementById('easter-egg');
    elements.cursorHearts = document.getElementById('cursor-hearts');
    elements.petalsContainer = document.getElementById('petals-container');
    elements.floatingHearts = document.getElementById('floating-hearts');
    elements.particleCanvas = document.getElementById('particle-canvas');
    elements.whatsappBtn = document.getElementById('btn-whatsapp');
    elements.soundToggle = document.getElementById('sound-toggle');
    elements.loveMeterFill = document.getElementById('love-meter-fill');
    elements.loveLevel = document.getElementById('love-level');
    elements.sparkles = document.getElementById('sparkles');
    elements.konamiReward = document.getElementById('konami-reward');
    elements.closeKonami = document.getElementById('btn-close-konami');
    elements.loveQuote = document.getElementById('love-quote');
    elements.fabSurprise = document.getElementById('fab-surprise');
    elements.countdown = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
}

function initLoadingScreen() {
    // Simulate loading
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
        initEnvelope();
        initSounds();
    }, 2000);
}

/**
 * ========================================
 * ENVELOPE INTRO
 * ========================================
 */

function initEnvelope() {
    // Spawn floating hearts around envelope
    spawnEnvelopeHearts();

    // Click to open envelope
    elements.envelope.addEventListener('click', openEnvelope);
    elements.envelope.addEventListener('touchend', (e) => {
        e.preventDefault();
        openEnvelope();
    });
}

function spawnEnvelopeHearts() {
    const container = document.getElementById('envelope-hearts');
    const hearts = ['💕', '💖', '💗', '💓', '💝'];

    setInterval(() => {
        if (state.envelopeOpened) return;

        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 15 + 10}px;
            opacity: 0;
            pointer-events: none;
            animation: envelopeHeartPop 2s ease forwards;
        `;
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }, 500);

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes envelopeHeartPop {
            0% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 0.8; transform: scale(1) rotate(10deg); }
            100% { opacity: 0; transform: scale(0.5) rotate(20deg) translateY(-30px); }
        }
    `;
    document.head.appendChild(style);
}

function openEnvelope() {
    if (state.envelopeOpened) return;
    state.envelopeOpened = true;

    playSound('whoosh');

    elements.envelope.classList.add('opened');

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }

    // Transition to main content after animation
    setTimeout(() => {
        elements.envelopeContainer.classList.add('hidden');
        elements.mainContainer.style.display = 'flex';

        // Initialize main experience
        initMainExperience();
    }, 2500);
}

/**
 * ========================================
 * MAIN EXPERIENCE INITIALIZATION
 * ========================================
 */

function initMainExperience() {
    initTypewriter();
    initLoveReasons();
    initCursorHearts();
    initTouchHearts();
    initParticles();
    initPetals();
    initFloatingHearts();
    initSparkles();
    initShitzu();
    initShitzuInteractions();
    initButtons();
    initWhatsApp();
    initCountdown();
    initEasterEgg();
    initCardParallax();
    initKonamiCode();
    initSoundToggle();
    initLoveQuotes();

    // Initial love meter
    updateLoveMeter(10);

    // Mobile optimizations
    if (isMobile) {
        optimizeForMobile();
    }
}

/**
 * ========================================
 * SOUND EFFECTS
 * ========================================
 */

function initSounds() {
    if (typeof Howl === 'undefined') return;

    // Using embedded base64 sounds or CDN links would go here
    // For now, we'll create placeholder sound objects
    sounds = {
        pop: createSilentSound(),
        whoosh: createSilentSound(),
        success: createSilentSound(),
        heartbeat: createSilentSound(),
        bark: createSilentSound()
    };
}

function createSilentSound() {
    // Placeholder for actual sound implementation
    return {
        play: () => {},
        stop: () => {}
    };
}

function playSound(name) {
    if (!state.soundEnabled || !sounds[name]) return;
    try {
        sounds[name].play();
    } catch (e) {
        // Ignore sound errors
    }
}

function initSoundToggle() {
    if (!elements.soundToggle) return;

    elements.soundToggle.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;

        const soundOn = elements.soundToggle.querySelector('.sound-on');
        const soundOff = elements.soundToggle.querySelector('.sound-off');

        if (state.soundEnabled) {
            soundOn.style.display = 'block';
            soundOff.style.display = 'none';
            playSound('pop');
        } else {
            soundOn.style.display = 'none';
            soundOff.style.display = 'block';
        }

        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    });
}

/**
 * ========================================
 * TYPEWRITER EFFECT
 * ========================================
 */

function initTypewriter() {
    const text = PERSONALIZATION.heading;
    let i = 0;

    function type() {
        if (i < text.length) {
            elements.headingText.textContent += text.charAt(i);
            i++;

            // Increase love meter slightly with each character
            if (i % 5 === 0) {
                updateLoveMeter(state.loveLevel + 1);
            }

            setTimeout(type, 70 + Math.random() * 40);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                if (elements.cursorBlink) {
                    elements.cursorBlink.style.display = 'none';
                }
            }, 1000);
        }
    }

    setTimeout(type, 300);
}

/**
 * ========================================
 * LOVE REASONS CAROUSEL
 * ========================================
 */

function initLoveReasons() {
    if (!elements.loveReasonText) return;

    function showNextReason() {
        const reason = PERSONALIZATION.loveReasons[state.currentReasonIndex];

        // Fade out
        if (typeof gsap !== 'undefined') {
            gsap.to(elements.loveReasonText, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: () => {
                    elements.loveReasonText.textContent = reason;
                    gsap.to(elements.loveReasonText, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                }
            });
        } else {
            elements.loveReasonText.textContent = reason;
        }

        state.currentReasonIndex = (state.currentReasonIndex + 1) % PERSONALIZATION.loveReasons.length;
    }

    // Show first reason after delay
    setTimeout(() => {
        showNextReason();
        setInterval(showNextReason, 4000);
    }, 2000);
}

/**
 * ========================================
 * LOVE METER
 * ========================================
 */

function updateLoveMeter(level) {
    state.loveLevel = Math.min(100, Math.max(0, level));

    if (elements.loveMeterFill) {
        elements.loveMeterFill.style.width = state.loveLevel + '%';
    }
    if (elements.loveLevel) {
        elements.loveLevel.textContent = state.loveLevel;
    }
}

/**
 * ========================================
 * CURSOR HEARTS TRAIL
 * ========================================
 */

function initCursorHearts() {
    if (isTouchDevice) return;

    let lastHeart = 0;
    const hearts = ['💕', '💖', '💗', '💓', '💝', '✨'];

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastHeart < 80) return;

        lastHeart = now;

        const heart = document.createElement('span');
        heart.className = 'cursor-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = (Math.random() * 8 + 10) + 'px';

        elements.cursorHearts.appendChild(heart);

        setTimeout(() => heart.remove(), 1200);
    });
}

/**
 * ========================================
 * TOUCH HEARTS
 * ========================================
 */

function initTouchHearts() {
    if (!isTouchDevice) return;

    const hearts = ['💕', '💖', '💗', '💓', '💝', '🌸', '✨'];
    let lastTap = 0;

    document.addEventListener('touchstart', (e) => {
        if (e.target.closest('.btn') || e.target.closest('.envelope')) return;

        const touch = e.touches[0];
        spawnTouchHeart(touch.clientX, touch.clientY);

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }

        // Increase love meter
        updateLoveMeter(state.loveLevel + 1);
    });

    // Double tap burst
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
            const touch = e.changedTouches[0];
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    spawnTouchHeart(
                        touch.clientX + (Math.random() - 0.5) * 120,
                        touch.clientY + (Math.random() - 0.5) * 120
                    );
                }, i * 40);
            }

            if (navigator.vibrate) {
                navigator.vibrate([20, 30, 20]);
            }

            updateLoveMeter(state.loveLevel + 5);
        }
        lastTap = now;
    });

    function spawnTouchHeart(x, y) {
        const heart = document.createElement('span');
        heart.className = 'touch-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
}

/**
 * ========================================
 * PARTICLE BACKGROUND
 * ========================================
 */

function initParticles() {
    const canvas = elements.particleCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles = [];
    const particleCount = isMobile ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.4 + 0.2
        });
    }

    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 105, 180, ${p.opacity})`;
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });

        // Draw connections
        if (!isMobile) {
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 105, 180, ${0.08 * (1 - dist / 120)})`;
                        ctx.stroke();
                    }
                });
            });
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

/**
 * ========================================
 * FLOATING PETALS
 * ========================================
 */

function initPetals() {
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * window.innerWidth + 'px';
        petal.style.top = '-20px';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        petal.style.opacity = Math.random() * 0.4 + 0.3;
        petal.style.width = (Math.random() * 8 + 10) + 'px';
        petal.style.height = petal.style.width;

        elements.petalsContainer.appendChild(petal);

        const duration = Math.random() * 5 + 8;
        const xMovement = (Math.random() - 0.5) * 200;

        if (typeof gsap !== 'undefined') {
            gsap.to(petal, {
                y: window.innerHeight + 50,
                x: xMovement,
                rotation: Math.random() * 720,
                duration: duration,
                ease: "none",
                onComplete: () => petal.remove()
            });
        } else {
            petal.style.transition = `transform ${duration}s linear`;
            setTimeout(() => {
                petal.style.transform = `translate(${xMovement}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`;
            }, 10);
            setTimeout(() => petal.remove(), duration * 1000);
        }
    }

    setInterval(createPetal, isMobile ? 800 : 500);
}

/**
 * ========================================
 * FLOATING HEARTS BACKGROUND
 * ========================================
 */

function initFloatingHearts() {
    if (!elements.floatingHearts) return;

    const hearts = ['💕', '💖', '💗', '💓'];

    function createFloatingHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 10 + 12) + 'px';

        elements.floatingHearts.appendChild(heart);

        setTimeout(() => heart.remove(), 15000);
    }

    // Initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 1000);
    }

    setInterval(createFloatingHeart, 3000);
}

/**
 * ========================================
 * SPARKLES EFFECT
 * ========================================
 */

function initSparkles() {
    if (!elements.sparkles) return;

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';

        elements.sparkles.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 4000);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(createSparkle, i * 300);
    }

    setInterval(createSparkle, 500);
}

/**
 * ========================================
 * INTERACTIVE SHITZU DOG
 * ========================================
 */

function initShitzu() {
    const dog = elements.shitzuDog;
    if (!dog) return;

    // Idle blink
    setInterval(() => blinkEyes(), 3500);

    function blinkEyes() {
        const eyes = dog.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.transform = 'scaleY(0.1)';
            setTimeout(() => {
                eye.style.transform = 'scaleY(1)';
            }, 150);
        });
    }

    // Show thought bubble occasionally
    setInterval(() => {
        if (!state.hasClickedYes && Math.random() > 0.6) {
            showThought("Pick YES! 🐾");
        }
    }, 6000);
}

function showThought(text) {
    if (!elements.thoughtBubble) return;

    elements.thoughtBubble.querySelector('p').textContent = text;
    elements.thoughtBubble.classList.add('visible');
    setTimeout(() => {
        elements.thoughtBubble.classList.remove('visible');
    }, 3000);
}

function setDogMood(mood) {
    const dog = elements.shitzuDog;
    if (!dog) return;

    const eyes = dog.querySelector('.eyes');
    const happyEyes = dog.querySelector('.happy-eyes');
    const shockedEyes = dog.querySelector('.shocked-eyes');
    const pleadingEyes = dog.querySelector('.pleading-eyes');
    const mouth = dog.querySelector('.mouth-group');
    const happyMouth = dog.querySelector('.happy-mouth');
    const sadMouth = dog.querySelector('.sad-mouth');

    // Reset all
    dog.classList.remove('happy', 'shocked', 'celebrating', 'sad');
    [eyes, happyEyes, shockedEyes, pleadingEyes].forEach(el => {
        if (el) el.style.display = 'none';
    });
    [mouth, happyMouth, sadMouth].forEach(el => {
        if (el) el.style.display = 'none';
    });

    switch(mood) {
        case 'happy':
            dog.classList.add('happy');
            if (happyEyes) happyEyes.style.display = 'block';
            if (happyMouth) happyMouth.style.display = 'block';
            showThought("Yay! 💕");
            break;

        case 'shocked':
            dog.classList.add('shocked');
            if (shockedEyes) shockedEyes.style.display = 'block';
            if (mouth) mouth.style.display = 'block';
            showThought("Oh no! 😿");
            break;

        case 'sad':
            dog.classList.add('sad');
            if (pleadingEyes) pleadingEyes.style.display = 'block';
            if (sadMouth) sadMouth.style.display = 'block';
            showThought("Please? 🥺");
            break;

        case 'celebrating':
            dog.classList.add('celebrating');
            if (happyEyes) happyEyes.style.display = 'block';
            if (happyMouth) happyMouth.style.display = 'block';
            showThought("BEST DAY EVER! 🎉");
            break;

        default:
            if (eyes) eyes.style.display = 'block';
            if (mouth) mouth.style.display = 'block';
    }
}

/**
 * ========================================
 * SHITZU INTERACTIONS
 * ========================================
 */

function initShitzuInteractions() {
    const dog = elements.shitzuDog;
    if (!dog) return;

    let longPressTimer;
    let isLongPress = false;

    // Eye tracking on desktop
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            const rect = dog.getBoundingClientRect();
            const dogCenterX = rect.left + rect.width / 2;
            const dogCenterY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - dogCenterY, e.clientX - dogCenterX);
            const distance = Math.min(3, Math.hypot(e.clientX - dogCenterX, e.clientY - dogCenterY) / 50);

            const eyes = dog.querySelectorAll('.eye');
            eyes.forEach(eye => {
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;
                eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }

    // Click to bark
    dog.addEventListener('click', (e) => {
        if (!isLongPress) {
            const rect = dog.getBoundingClientRect();
            spawnBark(rect.left + rect.width / 2, rect.top);
            playSound('bark');
            updateLoveMeter(state.loveLevel + 2);

            if (navigator.vibrate) {
                navigator.vibrate([30, 20, 30]);
            }
        }
    });

    // Long press
    const startLongPress = () => {
        isLongPress = false;
        longPressTimer = setTimeout(() => {
            isLongPress = true;
            showThought("I love you! 😘");
            updateLoveMeter(state.loveLevel + 10);

            if (navigator.vibrate) {
                navigator.vibrate([50, 50, 50, 50, 100]);
            }
        }, 800);
    };

    const cancelLongPress = () => {
        clearTimeout(longPressTimer);
    };

    dog.addEventListener('mousedown', startLongPress);
    dog.addEventListener('touchstart', startLongPress);
    dog.addEventListener('mouseup', cancelLongPress);
    dog.addEventListener('mouseleave', cancelLongPress);
    dog.addEventListener('touchend', cancelLongPress);

    function spawnBark(x, y) {
        const barks = ['Woof! 🐕', 'Bark! 💕', 'Yap! 🎾', 'Arf! 🦴', 'Pick YES! 💖'];
        const bark = document.createElement('span');
        bark.className = 'bark-text';
        bark.textContent = barks[Math.floor(Math.random() * barks.length)];
        bark.style.left = x + 'px';
        bark.style.top = y + 'px';

        document.body.appendChild(bark);
        setTimeout(() => bark.remove(), 800);
    }
}

/**
 * ========================================
 * BUTTONS
 * ========================================
 */

function initButtons() {
    // YES button
    elements.yesBtn.addEventListener('mouseenter', () => {
        if (!state.hasClickedYes) setDogMood('happy');
    });

    elements.yesBtn.addEventListener('mouseleave', () => {
        if (!state.hasClickedYes) setDogMood('normal');
    });

    elements.yesBtn.addEventListener('click', handleYesClick);

    // NO button
    elements.noBtn.addEventListener('mouseenter', handleNoHover);
    elements.noBtn.addEventListener('click', handleNoClick);
    elements.noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleNoClick(e);
    });
}

function handleYesClick() {
    if (state.hasClickedYes) return;
    state.hasClickedYes = true;

    playSound('success');

    // Max love meter
    updateLoveMeter(100);

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50, 100, 200]);
    }

    setDogMood('celebrating');
    triggerMassiveConfetti();

    // Transition to success
    if (typeof gsap !== 'undefined') {
        gsap.to(elements.questionSection, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            onComplete: () => {
                elements.questionSection.style.display = 'none';
                elements.successSection.style.display = 'block';
                gsap.fromTo(elements.successSection,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
                );

                // Create heart burst
                createHeartBurst();
            }
        });
    } else {
        elements.questionSection.style.display = 'none';
        elements.successSection.style.display = 'block';
    }

    // Show final section after delay
    setTimeout(() => {
        if (typeof gsap !== 'undefined') {
            gsap.to(elements.successSection, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    elements.successSection.style.display = 'none';
                    elements.finalSection.style.display = 'block';
                    gsap.fromTo(elements.finalSection,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.6 }
                    );

                    // Show surprise button
                    if (elements.fabSurprise) {
                        elements.fabSurprise.style.display = 'flex';
                    }
                }
            });
        } else {
            elements.successSection.style.display = 'none';
            elements.finalSection.style.display = 'block';
        }
    }, 4000);
}

function handleNoHover() {
    if (state.noAttempts > 0) {
        setDogMood('sad');
    }
}

function handleNoClick(e) {
    if (e) e.preventDefault();

    state.noAttempts++;
    state.lastInteraction = Date.now();

    // Increase love meter slightly (ironic)
    updateLoveMeter(state.loveLevel + 2);

    // Different reactions based on attempt count
    if (state.noAttempts <= 3) {
        setDogMood('shocked');
    } else {
        setDogMood('sad');
    }

    // Update button text
    const msgIndex = (state.noAttempts - 1) % PERSONALIZATION.noMessages.length;
    elements.noBtn.querySelector('.btn-text').textContent = PERSONALIZATION.noMessages[msgIndex];

    // Panic animation
    elements.noBtn.classList.add('shrinking');
    setTimeout(() => elements.noBtn.classList.remove('shrinking'), 500);

    // Scale changes - YES grows, NO shrinks and moves
    const noScale = Math.max(0.3, 1 - state.noAttempts * 0.1);
    const yesScale = Math.min(1.8, 1 + state.noAttempts * 0.12);

    if (typeof gsap !== 'undefined') {
        // Shrink NO button
        gsap.to(elements.noBtn, {
            scale: noScale,
            duration: 0.4,
            ease: "back.out(1.7)"
        });

        // Grow YES button
        gsap.to(elements.yesBtn, {
            scale: yesScale,
            duration: 0.4,
            ease: "back.out(1.7)"
        });

        // Move NO button around (running away!)
        const maxX = window.innerWidth > 480 ? 100 : 60;
        const maxY = window.innerWidth > 480 ? 60 : 40;
        const moveX = (Math.random() - 0.5) * maxX;
        const moveY = (Math.random() - 0.5) * maxY;

        gsap.to(elements.noBtnWrapper, {
            x: moveX,
            y: moveY,
            rotation: (Math.random() - 0.5) * 20,
            duration: 0.3,
            ease: "power2.out"
        });
    } else {
        elements.noBtn.style.transform = `scale(${noScale})`;
        elements.yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Show escalation message after 3 attempts
    if (state.noAttempts === 3) {
        elements.escalationMsg.classList.add('visible');
    }

    // NO button surrenders after 8 attempts
    if (state.noAttempts >= 8) {
        surrenderNoButton();
    }

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function surrenderNoButton() {
    if (typeof gsap !== 'undefined') {
        gsap.to(elements.noBtnWrapper, {
            opacity: 0,
            scale: 0,
            rotation: 360,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
                elements.noBtnWrapper.style.display = 'none';
                elements.escalationMsg.style.display = 'none';
                elements.surrenderMsg.style.display = 'block';
            }
        });

        // Make YES button even bigger
        gsap.to(elements.yesBtn, {
            scale: 2,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });
    } else {
        elements.noBtnWrapper.style.display = 'none';
        elements.surrenderMsg.style.display = 'block';
    }

    setDogMood('happy');
    showThought("Finally! 🎉");
}

/**
 * ========================================
 * CONFETTI
 * ========================================
 */

function triggerMassiveConfetti() {
    if (typeof confetti === 'undefined') return;

    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF85A2', '#FFD1DC'];

    // Initial burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors
    });

    // Side bursts
    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: colors
        });
    }, 200);

    // Continuous celebration
    let count = 0;
    const interval = setInterval(() => {
        confetti({
            particleCount: 30,
            angle: Math.random() * 360,
            spread: 60,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
            colors: colors
        });
        count++;
        if (count > 10) clearInterval(interval);
    }, 300);
}

function createHeartBurst() {
    const container = document.getElementById('hearts-burst');
    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                font-size: ${Math.random() * 20 + 15}px;
                animation: heartBurst 1.5s ease-out forwards;
                --tx: ${(Math.random() - 0.5) * 300}px;
                --ty: ${(Math.random() - 0.5) * 300}px;
                --r: ${Math.random() * 360}deg;
            `;
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }, i * 50);
    }

    // Add CSS animation if not exists
    if (!document.getElementById('heart-burst-style')) {
        const style = document.createElement('style');
        style.id = 'heart-burst-style';
        style.textContent = `
            @keyframes heartBurst {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--r)) scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * ========================================
 * COUNTDOWN
 * ========================================
 */

function initCountdown() {
    function update() {
        const now = new Date();
        const target = new Date(PERSONALIZATION.valentineDate);
        target.setHours(0, 0, 0, 0);

        const diff = target - now;

        if (diff <= 0) {
            Object.values(elements.countdown).forEach(el => {
                if (el) el.textContent = '00';
            });
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (elements.countdown.days) elements.countdown.days.textContent = String(days).padStart(2, '0');
        if (elements.countdown.hours) elements.countdown.hours.textContent = String(hours).padStart(2, '0');
        if (elements.countdown.minutes) elements.countdown.minutes.textContent = String(minutes).padStart(2, '0');
        if (elements.countdown.seconds) elements.countdown.seconds.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/**
 * ========================================
 * LOVE QUOTES
 * ========================================
 */

function initLoveQuotes() {
    if (!elements.loveQuote) return;

    // Show random quote
    const quote = PERSONALIZATION.loveQuotes[Math.floor(Math.random() * PERSONALIZATION.loveQuotes.length)];
    const quoteText = elements.loveQuote.querySelector('.quote-text');
    const quoteAuthor = elements.loveQuote.querySelector('.quote-author');

    if (quoteText) quoteText.textContent = `"${quote.text}"`;
    if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
}

/**
 * ========================================
 * WHATSAPP
 * ========================================
 */

function initWhatsApp() {
    if (!elements.whatsappBtn) return;

    elements.whatsappBtn.addEventListener('click', () => {
        const message = encodeURIComponent(PERSONALIZATION.whatsappMessage);
        let url;

        if (PERSONALIZATION.whatsappNumber) {
            url = `https://wa.me/${PERSONALIZATION.whatsappNumber}?text=${message}`;
        } else {
            url = `https://wa.me/?text=${message}`;
        }

        window.open(url, '_blank');

        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
    });
}

/**
 * ========================================
 * EASTER EGG
 * ========================================
 */

function initEasterEgg() {
    document.addEventListener('mousemove', () => {
        state.lastInteraction = Date.now();
    });

    document.addEventListener('click', () => {
        state.lastInteraction = Date.now();
    });

    setInterval(() => {
        const inactive = Date.now() - state.lastInteraction;
        if (inactive > 12000 && !state.easterEggShown && !state.hasClickedYes) {
            state.easterEggShown = true;
            elements.easterEgg.classList.add('visible');

            setTimeout(() => {
                elements.easterEgg.classList.remove('visible');
                state.easterEggShown = false;
            }, 5000);
        }
    }, 1000);
}

/**
 * ========================================
 * KONAMI CODE EASTER EGG
 * ========================================
 */

function initKonamiCode() {
    document.addEventListener('keydown', (e) => {
        if (KONAMI_CODE[state.konamiProgress] === e.key) {
            state.konamiProgress++;

            if (state.konamiProgress === KONAMI_CODE.length) {
                triggerKonamiReward();
                state.konamiProgress = 0;
            }
        } else {
            state.konamiProgress = 0;
        }
    });

    // Close konami modal
    if (elements.closeKonami) {
        elements.closeKonami.addEventListener('click', () => {
            elements.konamiReward.style.display = 'none';
        });
    }
}

function triggerKonamiReward() {
    if (!elements.konamiReward) return;

    elements.konamiReward.style.display = 'flex';
    triggerMassiveConfetti();

    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }

    updateLoveMeter(100);
}

/**
 * ========================================
 * CARD PARALLAX
 * ========================================
 */

function initCardParallax() {
    const card = document.getElementById('valentine-card');
    if (!card || isMobile) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;

        if (typeof gsap !== 'undefined') {
            gsap.to(card, {
                rotationY: x,
                rotationX: -y,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
}

/**
 * ========================================
 * MOBILE OPTIMIZATIONS
 * ========================================
 */

function optimizeForMobile() {
    // Reduce particle opacity
    if (elements.particleCanvas) {
        elements.particleCanvas.style.opacity = '0.4';
    }

    // Prevent double-tap zoom
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd < 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // Add double tap hint
    const hint = document.createElement('div');
    hint.className = 'double-tap-hint';
    hint.textContent = 'Double tap anywhere for hearts!';
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 9000);
}

let lastTouchEnd = 0;

/**
 * ========================================
 * INITIALIZATION COMPLETE
 * ========================================
 */

console.log('💕 Ganga\'s Valentine - Made with love 💕');
console.log('Hint: Try the Konami Code! ↑↑↓↓←→←→BA');
