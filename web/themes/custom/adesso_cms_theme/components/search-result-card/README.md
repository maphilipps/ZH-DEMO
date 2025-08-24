# Enhanced Search Result Card Component

**Issue #35 - AI-Semantic Search Results Display**

A reusable search result card component designed specifically for Gemeinde Bruchtal municipal portal with WCAG 2.1 AA accessibility compliance and semantic HTML structure.

## Overview

This component provides a comprehensive search result display that includes:

- **AI Relevance Scoring**: Visual relevance indicators (0-100%)
- **Municipal Verification**: Official verification badges
- **Taxonomy Integration**: Category and target group display
- **Accessibility Compliance**: WCAG 2.1 AA standards
- **Schema.org Markup**: Structured data for search engines
- **Responsive Design**: Mobile-first approach

## Architecture

### Component Structure
```
search-result-card/
├── search-result-card.component.yml  # SDC metadata
├── search-result-card.twig          # Main template
├── search-result-card.stories.js    # Storybook stories
├── README.md                        # Documentation
└── partials/                        # Modular templates
    ├── result-header.twig           # Type badge & relevance
    ├── result-content.twig          # Title, excerpt, taxonomy
    └── result-footer.twig           # Actions & verification
```

### Template Integration
```
templates/views/
└── views-view-fields--search.html.twig  # Main Views template
```

## Usage

### In Drupal Views

The component automatically processes Search API fields:
- `title` - Content title with URL
- `search_api_relevance` - AI relevance score
- `search_api_excerpt` - Highlighted search excerpt
- `field_directory_category` - Directory taxonomy
- `field_zielgruppe` - Target group taxonomy
- `field_municipal_verified` - Official verification

### In Storybook

```bash
cd /path/to/theme
npm run storybook
# Navigate to Components/Search Result Card
```

### Manual Template Usage

```twig
{{ include('@adesso_cms_theme/search-result-card/search-result-card.twig', {
  'title': 'FC Bruchtal - Fussballverein am Zürichsee',
  'url': '/club/fc-bruchtal',
  'excerpt': 'Der <strong>FC Bruchtal</strong> ist einer der...',
  'content_type': 'club',
  'relevance_score': 0.94,
  'categories': [
    { 'id': '12', 'title': 'Vereine & Sport', 'url': '/kategorie/vereine-sport' }
  ],
  'target_groups': [
    { 'id': '5', 'title': 'Familien', 'url': '/zielgruppe/familien' }
  ],
  'municipal_verified': true,
  'result_index': 0
}) }}
```

## Accessibility Features

### WCAG 2.1 AA Compliance
- ✅ Proper heading hierarchy (h3 for result titles)
- ✅ ARIA labels for all interactive elements
- ✅ Role attributes for semantic structure
- ✅ Meter element for relevance scores
- ✅ Screen reader friendly content
- ✅ Keyboard navigation support
- ✅ Focus management

### Semantic HTML
- `<article>` element for each result with Schema.org markup
- `<header>`, `<main>`, `<footer>` sections
- Proper list markup for taxonomy terms
- `role="meter"` for relevance scores

## Municipal Portal Standards

### Gemeinde Bruchtal Integration
- Content type badges with municipal styling hooks
- "Details anzeigen" (Show Details) action buttons
- "Gemeinde verifiziert" (Municipality Verified) badges
- Swiss government portal information hierarchy

### Content Types Supported
- `club` - Sports clubs and associations
- `business` - Local businesses and services
- `restaurant` - Gastronomy establishments
- `page` - Municipal information pages
- `event` - Community events
- `news` - Municipal news and announcements

## Technical Implementation

### Props Schema
All component properties are validated through the SDC schema including:
- Required fields: `title`, `url`, `content_type`, `relevance_score`
- Optional arrays: `categories`, `target_groups`
- Boolean flags: `municipal_verified`

### Library Dependencies
- Core Drupal libraries
- TailwindCSS base styles (via global library)
- Schema.org structured data

### Performance Considerations
- Modular template structure for better caching
- Minimal CSS dependencies
- No JavaScript requirements
- Optimized for Search API field processing

## Integration Points

### Backend Integration
- Compatible with Search API enhanced taxonomy fields
- Processes Drupal entity field data
- Supports municipal verification workflow

### Styling Integration  
- Designed for TailwindCSS v4 implementation
- Municipal branding color hooks
- Responsive design patterns
- Accessibility color contrast compliance

### Testing Integration
- Comprehensive Storybook stories
- Edge case handling
- Accessibility testing scenarios

## Development Workflow

1. **Component Development**: Use SDC architecture
2. **Story Development**: Document all component states
3. **Views Integration**: Process Search API fields
4. **Styling Implementation**: Apply TailwindCSS classes
5. **Accessibility Testing**: Validate WCAG compliance

## Municipal Compliance

This component meets Swiss government portal requirements for:
- Information hierarchy and structure
- Multi-language accessibility
- Official content verification systems
- Public accountability through transparency

---

**Municipal Context**: Gemeinde Bruchtal - "Leben am See"
**Accessibility**: WCAG 2.1 AA Compliant
**Standards**: Schema.org, Swiss Government Portal Guidelines