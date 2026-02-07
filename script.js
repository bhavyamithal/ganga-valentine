/**
 * ========================================
 * GANGA'S VALENTINE
 * Cute, Interactive & Full of Delight
 * ========================================
 */

// Personalization
const PERSONALIZATION = {
    name: "Ganga",
    heading: "Ganga, Will You Be My Valentine?",
    subtext: "I've been waiting for the perfect moment...",
    noMessages: [
        "Are you sure? 🥺",
        "Think again! 💭",
        "Really? 😢",
        "But why? 😿",
        "Puppy is sad 🐾",
        "Try the other one! 💕",
        "Pretty please? 🥺",
        "Don't break my heart 💔"
    ],
    valentineDate: new Date(new Date().getFullYear(), 1, 14),
    whatsappNumber: "919759133629", // Add your number here with country code (e.g., "919876543210")
    whatsappMessage: "I said YES! 💕 Can't wait for Valentine's Day!"
};

if (PERSONALIZATION.valentineDate < new Date()) {
    PERSONALIZATION.valentineDate = new Date(new Date().getFullYear() + 1, 1, 14);
}

// State
const state = {
    noAttempts: 0,
    hasClickedYes: false,
    lastInteraction: Date.now(),
    easterEggShown: false
};

// DOM Elements
const elements = {
    headingText: document.getElementById('heading-text'),
    cursorBlink: document.querySelector('.cursor-blink'),
    subtext: document.getElementById('subtext'),
    shitzuDog: document.getElementById('shitzu-dog'),
    thoughtBubble: document.getElementById('thought-bubble'),
    yesBtn: document.getElementById('btn-yes'),
    noBtn: document.getElementById('btn-no'),
    noBtnWrapper: document.getElementById('btn-no-wrapper'),
    questionSection: document.getElementById('question-section'),
    successSection: document.getElementById('success-section'),
    finalSection: document.getElementById('final-section'),
    escalationMsg: document.getElementById('escalation-message'),
    easterEgg: document.getElementById('easter-egg'),
    cursorHearts: document.getElementById('cursor-hearts'),
    petalsContainer: document.getElementById('petals-container'),
    particleCanvas: document.getElementById('particle-canvas'),
    whatsappBtn: document.getElementById('btn-whatsapp'),
    notifyBtn: document.getElementById('btn-notify'),
    countdown: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    }
};

// Detect mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

/**
 * ========================================
 * INITIALIZATION
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initCursorHearts();
    initTouchHearts();
    initParticles();
    initPetals();
    initShitzu();
    initShitzuInteractions();
    initButtons();
    initWhatsApp();
    initNotifications();
    initShakeToReset();
    initCountdown();
    initEasterEgg();
    initCardParallax();

    // Mobile optimizations
    if (isMobile) {
        optimizeForMobile();
    }
});

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
            setTimeout(type, 80 + Math.random() * 50);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                elements.cursorBlink.style.display = 'none';
            }, 1000);
        }
    }

    setTimeout(type, 500);
}

/**
 * ========================================
 * CURSOR HEARTS TRAIL
 * ========================================
 */

function initCursorHearts() {
    let lastHeart = 0;
    const hearts = ['💕', '💖', '💗', '💓', '💝'];

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastHeart < 100) return; // Throttle

        lastHeart = now;

        const heart = document.createElement('span');
        heart.className = 'cursor-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = (Math.random() * 10 + 10) + 'px';

        elements.cursorHearts.appendChild(heart);

        setTimeout(() => heart.remove(), 1200);
    });
}

/**
 * ========================================
 * PARTICLE BACKGROUND
 * ========================================
 */

function initParticles() {
    const canvas = elements.particleCanvas;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    // Animation loop
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

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 105, 180, ${0.1 * (1 - dist / 100)})`;
                    ctx.stroke();
                }
            });
        });

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
        petal.style.opacity = Math.random() * 0.5 + 0.3;

        elements.petalsContainer.appendChild(petal);

        // Animate with GSAP if available, otherwise CSS
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
            // Fallback CSS animation
            petal.style.transition = `transform ${duration}s linear`;
            setTimeout(() => {
                petal.style.transform = `translate(${xMovement}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`;
            }, 10);
            setTimeout(() => petal.remove(), duration * 1000);
        }
    }

    setInterval(createPetal, 600);
}

/**
 * ========================================
 * INTERACTIVE SHITZU DOG
 * ========================================
 */

function initShitzu() {
    const dog = elements.shitzuDog;

    // Idle animations
    setInterval(() => blinkEyes(), 4000);

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
        if (!state.hasClickedYes && Math.random() > 0.7) {
            elements.thoughtBubble.classList.add('visible');
            setTimeout(() => {
                elements.thoughtBubble.classList.remove('visible');
            }, 3000);
        }
    }, 8000);
}

function setDogMood(mood) {
    const dog = elements.shitzuDog;
    const eyes = dog.querySelector('.eyes');
    const happyEyes = dog.querySelector('.happy-eyes');
    const shockedEyes = dog.querySelector('.shocked-eyes');
    const mouth = dog.querySelector('.mouth-group');
    const happyMouth = dog.querySelector('.happy-mouth');

    // Reset
    dog.classList.remove('happy', 'shocked', 'celebrating');
    eyes.style.display = 'none';
    happyEyes.style.display = 'none';
    shockedEyes.style.display = 'none';
    mouth.style.display = 'none';
    happyMouth.style.display = 'none';

    switch(mood) {
        case 'happy':
            dog.classList.add('happy');
            happyEyes.style.display = 'block';
            happyMouth.style.display = 'block';
            elements.thoughtBubble.querySelector('p').textContent = "Yay! 💕";
            elements.thoughtBubble.classList.add('visible');
            setTimeout(() => elements.thoughtBubble.classList.remove('visible'), 2000);
            break;

        case 'shocked':
            dog.classList.add('shocked');
            shockedEyes.style.display = 'block';
            mouth.style.display = 'block';
            elements.thoughtBubble.querySelector('p').textContent = "Oh no! 😿";
            elements.thoughtBubble.classList.add('visible');
            setTimeout(() => elements.thoughtBubble.classList.remove('visible'), 2000);
            break;

        case 'celebrating':
            dog.classList.add('celebrating');
            happyEyes.style.display = 'block';
            happyMouth.style.display = 'block';
            elements.thoughtBubble.querySelector('p').textContent = "Best day ever! 🎉";
            elements.thoughtBubble.classList.add('visible');
            break;

        default: // normal
            eyes.style.display = 'block';
            mouth.style.display = 'block';
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
    elements.noBtn.addEventListener('click', handleNoHover);
    elements.noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleNoHover(e);
    });
}

function handleYesClick() {
    if (state.hasClickedYes) return;
    state.hasClickedYes = true;

    // Haptic feedback on YES
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50, 100, 200]);
    }

    setDogMood('celebrating');
    triggerConfetti();

    // Transition
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
                }
            });
        } else {
            elements.successSection.style.display = 'none';
            elements.finalSection.style.display = 'block';
        }
    }, 3000);
}

function handleNoHover(e) {
    e.preventDefault();

    state.noAttempts++;
    state.lastInteraction = Date.now();

    setDogMood('shocked');

    // Update button text
    const msgIndex = (state.noAttempts - 1) % PERSONALIZATION.noMessages.length;
    elements.noBtn.querySelector('.btn-text').textContent = PERSONALIZATION.noMessages[msgIndex];

    // SIZE ESCALATION: NO shrinks, YES grows
    const noScale = Math.max(0.6, 1 - state.noAttempts * 0.08); // Min 60% size
    const yesScale = Math.min(1.4, 1 + state.noAttempts * 0.08); // Max 140% size

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
    } else {
        elements.noBtn.style.transform = `scale(${noScale})`;
        elements.yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Slight movement for NO button
    const moveX = (Math.random() - 0.5) * 60;
    const moveY = (Math.random() - 0.5) * 40;

    if (typeof gsap !== 'undefined') {
        gsap.to(elements.noBtnWrapper, {
            x: moveX,
            y: moveY,
            rotation: (Math.random() - 0.5) * 15,
            duration: 0.3,
            ease: "power2.out"
        });
    } else {
        elements.noBtnWrapper.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${(Math.random() - 0.5) * 15}deg)`;
    }

    // Show escalation message after 3 attempts
    if (state.noAttempts === 3) {
        elements.escalationMsg.classList.add('visible');
    }
}

/**
 * ========================================
 * CONFETTI
 * ========================================
 */

function triggerConfetti() {
    if (typeof confetti !== 'undefined') {
        const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB'];

        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: colors
        });

        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 50,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 50,
                origin: { x: 1 },
                colors: colors
            });
        }, 200);
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
            elements.countdown.days.textContent = '00';
            elements.countdown.hours.textContent = '00';
            elements.countdown.minutes.textContent = '00';
            elements.countdown.seconds.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        elements.countdown.days.textContent = String(days).padStart(2, '0');
        elements.countdown.hours.textContent = String(hours).padStart(2, '0');
        elements.countdown.minutes.textContent = String(minutes).padStart(2, '0');
        elements.countdown.seconds.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/**
 * ========================================
 * EASTER EGG
 * ========================================
 */

function initEasterEgg() {
    // Track interaction
    document.addEventListener('mousemove', () => {
        state.lastInteraction = Date.now();
    });

    document.addEventListener('click', () => {
        state.lastInteraction = Date.now();
    });

    // Check for inactivity
    setInterval(() => {
        const inactive = Date.now() - state.lastInteraction;
        if (inactive > 10000 && !state.easterEggShown && !state.hasClickedYes) {
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
 * CARD PARALLAX
 * ========================================
 */

function initCardParallax() {
    const card = document.getElementById('valentine-card');

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return; // Disable on mobile

        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;

        if (typeof gsap !== 'undefined') {
            gsap.to(card, {
                rotationY: x,
                rotationX: -y,
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
}

/**
 * ========================================
 * TOUCH HEARTS - Tap anywhere to spawn
 * ========================================
 */

function initTouchHearts() {
    if (!isTouchDevice) return;

    const hearts = ['💕', '💖', '💗', '💓', '💝', '🌸', '✨'];

    document.addEventListener('touchstart', (e) => {
        // Don't spawn on buttons
        if (e.target.closest('.btn')) return;

        const touch = e.touches[0];
        spawnTouchHeart(touch.clientX, touch.clientY);

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });

    // Double tap = burst
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
            // Double tap detected
            const touch = e.changedTouches[0];
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    spawnTouchHeart(
                        touch.clientX + (Math.random() - 0.5) * 100,
                        touch.clientY + (Math.random() - 0.5) * 100
                    );
                }, i * 50);
            }

            if (navigator.vibrate) {
                navigator.vibrate([20, 30, 20]);
            }
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
 * SHITZU INTERACTIONS
 * ========================================
 */

function initShitzuInteractions() {
    const dog = elements.shitzuDog;
    let longPressTimer;
    let isLongPress = false;

    // Eye tracking
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
            spawnBark(e.clientX || e.touches?.[0]?.clientX || rect.left + rect.width/2,
                      e.clientY || e.touches?.[0]?.clientY || rect.top);

            // Ear wiggle
            dog.classList.add('wiggling');
            setTimeout(() => dog.classList.remove('wiggling'), 500);

            if (navigator.vibrate) {
                navigator.vibrate([30, 20, 30]);
            }
        }
    });

    // Long press to lick
    const startLongPress = () => {
        isLongPress = false;

        longPressTimer = setTimeout(() => {
            isLongPress = true;
            spawnLickAnimation();

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
        const barks = ['Woof! 🐕', 'Bark! 💕', 'Yap! 🎾', 'Arf! 🦴'];
        const bark = document.createElement('span');
        bark.className = 'bark-text';
        bark.textContent = barks[Math.floor(Math.random() * barks.length)];
        bark.style.left = x + 'px';
        bark.style.top = y + 'px';

        document.body.appendChild(bark);
        setTimeout(() => bark.remove(), 800);
    }

    function spawnLickAnimation() {
        // Create tongue lick effect
        const lick = document.createElement('div');
        lick.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #FF9999 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: lickGrow 1s ease-out forwards;
        `;
        document.body.appendChild(lick);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes lickGrow {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            lick.remove();
            style.remove();
        }, 1000);

        // Show love message
        elements.thoughtBubble.querySelector('p').textContent = "I love you! 😘";
        elements.thoughtBubble.classList.add('visible');
        setTimeout(() => elements.thoughtBubble.classList.remove('visible'), 2000);
    }

    // Sleep mode after inactivity
    let sleepTimer;
    const resetSleep = () => {
        clearTimeout(sleepTimer);
        dog.classList.remove('sleeping');

        sleepTimer = setTimeout(() => {
            if (!state.hasClickedYes) {
                dog.classList.add('sleeping');
            }
        }, 15000);
    };

    document.addEventListener('mousemove', resetSleep);
    document.addEventListener('touchstart', resetSleep);
    resetSleep();
}

/**
 * ========================================
 * WHATSAPP INTEGRATION
 * ========================================
 */

function initWhatsApp() {
    if (!elements.whatsappBtn) return;

    elements.whatsappBtn.addEventListener('click', () => {
        const message = encodeURIComponent(PERSONALIZATION.whatsappMessage);
        let url;

        if (PERSONALIZATION.whatsappNumber) {
            // Direct to your number
            url = `https://wa.me/${PERSONALIZATION.whatsappNumber}?text=${message}`;
        } else {
            // Open WhatsApp with message ready to share
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
 * NOTIFICATION REMINDER
 * ========================================
 */

function initNotifications() {
    if (!elements.notifyBtn) return;

    elements.notifyBtn.addEventListener('click', async () => {
        // Request permission
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                // Schedule notification for Valentine's Day morning
                const valentineDate = new Date(PERSONALIZATION.valentineDate);
                valentineDate.setHours(8, 0, 0, 0); // 8 AM

                const now = new Date();
                const timeUntil = valentineDate - now;

                if (timeUntil > 0) {
                    // Use setTimeout for demo (in production, use service worker)
                    setTimeout(() => {
                        new Notification("💕 Valentine's Day!", {
                            body: "Today's the day! Get ready for your special date!",
                            icon: "💕",
                            badge: "💕"
                        });
                    }, Math.min(timeUntil, 5000)); // Cap at 5 seconds for demo

                    elements.notifyBtn.innerHTML = "<span>✅ Reminder set!</span>";
                    elements.notifyBtn.style.background = "#25D366";
                }

                if (navigator.vibrate) {
                    navigator.vibrate([50, 100, 50]);
                }
            } else {
                alert("Please allow notifications to get a reminder!");
            }
        } else {
            alert("Your browser doesn't support notifications.");
        }
    });
}

/**
 * ========================================
 * SHAKE TO RESET
 * ========================================
 */

function initShakeToReset() {
    if (!isMobile) return;

    let lastX = 0, lastY = 0, lastZ = 0;
    let shakeThreshold = 15;
    let shakeTimeout;

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', (e) => {
            const acc = e.accelerationIncludingGravity;
            if (!acc) return;

            const deltaX = Math.abs(acc.x - lastX);
            const deltaY = Math.abs(acc.y - lastY);
            const deltaZ = Math.abs(acc.z - lastZ);

            if ((deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold)) {
                clearTimeout(shakeTimeout);

                shakeTimeout = setTimeout(() => {
                    // Reset NO button size
                    state.noAttempts = 0;

                    if (typeof gsap !== 'undefined') {
                        gsap.to(elements.noBtn, { scale: 1, duration: 0.5, ease: "back.out(1.7)" });
                        gsap.to(elements.yesBtn, { scale: 1, duration: 0.5, ease: "back.out(1.7)" });
                        gsap.to(elements.noBtnWrapper, { x: 0, y: 0, rotation: 0, duration: 0.5 });
                    } else {
                        elements.noBtn.style.transform = 'scale(1)';
                        elements.yesBtn.style.transform = 'scale(1)';
                        elements.noBtnWrapper.style.transform = '';
                    }

                    elements.noBtn.querySelector('.btn-text').textContent = 'No';
                    elements.escalationMsg.classList.remove('visible');

                    if (navigator.vibrate) {
                        navigator.vibrate([50, 30, 50, 30, 50]);
                    }

                    // Show reset message
                    const msg = document.createElement('div');
                    msg.textContent = 'Reset! 📳';
                    msg.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(255, 105, 180, 0.9);
                        color: white;
                        padding: 10px 20px;
                        border-radius: 20px;
                        font-weight: 600;
                        z-index: 10000;
                        animation: fadeInOut 1s ease forwards;
                    `;
                    document.body.appendChild(msg);
                    setTimeout(() => msg.remove(), 1000);
                }, 100);
            }

            lastX = acc.x;
            lastY = acc.y;
            lastZ = acc.z;
        });
    }
}

/**
 * ========================================
 * MOBILE OPTIMIZATIONS
 * ========================================
 */

function optimizeForMobile() {
    // Reduce particle count
    const canvas = elements.particleCanvas;
    if (canvas) {
        canvas.style.opacity = '0.5';
    }

    // Slower petal generation
    // (Already handled in initPetals with isTouchDevice check)

    // Prevent double-tap zoom
    document.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.target.click();
    }, { passive: false });

    // Add double tap hint
    const hint = document.createElement('div');
    hint.className = 'double-tap-hint';
    hint.textContent = '👆 Double tap anywhere for hearts!';
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 8000);
}
