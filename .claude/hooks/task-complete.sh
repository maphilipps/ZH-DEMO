#!/bin/bash

# Compounding Engineering Hook: task-complete
# Captures learning from completed tasks and suggests next actions

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
COMPOUNDING_SCRIPTS_DIR="$PROJECT_DIR/scripts"

# Get task completion info from environment or parameters
TASK_DESCRIPTION="${1:-}"
TASK_STATUS="${2:-completed}"
TASK_COMPONENT="${3:-general}"

# Skip if no task description
if [ -z "$TASK_DESCRIPTION" ]; then
    exit 0
fi

# Function to run script safely
run_compounding_script() {
    local script="$1"
    shift
    local script_path="$COMPOUNDING_SCRIPTS_DIR/$script"
    
    if [ -f "$script_path" ] && [ -x "$script_path" ]; then
        "$script_path" "$@" >/dev/null 2>&1 || true
    fi
}

# Read compounding context if available
COMPOUNDING_CONTEXT=""
if [ -f "$PROJECT_DIR/.claude/context.env" ]; then
    source "$PROJECT_DIR/.claude/context.env" 2>/dev/null || true
fi

# 1. Capture successful task completion
if [ "$TASK_STATUS" = "completed" ] || [ "$TASK_STATUS" = "success" ]; then
    # Determine if this was a significant success worth learning from
    if echo "$TASK_DESCRIPTION" | grep -qiE "(implement|create|build|fix|solve|complete|finish)"; then
        run_compounding_script "failure-to-knowledge.sh" capture-success "task" "$TASK_DESCRIPTION" "$TASK_COMPONENT"
        
        # Also capture as a learning PR if it seems like development work
        if echo "$TASK_DESCRIPTION" | grep -qiE "(implement|code|build|develop|create|fix)"; then
            run_compounding_script "automated-learning.sh" learn-pr "$TASK_DESCRIPTION" "Task completed successfully" "Implementation successful" "merged"
        fi
    fi
fi

# 2. Capture failed tasks for learning
if [ "$TASK_STATUS" = "failed" ] || [ "$TASK_STATUS" = "error" ]; then
    # Determine severity based on context
    local severity="medium"
    if echo "$TASK_DESCRIPTION" | grep -qiE "(critical|urgent|blocking|demo|presentation)"; then
        severity="high"
    fi
    
    run_compounding_script "failure-to-knowledge.sh" capture-failure "task" "$TASK_DESCRIPTION" "$TASK_COMPONENT" "$severity"
fi

# 3. Context-specific learning and next actions
case "$COMPOUNDING_CONTEXT" in
    "demo_preparation")
        # Demo context - check if we need to trigger related tasks
        if echo "$TASK_DESCRIPTION" | grep -qiE "(form|feedback|damage|event|room)"; then
            echo "SUGGESTED_NEXT_TASK=Test all 4 required demo forms" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(theme|styling|bruchtal)"; then
            echo "SUGGESTED_NEXT_TASK=Validate responsive design for demo" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(content|directory)"; then
            echo "SUGGESTED_NEXT_TASK=Prepare demo content and navigation" >> "$PROJECT_DIR/.claude/context.env"
        fi
        ;;
    "municipal_forms")
        # Forms context - ensure all forms are working
        if echo "$TASK_DESCRIPTION" | grep -qiE "feedback"; then
            echo "SUGGESTED_NEXT_TASK=Test infrastructure damage report form" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "damage"; then
            echo "SUGGESTED_NEXT_TASK=Test event registration form" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "event"; then
            echo "SUGGESTED_NEXT_TASK=Test room booking request form" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "room"; then
            echo "SUGGESTED_NEXT_TASK=Run comprehensive forms testing suite" >> "$PROJECT_DIR/.claude/context.env"
        fi
        ;;
    "swiss_compliance")
        # Compliance context - ensure comprehensive validation
        if echo "$TASK_DESCRIPTION" | grep -qiE "(accessibility|wcag)"; then
            echo "SUGGESTED_NEXT_TASK=Validate eCH-0059 data protection standards" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(ech|data.protection)"; then
            echo "SUGGESTED_NEXT_TASK=Test multilingual support (DE/FR/IT)" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(language|multilingual)"; then
            echo "SUGGESTED_NEXT_TASK=Validate Swiss German terminology" >> "$PROJECT_DIR/.claude/context.env"
        fi
        ;;
    "performance_optimization")
        # Performance context - ensure comprehensive optimization
        if echo "$TASK_DESCRIPTION" | grep -qiE "(core.web.vitals|vitals)"; then
            echo "SUGGESTED_NEXT_TASK=Test mobile performance and lighthouse scores" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(mobile|responsive)"; then
            echo "SUGGESTED_NEXT_TASK=Validate caching and CDN optimization" >> "$PROJECT_DIR/.claude/context.env"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(caching|cdn)"; then
            echo "SUGGESTED_NEXT_TASK=Test database query optimization" >> "$PROJECT_DIR/.claude/context.env"
        fi
        ;;
esac

# 4. Check for patterns that suggest lane coordination
if echo "$TASK_DESCRIPTION" | grep -qiE "(architecture|design|plan)" && [ "$TASK_STATUS" = "completed" ]; then
    # Planning task completed - suggest building
    echo "COORDINATION_SUGGESTION=building_lane:Implement planned architecture" >> "$PROJECT_DIR/.claude/context.env"
elif echo "$TASK_DESCRIPTION" | grep -qiE "(implement|build|develop|create)" && [ "$TASK_STATUS" = "completed" ]; then
    # Building task completed - suggest reviewing
    echo "COORDINATION_SUGGESTION=reviewing_lane:Validate implementation quality and compliance" >> "$PROJECT_DIR/.claude/context.env"
elif echo "$TASK_DESCRIPTION" | grep -qiE "(review|test|validate)" && [ "$TASK_STATUS" = "completed" ]; then
    # Review completed - might trigger fixes or new features
    if echo "$TASK_DESCRIPTION" | grep -qiE "(issue|problem|fail)"; then
        echo "COORDINATION_SUGGESTION=building_lane:Fix identified issues" >> "$PROJECT_DIR/.claude/context.env"
    fi
fi

# 5. Update learning metrics
if [ "$TASK_STATUS" = "completed" ]; then
    # Increment success counter
    local success_file="$PROJECT_DIR/.claude/knowledge/metrics/success_count.txt"
    mkdir -p "$(dirname "$success_file")"
    local current_count=$(cat "$success_file" 2>/dev/null || echo "0")
    echo $((current_count + 1)) > "$success_file"
    
    # Track completion time if available
    if [ -n "${TASK_START_TIME:-}" ]; then
        local completion_time=$(($(date +%s) - TASK_START_TIME))
        echo "$(date -Iseconds):$TASK_COMPONENT:$completion_time" >> "$PROJECT_DIR/.claude/knowledge/metrics/completion_times.log"
    fi
fi

# 6. Trigger trend analysis periodically
local success_count=$(cat "$PROJECT_DIR/.claude/knowledge/metrics/success_count.txt" 2>/dev/null || echo "0")
if [ $((success_count % 10)) -eq 0 ] && [ "$success_count" -gt 0 ]; then
    # Every 10 successful tasks, analyze trends
    run_compounding_script "automated-learning.sh" analyze-trends
fi

# 7. Set flag for next prompt to know about task completion
echo "LAST_TASK_COMPLETED=$TASK_DESCRIPTION" >> "$PROJECT_DIR/.claude/context.env"
echo "LAST_TASK_STATUS=$TASK_STATUS" >> "$PROJECT_DIR/.claude/context.env"
echo "TASK_COMPLETION_TIMESTAMP=$(date -Iseconds)" >> "$PROJECT_DIR/.claude/context.env"

exit 0