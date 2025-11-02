// Dark Mode Toggle Functionality
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;
const toggleIcon = document.querySelector('.toggle-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleIcon.textContent = '☀️';
}

// Toggle dark mode on button click
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Update icon and save preference
    if (body.classList.contains('dark-mode')) {
        toggleIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scrolling for navbar links
document.querySelectorAll('.navbar-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
