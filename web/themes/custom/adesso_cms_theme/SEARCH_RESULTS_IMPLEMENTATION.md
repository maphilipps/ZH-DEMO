# Municipal Search Results Implementation Guide

## Overview
Comprehensive TailwindCSS v4+ styling for GPZH Gemeinde Bruchtal municipal portal search results with WCAG 2.1 AA compliance and Swiss government portal standards.

## Features
- ✅ WCAG 2.1 AA Compliance (4.5:1 contrast ratios minimum)
- ✅ Mobile-first responsive design (320px to 1536px+)
- ✅ Swiss municipal portal standards
- ✅ "Leben am See" theme for Gemeinde Bruchtal
- ✅ Enhanced accessibility with focus indicators
- ✅ Progressive enhancement with JavaScript
- ✅ Performance optimizations with CSS containment
- ✅ Analytics tracking preparation

## File Structure
```
src/
├── css/
│   └── components/
│       └── search-results.css     # Main styling
└── js/
    └── components/
        └── search-results.js      # Progressive enhancements
```

## Library Usage
```yaml
# In your template or module
'#attached':
  'library':
    - 'adesso_cms_theme/search-results'
```

## HTML Structure Example

### Basic Search Results Container
```html
<div class="search-results">
  <div class="search-results-header">
    <h2 class="search-results-title">Suchergebnisse für "Bruchtal"</h2>
    <div class="search-results-meta">
      <span class="search-results-count">12 Ergebnisse gefunden</span>
      <div class="search-results-sorting">
        <label for="sort">Sortieren:</label>
        <select id="sort" name="sort">
          <option value="relevance">Relevanz</option>
          <option value="date">Datum</option>
          <option value="title">Titel</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Search Result Cards -->
  <article class="search-result-card">
    <header class="result-header">
      <span class="content-type-badge badge--service">Dienstleistung</span>
      <div class="relevance-score" style="--score-percentage: 85%">
        <span class="score-label">Relevanz</span>
        <span class="score-value">0.85</span>
      </div>
    </header>

    <h3 class="result-title">
      <a href="/service/abfallentsorgung" class="result-link">
        Abfallentsorgung Gemeinde Bruchtal
      </a>
    </h3>

    <div class="result-content">
      <p class="result-excerpt">
        Informationen zur <strong>Abfallentsorgung</strong> in <strong>Bruchtal</strong>. 
        Abholtermine, Recycling und Sperrmüll am Zürichsee.
      </p>
    </div>

    <div class="result-metadata">
      <div class="taxonomy-category">
        <span class="taxonomy-label">Kategorie:</span>
        <a href="/kategorie/umwelt" class="tag tag--category">Umwelt</a>
        <a href="/kategorie/service" class="tag tag--category">Service</a>
      </div>
      
      <div class="taxonomy-target-group">
        <span class="taxonomy-label">Zielgruppe:</span>
        <a href="/zielgruppe/buerger" class="tag tag--target-group">Bürger</a>
        <a href="/zielgruppe/unternehmen" class="tag tag--target-group">Unternehmen</a>
      </div>
    </div>

    <footer class="result-actions">
      <a href="/service/abfallentsorgung" class="btn btn--municipal">
        <span>Details ansehen</span>
        <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none"/>
        </svg>
      </a>
      <span class="municipal-badge verified">
        <svg class="badge-icon" width="12" height="12">
          <path d="M9 12l2 2 4-4" stroke="currentColor" fill="none"/>
        </svg>
        Verifiziert
      </span>
    </footer>
  </article>

  <!-- More result cards... -->
</div>
```

## Municipal Content Type Badges

### Available Badge Classes
```html
<!-- Community Organizations -->
<span class="content-type-badge badge--club">Verein</span>
<span class="content-type-badge badge--verein">Verein</span>

<!-- Businesses -->
<span class="content-type-badge badge--business">Firma</span>
<span class="content-type-badge badge--gewerbe">Gewerbe</span>

<!-- Hospitality -->
<span class="content-type-badge badge--restaurant">Restaurant</span>
<span class="content-type-badge badge--gastgewerbe">Gastgewerbe</span>

<!-- Events -->
<span class="content-type-badge badge--event">Event</span>
<span class="content-type-badge badge--veranstaltung">Veranstaltung</span>

<!-- News -->
<span class="content-type-badge badge--news">News</span>
<span class="content-type-badge badge--nachrichten">Nachrichten</span>

<!-- Municipal Services -->
<span class="content-type-badge badge--service">Dienstleistung</span>

<!-- Infrastructure -->
<span class="content-type-badge badge--infrastructure">Infrastruktur</span>
```

## Relevance Score Implementation
```html
<div class="relevance-score" style="--score-percentage: 75%">
  <span class="score-label">Relevanz</span>
  <span class="score-value">0.75</span>
</div>
```

## Tag System
```html
<!-- Category Tags -->
<a href="/kategorie/umwelt" class="tag tag--category">Umwelt</a>
<a href="/kategorie/verkehr" class="tag tag--category">Verkehr</a>

<!-- Target Group Tags -->
<a href="/zielgruppe/familien" class="tag tag--target-group">Familien</a>
<a href="/zielgruppe/senioren" class="tag tag--target-group">Senioren</a>

<!-- Municipal Tags -->
<a href="/gemeinde/bruchtal" class="tag tag--municipal">Bruchtal</a>
```

## Responsive Breakpoints
- **Mobile:** 320px - 640px
- **Tablet:** 641px - 1024px  
- **Desktop:** 1025px - 1535px
- **Large Desktop:** 1536px+

## Accessibility Features

### Screen Reader Support
- All components include proper ARIA labels
- Live regions announce result updates
- Skip links for long result lists
- Proper heading hierarchy

### Keyboard Navigation
- Tab navigation through all interactive elements
- Arrow key navigation between results
- Focus indicators meet WCAG standards
- Escape key support in enhanced components

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  /* Enhanced borders and contrast */
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Disabled animations and transitions */
}
```

## JavaScript Enhancements

### Automatic Initialization
The JavaScript automatically enhances search results with:
- Progressive relevance score visualization
- Analytics tracking preparation
- Performance optimizations
- Accessibility improvements

### Manual Initialization
```javascript
// Initialize specific container
const searchContainer = document.querySelector('.search-results');
const searchResults = new MunicipalSearchResults(searchContainer);

// Update results dynamically
searchResults.updateResults(newResultsArray);
```

### Analytics Tracking
```javascript
// Events automatically tracked:
// - search_results_viewed
// - search_result_interaction
// - search_result_clicked  
// - search_tag_clicked

// Custom tracking
Drupal.municipalSearch.trackEvent('custom_event', {
  property: 'value'
});
```

## Municipal Bruchtal Theme
The implementation includes special styling for Gemeinde Bruchtal "Leben am See" theme:
- Cyan color accents (--bruchtal-primary: #0891b2)
- Lake-themed visual elements
- Swiss government portal compliance

## Empty State
```html
<div class="search-results-empty">
  <h3>Keine Ergebnisse gefunden</h3>
  <p>Ihre Suche hat keine Ergebnisse ergeben. Versuchen Sie es mit anderen Suchbegriffen.</p>
  <button type="button" class="btn btn--municipal">Zurück zur Suche</button>
</div>
```

## Error State
```html
<div class="search-results-error">
  <h3>Fehler bei der Suche</h3>
  <p>Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.</p>
</div>
```

## Print Optimization
All components are optimized for printing:
- Simplified layouts
- URL display for links
- Grayscale color scheme
- Page break handling

## Performance Notes
- Uses CSS containment for better rendering
- Lazy loading for images
- Virtual scrolling for large result sets (50+ items)
- Optimized hover states
- Minimal JavaScript footprint

## Browser Support
- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- Progressive enhancement for older browsers
- Graceful degradation without JavaScript

## Integration with Drupal Views
```php
// In your view template or preprocess function
$variables['#attached']['library'][] = 'adesso_cms_theme/search-results';

// Add municipality class for theming
$variables['attributes']['class'][] = 'municipality-bruchtal';
```

## Customization
Override CSS custom properties for different municipalities:
```css
.municipality-custom {
  --bruchtal-primary: #your-color;
  --bruchtal-secondary: #your-darker-color;
  --bruchtal-light: #your-lighter-color;
}
```