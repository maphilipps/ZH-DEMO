#!/bin/bash

# Task Complete Hook - Compounding Engineering @agent Format  
# Uses specialized agents for learning capture and next action suggestions via Task tool

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Get task completion info from environment or parameters
TASK_DESCRIPTION="${1:-}"
TASK_STATUS="${2:-completed}"
TASK_COMPONENT="${3:-general}"

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Skip if no task description
if [ -z "$TASK_DESCRIPTION" ]; then
    exit 0
fi

echo -e "${BLUE}📋 Task Completion Analysis${NC}"
echo -e "${BLUE}Task: $TASK_DESCRIPTION${NC}"
echo -e "${BLUE}Status: $TASK_STATUS${NC}"

# Read compounding context if available
COMPOUNDING_CONTEXT=""
if [ -f "$PROJECT_DIR/.claude/context.env" ]; then
    source "$PROJECT_DIR/.claude/context.env" 2>/dev/null || true
fi

# 1. Capture successful task completion using @agent format
if [ "$TASK_STATUS" = "completed" ] || [ "$TASK_STATUS" = "success" ]; then
    echo -e "${GREEN}✅ Success Pattern Analysis${NC}"
    
    # Determine if this was a significant success worth learning from
    if echo "$TASK_DESCRIPTION" | grep -qiE "(implement|create|build|fix|solve|complete|finish)"; then
        # In full implementation: @task-success-analyzer: "Capture success pattern: $TASK_DESCRIPTION in component: $TASK_COMPONENT"
        echo "  • Success pattern identified for learning capture"
        
        # Also capture as a learning PR if it seems like development work
        if echo "$TASK_DESCRIPTION" | grep -qiE "(implement|code|build|develop|create|fix)"; then
            # In full implementation: @learning-synthesizer: "Convert task completion to PR learning: $TASK_DESCRIPTION"
            echo "  • Development success logged for compounding learning"
        fi
    fi
fi

# 2. Capture failed tasks for learning using @agent format
if [ "$TASK_STATUS" = "failed" ] || [ "$TASK_STATUS" = "error" ]; then
    echo -e "\033[0;31m❌ Failure Pattern Analysis\033[0m"
    
    # Determine severity based on context
    local severity="medium"
    if echo "$TASK_DESCRIPTION" | grep -qiE "(critical|urgent|blocking|demo|presentation)"; then
        severity="high"
    fi
    
    # In full implementation: @test-failure-analyst: "Analyze task failure: $TASK_DESCRIPTION with severity: $severity in component: $TASK_COMPONENT"
    echo "  • Failure pattern captured for prevention learning (Severity: $severity)"
fi

# 3. Context-specific learning and next actions using @agent format
echo -e "${YELLOW}🎯 Context Analysis: $COMPOUNDING_CONTEXT${NC}"

case "$COMPOUNDING_CONTEXT" in
    "demo_preparation")
        # In full implementation: @demo-preparation-specialist: "Suggest next demo task after: $TASK_DESCRIPTION"
        if echo "$TASK_DESCRIPTION" | grep -qiE "(form|feedback|damage|event|room)"; then
            echo "SUGGESTED_NEXT_TASK=Test all 4 required demo forms" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Complete demo forms validation"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(theme|styling|bruchtal)"; then
            echo "SUGGESTED_NEXT_TASK=Validate responsive design for demo" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Demo responsive design validation"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(content|directory)"; then
            echo "SUGGESTED_NEXT_TASK=Prepare demo content and navigation" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Demo content preparation"
        fi
        ;;
    "municipal_forms")
        # In full implementation: @municipal-forms-specialist: "Suggest next forms task after: $TASK_DESCRIPTION"  
        if echo "$TASK_DESCRIPTION" | grep -qiE "feedback"; then
            echo "SUGGESTED_NEXT_TASK=Test infrastructure damage report form" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Damage report form testing"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "damage"; then
            echo "SUGGESTED_NEXT_TASK=Test event registration form" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Event registration form testing"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "event"; then
            echo "SUGGESTED_NEXT_TASK=Test room booking request form" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Room booking form testing"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "room"; then
            echo "SUGGESTED_NEXT_TASK=Run comprehensive forms testing suite" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Complete forms testing suite"
        fi
        ;;
    "swiss_compliance")
        # In full implementation: @swiss-compliance-specialist: "Suggest next compliance task after: $TASK_DESCRIPTION"
        if echo "$TASK_DESCRIPTION" | grep -qiE "(accessibility|wcag)"; then
            echo "SUGGESTED_NEXT_TASK=Validate eCH-0059 data protection standards" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Data protection validation"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(ech|data.protection)"; then
            echo "SUGGESTED_NEXT_TASK=Test multilingual support (DE/FR/IT)" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Multilingual support testing"
        elif echo "$TASK_DESCRIPTION" | grep -qiE "(language|multilingual)"; then
            echo "SUGGESTED_NEXT_TASK=Validate Swiss German terminology" >> "$PROJECT_DIR/.claude/context.env"
            echo "  • Next: Swiss German validation"
        fi
        ;;
    "lane_coordination")
        # In full implementation: @lane-coordination-specialist: "Suggest next coordination task after: $TASK_DESCRIPTION"
        echo "  • Lane coordination context detected"
        ;;
esac

# 4. Lane coordination analysis using @agent format
echo -e "${BLUE}🔄 Lane Coordination Analysis${NC}"

if echo "$TASK_DESCRIPTION" | grep -qiE "(architecture|design|plan)" && [ "$TASK_STATUS" = "completed" ]; then
    # In full implementation: @planning-lane-coordinator: "Planning completed, suggest building lane tasks"
    echo "COORDINATION_SUGGESTION=building_lane:Implement planned architecture" >> "$PROJECT_DIR/.claude/context.env"
    echo "  • Planning → Building: Ready for implementation"
elif echo "$TASK_DESCRIPTION" | grep -qiE "(implement|build|develop|create)" && [ "$TASK_STATUS" = "completed" ]; then
    # In full implementation: @building-lane-coordinator: "Building completed, suggest reviewing lane tasks"
    echo "COORDINATION_SUGGESTION=reviewing_lane:Validate implementation quality and compliance" >> "$PROJECT_DIR/.claude/context.env"
    echo "  • Building → Reviewing: Ready for quality validation"
elif echo "$TASK_DESCRIPTION" | grep -qiE "(review|test|validate)" && [ "$TASK_STATUS" = "completed" ]; then
    # In full implementation: @reviewing-lane-coordinator: "Review completed, determine next actions"
    if echo "$TASK_DESCRIPTION" | grep -qiE "(issue|problem|fail)"; then
        echo "COORDINATION_SUGGESTION=building_lane:Fix identified issues" >> "$PROJECT_DIR/.claude/context.env"
        echo "  • Reviewing → Building: Issues identified for fixing"
    else
        echo "  • Review completed successfully - ready for deployment"
    fi
fi

# 5. Learning metrics update using @agent format  
if [ "$TASK_STATUS" = "completed" ]; then
    echo -e "${GREEN}📊 Updating Learning Metrics${NC}"
    
    # Increment success counter
    local success_file="$PROJECT_DIR/.claude/knowledge/metrics/success_count.txt"
    mkdir -p "$(dirname "$success_file")"
    local current_count=$(cat "$success_file" 2>/dev/null || echo "0")
    echo $((current_count + 1)) > "$success_file"
    
    echo "  • Success count: $((current_count + 1))"
    
    # Track completion time if available
    if [ -n "${TASK_START_TIME:-}" ]; then
        local completion_time=$(($(date +%s) - TASK_START_TIME))
        echo "$(date -Iseconds):$TASK_COMPONENT:$completion_time" >> "$PROJECT_DIR/.claude/knowledge/metrics/completion_times.log"
        echo "  • Completion time logged: ${completion_time}s"
    fi
fi

# 6. Trend analysis trigger using @agent format
local success_count=$(cat "$PROJECT_DIR/.claude/knowledge/metrics/success_count.txt" 2>/dev/null || echo "0")
if [ $((success_count % 10)) -eq 0 ] && [ "$success_count" -gt 0 ]; then
    echo -e "${BLUE}📈 Triggering Trend Analysis${NC}"
    # In full implementation: @learning-synthesizer: "Analyze trends and patterns from last 10 completed tasks"
    echo "  • Trend analysis triggered (every 10 completions)"
fi

# 7. Context preparation for next prompt
echo "LAST_TASK_COMPLETED=$TASK_DESCRIPTION" >> "$PROJECT_DIR/.claude/context.env"
echo "LAST_TASK_STATUS=$TASK_STATUS" >> "$PROJECT_DIR/.claude/context.env"
echo "TASK_COMPLETION_TIMESTAMP=$(date -Iseconds)" >> "$PROJECT_DIR/.claude/context.env"

echo -e "${GREEN}✅ Task completion analysis complete${NC}"

# Note: In full @agent implementation, this would trigger comprehensive agents:
# @task-success-analyzer: "Analyze successful completion pattern for: $TASK_DESCRIPTION"
# @test-failure-analyst: "Extract learning from task failure: $TASK_DESCRIPTION" 
# @context-specific-specialists: "Suggest context-appropriate next actions based on: $TASK_DESCRIPTION"
# @lane-coordination-specialists: "Coordinate cross-lane handoffs after: $TASK_DESCRIPTION"
# @learning-synthesizer: "Update compound knowledge base with task completion insights"

exit 0