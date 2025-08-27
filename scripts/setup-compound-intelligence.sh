#!/bin/bash
# Setup script for Compound Intelligence Measurement System
# Initializes git hooks, CI/CD integration, and measurement tools

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOKS_DIR="$REPO_ROOT/.git/hooks"
GITHOOKS_DIR="$REPO_ROOT/.githooks"

print_header() {
    echo -e "${BLUE}"
    echo "========================================================"
    echo "🧠 COMPOUND INTELLIGENCE SETUP"
    echo "========================================================"
    echo -e "${NC}"
    echo "Setting up automated measurement and feedback loops..."
    echo ""
}

install_git_hooks() {
    echo -e "${BLUE}🔗 Installing Git Hooks${NC}"
    echo "----------------------------------------"
    
    # Create hooks directory if it doesn't exist
    mkdir -p "$HOOKS_DIR"
    
    # Install pre-commit hook
    if [ -f "$GITHOOKS_DIR/pre-commit" ]; then
        cp "$GITHOOKS_DIR/pre-commit" "$HOOKS_DIR/pre-commit"
        chmod +x "$HOOKS_DIR/pre-commit"
        echo -e "${GREEN}✅ Pre-commit hook installed${NC}"
        echo "   └── Prevention rule tracking enabled"
        echo "   └── Learning documentation validation enabled"
        echo "   └── Pattern opportunity detection enabled"
    else
        echo -e "${YELLOW}⚠️  Pre-commit hook source not found${NC}"
    fi
    
    # Verify hook installation
    if [ -x "$HOOKS_DIR/pre-commit" ]; then
        echo -e "${GREEN}✅ Git hooks successfully installed${NC}"
        echo "   └── Location: $HOOKS_DIR/pre-commit"
    else
        echo -e "${RED}❌ Git hook installation failed${NC}"
        return 1
    fi
}

setup_ci_integration() {
    echo -e "${BLUE}🤖 Setting up CI/CD Integration${NC}"
    echo "----------------------------------------"
    
    # Check if GitHub Actions workflow exists
    if [ -f "$REPO_ROOT/.github/workflows/compound-intelligence-tracker.yml" ]; then
        echo -e "${GREEN}✅ GitHub Actions workflow configured${NC}"
        echo "   └── Prevention rule effectiveness tracking"
        echo "   └── Learning velocity measurement" 
        echo "   └── Agent coordination ROI analysis"
        echo "   └── Compound intelligence assessment"
    else
        echo -e "${YELLOW}⚠️  GitHub Actions workflow not found${NC}"
        echo "   └── Manual CI/CD configuration may be required"
    fi
    
    # Verify workflow permissions
    if [ -f "$REPO_ROOT/.github/workflows/compound-intelligence-tracker.yml" ]; then
        echo ""
        echo "CI/CD Measurement Features:"
        echo "   └── Daily: Fast feedback loops (prevention rule applications)"
        echo "   └── Weekly: Medium feedback loops (learning velocity trends)"
        echo "   └── Monthly: Slow feedback loops (compound intelligence ROI)"
        echo "   └── PR Comments: Automated measurement reports"
    fi
}

initialize_measurement_baseline() {
    echo -e "${BLUE}📊 Initializing Measurement Baseline${NC}"
    echo "----------------------------------------"
    
    # Count existing learnings for baseline
    if [ -f "$REPO_ROOT/CLAUDE.md" ]; then
        prevention_rules=$(grep -c "### Rule #" "$REPO_ROOT/CLAUDE.md" || echo "0")
        patterns=$(grep -c "### Pattern #" "$REPO_ROOT/CLAUDE.md" || echo "0")
        total_learnings=$((prevention_rules + patterns))
        
        echo "Current Learning Architecture:"
        echo "   └── Prevention Rules: $prevention_rules"
        echo "   └── Documented Patterns: $patterns"
        echo "   └── Total Learning Assets: $total_learnings"
        echo ""
        
        # Set baseline date
        baseline_date=$(date '+%Y-%m-%d')
        echo "Measurement Baseline:"
        echo "   └── Baseline Date: $baseline_date"
        echo "   └── Starting Learning Count: $total_learnings"
        echo "   └── Target Growth: 40% monthly learning architecture expansion"
        
        # Create baseline measurement file
        cat > "$REPO_ROOT/.compound-intelligence-baseline" << EOF
# Compound Intelligence Measurement Baseline
# Generated: $baseline_date

BASELINE_DATE=$baseline_date
BASELINE_PREVENTION_RULES=$prevention_rules
BASELINE_PATTERNS=$patterns
BASELINE_TOTAL_LEARNINGS=$total_learnings

# Target Metrics
TARGET_PREVENTION_EFFECTIVENESS=85
TARGET_LEARNING_VELOCITY=75
TARGET_AGENT_COORDINATION_ROI=5
TARGET_COMPOUND_INTELLIGENCE_ROI=8

# Success Criteria
SUCCESS_PREVENTION_RATE=85
SUCCESS_PATTERN_REUSE_RATE=75
SUCCESS_SYNTHESIS_VELOCITY_DAYS=2
SUCCESS_ISSUE_RECURRENCE_PREVENTION=90
EOF
        
        echo -e "${GREEN}✅ Measurement baseline initialized${NC}"
        echo "   └── Baseline file: .compound-intelligence-baseline"
    else
        echo -e "${RED}❌ CLAUDE.md not found - cannot initialize baseline${NC}"
        return 1
    fi
}

create_measurement_aliases() {
    echo -e "${BLUE}⚡ Creating Measurement Aliases${NC}"
    echo "----------------------------------------"
    
    # Create convenient aliases for measurement tools
    cat > "$REPO_ROOT/.compound-intelligence-aliases" << 'EOF'
#!/bin/bash
# Compound Intelligence Measurement Aliases

# Quick dashboard view
alias ci-dashboard="./scripts/compound-intelligence-dashboard.sh"

# Individual measurement categories
alias ci-prevention="./scripts/compound-intelligence-dashboard.sh | grep -A 20 'PREVENTION RULE EFFECTIVENESS'"
alias ci-learning="./scripts/compound-intelligence-dashboard.sh | grep -A 15 'LEARNING VELOCITY'"  
alias ci-agents="./scripts/compound-intelligence-dashboard.sh | grep -A 10 'AGENT COORDINATION'"
alias ci-roi="./scripts/compound-intelligence-dashboard.sh | grep -A 10 'COMPOUND INTELLIGENCE ROI'"

# Measurement history
alias ci-history="git log --oneline --grep='Rule #\|Pattern #\|Learning #' | head -10"

# Pattern reuse tracking
alias ci-patterns="git log --oneline --grep='reuse\|apply.*pattern\|use.*rule' | head -5"

# Prevention effectiveness
alias ci-prevented="git log --oneline --grep='prevent\|avoid\|fix.*before' | head -5"

# Learning integration check
alias ci-learnings="grep -n 'Rule #\|Pattern #' CLAUDE.md | tail -10"
EOF
    
    echo -e "${GREEN}✅ Measurement aliases created${NC}"
    echo "   └── File: .compound-intelligence-aliases"
    echo "   └── Usage: source .compound-intelligence-aliases"
    echo ""
    echo "Available aliases:"
    echo "   └── ci-dashboard: Full compound intelligence dashboard"
    echo "   └── ci-prevention: Prevention rule effectiveness"
    echo "   └── ci-learning: Learning velocity metrics"
    echo "   └── ci-agents: Agent coordination ROI"
    echo "   └── ci-roi: Compound intelligence ROI"
}

setup_feedback_loops() {
    echo -e "${BLUE}🔄 Setting up Feedback Loops${NC}"
    echo "----------------------------------------"
    
    # Create feedback loop configuration
    cat > "$REPO_ROOT/.compound-intelligence-config" << 'EOF'
# Compound Intelligence Feedback Configuration

# Fast Feedback Loop (Daily)
FAST_FEEDBACK_ENABLED=true
FAST_FEEDBACK_TRIGGERS="pre-commit"
FAST_FEEDBACK_METRICS="prevention_rules,pattern_reuse"

# Medium Feedback Loop (Weekly) 
MEDIUM_FEEDBACK_ENABLED=true
MEDIUM_FEEDBACK_TRIGGERS="weekly_report"
MEDIUM_FEEDBACK_METRICS="learning_velocity,agent_coordination"

# Slow Feedback Loop (Monthly)
SLOW_FEEDBACK_ENABLED=true
SLOW_FEEDBACK_TRIGGERS="monthly_assessment"
SLOW_FEEDBACK_METRICS="compound_intelligence_roi,system_growth"

# Automation Settings
AUTOMATED_MEASUREMENT_COLLECTION=true
AUTOMATED_IMPROVEMENT_SUGGESTIONS=true
AUTOMATED_PATTERN_DETECTION=true
EOF
    
    echo -e "${GREEN}✅ Feedback loops configured${NC}"
    echo "   └── Fast: Daily prevention rule and pattern tracking"
    echo "   └── Medium: Weekly learning velocity and coordination analysis"
    echo "   └── Slow: Monthly compound intelligence ROI assessment"
}

verify_installation() {
    echo -e "${BLUE}✅ Verifying Installation${NC}"
    echo "----------------------------------------"
    
    local all_good=true
    
    # Check git hooks
    if [ -x "$HOOKS_DIR/pre-commit" ]; then
        echo -e "${GREEN}✅ Git hooks: Installed and executable${NC}"
    else
        echo -e "${RED}❌ Git hooks: Missing or not executable${NC}"
        all_good=false
    fi
    
    # Check dashboard script
    if [ -x "$REPO_ROOT/scripts/compound-intelligence-dashboard.sh" ]; then
        echo -e "${GREEN}✅ Dashboard script: Available and executable${NC}"
    else
        echo -e "${RED}❌ Dashboard script: Missing or not executable${NC}"
        all_good=false
    fi
    
    # Check CI/CD workflow
    if [ -f "$REPO_ROOT/.github/workflows/compound-intelligence-tracker.yml" ]; then
        echo -e "${GREEN}✅ CI/CD integration: Configured${NC}"
    else
        echo -e "${YELLOW}⚠️  CI/CD integration: Manual setup required${NC}"
    fi
    
    # Check CLAUDE.md integration
    if grep -q "Compound Intelligence Measurement System" "$REPO_ROOT/CLAUDE.md" 2>/dev/null; then
        echo -e "${GREEN}✅ CLAUDE.md integration: Measurement framework added${NC}"
    else
        echo -e "${RED}❌ CLAUDE.md integration: Measurement framework missing${NC}"
        all_good=false
    fi
    
    # Check baseline initialization
    if [ -f "$REPO_ROOT/.compound-intelligence-baseline" ]; then
        echo -e "${GREEN}✅ Measurement baseline: Initialized${NC}"
    else
        echo -e "${RED}❌ Measurement baseline: Not initialized${NC}"
        all_good=false
    fi
    
    echo ""
    if [ "$all_good" = true ]; then
        echo -e "${GREEN}🎉 COMPOUND INTELLIGENCE SYSTEM READY${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Run: source .compound-intelligence-aliases"
        echo "2. Test: ci-dashboard"
        echo "3. Start developing with automatic measurement tracking!"
    else
        echo -e "${RED}⚠️  SETUP INCOMPLETE${NC}"
        echo "Please resolve the issues above before proceeding."
        return 1
    fi
}

show_usage_guide() {
    echo ""
    echo -e "${BLUE}📖 USAGE GUIDE${NC}"
    echo "----------------------------------------"
    echo ""
    echo "Measurement Commands:"
    echo "  ./scripts/compound-intelligence-dashboard.sh  - Full system dashboard"
    echo "  source .compound-intelligence-aliases         - Load convenient aliases"
    echo ""
    echo "Development Workflow:"
    echo "  1. Make changes to code/config"
    echo "  2. Pre-commit hook automatically measures prevention rule applications"
    echo "  3. Commit message includes learning documentation for compound intelligence"
    echo "  4. CI/CD pipeline tracks learning velocity and agent coordination"
    echo "  5. Weekly/monthly reports show compound intelligence acceleration"
    echo ""
    echo "Learning Integration:"
    echo "  • Every bug fix → Prevention rule in CLAUDE.md"
    echo "  • Every pattern → Reusable knowledge for acceleration"
    echo "  • Every complex task → Agent coordination learning"
    echo "  • Every improvement → Compound intelligence growth"
    echo ""
    echo -e "${GREEN}🚀 System designed to make you exponentially smarter over time!${NC}"
}

# Main execution
main() {
    print_header
    
    # Run setup steps
    install_git_hooks
    echo ""
    
    setup_ci_integration  
    echo ""
    
    initialize_measurement_baseline
    echo ""
    
    create_measurement_aliases
    echo ""
    
    setup_feedback_loops
    echo ""
    
    verify_installation
    
    show_usage_guide
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

# Execute main function
main "$@"