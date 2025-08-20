#!/bin/bash
# Script to start working on a GitHub issue
# Usage: ./.github/scripts/start-issue.sh [ISSUE_NUMBER]

if [ -z "$1" ]; then
    echo "❌ Please provide an issue number"
    echo "Usage: $0 [ISSUE_NUMBER]"
    exit 1
fi

ISSUE_NUMBER=$1

# Get issue title for branch name
ISSUE_TITLE=$(gh issue view $ISSUE_NUMBER --json title -q .title | tr '[:upper:]' '[:lower:]' | sed 's/\[plan\] //g' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g' | cut -c1-50)

if [ -z "$ISSUE_TITLE" ]; then
    echo "❌ Could not fetch issue #$ISSUE_NUMBER"
    exit 1
fi

BRANCH_NAME="feature/issue-${ISSUE_NUMBER}-${ISSUE_TITLE}"

echo "📋 Starting work on Issue #$ISSUE_NUMBER"
echo "🌿 Creating branch: $BRANCH_NAME"

# Ensure we're on main and up to date
git checkout main
git pull origin main

# Create and checkout new branch
git checkout -b "$BRANCH_NAME"

# Update issue status
gh issue edit $ISSUE_NUMBER --add-label in-progress --add-assignee @me

echo "✅ Ready to work on Issue #$ISSUE_NUMBER"
echo ""
echo "Next steps:"
echo "1. Implement the feature according to specifications"
echo "2. Commit with: git commit -m \"feat: your message (refs #$ISSUE_NUMBER)\""
echo "3. Push with: git push -u origin $BRANCH_NAME"
echo "4. Create PR with: gh pr create --base main"