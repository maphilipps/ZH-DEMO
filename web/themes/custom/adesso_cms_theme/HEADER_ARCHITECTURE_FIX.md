# Header Architecture Fix - Duplicate Page Header Resolution

## Problem Identified

The theme was experiencing duplicate page headers due to multiple templates rendering page header components:

1. **page.html.twig** - Rendered page headers for all non-landing pages (lines 105-112)
2. **node.html.twig** - Also rendered page headers for full view mode nodes (lines 77-85) 
3. **node--article--full.html.twig** - Additionally rendered headers for article nodes (lines 33-39)

This resulted in 2-3 identical headers being displayed on regular content pages.

## Solution Implemented

### Architectural Principle: Single Source of Truth

Established `page.html.twig` as the single source of truth for page headers, following the pattern already working for landing pages.

### Changes Made

#### 1. node.html.twig
- **Removed**: Page header rendering logic (lines 77-85)
- **Removed**: Header data extraction logic (lines 36-66)
- **Added**: Comments explaining the architectural decision
- **Kept**: Content field exclusion logic for header fields

#### 2. node--article--full.html.twig  
- **Removed**: Page header rendering logic (lines 18-39)
- **Updated**: Comment to reflect new architecture

#### 3. Template Hierarchy Result
```
page.html.twig
├── Handles headers for all content types EXCEPT landing pages
├── Uses consistent header field extraction logic
└── Excludes landing pages (which have specialized headers)

node--landing-page.html.twig
├── Handles its own specialized landing-page-header component
├── Includes navigation overlay and hero styling
└── Maintains its own header data extraction

node.html.twig + node--[type]--[view].html.twig
├── Focus purely on content rendering
├── No header rendering responsibility
└── Exclude header fields from content output
```

## Benefits

1. **No Duplicate Headers**: Each page renders exactly one header
2. **Architectural Consistency**: Clear separation of concerns
3. **Maintainable**: Single location for header logic changes
4. **Landing Page Exception**: Specialized header maintained separately
5. **Performance**: Eliminated redundant header field processing

## Testing

The fix has been applied and Drupal cache cleared. To test:

1. Visit any article page: Should show single page header
2. Visit any landing page: Should show specialized landing header  
3. Visit any other content type: Should show single page header

## Future Considerations

- Any new content type templates should NOT render page headers
- Header styling changes should be made in page-header component
- Landing page headers should be modified in landing-page-header component
- If custom headers are needed for specific content types, consider variants in the page-header component rather than template-level rendering

## Related Files Modified

- `/web/themes/custom/adesso_cms_theme/templates/content/node.html.twig`
- `/web/themes/custom/adesso_cms_theme/templates/content/node--article--full.html.twig`

## Related Files (Not Modified)

- `/web/themes/custom/adesso_cms_theme/templates/layout/page.html.twig` - Primary header renderer
- `/web/themes/custom/adesso_cms_theme/templates/content/node--landing-page.html.twig` - Specialized header  
- `/web/themes/custom/adesso_cms_theme/templates/content/page-title.html.twig` - Non-node page headers
- `/web/themes/custom/adesso_cms_theme/components/page-header/` - Header component
- `/web/themes/custom/adesso_cms_theme/components/landing-page-header/` - Landing header component