document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-wrapper') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      if (navLinks) {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Enhanced Intersection Observer for animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) translateX(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initialize animation elements
  document.querySelectorAll('.service-card, .testimonial-card, .hero-text, .hero-visual').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // Enhanced header scroll effects
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const header = document.querySelector('.site-header');
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
          header.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.95) 0%, rgba(118,75,162,0.95) 100%)';
          header.style.backdropFilter = 'blur(20px)';
          header.style.boxShadow = '0 15px 40px rgba(102,126,234,0.5)';
        } else {
          header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          header.style.backdropFilter = 'blur(10px)';
          header.style.boxShadow = '0 10px 30px rgba(102,126,234,0.4)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Parallax effect for hero image
  window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      const scrolled = window.scrollY * 0.5;
      heroImage.style.transform = `translateY(${scrolled}px)`;
    }
  });
});
