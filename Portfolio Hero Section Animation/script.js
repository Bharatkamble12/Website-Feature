// Typing animation for h1
const h1Element = document.querySelector('.content h1');
const text = "Hey, I'm Bharat 👋";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    h1Element.innerHTML = text.substring(0, index + 1);
    index++;
    setTimeout(typeWriter, 100); // Adjust speed here
  }
}

// Start typing animation after a short delay
setTimeout(typeWriter, 500);

// Button functionality
const button = document.querySelector('button');
button.addEventListener('click', () => {
  alert('Portfolio section coming soon! 🚀');
});
