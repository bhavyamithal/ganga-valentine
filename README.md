# Ganga's Valentine 💕

An interactive, animated Valentine's Day proposal web experience featuring a cute Shih Tzu companion, playful interactions, and delightful visual effects.

---

## Overview

**Ganga's Valentine** is a single-page web application designed as a creative and interactive way to ask someone to be your Valentine. The experience features an escalating interaction pattern where the "No" button becomes increasingly difficult to click while the "Yes" button grows larger, creating a playful and memorable proposal experience.

---

## Intent & Purpose

This project was created as a personalized Valentine's Day surprise for someone named **Ganga**. The intent is to:

1. **Create a memorable moment** - Go beyond a simple text message with an interactive digital experience
2. **Evoke joy and delight** - Through animations, an adorable dog character, and playful interactions
3. **Express affection creatively** - Combining visual design, interactivity, and personalization
4. **Be shareable** - Includes WhatsApp integration for the recipient to respond

---

## Core Functionality

### 1. Interactive Proposal Flow

The application follows a three-stage narrative:

| Stage | Description |
|-------|-------------|
| **Question** | Presents "Ganga, Will You Be My Valentine?" with Yes/No buttons |
| **Success** | Celebrates with confetti and a joyful message when "Yes" is clicked |
| **Final** | Shows a countdown to Valentine's Day and WhatsApp sharing option |

### 2. The "Escalation" Mechanic

The core interactive gimmick:
- Each time the user hovers/clicks "No", the button **shrinks** and moves randomly
- Simultaneously, the "Yes" button **grows** larger
- After 3 attempts, a hint message appears explaining the mechanic
- The dog character reacts with "shocked" expressions when "No" is hovered

### 3. Interactive Shih Tzu Dog Character

A custom SVG-animated dog that serves as an emotional guide:

| Interaction | Behavior |
|-------------|----------|
| Idle | Blinks, wags tail, shadow pulses |
| Hover over "Yes" | Happy expression, perked ears, thought bubble says "Yay!" |
| Hover over "No" | Shocked expression, shake animation, thought bubble says "Oh no!" |
| Click dog | Barks with on-screen text ("Woof!", "Bark!", "Yap!", "Arf!") |
| Long-press dog | "Lick" animation with love message |
| Eye tracking | Dog's eyes follow mouse cursor |
| Double-tap screen | Spawns burst of hearts (mobile) |

---

## Technical Architecture

### File Structure

```
valentines-project/
├── index.html          # Main HTML structure
├── styles.css          # All styling, animations, and responsive design
├── script.js           # All interactivity and logic
└── README.md           # This documentation file
```

### Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Animations, gradients, glass-morphism effects, responsive design |
| **Vanilla JavaScript** | All interactivity (no frameworks) |
| **GSAP (CDN)** | Advanced animations and easing |
| **Canvas API** | Particle background system |

### External Dependencies (CDN)

- **Google Fonts**: Playfair Display (headings) + Quicksand (body)
- **GSAP 3.12.2**: Animation library for smooth transitions
- **CustomEase**: GSAP plugin for custom easing curves

---

## Key Features

### Visual Effects

1. **Cursor Heart Trail** - Hearts spawn and float upward as the mouse moves
2. **Particle Background** - Canvas-based floating particles with connecting lines
3. **Floating Petals** - Rose petals drift down the screen using GSAP animations
4. **Glass Morphism** - Frosted glass card effect with backdrop-filter
5. **Animated Gradient Background** - Soft pink gradient shifts continuously

### Mobile Optimizations

- Reduced particle opacity for performance
- Touch-optimized button sizes (min 48px)
- Double-tap to spawn hearts
- Haptic feedback on interactions (vibration API)
- Shake-to-reset gesture (accelerometer)
- Viewport height adjustments for mobile browsers

### Accessibility & UX

- Responsive design (works on all screen sizes)
- Fallbacks for when GSAP fails to load
- Animation pause when tab is inactive
- Smooth transitions between states

---

## Personalization

All personalized content is centralized in the `PERSONALIZATION` object in `script.js`:

```javascript
const PERSONALIZATION = {
    name: "Ganga",                              // Recipient's name
    heading: "Ganga, Will You Be My Valentine?", // Main question
    subtext: "I've been waiting...",             // Subtitle text
    noMessages: [...],                          // Messages for No button
    valentineDate: new Date(...),               // Target countdown date
    whatsappNumber: "919759133629",             // WhatsApp number
    whatsappMessage: "I said YES!..."           // Pre-filled message
};
```

---

## How It Works

### State Management

The application uses a simple state object:

```javascript
const state = {
    noAttempts: 0,       // Tracks how many times "No" was attempted
    hasClickedYes: false,
    lastInteraction: timestamp,
    easterEggShown: false
};
```

### Animation System

- **CSS Animations**: Used for looping effects (heartbeat, tail wag, floating)
- **GSAP**: Used for state transitions and dynamic scaling
- **Canvas**: Used for particle system with 50 particles and proximity lines

### Event Listeners

| Element | Events Handled |
|---------|----------------|
| Document | mousemove (cursor hearts, parallax, eye tracking), visibilitychange |
| Yes Button | click, mouseenter, mouseleave |
| No Button | click, mouseenter, touchstart |
| Dog | click, mousedown/touchstart (long press), mousemove |
| Window | resize, devicemotion (shake) |

---

## Easter Eggs

1. **Inactivity Message** - After 10 seconds of no interaction, a message appears: "I've been practicing my puppy eyes for this moment..."
2. **Shake to Reset** - On mobile, shaking the device resets the button sizes
3. **Double-tap Burst** - Double-tapping anywhere spawns a burst of hearts

---

## Browser Compatibility

- Chrome/Edge (full support)
- Firefox (full support)
- Safari (full support, reduced particle count on mobile)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Usage

1. Open `index.html` in any modern web browser
2. Share the URL with the recipient
3. The recipient interacts with the page and clicks "Yes"
4. They can then click the WhatsApp button to send their response

---

## Credits

- Fonts: Google Fonts (Playfair Display, Quicksand)
- Animation Library: GSAP by GreenSock
- Created as a Valentine's surprise

---

## License

Personal project created for entertainment purposes.
