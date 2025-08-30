# AGENTS.md
This file provides guidance to AI coding assistants working in this repository.

**Note:** CLAUDE.md, .clinerules, .cursorrules, and other AI config files are symlinks to AGENTS.md in this project.

# ZH-Demo - GPZH Multi-Municipality Portal System

A modern Drupal 11 system for Swiss municipality portals with AI integration, built for the GPZH (Gemeindeportale Zürich) prototype. Features multi-site architecture, modern frontend tooling, and comprehensive accessibility compliance.

## Build & Commands

### Development Environment (DDEV)
**CRITICAL**: This project uses DDEV for development. All commands should be prefixed with `ddev` or run inside the DDEV container.

- **Start environment**: `ddev start`
- **Stop environment**: `ddev stop`
- **Restart services**: `ddev restart`
- **SSH into container**: `ddev ssh`
- **View logs**: `ddev logs --follow`

### Theme Development Commands
Located in `web/themes/custom/adesso_cms_theme/`:

- **Development server**: `ddev theme dev` (Vite HMR on :5173)
- **Build for production**: `ddev theme build`
- **Watch mode**: `ddev theme watch`
- **Storybook**: `ddev theme storybook` (Component docs on :6006)
- **Build Storybook**: `ddev theme build-storybook`

### Testing Commands
- **All tests**: `ddev exec npm run qa:full` (in theme directory)
- **Unit tests**: `ddev exec npm run test` (Vitest)
- **Watch unit tests**: `ddev exec npm run test:watch`
- **Test coverage**: `ddev exec npm run test:coverage`
- **E2E tests**: `ddev exec npm run test:e2e` (Playwright)
- **E2E with UI**: `ddev exec npm run test:e2e:ui`
- **Visual regression**: `ddev exec npm run visual:test` (BackstopJS)

### Linting & Formatting
- **Lint all**: `ddev exec npm run lint`
- **Lint JavaScript**: `ddev exec npm run lint-js`
- **Lint CSS**: `ddev exec npm run lint-css`
- **Format code**: `ddev exec npm run format`

### Drupal Commands
- **Clear caches**: `ddev drush cr`
- **Config export**: `ddev drush cex`
- **Config import**: `ddev drush cim`
- **Admin login**: `ddev drush uli`
- **Database dump**: `ddev drush sql:dump`
- **Update database**: `ddev drush updb`

### Multi-Site Commands
- **Thalwil site**: `ddev drush --uri=thalwil.zh-demo.ddev.site [command]`
- **Thalheim site**: `ddev drush --uri=thalheim.zh-demo.ddev.site [command]`
- **Erlenbach site**: `ddev drush --uri=erlenbach.zh-demo.ddev.site [command]`

### Script Command Consistency
**Important**: When modifying npm scripts in package.json, ensure all references are updated:
- GitHub Actions workflows (.github/workflows/*.yml)
- README.md documentation
- DDEV configuration files
- CI/CD configuration files

Common places that reference npm scripts:
- Build commands → Check: workflows, README, Dockerfile
- Test commands → Check: workflows, contributing docs
- Lint commands → Check: pre-commit hooks, workflows

## Code Style

### JavaScript/TypeScript
- **Standard**: ES2022, ESM modules
- **Linting**: ESLint with Airbnb config + Prettier
- **Formatting**: 2-space indentation, Unix line endings
- **Max line length**: 120 characters
- **Globals**: Drupal, Alpine, jQuery, Swiper
- **Security**: No console.log, no eval, no script URLs

### CSS/SCSS
- **Framework**: Tailwind CSS v4 with Flowbite components
- **Preprocessor**: PostCSS with autoprefixer
- **Linting**: Stylelint with standard config
- **Architecture**: Component-scoped CSS in SDC structure
- **Naming**: BEM methodology for custom CSS classes

### Twig Templates
- **Standard**: Drupal Twig with Single Directory Components (SDC)
- **Security**: Always use proper escaping, validate user input
- **Accessibility**: Include ARIA attributes, semantic HTML
- **Performance**: Lazy loading, optimized asset loading

### PHP/Drupal
- **Standard**: Drupal coding standards, PHP 8.3
- **Security**: Input validation, XSS prevention, CSRF protection
- **Performance**: Proper caching, database query optimization
- **Architecture**: Module-based architecture, service containers

## Testing

**Framework**: Vitest (unit), Playwright (E2E), BackstopJS (visual regression)

### Testing Philosophy
**When tests fail, fix the code, not the test.**

Key principles:
- **Tests should be meaningful** - Test actual functionality, not implementation details
- **Component testing** - Each SDC component has corresponding tests
- **Accessibility testing** - WCAG 2.1 AA compliance validation
- **Visual regression** - Prevent UI regressions across municipalities
- **Cross-browser testing** - Chrome, Firefox, Safari support
- **Responsive testing** - Mobile, tablet, desktop viewports

### Test File Patterns
- Unit tests: `*.test.js` (adjacent to source files)
- E2E tests: `tests/e2e/*.spec.js`
- Component tests: `components/*/[component].test.js`

### Testing Requirements
- **Coverage target**: >90% for critical paths
- **E2E scenarios**: Core user journeys for each municipality
- **Accessibility**: Automated axe-core integration
- **Performance**: Lighthouse CI with >90 scores

## Security

### Swiss Government Compliance
- **Standards**: WCAG 2.1 AA, eCH-0059 compliance
- **Data protection**: GDPR/Swiss DPA compliance
- **Multi-language**: German, French, Italian support
- **Security headers**: CSP, HSTS, secure cookies

### Development Security
- **XSS Prevention**: Proper Twig escaping, input validation
- **File uploads**: Secure file handling, virus scanning
- **Authentication**: Strong password policies, 2FA support
- **Session management**: Secure session handling, timeout
- **API security**: Rate limiting, authentication tokens

### Content Security
- **AI-generated content**: Moderation and validation
- **User-generated content**: Input sanitization, content approval
- **Media handling**: Secure file uploads, alt-text validation

## Configuration

### Environment Setup
```bash
# 1. Install DDEV: https://ddev.com/get-started/
# 2. Clone repository
# 3. Start environment
ddev start
# 4. Install dependencies
ddev composer install
ddev exec npm install  # In theme directory
```

### Required Environment Variables
- `VITE_DEV_SERVER_HOST=0.0.0.0`
- `VITE_DEV_SERVER_PORT=5173`
- `NODE_OPTIONS=--max-old-space-size=2048`
- `GPZH_DEMO_MODE=true`
- `DDEV_PRIMARY_URL=https://zh-demo.ddev.site`

### Development URLs
- **Main site**: https://zh-demo.ddev.site
- **Thalwil**: https://thalwil.zh-demo.ddev.site
- **Thalheim**: https://thalheim.zh-demo.ddev.site
- **Erlenbach**: https://erlenbach.zh-demo.ddev.site
- **Vite dev server**: https://zh-demo.ddev.site:5173
- **Storybook**: https://zh-demo.ddev.site:6006

## Agent Delegation & Tool Execution

### ⚠️ MANDATORY: Always Delegate to Specialists & Execute in Parallel

**When specialized agents are available, you MUST use them instead of attempting tasks yourself.**

**When performing multiple operations, send all tool calls (including Task calls for agent delegation) in a single message to execute them concurrently for optimal performance.**

#### Available Specialized Agents

**Drupal Specialists:**
- `drupal-sdc-architect` - SDC component development
- `drupal-configuration-specialist` - Drupal configuration management
- `drupal-security-auditor` - Security assessment and XSS prevention
- `drupal-performance-optimizer` - Performance optimization
- `drupal-quality-gatekeeper` - Code review and standards
- `twig-template-specialist` - Advanced Twig templating

**Frontend Specialists:**
- `tailwind-v4-expert` - Tailwind CSS v4 styling
- `alpine-js-specialist` - Alpine.js interactivity
- `storybook-drupal-specialist` - Storybook integration
- `react-figma-ui-engineer` - UI implementation from designs
- `figma-design-analyzer` - Design token extraction

**Testing & Quality:**
- `testing-infrastructure-architect` - Testing setup and architecture
- `a11y-compliance-auditor` - Accessibility compliance
- `performance-optimization-specialist` - Core Web Vitals optimization
- `security-compliance-auditor` - Security auditing

**Specialized Domain Experts:**
- `german-compliance-specialist` - eCH-0059 compliance
- `municipal-portal-specialist` - Government portal patterns
- `multi-site-architect` - Multi-site Drupal architecture

#### Critical: Always Use Parallel Tool Calls

**Send all tool calls in a single message to execute them in parallel.**

**These cases MUST use parallel tool calls:**
- Multiple file searches or code analysis
- Reading multiple configuration files
- Agent delegations with multiple Task calls
- Any information gathering where you know upfront what you're looking for

### Discovering Available Agents
```bash
# List all available agents
find .claude/agents -name "*.md" -exec basename {} .md \;
```

## Directory Structure & File Organization

### Reports Directory
ALL project reports and documentation should be saved to the `reports/` directory:

```
zh-demo/
├── reports/              # All project reports and documentation
│   └── *.md             # Various report types
├── temp/                # Temporary files and debugging
└── [other directories]
```

### Report Generation Guidelines
**Important**: ALL reports should be saved to the `reports/` directory with descriptive names:

**Implementation Reports:**
- Phase validation: `PHASE_X_VALIDATION_REPORT.md`
- Implementation summaries: `IMPLEMENTATION_SUMMARY_[FEATURE].md`
- Feature completion: `FEATURE_[NAME]_REPORT.md`

**Testing & Analysis Reports:**
- Test results: `TEST_RESULTS_[DATE].md`
- Coverage reports: `COVERAGE_REPORT_[DATE].md`
- Performance analysis: `PERFORMANCE_ANALYSIS_[SCENARIO].md`
- Security scans: `SECURITY_SCAN_[DATE].md`

**Quality & Validation:**
- Code quality: `CODE_QUALITY_REPORT.md`
- Dependency analysis: `DEPENDENCY_REPORT.md`
- API compatibility: `API_COMPATIBILITY_REPORT.md`

### Temporary Files & Debugging
All temporary files, debugging scripts, and test artifacts should be organized in a `/temp` folder:

**Temporary File Organization:**
- **Debug scripts**: `temp/debug-*.js`, `temp/analyze-*.py`
- **Test artifacts**: `temp/test-results/`, `temp/coverage/`
- **Generated files**: `temp/generated/`, `temp/build-artifacts/`
- **Logs**: `temp/logs/debug.log`, `temp/logs/error.log`

### Claude Code Settings (.claude Directory)

The `.claude` directory contains Claude Code configuration files with specific version control rules:

#### Version Controlled Files (commit these):
- `.claude/settings.json` - Shared team settings for hooks, tools, and environment
- `.claude/commands/*.md` - Custom slash commands available to all team members
- `.claude/hooks/*.sh` - Hook scripts for automated validations and actions
- `.claude/agents/**/*.md` - Specialized AI agents for domain expertise

#### Ignored Files (do NOT commit):
- `.claude/settings.local.json` - Personal preferences and local overrides
- Any `*.local.json` files - Personal configuration not meant for sharing

**Important Notes:**
- Claude Code automatically adds `.claude/settings.local.json` to `.gitignore`
- The shared `settings.json` should contain team-wide standards (linting, type checking, etc.)
- Personal preferences or experimental settings belong in `settings.local.json`
- Hook scripts in `.claude/hooks/` should be executable (`chmod +x`)

## Multi-Municipality Architecture

This project serves three distinct Swiss municipalities:

### Municipality Configurations
- **Thalwil**: Modern lakeside community (Blue theme)
- **Thalheim**: Traditional wine region (Green theme)
- **Erlenbach**: Upscale Goldküste location (Turquoise theme)

### Theming Strategy
- **Base theme**: `adesso_cms_theme` with 25+ SDC components
- **Sub-themes**: Municipality-specific color schemes and branding
- **Shared components**: Common functionality across all sites
- **Responsive design**: Mobile-first approach for all municipalities

### Content Management
- **Multi-site setup**: Shared codebase, separate content
- **AI content generation**: Automated content creation with Swiss compliance
- **Multi-language support**: German, French, Italian
- **Accessibility**: WCAG 2.1 AA compliance across all sites

## Development Workflow

### 1. Feature Development
```bash
# Create branch
git checkout -b feature/GPZH-123-new-component
ddev start

# Develop with live reload
ddev theme dev
# Open: https://zh-demo.ddev.site:5173

# Test across municipalities
ddev launch thalwil.zh-demo.ddev.site
ddev launch thalheim.zh-demo.ddev.site
ddev launch erlenbach.zh-demo.ddev.site
```

### 2. Quality Assurance
```bash
# Run full test suite
ddev exec npm run qa:full

# Visual regression testing
ddev exec npm run visual:test

# Accessibility audit
ddev exec npm run test:e2e:a11y

# Performance audit
ddev exec npm run test:performance
```

### 3. Deployment Preparation
```bash
# Production build
ddev theme build

# Final validation
ddev exec npm run test:e2e
ddev drush cr
ddev drush cex
```

## Common Issues & Solutions

### Issue: DDEV services not starting
```bash
# Solution: Check Docker and restart
docker system prune
ddev restart
```

### Issue: Vite HMR not working
```bash
# Solution: Check ports and restart dev server
ddev restart
ddev theme dev
```

### Issue: Multi-site routing problems
```bash
# Solution: Check sites.php configuration
ddev exec cat web/sites/sites.php
ddev drush cr
```

### Issue: Build failures
```bash
# Solution: Clear caches and rebuild
ddev exec npm run build
ddev drush cc css-js
ddev drush cr
```

## Performance Requirements

### Swiss Government Standards
- **Core Web Vitals**: >90 Lighthouse scores required
- **Accessibility**: WCAG 2.1 AA compliance mandatory
- **Multi-language**: Support for DE/FR/IT
- **Mobile performance**: <3s load time on 3G networks

### Monitoring
- **Lighthouse CI**: Automated performance testing
- **Real User Monitoring**: Core Web Vitals tracking
- **Error tracking**: JavaScript error monitoring
- **Accessibility monitoring**: Ongoing compliance validation

---

*This file is automatically symlinked to all AI assistant configuration files in the project. Updates here will be reflected across all AI tools.*