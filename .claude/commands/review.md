# /review - Code Review & Quality Assurance

**Purpose**: Systematic code review, PR management, and learning extraction

## Usage Patterns

```bash
/review pr                        # Review current PR comprehensively
/review resolve                   # Resolve all PR comments systematically  
/review security                  # Security-focused code audit
/review learning                  # Extract learnings from review feedback
```

## Core Workflow

### 1. Comprehensive PR Analysis
- Use `gh pr view --comments` for complete context
- Apply Security Rules from CLAUDE.md (XSS, validation, etc.)
- Identify all actionable comments with GitHub API
- Classify comments by priority and impact

### 2. Systematic Comment Resolution
- **Sequential**: Work through comments one by one with learning capture
- **Parallel**: Spawn sub-agents for independent comment groups
- Apply TodoWrite for systematic tracking
- Validate resolution against quality gates

### 3. Security-First Review
- Scan for `|raw` filters (XSS prevention)
- Validate file upload security patterns
- Check for infrastructure files in commits
- Apply all security patterns from CLAUDE.md

### 4. Learning Extraction
- Transform every review comment into documented learning
- Update CLAUDE.md with new prevention rules
- Extract successful patterns for reuse
- Document compound intelligence gains

### 5. Quality Validation
- Run complete test suite with genuine pass verification
- Execute linting and security scans
- Validate Swiss compliance requirements
- Confirm all prevention rules applied

## Advanced Patterns

**Multi-Agent Resolution**: For PRs with 5+ comments across different domains
**Security Audit Mode**: Focus exclusively on security patterns and vulnerabilities
**Learning Documentation**: Systematic extraction of review feedback into institutional knowledge

## Quality Gates
- [ ] All PR comments resolved with documented learning
- [ ] Security patterns validated (no XSS risks)
- [ ] Tests genuinely pass (analyzed output, not just exit codes)
- [ ] New prevention rules added to CLAUDE.md
- [ ] Three-lane review requirements satisfied

## Arguments
**$ARGUMENTS**: 'pr', 'resolve', 'security', 'learning', or specific focus areas