# GPZH Jira Commands & Agent Configuration Reference

## 🎯 Complete Jira Integration for GPZH Multi-Site Project

This is the complete command reference and agent configuration for the GPZH (Gemeindeportale Zürich) project, replacing all Linear workflows with Jira-based task management.

## 📋 Project Configuration

### **Jira Project Details**
- **Project Key**: `GPZH` 
- **Project Name**: Gemeindeportale Zürich (GPZH)
- **Epic Structure**: Multi-site municipalities, AI features, Swiss compliance
- **Municipalities**: Thalwil, Thalheim, Erlenbach
- **Technology Stack**: Drupal 11, AI Integration, Swiss Compliance Standards

## 🎮 Core Jira Commands

### **Task Management Commands**
```bash
# Core Jira Workflow Commands (replace Linear equivalents)
@jira-list                    # List assigned GPZH tasks (was: @task-list)
@jira-start GPZH-XXX         # Start working on a Jira task (was: @task-start VEN-XXX)
@jira-complete GPZH-XXX      # Mark Jira task as completed (was: @task-complete VEN-XXX)
@jira-status GPZH-XXX        # Check Jira task status (was: @task-status VEN-XXX)
@jira-branch GPZH-XXX        # Create branch for Jira task (was: @task-branch VEN-XXX)

# Enhanced GPZH-specific commands
@jira-sync                   # Sync with Jira project status
@jira-search [query]         # Search GPZH tickets
@jira-assign GPZH-XXX [user] # Assign ticket to team member
@jira-comment GPZH-XXX "msg" # Add comment to ticket
@jira-transition GPZH-XXX [status] # Change ticket status
```

### **PR Creation Commands**
```bash
# Pull Request Commands with Jira Integration (replace Linear equivalents)
@jira-pr GPZH-XXX           # Create PR for Jira task (was: @pr-create VEN-XXX)
@pr-review                  # List PRs awaiting review  
@pr-status                  # Check PR status for current branch
@jira-pr-link GPZH-XXX      # Link existing PR to Jira ticket
@jira-pr-update GPZH-XXX    # Update PR with Jira acceptance criteria
```

### **Development Workflow Commands**
```bash
# GPZH Development Environment Commands (enhanced from @dev-start)
@gpzh-dev-start             # Start GPZH DDEV environment
@gpzh-demo-prep             # Prepare system for live demo
@gpzh-qa-full              # Run complete QA pipeline for 3 municipalities
@gpzh-ai-test              # Test AI features across all sites
@gpzh-build-check          # Check build status across municipalities
@gpzh-test-run             # Run GPZH-specific test suite
```

### **Multi-Site Commands**
```bash
# Municipality-Specific Commands
@gemeinde-switch [thalwil|thalheim|erlenbach]  # Switch to specific municipality
@multi-site-test GPZH-XXX   # Test feature across all 3 municipalities  
@demo-content-sync          # Sync demo content across sites
@municipality-config [site] # Configure municipality-specific settings
@site-performance-audit [site] # Audit specific municipality site
```

### **Cache and Configuration Commands**
```bash
# Drupal/GPZH Cache Commands (enhanced from @cache-clear)
@gpzh-cache-clear           # Clear cache across all municipalities
@content-sync-gpzh          # Sync content across GPZH sites
@admin-create-gpzh          # Create admin user for GPZH system
@config-export-gpzh GPZH-XXX # Export configuration for ticket
@config-import-gpzh GPZH-XXX # Import configuration for ticket
```

### **Branch Management Commands**
```bash
# Git Branch Commands with GPZH Integration (enhanced from @branch-*)
@gpzh-branch-sync           # Sync with main branch
@gpzh-branch-clean          # Clean up merged branches
@jira-branch-create GPZH-XXX # Create feature branch for ticket
@main-branch                # Switch to main branch (was: @relaunch)
```

## 🚀 Jira Integration Flags

### **Task State Flags**
```bash
# Jira Status Flags (replace Linear flags)
--todo                     # Set task to "To Do" status (was: --todo)
--in-progress             # Set task to "In Progress" status (was: --progress)
--review                  # Set task to "In Review" status (was: --review)  
--done                    # Set task to "Done" status (was: --done)
--blocked                 # Set task to "Blocked" status (was: --blocked)
```

### **GPZH-Specific Flags**
```bash
# Municipality Targeting Flags
--municipality [all|thalwil|thalheim|erlenbach]  # Target specific municipality
--all-sites               # Apply to all municipalities
--thalwil-only           # Thalwil municipality only
--thalheim-only          # Thalheim municipality only  
--erlenbach-only         # Erlenbach municipality only

# Feature-Specific Flags
--ai-features            # Include AI functionality testing
--demo-ready            # Prepare for presentation demo
--compliance-check      # Run Swiss compliance validation
--performance-audit     # Run Core Web Vitals testing
--accessibility-test    # Run WCAG 2.1 AA compliance
--multi-language       # Include multi-language testing (DE/FR/IT)
```

### **Development Workflow Flags**
```bash
# Branch Creation Flags (enhanced from previous flags)
--from-main             # Create branch from main (was: --from-relaunch)
--sync                  # Sync with remote before creating branch
--clean                 # Clean working directory first
--municipality-specific # Create municipality-specific branch

# Testing Flags (enhanced from previous flags)
--skip-tests           # Skip automated tests (use with caution)
--lighthouse           # Run Lighthouse performance tests
--accessibility        # Run accessibility tests only
--quick                # Run quick test suite only
--full-gpzh-suite     # Run complete GPZH testing suite

# PR Creation Flags (enhanced from previous flags)
--draft                # Create as draft PR
--review-required      # Require @claude review before merge (default for GPZH)
--no-auto-merge       # Disable auto-merge (default for GPZH)  
--acceptance-criteria # Auto-copy Jira acceptance criteria
--demo-evidence       # Include demo screenshots/videos
```

### **DDEV Environment Flags**
```bash
# DDEV Startup Flags (enhanced from previous flags)
--fresh                # Fresh start with cache clear
--build                # Rebuild containers from scratch
--no-deps             # Skip dependency installation
--demo-mode           # Prepare for live demo presentation

# Database Flags (enhanced from previous flags)
--import-db           # Import fresh database
--migrate             # Run migrations only
--seed-demo-content   # Run database seeders with demo content
--multi-site-sync     # Sync database across municipalities
```

## 🤖 AI-Enhanced Commands

### **AI Integration Commands**
```bash
# AI Content Generation
@ai-content-generate "topic" --municipality=[site] --ticket=GPZH-XXX
@ai-translate de-fr "content" --municipality=[site] --ticket=GPZH-XXX
@ai-alt-text-generate "image.jpg" --municipality=[site] --ticket=GPZH-XXX
@ai-moderate-content "content" --compliance=swiss --ticket=GPZH-XXX

# AI Testing and Validation  
@ai-test-suite GPZH-XXX      # Test all AI features for ticket
@ai-performance-check        # Check AI feature performance impact
@ai-compliance-verify        # Verify AI features meet Swiss compliance
```

## 🏗️ Agent Configuration Updates

### **Specialized Agent Assignments for GPZH**

#### **Multi-Site Development Agents**
```yaml
Multi-Site_CMS_Development:
  Primary: "@drupal-cms-suite-specialist"
  Secondary: "@drupal-multisite-architect"
  Tasks:
    - Multi-site architecture implementation
    - Municipality-specific configuration
    - Cross-site content synchronization
    - Performance optimization for multiple sites

Municipality_Theme_Development:
  Primary: "@drupal-frontend-theming-specialist"  
  Secondary: "@sdc-component-specialist"
  Tasks:
    - Municipality-specific theming (Thalwil/Thalheim/Erlenbach)
    - Responsive design for different municipal needs
    - Brand consistency across sites
    - Component library maintenance
```

#### **AI Integration Agents**
```yaml
AI_Content_Management:
  Primary: "@drupal-ai-integration-specialist"
  Secondary: "@ai-safety-content-moderation-specialist"
  Tasks:
    - AI content generation for municipal communications
    - Multi-language AI translation (DE/FR/IT)
    - AI-powered accessibility improvements
    - Content moderation and safety checks

Swiss_Compliance_AI:
  Primary: "@german-market-compliance-specialist"
  Secondary: "@ai-safety-content-moderation-specialist"
  Tasks:
    - DSGVO/CH-DSG compliance for AI features
    - Swiss administrative language optimization
    - Privacy-compliant AI implementations
    - Data processing consent management
```

#### **Swiss Compliance & Accessibility Agents**
```yaml
Swiss_Public_Sector_Compliance:
  Primary: "@german-market-compliance-specialist"
  Secondary: "@security-auditor"
  Tasks:
    - DSGVO + CH-DSG implementation
    - eCH-0059 accessibility standards
    - Public sector security requirements
    - Audit trail and documentation

Accessibility_Excellence:
  Primary: "@qa-testing-specialist"
  Secondary: "@drupal-accessibility-expert"
  Tasks:
    - WCAG 2.1 AA compliance testing
    - eCH-0059 Swiss accessibility standards
    - Screen reader compatibility
    - Multi-language accessibility
```

#### **Performance & Quality Assurance Agents**
```yaml
GPZH_Performance_Optimization:
  Primary: "@drupal-performance-specialist"
  Secondary: "@frontend-performance-optimizer"
  Tasks:
    - Core Web Vitals optimization across municipalities
    - Multi-site performance monitoring
    - Asset optimization and caching strategies
    - Mobile-first performance tuning

Quality_Assurance_GPZH:
  Primary: "@qa-testing-specialist"
  Secondary: "@drupal-technical-support-lead"
  Tasks:
    - Multi-site testing automation
    - Cross-browser compatibility testing
    - Demo preparation and validation
    - Regression testing across municipalities
```

## 📊 Workflow Integration Patterns

### **Jira-to-Agent Routing Rules**

#### **Content & AI Features**
```yaml
Ticket_Pattern: "GPZH-.*AI.*|GPZH-.*Content.*|GPZH-.*Translation.*"
Primary_Agent: "@drupal-ai-integration-specialist"
Secondary_Agent: "@ai-safety-content-moderation-specialist"
Commands_Available:
  - "@ai-content-generate"
  - "@ai-translate"
  - "@ai-moderate-content"
```

#### **Multi-Site & Municipality Features**
```yaml
Ticket_Pattern: "GPZH-.*Multi.*|GPZH-.*Municipality.*|GPZH-.*(Thalwil|Thalheim|Erlenbach).*"
Primary_Agent: "@drupal-cms-suite-specialist"
Secondary_Agent: "@drupal-multisite-architect"
Commands_Available:
  - "@gemeinde-switch"
  - "@multi-site-test"
  - "@municipality-config"
```

#### **Theme & Frontend Features**
```yaml
Ticket_Pattern: "GPZH-.*Theme.*|GPZH-.*Frontend.*|GPZH-.*Component.*"
Primary_Agent: "@drupal-frontend-theming-specialist"
Secondary_Agent: "@sdc-component-specialist"
Commands_Available:
  - "@jira-theme-start"
  - "@jira-component-create"
  - "@jira-storybook-update"
```

#### **Compliance & Security Features**
```yaml
Ticket_Pattern: "GPZH-.*Compliance.*|GPZH-.*Security.*|GPZH-.*DSGVO.*|GPZH-.*Accessibility.*"
Primary_Agent: "@german-market-compliance-specialist"
Secondary_Agent: "@security-auditor"
Commands_Available:
  - "@compliance-check"
  - "@accessibility-audit"
  - "@security-scan"
```

## 🔄 Migration from Linear Commands

### **Command Mapping Table**
```yaml
Linear_Command → GPZH_Jira_Command:
  "@task-list" → "@jira-list"
  "@task-start VEN-XXX" → "@jira-start GPZH-XXX"
  "@task-complete VEN-XXX" → "@jira-complete GPZH-XXX"
  "@task-status VEN-XXX" → "@jira-status GPZH-XXX"
  "@task-branch VEN-XXX" → "@jira-branch GPZH-XXX"
  "@pr-create VEN-XXX" → "@jira-pr GPZH-XXX"
  "@dev-start" → "@gpzh-dev-start"
  "@qa-full" → "@gpzh-qa-full"
  "@build-check" → "@gpzh-build-check"
  "@test-run" → "@gpzh-test-run"
  "@cache-clear" → "@gpzh-cache-clear"
  "@content-sync" → "@content-sync-gpzh"
  "@admin-create" → "@admin-create-gpzh"
  "@branch-sync" → "@gpzh-branch-sync"
  "@branch-clean" → "@gpzh-branch-clean"
  "@relaunch" → "@main-branch"
```

## 🎯 Example Usage Scenarios

### **Scenario 1: New Municipality Feature Development**
```bash
# Start work on new feature for Thalwil
@jira-start GPZH-123
@jira-branch GPZH-123
@gemeinde-switch thalwil
@gpzh-dev-start

# Develop and test
@jira-theme-start GPZH-123
@ai-content-generate "Municipal news template" --municipality=thalwil --ticket=GPZH-123
@multi-site-test GPZH-123 --municipality=thalwil

# Create PR with acceptance criteria
@jira-pr GPZH-123 --acceptance-criteria --demo-evidence
```

### **Scenario 2: AI Feature Enhancement Across All Sites**
```bash
# Start AI enhancement ticket
@jira-start GPZH-456
@jira-branch GPZH-456
@gpzh-dev-start --ai-features

# Test AI across municipalities
@ai-test-suite GPZH-456
@multi-site-test GPZH-456 --all-sites --ai-features
@compliance-check --ai-features --swiss-standards

# Create comprehensive PR
@jira-pr GPZH-456 --ai-features --compliance-check
```

### **Scenario 3: Demo Preparation**
```bash
# Prepare for GPZH live demo
@gpzh-demo-prep
@demo-content-sync
@gpzh-qa-full --demo-ready --performance-audit
@accessibility-test --all-sites --wcag-2.1-aa
@ai-test-suite --demo-scenarios
```

## 📚 Documentation Integration

### **Jira Ticket Templates**

#### **Feature Development Template**
```markdown
## GPZH Feature: [Feature Name]
**Municipality**: [Thalwil|Thalheim|Erlenbach|All]
**Type**: [Frontend|Backend|AI|Compliance|Multi-Site]

### Acceptance Criteria
- [ ] Feature works in targeted municipality/municipalities
- [ ] AI integration tested (if applicable)
- [ ] Swiss compliance maintained
- [ ] Performance <2s load time
- [ ] WCAG 2.1 AA accessibility verified
- [ ] Multi-language support (if applicable)

### Technical Requirements
- Drupal 11 compatibility
- Multi-site architecture support
- AI provider integration (if applicable)
- Swiss data protection compliance

### Testing Requirements
- [ ] Unit tests passing
- [ ] Integration tests across municipalities
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Demo scenarios prepared
```

---

*This command reference replaces all Linear-based workflows with comprehensive Jira integration optimized for the GPZH multi-site municipality portal system.*