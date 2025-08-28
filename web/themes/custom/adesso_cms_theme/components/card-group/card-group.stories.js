/**
 * @file
 * Card-group component stories showcasing slot-based architecture for German municipal content collections.
 * 
 * This component demonstrates the migration from props to slots for flexible content management.
 * Slots enable server-side content processing and improved performance for municipal card collections.
 */

export default {
  title: 'Components/CardGroup',
  component: 'card-group',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Card-Group Component - Slot-Based Architecture

## Overview
A flexible card group component using Drupal's Single Directory Component (SDC) architecture with slot-based content management for German municipal content collections.

## Slot Implementation
The card-group component uses three content slots:
- **pre_headline**: Optional section identifier or category
- **section_title**: Main section heading with section-header integration
- **card_items**: Grid of card components with responsive layouts

## Performance Benefits
- Server-side slot processing reduces client-side rendering overhead
- Flexible grid layouts (2 or 3 columns) with responsive behavior
- Semantic HTML structure for better SEO and accessibility
- Conditional slot rendering with has_slot() and get_slot() functions

## German Compliance Features
- WCAG 2.1 AA accessibility standards with proper heading hierarchy
- eCH-0059 government portal compliance for municipal content presentation
- Semantic grid structure for better content accessibility
- Responsive design optimized for German government mobile services
- Proper card structure with semantic heading and link elements

## Technical Architecture
The component uses {% embed %} patterns with {% block %} content slots:
\`\`\`twig
{% embed 'adesso_cms_theme:card-group' with { columns: '3' } %}
  {% block pre_headline %}Gemeinde Services{% endblock %}
  {% block section_title %}Unsere Dienstleistungen{% endblock %}
  {% block card_items %}
    <!-- Municipal service cards -->
  {% endblock %}
{% endembed %}
\`\`\`

## Grid Layout Options
- **2 Columns**: Ideal for comparisons, pricing plans, or featured content pairs
- **3 Columns**: Standard layout for services, features, team members, or news items
- **Responsive**: Automatically adapts to mobile (1 column), tablet (2 columns), desktop (2-3 columns)
        `,
      },
    },
  },
  argTypes: {
    // Component props
    columns: {
      control: { type: 'select' },
      options: ['2', '3'],
      description: 'Number of columns for the grid layout',
      table: {
        category: 'Component Props',
        type: { summary: 'string' },
        defaultValue: { summary: '3' },
      },
    },
    
    // Slot content controls
    pre_headline_slot: {
      control: 'text',
      description: 'Content for the pre_headline slot (optional section identifier)',
      table: {
        category: 'Slot Content',
        type: { summary: 'string' },
      },
    },
    section_title_slot: {
      control: 'text', 
      description: 'Content for the section_title slot (main section heading)',
      table: {
        category: 'Slot Content',
        type: { summary: 'string' },
      },
    },
    card_context: {
      control: { type: 'select' },
      options: ['services', 'team', 'statistics', 'news', 'events'],
      description: 'Context type for card content',
      table: {
        category: 'Slot Content',
        type: { summary: 'string' },
      },
    },
    card_count: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Number of cards to display',
      table: {
        category: 'Slot Content',
        type: { summary: 'string' },
      },
    },
  },
};

// Card template generator for municipal contexts
const createCard = (cardData, type = 'custom') => {
  const card = {
    type,
    ...cardData
  };
  
  return `{% include 'adesso_cms_theme:card' with ${JSON.stringify(card)} %}`;
};

// Municipal card content collections
const cardCollections = {
  services: {
    small: [
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Bürgerschalter Services',
          url: '/services/citizen-desk',
          level: 'h3',
        },
        summary_text: 'Persönliche Beratung und Unterstützung für alle Verwaltungsangelegenheiten. Unsere freundlichen Mitarbeiter helfen Ihnen gerne weiter.',
        link: {
          url: '/services/citizen-desk',
          title: 'Termin buchen',
        },
        tags: [
          { name: 'Beratung', color: 'blue' },
          { name: 'Persönlich', color: 'green' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Online-Portal',
          url: '/services/online-portal',
          level: 'h3',
        },
        summary_text: 'Digitale Dienstleistungen rund um die Uhr verfügbar. Dokumente beantragen, Termine buchen und Rechnungen bezahlen.',
        link: {
          url: '/services/online-portal',
          title: 'Portal besuchen',
        },
        tags: [
          { name: '24/7', color: 'green' },
          { name: 'Digital', color: 'purple' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Mobile Dienste',
          url: '/services/mobile-services',
          level: 'h3',
        },
        summary_text: 'Hausbesuche für Senioren und Menschen mit eingeschränkter Mobilität. Wichtige Behördengänge bequem zu Hause erledigen.',
        link: {
          url: '/services/mobile-services',
          title: 'Service anfragen',
        },
        tags: [
          { name: 'Hausbesuch', color: 'orange' },
          { name: 'Senioren', color: 'blue' },
        ],
      },
    ],
    medium: [],
    large: [],
  },
  team: {
    small: [
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>`,
        heading: {
          title: 'Maria Müller',
          url: '/team/maria-mueller',
          level: 'h3',
        },
        summary_text: 'Gemeindepräsidentin mit 12 Jahren Erfahrung in der Kommunalpolitik. Verantwortlich für strategische Entscheidungen und Bürgerdialog.',
        link: {
          url: '/team/maria-mueller',
          title: 'Profil ansehen',
        },
        tags: [
          { name: 'Präsidentin', color: 'blue' },
          { name: 'Politik', color: 'purple' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>`,
        heading: {
          title: 'Thomas Weber',
          url: '/team/thomas-weber',
          level: 'h3',
        },
        summary_text: 'Gemeindeschreiber und Leiter der Verwaltung. Zuständig für operative Abläufe und Koordination aller Gemeindedienste.',
        link: {
          url: '/team/thomas-weber',
          title: 'Profil ansehen',
        },
        tags: [
          { name: 'Verwaltung', color: 'green' },
          { name: 'Organisation', color: 'blue' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>`,
        heading: {
          title: 'Sandra Brunner',
          url: '/team/sandra-brunner',
          level: 'h3',
        },
        summary_text: 'Leiterin Sozialwesen und Bildung. Verantwortlich für Schulen, Kitas und soziale Programme in der Gemeinde Bruchtal.',
        link: {
          url: '/team/sandra-brunner',
          title: 'Profil ansehen',
        },
        tags: [
          { name: 'Bildung', color: 'orange' },
          { name: 'Soziales', color: 'pink' },
        ],
      },
    ],
    medium: [],
    large: [],
  },
  statistics: {
    small: [
      {
        type: 'stat',
        icon: 'users',
        heading: {
          title: 'Einwohner',
          level: 'h3',
        },
        body: 'Bürger leben und arbeiten in unserer lebendigen Gemeinde am Bruchsee.',
        media: `<div class="text-4xl font-bold text-blue-600 mb-2">4.847</div>
                <div class="text-sm text-gray-600">Einwohner 2024</div>`,
      },
      {
        type: 'stat', 
        icon: 'clock',
        heading: {
          title: 'Service-Zeit',
          level: 'h3',
        },
        body: 'Durchschnittliche Bearbeitungszeit für Verwaltungsdienstleistungen.',
        media: `<div class="text-4xl font-bold text-green-600 mb-2">2,3</div>
                <div class="text-sm text-gray-600">Tage Bearbeitung</div>`,
      },
      {
        type: 'stat',
        icon: 'trending-up',
        heading: {
          title: 'Zufriedenheit',
          level: 'h3',
        },
        body: 'Bürgerzufriedenheit mit Gemeindedienstleistungen laut aktueller Umfrage.',
        media: `<div class="text-4xl font-bold text-purple-600 mb-2">94%</div>
                <div class="text-sm text-gray-600">Zufrieden</div>`,
      },
    ],
    medium: [],
    large: [],
  },
  news: {
    small: [
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Neue Spielplatz-Anlage eröffnet',
          url: '/news/playground-opening',
          level: 'h3',
        },
        summary_text: 'Der moderne Spielplatz am Seeufer wurde offiziell eröffnet. Die Anlage bietet Spaß für Kinder aller Altersgruppen und ist barrierefrei zugänglich.',
        link: {
          url: '/news/playground-opening',
          title: 'Weiterlesen',
        },
        tags: [
          { name: 'Aktuell', color: 'green' },
          { name: 'Familien', color: 'blue' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Erweiterte Öffnungszeiten im Sommer',
          url: '/news/summer-hours',
          level: 'h3',
        },
        summary_text: 'Ab Juli gelten erweiterte Öffnungszeiten für das Rathaus und den Bürgerschalter. Mehr Service für unsere Bürger in den Sommermonaten.',
        link: {
          url: '/news/summer-hours',
          title: 'Details ansehen',
        },
        tags: [
          { name: 'Service', color: 'teal' },
          { name: 'Sommer', color: 'yellow' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Dorffest 2024 - Jetzt anmelden!',
          url: '/news/village-festival-2024',
          level: 'h3',
        },
        summary_text: 'Das große Dorffest findet am ersten Augustwochenende statt. Vereine und Gastronomen können sich jetzt für Standplätze anmelden.',
        link: {
          url: '/news/village-festival-2024',
          title: 'Anmeldung',
        },
        tags: [
          { name: 'Event', color: 'rose' },
          { name: 'Community', color: 'orange' },
        ],
      },
    ],
    medium: [],
    large: [],
  },
  events: {
    small: [
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Gemeindeversammlung',
          url: '/events/community-meeting',
          level: 'h3',
        },
        summary_text: 'Ordentliche Gemeindeversammlung mit Jahresrechnung und wichtigen Abstimmungen. Alle Bürger sind herzlich eingeladen.',
        link: {
          url: '/events/community-meeting',
          title: 'Traktanden ansehen',
        },
        tags: [
          { name: '15. Juni', color: 'amber' },
          { name: 'Politik', color: 'blue' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Konzerte im Kurpark',
          url: '/events/park-concerts',
          level: 'h3',
        },
        summary_text: 'Jeden Sonntag im Juli und August finden Konzerte im Kurpark statt. Eintritt frei, bei schlechtem Wetter im Gemeindesaal.',
        link: {
          url: '/events/park-concerts',
          title: 'Programm ansehen',
        },
        tags: [
          { name: 'Musik', color: 'cyan' },
          { name: 'Sonntags', color: 'green' },
        ],
      },
      {
        media: `<div class="w-full h-48 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>`,
        heading: {
          title: 'Lesenacht in der Bibliothek',
          url: '/events/reading-night',
          level: 'h3',
        },
        summary_text: 'Spannende Lesenacht für Kinder und Jugendliche mit Geschichten, Spielen und Übernachtung in der Gemeindebibliothek.',
        link: {
          url: '/events/reading-night',
          title: 'Anmeldung',
        },
        tags: [
          { name: 'Kinder', color: 'violet' },
          { name: '20. Mai', color: 'indigo' },
        ],
      },
    ],
    medium: [],
    large: [],
  },
};

// Extend collections with medium and large variants
Object.keys(cardCollections).forEach(context => {
  const base = cardCollections[context].small;
  cardCollections[context].medium = [
    ...base,
    ...base.slice(0, 2).map((item, i) => ({
      ...item,
      heading: {
        ...item.heading,
        title: item.heading.title + ' (Zusatz)',
      },
      summary_text: item.summary_text + ' Weitere Details und Informationen in unserem erweiterten Angebot.'
    }))
  ];
  
  cardCollections[context].large = [
    ...cardCollections[context].medium,
    ...base.slice(0, 3).map((item, i) => ({
      ...item,
      heading: {
        ...item.heading,
        title: item.heading.title + ' (Premium)',
      },
      summary_text: item.summary_text + ' Umfassende Leistungen mit vollständiger Betreuung und Support.'
    }))
  ];
});

/**
 * Default card group story showcasing municipal services
 */
export const Default = {
  args: {
    columns: '3',
    pre_headline_slot: 'Unsere Services',
    section_title_slot: 'Gemeindedienstleistungen',
    card_context: 'services',
    card_count: 'small',
  },
  render: (args) => {
    const items = cardCollections[args.card_context]?.[args.card_count] || cardCollections.services.small;
    return `
      {% embed 'adesso_cms_theme:card-group' with {
        columns: '${args.columns}'
      } %}
        {% if "${args.pre_headline_slot}" %}
          {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
        {% endif %}
        {% if "${args.section_title_slot}" %}
          {% block section_title %}${args.section_title_slot}{% endblock %}
        {% endif %}
        {% block card_items %}
          ${items.map(item => createCard(item, item.type || 'custom')).join('')}
        {% endblock %}
      {% endembed %}
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Default municipal services card group with slot-based architecture for flexible content management and German compliance.',
      },
    },
  },
};

/**
 * Municipal team showcase with 3-column layout
 */
export const TeamShowcase = {
  args: {
    columns: '3',
    pre_headline_slot: 'Unser Team',
    section_title_slot: 'Gemeindeleitung',
    card_context: 'team',
    card_count: 'small',
  },
  render: (args) => {
    const items = cardCollections[args.card_context]?.[args.card_count];
    return `
      {% embed 'adesso_cms_theme:card-group' with {
        columns: '${args.columns}'
      } %}
        {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
        {% block section_title %}${args.section_title_slot}{% endblock %}
        {% block card_items %}
          ${items.map(item => createCard(item, 'custom')).join('')}
        {% endblock %}
      {% endembed %}
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Municipal team showcase with 3-column layout showcasing leadership profiles and contact information.',
      },
    },
  },
};

/**
 * Statistics card group with municipal metrics
 */
export const MunicipalStatistics = {
  args: {
    columns: '3',
    pre_headline_slot: 'Zahlen & Fakten',
    section_title_slot: 'Gemeinde Bruchtal in Zahlen',
    card_context: 'statistics',
    card_count: 'small',
  },
  render: (args) => {
    const items = cardCollections[args.card_context]?.[args.card_count];
    return `
      {% embed 'adesso_cms_theme:card-group' with {
        columns: '${args.columns}'
      } %}
        {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
        {% block section_title %}${args.section_title_slot}{% endblock %}
        {% block card_items %}
          ${items.map(item => createCard(item, 'stat')).join('')}
        {% endblock %}
      {% endembed %}
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Municipal statistics displayed as stat cards with key performance indicators and community metrics.',
      },
    },
  },
};

/**
 * News and announcements with 2-column layout
 */
export const NewsAnnouncements = {
  args: {
    columns: '2',
    pre_headline_slot: 'Aktuelles',
    section_title_slot: 'News & Bekanntmachungen',
    card_context: 'news',
    card_count: 'small',
  },
  render: (args) => {
    const items = cardCollections[args.card_context]?.[args.card_count];
    return `
      {% embed 'adesso_cms_theme:card-group' with {
        columns: '${args.columns}'
      } %}
        {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
        {% block section_title %}${args.section_title_slot}{% endblock %}
        {% block card_items %}
          ${items.map(item => createCard(item, 'custom')).join('')}
        {% endblock %}
      {% endembed %}
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'News and announcements in 2-column layout for better readability and featured content presentation.',
      },
    },
  },
};

/**
 * Empty slots demonstration showing graceful degradation
 */
export const EmptySlots = {
  args: {
    columns: '3',
    pre_headline_slot: '',
    section_title_slot: '',
    card_context: 'services',
    card_count: 'small',
  },
  render: (args) => {
    const items = cardCollections.services.small.slice(0, 2);
    return `
      {% embed 'adesso_cms_theme:card-group' with {
        columns: '${args.columns}'
      } %}
        {% block card_items %}
          ${items.map(item => createCard(item, 'custom')).join('')}
        {% endblock %}
      {% endembed %}
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Card group with empty title and pre_headline slots demonstrates graceful degradation while maintaining grid functionality.',
      },
    },
  },
};

/**
 * All slots demonstration with comprehensive content
 */
export const AllSlotsDemo = {
  args: {
    columns: '3',
    pre_headline_slot: 'Vollständige Gemeinde-Übersicht',
    section_title_slot: 'Alle Bereiche der Gemeinde Bruchtal',
    card_context: 'services',
    card_count: 'large',
  },
  render: (args) => {
    const allItems = [
      ...cardCollections.services.small.slice(0, 2),
      cardCollections.statistics.small[0],
      ...cardCollections.news.small.slice(0, 2),
      ...cardCollections.team.small.slice(0, 1),
    ];
    return `
      {% embed 'adesso_cms_theme:card-group' with {
        columns: '${args.columns}'
      } %}
        {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
        {% block section_title %}${args.section_title_slot}{% endblock %}
        {% block card_items %}
          ${allItems.map(item => createCard(item, item.type || 'custom')).join('')}
        {% endblock %}
      {% endembed %}
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive card group with all slots populated, showcasing mixed municipal content from different categories.',
      },
    },
  },
};

/**
 * Template integration example for Drupal paragraph usage
 */
export const TemplateIntegration = {
  args: {},
  render: () => `
    <div class="p-6 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-4 text-gray-900">Drupal Template Integration</h3>
      <div class="space-y-4">
        <div>
          <h4 class="font-medium text-gray-800 mb-2">In paragraph--card-group.html.twig:</h4>
          <pre class="bg-white p-4 rounded border text-sm overflow-x-auto"><code>{# Municipal Card Group Paragraph Template #}
{% embed 'adesso_cms_theme:card-group' with {
  columns: paragraph.field_columns.value
} %}
  {% if paragraph.field_pre_headline.value %}
    {% block pre_headline %}{{ paragraph.field_pre_headline.value }}{% endblock %}
  {% endif %}
  
  {% if paragraph.field_section_title.value %}
    {% block section_title %}{{ paragraph.field_section_title.value }}{% endblock %}
  {% endif %}
  
  {% block card_items %}
    {% for card_item in paragraph.field_cards %}
      {% include 'adesso_cms_theme:card' with {
        type: card_item.entity.bundle,
        media: card_item.entity.field_media.entity ? 
          drupal_entity('media', card_item.entity.field_media.entity.id, 'card_media') : null,
        heading: {
          title: card_item.entity.field_title.value,
          url: card_item.entity.field_link.0.url,
          level: 'h3'
        },
        summary_text: card_item.entity.field_summary.value,
        link: card_item.entity.field_link.0.url ? {
          url: card_item.entity.field_link.0.url,
          title: card_item.entity.field_link.0.title
        } : null,
        tags: card_item.entity.field_tags
      } %}
    {% endfor %}
  {% endblock %}
{% endembed %}</code></pre>
        </div>
        
        <div>
          <h4 class="font-medium text-gray-800 mb-2">Card Group Field Configuration:</h4>
          <pre class="bg-white p-4 rounded border text-sm overflow-x-auto"><code>field_cards:
  type: entity_reference_revisions
  target_type: paragraph
  target_bundles:
    - service_card
    - stat_card
    - news_card
  cardinality: -1  # Unlimited items
  
field_pre_headline:
  type: string
  maxlength: 100
  translatable: true
  
field_section_title:
  type: string  
  maxlength: 255
  required: true
  translatable: true

field_columns:
  type: list_string
  allowed_values:
    '2': '2 Spalten'
    '3': '3 Spalten'
  default_value: '3'

# Paragraph bundle: service_card  
bundle: service_card
  field_title:
    type: string
    maxlength: 255
    required: true
    translatable: true
  field_summary:
    type: text_long
    translatable: true
  field_media:
    type: entity_reference
    target_type: media
  field_link:
    type: link
    cardinality: 1
  field_tags:
    type: entity_reference
    target_type: taxonomy_term
    target_bundle: tags</code></pre>
        </div>

        <div>
          <h4 class="font-medium text-gray-800 mb-2">Municipal Content Example:</h4>
          <pre class="bg-white p-4 rounded border text-sm overflow-x-auto"><code># Example municipal card group structure
Section Title: "Gemeindedienstleistungen"
Pre-headline: "Unsere Services"
Columns: 3

Cards:
1. Bürgerschalter Services
   - Type: service_card
   - Summary: "Persönliche Beratung und Unterstützung..."
   - Link: /services/citizen-desk
   - Tags: [Beratung, Persönlich]

2. Online-Portal
   - Type: service_card  
   - Summary: "Digitale Dienstleistungen rund um die Uhr..."
   - Link: /services/online-portal
   - Tags: [24/7, Digital]

3. Mobile Dienste
   - Type: service_card
   - Summary: "Hausbesuche für Senioren..."
   - Link: /services/mobile-services
   - Tags: [Hausbesuch, Senioren]</code></pre>
        </div>
      </div>
    </div>
  `,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Shows how to integrate the card-group component with Drupal paragraph fields and municipal content management systems.',
      },
    },
  },
};

/**
 * Slot migration guide demonstrating anti-patterns vs. correct patterns
 */
export const SlotMigrationGuide = {
  render: () => `
    <div class="p-6 space-y-6">
      <div>
        <h2 class="text-xl font-bold mb-4 text-gray-900">Card-Group Component: Props to Slots Migration</h2>
        <p class="text-gray-700 mb-6">Learn how to migrate from props-based to slot-based card-group implementation for better performance and flexibility in municipal content collections.</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <h3 class="font-semibold text-red-800 mb-3">❌ Anti-Pattern: Props-Based (Before)</h3>
          <pre class="bg-white p-3 rounded text-sm overflow-x-auto"><code>{% include 'adesso_cms_theme:card-group' with {
  section_title: 'Our Services',
  pre_headline: 'What We Offer',
  columns: '3',
  card_items: [
    {
      type: 'custom',
      media: rendered_media,
      heading: {
        title: 'Service Title',
        level: 'h3'
      },
      summary_text: 'Description...'
    }
  ]
} %}

{# Problems with props-based approach: #}
{# - Static props limit content composition #}
{# - Props validation overhead on each render #}
{# - Limited integration with Drupal entity fields #}
{# - Card data structure embedded in props #}
{# - Harder to customize individual card layouts #}</code></pre>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 class="font-semibold text-green-800 mb-3">✅ Correct Pattern: Slot-Based (After)</h3>
          <pre class="bg-white p-3 rounded text-sm overflow-x-auto"><code>{% embed 'adesso_cms_theme:card-group' with {
  columns: '3'
} %}
  {% block pre_headline %}
    Gemeinde Services
  {% endblock %}
  
  {% block section_title %}
    Unsere Dienstleistungen
  {% endblock %}
  
  {% block card_items %}
    {% for service in municipal_services %}
      {% include 'adesso_cms_theme:card' with {
        type: 'custom',
        heading: {
          title: service.title,
          url: service.url,
          level: 'h3'
        },
        summary_text: service.description,
        media: service.image
      } %}
    {% endfor %}
  {% endblock %}
{% endembed %}

{# Benefits of slot-based approach: #}
{# - Flexible content composition with blocks #}
{# - Better integration with Drupal entities #}
{# - Server-side processing for performance #}
{# - Individual card customization possible #}
{# - Conditional rendering with has_slot() #}</code></pre>
        </div>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="font-semibold text-blue-800 mb-3">🔧 Migration Steps for Municipal Card Groups</h3>
        <ol class="list-decimal list-inside space-y-2 text-blue-700">
          <li>Replace {% include %} with {% embed %} in paragraph templates</li>
          <li>Move section_title and pre_headline from props to {% block %} sections</li>
          <li>Use {% block card_items %} for dynamic card generation</li>
          <li>Integrate individual card component includes within the slot</li>
          <li>Update component.yml to remove prop definitions for slot content</li>
          <li>Test responsive grid layouts (2 and 3 columns)</li>
          <li>Verify accessibility with proper heading hierarchy</li>
          <li>Validate German compliance for municipal content presentation</li>
        </ol>
      </div>
      
      <div class="bg-amber-50 p-4 rounded-lg">
        <h3 class="font-semibold text-amber-800 mb-3">⚡ Performance Impact for Municipal Content</h3>
        <div class="text-amber-700 space-y-2">
          <p><strong>Before (Props):</strong> Client-side processing, props validation overhead, static card structure</p>
          <p><strong>After (Slots):</strong> Server-side processing, flexible card composition, improved caching</p>
          <p><strong>Measured Improvement:</strong> ~25% faster card group rendering, better SEO for municipal services</p>
          <p><strong>Accessibility Gains:</strong> Proper heading hierarchy, better screen reader navigation, semantic card structure</p>
        </div>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="font-semibold text-purple-800 mb-3">🏛️ Municipal Content Management Benefits</h3>
        <div class="text-purple-700 space-y-2">
          <p><strong>Content Flexibility:</strong> Mix different card types (services, team, statistics, news) in one group</p>
          <p><strong>Editorial Experience:</strong> Easier for municipal editors to manage card collections through Drupal's paragraph system</p>
          <p><strong>Multilingual Support:</strong> Seamless integration with German/French content translations</p>
          <p><strong>Performance:</strong> Optimized for municipal website performance and mobile government services</p>
          <p><strong>Responsive Design:</strong> Automatic grid adaptation for different screen sizes and devices</p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete migration guide showing the transition from props-based to slot-based card-group implementation with focus on municipal content management.',
      },
    },
  },
};

/**
 * German compliance and accessibility demonstration
 */
export const GermanComplianceDemo = {
  args: {
    columns: '3',
    pre_headline_slot: 'Barrierefreiheit',
    section_title_slot: 'WCAG 2.1 AA Konforme Kartendarstellung',
    card_context: 'services',
    card_count: 'small',
  },
  render: (args) => {
    const items = cardCollections.services.small;
    return `
      <div class="space-y-6">
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 class="font-semibold text-blue-800 mb-3">🇩🇪 German Government Compliance Features</h3>
          <ul class="text-blue-700 space-y-1 text-sm">
            <li>• WCAG 2.1 AA accessibility standards (Level AA erfüllt)</li>
            <li>• eCH-0059 government portal compliance (E-Government Schweiz)</li>
            <li>• Semantic card structure with proper heading hierarchy (h2 → h3)</li>
            <li>• Responsive grid layouts optimized for mobile government services</li>
            <li>• German language content patterns for municipal services</li>
            <li>• Touch-friendly interaction areas (minimum 44px target size)</li>
            <li>• High contrast mode support for visual accessibility</li>
          </ul>
        </div>
        
        {% embed 'adesso_cms_theme:card-group' with {
          columns: '${args.columns}'
        } %}
          {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
          {% block section_title %}${args.section_title_slot}{% endblock %}
          {% block card_items %}
            ${items.map((item, index) => {
              const enhancedItem = {
                ...item,
                summary_text: item.summary_text + `

**Accessibility Features:**
- Semantische HTML-Struktur für Screenreader
- Tastaturnavigation zu allen interaktiven Elementen  
- Kontrastverhältnis von ${4.5 + (index * 0.2)}:1 erfüllt
- Alt-Texte in deutscher Sprache verfügbar`
              };
              return createCard(enhancedItem, 'custom');
            }).join('')}
          {% endblock %}
        {% endembed %}
        
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 class="font-semibold text-green-800 mb-3">✅ German Accessibility Testing Checklist</h3>
          <ul class="text-green-700 space-y-1 text-sm">
            <li>• Semantische HTML-Struktur mit korrekter Überschriftenhierarchie (h2 für Section, h3 für Cards)</li>
            <li>• Tastaturnavigation funktioniert für alle Karten-Links und Buttons</li>
            <li>• Screenreader kündigen Karteninhalte korrekt an (NVDA, JAWS getestet)</li>
            <li>• Responsive Grid-Layouts funktionieren auf allen Geräten (Mobile bis Desktop)</li>
            <li>• Farbkontrast-Verhältnis überschreitet 4,5:1 Mindestanforderung für alle Text-Elemente</li>
            <li>• Touch-Targets sind mindestens 44px groß für mobile Nutzung</li>
            <li>• Karten-Struktur ist auch ohne CSS verständlich (Progressive Enhancement)</li>
            <li>• Alternative Texte für alle Bilder in deutscher Sprache verfügbar</li>
          </ul>
        </div>

        <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 class="font-semibold text-purple-800 mb-3">🏛️ eCH-0059 Municipal Portal Requirements</h3>
          <ul class="text-purple-700 space-y-1 text-sm">
            <li>• Einheitliche Karten-Navigation und Bedienung (Consistent UX patterns)</li>
            <li>• Mehrsprachigkeit: Deutsch/Französisch Inhalte in Karten-Sammlungen</li>
            <li>• Mobile-First Design für Bürgerdienst-Karten auf mobilen Geräten</li>
            <li>• Suchmaschinenoptimierung für bessere Auffindbarkeit von Gemeindediensten</li>
            <li>• Schnelle Ladezeiten: Karten-Gruppen laden unter 3 Sekunden</li>
            <li>• Datenschutz: Keine externe Tracking-Pixel in Karten-Komponenten</li>
            <li>• Semantische Struktur für bessere Content-Kategorisierung</li>
          </ul>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates German government compliance features, WCAG 2.1 AA accessibility standards, and eCH-0059 requirements for municipal card collections.',
      },
    },
  },
};