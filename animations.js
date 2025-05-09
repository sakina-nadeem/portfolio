document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const animateOnScrollElements = document.querySelectorAll('.fade-in, .fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animate class
                entry.target.classList.add('animate');
                
                // Calculate delay based on data-delay attribute
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.animationDelay = `${parseInt(delay) / 1000}s`;
                }
                
                // Stop observing once the animation has started
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Start observing each element
    animateOnScrollElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
    
    // Hero section typing effect
    const title = document.querySelector('.hero-title');
    if (title) {
        const text = title.innerHTML;
        title.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add hover animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1.02)';
        });
    });
    
    // Add subtle parallax effect on mouse move to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            const accentLeft = document.querySelector('.accent-left');
            const accentRight = document.querySelector('.accent-right');
            
            if (accentLeft && accentRight) {
                accentLeft.style.transform = `translateX(${moveX * -1}px)`;
                accentRight.style.transform = `translateY(${moveY * -1}px)`;
            }
        });
    }
    
    // Handle animations on scroll
    function animateOnScroll() {
        const animatables = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right, .scale-in');
        
        animatables.forEach(element => {
            const position = element.getBoundingClientRect();
            // If element is in viewport
            if (position.top < window.innerHeight - 100) {
                // Get delay if specified
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                // Add animated class after delay
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
            }
        });
        
        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        
        skillBars.forEach(bar => {
            const position = bar.getBoundingClientRect();
            
            if (position.top < window.innerHeight - 100) {
                bar.style.transform = 'scaleX(1)';
            }
        });
    }
    
    // Filter animations for portfolio items
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items with animation
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load for initial animations
    window.addEventListener('load', function() {
        // Run with slight delay to ensure DOM is fully rendered
        setTimeout(animateOnScroll, 100);
    });
    
    // Run immediately for above-the-fold content
    animateOnScroll();
});
