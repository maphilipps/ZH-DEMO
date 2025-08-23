#!/bin/bash

# Learning Synthesis Agent
# Captures successful patterns and updates CLAUDE.md with compounding knowledge
# Part of the Compounding Engineering system

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
CLAUDE_MD="$PROJECT_DIR/CLAUDE.md"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

usage() {
    echo "Usage: $0 <command> [args...]"
    echo ""
    echo "Commands:"
    echo "  success <description> <category>"
    echo "  pattern <pattern-name> <description> <context>"
    echo "  architectural <decision> <rationale> <impact>"
    echo "  compliance <requirement> <implementation> <validation>"
    echo "  workflow <workflow-name> <steps> <outcome>"
    echo ""
    echo "Examples:"
    echo "  $0 success 'Form validation implemented successfully' 'Implementation Patterns'"
    echo "  $0 pattern 'Swiss validation pattern' 'Separate street/number fields' 'forms'"
    echo "  $0 architectural 'Use content_moderation' 'Better than custom workflows' 'Reliability'"
}

# Add learning to appropriate section of CLAUDE.md
add_to_lessons_learned() {
    local category="$1"
    local learning="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    
    # Format the learning entry
    local learning_entry="- **$learning** → Documented $timestamp"
    
    local temp_file=$(mktemp)
    local section_found=false
    
    # Find and update the appropriate category
    case "$category" in
        "Architecture Decisions")
            # Add to Architecture Decisions That Worked section
            awk -v entry="$learning_entry" '
            /^#### Architecture Decisions That Worked/ {
                print $0
                getline; print $0  # Print existing description line
                print entry
                section_found=1
                next
            }
            { print }
            ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
            ;;
        "Implementation Patterns")
            # Add to Implementation Patterns That Succeeded section  
            awk -v entry="$learning_entry" '
            /^#### Implementation Patterns That Succeeded/ {
                print $0
                getline; if ($0 ~ /^\*/) print $0  # Print description if exists
                print entry
                section_found=1
                next
            }
            { print }
            ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
            ;;
        "Review Feedback")
            # Add to Review Feedback That Prevented Issues section
            awk -v entry="$learning_entry" '
            /^#### Review Feedback That Prevented Issues/ {
                print $0
                getline; if ($0 ~ /^\*/) print $0  # Print description if exists  
                print entry
                section_found=1
                next
            }
            { print }
            ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
            ;;
        "Swiss Compliance")
            # Add to Swiss Compliance Patterns section
            awk -v entry="$learning_entry" '
            /^#### Swiss Compliance Patterns/ {
                print $0
                getline; if ($0 ~ /^-/) print $0  # Print existing patterns
                print entry
                section_found=1  
                next
            }
            { print }
            ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
            ;;
        "Performance Optimization")
            # Add to Performance Optimizations → Patterns section
            awk -v entry="$learning_entry" '
            /^#### Performance Optimizations → Patterns/ {
                print $0
                getline; if ($0 ~ /^\*/) print $0  # Print description if exists
                print entry
                section_found=1
                next
            }
            { print }
            ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
            ;;
        *)
            # Default to Implementation Patterns
            awk -v entry="$learning_entry" '
            /^#### Implementation Patterns That Succeeded/ {
                print $0
                getline; if ($0 ~ /^\*/) print $0
                print entry  
                section_found=1
                next
            }
            { print }
            ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
            ;;
    esac
    
    echo -e "${GREEN}✓ Added learning to CLAUDE.md [$category]${NC}"
}

# Document a successful pattern
record_success() {
    local description="$1"
    local category="$2"
    
    echo -e "${BLUE}📝 Recording successful pattern...${NC}"
    echo -e "  Description: $description"
    echo -e "  Category: $category"
    
    add_to_lessons_learned "$category" "$description"
}

# Document an architectural decision
record_architectural_decision() {
    local decision="$1"
    local rationale="$2" 
    local impact="$3"
    
    local learning="$decision → $rationale → Impact: $impact"
    
    echo -e "${PURPLE}🏗️  Recording architectural decision...${NC}"
    echo -e "  Decision: $decision"
    echo -e "  Rationale: $rationale"
    echo -e "  Impact: $impact"
    
    add_to_lessons_learned "Architecture Decisions" "$learning"
}

# Document a compliance pattern
record_compliance_pattern() {
    local requirement="$1"
    local implementation="$2"
    local validation="$3"
    
    local learning="$requirement: $implementation → Validated: $validation"
    
    echo -e "${YELLOW}🇨🇭 Recording Swiss compliance pattern...${NC}"
    echo -e "  Requirement: $requirement"
    echo -e "  Implementation: $implementation"
    echo -e "  Validation: $validation"
    
    add_to_lessons_learned "Swiss Compliance" "$learning"
}

# Document a workflow pattern
record_workflow_pattern() {
    local workflow_name="$1"
    local steps="$2"
    local outcome="$3"
    
    local learning="$workflow_name workflow: $steps → Result: $outcome"
    
    echo -e "${CYAN}🔄 Recording workflow pattern...${NC}"
    echo -e "  Workflow: $workflow_name"
    echo -e "  Steps: $steps"
    echo -e "  Outcome: $outcome"
    
    add_to_lessons_learned "Implementation Patterns" "$learning"
}

# Document a reusable pattern
record_pattern() {
    local pattern_name="$1"
    local description="$2"
    local context="$3"
    
    local learning="$pattern_name: $description (Context: $context)"
    
    echo -e "${GREEN}🔧 Recording reusable pattern...${NC}"
    echo -e "  Pattern: $pattern_name"
    echo -e "  Description: $description"
    echo -e "  Context: $context"
    
    # Determine category based on context
    local category="Implementation Patterns"
    if echo "$context" | grep -qiE "(swiss|compliance|ech)"; then
        category="Swiss Compliance"
    elif echo "$context" | grep -qiE "(architecture|design|structure)"; then
        category="Architecture Decisions"  
    elif echo "$context" | grep -qiE "(performance|optimization)"; then
        category="Performance Optimization"
    fi
    
    add_to_lessons_learned "$category" "$learning"
}

# Update knowledge metrics
update_metrics() {
    local metrics_dir="$PROJECT_DIR/.claude/knowledge/metrics"
    mkdir -p "$metrics_dir"
    
    # Increment learning counter
    local learning_file="$metrics_dir/learning_count.txt"
    local current_count=$(cat "$learning_file" 2>/dev/null || echo "0")
    echo $((current_count + 1)) > "$learning_file"
    
    # Update last learning timestamp
    echo "$(date -Iseconds)" > "$metrics_dir/last_learning.txt"
    
    echo -e "${BLUE}📊 Updated learning metrics (Total: $((current_count + 1)))${NC}"
}

# Main command handler
main() {
    local command="${1:-}"
    
    if [ -z "$command" ]; then
        usage
        exit 1
    fi
    
    case "$command" in
        "success")
            if [ $# -ne 3 ]; then
                echo "Error: success requires description and category"
                usage
                exit 1
            fi
            record_success "$2" "$3"
            update_metrics
            ;;
        "pattern")
            if [ $# -ne 4 ]; then
                echo "Error: pattern requires pattern-name, description, and context"
                usage
                exit 1  
            fi
            record_pattern "$2" "$3" "$4"
            update_metrics
            ;;
        "architectural")
            if [ $# -ne 4 ]; then
                echo "Error: architectural requires decision, rationale, and impact"
                usage
                exit 1
            fi
            record_architectural_decision "$2" "$3" "$4"
            update_metrics
            ;;
        "compliance")
            if [ $# -ne 4 ]; then
                echo "Error: compliance requires requirement, implementation, and validation"
                usage
                exit 1
            fi
            record_compliance_pattern "$2" "$3" "$4"
            update_metrics
            ;;
        "workflow")
            if [ $# -ne 4 ]; then
                echo "Error: workflow requires workflow-name, steps, and outcome"
                usage  
                exit 1
            fi
            record_workflow_pattern "$2" "$3" "$4"
            update_metrics
            ;;
        *)
            echo "Error: Unknown command '$command'"
            usage
            exit 1
            ;;
    esac
    
    echo ""
    echo -e "${PURPLE}Learning captured in CLAUDE.md - this knowledge compounds for future development.${NC}"
}

# Run main function
main "$@"