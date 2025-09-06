# ADR-002: GPZH Municipal References Cleanup Strategy

## Status
ACCEPTED

## Context

**Phase 1 Analysis Findings:**
The adessoCMS municipal portal system contains extensive GPZH (Canton Zürich) specific references that prevent it from functioning as a generic CMS starter kit. Comprehensive analysis revealed:

- **Scale**: 800+ municipal references across 50+ files requiring systematic cleanup
- **Critical Success**: 95% of component library successfully genericized, providing proven patterns
- **Deep Integration**: Municipal-specific functionality embedded in multi-site architecture, AI agent system, and Swiss compliance modules
- **Technical Debt**: Municipal namespacing (`zh_demo_*`, `municipal_*`), hardcoded references, and environment-specific configuration

**Architectural Constraints:**
- Must preserve 95% successfully genericized component library
- Maintain Swiss government compliance capabilities as configurable features
- Preserve AI integration and multi-site architecture patterns
- Ensure fresh installation completes in <10 minutes post-cleanup

**Business Requirement:**
Transform from GPZH-specific municipal portal to generic adessoCMS starter kit suitable for any Swiss municipality or organization requiring similar CMS capabilities.

**Current State Assessment:**

**Successful Genericization Patterns (95% Complete):**
- Component library in `web/themes/custom/adesso_cms_theme/components/`
- Core module naming convention: `adesso_cms_*`
- Storybook integration and design system
- DDEV development environment structure
- Testing infrastructure (Vitest, Playwright, BackstopJS)

**Deep Integration Issues Requiring Systematic Approach:**
- **Multi-Site Architecture**: 3 municipal themes (Thalwil, Thalheim, Erlenbach)
- **Module Namespace Conflicts**: `municipal_*` and `zh_demo_*` modules
- **AI Agent System**: Municipality-specific agent configurations
- **Configuration Dependencies**: Database settings, environment variables, DDEV project naming
- **Content Templates**: Municipal-specific paragraph bundles and content types

**Risk Assessment:**
- **High Risk**: Module namespace changes affecting service references
- **Medium Risk**: Database configuration and content structure modifications
- **Low Risk**: Theme removal and environment variable updates

## Decision

**Adopt 4-Phase Systematic Cleanup Strategy** based on successful component library genericization patterns.

The decision implements a methodical approach that:
1. Leverages proven genericization patterns from the 95% successful component library
2. Minimizes risk through incremental phases with validation checkpoints
3. Preserves architectural integrity while removing municipal-specific dependencies
4. Establishes reusable transformation patterns for future projects

**Core Principles:**
- **Pattern Replication**: Apply successful component library genericization methods to all system layers
- **Incremental Validation**: Each phase includes quality gates and rollback procedures
- **Compound Learning**: Document patterns for institutional knowledge and future project acceleration

## Alternatives Considered

### Alternative 1: Big Bang Approach - Complete Cleanup in Single Phase
**Description**: Immediate removal of all 800+ municipal references in one comprehensive operation.
**Rejection Rationale**: 
- High risk of system breakage across multiple integration points
- Difficult to validate incremental progress
- Complex rollback procedures if issues arise
- Doesn't leverage proven incremental genericization success patterns

### Alternative 2: Selective Cleanup - Keep Municipal Features Configurable
**Description**: Maintain municipal-specific features as optional configurations rather than removing them.
**Rejection Rationale**:
- Contradicts goal of creating clean, generic starter kit
- Increases maintenance burden with dual code paths
- Complicates onboarding for new municipalities
- Perpetuates technical debt rather than eliminating it

### Alternative 3: Fork-Based Approach - Create Separate Generic Repository
**Description**: Create new repository with cleaned codebase, leaving original unchanged.
**Rejection Rationale**:
- Loses institutional knowledge and development history
- Duplicates maintenance effort across two repositories
- Misses opportunity to compound learning from cleanup process
- Doesn't address core transformation requirement

## Consequences

### Positive
- **Clean Architecture**: Generic starter kit suitable for any municipality
- **Reduced Technical Debt**: Elimination of 800+ municipal-specific references
- **Faster Onboarding**: Fresh installation completes in <10 minutes
- **Compound Learning**: Documented patterns accelerate future municipal transformations
- **Proven Methodology**: Leverages 95% successful component library genericization approach
- **Institutional Knowledge**: Systematic approach preserves architectural decisions and patterns

### Negative
- **Temporary Complexity**: 4-phase approach requires careful coordination
- **Resource Investment**: Dedicated effort across multiple development cycles
- **Testing Overhead**: Comprehensive validation required at each phase transition
- **Documentation Burden**: Extensive pattern capture for compound learning

### Neutral
- **Process Evolution**: Development workflow temporarily focused on cleanup activities
- **Agent Coordination**: Multiple specialized agents required for systematic approach
- **Quality Assurance**: Enhanced validation procedures during transformation period

## Implementation Strategy

### Phase 1: Analysis and Planning ✅ COMPLETED
**Status**: Successfully completed with comprehensive findings
**Deliverables**:
- 800+ reference inventory across 50+ files
- Risk assessment and mitigation strategies
- Success pattern identification from component library
- Agent ecosystem optimization for cleanup coordination

### Phase 2: Module Refactoring and Configuration Cleanup
**Scope**: 
- **Module Namespace Updates**: `municipal_*` → `adesso_cms_*` with service reference coordination
- **Database Configuration**: Generic project naming and environment variable cleanup
- **AI Agent Configuration**: Remove municipality-specific agent parameters
- **DDEV Project Configuration**: Rename from `zh-demo` to `adesso-cms`

**Quality Gates**:
- All module services maintain functionality post-refactoring
- Database operations complete without data loss
- DDEV environment successfully rebuilds with new configuration
- AI agents function with generic parameters

**Pattern Documentation**:
- Module namespace transformation template
- Service reference coordination procedures
- Database migration best practices
- Agent configuration genericization methods

### Phase 3: Theme Removal and Infrastructure Genericization
**Scope**:
- **Municipal Theme Removal**: Delete Thalwil, Thalheim, Erlenbach specific themes
- **Content Template Cleanup**: Replace municipal-specific paragraph bundles with generic alternatives
- **Testing Infrastructure**: Update scenarios from municipal-specific to generic test cases
- **Documentation Updates**: Remove municipal references from all documentation

**Quality Gates**:
- Single generic theme functions across all use cases
- Content creation workflows operate with generic templates
- Test suite maintains coverage with generic scenarios
- Documentation provides clear onboarding path for any municipality

### Phase 4: Testing, Validation, and Knowledge Codification
**Scope**:
- **Comprehensive System Testing**: Full functionality validation with generic configuration
- **Fresh Installation Validation**: Complete setup process in <10 minutes
- **Performance Benchmarking**: Ensure no degradation from municipal-specific optimizations
- **Compound Learning Documentation**: Pattern extraction and institutional knowledge capture

**Success Criteria**:
- Zero municipal references detected in automated scans
- Fresh installation completes successfully in <10 minutes
- All functionality preserved with generic content
- Comprehensive documentation enables future municipal transformations

## Risk Mitigation Strategies

### Database Integrity Protection
**Strategy**: Full database export before each phase with automated validation
**Implementation**:
```bash
# Pre-phase backup with validation
ddev export --file="pre-phase-${PHASE_NUMBER}-backup.sql.gz"
ddev drush sql:cli < validation-queries.sql
```

**Rollback Procedure**:
```bash
# Immediate rollback if issues detected
ddev import --file="pre-phase-${PHASE_NUMBER}-backup.sql.gz"
ddev drush cr
ddev test:validation
```

### Service Reference Coordination
**Strategy**: Automated dependency mapping before namespace changes
**Implementation**:
- Generate service dependency graph before module refactoring
- Coordinate all service references during namespace updates
- Validate service registration post-change

### Quality Gate Automation
**Strategy**: Automated validation at each phase transition
**Implementation**:
```bash
# Phase completion validation
npm run qa:full
ddev test:integration
ddev drush audit:references --type=municipal
npm run test:e2e:fresh-install
```

### Git-Based Recovery Points
**Strategy**: Tagged commits at each major milestone
**Implementation**:
- Tag successful phase completions: `cleanup-phase-${N}-complete`
- Maintain clean commit history for easy navigation
- Document rollback procedures for each phase

## Success Metrics and Quality Assurance

### Quantitative Success Criteria
1. **Reference Elimination**: Zero municipal references in automated scans
2. **Installation Speed**: Fresh installation completes in <10 minutes
3. **Functionality Preservation**: 100% feature parity with generic content
4. **Component Library Maintenance**: 95%+ genericization success rate maintained
5. **Test Coverage**: Maintain >80% test coverage throughout transformation

### Quality Assurance Framework
**Automated Validation Pipeline**:
```bash
#!/bin/bash
# Comprehensive validation script
set -e

echo "=== Phase Completion Validation ==="

# 1. Reference scanning
echo "Checking for municipal references..."
npm run scan:references

# 2. Fresh installation test
echo "Testing fresh installation..."
ddev destroy -y
ddev start
time ddev install:fresh

# 3. Functionality validation
echo "Validating core functionality..."
ddev test:functional
npm run test:e2e

# 4. Performance benchmarking
echo "Performance validation..."
npm run test:performance

# 5. Accessibility compliance
echo "Accessibility validation..."
npm run test:a11y

echo "=== Validation Complete ==="
```

### Manual Quality Gates
1. **Architecture Review**: ADR documentation completeness
2. **User Experience Validation**: Generic onboarding flow testing
3. **Documentation Accuracy**: Installation and configuration guide validation
4. **Stakeholder Approval**: Business requirement satisfaction confirmation

## Municipal Portal Specific Considerations

### Multi-Site Impact
**Current State**: 3 municipal sites (Thalwil, Thalheim, Erlenbach) with dedicated themes
**Target State**: Single generic theme with municipality-specific configuration capability
**Transformation Strategy**:
- Preserve multi-site architecture as generic capability
- Convert municipal themes to configuration-based customization
- Maintain site-specific content management workflows

### Swiss Compliance Preservation
**Maintained Compliance Features**:
- **WCAG 2.1 AA**: Accessibility compliance preserved as core requirement
- **CH-DSG**: Data protection capabilities maintained as configurable feature
- **eCH-0059**: Government standards support preserved for optional activation

**Implementation Approach**:
- Swiss compliance remains built-in capability
- Municipal-specific interpretations removed
- Generic compliance framework supports any Swiss organization

### AI Integration Evolution
**Current State**: Municipality-specific AI agent configurations and content generation
**Target State**: Generic AI integration supporting any organization
**Transformation Elements**:
- Remove municipality-specific agent parameters
- Preserve AI content generation and accessibility features
- Maintain AI provider integration flexibility (Anthropic, OpenAI)
- Generic agent orchestration for any domain

## Implementation Notes

### DDEV Integration Updates
**Configuration Changes Required**:
- Project name: `zh-demo` → `adesso-cms`
- Database name updates in configuration files
- Environment variable cleanup in `.ddev/config.yaml`
- Custom command updates for generic usage

**Development Workflow Modifications**:
- Generic project initialization commands
- Updated development environment documentation
- Modified testing scenarios for generic use cases

### Performance Considerations
**Expected Performance Impact**:
- **Neutral**: No performance degradation expected from municipal reference removal
- **Positive**: Reduced complexity may improve application startup time
- **Monitoring Strategy**: Benchmark before/after each phase for performance validation

**Optimization Strategies**:
- Maintain performance-critical Swiss compliance features
- Preserve AI integration efficiency
- Monitor component library performance throughout transformation

### Future Considerations
**Evolution Path**:
- Generic adessoCMS becomes foundation for future municipal projects
- Patterns documented in this ADR accelerate similar transformations
- Compound learning enables exponential improvement in future cleanups

**Potential Deprecation Timeline**:
- Municipal-specific references: Deprecated immediately upon cleanup completion
- Legacy configuration patterns: 6-month deprecation notice for dependent projects
- Migration support: 12-month assistance period for existing implementations

**Dependencies on External Factors**:
- Drupal 11 LTS support continuation
- Swiss government standards evolution (eCH, WCAG updates)
- AI provider API stability (Anthropic, OpenAI)

## Compound Engineering Integration

### Pattern Extraction for Future Projects
**Successful Genericization Patterns**:
1. **Component-First Cleanup Strategy**: Start with UI components, work inward to business logic
2. **Incremental Validation**: Quality gates at each transformation milestone
3. **Automated Reference Scanning**: Systematic detection and elimination of domain-specific references
4. **Service Reference Coordination**: Manage dependencies during namespace transformations

**Anti-Pattern Prevention**:
1. **Avoid Big Bang Cleanups**: Risk of system-wide breakage
2. **Don't Preserve Domain-Specific Configuration**: Complicates maintenance and onboarding
3. **Never Skip Documentation**: Pattern loss prevents compound learning

### Institutional Knowledge Preservation
**Knowledge Capture Strategy**:
- Document successful transformation techniques in CLAUDE.md
- Create reusable templates for municipal → generic transformations
- Establish quality assurance frameworks for complex refactoring projects
- Build agent coordination patterns for systematic cleanup operations

**Cross-Project Learning Networks**:
- Municipal portal transformation template library
- Swiss compliance genericization best practices
- AI integration cleanup methodologies
- Multi-site architecture transformation patterns

### Template Creation for Future Use
**Reusable Cleanup Templates**:
1. **Module Namespace Transformation Template**
2. **Database Configuration Cleanup Checklist**
3. **Agent Configuration Genericization Guide**
4. **Quality Assurance Validation Scripts**

**Agent Orchestration Patterns**:
- **codebase-analyzer**: Systematic reference detection
- **codebase-pattern-finder**: Success pattern identification
- **ADR-reviewer**: Documentation quality assurance
- **development-orchestrator**: Multi-phase coordination

## Tags
- #architecture
- #municipal-portal
- #drupal-11
- #cleanup-strategy
- #genericization
- #compound-engineering
- #phase-strategy
- #ai-integration
- #swiss-compliance
- #multi-site

## Links and References
- **Related ADRs**: [ADR-001](./0001-record-architecture-decisions.md)
- **Technical Documentation**: 
  - [META_ARCHITECTURE.md](/.claude/META_ARCHITECTURE.md)
  - [Component Library Documentation](/web/themes/custom/adesso_cms_theme/components/)
- **Phase 1 Analysis**: Agent ecosystem findings from codebase-analyzer and codebase-pattern-finder
- **External References**: 
  - [Michael Nygard's ADR Framework](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)
  - [Swiss eCH-0059 Standards](https://www.ech.ch/de/standards/60479)
  - [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---
**Author**: ADR Reviewer Agent (Claude Code)  
**Date**: 2025-09-06  
**Municipal Portal Version**: 2.0.0-cleanup  
**Drupal Version**: 11.2.2

**Compound Engineering Note**: This ADR establishes reusable patterns for municipal portal genericization, contributing to institutional knowledge and enabling exponential improvement in future similar transformations.