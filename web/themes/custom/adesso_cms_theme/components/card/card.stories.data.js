// Sample media content for different card types
const sampleMedia = {
  image: '<img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" alt="Sample image" class="w-full h-full object-cover rounded-lg" />',
  icon: '<i data-lucide="users" width="56" height="56" class="text-primary"></i>',
  svg: '<svg viewBox="0 0 24 24" class="w-12 h-12 text-primary"><path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2-.59 2.5-1.5V7L12 2z"/></svg>',
  thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=64&h=64&fit=crop',
  damage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=64&h=64&fit=crop'
};

export const card = {
  // Default basic card
  default: {
    variant: 'default',
    layout: 'vertical',
    size: 'md',
    content_sections: [
      {
        type: 'media',
        content: {
          media: sampleMedia.image,
          aspect_ratio: '16/9'
        }
      },
      {
        type: 'header',
        content: {
          title: 'Sample Card Title',
          title_level: '3'
        }
      },
      {
        type: 'body',
        content: {
          description: 'This is a sample card description that demonstrates the unified card component functionality.'
        }
      },
      {
        type: 'actions',
        content: {
          actions: [
            {
              url: '#',
              text: 'Learn More',
              variant: 'default',
              icon: 'arrow-right'
            }
          ]
        }
      }
    ]
  },

  // Basic content card (replaces card-group/card)
  basicContent: {
    variant: 'default',
    layout: 'vertical',
    size: 'md',
    content_sections: [
      {
        type: 'media',
        content: {
          media: sampleMedia.image,
          media_link: '#',
          aspect_ratio: '16/9'
        }
      },
      {
        type: 'tags',
        content: {
          tags: [
            { text: 'Technology', variant: 'secondary' },
            { text: 'News', variant: 'default' }
          ]
        }
      },
      {
        type: 'header',
        content: {
          title: 'Digital Transformation in Municipal Services',
          title_level: '3',
          title_link: '#'
        }
      },
      {
        type: 'body',
        content: {
          description: 'Learn how Gemeinde Bruchtal is leveraging modern technology to improve citizen services and streamline municipal processes.'
        }
      },
      {
        type: 'actions',
        content: {
          actions: [
            {
              url: '#',
              text: 'Read More',
              variant: 'default',
              icon: 'arrow-right'
            },
            {
              url: '#',
              text: 'Share',
              variant: 'outline',
              icon: 'share'
            }
          ]
        }
      }
    ]
  },

  // Stat card (replaces stat-card)  
  stat: {
    variant: 'stat',
    layout: 'stat-center',
    size: 'lg',
    content_sections: [
      {
        type: 'media',
        content: {
          media: sampleMedia.icon
        }
      },
      {
        type: 'header',
        content: {
          title: '1,234',
          title_level: '2'
        }
      },
      {
        type: 'body',
        content: {
          description: 'Active Citizens'
        }
      }
    ]
  },

  // Stat card left aligned
  statLeft: {
    variant: 'stat',
    layout: 'stat-left',
    size: 'lg',
    modifier: 'border-0 shadow-none',
    content_sections: [
      {
        type: 'media',
        content: {
          media: '<svg viewBox="0 0 24 24" class="w-16 h-16 text-green-600"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
        }
      },
      {
        type: 'header',
        content: {
          title: '98.5%',
          title_level: '2'
        }
      },
      {
        type: 'body',
        content: {
          description: 'Service Availability'
        }
      }
    ]
  },

  // Damage report card (replaces damage-report-card)
  damageReport: {
    variant: 'damage-report',
    layout: 'horizontal',
    size: 'sm',
    modifier: 'hover:shadow-md transition-shadow duration-200',
    content_sections: [
      {
        type: 'media',
        content: {
          media: '<img src="' + sampleMedia.damage + '" alt="Schaden Foto - Defekte Straßenbeleuchtung" class="w-16 h-16 object-cover rounded-lg border border-gray-200" loading="lazy" />'
        }
      },
      {
        type: 'header',
        content: {
          title: 'Defekte Straßenbeleuchtung',
          title_level: '3',
          metadata: [
            { label: 'ID', value: 'DR-2024-001', icon: 'hash' },
            { label: 'Gemeldet', value: '15.08.2024', icon: 'calendar' }
          ]
        }
      },
      {
        type: 'priority-badge',
        content: {
          priority: 'hoch'
        },
        position: 'right'
      },
      {
        type: 'body',
        content: {
          description: 'Straßenbeleuchtung an der Seestraße 45 funktioniert nicht, was eine Sicherheitsgefahr für Fußgänger darstellt.'
        }
      },
      {
        type: 'metadata',
        content: {
          items: [
            { 
              icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>',
              value: 'Seestraße 45' 
            },
            { 
              icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>',
              value: 'Straßenbeleuchtung' 
            }
          ]
        }
      },
      {
        type: 'status-badge',
        content: {
          status: 'in_bearbeitung',
          status_size: 'sm'
        },
        position: 'right'
      }
    ]
  },

  // Pricing card (replaces pricing-card)
  pricing: {
    variant: 'pricing',
    layout: 'vertical',
    size: 'lg',
    content_sections: [
      {
        type: 'header',
        content: {
          pre_headline: 'Popular',
          title: 'Professional',
          title_level: '2'
        }
      },
      {
        type: 'features',
        content: {
          features_label: 'Includes',
          features: [
            'Priority support',
            'Advanced analytics',
            'Custom integrations',
            'Dedicated account manager',
            'Monthly strategy calls'
          ]
        }
      },
      {
        type: 'actions',
        content: {
          actions: [
            {
              url: '#',
              text: 'Get Started',
              variant: 'default'
            }
          ]
        }
      }
    ]
  },

  // Recent card (replaces recent-card-item)
  recent: {
    variant: 'default',
    layout: 'vertical',
    size: 'sm',
    content_sections: [
      {
        type: 'media',
        content: {
          media: sampleMedia.image,
          aspect_ratio: '16/9'
        }
      },
      {
        type: 'header',
        content: {
          title: 'Community Meeting Minutes',
          title_level: '3'
        }
      },
      {
        type: 'body',
        content: {
          description: 'Summary of key decisions from the August community meeting.'
        }
      }
    ],
    clickable: true,
    url: '#'
  },

  // Clickable card example
  clickable: {
    variant: 'default',
    layout: 'vertical',
    size: 'md',
    clickable: true,
    url: '#',
    content_sections: [
      {
        type: 'media',
        content: {
          media: sampleMedia.image,
          aspect_ratio: '16/9'
        }
      },
      {
        type: 'header',
        content: {
          title: 'Clickable Card Example',
          title_level: '3'
        }
      },
      {
        type: 'body',
        content: {
          description: 'This entire card is clickable and will navigate to the specified URL.'
        }
      }
    ]
  },

  // Minimal variant
  minimal: {
    variant: 'minimal',
    layout: 'vertical',
    size: 'sm',
    content_sections: [
      {
        type: 'header',
        content: {
          title: 'Minimal Card',
          title_level: '4'
        }
      },
      {
        type: 'body',
        content: {
          description: 'Clean design without borders or shadows.'
        }
      }
    ]
  },

  // Highlighted variant
  highlighted: {
    variant: 'highlighted',
    layout: 'vertical',
    size: 'md',
    content_sections: [
      {
        type: 'header',
        content: {
          title: 'Featured Content',
          title_level: '3'
        }
      },
      {
        type: 'body',
        content: {
          description: 'This card uses the highlighted variant to draw attention to featured content.'
        }
      },
      {
        type: 'actions',
        content: {
          actions: [
            {
              url: '#',
              text: 'Learn More',
              variant: 'default'
            }
          ]
        }
      }
    ]
  },

  // Horizontal layout
  horizontal: {
    variant: 'default',
    layout: 'horizontal',
    size: 'md',
    content_sections: [
      {
        type: 'media',
        content: {
          media: '<img src="' + sampleMedia.thumbnail + '" alt="Thumbnail" class="w-20 h-20 object-cover rounded-lg flex-shrink-0" />'
        }
      },
      {
        type: 'header',
        content: {
          title: 'Horizontal Card Layout',
          title_level: '4'
        }
      },
      {
        type: 'body',
        content: {
          description: 'Side-by-side layout with image and content.'
        }
      }
    ]
  },

  // Content Section Showcase - demonstrates all 9 section types
  contentSectionShowcase: {
    variant: 'default',
    layout: 'vertical',
    size: 'lg',
    content_sections: [
      {
        type: 'media',
        content: {
          media: sampleMedia.image,
          media_link: '#',
          aspect_ratio: '16/9'
        }
      },
      {
        type: 'tags',
        content: {
          tags: [
            { text: 'Example', variant: 'default' },
            { text: 'Showcase', variant: 'secondary' }
          ]
        }
      },
      {
        type: 'header',
        content: {
          pre_headline: 'Content Sections',
          title: 'All Section Types Demonstration',
          title_level: '2',
          subtitle: 'Comprehensive example showing flexible content system',
          metadata: [
            { label: 'Created', value: '2024-08-28', icon: 'calendar' },
            { label: 'Type', value: 'Documentation', icon: 'file-text' }
          ]
        }
      },
      {
        type: 'body',
        content: {
          description: 'This card demonstrates all available content section types in the unified card component system. Each section can be customized and reordered as needed.',
          body: '<p class="text-sm text-muted-foreground mt-2">Rich content can be included in the body section for additional context.</p>'
        }
      },
      {
        type: 'features',
        content: {
          features_label: 'Supported Section Types',
          features: [
            'Media - Images, icons, SVGs with aspect ratios',
            'Header - Titles, subtitles, metadata with semantic levels',
            'Tags - Badge collections for categorization',
            'Body - Description text and rich content areas',
            'Features - List items with check icons',
            'Metadata - Icon/value pairs for context',
            'Actions - Button groups and CTAs',
            'Priority Badge - German municipal priorities',
            'Status Badge - Workflow status indicators'
          ]
        }
      },
      {
        type: 'metadata',
        content: {
          items: [
            {
              icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>',
              value: '9 Section Types'
            },
            {
              icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
              value: 'eCH-0059 Compliant'
            }
          ]
        }
      },
      {
        type: 'priority-badge',
        content: {
          priority: 'hoch'
        }
      },
      {
        type: 'status-badge',
        content: {
          status: 'active',
          status_size: 'default'
        }
      },
      {
        type: 'actions',
        content: {
          actions: [
            {
              url: '#',
              text: 'View Documentation',
              variant: 'default',
              icon: 'book-open'
            },
            {
              url: '#',
              text: 'Copy Example',
              variant: 'outline',
              icon: 'copy'
            }
          ]
        }
      }
    ]
  },

  // German eCH-0059 Accessibility Compliance Example
  germanCompliance: {
    variant: 'default',
    layout: 'vertical',
    size: 'md',
    clickable: true,
    url: '/accessibility-test',
    modifier: 'focus:ring-2 focus:ring-primary focus:ring-offset-2',
    content_sections: [
      {
        type: 'media',
        content: {
          media: '<img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop" alt="Barrierefreie Gemeindeverwaltung - Bild zeigt ein modernes Rathaus mit Rollstuhlrampe" class="w-full h-full object-cover rounded-lg" loading="lazy" />',
          aspect_ratio: '16/9'
        }
      },
      {
        type: 'header',
        content: {
          title: 'Barrierefreie Gemeindeverwaltung',
          title_level: '3',
          subtitle: 'eCH-0059 Konformitätsbeispiel',
          metadata: [
            { 
              label: 'Kontrast',
              value: '4.8:1 AAA',
              icon: 'eye'
            },
            {
              label: 'Prüfung',
              value: '28.08.2024',
              icon: 'check-circle'
            }
          ]
        }
      },
      {
        type: 'tags',
        content: {
          tags: [
            { text: 'WCAG 2.1 AA', variant: 'success' },
            { text: 'eCH-0059', variant: 'default' },
            { text: 'Screenreader', variant: 'secondary' }
          ]
        }
      },
      {
        type: 'body',
        content: {
          description: 'Diese Karte demonstriert vollständige Konformität mit deutschen Barrierefreiheitsstandards einschließlich semantischer HTML-Struktur, Tastaturnavigation und Screenreader-Unterstützung.',
          body: '<div class="mt-2"><p class="text-sm font-medium text-green-700">✓ Semantische Überschriftenhierarchie</p><p class="text-sm font-medium text-green-700">✓ ARIA-Labels und Rollen</p><p class="text-sm font-medium text-green-700">✓ Tastaturnavigation (Tab, Enter, Leertaste)</p><p class="text-sm font-medium text-green-700">✓ Hoher Kontrast (4.5:1 Mindestrate)</p></div>'
        }
      },
      {
        type: 'features',
        content: {
          features_label: 'Barrierefreiheits-Funktionen',
          features: [
            'Semantische HTML-Struktur mit korrekter Überschriftenhierarchie',
            'ARIA-Labels für interaktive Elemente',
            'Tastaturnavigation mit sichtbaren Fokusindikatoren',
            'Hohe Kontrastfarben (4.8:1 Verhältnis)',
            'Screenreader-kompatible Metadaten und Statusindikatoren',
            'Deutsche Texterweiterungsunterstützung (25% Puffer)',
            'Regierungsportal-Testszenarien validiert'
          ]
        }
      },
      {
        type: 'actions',
        content: {
          actions: [
            {
              url: '/accessibility-test',
              text: 'Barrierefreiheit testen',
              variant: 'default',
              icon: 'accessibility'
            }
          ]
        }
      }
    ]
  },

  // Responsive Design Example
  responsive: {
    variant: 'default',
    layout: 'vertical',
    size: 'md',
    modifier: 'max-w-full',
    content_sections: [
      {
        type: 'media',
        content: {
          media: '<img src="https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop" alt="Responsive Design - Multiple Geräte zeigen die gleiche Webseite" class="w-full h-full object-cover rounded-lg" loading="lazy" />',
          aspect_ratio: '16/9'
        }
      },
      {
        type: 'header',
        content: {
          title: 'Mobile-First Responsive Design',
          title_level: '2',
          subtitle: 'Optimiert für deutsche Nutzergewohnheiten'
        }
      },
      {
        type: 'body',
        content: {
          description: 'Diese Karte passt sich automatisch an alle Bildschirmgrößen an und folgt den deutschen Regierungsportal-Standards für mobile Nutzer.',
          body: '<div class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs"><div class="p-2 bg-blue-50 rounded text-center"><div class="font-medium">📱 375px</div><div class="text-gray-600">Mobile</div></div><div class="p-2 bg-green-50 rounded text-center"><div class="font-medium">📱 768px</div><div class="text-gray-600">Tablet</div></div><div class="p-2 bg-orange-50 rounded text-center"><div class="font-medium">🖥️ 1440px</div><div class="text-gray-600">Desktop</div></div><div class="p-2 bg-purple-50 rounded text-center"><div class="font-medium">🖥️ 1920px</div><div class="text-gray-600">Wide</div></div></div>'
        }
      },
      {
        type: 'features',
        content: {
          features_label: 'Responsive Funktionen',
          features: [
            'Smart Typography Scaling (sm:text-base, lg:text-lg)',
            'Adaptive Polsterung (p-4, sm:p-6, lg:p-8)',
            'Flexible Bildverhältnisse',
            'Mobile-optimierte Schaltflächengrößen',
            'Touch-freundliche Interaktionsbereiche',
            'Automatische Spalten-Anpassung',
            'Optimiert für deutsche Regierungsportale'
          ]
        }
      },
      {
        type: 'metadata',
        content: {
          items: [
            {
              icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
              value: 'Mobile First'
            },
            {
              icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
              value: '4 Viewports'
            }
          ]
        }
      },
      {
        type: 'actions',
        content: {
          actions: [
            {
              url: '#',
              text: 'Viewport testen',
              variant: 'default',
              icon: 'smartphone'
            },
            {
              url: '#',
              text: 'Performance prüfen',
              variant: 'outline',
              icon: 'gauge'
            }
          ]
        }
      }
    ]
  }
};