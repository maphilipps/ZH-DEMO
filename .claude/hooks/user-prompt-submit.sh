#!/bin/bash

# Simple Compounding Engineering Hook with Prompts
set -euo pipefail

USER_PROMPT="$1"
PROJECT_DIR="$(dirname "$(dirname "$(dirname "${BASH_SOURCE[0]}")")")"

# Skip very short prompts
if [ ${#USER_PROMPT} -lt 10 ]; then
    exit 0
fi

# Detect feedback and append to context for Claude
if echo "$USER_PROMPT" | grep -qiE "(du musst|falsch|nochmal|überarbeiten|vergessen|besser|stattdessen|ich erwarte)"; then
    echo "USER_FEEDBACK_DETECTED=true" > "$PROJECT_DIR/.claude/prompt_context.env"
    echo "USER_FEEDBACK='$USER_PROMPT'" >> "$PROJECT_DIR/.claude/prompt_context.env"
else
    echo "USER_FEEDBACK_DETECTED=false" > "$PROJECT_DIR/.claude/prompt_context.env"
fi

# Set context for different scenarios
if echo "$USER_PROMPT" | grep -qiE "(demo|präsentation|bruchtal|35.*minut)"; then
    echo "CONTEXT=demo_preparation" >> "$PROJECT_DIR/.claude/prompt_context.env"
elif echo "$USER_PROMPT" | grep -qiE "(form|validation|webform)"; then
    echo "CONTEXT=municipal_forms" >> "$PROJECT_DIR/.claude/prompt_context.env"
elif echo "$USER_PROMPT" | grep -qiE "(swiss|compliance|ech|wcag)"; then
    echo "CONTEXT=swiss_compliance" >> "$PROJECT_DIR/.claude/prompt_context.env"
elif echo "$USER_PROMPT" | grep -qiE "(lane|orchestrator|planning|building|reviewing)"; then
    echo "CONTEXT=lane_coordination" >> "$PROJECT_DIR/.claude/prompt_context.env"
else
    echo "CONTEXT=general_development" >> "$PROJECT_DIR/.claude/prompt_context.env"
fi

echo "TIMESTAMP=$(date -Iseconds)" >> "$PROJECT_DIR/.claude/prompt_context.env"

exit 0