import quickActionButtonsTemplate from './quick-action-buttons.twig';

export default {
  title: 'Components/Quick Action Buttons',
  component: quickActionButtonsTemplate,
  argTypes: {
    event_id: {
      control: 'text',
      description: 'The Event node ID',
    },
    current_status: {
      control: 'select',
      options: ['draft', 'published', 'rejected'],
      description: 'Current moderation state of the event',
    },
    show_approve: {
      control: 'boolean',
      description: 'Whether to show the approve button',
    },
    show_reject: {
      control: 'boolean',
      description: 'Whether to show the reject button',
    },
    compact: {
      control: 'boolean',
      description: 'Use compact button layout for mobile',
    },
    csrf_token: {
      control: 'text',
      description: 'CSRF token for form security',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Quick action buttons for Event Review Dashboard with Swiss-compliant styling and accessibility features.',
      },
    },
  },
};

export const DraftEvent = {
  args: {
    event_id: '123',
    current_status: 'draft',
    show_approve: true,
    show_reject: true,
    compact: false,
    csrf_token: 'sample_token',
  },
};

export const DraftEventCompact = {
  args: {
    event_id: '456',
    current_status: 'draft',
    show_approve: true,
    show_reject: true,
    compact: true,
    csrf_token: 'sample_token',
  },
};

export const ApproveOnly = {
  args: {
    event_id: '789',
    current_status: 'draft',
    show_approve: true,
    show_reject: false,
    compact: false,
    csrf_token: 'sample_token',
  },
};

export const RejectOnly = {
  args: {
    event_id: '101',
    current_status: 'draft',
    show_approve: false,
    show_reject: true,
    compact: false,
    csrf_token: 'sample_token',
  },
};

export const PublishedEvent = {
  args: {
    event_id: '112',
    current_status: 'published',
    show_approve: true,
    show_reject: true,
    compact: false,
    csrf_token: 'sample_token',
  },
};

export const RejectedEvent = {
  args: {
    event_id: '131',
    current_status: 'rejected',
    show_approve: true,
    show_reject: true,
    compact: false,
    csrf_token: 'sample_token',
  },
};

export const InTableContext = {
  render: () => `
    <div class="p-4 bg-gray-50">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Event Review Table Context</h3>
      
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Eingereicht</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Aktionen</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-3 text-sm font-medium text-gray-900">Sommerfest 2025</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center font-medium rounded-full border px-2.5 py-1.5 text-sm bg-yellow-100 text-yellow-800 border-yellow-200">
                  <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Entwurf
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">19.08.2025 14:30</td>
              <td class="px-4 py-3 text-right">
                ${quickActionButtonsTemplate({ 
                  event_id: '123', 
                  current_status: 'draft', 
                  show_approve: true, 
                  show_reject: true, 
                  compact: true,
                  csrf_token: 'sample_token'
                })}
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-3 text-sm font-medium text-gray-900">Weihnachtsmarkt</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center font-medium rounded-full border px-2.5 py-1.5 text-sm bg-green-100 text-green-800 border-green-200">
                  <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Genehmigt
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">18.08.2025 09:15</td>
              <td class="px-4 py-3 text-right">
                ${quickActionButtonsTemplate({ 
                  event_id: '456', 
                  current_status: 'published', 
                  show_approve: true, 
                  show_reject: true, 
                  compact: true,
                  csrf_token: 'sample_token'
                })}
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-3 text-sm font-medium text-gray-900">Strassenfest</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center font-medium rounded-full border px-2.5 py-1.5 text-sm bg-red-100 text-red-800 border-red-200">
                  <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Abgelehnt
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">17.08.2025 16:45</td>
              <td class="px-4 py-3 text-right">
                ${quickActionButtonsTemplate({ 
                  event_id: '789', 
                  current_status: 'rejected', 
                  show_approve: true, 
                  show_reject: true, 
                  compact: true,
                  csrf_token: 'sample_token'
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="text-sm font-medium text-blue-900 mb-2">Accessibility Features</h4>
        <ul class="text-sm text-blue-800 space-y-1">
          <li>• Minimum 44px touch targets (eCH-0059 compliant)</li>
          <li>• ARIA labels for screen readers</li>
          <li>• Keyboard navigation support</li>
          <li>• High contrast mode compatibility</li>
          <li>• Focus ring indicators</li>
          <li>• Swiss German language labels</li>
        </ul>
      </div>
    </div>
  `,
};

export const MobileResponsive = {
  render: () => `
    <div class="p-4 bg-gray-50">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Mobile Responsive Layout</h3>
      
      <div class="space-y-4">
        <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-sm">
          <h4 class="text-lg font-semibold text-gray-900 mb-2">Sommerfest 2025</h4>
          <div class="mb-2">
            <span class="text-sm font-medium text-gray-500">Status:</span>
            <span class="inline-flex items-center font-medium rounded-full border px-2.5 py-1.5 text-sm bg-yellow-100 text-yellow-800 border-yellow-200 ml-2">
              <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Entwurf
            </span>
          </div>
          <div class="mb-3">
            <span class="text-sm font-medium text-gray-500">Eingereicht:</span>
            <span class="text-sm text-gray-900 ml-2">19.08.2025 14:30</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex space-x-1">
              <input type="checkbox" class="w-4 h-4 text-red-600 border-gray-300 rounded" />
            </div>
            ${quickActionButtonsTemplate({ 
              event_id: '123', 
              current_status: 'draft', 
              show_approve: true, 
              show_reject: true, 
              compact: true,
              csrf_token: 'sample_token'
            })}
          </div>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-sm">
          <h4 class="text-lg font-semibold text-gray-900 mb-2">Weihnachtsmarkt</h4>
          <div class="mb-2">
            <span class="text-sm font-medium text-gray-500">Status:</span>
            <span class="inline-flex items-center font-medium rounded-full border px-2.5 py-1.5 text-sm bg-green-100 text-green-800 border-green-200 ml-2">
              <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Genehmigt
            </span>
          </div>
          <div class="mb-3">
            <span class="text-sm font-medium text-gray-500">Eingereicht:</span>
            <span class="text-sm text-gray-900 ml-2">18.08.2025 09:15</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex space-x-1">
              <input type="checkbox" class="w-4 h-4 text-red-600 border-gray-300 rounded" />
            </div>
            ${quickActionButtonsTemplate({ 
              event_id: '456', 
              current_status: 'published', 
              show_approve: true, 
              show_reject: true, 
              compact: true,
              csrf_token: 'sample_token'
            })}
          </div>
        </div>
      </div>
    </div>
  `,
};

export const AccessibilityDemo = {
  render: () => `
    <div class="p-4 bg-gray-50">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Accessibility & Swiss Compliance Demo</h3>
      
      <div class="space-y-6">
        <!-- eCH-0059 Touch Targets -->
        <div class="bg-white p-4 rounded-lg border">
          <h4 class="text-base font-semibold text-gray-900 mb-3">eCH-0059 Touch Targets (44px minimum)</h4>
          <div class="flex items-center space-x-4">
            ${quickActionButtonsTemplate({ 
              event_id: '123', 
              current_status: 'draft', 
              show_approve: true, 
              show_reject: true, 
              compact: false,
              csrf_token: 'sample_token'
            })}
          </div>
          <p class="text-sm text-gray-600 mt-2">All buttons meet 44px minimum touch target requirements</p>
        </div>
        
        <!-- High Contrast Mode -->
        <div class="bg-white p-4 rounded-lg border" style="filter: contrast(2);">
          <h4 class="text-base font-semibold text-gray-900 mb-3">High Contrast Mode Simulation</h4>
          <div class="flex items-center space-x-4">
            ${quickActionButtonsTemplate({ 
              event_id: '456', 
              current_status: 'draft', 
              show_approve: true, 
              show_reject: true, 
              compact: false,
              csrf_token: 'sample_token'
            })}
          </div>
          <p class="text-sm text-gray-600 mt-2">Buttons remain clearly visible in high contrast mode</p>
        </div>
        
        <!-- Focus States -->
        <div class="bg-white p-4 rounded-lg border">
          <h4 class="text-base font-semibold text-gray-900 mb-3">Focus Ring Indicators</h4>
          <div class="flex items-center space-x-4">
            <button class="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 min-h-[44px] min-w-[44px]" style="outline: 2px solid #dc2626; outline-offset: 2px;">
              <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="hidden sm:inline">Genehmigen</span>
            </button>
            <button class="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 min-h-[44px] min-w-[44px]">
              <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <span class="hidden sm:inline">Ablehnen</span>
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-2">Clear focus indicators for keyboard navigation (first button shows focus state)</p>
        </div>
        
        <!-- Screen Reader Content -->
        <div class="bg-white p-4 rounded-lg border">
          <h4 class="text-base font-semibold text-gray-900 mb-3">Screen Reader Accessibility</h4>
          <div class="flex items-center space-x-4">
            ${quickActionButtonsTemplate({ 
              event_id: '789', 
              current_status: 'draft', 
              show_approve: true, 
              show_reject: true, 
              compact: false,
              csrf_token: 'sample_token'
            })}
          </div>
          <div class="text-sm text-gray-600 mt-2">
            <p><strong>ARIA Labels:</strong></p>
            <ul class="list-disc list-inside space-y-1 mt-1">
              <li>"Veranstaltung genehmigen: Event 789"</li>
              <li>"Veranstaltung ablehnen: Event 789"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
};