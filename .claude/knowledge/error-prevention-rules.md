# Error Prevention Rules

Rules generated from PR review patterns and compound intelligence extraction. Each rule is maximum 200 characters and links to detailed knowledge patterns.

## Security Rules

### XSS-001: Twig Template Escaping
Always escape user input in Twig templates with |e filter to prevent XSS attacks
📁 [Details](patterns/security/xss-prevention.md)

### AUTH-001: Session Validation
Validate session tokens on every protected route to prevent session hijacking
📁 [Details](patterns/security/authentication.md)

### INPUT-001: Data Validation
Validate all user input on both client and server side before processing
📁 [Details](patterns/security/input-validation.md)

## Performance Rules

### PERF-001: Database Queries
Use eager loading and query optimization to prevent N+1 query problems
📁 [Details](patterns/performance/query-optimization.md)

### CACHE-001: Caching Strategy
Implement proper cache invalidation strategies for dynamic content
📁 [Details](patterns/performance/caching-strategies.md)

### ASSET-001: Asset Loading
Optimize asset loading with proper compression and lazy loading techniques
📁 [Details](patterns/performance/asset-loading.md)

## Architecture Rules

### COMP-001: Component Design
Keep components focused on single responsibility with clear interfaces
📁 [Details](patterns/architecture/component-design.md)

### SEP-001: Separation of Concerns
Separate business logic from presentation logic in all components
📁 [Details](patterns/architecture/separation-of-concerns.md)

### DEP-001: Dependency Management
Use dependency injection instead of hard-coded dependencies
📁 [Details](patterns/architecture/dependency-injection.md)

## Quality Rules

### CODE-001: Code Style
Follow consistent code formatting and naming conventions across the project
📁 [Details](patterns/quality/code-style.md)

### MAINT-001: Maintainability
Write self-documenting code with clear variable and function names
📁 [Details](patterns/quality/maintainability.md)

### NAME-001: Naming Conventions
Use descriptive names that clearly indicate purpose and scope
📁 [Details](patterns/quality/naming-conventions.md)

## Testing Rules

### TEST-001: Test Coverage
Write tests for all critical business logic with meaningful assertions
📁 [Details](patterns/testing/test-coverage.md)

### MEAN-001: Meaningful Tests
Create tests that can fail and reveal real issues, not just pass always
📁 [Details](patterns/testing/meaningful-tests.md)

### EDGE-001: Edge Case Testing
Test edge cases and error conditions, not just happy path scenarios
📁 [Details](patterns/testing/edge-case-testing.md)

## Accessibility Rules

### WCAG-001: WCAG Compliance
Ensure all UI components meet WCAG 2.1 AA accessibility standards
📁 [Details](patterns/accessibility/wcag-compliance.md)

### ARIA-001: ARIA Usage
Use ARIA attributes correctly to enhance screen reader accessibility
📁 [Details](patterns/accessibility/aria-usage.md)

### SEM-001: Semantic HTML
Use semantic HTML elements to improve accessibility and SEO
📁 [Details](patterns/accessibility/semantic-html.md)

---

## Rule Generation Process

1. **Pattern Extraction**: feedback-codifier agent extracts patterns from PR reviews
2. **Pattern Synthesis**: knowledge-synthesizer agent consolidates similar patterns  
3. **Rule Creation**: compounding-engineering-orchestrator creates prevention rules ≤200 chars
4. **Validation**: Rules tested against real scenarios for effectiveness
5. **Integration**: Rules integrated into development workflow and CI/CD

## Usage

These rules should be:
- Applied during code development
- Checked during code reviews  
- Integrated into CI/CD pipelines
- Used for developer education
- Updated based on effectiveness metrics

## Contributing

When adding new rules:
1. Ensure rule is ≤200 characters
2. Link to detailed pattern documentation
3. Include triage level (CRITICAL/HIGH/MEDIUM/LOW)
4. Provide concrete examples
5. Test rule effectiveness in practice