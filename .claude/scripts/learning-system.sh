#!/bin/bash

# Compounding Engineering Learning System
# Captures, stores and validates learnings

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LEARNINGS_FILE="$PROJECT_DIR/knowledge/learnings.json"

# Ensure learnings file exists
if [ ! -f "$LEARNINGS_FILE" ]; then
    echo "Error: Learnings file not found at $LEARNINGS_FILE"
    exit 1
fi

# Function to add learning
add_learning() {
    local category="$1"
    local learning="$2"
    local context="${3:-general}"
    local timestamp=$(date -Iseconds)
    
    # Create temporary file with new learning
    cat "$LEARNINGS_FILE" | jq --arg cat "$category" --arg learning "$learning" --arg ctx "$context" --arg ts "$timestamp" '
        .learnings[$cat] += [{
            "learning": $learning,
            "context": $ctx,
            "timestamp": $ts,
            "violations": 0
        }] |
        .meta.last_updated = $ts |
        .statistics.total_learnings += 1
    ' > "${LEARNINGS_FILE}.tmp"
    
    mv "${LEARNINGS_FILE}.tmp" "$LEARNINGS_FILE"
    echo "Learning added to category: $category"
}

# Function to capture user feedback
capture_feedback() {
    local user_prompt="$1"
    local timestamp=$(date -Iseconds)
    
    # Detect feedback patterns
    if echo "$user_prompt" | grep -qiE "(du musst|das ist falsch|nochmal|nicht richtig|überarbeiten|vergessen|solltest|hast nicht)"; then
        # Extract the learning from feedback
        local learning=$(echo "$user_prompt" | head -c 300 | tr '\n' ' ')
        
        # Determine category based on content
        local category="user_preferences"
        if echo "$user_prompt" | grep -qiE "(lane|orchestrator|planning|building|reviewing)"; then
            category="lane_violations"
        elif echo "$user_prompt" | grep -qiE "(demo|präsentation|bruchtal)"; then
            category="demo_requirements"
        elif echo "$user_prompt" | grep -qiE "(swiss|compliance|ech)"; then
            category="compliance_rules"
        elif echo "$user_prompt" | grep -qiE "(code|implement|pattern)"; then
            category="code_patterns"
        fi
        
        add_learning "$category" "$learning" "user_feedback"
        
        # Update statistics
        cat "$LEARNINGS_FILE" | jq '.statistics.feedback_captured += 1' > "${LEARNINGS_FILE}.tmp"
        mv "${LEARNINGS_FILE}.tmp" "$LEARNINGS_FILE"
        
        echo "FEEDBACK_DETECTED=true" > "$PROJECT_DIR/.claude/learning_status.env"
        return 0
    fi
    
    echo "FEEDBACK_DETECTED=false" > "$PROJECT_DIR/.claude/learning_status.env"
    return 1
}

# Function to check for learning violations
check_violations() {
    local assistant_response="$1"
    local violations_found=0
    
    # Check each learning category
    for category in lane_violations user_preferences process_improvements code_patterns demo_requirements compliance_rules; do
        jq -r ".learnings.$category[]? | select(.violations < 5) | .learning" "$LEARNINGS_FILE" | while read -r learning; do
            if [ ! -z "$learning" ]; then
                # Simple keyword matching - could be improved with better NLP
                local keywords=$(echo "$learning" | tr '[:upper:]' '[:lower:]' | grep -oE '\b\w{4,}\b' | head -5 | paste -sd '|' -)
                
                if [ ! -z "$keywords" ] && echo "$assistant_response" | grep -qiE "$keywords"; then
                    echo "POTENTIAL_VIOLATION: $learning"
                    violations_found=$((violations_found + 1))
                    
                    # Increment violation counter
                    cat "$LEARNINGS_FILE" | jq --arg learning "$learning" '
                        (.learnings[] | .[] | select(.learning == $learning) | .violations) += 1
                    ' > "${LEARNINGS_FILE}.tmp"
                    mv "${LEARNINGS_FILE}.tmp" "$LEARNINGS_FILE"
                fi
            fi
        done
    done
    
    if [ $violations_found -gt 0 ]; then
        echo "VIOLATIONS_FOUND=$violations_found" > "$PROJECT_DIR/.claude/violation_status.env"
        cat "$LEARNINGS_FILE" | jq ".statistics.violations_prevented += $violations_found" > "${LEARNINGS_FILE}.tmp"
        mv "${LEARNINGS_FILE}.tmp" "$LEARNINGS_FILE"
        return 1
    fi
    
    echo "VIOLATIONS_FOUND=0" > "$PROJECT_DIR/.claude/violation_status.env"
    return 0
}

# Function to show learning statistics
show_stats() {
    echo "=== Compounding Engineering Learning Statistics ==="
    jq -r '.statistics | to_entries[] | "\(.key): \(.value)"' "$LEARNINGS_FILE"
    echo ""
    echo "=== Recent Learnings ==="
    jq -r '.learnings | to_entries[] | "\(.key): \(.value | length) learnings"' "$LEARNINGS_FILE"
}

# Main command dispatcher
case "${1:-help}" in
    "capture-feedback")
        capture_feedback "$2"
        ;;
    "check-violations")
        check_violations "$2"
        ;;
    "add-learning")
        add_learning "$2" "$3" "${4:-general}"
        ;;
    "stats")
        show_stats
        ;;
    "help")
        echo "Usage: $0 {capture-feedback|check-violations|add-learning|stats}"
        echo ""
        echo "capture-feedback <user_prompt>  - Detect and capture user feedback"
        echo "check-violations <response>     - Check response against learnings"
        echo "add-learning <cat> <text> [ctx] - Manually add learning"
        echo "stats                          - Show learning statistics"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Run '$0 help' for usage information"
        exit 1
        ;;
esac