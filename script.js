// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = menuToggle?.querySelector('i');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (menuIcon) {
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
      }
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      
      // Close mobile menu after click
      if (navLinks?.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuIcon) {
          menuIcon.classList.add('fa-bars');
          menuIcon.classList.remove('fa-times');
        }
        document.body.style.overflow = '';
      }
    });
  });

  // Scroll progress indicator
  window.addEventListener('scroll', () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      scrollIndicator.style.width = scrollPercent * 100 + '%';
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.service-card, .testimonial-card, .hero-text, .about-text, .section-title').forEach(el => {
    observer.observe(el);
  });

  // Header scroll effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const header = document.querySelector('.site-header');
        const scrolled = window.scrollY > 50;
        if (scrolled) {
          header.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.98), rgba(118,75,162,0.98))';
          header.style.backdropFilter = 'blur(25px)';
        } else {
          header.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.95), rgba(118,75,162,0.95))';
          header.style.backdropFilter = 'blur(20px)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-wrapper') && navLinks?.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (menuIcon) {
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
      }
      document.body.style.overflow = '';
    }
  });
});
