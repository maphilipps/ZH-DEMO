(function (Drupal) {
  Drupal.behaviors.mobileMenu = {
    attach: function (context) {
      // Ensure we only run this once per context.
      const menuToggleButton = context.querySelector('#mobile-menu-toggle');
      const menu = context.querySelector('#mobile-menu-2');
      const tabletBreakpoint = 1024;

      // If either is missing, stop gracefully.
      if (!menuToggleButton || !menu) {
        return;
      }
      console.log("i am here");

      function handleResize() {
        if (window.innerWidth > tabletBreakpoint) {
          menu.classList.remove('hidden');
        }
      }

      function toggleMobileMenu() {
        menu.classList.toggle('hidden');
      }

      // Attach the event handlers once per context load.
      menuToggleButton.addEventListener('click', toggleMobileMenu);
      window.addEventListener('resize', handleResize);
      window.addEventListener('DOMContentLoaded', handleResize);
    }
  };
})(Drupal);
