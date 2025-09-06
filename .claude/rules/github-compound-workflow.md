---
description: Enhanced GitHub workflow requirements optimized for compound engineering practices with branch management, issue linking, and continuous learning integration.
author: Compound Engineering Team
version: 1.0
tags: ["github", "workflow", "compound-engineering", "branch-management", "issue-tracking"]
globs: ["*"]
---
# GitHub Compound Engineering Workflow

**Objective:** Establish GitHub workflows that compound learning, accelerate development velocity, and build permanent institutional knowledge through systematic issue tracking, branch management, and knowledge capture.

## Branch Management Protocol

### Branch Creation Rules
**MUST** follow this exact process for ALL work:

1. **Issue First**: Never create branches without linked GitHub issues
2. **Descriptive Naming**: Use format `feature/issue-number-brief-description`
   - Examples: `feature/42-user-authentication`, `fix/123-memory-leak-api`
3. **Single Responsibility**: One issue per branch, one branch per issue
4. **Short-Lived**: Branches should live less than 48 hours when possible

### Branch Protection Requirements
**NEVER** work directly on main/master branch:
- All work MUST happen in feature/fix branches
- Main branch MUST be protected with required reviews
- No direct commits to main branch allowed
- All merges MUST go through pull requests

## GitHub Issue Integration

### Issue Creation Process
Every task MUST have a corresponding GitHub issue:

1. **Issue Templates**: Use standardized templates for consistency
2. **Compound Learning Labels**: Add labels for knowledge capture
   - `compound-learning`: Issues that generated reusable patterns
   - `architectural-decision`: Issues requiring ADR documentation
   - `pattern-discovered`: Issues that revealed new system patterns
   - `velocity-improvement`: Issues that improved development speed

### Issue Documentation Standards
Each issue **MUST** include:

```markdown
## Problem Statement
[Clear description of what needs to be solved]

## Acceptance Criteria
- [ ] Specific, testable criteria 1
- [ ] Specific, testable criteria 2
- [ ] Specific, testable criteria 3

## Technical Approach
[High-level approach or link to ADR if architectural]

## Compound Learning Opportunity
[How will solving this make similar future problems easier?]

## Definition of Done
- [ ] Implementation complete
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Patterns documented for reuse
- [ ] ADR created if architectural
```

## Pull Request Excellence

### PR Creation Requirements
**MUST** include in every pull request:

```markdown
## Summary
[Brief description of changes]

## Linked Issue
Fixes #[issue-number]
Related to #[related-issue]

## Technical Changes
- [Specific change 1]
- [Specific change 2]
- [Specific change 3]

## Testing Strategy
[How was this tested? Include both automated and manual testing]

## Compound Learning Captured
[What patterns were discovered? What will make similar work faster next time?]

## ADR References
[Link to any ADRs created or referenced: ADR-NNNN]

## Breaking Changes
[Any breaking changes and migration strategy]

## Reviewer Notes
[Specific areas where reviewer should focus attention]
```

### PR Review Protocol
**Reviewers MUST**:
1. **Verify Issue Linkage**: Confirm PR is linked to GitHub issue
2. **Check Compound Learning**: Ensure patterns are documented for reuse
3. **Validate ADR Compliance**: Confirm architectural decisions follow existing ADRs
4. **Test Coverage Review**: Verify adequate test coverage
5. **Pattern Recognition**: Identify reusable patterns for future documentation

## Commit Message Standards

### Conventional Commits Format
**MUST** use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types**: feat, fix, docs, style, refactor, test, chore, adr

**Examples**:
```
feat(auth): implement JWT token refresh logic

- Add automatic token refresh mechanism
- Implement retry logic for expired tokens
- Update auth middleware to handle refreshed tokens

Implements pattern from ADR-0042
Closes #123
```

```
adr(database): document database sharding strategy

Created ADR-0045 for horizontal scaling approach

Closes #67
```

## Compound Engineering Integration

### Issue-to-Knowledge Pipeline
Every closed issue **MUST** contribute to compound knowledge:

1. **Pattern Documentation**: Extract reusable patterns to `memory-bank/`
2. **Rule Updates**: Add new rules to `.claude/rules/` based on learnings
3. **ADR Creation**: Document architectural decisions for future reference
4. **Velocity Tracking**: Measure how learnings improve similar future work

### Knowledge Capture Automation
Use GitHub Actions to automate knowledge capture:

```yaml
name: Compound Learning Capture
on:
  pull_request:
    types: [closed]
    
jobs:
  capture-learning:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Extract Learning Patterns
        # Automatically extract patterns from PR descriptions
      - name: Update Memory Bank
        # Update memory-bank files with new learnings
      - name: Suggest Rule Updates
        # Suggest new rules based on discovered patterns
```

### Velocity Measurement
Track these compound engineering metrics:

- **Time to Similar Solution**: How much faster was this compared to first time solving similar issue?
- **Pattern Reuse Rate**: How many existing patterns were reused?
- **Knowledge Application**: How many previous ADRs/rules were referenced?
- **Learning Capture**: How many new patterns were documented?

## Workflow Optimization

### GitHub CLI Integration
**MUST** use GitHub CLI for consistency:

```bash
# Create issue-linked branch
gh issue create --title "Implement user authentication" --body "..." --label "feature"
gh issue develop 123 --checkout

# Create PR with proper linking
gh pr create --title "feat(auth): implement user authentication" --body "..." --linked-issue 123

# Review and merge
gh pr review 456 --approve
gh pr merge 456 --merge
```

### Branch Cleanup Automation
Implement automatic branch cleanup:
- Delete merged branches automatically
- Archive stale branches after 7 days
- Notify about unlinked branches

### Issue Lifecycle Management
- Auto-close issues when linked PRs are merged
- Auto-assign reviewers based on file patterns
- Auto-label issues based on changed files

## Quality Gates

### Pre-Merge Checklist
**MUST** verify before merging:
- [ ] Issue is linked and properly documented
- [ ] All tests pass (unit, integration, e2e)
- [ ] Code follows established patterns (check existing rules)
- [ ] ADR created if architectural decision was made
- [ ] Learning patterns documented in memory-bank
- [ ] Commit messages follow conventional format
- [ ] Breaking changes are documented

### Post-Merge Actions
**MUST** complete after merge:
- [ ] Update project documentation if needed
- [ ] Create follow-up issues for discovered improvements
- [ ] Update relevant ADRs with implementation learnings
- [ ] Document new patterns in .claude/rules/
- [ ] Measure and record velocity improvements

## Emergency Procedures

### Hotfix Protocol
For critical production issues:
1. Create emergency issue with `hotfix` label
2. Create hotfix branch from main: `hotfix/issue-number-description`
3. Implement minimal fix
4. Fast-track review with required approvers
5. **MUST** still document learning and create follow-up improvement issues

### Rollback Procedure
If rollback is needed:
1. Document failure context in issue
2. Create rollback PR linking to failure issue
3. **MUST** create post-mortem issue for learning capture
4. Schedule architectural review if pattern failure is detected

## Success Metrics

Track compound engineering success through:
- **Issue Resolution Velocity**: Average time from issue creation to closure
- **Pattern Reuse Frequency**: How often documented patterns are applied
- **Knowledge Application Rate**: How frequently ADRs and rules guide decisions
- **Learning Capture Completeness**: Percentage of issues that generate reusable knowledge

**Remember**: Every GitHub interaction should contribute to our compound engineering system, turning every issue, PR, and commit into permanent institutional knowledge that accelerates all future work.