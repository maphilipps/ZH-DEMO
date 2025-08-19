/**
 * Thalwil Municipality Theme JavaScript
 * Modern urban professional interactions
 */

// Initialize municipality-specific behaviors
document.addEventListener('DOMContentLoaded', function() {
  console.log('Thalwil municipality theme initialized');
  
  // Add municipality class to body
  document.body.classList.add('municipality-thalwil');
  
  // Initialize Thalwil-specific components
  initThalwilComponents();
});

/**
 * Initialize Thalwil-specific interactive components
 */
function initThalwilComponents() {
  // Enhanced button hover effects for modern feel
  const buttons = document.querySelectorAll('.thalwil-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Smooth scroll for modern navigation
  const navLinks = document.querySelectorAll('.main-menu a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translate3d(0, ${parallax}px, 0)`;
    });
  }
}

// Export for potential use by other scripts
window.ThalwilTheme = {
  init: initThalwilComponents
};