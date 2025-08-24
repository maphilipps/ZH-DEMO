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

This living document evolves with each command execution, ensuring continuous learning and improvement in development practices.
- Es ist wirklich die oberste Pflicht, dass du unseren Ansatz in der Claude.md lebst! Wir müssen uns verbessern!