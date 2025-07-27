# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL DEVELOPMENT REQUIREMENTS 🚨

**ALWAYS WORK IN DDEV - NO EXCEPTIONS!** 
**ALWAYS FOLLOW SDC BEST PRACTICES!**
**ALWAYS RUN TESTS AFTER CHANGES!**

## Core Rules (Always Loaded)

@.claude/ddev-rules.md
@.claude/sdc-rules.md  
@.claude/testing-rules.md
@.claude/twig-error-prevention.md
@.claude/adesso-accessibility-standards.md

## 🎯 Default Profile (ALWAYS LOADED)

@.claude/profiles/fullstack-profile.md

## Alternative Profiles (Use when needed)

- **Drupal backend only:** `@.claude/profiles/drupal-profile.md`
- **Frontend/CSS/JS only:** `@.claude/profiles/frontend-profile.md`  
- **Accessibility audits:** `@.claude/profiles/accessibility-profile.md`
- **Security reviews:** `@.claude/profiles/security-profile.md`
- **Advanced multi-agent:** `@.claude/profiles/advanced-profile.md`

## Project Overview

This is adesso CMS, a Drupal 11-based content management system with a modern frontend theme built using Vite, Tailwind CSS, and Storybook. The project uses DDEV for local development and is structured as a component-based system with Drupal recipes for configuration management.

## Essential Development Commands

### Initial Setup
```bash
./launch-adesso-cms.sh    # Bootstrap the entire project
ddev start                # Start DDEV environment
ddev composer install     # Install PHP dependencies
```

### Frontend Development
```bash
ddev theme dev            # Start Vite dev server (port 5173)
ddev theme watch          # Watch for changes (Tailwind, components, stories)
ddev theme build          # Build production assets
ddev theme storybook      # Start Storybook (port 6006)
```

### Content Management
```bash
ddev export-contents      # Export content to recipes/adesso_cms_starter/content
ddev drush sql:create -y  # Reset database (recreate)
ddev drush cr             # Clear cache
ddev drush cex            # Export configuration
ddev drush cim            # Import configuration
```

### Testing & Quality
```bash
ddev theme lint:js        # ESLint JavaScript files
ddev theme lint:sass      # Stylelint SCSS files  
ddev theme scss-fix       # Auto-fix SCSS issues
ddev theme test           # Run Vitest unit tests
ddev theme test:coverage  # Run tests with coverage report
```

### Development URLs
- **Main site**: `https://adesso-cms.ddev.site`
- **Storybook**: `https://adesso-cms.ddev.site:6006`
- **Vite HMR**: `https://adesso-cms.ddev.site:5173`

## Architecture Overview

### Component-Based Design System
- **SDC (Single Directory Components)**: Located in `web/themes/custom/adesso_cms_theme/components/`
- **Component Structure**: Each component includes `.component.yml`, `.twig`, `.stories.js`, and optional `.behavior.js`
- **Storybook Integration**: All components are documented and testable in Storybook

### Drupal Integration
- **Recipes**: Configuration and content managed via Drupal recipes in `recipes/`
  - `adesso_cms_starter/`: Base configuration and content
  - `adesso_cms_paragraphs/`: Paragraph types and field configuration
- **Paragraphs**: Rich content building blocks (accordion, hero, card groups, etc.)
- **Entity View Modes**: Multiple display modes for responsive design (16:9, 4:3, square, etc.)

### Frontend Toolchain
- **Vite**: Modern build tool with HMR at `https://adesso-cms.ddev.site:5173`
- **Tailwind CSS v4**: Utility-first CSS framework
- **Storybook**: Component documentation at `https://adesso-cms.ddev.site:6006`
- **PostCSS**: CSS processing with autoprefixer
- **Vitest**: Unit testing framework for components
- **ESLint + Stylelint**: Code quality and formatting
- **Swiper**: Modern slider/carousel library
- **Flowbite**: Additional UI components

### Key Directories
- `web/themes/custom/adesso_cms_theme/components/`: SDC components
- `web/themes/custom/adesso_cms_theme/src/`: Source files (CSS, JS)
- `web/themes/custom/adesso_cms_theme/dist/`: Built assets
- `web/themes/custom/adesso_cms_theme/templates/`: Drupal template overrides
- `config/sync/`: Drupal configuration exports
- `recipes/`: Drupal recipes for repeatable configurations
  - `adesso_cms_starter/`: Base site configuration
  - `adesso_cms_paragraphs/`: Paragraph types and fields
  - `drupal_cms_*/`: Official Drupal CMS recipes

### Component Schema
All components follow SDC schema with:
- `$schema`: JSON schema validation
- `name`: Human-readable component name
- `description`: Component purpose
- `props`: TypeScript-like property definitions

### DDEV Configuration
- **Project Type**: Drupal 11
- **PHP Version**: 8.3
- **Database**: MariaDB 10.11
- **Webserver**: nginx-fpm
- **Node.js**: 18 (managed within container)
- **Exposed Ports**: Storybook (6006), Vite (5173)
- **Theme Commands**: Available via `ddev theme [command]`
- **Additional packages**: Includes image processing libraries for sharp/canvas

## Development Workflows

### Creating New Components
1. Create component directory in `web/themes/custom/adesso_cms_theme/components/`
2. Add required files:
   - `component.component.yml` (SDC schema)
   - `component.twig` (template)
   - `component.stories.js` (Storybook documentation)
   - `component.behavior.js` (optional JavaScript)
3. Run `ddev theme build:stories` to update component registry
4. View in Storybook for testing and documentation

### Recipe Management
- **Purpose**: Recipes provide repeatable, exportable configuration packages
- **Workflow**: Modify → Export → Test → Package as recipe
- **Key recipes**: 
  - `adesso_cms_starter`: Base site configuration
  - `adesso_cms_paragraphs`: All paragraph types and fields
  - `drupal_cms_*`: Official Drupal CMS feature recipes

### Content Architecture
- **Content Types**: Page, News, Event, Person, Project
- **Paragraph Types**: 20+ rich content components (accordion, hero, carousel, etc.)
- **Media Types**: Image, Document, Remote Video, SVG, Video
- **Entity View Modes**: Multiple responsive breakpoints (16:9, 4:3, 1:1, etc.)

## Technology Stack Deep Dive

### Drupal Backend
- **Version**: Drupal 11.2.2
- **Key Modules**: Paragraphs, Media, Twig Tweak, Components (SDC)
- **AI Integration**: DrupalX AI module with Anthropic/OpenAI providers
- **Image Processing**: Focal point cropping, WebP conversion, responsive images
- **Content Management**: Layout Builder integration, paragraph-based content

### Frontend Architecture
- **Build System**: Vite 6.2.0 with Tailwind CSS v4 
- **Component System**: Drupal SDC with Storybook documentation
- **JavaScript**: ES modules, behavior-based attachment, jQuery integration
- **CSS Architecture**: Utility-first (Tailwind) + component-scoped styles
- **Testing**: Vitest for unit tests, Playwright for E2E (via MCP)

### Development Tools Integration
- **DDEV Commands**: Custom theme commands in `.ddev/commands/web/theme`
- **Build Pipeline**: Vite + PostCSS + Tailwind compilation
- **Quality Tools**: ESLint, Stylelint, PHP CodeSniffer (via DDEV)
- **Content Export**: Default Content module for recipe-based deployment

## 🔄 How to Use Profiles

```bash
# Fullstack Profile wird automatisch geladen!
# Nur bei speziellen Aufgaben andere Profile laden:

# Drupal-spezifische Arbeit
@.claude/profiles/drupal-profile.md

# Nur Frontend/CSS/JS 
@.claude/profiles/frontend-profile.md

# Accessibility Audits
@.claude/profiles/accessibility-profile.md
```

## 🤖 Enhanced Multi-Agent System (v2.0)
*Based on Anthropic Best Practices for Claude Code Teams*

### **CRITICAL: All Work Must Start with System Validation**

Every development request follows the **4-Phase Enhanced Workflow** designed to prevent system failures and ensure reliable outcomes.

---

### **Phase 0: System Diagnosis (MANDATORY FIRST STEP)**
**🚨 NEVER skip this phase - prevents 90% of system failures**

- **`system-diagnostician`**: Complete system health check before any work begins
- **`environment-validator`**: DDEV status, ports, services, basic functionality validation
- **`dependency-checker`**: Verify all required files exist (index.php, composer.json, vendor/, etc.)

**Automatic Failure Conditions:**
- Missing core Drupal files (index.php, autoload.php)
- DDEV containers not running or unhealthy
- 403/502/500 errors on main site
- Missing critical dependencies or services

---

### **Phase 1: Secure Planning & Risk Assessment**
- **`requirements-engineer`**: Analyzes user requests with **mandatory system context validation**
- **`risk-assessor`** *(NEW)*: Evaluates potential risks, creates rollback plans
- **`checkpoint-manager`** *(NEW)*: Secures git state, establishes recovery points

**Enhanced Requirements Engineering:**
- **🌍 MANDATORY: All prompts translated to English first**
- System context validation before requirement creation
- Risk assessment and mitigation strategies
- Git checkpoint creation for safe experimentation

---

### **Phase 2: Monitored Implementation**
**Available Specialist Agents:**
- **`drupal-backend-expert`**: Drupal 11 backend development, custom modules, API development
- **`drupal-theming-expert`**: Drupal theming, TWIG templates, component integration, paragraph architecture
- **`drupal-sdc-specialist`**: Single Directory Components (SDC) creation, schema validation, best practices
- **`storybook-sdc-converter`**: Converts SDC components to comprehensive Storybook stories
- **`tech-lead-orchestrator`**: Breaks down complex tasks, coordinates development workflows

**Implementation Safeguards:**
- **`progress-monitor`** *(NEW)*: Continuous system stability monitoring during implementation
- **Auto-stop rules**: Immediate halt on system instability or critical errors
- **Incremental validation**: System health check after each significant change
- **Rollback triggers**: Automatic rollback on system failure

---

### **Phase 3: Comprehensive Validation & Review**
- **`end-to-end-validator`** *(NEW)*: Complete user journey testing, not just component testing
- **`qa-playwright-expert`**: Quality assurance testing, coding standards validation, requirements verification
- **`a11y-review-specialist`**: Comprehensive accessibility reviews for WCAG 2.1 AA+ compliance
- **`rollback-coordinator`** *(NEW)*: Manages rollback procedures when validation fails
- **`tech-lead-reviewer`**: Final technical review **only after proven system functionality**

**Enhanced Validation Requirements:**
- **End-to-end functionality**: Full user workflows must work
- **System stability**: No degradation in basic site functions
- **Performance validation**: No significant performance regressions
- **Security verification**: No new vulnerabilities introduced

---

## **🚦 Enhanced Workflow Implementation**

### **MANDATORY 4-Phase Execution Pattern:**

```yaml
Phase 0: System Diagnosis
  ├── system-diagnostician: Health check
  ├── environment-validator: DDEV & services
  └── dependency-checker: Required files
  
Phase 1: Secure Planning  
  ├── requirements-engineer: Analysis + translation + system context
  ├── risk-assessor: Risk evaluation + rollback planning
  └── checkpoint-manager: Git state backup
  
Phase 2: Monitored Implementation
  ├── [Specialist Agents]: Domain experts
  ├── progress-monitor: Continuous validation
  └── Auto-stop triggers: Failure prevention
  
Phase 3: Comprehensive Validation
  ├── end-to-end-validator: Full system testing
  ├── qa-playwright-expert: Quality validation
  ├── a11y-review-specialist: Accessibility compliance
  ├── rollback-coordinator: Failure recovery
  └── tech-lead-reviewer: Final approval
```

### **Critical Success Factors:**

#### **🔒 Fail-Safe Rules**
```yaml
AUTOMATIC STOPS:
- Basic system non-functional (403/502/500 errors)
- Core files missing (index.php, autoload.php)
- DDEV container failures
- Critical dependency failures
- System performance degradation >50%

ROLLBACK TRIGGERS:
- User workflows broken
- Site becomes inaccessible  
- Critical functionality lost
- Security vulnerabilities introduced
```

#### **🔄 Checkpoint Protocol**
```yaml
BEFORE ANY CHANGES:
1. checkpoint-manager: Create git backup point
2. system-diagnostician: Document current system state
3. Define rollback criteria and procedures

AFTER EACH MAJOR STEP:
1. progress-monitor: Validate system stability
2. Functional test critical user paths
3. Performance regression check
```

#### **📊 Quality Gates**
```yaml
PHASE 0 → PHASE 1: System must be fully functional
PHASE 1 → PHASE 2: Risk assessment complete, checkpoints created
PHASE 2 → PHASE 3: Implementation complete, no critical errors
PHASE 3 → COMPLETION: All validation passed, no regressions
```

### **🌍 Enhanced Requirements Engineering**

**MANDATORY Translation & Context Process:**
1. **Language Detection**: Identify input language
2. **Professional Translation**: Convert to English with technical accuracy
3. **System Context Integration**: Include current system state in requirements
4. **Risk Assessment**: Identify potential failure points
5. **Checkpoint Planning**: Define safe experimentation boundaries

### **⚡ Smart Parallelization Strategy**

**Phase-Based Parallelization:**
- **Phase 0**: Parallel system diagnostics (independent validation checks)
- **Phase 1**: Sequential planning (dependencies between analysis, risk, checkpoints)
- **Phase 2**: Maximum parallelization for independent implementation tasks
- **Phase 3**: Parallel validation streams (QA + accessibility + performance)

**Coordination Rules:**
```yaml
PARALLEL EXECUTION:
- Independent component development
- Separate validation streams
- Non-overlapping system areas

SEQUENTIAL EXECUTION:  
- System diagnosis → Planning
- Planning → Implementation
- Implementation → Validation
- Cross-dependent modifications
```

---

## **📋 Enhanced Workflow Examples**

### **Example 1: Contact Form Component (Simple Feature)**
```yaml
Phase 0: System Diagnosis
├── system-diagnostician: ✅ Drupal functional, DDEV running
├── environment-validator: ✅ All services healthy  
└── dependency-checker: ✅ SDC framework available

Phase 1: Planning
├── requirements-engineer: German → English, form requirements analysis
├── risk-assessor: Low risk, form component isolated
└── checkpoint-manager: Git backup created

Phase 2: Implementation (Parallel)
├── drupal-sdc-specialist: Create form component structure
├── a11y-review-specialist: Accessibility requirements (parallel)
└── progress-monitor: Continuous system monitoring

Phase 3: Validation
├── end-to-end-validator: Test form submission workflow
├── qa-playwright-expert: Component functionality testing
└── tech-lead-reviewer: Final approval after validation
```

### **Example 2: User Dashboard (Complex Multi-Domain)**
```yaml
Phase 0: Critical System Check
├── system-diagnostician: ✅ All systems operational
├── environment-validator: ✅ Database, auth services ready
└── dependency-checker: ✅ User management modules present

Phase 1: Risk-Aware Planning
├── requirements-engineer: Complex feature breakdown + translation
├── risk-assessor: HIGH RISK - authentication changes identified
├── checkpoint-manager: Multiple checkpoint strategy
└── tech-lead-orchestrator: Coordination planning

Phase 2: Monitored Parallel Implementation
├── drupal-backend-expert: User auth + API endpoints
├── drupal-theming-expert: Dashboard UI templates (parallel)
├── drupal-sdc-specialist: Dashboard components (parallel)
├── progress-monitor: Continuous auth system validation
└── Auto-stop: Trigger on auth failures

Phase 3: Comprehensive Validation
├── end-to-end-validator: Full user journey testing
├── qa-playwright-expert: Authentication flow testing (parallel)
├── a11y-review-specialist: Dashboard accessibility (parallel)
├── rollback-coordinator: Ready for auth system rollback
└── tech-lead-reviewer: Approval only after full validation
```

### **Example 3: System Failure Recovery (Error Handling)**
```yaml
Scenario: "Fix JavaScript errors in Storybook"

Phase 0: Comprehensive Diagnosis
├── system-diagnostician: 🚨 CRITICAL - Site returns 403
├── environment-validator: 🚨 DDEV containers unhealthy
└── dependency-checker: 🚨 Missing index.php, autoload.php

⚠️  AUTOMATIC STOP: Basic system non-functional
⚠️  ROLLBACK NOT NEEDED: System never worked

Recovery Protocol:
├── system-diagnostician: Root cause analysis (missing Drupal)
├── dependency-checker: Install Drupal core files
├── environment-validator: Verify DDEV services
├── end-to-end-validator: Test site accessibility
└── ONLY THEN: Address original JavaScript request
```

### **🎯 Key Success Metrics**

**Prevention Statistics:**
- **90% failure prevention** through Phase 0 validation
- **Zero system downtime** through checkpoint management  
- **100% rollback success** through proper preparation
- **Improved agent coordination** through clear phase boundaries

**Quality Improvements:**
- **Evidence-based decisions** instead of assumptions
- **System-first approach** before feature development
- **Proactive risk management** instead of reactive fixes
- **Continuous validation** instead of end-stage testing

## 🔗 MCP Server Integration

This project integrates with Claude Code's MCP (Model Context Protocol) servers for enhanced development capabilities. **ALWAYS use Context7 MCP when it makes sense** for accessing official documentation, library patterns, and best practices. Use these MCPs based on the task type:

### Available MCP Servers

#### **Sequential Thinking (`mcp__sequential-thinking`)**
**When to use:** Complex problem-solving, multi-step analysis, debugging, architectural decisions
- **Best for:** Root cause analysis, system design, complex refactoring planning
- **Triggers:** Problems requiring structured thinking, step-by-step analysis
- **Example tasks:** "Analyze performance bottlenecks", "Debug complex issue", "Plan architecture refactoring"

#### **Playwright (`mcp__playwright`)**
**When to use:** Browser automation, E2E testing, UI validation, performance monitoring
- **Best for:** Cross-browser testing, user workflow validation, visual regression testing
- **Triggers:** Testing components, validating user flows, performance metrics
- **Example tasks:** "Test contact form submission", "Validate responsive design", "Check cross-browser compatibility"

#### **Browser Tools (`mcp__browser-tools`)**
**When to use:** Accessibility auditing, performance analysis, SEO optimization
- **Best for:** WCAG compliance checks, Core Web Vitals measurement, automated audits
- **Triggers:** Accessibility reviews, performance optimization, quality audits
- **Example tasks:** "Run accessibility audit", "Check performance metrics", "Validate SEO compliance"

#### **RUV Swarm (`mcp__ruv-swarm`)**
**When to use:** Complex multi-agent orchestration, large-scale analysis
- **Best for:** Enterprise-level tasks, coordinated parallel processing
- **Triggers:** Complex system-wide changes, large codebase analysis
- **Example tasks:** "Comprehensive security audit", "Large-scale refactoring", "Multi-domain analysis"

#### **Claude Flow (`mcp__claude-flow`)**
**When to use:** Advanced AI coordination, workflow optimization, intelligent task management
- **Best for:** Complex development workflows, adaptive task distribution
- **Triggers:** Multi-phase projects, intelligent automation needs
- **Example tasks:** "Optimize development workflow", "Coordinate complex feature development"

#### **Image Fetch (`mcp__fetch`)**
**When to use:** Image processing, visual content analysis, design system work
- **Best for:** Processing screenshots, analyzing visual designs, image optimization
- **Triggers:** Visual design work, image processing needs, screenshot analysis
- **Example tasks:** "Analyze design mockup", "Process component screenshots", "Optimize image assets"

### MCP Selection Guidelines

**For Drupal Development:**
- Complex backend logic → `mcp__sequential-thinking` + Context7 for Drupal patterns
- Component testing → `mcp__playwright` + `mcp__browser-tools`
- Accessibility compliance → `mcp__browser-tools` (accessibility audit)
- Drupal best practices → Context7 for official Drupal documentation

**For Frontend Development:**
- UI component validation → `mcp__playwright` + `mcp__browser-tools`
- Performance optimization → `mcp__browser-tools` (performance audit)
- Visual design analysis → `mcp__fetch` (image processing)
- Frontend framework patterns → Context7 for official documentation (React, Vue, Vite, etc.)

**For Quality Assurance:**
- Code review and validation → Static analysis tools and linting (NO browser automation)
- Unit/Integration testing → `mcp__sequential-thinking` for test strategy
- Browser testing (ONLY when needed) → `mcp__playwright` + `mcp__browser-tools`
- Accessibility audits → `mcp__browser-tools` (accessibility focus) ONLY for final validation
- Testing best practices → Context7 for testing framework documentation (Vitest, Playwright)

**For Performance Analysis:**
- Bundle analysis → `mcp__browser-tools` for Core Web Vitals and performance metrics
- Image optimization → Context7 for best practices with WebP, focal point cropping
- Cache strategies → Context7 for Drupal caching documentation

**For Complex Projects:**
- Multi-agent coordination → `mcp__claude-flow` or `mcp__ruv-swarm`
- Strategic planning → `mcp__sequential-thinking` + Context7 for architectural patterns
- End-to-end validation → Multiple MCPs coordinated
- Architecture decisions → Context7 for official framework and library documentation

### Integration with Multi-Agent System

MCPs integrate seamlessly with the 4-Phase Enhanced Workflow:
- **Phase 0:** Use `mcp__browser-tools` for system health checks
- **Phase 1:** Use `mcp__sequential-thinking` for complex planning
- **Phase 2:** Use appropriate MCPs based on implementation domain
- **Phase 3:** Use `mcp__playwright` + `mcp__browser-tools` for comprehensive validation

## Troubleshooting Common Issues

### DDEV Issues
```bash
# Container problems
ddev restart                    # Restart all containers
ddev rebuild                    # Rebuild containers from scratch
ddev debug test                 # Test DDEV functionality

# Port conflicts
ddev stop && ddev start         # Reset port assignments
```

### Theme Build Issues
```bash
# Clear all build artifacts
ddev theme clean
ddev theme build

# Node modules issues  
ddev exec "cd web/themes/custom/adesso_cms_theme && rm -rf node_modules package-lock.json"
ddev theme build

# Storybook build errors
ddev theme build:stories        # Regenerate story registry
```

### Drupal Configuration Issues
```bash
# Configuration sync problems
ddev drush config:status        # Check config differences
ddev drush cim --partial        # Import only changed configs
ddev drush cr                   # Clear all caches

# Database reset (nuclear option)
ddev drush sql:create -y        # Completely recreate database
./launch-adesso-cms.sh          # Rebuild everything
```

### Common File Paths
- **Custom theme**: `web/themes/custom/adesso_cms_theme/`
- **Component templates**: `web/themes/custom/adesso_cms_theme/components/*/templates/`
- **DDEV config**: `.ddev/config.yaml`
- **Composer**: `composer.json` (root), `web/themes/custom/adesso_cms_theme/composer.json` (theme)
- **Node config**: `web/themes/custom/adesso_cms_theme/package.json`

## 📚 More Information

See `.claude/SYSTEM-OVERVIEW.md` for complete details and archive access.
