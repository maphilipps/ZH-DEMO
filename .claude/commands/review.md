---
description: Process PR review comments and extract knowledge patterns for compound learning
category: knowledge
allowed-tools: Task, Read, Write, Grep, Glob, TodoWrite, Bash(gh:*), Bash(git:*), Bash(jq:*), Bash(date:*)
argument-hint: "<pr-number>"
---

# Process PR Review Comments for Knowledge Extraction

Process PR review comments for PR #$ARGUMENTS and extract learnings for compound intelligence.

## Context
- Current PR: !`gh pr view $ARGUMENTS --json number,title,state,url --jq '{"number": .number, "title": .title, "state": .state, "url": .url}'`
- Review Comments: !`gh pr view $ARGUMENTS --json reviews --jq '[.reviews[] | {author: .author.login, state: .state, body: .body}] | length' | head -1`
- Repository: !`gh repo view --json nameWithOwner --jq '.nameWithOwner'`

## Your Task

Extract knowledge patterns from PR review comments to build compound intelligence and prevent future issues.

### 1. Load PR Review Data

```bash
# Get PR details and all review comments
gh pr view $ARGUMENTS --json reviews,comments,files > /tmp/pr-$ARGUMENTS-data.json

# Extract review comments
gh pr view $ARGUMENTS --json reviews --jq '.reviews[] | select(.body != null and .body != "") | {
  author: .author.login,
  state: .state,
  body: .body,
  submitted_at: .submittedAt
}' > /tmp/pr-$ARGUMENTS-reviews.json

# Extract review thread comments
gh pr view $ARGUMENTS --json comments --jq '.comments[] | select(.body != null) | {
  author: .author.login,
  body: .body,
  created_at: .createdAt,
  path: .path,
  line: .line
}' > /tmp/pr-$ARGUMENTS-review-comments.json

# Extract file changes for context
gh pr view $ARGUMENTS --json files --jq '.files[] | {
  filename: .filename,
  additions: .additions,
  deletions: .deletions,
  status: .status
}' > /tmp/pr-$ARGUMENTS-files.json
```

### 2. Extract Patterns with feedback-codifier Agent

Launch the feedback-codifier agent to extract patterns:

```
Task tool:
- description: "Extract knowledge patterns from PR review comments"
- subagent_type: feedback-codifier
- prompt: |
    Process PR #$ARGUMENTS review comments to extract learning patterns.
    
    Input data available:
    - /tmp/pr-$ARGUMENTS-reviews.json (general review comments)
    - /tmp/pr-$ARGUMENTS-review-comments.json (line-specific comments)
    - /tmp/pr-$ARGUMENTS-files.json (changed files context)
    
    Extract and categorize patterns by:
    1. **Security** issues (XSS, injection, authentication, etc.)
    2. **Performance** issues (queries, caching, optimization, etc.)
    3. **Architecture** issues (separation, coupling, design patterns, etc.)
    4. **Quality** issues (readability, maintainability, naming, etc.)
    5. **Testing** issues (coverage, meaningful tests, edge cases, etc.)
    6. **Accessibility** issues (WCAG, ARIA, semantic HTML, etc.)
    
    For each pattern found:
    - Extract the PROBLEM (what went wrong)
    - Extract the SOLUTION (what was recommended)
    - Extract BEFORE/AFTER code examples if available
    - Assign TRIAGE level: CRITICAL, HIGH, MEDIUM, LOW
    - Identify PREVENTION strategy
    
    Output structured knowledge entries for each pattern category.
```

### 3. Synthesize Knowledge with knowledge-synthesizer Agent

```
Task tool:
- description: "Synthesize extracted patterns into knowledge base"
- subagent_type: knowledge-synthesizer
- prompt: |
    Take the extracted patterns from feedback-codifier and synthesize them into our knowledge base.
    
    For each pattern:
    1. Check if similar patterns exist in knowledge/patterns/[category]/
    2. Either merge with existing patterns or create new ones
    3. Update pattern frequency and effectiveness metrics
    4. Create cross-references between related patterns
    
    Create or update knowledge files:
    - knowledge/patterns/security/*.md
    - knowledge/patterns/performance/*.md  
    - knowledge/patterns/architecture/*.md
    - knowledge/patterns/quality/*.md
    - knowledge/patterns/testing/*.md
    - knowledge/patterns/accessibility/*.md
    
    Generate Error Prevention Rules (≤200 chars) for critical/high patterns.
```

### 4. Orchestrate Learning with compounding-engineering-orchestrator

```
Task tool:
- description: "Orchestrate compound learning from PR review"
- subagent_type: compounding-engineering-orchestrator
- prompt: |
    Orchestrate the 4-phase compound engineering methodology for PR #$ARGUMENTS:
    
    **PLAN**: Analyze the extracted patterns and determine learning priorities
    **DELEGATE**: Ensure knowledge-synthesizer has processed all patterns
    **ASSESS**: Evaluate pattern quality and prevention effectiveness
    **CODIFY**: Transform learnings into permanent system intelligence
    
    Tasks:
    1. Triage patterns by impact and frequency
    2. Update knowledge/triage/ files with new patterns
    3. Generate/update error prevention rules in knowledge/error-prevention-rules.md
    4. Create learning summary for this PR
    5. Update compound intelligence metrics
    
    Ensure all learnings are actionable and will prevent similar issues in future PRs.
```

### 5. Update Knowledge Base Structure

Ensure knowledge is organized constructively:

```markdown
knowledge/
├── patterns/
│   ├── security/
│   │   ├── xss-prevention.md
│   │   ├── authentication.md
│   │   └── input-validation.md
│   ├── performance/
│   │   ├── query-optimization.md
│   │   ├── caching-strategies.md
│   │   └── asset-loading.md
│   ├── architecture/
│   │   ├── component-design.md
│   │   ├── separation-of-concerns.md
│   │   └── dependency-injection.md
│   ├── quality/
│   │   ├── code-style.md
│   │   ├── maintainability.md
│   │   └── naming-conventions.md
│   ├── testing/
│   │   ├── test-coverage.md
│   │   ├── meaningful-tests.md
│   │   └── edge-case-testing.md
│   └── accessibility/
│       ├── wcag-compliance.md
│       ├── aria-usage.md
│       └── semantic-html.md
├── error-prevention-rules.md
├── triage/
│   ├── critical.md
│   ├── high.md
│   ├── medium.md
│   └── low.md
└── metrics/
    ├── pattern-frequency.json
    ├── prevention-success.json
    └── pr-$ARGUMENTS-learning-summary.md
```

### 6. Generate Learning Summary

Create a summary report:

```bash
# Create learning summary
cat > knowledge/metrics/pr-$ARGUMENTS-learning-summary.md << EOF
# PR #$ARGUMENTS Learning Summary
Generated: $(date)
PR: !`gh pr view $ARGUMENTS --json title,url --jq '{title: .title, url: .url}'`

## Patterns Extracted
- Security: [count]
- Performance: [count]  
- Architecture: [count]
- Quality: [count]
- Testing: [count]
- Accessibility: [count]

## New Error Prevention Rules
[List any new rules generated]

## Triage Summary
- Critical: [count]
- High: [count]
- Medium: [count]
- Low: [count]

## Prevention Impact
These learnings will help prevent similar issues in future implementations.

## Next Actions
- [ ] Apply new rules in next implementation
- [ ] Review similar patterns in existing code
- [ ] Update CLAUDE.md with new prevention rules
EOF
```

### 7. Cleanup and Finalization

```bash
# Clean up temporary files
rm -f /tmp/pr-$ARGUMENTS-*.json

# Update PR with learning summary
gh pr comment $ARGUMENTS --body "🧠 **Learning Extraction Completed**

Knowledge patterns extracted and added to compound intelligence system:
- Security patterns: [count]
- Performance patterns: [count] 
- Architecture patterns: [count]
- Quality patterns: [count]
- Testing patterns: [count]
- Accessibility patterns: [count]

📋 Learning summary: knowledge/metrics/pr-$ARGUMENTS-learning-summary.md

These patterns will help prevent similar issues in future implementations."
```

## Success Criteria

The review processing is successful when:
- ✅ All PR review comments analyzed
- ✅ Patterns extracted and categorized by type
- ✅ Knowledge base updated with new/merged patterns  
- ✅ Error prevention rules generated (≤200 chars)
- ✅ Triage system updated
- ✅ Learning summary created
- ✅ Compound intelligence metrics updated
- ✅ PR commented with learning summary

## Integration with Workflow

This command is used in the review workflow:

```bash
# Your shell command triggers this
ccr 456  # Creates worktree pr-456 and runs /review 456
```

After this command, use `/resolve_pr_comments` to apply fixes based on the extracted knowledge.