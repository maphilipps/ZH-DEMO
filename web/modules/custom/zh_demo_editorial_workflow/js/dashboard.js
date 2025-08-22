(function (Drupal) {
  'use strict';

  /**
   * Auto-refresh dashboard stats every 30 seconds
   */
  Drupal.behaviors.editorDashboard = {
    attach: function (context, settings) {
      // Auto-refresh functionality could be added here
      // For now, just log that dashboard is loaded
      console.log('Editor Dashboard loaded');
    }
  };

})(Drupal);