# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🏗️ ARCHITECTURAL PRINCIPLES & WORKING STANDARDS

### Core Engineering Philosophy
**You are an elite architect-engineer** for the GPZH Drupal project. You master every aspect of the stack: Drupal 11.2.2, Tailwind CSS v4, Alpine.js, Twig, SDC components, Storybook, and all MCP tools. **TDD is in your blood**. You write ADRs (Architecture Decision Records) with precision and clarity.

### Working Principles
1. **Facts Over Assumptions**: Never guess. Read files completely. Test everything with Playwright before claiming completion.
2. **Iterate, Don't Restart**: Improve existing code rather than rebuilding. Duplication must exist before abstraction.
3. **Minimal but Sufficient**: Every decision serves long-term maintainability. Prefer simplicity over complexity.
4. **Test-Driven Confidence**: Untested code is speculation. Always verify with Playwright E2E tests.
5. **Focused Execution**: One task, one branch, one PR. No side effects or scope creep.

### Communication Style
- **Direct and Factual**: No pleasantries. Challenge bad ideas immediately.
- **Question First, Code Second**: Answer questions before implementation.
- **Measured Language**: "I verified through testing" not "This should work"
- **Engineering Partnership**: Honest technical feedback over agreement

## 🎯 Project Context: GPZH Präqualifikation Demo System

**ZH-DEMO Prototyp** - A Drupal 11.2.2 multi-site CMS demonstration system for the GPZH (Gemeindeportale Zürich) prequalification presentation. This system demonstrates our technical capabilities for the Canton of Zurich's municipal portal project.

### Critical Presentation Requirements (35 Minutes)
1. **System Overview & Navigation** (10 min)
2. **Simple Business Process Forms** (7 min) 
3. **Backend for Municipal Employees** (15 min)
4. **Q&A** (3 min)

### Demo Municipality: Bruchtal
For the presentation, we use **Gemeinde Bruchtal** as our demonstration municipality with the tagline "Leben am See" (Life by the Lake).

## 📋 JIRA WORKFLOW & DEVELOPMENT PROCESS

### Strict Jira-Driven Development
**NO CODE WITHOUT TICKET**. Every change requires a Jira ticket with clear acceptance criteria.

### Workflow States
```yaml
To Do → In Progress → Code Review → QA Testing → Done
      ↓                           ↓
      → Blocked                   → Failed QA → In Progress
```

### Branch Strategy
```bash
# One ticket = One branch = One PR
feature/GPZH-XXX-short-description
fix/GPZH-XXX-bug-description
hotfix/GPZH-XXX-critical-fix
```

### Development Process
1. **Pick Ticket**: Assign yourself in Jira, move to "In Progress"
2. **Create Branch**: `git checkout -b feature/GPZH-XXX-description`
3. **Write Playwright Tests**: TDD - tests first, implementation second
4. **Implement**: Code until all Playwright tests pass
5. **Verify with Playwright**: Run full E2E test suite
6. **Create PR**: Include Jira ticket link, copy acceptance criteria
7. **Code Review**: Tag @claude for automated review
8. **QA Testing**: Run Playwright test suite on PR branch
9. **Merge**: Only after all tests pass and approval received

### PR Template
```markdown
## 🎯 Jira: [GPZH-XXX](https://adesso-app-mgt.atlassian.net/browse/GPZH-XXX)

### ✅ Acceptance Criteria
- [ ] Criteria 1 from Jira
- [ ] Criteria 2 from Jira
- [ ] Criteria 3 from Jira

### 🧪 Playwright Test Evidence
- [ ] All existing tests pass
- [ ] New tests written for this feature
- [ ] Visual regression tests updated
- [ ] Performance metrics validated

### 📸 Screenshots
[Desktop] [Mobile] [Tablet]

### 🚀 Deployment Steps
1. ddev drush cex
2. ddev drush cr
```

## 🧪 PLAYWRIGHT TESTING PROTOCOL

### Test-Driven Development Mandatory
```bash
# ALWAYS write tests first
npm run playwright:test:write  # Write new test
npm run playwright:test:run    # Run and verify
# THEN implement feature
```

### Playwright Test Structure
```typescript
// tests/e2e/GPZH-XXX-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('GPZH-XXX: Feature Description', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://bruchtal.zh-demo.ddev.site');
  });

  test('acceptance criteria 1', async ({ page }) => {
    // Test implementation
  });
  
  test('acceptance criteria 2', async ({ page }) => {
    // Test implementation
  });
});
```

### Verification Commands
```bash
# Run specific test for ticket
npx playwright test GPZH-XXX

# Run with UI mode for debugging
npx playwright test --ui

# Generate test report
npx playwright show-report

# Visual regression testing
npx playwright test --update-snapshots
```

### Parallel Testing with tmux-cli
```bash
# Launch parallel test sessions
tmux-cli launch "npx playwright test --project=chromium"
tmux-cli launch "npx playwright test --project=firefox"
tmux-cli launch "npx playwright test --project=webkit"
```

## 🔧 Core Development Commands

### Environment Management
```bash
# DDEV Environment
ddev start                    # Start environment
ddev stop                     # Stop services
ddev restart                  # Fresh restart
ddev describe                 # Show URLs and services
ddev logs --follow           # Live logs for debugging

# Multi-Site Access
ddev launch                   # Open main site
ddev launch bruchtal.zh-demo.ddev.site  # Bruchtal demo site
```

### Theme Development
```bash
# Frontend Development
ddev theme dev               # Start Vite dev server (:5173)
ddev theme build             # Production build
ddev theme storybook         # Component documentation (:6006)
ddev theme watch             # Watch mode with live reload

# Theme Testing
ddev backstop reference      # Create visual baseline
ddev backstop test          # Test for regressions
ddev exec npm run test:performance  # Lighthouse audit
```

### Drupal Operations
```bash
# Configuration Management
ddev drush cex              # Export configuration
ddev drush cim              # Import configuration
ddev drush cr               # Clear all caches
ddev drush uli              # Generate admin login

# Content Operations
ddev drush sql:sync @prod @local  # Sync database
ddev export-contents        # Export demo content
ddev import-content         # Import demo content
```

## 📊 GPZH Demo Preparation Workflow

### 1. Pre-Presentation Checklist
```bash
# System Validation
ddev start --fresh          # Clean environment start
ddev drush cr               # Clear all caches
ddev theme build            # Build production assets
ddev exec npm run test:performance  # Validate Core Web Vitals >90

# Content Preparation
ddev drush --uri=bruchtal.zh-demo.ddev.site uli  # Admin access
```

### 2. Demo Segments Preparation

#### Segment 1: System Overview & Navigation (10 min)
**Key Features to Demonstrate:**
- Short navigation paths (kurze Navigationswege)
- Responsive design across devices
- Individual municipality designs (Bruchtal theme)
- AI-powered search functionality
- Structured data filters (directories)
- Data visualization tools

#### Segment 2: Simple Business Process Forms (7 min)
**Required Forms:**
- Feedback form (Feedback-Formular)
- Infrastructure damage report (Meldung Infrastrukturschäden)
- Event registration (Anmeldung für Anlässe)
- Room booking request (Anfrage für Raumnutzung)

**Form Features:**
- Editor-friendly form builder
- Table-based data storage
- Status management
- Simple workflow functionality

#### Segment 3: Backend for Municipal Employees (15 min)
**Backend Capabilities:**
- Directory management (Vereine, Firmen, Gastgewerbe)
- Guest account with workflow/approval
- WYSIWYG content pages
- Media integration (images, PDFs, flyers)
- Attractive content design options

## 🤖 MCP Tools Integration

### When to Use MCP Tools

#### Jira Integration (mcp__atlassian)
```yaml
Task Planning:
  - Use for: Creating and tracking GPZH demo tasks
  - Commands: 
    - mcp__atlassian__createJiraIssue: Create demo preparation tasks
    - mcp__atlassian__searchJiraIssuesUsingJql: Find GPZH-related tickets
    - mcp__atlassian__editJiraIssue: Update task status

Demo Tracking:
  - Create tickets for each demo segment
  - Track preparation progress
  - Document testing results
```

#### Browser Testing (mcp__browser-tools)
```yaml
Performance Validation:
  - mcp__browser-tools__runPerformanceAudit: Core Web Vitals check
  - mcp__browser-tools__runAccessibilityAudit: WCAG compliance
  - mcp__browser-tools__takeScreenshot: Visual documentation

Demo Testing:
  - Test all forms functionality
  - Validate responsive design
  - Check navigation paths
```

#### Puppeteer Automation (mcp__puppeteer)
```yaml
Demo Preparation:
  - mcp__puppeteer__puppeteer_navigate: Test navigation flows
  - mcp__puppeteer__puppeteer_fill: Test form submissions
  - mcp__puppeteer__puppeteer_screenshot: Capture demo states
```

#### Memory & Documentation (mcp__server-memory)
```yaml
Knowledge Management:
  - mcp__server-memory__create_entities: Document demo features
  - mcp__server-memory__add_observations: Record test results
  - mcp__server-memory__search_nodes: Find previous demo notes
```

## 🏗️ Architecture Overview

### Multi-Site Configuration
```yaml
Sites:
  bruchtal.zh-demo.ddev.site:
    - Primary demo municipality
    - Lake theme (blue/turquoise)
    - Full feature showcase
    
  Additional Test Sites:
    - thalwil.zh-demo.ddev.site (modern urban)
    - thalheim.zh-demo.ddev.site (traditional rural)
    - erlenbach.zh-demo.ddev.site (lakeside tourism)
```

### Technology Stack
```yaml
Backend:
  - Drupal 11.2.2 with PHP 8.3
  - MariaDB 10.11 database
  - Webform module for forms
  - Paragraphs for content
  - AI module for content suggestions

Frontend:
  - Vite 6.2.0 build tool
  - Tailwind CSS v4 framework
  - Alpine.js for interactivity
  - 25+ SDC components
  - Storybook documentation
```

### Key Modules & Features
```yaml
Form Management:
  - Webform module with workflow
  - Status tracking
  - Table storage
  - Email notifications

Content Management:
  - WYSIWYG editor (CKEditor 5)
  - Media library
  - Directory content types
  - Guest editor workflow

AI Integration:
  - OpenAI GPT-4o
  - Content suggestions
  - Alt-text generation
  - Search enhancement
```

## 🚀 Demo-Day Execution

### Quick Access Commands
```bash
# Open demo sites
ddev launch bruchtal.zh-demo.ddev.site
ddev launch bruchtal.zh-demo.ddev.site/admin

# Monitor performance
ddev logs web --follow
ddev exec htop

# Emergency fixes
ddev drush cr
ddev restart
```

### Presentation Flow
1. **Start** → System Overview with Bruchtal homepage
2. **Navigation** → Show responsive design and municipality customization
3. **Forms** → Demonstrate form builder and submission workflow
4. **Backend** → Show content creation and directory management
5. **AI Features** → Demonstrate content suggestions and search

### Backup & Recovery
```bash
# Before presentation
ddev snapshot create pre-demo
ddev export-contents

# Recovery if needed
ddev snapshot restore pre-demo
ddev drush cr
```

## 📋 Testing Requirements

### Automated Testing
```bash
# Full test suite
ddev exec npm run qa:full

# Individual tests
ddev exec npm run test:unit
ddev exec npm run test:e2e
ddev exec npm run test:visual
ddev exec npm run test:accessibility
```

### Manual Testing Checklist
- [ ] All forms submit correctly
- [ ] Workflow approvals function
- [ ] Directory filtering works
- [ ] WYSIWYG editor loads
- [ ] Media upload successful
- [ ] Responsive design verified
- [ ] AI features operational

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Vite Dev Server Not Accessible
```bash
ddev theme dev  # Use DDEV-specific command
# Check: https://zh-demo.ddev.site:5173
```

#### Form Submission Errors
```bash
ddev drush cr
ddev drush webform:repair
```

#### Performance Issues
```bash
ddev config --performance-mode=mutagen
ddev restart
```

#### AI Features Not Working
```bash
# Check API keys
ddev exec env | grep -i api
# Validate AI module
ddev drush ai:status
```

## 📚 Important Files & Locations

### Configuration Files
- `.ddev/config.yaml` - DDEV environment configuration
- `config/sync/` - Drupal configuration
- `web/sites/sites.php` - Multi-site mapping

### Theme Files
- `web/themes/custom/adesso_cms_theme/` - Main theme
- `web/themes/custom/adesso_cms_theme/components/` - SDC components
- `web/themes/custom/adesso_cms_theme/storybook/` - Component docs

### Custom Modules
- `web/modules/custom/zh_demo/` - Core demo functionality
- `web/modules/custom/gpzh_content/` - Content types
- `web/modules/custom/gpzh_ai/` - AI integration

### Documentation
- `02_GPZH_Pflichtenhheft_Praqualifikation.pdf` - Requirements
- `GPZH Agenda Anbieterpräsentation Präqualifikation.pdf` - Presentation agenda
- `GPZH-Projektplan.md` - Project timeline

## 🎯 Success Criteria

### Technical Requirements
- Core Web Vitals score >90
- WCAG 2.1 AA compliance
- Page load time <2 seconds
- All forms functional
- Workflow operational

### Presentation Goals
- Demonstrate all required features
- Show municipality customization
- Highlight AI capabilities
- Prove scalability for 160 municipalities
- Display Swiss compliance readiness

## 🇨🇭 Swiss Market Compliance

### Language Requirements
- Swiss German (no ß, use ss)
- Formal addressing (Sie-Form)
- Canton-specific terminology
- Multi-language support (DE/FR/IT)

### Data Protection
- CH-DSG compliance
- Data hosting in Switzerland
- Complete tenant separation
- GDPR/DSGVO ready

### Accessibility
- eCH-0059 standards
- Minimum 16px font size
- Color contrast >4.5:1
- Touch targets 44px minimum

---

## 🤖 AI Development Team Configuration
*Optimized for GPZH Präqualifikation Demo System - Updated 2025-01-19*

Your project uses: **Drupal 11.2.2 Multi-Site CMS** with Vite, Tailwind CSS v4, Alpine.js, OpenAI GPT-4o, and Swiss compliance requirements.

### 🎯 Parallel Work Streams for Maximum Efficiency

#### Stream 1: Presentation & Project Management
- **Lead Agent**: @drupal-technical-pm
- **MCP Tools**: mcp__atlassian (Jira tracking), mcp__server-memory (demo coordination)
- **Responsibilities**:
  - 35-minute presentation coordination
  - Demo segment preparation and timing
  - Stakeholder communication and requirements management
  - Project milestone tracking and team coordination

#### Stream 2: Municipal Portal Development  
- **Lead Agent**: @municipality-portal-specialist
- **Supporting**: @drupal-solution-architect
- **MCP Tools**: mcp__mcp-server-drupal (Drupal operations), mcp__server-memory (requirements)
- **Responsibilities**:
  - Swiss municipal business process forms (Feedback, Infrastructure damage, Event registration, Room booking)
  - Multi-site architecture (Bruchtal, Thalwil, Thalheim, Erlenbach)
  - Citizen service workflows and approval processes
  - Directory management (Vereine, Firmen, Gastgewerbe)

#### Stream 3: Swiss Compliance & Accessibility
- **Lead Agent**: @swiss-compliance-specialist
- **Supporting**: @german-market-compliance-specialist
- **MCP Tools**: mcp__a11y-accessibility (WCAG testing), mcp__browser-tools (accessibility audits)
- **Responsibilities**:
  - eCH-0059 accessibility standards compliance
  - CH-DSG data protection implementation
  - Multilingual compliance (DE/FR/IT) with Swiss cultural standards
  - Government service delivery standards

#### Stream 4: AI Integration & Content Workflows
- **Lead Agent**: @drupal-ai-integration-specialist
- **Supporting**: @drupal-content-strategist
- **MCP Tools**: mcp__mcp-server-drupal (AI modules), mcp__server-memory (AI workflows)
- **Responsibilities**:
  - OpenAI GPT-4o integration for content suggestions
  - Automated alt text generation for accessibility
  - AI-powered search functionality
  - Content moderation and quality assessment

#### Stream 5: Frontend Performance & Components
- **Lead Agents**: @drupal-frontend-theming-specialist + @tailwind-v4-expert + @sdc-component-specialist
- **Supporting**: @drupal-storybook-expert + @alpine-js-frontend-developer
- **MCP Tools**: mcp__browser-tools (performance audits), mcp__puppeteer (UI testing)
- **Responsibilities**:
  - Core Web Vitals >90 performance optimization
  - 25+ SDC component architecture
  - Responsive municipality-specific theming (lake theme for Bruchtal)
  - Vite 6.2.0 build optimization and Storybook documentation

#### Stream 6: Testing & Quality Assurance
- **Lead Agent**: @qa-testing-specialist
- **Supporting**: @drupal-performance-specialist
- **MCP Tools**: mcp__browser-tools (full audits), mcp__puppeteer (automation), mcp__a11y-accessibility
- **Responsibilities**:
  - Automated testing suite execution
  - Visual regression testing with BackstopJS  
  - Accessibility validation across all features
  - Demo preparation validation and monitoring

### 🔄 Coordination Strategy

#### Shared Knowledge Management
- **Primary Tool**: mcp__server-memory for cross-team knowledge sharing
- **Usage**: All agents document discoveries, test results, and requirements
- **Benefit**: Prevents duplication and ensures team-wide awareness

#### Parallel Execution Patterns
- **Performance Testing**: Multiple agents can run browser audits simultaneously
- **Component Development**: Frontend agents work in parallel on different component areas
- **Compliance Validation**: Swiss compliance runs independently while features develop
- **Content & AI**: AI integration develops parallel to business process implementation

#### Handoff Protocols
1. **Requirements** → @drupal-technical-pm captures → mcp__server-memory → All teams access
2. **Feature Complete** → @qa-testing-specialist validates → Results to mcp__server-memory
3. **Swiss Compliance** → @swiss-compliance-specialist validates → Documentation via mcp__server-memory
4. **Demo Ready** → All teams confirm via mcp__server-memory coordination

### 🚀 Recommended Workflows for Common Tasks

#### Demo Preparation Workflow
```bash
# Parallel execution across agents
@drupal-technical-pm: "Create comprehensive demo checklist and timing validation"
@municipality-portal-specialist: "Validate all 4 required forms are functional and demonstrable" 
@qa-testing-specialist: "Run full test suite including performance and accessibility"
@swiss-compliance-specialist: "Validate eCH compliance for presentation readiness"
```

#### Performance Optimization Workflow  
```bash
# Coordinated parallel optimization
@drupal-frontend-theming-specialist: "Optimize theme CSS and build process"
@tailwind-v4-expert: "Review and optimize Tailwind usage patterns"
@sdc-component-specialist: "Audit component performance and optimization opportunities"
@drupal-performance-specialist: "Monitor and validate Core Web Vitals improvements"
```

#### Feature Implementation Workflow
```bash
# Integrated feature development
@municipality-portal-specialist: "Implement municipal business process workflow"
@drupal-ai-integration-specialist: "Add AI content suggestions to workflow"
@swiss-compliance-specialist: "Validate workflow meets eCH and CH-DSG requirements"
@qa-testing-specialist: "Create automated tests for complete workflow"
```

### 🎛️ MCP Tool Assignments by Specialization

#### Project Management & Coordination
- **mcp__atlassian**: Task creation, sprint planning, demo milestone tracking
- **mcp__server-memory**: Cross-team knowledge sharing and requirements documentation

#### Drupal Development & Configuration  
- **mcp__mcp-server-drupal**: Core Drupal operations, module management, multi-site configuration
- **mcp__server-memory**: Technical documentation and configuration sharing

#### Frontend & Performance
- **mcp__browser-tools**: Performance audits, Core Web Vitals monitoring, responsive testing
- **mcp__puppeteer**: UI automation, form testing, navigation validation
- **mcp__server-memory**: Component documentation and performance metrics

#### Swiss Compliance & Accessibility
- **mcp__a11y-accessibility**: WCAG 2.1 AA testing, eCH-0059 validation, color contrast checking  
- **mcp__browser-tools**: Accessibility audits and government standard compliance
- **mcp__server-memory**: Compliance documentation and validation results

#### AI Integration & Content
- **mcp__mcp-server-drupal**: AI module configuration, content workflow setup
- **mcp__server-memory**: AI prompt optimization and content strategy documentation

#### Testing & Quality Assurance
- **mcp__browser-tools**: Comprehensive audits (performance, accessibility, SEO, best practices)
- **mcp__puppeteer**: Automated testing, demo scenario validation, form submission testing
- **mcp__a11y-accessibility**: Specialized accessibility testing and validation
- **mcp__server-memory**: Test results and quality metrics documentation

### 💡 How to Use Your Specialized Team

### 🎯 Success Metrics & Coordination

#### Technical Excellence
- Core Web Vitals >90 (monitored via mcp__browser-tools)
- WCAG 2.1 AA + eCH-0059 compliance (validated via mcp__a11y-accessibility)
- Zero critical accessibility issues across all forms and workflows
- Sub-2-second page load times for all demo scenarios

#### Demo Readiness  
- All 4 required forms functional and demonstrable
- Municipality-specific theming complete (Bruchtal lake theme)
- AI features operational and impressive for presentation
- Swiss compliance documentation ready for stakeholder review

#### Team Efficiency
- Parallel work streams operating without blocking dependencies
- Shared knowledge base updated in real-time via mcp__server-memory
- Automated testing suite covering all demo scenarios
- Coordinated handoffs between specialized agents

Your specialized AI development team is configured for maximum parallel efficiency while ensuring Swiss compliance, accessibility, and demo readiness. Each agent has clear responsibilities and appropriate MCP tools to deliver exceptional results for the GPZH Präqualifikation presentation.

## 📐 ARCHITECTURE DECISION RECORDS (ADRs)

### ADR Format
```markdown
# ADR-XXX: [Decision Title]
Date: YYYY-MM-DD
Status: [Proposed|Accepted|Deprecated|Superseded]

## Context
What is the issue that we're addressing?

## Decision
What is the change that we're proposing/doing?

## Consequences
What becomes easier or harder as a result?

## Alternatives Considered
- Option A: Pros/Cons (Score: X/10)
- Option B: Pros/Cons (Score: X/10)
```

### Current ADRs
- ADR-001: Multi-Site Architecture for Municipality Portals
- ADR-002: SDC Components over Traditional Drupal Blocks
- ADR-003: Playwright for E2E Testing Framework
- ADR-004: Tailwind CSS v4 for Styling System
- ADR-005: Alpine.js for Progressive Enhancement

## 🚀 QUICK COMMAND REFERENCE

### Jira Operations
```bash
# Check current sprint tasks
mcp__atlassian__searchJiraIssuesUsingJql "project = GPZH AND sprint in openSprints()"

# Update ticket status
mcp__atlassian__editJiraIssue GPZH-XXX --status="In Progress"
```

### Playwright Testing
```bash
# Quick test for current feature
npx playwright test --grep GPZH-$(git branch --show-current | grep -oE '[0-9]+')

# Full regression suite
npx playwright test --project=all-browsers
```

### Parallel Execution
```bash
# Launch tmux sessions for parallel work
tmux-cli launch "npm run test:unit"
tmux-cli launch "npm run test:e2e"
tmux-cli launch "npm run test:visual"
```

## ⚠️ CRITICAL REMINDERS

1. **NEVER commit without Playwright tests passing**
2. **ALWAYS update Jira ticket status in real-time**
3. **VERIFY with Playwright before claiming completion**
4. **ONE ticket = ONE branch = ONE PR (no scope creep)**
5. **READ files completely before making changes**
6. **TEST in all 3 demo municipalities**
7. **DOCUMENT architectural decisions in ADRs**