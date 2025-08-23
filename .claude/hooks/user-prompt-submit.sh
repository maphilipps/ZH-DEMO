#!/bin/bash

# Simple AI-Powered Hook - Triggers One AI Prompt Only
set -euo pipefail

USER_PROMPT="$1"

# Colors for output
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Skip very short prompts
if [ ${#USER_PROMPT} -lt 10 ]; then
    exit 0
fi

echo -e "${PURPLE}🤖 AI Frustration Analysis${NC}"

# Simple prompt that Claude will see
echo "USER_FRUSTRATION_ANALYSIS_REQUEST=true" > /tmp/claude_hook_request
echo "Analyze this for frustration (0-3 scale, German/English): \"$USER_PROMPT\""

echo -e "${GREEN}✓ AI analysis triggered${NC}"