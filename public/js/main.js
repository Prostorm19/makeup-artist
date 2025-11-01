// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Counter animation for hero stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when hero stats come into view
                if (entry.target.querySelector('[data-count]')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in-up, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const locationInput = document.getElementById('location-input');
    const specialtySelect = document.getElementById('specialty-select');
    const dateInput = document.getElementById('date-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    async function handleSearch() {
        const filters = {
            location: locationInput?.value,
            specialty: specialtySelect?.value,
            date: dateInput?.value
        };
        
        showLoading();
        
        try {
            const artists = await FirebaseService.getArtists(filters);
            displayArtists(artists);
            
            // Scroll to artists section
            document.getElementById('artists').scrollIntoView({
                behavior: 'smooth'
            });
        } catch (error) {
            showToast('Error searching artists. Please try again.', 'error');
        } finally {
            hideLoading();
        }
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    async function handleContactForm(e) {
        e.preventDefault();
        
        showLoading();
        
        // Simulate form submission
        setTimeout(() => {
            hideLoading();
            showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    }
    
    // Load initial content
    loadInitialContent();
});

// Utility functions
function showLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.add('active');
    }
}

function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('active');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <h4 class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
    
    // Manual close
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
}

async function loadInitialContent() {
    try {
        // Load featured artists
        const artists = await FirebaseService.getArtists();
        displayArtists(artists.slice(0, 6)); // Show first 6
        
        // Load reviews
        const reviews = await FirebaseService.getReviews();
        displayReviews(reviews.slice(0, 5)); // Show first 5
        
    } catch (error) {
        console.log('Using sample data for development');
        // Use sample data if Firebase is not configured
        displayArtists(SAMPLE_DATA.artists);
        displayReviews(SAMPLE_DATA.reviews);
    }
}