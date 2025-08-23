#!/bin/bash

<<<<<<< HEAD
# Simple Pre-Response Hook with Prompt Context
set -euo pipefail

PROJECT_DIR="$(dirname "$(dirname "$(dirname "${BASH_SOURCE[0]}")")")"

# Read context from user-prompt-submit hook
if [ -f "$PROJECT_DIR/.claude/prompt_context.env" ]; then
    source "$PROJECT_DIR/.claude/prompt_context.env"
fi

# If user gave feedback, inject learning prompt
if [ "${USER_FEEDBACK_DETECTED:-false}" = "true" ]; then
    cat << 'EOF'

🤖 **Compounding Engineering Learning Active**

User Feedback Detected: I should learn from this feedback and avoid similar issues in future responses.

Key Learning Areas to Consider:
- Lane coordination (use @orchestrators, don't work directly)  
- Swiss Compliance (eCH-0059, WCAG, CH-DSG)
- Municipal Forms (4 required types)
- Process adherence (TodoWrite, proper delegation)

I'll integrate this feedback into my response approach and remember it for future interactions.

EOF
fi

# Context-specific reminders
case "${CONTEXT:-general_development}" in
    "demo_preparation")
        echo "🎯 **Demo Context**: Remember 35-minute presentation, Bruchtal municipality, 4 demo segments"
        ;;
    "swiss_compliance")
        echo "🇨🇭 **Swiss Compliance Context**: eCH-0059, WCAG 2.1 AA, CH-DSG requirements active"
        ;;
    "lane_coordination")
        echo "🔄 **Lane Context**: Use @orchestrators, delegate to specialists, don't work directly"
        ;;
    "municipal_forms")
        echo "📋 **Forms Context**: Feedback, damage reports, events, room booking - all 4 required"
        ;;
esac

=======
# Pre-response hook for Claude Code
# This hook runs before Claude sends a response to the user

set -euo pipefail

# Set script directory and log file
HOOK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$HOOK_DIR/../logs/pre-response.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

echo -e "\033[0;34m🤖 Pre-Response Hook\033[0m"

# Log the hook execution
echo "[$TIMESTAMP] Pre-response hook executed" >> "$LOG_FILE"

# Check if we're in a git repository
if git rev-parse --git-dir > /dev/null 2>&1; then
    # Get current branch
    CURRENT_BRANCH=$(git branch --show-current)
    echo "[$TIMESTAMP] Current branch: $CURRENT_BRANCH" >> "$LOG_FILE"
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        echo "[$TIMESTAMP] Uncommitted changes detected" >> "$LOG_FILE"
    fi
fi

# Check DDEV status if available
if command -v ddev >/dev/null 2>&1; then
    DDEV_STATUS=$(ddev status 2>/dev/null | grep -E "(Running|Stopped)" | head -1 || echo "Unknown")
    echo "[$TIMESTAMP] DDEV status: $DDEV_STATUS" >> "$LOG_FILE"
fi

echo -e "\033[0;32m✓ Pre-response hook completed\033[0m"

# Exit successfully (non-blocking)
>>>>>>> dcd4777b (feat: Complete theme customization with color palette and Google Fonts (Issue #36))
exit 0