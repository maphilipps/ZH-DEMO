// phpcs:ignoreFile

import Component from './damage-report-card.twig';

const meta = {
  title: 'Municipal/Damage Report Card',
  component: Component,
  argTypes: {
    submission_id: {
      name: 'Submission ID',
      description: 'Unique identifier for the submission',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      name: 'Title',
      description: 'Brief title or damage type',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'Description',
      description: 'Damage description or location',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    status: {
      name: 'Status',
      description: 'Current workflow status',
      control: { type: 'select' },
      options: ['neu', 'in_bearbeitung', 'erledigt', 'abgelehnt'],
      table: {
        type: { summary: 'enum' },
      },
    },
    priority: {
      name: 'Priority',
      description: 'Damage priority level',
      control: { type: 'select' },
      options: ['niedrig', 'mittel', 'hoch', 'notfall'],
      table: {
        type: { summary: 'enum' },
      },
    },
    damage_type: {
      name: 'Damage Type',
      description: 'Type of infrastructure damage',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    location: {
      name: 'Location',
      description: 'Damage location or address',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    created_date: {
      name: 'Created Date',
      description: 'Submission date (DD.MM.YYYY format)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    thumbnail_url: {
      name: 'Thumbnail URL',
      description: 'URL to damage photo thumbnail',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    thumbnail_alt: {
      name: 'Thumbnail Alt Text',
      description: 'Alt text for damage photo',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    assigned_to: {
      name: 'Assigned To',
      description: 'Municipal staff member assigned',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    action_url: {
      name: 'Action URL',
      description: 'Link to detailed view or edit page',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    modifier: {
      name: 'Modifier Classes',
      description: 'Additional CSS classes',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Damage Report Card component for displaying Infrastructure Damage Reports in dashboard list views.

## TWIG Usage

\`\`\`twig
{# Basic damage report card #}
{% include 'sdc:damage-report-card' with {
  submission_id: 'IDR-2024-001',
  title: 'Schlagloch Hauptstraße',
  status: 'neu',
  priority: 'hoch'
} %}

{# Complete card with all metadata #}
{% include 'sdc:damage-report-card' with {
  submission_id: 'IDR-2024-002',
  title: 'Defekte Straßenbeleuchtung',
  description: 'Lampe flackert seit einer Woche',
  status: 'in_bearbeitung',
  priority: 'mittel',
  damage_type: 'Beleuchtung',
  location: 'Seestraße 15',
  created_date: '15.01.2024',
  thumbnail_url: '/path/to/image.jpg',
  thumbnail_alt: 'Defekte Straßenlampe',
  assigned_to: 'M. Müller',
  action_url: '/admin/infrastructure/damage-reports/2'
} %}
\`\`\`

## Features

- **Visual Priority Indicators**: Color-coded badges for niedrig/mittel/hoch/notfall
- **Status Integration**: Uses status-badge component for workflow visualization  
- **Photo Thumbnails**: Displays damage photos with fallback placeholder
- **Municipal Metadata**: Location, damage type, assignment information
- **Responsive Layout**: Optimized for desktop and mobile dashboard views
- **Accessibility**: Proper ARIA labels, alt texts, and keyboard navigation
- **Swiss Formatting**: DD.MM.YYYY dates, German language labels

Perfect for municipal staff dashboards showing lists of infrastructure damage reports.
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default Damage Report Card
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    submission_id: 'IDR-2024-001',
    title: 'Schlagloch Hauptstraße',
    description: 'Großes Schlagloch auf der Fahrbahn, Gefahr für Radfahrer',
    status: 'neu',
    priority: 'hoch',
    damage_type: 'Straße',
    location: 'Hauptstraße 42',
    created_date: '15.01.2024',
    thumbnail_alt: 'Schlagloch auf Hauptstraße',
  },
};

// With Photo Thumbnail
export const WithPhoto = {
  args: {
    submission_id: 'IDR-2024-005',
    title: 'Defekte Straßenbeleuchtung',
    description: 'Straßenlampe flackert seit einer Woche, teilweise völlig dunkel',
    status: 'in_bearbeitung',
    priority: 'mittel',
    damage_type: 'Beleuchtung',
    location: 'Seestraße 15',
    created_date: '12.01.2024',
    thumbnail_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEw0NCA0NEwyMCA0NFYyMFoiIGZpbGw9IiNEMUQ1REIiLz4KPGJ0ZXh0IHg9IjMyIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjI2N0ZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QSE9UTzwvdGV4dD4KPC9zdmc+',
    thumbnail_alt: 'Defekte Straßenlampe',
    assigned_to: 'M. Müller',
  },
};

// All Priority Levels
export const PriorityLevels = {
  render: () => `
    <div class="space-y-4 max-w-2xl">
      <div class="damage-report-card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <h3 class="text-base font-semibold text-gray-900 truncate">Kleine Unebenheit Gehweg</h3>
                <p class="text-sm text-gray-500">ID: IDR-2024-010 · 18.01.2024</p>
              </div>
              <div class="ml-2 flex-shrink-0">
                <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                  Niedrig
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">Kleine Unebenheit im Gehweg, nicht dringend</p>
          </div>
          <div class="flex-shrink-0">
            <span class="inline-flex items-center text-xs font-medium rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 px-2 py-0.5">Neu</span>
          </div>
        </div>
      </div>
      
      <div class="damage-report-card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <h3 class="text-base font-semibold text-gray-900 truncate">Riss im Asphalt</h3>
                <p class="text-sm text-gray-500">ID: IDR-2024-011 · 17.01.2024</p>
              </div>
              <div class="ml-2 flex-shrink-0">
                <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Mittel
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">Mittlerer Riss in der Fahrbahn</p>
          </div>
          <div class="flex-shrink-0">
            <span class="inline-flex items-center text-xs font-medium rounded-md bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border border-orange-200 px-2 py-0.5">In Bearbeitung</span>
          </div>
        </div>
      </div>

      <div class="damage-report-card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <h3 class="text-base font-semibold text-gray-900 truncate">Großes Schlagloch</h3>
                <p class="text-sm text-gray-500">ID: IDR-2024-012 · 16.01.2024</p>
              </div>
              <div class="ml-2 flex-shrink-0">
                <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800 border border-orange-300">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                  Hoch
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">Gefährliches Schlagloch auf Hauptverkehrsstraße</p>
          </div>
          <div class="flex-shrink-0">
            <span class="inline-flex items-center text-xs font-medium rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 px-2 py-0.5">Erledigt</span>
          </div>
        </div>
      </div>

      <div class="damage-report-card bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <h3 class="text-base font-semibold text-gray-900 truncate">Gasleitung beschädigt</h3>
                <p class="text-sm text-gray-500">ID: IDR-2024-013 · 15.01.2024</p>
              </div>
              <div class="ml-2 flex-shrink-0">
                <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 border border-red-300 animate-pulse">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
                  Notfall
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">Akute Gefahr durch beschädigte Gasleitung</p>
          </div>
          <div class="flex-shrink-0">
            <span class="inline-flex items-center text-xs font-medium rounded-md bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border border-orange-200 px-2 py-0.5">In Bearbeitung</span>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All priority levels with appropriate color coding and icons.',
      },
    },
  },
};

// With Assignment and Actions
export const WithAssignment = {
  args: {
    submission_id: 'IDR-2024-003',
    title: 'Defektes Verkehrsschild',
    description: 'Stop-Schild ist verbogen und schlecht lesbar',
    status: 'in_bearbeitung',
    priority: 'mittel',
    damage_type: 'Verkehrsschild',
    location: 'Kreuzung Bahnhofstraße/Schulstraße',
    created_date: '14.01.2024',
    assigned_to: 'Hans Muster',
  },
};

// Emergency Priority
export const EmergencyReport = {
  args: {
    submission_id: 'IDR-2024-999',
    title: 'Gasleitung beschädigt',
    description: 'Akute Gefahr durch beschädigte Gasleitung nach Bauarbeiten',
    status: 'in_bearbeitung',
    priority: 'notfall',
    damage_type: 'Versorgungsleitung',
    location: 'Industriestraße 8',
    created_date: '20.01.2024',
    assigned_to: 'Notfalldienst',
  },
  parameters: {
    docs: {
      description: {
        story: 'Emergency priority report with animated warning badge.',
      },
    },
  },
};

// Completed Report
export const CompletedReport = {
  args: {
    submission_id: 'IDR-2024-004',
    title: 'Reparierte Straßenbeleuchtung',
    description: 'Defekte LED-Leuchte wurde erfolgreich ausgetauscht',
    status: 'erledigt',
    priority: 'mittel',
    damage_type: 'Beleuchtung',
    location: 'Parkstraße 22',
    created_date: '10.01.2024',
    assigned_to: 'E. Weber',
  },
};

// Clickable Card with URL
export const ClickableCard = {
  args: {
    submission_id: 'IDR-2024-006',
    title: 'Beschädigte Bushaltestelle',
    description: 'Glasscheibe der Wartehalle ist zerbrochen',
    status: 'neu',
    priority: 'hoch',
    damage_type: 'ÖPNV',
    location: 'Haltestelle Rathaus',
    created_date: '19.01.2024',
    action_url: '/admin/infrastructure/damage-reports/6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with action_url becomes a clickable link to detailed view.',
      },
    },
  },
};

// LOTR Themed Report (Demo Data Style)
export const DemoReport = {
  args: {
    submission_id: 'IDR-2024-007',
    title: 'Straßenschaden am Weg nach Rohan',
    description: 'Große Risse in der Straße, vermutlich durch schwere Reiterkolonnen verursacht',
    status: 'neu',
    priority: 'hoch',
    damage_type: 'Straße',
    location: 'Rohirrim-Allee 42',
    created_date: '18.01.2024',
    assigned_to: 'Éomer Straßenbau',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example using LOTR-themed demo data for presentation appeal.',
      },
    },
  },
};

// Playground
export const Playground = {
  args: {
    submission_id: 'IDR-2024-001',
    title: 'Schlagloch Hauptstraße',
    description: 'Großes Schlagloch auf der Fahrbahn',
    status: 'neu',
    priority: 'hoch',
    damage_type: 'Straße',
    location: 'Hauptstraße 42',
    created_date: '15.01.2024',
    thumbnail_url: '',
    thumbnail_alt: 'Schadensfoto',
    assigned_to: '',
    action_url: '',
    modifier: '',
  },
};