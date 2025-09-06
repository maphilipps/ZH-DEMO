# Research Report: GPZH Content Removal and adessoCMS Starter Kit Conversion
**Issue Reference**: [#90 - Complete removal of GPZH-specific content to restore general adessoCMS starter kit](https://github.com/maphilipps/ZH-DEMO/issues/90)
**Research Date**: 2025-09-06
**Research Scope**: Converting project-specific municipal portal to generic adessoCMS starter kit

## Executive Summary

This repository currently contains extensive GPZH (Government of Canton Zurich) specific municipal portal content that needs comprehensive cleanup to restore it as a general-purpose adessoCMS starter kit. The research reveals a deeply integrated municipal system with 100+ custom modules, Swiss compliance agents, Bruchtal-specific demo content, and extensive municipal workflow systems. The conversion requires systematic removal of project-specific content, neutralization of municipal branding, and restoration of generic CMS functionality while maintaining the valuable adessoCMS architecture.

## Current Codebase Analysis

### Existing Patterns - GPZH Municipal Integration

**Custom Municipal Modules (3 core modules)**:
- `web/modules/custom/zh_demo_login_redirect/` - ZH-specific authentication workflows
- `web/modules/custom/zh_demo_editorial_workflow/` - Municipal editorial approval processes  
- `web/modules/custom/zh_demo_content_filter/` - Content filtering for municipal compliance
- `web/modules/custom/municipal_ai_agents/` - 5 AI agents for municipal services automation

**Municipal-Specific Theme System**:
- `web/themes/custom/zh_thalwil/` - Thalwil municipality theme
- `web/themes/custom/zh_thalheim/` - Thalheim municipality theme
- `web/themes/custom/zh_erlenbach/` - Erlenbach municipality theme

**Extensive Testing Infrastructure**:
- Comprehensive QA suite targeting `bruchtal.zh-demo.ddev.site`
- GPZH demo scenarios and municipal workflow testing
- Swiss compliance validation scripts
- Performance testing with municipal use cases

### Architectural Constraints

**Current System Architecture**:
- DDEV development environment configured for `zh-demo.ddev.site`
- Drupal configuration exports contain municipal-specific content types
- Claude Code agent system (100+ agents) specialized for municipal development
- Webforms configured for Swiss infrastructure damage reporting
- Content types for municipal entities (clubs, hospitality, companies)

**Integration Points and Dependencies**:
- Municipal AI agents integrated with Drupal workflows
- Swiss compliance monitoring and accessibility requirements
- Multilingual support configured for German/French/Italian/Romansh
- Event review dashboard for municipal editors at `/admin/content/events/review`
- Infrastructure damage reporting at `/form/infrastructure-damage-report`

### Code Quality Assessment

**Current Implementation Quality**:
- Well-structured modular architecture with clean separation of concerns
- Comprehensive testing coverage for municipal use cases
- Professional-grade Claude Code agent orchestration system
- Modern Drupal 11 development patterns with proper configuration management

**Areas for Improvement**:
- Heavy coupling to GPZH-specific business logic
- Hardcoded municipal references throughout codebase
- Swiss-specific compliance requirements embedded in core functionality
- Testing infrastructure tied to Bruchtal demo scenarios

## Best Practices Research (Context7)

### Library Documentation Insights

**Drupal Configuration Management Best Practices**:
```yaml
# Recommended neutral configuration structure
core.extension.yml: Clean module list without project-specific modules
webform.webform.*: Generic forms without municipality references  
node.type.*: Neutral content types (article, page, etc.)
taxonomy.vocabulary.*: General vocabularies without municipal terms
```

**Configuration Patterns**:
- Use `sites/default/settings.php` for environment-specific settings
- Store configuration in `config/sync/` directory for version control
- Implement configuration split for environment-specific variations
- Use default content module for starter kit sample content

### Framework Integration

**Drupal Starter Kit Architecture**:
- Composer-based project templates preferred over installation profiles
- Use `drupal/core-composer-scaffold` for file management
- Implement clean robots.txt with appropriate disallow patterns
- Follow modern theme development with starterkit approach

**Official Architectural Recommendations**:
- Separate custom modules from contributed modules
- Use entity APIs for content management rather than hardcoded content
- Implement proper caching and performance optimization
- Follow security best practices for file permissions and access control

## Current Industry Analysis (Web Research)

### Industry Trends

**Modern Drupal Starter Kit Approach**:
- **Composer Project Templates**: Industry moving away from installation profiles toward Composer-based templates
- **Recipe System**: Drupal community preparing for composable "recipes" system for reusable configurations
- **CI/CD Integration**: Automated testing and deployment pipelines standard for starter kits
- **DDEV Adoption**: Local development environments using Docker containerization

**Emerging Approaches**:
- Configuration as Code (CaC) patterns for reproducible installations
- Automated testing for fresh installation validation
- Theme starterkit generation for brand-neutral starting points
- Documentation-driven development with comprehensive setup guides

### Comparative Analysis  

| Approach | Pros | Cons | Use Cases |
|----------|------|------|-----------|
| **Full Cleanup** | Complete neutrality, maximum reusability | Time-intensive, risk of breaking functionality | General starter kit for any industry |
| **Gradual Refactoring** | Lower risk, maintains functionality | Partial cleanup may leave municipal references | Industry-specific starter kit |
| **Fork and Clean** | Preserves original, clean separation | Requires maintaining two codebases | When original project continues |

### Community Insights

**Common Pitfalls**:
- **Database Dependencies**: Municipal content types may have complex field dependencies
- **Configuration UUIDs**: Site-specific UUIDs in configuration can cause import conflicts
- **File Dependencies**: Media files and uploads often contain site-specific content
- **Module Interdependencies**: Custom modules may have hidden dependencies on municipal data

**Success Patterns**:
- **Clean Installation Testing**: Automated tests that verify fresh installations work correctly  
- **Documentation First**: Comprehensive setup documentation reduces adoption barriers
- **Modular Architecture**: Separating business logic from site-specific content
- **Generic Sample Content**: Providing neutral demo content that showcases capabilities

**Real-world Experiences**:
- Starter kits with over-engineered initial setups have lower adoption rates
- Clear separation between framework features and demo content increases success
- Regular testing of fresh installations prevents configuration drift
- Community contribution guidelines improve long-term maintenance

## Synthesis and Recommendations

### Recommended Approach

**Phase-Based Complete Cleanup Strategy**:
Given the extensive municipal integration, a systematic four-phase approach is recommended to safely convert this to a generic adessoCMS starter kit while preserving the valuable architectural patterns.

**Rationale**: The current system demonstrates excellent Drupal architecture and Claude Code integration patterns that have broader value beyond municipal use. The systematic cleanup preserves these innovations while removing project-specific content.

### Implementation Strategy

**Phase 1: Content Audit and Removal (Weeks 1-2)**
1. **Search and Catalog**: Use automated tools to find all GPZH/ZH/Swiss/municipal references
2. **Custom Module Analysis**: Review each of the 4 custom modules for genericization potential
3. **Configuration Cleanup**: Export clean configurations without municipal-specific content  
4. **Theme Neutralization**: Replace 3 municipal themes with single neutral theme
5. **Database Content Removal**: Clear all municipal demo content and user accounts

**Phase 2: Architecture Genericization (Weeks 3-4)**  
1. **Module Refactoring**: Convert zh_demo modules to generic equivalents or remove
2. **Claude Agent Cleanup**: Remove 100+ municipal-specific agents, keep core architecture
3. **Testing Infrastructure**: Replace GPZH test scenarios with generic CMS testing
4. **URL and Domain Cleanup**: Replace zh-demo.ddev.site with generic adesso-cms patterns
5. **Configuration Management**: Implement clean config sync without municipal references

**Phase 3: Documentation and Branding (Week 5)**
1. **README Overhaul**: Create comprehensive adessoCMS starter kit documentation
2. **Installation Guide**: Document fresh installation process and requirements
3. **Development Workflow**: Update DDEV and development environment setup
4. **Branding Removal**: Replace any remaining municipal branding with neutral content
5. **Sample Content**: Create generic demo content showcasing CMS capabilities

**Phase 4: Testing and Validation (Week 6)**
1. **Fresh Installation Testing**: Verify clean installation from scratch works
2. **Automated Test Suite**: Replace municipal test scenarios with generic CMS tests
3. **Performance Validation**: Ensure no performance degradation from cleanup
4. **Documentation Verification**: Test all setup instructions work correctly
5. **Community Preparation**: Prepare for potential open-source release

### Risk Assessment

**Technical Risks**:
- **Configuration Dependencies**: Municipal content types may have complex field relationships that break when removed
- **Module Interdependencies**: Custom modules may have hidden dependencies requiring careful analysis
- **Database Cleanup**: Removing municipal content could leave orphaned references
- **Theme Dependencies**: Municipal themes may have hardcoded template references

**Performance Risks**:
- **Asset Cleanup**: Large number of municipal media files may require careful removal
- **Database Optimization**: Post-cleanup database optimization may be needed
- **Cache Invalidation**: Extensive changes require comprehensive cache clearing

**Maintenance Risks**:  
- **Documentation Drift**: Generic documentation requires ongoing maintenance
- **Configuration Management**: Maintaining clean configuration sync requires discipline
- **Testing Maintenance**: Generic test suite requires different maintenance approach
- **Community Support**: Transition from project-specific to community resource

### Success Metrics

**Technical Success Indicators**:
- Fresh installation completes without errors in under 10 minutes
- No GPZH/municipal references found in automated scans
- All core CMS functionality works with generic content
- Performance maintains current baseline after cleanup

**Usability Success Indicators**:
- New developers can set up development environment following documentation
- Generic demo content effectively showcases CMS capabilities  
- Installation process requires no municipal-specific knowledge
- Community adoption if released as open-source starter kit

## Implementation Prerequisites

**Required Libraries**:
- Maintain current Drupal 11 core and essential contributed modules
- Remove municipal-specific modules: `zh_demo_*`, `municipal_ai_agents`
- Keep valuable architectural modules for content management and workflows
- Preserve DDEV configuration with generic domain names

**Configuration Changes**:
- Update `.ddev/config.yaml` with generic project name
- Replace `zh-demo.ddev.site` references with `adesso-cms.ddev.site`
- Clean Drupal configuration exports in `config/sync/`  
- Update `composer.json` project metadata

**Database Changes**:
- Remove all municipal demo content (nodes, taxonomy terms, users)
- Clean webform configurations of Swiss-specific forms
- Reset site configuration to generic defaults
- Maintain content type structure for general CMS use

**Infrastructure Requirements**:
- Preserve current DDEV containerized development environment
- Update CI/CD workflows to test generic installations
- Maintain current performance optimization and caching strategies
- Keep accessibility and multilingual capabilities as optional features

## Next Steps for Planning Phase

**Immediate Planning Requirements**:
1. **Agent Selection**: Choose appropriate Claude Code agents for cleanup coordination
2. **Risk Mitigation**: Plan database backup and rollback strategies
3. **Testing Strategy**: Define acceptance criteria for each cleanup phase
4. **Communication Plan**: Coordinate with stakeholders about functionality changes

**Agent Coordination Requirements**:
- **Codebase Locator**: For comprehensive reference finding and cleanup verification
- **Drupal Configuration Expert**: For safe configuration cleanup and export
- **Testing Specialist**: For developing generic test scenarios  
- **Documentation Specialist**: For creating comprehensive starter kit documentation

**Architecture Decision Points**:
- Whether to preserve Claude Code agent architecture in simplified form
- How to handle multilingual capabilities (Swiss requirement vs. general utility)
- Whether to maintain DDEV containerization or offer multiple dev environment options
- Decision on preserving advanced workflow capabilities vs. simplifying for broader adoption

## Compound Learning Insights

**Patterns for Future Reuse**:
- Municipal portal architecture patterns have broader applicability to government sites
- Claude Code agent orchestration system demonstrates advanced AI-assisted development
- Comprehensive testing infrastructure provides template for complex Drupal projects
- Configuration management patterns show best practices for large-scale Drupal implementations

**Context Evolution**:
- Document successful patterns for converting project-specific to generic repositories
- Preserve architectural innovations while removing business-specific content
- Update CLAUDE.md with learnings about systematic codebase cleanup approaches
- Maintain knowledge of Swiss compliance requirements for future government projects

**Quality Gate Improvements**:
- Implement automated scanning for project-specific references in CI/CD
- Develop checklist for converting project-specific to generic starter kits
- Create templates for neutral demo content and configuration
- Establish patterns for maintaining clean separation between framework and project content