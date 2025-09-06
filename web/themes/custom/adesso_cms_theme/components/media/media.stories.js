// phpcs:ignoreFile

import Component from './media.twig';

const meta = {
  title: 'Media/Media - Phase 2 Enhanced',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: `
# Enhanced Media Component - Phase 2

Advanced media component with modern image formats (AVIF/WebP/JPEG), specialized templates, and Swiss municipal compliance.

## Phase 2 Features
- **Modern Image Formats**: Automatic AVIF/WebP/JPEG fallback with \`<picture>\` element
- **Specialized Templates**: Individual templates for each media type (image, video, audio, document, remote_video)
- **Container Queries**: Responsive behavior using modern CSS container queries
- **Enhanced Accessibility**: Full WCAG 2.1 AA compliance with progressive enhancement
- **Swiss Municipal Compliance**: Privacy controls, GDPR compliance, official branding
- **Performance Optimization**: Lazy loading, format detection, Core Web Vitals optimization

## Specialized Media Types
1. **Image**: Modern format support with responsive srcsets
2. **Video**: Enhanced player controls and transcript support
3. **Audio**: Custom player with visual indicators
4. **Document**: Swiss government styling with preview capabilities
5. **Remote Video**: Privacy-first external content loading

## Accessibility Features
- Screen reader announcements for all interactions
- Keyboard navigation support
- High contrast mode compatibility
- Multilingual content support (DE/FR)
- Focus management and ARIA implementation
        `
      }
    }
  },
  argTypes: {
    // Media Entity
    media_entity: {
      control: 'object',
      description: 'Drupal media entity with complete metadata',
    },
    
    // Display Configuration
    variant: {
      control: { type: 'select' },
      options: ['default', 'hero', 'thumbnail', 'card', 'gallery', 'document_preview', 'banner', 'accessibility'],
      description: 'Visual presentation style for different use cases',
    },
    aspect_ratio: {
      control: { type: 'select' },
      options: ['auto', 'square', '16:9', '4:3', '3:2', '21:9'],
      description: 'Control aspect ratio for consistent layouts',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size variation for the media display',
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'full-width'],
      description: 'Positioning alignment for the media',
    },
    
    // Accessibility (WCAG 2.1 AA Compliance)
    alt_text: {
      control: 'text',
      description: 'Alternative text for images (WCAG 2.1 AA required)',
    },
    alt_text_de: {
      control: 'text',
      description: 'German alternative text for multilingual support',
    },
    alt_text_fr: {
      control: 'text',
      description: 'French alternative text for multilingual support',
    },
    aria_label: {
      control: 'text',
      description: 'ARIA label for complex media elements',
    },
    long_description: {
      control: 'text',
      description: 'Detailed description for complex media (linked via aria-describedby)',
    },
    caption: {
      control: 'text',
      description: 'Visible caption text displayed with the media',
    },
    caption_de: {
      control: 'text',
      description: 'German caption for multilingual support',
    },
    caption_fr: {
      control: 'text',
      description: 'French caption for multilingual support',
    },
    
    // Performance Controls
    lazy_loading: {
      control: 'boolean',
      description: 'Enable lazy loading for performance optimization',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive image support with srcset',
    },
    preload: {
      control: { type: 'select' },
      options: ['none', 'metadata', 'auto'],
      description: 'Control preloading behavior for performance',
    },
    
    // Interactive Features
    lightbox: {
      control: 'boolean',
      description: 'Enable lightbox/modal functionality',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay for videos (respects user preferences)',
    },
    controls: {
      control: 'boolean',
      description: 'Show/hide media controls for videos and audio',
    },
    
    // Swiss Municipal Compliance
    external_content: {
      control: 'boolean',
      description: 'Flag if media contains external content requiring user consent',
    },
    privacy_level: {
      control: { type: 'select' },
      options: ['public', 'internal', 'restricted'],
      description: 'Privacy classification for municipal content',
    },
    gdpr_compliant: {
      control: 'boolean',
      description: 'Indicates if the media meets GDPR requirements',
    },
    
    // Styling
    border_radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius for media element',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Drop shadow intensity',
    },
    modifier: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Accessible Media Component

**WCAG 2.1 AA Compliant** media component for Swiss municipal portals with comprehensive accessibility features, multilingual support, and privacy controls.

## Key Accessibility Features

- **Semantic HTML**: Proper \`<figure>\` and \`<figcaption>\` structure
- **ARIA Support**: Complete ARIA roles, labels, and descriptions
- **Screen Reader Compatible**: Optimized for assistive technology
- **Keyboard Navigation**: Full keyboard accessibility
- **Multilingual**: German/French alt text and captions
- **High Contrast**: Supports high contrast mode preferences
- **Focus Management**: Enhanced focus indicators and trapping
- **Privacy Controls**: GDPR compliance and external content warnings

## Municipal Compliance

- **Swiss Government Standards**: Follows federal accessibility guidelines
- **Privacy Classifications**: Support for public/internal/restricted content
- **External Content Controls**: User consent for third-party media
- **Multilingual Support**: German and French language variations
- **Performance Optimized**: Lazy loading and responsive images

## TWIG Usage Examples

\`\`\`twig
{# Basic accessible image #}
{% include 'sdc:media' with {
  media_entity: {
    id: 123,
    bundle: 'image',
    uri: 'public://images/city-hall.jpg',
    metadata: { width: 1200, height: 800 }
  },
  alt_text: 'Zürich City Hall building exterior',
  alt_text_de: 'Zürich Stadthaus Gebäude Aussenansicht',
  caption: 'Historic City Hall in downtown Zürich',
  variant: 'hero'
} %}

{# Video with accessibility controls #}
{% include 'sdc:media' with {
  media_entity: {
    id: 456,
    bundle: 'video',
    uri: 'public://videos/council-meeting.mp4',
    mime_type: 'video/mp4'
  },
  alt_text: 'City council meeting discussion',
  controls: true,
  preload: 'metadata',
  variant: 'default',
  caption: 'Monthly city council meeting - March 2024'
} %}

{# External video with privacy controls #}
{% include 'sdc:media' with {
  media_entity: {
    id: 789,
    bundle: 'remote_video',
    uri: 'https://youtube.com/watch?v=abc123'
  },
  external_content: true,
  privacy_level: 'public',
  alt_text: 'Municipal services overview video',
  caption: 'Learn about our digital services'
} %}

{# Document with download accessibility #}
{% include 'sdc:media' with {
  media_entity: {
    id: 101,
    bundle: 'document',
    uri: 'public://documents/budget-2024.pdf',
    mime_type: 'application/pdf',
    file_size: 2621440
  },
  alt_text: 'City budget document 2024',
  variant: 'document_preview'
} %}

{# Gallery thumbnail with lightbox #}
{% include 'sdc:media' with {
  media_entity: {
    id: 202,
    bundle: 'image',
    uri: 'public://gallery/event-photo.jpg'
  },
  alt_text: 'Community festival participants',
  variant: 'gallery',
  lightbox: true,
  size: 'sm',
  aspect_ratio: 'square'
} %}
\`\`\`

## Accessibility Testing

This component has been tested with:
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: All interactive elements accessible
- **High Contrast Mode**: Enhanced visibility
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Exceeds WCAG 2.1 AA requirements (4.5:1)

## Performance Features

- **Lazy Loading**: Images load when entering viewport
- **Responsive Images**: Automatic srcset generation
- **Optimized Delivery**: WebP/AVIF support when available
- **Preload Control**: Configurable preloading strategies
- **Error Handling**: Graceful fallbacks for failed media
        `
      }
    }
  },
  tags: ['autodocs'],
};
// Phase 2 Enhanced Stories showcasing specialized templates

// Modern Image with AVIF/WebP support
export const ModernImageFormats = {
  args: {
    ...baseArgs,
    media_entity: {
      ...mockImageEntity,
      uri: 'https://picsum.photos/1200/800'
    },
    alt_text: 'Modern municipal building with sustainable architecture',
    caption: 'New municipal center with solar panels and green spaces',
    variant: 'hero',
    aspect_ratio: '16:9',
    responsive: true,
    lazy_loading: true,
    quality: 85,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates modern image format support with AVIF/WebP/JPEG fallback using the `<picture>` element for optimal performance and Core Web Vitals.'
      }
    }
  }
};

// Enhanced Video Player
export const EnhancedVideoPlayer = {
  args: {
    ...baseArgs,
    media_entity: {
      ...mockVideoEntity,
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    alt_text: 'Municipal council meeting live stream',
    caption: 'Monthly council meeting discussion on urban development',
    variant: 'default',
    aspect_ratio: '16:9',
    controls: true,
    preload: 'metadata',
    slots: {
      transcript: '<p>Meeting transcript available on request. Contact municipal services for accessibility accommodations.</p>'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Enhanced video player with custom controls, transcript support, and accessibility features for municipal content.'
      }
    }
  }
};

// Swiss Municipal Audio Player
export const SwissMunicipalAudio = {
  args: {
    ...AudioPlayer.args,
    media_entity: {
      ...mockAudioEntity,
      uri: 'https://www.soundjay.com/misc/sounds/clock-ticking-4.wav'
    },
    alt_text: 'Municipal services information in German',
    caption: 'Gemeindeverwaltung Informationen (auf Deutsch)',
    alt_text_de: 'Informationen der Gemeindeverwaltung',
    caption_de: 'Wichtige Informationen für neue Einwohner',
    controls: true,
    slots: {
      transcript: '<div><h4>Transkript (Deutsch)</h4><p>Willkommen in unserer Gemeinde. Diese Audiodatei enthält wichtige Informationen...</p></div>'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Swiss municipal audio player with multilingual support, custom controls, and visual indicators for government content.'
      }
    }
  }
};

// Swiss Government Document
export const SwissGovernmentDocument = {
  args: {
    ...DocumentPreview.args,
    media_entity: {
      ...mockDocumentEntity,
      name: 'Gemeindeordnung_2024.pdf',
      mime_type: 'application/pdf',
      file_size: 2500000
    },
    alt_text: 'Municipal regulations 2024 (PDF document)',
    alt_text_de: 'Gemeindeordnung 2024 (PDF-Dokument)',
    caption: 'Official municipal regulations and bylaws for 2024',
    caption_de: 'Offizielle Gemeindeordnung und Verordnungen für 2024',
    privacy_level: 'public',
    variant: 'document_preview',
  },
  parameters: {
    docs: {
      description: {
        story: 'Swiss government document template with official styling, multilingual metadata, and accessibility compliance for municipal portals.'
      }
    }
  }
};

// GDPR Compliant External Video
export const GDPRCompliantVideo = {
  args: {
    ...ExternalVideo.args,
    media_entity: {
      ...mockRemoteVideoEntity,
      uri: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/800/450'
    },
    external_content: true,
    gdpr_compliant: false,
    privacy_level: 'public',
    alt_text: 'Municipal digital transformation overview video',
    caption: 'Learn about our smart city initiatives and digital services',
  },
  parameters: {
    docs: {
      description: {
        story: 'GDPR-compliant external video loading with privacy consent interface, tracking controls, and Swiss municipal compliance features.'
      }
    }
  }
};

// Accessibility Enhanced Media
export const AccessibilityEnhanced = {
  args: {
    ...DefaultImage.args,
    variant: 'accessibility',
    alt_text: 'Wheelchair accessible entrance to municipal building with ramp and automatic doors',
    aria_label: 'Municipal building accessibility features',
    long_description: 'The municipal building entrance features a wide wheelchair ramp with handrails, automatic sliding glass doors with large tactile buttons, and clear wayfinding signage in high contrast colors. The entrance area is well-lit with motion-activated lighting.',
    caption: 'Accessible entrance design meets Swiss SIA 500 standards',
    size: 'lg',
    border_radius: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility-enhanced media component demonstrating WCAG 2.1 AA compliance with detailed alt text, ARIA labels, long descriptions, and enhanced visual styling.'
      }
    }
  }
};

// Performance Optimized Gallery
export const PerformanceOptimizedGallery = {
  args: {
    ...GalleryThumbnail.args,
    media_entity: {
      ...mockImageEntity,
      uri: 'https://picsum.photos/400/400',
      metadata: { width: 400, height: 400 }
    },
    variant: 'gallery',
    size: 'sm',
    aspect_ratio: 'square',
    lazy_loading: true,
    responsive: true,
    quality: 75,
    preload: 'none',
    lightbox: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance-optimized gallery thumbnail with lazy loading, modern image formats, and efficient lightbox functionality for Core Web Vitals optimization.'
      }
    }
  }
};

export default meta;

// Mock media entities for different types
const mockImageEntity = {
  id: 123,
  bundle: 'image',
  uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop',
  mime_type: 'image/jpeg',
  metadata: { width: 1200, height: 800 }
};

const mockVideoEntity = {
  id: 456,
  bundle: 'video',
  uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  mime_type: 'video/mp4',
  metadata: { width: 1280, height: 720, duration: 596 }
};

const mockAudioEntity = {
  id: 789,
  bundle: 'audio',
  uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  mime_type: 'audio/wav',
  metadata: { duration: 3.2 }
};

const mockDocumentEntity = {
  id: 101,
  bundle: 'document',
  uri: '/documents/municipal-services-guide.pdf',
  mime_type: 'application/pdf',
  file_size: 2621440
};

const mockRemoteVideoEntity = {
  id: 202,
  bundle: 'remote_video',
  uri: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  mime_type: 'text/html'
};

// Base story configuration
const baseArgs = {
  variant: 'default',
  size: 'md',
  alignment: 'center',
  lazy_loading: true,
  responsive: true,
  preload: 'metadata',
  controls: true,
  privacy_level: 'public',
  gdpr_compliant: true,
  border_radius: 'none',
  shadow: 'none'
};

// Default story - Accessible image
export const DefaultImage = {
  args: {
    ...baseArgs,
    media_entity: mockImageEntity,
    alt_text: 'Modern business office with large windows and collaborative workspace',
    alt_text_de: 'Modernes Büro mit großen Fenstern und kollaborativem Arbeitsplatz',
    alt_text_fr: 'Bureau moderne avec de grandes fenêtres et espace de travail collaboratif',
    caption: 'Our main office space designed for collaboration and innovation',
    caption_de: 'Unser Hauptbüro für Zusammenarbeit und Innovation',
    caption_fr: 'Notre bureau principal conçu pour la collaboration et l\'innovation',
  },
};

// Hero image variant
export const HeroImage = {
  args: {
    ...DefaultImage.args,
    variant: 'hero',
    aspect_ratio: '16:9',
    size: 'full',
    alt_text: 'Zürich City Hall with Swiss flag against blue sky',
    caption: 'Historic City Hall - serving our community since 1694',
    shadow: 'lg',
  },
};

// Accessibility-enhanced variant
export const AccessibilityEnhanced = {
  args: {
    ...DefaultImage.args,
    variant: 'accessibility',
    alt_text: 'Wheelchair accessible entrance to municipal building with automatic doors',
    long_description: 'The main entrance features a gentle ramp with handrails on both sides, wide automatic glass doors that remain open for 10 seconds, and tactile guidance strips leading to the reception desk. Emergency call buttons are positioned at wheelchair height.',
    aria_label: 'Accessible municipal building entrance',
    border_radius: 'md',
  },
};

// Video with full accessibility
export const AccessibleVideo = {
  args: {
    ...baseArgs,
    media_entity: mockVideoEntity,
    alt_text: 'City council meeting discussing new accessibility initiatives',
    caption: 'Monthly city council meeting - March 2024',
    controls: true,
    preload: 'metadata',
    aspect_ratio: '16:9',
  },
};

// Audio content
export const AudioContent = {
  args: {
    ...baseArgs,
    media_entity: mockAudioEntity,
    alt_text: 'Municipal services information audio guide',
    caption: 'Audio guide for new residents (3 minutes)',
    controls: true,
    preload: 'metadata',
  },
};

// Document preview
export const DocumentPreview = {
  args: {
    ...baseArgs,
    media_entity: mockDocumentEntity,
    alt_text: 'Municipal services guide PDF document',
    caption: 'Complete guide to municipal services (PDF, 2.5 MB)',
    variant: 'document_preview',
    size: 'md',
  },
};

// External content with privacy controls
export const ExternalVideo = {
  args: {
    ...baseArgs,
    media_entity: mockRemoteVideoEntity,
    external_content: true,
    privacy_level: 'public',
    alt_text: 'Municipal services overview video on YouTube',
    caption: 'Learn about our digital transformation initiatives',
    aspect_ratio: '16:9',
  },
};

// Gallery thumbnail with lightbox
export const GalleryThumbnail = {
  args: {
    ...DefaultImage.args,
    variant: 'gallery',
    size: 'sm',
    aspect_ratio: 'square',
    lightbox: true,
    alt_text: 'Community festival with residents and families enjoying activities',
    caption: 'Annual Summer Festival 2024',
    border_radius: 'md',
    shadow: 'sm',
  },
};

// Card variant for content presentation
export const MediaCard = {
  args: {
    ...DefaultImage.args,
    variant: 'card',
    size: 'lg',
    aspect_ratio: '4:3',
    alt_text: 'Municipal library reading room with study areas',
    caption: 'Central Library - Open Monday through Saturday',
    border_radius: 'lg',
    shadow: 'md',
  },
};

// Thumbnail variant
export const Thumbnail = {
  args: {
    ...DefaultImage.args,
    variant: 'thumbnail',
    size: 'xs',
    aspect_ratio: 'square',
    alt_text: 'Profile photo of Mayor Sarah Johnson',
    caption: 'Mayor Johnson',
    border_radius: 'full',
  },
};

// Multilingual content example
export const MultilingualContent = {
  args: {
    ...DefaultImage.args,
    alt_text: 'Swiss municipal building with flags',
    alt_text_de: 'Schweizer Gemeindegebäude mit Fahnen',
    alt_text_fr: 'Bâtiment municipal suisse avec drapeaux',
    caption: 'Municipal headquarters serving our diverse community',
    caption_de: 'Gemeindeverwaltung im Dienst unserer vielfältigen Gemeinschaft',
    caption_fr: 'Siège municipal au service de notre communauté diversifiée',
  },
};

// Privacy restricted content
export const PrivacyRestricted = {
  args: {
    ...DefaultImage.args,
    privacy_level: 'restricted',
    external_content: true,
    gdpr_compliant: false,
    alt_text: 'Internal document preview',
    caption: 'Internal use only - requires authentication',
  },
};

// Error state demonstration
export const ErrorFallback = {
  args: {
    ...baseArgs,
    media_entity: {
      id: 999,
      bundle: 'image',
      uri: 'https://invalid-url-example.com/nonexistent.jpg',
      mime_type: 'image/jpeg'
    },
    alt_text: 'Image that will fail to load',
    caption: 'This demonstrates the error fallback functionality',
    slots: {
      fallback: '<p class="text-red-600 bg-red-50 p-4 rounded border">⚠️ Image could not be loaded. This is the fallback content displayed to users.</p>'
    }
  },
};

// Performance Testing Stories

// High-performance hero image
export const PerformanceHero = {
  name: 'Performance - Hero Image (LCP Optimized)',
  args: {
    ...baseArgs,
    media_entity: {
      ...mockImageEntity,
      uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&auto=format'
    },
    variant: 'hero',
    size: 'full',
    aspect_ratio: '16:9',
    alt_text: 'High-performance hero image optimized for LCP',
    caption: 'This hero image is optimized for Largest Contentful Paint (LCP) < 2s',
    preload: 'auto',
    lazy_loading: false, // Hero images should load immediately
    responsive: true,
    fetchpriority: 'high'
  },
  parameters: {
    docs: {
      description: {
        story: `
**Performance Optimized Hero Image**

This story demonstrates Core Web Vitals optimization:
- **LCP Target**: < 2 seconds
- **CLS Prevention**: Fixed aspect ratio container
- **High Priority Loading**: \`fetchpriority="high"\`
- **Format Optimization**: AVIF → WebP → JPEG fallback

**Test Instructions:**
1. Open browser DevTools → Performance tab
2. Record page load
3. Check LCP measurement in Web Vitals section
4. Verify no layout shifts during loading

**Expected Results:**
- LCP < 2000ms
- CLS < 0.1
- No layout shifts during image loading
        `
      }
    }
  }
};

// Lazy loading performance test
export const PerformanceLazyLoading = {
  name: 'Performance - Lazy Loading Test',
  args: {
    ...baseArgs,
    media_entity: {
      ...mockImageEntity,
      uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format'
    },
    variant: 'default',
    size: 'md',
    alt_text: 'Lazy-loaded image for performance testing',
    caption: 'This image demonstrates intelligent lazy loading with preloading',
    lazy_loading: true,
    responsive: true,
  },
  decorators: [
    (Story) => `
      <div style="height: 150vh; padding: 20px; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);">
        <h2>Scroll down to test lazy loading</h2>
        <p>The image below should only load when it enters the viewport.</p>
        <div style="height: 80vh; display: flex; align-items: center; justify-content: center; border: 2px dashed #ccc;">
          <span>Scroll past this area ↓</span>
        </div>
        <div style="padding: 40px; border: 2px solid #4CAF50;">
          ${Story()}
        </div>
        <script>
          // Performance monitoring for this story
          setTimeout(() => {
            if (window.MediaPerformanceDebugger) {
              console.log('Lazy Loading Test - Performance Status:', window.MediaPerformanceDebugger.getStatus());
            }
          }, 2000);
        </script>
      </div>
    `
  ],
  parameters: {
    docs: {
      description: {
        story: `
**Lazy Loading Performance Test**

Tests intelligent lazy loading implementation:
- **Intersection Observer**: Advanced viewport detection
- **Preloading Strategy**: Images load 100px before viewport
- **Connection Awareness**: Adapts to slow connections
- **Error Recovery**: Automatic retry with fallback formats

**Test Instructions:**
1. Open browser DevTools → Network tab
2. Scroll down slowly to trigger loading
3. Check console for performance metrics
4. Verify MediaPerformanceDebugger.getStatus() output

**Performance Metrics:**
- Loading should trigger ~100px before viewport
- Success rate should be >95%
- Average load time logged to console
        `
      }
    }
  }
};

// Connection-aware optimization test
export const PerformanceConnectionAware = {
  name: 'Performance - Connection Aware Loading',
  args: {
    ...baseArgs,
    media_entity: mockImageEntity,
    variant: 'default',
    size: 'lg',
    alt_text: 'Connection-aware optimized image',
    caption: 'This image adapts quality based on connection speed',
    lazy_loading: true,
    responsive: true,
    quality: 75, // Adaptive quality
  },
  decorators: [
    (Story) => `
      <div style="padding: 20px;">
        <h2>Connection-Aware Performance Test</h2>
        <p>Open DevTools → Network tab → Throttling to simulate slow connections</p>
        <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
          <strong>Connection Status:</strong>
          <div id="connection-info" style="font-family: monospace; margin-top: 8px;"></div>
        </div>
        ${Story()}
        <script>
          // Display connection info
          function updateConnectionInfo() {
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const info = document.getElementById('connection-info');
            if (conn && info) {
              info.innerHTML = \`
                <div>Type: \${conn.effectiveType || 'unknown'}</div>
                <div>Downlink: \${conn.downlink || 'unknown'} Mbps</div>
                <div>RTT: \${conn.rtt || 'unknown'} ms</div>
                <div>Save Data: \${conn.saveData || false}</div>
              \`;
            } else if (info) {
              info.innerHTML = '<div>Connection API not supported</div>';
            }
          }
          updateConnectionInfo();
          
          // Monitor performance for connection-aware loading
          setTimeout(() => {
            if (window.MediaPerformanceDebugger) {
              window.MediaPerformanceDebugger.showDebugOverlay();
            }
          }, 1000);
        </script>
      </div>
    `
  ],
  parameters: {
    docs: {
      description: {
        story: `
**Connection-Aware Performance Optimization**

Demonstrates adaptive loading based on network conditions:
- **Slow Connections** (2G/3G): Reduced quality, simplified animations
- **Fast Connections** (4G/WiFi): Full quality, preloading enabled
- **Save Data Mode**: Minimal bandwidth usage
- **RTT Awareness**: Adjusts timeout and retry strategies

**Testing Scenarios:**
1. **Fast Connection**: Full quality images, aggressive preloading
2. **Slow Connection**: Lower quality, conservative loading
3. **Save Data**: Minimal preloading, compressed formats

**Performance Debug Overlay:**
- Shows real-time performance grade
- Connection status and adaptation
- Core Web Vitals measurements
- Recommendations for optimization
        `
      }
    }
  }
};

// Format optimization test
export const PerformanceFormatOptimization = {
  name: 'Performance - Modern Format Support',
  args: {
    ...baseArgs,
    media_entity: {
      ...mockImageEntity,
      uri: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop&auto=format'
    },
    variant: 'card',
    size: 'lg',
    aspect_ratio: '3:2',
    alt_text: 'Modern format optimization test image',
    caption: 'Testing AVIF → WebP → JPEG format fallback chain',
    responsive: true,
    border_radius: 'lg',
    shadow: 'md'
  },
  decorators: [
    (Story) => `
      <div style="padding: 20px;">
        <h2>Modern Image Format Support Test</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
            <h3>Browser Support Detection</h3>
            <div id="format-support" style="font-family: monospace; font-size: 14px;"></div>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
            <h3>Performance Metrics</h3>
            <div id="performance-metrics" style="font-family: monospace; font-size: 14px;"></div>
          </div>
        </div>
        ${Story()}
        <script>
          // Test format support
          function testFormatSupport() {
            const formatTests = {
              AVIF: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=',
              WebP: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
              JPEG: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A=='
            };
            
            const results = {};
            const promises = Object.entries(formatTests).map(([format, dataUrl]) => {
              return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve([format, img.width > 0 && img.height > 0]);
                img.onerror = () => resolve([format, false]);
                img.src = dataUrl;
              });
            });
            
            Promise.all(promises).then(formatResults => {
              const supportDiv = document.getElementById('format-support');
              if (supportDiv) {
                supportDiv.innerHTML = formatResults.map(([format, supported]) => 
                  \`<div style="color: \${supported ? 'green' : 'red'};">\${format}: \${supported ? '✓' : '✗'}</div>\`
                ).join('');
              }
            });
          }
          
          // Monitor performance metrics
          function updatePerformanceMetrics() {
            const metricsDiv = document.getElementById('performance-metrics');
            if (window.MediaPerformanceDebugger && metricsDiv) {
              const status = window.MediaPerformanceDebugger.getStatus();
              if (status.status !== 'no_data') {
                metricsDiv.innerHTML = \`
                  <div>Success Rate: \${status.images.successRate}</div>
                  <div>Avg Load: \${status.images.avgLoadTime}</div>
                  <div>LCP: \${status.coreWebVitals.lcp}</div>
                  <div>CLS: \${status.coreWebVitals.cls}</div>
                \`;
              }
            }
          }
          
          testFormatSupport();
          setTimeout(updatePerformanceMetrics, 2000);
          setInterval(updatePerformanceMetrics, 5000);
          
          // Run performance test
          setTimeout(() => {
            if (window.MediaPerformanceDebugger) {
              window.MediaPerformanceDebugger.runPerformanceTest().then(results => {
                console.table(results);
              });
            }
          }, 1000);
        </script>
      </div>
    `
  ],
  parameters: {
    docs: {
      description: {
        story: `
**Modern Image Format Optimization**

Tests progressive format enhancement:
1. **AVIF** (best compression, ~50% smaller than JPEG)
2. **WebP** (excellent compression, ~30% smaller than JPEG)
3. **JPEG** (universal fallback)

**Browser Support Testing:**
- Automatic format detection using data URLs
- Performance comparison across formats
- Graceful degradation to supported formats

**Performance Benefits:**
- **AVIF**: Superior compression, supports HDR
- **WebP**: Wide browser support, good compression
- **Progressive Enhancement**: Best format automatically selected

**Implementation Features:**
- \`<picture>\` element with multiple \`<source>\` tags
- Lazy loading support for all formats
- Connection-aware format selection
        `
      }
    }
  }
};

// Core Web Vitals monitoring story
export const PerformanceCoreWebVitals = {
  name: 'Performance - Core Web Vitals Monitor',
  args: {
    ...baseArgs,
    media_entity: {
      ...mockImageEntity,
      uri: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&h=1200&fit=crop&auto=format'
    },
    variant: 'hero',
    size: 'full',
    aspect_ratio: '4:3',
    alt_text: 'Core Web Vitals performance monitoring test',
    caption: 'Real-time monitoring of LCP, CLS, and FID metrics',
    lazy_loading: false,
    preload: 'auto',
  },
  decorators: [
    (Story) => `
      <div style="padding: 20px;">
        <h2>Core Web Vitals Monitoring</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
            <h4 style="margin: 0 0 10px 0; color: #666;">LCP (Target: <2s)</h4>
            <div id="lcp-value" style="font-size: 24px; font-weight: bold; color: #333;">Measuring...</div>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
            <h4 style="margin: 0 0 10px 0; color: #666;">CLS (Target: <0.1)</h4>
            <div id="cls-value" style="font-size: 24px; font-weight: bold; color: #333;">Measuring...</div>
          </div>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
            <h4 style="margin: 0 0 10px 0; color: #666;">Performance Grade</h4>
            <div id="grade-value" style="font-size: 24px; font-weight: bold; color: #333;">Calculating...</div>
          </div>
        </div>
        ${Story()}
        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
          <h4>Debug Actions:</h4>
          <button onclick="if(window.MediaPerformanceDebugger) window.MediaPerformanceDebugger.showDebugOverlay();" 
                  style="margin-right: 10px; padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Show Debug Overlay
          </button>
          <button onclick="if(window.MediaPerformanceDebugger) window.MediaPerformanceDebugger.exportReport();" 
                  style="margin-right: 10px; padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Export Report
          </button>
          <button onclick="if(window.MediaPerformanceDebugger) window.MediaPerformanceDebugger.startRealTimeMonitoring();" 
                  style="padding: 8px 16px; background: #FF9800; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Start Monitoring
          </button>
        </div>
        <script>
          function updateWebVitals() {
            if (window.MediaPerformanceDebugger) {
              const status = window.MediaPerformanceDebugger.getStatus();
              if (status.status !== 'no_data') {
                document.getElementById('lcp-value').textContent = status.coreWebVitals.lcp;
                document.getElementById('lcp-value').style.color = 
                  parseFloat(status.coreWebVitals.lcp) < 2000 ? '#4CAF50' : '#f44336';
                
                document.getElementById('cls-value').textContent = status.coreWebVitals.cls;
                document.getElementById('cls-value').style.color = 
                  parseFloat(status.coreWebVitals.cls) < 0.1 ? '#4CAF50' : '#f44336';
                
                document.getElementById('grade-value').textContent = 
                  status.performance.grade + ' (' + status.performance.status + ')';
                document.getElementById('grade-value').style.color = status.performance.color;
              }
            }
          }
          
          // Update metrics every 2 seconds
          setInterval(updateWebVitals, 2000);
          setTimeout(updateWebVitals, 1000);
        </script>
      </div>
    `
  ],
  parameters: {
    docs: {
      description: {
        story: `
**Core Web Vitals Real-Time Monitoring**

Live dashboard for performance metrics:

**Key Metrics Tracked:**
- **LCP (Largest Contentful Paint)**: Time to render largest element
- **CLS (Cumulative Layout Shift)**: Visual stability measurement  
- **FID (First Input Delay)**: Interactivity responsiveness

**Swiss Municipal Standards:**
- **LCP Target**: < 2 seconds (government portal requirement)
- **CLS Target**: < 0.1 (accessibility compliance)
- **Overall Grade**: A-D scale based on combined metrics

**Debug Tools:**
- **Debug Overlay**: Visual performance dashboard
- **Export Report**: Download detailed performance data
- **Real-time Monitoring**: Console logging every 10 seconds

**Performance Grading:**
- **Grade A (90-100)**: Excellent performance
- **Grade B (80-89)**: Good performance  
- **Grade C (70-79)**: Fair performance
- **Grade D (<70)**: Needs improvement
        `
      }
    }
  }
};

// Comprehensive playground for testing all features
export const Playground = {
  args: {
    ...baseArgs,
    media_entity: mockImageEntity,
    alt_text: 'Test image for exploring all media component features',
    caption: 'Playground for testing all component options',
    variant: 'default',
    size: 'md',
    aspect_ratio: 'auto',
    alignment: 'center',
    border_radius: 'md',
    shadow: 'sm',
    lightbox: false,
    lazy_loading: true,
    responsive: true,
  },
};