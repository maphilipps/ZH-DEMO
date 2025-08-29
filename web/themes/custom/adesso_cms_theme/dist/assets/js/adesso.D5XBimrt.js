import { i as initDropdowns } from "./vendor-common.DNy60kh1.js";
document.addEventListener("DOMContentLoaded", function() {
  initDropdowns();
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            const dropdownTriggers = node.querySelectorAll(
              "[data-dropdown-toggle]"
            );
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
