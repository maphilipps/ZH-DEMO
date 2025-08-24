import 'flowbite/dist/flowbite.js';
import { initDropdowns } from 'flowbite';
import '@tailwindplus/elements';

// Global function for theme preview updates (required by forms)
window.updateThemePreview = function(selectedTheme) {
  // Find all theme preview elements
  const previewCards = document.querySelectorAll('.theme-preview-card');
  
  previewCards.forEach(card => {
    const cardTheme = card.dataset.theme;
    if (cardTheme === selectedTheme) {
      card.classList.add('selected', 'ring-2', 'ring-blue-500');
      card.setAttribute('aria-selected', 'true');
    } else {
      card.classList.remove('selected', 'ring-2', 'ring-blue-500');
      card.setAttribute('aria-selected', 'false');
    }
  });
  
  // Update form select element if it exists
  const selectElement = document.querySelector('select[name*="field_theme"]');
  if (selectElement && selectElement.value !== selectedTheme) {
    selectElement.value = selectedTheme;
    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
  }
};

// Initialize Flowbite components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

  // Initialize dropdowns
  initDropdowns();
  
  // Re-initialize after any dynamic content changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any added nodes contain dropdown triggers
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            const dropdownTriggers = node.querySelectorAll('[data-dropdown-toggle]');
            if (dropdownTriggers.length > 0) {
              initDropdowns();
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
