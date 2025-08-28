// phpcs:ignoreFile

import Component from './stat-card.twig';

const meta = {
  title: 'Cards/StatCard',
  component: Component,
  argTypes: {
    // Slot content controls for Storybook demonstration
    heading_slot: {
      name: 'Heading Slot Content',
      description: 'Content for the heading slot - use {% embed %} blocks in templates',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Slots (Templates only)',
      },
    },
    // Props for Storybook demonstration
    type: {
      name: 'Type',
      description: 'Component type identifier',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    body: {
      name: 'Body',
      description: 'Descriptive text explaining the statistic',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    icon: {
      name: 'Icon',
      description: 'Material icon name for the statistic',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    media: {
      name: 'Media',
      description: 'Custom media HTML (SVG, image, etc.)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    modifier: {
      name: 'Modifier',
      description: 'Additional CSS modifier classes',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    border: {
      name: 'Border',
      description: 'Whether to show border styling',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    layout: {
      name: 'Layout',
      description: 'Layout variation: center, left',
      control: { type: 'select' },
      options: ['center', 'left'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
        category: 'Props',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# StatCard Component - Slot-Based Implementation

Statistic card component for displaying key metrics, KPIs, and data points with icons and descriptions.

## 🎯 Slot Migration Complete

This component has been **successfully migrated** from props to slots for better flexibility and German compliance. The \`heading\` is now implemented as a slot using \`has_slot()\` and \`get_slot()\` functions.

## 🚀 Drupal Template Usage (Recommended)

### Basic Slot-Based Usage
\`\`\`twig
{# Basic stat card with slot heading #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: 'Active Users',
  icon: 'people',
  layout: 'center'
} %}
  {% block heading %}2.5M+{% endblock %}
{% endembed %}

{# Stat card with rich heading content #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: 'Uptime Guarantee',
  media: '<svg class="w-8 h-8 text-green-500" fill="currentColor">...</svg>',
  layout: 'center',
  border: true
} %}
  {% block heading %}
    <span class="text-green-600">99.9%</span>
    <small class="block text-xs text-green-500">SLA Compliant</small>
  {% endblock %}
{% endembed %}

{# Municipal statistics with German formatting #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: 'Einwohner in Bruchtal',
  icon: 'groups',
  layout: 'center',
  modifier: 'bg-blue-50 text-blue-800'
} %}
  {% block heading %}
    <span class="text-blue-700 font-bold">12.847</span>
    <small class="block text-xs text-blue-600">Stand: {{ "now"|date("d.m.Y") }}</small>
  {% endblock %}
{% endembed %}
\`\`\`

### Paragraph Template Integration
\`\`\`twig
{# paragraph--stats-item.html.twig #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: content.field_stat_description,
  icon: content.field_icon_name,
  layout: content.field_layout.value,
  border: content.field_show_border,
  modifier: content.field_modifier_classes
} %}
  {% block heading %}
    {% if content.field_stat_value %}
      {{ content.field_stat_value }}
    {% endif %}
  {% endblock %}
{% endembed %}
\`\`\`

## 🔧 Storybook Props (For Demo Only)

Storybook stories use props for demonstration purposes, but real Drupal templates should use slots.

\`\`\`twig
{# Storybook usage only - NOT for production templates #}
{% include 'adesso_cms_theme:stat-card' with {
  heading: 'Demo Stat Value',
  body: 'Demo description',
  icon: 'analytics'
} %}
\`\`\`

## ✅ Migration Benefits

### Before (Props - Anti-pattern)
\`\`\`twig
{# OLD WAY - Static heading only #}
{% include 'sdc:stat-card' with {
  heading: '2.5M+',
  body: 'Active Users',
  icon: 'people'
} %}
\`\`\`

### After (Slots - Recommended)
\`\`\`twig
{# NEW WAY - Rich, dynamic heading content #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: 'Active Users',
  icon: 'people'
} %}
  {% block heading %}
    <span class="text-primary font-bold">2.5M+</span>
    <small class="block text-xs text-muted-foreground">Monthly Active</small>
    <div class="flex items-center gap-1 mt-1">
      <span class="text-green-500 text-xs">↗ +12%</span>
      <span class="text-xs text-gray-500">vs last month</span>
    </div>
  {% endblock %}
{% endembed %}
\`\`\`

## 🎨 Slot Pattern Advantages

- **Rich Content**: Slots support HTML, formatting, and dynamic content
- **Conditional Rendering**: Use \`has_slot()\` for smart heading detection
- **Performance**: Slots are processed server-side, improving render performance
- **German Compliance**: Better accessibility with semantic heading structure
- **Maintainability**: Consistent slot patterns across all card components

## 📊 German Municipal Use Cases

- **Population Statistics**: Einwohnerzahl, Haushalte, demografische Daten
- **Service Metrics**: Bearbeitungszeiten, Antragsstatus, Servicequalität
- **Budget Information**: Haushaltsdaten, Investitionen, Steueraufkommen
- **Environmental Data**: Energieverbrauch, CO2-Bilanz, Nachhaltigkeit
- **Public Services**: Öffnungszeiten, Verfügbarkeit, Nutzungsstatistiken

## 🏛️ eCH-0059 Compliance Features

- **Semantic Structure**: Proper heading hierarchy with aria-level support
- **Accessibility**: Screen reader friendly with role attributes
- **German Standards**: Text expansion support (25% buffer for German text)
- **Municipal Branding**: Consistent styling for government portals
- **Performance**: Optimized for municipal service delivery
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

// Default centered stat card
export const Default = {
  name: 'Default - Active Users',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Basic stat card with slot-based heading. In Drupal templates, use `{% embed %}` blocks instead of props.',
      },
    },
  },
  args: {
    heading_slot: '2.5M+',
    type: '',
    body: 'Active Users Worldwide',
    icon: 'people',
    media: '',
    modifier: '',
    border: false,
    layout: 'center',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      icon: "${args.icon}",
      media: "${args.media}",
      modifier: "${args.modifier}",
      border: ${args.border},
      layout: "${args.layout}",
      type: "${args.type}"
    } %}
      {% if "${args.heading_slot}" %}
        {% block heading %}<span class="text-2xl font-bold">${args.heading_slot}</span>{% endblock %}
      {% endif %}
    {% endembed %}
  `,
};

// Revenue growth with rich slot content
export const RevenueGrowth = {
  name: 'Revenue Growth - Rich Heading',
  parameters: {
    docs: {
      description: {
        story: 'Revenue growth stat demonstrating rich HTML content in heading slot with trend indicators and formatting.',
      },
    },
  },
  args: {
    heading_slot: '$1.2M',
    body: 'Revenue Growth This Quarter',
    icon: 'trending_up',
    layout: 'center',
    border: true,
    modifier: 'bg-green-50 text-green-800',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      icon: "${args.icon}",
      layout: "${args.layout}",
      border: ${args.border},
      modifier: "${args.modifier}"
    } %}
      {% block heading %}
        <span class="text-green-700 font-bold text-2xl">${args.heading_slot}</span>
        <div class="flex items-center justify-center gap-1 mt-2">
          <span class="text-green-600 text-sm font-medium">↗ +24%</span>
          <span class="text-green-500 text-xs">vs Q3</span>
        </div>
        <small class="text-green-600 text-xs block mt-1">Above target</small>
      {% endblock %}
    {% endembed %}
  `,
};

// German municipal statistics
export const MunicipalPopulation = {
  name: 'Municipal Population - German Standards',
  parameters: {
    docs: {
      description: {
        story: 'German municipal population statistics with proper German formatting and eCH-0059 compliance features.',
      },
    },
  },
  args: {
    heading_slot: '12.847',
    body: 'Einwohner in Bruchtal',
    icon: 'groups',
    layout: 'center',
    border: true,
    modifier: 'bg-blue-50 text-blue-800',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      icon: "${args.icon}",
      layout: "${args.layout}",
      border: ${args.border},
      modifier: "${args.modifier}"
    } %}
      {% block heading %}
        <span class="text-blue-700 font-bold text-2xl" role="heading" aria-level="3">
          ${args.heading_slot}
        </span>
        <div class="text-blue-600 text-xs mt-2">
          <div class="flex items-center justify-center gap-2">
            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">Stand: 28.08.2025</span>
          </div>
          <div class="flex items-center justify-center gap-1 mt-1">
            <span class="text-green-600">+127</span>
            <span class="text-blue-500">seit letztem Jahr</span>
          </div>
        </div>
      {% endblock %}
    {% endembed %}
  `,
};

// Performance metric with SLA compliance
export const PerformanceMetric = {
  name: 'Performance Metric - Service Level',
  parameters: {
    docs: {
      description: {
        story: 'Performance metric demonstrating service level compliance with German municipal service standards.',
      },
    },
  },
  args: {
    heading_slot: '45ms',
    type: 'performance',
    body: 'Average Response Time',
    icon: 'speed',
    layout: 'center',
    border: true,
    modifier: 'bg-blue-50 text-blue-800',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      icon: "${args.icon}",
      layout: "${args.layout}",
      border: ${args.border},
      modifier: "${args.modifier}",
      type: "${args.type}"
    } %}
      {% block heading %}
        <span class="text-blue-700 font-bold text-2xl">${args.heading_slot}</span>
        <div class="flex flex-wrap justify-center gap-1 mt-2">
          <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">SLA: &lt;100ms</span>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">99.9% Uptime</span>
        </div>
        <small class="text-blue-600 text-xs block mt-1">eCH-0059 Compliant</small>
      {% endblock %}
    {% endembed %}
  `,
};

// Customer satisfaction with emotional indicators
export const CustomerSatisfaction = {
  name: 'Customer Satisfaction - Emotional Context',
  parameters: {
    docs: {
      description: {
        story: 'Customer satisfaction metric with emotional context and visual satisfaction indicators.',
      },
    },
  },
  args: {
    heading_slot: '98%',
    body: 'Zufriedenheit der Bürger',
    icon: 'star',
    layout: 'center',
    border: false,
    modifier: 'bg-yellow-50 text-yellow-800',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      icon: "${args.icon}",
      layout: "${args.layout}",
      border: ${args.border},
      modifier: "${args.modifier}"
    } %}
      {% block heading %}
        <span class="text-yellow-700 font-bold text-2xl">${args.heading_slot}</span>
        <div class="flex justify-center gap-1 mt-2">
          <span class="text-lg">😊</span>
          <span class="text-lg">😊</span>
          <span class="text-lg">😊</span>
          <span class="text-lg">😊</span>
          <span class="text-lg">😐</span>
        </div>
        <div class="text-yellow-600 text-xs mt-2">
          <div class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded inline-block">
            Umfrage August 2025
          </div>
        </div>
      {% endblock %}
    {% endembed %}
  `,
};

// Left-aligned layout variation
export const LeftAligned = {
  name: 'Left Alignment - Project Success',
  parameters: {
    docs: {
      description: {
        story: 'Left-aligned layout demonstration with project completion statistics and achievement indicators.',
      },
    },
  },
  args: {
    heading_slot: '150+',
    body: 'Projekte erfolgreich abgeschlossen',
    icon: 'check_circle',
    layout: 'left',
    border: true,
    modifier: 'bg-purple-50 text-purple-800',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      icon: "${args.icon}",
      layout: "${args.layout}",
      border: ${args.border},
      modifier: "${args.modifier}"
    } %}
      {% block heading %}
        <div class="text-left">
          <span class="text-purple-700 font-bold text-2xl">${args.heading_slot}</span>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div class="w-2 h-2 bg-purple-300 rounded-full"></div>
            </div>
            <span class="text-purple-600 text-xs">4.8/5 ⭐</span>
          </div>
        </div>
      {% endblock %}
    {% endembed %}
  `,
};

// Custom media with environmental data
export const EnvironmentalData = {
  name: 'Environmental Data - Custom Media',
  parameters: {
    docs: {
      description: {
        story: 'Environmental statistics with custom SVG media and sustainability indicators for municipal reporting.',
      },
    },
  },
  args: {
    heading_slot: '99.9%',
    body: 'Ökostrom-Anteil in Bruchtal',
    media: `<svg class="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z"/></svg>`,
    layout: 'center',
    border: true,
    modifier: 'bg-green-50 text-green-800',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      media: "${args.media}",
      layout: "${args.layout}",
      border: ${args.border},
      modifier: "${args.modifier}"
    } %}
      {% block heading %}
        <span class="text-green-700 font-bold text-2xl">${args.heading_slot}</span>
        <div class="flex justify-center gap-1 mt-2">
          <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Wind</span>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Solar</span>
          <span class="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">Wasser</span>
        </div>
        <small class="text-green-600 text-xs block mt-2">🌱 CO₂-neutral seit 2023</small>
      {% endblock %}
    {% endembed %}
  `,
};

// Empty slot graceful degradation
export const EmptyHeadingSlot = {
  name: 'Empty Heading - Graceful Degradation',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates graceful degradation when heading slot is empty. The heading section is conditionally rendered based on `has_slot()` checks.',
      },
    },
  },
  args: {
    heading_slot: '',
    body: 'Service without numerical value - graceful slot degradation',
    icon: 'info',
    layout: 'center',
    border: true,
    modifier: 'bg-gray-50',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:stat-card' with {
      body: "${args.body}",
      icon: "${args.icon}",
      layout: "${args.layout}",
      border: ${args.border},
      modifier: "${args.modifier}"
    } %}
      {# Empty heading slot demonstrates graceful degradation #}
    {% endembed %}
  `,
};

// Template integration examples
export const TemplateIntegration = {
  name: 'Template Integration Examples',
  parameters: {
    docs: {
      description: {
        story: 'Real-world Drupal template integration examples showing how to use slots with dynamic field content.',
      },
    },
  },
  render: () => `
    <div class="space-y-8">
      <div class="prose max-w-none">
        <h2>Paragraph Template Integration</h2>
        <p>How to integrate slots in <code>paragraph--stats-item.html.twig</code>:</p>
        
        <pre><code>{# paragraph--stats-item.html.twig #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: content.field_stat_description,
  icon: content.field_icon_name,
  layout: content.field_layout.value,
  border: content.field_show_border,
  modifier: content.field_modifier_classes
} %}
  {% block heading %}
    {% if content.field_stat_value %}
      {{ content.field_stat_value }}
      {% if content.field_stat_unit %}
        <small class="text-xs text-muted-foreground block">
          {{ content.field_stat_unit }}
        </small>
      {% endif %}
    {% endif %}
  {% endblock %}
{% endembed %}</code></pre>

        <h3>Views Template Integration</h3>
        <p>Usage in views templates for dashboard displays:</p>
        
        <pre><code>{# views-view-fields--municipal-stats.html.twig #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: fields.field_description.content,
  icon: fields.field_icon.content,
  layout: 'center',
  border: true,
  modifier: 'bg-blue-50'
} %}
  {% block heading %}
    <span class="text-blue-700 font-bold text-2xl">
      {{ fields.field_value.content }}
    </span>
    {% if fields.field_trend.content %}
      <div class="flex items-center justify-center gap-1 mt-1">
        {% if fields.field_trend_direction.content == 'up' %}
          <span class="text-green-500 text-sm">↗</span>
        {% elseif fields.field_trend_direction.content == 'down' %}
          <span class="text-red-500 text-sm">↘</span>
        {% endif %}
        <span class="text-xs">{{ fields.field_trend.content }}</span>
      </div>
    {% endif %}
  {% endblock %}
{% endembed %}</code></pre>
      </div>
    </div>
  `,
};

// Slot migration guide
export const SlotMigrationGuide = {
  name: '🚀 Slot Migration Guide',
  parameters: {
    docs: {
      description: {
        story: 'Complete migration guide from props to slots with before/after examples and German compliance benefits.',
      },
    },
  },
  render: () => `
    <div class="prose max-w-none space-y-8">
      <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <h2 class="text-red-800 mb-4">❌ ANTI-PATTERN: Props-Based (Deprecated)</h2>
        <pre class="bg-red-100 p-4 rounded text-sm"><code>{# ❌ OLD WAY - Static heading only #}
{% include 'sdc:stat-card' with {
  heading: '2.5M+',
  body: 'Active Users',
  icon: 'people',
  layout: 'center'
} %}</code></pre>
        <p class="text-red-700 mt-4"><strong>Problems:</strong> No rich HTML, no trend indicators, no contextual information, limited German compliance features.</p>
      </div>

      <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
        <h2 class="text-green-800 mb-4">✅ CORRECT PATTERN: Slot-Based (Recommended)</h2>
        <pre class="bg-green-100 p-4 rounded text-sm"><code>{# ✅ NEW WAY - Rich heading content with German features #}
{% embed 'adesso_cms_theme:stat-card' with {
  body: 'Aktive Nutzer',
  icon: 'people',
  layout: 'center',
  modifier: 'bg-blue-50'
} %}
  {% block heading %}
    <span class="text-blue-700 font-bold text-2xl">2.5M+</span>
    <div class="flex items-center justify-center gap-1 mt-2">
      <span class="text-green-500 text-sm">↗ +12%</span>
      <span class="text-xs text-gray-500">vs Vormonat</span>
    </div>
    <small class="text-blue-600 text-xs block mt-1">
      Stand: {{ "now"|date("d.m.Y") }}
    </small>
  {% endblock %}
{% endembed %}</code></pre>
        <p class="text-green-700 mt-4"><strong>Benefits:</strong> Rich content, trend indicators, German date formatting, contextual information, better accessibility.</p>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h2 class="text-blue-800 mb-4">🔧 Implementation Steps</h2>
        <ol class="text-blue-700 space-y-2">
          <li><strong>1. Update Template:</strong> Replace <code>{% include %}</code> with <code>{% embed %}</code></li>
          <li><strong>2. Convert Heading to Slot:</strong> Move heading content to <code>{% block heading %}</code></li>
          <li><strong>3. Add Rich Content:</strong> Include trends, dates, status indicators in heading slot</li>
          <li><strong>4. German Formatting:</strong> Use proper German number formatting (12.847 instead of 12,847)</li>
          <li><strong>5. Accessibility:</strong> Add proper heading roles and aria-level attributes</li>
        </ol>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
        <h2 class="text-yellow-800 mb-4">⚠️ Migration Checklist</h2>
        <ul class="text-yellow-700 space-y-1">
          <li>☑️ Replace all <code>{% include 'sdc:stat-card' %}</code> with <code>{% embed 'adesso_cms_theme:stat-card' %}</code></li>
          <li>☑️ Move <code>heading</code> prop content to <code>{% block heading %}</code></li>
          <li>☑️ Add German number formatting (dots for thousands, not commas)</li>
          <li>☑️ Include contextual information (dates, trends, status)</li>
          <li>☑️ Test graceful degradation with empty heading slots</li>
          <li>☑️ Validate accessibility with screen readers and heading hierarchy</li>
          <li>☑️ Verify German municipal compliance (eCH-0059) standards</li>
        </ul>
      </div>
    </div>
  `,
};

// German municipal compliance demo
export const GermanComplianceDemo = {
  name: '♿ German Municipal Compliance',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates WCAG 2.1 AA compliance and eCH-0059 German municipal standards with proper semantic structure and municipal data formatting.',
      },
    },
  },
  render: () => `
    <div class="space-y-6">
      <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h2 class="text-blue-800 mb-4">🏛️ Gemeinde Bruchtal - Statistiken</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {% embed 'adesso_cms_theme:stat-card' with {
            body: 'Einwohner',
            icon: 'groups',
            layout: 'center',
            border: true,
            modifier: 'bg-white'
          } %}
            {% block heading %}
              <span class="text-blue-700 font-bold text-2xl" role="heading" aria-level="3">
                12.847
              </span>
              <small class="text-blue-600 text-xs block mt-1" role="doc-subtitle">
                Stand: 28.08.2025
              </small>
            {% endblock %}
          {% endembed %}

          {% embed 'adesso_cms_theme:stat-card' with {
            body: 'Bearbeitungszeit Anträge',
            icon: 'schedule',
            layout: 'center',
            border: true,
            modifier: 'bg-white'
          } %}
            {% block heading %}
              <span class="text-green-600 font-bold text-2xl" role="heading" aria-level="3">
                2,3 Tage
              </span>
              <div class="flex justify-center gap-1 mt-2">
                <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ziel: &lt;3 Tage</span>
              </div>
            {% endblock %}
          {% endembed %}

          {% embed 'adesso_cms_theme:stat-card' with {
            body: 'CO₂-Reduktion seit 2020',
            icon: 'eco',
            layout: 'center',
            border: true,
            modifier: 'bg-white'
          } %}
            {% block heading %}
              <span class="text-green-600 font-bold text-2xl" role="heading" aria-level="3">
                -34%
              </span>
              <div class="flex justify-center gap-1 mt-2">
                <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Klimaziel 2030</span>
              </div>
            {% endblock %}
          {% endembed %}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-green-50 p-4 rounded border-l-4 border-green-500">
          <h3 class="text-green-800 font-semibold mb-2">✅ eCH-0059 Features</h3>
          <ul class="text-green-700 text-sm space-y-1">
            <li>• Semantic heading hierarchy (aria-level attributes)</li>
            <li>• German number formatting (12.847 not 12,847)</li>
            <li>• Municipal service indicators</li>
            <li>• Performance target visualization</li>
            <li>• Screen reader accessible content</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
          <h3 class="text-blue-800 font-semibold mb-2">🇩🇪 German Standards</h3>
          <ul class="text-blue-700 text-sm space-y-1">
            <li>• Date formatting: dd.mm.yyyy (German standard)</li>
            <li>• Decimal separator: comma (2,3 Tage)</li>
            <li>• Thousands separator: dot (12.847)</li>
            <li>• Municipal terminology compliance</li>
            <li>• DSGVO compliant data presentation</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};