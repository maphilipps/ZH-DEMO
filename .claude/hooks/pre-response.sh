#!/bin/bash

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

exit 0