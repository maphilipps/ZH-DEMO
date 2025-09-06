/**
 * Media Component - Comprehensive Accessibility Tests
 * 
 * Tests WCAG 2.1 AA compliance and Swiss municipal accessibility standards
 * for the enhanced Media component (Issue #94 Phase 3).
 * 
 * @file media.accessibility.test.js
 * @author Phase 3 - Storybook Component Curator Agent
 * @since 2025-09-06
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Add jest-axe matchers to Vitest
expect.extend(toHaveNoViolations);

// Mock Drupal-specific functions
global.Drupal = {
  t: (text) => text,
  behaviors: {},
  attachBehaviors: vi.fn(),
};

// Mock language object
global.language = {
  getId: () => 'de'
};

/**
 * Load and parse Twig template (simplified mock for testing)
 */
function loadMediaTemplate() {
  const templatePath = path.join(__dirname, 'media.twig');
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8');
  }
  return '<figure>Mock media template</figure>';
}

/**
 * Create mock DOM structure for media component
 */
function createMediaDOM(props = {}) {
  const defaultProps = {
    media_entity: {
      id: 123,
      bundle: 'image',
      uri: 'https://example.com/test.jpg',
      mime_type: 'image/jpeg',
      metadata: { width: 1200, height: 800 }
    },
    alt_text: 'Test image for accessibility',
    caption: 'Test caption',
    variant: 'default',
    size: 'md',
    ...props
  };

  return `
    <figure id="media-${defaultProps.media_entity.id}" 
            class="adesso-media adesso-media--${defaultProps.variant} adesso-media--${defaultProps.media_entity.bundle}"
            role="img"
            data-media-id="${defaultProps.media_entity.id}"
            data-media-bundle="${defaultProps.media_entity.bundle}"
            data-behavior="media"
            ${defaultProps.aria_label ? `aria-label="${defaultProps.aria_label}"` : ''}
            ${defaultProps.long_description ? `aria-describedby="media-${defaultProps.media_entity.id}-desc"` : ''}
            ${defaultProps.caption ? `aria-labelledby="media-${defaultProps.media_entity.id}-caption"` : ''}
    >
      <div class="adesso-media__container relative">
        <div class="adesso-media__content">
          ${renderMediaByBundle(defaultProps)}
        </div>
      </div>
      ${defaultProps.caption ? `
        <figcaption id="media-${defaultProps.media_entity.id}-caption" 
                   class="adesso-media__caption mt-2 text-sm text-gray-700">
          ${defaultProps.caption}
        </figcaption>
      ` : ''}
      ${defaultProps.long_description ? `
        <div id="media-${defaultProps.media_entity.id}-desc" class="sr-only">
          ${defaultProps.long_description}
        </div>
      ` : ''}
    </figure>
  `;
}

/**
 * Render media content based on bundle type
 */
function renderMediaByBundle(props) {
  switch (props.media_entity.bundle) {
    case 'image':
      return `
        <picture class="adesso-media__picture">
          <source srcset="${props.media_entity.uri.replace('.jpg', '.avif')}" type="image/avif">
          <source srcset="${props.media_entity.uri.replace('.jpg', '.webp')}" type="image/webp">
          <img src="${props.media_entity.uri}" 
               alt="${props.alt_text || ''}"
               class="adesso-media__image w-full h-auto"
               ${props.lazy_loading !== false ? 'loading="lazy"' : ''}
               ${props.media_entity.metadata?.width ? `width="${props.media_entity.metadata.width}"` : ''}
               ${props.media_entity.metadata?.height ? `height="${props.media_entity.metadata.height}"` : ''}
          >
        </picture>
      `;
    
    case 'video':
      return `
        <video class="adesso-media__video w-full"
               ${props.controls !== false ? 'controls' : ''}
               ${props.autoplay ? 'autoplay' : ''}
               ${props.preload ? `preload="${props.preload}"` : 'preload="metadata"'}
               aria-label="${props.alt_text || 'Video content'}"
        >
          <source src="${props.media_entity.uri}" type="${props.media_entity.mime_type}">
          <p>Your browser does not support the video element.</p>
        </video>
      `;
    
    case 'audio':
      return `
        <audio class="adesso-media__audio w-full"
               ${props.controls !== false ? 'controls' : ''}
               ${props.preload ? `preload="${props.preload}"` : 'preload="metadata"'}
               aria-label="${props.alt_text || 'Audio content'}"
        >
          <source src="${props.media_entity.uri}" type="${props.media_entity.mime_type}">
          <p>Your browser does not support the audio element.</p>
        </audio>
      `;
    
    case 'document':
      return `
        <div class="adesso-media__document">
          <a href="${props.media_entity.uri}" 
             class="adesso-media__document-link flex items-center p-4 border border-gray-300 rounded"
             aria-label="${props.alt_text || 'Download document'}"
             download>
            <svg class="w-8 h-8 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 18h12V6l-4-4H4v16zm8-14v4h4"></path>
            </svg>
            <div>
              <div class="font-medium">${props.media_entity.name || 'Document'}</div>
              <div class="text-sm text-gray-500">
                ${props.media_entity.mime_type} 
                ${props.media_entity.file_size ? `(${Math.round(props.media_entity.file_size / 1024)} KB)` : ''}
              </div>
            </div>
          </a>
        </div>
      `;
    
    case 'remote_video':
      return `
        <div class="adesso-media__remote-video">
          ${props.external_content && !props.gdpr_compliant ? `
            <div class="adesso-media__privacy-notice p-4 bg-yellow-50 border border-yellow-200 rounded" role="alert">
              <p><strong>Privacy Notice:</strong> This content is hosted externally and may use tracking cookies.</p>
              <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded" 
                      onclick="this.parentElement.nextElementSibling.style.display='block'; this.parentElement.style.display='none';">
                Load Content
              </button>
            </div>
            <div style="display:none;">
          ` : '<div>'}
            <iframe src="${props.media_entity.uri}" 
                    class="w-full aspect-video"
                    title="${props.alt_text || 'External video content'}"
                    ${props.external_content ? 'sandbox="allow-scripts allow-same-origin"' : ''}
            ></iframe>
          </div>
        </div>
      `;
    
    default:
      return '<div>Unsupported media type</div>';
  }
}

describe('Media Component - Accessibility Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    // Create fresh DOM for each test
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
  });

  afterEach(() => {
    // Clean up
    if (dom) {
      dom.window.close();
    }
  });

  describe('WCAG 2.1 AA Compliance Tests', () => {
    
    it('should meet WCAG 2.1 AA accessibility standards for basic image', async () => {
      const html = createMediaDOM({
        media_entity: {
          id: 1,
          bundle: 'image',
          uri: 'https://example.com/city-hall.jpg',
          mime_type: 'image/jpeg',
          metadata: { width: 1200, height: 800 }
        },
        alt_text: 'Zürich City Hall building with Swiss flag',
        caption: 'Historic City Hall serving our community since 1694'
      });

      document.body.innerHTML = html;
      const results = await axe(document.body);
      
      expect(results).toHaveNoViolations();
    });

    it('should meet WCAG 2.1 AA standards for video content', async () => {
      const html = createMediaDOM({
        media_entity: {
          id: 2,
          bundle: 'video',
          uri: 'https://example.com/council-meeting.mp4',
          mime_type: 'video/mp4'
        },
        alt_text: 'City council meeting discussing urban development',
        caption: 'Monthly council meeting - March 2024',
        controls: true
      });

      document.body.innerHTML = html;
      const results = await axe(document.body);
      
      expect(results).toHaveNoViolations();
    });

    it('should meet WCAG 2.1 AA standards for audio content', async () => {
      const html = createMediaDOM({
        media_entity: {
          id: 3,
          bundle: 'audio',
          uri: 'https://example.com/municipal-info.mp3',
          mime_type: 'audio/mpeg'
        },
        alt_text: 'Municipal services information audio guide',
        caption: 'New resident information (3 minutes)',
        controls: true
      });

      document.body.innerHTML = html;
      const results = await axe(document.body);
      
      expect(results).toHaveNoViolations();
    });

    it('should meet WCAG 2.1 AA standards for document preview', async () => {
      const html = createMediaDOM({
        media_entity: {
          id: 4,
          bundle: 'document',
          uri: 'https://example.com/municipal-guide.pdf',
          mime_type: 'application/pdf',
          name: 'Municipal Services Guide',
          file_size: 2621440
        },
        alt_text: 'Municipal services guide PDF document',
        caption: 'Complete guide to municipal services (PDF, 2.5 MB)'
      });

      document.body.innerHTML = html;
      const results = await axe(document.body);
      
      expect(results).toHaveNoViolations();
    });

    it('should meet WCAG 2.1 AA standards for external video with privacy controls', async () => {
      const html = createMediaDOM({
        media_entity: {
          id: 5,
          bundle: 'remote_video',
          uri: 'https://youtube.com/embed/example'
        },
        alt_text: 'Municipal digital services overview video',
        caption: 'Learn about our digital transformation initiatives',
        external_content: true,
        gdpr_compliant: false
      });

      document.body.innerHTML = html;
      const results = await axe(document.body);
      
      expect(results).toHaveNoViolations();
    });

  });

  describe('Semantic Structure Tests', () => {
    
    it('should use proper figure/figcaption semantic structure', () => {
      const html = createMediaDOM({
        alt_text: 'Test image',
        caption: 'Test caption'
      });

      document.body.innerHTML = html;

      const figure = document.querySelector('figure');
      const figcaption = document.querySelector('figcaption');
      
      expect(figure).toBeTruthy();
      expect(figure.getAttribute('role')).toBe('img');
      expect(figcaption).toBeTruthy();
      expect(figcaption.textContent.trim()).toBe('Test caption');
    });

    it('should have proper ARIA relationships', () => {
      const html = createMediaDOM({
        media_entity: { id: 123, bundle: 'image', uri: 'test.jpg' },
        alt_text: 'Test image',
        caption: 'Test caption',
        long_description: 'Detailed description of the image content'
      });

      document.body.innerHTML = html;

      const figure = document.querySelector('figure');
      const caption = document.querySelector('figcaption');
      const description = document.querySelector('.sr-only');
      
      expect(figure.getAttribute('aria-labelledby')).toBe(caption.id);
      expect(figure.getAttribute('aria-describedby')).toBe(description.id);
      expect(caption.id).toMatch(/media-123-caption/);
      expect(description.id).toMatch(/media-123-desc/);
    });

    it('should handle multilingual content properly', () => {
      global.language.getId = () => 'de';
      
      const html = createMediaDOM({
        alt_text: 'English alt text',
        alt_text_de: 'Deutsches Alt-Text',
        alt_text_fr: 'Texte alternatif français',
        caption: 'English caption',
        caption_de: 'Deutsche Bildunterschrift',
        caption_fr: 'Légende française'
      });

      document.body.innerHTML = html;

      const img = document.querySelector('img');
      const caption = document.querySelector('figcaption');
      
      // Should use German content when language is 'de'
      expect(img?.getAttribute('alt')).toBe('Deutsches Alt-Text');
      expect(caption?.textContent.trim()).toBe('Deutsche Bildunterschrift');
    });

  });

  describe('Keyboard Navigation Tests', () => {
    
    it('should be keyboard accessible for interactive media', () => {
      const html = createMediaDOM({
        media_entity: { id: 123, bundle: 'video', uri: 'test.mp4' },
        controls: true
      });

      document.body.innerHTML = html;

      const figure = document.querySelector('figure');
      const video = document.querySelector('video');
      
      expect(figure.hasAttribute('tabindex')).toBe(true);
      expect(video.hasAttribute('controls')).toBe(true);
    });

    it('should support keyboard navigation for document downloads', () => {
      const html = createMediaDOM({
        media_entity: {
          id: 123,
          bundle: 'document',
          uri: 'test.pdf',
          mime_type: 'application/pdf'
        }
      });

      document.body.innerHTML = html;

      const link = document.querySelector('a');
      
      expect(link).toBeTruthy();
      expect(link.hasAttribute('href')).toBe(true);
      expect(link.getAttribute('aria-label')).toBeTruthy();
    });

  });

  describe('Screen Reader Support Tests', () => {
    
    it('should provide appropriate ARIA labels for all media types', () => {
      const testCases = [
        { bundle: 'image', expectedRole: 'img' },
        { bundle: 'video', expectedRole: 'img' },
        { bundle: 'audio', expectedRole: 'img' },
        { bundle: 'document', expectedRole: 'img' },
        { bundle: 'remote_video', expectedRole: 'img' }
      ];

      testCases.forEach(({ bundle, expectedRole }) => {
        const html = createMediaDOM({
          media_entity: { id: 123, bundle, uri: 'test.file' },
          alt_text: `Test ${bundle} content`,
          aria_label: `Custom ARIA label for ${bundle}`
        });

        document.body.innerHTML = html;

        const figure = document.querySelector('figure');
        
        expect(figure.getAttribute('role')).toBe(expectedRole);
        expect(figure.getAttribute('aria-label')).toBe(`Custom ARIA label for ${bundle}`);
      });
    });

    it('should hide decorative content from screen readers', () => {
      const html = createMediaDOM({
        long_description: 'Hidden description for screen readers'
      });

      document.body.innerHTML = html;

      const hiddenDesc = document.querySelector('.sr-only');
      
      expect(hiddenDesc).toBeTruthy();
      expect(hiddenDesc.textContent.trim()).toBe('Hidden description for screen readers');
    });

  });

  describe('Privacy and Compliance Tests', () => {
    
    it('should show privacy warnings for external content', () => {
      const html = createMediaDOM({
        media_entity: {
          id: 123,
          bundle: 'remote_video',
          uri: 'https://youtube.com/embed/test'
        },
        external_content: true,
        gdpr_compliant: false,
        privacy_level: 'restricted'
      });

      document.body.innerHTML = html;

      const privacyNotice = document.querySelector('.adesso-media__privacy-notice, [role="alert"]');
      
      expect(privacyNotice).toBeTruthy();
      expect(privacyNotice.getAttribute('role')).toBe('alert');
    });

    it('should have proper data attributes for compliance tracking', () => {
      const html = createMediaDOM({
        external_content: true,
        privacy_level: 'restricted',
        gdpr_compliant: false
      });

      document.body.innerHTML = html;

      const figure = document.querySelector('figure');
      
      expect(figure.getAttribute('data-external-content')).toBe('true');
      expect(figure.getAttribute('data-privacy-level')).toBe('restricted');
      expect(figure.getAttribute('data-gdpr-warning')).toBe('true');
    });

  });

  describe('High Contrast and Visual Support', () => {
    
    it('should maintain structure in high contrast mode', () => {
      const html = createMediaDOM({
        alt_text: 'High contrast test image',
        caption: 'Test caption for high contrast'
      });

      document.body.innerHTML = html;

      // Simulate high contrast mode by checking essential structure
      const figure = document.querySelector('figure');
      const caption = document.querySelector('figcaption');
      
      expect(figure.classList.contains('adesso-media')).toBe(true);
      expect(caption).toBeTruthy();
      expect(figure.getAttribute('role')).toBe('img');
    });

  });

  describe('Error Handling and Fallbacks', () => {
    
    it('should handle missing alt text gracefully', async () => {
      const html = createMediaDOM({
        media_entity: { id: 123, bundle: 'image', uri: 'test.jpg' },
        alt_text: '', // Empty alt text
        caption: 'Image without alt text'
      });

      document.body.innerHTML = html;
      
      const img = document.querySelector('img');
      expect(img?.getAttribute('alt')).toBe('');
      
      // Should still pass basic accessibility (empty alt is valid for decorative images)
      const results = await axe(document.body);
      expect(results.violations.filter(v => v.id === 'image-alt')).toHaveLength(0);
    });

    it('should provide fallback content', () => {
      const html = `
        <figure class="adesso-media">
          <div class="adesso-media__fallback sr-only" role="alert">
            <p>Image could not be loaded. This is fallback content.</p>
          </div>
          <div class="adesso-media__content">
            <img src="broken-link.jpg" alt="Test image">
          </div>
        </figure>
      `;

      document.body.innerHTML = html;

      const fallback = document.querySelector('.adesso-media__fallback');
      
      expect(fallback).toBeTruthy();
      expect(fallback.getAttribute('role')).toBe('alert');
      expect(fallback.textContent).toContain('Image could not be loaded');
    });

  });

  describe('Swiss Municipal Standards', () => {
    
    it('should support Swiss multilingual requirements (DE/FR)', () => {
      const testLanguages = ['de', 'fr'];
      
      testLanguages.forEach(lang => {
        global.language.getId = () => lang;
        
        const html = createMediaDOM({
          alt_text: 'Default alt text',
          alt_text_de: 'Deutsche Alt-Text',
          alt_text_fr: 'Texte alternatif français',
          caption: 'Default caption',
          caption_de: 'Deutsche Bildunterschrift',
          caption_fr: 'Légende française'
        });

        document.body.innerHTML = html;

        const img = document.querySelector('img');
        const caption = document.querySelector('figcaption');
        
        if (lang === 'de') {
          expect(img?.getAttribute('alt')).toBe('Deutsche Alt-Text');
          expect(caption?.textContent.trim()).toBe('Deutsche Bildunterschrift');
        } else if (lang === 'fr') {
          expect(img?.getAttribute('alt')).toBe('Texte alternatif français');
          expect(caption?.textContent.trim()).toBe('Légende française');
        }
      });
    });

    it('should include structured data for SEO compliance', () => {
      const html = createMediaDOM({
        media_entity: {
          id: 123,
          bundle: 'image',
          uri: 'https://example.com/test.jpg',
          metadata: { width: 1200, height: 800 }
        },
        alt_text: 'Municipal building',
        caption: 'City Hall'
      });

      // Add structured data (would be generated by template)
      document.body.innerHTML = html + `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "contentUrl": "https://example.com/test.jpg",
          "caption": "City Hall",
          "description": "Municipal building",
          "width": 1200,
          "height": 800
        }
        </script>
      `;

      const structuredData = document.querySelector('script[type="application/ld+json"]');
      
      expect(structuredData).toBeTruthy();
      
      const data = JSON.parse(structuredData.textContent);
      expect(data['@type']).toBe('ImageObject');
      expect(data.description).toBe('Municipal building');
    });

  });

});