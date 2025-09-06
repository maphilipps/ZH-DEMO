# Implementation Plan: GPZH Content Removal and adessoCMS Starter Kit Conversion

**Issue Reference**: [#90 - Complete removal of GPZH-specific content to restore general adessoCMS starter kit](https://github.com/maphilipps/ZH-DEMO/issues/90)  
**Planning Date**: 2025-09-06  
**Research Base**: `.work/research/research-090.md`  
**Execution Timeline**: 6 weeks (4 phases)  

## Executive Summary

Based on comprehensive research findings, this plan orchestrates the systematic conversion of this GPZH municipal portal repository to a generic adessoCMS starter kit. The plan leverages the streamlined 8-agent Claude Code architecture to execute a 4-phase cleanup strategy, preserving valuable architectural patterns while removing all project-specific municipal content.

**Key Scope**: Remove 4 custom municipal modules, 3 municipality themes, 100+ municipal-specific agents, extensive Swiss compliance content, and replace all `zh-demo` references with `adessoCMS` while maintaining the core architecture and development workflow.

## Agent Orchestration Strategy

### Available Claude Code Agents (8 Core Agents)

**Frontend Development Pipeline**:
- `figma-storybook-converter` - Design system cleanup and neutralization
- `storybook-component-curator` - Component library management 
- `drupal-ui-designer` - UI/UX neutralization and generic theming

**Backend Development & Integration**:
- `drupal-step-by-step-implementer` - Core Drupal architecture cleanup
- `drupal-sdc-validator` - Component validation post-cleanup

**Quality Assurance & Tools**:
- `debug-detective` - Issue investigation and troubleshooting
- `adr-reviewer` - Architecture review and documentation
- `git-hygiene-enforcer` - Repository management and cleanup

**Meta-Orchestration**:
- `development-orchestrator` - Multi-agent coordination (for complex phases)

### Agent-to-Phase Mapping

| Phase | Primary Agent | Supporting Agents | Orchestration Required |
|-------|---------------|-------------------|----------------------|
| **Phase 1: Content Audit & Removal** | `drupal-step-by-step-implementer` | `debug-detective`, `git-hygiene-enforcer` | Yes - `development-orchestrator` |
| **Phase 2: Architecture Genericization** | `drupal-step-by-step-implementer` | `drupal-sdc-validator`, `debug-detective` | Yes - `development-orchestrator` |
| **Phase 3: Documentation & Branding** | `adr-reviewer` | `drupal-ui-designer`, `storybook-component-curator` | No - Sequential execution |
| **Phase 4: Testing & Validation** | `drupal-sdc-validator` | `debug-detective`, `git-hygiene-enforcer` | No - Sequential execution |

## Phase-by-Phase Implementation Plan

### Phase 1: Content Audit and Removal (Weeks 1-2)
**Timeline**: 10 working days  
**Risk Level**: High - Database and configuration dependencies  
**Orchestration**: Multi-agent coordination required  

#### Task Breakdown with Agent Assignments

**Week 1: Discovery and Analysis**

1. **Comprehensive Reference Audit** 
   - **Agent**: `debug-detective`
   - **Task**: Automated scanning for GPZH/ZH/Swiss/municipal AND zh-demo references
   - **Target References**: GPZH, ZH, Swiss, Thalwil, Thalheim, Erlenbach, Bruchtal, zh-demo, zh_demo
   - **Deliverables**: Complete reference catalog with locations and zh-demo → adessoCMS replacement map
   - **Command**: `debug-detective "Scan entire codebase for municipal references: GPZH, ZH, Swiss, Thalwil, Thalheim, Erlenbach, Bruchtal, zh-demo, zh_demo"`

2. **Custom Module Deep Analysis**
   - **Agent**: `drupal-step-by-step-implementer` 
   - **Task**: Analyze 4 custom municipal modules for genericization potential
   - **Modules**: `zh_demo_login_redirect`, `zh_demo_editorial_workflow`, `zh_demo_content_filter`, `municipal_ai_agents`
   - **Deliverables**: Module dependency analysis and removal/refactoring recommendations
   - **Command**: `drupal-step-by-step-implementer "Analyze custom modules in web/modules/custom/ for municipal dependencies and genericization potential"`

3. **Configuration Export Analysis**
   - **Agent**: `drupal-step-by-step-implementer`
   - **Task**: Review Drupal configuration exports for municipal content references
   - **Focus Areas**: Content types, taxonomies, webforms, block configurations
   - **Deliverables**: Clean configuration templates without municipal references
   - **Command**: `drupal-step-by-step-implementer "Export and analyze Drupal configurations in config/sync/ for municipal-specific content"`

**Week 2: Initial Cleanup Execution**

4. **Municipal Theme Removal**
   - **Agent**: `drupal-ui-designer`
   - **Task**: Remove 3 municipal themes and create neutral replacement
   - **Themes**: `zh_thalwil`, `zh_thalheim`, `zh_erlenbach`
   - **Deliverables**: Single neutral adessoCMS theme
   - **Command**: `drupal-ui-designer "Remove municipal themes and create neutral adessoCMS base theme"`

5. **Database Content Cleanup**
   - **Agent**: `drupal-step-by-step-implementer`
   - **Task**: Remove municipal demo content, user accounts, and taxonomy terms
   - **Safety**: Full database backup before execution
   - **Deliverables**: Clean database with generic content structure
   - **Command**: `drupal-step-by-step-implementer "Clean municipal content from database while preserving content architecture"`

6. **Git History Cleanup**
   - **Agent**: `git-hygiene-enforcer`
   - **Task**: Commit cleanup changes with proper documentation
   - **Focus**: Staged commits for each cleanup component
   - **Deliverables**: Clean git history documenting removal process
   - **Command**: `git-hygiene-enforcer "Commit Phase 1 cleanup with detailed change documentation"`

#### Phase 1 Success Criteria
- [ ] Zero GPZH/municipal references found in automated scans
- [ ] All 4 custom municipal modules removed or genericized
- [ ] 3 municipal themes replaced with single neutral theme
- [ ] Database cleaned of municipal content while preserving architecture
- [ ] Git history properly documents all changes

### Phase 2: Architecture Genericization (Weeks 3-4)
**Timeline**: 10 working days  
**Risk Level**: Medium - Module interdependencies  
**Orchestration**: Multi-agent coordination for complex refactoring  

#### Task Breakdown with Agent Assignments

**Week 3: Module and Agent Refactoring**

1. **Module Architecture Cleanup**
   - **Agent**: `drupal-step-by-step-implementer`
   - **Task**: Convert or remove `zh_demo_*` modules to generic equivalents
   - **Focus**: Preserve useful functionality, remove municipal specifics
   - **Deliverables**: Generic authentication, editorial, and content filtering modules
   - **Command**: `drupal-step-by-step-implementer "Refactor zh_demo modules to generic adessoCMS functionality"`

2. **Claude Agent System Cleanup** 
   - **Agent**: `development-orchestrator` (Meta-orchestration)
   - **Task**: Remove 100+ municipal-specific agents, preserve core architecture
   - **Preserve**: 8 core agents from current streamlined architecture
   - **Remove**: Municipal specialists, Swiss compliance agents, GPZH workflow agents
   - **Deliverables**: Streamlined agent architecture for generic CMS development
   - **Command**: `development-orchestrator "Clean Claude agent system: preserve 8 core agents, remove municipal specialists"`

3. **Testing Infrastructure Overhaul**
   - **Agent**: `debug-detective`
   - **Task**: Replace GPZH test scenarios with generic CMS testing
   - **Remove**: Bruchtal demo scenarios, municipal workflow tests
   - **Create**: Generic content management and functionality tests
   - **Deliverables**: Comprehensive generic test suite
   - **Command**: `debug-detective "Replace municipal test scenarios with generic adessoCMS testing framework"`

**Week 4: Configuration and Environment Cleanup**

4. **DDEV Configuration Update**
   - **Agent**: `drupal-step-by-step-implementer`
   - **Task**: Replace all `zh-demo` references with `adessoCMS` throughout the system
   - **New Domain**: `adesso-cms.ddev.site` (replace `zh-demo.ddev.site`)
   - **Global Replacement**: Replace `zh-demo` → `adessoCMS` in all files, configurations, documentation
   - **Update**: `.ddev/config.yaml`, project references, documentation, variable names, URLs
   - **Deliverables**: Complete zh-demo → adessoCMS transformation
   - **Command**: `drupal-step-by-step-implementer "Replace all zh-demo references with adessoCMS throughout entire codebase"`

5. **Configuration Management Cleanup**
   - **Agent**: `drupal-step-by-step-implementer`
   - **Task**: Implement clean config sync without municipal references
   - **Focus**: `config/sync/` directory, site UUIDs, module dependencies
   - **Safety**: Configuration backups and validation
   - **Deliverables**: Generic configuration management setup
   - **Command**: `drupal-step-by-step-implementer "Clean Drupal configuration sync of municipal references"`

6. **Composer and Project Metadata Update**
   - **Agent**: `git-hygiene-enforcer`
   - **Task**: Update `composer.json` project metadata and dependencies
   - **Remove**: Municipal-specific packages and descriptions
   - **Update**: Project name, description, keywords to generic adessoCMS
   - **Deliverables**: Generic project metadata and dependency management
   - **Command**: `git-hygiene-enforcer "Update composer.json and project metadata for adessoCMS starter kit"`

#### Phase 2 Success Criteria
- [ ] All custom modules genericized or properly removed
- [ ] Claude agent system reduced to 8 core agents with generic functionality
- [ ] Testing infrastructure covers generic CMS scenarios
- [ ] DDEV environment uses generic domain and configuration
- [ ] Configuration management system cleaned of municipal references
- [ ] Project metadata reflects generic adessoCMS starter kit status

### Phase 3: Documentation and Branding (Week 5)
**Timeline**: 5 working days  
**Risk Level**: Low - Documentation and cosmetic changes  
**Orchestration**: Sequential execution sufficient  

#### Task Breakdown with Agent Assignments

1. **README and Documentation Overhaul**
   - **Agent**: `adr-reviewer`
   - **Task**: Create comprehensive adessoCMS starter kit documentation
   - **Replace**: All municipal references with generic CMS language
   - **Create**: Installation guide, development workflow, feature documentation
   - **Deliverables**: Professional starter kit documentation
   - **Command**: `adr-reviewer "Create comprehensive adessoCMS starter kit documentation replacing municipal content"`

2. **Installation and Setup Guide**
   - **Agent**: `adr-reviewer` 
   - **Task**: Document fresh installation process and requirements
   - **Include**: DDEV setup, Drupal installation, initial configuration
   - **Test**: All documented steps work on clean environment
   - **Deliverables**: Step-by-step setup guide for new users
   - **Command**: `adr-reviewer "Create detailed installation guide for adessoCMS starter kit fresh setup"`

3. **Development Workflow Documentation**
   - **Agent**: `adr-reviewer`
   - **Task**: Update DDEV and development environment setup documentation
   - **Include**: Agent usage guidelines, development patterns, best practices
   - **Update**: All references to use generic adessoCMS patterns
   - **Deliverables**: Developer onboarding and workflow documentation
   - **Command**: `adr-reviewer "Document generic development workflow for adessoCMS with Claude Code agents"`

4. **Visual Branding and UI Cleanup**
   - **Agent**: `drupal-ui-designer`
   - **Task**: Replace remaining municipal branding with neutral content
   - **Remove**: Canton Zurich logos, municipal imagery, Swiss-specific UI elements
   - **Create**: Generic, professional CMS branding
   - **Deliverables**: Neutral, professional visual identity
   - **Command**: `drupal-ui-designer "Replace municipal branding with neutral adessoCMS visual identity"`

5. **Sample Content Creation**
   - **Agent**: `storybook-component-curator`
   - **Task**: Create generic demo content showcasing CMS capabilities
   - **Replace**: Bruchtal municipal content with generic business scenarios
   - **Include**: Sample pages, components, media, forms
   - **Deliverables**: Professional demo content for CMS evaluation
   - **Command**: `storybook-component-curator "Create generic demo content showcasing adessoCMS capabilities"`

#### Phase 3 Success Criteria
- [ ] Complete documentation overhaul with no municipal references
- [ ] Step-by-step installation guide tested and validated
- [ ] Developer workflow documentation covers generic patterns
- [ ] Visual branding completely neutral and professional
- [ ] Sample content showcases generic CMS capabilities without municipal context

### Phase 4: Testing and Validation (Week 6)
**Timeline**: 5 working days  
**Risk Level**: Medium - Final validation and performance  
**Orchestration**: Sequential execution with comprehensive validation  

#### Task Breakdown with Agent Assignments

1. **Fresh Installation Testing**
   - **Agent**: `drupal-sdc-validator`
   - **Task**: Verify clean installation from scratch works perfectly
   - **Environment**: Fresh DDEV environment, clean database
   - **Validate**: All functionality works without municipal dependencies
   - **Target**: Installation completes in under 10 minutes
   - **Deliverables**: Validated clean installation process
   - **Command**: `drupal-sdc-validator "Validate complete fresh installation of adessoCMS starter kit"`

2. **Automated Test Suite Implementation**
   - **Agent**: `debug-detective`
   - **Task**: Replace municipal test scenarios with generic CMS tests
   - **Include**: Functionality tests, performance tests, accessibility tests
   - **Remove**: All Bruchtal and Swiss-specific test scenarios
   - **Deliverables**: Comprehensive generic test coverage
   - **Command**: `debug-detective "Implement comprehensive test suite for generic adessoCMS functionality"`

3. **Performance Validation**
   - **Agent**: `debug-detective`
   - **Task**: Ensure no performance degradation from cleanup process
   - **Benchmark**: Compare performance before and after cleanup
   - **Optimize**: Address any performance issues discovered
   - **Deliverables**: Performance validation report and optimizations
   - **Command**: `debug-detective "Validate and optimize performance post-cleanup ensuring baseline maintenance"`

4. **Documentation Verification**
   - **Agent**: `adr-reviewer`
   - **Task**: Test all setup instructions work correctly on clean environment
   - **Validate**: Every documented step executes successfully
   - **Update**: Fix any documentation gaps or errors
   - **Deliverables**: Fully validated and tested documentation
   - **Command**: `adr-reviewer "Validate all documentation by testing on clean environment"`

5. **Final Quality Assurance**
   - **Agent**: `git-hygiene-enforcer`
   - **Task**: Final git cleanup and preparation for potential release
   - **Include**: Clean commit history, proper tags, release preparation
   - **Validate**: Repository ready for community use or distribution
   - **Deliverables**: Release-ready repository with clean history
   - **Command**: `git-hygiene-enforcer "Final repository cleanup and release preparation"`

#### Phase 4 Success Criteria
- [ ] Fresh installation completes successfully in under 10 minutes
- [ ] Comprehensive test suite passes with generic scenarios only
- [ ] Performance maintains or improves upon baseline metrics
- [ ] All documentation validated through clean environment testing
- [ ] Repository prepared for community release or distribution

## Risk Management and Mitigation Strategies

### Technical Risk Mitigation

**High-Risk Areas**:
1. **Configuration Dependencies** - Municipal content types with complex field relationships
   - **Mitigation**: Comprehensive dependency mapping before removal
   - **Agent**: `drupal-step-by-step-implementer` with dependency analysis
   - **Backup Strategy**: Full configuration and database backups

2. **Module Interdependencies** - Custom modules with hidden dependencies
   - **Mitigation**: Gradual removal with functionality testing at each step
   - **Agent**: `debug-detective` for dependency analysis and testing
   - **Rollback Plan**: Git-based rollback for each module removal

3. **Database Cleanup Orphans** - Removing municipal content may leave orphaned references
   - **Mitigation**: Database integrity checks and cleanup scripts
   - **Agent**: `drupal-step-by-step-implementer` with database validation
   - **Safety Net**: Complete database backup before cleanup

### Performance Risk Mitigation

**Asset Cleanup Strategy**:
- **Gradual File Removal**: Remove municipal media files in batches with validation
- **Database Optimization**: Post-cleanup database optimization and reindexing
- **Cache Management**: Comprehensive cache clearing and rebuilding
- **Agent**: `debug-detective` for performance monitoring throughout

### Quality Assurance Protocols

**Continuous Validation**:
- **Phase-End Testing**: Full functionality test at end of each phase
- **Automated Scanning**: Regular scans for remaining municipal references  
- **Performance Monitoring**: Baseline comparison throughout cleanup process
- **Documentation Updates**: Real-time documentation updates for each change

## Success Metrics and Validation

### Technical Success Indicators
- [ ] Fresh installation completes without errors in under 10 minutes
- [ ] Zero GPZH/municipal references found in automated scans
- [ ] All core CMS functionality works with generic content
- [ ] Performance maintains current baseline after cleanup
- [ ] All 8 core Claude Code agents function properly in generic context

### Usability Success Indicators  
- [ ] New developers can set up environment following documentation
- [ ] Generic demo content effectively showcases CMS capabilities
- [ ] Installation process requires no municipal-specific knowledge
- [ ] Community-ready for potential open-source release

### Quality Assurance Validation
- [ ] Comprehensive test suite passes with 100% generic scenarios
- [ ] WCAG 2.1 AA accessibility maintained without Swiss-specific requirements
- [ ] All documentation tested and validated on clean environments
- [ ] Git history clean and professionally documented

## Agent Execution Commands Summary

### Phase 1 Commands (Multi-agent orchestration)
```bash
# Discovery Phase
debug-detective "Scan entire codebase for municipal references: GPZH, ZH, Swiss, Thalwil, Thalheim, Erlenbach, Bruchtal, zh-demo, zh_demo"
drupal-step-by-step-implementer "Analyze custom modules in web/modules/custom/ for municipal dependencies"
drupal-step-by-step-implementer "Export and analyze Drupal configurations for municipal content"

# Cleanup Phase  
drupal-ui-designer "Remove municipal themes and create neutral adessoCMS base theme"
drupal-step-by-step-implementer "Clean municipal content from database while preserving architecture"
git-hygiene-enforcer "Commit Phase 1 cleanup with detailed change documentation"
```

### Phase 2 Commands (Multi-agent orchestration)
```bash
# Architecture Cleanup
drupal-step-by-step-implementer "Refactor zh_demo modules to generic adessoCMS functionality"
development-orchestrator "Clean Claude agent system: preserve 8 core agents, remove municipal specialists"
debug-detective "Replace municipal test scenarios with generic adessoCMS testing framework"

# Environment Cleanup
drupal-step-by-step-implementer "Replace all zh-demo references with adessoCMS throughout entire codebase"
drupal-step-by-step-implementer "Clean Drupal configuration sync of municipal references"
git-hygiene-enforcer "Update composer.json and project metadata for adessoCMS starter kit"
```

### Phase 3 Commands (Sequential execution)
```bash
# Documentation
adr-reviewer "Create comprehensive adessoCMS starter kit documentation"
adr-reviewer "Create detailed installation guide for fresh setup"
adr-reviewer "Document generic development workflow with Claude Code agents"

# Branding
drupal-ui-designer "Replace municipal branding with neutral adessoCMS visual identity"
storybook-component-curator "Create generic demo content showcasing adessoCMS capabilities"
```

### Phase 4 Commands (Sequential execution)
```bash
# Validation
drupal-sdc-validator "Validate complete fresh installation of adessoCMS starter kit"
debug-detective "Implement comprehensive test suite for generic adessoCMS functionality"
debug-detective "Validate and optimize performance post-cleanup"
adr-reviewer "Validate all documentation by testing on clean environment"
git-hygiene-enforcer "Final repository cleanup and release preparation"
```

## Post-Implementation Maintenance

### Ongoing Quality Assurance
- **Monthly Fresh Installation Tests**: Automated testing of clean installation process
- **Quarterly Documentation Reviews**: Keep setup guides current with Drupal updates
- **Performance Monitoring**: Baseline performance tracking and optimization
- **Community Feedback Integration**: If released as open-source, integrate community feedback

### Knowledge Management
- **ADR Updates**: Document architectural decisions made during cleanup
- **Pattern Documentation**: Document successful cleanup patterns for future projects
- **Agent Workflow Optimization**: Continuously improve agent coordination patterns
- **Community Contribution Guidelines**: Prepare for potential community contributions

## Conclusion

This implementation plan provides a systematic, agent-orchestrated approach to converting the GPZH municipal portal to a generic adessoCMS starter kit. The 4-phase strategy leverages the streamlined 8-agent Claude Code architecture to execute comprehensive cleanup while preserving valuable architectural innovations.

**Key Advantages**:
- **Risk-Managed Approach**: Phased execution with rollback capabilities at each stage
- **Agent Specialization**: Optimal use of Claude Code agent expertise for each task type
- **Quality Assurance**: Comprehensive testing and validation throughout the process
- **Community Ready**: Preparation for potential open-source release and community adoption

**Expected Outcomes**:
- Generic, reusable adessoCMS starter kit ready for any industry
- Preserved architectural innovations from municipal portal development
- Comprehensive documentation and development workflow
- Professional-grade repository ready for distribution or community use

The orchestrated execution using Claude Code agents ensures efficient, systematic cleanup while maintaining the high quality and architectural excellence demonstrated in the original municipal implementation.