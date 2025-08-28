/**
 * @file
 * Fixes frontend editing preview for entity reference autocomplete fields.
 */
(function (Drupal) {
  'use strict';

  /**
   * Attaches the fix for entity reference autocomplete fields in frontend editing.
   */
  Drupal.behaviors.fixBlockReferencePreview = {
    attach: function (context, settings) {
      // Find all entity reference autocomplete fields within frontend editing forms
      const autocompleteFields = context.querySelectorAll(
        '.frontend-editing-form input.form-autocomplete'
      );

      autocompleteFields.forEach(function (field) {
        // Listen for autocomplete selection
        field.addEventListener('autocompleteclose', function () {
          // Trigger the formUpdated event that frontend editing listens for
          const event = new CustomEvent('formUpdated.formUpdatedEvent', {
            bubbles: true,
            detail: { formItem: field },
          });
          field.dispatchEvent(event);
        });

        // Also trigger on blur to catch manual edits
        field.addEventListener('blur', function () {
          setTimeout(function () {
            const event = new CustomEvent('formUpdated.formUpdatedEvent', {
              bubbles: true,
              detail: { formItem: field },
            });
            field.dispatchEvent(event);
          }, 100);
        });
      });
    },
  };
})(Drupal);
