# ADR Index - Architecture Decision Records

## Overview

This index provides navigation to all architectural decisions for the GPZH project and enterprise Drupal patterns. ADRs are organized by category and numbered sequentially within each category.

---

## Drupal Architecture Decisions

### Core Architecture (`drupal/architecture/`)
- [ADR-0001: Drupal 11 Standard Platform](drupal/architecture/0001-drupal-11-standard.md) - Core platform decision
- [ADR-0002: Multi-Site Architecture Strategy](drupal/architecture/0002-multi-site-strategy.md) *(Planned)*
- [ADR-0003: Recipe-Based Architecture](drupal/architecture/0003-recipe-architecture.md) *(Planned)*

### Module Strategy (`drupal/modules/`)
- [ADR-0001: Content Moderation vs Custom Workflow](drupal/modules/0001-content-moderation-choice.md) *(Planned)*
- [ADR-0002: Webform vs Custom Forms](drupal/modules/0002-webform-selection.md) *(Planned)*
- [ADR-0003: AI Module Integration](drupal/modules/0003-ai-module-integration.md) *(Planned)*

### Workflows (`drupal/workflows/`)
- [ADR-0001: Guest Editor Approval Process](drupal/workflows/0001-guest-editor-workflow.md) *(Planned)*
- [ADR-0002: Content Publication Strategy](drupal/workflows/0002-content-publication.md) *(Planned)*

### Multi-Site Patterns (`drupal/multi-site/`)
- [ADR-0001: Site Configuration Strategy](drupal/multi-site/0001-site-configuration.md) *(Planned)*
- [ADR-0002: Shared Module Strategy](drupal/multi-site/0002-shared-modules.md) *(Planned)*

---

## Frontend Technology Decisions

### Framework Choices (`frontend/frameworks/`)
- [ADR-0001: Tailwind CSS v4 Adoption](frontend/frameworks/0001-tailwind-v4-adoption.md) - CSS framework decision
- [ADR-0002: Alpine.js for Interactivity](frontend/frameworks/0002-alpine-js-selection.md) *(Planned)*
- [ADR-0003: Vite Build System](frontend/frameworks/0003-vite-build-system.md) *(Planned)*

### Component Architecture (`frontend/components/`)
- [ADR-0001: SDC Component Strategy](frontend/components/0001-sdc-strategy.md) *(Planned)*
- [ADR-0002: Storybook Documentation](frontend/components/0002-storybook-docs.md) *(Planned)*

### Performance (`frontend/performance/`)
- [ADR-0001: Core Web Vitals Strategy](frontend/performance/0001-core-web-vitals.md) *(Planned)*
- [ADR-0002: Asset Optimization](frontend/performance/0002-asset-optimization.md) *(Planned)*

---

## German Compliance Decisions

### Accessibility (`german-compliance/accessibility/`)
- [ADR-0001: eCH-0059 Implementation Strategy](german-compliance/accessibility/0001-ech-0059-implementation.md) - German accessibility compliance
- [ADR-0002: WCAG 2.1 AA Compliance](german-compliance/accessibility/0002-wcag-compliance.md) *(Planned)*

### Data Protection (`german-compliance/data-protection/`)
- [ADR-0001: CH-DSG Compliance Strategy](german-compliance/data-protection/0001-ch-dsg-compliance.md) *(Planned)*
- [ADR-0002: Data Retention Policies](german-compliance/data-protection/0002-data-retention.md) *(Planned)*

### Languages (`german-compliance/languages/`)
- [ADR-0001: German German Standards](german-compliance/languages/0001-german-german-standards.md) *(Planned)*
- [ADR-0002: Multi-Language Architecture](german-compliance/languages/0002-multi-language-strategy.md) *(Planned)*

---

## Infrastructure Decisions

### Development Environment (`infrastructure/development/`)
- [ADR-0001: DDEV Development Standard](infrastructure/development/0001-ddev-standard.md) - Development environment choice
- [ADR-0002: Docker Configuration](infrastructure/development/0002-docker-config.md) *(Planned)*

### Hosting & Deployment (`infrastructure/hosting/`)
- [ADR-0001: German Hosting Requirements](infrastructure/hosting/0001-german-hosting.md) *(Planned)*
- [ADR-0002: CDN Strategy](infrastructure/hosting/0002-cdn-strategy.md) *(Planned)*

### Monitoring (`infrastructure/monitoring/`)
- [ADR-0001: Performance Monitoring](infrastructure/monitoring/0001-performance-monitoring.md) *(Planned)*
- [ADR-0002: Error Tracking](infrastructure/monitoring/0002-error-tracking.md) *(Planned)*

---

## Testing Strategy Decisions

### Testing Approaches (`testing/strategies/`)
- [ADR-0001: Testing Pyramid Strategy](testing/strategies/0001-testing-pyramid.md) *(Planned)*
- [ADR-0002: Playwright vs Puppeteer](testing/strategies/0002-playwright-choice.md) *(Planned)*

### Automation (`testing/automation/`)
- [ADR-0001: CI/CD Testing Pipeline](testing/automation/0001-cicd-testing.md) *(Planned)*
- [ADR-0002: Visual Regression Testing](testing/automation/0002-visual-testing.md) *(Planned)*

### Compliance Testing (`testing/compliance/`)
- [ADR-0001: Accessibility Testing Strategy](testing/compliance/0001-accessibility-testing.md) *(Planned)*
- [ADR-0002: Performance Testing Standards](testing/compliance/0002-performance-testing.md) *(Planned)*

---

## Performance Optimization Decisions

### Optimization Strategies (`performance/optimization/`)
- [ADR-0001: Core Web Vitals Optimization](performance/optimization/0001-cwv-optimization.md) *(Planned)*
- [ADR-0002: Database Query Optimization](performance/optimization/0002-db-optimization.md) *(Planned)*

### Caching (`performance/caching/`)
- [ADR-0001: Multi-Layer Caching Strategy](performance/caching/0001-caching-strategy.md) *(Planned)*
- [ADR-0002: CDN Configuration](performance/caching/0002-cdn-config.md) *(Planned)*

---

## Security Decisions

### Authentication (`security/authentication/`)
- [ADR-0001: Multi-Site Authentication](security/authentication/0001-multi-site-auth.md) *(Planned)*
- [ADR-0002: Guest Editor Security](security/authentication/0002-guest-editor-security.md) *(Planned)*

### Data Protection (`security/data-protection/`)
- [ADR-0001: Encryption Standards](security/data-protection/0001-encryption-standards.md) *(Planned)*
- [ADR-0002: Backup Security](security/data-protection/0002-backup-security.md) *(Planned)*

---

## Failed Experiments & Lessons Learned

### Technology Choices (`failed-experiments/technology-choices/`)
- [Bootstrap Maintenance Issues](failed-experiments/technology-choices/bootstrap-maintenance-issues.md) - Why we moved away from Bootstrap
- [jQuery Dependencies](failed-experiments/technology-choices/jquery-dependencies.md) *(Planned)*

### Implementation Patterns (`failed-experiments/implementation-patterns/`)
- [Single Bundle Directory Approach](failed-experiments/implementation-patterns/single-bundle-directory.md) *(Planned)*
- [Custom Workflow Module](failed-experiments/implementation-patterns/custom-workflow-module.md) *(Planned)*

### Performance Attempts (`failed-experiments/performance-attempts/`)
- [Aggressive CSS Purging](failed-experiments/performance-attempts/aggressive-css-purging.md) *(Planned)*
- [Over-Optimization Issues](failed-experiments/performance-attempts/over-optimization.md) *(Planned)*

---

## ADR Statistics

### By Status
- **Accepted**: 4
- **Proposed**: 0
- **In Development**: 36
- **Total**: 40

### By Category
- **Drupal**: 9 ADRs
- **Frontend**: 7 ADRs  
- **German Compliance**: 6 ADRs
- **Infrastructure**: 6 ADRs
- **Testing**: 6 ADRs
- **Performance**: 4 ADRs
- **Security**: 4 ADRs
- **Failed Experiments**: 6 ADRs

### By Impact Level
- **High Impact**: 12 ADRs (System-wide architectural changes)
- **Medium Impact**: 18 ADRs (Component-level decisions)
- **Low Impact**: 10 ADRs (Implementation details)

---

## Quick Navigation

### By Development Phase
- **Planning Phase**: [Drupal Architecture](#drupal-architecture-decisions), [German Compliance](#german-compliance-decisions)
- **Implementation Phase**: [Frontend](#frontend-technology-decisions), [Testing](#testing-strategy-decisions)
- **Deployment Phase**: [Infrastructure](#infrastructure-decisions), [Performance](#performance-optimization-decisions)
- **Security Review**: [Security](#security-decisions), [Compliance](#german-compliance-decisions)

### By German Municipality Focus
- **Scalability**: Multi-site, Performance, Infrastructure
- **Compliance**: German Compliance, Security, Testing
- **User Experience**: Frontend, Accessibility, Performance
- **Lessons Learned**: Failed Experiments

### Emergency Reference
- **Critical Decisions**: All High Impact ADRs
- **What Not to Do**: [Failed Experiments](#failed-experiments--lessons-learned)
- **Quick Compliance**: [German Compliance](#german-compliance-decisions)
- **Performance Issues**: [Performance](#performance-optimization-decisions)

---

## Maintenance

This index is maintained automatically as new ADRs are added. Last updated: 2025-08-23

For questions about ADRs, consult with:
- **Architecture**: @drupal-enterprise-architect
- **German Compliance**: @german-compliance-specialist  
- **Performance**: @drupal-performance-specialist
- **Security**: @security-specialist