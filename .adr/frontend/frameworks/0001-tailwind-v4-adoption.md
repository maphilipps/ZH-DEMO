# ADR-0001: Tailwind CSS v4 Adoption for Swiss Municipality Theming

## Status
**Status**: Accepted

**Date**: 2025-01-20

**Authors**: @drupal-frontend-theming-specialist, @tailwind-v4-expert

**Reviewers**: @drupal-enterprise-architect, @swiss-compliance-specialist, @drupal-performance-specialist

## Context

### Problem Statement
The GPZH project requires a CSS framework that can efficiently support 160+ unique municipal designs while maintaining performance, accessibility compliance (eCH-0059), and development consistency across all sites.

### Business Requirements
- Support for 160+ individualized municipality themes
- Swiss accessibility compliance (eCH-0059)
- Consistent design system with municipal customization flexibility
- Fast development cycles for municipal theme variations
- Maintainable CSS architecture across large team
- Performance optimization for Core Web Vitals >90
- Mobile-first responsive design for all municipalities

### Technical Constraints
- Integration with Drupal 11 and SDC (Single Directory Components)
- Build process compatible with Vite 6.2.0
- Support for Swiss design patterns and typography
- CSS bundle size optimization for performance
- Browser support: Modern browsers (ES2019+)
- Component-based architecture compatibility

### Swiss Compliance Requirements
- eCH-0059 accessibility standards compliance
- Minimum 16px base font size requirement
- Color contrast ratios >4.5:1 for all text
- Touch target minimum 44px requirement
- Swiss typography standards (no ß character, specific punctuation)

### Scale Considerations
- 160+ municipalities with unique color schemes and branding
- Thousands of components across all sites
- Build time optimization for development efficiency
- CSS bundle size management across multiple themes
- Consistent design tokens across all municipal variations

## Decision

### What We Decided
We adopted **Tailwind CSS v4** as the primary CSS framework for all GPZH municipal websites.

### Key Components
- **Core Framework**: Tailwind CSS v4 with native CSS integration
- **Build Integration**: Vite plugin for Tailwind processing
- **Design System**: Custom design tokens for Swiss municipal patterns  
- **Component Integration**: Seamless integration with SDC components
- **Theme Variations**: Municipality-specific configuration layers
- **Performance**: Just-in-time compilation and CSS purging

### Implementation Approach
- Establish base Tailwind configuration with Swiss compliance defaults
- Create municipal theme configuration system using CSS custom properties
- Integrate with Drupal SDC components for consistent styling
- Implement design token system for municipal customization
- Optimize build process for development and production performance

## Alternatives Considered

### Option 1: Bootstrap 5
- **Pros**: Mature ecosystem, extensive documentation, familiar to developers
- **Cons**: Larger bundle size, limited customization flexibility, maintenance overhead
- **Why Rejected**: Poor fit for 160+ custom municipal themes, performance concerns

### Option 2: Custom CSS with CSS Grid/Flexbox
- **Pros**: Complete control, minimal dependencies, optimized for specific needs
- **Cons**: High development time, maintenance burden, inconsistency risks
- **Why Rejected**: Unsustainable for large team and 160+ site variations

### Option 3: Bulma CSS Framework
- **Pros**: Modern CSS framework, good customization, Flexbox-based
- **Cons**: Smaller ecosystem, limited utility classes, less optimization
- **Why Rejected**: Insufficient utility coverage and smaller community support

### Option 4: Styled Components / CSS-in-JS
- **Pros**: Component-scoped styles, dynamic theming, modern approach
- **Cons**: Runtime overhead, complexity with Drupal, build complexity
- **Why Rejected**: Poor fit with Drupal architecture and server-side rendering

### Option 5: Tailwind CSS v3
- **Pros**: Proven stable version, extensive documentation, mature ecosystem
- **Cons**: Legacy architecture, missing v4 performance improvements, older build system
- **Why Rejected**: v4's native CSS architecture and performance improvements crucial for scale

## Consequences

### Positive Outcomes
- **Performance**: JIT compilation and CSS purging optimize bundle sizes across 160+ sites
- **Maintainability**: Utility-first approach reduces custom CSS maintenance burden
- **Scalability**: Municipal theme variations easily managed through configuration
- **Compliance**: Built-in accessibility utilities support eCH-0059 requirements
- **Developer Experience**: Fast development cycles with utility classes and hot reloading

### Negative Outcomes
- **Complexity**: Learning curve for developers not familiar with utility-first approach
- **Performance Trade-offs**: Initial CSS bundle size before purging
- **Technical Debt**: Dependency on Tailwind ecosystem for updates and support
- **Learning Curve**: Municipal designers need training on design token system

### Risks and Mitigation
- **Risk**: Tailwind v4 breaking changes during development
  - **Impact**: Medium
  - **Probability**: Low
  - **Mitigation**: Pin specific version, thorough testing pipeline

- **Risk**: Performance degradation with excessive utility usage
  - **Impact**: High
  - **Probability**: Medium
  - **Mitigation**: CSS purging, bundle analysis, performance monitoring

- **Risk**: Inconsistent design across municipalities
  - **Impact**: Medium
  - **Probability**: Medium
  - **Mitigation**: Standardized design tokens and comprehensive style guide

## Implementation

### Requirements
- Node.js 18+ for Tailwind CSS v4 compatibility
- Vite 6.2.0 build system integration
- PostCSS configuration for processing
- Design token system for municipal variations
- Component documentation system (Storybook)

### Dependencies
- Drupal SDC component architecture
- Vite build process setup
- Municipal branding guidelines and assets
- Accessibility testing tools and workflows

### Timeline
- **Phase 1** (2 weeks): Core Tailwind v4 setup and build integration
- **Phase 2** (3 weeks): Design token system and Swiss compliance defaults
- **Phase 3** (4 weeks): Municipal theme configuration system
- **Phase 4** (2 weeks): Performance optimization and documentation

### Success Criteria
- Core Web Vitals performance >90 across all municipal sites
- CSS bundle size <50KB after purging per municipality
- eCH-0059 accessibility compliance validated
- Development build time <5 seconds for theme changes
- 100% component coverage with documented Tailwind patterns

## Swiss Municipality Considerations

### Scalability Impact
Tailwind v4 supports 160+ municipalities through:
- Configuration-based theming system with municipal color palettes
- Design token inheritance for consistent base patterns
- JIT compilation optimizing CSS for each municipality individually
- Component-based architecture enabling design system reuse

### Compliance Alignment
eCH-0059 compliance supported through:
- Built-in accessibility utilities (`sr-only`, `focus:`, `aria-*` support)
- Swiss typography defaults (16px base, appropriate line heights)
- Color contrast utilities and validation tools
- Touch target utilities meeting 44px requirements

### Multi-Language Support
Typography system accommodates Swiss languages:
- Swiss German typography without ß character
- French accent and typography support
- Italian character and punctuation handling
- Consistent typography hierarchy across all languages

### Performance at Scale
Architecture optimizes for enterprise performance:
- JIT compilation reducing unused CSS across 160+ sites
- CSS custom properties enabling runtime theming without bundle duplication
- Component-scoped styles minimizing CSS conflicts
- Build-time optimization for production deployments

## Related Decisions

### Supersedes
- N/A (Initial CSS framework decision)

### Superseded By
- N/A (Current active decision)

### Related ADRs
- Drupal/ADR-0001: Drupal 11 Standard Platform Choice
- Frontend/ADR-0002: Alpine.js for Interactivity
- Frontend/ADR-0003: Vite Build System
- Swiss-Compliance/ADR-0001: eCH-0059 Implementation Strategy

### References
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
- [eCH-0059 Swiss Accessibility Standards](https://www.ech.ch/de/ech/ech-0059/2.0)
- [Drupal SDC Integration](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
- [Swiss Design System Guidelines](https://www.admin.ch/gov/de/start/dokumentation/medienmitteilungen.html)

## Notes

### Implementation Notes
- Prioritize Swiss compliance utilities in base configuration
- Create municipality-specific design token templates
- Document component styling patterns for team consistency
- Establish performance budgets for CSS bundle sizes

### Review Comments
- **@drupal-performance-specialist**: "v4's JIT compilation will significantly improve performance across 160+ sites"
- **@swiss-compliance-specialist**: "Built-in accessibility utilities reduce compliance implementation time by ~40%"
- **@tailwind-v4-expert**: "Native CSS integration eliminates build complexity compared to v3"

### Future Considerations
- Monitor Tailwind v4 stable release for production deployment
- Evaluate design token standards adoption across municipalities
- Consider automated accessibility testing integration
- Plan for Tailwind v5 migration strategy

---

## ADR Metadata
- **Category**: frontend/frameworks
- **Subcategory**: css-framework
- **Impact Level**: High - Affects all frontend development
- **Complexity**: Medium - Modern framework with established patterns
- **Swiss Compliance**: Required - Critical for eCH-0059 compliance
- **Multi-Site Impact**: Critical - Enables municipal theme variations