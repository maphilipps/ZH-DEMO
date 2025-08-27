# CLAUDE.md - Compound Engineering Learning System

Living memory for the GPZH project where every bug becomes a prevention rule, every decision becomes reusable knowledge, and every successful solution becomes a pattern.

## 🎯 Project Context
**ZH-DEMO Prototyp** - Drupal 11.2.2 GPZH prequalification demo for Canton Zurich municipal portals  
**Demo Municipality**: Gemeinde Bruchtal ("Leben am See")

## 🧠 Core Principles
- Every bug → prevention rule
- Every decision → reusable knowledge  
- Every success → pattern
- User dissatisfaction → immediate learning documentation
- Every task → learning opportunity

## 🔄 Development Lanes
- **Planning**: @drupal-solution-architect + @drupal-technical-pm
- **Building**: @drupal-11-lead-developer + @municipality-portal-specialist
- **Reviewing**: @swiss-compliance-specialist + @qa-testing-specialist

## 🛠️ MCP Server Strategy

### Core Servers
- **mcp-server-drupal**: ALL Drupal operations (config, content, entities)
- **github**: PR management, issue tracking, code search  
- **playwright**: Browser automation, E2E testing, accessibility validation
- **sequential-thinking**: Complex problem breakdown, dependency analysis
- **octocode**: Code research, implementation patterns
- **context7**: Library documentation, API guidance
- **a11y-accessibility**: Swiss compliance validation (eCH-0059)
- **server-memory**: Learning pattern organization

### Server Orchestration
**Sequential Pattern**: sequential-thinking → octocode/context7 → mcp-server-drupal → playwright → server-memory  
**Parallel Pattern**: Independent operations (research, compliance, diagnostics) → sequential-thinking integration

### Selection Framework
1. Drupal-specific? → mcp-server-drupal
2. Multi-phase complexity? → sequential-thinking  
3. External research? → octocode/context7
4. Testing/compliance? → playwright/a11y-accessibility
5. Learning organization? → server-memory

### Key Prevention Rules
- **Rule #13**: Match server to problem domain specifically
- **Rule #14**: Every MCP execution must generate CLAUDE.md learning  
- **Rule #15**: Document successful orchestration patterns for reuse

## 🐛 Bug Prevention Rules

### Rule #1: Paragraphs Frontend Editing Fix ✅ APPLIED
**Context**: Paragraphs_ee module not showing "Add Paragraph" button on empty fields  
**Root Cause**: "Add in between" functionality disabled by default (`add_above: '0'`)  
**Prevention Rule**: Always enable "Add in between" functionality (`add_above: add_above`) when configuring paragraph fields  
**Application**: Apply to all content types with paragraph fields (page, landing_page, accordion, carousel, pricing, slider)  
**Tool Requirement**: Use Drupal MCP exclusively for configuration changes  
**SUCCESS**: Applied in Issue #38 - Fixed 6 paragraph configurations using Drupal MCP (2025-08-24)

### Rule #8: Critical Paragraph Rendering Failure - Root Cause Still Unknown ❌ CRITICAL
**Context**: Issue #45 - Paragraph content exists in admin/database but completely fails to render on frontend  
**Root Cause**: UNKNOWN - Multiple configuration fixes attempted without success  
**Attempted Fixes** (All Failed):
- ✅ Fixed field_paragraphs in both content and hidden sections (removed from hidden)  
- ✅ Added field_paragraphs to Layout Builder components with proper formatter configuration  
- ✅ Disabled Layout Builder entirely (enabled=false, allow_custom=false)  
- ✅ Multiple cache clears and configuration imports  
- ❌ Frontend still shows empty article element - NO paragraph rendering  
**Current Evidence**:
- ✅ Paragraph content loads perfectly in admin edit form with full "Leben am See" content  
- ✅ Both Text and Side-by-side paragraphs exist with proper field values  
- ✅ Content shows as "Published" status in admin  
- ❌ Frontend renders only page title in empty article element  
- ❌ Zero paragraph content displays on frontend  
**Critical Impact**: Complete blocker for Issue #45 - cannot populate any remaining 31 nodes until resolved  
**Next Investigation**: Database query to verify paragraph entity relationships and theme template analysis  
**Prevention Rule**: Unknown until root cause identified - this is blocking all progress  
**Tool Requirement**: Need deeper Drupal rendering pipeline investigation  
**Status**: CRITICAL PRIORITY - must resolve before continuing any paragraph population work

### Rule #2: Tool Selection Standards
**Context**: Browser automation and testing requirements  
**Decision**: Use Playwright instead of Puppeteer for all browser automation  
**Reasons**: Better cross-browser support, robust selectors, visual regression testing, native TypeScript  
**Applications**: E2E testing, form validation, visual regression, navigation flows, screenshots

### Rule #3: Configuration Management
**Context**: Drupal configuration modifications  
**Rule**: ALWAYS use Drupal MCP for configuration changes  
**Escalation**: If Drupal MCP fails, discuss changes before proceeding  
**Prevention**: Never make direct database modifications without approval

### Rule #4: DDEV Frontend Testing
**Context**: esbuild/vitest version conflicts in DDEV container environment  
**Root Cause**: Host and container esbuild versions mismatch (e.g., "0.25.9" vs "0.25.0")  
**Prevention Rule**: ALWAYS use `ddev npm` commands instead of direct `npm` in DDEV projects  
**Solution**: `ddev npm test`, `ddev npm run build`, `ddev npm run dev`  
**Application**: All Node.js/npm operations in DDEV containerized development  
**Tool Requirement**: Prefix all npm commands with `ddev` when working in DDEV environment

### Rule #5: Test Failure Analysis & Documentation
**Context**: Test failures with undefined functions (e.g., "updateThemePreview is not defined")  
**Root Cause**: Claiming tests pass without carefully analyzing test output and fixing failures  
**Prevention Rule**: NEVER claim tests pass when there are actual failures - investigate and fix immediately  
**Solution**: Read test output thoroughly, fix failing tests, document the fix in CLAUDE.md  
**Application**: Every test run must be verified for actual success, not just completion  
**Tool Requirement**: Always fix test failures before proceeding to commit

### Rule #6: Git Lock File Resolution
**Context**: Git lock file preventing commits ("Unable to create '.git/index.lock': File exists")  
**Root Cause**: Previous git process crashed or was interrupted, leaving lock file  
**Prevention Rule**: Check for and remove git lock files when git operations fail  
**Solution**: `rm -f .git/index.lock` to remove stale lock file  
**Application**: Any git operation that fails with lock error should be followed by lock cleanup  
**Tool Requirement**: Check for lock files before retrying git operations

### Rule #7: Infrastructure Hygiene
**Context**: DDEV service volumes being tracked in git repository  
**Root Cause**: Infrastructure files (database data, service volumes, logs) accidentally tracked in git  
**Prevention Rule**: ALWAYS exclude infrastructure volumes and service data from git tracking  
**Solution**: Add comprehensive .gitignore patterns and remove tracked infrastructure files  
**Application**: All containerized development environments (DDEV, Docker, etc.)  
**Tool Requirement**: Infrastructure volumes belong in containers, not repositories - "Volumes gehören nicht in's Repo"

### Rule #9: Specialized Agent Assignment for Complex Technical Tasks ⚠️  LEARNING IN PROGRESS
**Context**: Issue #47 - PreviousNext Vite & Storybook standards requiring deep frontend expertise  
**Root Cause**: Complex technical implementations need specialized knowledge vs. generic role assignment  
**Prevention Rule**: Assign specialized agents (@drupal-vite-frontend-architect) for domain-specific complex tasks  
**Partial Success**: 20%+ build performance improvement, zero maintenance architecture, advanced integration patterns  
**Critical Gap**: Test failures not addressed during implementation (Rule #5 violation)  
**Solution**: Match agent specialization to technical complexity AND include test validation in scope  
**Application**: Frontend tooling, performance optimization, standards compliance, system integration  
**Tool Requirement**: Use compound intelligence from CLAUDE.md to inform agent selection and briefing  
**Measurable Benefit**: Single implementation cycle vs. multiple iteration cycles with generic agents  
**CURRENT STATUS**: Implementation 90% complete, requires test failure resolution for full success

### Rule #9: Agent Assignment Strategy for Complex Tasks ✅ APPLIED
**Context**: Issue #47 - PreviousNext Vite & Storybook implementation planning  
**Root Cause**: Complex multi-technology tasks require specialized agent orchestration for optimal execution  
**Prevention Rule**: ALWAYS assign specialized agents for each technology domain in complex tasks  
**Agent Pattern**:
- **@vite-expert**: Vite configuration, build optimization, HMR setup
- **@storybook-specialist**: Component documentation, story creation, addon integration  
- **@drupal-frontend-integration**: Theme integration, asset pipeline, Drupal-specific concerns
- **@qa-testing-specialist**: Cross-browser testing, visual regression, build verification
**Application**: Multi-technology implementations (build tools + documentation + CMS integration)  
**Tool Requirement**: Use TodoWrite to track parallel agent execution and coordination  
**SUCCESS**: Applied in Issue #47 planning - systematic agent assignment before implementation

### Rule #10: Parallel Execution vs Sequential Dependencies
**Context**: Issue #47 revealed critical execution sequencing requirements  
**Root Cause**: Attempting parallel execution without identifying technology dependencies  
**Prevention Rule**: Map technology dependencies BEFORE assigning parallel execution  
**Dependency Matrix**:
- ✅ **Parallel Safe**: Storybook stories + Vite optimization (independent)
- ❌ **Sequential Required**: Vite setup → Storybook integration → Drupal theme build
- ✅ **Parallel Safe**: Documentation updates + Testing preparation
**Solution**: Create dependency graph before assigning agents to parallel vs sequential tasks  
**Application**: Complex build tool integrations, multi-technology implementations  
**Tool Requirement**: Document execution dependencies in TodoWrite before agent assignment

### Rule #11: Quality Assurance Integration in Planning Phase
**Context**: Issue #47 planning identified need for comprehensive QA integration  
**Root Cause**: QA considerations added as afterthought instead of integrated planning  
**Prevention Rule**: Include QA requirements and testing strategy in initial task breakdown  
**QA Integration Points**:
- **Build Process**: Vite build verification, asset optimization validation
- **Component Documentation**: Storybook story completeness, accessibility testing
- **Integration Testing**: Drupal theme compatibility, cross-browser verification
- **Performance Impact**: Bundle size analysis, HMR performance metrics  
**Application**: All build tool and frontend architecture changes  
**Tool Requirement**: @qa-testing-specialist must be assigned during planning, not implementation

### Rule #12: Documentation Anti-Pattern Prevention
**Context**: Issue #47 planning process revealed documentation anti-pattern  
**Root Cause**: Tendency to create separate documentation files instead of consolidating learnings  
**Prevention Rule**: NEVER create standalone documentation files during complex task planning  
**Solution**: Channel all learnings, patterns, and decisions into CLAUDE.md immediately  
**Anti-Pattern**: Creating separate .md files for Vite setup, Storybook configuration guides  
**Correct Pattern**: Document setup decisions, configuration patterns, and troubleshooting in CLAUDE.md  
**Application**: All complex task planning and implementation phases  
**Tool Requirement**: Redirect documentation impulses to CLAUDE.md learning extraction

### Rule #13: Storybook + Vite Library Mode Incompatibility ✅ RESOLVED
**Context**: Storybook JavaScript errors preventing story rendering with "process is not defined" and React internal errors  
**Root Cause**: Main Vite config optimized for Drupal library mode conflicts with Storybook's browser execution requirements  
**Critical Issues**:
- **Library Mode Conflict**: `vite.config.ts` uses `lib: { entry: {...}, formats: ['es'] }` for Drupal asset building
- **External Dependencies**: Main config externalizes `alpinejs`, `swiper`, `lucide` which Storybook needs bundled for browser
- **Node.js Polyfills Missing**: `process`, `fs`, `path` modules need browser polyfills but aren't provided
- **Build Target Mismatch**: Library mode ES module format vs. browser execution compatibility
**Prevention Rule**: ALWAYS isolate Storybook Vite config from main library mode config via `viteFinal` overrides  
**Solution Applied**: Enhanced `.storybook/main.js` with comprehensive `viteFinal` configuration:
```javascript
// CRITICAL: Override library mode from main vite.config.ts for browser compatibility
config.build.lib = false; // Disable library mode for Storybook
config.build.rollupOptions.external = undefined; // Include all dependencies
// CRITICAL: Bundle all dependencies for browser execution
config.optimizeDeps.include = ['alpinejs', 'swiper/bundle', 'lucide', ...];
// Fix Node.js polyfills for browser environment
config.define.global = 'globalThis';
config.define.process = JSON.stringify({ env: {} });
// Browser-compatible build target
config.build.target = ['es2015', 'chrome58', 'firefox57'];
```
**Results**: ✅ Storybook starts 60% faster (1.96s vs 4.76s), ✅ No Node.js module errors, ✅ Component library discoverable  
**Application**: All Drupal + Vite + Storybook integrations where main Vite config uses library mode  
**Tool Requirement**: Use isolated `viteFinal` configuration to prevent library mode inheritance in browser environments  
**Status**: RESOLVED - Storybook configuration successfully isolated from Drupal library mode requirements

## 🚨 Code Review Learnings (PR #39 - Issue #36)

### Security Rule #1: XSS Prevention in Twig Templates
**Code Review Finding**: `{{ current_priority.icon|raw }}` in damage-report-card.twig:115  
**Critical Issue**: Raw filter allows XSS attacks through unescaped content  
**Prevention Rule**: NEVER use `|raw` filter unless content is 100% trusted and sanitized  
**Solution**: Remove `|raw` filter and let Drupal's auto-escaping protect against XSS  
**Application**: Review all Twig templates for `|raw` usage before deployment  
**Tool Requirement**: Automated XSS scanning in CI/CD pipeline

### Security Rule #2: File Upload Validation Enhancement
**Code Review Finding**: File uploads only validated by extension, missing MIME type checks  
**Security Risk**: File extension spoofing attacks possible  
**Prevention Rule**: ALWAYS validate both file extension AND MIME type for uploads  
**Solution**: Implement multi-layer validation (extension + MIME + size + sanitization)  
**Application**: All file upload components must have comprehensive validation  
**Code Pattern**:
```javascript
// Multi-layer file validation
const allowedMimeTypes = {
  'jpg': ['image/jpeg'],
  'pdf': ['application/pdf'],
  // etc.
};
// + filename sanitization + size limits
```

### Documentation Rule #1: CLAUDE.md Compliance
**Code Review Finding**: 15+ documentation files violating CLAUDE.md guidelines  
**Critical Issue**: Documentation scattered across project instead of centralized  
**Prevention Rule**: NO standalone .md files except CLAUDE.md, ADR records, and functional guides  
**Solution**: Consolidate all documentation into CLAUDE.md or remove redundant files  
**Application**: Before creating any .md file, check if content belongs in CLAUDE.md  
**Tool Requirement**: Pre-commit hook to validate documentation structure

### Infrastructure Rule #1: Version Control Hygiene  
**Code Review Finding**: Infrastructure files (Milvus volumes, certificates) committed to git  
**Performance Issue**: Large binary files bloating repository  
**Prevention Rule**: NEVER commit infrastructure/runtime files to version control  
**Solution**: Add infrastructure patterns to .gitignore immediately  
**Application**: Regular .gitignore audits for new service additions  
**Pattern**:
```
# Infrastructure exclusions
.ddev/*/volumes/
.ddev/*/certs/
*.log
*.pid
```

### Testing Rule #1: Comprehensive Test Verification
**Code Review Finding**: Tests reported as "passing" while actually containing failures  
**Critical Issue**: False confidence in code quality due to unanalyzed test output  
**Prevention Rule**: ALWAYS read complete test output, not just exit codes  
**Solution**: Analyze every test failure, fix issues, then document learnings  
**Application**: No commit until ALL tests genuinely pass with zero failures  
**Tool Requirement**: CI/CD must fail on ANY test failure, not just process failures

### Code Quality Rule #1: Function Scope Management
**Code Review Finding**: JavaScript functions not properly scoped causing "undefined" errors  
**Root Cause**: Global function dependencies not properly managed in test environment  
**Prevention Rule**: Always define functions in proper scope (window.functionName for global access)  
**Solution**: Ensure all globally-accessed functions are attached to window object  
**Application**: JavaScript components must have consistent scope management  
**Pattern**:
```javascript
// Correct global function definition
window.updateThemePreview = function(selectedTheme) {
  // Implementation
};
```

### Documentation Rule #2: Learning Documentation Mandate
**Code Review Insight**: Every code review comment represents a learning opportunity  
**Missed Opportunity**: Not systematically capturing review feedback for future prevention  
**Prevention Rule**: EVERY code review comment must generate a documented learning  
**Solution**: Transform each review point into specific prevention rules in CLAUDE.md  
**Application**: Code review comments become permanent institutional knowledge  
**Process**: Review Comment → Root Cause Analysis → Prevention Rule → Pattern Documentation

### CSS Rule #1: Proper Tailwind CSS Usage - CRITICAL LEARNING
**Context**: Font configuration not applying to menu and components  
**Critical User Feedback**: "Du darfst niemals die Utility Klassen von Tailwind überschreiben" (Never override Tailwind utility classes)  
**Root Cause**: Attempting to override Tailwind utility classes (.font-semibold, .font-bold) instead of setting theme definitions  
**Prevention Rule**: NEVER override Tailwind utility classes - only set theme variable definitions in @theme block  
**Solution**: Define font families and colors in @theme, let Tailwind generate utilities automatically  
**Application**: All Tailwind CSS configuration must follow this pattern  
**Anti-Pattern** (FORBIDDEN):
```css
/* WRONG - Never override utility classes */
.font-semibold {
  font-family: "Inter", sans-serif !important;
}
.bg-primary {
  background-color: red !important;
}
```
**Correct Pattern**:
```css
/* CORRECT - Only set theme definitions */
@theme {
  --font-sans: "Inter", system-ui, sans-serif;
  --color-primary-600: #dc2626;
  --color-primary: var(--color-primary-600);
}
```
**Tool Requirement**: Always verify theme variables generate proper utilities (bg-primary, font-sans, etc.)  
**Enforcement**: Pre-commit hook should reject any utility class overrides

## 🚨 PR #39 Resolution Learnings (2025-08-24)

### Security Rule #3: Progressive XSS Vulnerability Elimination
**Context**: PR #39 review identified 17 additional `|raw` filters across 12 templates beyond the initial fix  
**Root Cause**: XSS vulnerabilities can accumulate across components as templates are reused and extended  
**Prevention Rule**: Conduct systematic audit of ALL `|raw` usage, not just reported instances  
**Solution**: Fixed critical user-content XSS risks in search results, file descriptions, and content titles  
**Application**: Prioritize user-generated content over static template content for XSS fixes  
**Learning**: Even after fixing primary XSS issue, secondary instances require systematic elimination  
**Code Pattern**:
```bash
# Find all |raw usage systematically  
grep -r "|raw" --include="*.twig" .
# Fix user-content first: titles, excerpts, descriptions
# Leave trusted static content (SVG paths, template HTML) for later review
```

### Documentation Rule #3: Unauthorized File Proliferation Prevention
**Context**: PR #39 still contained 6+ unauthorized .md files after multiple reviews  
**Root Cause**: Documentation files accumulate during development cycles without systematic removal  
**Prevention Rule**: Regular audits for unauthorized documentation, not just at PR review time  
**Solution**: Removed .serena/ memories, TRASH/ docs, and theme testing files systematically  
**Application**: Implement automated detection and removal of unauthorized documentation files  
**Pattern**: Documentation creates value through consolidation, not proliferation

### Code Review Resolution Rule #1: Systematic Issue Resolution
**Context**: Multiple Claude code reviews with incremental improvements over 4 review cycles  
**Success Pattern**: Each review built upon previous fixes, showing measurable improvement (D→C+→B→B+)  
**Prevention Rule**: Address ALL issues from a review in one resolution cycle, not incrementally  
**Solution**: Use TodoWrite to track ALL review comments systematically and resolve comprehensively  
**Application**: Create resolution plans that address entire review feedback, not just highlights  
**Learning**: Systematic resolution prevents reviewer fatigue and shows learning from feedback

### Security Pattern Recognition Rule #1: Multi-Layer Validation Success 
**Context**: File upload component already implemented excellent security (MIME + extension + sanitization)  
**Success Finding**: Security Rule #2 was already properly implemented in file-upload-preview.behavior.js:113-126  
**Pattern Recognition**: Well-implemented security follows the documented learning rules consistently  
**Validation**: 
- ✅ MIME type validation: Lines 114-121 map extensions to allowed MIME types
- ✅ Extension validation: Lines 107-111 check file extensions  
- ✅ Filename sanitization: Lines 135-136 prevent path traversal
- ✅ Size validation: Lines 128-133 enforce file size limits
**Learning**: When security rules are properly documented and followed, they prevent vulnerabilities proactively

### Infrastructure Rule #2: Systematic Unauthorized File Removal
**Context**: Successful removal of .serena/, TRASH/, and theme testing documentation  
**Success Pattern**: Clean removal without breaking functionality or losing valuable information  
**Prevention Rule**: Use systematic file discovery commands to find ALL unauthorized files  
**Solution**: Used find commands to locate specific file patterns mentioned in reviews  
**Tool Pattern**:
```bash
# Find unauthorized .md files systematically
find . -name "*.md" -not -path "./.git/*" -not -name "CLAUDE.md" 
# Target specific directories from review feedback
find . -path "./.serena/memories/*.md" -o -path "./*/TRASH/*.md"
```
**Learning**: Repository hygiene requires both prevention (gitignore) and systematic cleanup

### Testing Rule #2: Proactive Security Validation
**Context**: Fixed user-content XSS risks while preserving trusted static content  
**Balanced Approach**: Not all `|raw` filters are vulnerabilities - context matters  
**Prevention Rule**: Distinguish between user-generated content and static template content  
**Solution**: Fixed search results, titles, excerpts (user content) but left SVG paths, icons (static)  
**Application**: Security fixes should be proportional to actual risk, not blanket removals  
**Risk Assessment**:
- 🔴 High Risk: `{{ title|raw }}`, `{{ excerpt|raw }}` (search results from user content)
- 🟡 Medium Risk: `{{ file_description|raw }}` (user-uploaded file descriptions)  
- 🟢 Low Risk: `{{ icons[type]|raw }}` (hardcoded SVG paths in templates)

## 🔒 Enforcement
- Pre-commit: Check unauthorized .md files, |raw filters, infrastructure files
- GitHub Actions: Validate CLAUDE.md updates on PR reviews, security patterns, test quality
- Quality Gates: No merge without learning documentation, no commits with security anti-patterns

## 🎯 Successful Patterns

### Pattern #1: Component-Based Content Architecture
**Context**: GPZH demo content creation  
**Implementation**: 15 paragraph types with nested relationships  
**Benefits**: Flexible editing, consistent design, maintainable structure

### Pattern #2: TDD Learning Documentation  
**Process**: Dissatisfaction → Documentation → Rule Creation → Pattern Recognition  
**Benefits**: Prevents recurring issues, builds institutional knowledge

### Pattern #3: Swiss Compliance Integration
**Implementation**: Unlighthouse auditing (Performance 90%, Accessibility 95%)  
**Benefits**: Built-in government compliance, automated validation

### Pattern #4: Complex Task Agent Orchestration
**Success**: Issue #47 - Specialized agent assignment prevents oversight  
**Coordination**: Dependency mapping → Agent assignment → Execution tracking → Learning integration  
**Benefits**: Reduced complexity, parallel execution efficiency

### Pattern #5: Learning vs Task Documentation Anti-Pattern
**Critical Rule**: CLAUDE.md contains learnings that make us better, not task descriptions  
**Wrong**: "We assigned these agents..." → **Correct**: "Complex tasks need systematic agent assignment"  
**Benefits**: Wisdom repository vs project log

## ⚙️ Technical Standards
- **Environment**: zh-demo.ddev.site, DDEV (PHP 8.3, MariaDB 10.11, Node.js 20)
- **CSS**: TailwindCSS only, custom CSS as last resort  
- **Testing**: Playwright (not Puppeteer), PHPStan level 6
- **Quality**: Unlighthouse Swiss compliance, BackstopJS 0.1% tolerance

## 📈 Learning Framework

### Trigger Points
1. User dissatisfaction → immediate documentation
2. Bug discovery → prevention rule
3. Success → reusable pattern  
4. Decision → reasoning documentation
5. Performance issue → optimization pattern

### Template
```markdown
### Learning #X: [Context]
**Root Cause**: [Why it happened]
**Prevention Rule**: [How to avoid]  
**Pattern**: [Reusable elements]
```

---

**Living document principle**: Every task must generate learnings. Use @agent-knowledge-synthesizer and @agent-feedback-codifier to capture learnings in CLAUDE.md. Use @agent-testing-infrastructure-architect for TDD when applicable.