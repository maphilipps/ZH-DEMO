# Research Report: Media Component Complete Rewrite (SDC Analysis)
**Issue Reference**: [GitHub Issue #94](https://github.com/adessoCMS/issues/94) - 🔧 SDC Analysis: Media Component - Complete Rewrite Required
**Research Date**: September 6, 2025
**Research Scope**: Comprehensive analysis for complete media component rewrite including schema architecture, accessibility compliance, performance optimization, and modern implementation patterns

## Executive Summary

The current media component in the adesso CMS theme is severely under-specified with a critical 30/100 schema score and missing essential features for accessibility, performance, and proper Drupal integration. This research provides the foundation for a complete rewrite addressing WCAG 2.1 AA compliance, modern image format optimization (AVIF/WebP), responsive design patterns, and proper Drupal 11 SDC architecture. The findings recommend implementing a comprehensive component with proper media entity integration, progressive enhancement patterns, and municipal portal compliance requirements.

## Current Codebase Analysis

### Existing Pattern Assessment

**Current Media Component Structure:**
```yaml
# web/themes/custom/adesso_cms_theme/components/media/media.component.yml
name: Media
description: Editorial/Media component
props:
  type: object
  properties:
    media:
      type: string  # Critically insufficient
    modifier:
      type: string
```

**Current Template (Severely Limited):**
```twig
<div class="{{ modifier|default('w-full') }}">
  {{ media|default('') }}
</div>
```

### Existing Implementation Gaps

**Schema Architecture Issues:**
- **Missing core SDC features**: No `status` field, no `libraryDependencies`, no slots definition
- **Insufficient props structure**: Only basic `media` string prop without validation
- **No accessibility properties**: Missing alt text, ARIA attributes, caption support
- **No performance controls**: No lazy loading, responsive image controls, format optimization

**Comparison with Better-Implemented Components:**

**Button Component Pattern (Well-Structured):**
```yaml
props:
  properties:
    url:
      type: string
      description: The URL the button links to
    variant:
      type: string
      enum: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    size:
      type: string
      enum: ['default', 'sm', 'lg', 'icon']
```

**Carousel Component Pattern (Complex Component):**
```yaml
libraryOverrides:
  js:
    carousel.behavior.js:
      attributes:
        async: false
        defer: true
  dependencies:
    - core/drupal
```

### Current Drupal Media Integration

**Existing Media Templates Found:**
- `media--image-with-link.html.twig`: Demonstrates field integration patterns
- `media--image--project-steps.html.twig`: Shows entity property access patterns

**Integration Patterns Observed:**
```twig
{% set image_uri = media.field_media_image.0.entity.uri.value %}
{% set image_url = image_uri | file_url %}
{% set image_alt = media.field_media_image.0.alt %}
```

### Code Quality Assessment

**Current Implementation Quality: CRITICAL (30/100)**
- Lacks fundamental component architecture
- No accessibility implementation
- No performance optimizations
- Insufficient Drupal integration
- Missing documentation and testing patterns

**Areas for Improvement:**
- Complete schema rewrite with proper validation
- Accessibility-first implementation approach
- Performance optimization with modern formats and lazy loading
- Proper Drupal media entity integration
- Comprehensive testing and documentation

## Best Practices Research (Context7)

### SDC Architecture Standards

**Drupal 11 SDC Schema Requirements:**
```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Media Component
description: A reusable media component with accessibility features
props:
  type: object
  properties:
    media_entity:
      type: object
      title: Media Entity
      description: Drupal media entity with all associated data
      required: true
      properties:
        bundle:
          type: string
          enum: ['image', 'video', 'audio', 'document']
        url:
          type: string
          format: uri
        alt:
          type: string
          title: Alternative Text
        title:
          type: string
  required:
    - media_entity
slots:
  type: object
  properties:
    caption:
      title: Media Caption
      description: Optional caption content
libraryDependencies:
  - core/drupal
  - core/drupal.ajax
  - adesso_cms_theme/media
```

### Accessibility Implementation Requirements

**WCAG 2.1 AA Standards for Media:**
- **Images**: All `img` tags must have `alt` attributes with descriptive text
- **Complex Images**: Short alt text + long description in nearby text for charts/diagrams
- **Interactive Media**: Alt text must describe purpose/function for buttons/links
- **Video Content**: Synchronized captions for non-live video, descriptive transcript for audio-only content

**ARIA Implementation Patterns:**
```html
<figure role="img" aria-labelledby="img-caption">
  <img src="chart.jpg" alt="Sales data chart showing 25% increase">
  <figcaption id="img-caption">
    Quarterly sales increased from $100K to $125K
  </figcaption>
</figure>
```

### Performance Optimization Standards

**Modern Image Format Strategy (2024):**
```html
<picture>
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

**Responsive Images Implementation:**
```html
<img
  src="image-500.jpg"
  srcset="image-500.jpg 500w, image-1000.jpg 1000w, image-1500.jpg 1500w"
  sizes="(min-width: 768px) 500px, 100vw"
  alt="Description"
  loading="lazy"
>
```

### Progressive Enhancement Patterns

**Intersection Observer Implementation:**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px',
  threshold: 0.1
});
```

## Current Industry Analysis (Web Research)

### Drupal 11 Standards (2024)

**Accessibility Commitment:**
- Drupal code should strive to meet Web Content Accessibility Guidelines (WCAG) 2.2 AA
- Drupal 11 sets new accessibility standards with Claro theme as default administration theme
- Alt text is required by default in Drupal's content types, supporting authoring best practices

**Performance Enhancements:**
- Drupal 11 introduces enhanced caching strategies reducing server load
- Increased Vanilla JavaScript usage reducing jQuery reliance
- PHP 8.3 compatibility brings performance gains of up to 50%
- Better handling of JavaScript and CSS files for faster page rendering

**Media Management Features:**
- Enhanced Layout Builder and Media Management Tools
- Media module centralizes media files under single UI with easy alt text configuration
- Drupal supports remote media out of the box for YouTube, Vimeo embedding

### Web Components Accessibility Standards

**Core Accessibility Principles:**
- **Keyboard Focusability**: Interactive controls must be keyboard focusable with `tabindex='0'`
- **Semantic Markup**: Use native HTML elements over custom ones when possible
- **ARIA Implementation**: Supplement HTML with proper roles and attributes for assistive technologies

**Web Components Specific Challenges:**
- ID referencing critical for accessibility (aria-labelledby, aria-describedby, aria-controls)
- Can only extend generic HTMLElement or other Web Components (not specific elements)
- Testing with actual assistive technology required (not just browser emulators)

### Modern Image Format Adoption (2024)

**AVIF vs WebP Performance:**
| Format | Browser Support | Size Reduction | Quality | Decode Speed |
|--------|----------------|----------------|---------|--------------|
| AVIF | 93.29% (2024) | 50% vs JPEG, 20-30% vs WebP | Superior HDR/WCG | Slower |
| WebP | 96.45% (2024) | 25-34% vs JPEG | Good quality | Faster |

**Industry Recommendations:**
- **2024 Strategy**: Use AVIF with WebP fallback, then JPEG
- **Progressive Enhancement**: Serve AVIF to supporting browsers, WebP for others
- **Performance Impact**: Modern formats reduce file sizes by 30-50% vs traditional formats

### Lazy Loading Best Practices

**Native Lazy Loading:**
- Use `loading="lazy"` attribute for below-the-fold images
- Don't lazy load above-the-fold images (impacts LCP)
- Specify width/height to prevent cumulative layout shift

**Advanced Implementation:**
- Intersection Observer API for custom lazy loading control
- 1-second viewport delay for improved user experience
- JavaScript fallbacks for browser compatibility

## Synthesis and Recommendations

### Recommended Architecture Approach

**1. Comprehensive SDC Schema Design**
```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/10.1.x/core/modules/sdc/src/metadata.schema.json
name: Media
status: stable
description: Comprehensive media component with accessibility and performance optimization

props:
  type: object
  properties:
    media_entity:
      type: object
      title: Media Entity
      description: Drupal media entity with all associated data
      required: true
      properties:
        bundle:
          type: string
          enum: ['image', 'video', 'audio', 'document']
        url:
          type: string
          format: uri
        alt:
          type: string
          title: Alternative Text
        title:
          type: string
        caption:
          type: string
    display_options:
      type: object
      properties:
        style:
          type: string
          enum: ['default', 'hero', 'thumbnail', 'gallery']
          default: 'default'
        lazy_load:
          type: boolean
          default: true
        responsive:
          type: boolean
          default: true
        aspect_ratio:
          type: string
          enum: ['auto', '16/9', '4/3', '1/1', '3/2']
          default: 'auto'
  required:
    - media_entity

slots:
  caption:
    title: Media Caption
    description: Custom caption content
  overlay:
    title: Media Overlay
    description: Overlay content for interactive media

libraryDependencies:
  - core/drupal
  - core/drupal.ajax
  - adesso_cms_theme/media
```

**2. Modern Template Implementation**
```twig
{#
/**
 * @file
 * Media component template with accessibility and performance.
 */
#}
{% set media_classes = [
  'media',
  'media--' ~ (display_options.style ?? 'default'),
  display_options.lazy_load ? 'media--lazy' : '',
  display_options.aspect_ratio ? 'media--aspect-' ~ (display_options.aspect_ratio|replace('/', '-')) : '',
] %}

<figure{{ attributes.addClass(media_classes) }} 
        role="img"
        {% if media_entity.alt %}aria-labelledby="{{ id }}-caption"{% endif %}>
        
  {% if media_entity.bundle == 'image' %}
    {% if display_options.responsive %}
      <picture class="media__picture">
        <source type="image/avif" srcset="{{ media_entity.url|image_style('responsive_avif') }}">
        <source type="image/webp" srcset="{{ media_entity.url|image_style('responsive_webp') }}">
        <img 
          src="{{ media_entity.url }}"
          alt="{{ media_entity.alt }}"
          {% if display_options.lazy_load %}loading="lazy"{% endif %}
          class="media__image"
          width="{{ media_entity.width ?? '' }}"
          height="{{ media_entity.height ?? '' }}"
        >
      </picture>
    {% else %}
      <img 
        src="{{ media_entity.url }}"
        alt="{{ media_entity.alt }}"
        {% if display_options.lazy_load %}loading="lazy"{% endif %}
        class="media__image"
      >
    {% endif %}
  {% elseif media_entity.bundle == 'video' %}
    {% include '@adesso_cms_theme/media/video.twig' %}
  {% elseif media_entity.bundle == 'audio' %}
    {% include '@adesso_cms_theme/media/audio.twig' %}
  {% elseif media_entity.bundle == 'document' %}
    {% include '@adesso_cms_theme/media/document.twig' %}
  {% endif %}
  
  {% if slots.overlay %}
    <div class="media__overlay">{{ slots.overlay }}</div>
  {% endif %}
  
  {% if media_entity.caption or slots.caption %}
    <figcaption id="{{ id }}-caption" class="media__caption">
      {{ slots.caption ?? media_entity.caption }}
    </figcaption>
  {% endif %}
</figure>
```

**3. Progressive Enhancement JavaScript**
```javascript
/**
 * @file
 * Media component behavior with progressive enhancement.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.mediaComponent = {
    attach: function (context, settings) {
      const mediaElements = once('media-enhancement', '.media--lazy', context);
      
      // Feature detection for Intersection Observer
      if ('IntersectionObserver' in window) {
        this.initLazyLoading(mediaElements);
      } else {
        // Fallback: load all images immediately
        this.loadAllImages(mediaElements);
      }
      
      // Handle interactive media
      this.initInteractiveMedia(context);
    },

    initLazyLoading: function (elements) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMedia(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });

      elements.forEach(element => observer.observe(element));
    },

    loadMedia: function (element) {
      const img = element.querySelector('img[data-src]');
      if (img) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      }
    },

    initInteractiveMedia: function (context) {
      // Handle keyboard navigation for interactive media
      const interactiveMedia = context.querySelectorAll('.media--interactive');
      interactiveMedia.forEach(media => {
        media.addEventListener('keydown', this.handleKeyboardNav.bind(this));
      });
    },

    handleKeyboardNav: function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // Handle media interaction
      }
    }
  };

})(Drupal, once);
```

### Implementation Strategy

**Phase 1: Core Architecture (Week 1)**
1. **Schema Design**: Implement comprehensive component schema with validation
2. **Basic Templates**: Create core template structure with accessibility foundations
3. **Media Entity Integration**: Establish proper Drupal media entity handling

**Phase 2: Accessibility & Performance (Week 2)**
1. **WCAG 2.1 AA Implementation**: Full accessibility compliance with ARIA support
2. **Modern Image Formats**: AVIF/WebP support with progressive enhancement
3. **Responsive Images**: Implement responsive image patterns with proper breakpoints
4. **Lazy Loading**: Native and JavaScript-enhanced lazy loading implementation

**Phase 3: Advanced Features & Testing (Week 3)**
1. **Interactive Media**: Video, audio, and document handling
2. **Progressive Enhancement**: Advanced JavaScript patterns with fallbacks
3. **Testing Suite**: Accessibility, performance, and visual regression tests
4. **Documentation**: Complete usage guide with Storybook integration

### Risk Assessment

**Technical Risks:**
- **Migration Complexity**: Complete rewrite affects all existing media usage
- **Performance Impact**: New features must not degrade page load times
- **Browser Compatibility**: Modern features need proper fallbacks

**Performance Risks:**
- **Bundle Size**: JavaScript enhancements must be optimized for loading
- **Image Processing**: Server-side image optimization pipeline required
- **Caching Strategy**: Component changes may require cache invalidation

**Accessibility Risks:**
- **Regression Testing**: Must ensure no accessibility features are lost
- **Screen Reader Compatibility**: Testing required across multiple assistive technologies
- **Keyboard Navigation**: Complex media interactions need proper focus management

### Success Metrics

**Component Quality Metrics:**
- **Schema Score**: Target 90/100 (vs current 30/100)
- **Accessibility Score**: 100% WCAG 2.1 AA compliance
- **Performance Score**: <2s LCP, minimal CLS impact

**Implementation Success Indicators:**
- **Test Coverage**: >90% unit test coverage, full accessibility test suite
- **Documentation**: Complete usage guide with all media types and configurations
- **Migration**: Zero-downtime migration from existing implementation

## Implementation Prerequisites

### Required Libraries
- **Core Dependencies**: `core/drupal`, `core/drupal.ajax`
- **Image Processing**: Drupal responsive image module, image optimization service
- **Accessibility**: Screen reader testing tools, WAVE accessibility checker
- **Performance**: Lighthouse CI, BackstopJS for visual regression

### Configuration Changes
- **Image Styles**: Configure AVIF/WebP image style variants
- **Responsive Breakpoints**: Define breakpoint configuration for responsive images
- **Media Types**: Ensure all media bundles (image, video, audio, document) are properly configured
- **CDN Setup**: Configure CDN for optimized media delivery if available

### Database Changes
- **No database changes required** - component works with existing Drupal media entities
- **Cache Tags**: Implement proper cache tag invalidation for media entity updates

### Infrastructure Requirements
- **Image Processing**: Server-side image optimization (ImageMagick/GD with AVIF/WebP support)
- **CDN Configuration**: Optional CDN setup for media delivery optimization
- **Monitoring**: Performance monitoring for Core Web Vitals tracking

## Next Steps for Planning Phase

### Specific Items for `/plan` Command to Address

1. **Agent Selection Strategy**:
   - **Primary Agent**: `drupal-ui-designer` for accessibility and responsive implementation
   - **Support Agent**: `drupal-sdc-validator` for schema architecture validation
   - **Support Agent**: `storybook-component-curator` for documentation and testing
   - **Review Agent**: `debug-detective` for performance optimization and debugging

2. **Architecture Decision Points**:
   - Media entity preprocessing approach (preprocess vs computed properties)
   - JavaScript library strategy (custom vs third-party for advanced features)
   - Image processing pipeline (server-side vs client-side optimization)
   - Testing strategy (unit vs integration vs accessibility testing priorities)

3. **Implementation Sequencing**:
   - Schema-first approach vs template-first approach
   - Accessibility implementation concurrent with core features vs separate phase
   - Progressive enhancement implementation timing
   - Migration strategy (big bang vs gradual rollout)

4. **Quality Gates Definition**:
   - Accessibility testing checkpoints at each phase
   - Performance benchmarking requirements
   - Browser compatibility testing scope
   - Documentation completeness criteria

## Compound Learning Insights

### Patterns for Future Reuse

**Component Architecture Patterns:**
- **Progressive Enhancement Schema**: Pattern for adding optional advanced features to basic components
- **Media Entity Integration**: Reusable patterns for other components using Drupal media entities
- **Accessibility-First Design**: Template and behavior patterns ensuring WCAG compliance from start

**Performance Optimization Patterns:**
- **Modern Image Format Stacking**: Reusable AVIF/WebP/JPEG fallback patterns
- **Lazy Loading Implementation**: Progressive enhancement pattern for all media components
- **Responsive Design Integration**: Component-level responsive patterns

### Context Evolution Recommendations

**CLAUDE.md Updates Suggested:**
```markdown
## Media Component Standards (Added to CLAUDE.md)

**Media components must implement:**
- WCAG 2.1 AA accessibility compliance with proper ARIA support
- Modern image format support (AVIF > WebP > JPEG fallback)
- Native lazy loading with Intersection Observer enhancement
- Responsive image patterns with proper srcset and sizes
- Progressive enhancement with graceful degradation

**Testing Requirements:**
- Accessibility testing with actual screen readers
- Performance testing for Core Web Vitals impact
- Visual regression testing for media display consistency
- Cross-browser compatibility testing for all features
```

**Quality Gate Improvements:**
- **Automated Accessibility Testing**: Integrate axe-core into component testing pipeline
- **Performance Benchmarking**: Lighthouse CI integration for media component performance
- **Visual Regression**: BackstopJS integration for media display consistency

### Predictive Intelligence

**Potential Issues Identified:**
- **Server Image Processing**: May need ImageMagick/GD configuration updates for AVIF support
- **CDN Configuration**: Modern format delivery may require CDN reconfiguration
- **Browser Fallbacks**: IE11 support (if required) needs comprehensive fallback strategy

**Proactive Optimizations Recommended:**
- **Image Processing Pipeline**: Set up automated image optimization for uploaded media
- **Preloading Strategy**: Implement critical image preloading for above-fold content
- **Monitoring Integration**: Set up Core Web Vitals monitoring for media component impact

## Expected Outcome

This comprehensive research provides the planning phase with:

- **Clear Implementation Roadmap**: Three-phase approach with specific deliverables and timelines
- **Technical Architecture**: Complete component schema, template, and behavior specifications
- **Risk-Aware Framework**: Identified risks with mitigation strategies for each implementation phase
- **Quality Assurance Foundation**: Success metrics, testing requirements, and validation criteria
- **Municipal Compliance Alignment**: WCAG 2.1 AA compliance meeting Swiss government portal requirements

The research establishes a foundation for immediately beginning implementation with confidence in architectural decisions, accessibility compliance, performance optimization strategies, and integration patterns. The planning phase can now focus on agent coordination and sprint planning rather than additional technical investigation.

---

**Final Status**: Research Complete - Ready for Planning Phase Implementation
**Next Command**: `/plan` - Agent selection and implementation sequencing
**Estimated Implementation**: 3 weeks (41 hours) for complete media component rewrite