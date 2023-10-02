const numberOfStars = 100;
const starsContainer = document.querySelector(".stars");


// Stars / Shooting Stars

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    starsContainer.appendChild(star);

    const randomX = Math.random() * 100 + "vw";
    const randomY = Math.random() * 100 + "vh";
    star.style.setProperty("--random-x", randomX);
    star.style.setProperty("--random-y", randomY);

    const randomDelay = Math.random() * 5 + "s";
    star.style.setProperty("--random-delay", randomDelay);
}

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

function generateShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.classList.add("shooting-star");

  const randomX = Math.random() * (vw - 10); // Adjust to prevent shooting star from going off the right edge
  const randomY = Math.random() * (vh - 10); // Adjust to prevent shooting star from going off the bottom edge

  shootingStar.style.left = `${randomX}px`;
  shootingStar.style.top = `${randomY}px`;

  document.body.appendChild(shootingStar);

  setTimeout(() => {
    shootingStar.style.transform = "scaleX(10) scaleY(80)";
    shootingStar.style.opacity = "0";
    shootingStar.addEventListener("animationend", () => {
      shootingStar.remove();
    });
  }, 100);

  setTimeout(generateShootingStar, Math.random() * 10000 + 3000); // Random delay between 3 and 13 seconds
}

generateShootingStar();

const moonPhases = document.querySelectorAll('.moon');
const eclipseType = ['Lunar', 'Solar'];
let currentPhaseIndex = localStorage.getItem('currentPhaseIndex') || 0;

function showMoon(phaseIndex) {
  moonPhases.forEach((moon, index) => {
    if (index === phaseIndex) {
      moon.style.display = 'block'; // Show the current phase
    } else {
      moon.style.display = 'none'; // Hide other phases
    }
  });
}

// Moons

function getCurrentPhaseIndex() {
  const now = Date.now();
  const startTime = localStorage.getItem('startTime');
  const timeElapsed = now - startTime;
  const interval = 1000; /* 60000 */
  const totalPhases = moonPhases.length;
  return Math.floor((timeElapsed % (interval * totalPhases)) / interval);
}

let isFullMoonPhase = false;

function showCurrentPhase() {
  currentPhaseIndex = getCurrentPhaseIndex();
  showMoon(currentPhaseIndex);

  const currentPhase = moonPhases[currentPhaseIndex].getAttribute('data-phase');
  if (currentPhase === 'new' || currentPhase === 'full') {
    // Randomly trigger an eclipse (1 in 5 chance, 20%)
    const eclipseChance = Math.random();
    if (eclipseChance < 0.2) {
      const eclipseType = Math.random() < 0.5 ? 'Solar' : 'Lunar';
      console.log('Eclipse Triggered');
      //alert(`Eclipse Alert! It's a ${eclipseType} Eclipse`);

      // Determine the expected eclipse type based on the current phase
      const expectedEclipseType = currentPhase === 'new' ? 'Solar' : 'Lunar';

      // Check if the triggered eclipse matches the expected type
      if (eclipseType === expectedEclipseType) {
        // Show the appropriate eclipse on the page
        document.querySelector('.lunar-eclipse').style.display = eclipseType === 'Lunar' ? 'block' : 'none';
        document.querySelector('.solar-eclipse').style.display = eclipseType === 'Solar' ? 'block' : 'none';

        // Hide the Full Moon and New Moon during the eclipse
        if (currentPhase === 'new') {
          document.querySelector('.new-moon').style.display = 'none';
        } else {
          document.querySelector('.full-moon').style.display = 'none';
        }

        // Move to the next phase after the eclipse
        // currentPhaseIndex = (currentPhaseIndex + 1) % moonPhases.length;
      } else {
        // If the triggered eclipse doesn't match the expected type, show the Full Moon and New Moon
        document.querySelector('.full-moon').style.display = currentPhase === 'full' ? 'block' : 'none';
        document.querySelector('.new-moon').style.display = currentPhase === 'new' ? 'block' : 'none';
        document.querySelector('.lunar-eclipse').style.display = 'none';
        document.querySelector('.solar-eclipse').style.display = 'none';
      }
    } else {
      // If no eclipse occurs, show the Full Moon and New Moon
      document.querySelector('.full-moon').style.display = currentPhase === 'full' ? 'block' : 'none';
      document.querySelector('.new-moon').style.display = currentPhase === 'new' ? 'block' : 'none';
      document.querySelector('.lunar-eclipse').style.display = 'none';
      document.querySelector('.solar-eclipse').style.display = 'none';
    }
  } else {
    // Show the Full Moon and New Moon if it's not a Lunar or Solar Eclipse
    document.querySelector('.full-moon').style.display = currentPhase === 'full' ? 'block' : 'none';
    document.querySelector('.new-moon').style.display = currentPhase === 'new' ? 'block' : 'none';
    document.querySelector('.lunar-eclipse').style.display = 'none';
    document.querySelector('.solar-eclipse').style.display = 'none';

    // Move to the next phase
    // currentPhaseIndex = (currentPhaseIndex + 1) % moonPhases.length;
  }
}

function initialize() {
  const startTime = localStorage.getItem('startTime');
  if (!startTime) {
    localStorage.setItem('startTime', Date.now());
  }
  showCurrentPhase();
}

// Initially hide all moon phases except the current one
moonPhases.forEach((moon, index) => {
  if (index !== getCurrentPhaseIndex()) {
    moon.style.display = 'none';
  }
});

// Set the interval to update the moon phase every 5 seconds (5000 milliseconds)
setInterval(showCurrentPhase, 1000); /* 60000 */

// Initialize the moon phases on page load
initialize()

const items = document.querySelectorAll('.floating-container > *');
let currentIndex = 0;

function cycleItems() {
  items[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % items.length;
  items[currentIndex].style.display = 'block';
}

// Start cycling through items
setInterval(cycleItems, 5000); // Change the interval as needed

// Quotes

const quotes = [
  "She's not just my love; she's my heart, my soul, my everything.",
  "In her smile, I see something more beautiful than the stars.",
  "Loving her is not a choice; it's a necessity.",
  "She's the poetry my heart has been writing all my life.",
  "My love for her knows no boundaries, no conditions. It just is.",
  "She's the missing piece I never knew my heart needed.",
  "With her, every moment feels like a lifetime of happiness.",
  "In her, I found my forever and always.",
  "She's the love story I'll never stop telling.",
  "I don't just love her; I adore and cherish every part of her."
];

let currentQuoteIndex = 0;
const quoteElement = document.querySelector('.quote');
const quoteContainer = document.querySelector('.quote-container');

function cycleQuotes() {
  // Fade out the quote container
  quoteContainer.style.opacity = 0;

  // After fading out (e.g., 1 second), change the quote and fade it in
  setTimeout(function () {
    const quote = quotes[currentQuoteIndex];
    quoteElement.innerHTML = `"${quote}"`; // Wrap the quote in quotation marks
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

    // Fade in the quote container
    quoteContainer.style.opacity = 1;
  }, 1000); // Adjust the duration as needed
}

// Start cycling through quotes immediately
cycleQuotes();

// Continue cycling through quotes without delay
setInterval(cycleQuotes, 7000); // Change the interval as needed

// Passcode

// const circles = document.querySelectorAll(".circle");
// const passcodeContainer = document.querySelector('.passcode-container');
// const passcode = '0812';

// let enteredPasscode = '';

// passcodeContainer.addEventListener('click', (event) => {
//   const target = event.target;
//   if (target.classList.contains('circle')) {
//     const value = target.dataset.value;
//     enteredPasscode += value;
//     updateCircles();
//     if (enteredPasscode.length === passcode.length) {
//       checkPasscode();
//     }
//   }
// });

// document.addEventListener('keydown', (event) => {
//   const key = event.key;
//   if (key >= '0' && key <= '9') {
//     enteredPasscode += key;
//     updateCircles();
//     if (enteredPasscode.length === passcode.length) {
//       checkPasscode();
//     }
//   }
// });

// function updateCircles() {
//   const circles = document.querySelectorAll('.circle');
//   circles.forEach((circle, index) => {
//     if (index < enteredPasscode.length) {
//       circle.classList.add('active');
//     } else {
//       circle.classList.remove('active');
//     }
//   });
// }

// function checkPasscode() {
//   if (enteredPasscode === passcode) {
//     console.log('Correct Passcode!');
//   } else {
//     console.log('Incorrect Passcode!');
//     enteredPasscode = '';
//     setTimeout(updateCircles, 500);
//   }
// }

// circles.forEach(circle => {
//   circle.addEventListener("mousedown", () => {
//     circle.classList.add("active");
//   });

//   circle.addEventListener("mouseup", () => {
//     circle.classList.remove("active");
//   });
// });