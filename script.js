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

// Form submission using AJAX to prevent page redirect
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const submitButton = form.querySelector('.submit-btn');
    const originalButtonText = submitButton.textContent;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Prepare form data
    const formData = new FormData(form);

    // Send data using fetch to Formspree's AJAX endpoint
    // Make sure to replace 'YOUR_FORM_ID' with your actual Formspree form ID
    fetch('https://formspree.io/f/xyznywal', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Success! Show your custom message
            alert('Thank you for your inquiry! We will contact you shortly.');
            form.reset(); // Reset the form fields
        } else {
            // Handle errors from Formspree
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert('Error: ' + data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Oops! There was a problem submitting your form. Please try again.');
                }
            }).catch(() => {
                // Fallback error if JSON parsing fails
                alert('Oops! There was a problem submitting your form. Please try again.');
            });
        }
    }).catch(error => {
        // Handle network errors
        console.error('Form submission error:', error);
        alert('Network error. Please check your connection and try again.');
    }).finally(() => {
        // Re-enable button and restore text
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});