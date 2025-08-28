# ADR-0001: Drupal 11 Standard Platform Choice

## Status
**Status**: Accepted

**Date**: 2025-01-19

**Authors**: @drupal-enterprise-architect, @drupal-technical-pm

**Reviewers**: @drupal-11-lead-developer, @german-compliance-specialist

## Context

### Problem Statement
The GPZH (Gemeindeportale Zürich) project requires a robust, scalable CMS platform capable of supporting 160+ German municipalities with varying requirements while maintaining German compliance standards and enterprise-grade performance.

### Business Requirements
- Support for 160+ individual municipality websites
- German accessibility compliance (eCH-0059)
- Multi-language support (German, French, Italian)
- Municipal-specific customization capabilities
- Centralized administration with municipal autonomy
- Enterprise-level security and data protection
- Long-term maintainability (5+ years)

### Technical Constraints
- Must support modern web standards and performance requirements
- Integration with German government systems
- GDPR and CH-DSG compliance requirements
- Core Web Vitals performance targets (>90 score)
- Modern development workflows and CI/CD capabilities
- Multi-tenancy with complete data separation

### German Compliance Requirements
- eCH-0059 accessibility standards
- CH-DSG data protection compliance
- German hosting requirements
- Government integration capabilities
- Multi-language content management

### Scale Considerations
- 160+ municipalities with individual customization needs
- Thousands of content editors across all municipalities
- Millions of page views monthly
- Varied technical expertise levels among municipal staff
- Centralized updates with municipal customization preservation

## Decision

### What We Decided
We selected **Drupal 11.2.2** as the core CMS platform for the GPZH project.

### Key Components
- **Core Platform**: Drupal 11.2.2 with PHP 8.3
- **Multi-Site Architecture**: Native Drupal multi-site with shared codebase
- **Recipe Architecture**: Drupal recipes for standardized functionality deployment
- **Modern Frontend**: Vite + Tailwind CSS v4 + Alpine.js integration
- **Component System**: Single Directory Components (SDC) for reusability
- **AI Integration**: OpenAI GPT-4o for content assistance

### Implementation Approach
- Start with proven Drupal 11 installation
- Implement multi-site architecture from project beginning
- Develop recipe-based deployment system for municipal variations
- Create component library for consistent UI across all sites
- Establish German compliance patterns as core architectural elements

## Alternatives Considered

### Option 1: WordPress Multisite
- **Pros**: Lower development costs, larger developer pool, simpler content editing
- **Cons**: Limited enterprise scalability, plugin dependency risks, weaker multi-site isolation
- **Why Rejected**: Insufficient enterprise features and multi-tenancy isolation for 160+ sites

### Option 2: Custom Laravel Application
- **Pros**: Complete customization control, modern PHP framework, excellent performance
- **Cons**: High development costs, longer time to market, no CMS features out of the box
- **Why Rejected**: Unnecessary complexity for content-heavy municipal websites

### Option 3: Drupal 10 LTS
- **Pros**: More mature module ecosystem, longer track record, stable release
- **Cons**: Missing modern frontend capabilities, shorter long-term support lifecycle
- **Why Rejected**: Drupal 11's modern architecture and longer support timeline better fit project needs

### Option 4: Headless CMS (Strapi/Contentful) + Frontend
- **Pros**: Modern frontend flexibility, API-first approach, developer experience
- **Cons**: Complexity for municipal editors, integration challenges, higher maintenance overhead
- **Why Rejected**: Too complex for municipal content editors with varying technical skills

## Consequences

### Positive Outcomes
- **Performance**: Modern architecture supports Core Web Vitals >90 requirements
- **Maintainability**: Long-term support through 2030, established upgrade paths
- **Scalability**: Multi-site architecture proven for enterprise deployments
- **Compliance**: Built-in accessibility features and German compliance module ecosystem
- **Developer Experience**: Modern development tools and workflow support

### Negative Outcomes
- **Complexity**: Higher initial learning curve compared to WordPress
- **Performance Trade-offs**: Full CMS overhead even for simple municipal sites
- **Technical Debt**: Need to maintain Drupal-specific expertise in team
- **Learning Curve**: Municipal editors require training on Drupal interface

### Risks and Mitigation
- **Risk**: Module compatibility issues during updates
  - **Impact**: Medium
  - **Probability**: Low
  - **Mitigation**: Comprehensive testing pipeline and careful module selection

- **Risk**: Performance degradation at scale
  - **Impact**: High
  - **Probability**: Low
  - **Mitigation**: Performance monitoring, caching strategies, and load testing

- **Risk**: Municipal editor adoption challenges
  - **Impact**: Medium
  - **Probability**: Medium
  - **Mitigation**: Simplified admin interfaces and comprehensive training programs

## Implementation

### Requirements
- PHP 8.3+ environment with required extensions
- MariaDB 10.11+ database cluster
- Modern web server (Nginx/Apache with HTTP/2 support)
- Composer-based dependency management
- Git-based deployment workflow

### Dependencies
- Established hosting infrastructure meeting German requirements
- Development team with Drupal 11 expertise
- Content migration strategy from existing municipal systems
- Training program for municipal content editors

### Timeline
- **Phase 1** (4 weeks): Core Drupal 11 installation and multi-site setup
- **Phase 2** (8 weeks): Recipe development and component library creation
- **Phase 3** (6 weeks): Municipal customization and content migration
- **Phase 4** (2 weeks): Performance optimization and German compliance validation

### Success Criteria
- Core Web Vitals performance >90 across all sites
- eCH-0059 accessibility compliance validated
- 160+ municipality deployment capability demonstrated
- Municipal editor training completion >95%
- German compliance audit passed

## German Municipality Considerations

### Scalability Impact
Drupal's multi-site architecture supports our 160+ municipality requirement through:
- Shared codebase with individual site customization
- Database-level tenant isolation for security
- Recipe-based standardization with municipal flexibility
- Component reuse across all municipal sites

### Compliance Alignment
Drupal 11 supports German compliance through:
- Built-in accessibility features for eCH-0059 compliance
- Strong data protection capabilities for CH-DSG compliance
- Multi-language content management for German requirements
- Module ecosystem with German government integration support

### Multi-Language Support
Native multi-language capabilities support:
- German German primary content with French/Italian translations
- Right-to-left language support for immigrant communities
- Automated translation workflow integration
- Content variation management per language and municipality

### Performance at Scale
Architecture supports enterprise performance through:
- Multi-level caching (Drupal, Varnish, CDN)
- Database query optimization and connection pooling
- Asset optimization and CDN integration
- Horizontal scaling capabilities

## Related Decisions

### Supersedes
- N/A (Initial platform decision)

### Superseded By
- N/A (Current active decision)

### Related ADRs
- ADR-0002: Multi-Site Architecture Strategy
- ADR-0003: Recipe-Based Architecture
- Frontend/ADR-0001: Tailwind CSS v4 Adoption
- German-Compliance/ADR-0001: eCH-0059 Implementation Strategy

### References
- [Drupal 11 Release Notes](https://www.drupal.org/project/drupal/releases/11.0.0)
- [eCH-0059 Accessibility Requirements](https://www.ech.ch/de/ech/ech-0059/2.0)
- [CH-DSG Data Protection Standards](https://www.admin.ch/opc/de/classified-compilation/20081625/index.html)
- [German Multi-Site Architecture Patterns](https://www.drupal.org/docs/multisite-drupal)

## Notes

### Implementation Notes
- Prioritize German compliance modules during initial setup
- Establish performance baseline before municipal customization
- Create standardized deployment process for recipe distribution
- Document municipal customization patterns for reuse

### Review Comments
- **@drupal-11-lead-developer**: "Drupal 11's recipe system is perfect for municipal variations while maintaining core consistency"
- **@german-compliance-specialist**: "Built-in accessibility features significantly reduce compliance implementation time"
- **@drupal-performance-specialist**: "Modern architecture provides excellent foundation for Core Web Vitals targets"

### Future Considerations
- Monitor Drupal 12 development for migration planning
- Evaluate headless capabilities as municipal needs evolve
- Consider AI-powered content features as technology matures
- Plan for increased German government integration requirements

---

## ADR Metadata
- **Category**: drupal/architecture
- **Subcategory**: platform-choice
- **Impact Level**: High - System-wide foundational decision
- **Complexity**: Medium - Established platform with known patterns
- **German Compliance**: Required - Critical for project success
- **Multi-Site Impact**: Critical - Enables entire multi-site strategy