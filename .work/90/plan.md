# Implementation Plan: GPZH Content Removal and adessoCMS Starter Kit Conversion

**Issue Reference**: [#90 - Complete removal of GPZH-specific content to restore general adessoCMS starter kit](https://github.com/maphilipps/ZH-DEMO/issues/90)
**Planning Date**: 2025-09-06
**Research Base**: `.work/research/research-90.md`
**Execution Timeline**: 6 weeks (4 phases)

## Executive Summary

Based on comprehensive research findings, this plan orchestrates the systematic conversion of this GPZH municipal portal repository to a generic adessoCMS starter kit. The plan leverages 23 available Claude Code agents to execute a 4-phase cleanup strategy, targeting **581 municipal references across 31 files** while preserving the strong architectural foundations (95% component library genericization and streamlined agent architecture).

## Status Quo: Current State Analysis

### Existing Implementation Assessment

**Successfully Genericized (Strong Foundation)**:
- **Component Library**: 95% complete - 50+ components in `web/themes/custom/adesso_cms_theme/components/` successfully converted
- **Main Theme Structure**: 90% complete - Base `adesso_cms_theme` with proper SDC architecture established
- **Module Naming Pattern**: 60% complete - `adesso_cms_*` prefix pattern successfully established
- **Agent Architecture**: 100% complete - Streamlined to 8 core agents from original 46

**Remaining Municipal References (High Priority)**:
```
DDEV Configuration:     .ddev/config.yaml (zh-demo project name, GPZH environment variables)
Municipal Themes:       web/themes/custom/zh_thalwil/, web/themes/custom/zh_thalheim/ 
Module Namespaces:      municipal_ai_agents, zh_demo_editorial_workflow, event_review
Documentation:          CLAUDE.md, llms.txt, README.md (Swiss/Zürich references)
CI/CD Configuration:    .gitlab-ci.yml (GPZH-specific comments and descriptions)
Build Configuration:    package-lock.json, playwright-screenshots.js (hardcoded URLs)
```

**Architecture Constraints**:
- **Current System**: Drupal 11, PHP 8.3, Node.js 20, MariaDB 10.11 (✅ Up-to-date)
- **Development Environment**: DDEV with Vite + Tailwind CSS v4 (✅ Modern)
- **Integration Points**: Configuration management via Drupal recipes, SDC with Storybook
- **Quality Standards**: WCAG 2.1 AA accessibility, Swiss government compliance maintained

## Best Practices: Research-Informed Approach

### Official Drupal 11 Standards

**Module Refactoring Best Practices** (Context7):
```yaml
# Recommended namespace pattern
From: municipal_ai_agents
To:   adesso_cms_ai_agents
Structure:
  - {module_name}.services.yml (service configuration)
  - .info.yml with proper dependencies
  - Service names prefixed with module name
```

**Starterkit Theme Standards**:
```yaml
# .starterkit.yml configuration
name: 'adesso CMS Theme'
description: 'Professional CMS theme for business applications'
excluded:
  - '.gitignore'
  - node_modules/
  - package-lock.json
non_editable:
  - 'adesso_cms_theme.info.yml'
```

**DDEV Configuration Security**:
```yaml
# Secure environment management
PROJECT_NAME: adesso-cms
DATABASE_URL: ${DATABASE_URL}  # Variable substitution for sensitive values
# Remove: GPZH_DEMO_MODE, ZH_MUNICIPALITY_CONFIG
```

### Industry Best Practices (Web Research)

**Municipal Portal Genericization Patterns**:
- **Component-First Cleanup**: Start with UI components, work backward to data (proven effective)
- **Automated Reference Scanning**: Regular searches for municipal terms throughout process
- **Phased Refactoring**: Phase-by-phase namespace updates with testing at each step
- **Documentation-Driven Development**: Update docs during cleanup, not after

**Drupal Community Tools**:
```bash
# Proven cleanup tools from community
composer require drupal/module_cleanup      # Orphaned module data removal
composer require drupal/field_usage_tracker # Field dependency mapping
composer require drupal/content_type_audit  # Content structure analysis
composer require drupal/site_audit         # Configuration validation
```

## Proposed Implementation: Agent-Orchestrated 4-Phase Strategy

Based on the status quo assessment and best practices research, this implementation plan deploys optimal agent combinations for systematic GPZH cleanup while preserving architectural excellence.

## Agent Execution Matrix

| Phase | Primary Agent | Supporting Agents | Execution Type | Handoff Protocol |
|-------|---------------|------------------|----------------|------------------|
| **Phase 1** | `codebase-analyzer` | `codebase-pattern-finder`, `adr-reviewer` | Parallel Analysis | Research findings → Planning input |
| **Phase 2** | `drupal-migration-architect` | `drupal-implementation-planner`, `development-orchestrator` | Sequential Planning | Migration strategy → Implementation plan |
| **Phase 3** | `drupal-step-by-step-implementer` | `drupal-ui-designer`, `debug-detective`, `git-hygiene-enforcer` | Multi-agent Orchestration | Real-time coordination with validation |
| **Phase 4** | `drupal-compliance-auditor` | `drupal-sdc-validator`, `debug-detective`, `git-hygiene-enforcer` | Sequential Validation | Quality gates → Release preparation |

## Phase-by-Phase Agent Assignments

### Phase 1: Content Auditing and Analysis (Weeks 1-2)
**Duration**: 10 working days | **Risk Level**: Medium | **Execution**: Parallel Analysis

#### **Primary Agent: `codebase-analyzer`** (Analysis)
- **Input Requirements**: Complete codebase access, research findings from previous analysis
- **Output Deliverables**: 
  - Comprehensive reference catalog (581 occurrences mapped to specific files:lines)
  - Module dependency analysis for `municipal_ai_agents`, `zh_demo_editorial_workflow`
  - Configuration dependency mapping for DDEV and Drupal settings
- **Success Criteria**: 
  - [ ] Complete inventory of all GPZH/municipal references with file:line precision
  - [ ] Dependency impact analysis for each module requiring refactoring
  - [ ] Zero false positives in reference detection
- **Dependencies**: None (initial analysis agent)

#### **Supporting Agent: `codebase-pattern-finder`** (Analysis)
- **Input Requirements**: Reference catalog from `codebase-analyzer`
- **Output Deliverables**:
  - Successful genericization patterns from existing cleanup (95% component library)
  - Reusable refactoring approaches from `zh_demo_blocks` → `adesso_cms_blocks` conversion
  - Template patterns for namespace updates and configuration changes
- **Success Criteria**:
  - [ ] Document proven patterns from existing successful genericization
  - [ ] Extract reusable templates for remaining module refactoring
  - [ ] Identify potential conflict patterns requiring special handling
- **Dependencies**: Analysis results from `codebase-analyzer`

#### **Quality Agent: `adr-reviewer`** (Documentation)
- **Input Requirements**: Analysis findings from both analysis agents
- **Output Deliverables**:
  - Architecture Decision Record for cleanup approach
  - Risk assessment with mitigation strategies
  - Quality gate definitions for subsequent phases
- **Success Criteria**:
  - [ ] Complete ADR documenting cleanup strategy rationale
  - [ ] Risk assessment covering all identified technical and performance risks
  - [ ] Phase transition criteria clearly defined
- **Dependencies**: Combined findings from analysis phase

### Phase 2: Migration Architecture and Planning (Weeks 3-4)
**Duration**: 10 working days | **Risk Level**: High | **Execution**: Sequential Planning

#### **Primary Agent: `drupal-migration-architect`** (Domain-Specific)
- **Input Requirements**: Phase 1 analysis results, existing configuration exports
- **Output Deliverables**:
  - Data migration strategy for municipal content to generic content
  - Database cleanup plan preserving content architecture
  - Module namespace refactoring sequence (`municipal_ai_agents` → `adesso_cms_ai_agents`)
- **Success Criteria**:
  - [ ] Zero-data-loss migration plan for municipal content transformation
  - [ ] Comprehensive database cleanup strategy with rollback procedures
  - [ ] Module refactoring sequence tested on development branch
- **Dependencies**: Complete analysis from Phase 1

#### **Supporting Agent: `drupal-implementation-planner`** (Domain-Specific)
- **Input Requirements**: Migration architecture, component library status, DDEV requirements
- **Output Deliverables**:
  - Step-by-step implementation plan for infrastructure changes
  - DDEV configuration update strategy (`zh-demo` → `adesso-cms`)
  - Theme removal plan for `zh_thalwil` and `zh_thalheim`
- **Success Criteria**:
  - [ ] Detailed implementation steps with validation checkpoints
  - [ ] DDEV configuration changes tested and validated
  - [ ] Theme removal strategy preserves component library functionality
- **Dependencies**: Migration architecture from `drupal-migration-architect`

#### **Orchestration Agent: `development-orchestrator`** (Meta)
- **Input Requirements**: Implementation plan, available agent capabilities, timeline constraints
- **Output Deliverables**:
  - Multi-agent coordination strategy for Phase 3 implementation
  - Agent handoff protocols and data exchange formats
  - Error handling and recovery procedures
- **Success Criteria**:
  - [ ] Complete agent orchestration plan for complex Phase 3 execution
  - [ ] Defined handoff protocols ensuring data consistency between agents
  - [ ] Recovery procedures for each potential failure point
- **Dependencies**: Implementation plan from `drupal-implementation-planner`

### Phase 3: Implementation and Refactoring (Weeks 5-6)
**Duration**: 10 working days | **Risk Level**: High | **Execution**: Multi-agent Orchestration

#### **Primary Agent: `drupal-step-by-step-implementer`** (Domain-Specific)
- **Input Requirements**: Migration plan, orchestration strategy, backup procedures
- **Output Deliverables**:
  - Complete module namespace refactoring with functional testing
  - DDEV configuration updates with environment validation
  - Database cleanup execution with integrity verification
- **Success Criteria**:
  - [ ] All modules successfully refactored to `adesso_cms_*` namespace
  - [ ] DDEV environment fully operational with `adesso-cms` configuration
  - [ ] Database cleanup completed with zero orphaned references
- **Dependencies**: Phase 2 planning and orchestration strategy

#### **Supporting Agent: `drupal-ui-designer`** (Domain-Specific)
- **Input Requirements**: Theme removal plan, component library status, branding requirements
- **Output Deliverables**:
  - Complete removal of `zh_thalwil` and `zh_thalheim` themes
  - Visual branding neutralization (remove Canton Zurich logos and Swiss-specific elements)
  - Generic demo content creation replacing municipal scenarios
- **Success Criteria**:
  - [ ] Municipal themes completely removed without component library impact
  - [ ] All visual branding neutralized to professional, generic appearance
  - [ ] Demo content showcases generic CMS capabilities effectively
- **Dependencies**: Coordination with `drupal-step-by-step-implementer` for theme integration

#### **Supporting Agent: `debug-detective`** (Quality Assurance)
- **Input Requirements**: Real-time implementation status, error logs, performance metrics
- **Output Deliverables**:
  - Issue resolution during refactoring process
  - Performance impact analysis and optimization recommendations
  - Automated testing validation for each refactoring step
- **Success Criteria**:
  - [ ] All implementation issues resolved within 24-hour SLA
  - [ ] Performance baseline maintained or improved throughout refactoring
  - [ ] Automated tests passing at each major refactoring milestone
- **Dependencies**: Real-time coordination with implementation agents

#### **Supporting Agent: `git-hygiene-enforcer`** (Quality Assurance)
- **Input Requirements**: Implementation progress, commit staging requirements, branching strategy
- **Output Deliverables**:
  - Clean commit history documenting each refactoring step
  - Branch management for parallel development streams
  - Release preparation with proper tagging and documentation
- **Success Criteria**:
  - [ ] Clean, well-documented commit history for entire refactoring process
  - [ ] Proper branch management enabling rollback at any point
  - [ ] Repository prepared for community release or distribution
- **Dependencies**: Continuous coordination with all implementation agents

### Phase 4: Testing and Validation (Week 7)
**Duration**: 5 working days | **Risk Level**: Medium | **Execution**: Sequential Validation

#### **Primary Agent: `drupal-compliance-auditor`** (Compliance)
- **Input Requirements**: Completed genericization, original compliance requirements
- **Output Deliverables**:
  - WCAG 2.1 AA accessibility compliance validation
  - Swiss government standards compliance (maintained without GPZH specifics)
  - Automated compliance monitoring setup for ongoing validation
- **Success Criteria**:
  - [ ] Full WCAG 2.1 AA compliance maintained post-genericization
  - [ ] Swiss government standards compliance verified without municipal specifics
  - [ ] Compliance monitoring integrated into development workflow
- **Dependencies**: Complete implementation from Phase 3

#### **Supporting Agent: `drupal-sdc-validator`** (Quality Assurance)
- **Input Requirements**: Genericized component library, SDC architecture standards
- **Output Deliverables**:
  - Component architecture validation and optimization recommendations
  - Performance analysis ensuring no degradation from cleanup
  - SDC best practices compliance verification
- **Success Criteria**:
  - [ ] All components pass SDC architecture validation
  - [ ] Performance baseline maintained or improved
  - [ ] Component library ready for community use and contribution
- **Dependencies**: UI changes from Phase 3 implementation

#### **Supporting Agent: `debug-detective`** (Quality Assurance)
- **Input Requirements**: Fresh installation requirements, automated test suite
- **Output Deliverables**:
  - Fresh installation validation (target: <10 minutes)
  - Comprehensive test suite for generic CMS functionality
  - Performance optimization recommendations based on cleanup analysis
- **Success Criteria**:
  - [ ] Fresh installation completes successfully in under 10 minutes
  - [ ] Comprehensive test coverage for all generic functionality
  - [ ] Performance optimizations implemented and validated
- **Dependencies**: Complete genericization from previous phases

#### **Quality Agent: `adr-reviewer`** (Documentation)
- **Input Requirements**: Complete implementation results, lessons learned, community readiness
- **Output Deliverables**:
  - Final architecture review and validation
  - Updated documentation reflecting generic starter kit status
  - Community contribution guidelines and release preparation
- **Success Criteria**:
  - [ ] Architecture review confirms successful genericization
  - [ ] Documentation comprehensive and validated through testing
  - [ ] Repository prepared for potential open-source community release
- **Dependencies**: Complete validation from all Phase 4 agents

## Risk Management and Mitigation Strategies

### Technical Risk Mitigation

**High-Risk Areas with Agent-Specific Solutions**:

1. **Configuration Dependencies** (Complex field relationships)
   - **Primary Mitigation Agent**: `drupal-migration-architect`
   - **Supporting Analysis**: `codebase-analyzer` for dependency mapping
   - **Backup Strategy**: `git-hygiene-enforcer` for comprehensive rollback capability

2. **Module Interdependencies** (Hidden dependencies between custom modules)
   - **Primary Mitigation Agent**: `debug-detective` for dependency analysis and testing
   - **Supporting Planning**: `drupal-implementation-planner` for gradual refactoring sequence
   - **Continuous Validation**: `drupal-step-by-step-implementer` with functionality testing

3. **Database Cleanup Orphans** (Municipal content removal creating orphaned references)
   - **Primary Mitigation Agent**: `drupal-migration-architect` with integrity checks
   - **Supporting Validation**: `drupal-compliance-auditor` for data consistency verification
   - **Safety Protocol**: Complete database backup before each phase

### Performance Risk Mitigation

**Agent-Coordinated Performance Management**:
- **Monitoring Agent**: `debug-detective` for continuous performance analysis
- **Optimization Agent**: `drupal-sdc-validator` for component performance validation
- **Baseline Management**: `adr-reviewer` for performance requirement documentation

### Quality Assurance Protocols

**Multi-Agent Quality Gates**:
- **Phase-End Validation**: `adr-reviewer` documents quality gate passage
- **Continuous Integration**: `git-hygiene-enforcer` enforces quality standards in commits
- **Compliance Maintenance**: `drupal-compliance-auditor` ensures standards throughout process

## Success Metrics and Validation Criteria

### Technical Success Indicators
- [ ] **Reference Elimination**: Zero GPZH/municipal references in automated scans (`codebase-analyzer`)
- [ ] **Fresh Installation**: Complete setup in <10 minutes (`debug-detective` validation)
- [ ] **Functionality Preservation**: All core CMS functionality operational (`drupal-step-by-step-implementer`)
- [ ] **Performance Baseline**: Maintained or improved performance metrics (`debug-detective`)
- [ ] **Agent Compatibility**: All 8 core Claude Code agents function properly post-cleanup

### Usability Success Indicators
- [ ] **Developer Onboarding**: New developers productive in <30 minutes (`adr-reviewer` documentation)
- [ ] **Demo Content Quality**: Generic content effectively showcases CMS capabilities (`drupal-ui-designer`)
- [ ] **Installation Simplicity**: No municipal-specific knowledge required (`drupal-implementation-planner`)
- [ ] **Community Readiness**: Repository suitable for open-source release (`git-hygiene-enforcer`)

### Quality Assurance Validation
- [ ] **Accessibility Compliance**: WCAG 2.1 AA maintained (`drupal-compliance-auditor`)
- [ ] **Test Coverage**: 100% generic scenarios covered (`debug-detective`)
- [ ] **Documentation Quality**: All setup instructions validated on clean environment (`adr-reviewer`)
- [ ] **Repository Quality**: Professional git history and release preparation (`git-hygiene-enforcer`)

## Implementation Prerequisites

### Required Agent Dependencies

**Development Environment Setup**:
```bash
# DDEV and development tools
ddev --version  # Latest with PHP 8.3 support
node --version  # v20+ for theme development
composer --version  # v2+ with corepack enabled
```

**Drupal Cleanup Modules** (for agent tool integration):
```bash
composer require drupal/module_cleanup       # For drupal-migration-architect
composer require drupal/field_usage_tracker  # For codebase-analyzer
composer require drupal/content_type_audit   # For drupal-compliance-auditor  
composer require drupal/site_audit          # For drupal-sdc-validator
composer require drupal/revision_cleanup     # For debug-detective
```

### Agent Coordination Infrastructure

**Multi-Agent Communication**:
- **Shared Context**: `.work/90/` directory for agent handoffs
- **Status Tracking**: Real-time progress updates in shared documentation
- **Error Handling**: Standardized error reporting format for `debug-detective`
- **Quality Gates**: Automated validation checkpoints between phases

### Database and Configuration Changes

**Preservation Strategy** (coordinated by `drupal-migration-architect`):
- Maintain existing content types structure
- Preserve field configurations and relationships  
- Keep paragraph types and component configurations
- Replace demo content with generic scenarios

## Expected Outcomes

### Technical Foundation
- **Generic adessoCMS Starter Kit**: Professional, reusable foundation for municipal projects
- **Component Library**: 100% genericized component library ready for community contribution
- **Development Workflow**: Streamlined 8-agent architecture optimized for efficient development
- **Quality Standards**: WCAG 2.1 AA accessibility and Swiss government standards maintained

### Agent Orchestration Excellence
- **Proven Multi-Agent Workflow**: Validated patterns for complex refactoring projects
- **Quality Gate Integration**: Automated validation ensuring professional outcomes
- **Documentation Excellence**: Comprehensive ADRs capturing architectural decisions
- **Community Readiness**: Repository prepared for potential open-source distribution

### Knowledge Management
- **Compound Learning Integration**: All cleanup patterns documented for future reuse
- **Context Evolution**: CLAUDE.md updated with proven genericization approaches
- **Quality Gate Evolution**: Enhanced validation procedures for future projects
- **Agent Workflow Optimization**: Refined multi-agent coordination patterns

This implementation plan provides a systematic, agent-orchestrated approach to converting the GPZH municipal portal to a professional adessoCMS starter kit. The 4-phase strategy leverages 23 available Claude Code agents with optimal specialization for each task type, ensuring comprehensive cleanup while preserving the architectural excellence and modern development workflow that make this repository valuable as a generic CMS foundation.

## Next Steps

1. **Plan Validation**: Review this plan with `drupal-plan-reviewer` agent for architectural soundness
2. **Agent Readiness**: Validate all required agents are available and properly configured
3. **Environment Preparation**: Ensure DDEV, development tools, and Drupal cleanup modules are ready
4. **Phase 1 Initiation**: Begin with `codebase-analyzer` comprehensive reference scanning
5. **Progress Tracking**: Maintain real-time status updates in `.work/90/progress.md`

The orchestrated execution using specialized Claude Code agents ensures efficient, systematic cleanup while maintaining the high quality and architectural excellence demonstrated in the current municipal implementation.