/**
 * @file
 * Storybook stories for the Foundation Link Component
 * 
 * Comprehensive documentation and testing of link variants for municipal portals.
 */

import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Foundation/Link',
  component: 'link',
  parameters: {
    docs: {
      description: {
        component: `
# Foundation Link Component

A comprehensive, accessible link component designed for Swiss municipal portals. 
Provides WCAG 2.1 AA compliance, security features, and multiple variants for different use cases.

## Features

- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation
- **Security**: Automatic security attributes for external links
- **Municipal Compliance**: Swiss government portal standards
- **Variants**: Multiple styling options (default, button, external, download, etc.)
- **Progressive Enhancement**: JavaScript behaviors for enhanced functionality
- **Multilingual**: Support for Swiss language requirements

## Usage

\`\`\`twig
{{ include('adesso_cms_theme:link', {
  text: 'Visit Services',
  url: '/services',
  variant: 'button'
}) }}
\`\`\`
        `
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            options: { level: 'AA' }
          },
          {
            id: 'focus-order-semantics',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The visible text of the link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    url: {
      control: 'text',
      description: 'The destination URL or URI',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'button', 'external', 'download', 'phone', 'email', 'inline'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    },
    title: {
      control: 'text',
      description: 'Optional title attribute for additional context',
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' }
      }
    },
    target: {
      control: { type: 'select' },
      options: [null, '_blank', '_self', '_parent', '_top'],
      description: 'Link target attribute',
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' }
      }
    },
    download: {
      control: 'boolean',
      description: 'Download attribute for file links',
      table: {
        type: { summary: 'boolean|string|null' },
        defaultValue: { summary: 'false' }
      }
    },
    aria_label: {
      control: 'text',
      description: 'Custom ARIA label for screen readers',
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' }
      }
    },
    show_external_indicator: {
      control: 'boolean',
      description: 'Show visual indicator for external links',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    municipality_compliant: {
      control: 'boolean',
      description: 'Enable Swiss municipal compliance features',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  }
};

// Default story
export const Default = {
  args: {
    text: 'Default Link',
    url: '/example'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', '/example');
    await expect(link).toHaveClass('adesso-link');
  }
};

// Button variant
export const Button = {
  args: {
    text: 'Button Link',
    url: '/services',
    variant: 'button'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toHaveAttribute('data-variant', 'button');
    await expect(link).toHaveClass('bg-blue-600');
  }
};

// External link
export const External = {
  args: {
    text: 'External Website',
    url: 'https://www.example.com',
    variant: 'external'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('data-external', 'true');
    
    // Check for external indicator
    const indicator = canvas.getByText(/opens in new window/i);
    await expect(indicator).toBeInTheDocument();
  }
};

// Download link
export const Download = {
  args: {
    text: 'Download PDF',
    url: '/files/document.pdf',
    variant: 'download',
    download: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toHaveAttribute('download');
    await expect(link).toHaveAttribute('data-variant', 'download');
    
    // Check for download icon
    const icon = link.querySelector('.adesso-link__icon');
    await expect(icon).toBeInTheDocument();
  }
};

// Phone link
export const Phone = {
  args: {
    text: '+41 44 123 45 67',
    url: 'tel:+41441234567',
    variant: 'phone'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toHaveAttribute('href', 'tel:+41441234567');
    await expect(link).toHaveAttribute('data-variant', 'phone');
    
    // Check for phone icon
    const icon = link.querySelector('.adesso-link__icon');
    await expect(icon).toBeInTheDocument();
  }
};

// Email link
export const Email = {
  args: {
    text: 'info@municipality.ch',
    url: 'mailto:info@municipality.ch',
    variant: 'email'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toHaveAttribute('href', 'mailto:info@municipality.ch');
    await expect(link).toHaveAttribute('data-variant', 'email');
    
    // Check for email icon
    const icon = link.querySelector('.adesso-link__icon');
    await expect(icon).toBeInTheDocument();
  }
};

// Inline variant
export const Inline = {
  args: {
    text: 'inline link',
    url: '/services',
    variant: 'inline'
  },
  decorators: [
    (Story) => `
      <p class="text-gray-700">
        This is a paragraph with an ${Story()} embedded within the text content.
      </p>
    `
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toHaveAttribute('data-variant', 'inline');
  }
};

// Size variants
export const Sizes = {
  render: () => `
    <div class="space-y-4">
      <div>
        ${include('adesso_cms_theme:link', {
          text: 'Small Link',
          url: '/example',
          variant: 'button',
          size: 'sm'
        })}
      </div>
      <div>
        ${include('adesso_cms_theme:link', {
          text: 'Default Link',
          url: '/example',
          variant: 'button',
          size: 'default'
        })}
      </div>
      <div>
        ${include('adesso_cms_theme:link', {
          text: 'Large Link',
          url: '/example',
          variant: 'button',
          size: 'lg'
        })}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the link component.'
      }
    }
  }
};

// All variants showcase
export const AllVariants = {
  render: () => `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3">Navigation Links</h3>
        <div class="space-y-2">
          ${include('adesso_cms_theme:link', {
            text: 'Default Link',
            url: '/services'
          })}
          ${include('adesso_cms_theme:link', {
            text: 'Inline Link',
            url: '/about',
            variant: 'inline'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-3">Action Links</h3>
        <div class="space-y-2">
          ${include('adesso_cms_theme:link', {
            text: 'Primary Button',
            url: '/apply',
            variant: 'button'
          })}
          ${include('adesso_cms_theme:link', {
            text: 'Download Form',
            url: '/files/application.pdf',
            variant: 'download',
            download: true
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-3">Contact Links</h3>
        <div class="space-y-2">
          ${include('adesso_cms_theme:link', {
            text: '+41 44 123 45 67',
            url: 'tel:+41441234567',
            variant: 'phone'
          })}
          ${include('adesso_cms_theme:link', {
            text: 'info@municipality.ch',
            url: 'mailto:info@municipality.ch',
            variant: 'email'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-3">External Links</h3>
        <div class="space-y-2">
          ${include('adesso_cms_theme:link', {
            text: 'External Website',
            url: 'https://www.example.com',
            variant: 'external'
          })}
          ${include('adesso_cms_theme:link', {
            text: 'Government Portal',
            url: 'https://www.ch.ch'
          })}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all link variants and their use cases in a municipal portal context.'
      }
    }
  }
};

// Advanced Accessibility Testing
export const AdvancedAccessibilityTest = {
  render: () => `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">WCAG 2.1 AA Compliance Testing</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium mb-2">Color Contrast (Minimum 4.5:1)</h4>
            ${include('adesso_cms_theme:link', {
              text: 'High Contrast Link',
              url: '/high-contrast-test',
              modifier: 'text-blue-700 hover:text-blue-900'
            })}
          </div>
          
          <div>
            <h4 class="font-medium mb-2">Focus Indicators</h4>
            ${include('adesso_cms_theme:link', {
              text: 'Keyboard Focus Test',
              url: '/focus-test',
              aria_label: 'Test keyboard navigation and focus indicators'
            })}
          </div>
          
          <div>
            <h4 class="font-medium mb-2">Target Size (Minimum 44x44px)</h4>
            ${include('adesso_cms_theme:link', {
              text: 'Large Touch Target',
              url: '/touch-target-test',
              variant: 'button',
              size: 'lg',
              title: 'This link meets minimum touch target requirements'
            })}
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Screen Reader Testing</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium mb-2">Descriptive Link Text</h4>
            <p class="text-sm text-gray-600 mb-2">Avoid "click here" or "read more":</p>
            ${include('adesso_cms_theme:link', {
              text: 'Download Municipal Tax Forms',
              url: '/documents/tax-forms.pdf',
              variant: 'download',
              download: true,
              aria_label: 'Download municipal tax forms PDF document'
            })}
          </div>
          
          <div>
            <h4 class="font-medium mb-2">Context-Aware ARIA Labels</h4>
            <p class="text-sm text-gray-600 mb-2">Provides additional context for screen readers:</p>
            ${include('adesso_cms_theme:link', {
              text: 'Services',
              url: '/services',
              aria_label: 'Navigate to municipal services directory and online applications'
            })}
          </div>
          
          <div>
            <h4 class="font-medium mb-2">External Link Announcements</h4>
            <p class="text-sm text-gray-600 mb-2">Announces that link opens in new window:</p>
            ${include('adesso_cms_theme:link', {
              text: 'Federal Tax Administration',
              url: 'https://www.estv.admin.ch',
              variant: 'external',
              show_external_indicator: true
            })}
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Swiss Accessibility Standards</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium mb-2">P028 Compliance</h4>
            <p class="text-sm text-gray-600 mb-2">Swiss federal accessibility standard:</p>
            ${include('adesso_cms_theme:link', {
              text: 'Behindertengleichstellungsgesetz',
              url: 'https://www.fedlex.admin.ch/eli/cc/2003/667/de',
              variant: 'external',
              aria_label: 'Link zum Behindertengleichstellungsgesetz auf fedlex.admin.ch',
              title: 'Schweizer Bundesgesetz über die Gleichstellung von Menschen mit Behinderungen'
            })}
          </div>
          
          <div>
            <h4 class="font-medium mb-2">Multiple Languages Support</h4>
            <div class="flex gap-4">
              ${include('adesso_cms_theme:link', {
                text: 'Barrierefreiheit (DE)',
                url: '/de/barrierefreiheit',
                aria_label: 'Informationen zur Barrierefreiheit auf Deutsch'
              })}
              
              ${include('adesso_cms_theme:link', {
                text: 'Accessibilité (FR)',
                url: '/fr/accessibilite',
                aria_label: 'Informations sur l\'accessibilité en français'
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Motor Impairment Considerations</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium mb-2">Large Click Areas</h4>
            ${include('adesso_cms_theme:link', {
              text: 'Emergency Services',
              url: 'tel:144',
              variant: 'button',
              size: 'lg',
              modifier: 'px-8 py-4 min-h-12'
            })}
          </div>
          
          <div>
            <h4 class="font-medium mb-2">Adequate Spacing</h4>
            <div class="space-y-6">
              ${include('adesso_cms_theme:link', {
                text: 'Service Request',
                url: '/services/request',
                variant: 'button'
              })}
              
              ${include('adesso_cms_theme:link', {
                text: 'Contact Form',
                url: '/contact',
                variant: 'button'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Advanced Accessibility Testing Scenarios**

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Focus Indicators**: Visible focus states for keyboard navigation  
- **Target Size**: Minimum 44x44px clickable areas
- **Keyboard Navigation**: Full functionality without mouse

### Screen Reader Optimization
- **Descriptive Link Text**: Meaningful text that describes destination
- **ARIA Labels**: Additional context for assistive technologies
- **External Link Announcements**: Proper notification of new windows
- **Context Preservation**: Links maintain meaning when read in isolation

### Swiss Accessibility Standards
- **P028 Compliance**: Federal accessibility requirements
- **BehiG Conformance**: Disability Equality Act compliance
- **Multilingual Support**: Accessibility in German, French, Italian
- **Cultural Accessibility**: Swiss-specific interaction patterns

### Motor Impairment Support
- **Large Click Areas**: Generous touch targets for limited dexterity
- **Adequate Spacing**: Prevents accidental activation
- **Persistent Focus**: Clear indication of current focus position
- **Alternative Input**: Support for assistive input devices

**Testing Tools:**
- Automated accessibility testing with axe-core
- Manual keyboard navigation testing
- Screen reader compatibility verification
- High contrast mode validation
        `
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', options: { level: 'AA' } },
          { id: 'keyboard', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'aria-valid-attr', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'link-name', enabled: true }
        ]
      }
    }
  }
};

// Interactive Security Validation
export const InteractiveSecurityValidation = {
  render: () => `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">External Link Security</h3>
        <div class="space-y-4">
          <div class="p-4 border border-green-200 rounded-lg bg-green-50">
            <h4 class="font-medium text-green-800 mb-2">✓ Secure External Links</h4>
            ${include('adesso_cms_theme:link', {
              text: 'Swiss Government Portal',
              url: 'https://www.admin.ch',
              variant: 'external',
              show_external_indicator: true
            })}
            <p class="text-xs text-green-700 mt-2">
              Automatically adds rel="noopener noreferrer" and target="_blank"
            </p>
          </div>
          
          <div class="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <h4 class="font-medium text-yellow-800 mb-2">⚠ Security Warning Demo</h4>
            ${include('adesso_cms_theme:link', {
              text: 'Suspicious External Site',
              url: 'https://suspicious-example.com',
              variant: 'external',
              municipality_compliant: true,
              show_external_indicator: true,
              title: 'Warning: This link leads to an external website. Verify the URL before proceeding.'
            })}
            <p class="text-xs text-yellow-700 mt-2">
              Municipal compliance mode shows warnings for unknown external domains
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">URL Validation</h3>
        <div class="space-y-4">
          <div class="p-4 border border-red-200 rounded-lg bg-red-50">
            <h4 class="font-medium text-red-800 mb-2">✗ Invalid URL Handling</h4>
            ${include('adesso_cms_theme:link', {
              text: 'Invalid JavaScript Link',
              url: 'javascript:alert("xss")',
              variant: 'button',
              modifier: 'opacity-50 cursor-not-allowed'
            })}
            <p class="text-xs text-red-700 mt-2">
              JavaScript URLs are automatically blocked and marked invalid
            </p>
          </div>
          
          <div class="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 class="font-medium text-blue-800 mb-2">✓ Protocol Validation</h4>
            <div class="space-y-2">
              ${include('adesso_cms_theme:link', {
                text: 'HTTPS Link',
                url: 'https://secure.example.com',
                variant: 'external'
              })}
              
              ${include('adesso_cms_theme:link', {
                text: 'Phone Protocol',
                url: 'tel:+41441234567',
                variant: 'phone'
              })}
              
              ${include('adesso_cms_theme:link', {
                text: 'Email Protocol',
                url: 'mailto:test@example.ch',
                variant: 'email'
              })}
            </div>
            <p class="text-xs text-blue-700 mt-2">
              Only safe protocols (https, tel, mailto) are allowed
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Swiss Municipal Security</h3>
        <div class="space-y-4">
          <div class="p-4 border border-green-200 rounded-lg bg-green-50">
            <h4 class="font-medium text-green-800 mb-2">✓ Trusted Government Domains</h4>
            <div class="space-y-2">
              ${include('adesso_cms_theme:link', {
                text: 'Federal Administration',
                url: 'https://www.admin.ch',
                variant: 'external'
              })}
              
              ${include('adesso_cms_theme:link', {
                text: 'Canton Zürich',
                url: 'https://www.zh.ch',
                variant: 'external'
              })}
              
              ${include('adesso_cms_theme:link', {
                text: 'Municipality Portal',
                url: 'https://gemeinde.ch',
                variant: 'external'
              })}
            </div>
            <p class="text-xs text-green-700 mt-2">
              Government domains (.admin.ch, .zh.ch) are pre-approved for citizens
            </p>
          </div>
          
          <div class="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 class="font-medium text-blue-800 mb-2">🔒 Privacy Protection</h4>
            ${include('adesso_cms_theme:link', {
              text: 'Privacy Policy',
              url: '/privacy-policy',
              aria_label: 'Read our privacy policy and data protection measures'
            })}
            <p class="text-xs text-blue-700 mt-2">
              All external links include privacy warnings and user consent
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Download Security</h3>
        <div class="space-y-4">
          <div class="p-4 border border-green-200 rounded-lg bg-green-50">
            <h4 class="font-medium text-green-800 mb-2">✓ Secure Downloads</h4>
            <div class="space-y-2">
              ${include('adesso_cms_theme:link', {
                text: 'Official Tax Form (PDF)',
                url: '/secure/documents/tax-form.pdf',
                variant: 'download',
                download: 'steuerformular-2024.pdf',
                title: 'Digitally signed PDF document (2.1 MB)'
              })}
              
              ${include('adesso_cms_theme:link', {
                text: 'Municipal Report (Excel)',
                url: '/secure/reports/annual-report.xlsx',
                variant: 'download',
                download: true,
                title: 'Virus-scanned spreadsheet file (1.8 MB)'
              })}
            </div>
            <p class="text-xs text-green-700 mt-2">
              All downloads are virus-scanned and digitally verified
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test security attributes on external links
    const externalLinks = canvas.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('http') && 
      !link.getAttribute('href')?.includes('zh-demo.ddev.site')
    );
    
    for (const link of externalLinks) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel');
      const rel = link.getAttribute('rel');
      await expect(rel).toContain('noopener');
      await expect(rel).toContain('noreferrer');
    }
    
    // Test download links
    const downloadLinks = canvas.getAllByRole('link').filter(link => 
      link.hasAttribute('download')
    );
    
    for (const link of downloadLinks) {
      await expect(link).toHaveAttribute('download');
      await expect(link).toHaveAttribute('data-variant', 'download');
    }
    
    // Test phone links
    const phoneLinks = canvas.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('tel:')
    );
    
    for (const link of phoneLinks) {
      await expect(link).toHaveAttribute('data-variant', 'phone');
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Interactive Security Validation**

### External Link Protection
- **Automatic Security Attributes**: rel="noopener noreferrer" prevents window.opener access
- **Target Validation**: External links properly open in new windows
- **Domain Verification**: Trusted government domains vs. unknown sites
- **User Warnings**: Clear indication when leaving municipal portal

### URL Security Validation  
- **Protocol Filtering**: Only safe protocols (https, tel, mailto) allowed
- **XSS Prevention**: JavaScript URLs automatically blocked
- **Input Sanitization**: All URLs validated before rendering
- **Error State Handling**: Invalid links marked and disabled

### Swiss Government Compliance
- **Trusted Domains**: Pre-approved .admin.ch, .zh.ch, municipality domains
- **Privacy Protection**: GDPR/Swiss data protection compliance
- **Citizen Safety**: Warnings for potentially harmful external links
- **Audit Trail**: Security validation logging for compliance

### Download Security
- **File Verification**: Digital signatures on official documents
- **Virus Scanning**: All downloads scanned before serving
- **File Type Validation**: Only approved document formats
- **Size Indication**: File sizes shown for user awareness

**Security Features:**
- Content Security Policy compliance
- XSS attack prevention
- Clickjacking protection
- Privacy-preserving external navigation
        `
      }
    }
  }
};

// Dark mode variant
export const DarkMode = {
  args: {
    text: 'Dark Mode Link',
    url: '/services',
    variant: 'button'
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1f2937' }
      ]
    },
    docs: {
      description: {
        story: 'Link component in dark mode, demonstrating municipal compliance for Swiss accessibility standards.'
      }
    }
  },
  decorators: [
    (Story) => `<div class="dark">${Story()}</div>`
  ]
};

// Municipal compliance demonstration
export const MunicipalCompliance = {
  args: {
    text: 'Gemeindeverwaltung Zürich',
    url: 'https://www.stadt-zuerich.ch',
    municipality_compliant: true,
    show_external_indicator: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    
    await expect(link).toHaveAttribute('data-municipality-compliant', 'true');
    
    // Test external link warning (would show in real browser)
    await userEvent.click(link);
  },
  parameters: {
    docs: {
      description: {
        story: `
Municipal compliance features include:
- WCAG 2.1 AA accessibility standards
- Swiss government design guidelines
- External link warnings for citizen protection
- High contrast mode support
- Multilingual considerations
        `
      }
    }
  }
};

// Swiss Municipal Portal Use Cases
export const SwissMunicipalPortal = {
  render: () => `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Canton Zürich Services</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Steuerverwaltung Kanton Zürich',
            url: 'https://www.zh.ch/de/steuern-finanzen.html',
            variant: 'external',
            title: 'Kantonale Steuerverwaltung - Öffnet in neuem Fenster'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Einwohnerregister anmelden',
            url: '/services/einwohnerregister',
            variant: 'button',
            aria_label: 'Online-Service zur Anmeldung im Einwohnerregister'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Baugesuch einreichen',
            url: '/forms/baugesuch.pdf',
            variant: 'download',
            download: 'baugesuch-formular.pdf',
            title: 'Baugesuch-Formular herunterladen (PDF, 2.5 MB)'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Emergency & Contact Services</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Notfall-Hotline: 144',
            url: 'tel:144',
            variant: 'phone',
            aria_label: 'Notfall-Nummer 144 anrufen',
            title: 'Medizinischer Notfall - Direkt anrufen'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Gemeinde Kontakt',
            url: 'mailto:gemeinde@beispielort.ch?subject=Bürgeranfrage',
            variant: 'email',
            aria_label: 'E-Mail an Gemeindeverwaltung senden',
            title: 'Direkte E-Mail an die Gemeindeverwaltung'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Störungsmeldung Stadtwerke',
            url: 'tel:+41442345678',
            variant: 'phone',
            aria_label: 'Störungsmeldung bei den Stadtwerken',
            title: '24h Störungshotline Stadtwerke'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Document Center</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Steuerformular 2024 (PDF)',
            url: '/documents/steuerformular-2024.pdf',
            variant: 'download',
            download: true,
            title: 'Steuerformular für das Jahr 2024 (PDF, 1.2 MB)',
            aria_label: 'Steuerformular 2024 als PDF herunterladen'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Abfallkalender 2024 (Excel)',
            url: '/documents/abfallkalender-2024.xlsx',
            variant: 'download',
            download: 'abfallkalender-2024.xlsx',
            title: 'Abfallkalender mit Abholterminen (Excel, 0.8 MB)'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Gemeindeordnung (PDF)',
            url: '/documents/gemeindeordnung.pdf',
            variant: 'download',
            download: true,
            title: 'Aktuelle Gemeindeordnung (PDF, 3.1 MB)'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Federal & Cantonal Links</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Bundesamt für Gesundheit (BAG)',
            url: 'https://www.bag.admin.ch/bag/de/home.html',
            variant: 'external',
            title: 'Bundesamt für Gesundheit - Öffnet in neuem Fenster'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'CH.CH - Behördenportal',
            url: 'https://www.ch.ch/de/',
            variant: 'external',
            title: 'Schweizer Behördenportal - Öffnet in neuem Fenster'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'E-Government Zürich',
            url: 'https://www.zh.ch/de/politik-staat/e-government.html',
            variant: 'external',
            title: 'Kantonales E-Government Portal - Öffnet in neuem Fenster'
          })}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Comprehensive Swiss Municipal Portal Use Cases**

This story demonstrates real-world scenarios for Swiss municipal portals:

### Canton Zürich Services
- Integration with cantonal tax administration
- Municipal registration services
- Building permit applications with downloadable forms

### Emergency & Contact Services  
- Swiss emergency numbers (144, 117, 118)
- Municipal contact channels
- Utility service hotlines

### Document Center
- Tax forms with proper file size indicators
- Municipal calendars and schedules
- Legal documents and regulations

### Federal & Cantonal Integration
- Links to federal departments (BAG, etc.)
- Swiss government portal (CH.CH)
- Cantonal e-government services

**Compliance Features:**
- WCAG 2.1 AA accessibility
- Proper ARIA labeling for screen readers
- Swiss-specific phone number formats
- File size and format indicators
- External link security measures
        `
      }
    }
  }
};

// Error state
export const ErrorState = {
  render: () => `
    <div class="space-y-4">
      <p class="text-sm text-gray-600">
        These examples show how the component handles invalid URLs and error states:
      </p>
      
      ${include('adesso_cms_theme:link', {
        text: 'Invalid URL Link',
        url: 'javascript:alert("xss")',
        variant: 'button'
      })}
      
      ${include('adesso_cms_theme:link', {
        text: 'Empty URL Link',
        url: '',
        variant: 'default'
      })}
      
      <p class="text-xs text-red-600 mt-2">
        Note: Invalid links will be marked with error state and prevented from executing.
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles invalid URLs and security threats.'
      }
    }
  }
};

// Multilingual Support (German/French)
export const MultilingualSupport = {
  render: () => `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Deutsch (German)</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Dienstleistungen anzeigen',
            url: '/de/dienstleistungen',
            variant: 'button',
            aria_label: 'Zu den kommunalen Dienstleistungen navigieren',
            title: 'Übersicht aller kommunalen Dienstleistungen'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Öffnungszeiten Gemeindehaus',
            url: '/de/kontakt/oeffnungszeiten',
            aria_label: 'Öffnungszeiten des Gemeindehauses anzeigen'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Abfallentsorgung-Info (PDF)',
            url: '/de/dokumente/abfallentsorgung.pdf',
            variant: 'download',
            download: true,
            title: 'Informationen zur Abfallentsorgung (PDF, 1.5 MB)',
            aria_label: 'Abfallentsorgung-Informationen als PDF herunterladen'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Notfall: 144',
            url: 'tel:144',
            variant: 'phone',
            aria_label: 'Medizinische Notfallnummer 144 anrufen',
            title: 'Sanitätsnotruf - Rund um die Uhr erreichbar'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Français (French)</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Voir les services',
            url: '/fr/services',
            variant: 'button',
            aria_label: 'Naviguer vers les services communaux',
            title: 'Aperçu de tous les services communaux'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Heures d\'ouverture mairie',
            url: '/fr/contact/heures-ouverture',
            aria_label: 'Afficher les heures d\'ouverture de la mairie'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Info gestion déchets (PDF)',
            url: '/fr/documents/gestion-dechets.pdf',
            variant: 'download',
            download: true,
            title: 'Informations sur la gestion des déchets (PDF, 1.5 MB)',
            aria_label: 'Télécharger les informations sur la gestion des déchets en PDF'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Urgence: 144',
            url: 'tel:144',
            variant: 'phone',
            aria_label: 'Appeler le numéro d\'urgence médicale 144',
            title: 'Urgences sanitaires - Disponible 24h/24'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Language Switching</h3>
        <div class="flex gap-4">
          ${include('adesso_cms_theme:link', {
            text: 'Deutsch',
            url: '/de/aktuelle-seite',
            variant: 'inline',
            aria_label: 'Diese Seite auf Deutsch anzeigen',
            title: 'Sprache zu Deutsch wechseln'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Français',
            url: '/fr/page-actuelle',
            variant: 'inline',
            aria_label: 'Afficher cette page en français',
            title: 'Changer la langue en français'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Italiano',
            url: '/it/pagina-corrente',
            variant: 'inline',
            aria_label: 'Visualizza questa pagina in italiano',
            title: 'Cambia lingua in italiano'
          })}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Multilingual Support for Swiss Municipal Portals**

This story demonstrates proper multilingual implementation:

### Language-Specific Content
- German (Deutsch): Primary language for most Swiss municipalities
- French (Français): Required in bilingual cantons and municipalities  
- Italian (Italiano): For Ticino and trilingual municipalities

### Accessibility Considerations
- Proper ARIA labels in each language
- Consistent navigation patterns across languages
- Cultural adaptation of contact methods
- Language-appropriate emergency information

### Technical Implementation
- URL structure with language prefixes (/de/, /fr/, /it/)
- Consistent file naming conventions
- Language-specific document variants
- Proper hreflang attributes (handled by Drupal)

### Compliance Standards
- Swiss federal multilingual requirements
- Cantonal language legislation compliance
- Municipal language policy adherence
- WCAG 2.1 AA accessibility in all languages
        `
      }
    }
  }
};

// Advanced Emergency and Citizen Services
export const EmergencyAndCitizenServices = {
  render: () => `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4 text-red-600">Emergency Services</h3>
        <div class="space-y-3 p-4 border-2 border-red-200 rounded-lg bg-red-50">
          ${include('adesso_cms_theme:link', {
            text: 'Sanitätsnotruf: 144',
            url: 'tel:144',
            variant: 'phone',
            aria_label: 'Medizinischen Notfall melden - 144 anrufen',
            title: 'Sanitätsnotruf - Medizinische Notfälle',
            modifier: 'text-red-700 font-semibold hover:text-red-800'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Polizeinotruf: 117',
            url: 'tel:117',
            variant: 'phone',
            aria_label: 'Polizeinotruf 117 wählen',
            title: 'Polizeinotruf - Verbrechen und Unfälle',
            modifier: 'text-red-700 font-semibold hover:text-red-800'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Feuerwehr: 118',
            url: 'tel:118',
            variant: 'phone',
            aria_label: 'Feuerwehr-Notruf 118 anrufen',
            title: 'Feuerwehr - Brände und technische Hilfe',
            modifier: 'text-red-700 font-semibold hover:text-red-800'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Tox-Zentrum: 145',
            url: 'tel:145',
            variant: 'phone',
            aria_label: 'Toxikologie-Zentrum 145 kontaktieren',
            title: 'Vergiftungsnotfälle - Tox-Zentrum',
            modifier: 'text-red-700 font-semibold hover:text-red-800'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Citizen Service Portal</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Online-Schalter öffnen',
            url: '/services/online-schalter',
            variant: 'button',
            aria_label: 'Zum digitalen Bürgerschalter navigieren',
            title: 'Digitaler Bürgerschalter - Alle Services online'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Wohnsitz ummelden',
            url: '/services/ummeldung',
            variant: 'button',
            aria_label: 'Online-Service für Wohnsitz-Ummeldung',
            title: 'Wohnsitz online ummelden - Digitaler Service'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Termin vereinbaren',
            url: '/termine/buchen',
            variant: 'button',
            aria_label: 'Termin bei der Gemeindeverwaltung buchen',
            title: 'Online-Terminbuchung für Beratungsgespräche'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Municipal Information</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Gemeindenachrichten abonnieren',
            url: 'mailto:newsletter@gemeinde.ch?subject=Newsletter-Anmeldung',
            variant: 'email',
            aria_label: 'Gemeinde-Newsletter per E-Mail abonnieren',
            title: 'Monatliche Gemeinde-Nachrichten per E-Mail erhalten'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Gemeindeversammlung (PDF)',
            url: '/dokumente/gemeindeversammlung-einladung.pdf',
            variant: 'download',
            download: 'gemeindeversammlung-einladung.pdf',
            title: 'Einladung zur Gemeindeversammlung (PDF, 0.8 MB)',
            aria_label: 'Einladung zur nächsten Gemeindeversammlung herunterladen'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Abstimmungsunterlagen',
            url: '/abstimmungen/aktuelle-vorlagen',
            aria_label: 'Aktuelle Abstimmungsvorlagen anzeigen',
            title: 'Informationen zu anstehenden Abstimmungen'
          })}
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Accessibility Support</h3>
        <div class="space-y-3">
          ${include('adesso_cms_theme:link', {
            text: 'Barrierefreiheit-Erklärung',
            url: '/accessibility-statement',
            aria_label: 'Erklärung zur Barrierefreiheit dieser Website',
            title: 'Informationen zur Barrierefreiheit und Kontaktmöglichkeiten'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Feedback zu Barrierefreiheit',
            url: 'mailto:accessibility@gemeinde.ch?subject=Barrierefreiheit-Feedback',
            variant: 'email',
            aria_label: 'Feedback zur Barrierefreiheit der Website senden',
            title: 'Melden Sie Probleme mit der Barrierefreiheit'
          })}
          
          ${include('adesso_cms_theme:link', {
            text: 'Leichte Sprache',
            url: '/leichte-sprache',
            aria_label: 'Inhalte in leichter Sprache anzeigen',
            title: 'Website-Inhalte in vereinfachter, leichter Sprache'
          })}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Advanced Emergency and Citizen Services**

### Emergency Services (Swiss Standards)
- **144**: Medical emergencies (Sanitätsnotruf)
- **117**: Police emergencies (Polizeinotruf)  
- **118**: Fire department (Feuerwehr)
- **145**: Poison control center (Tox-Zentrum)

All emergency links include:
- High contrast styling for urgency
- Proper ARIA labels for screen readers
- Descriptive titles for context
- Direct dial functionality

### Digital Citizen Services
- Online municipal counter (Online-Schalter)
- Address change notifications
- Appointment booking system
- Service request management

### Municipal Communication
- Newsletter subscription with pre-filled subjects
- Public meeting announcements
- Voting information access
- Community engagement tools

### Accessibility Features
- Accessibility statement compliance
- Feedback mechanisms for accessibility issues
- Easy language content (Leichte Sprache)
- Screen reader optimized navigation

**Implementation Notes:**
- All phone links use proper tel: protocol
- Email links include helpful subject lines
- Download links specify file sizes
- External links have security attributes
        `
      }
    }
  }
};

// Developer Integration Guidelines
export const DeveloperIntegrationGuide = {
  render: () => `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Basic Integration</h3>
        <div class="space-y-4">
          <div class="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 class="font-medium mb-2">Twig Template Usage</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>{{ include('adesso_cms_theme:link', {
  text: 'Your Link Text',
  url: '/your-destination',
  variant: 'button',
  size: 'default',
  aria_label: 'Descriptive label for screen readers'
}) }}</code></pre>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 class="font-medium mb-2">Required Properties</h4>
            <ul class="text-sm space-y-1">
              <li><strong>text</strong>: Visible link text (string, required)</li>
              <li><strong>url</strong>: Destination URL or URI (string, required)</li>
            </ul>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 class="font-medium mb-2">Optional Properties</h4>
            <ul class="text-sm space-y-1">
              <li><strong>variant</strong>: default|button|external|download|phone|email|inline</li>
              <li><strong>size</strong>: sm|default|lg</li>
              <li><strong>aria_label</strong>: Custom ARIA label for accessibility</li>
              <li><strong>title</strong>: Tooltip text</li>
              <li><strong>modifier</strong>: Additional CSS classes</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Advanced Integration</h3>
        <div class="space-y-4">
          <div class="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 class="font-medium mb-2">Drupal Field Integration</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>{{ include('adesso_cms_theme:link', {
  text: content.field_link_text|render|striptags,
  url: content.field_link_url.0.uri,
  title: content.field_link_text.0.title,
  variant: content.field_link_variant|default('default')
}) }}</code></pre>
          </div>
          
          <div class="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 class="font-medium mb-2">Paragraph Integration</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>{% for item in content.field_links %}
  {{ include('adesso_cms_theme:link', {
    text: item['#paragraph'].field_text.value,
    url: item['#paragraph'].field_url.uri,
    variant: item['#paragraph'].field_variant.value
  }) }}
{% endfor %}</code></pre>
          </div>
          
          <div class="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 class="font-medium mb-2">Menu Integration</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>{% for item in items %}
  {{ include('adesso_cms_theme:link', {
    text: item.title,
    url: item.url,
    variant: item.in_active_trail ? 'button' : 'default',
    aria_label: 'Navigate to ' ~ item.title ~ ' page'
  }) }}
{% endfor %}</code></pre>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">JavaScript Enhancement</h3>
        <div class="space-y-4">
          <div class="p-4 border border-green-200 rounded-lg bg-green-50">
            <h4 class="font-medium mb-2">Automatic Behaviors</h4>
            <ul class="text-sm space-y-1">
              <li>✓ External link detection and security attributes</li>
              <li>✓ URL validation and XSS prevention</li>
              <li>✓ Analytics tracking integration</li>
              <li>✓ Municipal compliance warnings</li>
            </ul>
          </div>
          
          <div class="p-4 border border-green-200 rounded-lg bg-green-50">
            <h4 class="font-medium mb-2">Custom Event Handling</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>// Listen for link interactions
document.addEventListener('adesso:link:click', function(event) {
  const link = event.detail.element;
  const url = event.detail.url;
  const variant = event.detail.variant;
  
  // Custom analytics or behavior
  console.log('Link clicked:', { url, variant });
});</code></pre>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Best Practices</h3>
        <div class="space-y-4">
          <div class="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <h4 class="font-medium mb-2">Accessibility Guidelines</h4>
            <ul class="text-sm space-y-1">
              <li>• Always provide descriptive link text (avoid "click here")</li>
              <li>• Use aria_label for additional context when needed</li>
              <li>• Ensure minimum 44x44px touch targets for buttons</li>
              <li>• Test with keyboard navigation and screen readers</li>
              <li>• Maintain 4.5:1 color contrast ratio</li>
            </ul>
          </div>
          
          <div class="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <h4 class="font-medium mb-2">Security Guidelines</h4>
            <ul class="text-sm space-y-1">
              <li>• Never use javascript: URLs</li>
              <li>• Validate all user-provided URLs</li>
              <li>• Use HTTPS for all external links</li>
              <li>• Enable municipal compliance for citizen portals</li>
              <li>• Add appropriate warnings for external links</li>
            </ul>
          </div>
          
          <div class="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <h4 class="font-medium mb-2">Performance Guidelines</h4>
            <ul class="text-sm space-y-1">
              <li>• Use appropriate variants (avoid overusing buttons)</li>
              <li>• Minimize custom CSS through modifier classes</li>
              <li>• Leverage browser prefetching for internal links</li>
              <li>• Test with large numbers of links (performance story)</li>
              <li>• Use progressive enhancement patterns</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4">Testing Integration</h3>
        <div class="space-y-4">
          <div class="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <h4 class="font-medium mb-2">Unit Testing</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>import { render } from '@testing-library/react';
import { include } from '../path/to/twig-renderer';

test('renders accessible link', () => {
  const { getByRole } = render(include('adesso_cms_theme:link', {
    text: 'Test Link',
    url: '/test',
    aria_label: 'Navigate to test page'
  }));
  
  const link = getByRole('link');
  expect(link).toHaveAttribute('aria-label', 'Navigate to test page');
});</code></pre>
          </div>
          
          <div class="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <h4 class="font-medium mb-2">Visual Regression</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>// backstop.json scenario
{
  "label": "Link Variants",
  "url": "http://localhost:6006/iframe.html?id=foundation-link--all-variants",
  "selectors": [".adesso-link"],
  "misMatchThreshold": 0.1,
  "requireSameDimensions": false
}</code></pre>
          </div>
          
          <div class="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <h4 class="font-medium mb-2">E2E Testing</h4>
            <pre class="text-sm bg-white p-3 rounded border overflow-x-auto"><code>// Playwright test
test('link navigation works', async ({ page }) => {
  await page.goto('/page-with-links');
  
  const link = page.getByRole('link', { name: 'Services' });
  await expect(link).toBeVisible();
  await link.click();
  
  await expect(page).toHaveURL('/services');
});</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Developer Integration Guidelines**

### Implementation Patterns

#### Basic Usage
The link component follows Drupal SDC conventions with required text and url parameters. All other properties are optional with sensible defaults.

#### Drupal Integration  
- **Field Integration**: Direct mapping from Drupal fields
- **Paragraph Integration**: Loop through paragraph entities
- **Menu Integration**: Transform menu items into component props

#### JavaScript Enhancement
The component includes progressive enhancement behaviors:
- Automatic external link detection
- URL validation and security measures  
- Analytics integration hooks
- Custom event dispatching for third-party integration

### Best Practices

#### Accessibility First
- Descriptive link text is crucial for screen readers
- ARIA labels provide additional context when needed
- Touch targets must meet minimum 44x44px requirement
- Color contrast must maintain 4.5:1 ratio for WCAG AA

#### Security Measures
- JavaScript URLs are automatically blocked
- External links receive security attributes
- Municipal compliance mode adds citizen protection
- All URLs undergo validation before rendering

#### Performance Optimization
- Choose appropriate variants to avoid style bloat
- Use modifier classes instead of inline styles
- Leverage browser prefetching for internal navigation
- Test performance with large link collections

### Testing Strategy

#### Unit Testing
Test individual component rendering and prop handling with standard testing frameworks.

#### Visual Regression  
Use BackstopJS or similar tools to catch visual changes across component variants.

#### End-to-End Testing
Validate actual navigation behavior and interactive features in real browser environments.

**Integration Checklist:**
1. ✓ Component renders with required props
2. ✓ Accessibility attributes are correct
3. ✓ Security measures are active
4. ✓ Visual styling matches design system
5. ✓ JavaScript behaviors enhance functionality
6. ✓ Performance meets requirements
        `
      }
    }
  }
};

// Performance test
export const PerformanceTest = {
  render: () => {
    const links = [];
    for (let i = 0; i < 100; i++) {
      links.push(`
        ${include('adesso_cms_theme:link', {
          text: `Link ${i + 1}`,
          url: `/example/${i + 1}`,
          variant: i % 4 === 0 ? 'button' : 'default'
        })}
      `);
    }
    return `
      <div class="grid grid-cols-4 gap-2">
        ${links.join('')}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with 100 links to ensure JavaScript behaviors scale properly.'
      }
    }
  }
};