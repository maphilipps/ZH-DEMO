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

### Compounding Engineering Components (NEW)
- **Failure-to-Knowledge System**: Every bug/issue automatically becomes permanent prevention knowledge
- **Memory Integration**: Cross-session knowledge persistence using mcp__server-memory
- **Frustration Detector**: GPZH-specific frustration detection with automated solutions
- **Automated Learning**: PR, bug, and review analysis that continuously improves the system
- **Hook-based Coordination**: Automatic handoffs and learning capture between lanes

**Three Window Orchestrator Setup**:
- **Window 1**: `claude --model opus` → `/planning` → @planning-lane-orchestrator
- **Window 2**: `claude` → `/building` → @building-lane-orchestrator  
- **Window 3**: `claude` → `/reviewing` → @reviewing-lane-orchestrator

**Orchestrator Pattern**: Jede Lane hat einen Orchestrator der NIE direkt arbeitet, sondern immer an Spezialisten delegiert (wie @tech-lead-orchestrator).

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
- **Issue #8 Review Failure Detection (2025-08-21)**: Reviewing Lane discovered "ready-for-review" issue with zero implementation - only specification existed. Prevented demo day disaster by catching missing Webform, Views, and test data early.

#### Swiss Compliance Patterns
- **eCH-0010 Address Format**: Separate street and house number fields for Swiss standard compliance
- **CH-DSG Implementation**: 30-day soft delete and annual review process for data protection compliance
- **Swiss German Standards**: No ß character, Sie-Form addressing, DD.MM.YYYY date format

### Failure-to-Knowledge Conversions
*Every bug becomes permanent prevention knowledge*

#### Known Issues → Tests → Rules
- **Issue #8 Infrastructure Damage Form (2025-08-21)**: PR #10 merged with only WIP spec, no actual implementation. Lesson: Always verify implementation exists before marking issue as complete. Check for actual config files, not just documentation.

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
# Hook-based Compounding Development (NEW)
claude-coordinate start         # Start hook-based three-lane system (auto-spawns)
claude-coordinate status        # Show system and lane status
claude-coordinate stop          # Stop system and archive session

# Cross-Lane Coordination
claude-coordinate send-task 'task description' building    # Send task to building lane
claude-coordinate send-task 'task description' reviewing   # Send task to reviewing lane
claude-coordinate notifications                            # Show your notifications
claude-coordinate activity                                 # Show recent coordination

# GPZH Workflows
./claude/gpzh-workflows.sh demo         # 35-minute demo preparation
./claude/gpzh-workflows.sh compliance   # Swiss compliance validation  
./claude/gpzh-workflows.sh forms        # Municipal forms implementation
./claude/gpzh-workflows.sh performance  # Core Web Vitals >90 optimization
./claude/gpzh-workflows.sh ai           # GPT-4o integration

# DDEV Environment  
ddev start                      # Start environment
ddev stop                       # Stop services
ddev restart                    # Fresh restart
ddev describe                   # Show URLs and services
ddev logs --follow             # Live logs for debugging

# Multi-Site Access
ddev launch                     # Open main site
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

## 🤖 Compounding Engineering Commands

### Master Orchestrator
```bash
# Complete System Control
./claude/compounding-orchestrator.sh start     # Start full compounding system
./claude/compounding-orchestrator.sh status    # Show comprehensive status
./claude/compounding-orchestrator.sh stop      # Stop and backup knowledge

# GPZH Workflows with Knowledge
./claude/compounding-orchestrator.sh gpzh-workflow demo        # Demo prep with learning
./claude/compounding-orchestrator.sh gpzh-workflow compliance  # Swiss compliance with patterns
./claude/compounding-orchestrator.sh gpzh-workflow forms       # Municipal forms with memory

# System Analysis and Improvement
./claude/compounding-orchestrator.sh analyze   # Analyze patterns for improvements
./claude/compounding-orchestrator.sh backup    # Backup all knowledge
./claude/compounding-orchestrator.sh export    # Export knowledge for sharing
```

### Individual Components
```bash
# Failure-to-Knowledge System
./claude/failure-to-knowledge.sh capture-failure bug "Form submission failing" forms high
./claude/failure-to-knowledge.sh capture-success demo "Bruchtal theme impressed client" demo
./claude/failure-to-knowledge.sh status

# Memory Integration System  
./claude/memory-integration.sh store-session development "Implemented Swiss compliance" swiss
./claude/memory-integration.sh retrieve-task demo_prep gpzh
./claude/memory-integration.sh store-review accessibility_review "WCAG compliant" "All tests pass"

# Frustration Detection System
./claude/frustration-detector.sh detect "Drupal errors keep happening" development
./claude/frustration-detector.sh analyze "Long conversation text..." demo_prep
./claude/frustration-detector.sh train

# Automated Learning System
./claude/automated-learning.sh learn-pr "Add Swiss validation" "eCH-0059 compliance" "Good tests" merged
./claude/automated-learning.sh learn-bug "Form timeout" "Database connection" "timeout" "Fixed" high
./claude/automated-learning.sh analyze-trends
```

### Quick Workflows
```bash
# Simple Entry Points
./claude/compound-dev start        # Start three-lane system with compounding
./claude/compound-dev demo         # Quick demo preparation mode  
./claude/compound-dev compliance   # Quick Swiss compliance mode
./claude/compound-dev status       # Show system status with metrics
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

## 🤖 Hook-based Three-Lane Coordination

### Automatic Lane Spawning
Starting the Planning Lane automatically spawns the other two lanes via Claude Code hooks:

```bash
# Start Planning Lane (auto-spawns others)
export CLAUDE_ROLE=planning && claude --config .claude/planning-config.json

# The session-start hook automatically:
# 1. Detects CLAUDE_ROLE=planning
# 2. Spawns Building Lane in new terminal 
# 3. Spawns Reviewing Lane in new terminal
# 4. Initializes cross-lane coordination
```

### Hook-triggered Coordination

#### Automatic Handoffs
The system automatically coordinates work between lanes:

- **Planning Complete** → Triggers Building Lane implementation
- **Implementation Done** → Triggers Reviewing Lane validation  
- **Issues Found** → Triggers Building Lane fixes
- **Compliance Validated** → Updates knowledge base

#### Agent Spawn Coordination
When specialized agents are spawned, hooks automatically coordinate:

```bash
# Planning Lane spawns @drupal-solution-architect
# → Automatically notifies Building/Reviewing lanes
# → Creates coordination expectations

# Building Lane spawns @municipality-portal-specialist  
# → Automatically notifies Reviewing lane for compliance check
# → Sets up municipal process validation

# Reviewing Lane spawns @swiss-compliance-specialist
# → Automatically notifies Building lane for potential fixes
# → Triggers compliance documentation update
```

### Manual Cross-Lane Communication

#### Send Tasks Between Lanes
```bash
# Send specific tasks to other lanes
claude-coordinate send-task "Implement Bruchtal feedback form" building
claude-coordinate send-task "Validate eCH-0059 compliance" reviewing
claude-coordinate send-task "Document architectural decision" planning
```

#### Check Lane Notifications
```bash
# See what other lanes have sent you
claude-coordinate notifications

# View recent cross-lane activity
claude-coordinate activity

# Check overall system status
claude-coordinate status
```

### GPZH-Specific Workflows

#### Demo Preparation (35-minute presentation)
```bash
# Automated workflow across all lanes
./claude/gpzh-workflows.sh demo

# Planning Lane: Creates timing plan and scenarios
# Building Lane: Prepares forms, content, and features  
# Reviewing Lane: Validates demo readiness and compliance
```

#### Swiss Compliance Validation
```bash
# Comprehensive compliance workflow
./claude/gpzh-workflows.sh compliance

# Planning Lane: Research eCH-0059 and CH-DSG requirements
# Building Lane: Implement accessibility and data protection
# Reviewing Lane: Validate compliance with automated testing
```

#### Municipal Forms Implementation  
```bash
# All 4 required municipal forms
./claude/gpzh-workflows.sh forms

# Planning Lane: Design form architecture and workflows
# Building Lane: Implement feedback, damage reports, events, room booking
# Reviewing Lane: Test forms and validate business processes
```

### Hook Integration Points

#### Session Events
- **session-start**: Auto-spawns lanes, initializes coordination
- **user-prompt-submit**: Detects coordination needs, triggers handoffs
- **task-complete**: Creates automatic handoffs to appropriate lanes
- **agent-spawn**: Coordinates based on specialized agent requirements

#### Workflow Triggers
- Demo preparation keywords → Triggers multi-lane demo workflow
- Swiss compliance mentions → Triggers compliance validation workflow  
- Performance issues → Triggers optimization workflow across lanes
- Municipal business → Triggers municipal forms workflow

#### Learning Integration
- Every task completion updates compounding knowledge
- Cross-lane coordination patterns become automated
- Failure learning triggers prevention rules across all lanes
- Swiss compliance learnings become reusable patterns

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

#### Demo Preparation Workflow (Hook-based)
```bash
# Automated workflow coordination
./claude/gpzh-workflows.sh demo

# Hook system automatically:
# 1. Creates 35-minute timing plan in Planning Lane
# 2. Triggers form preparation in Building Lane  
# 3. Initiates compliance validation in Reviewing Lane
# 4. Coordinates handoffs between all lanes
```

#### Performance Optimization Workflow (Hook-based)
```bash
# Automated performance workflow
./claude/gpzh-workflows.sh performance

# Hook system automatically:
# 1. Analyzes bottlenecks in Planning Lane
# 2. Implements optimizations in Building Lane
# 3. Validates Core Web Vitals >90 in Reviewing Lane  
# 4. Creates performance learning patterns
```

#### Feature Implementation Workflow (Hook-based)
```bash
# Municipal forms workflow example
./claude/gpzh-workflows.sh forms

# Hook system automatically:
# 1. Plans form architecture in Planning Lane
# 2. Implements all 4 forms in Building Lane
# 3. Validates compliance in Reviewing Lane
# 4. Creates reusable municipal patterns

# Or manual coordination:
claude-coordinate send-task "Plan municipal workflow architecture" planning
claude-coordinate send-task "Implement feedback form with Swiss compliance" building
claude-coordinate send-task "Validate eCH-0059 compliance" reviewing
```

### 💡 How to Use Your Specialized Team

#### For Municipal Portal Development
```bash
# Planning Lane
"@drupal-solution-architect: Design building permit workflow architecture"
# Building Lane  
"@municipality-portal-specialist: Implement building permit workflow with approval stages"
# Reviewing Lane
"@swiss-compliance-specialist: Ensure building permit workflow meets eCH standards"
```

#### For AI Feature Implementation  
```bash
# Planning Lane
"@drupal-technical-pm: Plan GPT-4o integration for content suggestions"
# Building Lane
"@drupal-ai-integration-specialist: Add GPT-4o content suggestions to form creation"
# Reviewing Lane  
"@qa-testing-specialist: Test AI features for reliability and performance"
```

#### For Demo Preparation
```bash
# Planning Lane
"@drupal-technical-pm: Create presentation checklist and validate 35-minute timing"
# Building Lane
"@municipality-portal-specialist: Prepare demo content and scenarios for all 4 forms"
# Reviewing Lane
"@qa-testing-specialist: Run complete test suite and validate all demo scenarios"
```

### 🎯 Success Metrics & Coordination

#### Technical Excellence
- Core Web Vitals >90 (monitored via Reviewing Lane)
- WCAG 2.1 AA + eCH-0059 compliance (validated via Reviewing Lane)
- Zero critical accessibility issues across all forms and workflows
- Sub-2-second page load times for all demo scenarios

#### Demo Readiness  
- All 4 required forms functional and demonstrable
- Municipality-specific theming complete (Bruchtal lake theme)
- AI features operational and impressive for presentation
- Swiss compliance documentation ready for stakeholder review

#### Team Efficiency
- Three-lane parallel work streams operating without blocking dependencies
- Shared knowledge base updated in real-time via mcp__server-memory
- Automated testing suite covering all demo scenarios
- Coordinated handoffs between specialized lanes

Your three-lane compounding engineering system is configured for maximum parallel efficiency while ensuring Swiss compliance, accessibility, and demo readiness. Each lane has clear responsibilities and learns from every interaction to compound knowledge and accelerate future development.

---

*This file evolves with every interaction. Each success and failure teaches the system, making tomorrow's development faster than today's.*
- nutze tmux-cli für die zweiweiteren lanes. Du kannst damit weitere claude-code sessions starten.
- Bevor du eine neue Aufgabe anfängst. Immer erst bei Context7 die Dokumentation dazu lesen!
- Für alle Fragen rundum Claude Code optimierung bitte https://docs.anthropic.com/llms.txt im hinterkopf behalten. Wir brauchen hier sowieso ein Ordner .claude/llms/ diese Dateien immer berücksichten.
- Immer im Drupal-Weg denken. Wir wollen einen Standard Nutzen und die vorhandenen Dinge, die uns Drupal gibt, verwenden. Keine wilden Ideen dort entwickeln.
- wenn du Mock daten erzeugst, kannst du ruhig Herr der Ringe Referenzen hernehmen. "Theodin <Nachname>" kann also ruhig der Vorsitzende des Reitvereines sein ;).
- Bitte dran denken, dass es nur eine Demo ist. Wir brauchen also      │
│   keine krassen Dinge machen.