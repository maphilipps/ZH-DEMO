# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Adesso CMS** project - a modern Drupal 11 CMS implementation leveraging cutting-edge AI integration, component-driven development, and enterprise-grade content management capabilities. The project features a comprehensive agent ecosystem designed for efficient Drupal development workflows.

### **Technology Stack**
- **Drupal Core**: 11.2.2 (Latest Drupal 11)
- **PHP**: 8.3 with MariaDB 10.11
- **Frontend**: Vite 6.2.0 + Tailwind CSS v4 + Alpine.js patterns
- **Components**: Single Directory Components (SDC) + Storybook 8.6.7
- **AI Integration**: Drupal CMS AI with OpenAI (GPT-4o), Anthropic (Claude), and Groq providers
- **Development**: DDEV environment with comprehensive testing suite

### **Key Features**
- **25+ Custom SDC Components** with Storybook documentation
- **AI-Powered Content Generation** with automated alt text and suggestions
- **Modern Build Pipeline** with Vite HMR and PostCSS processing
- **Comprehensive Testing** including Visual Regression (BackstopJS), E2E (Playwright), and Unit (Vitest)
- **Enterprise Accessibility** with WCAG 2.1 AA compliance tools
- **Advanced Performance Optimization** with Core Web Vitals monitoring

### **Project Structure**
```
/web/themes/custom/adesso_cms_theme/
├── components/           # 25+ SDC components (hero, gallery, accordion, etc.)
├── src/                 # Source assets (CSS, JS)
├── .storybook/          # Component documentation
└── tests/               # Component and visual tests

/recipes/
├── adesso_cms_starter/  # Site initialization recipe
└── adesso_cms_paragraphs/ # Custom paragraph components

/config-export/          # Drupal configuration management
```

The agents work together as a specialized development team, with each agent having domain expertise in specific aspects of Drupal development, from AI integration to component architecture.

## Working with Agents

When creating or modifying agents:
1. Agents are Markdown files with YAML frontmatter
2. Most agents should omit the `tools` field to inherit all available tools
3. Use XML-style examples in descriptions for intelligent invocation
4. Agents return structured findings for main agent coordination

## KRITISCH: Linear Integration Workflow

**IMMER jeden kleinen Schritt direkt in Linear dokumentieren - nicht nur am Ende!**

### Linear Task Management Regeln:
1. **Vor jedem Task**: Linear-Task erstellen/aktualisieren
2. **Während der Arbeit**: Jeden kleinen Fortschritt sofort in Linear kommentieren
3. **Bei jedem Dateiwechsel**: Linear Task Status und Progress aktualisieren
4. **Bei jedem Commit**: Linear Task ID in Commit Message referenzieren
5. **Nach Abschluss**: Linear Task als "Done" markieren mit vollständigem Summary

### Beispiel Linear Integration:
```bash
# Schritt 1: Linear Task Update
linear-task-coordinator: "Starting DDEV command implementation - ADC-501"

# Schritt 2: Während File Creation
linear-task-coordinator: "Created ddev cim command - validation logic implemented"

# Schritt 3: Nach Testing  
linear-task-coordinator: "ddev cim tested successfully - German brand compliance added"

# Schritt 4: Final Update
linear-task-coordinator: "ADC-501 complete - both ddev cim and export-all working"
```

**NIEMALS** nur am Ende dokumentieren - das ist zu spät!

## Orchestration Pattern for Claude Code

Since sub-agents in Claude Code cannot directly invoke other sub-agents, orchestration follows this strict pattern:

### CRITICAL: Agent Routing Protocol

**When handling complex tasks, you MUST:**

1. **ALWAYS start with tech-lead-orchestrator** for any multi-step task
2. **FOLLOW the agent routing map** returned by tech-lead EXACTLY
3. **USE ONLY the agents** explicitly recommended by tech-lead
4. **NEVER select agents independently** - tech-lead knows which agents exist

### Example: Building a Feature with Agent Routing

```
User: "Build a user management system"

Main Claude Agent:
1. First, I'll use the tech-lead-orchestrator to analyze and get routing
   → Tech lead returns Agent Routing Map with SPECIFIC agents
   
2. I MUST use ONLY the agents listed in the routing map:
   - If tech-lead says "use django-api-developer" → Use that EXACT agent
   - If tech-lead says "use react-component-architect" → Use that EXACT agent
   - DO NOT substitute with generic agents unless specified as fallback
   
3. Execute tasks in the order specified by tech-lead using TodoWrite
```

### Key Orchestration Rules

1. **Tech-Lead is Routing Authority**: Tech-lead determines which agents can handle each task
2. **Strict Agent Selection**: Use ONLY agents from tech-lead's "Available Agents" list
3. **No Improvisation**: Do NOT select agents based on your own judgment
4. **Deep Reasoning**: Apply careful thought when coordinating the recommended agents
5. **Structured Handoffs**: Extract and pass information between agent invocations

### Agent Selection Flow

```
CORRECT FLOW:
User Request → Tech-Lead Analysis → Agent Routing Map → Execute with Listed Agents

INCORRECT FLOW:
User Request → Main Agent Guesses → Wrong Agent Selected → Task Fails
```

### Example Tech-Lead Response You Must Follow

When tech-lead returns:
```
## Available Agents for This Project
- django-backend-expert: Django tasks
- django-api-developer: API tasks  
- react-component-architect: React UI
```

You MUST use these specific agents, NOT generic alternatives like "backend-developer"

## High-Level Architecture

### Agent Organization
The project follows a hierarchical structure:

1. **Orchestrators** (`agents/orchestrators/`)
    - `tech-lead-orchestrator`: Coordinates complex projects through three-phase workflow (Research → Planning → Execution)
    - `project-analyst`: Detects technology stack and enables intelligent routing
    - `team-configurator`: Creates agent routing rules in CLAUDE.md files

2. **Core Agents** (`agents/core/`)
    - Cross-cutting concerns like code archaeology, reviews, performance, and documentation
    - These agents support all technology stacks

3. **Universal Agents** (`agents/universal/`)
    - Framework-agnostic specialists (API, backend, frontend, Tailwind)
    - Fallback when no framework-specific agent exists

4. **Specialized Agents** (`agents/specialized/`)
    - Framework-specific experts organized by technology
    - Subdirectories: laravel/, django/, rails/, react/, vue/

### Three-Phase Orchestration Workflow (Main Agent Coordinated)

The main Claude agent implements a human-in-the-loop workflow using the tech-lead-orchestrator:

1. **Research Phase**: Tech-lead analyzes requirements and returns structured findings
2. **Approval Gate**: Main agent presents findings and waits for human approval
3. **Planning Phase**: Main agent creates tasks with TodoWrite based on tech-lead's recommendations
4. **Execution Phase**: Main agent invokes specialists sequentially with filtered context

### Agent Communication Protocol

Since sub-agents cannot directly communicate or invoke each other:
- **Structured Returns**: Each agent returns findings in a parseable format
- **Context Passing**: Main agent extracts relevant information from returns
- **Sequential Coordination**: Main agent manages the execution flow
- **Handoff Information**: Agents include what the next specialist needs in their returns

Example return format:
```
## Task Completed: API Design
- Endpoints defined: GET/POST/PUT/DELETE /api/users
- Authentication: Bearer token required
- Next specialist needs: This API specification for implementation
```

### Intelligent Routing

The system automatically routes tasks based on:
1. Project context (detected by project-analyst)
2. Framework-specific routing when applicable
3. Universal fallback for unknown stacks
4. Task requirements and agent expertise

## Key Concepts

### Agent Definition Format
```yaml
---
name: agent-name
description: |
  Expertise description with XML examples
  Examples:
  - <example>
    Context: When to use
    user: "Request"
    assistant: "I'll use agent-name"
    <commentary>Why selected</commentary>
  </example>
# tools: omit for all tools, specify for restrictions
---

# Agent Name
System prompt content...
```

### Ambiguity Detection
- Project-analyst flags uncertainties in analysis
- Tech-lead presents research findings for approval before execution
- Agents should identify assumptions needing clarification

### Tool Inheritance
- Omitting `tools` field = inherit all tools (recommended)
- Specify tools only for security restrictions
- Includes WebFetch, MCP tools when available

## Development Guidelines

1. **Creating New Agents**:
    - Use templates/agent-template.md as starting point
    - Focus on single domain expertise
    - Include 2-3 XML examples
    - Define structured return format

2. **Agent Return Patterns**:
    - Always return findings in structured format
    - Include "Next Steps" or "Handoff Information"
    - Specify what context next specialist needs
    - Main agent will parse and coordinate

3. **Testing Agents**:
    - Test invocation patterns
    - Verify delegation works correctly
    - Ensure quality of output

## Important Files and Patterns

- `docs/orchestration-patterns.md`: Detailed three-phase workflow documentation
- `docs/creating-agents.md`: Guide for creating new agents
- `docs/best-practices.md`: Agent development best practices
- `examples/`: Real-world usage examples
- All agents support human-in-the-loop through the tech-lead's approval gate

## Complete Orchestration Example

Here's a full example showing proper agent routing:

### User Request:
"Help me build an authentication system for my web app"

### Step 1: Tech-Lead Analysis
```
Main Agent: "I'll use the tech-lead-orchestrator to analyze this request and determine the best approach."

[Invokes tech-lead-orchestrator]
```

### Step 2: Tech-Lead Returns Routing Map
```
## Agent Routing Map

Task 1: Detect Project Technology
- PRIMARY AGENT: project-analyst
- REASON: Need to identify framework for proper routing

Task 2: Design Authentication Schema  
- PRIMARY AGENT: database-architect
- REASON: Framework-agnostic database design

Task 3: Implement Auth Backend
- PRIMARY AGENT: django-backend-expert
- FALLBACK AGENT: backend-developer
- REASON: Django detected in project

Task 4: Create Auth API Endpoints
- PRIMARY AGENT: django-api-developer
- FALLBACK AGENT: api-architect
- REASON: Django REST Framework patterns

## Available Agents for This Project
- project-analyst
- database-architect  
- django-backend-expert
- django-api-developer
- code-reviewer

## CRITICAL INSTRUCTION
Use ONLY the agents listed above. Do NOT use laravel, rails, or other framework agents.
```

### Step 3: Main Agent Executes Plan
```
Main Agent: "Based on the tech-lead's routing, I'll now coordinate the implementation:"

1. ✓ Using project-analyst to analyze the codebase
2. ✓ Using database-architect for auth schema design  
3. ✓ Using django-backend-expert for implementation
4. ✓ Using django-api-developer for API endpoints
5. ✓ Using code-reviewer for security audit

[Executes each step with the EXACT agents specified]
```

### What NOT to Do:
```
❌ "I'll use backend-developer" (when tech-lead specified django-backend-expert)
❌ "I'll use rails-api-developer" (wrong framework)
❌ "I'll skip the tech-lead and choose agents myself" (bypasses routing)
```

## Critical Reminders

- ALWAYS use tech-lead-orchestrator for multi-step tasks to get proper agent routing
- FOLLOW the agent routing map exactly - do not improvise
- USE deep reasoning when coordinating the recommended agents
- TRUST the tech-lead's expertise in agent selection

---

## Drupal 11 CMS Project Configuration
*Optimized by team-configurator on 2025-01-13*

### Detected Technology Stack
- **Backend**: Drupal 11.2.2 with extensive CMS suite integration
- **Frontend**: Single Directory Components (SDC) + Alpine.js + Tailwind CSS v4
- **AI Integration**: Drupal CMS AI with multiple providers (Anthropic, OpenAI, Groq)
- **Component System**: Storybook + SDC for component development
- **Testing**: Playwright + Drupal testing framework

### Linear-First Agent Routing for Enterprise Development

#### **Core Development Workflows (Linear-Integrated)**

**Module Development Workflow:**
```yaml
Linear Task Pattern: "As a developer, I want [module functionality] so that [business value]"
Agent Sequence:
  1. linear-task-coordinator: Create Linear epic and task breakdown
  2. drupal-11-lead-developer: Module architecture and implementation
  3. code-reviewer: Security and quality review with Linear updates
  4. qa-testing-specialist: Comprehensive testing with Linear reporting
```

**Configuration Management Workflow:**
```yaml
Linear Task Pattern: "As a site admin, I want [configuration] so that [operational benefit]"
Agent Sequence:
  1. linear-task-coordinator: Analyze impact and create Linear tasks
  2. drupal-configuration-expert: Environment-specific configuration
  3. drupal-devops-engineer: Deployment pipeline with Linear integration
  4. qa-testing-specialist: Configuration validation and Linear completion
```

**Performance Optimization Workflow:**
```yaml
Linear Task Pattern: "As a user, I want [faster experience] so that [engagement improves]"
Agent Sequence:
  1. linear-task-coordinator: Baseline measurement and Linear task creation
  2. drupal-performance-specialist: Drupal-specific optimizations
  3. performance-optimizer: General performance improvements
  4. qa-testing-specialist: Validation and Core Web Vitals reporting
```

#### **Content & Media Management Workflows (Linear-Integrated)**

**Content Type Creation with AI:**
```yaml
Linear Epic: "Enhanced Content Management with AI Integration"
Task Breakdown:
  - ADC-001: Content type architecture and field design
  - ADC-002: AI content suggestion integration  
  - ADC-003: Security and privacy validation
  - ADC-004: Testing and documentation completion

Agent Coordination:
  1. linear-task-coordinator: Create comprehensive task breakdown
  2. drupal-cms-content-types: Schema design and implementation (ADC-001)
  3. drupal-ai-integration-specialist: AI features integration (ADC-002)
  4. drupal-cms-security-privacy: Security validation (ADC-003)
  5. qa-testing-specialist: Testing and validation (ADC-004)
```

**Media Management Enhancement:**
```yaml
Linear Epic: "Responsive Media Management with AI Alt Text"
Agent Coordination:
  1. linear-task-coordinator: Impact analysis and Linear task creation
  2. drupal-media-expert: Media type configuration and responsive images
  3. drupal-ai-integration-specialist: AI-powered alt text generation
  4. sdc-component-specialist: Media display components
  5. qa-testing-specialist: Accessibility and performance validation
```

#### **Frontend & Component Development Workflows (Linear-Integrated)**

**SDC Component Development:**
```yaml
Linear Epic: "Responsive SDC Component with Storybook Documentation"
Task Breakdown:
  - ADC-101: Component architecture and design
  - ADC-102: Storybook documentation and testing
  - ADC-103: Alpine.js interaction implementation
  - ADC-104: Accessibility and performance validation

Agent Sequence:
  1. linear-task-coordinator: Component analysis and task planning
  2. sdc-component-specialist: Component development (ADC-101)
  3. storybook-sdc-maintainer: Documentation and stories (ADC-102)
  4. alpine-js-frontend-developer: Interaction implementation (ADC-103)
  5. qa-testing-specialist: Quality validation (ADC-104)
```

**Theme Development Workflow:**
```yaml
Linear Epic: "Tailwind CSS v4 Theme Enhancement"
Agent Coordination:
  1. linear-task-coordinator: Theme requirements and Linear planning
  2. drupal-frontend-theming-specialist: Theme architecture
  3. tailwind-v4-expert: Modern CSS implementation
  4. qa-testing-specialist: Cross-browser and accessibility testing
```

#### **AI-Enhanced Features Workflows (Linear-Integrated)**

**AI Content Generation Pipeline:**
```yaml
Linear Epic: "Enterprise AI Content Generation with Safety Validation"
Task Breakdown:
  - ADC-201: AI provider configuration and testing
  - ADC-202: Content generation workflow implementation
  - ADC-203: AI safety and moderation integration
  - ADC-204: Performance optimization and monitoring

Agent Coordination:
  1. linear-task-coordinator: AI integration planning and risk assessment
  2. drupal-ai-integration-specialist: Core AI implementation (ADC-201, ADC-202)
  3. drupal-cms-security-privacy: Safety validation (ADC-203)
  4. drupal-performance-specialist: Performance optimization (ADC-204)
  5. qa-testing-specialist: Comprehensive AI feature testing
```

#### **Operations & Deployment Workflows (Linear-Integrated)**

**DevOps Pipeline Enhancement:**
```yaml
Linear Epic: "Enterprise DevOps Pipeline with Automated Quality Gates"
Agent Coordination:
  1. linear-task-coordinator: Pipeline requirements and Linear task creation
  2. drupal-devops-engineer: CI/CD pipeline implementation
  3. drupal-configuration-expert: Environment configuration management
  4. qa-testing-specialist: Automated testing integration
```

**Security Review Workflow:**
```yaml
Linear Epic: "Comprehensive Security Audit and Hardening"
Agent Coordination:
  1. linear-task-coordinator: Security assessment and Linear task planning
  2. drupal-cms-security-privacy: Security audit and recommendations
  3. code-reviewer: Code-level security validation
  4. qa-testing-specialist: Security testing and vulnerability scanning
```

### **Enterprise Task Examples with Linear Integration**

#### **Example 1: AI-Enhanced Content Management System**
```yaml
User Request: "Build a content management system with AI suggestions for editors"

Linear Workflow:
  Epic: "AI-Enhanced Editorial Experience"
  
  Tasks Created by linear-task-coordinator:
    - ADC-301: Content editor workflow analysis
    - ADC-302: AI suggestion engine integration
    - ADC-303: Editorial UI/UX implementation
    - ADC-304: Content quality assurance automation
    - ADC-305: Performance and security validation
    - ADC-306: Training and documentation
  
  Agent Execution Sequence:
    1. drupal-content-strategist: Editorial workflow design (ADC-301)
    2. drupal-ai-integration-specialist: AI integration (ADC-302)
    3. drupal-frontend-theming-specialist: UI implementation (ADC-303)
    4. drupal-cms-security-privacy: Quality assurance (ADC-304)
    5. qa-testing-specialist: Validation testing (ADC-305)
    6. documentation-specialist: Training materials (ADC-306)
```

#### **Example 2: Responsive Component Library with Accessibility**
```yaml
User Request: "Create a comprehensive component library with WCAG 2.1 AA compliance"

Linear Workflow:
  Epic: "Enterprise Component Library with Accessibility"
  
  Tasks Created by linear-task-coordinator:
    - ADC-401: Component inventory and requirements
    - ADC-402: SDC component architecture
    - ADC-403: Storybook documentation system
    - ADC-404: Accessibility compliance implementation
    - ADC-405: Visual regression testing setup
    - ADC-406: Performance optimization
  
  Agent Execution Sequence:
    1. sdc-component-specialist: Component development (ADC-401, ADC-402)
    2. storybook-sdc-maintainer: Documentation system (ADC-403)
    3. qa-testing-specialist: Accessibility implementation (ADC-404)
    4. performance-optimizer: Visual testing and optimization (ADC-405, ADC-406)
```

#### **Example 3: Performance Optimization Following Lullabot Standards**
```yaml
User Request: "Optimize site performance to meet Core Web Vitals requirements"

Linear Workflow:
  Epic: "Core Web Vitals Optimization (Lullabot Standards)"
  
  Tasks Created by linear-task-coordinator:
    - ADC-501: Performance baseline and analysis
    - ADC-502: Drupal cache optimization
    - ADC-503: Image optimization and responsive delivery
    - ADC-504: JavaScript and CSS optimization
    - ADC-505: Third-party integration optimization
    - ADC-506: Monitoring and alerting setup
  
  Agent Execution Sequence:
    1. drupal-performance-specialist: Drupal optimizations (ADC-501, ADC-502)
    2. drupal-frontend-theming-specialist: Asset optimization (ADC-503, ADC-504)
    3. drupal-devops-engineer: Integration optimization (ADC-505)
    4. performance-optimizer: Monitoring setup (ADC-506)
```

### **Quality Gate Integration Examples**

#### **Pre-Development Quality Gates**
```yaml
Example: New SDC Component Development

Gates Enforced by linear-task-coordinator:
  1. Context7 Validation:
     - Component pattern compliance
     - Accessibility requirements planning
     - Performance impact assessment
     
  2. Technical Feasibility:
     - Drupal SDC architecture review
     - Storybook integration planning
     - Testing strategy validation
     
  3. Business Alignment:
     - User story completeness
     - Stakeholder requirement validation
     - Success criteria definition
```

#### **Development Quality Gates**
```yaml
Example: During AI Integration Development

Gates Monitored by qa-testing-specialist:
  1. Code Quality:
     - Drupal coding standards (PSR-12)
     - AI integration best practices
     - Security vulnerability scanning
     
  2. Testing Requirements:
     - Unit test coverage >90%
     - AI functionality testing
     - Edge case validation
     
  3. Documentation:
     - Linear task progress updates
     - Code documentation completeness
     - User guide updates
```

#### **Pre-Merge Quality Gates**
```yaml
Example: Before Component PR Merge

Gates Validated by multiple agents:
  1. Review Requirements:
     - Technical review: code-reviewer
     - Accessibility review: qa-testing-specialist
     - Performance review: performance-optimizer
     
  2. Automated Testing:
     - Visual regression tests passing
     - E2E test scenarios successful
     - Accessibility compliance verified
     
  3. Linear Task Completion:
     - All acceptance criteria met
     - Stakeholder approval documented
     - Deployment readiness confirmed
```

---

## Quick Start: Using Enterprise Linear Workflows

### **Essential Commands for Development Teams**

#### **Starting Development Work**
```bash
# Always begin with linear-task-coordinator for proper task creation
"I need to [specific requirement]" → linear-task-coordinator creates Linear tasks

# Examples:
"Build AI content suggestions for editors"
"Create accessible navigation component" 
"Optimize Core Web Vitals performance"
"Implement multi-language content workflow"
```

#### **Working with Specific Agents**
```bash
# Follow Linear task assignments from coordinator
→ ADC-123 assigned to drupal-ai-integration-specialist
→ ADC-124 assigned to sdc-component-specialist  
→ ADC-125 assigned to qa-testing-specialist

# Each agent updates Linear task progress automatically
```

### **Team Workflow Examples**

#### **Content Editor Requesting New Feature**
```yaml
Request: "I need AI-powered content suggestions while writing articles"

Automatic Workflow:
  1. linear-task-coordinator analyzes request
  2. Creates Linear epic: "AI Editorial Assistance"
  3. Breaks down into specific tasks with agents assigned
  4. Each agent reports progress in Linear
  5. Quality gates enforce Lullabot standards
  6. Stakeholder approval before deployment
```

#### **Developer Starting Component Work**
```yaml
Request: "Create responsive card component with Storybook documentation"

Enterprise Process:
  1. linear-task-coordinator validates requirements
  2. Context7 checks component patterns
  3. Creates Linear tasks with acceptance criteria
  4. sdc-component-specialist develops component
  5. storybook-sdc-maintainer adds documentation
  6. qa-testing-specialist validates accessibility
  7. Multiple peer reviews before merge
```

#### **DevOps Engineer Deploying Changes**  
```yaml
Request: "Deploy latest changes to production with zero downtime"

Automated Workflow:
  1. linear-task-coordinator creates deployment tasks
  2. drupal-devops-engineer validates readiness
  3. All quality gates must pass (accessibility, performance, security)
  4. Staged deployment with rollback plan
  5. Real-time monitoring and success validation
  6. Linear task completion with metrics
```

### **Quality Gate Enforcement**

Every development activity automatically enforces:
- **WCAG 2.1 AA Compliance**: Via mcp__a11y-accessibility tools
- **Core Web Vitals**: Performance standards >90 scores
- **Security Standards**: Drupal security best practices
- **Code Quality**: PSR-12 + Drupal coding standards
- **German Brand Compliance**: "adesso wird immer klein geschrieben"

### **MCP Tool Integration Benefits**

- **GitHub Automation**: Automatic PR creation, reviews, and merging
- **Context7 Validation**: Lullabot best practice enforcement  
- **Accessibility Testing**: Automated WCAG compliance checking
- **Performance Monitoring**: Continuous Core Web Vitals tracking
- **Knowledge Management**: Decision and pattern documentation

### **Success Metrics Dashboard**

The enterprise workflow tracks:
- **Development Velocity**: Linear task completion rates
- **Quality Standards**: Accessibility and performance scores
- **Security Posture**: Zero critical vulnerabilities
- **German Market Performance**: Brand compliance and engagement

---

## Agent Ecosystem Status

### **Available Specialized Agents** ✅
All critical Drupal development agents are available:
- **27 Drupal-specific agents** covering all development aspects
- **4 orchestrator agents** for workflow management  
- **4 core agents** for cross-cutting concerns
- **4 universal agents** for framework-agnostic tasks

### **Enterprise Integration Complete** ✅
- **Linear workflow integration** with automatic task creation
- **Lullabot methodology** implementation with quality gates
- **Full MCP integration** for GitHub, Context7, A11y, Performance
- **German market compliance** with brand enforcement
- **Multi-environment deployment** with automated testing

Your adesso CMS development team is now fully optimized for enterprise-grade, Linear-first development following Lullabot best practices with comprehensive MCP tool integration!

## Development Workflows

### **Local Development Environment (DDEV)**
```bash
# Start development environment
ddev start                    # Initialize DDEV environment
ddev theme dev               # Start Vite dev server (localhost:5173)
ddev theme storybook         # Start Storybook server (localhost:6006)

# Asset building
ddev theme watch             # Watch for changes with HMR
ddev theme build             # Production build
ddev npm run test            # Run Vitest component tests
```

### **Content Management Workflows**
- **Content Creation**: Paragraph-based content with 15+ paragraph types
- **AI Integration**: Automated alt text generation and content suggestions
- **Multi-language**: Support for multiple content languages
- **Media Management**: Enhanced with bulk upload and entity browser
- **SEO Optimization**: Built-in SEO tools with automated meta generation

### **Component Development Process**
1. **Create SDC Component** in `/components/` directory
2. **Add Storybook Story** for documentation and testing
3. **Write Unit Tests** with Vitest for component logic
4. **Visual Regression Tests** with BackstopJS scenarios
5. **Integration Testing** with Drupal's testing framework

### **Quality Assurance Pipeline**
- **Performance Testing**: Core Web Vitals monitoring with Lighthouse
- **Accessibility Validation**: WCAG 2.1 AA compliance checking
- **Cross-browser Testing**: Playwright E2E test suite
- **Code Quality**: ESLint + Stylelint + Drupal coding standards

### **AI-Enhanced Development**
- **Content Generation**: AI-powered content suggestions and generation
- **Image Processing**: Automatic alt text generation for accessibility
- **Translation Assistance**: AI-assisted content translation workflows
- **Code Assistance**: Integration with Claude and GPT models for development

## Project-Specific Conventions

### **Coding Standards**
- **PHP**: PSR-12 coding standards with Drupal-specific extensions
- **JavaScript**: ESLint with Airbnb configuration
- **CSS**: Stylelint with Tailwind CSS v4 best practices
- **Templates**: Twig templating with accessibility-first approach

### **Configuration Management**
- **Config Export**: Comprehensive configuration in `/config-export/`
- **Recipe System**: Drupal 11 recipes for reproducible installations
- **Environment Parity**: Consistent configuration across dev/staging/production
- **Version Control**: All configuration changes tracked in Git

### **Performance Optimization**
- **Asset Optimization**: Vite-based build pipeline with tree shaking
- **Image Optimization**: Multiple responsive formats with WebP support
- **Caching Strategy**: Drupal render caching with block-level granularity
- **Core Web Vitals**: Automated performance monitoring and optimization

### **Security & Compliance**
- **Input Validation**: Comprehensive sanitization and validation
- **Content Security**: AI moderation workflows for content safety
- **Access Control**: Role-based permissions with content workflow
- **GDPR Compliance**: Privacy-focused data handling and consent management

---

## Enterprise Linear Workflow Integration
*Comprehensive Lullabot-pattern enterprise workflows with full MCP integration - Updated 2025-01-13*

### **Core Lullabot Enterprise Principles**

Following Lullabot's enterprise workflow methodology, this project implements:

#### **1. Ticket Quality Standards**
- **Clear User Stories**: Every Linear task follows "As a [user], I want [goal] so that [benefit]" format
- **Background Context**: Technical background, business requirements, and stakeholder needs
- **Acceptance Criteria**: Specific, measurable criteria with testing requirements  
- **Visual Documentation**: Screenshots, wireframes, and design specifications
- **Definition of Done**: Complete checklist including code review, testing, and documentation

#### **2. Multiple Peer Review Process**
```yaml
Required Reviews (Minimum 2):
  1. Technical Review:
     - Code quality and Drupal standards
     - Security vulnerability assessment
     - Performance impact analysis
     
  2. Business Review:  
     - Feature functionality validation
     - User experience assessment
     - Accessibility compliance check
     
  3. Architecture Review (for major changes):
     - System design implications
     - Scalability considerations
     - Integration impact assessment
```

#### **3. Automated Testing Gates**
All development work must pass comprehensive automated testing:
- **Accessibility**: WCAG 2.1 AA compliance via mcp__a11y-accessibility tools
- **Functional Regression**: Playwright E2E test suite via mcp__playwright
- **Security Scanning**: Drupal security best practices validation
- **Performance**: Core Web Vitals monitoring and lighthouse audits
- **Content Quality**: AI-powered content validation and moderation

#### **4. Preview and Validation Environments**
- **Automatic Preview Environments**: For every PR with real content testing
- **Stakeholder Review Process**: Business stakeholder approval workflows
- **User Acceptance Testing**: Structured UAT with documented test scenarios
- **Content Editor Training**: Documentation and training for content workflows

#### **5. Release Management**
- **Scheduled Deployments**: Never emergency deployments without approval
- **Grouped Changes**: Logical feature groupings for reduced deployment risk
- **Risk Mitigation**: Rollback plans and feature flag implementation
- **Post-deployment Monitoring**: Automated monitoring and alert systems

### **Linear-First Workflow Architecture**

#### **Automatic Linear Task Creation via MCP Integration**

Every development activity automatically creates structured Linear tasks:

```yaml
Linear Task Auto-Creation Triggers:
  - User requests via Claude Code interface
  - GitHub pull request creation  
  - Failed automated tests requiring fixes
  - Security vulnerability detection
  - Performance regression alerts
  - Accessibility compliance failures
  - Content workflow issues
```

#### **Linear Task Structure (Lullabot Pattern)**

```markdown
# Linear Task Template

## User Story
As a [user type], I want [feature/fix] so that [business value].

## Background & Context  
- **Business Need**: [Why this is important]
- **Technical Context**: [System implications] 
- **Stakeholder**: [Who requested/benefits]
- **Priority**: [Business priority level]

## Acceptance Criteria
- [ ] Specific measurable outcome 1
- [ ] Specific measurable outcome 2  
- [ ] Performance requirements met
- [ ] Accessibility compliance verified
- [ ] Documentation completed

## Technical Implementation Notes
- **Affected Systems**: [Drupal modules, themes, configs]
- **Dependencies**: [Other tasks/systems]
- **Risk Assessment**: [Potential impacts]

## Testing Requirements
- [ ] Unit tests written/updated
- [ ] Visual regression tests updated  
- [ ] E2E test scenarios created
- [ ] Accessibility audit completed
- [ ] Performance impact measured

## Definition of Done
- [ ] Code review completed (min 2 reviewers)
- [ ] All automated tests passing
- [ ] Documentation updated
- [ ] Stakeholder approval received
- [ ] Deployment plan reviewed
```

### **Branch Strategy & Git Workflow**

#### **Lullabot-Standard Branch Strategy**
```yaml
Branch Naming Convention:
  feature/linear-[TASK-ID]-[short-description]
  bugfix/linear-[TASK-ID]-[short-description] 
  hotfix/linear-[TASK-ID]-[critical-description]
  
Examples:
  feature/linear-ADC-123-ai-content-suggestions
  bugfix/linear-ADC-456-sdc-component-accessibility
  hotfix/linear-ADC-789-security-vulnerability-fix
```

#### **Never Direct Commits Rule**
- **Main Branch Protection**: All changes via pull requests only
- **Feature Branch Requirements**: Must originate from Linear tasks
- **Review Gates**: Minimum 2 approvals before merge
- **Automated Checks**: All quality gates must pass

#### **Pull Request Workflow**
```yaml
PR Creation Workflow:
  1. GitHub PR Auto-Creation:
     - mcp__github__create_pull_request with Linear task reference
     - Auto-assign reviewers based on changed files
     - Link to Linear task for full context
     
  2. Automated Quality Checks:
     - mcp__playwright automated E2E testing
     - mcp__a11y-accessibility compliance validation
     - mcp__browser-tools performance auditing
     - Security scanning and vulnerability detection
     
  3. Review Assignment:
     - Technical reviewer (code quality, performance, security)
     - Business reviewer (functionality, UX, accessibility)
     - Architecture reviewer (for major changes)
     
  4. Approval Requirements:
     - Minimum 2 approved reviews
     - All automated checks passing
     - Linear task acceptance criteria met
     - Documentation requirements satisfied
```

### **Comprehensive MCP Integration Strategy**

#### **GitHub MCP Integration (mcp__github__*)**
```yaml
Automated GitHub Workflows:
  - mcp__github__create_pull_request: Auto-create PRs with Linear context
  - mcp__github__create_branch: Feature branches with Linear task IDs  
  - mcp__github__add_issue_comment: Progress updates from Linear
  - mcp__github__request_copilot_review: AI-assisted code review
  - mcp__github__merge_pull_request: Automated merge after approvals
  - mcp__github__update_pull_request_branch: Keep branches current
  
Quality Gate Integration:
  - mcp__github__get_pull_request_files: Change analysis
  - mcp__github__create_and_submit_pull_request_review: Automated reviews
  - mcp__github__list_workflow_runs: CI/CD pipeline monitoring
  - mcp__github__get_workflow_run_logs: Debug failed builds
```

#### **Context7 MCP Integration (mcp__context7__*)**  
```yaml
Best Practice Validation:
  - mcp__context7__resolve-library-id: Framework-specific guidance
  - mcp__context7__get-library-docs: Lullabot pattern enforcement
  
Automated Validation Triggers:
  - Every Linear task creation validates approach via Context7
  - Pull request creation triggers best practice compliance check
  - Performance optimization validates against Lullabot standards
  - Security implementations verified against community best practices
```

#### **Memory MCP Integration (mcp__server-memory__*)**
```yaml
Project Knowledge Management:
  - mcp__server-memory__create_entities: Document architectural decisions
  - mcp__server-memory__create_relations: Link related components and patterns
  - mcp__server-memory__add_observations: Capture lessons learned
  - mcp__server-memory__search_nodes: Find previous solutions and patterns
  
Knowledge Graph Applications:
  - Component relationship mapping
  - Performance optimization decision history
  - Security incident response knowledge
  - Stakeholder requirement evolution
```

#### **Browser Tools & Playwright MCP Integration**
```yaml
Automated Testing & Auditing:
  - mcp__browser-tools__runAuditMode: Comprehensive site auditing
  - mcp__browser-tools__runAccessibilityAudit: WCAG 2.1 AA compliance
  - mcp__browser-tools__runPerformanceAudit: Core Web Vitals monitoring
  - mcp__browser-tools__runSEOAudit: SEO best practices validation
  - mcp__playwright__browser_snapshot: Visual regression testing
  - mcp__playwright__browser_take_screenshot: Documentation screenshots
  
Quality Gate Integration:
  - Every PR triggers full audit suite
  - Performance regression detection
  - Accessibility compliance verification  
  - SEO impact assessment
```

#### **Accessibility MCP Integration (mcp__a11y-accessibility__*)**
```yaml
WCAG 2.1 AA Compliance Enforcement:
  - mcp__a11y-accessibility__test_accessibility: Comprehensive WCAG testing
  - mcp__a11y-accessibility__check_color_contrast: Color compliance validation
  - mcp__a11y-accessibility__check_aria_attributes: ARIA implementation review
  
Automated Compliance Workflow:
  - Every component creation triggers accessibility audit
  - PR merge blocked on accessibility failures
  - Regular site-wide compliance monitoring
  - Accessibility debt tracking in Linear
```

### **Quality Gate Configuration**

#### **Pre-Development Gates**
```yaml
Before Any Development Work:
  1. Linear Task Quality Validation:
     - User story completeness check
     - Acceptance criteria specificity  
     - Technical feasibility assessment
     - Resource allocation confirmation
     
  2. Context7 Best Practice Validation:
     - Framework compliance verification
     - Lullabot pattern alignment
     - Performance standard review
     - Security requirement validation
     
  3. Architectural Impact Assessment:
     - System integration analysis
     - Performance impact projection
     - Security implications review
     - Accessibility compliance planning
```

#### **Development Gates**
```yaml
During Development Process:
  1. Code Quality Gates:
     - Drupal coding standards compliance (PSR-12)
     - ESLint/Stylelint validation for frontend code
     - Security vulnerability scanning
     - Performance impact measurement
     
  2. Testing Gates:
     - Unit test coverage requirements (>90%)
     - Visual regression test creation
     - E2E test scenario development  
     - Accessibility compliance validation
     
  3. Documentation Gates:
     - Storybook documentation for components
     - Linear task progress updates
     - Code comment completeness
     - API documentation updates
```

#### **Pre-Merge Gates**
```yaml
Before Pull Request Merge:
  1. Review Gates:
     - Minimum 2 approved reviews
     - Technical review completion
     - Business/UX review approval
     - Architecture review (if applicable)
     
  2. Automated Testing Gates:
     - All unit tests passing
     - Visual regression tests passing
     - E2E test scenarios successful
     - Performance benchmarks met
     
  3. Compliance Gates:
     - Accessibility audit passed (WCAG 2.1 AA)
     - Security scan clear
     - SEO impact assessment approved
     - Core Web Vitals requirements met
```

#### **Post-Merge Gates**
```yaml
After Merge to Main:
  1. Deployment Gates:
     - Preview environment creation
     - Stakeholder review approval
     - Content editor acceptance
     - Performance monitoring setup
     
  2. Production Gates:
     - Scheduled deployment window
     - Rollback plan confirmation
     - Monitoring alert configuration
     - Success criteria measurement
```

### **Multi-Environment Workflow**

#### **Environment Strategy**
```yaml
Development Environments:
  1. Local DDEV:
     - Individual developer environments
     - Hot module replacement (HMR) via Vite
     - Component development with Storybook
     - Local testing suite execution
     
  2. Feature Branch Environments:
     - Automatic environment creation per PR
     - Real content testing capability
     - Stakeholder review environments
     - Integration testing execution
     
  3. Staging Environment:
     - Production-like configuration
     - Full content migration testing
     - Performance benchmarking
     - Security penetration testing
     
  4. Production Environment:
     - Zero-downtime deployment capability
     - Real-time monitoring and alerting
     - Automated rollback triggers
     - Performance optimization active
```

### **Workflow Automation Triggers**

#### **Linear Task Auto-Creation**
```javascript
// User Request Analysis
const taskCreationTriggers = {
  userRequest: async (request) => {
    // Analyze request complexity and create appropriate Linear tasks
    const analysis = await analyzeRequest(request);
    const linearTasks = await createLinearTaskStructure(analysis);
    return { tasks: linearTasks, workflow: 'enterprise-development' };
  },
  
  githubEvent: async (event) => {
    // Handle GitHub webhooks for automated task management
    if (event.type === 'pull_request.opened') {
      await updateLinearTaskStatus(event.pr.branch, 'in_review');
    }
    if (event.type === 'pull_request.merged') {
      await completeLinearTask(event.pr.branch);
    }
  },
  
  qualityGateFailure: async (failure) => {
    // Create remediation tasks for quality gate failures
    const remediationTask = await createRemediationTask(failure);
    return { task: remediationTask, priority: 'high' };
  }
};
```

#### **Automated Quality Monitoring**
```javascript
// Continuous Quality Monitoring
const qualityMonitoring = {
  accessibility: async () => {
    const auditResults = await mcp__a11y_accessibility__test_accessibility({
      url: process.env.STAGING_URL,
      tags: ['wcag2aa', 'wcag21aa']
    });
    
    if (auditResults.violations.length > 0) {
      await createLinearTask({
        type: 'accessibility_remediation',
        violations: auditResults.violations,
        priority: 'high'
      });
    }
  },
  
  performance: async () => {
    const performanceAudit = await mcp__browser_tools__runPerformanceAudit();
    
    if (performanceAudit.coreWebVitals.lcp > 2.5) {
      await createLinearTask({
        type: 'performance_optimization',
        metrics: performanceAudit.coreWebVitals,
        priority: 'medium'
      });
    }
  }
};
```

### **German Market & Brand Compliance**

#### **Brand Consistency Enforcement**
- **"adesso wird immer klein geschrieben"**: Automated validation in all content
- **Content Quality**: AI-powered German language validation
- **Cultural Appropriateness**: German market-specific content guidelines
- **Legal Compliance**: GDPR and German data protection law adherence

#### **Localization Workflow**
```yaml
German-First Content Strategy:
  1. Primary Content Creation:
     - German content creation and optimization
     - SEO optimization for German market
     - Cultural context validation
     
  2. Multi-language Expansion:
     - AI-assisted translation workflows
     - Cultural adaptation for target markets
     - Regional SEO optimization
     
  3. Quality Assurance:
     - Native speaker review processes
     - Cultural appropriateness validation
     - Legal compliance verification
```

### **Emergency & Escalation Procedures**

#### **Critical Issue Response**
```yaml
Production Issues (P0):
  1. Automatic Response:
     - Linear task creation with P0 priority
     - Immediate team notification
     - Emergency response team activation
     
  2. Resolution Process:
     - Hotfix branch creation
     - Accelerated review process (1 reviewer minimum)
     - Emergency deployment approval
     - Post-incident review mandatory
     
  3. Communication Protocol:
     - Stakeholder notification within 15 minutes
     - Regular status updates during resolution
     - Post-resolution summary and lessons learned
```

#### **Quality Gate Failures**
```yaml
Failed Quality Gates:
  1. Automated Response:
     - PR merge blocked
     - Linear task created for remediation  
     - Assignee notification
     
  2. Escalation Path:
     - L1: Automatic retry and developer notification
     - L2: Senior developer review and guidance  
     - L3: Architecture team consultation
     - L4: Project manager and business stakeholder involvement
```

### **Success Metrics & KPIs**

#### **Development Velocity**
- **Linear Task Completion Rate**: Sprint goal achievement percentage
- **Lead Time**: From task creation to production deployment
- **Cycle Time**: From development start to feature completion
- **Quality Metrics**: Defect rate and rework percentage

#### **Quality Metrics**
- **Accessibility Compliance**: WCAG 2.1 AA score maintenance >95%  
- **Performance Standards**: Core Web Vitals scores >90 consistently
- **Security Posture**: Zero critical vulnerabilities in production
- **User Satisfaction**: Content editor and end-user satisfaction scores

#### **Business Impact**
- **Feature Delivery**: On-time delivery against business commitments
- **System Reliability**: Uptime and performance consistency
- **Content Quality**: AI-enhanced content effectiveness metrics
- **Market Performance**: German market engagement and conversion rates

This enterprise-grade Linear workflow integration ensures that adesso CMS development follows Lullabot's proven methodologies while leveraging the full power of MCP tool integration for automated quality assurance, comprehensive testing, and seamless stakeholder collaboration.

---

## **Optimized Agent Routing Rules for adesso CMS Development**
*Updated 2025-01-14 - Drupal 11 + AI Integration Specific Workflows*

### **Technology Stack Confirmation**
✅ **Detected & Optimized For:**
- **Backend**: Drupal 11.2.2 + Drupal CMS Suite (AI, Content Types, Forms, Media, SEO)
- **AI Providers**: Drupal CMS AI ^1.2 + DrupalX AI (Claude, GPT-4o, Groq integration)
- **Frontend**: Vite 6.2.0 + Tailwind CSS v4.0 + Alpine.js patterns
- **Components**: 25+ SDC components with Storybook 8.6.7 documentation
- **Testing**: BackstopJS 6.3.25 + Vitest 3.2.4 + Playwright E2E
- **Development**: DDEV environment with comprehensive quality gates

---

## **Essential Development Workflow Patterns**

### **1. AI-Enhanced Content Features** 🤖
**Trigger Patterns**: AI content suggestions, automated alt text, content moderation, AI-powered SEO

**Optimized Agent Routing:**
```yaml
Request: "Add AI-powered alt text generation for media uploads"

Linear Workflow (Always EVERY step documented):
  Epic: "AI-Enhanced Media Management with Alt Text Generation"
  
  Subtasks (linear-task-coordinator creates):
    - ADC-1001: AI provider configuration and testing
    - ADC-1002: Media field integration for AI alt text
    - ADC-1003: Content editor UI/UX improvements  
    - ADC-1004: Privacy and safety validation
    - ADC-1005: Accessibility compliance verification
    - ADC-1006: Performance impact assessment
  
  Agent Execution Sequence:
    1. linear-task-coordinator: Epic creation and risk assessment
    2. drupal-ai-integration-specialist: AI provider setup (ADC-1001)
    3. drupal-media-expert: Media type configuration (ADC-1002)
    4. drupal-frontend-theming-specialist: Editor UI/UX (ADC-1003)
    5. drupal-cms-security-privacy: Safety validation (ADC-1004)
    6. qa-testing-specialist: Accessibility testing (ADC-1005)
    7. drupal-performance-specialist: Impact measurement (ADC-1006)
    8. code-reviewer: Security audit of AI integration
```

### **2. SDC Component Development** 🧩
**Trigger Patterns**: Responsive components, accessible UI elements, interactive features

**Optimized Agent Routing:**
```yaml
Request: "Create accessible accordion component with Storybook documentation"

Linear Workflow (IMMER JEDEN SCHRITT):
  Epic: "Enterprise SDC Accordion Component with Full Documentation"
  
  Subtasks (granular tracking):
    - ADC-2001: Component architecture and accessibility planning
    - ADC-2002: Twig template and SDC schema development
    - ADC-2003: Alpine.js interactive behavior implementation
    - ADC-2004: Storybook stories and documentation
    - ADC-2005: Visual regression testing setup
    - ADC-2006: WCAG 2.1 AA compliance validation
  
  Agent Execution Sequence:
    1. linear-task-coordinator: Requirements analysis + Linear epic
    2. sdc-component-specialist: Component architecture (ADC-2001, 2002)
    3. alpine-js-frontend-developer: Interactive behavior (ADC-2003)
    4. storybook-sdc-maintainer: Documentation system (ADC-2004)
    5. qa-testing-specialist: Testing and accessibility (ADC-2005, 2006)
    6. performance-optimizer: Performance impact measurement
```

### **3. Performance Optimization** ⚡
**Trigger Patterns**: Core Web Vitals issues, page speed optimization, performance regressions

**Optimized Agent Routing:**
```yaml
Request: "Optimize Core Web Vitals to achieve >90 scores across all metrics"

Linear Workflow (Performance-Focused):
  Epic: "Core Web Vitals Optimization (Enterprise Standards)"
  
  Subtasks (comprehensive approach):
    - ADC-3001: Performance baseline and bottleneck analysis
    - ADC-3002: Drupal caching strategy optimization
    - ADC-3003: Database query optimization and indexing
    - ADC-3004: Asset optimization (CSS, JS, images)
    - ADC-3005: Component lazy loading implementation
    - ADC-3006: Third-party integration optimization
    - ADC-3007: Monitoring and alerting setup
  
  Agent Execution Sequence:
    1. linear-task-coordinator: Performance audit and Linear tasks
    2. drupal-performance-specialist: Drupal optimizations (ADC-3001, 3002, 3003)
    3. drupal-frontend-theming-specialist: Asset optimization (ADC-3004, 3005)
    4. drupal-devops-engineer: Infrastructure optimization (ADC-3006)
    5. performance-optimizer: Monitoring and validation (ADC-3007)
    6. qa-testing-specialist: Performance regression testing
```

### **4. Configuration & Recipe Management** ⚙️
**Trigger Patterns**: Environment deployments, recipe creation, configuration synchronization

**Optimized Agent Routing:**
```yaml
Request: "Deploy configuration changes across multiple environments safely"

Linear Workflow (Config-Safe Deployment):
  Epic: "Multi-Environment Configuration Deployment with Rollback Plan"
  
  Subtasks (environment safety):
    - ADC-4001: Configuration impact analysis and dependency mapping
    - ADC-4002: Recipe creation for reproducible installations
    - ADC-4003: Environment-specific configuration validation
    - ADC-4004: Staging deployment and testing
    - ADC-4005: Production deployment with rollback plan
    - ADC-4006: Post-deployment validation and monitoring
  
  Agent Execution Sequence:
    1. linear-task-coordinator: Impact analysis and risk assessment
    2. drupal-configuration-expert: Config analysis (ADC-4001, 4003)
    3. recipe-configuration-specialist: Recipe creation (ADC-4002)
    4. drupal-devops-engineer: Deployment pipeline (ADC-4004, 4005)
    5. qa-testing-specialist: Validation testing (ADC-4006)
    6. drupal-technical-pm: Stakeholder communication
```

### **5. Editorial & Content Management** ✍️
**Trigger Patterns**: Content type creation, editorial workflow improvements, media management enhancement

**Optimized Agent Routing:**
```yaml
Request: "Improve content editor experience with AI-powered suggestions"

Linear Workflow (Editor-Centric Development):
  Epic: "AI-Enhanced Editorial Experience with German Brand Compliance"
  
  Subtasks (editor-focused):
    - ADC-5001: Current editor workflow analysis
    - ADC-5002: Content type architecture enhancement
    - ADC-5003: AI content suggestion integration
    - ADC-5004: German brand compliance validation
    - ADC-5005: Editor UI/UX improvements
    - ADC-5006: Content quality assurance automation
    - ADC-5007: Editor training and documentation
  
  Agent Execution Sequence:
    1. linear-task-coordinator: Editorial workflow audit
    2. drupal-content-strategist: Workflow analysis (ADC-5001)
    3. drupal-cms-content-types: Content architecture (ADC-5002)
    4. drupal-ai-integration-specialist: AI suggestions (ADC-5003)
    5. drupal-cms-security-privacy: Brand compliance (ADC-5004)
    6. drupal-frontend-theming-specialist: UI improvements (ADC-5005)
    7. qa-testing-specialist: Quality automation (ADC-5006)
    8. documentation-specialist: Training materials (ADC-5007)
```

---

## **Emergency Response Protocols** 🚨

### **Critical Production Issues (P0)**
```yaml
Trigger: Security vulnerabilities, site outages, data corruption

Emergency Agent Sequence:
  1. linear-task-coordinator: Immediate P0 Linear task creation
  2. drupal-technical-support-lead: Incident triage and assessment
  3. drupal-cms-security-privacy: Security vulnerability analysis (if applicable)
  4. drupal-devops-engineer: Hotfix deployment and rollback planning
  5. drupal-technical-pm: Stakeholder notification and coordination
  
Emergency Bypass Rules:
  - Skip normal quality gates for P0 issues
  - Single reviewer approval for hotfixes
  - Accelerated deployment pipeline
  - Post-incident review MANDATORY in Linear
```

### **Quality Gate Failures**
```yaml
Trigger: Accessibility violations, performance regressions, security issues

Remediation Agent Sequence:
  1. linear-task-coordinator: Remediation task creation
  2. qa-testing-specialist: Issue analysis and reproduction
  3. [Appropriate specialist]: Issue resolution implementation
  4. code-reviewer: Solution validation
  5. qa-testing-specialist: Verification and re-testing
```

---

## **German Brand Compliance Integration** 🇩🇪

**Automatic Brand Validation Rules:**
- **"adesso wird immer klein geschrieben"**: All content validation
- **German-First Content Strategy**: Content created in German, then translated
- **Cultural Appropriateness**: German market-specific guidelines
- **GDPR Compliance**: Privacy-focused data handling

**Agent Responsibilities:**
- `drupal-cms-security-privacy`: Brand compliance validation
- `drupal-content-strategist`: German-first content workflows  
- `qa-testing-specialist`: Cultural appropriateness testing
- `linear-task-coordinator`: Compliance tracking in all Linear tasks

---

## **MCP Integration Enhancements** 🔗

**Automated Quality Gates via MCP Tools:**
```yaml
Every Development Activity Triggers:
  - mcp__a11y-accessibility__test_accessibility: WCAG 2.1 AA compliance
  - mcp__browser-tools__runPerformanceAudit: Core Web Vitals monitoring
  - mcp__github__create_pull_request: Automated PR with Linear context
  - mcp__context7__get-library-docs: Lullabot pattern validation
  - mcp__server-memory__create_entities: Decision documentation
```

**GitHub Automation Integration:**
```yaml
Automated PR Workflow:
  - Feature branch creation with Linear task ID
  - Automated reviewer assignment based on changed files
  - Quality gate validation before merge approval
  - Linear task status updates via GitHub webhooks
  - Automated merge after all approvals and quality gates pass
```

---

## **Success Metrics Dashboard** 📊

**Development Velocity KPIs:**
- **Linear Task Completion Rate**: >90% sprint goal achievement
- **Lead Time**: <5 days from task creation to production
- **Quality Gate Pass Rate**: >95% first-time pass rate
- **German Brand Compliance**: 100% automated validation

**Quality Excellence KPIs:**
- **Accessibility Compliance**: >95% WCAG 2.1 AA score maintenance
- **Performance Standards**: >90% Core Web Vitals scores consistently
- **Security Posture**: Zero critical vulnerabilities in production
- **Component Reusability**: >80% SDC component adoption rate

**AI Integration KPIs:**
- **AI Feature Adoption**: Content editor usage rates
- **Content Quality Improvement**: AI-enhanced vs manual content metrics
- **Performance Impact**: AI feature load time <100ms additional
- **Safety Compliance**: 100% AI content moderation pass rate

---

---

## **Project Status Summary** ✅

### **Current Optimization Status**
- **Agent Ecosystem**: ✅ 27+ specialized agents configured and optimized
- **Linear Integration**: ✅ Real-time task tracking with granular subtasks
- **Quality Gates**: ✅ WCAG 2.1 AA, Core Web Vitals, security compliance automated
- **MCP Integration**: ✅ GitHub, accessibility, performance, context tools active
- **German Compliance**: ✅ Brand validation and GDPR compliance enforced
- **Enterprise Standards**: ✅ Lullabot methodology with peer review requirements

### **Development Readiness**
The adesso CMS project is now fully optimized for enterprise-grade development:
- **Linear-First Workflows**: Every development activity creates structured tasks
- **AI-Enhanced Features**: Complete AI integration pipeline with safety validation
- **Component Development**: SDC + Storybook workflow with accessibility focus
- **Performance Excellence**: Automated Core Web Vitals optimization
- **Security & Compliance**: Multi-layer validation including German market requirements

### **Quick Start Commands**
```bash
# AI Content Features
"Add AI content suggestions for editors" → automatic Linear epic creation

# Component Development  
"Create accessible navigation component" → SDC workflow with Storybook docs

# Performance Optimization
"Optimize Core Web Vitals scores" → comprehensive performance enhancement

# Configuration Management
"Deploy changes safely across environments" → recipe-based deployment

# Editorial Enhancements
"Improve content editor experience" → AI-enhanced editorial workflow
```

---

## **🚨 CRITICAL OPERATIONAL REMINDER**

**IMMER JEDEN SCHRITT IN LINEAR formulieren. Möglichst mit Subtasks arbeiten.**

Every agent interaction MUST update Linear tasks immediately, not at the end. This enterprise-grade workflow ensures:
- Complete development traceability
- Real-time stakeholder visibility  
- Early blocker identification
- Continuous quality gate validation
- German market compliance verification

**The adesso CMS development ecosystem is now fully optimized for Linear-first, quality-focused, AI-enhanced enterprise development following Lullabot best practices.**

---

## **Important Development Reminders**

### **File Management Guidelines**
- **Minimize File Creation**: Only create files when absolutely necessary for functionality
- **Prefer Editing**: Always edit existing files rather than creating new ones
- **Documentation Policy**: Never proactively create documentation files (*.md, README) unless explicitly requested
- **Component Focus**: Leverage existing SDC component structure rather than creating new patterns

### **Agent Coordination Principles**  
- **Linear-First**: Every development action creates or updates Linear tasks immediately
- **Quality Gates**: Apply WCAG 2.1 AA, Core Web Vitals, and security validation automatically
- **German Compliance**: Enforce "adesso wird immer klein geschrieben" and cultural appropriateness
- **MCP Integration**: Use available MCP tools for GitHub, accessibility, performance, and context validation

### **Linear Task Management (Critical)**
- **IMMER JEDEN SCHRITT IN LINEAR formulieren**: Document every development step in real-time
- **Granular Subtasks**: Break complex tasks into specific, trackable subtasks (ADC-XXXX format)
- **Immediate Updates**: Update Linear task status during work, not after completion
- **Quality Integration**: Link quality gate results to Linear tasks for stakeholder visibility
- **German Market Compliance**: Include brand and cultural compliance validation in all tasks