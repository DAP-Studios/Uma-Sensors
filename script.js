// Scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scrolling
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        const parallax = scrolled * 0.3 * speed;
        shape.style.transform = `translateY(${parallax}px) rotate(${scrolled * 0.03}deg)`;
    });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to a server
    // For now, we'll show an alert
    alert('Thank you for your inquiry! We will contact you shortly.');
    // Reset form
    e.target.reset();
});