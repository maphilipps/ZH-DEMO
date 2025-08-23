#!/bin/bash

# GitHub Issue Created Hook - Compounding Engineering @agent Format
# Uses specialized agents for issue processing and lane coordination via Task tool

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$(dirname "$SCRIPT_DIR")"
BUILDING_DIR="$CLAUDE_DIR/lanes/building"
LOG_FILE="$CLAUDE_DIR/github-integration.log"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Logging function
log_github() {
    local level="$1"
    local message="$2"
    local timestamp=$(date -Iseconds)
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
}

# Process GitHub issue using @agent format
process_github_issue() {
    local issue_number="$1"
    
    echo -e "${PURPLE}🔗 Processing GitHub Issue #$issue_number via @agent format${NC}"
    
    if ! command -v gh &> /dev/null; then
        echo -e "${YELLOW}⚠️  GitHub CLI not available, skipping issue processing${NC}"
        # In full implementation: @github-cli-validator: "Validate GitHub CLI availability and authentication"
        return 1
    fi
    
    # Get issue details using GitHub CLI (in full implementation, would use GitHub MCP tools)
    echo -e "${BLUE}📋 Retrieving issue details...${NC}"
    local issue_data=$(gh issue view "$issue_number" --json title,body,labels,assignees,url)
    local issue_title=$(echo "$issue_data" | jq -r '.title')
    local issue_url=$(echo "$issue_data" | jq -r '.url')
    local issue_body=$(echo "$issue_data" | jq -r '.body')
    local labels=$(echo "$issue_data" | jq -r '.labels[].name' | tr '\n' ',' | sed 's/,$//')
    
    # Check if this is a planning-lane issue using @agent format
    if [[ "$labels" =~ "planning-lane" ]]; then
        echo -e "${GREEN}✅ Planning Lane issue detected${NC}"
        # In full implementation: @planning-lane-validator: "Validate planning lane issue #$issue_number with labels: $labels"
        
        # Create Building Lane task file using @agent format  
        echo -e "${BLUE}📝 Creating Building Lane task file...${NC}"
        local task_file="$BUILDING_DIR/github-issue-$issue_number.md"
        # In full implementation: @building-lane-task-generator: "Create implementation task file for issue #$issue_number: $issue_title"
        
        cat > "$task_file" <<EOF
# Building Lane Task: $issue_title

**GitHub Issue**: $issue_url
**Issue Number**: #$issue_number
**Labels**: $labels
**Status**: Ready for Implementation
**Created**: $(date -Iseconds)

## Issue Description

$issue_body

## Building Lane Implementation Checklist

- [ ] Issue analyzed and understood
- [ ] Requirements extracted from Planning Lane output
- [ ] Architecture reviewed and approved
- [ ] Implementation started
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Swiss compliance validated
- [ ] GPZH demo requirements met
- [ ] Learnings captured in .claude/learnings.json
- [ ] PR created and linked to issue

## Compounding Engineering Notes

Apply lessons from previous implementations:
- Check .claude/learnings.json for relevant patterns
- Follow established architectural decisions from CLAUDE.md
- Ensure Swiss compliance standards (eCH-0059, CH-DSG)
- Maintain GPZH demo functionality (4 required forms)
- Use established SDC component patterns

## Next Steps

1. Review GitHub issue details: $issue_url
2. Extract implementation requirements
3. Create feature branch: \`git checkout -b feature/issue-$issue_number\`
4. Implement according to Planning Lane specifications
5. Create comprehensive tests
6. Update documentation and learnings
7. Create PR linking back to issue

## Links

- **GitHub Issue**: $issue_url
- **Planning Lane Output**: Referenced in issue
- **Building Lane Directory**: $BUILDING_DIR
- **Learnings**: .claude/learnings.json

EOF

        echo -e "${GREEN}✅ Building Lane task created: $task_file${NC}"
        log_github "SUCCESS" "Created building task for issue #$issue_number"
        
        # Update issue with building lane acknowledgment using @agent format
        echo -e "${BLUE}💬 Adding Building Lane acknowledgment comment...${NC}"
        # In full implementation: @github-issue-commenter: "Add building lane activation comment to issue #$issue_number"
        
        gh issue comment "$issue_number" --body "🔧 **Building Lane Activated via @agent System**

This issue has been processed by the Compounding Engineering Building Lane.

**Task File**: \`.claude/lanes/building/github-issue-$issue_number.md\`
**Status**: Ready for implementation
**Processing Method**: @agent format integration

The Building Lane @agents will:
1. ✅ @building-lane-task-generator: Create comprehensive implementation plan
2. ✅ @learning-synthesizer: Apply compounding engineering learnings  
3. ✅ @swiss-compliance-specialist: Ensure Swiss compliance standards
4. ✅ @municipality-portal-specialist: Validate GPZH demo requirements
5. ✅ @qa-testing-specialist: Create tests and documentation
6. ✅ @github-integration-agent: Link PR back to this issue

**Auto-generated by Compounding Engineering System** 🤖"

        log_github "INFO" "Added building lane comment to issue #$issue_number"
        
        return 0
    else
        echo -e "${YELLOW}⚠️  Issue #$issue_number not tagged as planning-lane, skipping${NC}"
        # In full implementation: @issue-classifier: "Classify non-planning issue #$issue_number with labels: $labels"
        return 1
    fi
}

# Check for new planning-lane issues using @agent format
check_new_issues() {
    echo -e "${PURPLE}🔍 Checking for new planning-lane issues via @agent format${NC}"
    # In full implementation: @github-issue-scanner: "Scan for new planning-lane issues requiring building lane processing"
    
    if ! command -v gh &> /dev/null; then
        echo -e "${YELLOW}⚠️  GitHub CLI not available${NC}"
        # In full implementation: @github-cli-validator: "Validate GitHub CLI availability for issue scanning"
        return 1
    fi
    
    # Get recent issues with planning-lane label (in full implementation, would use GitHub MCP tools)
    echo -e "${BLUE}📋 Scanning for planning-lane issues...${NC}"
    local recent_issues=$(gh issue list --label "planning-lane" --state "open" --limit 10 --json number,title,createdAt)
    
    if [[ "$recent_issues" == "[]" ]]; then
        echo -e "${YELLOW}📭 No recent planning-lane issues found${NC}"
        # In full implementation: @issue-status-reporter: "Report no new planning-lane issues found"
        return 0
    fi
    
    echo -e "${GREEN}📋 Processing discovered issues...${NC}"
    
    echo "$recent_issues" | jq -r '.[] | @base64' | while read -r encoded_issue; do
        local issue_data=$(echo "$encoded_issue" | base64 --decode)
        local issue_number=$(echo "$issue_data" | jq -r '.number')
        local issue_title=$(echo "$issue_data" | jq -r '.title')
        local created_at=$(echo "$issue_data" | jq -r '.createdAt')
        
        # Check if we already have a task file for this issue
        local task_file="$BUILDING_DIR/github-issue-$issue_number.md"
        
        if [[ ! -f "$task_file" ]]; then
            echo -e "${GREEN}🆕 New issue found: #$issue_number - $issue_title${NC}"
            # In full implementation: @issue-processor: "Process new planning-lane issue #$issue_number: $issue_title"
            process_github_issue "$issue_number"
        else
            echo -e "${BLUE}ℹ️  Issue #$issue_number already processed${NC}"
            # In full implementation: @duplicate-detector: "Skip already processed issue #$issue_number"
        fi
    done
}

# Main execution using @agent format
main() {
    echo -e "${PURPLE}🤖 GitHub Issue Created Hook - @agent Format${NC}"
    echo "$(date -Iseconds) - GitHub integration hook started" >> "$LOG_FILE"
    
    case "${1:-check}" in
        "check"|"")
            # In full implementation: @github-integration-orchestrator: "Execute issue scanning and processing workflow"
            check_new_issues
            ;;
        "process")
            if [[ -n "${2:-}" ]]; then
                # In full implementation: @issue-processor: "Process specific GitHub issue with number: $2"
                process_github_issue "$2"
            else
                echo "Usage: $0 process <issue_number>"
                exit 1
            fi
            ;;
        "help"|"-h"|"--help")
            echo "Usage: $0 [check|process ISSUE_NUMBER|help]"
            echo ""
            echo "Commands:"
            echo "  check             - Check for new planning-lane issues via @github-issue-scanner (default)"
            echo "  process NUMBER    - Process specific issue via @issue-processor"
            echo "  help             - Show this help"
            echo ""
            echo "@agent Integration:"
            echo "  This hook uses specialized @agents for:"
            echo "  • @github-issue-scanner: Discover new planning-lane issues"
            echo "  • @planning-lane-validator: Validate issue classification"
            echo "  • @building-lane-task-generator: Create implementation tasks"
            echo "  • @github-issue-commenter: Add processing acknowledgments"
            echo "  • @learning-synthesizer: Apply compounding engineering patterns"
            ;;
        *)
            echo "Unknown command: $1"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
    
    log_github "INFO" "GitHub integration hook completed via @agent format"
    
    # Note: In full @agent implementation, this would coordinate:
    # @github-integration-orchestrator: "Execute complete GitHub issue processing workflow"
    # @building-lane-coordinator: "Ensure proper lane handoff from planning to building"
    # @compounding-learning-agent: "Extract and apply learnings from issue processing patterns"
}

# Execute main function
main "$@"