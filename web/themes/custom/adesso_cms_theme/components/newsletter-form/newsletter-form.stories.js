// phpcs:ignoreFile

import Component from './newsletter-form.twig';

const meta = {
  title: 'Form/NewsletterForm',
  component: Component,
  argTypes: {
    // Slot content controls for Storybook demonstration
    title_slot: {
      name: 'Title Slot Content',
      description: 'Content for the title slot - use {% embed %} blocks in templates',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Slots (Templates only)',
      },
    },
    pre_headline_slot: {
      name: 'Pre-headline Slot Content',
      description: 'Content for the pre_headline slot - use {% embed %} blocks in templates',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Slots (Templates only)',
      },
    },
    summary_slot: {
      name: 'Summary Slot Content',
      description: 'Content for the summary slot - use {% embed %} blocks in templates',
      control: { type: 'textarea' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Slots (Templates only)',
      },
    },
    // Props for Storybook demonstration
    summary: {
      name: 'Summary (Props)',
      description: 'Summary text for Storybook demos (use summary slot in templates)',
      control: { type: 'textarea' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props (Storybook only)',
      },
    },
    modifier: {
      name: 'CSS Modifier Classes',
      description: 'Additional CSS classes for customizing form appearance and layout',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    placeholder_text: {
      name: 'Email Placeholder',
      description: 'Placeholder text for the email input field',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Email Address' },
        category: 'Props',
      },
    },
    button_text: {
      name: 'Submit Button Text',
      description: 'Text displayed on the submit button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Subscribe' },
        category: 'Props',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Newsletter Form Component - Slot-Based Implementation

Interactive email subscription form with comprehensive validation, form states, and German DSGVO compliance features.

## 🎯 Slot Migration Complete

This component has been **successfully migrated** from props to slots for better flexibility and German compliance. The \`title\`, \`pre_headline\`, and \`summary\` are now implemented as slots using \`has_slot()\` and \`get_slot()\` functions.

## 🚀 Drupal Template Usage (Recommended)

### Basic Slot-Based Usage
\`\`\`twig
{# Municipal newsletter form with slots #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  modifier: 'bg-blue-50 border border-blue-200 rounded-lg p-6'
} %}
  {% block title %}Subscribe to Municipal Updates{% endblock %}
  {% block pre_headline %}Stay Informed{% endblock %}
  {% block summary %}
    Get the latest municipal news, service updates, and community events 
    delivered directly to your inbox.
  {% endblock %}
{% endembed %}

{# DSGVO compliant form with rich content #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  modifier: 'border-l-4 border-green-500 bg-green-50 p-6'
} %}
  {% block title %}
    <span class="text-green-800">Gemeinde Bruchtal Newsletter</span>
    <small class="block text-green-600 text-sm mt-1">Datenschutzkonform</small>
  {% endblock %}
  {% block pre_headline %}🏛️ Amtliche Mitteilungen{% endblock %}
  {% block summary %}
    <p class="mb-3">Erhalten Sie wichtige Informationen zu:</p>
    <ul class="text-sm space-y-1 mb-4">
      <li>• Bürgerdienste und Öffnungszeiten</li>
      <li>• Gemeindeversammlungen</li>
      <li>• Bauprojekte und Verkehrsinformationen</li>
      <li>• Kulturveranstaltungen</li>
    </ul>
    <p class="text-xs text-green-700">
      <strong>DSGVO-konform:</strong> Ihre Daten werden sicher verarbeitet. 
      <a href="/datenschutz" class="underline">Datenschutzerklärung</a>
    </p>
  {% endblock %}
{% endembed %}
\`\`\`

### Paragraph Template Integration
\`\`\`twig
{# paragraph--newsletter.html.twig #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  modifier: content.field_modifier_classes
} %}
  {% block title %}
    {% if content.field_title %}
      {{ content.field_title }}
    {% endif %}
  {% endblock %}
  
  {% block pre_headline %}
    {% if content.field_pre_headline %}
      {{ content.field_pre_headline }}
    {% endif %}
  {% endblock %}

  {% block summary %}
    {% if content.field_summary %}
      {{ content.field_summary }}
    {% endif %}
  {% endblock %}
{% endembed %}
\`\`\`

## 🔧 Storybook Props (For Demo Only)

Storybook stories use props for demonstration purposes, but real Drupal templates should use slots.

\`\`\`twig
{# Storybook usage only - NOT for production templates #}
{% include 'adesso_cms_theme:newsletter-form' with {
  title: 'Demo Title',
  pre_headline: 'Demo Pre-headline',
  summary: 'Demo summary text'
} %}
\`\`\`

## ✅ Migration Benefits

### Before (Props - Anti-pattern)
\`\`\`twig
{# OLD WAY - Static content only #}
{% include 'sdc:newsletter-form' with {
  title: 'Newsletter Signup',
  pre_headline: 'Stay Updated',
  summary: 'Get our latest updates.'
} %}
\`\`\`

### After (Slots - Recommended)
\`\`\`twig
{# NEW WAY - Rich, dynamic content #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  modifier: 'bg-blue-50 border-l-4 border-blue-500 p-6'
} %}
  {% block title %}
    <span class="text-blue-800 font-semibold">Newsletter Signup</span>
    <span class="block text-sm text-blue-600 mt-1">
      📊 Join {{ subscriber_count }} other subscribers
    </span>
  {% endblock %}
  {% block pre_headline %}
    <span class="inline-flex items-center gap-1 text-blue-700">
      🏛️ {{ municipality_name }} • Aktuell
    </span>
  {% endblock %}
  {% block summary %}
    <div class="prose text-sm">
      <p>Erhalten Sie die neuesten Informationen zu:</p>
      <ul>
        <li>Bürgerdienste und Verwaltung</li>
        <li>Veranstaltungen und Kultur</li>
        <li>Stadtentwicklung</li>
      </ul>
      <p class="text-xs text-gray-600 mt-3">
        DSGVO-konform • Jederzeit abbestellbar
      </p>
    </div>
  {% endblock %}
{% endembed %}
\`\`\`

## 🎨 Slot Pattern Advantages

- **Rich Content**: Slots support HTML, lists, links, and dynamic content
- **Conditional Rendering**: Use \`has_slot()\` for smart content detection
- **Performance**: Slots are processed server-side, improving render performance
- **DSGVO Compliance**: Better privacy communication with structured content slots
- **Maintainability**: Consistent slot patterns across all form components

## 🏛️ German Municipal Use Cases

- **Municipal Newsletters**: Amtliche Mitteilungen, Bürgerdienste, Veranstaltungen
- **Service Updates**: Öffnungszeiten, Sprechstunden, Online-Services
- **Community Events**: Kulturveranstaltungen, Stadtfeste, Bürgerbeteiligung
- **Emergency Communications**: Wichtige Durchsagen, Verkehrsinformationen
- **Public Consultations**: Bürgerbeteiligung, Umfragen, Planungsverfahren

## 🇩🇪 DSGVO Compliance Features

- **Privacy-First Design**: Clear consent mechanisms and data usage explanation
- **Transparent Communication**: Structured slots for privacy policy links
- **Opt-in Requirements**: Explicit consent before subscription activation
- **Right to Withdraw**: Easy unsubscribe mechanisms and data deletion
- **Data Minimization**: Only collecting necessary information (email address)
- **Secure Processing**: German data protection standards implementation
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

export const Default = {
  name: 'Default - Municipal Updates',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Basic municipal newsletter form with title, pre-headline, and summary slots. In Drupal templates, use `{% embed %}` blocks instead of props.',
      },
    },
  },
  args: {
    title_slot: 'Subscribe to Municipal Updates',
    pre_headline_slot: 'Stay Informed',
    summary_slot: 'Get the latest municipal news, service updates, and community events delivered directly to your inbox.',
    modifier: '',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:newsletter-form' with {
      modifier: "${args.modifier || ''}"
    } %}
      {% if "${args.title_slot}" %}
        {% block title %}${args.title_slot}{% endblock %}
      {% endif %}
      {% if "${args.pre_headline_slot}" %}
        {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
      {% endif %}
      {% if "${args.summary_slot}" %}
        {% block summary %}${args.summary_slot}{% endblock %}
      {% endif %}
    {% endembed %}
  `,
};

export const GemeindeNewsletter = {
  name: 'Gemeinde Newsletter - DSGVO Compliant',
  parameters: {
    docs: {
      description: {
        story: 'German municipal newsletter with DSGVO compliance information and structured content using rich HTML slots.',
      },
    },
  },
  args: {
    title_slot: 'Gemeinde Bruchtal Newsletter',
    pre_headline_slot: '🏛️ Amtliche Mitteilungen',
    summary_slot: '',
    modifier: 'border-l-4 border-blue-500 bg-blue-50 p-6',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:newsletter-form' with {
      modifier: "${args.modifier}"
    } %}
      {% block title %}
        <span class="text-blue-800 font-semibold">${args.title_slot}</span>
        <small class="block text-blue-600 text-sm mt-1">Datenschutzkonform</small>
      {% endblock %}
      {% block pre_headline %}
        <span class="inline-flex items-center gap-1 text-blue-700">
          ${args.pre_headline_slot}
        </span>
      {% endblock %}
      {% block summary %}
        <div class="prose-sm">
          <p class="mb-3 text-blue-800">Erhalten Sie wichtige Informationen zu:</p>
          <ul class="text-sm space-y-1 mb-4 text-blue-700">
            <li>• Bürgerdienste und Öffnungszeiten</li>
            <li>• Gemeindeversammlungen und Beschlüsse</li>
            <li>• Bauprojekte und Verkehrsinformationen</li>
            <li>• Kulturveranstaltungen und Sport</li>
          </ul>
          <p class="text-xs text-blue-600 bg-white p-3 rounded border">
            <strong>DSGVO-konform:</strong> Ihre Daten werden sicher verarbeitet. 
            Jederzeit abbestellbar. 
            <a href="#datenschutz" class="underline font-medium">Datenschutzerklärung</a>
          </p>
        </div>
      {% endblock %}
    {% endembed %}
  `,
};

export const ServiceUpdates = {
  name: 'Service Updates - Rich Content',
  parameters: {
    docs: {
      description: {
        story: 'Service updates newsletter with subscriber count and service categories in title slot.',
      },
    },
  },
  args: {
    title_slot: 'Service Updates Newsletter',
    pre_headline_slot: 'Municipal Services',
    summary_slot: '',
    modifier: 'bg-green-50 border border-green-200 rounded-lg p-6',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:newsletter-form' with {
      modifier: "${args.modifier}"
    } %}
      {% block title %}
        <div class="text-green-800">
          <span class="font-semibold">${args.title_slot}</span>
          <div class="flex items-center gap-2 mt-2 text-sm">
            <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full">
              📊 2.347 Abonnenten
            </span>
            <span class="bg-white text-green-700 px-2 py-1 rounded border">
              ⭐ Wöchentlich
            </span>
          </div>
        </div>
      {% endblock %}
      {% block pre_headline %}
        <span class="inline-flex items-center gap-1 text-green-700">
          🏛️ ${args.pre_headline_slot}
        </span>
      {% endblock %}
      {% block summary %}
        <div class="text-green-800">
          <p class="mb-3">Bleiben Sie informiert über:</p>
          <div class="grid grid-cols-2 gap-2 text-sm mb-4">
            <div class="flex items-center gap-2">
              <span class="text-green-600">🏢</span>
              <span>Bürgerbüro</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-blue-600">⚡</span>
              <span>Online-Services</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-purple-600">📅</span>
              <span>Terminbuchung</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-orange-600">📋</span>
              <span>Formulare</span>
            </div>
          </div>
          <p class="text-xs text-green-600">
            Kostenlos • DSGVO-konform • Jederzeit kündbar
          </p>
        </div>
      {% endblock %}
    {% endembed %}
  `,
};

export const BlogSubscription = {
  name: 'Blog Subscription - Content Marketing',
  parameters: {
    docs: {
      description: {
        story: 'Blog subscription form with content categories and posting frequency information.',
      },
    },
  },
  args: {
    title_slot: 'Never Miss a Post',
    pre_headline_slot: 'Blog Updates',
    summary_slot: '',
    modifier: 'bg-purple-50 border-l-4 border-purple-500 p-6',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:newsletter-form' with {
      modifier: "${args.modifier}"
    } %}
      {% block title %}
        <span class="text-purple-800 font-semibold">${args.title_slot}</span>
        <div class="flex gap-2 mt-2">
          <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Tech</span>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Design</span>
          <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Business</span>
        </div>
      {% endblock %}
      {% block pre_headline %}
        <span class="inline-flex items-center gap-1 text-purple-700">
          📝 ${args.pre_headline_slot}
        </span>
      {% endblock %}
      {% block summary %}
        <div class="text-purple-800">
          <p class="mb-3">Get notified when we publish:</p>
          <ul class="text-sm space-y-2 mb-4">
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>In-depth tutorials and guides</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Industry insights and analysis</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Case studies and best practices</span>
            </li>
          </ul>
          <div class="text-xs text-purple-600 bg-white p-2 rounded border">
            📅 <strong>2-3 posts per week</strong> • No spam, unsubscribe anytime
          </div>
        </div>
      {% endblock %}
    {% endembed %}
  `,
};

export const EmptySlots = {
  name: 'Empty Slots - Graceful Degradation',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates graceful degradation when slots are empty. The section-header is conditionally rendered based on `has_slot()` checks.',
      },
    },
  },
  args: {
    title_slot: '',
    pre_headline_slot: '',
    summary_slot: '',
    modifier: 'border border-gray-200 rounded p-4',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:newsletter-form' with {
      modifier: "${args.modifier}"
    } %}
      {# Empty slots demonstrate graceful degradation #}
      {# Form will render without header section #}
    {% endembed %}
  `,
};

export const MinimalForm = {
  name: 'Minimal Form - Compact Layout',
  parameters: {
    docs: {
      description: {
        story: 'Minimal newsletter form with simple title and compact summary for sidebars or footer placement.',
      },
    },
  },
  args: {
    title_slot: 'Newsletter',
    pre_headline_slot: '',
    summary_slot: 'Get weekly updates delivered to your inbox.',
    modifier: 'py-4',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:newsletter-form' with {
      modifier: "${args.modifier}"
    } %}
      {% block title %}
        <span class="text-lg font-medium text-gray-800">${args.title_slot}</span>
      {% endblock %}
      {% block summary %}
        <p class="text-sm text-gray-600">${args.summary_slot}</p>
      {% endblock %}
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
        <p>How to integrate slots in <code>paragraph--newsletter.html.twig</code>:</p>
        
        <pre><code>{# paragraph--newsletter.html.twig #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  modifier: content.field_modifier_classes
} %}
  {% block title %}
    {% if content.field_title %}
      {{ content.field_title }}
      {% if content.field_subscriber_count %}
        <small class="block text-sm text-muted-foreground mt-1">
          {{ content.field_subscriber_count }} subscribers
        </small>
      {% endif %}
    {% endif %}
  {% endblock %}
  
  {% block pre_headline %}
    {% if content.field_pre_headline %}
      {{ content.field_pre_headline }}
    {% endif %}
  {% endblock %}

  {% block summary %}
    {% if content.field_summary %}
      {{ content.field_summary }}
      {% if content.field_privacy_notice %}
        <div class="mt-3 text-xs text-gray-600 bg-gray-50 p-2 rounded">
          {{ content.field_privacy_notice }}
        </div>
      {% endif %}
    {% endif %}
  {% endblock %}
{% endembed %}</code></pre>

        <h3>Block Template Integration</h3>
        <p>Usage in custom blocks for municipal communication:</p>
        
        <pre><code>{# block--newsletter-signup.html.twig #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  modifier: 'bg-blue-50 border-l-4 border-blue-500 p-6'
} %}
  {% block title %}
    <span class="text-blue-800 font-semibold">
      {{ content.field_newsletter_title }}
    </span>
    {% if municipality_name %}
      <small class="block text-blue-600 text-sm mt-1">
        {{ municipality_name }} • {{ "now"|date("m.Y") }}
      </small>
    {% endif %}
  {% endblock %}
  
  {% block pre_headline %}
    🏛️ {{ content.field_category }}
  {% endblock %}
  
  {% block summary %}
    <div class="space-y-3">
      {{ content.field_description }}
      
      {% if content.field_topics %}
        <div class="text-sm">
          <p class="font-medium mb-2">Themen:</p>
          <div class="flex flex-wrap gap-1">
            {% for topic in content.field_topics %}
              <span class="bg-white text-blue-700 px-2 py-1 rounded text-xs">
                {{ topic.entity.title.value }}
              </span>
            {% endfor %}
          </div>
        </div>
      {% endif %}
      
      <p class="text-xs text-blue-600">
        DSGVO-konform • 
        <a href="{{ url('entity.node.canonical', {'node': privacy_policy.id}) }}" 
           class="underline">Datenschutzerklärung</a>
      </p>
    </div>
  {% endblock %}
{% endembed %}</code></pre>
      </div>
    </div>
  `,
};

// Migration documentation story
export const SlotMigrationGuide = {
  name: '🚀 Slot Migration Guide',
  parameters: {
    docs: {
      description: {
        story: 'Complete migration guide from props to slots with before/after examples and DSGVO compliance benefits.',
      },
    },
  },
  render: () => `
    <div class="prose max-w-none space-y-8">
      <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <h2 class="text-red-800 mb-4">❌ ANTI-PATTERN: Props-Based (Deprecated)</h2>
        <pre class="bg-red-100 p-4 rounded text-sm"><code>{# ❌ OLD WAY - Static content only #}
{% include 'sdc:newsletter-form' with {
  title: 'Newsletter Signup',
  pre_headline: 'Stay Updated',
  summary: 'Get our latest updates delivered to your inbox.'
} %}</code></pre>
        <p class="text-red-700 mt-4"><strong>Problems:</strong> No rich HTML, no privacy information structuring, no dynamic subscriber counts, poor DSGVO compliance communication.</p>
      </div>

      <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
        <h2 class="text-green-800 mb-4">✅ CORRECT PATTERN: Slot-Based (Recommended)</h2>
        <pre class="bg-green-100 p-4 rounded text-sm"><code>{# ✅ NEW WAY - Rich content with DSGVO compliance #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  modifier: 'bg-blue-50 border-l-4 border-blue-500 p-6'
} %}
  {% block title %}
    <span class="text-blue-800 font-semibold">Gemeinde Newsletter</span>
    <small class="block text-blue-600 text-sm mt-1">
      {{ subscriber_count }} Abonnenten • DSGVO-konform
    </small>
  {% endblock %}
  {% block pre_headline %}
    🏛️ {{ municipality_name }} • Amtliche Mitteilungen
  {% endblock %}
  {% block summary %}
    <div class="space-y-3">
      <p>Erhalten Sie wichtige Informationen zu Bürgerdiensten und Veranstaltungen.</p>
      <p class="text-xs text-blue-600 bg-white p-2 rounded">
        <strong>Datenschutz:</strong> Ihre Daten werden sicher verarbeitet.
        <a href="/datenschutz" class="underline">Mehr erfahren</a>
      </p>
    </div>
  {% endblock %}
{% endembed %}</code></pre>
        <p class="text-green-700 mt-4"><strong>Benefits:</strong> Rich HTML content, structured privacy information, dynamic data integration, full DSGVO compliance communication.</p>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h2 class="text-blue-800 mb-4">🔧 Implementation Steps</h2>
        <ol class="text-blue-700 space-y-2">
          <li><strong>1. Update Template:</strong> Replace <code>{% include %}</code> with <code>{% embed %}</code></li>
          <li><strong>2. Convert Props to Slots:</strong> Move title/pre_headline/summary content to <code>{% block %}</code> sections</li>
          <li><strong>3. Add Rich Content:</strong> Include subscriber counts, categories, privacy information</li>
          <li><strong>4. DSGVO Compliance:</strong> Add structured privacy communication and consent information</li>
          <li><strong>5. Accessibility:</strong> Verify form accessibility with German screen readers</li>
        </ol>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
        <h2 class="text-yellow-800 mb-4">⚠️ Migration Checklist</h2>
        <ul class="text-yellow-700 space-y-1">
          <li>☑️ Replace all <code>{% include 'sdc:newsletter-form' %}</code> with <code>{% embed 'adesso_cms_theme:newsletter-form' %}</code></li>
          <li>☑️ Move <code>title</code> prop content to <code>{% block title %}</code></li>
          <li>☑️ Move <code>pre_headline</code> prop content to <code>{% block pre_headline %}</code></li>
          <li>☑️ Move <code>summary</code> prop content to <code>{% block summary %}</code></li>
          <li>☑️ Add DSGVO compliance information to summary slot</li>
          <li>☑️ Include privacy policy links and consent mechanisms</li>
          <li>☑️ Test graceful degradation with empty slots</li>
          <li>☑️ Validate accessibility with screen readers</li>
          <li>☑️ Verify German municipal compliance standards</li>
        </ul>
      </div>
    </div>
  `,
};

// DSGVO compliance demonstration
export const DSGVOComplianceDemo = {
  name: '🇩🇪 DSGVO Compliance Demo',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates German DSGVO compliance features with structured privacy information and municipal standards.',
      },
    },
  },
  render: () => `
    <div class="space-y-6">
      <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h2 class="text-blue-800 mb-4">🏛️ Municipal Newsletter Forms - DSGVO Standards</h2>
        <div class="space-y-6">
          
          {% embed 'adesso_cms_theme:newsletter-form' with {
            modifier: 'bg-white border border-blue-200 rounded p-4'
          } %}
            {% block title %}
              <div class="text-blue-800">
                <span class="font-semibold" role="heading" aria-level="3">
                  Bürgerinformation Bruchtal
                </span>
                <div class="flex items-center gap-2 mt-1 text-sm">
                  <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    ✓ DSGVO-konform
                  </span>
                  <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    eCH-0059 Standard
                  </span>
                </div>
              </div>
            {% endblock %}
            {% block pre_headline %}
              <span class="inline-flex items-center gap-1 text-blue-700" role="doc-subtitle">
                <span aria-label="Gemeinde Services">🏛️</span>
                <span>Amtliche Mitteilungen</span>
              </span>
            {% endblock %}
            {% block summary %}
              <div class="text-blue-800 space-y-3">
                <p>Bleiben Sie informiert über wichtige Gemeindeangelegenheiten:</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div class="flex items-center gap-2">
                    <span class="text-green-600" aria-hidden="true">📋</span>
                    <span>Verwaltungsdienstleistungen</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-blue-600" aria-hidden="true">📅</span>
                    <span>Gemeindeversammlungen</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-purple-600" aria-hidden="true">🚧</span>
                    <span>Bauprojekte & Verkehr</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-orange-600" aria-hidden="true">🎭</span>
                    <span>Kultur & Veranstaltungen</span>
                  </div>
                </div>

                <div class="bg-gray-50 p-3 rounded border text-xs">
                  <p class="font-semibold mb-2">🔒 Datenschutz nach DSGVO:</p>
                  <ul class="space-y-1">
                    <li>• Freiwillige Anmeldung mit expliziter Einwilligung</li>
                    <li>• Sichere Datenverarbeitung auf Servern in Deutschland</li>
                    <li>• Jederzeit kündbar mit einem Klick</li>
                    <li>• Keine Weitergabe an Dritte</li>
                  </ul>
                  <p class="mt-2">
                    <a href="#datenschutz" class="text-blue-600 underline font-medium">
                      Vollständige Datenschutzerklärung
                    </a> • 
                    <a href="#impressum" class="text-blue-600 underline">
                      Impressum
                    </a>
                  </p>
                </div>
              </div>
            {% endblock %}
          {% endembed %}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-green-50 p-4 rounded border-l-4 border-green-500">
          <h3 class="text-green-800 font-semibold mb-2">✅ DSGVO Features</h3>
          <ul class="text-green-700 text-sm space-y-1">
            <li>• Explicit consent mechanisms (Art. 6 DSGVO)</li>
            <li>• Clear data usage communication</li>
            <li>• Easy unsubscribe options (Right to withdraw)</li>
            <li>• Privacy policy integration</li>
            <li>• Minimal data collection principle</li>
            <li>• Secure German server processing</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
          <h3 class="text-blue-800 font-semibold mb-2">🏛️ Municipal Standards</h3>
          <ul class="text-blue-700 text-sm space-y-1">
            <li>• eCH-0059 government portal compliance</li>
            <li>• German municipal terminology</li>
            <li>• Accessible form design (WCAG 2.1 AA)</li>
            <li>• Structured content presentation</li>
            <li>• Service category organization</li>
            <li>• Transparent communication standards</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};