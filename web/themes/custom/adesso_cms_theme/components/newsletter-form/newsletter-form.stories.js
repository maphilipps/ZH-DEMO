// phpcs:ignoreFile

import Component from './newsletter-form.twig';

const meta = {
  title: 'Form/NewsletterForm',
  component: Component,
  argTypes: {
    title: {
      name: 'Title',
      description: 'Title of the newsletter signup form',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    pre_headline: {
      name: 'Pre-headline',
      description: 'Pre-headline text above the main title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    summary: {
      name: 'Summary',
      description: 'Summary text explaining the newsletter value proposition',
      control: { type: 'textarea' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    modifier: {
      name: 'CSS Modifier Classes',
      description: 'Additional CSS classes for customizing form appearance and layout',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Style',
      },
    },
    placeholder_text: {
      name: 'Email Placeholder',
      description: 'Placeholder text for the email input field',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Email Address' },
        category: 'Form',
      },
    },
    button_text: {
      name: 'Submit Button Text',
      description: 'Text displayed on the submit button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Subscribe' },
        category: 'Form',
      },
    },
    show_privacy_checkbox: {
      name: 'Privacy Checkbox',
      description: 'Show GDPR privacy consent checkbox',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Privacy',
      },
    },
    privacy_text: {
      name: 'Privacy Text',
      description: 'Text for privacy checkbox and compliance',
      control: { type: 'textarea' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'I agree to receive newsletters and marketing communications.' },
        category: 'Privacy',
      },
    },
    form_state: {
      name: 'Form State',
      description: 'Current state of the form for demonstration purposes',
      control: { 
        type: 'select',
        options: ['default', 'loading', 'success', 'error', 'validation_error']
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Interaction',
      },
    },
    show_labels: {
      name: 'Show Labels',
      description: 'Display visible form field labels',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Accessibility',
      },
    },
    theme_variant: {
      name: 'Theme Variant',
      description: 'Visual theme variant for the form',
      control: { 
        type: 'select',
        options: ['light', 'dark', 'colored', 'minimal']
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
        category: 'Style',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
**Newsletter Form Component** - Interactive email subscription form with comprehensive validation, form states, and GDPR compliance features.

## Component Features

### 🚀 **Core Functionality**
- **Real-time Email Validation**: Instant feedback with common domain suggestions
- **AJAX Form Submission**: Seamless submission without page reload
- **Multiple Form States**: Loading, success, error, and validation states
- **GDPR Compliance**: Optional privacy checkbox and consent handling
- **Accessibility First**: Screen reader support, keyboard navigation, ARIA labels

### 📱 **Responsive Design**
- **Mobile-First Layout**: Optimized for all device sizes
- **Flexible Form Layout**: Stacked on mobile, inline on desktop
- **Touch-Friendly**: Large tap targets and intuitive interactions

### 🎨 **Customization Options**
- **Theme Variants**: Light, dark, colored, and minimal themes
- **Custom Styling**: Modifier classes for visual customization
- **Flexible Content**: Optional pre-headline, title, and summary
- **Branded CTAs**: Customizable button text and styling

## TWIG Usage Examples

### Basic Newsletter Signup
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  pre_headline: 'Stay Informed',
  title: 'Subscribe to Our Newsletter',
  summary: 'Get the latest updates, insights, and exclusive content delivered directly to your inbox.'
} %}
\`\`\`

### GDPR Compliant Form
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  title: 'Join Our Community',
  summary: 'Subscribe to receive updates and exclusive content.',
  show_privacy_checkbox: true,
  privacy_text: 'I consent to receive marketing emails and understand I can unsubscribe at any time. View our <a href="/privacy">Privacy Policy</a>.',
  button_text: 'Subscribe Now'
} %}
\`\`\`

### Blog Subscription with Custom Styling
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  pre_headline: 'Never Miss a Post',
  title: 'Subscribe to Our Blog',
  summary: 'Get notified when we publish new articles, tutorials, and insights.',
  modifier: 'bg-blue-50 border border-blue-200 rounded-lg p-8',
  placeholder_text: 'Your email address',
  button_text: 'Get Updates'
} %}
\`\`\`

### Dark Theme Footer Form
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  title: 'Stay Connected',
  summary: 'Get exclusive insights and updates delivered to your inbox.',
  modifier: 'bg-gray-900 text-white py-12',
  theme_variant: 'dark',
  button_text: 'Join Newsletter'
} %}
\`\`\`

### Minimal Inline Form
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  title: 'Newsletter',
  summary: 'Get weekly updates.',
  modifier: 'py-6',
  theme_variant: 'minimal',
  placeholder_text: 'Enter email',
  button_text: 'Subscribe'
} %}
\`\`\`

### Marketing Campaign Form
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  pre_headline: 'Exclusive Access',
  title: 'Early Bird Special',
  summary: 'Be the first to know about our upcoming product launch and get 20% off.',
  modifier: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg',
  button_text: 'Get Early Access',
  show_privacy_checkbox: true,
  privacy_text: 'I agree to receive promotional emails about this campaign.'
} %}
\`\`\`

### Weekly Digest Subscription
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  pre_headline: 'Weekly Digest',
  title: 'Industry Insights & Trends',
  summary: 'Every Friday, receive curated industry news, actionable insights, and expert analysis delivered to your inbox.',
  placeholder_text: 'Work email address',
  button_text: 'Subscribe to Digest'
} %}
\`\`\`

### Event Updates Form
\`\`\`twig
{% include 'sdc:newsletter-form' with {
  pre_headline: 'Event Updates',
  title: 'Don\\'t Miss Out',
  summary: 'Get notified about upcoming events, workshops, and exclusive networking opportunities.',
  modifier: 'border-l-4 border-blue-500 pl-6',
  button_text: 'Stay Informed'
} %}
\`\`\`

## JavaScript Integration

### Form Submission Handling
\`\`\`javascript
// Custom form submission endpoint
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  
  fetch('/api/newsletter/subscribe', {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showSuccessMessage('Thank you for subscribing!');
    } else {
      showErrorMessage(data.message || 'Subscription failed. Please try again.');
    }
  });
});
\`\`\`

### Third-Party Integration Examples

#### Mailchimp Integration
\`\`\`javascript
// Mailchimp API integration
function subscribeToMailchimp(email) {
  const data = {
    email_address: email,
    status: 'subscribed'
  };
  
  fetch('/mailchimp/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
\`\`\`

#### Constant Contact Integration
\`\`\`javascript
// Constant Contact API integration
function subscribeToConstantContact(email) {
  const contactData = {
    email_addresses: [{ email_address: email }],
    lists: [{ id: 'your-list-id' }]
  };
  
  fetch('/constant-contact/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData)
  });
}
\`\`\`

#### Custom Analytics Tracking
\`\`\`javascript
// Track newsletter subscriptions
function trackNewsletterSubscription(email, source) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'newsletter_subscription', {
      email: email,
      source: source,
      event_category: 'engagement'
    });
  }
}
\`\`\`

## Validation Features

### Real-Time Email Validation
- **Format Validation**: Ensures proper email format
- **Domain Suggestions**: Suggests corrections for common typos (e.g., gmial.com → gmail.com)
- **Required Field Validation**: Visual feedback for empty fields
- **Accessibility Support**: Screen reader announcements for validation messages

### Privacy & GDPR Compliance
- **Consent Checkbox**: Optional privacy agreement checkbox
- **Clear Privacy Text**: Transparent communication about data usage
- **Unsubscribe Links**: Easy opt-out mechanisms
- **Data Protection**: Secure handling of email addresses

## Use Cases & Applications

### 📧 **Content Marketing**
- **Blog Subscriptions**: Article and tutorial notifications
- **Newsletter Campaigns**: Regular content updates and insights
- **Weekly Digests**: Curated content summaries
- **Industry Reports**: Specialized content for target audiences

### 🏢 **Business Communications**
- **Company Updates**: Product launches and announcements
- **Event Notifications**: Workshop and webinar alerts
- **Customer Success**: Onboarding and retention campaigns
- **Partner Communications**: B2B relationship management

### 🛍️ **E-commerce & Marketing**
- **Promotional Campaigns**: Sales and special offers
- **Product Updates**: New arrivals and restocks
- **Abandoned Cart Recovery**: Re-engagement campaigns
- **Loyalty Programs**: Exclusive member communications

### 📱 **Website Integration**
- **Footer Forms**: Site-wide subscription options
- **Popup Modals**: Exit-intent or timed subscriptions
- **Content Gates**: Premium content access
- **Landing Pages**: Campaign-specific forms

## Technical Implementation

### Backend Integration Points
- **Drupal Webform**: Integration with Drupal's webform module
- **Custom Endpoints**: RESTful API for form submissions
- **Third-Party Services**: Mailchimp, Constant Contact, SendGrid
- **Database Storage**: Local subscriber management

### Performance Considerations
- **Lazy Loading**: Load JavaScript only when needed
- **Caching**: Cache form markup for faster rendering
- **CDN Integration**: Serve assets from content delivery networks
- **Progressive Enhancement**: Works without JavaScript
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

export const NewsletterForm = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    pre_headline: 'Stay Informed',
    title: 'Subscribe to Our Newsletter',
    summary: 'Get the latest updates, insights, and exclusive content delivered directly to your inbox.',
    modifier: '',
  },
};

export const Minimal = {
  args: {
    ...NewsletterForm.args,
    pre_headline: '',
    title: 'Stay Updated',
    summary: 'Subscribe for weekly updates and insights.',
  },
};

export const BlogSubscription = {
  args: {
    ...NewsletterForm.args,
    pre_headline: 'Never Miss a Post',
    title: 'Subscribe to Our Blog',
    summary: 'Get notified when we publish new articles, tutorials, and insights.',
  },
};

export const CompanyUpdates = {
  args: {
    ...NewsletterForm.args,
    pre_headline: 'Company News',
    title: 'Stay Connected',
    summary: 'Be the first to know about product launches and company milestones.',
  },
};

export const WeeklyDigest = {
  args: {
    ...NewsletterForm.args,
    pre_headline: 'Weekly Digest',
    title: 'Industry Insights & Trends',
    summary: 'Every Friday, receive curated industry news and actionable insights.',
  },
};

export const CompactFooter = {
  args: {
    ...NewsletterForm.args,
    pre_headline: '',
    title: 'Newsletter',
    summary: 'Get updates delivered to your inbox.',
    modifier: 'py-6',
  },
};

export const DarkTheme = {
  args: {
    ...NewsletterForm.args,
    pre_headline: 'Stay Connected',
    title: 'Join Our Newsletter',
    summary: 'Get exclusive insights and updates delivered to your inbox.',
    modifier: 'bg-gray-900 text-white',
  },
};

