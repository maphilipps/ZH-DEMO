#!/bin/bash

# Command Documentation Agent
# Documents learnings from slash commands (/issue, /work, /review)
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
    echo "Usage: $0 <command> <status> [details]"
    echo ""
    echo "Commands:"
    echo "  issue-created <issue_number> [title]"
    echo "  work-started <issue_number> [status]"  
    echo "  work-completed <issue_number> [result]"
    echo "  review-completed <pr_number> [feedback]"
    echo ""
    echo "This agent documents patterns from command usage for compounding learning."
}

# Document issue creation patterns
document_issue_creation() {
    local issue_number="$1"
    local title="${2:-unknown}"
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    
    echo -e "${BLUE}📝 Documenting issue creation pattern...${NC}"
    
    # Simple pattern tracking - add to CLAUDE.md if this is a new type of issue
    if echo "$title" | grep -qiE "(ai|search|milvus|vector)"; then
        # This is an AI/search related issue - document the pattern
        local learning_entry="- **AI Search Issue Pattern** → Issue #$issue_number created for AI/Milvus integration → Rule: AI search issues require both technical implementation and demo preparation validation"
        
        # Add to Implementation Patterns section
        add_to_claude_section "Implementation Patterns That Succeeded" "$learning_entry"
        echo -e "${GREEN}✓ Documented AI search issue pattern${NC}"
    fi
    
    echo -e "${PURPLE}Issue #$issue_number created and pattern documented${NC}"
}

# Document work patterns 
document_work_pattern() {
    local issue_number="$1" 
    local status="$2"
    local result="${3:-}"
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    
    case "$status" in
        "started")
            echo -e "${BLUE}🔧 Work started on issue #$issue_number${NC}"
            # Could track work start patterns here
            ;;
        "completed")
            echo -e "${GREEN}✅ Work completed on issue #$issue_number${NC}"
            # Document successful completion patterns
            if [ -n "$result" ]; then
                local learning_entry="- **Issue #$issue_number Completion** → $result → Pattern: $timestamp"
                add_to_claude_section "Implementation Patterns That Succeeded" "$learning_entry"
                echo -e "${GREEN}✓ Documented successful completion pattern${NC}"
            fi
            ;;
        *)
            echo -e "${YELLOW}⚠️  Unknown work status: $status${NC}"
            ;;
    esac
}

# Document review patterns
document_review_pattern() {
    local pr_number="$1"
    local feedback="${2:-}"
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    
    echo -e "${PURPLE}📋 Documenting review completion for PR #$pr_number${NC}"
    
    if [ -n "$feedback" ] && [ "$feedback" != "no feedback" ]; then
        # Document review feedback that provided value
        local learning_entry="- **PR #$pr_number Review** → $feedback → Rule: Review feedback helps prevent future issues"
        add_to_claude_section "Review Feedback That Prevented Issues" "$learning_entry"
        echo -e "${GREEN}✓ Documented valuable review feedback${NC}"
    fi
}

# Helper function to add entries to CLAUDE.md sections
add_to_claude_section() {
    local section="$1"
    local entry="$2"
    
    if [ ! -f "$CLAUDE_MD" ]; then
        echo -e "${RED}❌ CLAUDE.md not found${NC}"
        return 1
    fi
    
    # Check if entry already exists to avoid duplicates
    if grep -qF "$entry" "$CLAUDE_MD" 2>/dev/null; then
        echo -e "${YELLOW}ℹ️  Entry already exists in CLAUDE.md${NC}"
        return 0
    fi
    
    # Add entry to the specified section
    local temp_file=$(mktemp)
    awk -v section="$section" -v entry="$entry" '
    found_section == 1 && /^#### / && $0 !~ section {
        print entry
        print ""
        found_section = 0
    }
    /^#### / && $0 ~ section {
        found_section = 1
    }
    { print }
    END {
        if (found_section == 1) {
            print entry
            print ""
        }
    }
    ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
    
    echo -e "${GREEN}✓ Added entry to CLAUDE.md section: $section${NC}"
}

# Main command documentation logic
main() {
    if [ $# -lt 2 ]; then
        usage
        exit 1
    fi
    
    local command="$1"
    local status_or_number="$2"
    local details="${3:-}"
    
    case "$command" in
        "issue-created")
            document_issue_creation "$status_or_number" "$details"
            ;;
        "work-started")
            document_work_pattern "$status_or_number" "started" "$details"
            ;;
        "work-completed") 
            document_work_pattern "$status_or_number" "completed" "$details"
            ;;
        "review-completed")
            document_review_pattern "$status_or_number" "$details"
            ;;
        *)
            echo -e "${RED}❌ Unknown command: $command${NC}"
            usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"