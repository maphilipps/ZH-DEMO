---
description: "Extract learnings from GitHub PR reviews and update compounding knowledge base"
allowedTools: ["Bash", "Task", "Edit", "mcp__server-memory__*"]
---

# /review - Learning-Driven Code Review

Captures learnings from GitHub reviews and updates compounding knowledge base for continuous improvement.

## Usage
```
/review [issue_number] [pr_number]
```

## Learning Extraction Process

### Analyze GitHub PR Reviews
!ISSUE_NUMBER=$ARGUMENTS[0] && \
PR_NUMBER=$ARGUMENTS[1] && \
echo "🔍 Analyzing GitHub PR #${PR_NUMBER} for Issue #${ISSUE_NUMBER}" && \
gh pr view "${PR_NUMBER}" --json comments,reviews,mergeable,additions,deletions && \
gh pr checks "${PR_NUMBER}"

### Extract Patterns and Learnings
!gh pr view $ARGUMENTS[1] --json comments,reviews --jq '.reviews[] | select(.state == "CHANGES_REQUESTED" or .state == "COMMENTED") | .body' > /tmp/review_feedback.txt && \
echo "📚 Extracting learnings from review feedback..."

### Move to Review Lane
!ITEM_ID=$(gh api graphql -f query="query(\$owner: String!, \$name: String!) { repository(owner: \$owner, name: \$name) { issue(number: $ARGUMENTS[0]) { projectItems(first: 5) { nodes { id project { title } } } } } }" -f owner="maphilipps" -f name="zh-demo" --jq '.data.repository.issue.projectItems.nodes[] | select(.project.title == "GZ Demo") | .id') && \
gh project item-edit --id "$ITEM_ID" --project-id "PVT_kwHOAuMI6s4BBOm5" --field-id "PVTSSF_lAHOAuMI6s4BBOm5zgzzCcE" --single-select-option-id "df73e18b"

### Add Review Analysis Comment
!gh issue comment $ARGUMENTS[0] --body "## 📊 Code Review Analysis Complete

**Status**: Moving to 'In Review' (Reviewing Lane)  
**PR Analyzed**: #$ARGUMENTS[1]
**Analysis Date**: $(date '+%Y-%m-%d %H:%M:%S')

## Review Learning Extraction

### Feedback Categories Analyzed:
- ✅ Code quality improvements
- ✅ Swiss compliance requirements  
- ✅ Performance optimizations
- ✅ Accessibility enhancements
- ✅ Security considerations
- ✅ Testing coverage gaps

### Compounding Knowledge Updates:
- 📚 Patterns extracted for future reuse
- 🔧 Failure modes documented for prevention
- ✨ Success patterns added to knowledge base
- 📋 Swiss compliance learnings captured

## Next Actions:
- Review feedback has been processed
- Knowledge base updated with learnings
- Patterns available for future compound benefits
- Ready for final approval or iteration

---
🤖 Review analysis completed via /review command"

## Learning Integration Active

**Knowledge Extraction Complete:**

### Success Patterns → Permanent Knowledge
- Code patterns that worked well
- Architecture decisions that proved effective  
- Swiss compliance approaches that passed review

### Failures → Prevention Rules
- Code smells that were caught
- Security issues that were identified
- Performance problems that were found

### Review Feedback → Process Improvements
- Reviewer suggestions for better practices
- Communication improvements needed
- Documentation gaps identified

**This review analysis compounds into permanent system knowledge for future improvements!**

### Swiss Compliance Learnings Captured:
- eCH-0059 accessibility feedback
- Multi-language implementation notes
- GDPR/CH-DSG compliance observations
- Swiss design standard adherence