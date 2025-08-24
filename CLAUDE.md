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

This living document evolves with each command execution, ensuring continuous learning and improvement in development practices.