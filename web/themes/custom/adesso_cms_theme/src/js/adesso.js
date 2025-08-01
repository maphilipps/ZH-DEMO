import 'flowbite/dist/flowbite.js';
import { initDropdowns } from 'flowbite';

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
