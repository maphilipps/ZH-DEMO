# Research Report: SDC Functionality & Best Practices Analysis
**Issue Reference**: [#91 - Comprehensive SDC Analysis](https://github.com/maphilipps/ZH-DEMO/issues/91)
**Research Date**: 2025-09-06
**Research Scope**: Analysis of Single Directory Components (SDCs) for functionality and best practices compliance, with focus on slots and props implementation

## Executive Summary
This research reveals significant opportunities to improve the 30+ SDCs in the adesso_cms_theme through systematic analysis and standardization. Current implementations show inconsistent patterns across slots usage, props validation, component schema definitions, and best practices compliance. The research identifies specific issues with missing slots definitions, inadequate props validation, and inconsistent component architecture patterns that need to be addressed for optimal functionality, maintainability, and performance.

## Current Codebase Analysis

### Existing Component Inventory
**Total Components Found**: 34 SDCs in `/web/themes/custom/adesso_cms_theme/components/`

**Component Categories Identified**:
- **Layout Components**: hero, page-header, site-header, site-footer, landing-page-header
- **Content Display**: text, media, gallery, accordion, sidebyside
- **Interactive Elements**: main-menu, newsletter-form, button, carousel, slider  
- **Structural Components**: card-group, pricing, bento-grid, section-header, paragraph-wrapper
- **Utility Components**: badge, logo, stat-card, download-item, embed

### Schema Analysis Findings

**Props Implementation Patterns**:
```yaml
# Current Pattern Example - Button Component
props:
  type: object
  properties:
    url:
      type: string
      title: url
      description: The URL the button links to
    variant:
      type: string
      enum: [default, destructive, outline, secondary, ghost, link]
```

**Issues Identified**:
1. **Missing Required Definitions**: Most components lack `required` property arrays
2. **Inconsistent Naming**: Props use inconsistent naming conventions (url vs URL, text vs title)
3. **Incomplete Validation**: Many props lack proper type validation and constraints
4. **Missing Documentation**: Limited titles and descriptions for developer experience

### Slots Usage Analysis

**Current Slots Implementation**:
- **Accordion Component**: Uses blocks for `accordion_items` but no formal slots definition
- **Card Component**: Uses blocks for `card_media` but lacks comprehensive slots schema  
- **Modal Components** (from Radix research): Proper slots implementation with `modal_header`, `modal_body`, `modal_footer`

**Critical Finding**: Most components **lack slots definitions** in their `.component.yml` files, despite using slot-like patterns in Twig templates.

### Architecture Quality Assessment

**Current Implementation Quality Issues**:
1. **Template Complexity**: Components like Hero have excessive conditional logic in Twig
2. **Duplicated Code**: Button styling logic repeated between `<a>` and `<button>` elements
3. **Hardcoded Values**: CSS classes hardcoded in templates instead of using configurable variants
4. **Missing Attributes**: Some components don't properly handle the `attributes` variable
5. **Inconsistent Structure**: No standardized approach to theme classes and modifiers

**Code Example - Button Component Issues**:
```twig
{# Current problematic pattern - duplicated logic #}
{% if url|default('') %}
  <a href="{{ url|default('') }}" class="inline-flex rounded-lg items-center...">
    {# Button styling repeated here #}
{% else %}
  <button class="inline-flex items-center justify-center...">
    {# Same styling repeated again #}
```

## Best Practices Research (Context7 + Web)

### Drupal SDC Best Practices (2024-2025)

**Core Requirements from Drupal.org**:
1. **Schema Validation**: Mandatory for component integration and overrides
2. **Single Directory Structure**: All assets (Twig, CSS, JS, YAML) in one directory
3. **Automatic Asset Loading**: CSS/JS files automatically attached when component loads
4. **Component Variants**: New in 2024 - supports named variants with root-level configuration

**Schema Best Practices**:
```yaml
# Recommended schema structure
$schema: https://git.drupalcode.org/project/drupal/-/raw/10.1.x/core/modules/sdc/src/metadata.schema.json
name: Component Name
status: stable
props:
  type: object
  properties:
    # Required properties with validation
  required: ['prop1', 'prop2']
slots:
  content:
    title: Main Content
    required: false
```

### Slots vs Props Guidelines

**From Drupal.org Research**:
- **Use slots instead of props any time possible**
- **Slots**: For arbitrary markup content, no schema validation needed
- **Props**: For structured data with specific types and validation requirements
- **Slots are designed for content we can't predict in advance**

### Performance and Accessibility Patterns

**Performance Optimizations**:
- Automatic asset loading only when components are used
- Scoped CSS/JS prevents conflicts and improves maintainability
- Component-based caching strategies improve site performance

**Accessibility Integration**:
- Components should integrate with Drupal's accessibility APIs
- Proper `attributes` variable usage for SEO, accessibility, and translation modules
- Design system compliance (e.g., USWDS integration examples found)

## Current Industry Analysis (Web Research)

### Industry Trends (2024-2025)

**Component-Driven Development**:
- SDC becoming the standard for Drupal theming
- Integration with Experience Builder planned for 2025
- Storybook integration becoming industry standard for documentation

**Schema Evolution**:
- JSON Schema enforcement for better developer experience
- Component variants support for flexible theming
- Better integration with display building modules (SDC Display, UI Patterns)

### Community Insights

**Common Pitfalls Identified**:
1. **Empty Schema Definitions**: Discouraged by Drupal community
2. **PHP Namespaces in Schema**: Not JSON Schema compliant, causes issues  
3. **Missing Slots Definitions**: Components without proper slots are harder to extend
4. **Inadequate Props Validation**: Leads to runtime errors and poor developer experience

**Success Patterns**:
1. **Comprehensive Schema**: Full props validation with required fields, enums, and descriptions
2. **Proper Slots Usage**: Clear separation between props (structured data) and slots (markup content)
3. **Storybook Integration**: Living documentation and testing environment
4. **Performance-First**: Automatic asset loading and scoped styling

## Synthesis and Recommendations

### Recommended Approach

**Phase 1: Schema Standardization (High Priority)**
1. Add missing `slots` definitions to all components using slot patterns
2. Implement proper `required` arrays for mandatory props
3. Add comprehensive validation (enums, types, constraints) 
4. Standardize naming conventions across all components

**Phase 2: Template Optimization (Medium Priority)**
1. Reduce template complexity through better prop structure
2. Eliminate code duplication (e.g., button styling logic)
3. Standardize attributes handling across all components  
4. Implement consistent theme class patterns

**Phase 3: Advanced Features (Lower Priority)**
1. Implement component variants where beneficial
2. Add comprehensive Storybook stories for all components
3. Performance optimization through asset loading strategies
4. Accessibility compliance verification

### Implementation Strategy

**Systematic Component Review Process**:
```
1. Component Analysis
   - Review .component.yml schema
   - Analyze Twig template patterns  
   - Check props/slots usage
   - Identify specific issues

2. Schema Enhancement
   - Add missing slots definitions
   - Implement proper props validation
   - Add required field specifications
   - Improve documentation (titles/descriptions)

3. Template Refactoring  
   - Simplify complex conditional logic
   - Eliminate code duplication
   - Standardize attributes handling
   - Implement consistent naming

4. Testing & Validation
   - Storybook story updates
   - Schema validation testing
   - Performance impact assessment
   - Accessibility compliance check
```

### Risk Assessment

**Technical Risks**:
- **Schema Changes**: May break existing component usage patterns
- **Template Refactoring**: Risk of introducing rendering issues
- **Performance Impact**: Changes might affect site performance

**Mitigation Strategies**:
- Systematic component-by-component approach
- Comprehensive testing after each component fix
- Backup/snapshot before major changes
- Gradual rollout with validation at each step

### Success Metrics

**Component Quality Indicators**:
- **Schema Completeness**: All components have comprehensive slots/props definitions
- **Validation Coverage**: 100% of props have proper type validation and constraints
- **Documentation Quality**: All props/slots have meaningful titles and descriptions
- **Template Consistency**: Standardized patterns across all components
- **Performance Metrics**: No degradation in Core Web Vitals
- **Accessibility Compliance**: WCAG 2.1 AA standards maintained

## Implementation Prerequisites

### Required Tools and Dependencies
- **Schema Validation**: Drupal 10.3+ with SDC core integration
- **Development Tools**: SDC Devel module for validation and debugging
- **Documentation**: Storybook for component documentation and testing
- **Testing Framework**: BackstopJS for visual regression testing

### Configuration Requirements
```yaml
# theme.info.yml enhancement needed
enforce_prop_schemas: true  # Enforce schema validation for all components
```

### Development Environment Setup
- Enable SDC schema validation on development environment
- Configure Storybook for component documentation
- Set up visual regression testing pipeline
- Implement component validation in CI/CD

## Next Steps for Planning Phase

### Priority Issues for Individual Components
1. **Button Component**: Eliminate code duplication, add proper slots for content
2. **Hero Component**: Reduce template complexity, implement variant system  
3. **Accordion Component**: Add proper slots definition for accordion items
4. **Card Components**: Standardize media slot implementation
5. **Navigation Components**: Improve props validation and required field definitions

### Agent Coordination Requirements  
- **drupal-sdc-validator**: For systematic component analysis and validation
- **storybook-component-curator**: For documentation updates and maintenance
- **drupal-frontend-theming-specialist**: For template refactoring and optimization

### Architecture Decision Points
1. **Schema Strategy**: Immediate enforcement vs. gradual implementation
2. **Component Variants**: Which components benefit from variant systems
3. **Template Refactoring**: Scope of changes per component
4. **Performance Impact**: Asset loading optimization strategies

## Compound Learning Insights

### Patterns for Future Reuse
- **Component Analysis Workflow**: Systematic schema → template → testing approach
- **Schema Standardization**: Reusable patterns for props validation and slots definition
- **Template Optimization**: Common patterns for reducing complexity and duplication

### Context Evolution Recommendations
- Update CLAUDE.md with SDC best practices and schema patterns
- Document component analysis workflow for future maintenance  
- Establish component quality gates for new development

### Quality Gate Improvements
- Implement automated schema validation in development workflow
- Add component complexity metrics to prevent template bloat
- Establish performance budgets for component asset loading

---

This research provides a comprehensive foundation for systematic SDC improvement, enabling the planning phase to create specific, actionable improvements for each of the 34 components in the theme.