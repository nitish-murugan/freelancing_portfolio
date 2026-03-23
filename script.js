// Mobile Navigation
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navContainer = document.querySelector('.nav-container');

// Create mobile menu
const mobileNav = document.createElement('div');
mobileNav.className = 'mobile-nav';
mobileNav.innerHTML = `
    <div class="mobile-nav-links">
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
        <a href="#about">About</a>
        <a href="#contact" class="mobile-cta">Book a Call</a>
    </div>
`;

// Add mobile nav styles
const mobileNavStyles = document.createElement('style');
mobileNavStyles.textContent = `
    .mobile-nav {
        display: none;
        position: fixed;
        top: 69px;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
        padding: 24px;
        z-index: 999;
    }

    .mobile-nav.active {
        display: block;
    }

    .mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .mobile-nav-links a {
        padding: 12px 0;
        color: var(--text-secondary);
        font-size: 16px;
        font-weight: 500;
        border-bottom: 1px solid var(--border-color);
    }

    .mobile-nav-links .mobile-cta {
        margin-top: 8px;
        padding: 14px;
        background: var(--text-primary);
        color: var(--bg-primary);
        text-align: center;
        border-radius: 8px;
        border: none;
    }
`;
document.head.appendChild(mobileNavStyles);
navbar.appendChild(mobileNav);

// Toggle mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Growth Chart
const canvas = document.getElementById('growthChart');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = canvas.offsetHeight * 2;

    ctx.scale(2, 2);

    // Chart data
    const data = [20, 35, 30, 50, 45, 65, 60, 80, 75, 90];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

    const padding = 40;
    const chartWidth = width / 2 - padding * 2;
    const chartHeight = height / 2 - padding * 2;
    const maxValue = Math.max(...data);

    // Draw grid lines
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width / 2 - padding, y);
        ctx.stroke();
    }

    // Draw line chart
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw area under the line
    ctx.lineTo(width / 2 - padding, padding + chartHeight);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw data points
    ctx.fillStyle = '#3b82f6';
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Highlight last point
        if (index === data.length - 1) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.stroke();
        }
    });

    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';

    months.forEach((month, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        ctx.fillText(month, x, height / 2 - padding + 25);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.portfolio-card, .pricing-card, .testimonial-card, .result-card, .faq-card');

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add stagger effect
const addStaggerDelay = () => {
    const grids = document.querySelectorAll('.portfolio-grid, .pricing-grid, .results-cards, .faq-cards');

    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
};

addStaggerDelay();

// Portfolio card hover effect enhancement
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#000';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

// Pricing card hover effect enhancement
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (this.classList.contains('green-card')) {
            this.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.2)';
        } else if (this.classList.contains('blue-card')) {
            this.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.2)';
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
    });
});

// Add cursor pointer effect for interactive elements
const interactiveElements = document.querySelectorAll('.btn-primary, .btn-cta, .btn-pricing, .btn-cta-white, .portfolio-card');

interactiveElements.forEach(element => {
    element.style.cursor = 'pointer';
});

// Performance optimization: lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message
console.log('%c🚀 Portfolio by Nitish', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cInterested in working together? Contact me!', 'font-size: 14px; color: #666;');

// Portfolio Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('portfolio-carousel');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');

    if (carousel && prevBtn && nextBtn) {
        // Calculate scroll amount based on card width + gap
        const getScrollAmount = () => {
            const card = carousel.querySelector('.carousel-card');
            if (card) {
                // width + gap (32px)
                return card.offsetWidth + 32;
            }
            return 350; // fallback
        };

        prevBtn.addEventListener('click', () => {
            if (carousel.scrollLeft <= 10) {
                // If at the beginning, loop to the end
                carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScroll - 10) {
                // If at the end, loop back to the beginning
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        });
    }
});
