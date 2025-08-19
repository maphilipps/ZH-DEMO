/**
 * Thalheim Municipality Theme JavaScript
 * Rural traditional personal (Weinland) interactions
 */

// Initialize municipality-specific behaviors
document.addEventListener('DOMContentLoaded', function() {
  console.log('Thalheim municipality theme initialized');
  
  // Add municipality class to body
  document.body.classList.add('municipality-thalheim');
  
  // Initialize Thalheim-specific components
  initThalheimComponents();
});

/**
 * Initialize Thalheim-specific interactive components
 */
function initThalheimComponents() {
  // Organic button interactions for traditional feel
  const buttons = document.querySelectorAll('.thalheim-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px) rotate(0.5deg)';
      this.style.boxShadow = '0 12px 32px -8px rgba(21, 128, 61, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotate(0deg)';
      this.style.boxShadow = '';
    });
  });
  
  // Traditional fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Apply to cards and content sections
  const animatedElements = document.querySelectorAll('.thalheim-card, .hero__content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
  
  // Wine accent hover effect
  const wineAccents = document.querySelectorAll('.wine-accent');
  wineAccents.forEach(accent => {
    accent.addEventListener('mouseenter', function() {
      this.style.borderLeftColor = '#dc2626';
      this.style.backgroundColor = '#fef2f2';
    });
    
    accent.addEventListener('mouseleave', function() {
      this.style.borderLeftColor = '';
      this.style.backgroundColor = '';
    });
  });
}

// Traditional quote typewriter effect
function typewriterEffect(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function typeWriter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  
  typeWriter();
}

// Export for potential use by other scripts
window.ThalheimTheme = {
  init: initThalheimComponents,
  typewriter: typewriterEffect
};