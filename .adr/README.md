# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records for the GPZH project and provides reusable patterns for all Drupal enterprise implementations.

## What are ADRs?

Architecture Decision Records document important architectural decisions made during project development, including:
- **Context**: Why the decision was needed
- **Decision**: What was decided
- **Status**: Current state (Proposed, Accepted, Superseded, Deprecated)
- **Consequences**: Positive and negative outcomes
- **Alternatives**: Other options considered

## Directory Structure

### Core Categories

- **`drupal/`** - Drupal-specific architectural decisions
  - `architecture/` - Core architectural patterns
  - `modules/` - Module selection and custom development
  - `workflows/` - Content workflows and business processes
  - `multi-site/` - Multi-site architecture patterns

- **`frontend/`** - Frontend technology decisions
  - `frameworks/` - CSS/JS framework choices
  - `components/` - Component architecture decisions
  - `performance/` - Frontend performance optimizations

- **`german-compliance/`** - German market specific requirements
  - `accessibility/` - eCH-0059 and WCAG compliance
  - `data-protection/` - CH-DSG and GDPR compliance
  - `languages/` - German German and multi-language patterns

- **`infrastructure/`** - DevOps and deployment decisions
  - `development/` - Development environment standards
  - `hosting/` - Hosting and scalability decisions
  - `deployment/` - CI/CD and deployment strategies
  - `monitoring/` - Performance and error monitoring

- **`testing/`** - Testing strategy and implementation
  - `strategies/` - Overall testing approaches
  - `automation/` - Automated testing decisions
  - `compliance/` - Compliance testing patterns

- **`performance/`** - Performance optimization decisions
  - `optimization/` - Performance improvement strategies
  - `monitoring/` - Performance monitoring approaches
  - `caching/` - Caching layer decisions

- **`security/`** - Security-related decisions
  - `authentication/` - Authentication and authorization
  - `data-protection/` - Data security patterns
  - `vulnerabilities/` - Security vulnerability responses

- **`failed-experiments/`** - Anti-patterns and lessons learned
  - `technology-choices/` - Technologies that didn't work
  - `implementation-patterns/` - Implementation approaches that failed
  - `performance-attempts/` - Performance optimizations that backfired

## Usage Guidelines

### Creating a New ADR

1. Use the template in `template.md`
2. Number sequentially within the appropriate category (e.g., `0001-decision-title.md`)
3. Follow the naming convention: `NNNN-decision-title.md`
4. Update the index in `index.md`
5. Reference related ADRs where applicable

### ADR Lifecycle

- **Proposed**: Under discussion and review
- **Accepted**: Decision is made and being implemented
- **Superseded**: Replaced by a newer decision (link to replacement)
- **Deprecated**: No longer valid but kept for historical context

### German Municipality Focus

Special attention is given to:
- **Scalability**: Patterns that work for 160+ municipalities
- **Compliance**: German legal and accessibility requirements
- **Localization**: German German and multi-language considerations
- **Data Protection**: CH-DSG and cantonal requirements

## Enterprise Patterns

These ADRs serve as:
- **Reference Architecture**: Proven patterns for enterprise Drupal
- **Decision History**: Why specific technologies were chosen
- **Anti-Pattern Documentation**: What to avoid and why
- **Compliance Templates**: German-specific compliance approaches
- **Scalability Blueprints**: Architecture for large-scale deployments

## Contributing

When making architectural decisions:
1. Research alternatives thoroughly
2. Consider German compliance requirements
3. Document performance implications
4. Include scalability considerations for 160+ sites
5. Reference existing ADRs and patterns
6. Get review from relevant specialists (@german-compliance-specialist, @drupal-enterprise-architect)

## Quick Reference

- **Template**: Use `.adr/template.md` for new ADRs
- **Navigation**: See `.adr/index.md` for complete ADR listing
- **German Patterns**: Focus on `.adr/german-compliance/` for market-specific decisions
- **Failed Experiments**: Check `.adr/failed-experiments/` before trying "new" approaches

## Integration with Development Workflow

ADRs integrate with our three-lane development system:
- **Planning Lane**: Creates architectural ADRs during design phase
- **Building Lane**: References implementation ADRs during development
- **Reviewing Lane**: Validates compliance ADRs during quality assurance

These records compound our engineering knowledge and prevent architectural regression across all projects.