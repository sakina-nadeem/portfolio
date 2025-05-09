document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenuBtn.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        document.querySelectorAll(`.nav-link[href="${targetId}"]`).forEach(link => {
          link.classList.add('active');
        });
      }
    });
  });
  
  // Portfolio filtering - Fixed version
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
        
        // Filter items with proper animation
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
  
  // Animation on scroll - Improved version
  function animateOnScroll() {
    const animatables = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right, .scale-in');
    
    animatables.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('animated')) {
        // Get delay if specified
        const delay = element.getAttribute('data-delay') || 0;
        
        // Add animated class after delay
        setTimeout(() => {
          element.classList.add('animated');
        }, delay);
      }
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach(bar => {
      if (isElementInViewport(bar) && bar.style.transform !== 'scaleX(1)') {
        bar.style.transform = 'scaleX(1)';
      }
    });
  }
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }
  
  // Resume Modal Functionality
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeButtons = document.querySelectorAll('#closeResumeBtn, #closeResumeBtn2');
  const resumeModal = document.getElementById('resumeModal');
  
  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', function() {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }
  
  if (closeButtons.length && resumeModal) {
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        resumeModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      });
    });
  }
  
  // Close modal when clicking outside content
  if (resumeModal) {
    resumeModal.addEventListener('click', function(e) {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Show success message (in a real implementation, you would send this to a server)
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      contactForm.reset();
    });
  }
  
  // Run animation check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Run once on page load
  window.addEventListener('load', function() {
    animateOnScroll();
    
    // Add a delay for the initial animations to look better
    setTimeout(animateOnScroll, 200);
  });
  
  // Highlight active nav item on scroll
  function highlightNav() {
    const scrollPosition = window.scrollY;
    
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll('section[id]');
    
    // Loop through sections to find which one is currently in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Adjust offset as needed
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Update nav highlighting on scroll
  window.addEventListener('scroll', highlightNav);
});