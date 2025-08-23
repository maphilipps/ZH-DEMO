# CLAUDE.md - Compounding Engineering Knowledge Base

This file provides guidance to Claude Code and serves as the living memory system for the GPZH project. Every interaction, lesson learned, and architectural decision compounds into permanent system knowledge.

## 🔄 Compounding Engineering Status

**Last Updated**: 2025-08-20
**Knowledge Iterations**: 2
**Active Learning Patterns**: Full compounding engineering implementation
**Current Phase**: Complete system with automated learning

### Three-Lane Development System
- **Planning Lane**: Strategic analysis and architecture (@drupal-solution-architect + @drupal-technical-pm)
- **Building Lane**: Implementation and development (@drupal-11-lead-developer + @municipality-portal-specialist)  
- **Reviewing Lane**: Quality assurance and compliance (@swiss-compliance-specialist + @qa-testing-specialist)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Context: GPZH Präqualifikation Demo System

**ZH-DEMO Prototyp** - A Drupal 11.2.2 multi-site CMS demonstration system for the GPZH (Gemeindeportale Zürich) prequalification presentation. This system demonstrates our technical capabilities for the Canton of Zurich's municipal portal project.

### Critical Presentation Requirements (35 Minutes)
1. **System Overview & Navigation** (10 min)
2. **Simple Business Process Forms** (7 min) 
3. **Backend for Municipal Employees** (15 min)
4. **Q&A** (3 min)

### Demo Municipality: Bruchtal
For the presentation, we use **Gemeinde Bruchtal** as our demonstration municipality with the tagline "Leben am See" (Life by the Lake).

## 🧠 Compounding Knowledge Sections

### Lessons Learned (Automatic Learning)
*This section automatically updates as we learn from successes and failures*

#### Architecture Decisions That Worked
- **Directory System Architecture**: Separate content types (Vereine, Firmen, Gastgewerbe) instead of single bundle for clearer field management
- **Workflow Choice**: Using core content_moderation module instead of custom workflow for reliability and maintenance
- **Guest Account Strategy**: Requiring registration for external editors provides better spam control and ownership tracking

#### Implementation Patterns That Succeeded  
- *[To be populated by Building Lane experiences]*

#### Review Feedback That Prevented Issues
- **PR #12 package-lock.json deletion** → Caught critical build system failure before merge → Prevented production deployment failure
- **CI/CD dependency validation** → Essential npm lock files must exist → Automated check prevents broken builds

#### Failure-to-Knowledge Conversions
*Every bug becomes permanent prevention knowledge*

- **Missing GitHub Projects status check** → Issue #18 worked on without being in Ready column → Rule: `/work` command must check GitHub Projects status before allowing work
- **Documentation Learning Violation** → Stored learnings in mcp__server-memory instead of CLAUDE.md → Rule: Always update CLAUDE.md for learnings as documented in llms.txt line 17-18
- **TDD Inappropriate for Infrastructure** → Applied TDD to DDEV/infrastructure setup → Rule: TDD for business logic, direct implementation + validation for infrastructure
- **Over-engineering Simple Tasks** → Created separate issue/branch for simple documentation review → Rule: Documentation reviews = direct comments, not separate issues

#### Swiss Compliance Patterns
- **eCH-0010 Address Format**: Separate street and house number fields for Swiss standard compliance
- **CH-DSG Implementation**: 30-day soft delete and annual review process for data protection compliance
- **Swiss German Standards**: No ß character, Sie-Form addressing, DD.MM.YYYY date format

### Failure-to-Knowledge Conversions
*Every bug becomes permanent prevention knowledge*

#### Known Issues → Tests → Rules
- **Missing package-lock.json breaks CI/CD** → Always verify package-lock.json exists → Rule: Never delete package-lock.json, always regenerate with `npm install` if changes needed
- **PR #12 CI/CD failures** → Missing dependency lock file prevents builds → Test: CI must validate package-lock.json presence before build steps
- **Frustration detector bash array errors** → Empty arrays fail with `set -u` → Rule: Always check array length before accessing with `${array[@]}`
- **German text breaks JSON parsing** → Apostrophes cause invalid escapes → Rule: Use `jq -Rs` for proper JSON string escaping
- **mapfile not portable to macOS** → Command not found errors → Rule: Use `while IFS= read -r` loop instead of mapfile for portability

#### Performance Optimizations → Patterns
- *[To be populated as optimizations are discovered]*

#### Demo Scenarios → Validated Workflows
- *[To be populated as demo preparations are tested]*

### Code Style Evolution
*Preferences that have emerged from reviews and become standard*

#### Drupal Patterns
- *[To be populated by code reviews and successful implementations]*

#### Swiss Municipal Standards
- *[To be populated by compliance work]*

#### AI Integration Patterns
- *[To be populated by GPT-4o integration work]*

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

## 🚀 Revolutionary Compounding Engineering Commands

The compounding engineering workflow is implemented through three custom slash commands:

### `/issue` - Intelligent Issue Creation
Creates GitHub issues with automatic project assignment, compounding knowledge integration, and proper lane setup.

**Usage:**
```
/issue "Title" "Description" [labels]
```

**Features:**
- Automatic GitHub issue creation with comprehensive templates
- Auto-assignment to @claude and GitHub Projects integration
- Swiss compliance checklist inclusion
- Knowledge base integration for compounding learning
- Planning Lane setup (Ready status)

### `/work` - TDD-Enforced Development  
Enforces Test-Driven Development with strict RED-GREEN-REFACTOR cycle.

**Usage:**
```
/work [issue_number]
```

**TDD Enforcement:**
- 🔴 **RED Phase**: Must write failing tests FIRST (mandatory)
- 🟢 **GREEN Phase**: Minimal implementation to pass tests
- 🔵 **REFACTOR Phase**: Clean up while keeping tests green
- Blocks all progress until failing tests exist
- Swiss compliance testing integration

### `/review` - Learning-Driven Code Review
Extracts learnings from GitHub PR reviews and compounds knowledge.

**Usage:**
```
/review [issue_number] [pr_number]
```

**Learning Extraction:**
- Analyzes GitHub PR comments and review feedback
- Moves issues through Reviewing Lane
- Automatically updates knowledge base with patterns
- Documents failures for prevention
- Creates reusable Swiss compliance patterns

All commands are implemented as executable slash commands in `.claude/commands/` and integrate with the three-lane GitHub Projects workflow.


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

#### Playwright Automation (Playwright statt Puppeteer)
```yaml
Demo Preparation:
  - Playwright verwenden für alle Browser-Automatisierungen
  - Test navigation flows
  - Test form submissions  
  - Capture demo states
  - Visual regression testing
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

### 🎯 Three-Lane Specialized Development

#### Lane 1: Planning & Strategy (Left Terminal)
- **Lead Agents**: @drupal-solution-architect + @drupal-technical-pm
- **Role**: Strategic analysis, requirements research, architectural decisions
- **Memory Focus**: Requirements, patterns, architectural decisions, demo scenarios
- **Trigger**: Complex planning, architecture, demo preparation, ADR creation

#### Lane 2: Implementation & Building (Center Terminal)  
- **Lead Agents**: @drupal-11-lead-developer + @municipality-portal-specialist
- **Role**: Feature implementation, code development, testing
- **Memory Focus**: Code patterns, testing strategies, component architecture, AI integration
- **Trigger**: Feature development, coding tasks, testing, AI integration

#### Lane 3: Quality & Compliance (Right Terminal)
- **Lead Agents**: @swiss-compliance-specialist + @qa-testing-specialist
- **Role**: Quality assurance, compliance validation, performance optimization
- **Memory Focus**: Quality standards, Swiss compliance, performance, accessibility
- **Trigger**: Code review, compliance checking, performance optimization, accessibility validation

### 🔄 Coordination Strategy

#### Shared Knowledge Management
- **Primary Tool**: mcp__server-memory for cross-lane knowledge sharing
- **Usage**: All lanes document discoveries, test results, and patterns
- **Benefit**: Prevents duplication and ensures team-wide learning

#### Parallel Execution Patterns
- **Performance Testing**: Multiple lanes can run browser audits simultaneously
- **Component Development**: Lanes work in parallel on different aspects
- **Compliance Validation**: Swiss compliance runs independently while features develop
- **Content & AI**: AI integration develops parallel to business process implementation

#### Handoff Protocols
1. **Requirements** → Planning Lane captures → mcp__server-memory → All lanes access
2. **Feature Complete** → Building Lane delivers → Reviewing Lane validates → Results to mcp__server-memory
3. **Swiss Compliance** → Reviewing Lane validates → Documentation via mcp__server-memory
4. **Demo Ready** → All lanes confirm via mcp__server-memory coordination

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
- **Playwright**: UI automation, form testing, navigation validation (nicht Puppeteer!)
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
- **Playwright**: Automated testing, demo scenario validation, form submission testing (nicht Puppeteer!)
- **mcp__a11y-accessibility**: Specialized accessibility testing and validation
- **mcp__server-memory**: Test results and quality metrics documentation

### 💡 How to Use Your Specialized Team

#### For Municipal Portal Development
```bash
"@municipality-portal-specialist: Implement building permit workflow with approval stages"
"@swiss-compliance-specialist: Ensure building permit workflow meets eCH standards"
```

#### For AI Feature Implementation  
```bash
"@drupal-ai-integration-specialist: Add GPT-4o content suggestions to form creation"
"@drupal-content-strategist: Optimize AI prompts for German municipal content"
```

#### For Performance Optimization
```bash
"@drupal-performance-specialist: Analyze and optimize Core Web Vitals for demo"
"@tailwind-v4-expert: Review CSS for performance bottlenecks and optimization"
```

#### For Demo Preparation
```bash
"@qa-testing-specialist: Run complete test suite and validate all demo scenarios"
"@drupal-technical-pm: Create presentation checklist and validate 35-minute timing"
```

#### For Swiss Compliance
```bash
"@swiss-compliance-specialist: Validate complete eCH-0059 accessibility compliance"
"@german-market-compliance-specialist: Review all German content for Swiss standards"
```

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

## 🎭 Wichtige Tool-Änderung: Playwright statt Puppeteer

**WICHTIG**: Für alle Browser-Automatisierung und E2E-Testing verwenden wir **Playwright** anstatt Puppeteer!

### Gründe für Playwright:
- Bessere Cross-Browser-Unterstützung (Chrome, Firefox, Safari, Edge)
- Robustere Selektoren und Auto-Waiting
- Eingebaute Visual Regression Testing Capabilities
- Bessere Performance und Stabilität
- Native TypeScript-Unterstützung

### Anwendungsbereiche:
- E2E Testing der Demo-Szenarien
- Form Testing und Validierung
- Visual Regression Tests
- Navigation Flow Testing
- Screenshot-Erstellung für Dokumentation
- Performance Testing in verschiedenen Browsern
- es gibt bruchtal.zh-demo.ddev.site nicht. Einfach nur zh-demo.ddev.site
- Immer TailwindCSS schreiben, nur im Notfall komplett custom.css
- Nutze, wenn du Änderungen an Drupal machst. IMMER das DRUPAL MCP. WENN das nicht funktionierst, musst du sämtliche Änderungen mir absprecehen. Ich möchte nicht, dass du solche Änderungen direkt über die Datenbank machst.