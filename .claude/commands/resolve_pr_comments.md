---
description: Resolve PR review comments by applying fixes based on compound knowledge
category: knowledge
allowed-tools: Task, Read, Write, Edit, MultiEdit, Grep, Glob, TodoWrite, Bash(gh:*), Bash(git:*), Bash(jq:*), Bash(date:*)
argument-hint: "<pr-number>"
---

# Resolve PR Review Comments

Resolve review comments for PR #$ARGUMENTS by applying fixes based on compound knowledge and error prevention rules.

## Context
- Current PR: !`gh pr view $ARGUMENTS --json number,title,state,url,mergeable --jq '{"number": .number, "title": .title, "state": .state, "mergeable": .mergeable, "url": .url}'`
- Review Status: !`gh pr view $ARGUMENTS --json reviewDecision --jq '.reviewDecision // "PENDING"'`
- Comments to Address: !`gh pr view $ARGUMENTS --json reviews --jq '[.reviews[] | select(.state == "CHANGES_REQUESTED")] | length'`

## Your Task

Systematically resolve PR review comments by:
1. Loading review comments and requested changes
2. Applying compound knowledge and error prevention rules
3. Implementing fixes with appropriate specialist agents
4. Updating tests and documentation as needed
5. Validating resolution completeness

### 1. Load Review Comments and Changes

```bash
# Get all review comments that need addressing
gh pr view $ARGUMENTS --json reviews --jq '.reviews[] | select(.state == "CHANGES_REQUESTED" or .state == "COMMENTED") | {
  id: .id,
  author: .author.login,
  state: .state,
  body: .body,
  submitted_at: .submittedAt
}' > /tmp/pr-$ARGUMENTS-review-requests.json

# Get line-specific comments  
gh pr view $ARGUMENTS --json comments --jq '.comments[] | select(.body != null) | {
  id: .id,
  author: .author.login,
  body: .body,
  path: .path,
  line: .line,
  created_at: .createdAt,
  resolved: (.pullRequestReview.state == "DISMISSED")
}' > /tmp/pr-$ARGUMENTS-line-comments.json

# Get current PR diff for context
gh pr diff $ARGUMENTS > /tmp/pr-$ARGUMENTS-diff.patch
```

### 2. Categorize and Prioritize Comments

Analyze comments with compound knowledge:

```
Task tool:
- description: "Categorize PR review comments by type and priority"
- subagent_type: compounding-engineering-orchestrator
- prompt: |
    Analyze PR #$ARGUMENTS review comments and categorize them for systematic resolution.
    
    Input data:
    - /tmp/pr-$ARGUMENTS-review-requests.json (general review comments)
    - /tmp/pr-$ARGUMENTS-line-comments.json (line-specific comments)
    - /tmp/pr-$ARGUMENTS-diff.patch (current changes)
    
    Apply compound knowledge from:
    - knowledge/error-prevention-rules.md
    - knowledge/patterns/ (all categories)
    - knowledge/triage/ (priority classification)
    
    Categorize each comment by:
    1. **Type**: security, performance, architecture, quality, testing, accessibility
    2. **Priority**: CRITICAL (blocks merge), HIGH (should fix), MEDIUM (nice to have), LOW (future improvement)
    3. **Complexity**: simple, moderate, complex
    4. **Files affected**: list specific files that need changes
    5. **Dependency**: independent, depends on other fixes, blocks other fixes
    
    Create a resolution plan with optimal fix order.
    Output structured plan for systematic resolution.
```

### 3. Apply Error Prevention Rules

Check against known prevention rules:

```bash
# Load error prevention rules
echo "📋 Applying Error Prevention Rules..."
cat knowledge/error-prevention-rules.md

# Check if any comments match known patterns
echo "🔍 Matching comments to known patterns..."
```

### 4. Resolve Comments Systematically

For each category and priority level, apply fixes:

#### 4.1 Security Issues (CRITICAL Priority)

```
Task tool:
- description: "Resolve security issues from PR review"
- subagent_type: drupal-security-auditor
- prompt: |
    Resolve CRITICAL and HIGH priority security issues from PR #$ARGUMENTS review comments.
    
    Input: /tmp/pr-$ARGUMENTS-review-requests.json
    Context: /tmp/pr-$ARGUMENTS-diff.patch
    
    Apply security patterns from:
    - knowledge/patterns/security/
    - knowledge/error-prevention-rules.md (security rules)
    
    Focus on:
    - XSS prevention in Twig templates
    - SQL injection prevention  
    - Authentication/authorization fixes
    - Input validation issues
    - File upload security
    
    Make required fixes and report changes made.
```

#### 4.2 Performance Issues

```
Task tool:
- description: "Resolve performance issues from PR review"
- subagent_type: drupal-performance-optimizer
- prompt: |
    Resolve performance issues identified in PR #$ARGUMENTS review comments.
    
    Apply performance patterns from:
    - knowledge/patterns/performance/
    - Core Web Vitals requirements
    
    Focus on:
    - Database query optimization
    - Caching improvements
    - Asset loading optimization
    - Memory usage improvements
    
    Implement fixes and verify performance impact.
```

#### 4.3 Architecture Issues  

```
Task tool:
- description: "Resolve architecture issues from PR review"
- subagent_type: drupal-sdc-architect
- prompt: |
    Resolve architectural concerns from PR #$ARGUMENTS review comments.
    
    Apply architecture patterns from:
    - knowledge/patterns/architecture/
    - Single Directory Component best practices
    
    Focus on:
    - Component separation and reusability
    - Dependency injection improvements
    - Code organization and structure
    - Design pattern compliance
    
    Refactor code as needed and maintain backward compatibility.
```

#### 4.4 Quality Issues

```
Task tool:
- description: "Resolve code quality issues from PR review"  
- subagent_type: code-review-expert
- prompt: |
    Address code quality concerns from PR #$ARGUMENTS review comments.
    
    Apply quality patterns from:
    - knowledge/patterns/quality/
    - Project coding standards
    
    Focus on:
    - Code readability and maintainability
    - Naming conventions
    - Documentation improvements  
    - Error handling enhancements
    
    Improve code quality while preserving functionality.
```

#### 4.5 Testing Issues

```
Task tool:
- description: "Resolve testing issues from PR review"
- subagent_type: testing-infrastructure-architect  
- prompt: |
    Address testing concerns from PR #$ARGUMENTS review comments.
    
    Apply testing patterns from:
    - knowledge/patterns/testing/
    - Project testing standards ("When tests fail, fix the code, not the test")
    
    Focus on:
    - Test coverage improvements
    - Meaningful test scenarios
    - Edge case testing
    - Test maintainability
    
    Enhance testing without breaking existing functionality.
```

#### 4.6 Accessibility Issues

```
Task tool:
- description: "Resolve accessibility issues from PR review"
- subagent_type: a11y-compliance-auditor
- prompt: |
    Address accessibility concerns from PR #$ARGUMENTS review comments.
    
    Apply accessibility patterns from:
    - knowledge/patterns/accessibility/
    - WCAG 2.1 AA compliance requirements
    
    Focus on:
    - Semantic HTML improvements
    - ARIA attribute corrections
    - Keyboard navigation fixes
    - Screen reader compatibility
    
    Ensure full accessibility compliance.
```

### 5. Validate Resolution Completeness

After applying fixes, validate that all issues are resolved:

```
Task tool:
- description: "Validate PR review comment resolution"
- subagent_type: master-auditor-reviewer
- prompt: |
    Validate that all review comments for PR #$ARGUMENTS have been properly addressed.
    
    Check:
    1. All CRITICAL issues resolved
    2. All HIGH priority issues addressed  
    3. Code still passes tests
    4. No new issues introduced
    5. Documentation updated if needed
    
    Compare original comments with implemented fixes.
    Verify compound knowledge rules were applied.
    
    Report any remaining unresolved comments.
```

### 6. Update Tests and Documentation

```bash
# Run tests to ensure fixes don't break anything
echo "🧪 Running tests..."
ddev exec npm run test

# Update documentation if needed
echo "📚 Checking documentation..."
```

### 7. Commit Fixes and Update PR

```bash
# Stage and commit all fixes
git add .
git commit -m "fix: resolve PR review comments - apply compound knowledge patterns

- Applied security fixes from knowledge/patterns/security/
- Implemented performance improvements
- Enhanced code quality and maintainability
- Updated tests and documentation
- Applied error prevention rules

Addresses review comments in PR #$ARGUMENTS"

# Push changes
git push origin issue-$ARGUMENTS

# Update PR with resolution summary
gh pr comment $ARGUMENTS --body "✅ **Review Comments Resolved**

Applied compound knowledge patterns to resolve all review comments:

## Security Fixes
- [List security improvements applied]

## Performance Improvements  
- [List performance fixes applied]

## Architecture Enhancements
- [List architectural improvements]

## Quality Improvements
- [List code quality enhancements]

## Testing Updates
- [List testing improvements]

## Accessibility Fixes
- [List accessibility improvements]

## Applied Error Prevention Rules
- [List specific rules applied from knowledge base]

All changes follow compound engineering principles and should prevent similar issues in future implementations.

Ready for re-review! 🔄"
```

### 8. Mark Comments as Resolved

```bash
# If GitHub CLI supports it, mark appropriate comments as resolved
echo "✅ Marking resolved comments..."
echo "All changes have been implemented and committed."
```

## Success Criteria

The resolution process is successful when:
- ✅ All review comments categorized and prioritized
- ✅ Compound knowledge patterns applied appropriately  
- ✅ Security issues resolved (CRITICAL priority)
- ✅ Performance issues addressed
- ✅ Architecture improvements implemented
- ✅ Code quality enhanced
- ✅ Testing updated and passing
- ✅ Accessibility compliance maintained
- ✅ Documentation updated
- ✅ Changes committed with descriptive messages
- ✅ PR updated with resolution summary
- ✅ No new issues introduced
- ✅ All fixes align with error prevention rules

## Integration with Workflow

This command is used in the resolution workflow:

```bash
# Your shell command triggers this
ccp 456  # Creates worktree pr-456 and runs /resolve_pr_comments 456
```

This follows the `/review` command which extracted knowledge patterns from the PR comments.

## Error Prevention Learning

Each resolution contributes to compound intelligence:
- Failed resolution attempts → New prevention rules
- Successful patterns → Enhanced knowledge base  
- Edge cases discovered → Improved triage system
- Review feedback → Better categorization