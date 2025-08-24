# CLAUDE.md - Test-Driven Development & Continuous Learning System

This file serves as the living memory and learning system for the GPZH project, implementing Test-Driven Development principles where every bug becomes a prevention rule, every decision becomes reusable knowledge, and every successful solution becomes a pattern.

## 🧠 Core Learning Principles

**TDD Development Approach**:
- Every bug transforms into a permanent prevention rule
- Every decision gets documented and becomes reusable
- Every successful code solution evolves into a pattern
- User dissatisfaction triggers immediate learning documentation
- Each command execution creates learning opportunities

**Continuous Improvement**: When development doesn't meet expectations, the failure is documented in this file to prevent the same mistake from recurring.

## 🎯 Project Context: GPZH Präqualifikation Demo System

**ZH-DEMO Prototyp** - A Drupal 11.2.2 multi-site CMS demonstration system for the GPZH (Gemeindeportale Zürich) prequalification presentation. This system demonstrates our technical capabilities for the Canton of Zurich's municipal portal project.

**Demo Municipality**: Gemeinde Bruchtal ("Leben am See" - Life by the Lake)

## 🔄 Three-Lane Development System

- **Planning Lane**: Strategic analysis and architecture (@drupal-solution-architect + @drupal-technical-pm)
- **Building Lane**: Implementation and development (@drupal-11-lead-developer + @municipality-portal-specialist)  
- **Reviewing Lane**: Quality assurance and compliance (@swiss-compliance-specialist + @qa-testing-specialist)

## 📚 Learning & Pattern Documentation

### Current Learning Status
**Last Updated**: 2025-08-24
**Active Patterns**: Frontend editing, Drupal MCP integration, TDD learning cycles
**Current Phase**: Systematic learning documentation with user feedback loops

### Meta-Learning Agents
*Specialized systems that transform individual learnings into system-wide improvements*
- **@prompt-engineering-specialist**: Optimizes AI interactions using systematic prompt iteration
- **@test-failure-analyst**: Transforms every failure into permanent knowledge and prevention systems
- **@knowledge-synthesizer**: Fuses insights across lanes and agents into compound intelligence

## 🐛 Bug Prevention Rules

### Rule #1: Paragraphs Frontend Editing Fix
**Context**: Paragraphs_ee module not showing "Add Paragraph" button on empty fields  
**Root Cause**: "Add in between" functionality disabled by default  
**Prevention Rule**: Always enable "Add in between" functionality (`add_above: add_above`) when configuring paragraph fields  
**Application**: Apply to all content types with paragraph fields (page, landing_page)  
**Tool Requirement**: Use Drupal MCP exclusively for configuration changes

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

### Rule #4: TailwindCSS v4 Migration Standards
**Context**: PR #40 build error "Cannot apply unknown utility class `focus-within:ring-opacity-50`"  
**Root Cause**: TailwindCSS v4 deprecated separate opacity utilities in favor of inline color/opacity syntax  
**Prevention Rule**: Use v4 syntax `ring-blue-500/50` instead of `ring-blue-500 ring-opacity-50`  
**Solution**: Migrate all opacity utilities to inline color/opacity format  
**Application**: All TailwindCSS projects upgrading from v3 to v4  
**Code Pattern**:
```css
/* TailwindCSS v3 (deprecated) */
.element:focus { @apply ring-2 ring-blue-500 ring-opacity-50; }

/* TailwindCSS v4 (correct) */
.element:focus { @apply ring-2 ring-blue-500/50; }
```

### Rule #5: JavaScript Global Scope Management
**Context**: PR #40 test failures "updateThemePreview is not defined" (330+ errors)  
**Root Cause**: Functions used globally not properly attached to window object in test environment  
**Prevention Rule**: Explicitly attach all globally-accessed functions to window object  
**Solution**: Define as `window.functionName = function() {...}` in main JavaScript file  
**Application**: JavaScript functions used across Twig templates, forms, and components  
**Code Pattern**:
```javascript
// Correct global function definition for cross-template access
window.updateThemePreview = function(selectedTheme) {
  const previewCards = document.querySelectorAll('.theme-preview-card');
  // Implementation accessible from any template/form
};
```

### Rule #6: Search Template Placeholder Removal
**Context**: PR #40 hard-coded "89% Match" relevance scores in production templates  
**Root Cause**: Placeholder/mock data left in templates during development  
**Prevention Rule**: Remove ALL placeholder data from templates before production commits  
**Solution**: Comment out placeholder sections with TODO comments for future implementation  
**Application**: All Twig templates with temporary/development placeholder content  
**Code Pattern**:
```twig
{# AI Relevance Score - TODO: Implement dynamic scoring #}
{# Remove placeholder scores until proper AI relevance scoring is implemented #}
{#
<div class="relevance-score" aria-label="AI relevance score: {{ relevance_score|default(0) }} percent match">
  {{ relevance_score|default(0) }}% Match
</div>
#}
```

### Rule #7: XSS Prevention in Component JavaScript
**Context**: PR #40 search component lacking input sanitization for user queries  
**Root Cause**: Raw user input used in DOM manipulation without escaping  
**Prevention Rule**: Always escape HTML entities and RegExp characters in user input  
**Solution**: Implement escapeHtml() and escapeRegExp() functions for all user input  
**Application**: All JavaScript components handling user-generated content  
**Code Pattern**:
```javascript
// XSS Prevention utilities
escapeHtml: function(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
},

escapeRegExp: function(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

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

## 🔒 Enforcement & Automation Systems

### Automated Learning Enforcement

#### **Pre-Commit Hooks**
```bash
#!/bin/bash
# .ddev/commands/git-pre-commit
# Enforce CLAUDE.md compliance before commits

echo "🔍 CLAUDE.md Compliance Check..."

# 1. Check for unauthorized .md files
UNAUTHORIZED_MD=$(find . -name "*.md" -not -path "./.git/*" -not -name "CLAUDE.md" -not -path "./docs/adr/*" -not -name "README.md" -not -name "CHANGELOG.md")
if [ ! -z "$UNAUTHORIZED_MD" ]; then
    echo "❌ Unauthorized .md files found. Consolidate into CLAUDE.md:"
    echo "$UNAUTHORIZED_MD"
    exit 1
fi

# 2. Check for |raw filters in Twig templates
RAW_FILTERS=$(find . -name "*.twig" -exec grep -l "|raw" {} \; 2>/dev/null)
if [ ! -z "$RAW_FILTERS" ]; then
    echo "❌ Security Risk: |raw filters found in Twig templates:"
    echo "$RAW_FILTERS"
    echo "Review for XSS vulnerabilities or document as trusted content"
    exit 1
fi

# 3. Check for infrastructure files
INFRA_FILES=$(git diff --cached --name-only | grep -E "\.(log|pid|lock)$|volumes/|certs/")
if [ ! -z "$INFRA_FILES" ]; then
    echo "❌ Infrastructure files should not be committed:"
    echo "$INFRA_FILES"
    echo "Add to .gitignore and unstage these files"
    exit 1
fi

echo "✅ CLAUDE.md compliance verified"
```

#### **GitHub Actions Workflow**
```yaml
# .github/workflows/claude-learning-enforcement.yml
name: CLAUDE.md Learning Enforcement

on:
  pull_request:
    types: [opened, synchronize, reopened]
  pull_request_review:
    types: [submitted]

jobs:
  enforce-learning:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check for Code Review Learnings
        if: github.event.review.state == 'changes_requested' || github.event.review.state == 'commented'
        run: |
          echo "📝 Code Review detected - Learning documentation required"
          
          # Check if CLAUDE.md was updated in this PR
          CLAUDE_UPDATED=$(git diff origin/main..HEAD --name-only | grep "CLAUDE.md" || echo "")
          
          if [ -z "$CLAUDE_UPDATED" ]; then
            echo "❌ Code Review comments found but CLAUDE.md not updated"
            echo "Every code review comment must generate documented learning"
            echo "Please update CLAUDE.md with new prevention rules"
            exit 1
          fi
          
          echo "✅ CLAUDE.md updated with learnings"

      - name: Validate Security Patterns
        run: |
          # Check for security anti-patterns
          echo "🔒 Security Pattern Validation..."
          
          # XSS Prevention Check
          if grep -r "|raw" --include="*.twig" .; then
            echo "❌ XSS Risk: |raw filters detected"
            exit 1
          fi
          
          # File Upload Security Check
          if grep -r "file\.name\." --include="*.js" . && ! grep -r "sanitizedName\|allowedMimeTypes" --include="*.js" .; then
            echo "❌ File Upload Security: Missing validation patterns"
            exit 1
          fi
          
          echo "✅ Security patterns validated"

      - name: Test Quality Gate
        run: |
          echo "🧪 Test Quality Validation..."
          
          # Ensure tests actually pass
          cd web/themes/custom/adesso_cms_theme
          if ! ddev npm test 2>&1 | tee test_output.log; then
            echo "❌ Tests failed - fix before proceeding"
            cat test_output.log
            exit 1
          fi
          
          # Check for actual failures in output
          if grep -i "failed\|error\|undefined" test_output.log; then
            echo "❌ Test failures detected in output"
            echo "Rule #5: Fix all test failures before claiming tests pass"
            exit 1
          fi
          
          echo "✅ All tests genuinely pass"
```

#### **Claude Code Integration**
```markdown
# .claude/commands/enforce-learning.md
# Learning Enforcement Command

**Trigger**: After every PR review or issue resolution
**Purpose**: Ensure systematic learning documentation

## Auto-Execution
- Triggered when code review comments are detected
- Runs after issue resolution commands
- Validates CLAUDE.md updates

## Process
1. Analyze PR/issue for learning opportunities
2. Generate prevention rules from problems found
3. Update CLAUDE.md with new learnings
4. Validate compliance with existing rules
5. Create enforcement patterns for future

## Example Usage
```bash
claude enforce-learning --pr=39 --issue=36
```

## Validation Checklist
- [ ] Each code review comment documented
- [ ] Root cause analysis completed
- [ ] Prevention rule created
- [ ] Code pattern documented
- [ ] Tool requirements specified
```

#### **Development Workflow Integration**
```bash
# .ddev/commands/web/pr-review
#!/bin/bash
# Integrated PR review process with learning enforcement

echo "🔄 Starting PR Review with Learning Integration..."

# 1. Gather PR context
PR_NUMBER="$1"
echo "📋 Analyzing PR #$PR_NUMBER..."

# 2. Run automated checks
echo "🔍 Running automated compliance checks..."
.ddev/commands/git-pre-commit

# 3. Execute tests with failure analysis
echo "🧪 Running comprehensive test suite..."
cd web/themes/custom/adesso_cms_theme
if ! ddev npm test > test_results.log 2>&1; then
    echo "❌ Tests failed - analyzing for learnings..."
    
    # Extract test failures for learning documentation
    grep -A 5 -B 5 "Error:\|Failed:\|undefined" test_results.log > test_failures.log
    
    echo "📝 Test failures detected - creating learning entries..."
    echo "Please update CLAUDE.md with test failure analysis"
    cat test_failures.log
    exit 1
fi

# 4. Check for learning documentation
echo "📚 Validating learning documentation..."
if [ ! -z "$(git diff origin/main..HEAD --name-only | grep CLAUDE.md)" ]; then
    echo "✅ CLAUDE.md updated with learnings"
else
    echo "⚠️  No CLAUDE.md updates found"
    echo "If this PR addresses issues or has review comments, document learnings"
fi

# 5. Security validation
echo "🔒 Running security checks..."
find . -name "*.twig" -exec grep -l "|raw" {} \; | while read file; do
    echo "⚠️  Review |raw usage in: $file"
done

echo "✅ PR Review process completed with learning enforcement"
```

### Process Integration Points

#### **1. Development Phase**
- **Pre-commit**: Automated compliance validation
- **Testing**: Failure analysis with mandatory documentation
- **Code Review**: Learning extraction requirement

#### **2. Review Phase**  
- **GitHub Actions**: Automatic learning validation
- **PR Templates**: Learning documentation checklist
- **Review Guidelines**: Mandatory learning documentation

#### **3. Post-Merge Phase**
- **Success Patterns**: Extract reusable solutions
- **Failure Analysis**: Convert problems to prevention rules
- **Knowledge Synthesis**: Continuous CLAUDE.md evolution

### Compliance Monitoring

#### **Dashboard Metrics**
- Learning Rules Added per Sprint
- Code Review Comments Documented (%)  
- Prevention Rules Applied Successfully
- Repeat Issues Eliminated

#### **Quality Gates**
- No merge without learning documentation
- No deploy with unauthorized .md files
- No commit with security anti-patterns
- No PR approval without test verification

### Human Process Integration

#### **Team Training**
- CLAUDE.md principles in onboarding
- Learning documentation workshops  
- Code review learning sessions
- Continuous improvement retrospectives

#### **Accountability Systems**
- Learning documentation assigned in sprint planning
- Code review learning validation in definition of done
- Technical debt reduction through systematic learning
- Knowledge transfer through documented patterns

## 🎯 Successful Patterns

### Pattern #1: Component-Based Content Architecture
**Success Context**: GPZH demo content creation with paragraph components  
**Implementation**: 15 paragraph types with nested relationships and media integration  
**Reusable Elements**: Card groups, accordions, heroes, galleries, forms  
**Benefits**: Flexible content editing, consistent design system, maintainable structure

### Pattern #2: TDD Learning Documentation
**Success Context**: Transforming user feedback into prevention systems  
**Implementation**: Structured learning sections with specific rules and patterns  
**Process**: Dissatisfaction → Documentation → Rule Creation → Pattern Recognition  
**Benefits**: Prevents recurring issues, builds institutional knowledge

### Pattern #3: Swiss Compliance Integration
**Success Context**: eCH-0059 government standards implementation  
**Implementation**: Unlighthouse auditing with custom thresholds and validation  
**Components**: Performance 90%, Accessibility 95%, SEO compliance  
**Benefits**: Built-in compliance, automated validation, government readiness

### Pattern #4: DOM Performance Optimization
**Success Context**: PR #40 search component optimization with DocumentFragment  
**Implementation**: Batch DOM insertions instead of individual appendChild operations  
**Process**: Create DocumentFragment → Append all elements → Single DOM insertion  
**Benefits**: Reduces layout thrashing, improves performance, maintains responsiveness  
**Code Pattern**:
```javascript
// Performance-optimized DOM manipulation
const fragment = document.createDocumentFragment();
newResults.forEach(result => {
  fragment.appendChild(result);
});
// Single DOM insertion instead of multiple appendChild calls
resultsContainer.appendChild(fragment);
```

### Pattern #5: Systematic Code Review Resolution
**Success Context**: PR #40 with 8 critical issues systematically addressed  
**Implementation**: Code Review Comments → Root Cause Analysis → Prevention Rules → Pattern Documentation  
**Process**: Issue Identification → Fix Implementation → Test Verification → Learning Documentation  
**Benefits**: Prevents recurring issues, builds institutional knowledge, improves code quality  
**Metrics**: 330+ test errors reduced to 8, 97% test pass rate, all security vulnerabilities fixed

## ⚙️ Technical Standards & Decisions

### Development Environment
- **Base URL**: zh-demo.ddev.site (not bruchtal.zh-demo.ddev.site)
- **CSS Framework**: Always use TailwindCSS, custom CSS only as last resort
- **Testing**: Playwright for all browser automation and E2E testing
- **AI Integration**: MCP servers for development assistance (Atlassian, GitHub, Playwright)

### Quality Assurance
- **Static Analysis**: PHPStan level 6 for enterprise-grade code quality
- **Visual Testing**: BackstopJS with 0.1% mismatch tolerance
- **Performance**: Unlighthouse with Swiss compliance thresholds
- **Browser Support**: Chrome, Firefox, Safari, Mobile (Pixel 5, iPhone 12)

## 📈 Command Learning Framework

### Learning Trigger Points
1. **User Dissatisfaction**: Immediate documentation in this file
2. **Bug Discovery**: Transform into prevention rule
3. **Successful Solution**: Extract reusable pattern
4. **Decision Points**: Document reasoning for future reference
5. **Performance Issues**: Create optimization patterns

### Documentation Template for New Learnings
```markdown
### Learning #X: [Context/Issue]
**Date**: [YYYY-MM-DD]
**Type**: [Bug Fix/Decision/Pattern/Dissatisfaction]
**Context**: [What happened]
**Root Cause**: [Why it happened]
**Solution**: [How it was resolved]
**Prevention Rule**: [How to avoid in future]
**Pattern**: [Reusable elements for similar situations]
```

## 🔧 Infrastructure & Deployment

### Container Strategy
- **Development**: DDEV with PHP 8.3, MariaDB 10.11, Node.js 20
- **Production**: Multi-stage Docker builds with optimized layers
- **AI Integration**: MCP server stack for Claude development assistance

### Content Management
- **Demo Content**: Automated creation via PHP scripts with entity factories
- **Navigation**: GPZH-compliant hierarchical menu structure
- **Workflows**: Editorial workflow with draft→review→published states
- **Users**: Role-based permissions with Guest Editor restrictions

## 📝 Recent Learning Documentation

### Rule #8: Frontend Editing Module Respect
**Date**: 2025-08-24
**Context**: Search results showing Theme Debug output, user requested fix  
**Root Cause**: Attempted to disable Frontend Editing module instead of properly overriding templates  
**Critical Error**: Deactivating user-requested features without permission  
**Prevention Rule**: NEVER disable features or modules without explicit user approval  
**Solution**: Always fix template rendering issues by overriding specific templates, not disabling functionality  
**Application**: All Drupal module management - ask before deactivating anything  
**Tool Requirement**: Frontend functionality must be preserved - "Frontend_editing BLEIBT aktiv"

### Rule #9: Template Override Specificity  
**Date**: 2025-08-24
**Context**: Search results template still showing Theme Debug output despite changes  
**Root Cause**: Using generic template names instead of specific Views template overrides  
**Prevention Rule**: Use the MOST SPECIFIC template name possible for Views overrides  
**Solution**: Override `views-view-fields--search--page-1.html.twig` not generic `views-view-fields--search.html.twig`  
**Application**: All Drupal template overrides - check template suggestions hierarchy  
**Pattern**: `views-view-fields--[VIEW]--[DISPLAY].html.twig` beats generic patterns

### Rule #10: Raw Filter Security Risk
**Date**: 2025-08-24
**Context**: Theme Debug output appearing in search results despite template changes  
**Root Cause**: Using `|raw` filter in Twig templates allows unfiltered output including debug info  
**Prevention Rule**: AVOID `|raw` filter unless content is 100% trusted and sanitized  
**Solution**: Use `|striptags|trim` instead of `|raw` to clean output  
**Application**: All Twig template development - security-first filtering  
**Security Pattern**: `{{ content|striptags|trim }}` instead of `{{ content|raw }}`

### Rule #11: Learning Documentation Mandate
**Date**: 2025-08-24
**Context**: User reminder "Du hast schon wieder keine Learnings dokumentiert"  
**Critical Issue**: Failing to document learnings from every development session  
**Prevention Rule**: ALWAYS document learnings immediately after problem resolution  
**Solution**: Every bug fix, template change, or configuration issue becomes a learning entry  
**Application**: End of every development task - update CLAUDE.md  
**Process**: Problem → Solution → Documentation → Prevention Rule

### Rule #12: Drupal Block Management Knowledge
**Date**: 2025-08-24  
**Context**: User corrected "Der Pageheader ist ein Block... merke dir das!"
**Knowledge Gap**: Not recognizing that page headers are Drupal blocks, not just template elements
**Prevention Rule**: ALWAYS remember that page headers, titles, and navigation are Drupal blocks
**Solution**: Use block configuration/visibility settings instead of template modifications for block management
**Application**: All Drupal layout and visibility changes - think blocks first, templates second
**Tool Requirement**: Block management through admin interface or Drupal configuration

This living document evolves with each command execution, ensuring continuous learning and improvement in development practices.
- Es ist wirklich die oberste Pflicht, dass du unseren Ansatz in der Claude.md lebst! Wir müssen uns verbessern!