/**
 * @file
 * Quick Action Buttons JavaScript
 * Handles approve/reject actions with Alpine.js and AJAX
 */

(function () {
  'use strict';

  // Initialize quick action functionality
  document.addEventListener('DOMContentLoaded', function () {
    initializeQuickActions();
  });

  /**
   * Initialize quick action buttons
   */
  function initializeQuickActions() {
    const actionButtons = document.querySelectorAll(
      '.quick-action-buttons button[data-action]'
    );

    actionButtons.forEach(button => {
      button.addEventListener('click', handleQuickAction);
    });
  }

  /**
   * Handle quick action button click
   */
  async function handleQuickAction(event) {
    const button = event.currentTarget;
    const action = button.dataset.action;
    const eventId = button.dataset.eventId;
    const csrfToken = button.dataset.csrfToken;

    if (!eventId || !action) {
      console.error('Missing event ID or action');
      return;
    }

    // Disable button during request
    button.disabled = true;
    button.classList.add('opacity-50', 'cursor-not-allowed');

    try {
      if (action === 'approve') {
        await approveEvent(eventId, csrfToken, button);
      } else if (action === 'reject') {
        await showRejectModal(eventId, csrfToken, button);
      }
    } catch (error) {
      console.error('Action failed:', error);
      showErrorMessage('Aktion fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      // Re-enable button
      button.disabled = false;
      button.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  /**
   * Approve an event
   */
  async function approveEvent(eventId, csrfToken, button) {
    // Show confirmation
    if (!confirm('Möchten Sie diese Veranstaltung wirklich genehmigen?')) {
      return;
    }

    const response = await fetch('/admin/content/events/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        event_id: eventId,
        action: 'approve',
      }),
    });

    if (response.ok) {
      const result = await response.json();

      if (result.success) {
        showSuccessMessage('Veranstaltung wurde erfolgreich genehmigt.');
        updateRowStatus(eventId, 'published', button);
      } else {
        throw new Error(result.message || 'Approval failed');
      }
    } else {
      throw new Error('Network error');
    }
  }

  /**
   * Show reject modal and handle rejection
   */
  async function showRejectModal(eventId, csrfToken, button) {
    // Create modal using Alpine.js
    const modalHtml = `
      <div class="rejection-modal fixed inset-0 z-50 overflow-y-auto" 
           x-data="{ 
             show: true, 
             reason: '', 
             submitting: false 
           }"
           x-show="show"
           x-transition:enter="ease-out duration-300"
           x-transition:enter-start="opacity-0"
           x-transition:enter-end="opacity-100"
           x-transition:leave="ease-in duration-200"
           x-transition:leave-start="opacity-100"
           x-transition:leave-end="opacity-0">
        
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
               @click="show = false"></div>

          <!-- Modal content -->
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
               x-transition:enter="ease-out duration-300"
               x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
               x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
               x-transition:leave="ease-in duration-200"
               x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
               x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            
            <!-- Header -->
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Veranstaltung ablehnen
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Bitte geben Sie einen Grund für die Ablehnung an. Diese Information wird an den Antragsteller weitergeleitet.
                  </p>
                </div>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitRejection()" class="mt-5">
              <div>
                <label for="rejection-reason" class="block text-sm font-medium text-gray-700 mb-2">
                  Ablehnungsgrund *
                </label>
                <textarea
                  id="rejection-reason"
                  x-model="reason"
                  rows="4"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Z.B. Keine ausreichende Versicherung, Konflikt mit anderen Veranstaltungen..."
                  required
                  maxlength="500"></textarea>
                <p class="mt-1 text-xs text-gray-500">Maximal 500 Zeichen</p>
              </div>

              <!-- Actions -->
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  :disabled="!reason.trim() || submitting"
                  :class="{ 'opacity-50 cursor-not-allowed': !reason.trim() || submitting }"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm disabled:hover:bg-red-600">
                  <span x-show="!submitting">Ablehnen</span>
                  <span x-show="submitting" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird abgelehnt...
                  </span>
                </button>
                <button
                  type="button"
                  @click="show = false"
                  :disabled="submitting"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>`;

    // Add modal to DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);

    // Initialize Alpine.js data for modal
    window.Alpine.data('rejectionModal', () => ({
      async submitRejection() {
        this.submitting = true;

        try {
          const response = await fetch('/admin/content/events/reject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
              event_id: eventId,
              action: 'reject',
              reason: this.reason,
            }),
          });

          if (response.ok) {
            const result = await response.json();

            if (result.success) {
              showSuccessMessage('Veranstaltung wurde erfolgreich abgelehnt.');
              updateRowStatus(eventId, 'rejected', button);
              this.show = false;
            } else {
              throw new Error(result.message || 'Rejection failed');
            }
          } else {
            throw new Error('Network error');
          }
        } catch (error) {
          console.error('Rejection failed:', error);
          showErrorMessage(
            'Ablehnung fehlgeschlagen. Bitte versuchen Sie es erneut.'
          );
        } finally {
          this.submitting = false;
        }
      },
    }));

    // Clean up modal when closed
    setTimeout(() => {
      const modal = document.querySelector('.rejection-modal');
      if (modal && !modal.querySelector('[x-data]').__x?.$data?.show) {
        modalContainer.remove();
      }
    }, 500);
  }

  /**
   * Update row status after successful action
   */
  function updateRowStatus(eventId, newStatus, button) {
    const row = button.closest('tr');
    if (!row) return;

    // Update status badge
    const statusCell = row.querySelector('.status-badge');
    if (statusCell) {
      const statusConfig = {
        published: {
          text: 'Genehmigt',
          class: 'bg-green-100 text-green-800 border-green-200',
        },
        rejected: {
          text: 'Abgelehnt',
          class: 'bg-red-100 text-red-800 border-red-200',
        },
      };

      const config = statusConfig[newStatus];
      if (config) {
        statusCell.textContent = config.text;
        statusCell.className = `inline-flex items-center font-medium rounded-full border px-2.5 py-1.5 text-sm ${config.class}`;
      }
    }

    // Remove action buttons and show status
    const actionButtons = row.querySelector('.quick-action-buttons');
    if (actionButtons) {
      const statusIcon =
        newStatus === 'published'
          ? '<svg class="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
          : '<svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';

      actionButtons.innerHTML = `<div class="flex items-center space-x-2">${statusIcon}</div>`;
    }
  }

  /**
   * Show success message
   */
  function showSuccessMessage(message) {
    showNotification(message, 'success');
  }

  /**
   * Show error message
   */
  function showErrorMessage(message) {
    showNotification(message, 'error');
  }

  /**
   * Show notification toast
   */
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `
      fixed top-4 right-4 z-50 max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg 
      transform transition-all duration-300 ease-in-out translate-x-full
    `;

    const bgColor =
      type === 'success'
        ? 'bg-green-50 border-green-200'
        : type === 'error'
          ? 'bg-red-50 border-red-200'
          : 'bg-blue-50 border-blue-200';
    const iconColor =
      type === 'success'
        ? 'text-green-600'
        : type === 'error'
          ? 'text-red-600'
          : 'text-blue-600';

    notification.innerHTML = `
      <div class="p-4 ${bgColor} rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${
                type === 'success'
                  ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
                  : type === 'error'
                    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
                    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
              }
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-gray-900">${message}</p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button class="close-notification rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full');
    });

    // Close button functionality
    notification
      .querySelector('.close-notification')
      .addEventListener('click', () => {
        closeNotification(notification);
      });

    // Auto-close after 5 seconds
    setTimeout(() => {
      closeNotification(notification);
    }, 5000);
  }

  /**
   * Close notification
   */
  function closeNotification(notification) {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
})();
