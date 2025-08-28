// phpcs:ignoreFile

import Component from './embed.twig';

const meta = {
  title: 'Editorial/Embed',
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
    embed: {
      name: 'Embed Content',
      description: 'Define the embedded item (prop usage for Storybook)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props (Storybook only)',
      },
    },
    modifier: {
      name: 'Modifier Classes',
      description: 'Modifier class for the embed component',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Embed Component - Slot-Based Implementation

Versatile embed component for integrating external content like videos, maps, forms, and other HTML embeds with optional slot-based title and pre-headline.

## 🎯 Slot Migration Complete

This component has been **successfully migrated** from props to slots for better flexibility and German compliance. The \`title\` and \`pre_headline\` are now implemented as slots using \`has_slot()\` and \`get_slot()\` functions.

## 🚀 Drupal Template Usage (Recommended)

### Basic Slot-Based Usage
\`\`\`twig
{# YouTube video embed with slots #}
{% embed 'adesso_cms_theme:embed' with {
  embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allowfullscreen></iframe>'
} %}
  {% block title %}Product Introduction Video{% endblock %}
  {% block pre_headline %}Watch Now{% endblock %}
{% endembed %}

{# Google Maps with dynamic content #}
{% embed 'adesso_cms_theme:embed' with {
  embed: content.field_embed_code
} %}
  {% block title %}{{ content.field_title }}{% endblock %}
  {% block pre_headline %}{{ content.field_pre_headline }}{% endblock %}
{% endembed %}

{# Contact form with rich content slots #}
{% embed 'adesso_cms_theme:embed' with {
  embed: contact_form_html_content,
  modifier: 'bg-gray-50'
} %}
  {% block title %}
    <span class="text-primary">Get In Touch</span>
    <small class="block text-sm text-muted-foreground mt-1">We'll respond within 24 hours</small>
  {% endblock %}
  {% block pre_headline %}Contact{% endblock %}
{% endembed %}
\`\`\`

### Paragraph Template Integration
\`\`\`twig
{# paragraph--embed.html.twig #}
{% embed 'adesso_cms_theme:embed' with {
  embed: content.field_embed_code,
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
{% endembed %}
\`\`\`

## 🔧 Storybook Props (For Demo Only)

Storybook stories use props for demonstration purposes, but real Drupal templates should use slots.

\`\`\`twig
{# Storybook usage only - NOT for production templates #}
{% include 'adesso_cms_theme:embed' with {
  title: 'Demo Title',
  pre_headline: 'Demo Pre-headline',
  embed: embed_code
} %}
\`\`\`

## ✅ Migration Benefits

### Before (Props - Anti-pattern)
\`\`\`twig
{# OLD WAY - Less flexible #}
{% include 'sdc:embed' with {
  title: 'Static Title Only',
  pre_headline: 'Static Pre-headline',
  embed: embed_content
} %}
\`\`\`

### After (Slots - Recommended)
\`\`\`twig
{# NEW WAY - Flexible content blocks #}
{% embed 'adesso_cms_theme:embed' with {
  embed: embed_content
} %}
  {% block title %}
    <span class="text-primary font-semibold">Dynamic Title</span>
    <small class="block text-xs text-muted-foreground">with rich formatting</small>
  {% endblock %}
  {% block pre_headline %}Rich Pre-headline{% endblock %}
{% endembed %}
\`\`\`

## 🎨 Slot Pattern Advantages

- **Rich Content**: Slots support HTML, components, and dynamic content
- **Conditional Rendering**: Use \`has_slot()\` for smart content detection
- **Performance**: Slots are processed server-side, improving render performance
- **German Compliance**: Better accessibility with semantic slot structure
- **Maintainability**: Consistent slot patterns across all components

## 📋 Common Use Cases

- **Video Embeds**: YouTube, Vimeo, custom video players with descriptive titles
- **Maps**: Google Maps, OpenStreetMap embeds with location context
- **Forms**: Contact forms, newsletter signups, surveys with clear headings
- **Social Media**: Twitter tweets, Instagram posts, Facebook content
- **Interactive Content**: Calendars, widgets, third-party tools with proper labeling
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

export const Default = {
  name: 'Default - YouTube Embed',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Basic YouTube embed with title and pre-headline slots. In Drupal templates, use `{% embed %}` blocks instead of props.',
      },
    },
  },
  args: {
    title_slot: 'Company Overview Video',
    pre_headline_slot: 'Watch Now',
    embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:embed' with {
      embed: "${args.embed}",
      modifier: "${args.modifier || ''}"
    } %}
      {% if "${args.title_slot}" %}
        {% block title %}${args.title_slot}{% endblock %}
      {% endif %}
      {% if "${args.pre_headline_slot}" %}
        {% block pre_headline %}${args.pre_headline_slot}{% endblock %}
      {% endif %}
    {% endembed %}
  `,
};

export const VimeoVideo = {
  name: 'Vimeo Video - Rich Slot Content',
  parameters: {
    docs: {
      description: {
        story: 'Vimeo embed demonstrating rich HTML content in title slot with formatting and additional context.',
      },
    },
  },
  args: {
    title_slot: 'Product Demo',
    pre_headline_slot: 'Learn More',
    embed: '<iframe src="https://player.vimeo.com/video/148751763?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Vimeo video player"></iframe>',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:embed' with {
      embed: "${args.embed}",
      modifier: "border-l-4 border-blue-500"
    } %}
      {% block title %}
        <span class="text-blue-600 font-semibold">${args.title_slot}</span>
        <small class="block text-sm text-gray-600 mt-1">HD Quality Available</small>
      {% endblock %}
      {% block pre_headline %}📹 ${args.pre_headline_slot}{% endblock %}
    {% endembed %}
  `,
};

export const GoogleMaps = {
  name: 'Google Maps - Location Context',
  parameters: {
    docs: {
      description: {
        story: 'Google Maps embed with location context and accessibility-focused slot content for German municipal portals.',
      },
    },
  },
  args: {
    title_slot: 'Visit Our Office',
    pre_headline_slot: 'Location',
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.4582368354847!2d13.404953916013648!3d52.520007479813405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sen!2sde!4v1635789012345!5m2!1sen!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:embed' with {
      embed: "${args.embed}",
      modifier: "bg-gray-50 border-2 border-gray-200"
    } %}
      {% block title %}
        <span class="flex items-center gap-2">
          🏢 ${args.title_slot}
          <small class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Open 24/7</small>
        </span>
      {% endblock %}
      {% block pre_headline %}📍 ${args.pre_headline_slot}{% endblock %}
    {% endembed %}
  `,
};

export const ContactForm = {
  name: 'Contact Form - Municipal Service',
  parameters: {
    docs: {
      description: {
        story: 'German municipal contact form with accessibility-focused slot content and eCH-0059 compliance patterns.',
      },
    },
  },
  args: {
    title_slot: 'Get In Touch',
    pre_headline_slot: 'Contact Us', 
    embed: '<form class="max-w-md mx-auto space-y-4"><div><label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></div><div><label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea></div><button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send Message</button></form>',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:embed' with {
      embed: "${args.embed}",
      modifier: "bg-gray-50 border-2 border-gray-200"
    } %}
      {% block title %}
        <span class="flex items-center justify-center gap-2">
          📧 ${args.title_slot}
          <small class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">DSGVO Compliant</small>
        </span>
        <p class="text-sm text-gray-600 mt-1">Response within 2 business days</p>
      {% endblock %}
      {% block pre_headline %}🏛️ ${args.pre_headline_slot}{% endblock %}
    {% endembed %}
  `,
};

export const NewsletterSignup = {
  name: 'Newsletter - Municipal Updates',
  parameters: {
    docs: {
      description: {
        story: 'Municipal newsletter signup with German privacy compliance and rich slot content for municipal communication.',
      },
    },
  },
  args: {
    title_slot: 'Municipal Newsletter', 
    pre_headline_slot: 'Stay Informed',
    embed: '<div class="max-w-md mx-auto"><p class="text-gray-600 mb-6 text-center">Subscribe to our newsletter for the latest municipal updates and community news.</p><form class="space-y-4"><div><label for="newsletter-email" class="sr-only">Email address</label><input type="email" id="newsletter-email" name="email" placeholder="Enter your email address" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></div><button type="submit" class="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium">Subscribe Now</button></form><p class="text-sm text-gray-500 mt-4 text-center">DSGVO compliant • Unsubscribe anytime</p></div>',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:embed' with {
      embed: "${args.embed}",
      modifier: "border-l-4 border-green-500 bg-green-25"
    } %}
      {% block title %}
        <div class="text-center">
          <span class="text-green-700 font-semibold">📰 ${args.title_slot}</span>
          <div class="flex justify-center gap-2 mt-2">
            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Monthly</span>
            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Community Events</span>
            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Services</span>
          </div>
        </div>
      {% endblock %}
      {% block pre_headline %}🏛️ ${args.pre_headline_slot}{% endblock %}
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
    embed: '<div class="p-8 text-center bg-gray-100 rounded-lg"><p class="text-gray-600">📄 Pure embed content without header - graceful slot degradation</p></div>',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:embed' with {
      embed: "${args.embed}"
    } %}
      {# Empty slots demonstrate graceful degradation #}
    {% endembed %}
  `,
};

export const AllSlotsDemo = {
  name: 'All Slots - Maximum Content',
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive example showing all slot capabilities with rich HTML content, perfect for German municipal portal requirements.',
      },
    },
  },
  args: {
    title_slot: 'Municipal Services Portal',
    pre_headline_slot: 'Gemeinde Bruchtal',
    embed: '<div class="p-6 bg-blue-50 rounded-lg text-center"><h3 class="text-lg font-semibold text-blue-800 mb-2">Interactive Service Portal</h3><p class="text-blue-600 mb-4">Access municipal services, submit applications, and track requests online.</p><button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Launch Portal</button></div>',
    modifier: 'border-l-4 border-blue-500 bg-blue-25',
  },
  render: (args) => `
    {% embed 'adesso_cms_theme:embed' with {
      embed: "${args.embed}",
      modifier: "${args.modifier}"
    } %}
      {% block title %}
        <span class="flex items-center justify-center gap-2 text-blue-800">
          🏛️ ${args.title_slot}
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">eCH-0059 Compliant</span>
        </span>
        <p class="text-sm text-gray-600 mt-2">Secure • Accessible • User-Friendly</p>
      {% endblock %}
      {% block pre_headline %}
        <span class="inline-flex items-center gap-1 text-blue-600 font-medium">
          🌲 ${args.pre_headline_slot} • Leben am See
        </span>
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
        <p>How to integrate slots in <code>paragraph--embed.html.twig</code>:</p>
        
        <pre><code>{# paragraph--embed.html.twig #}
{% embed 'adesso_cms_theme:embed' with {
  embed: content.field_embed_code,
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
{% endembed %}</code></pre>

        <h3>Node Template Integration</h3>
        <p>Usage in <code>node--page.html.twig</code>:</p>
        
        <pre><code>{# Dynamic embed with field content #}
{% embed 'adesso_cms_theme:embed' with {
  embed: content.field_video_embed,
  modifier: 'featured-video'
} %}
  {% block title %}
    <span class="text-primary">{{ node.title.value }}</span>
    {% if content.field_video_duration %}
      <small class="block text-sm text-muted-foreground mt-1">
        Duration: {{ content.field_video_duration }}
      </small>
    {% endif %}
  {% endblock %}
  {% block pre_headline %}🎬 Featured Video{% endblock %}
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
        story: 'Complete migration guide from props to slots with before/after examples and German compliance benefits.',
      },
    },
  },
  render: () => `
    <div class="prose max-w-none space-y-8">
      <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <h2 class="text-red-800 mb-4">❌ ANTI-PATTERN: Props-Based (Deprecated)</h2>
        <pre class="bg-red-100 p-4 rounded text-sm"><code>{# ❌ OLD WAY - Inflexible, static content only #}
{% include 'sdc:embed' with {
  title: 'Static Title Only',
  pre_headline: 'Static Pre-headline',
  embed: embed_content
} %}</code></pre>
        <p class="text-red-700 mt-4"><strong>Problems:</strong> No rich HTML, no dynamic content, no conditional formatting, poor German compliance.</p>
      </div>

      <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
        <h2 class="text-green-800 mb-4">✅ CORRECT PATTERN: Slot-Based (Recommended)</h2>
        <pre class="bg-green-100 p-4 rounded text-sm"><code>{# ✅ NEW WAY - Flexible, rich content, German compliance #}
{% embed 'adesso_cms_theme:embed' with {
  embed: embed_content,
  modifier: 'featured-embed'
} %}
  {% block title %}
    <span class="text-primary font-semibold">Dynamic Title</span>
    <small class="block text-xs text-muted-foreground">with rich formatting</small>
  {% endblock %}
  {% block pre_headline %}
    <span class="inline-flex items-center gap-1">
      🏛️ {{ content.field_department }} • {{ content.field_category }}
    </span>
  {% endblock %}
{% endembed %}</code></pre>
        <p class="text-green-700 mt-4"><strong>Benefits:</strong> Rich HTML support, dynamic field content, conditional rendering, eCH-0059 compliance, better accessibility.</p>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h2 class="text-blue-800 mb-4">🔧 Implementation Steps</h2>
        <ol class="text-blue-700 space-y-2">
          <li><strong>1. Update Template:</strong> Replace <code>{% include %}</code> with <code>{% embed %}</code></li>
          <li><strong>2. Convert Props to Slots:</strong> Move title/pre_headline content to <code>{% block %}</code> sections</li>
          <li><strong>3. Add Rich Content:</strong> Use HTML, icons, and dynamic fields in slots</li>
          <li><strong>4. Test Accessibility:</strong> Verify WCAG 2.1 AA compliance with screen readers</li>
          <li><strong>5. Validate German Standards:</strong> Ensure eCH-0059 compliance for municipal portals</li>
        </ol>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
        <h2 class="text-yellow-800 mb-4">⚠️ Migration Checklist</h2>
        <ul class="text-yellow-700 space-y-1">
          <li>☑️ Replace all <code>{% include 'sdc:embed' %}</code> with <code>{% embed 'adesso_cms_theme:embed' %}</code></li>
          <li>☑️ Move <code>title</code> prop content to <code>{% block title %}</code></li>
          <li>☑️ Move <code>pre_headline</code> prop content to <code>{% block pre_headline %}</code></li>
          <li>☑️ Test graceful degradation with empty slots</li>
          <li>☑️ Validate accessibility with screen readers</li>
          <li>☑️ Verify German municipal compliance (eCH-0059)</li>
        </ul>
      </div>
    </div>
  `,
};

// Performance and accessibility demonstration
export const AccessibilityDemo = {
  name: '♿ Accessibility & German Compliance',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates WCAG 2.1 AA compliance and eCH-0059 German municipal standards with proper semantic structure.',
      },
    },
  },
  render: () => `
    <div class="space-y-6">
      <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h2 class="text-blue-800 mb-4">🛡️ German Municipal Standards</h2>
        <div class="space-y-4">
          {% embed 'adesso_cms_theme:embed' with {
            embed: '<div class="p-6 bg-white rounded border-2 border-blue-200 text-center"><h3 class="text-lg font-semibold text-blue-800 mb-2">Municipal Service Portal</h3><p class="text-blue-600 mb-4">Access municipal services with full eCH-0059 compliance</p><div class="flex justify-center gap-4"><span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">WCAG 2.1 AA</span><span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">eCH-0059</span><span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">DSGVO</span></div></div>',
            modifier: 'focus-within:ring-4 focus-within:ring-blue-300'
          } %}
            {% block title %}
              <h2 class="text-blue-800 font-bold" role="heading" aria-level="2">
                🏛️ Gemeinde Bruchtal Portal
              </h2>
              <p class="text-sm text-blue-600 mt-1" role="doc-subtitle">
                Accessible • Secure • Compliant
              </p>
            {% endblock %}
            {% block pre_headline %}
              <div class="inline-flex items-center gap-2 text-blue-700" role="doc-subtitle">
                <span aria-label="Municipal Services">🌟</span>
                <span>Featured Service</span>
              </div>
            {% endblock %}
          {% endembed %}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-green-50 p-4 rounded border-l-4 border-green-500">
          <h3 class="text-green-800 font-semibold mb-2">✅ Accessibility Features</h3>
          <ul class="text-green-700 text-sm space-y-1">
            <li>• Proper heading hierarchy (h2 with aria-level)</li>
            <li>• Semantic role attributes</li>
            <li>• Focus management with ring indicators</li>
            <li>• Screen reader friendly content</li>
            <li>• High contrast ratios (4.5:1+)</li>
          </ul>
        </div>
        
        <div class="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
          <h3 class="text-purple-800 font-semibold mb-2">🇩🇪 German Compliance</h3>
          <ul class="text-purple-700 text-sm space-y-1">
            <li>• eCH-0059 government portal standards</li>
            <li>• DSGVO privacy compliance</li>
            <li>• German language support (25% text expansion)</li>
            <li>• Municipal service accessibility</li>
            <li>• EU accessibility directive compliance</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};