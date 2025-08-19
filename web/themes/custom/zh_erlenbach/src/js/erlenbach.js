/**
 * Erlenbach Municipality Theme JavaScript
 * Elegant Zürichsee-Flair (Goldküste) interactions
 */

// Initialize municipality-specific behaviors
document.addEventListener('DOMContentLoaded', function() {
  console.log('Erlenbach municipality theme initialized');
  
  // Add municipality class to body
  document.body.classList.add('municipality-erlenbach');
  
  // Initialize Erlenbach-specific components
  initErlenbachComponents();
});

/**
 * Initialize Erlenbach-specific interactive components
 */
function initErlenbachComponents() {
  // Elegant button interactions with premium feel
  const buttons = document.querySelectorAll('.erlenbach-button, .erlenbach-button-gold');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
      this.style.boxShadow = '0 20px 60px -10px rgba(8, 145, 178, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
  });
  
  // Glassmorphism card effects
  const cards = document.querySelectorAll('.erlenbach-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) rotateX(2deg)';
      this.style.boxShadow = '0 24px 72px -12px rgba(8, 145, 178, 0.35), 0 4px 20px -4px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0deg)';
      this.style.boxShadow = '';
    });
  });
  
  // Premium scroll effects with momentum
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    // Add scrolling class for premium effects
    document.body.classList.add('scrolling');
    
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 100);
    
    // Parallax for hero section with momentum
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.3;
      hero.style.transform = `translate3d(0, ${parallax}px, 0) perspective(1000px)`;
    }
    
    // Elegant header transparency
    const header = document.querySelector('.site-header');
    if (header) {
      const scrolled = window.pageYOffset;
      const opacity = Math.min(0.95, 0.85 + (scrolled / 200) * 0.1);
      header.style.backgroundColor = `rgba(250, 250, 250, ${opacity})`;
    }
  });
  
  // Luxury stagger animations
  const staggerElements = document.querySelectorAll('.erlenbach-card, .hero__content, .gold-accent');
  staggerElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + (index * 100));
  });
  
  // Gold accent shimmer effect
  const goldElements = document.querySelectorAll('.gold-accent, .premium-badge');
  goldElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.background = 'linear-gradient(45deg, #f59e0b, #fbbf24, #f59e0b)';
      this.style.backgroundSize = '200% 200%';
      this.style.animation = 'shimmer 2s infinite';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.background = '';
      this.style.animation = '';
    });
  });
  
  // Elegant form focus effects
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.boxShadow = '0 12px 48px -12px rgba(8, 145, 178, 0.25)';
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.style.boxShadow = '';
      this.style.transform = 'scale(1)';
    });
  });
}

// Add shimmer keyframes to head
function addShimmerAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .scrolling .glassmorphism {
      backdrop-filter: blur(20px);
    }
  `;
  document.head.appendChild(style);
}

// Initialize animations
addShimmerAnimation();

// Luxury loading animation
function luxuryLoader() {
  const loader = document.createElement('div');
  loader.className = 'luxury-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-ring"></div>
      <div class="loader-text">Erlenbach</div>
    </div>
  `;
  
  const loaderStyle = document.createElement('style');
  loaderStyle.textContent = `
    .luxury-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.5s ease;
    }
    
    .loader-ring {
      width: 60px;
      height: 60px;
      border: 3px solid rgba(245, 158, 11, 0.3);
      border-top: 3px solid #f59e0b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    .loader-text {
      margin-top: 20px;
      color: white;
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 500;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  document.head.appendChild(loaderStyle);
  document.body.appendChild(loader);
  
  // Remove loader after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1000);
  });
}

// Initialize luxury loader
// luxuryLoader(); // Uncomment for production

// Export for potential use by other scripts
window.ErlenbachTheme = {
  init: initErlenbachComponents,
  loader: luxuryLoader
};