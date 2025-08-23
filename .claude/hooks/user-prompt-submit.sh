#!/bin/bash

# User Prompt Submit Hook - Compounding Engineering @agent Format
# Uses specialized agents for frustration detection and context analysis via Task tool

set -euo pipefail

USER_PROMPT="$1"
PROJECT_DIR="$(dirname "$(dirname "$(dirname "${BASH_SOURCE[0]}")")")"

# Colors for output
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
NC='\033[0m'

# Skip very short prompts
if [ ${#USER_PROMPT} -lt 10 ]; then
    exit 0
fi

# Frustration analysis using @agent format integration
echo -e "${PURPLE}🔍 Analyzing frustration patterns...${NC}"

# Simple frustration detection (in full implementation, would use @frustration-detection-specialist)
if echo "$USER_PROMPT" | grep -qiE "(scheiße|wahnsinn|verdammt|mist|ärgerlich|frustriert|nicht funktioniert|kaputt|immer noch|nochmal|falsch)"; then
    echo -e "\033[0;31m⚠️  Frustration detected (High level)\033[0m"
    # In full implementation: @frustration-detection-specialist: "Analyze high frustration: $USER_PROMPT"
else
    echo -e "${GREEN}✓ No significant frustration detected${NC}"
fi

# Context analysis and environment setup
PROJECT_DIR="$(dirname "$(dirname "$(dirname "${BASH_SOURCE[0]}")")")"

# Detect feedback patterns
if echo "$USER_PROMPT" | grep -qiE "(du musst|falsch|nochmal|überarbeiten|vergessen|besser|stattdessen|ich erwarte|not working|broken|still|again)"; then
    echo "USER_FEEDBACK_DETECTED=true" > "$PROJECT_DIR/.claude/prompt_context.env"
    echo "USER_FEEDBACK='$USER_PROMPT'" >> "$PROJECT_DIR/.claude/prompt_context.env"
    # In full implementation: @feedback-analyzer-agent: "Process user feedback: $USER_PROMPT"
else
    echo "USER_FEEDBACK_DETECTED=false" > "$PROJECT_DIR/.claude/prompt_context.env"
fi

# Context detection using pattern matching
if echo "$USER_PROMPT" | grep -qiE "(demo|präsentation|bruchtal|35.*minut)"; then
    echo "CONTEXT=demo_preparation" >> "$PROJECT_DIR/.claude/prompt_context.env"
    # In full implementation: @demo-preparation-specialist: "Set demo context for: $USER_PROMPT"
elif echo "$USER_PROMPT" | grep -qiE "(form|validation|webform)"; then
    echo "CONTEXT=municipal_forms" >> "$PROJECT_DIR/.claude/prompt_context.env"
    # In full implementation: @municipal-forms-specialist: "Set forms context for: $USER_PROMPT"
elif echo "$USER_PROMPT" | grep -qiE "(swiss|compliance|ech|wcag)"; then
    echo "CONTEXT=swiss_compliance" >> "$PROJECT_DIR/.claude/prompt_context.env"
    # In full implementation: @swiss-compliance-specialist: "Set compliance context for: $USER_PROMPT"
elif echo "$USER_PROMPT" | grep -qiE "(lane|orchestrator|planning|building|reviewing)"; then
    echo "CONTEXT=lane_coordination" >> "$PROJECT_DIR/.claude/prompt_context.env"
    # In full implementation: @lane-coordination-specialist: "Set lane context for: $USER_PROMPT"
else
    echo "CONTEXT=general_development" >> "$PROJECT_DIR/.claude/prompt_context.env"
    # In full implementation: @context-analyzer-agent: "Determine context for: $USER_PROMPT"
fi

echo "TIMESTAMP=$(date -Iseconds)" >> "$PROJECT_DIR/.claude/prompt_context.env"

# Note: In full @agent implementation, this would trigger parallel agents:
# @frustration-detection-specialist: "Analyze user prompt for frustration patterns: $USER_PROMPT" 
# @context-analyzer-agent: "Determine optimal context and specialization for: $USER_PROMPT"
# @feedback-analyzer-agent: "Process user feedback and learning opportunities: $USER_PROMPT"

exit 0