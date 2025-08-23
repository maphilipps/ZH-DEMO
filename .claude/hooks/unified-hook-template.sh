#!/bin/bash
# Unified Hook Template - Consistent @agent Format
# Standardizes all hooks to use the Task tool with specialized agents

set -euo pipefail

HOOK_TYPE="$1"
USER_INPUT="${2:-}"
PROJECT_DIR="$(dirname "$(dirname "$(dirname "${BASH_SOURCE[0]}")")")"

# Agent mapping for different hook types
declare -A HOOK_AGENTS=(
    ["session-start"]="@session-initialization-agent"
    ["user-prompt-submit"]="@frustration-detector,@context-analyzer"
    ["task-complete"]="@learning-synthesizer,@knowledge-extractor"
    ["github-issue-created"]="@issue-tracker,@lane-coordinator"
    ["pre-response"]="@response-optimizer,@swiss-compliance-checker"
)

# Get agents for this hook type
AGENTS="${HOOK_AGENTS[$HOOK_TYPE]:-}"

if [ -z "$AGENTS" ]; then
    echo -e "\033[0;31m❌ No agents configured for hook: $HOOK_TYPE\033[0m"
    exit 0
fi

# Convert to array and call each agent via Task tool
IFS=',' read -ra AGENT_ARRAY <<< "$AGENTS"

for agent in "${AGENT_ARRAY[@]}"; do
    agent=$(echo "$agent" | tr -d ' ')
    
    case "$HOOK_TYPE" in
        "session-start")
            echo -e "\033[0;34m🤖 Initializing session with $agent\033[0m"
            # Task call would go here: task("Initialize new session", agent)
            ;;
        "user-prompt-submit")
            echo -e "\033[0;35m🔍 Analyzing with $agent: $USER_INPUT\033[0m"  
            # Task call would go here: task("Analyze user input: $USER_INPUT", agent)
            ;;
        "task-complete")
            echo -e "\033[0;32m✅ Processing completion with $agent\033[0m"
            # Task call would go here: task("Process task completion", agent)
            ;;
    esac
done

exit 0