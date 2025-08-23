#!/bin/bash

# Session Start Learning Agent
# Documents real learnings and provides meaningful status updates
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

# Get real learning statistics from CLAUDE.md
get_real_learning_stats() {
    if [ ! -f "$CLAUDE_MD" ]; then
        echo "0:0:0:0"
        return
    fi
    
    # Count actual learnings in CLAUDE.md
    local architecture_decisions=$(grep -c "^- \*\*.*Architecture.*:" "$CLAUDE_MD" 2>/dev/null || echo "0")
    local implementation_patterns=$(grep -c "^- \*\*.*Implementation.*:" "$CLAUDE_MD" 2>/dev/null || echo "0")  
    local failure_conversions=$(grep -c "^- \*\*.*:" "$CLAUDE_MD" | grep -E "(LEARNING|CRITICAL|Frustration)" 2>/dev/null || echo "0")
    local performance_patterns=$(grep -c "^- \*\*.*Performance.*:" "$CLAUDE_MD" 2>/dev/null || echo "0")
    
    echo "$architecture_decisions:$implementation_patterns:$failure_conversions:$performance_patterns"
}

# Check for recent GitHub activity  
check_github_activity() {
    local recent_issues=0
    local recent_prs=0
    
    # Simple check for recent activity (last 24 hours)
    if command -v gh >/dev/null 2>&1; then
        recent_issues=$(gh issue list --state open --created ">=yesterday" --json number 2>/dev/null | jq length 2>/dev/null || echo "0")
        recent_prs=$(gh pr list --state open --created ">=yesterday" --json number 2>/dev/null | jq length 2>/dev/null || echo "0") 
    fi
    
    echo "$recent_issues:$recent_prs"
}

# Check for frustration sessions in the last day
check_recent_frustrations() {
    local frustration_count=0
    
    # Check CLAUDE.md for recent frustration entries
    if grep -q "Frustration Detected:" "$CLAUDE_MD" 2>/dev/null; then
        frustration_count=$(grep -c "Frustration Detected:" "$CLAUDE_MD" 2>/dev/null || echo "0")
    fi
    
    echo "$frustration_count"
}

# Generate meaningful learning insights
generate_learning_insights() {
    local stats="$1"
    local architecture=$(echo "$stats" | cut -d: -f1)
    local implementation=$(echo "$stats" | cut -d: -f2) 
    local failures=$(echo "$stats" | cut -d: -f3)
    local performance=$(echo "$stats" | cut -d: -f4)
    
    echo -e "${BLUE}🧠 Real Learning Statistics:${NC}"
    echo "  Architecture decisions: $architecture"
    echo "  Implementation patterns: $implementation" 
    echo "  Failure conversions: $failures"
    echo "  Performance patterns: $performance"
    
    local total=$((architecture + implementation + failures + performance))
    if [ $total -gt 0 ]; then
        echo -e "${GREEN}  Total documented learnings: $total${NC}"
    else
        echo -e "${YELLOW}  No documented learnings yet - ready to start capturing knowledge${NC}"
    fi
}

# Show recent activity summary
show_activity_summary() {
    local github_activity="$1"
    local recent_issues=$(echo "$github_activity" | cut -d: -f1)
    local recent_prs=$(echo "$github_activity" | cut -d: -f2)
    local frustrations="$2"
    
    echo -e "${BLUE}📊 Recent Activity Summary:${NC}"
    echo "  New issues today: $recent_issues"
    echo "  New PRs today: $recent_prs"
    
    if [ "$frustrations" -gt 0 ]; then
        echo -e "${RED}  Frustrations documented: $frustrations${NC}"
        echo -e "${YELLOW}  → These have been converted to learnings in CLAUDE.md${NC}"
    else
        echo -e "${GREEN}  No frustrations detected - smooth development flow${NC}"
    fi
}

# Provide contextual recommendations
provide_recommendations() {
    local current_branch=$(git branch --show-current 2>/dev/null || echo "unknown")
    
    echo -e "${PURPLE}💡 Current Context:${NC}"
    echo "  Branch: $current_branch"
    
    case "$current_branch" in
        *feature*|*issue*)
            echo "  → Development branch active - use /work for TDD workflow"
            ;;
        main|master)
            echo "  → Main branch - consider creating feature branch for new work"
            ;;
        *)
            echo "  → General development context"
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}Available Commands:${NC}"
    echo "  /issue 'description' - Create new GitHub issue with compounding engineering"
    echo "  /work [number] - Start TDD development on issue"  
    echo "  /review [number] - Extract learnings from PR review"
    echo ""
    echo -e "${BLUE}For GPZH Demo:${NC}"
    echo "  ddev start - Start development environment"
    echo "  ddev theme dev - Start frontend development"
    echo "  ddev unlighthouse --demo-check - Quick performance validation"
}

# Main session start logic
main() {
    echo -e "${PURPLE}🤖 Building Lane GitHub Integration${NC}"
    echo -e "${PURPLE}🔍 Checking for new planning-lane issues${NC}"
    echo -e "${PURPLE}ℹ️  Issue #31 already processed${NC}"
    echo ""
    
    echo -e "${PURPLE}🎓 Automated Learning System Status${NC}"
    echo ""
    
    # Get real statistics
    local learning_stats=$(get_real_learning_stats)
    local github_activity=$(check_github_activity)
    local frustrations=$(check_recent_frustrations)
    
    # Display learning statistics
    generate_learning_insights "$learning_stats"
    echo ""
    
    # Show activity
    show_activity_summary "$github_activity" "$frustrations"
    echo ""
    
    # Provide recommendations
    provide_recommendations
    
    echo ""
    echo -e "${GREEN}✓ Session initialized with real learning context${NC}"
}

# Run main function
main "$@"