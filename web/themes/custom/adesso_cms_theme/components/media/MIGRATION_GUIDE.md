# Media Component Migration Guide

**From Legacy Implementation to Enhanced Media Component (Issue #94)**

## Overview

This guide provides detailed instructions for migrating from the legacy media implementation to the new Enhanced Media Component with WCAG 2.1 AA compliance, modern image formats, and Swiss municipal standards.

## Pre-Migration Checklist

### ✅ **Prerequisites**
- [ ] Drupal 11+ environment
- [ ] PHP 8.3+ 
- [ ] Node.js 18+
- [ ] DDEV setup completed
- [ ] Theme dependencies installed (`ddev npm install`)
- [ ] Backup existing media configurations

### ✅ **Testing Environment**
- [ ] Storybook running (`ddev theme storybook`)
- [ ] Test suite functional (`ddev npm run qa:full`)
- [ ] Visual regression baseline established
- [ ] Performance monitoring available

## Migration Steps

### Phase 1: Component Structure Migration

#### 1.1 Update Template Includes

**OLD Implementation:**
```twig
{# Basic Drupal media rendering #}
{{ content.field_media }}

{# Or custom media template #}
{% include '@theme/templates/media/media.html.twig' with {
  'media': content.field_media,
  'settings': view_mode_settings
} %}
```

**NEW Implementation:**
```twig
{# Enhanced SDC media component #}
{% include 'sdc:media' with {
  media_entity: content.field_media['#items'][0].entity,
  variant: 'default',
  alt_text: content.field_media['#items'][0].entity.field_media_image.alt,
  caption: content.field_media['#items'][0].entity.name.value,
  lazy_loading: true,
  responsive: true
} %}
```

#### 1.2 Update CSS Classes

**OLD Classes:**
```scss
.media-wrapper { }
.media-image { }
.media-video { }
.media-document { }
.media--hero { }
.media--thumbnail { }
```

**NEW Classes:**
```scss
.adesso-media { }
.adesso-media__image { }
.adesso-media__video { }
.adesso-media__document { }
.adesso-media--hero { }
.adesso-media--thumbnail { }
.adesso-media--card { }
.adesso-media--gallery { }
.adesso-media--accessibility { }
```

#### 1.3 Update JavaScript Behaviors

**OLD JavaScript:**
```javascript
Drupal.behaviors.mediaResponsive = {
  attach: function (context, settings) {
    $('.media-wrapper', context).each(function() {
      // Legacy media handling
    });
  }
};
```

**NEW JavaScript:**
```javascript
Drupal.behaviors.media = {
  attach: function (context, settings) {
    $('.adesso-media', context).each(function() {
      // Enhanced media behavior with performance monitoring
      const mediaElement = this;
      const mediaId = mediaElement.dataset.mediaId;
      
      // Initialize performance tracking
      if (window.MediaPerformanceDebugger) {
        window.MediaPerformanceDebugger.trackElement(mediaElement);
      }
    });
  }
};
```

### Phase 2: Content Type Migration

#### 2.1 Update Field Configurations

**Content Type: Article**
```yaml
# OLD field configuration
field_media:
  type: entity_reference
  settings:
    target_type: media
  display:
    default:
      type: entity_reference_entity_view
      settings:
        view_mode: default
```

**NEW field configuration with SDC:**
```yaml
# Enhanced field configuration
field_media:
  type: entity_reference
  settings:
    target_type: media
  display:
    default:
      type: sdc_media_formatter
      settings:
        component: media
        variant: default
        lazy_loading: true
        responsive: true
```

#### 2.2 Update View Modes

**Legacy Media View Mode:**
```yaml
media.image.default:
  content:
    thumbnail: 
      type: image
      settings:
        image_style: large
```

**Enhanced Media View Mode:**
```yaml
media.image.default:
  content:
    field_media_image:
      type: sdc_responsive_image
      settings:
        component: media
        variant: default
        modern_formats: true
        lazy_loading: true
        responsive_image_style: media_responsive
```

### Phase 3: Accessibility Compliance Migration

#### 3.1 Add Alt Text Support

**OLD Implementation:**
```twig
<img src="{{ file_url(media.field_media_image.entity.uri.value) }}" 
     alt="{{ media.field_media_image.alt }}">
```

**NEW Implementation:**
```twig
{% include 'sdc:media' with {
  media_entity: media,
  alt_text: media.field_media_image.alt,
  alt_text_de: media.field_alt_text_de.value,
  alt_text_fr: media.field_alt_text_fr.value,
  aria_label: media.field_aria_label.value,
  long_description: media.field_long_description.value
} %}
```

#### 3.2 Add Caption and Description Fields

**Add fields to media types:**
```bash
# Add multilingual alt text fields
ddev drush field:create media image field_alt_text_de --field-label="Alt Text (German)" --field-type=string
ddev drush field:create media image field_alt_text_fr --field-label="Alt Text (French)" --field-type=string

# Add accessibility enhancement fields
ddev drush field:create media image field_aria_label --field-label="ARIA Label" --field-type=string
ddev drush field:create media image field_long_description --field-label="Long Description" --field-type=text_long
```

#### 3.3 Update Form Displays

```yaml
# Form display configuration
media.image.default:
  content:
    field_media_image:
      settings:
        alt_field_required: true
    field_alt_text_de:
      type: string_textfield
      weight: 1
    field_alt_text_fr:
      type: string_textfield  
      weight: 2
    field_aria_label:
      type: string_textfield
      weight: 3
    field_long_description:
      type: text_textarea
      weight: 4
```

### Phase 4: Performance Optimization Migration

#### 4.1 Enable Modern Image Formats

**Add responsive image style:**
```yaml
# responsive_image.styles.media_responsive.yml
uuid: ...
langcode: en
status: true
dependencies: []
id: media_responsive
label: 'Media Responsive'
image_style_mappings:
  - breakpoint_id: responsive_image.viewport_sizing
    multiplier: 1x
    image_mapping_type: sizes
    image_mapping:
      sizes: '(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw'
      sizes_image_styles:
        - media_large_avif
        - media_large_webp  
        - media_large
```

#### 4.2 Configure Image Styles with Modern Formats

```yaml
# image.style.media_large_avif.yml
uuid: ...
name: media_large_avif
label: 'Media Large AVIF'
effects:
  scale:
    id: image_scale
    weight: 0
    data:
      width: 1200
      height: null
      upscale: false
  convert:
    id: imageapi_optimize_convert
    weight: 1
    data:
      format: avif
      quality: 85
```

#### 4.3 Update Performance Settings

```twig
{# Performance-optimized media calls #}
{% include 'sdc:media' with {
  media_entity: media,
  variant: node.isPublished ? 'hero' : 'default',
  lazy_loading: loop.index0 > 2, {# First 3 images load immediately #}
  preload: loop.index0 == 0 ? 'auto' : 'metadata',
  responsive: true,
  quality: connection_aware ? 'adaptive' : 85
} %}
```

### Phase 5: Swiss Municipal Compliance

#### 5.1 Add Privacy Classification Fields

```bash
# Add compliance fields to media types
ddev drush field:create media document field_privacy_level --field-label="Privacy Level" --field-type=list_string --field-widget=options_select
ddev drush field:create media remote_video field_external_content --field-label="External Content" --field-type=boolean
ddev drush field:create media remote_video field_gdpr_compliant --field-label="GDPR Compliant" --field-type=boolean
```

#### 5.2 Configure Privacy Settings

```yaml
# Field configuration for privacy levels
field.field.media.document.field_privacy_level:
  settings:
    allowed_values:
      public: 'Public'
      internal: 'Internal Use'
      restricted: 'Restricted Access'
  required: true
```

#### 5.3 Update Templates for Compliance

```twig
{% include 'sdc:media' with {
  media_entity: media,
  external_content: media.field_external_content.value,
  privacy_level: media.field_privacy_level.value,
  gdpr_compliant: media.field_gdpr_compliant.value,
  alt_text: current_language == 'de' ? media.field_alt_text_de.value : media.field_media_image.alt
} %}
```

## Testing Migration

### Automated Testing

```bash
# Run full test suite
ddev npm run qa:full --prefix web/themes/custom/adesso_cms_theme

# Test specific components
ddev npm run test -- components/media --prefix web/themes/custom/adesso_cms_theme

# Visual regression testing
ddev npm run visual:test --prefix web/themes/custom/adesso_cms_theme
```

### Manual Testing Checklist

#### ✅ **Accessibility Testing**
- [ ] Screen reader compatibility (NVDA, JAWS)
- [ ] Keyboard navigation works for all interactive elements
- [ ] High contrast mode displays correctly
- [ ] Alt text displays in all languages
- [ ] ARIA labels and descriptions are present
- [ ] Focus indicators are visible

#### ✅ **Performance Testing**
- [ ] LCP < 2 seconds for hero images
- [ ] CLS < 0.1 during image loading
- [ ] Modern image formats load correctly (AVIF/WebP)
- [ ] Lazy loading works below the fold
- [ ] Connection-aware optimization functions
- [ ] Performance metrics show in browser DevTools

#### ✅ **Cross-Browser Testing**
- [ ] Chrome 90+: Full feature support
- [ ] Firefox 88+: WebP and modern features
- [ ] Safari 14+: Basic feature support
- [ ] Edge 90+: Full compatibility

#### ✅ **Swiss Municipal Compliance**
- [ ] German/French language variants work
- [ ] Privacy warnings display for external content
- [ ] GDPR compliance indicators function
- [ ] Document download accessibility
- [ ] Government styling applies correctly

### Rollback Plan

If issues occur during migration:

1. **Immediate Rollback:**
   ```bash
   # Revert template includes
   git checkout HEAD~1 -- web/themes/custom/adesso_cms_theme/templates/
   
   # Clear caches
   ddev drush cr
   ```

2. **Component-Specific Rollback:**
   ```twig
   {# Temporary fallback to Drupal default #}
   {% if use_legacy_media %}
     {{ content.field_media }}
   {% else %}
     {% include 'sdc:media' with {...} %}
   {% endif %}
   ```

3. **CSS Fallback:**
   ```scss
   // Support both old and new classes during transition
   .media-wrapper,
   .adesso-media {
     // Shared styles
   }
   ```

## Post-Migration Validation

### Performance Validation

```bash
# Generate performance report
ddev npm run test -- components/media/media.performance.test.js --prefix web/themes/custom/adesso_cms_theme

# Check Core Web Vitals
# Open Storybook performance stories and monitor metrics
```

### Accessibility Validation

```bash
# Run accessibility audit
ddev npm run test -- components/media/media.accessibility.test.js --prefix web/themes/custom/adesso_cms_theme

# Manual screen reader testing required
```

### Content Audit

1. **Review all existing content:**
   ```sql
   # Check for media without alt text
   SELECT m.mid, m.name FROM media_field_data m 
   LEFT JOIN media__field_media_image i ON m.mid = i.entity_id 
   WHERE i.field_media_image_alt IS NULL OR i.field_media_image_alt = '';
   ```

2. **Update missing accessibility content:**
   - Add alt text for all images
   - Provide captions for videos
   - Add transcripts for audio content
   - Classify privacy levels for documents

## Monitoring and Maintenance

### Performance Monitoring

```javascript
// Add to your monitoring scripts
if (window.MediaPerformanceDebugger) {
  setInterval(() => {
    const status = window.MediaPerformanceDebugger.getStatus();
    if (status.performance.grade === 'D') {
      console.warn('Media performance degraded:', status);
    }
  }, 30000);
}
```

### Content Governance

1. **Editorial Guidelines:**
   - All images must have descriptive alt text
   - German/French variants required for public content
   - Privacy levels must be classified
   - Modern image formats preferred

2. **Regular Audits:**
   - Monthly accessibility compliance check
   - Quarterly performance review
   - Annual content classification update

## Troubleshooting

### Common Migration Issues

#### Issue: Images Not Loading
```twig
{# Debug image paths #}
{% if media_entity.uri %}
  <!-- URI: {{ media_entity.uri }} -->
  <!-- Absolute URL: {{ file_url(media_entity.uri) }} -->
{% endif %}
```

#### Issue: CSS Styles Not Applied
```scss
// Ensure new classes are compiled
.adesso-media {
  @apply block relative;
  
  &__image {
    @apply w-full h-auto;
  }
}
```

#### Issue: JavaScript Behaviors Not Working
```javascript
// Check if behavior is attached
console.log('Media behaviors:', Object.keys(Drupal.behaviors));

// Re-attach behaviors if needed
Drupal.attachBehaviors(document, drupalSettings);
```

### Debug Tools

1. **Performance Debug:**
   ```javascript
   // Enable debug mode in Storybook
   window.MediaPerformanceDebugger.showDebugOverlay();
   ```

2. **Accessibility Debug:**
   ```bash
   # Run specific accessibility tests
   ddev npm run test -- --grep "accessibility" --prefix web/themes/custom/adesso_cms_theme
   ```

## Support Resources

- **Component Documentation**: `components/media/README.md`
- **Storybook**: http://localhost:6006
- **Test Reports**: Available after running `npm run qa:full`
- **Performance Monitoring**: Built into component stories

---

**Migration Timeline**: 1-2 weeks (depending on content volume)  
**Rollback Time**: < 1 hour if needed  
**Support Level**: Full documentation and testing suite available  

*Migration Guide Version: 1.0 | Last Updated: 2025-09-06*