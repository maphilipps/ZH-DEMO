#!/bin/bash
# Script to create a PR with automatic issue linking
# Usage: ./.github/scripts/create-pr.sh [ISSUE_NUMBER] [PR_TITLE]

if [ -z "$1" ]; then
    echo "❌ Please provide an issue number"
    echo "Usage: $0 [ISSUE_NUMBER] \"PR Title\""
    exit 1
fi

ISSUE_NUMBER=$1
PR_TITLE=${2:-"Implementation for Issue #$ISSUE_NUMBER"}

# Get issue title and body for context
ISSUE_DATA=$(gh issue view $ISSUE_NUMBER --json title,body)
ISSUE_TITLE=$(echo "$ISSUE_DATA" | jq -r '.title')

echo "📋 Creating PR for Issue #$ISSUE_NUMBER"
echo "🔗 This will automatically link to the issue"

# Create PR body with proper linking
PR_BODY="## 🔗 Fixes #$ISSUE_NUMBER

## 📋 Summary
This PR implements: $ISSUE_TITLE

## 🎯 Implementation Details
<!-- Describe what was implemented -->

## ✅ Acceptance Criteria
<!-- Copy from issue #$ISSUE_NUMBER -->

## 🧪 Test Plan
- [ ] Functional testing completed
- [ ] Swiss compliance validated
- [ ] Performance targets met (<2s load time)
- [ ] Accessibility tested (WCAG 2.1 AA)

## 📷 Screenshots
<!-- Add if applicable -->

---
🤖 Generated with [Claude Code](https://claude.ai/code)"

# Create the PR with automatic linking
gh pr create \
  --title "$PR_TITLE (fixes #$ISSUE_NUMBER)" \
  --body "$PR_BODY" \
  --base main \
  --label "building-lane"

echo "✅ PR created and linked to Issue #$ISSUE_NUMBER"
echo ""
echo "GitHub will automatically:"
echo "- Link the PR to the issue"
echo "- Close the issue when PR is merged"
echo "- Show the PR in the issue's timeline"