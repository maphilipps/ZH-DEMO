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