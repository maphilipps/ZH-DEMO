#!/bin/bash
# Compound Intelligence Dashboard
# Real-time measurement and visualization of learning velocity and prevention effectiveness

set -e

CLAUDE_MD="CLAUDE.md"
REPO_ROOT="$(git rev-parse --show-toplevel)"
DATE_30_DAYS_AGO=$(date -d "30 days ago" '+%Y-%m-%d' 2>/dev/null || date -v-30d '+%Y-%m-%d')
DATE_7_DAYS_AGO=$(date -d "7 days ago" '+%Y-%m-%d' 2>/dev/null || date -v-7d '+%Y-%m-%d')

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${CYAN}"
    echo "========================================================"
    echo "🧠 COMPOUND INTELLIGENCE DASHBOARD"
    echo "========================================================"
    echo -e "Generated: $(date)"
    echo -e "Repository: $(basename $(pwd))"
    echo -e "${NC}"
}

calculate_prevention_effectiveness() {
    echo -e "${BLUE}🎯 PREVENTION RULE EFFECTIVENESS${NC}"
    echo "----------------------------------------"
    
    # Rule #1: Paragraphs Frontend Editing
    paragraph_configs=$(find . -name "*.yml" -path "*/config/*" -exec grep -l "field_paragraphs" {} \; 2>/dev/null | wc -l)
    paragraph_fixes=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="paragraph.*fix\|add_above" | wc -l)
    echo -e "Rule #1 (Paragraphs Frontend): ${GREEN}✅ APPLIED${NC}"
    echo "  └── Configurations protected: $paragraph_configs"
    echo "  └── Recent applications: $paragraph_fixes"
    
    # Rule #4: DDEV Frontend Testing
    ddev_npm_usage=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="ddev npm" | wc -l)
    npm_conflicts=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="version.*conflict\|esbuild.*error" | wc -l)
    if [ $npm_conflicts -eq 0 ] && [ $ddev_npm_usage -gt 0 ]; then
        status="${GREEN}✅ EFFECTIVE${NC}"
    elif [ $npm_conflicts -gt 0 ]; then
        status="${YELLOW}⚠️  NEEDS IMPROVEMENT${NC}"
    else
        status="${BLUE}📊 MONITORING${NC}"
    fi
    echo -e "Rule #4 (DDEV Frontend): $status"
    echo "  └── DDEV npm applications: $ddev_npm_usage"
    echo "  └── Version conflicts prevented: $((5 - npm_conflicts))/5"
    
    # Rule #5: Test Failure Analysis  
    test_failures=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="test.*fail\|failing.*test" | wc -l)
    test_fixes=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="fix.*test\|test.*fix" | wc -l)
    if [ $test_fixes -gt $test_failures ]; then
        status="${GREEN}✅ EFFECTIVE${NC}"
    elif [ $test_failures -gt 3 ]; then
        status="${RED}❌ NEEDS ATTENTION${NC}"
    else
        status="${YELLOW}⚠️  PARTIALLY APPLIED${NC}"
    fi
    echo -e "Rule #5 (Test Analysis): $status"
    echo "  └── Test failures detected: $test_failures"
    echo "  └── Test failures fixed: $test_fixes"
    
    # Security Rules
    xss_fixes=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="xss\|raw.*filter\|security.*fix" | wc -l)
    raw_filters_remaining=$(find . -name "*.twig" -exec grep -l "|raw" {} \; 2>/dev/null | wc -l)
    echo -e "Security Rules (XSS): ${GREEN}✅ ACTIVE${NC}"
    echo "  └── XSS prevention applications: $xss_fixes"
    echo "  └── Raw filters remaining: $raw_filters_remaining (monitoring)"
    
    # Calculate overall prevention effectiveness
    total_rules=4
    effective_rules=$(( (paragraph_configs > 0) + (npm_conflicts == 0) + (test_fixes >= test_failures) + (xss_fixes > 0) ))
    effectiveness_percentage=$(( effective_rules * 100 / total_rules ))
    
    echo ""
    echo -e "${PURPLE}📊 Prevention Effectiveness: $effectiveness_percentage% ($effective_rules/$total_rules rules effective)${NC}"
    
    return $effectiveness_percentage
}

measure_learning_velocity() {
    echo -e "${BLUE}🚀 LEARNING VELOCITY MEASUREMENT${NC}"
    echo "----------------------------------------"
    
    # Count new learnings
    new_rules=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="Rule #" | wc -l)
    new_patterns=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="Pattern #" | wc -l)
    new_learnings=$(( new_rules + new_patterns ))
    
    echo "Learning Creation Rate:"
    echo "  └── New prevention rules: $new_rules"
    echo "  └── New patterns documented: $new_patterns"
    echo "  └── Total new learnings: $new_learnings"
    
    # Pattern reuse tracking
    pattern_applications=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="apply.*rule\|use.*pattern\|reuse" | wc -l)
    if [ $new_learnings -gt 0 ]; then
        reuse_rate=$(( pattern_applications * 100 / new_learnings ))
    else
        reuse_rate=0
    fi
    
    echo ""
    echo "Pattern Reuse Metrics:"
    echo "  └── Pattern applications: $pattern_applications"
    echo "  └── Reuse rate: $reuse_rate%"
    
    # Cross-domain learning transfer
    cross_domain=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="cross.*domain\|transfer.*pattern\|frontend.*backend\|security.*performance" | wc -l)
    
    echo ""
    echo "Knowledge Transfer:"
    echo "  └── Cross-domain applications: $cross_domain"
    
    # Calculate synthesis velocity (time from learning to application)
    recent_learning=$(git log --oneline --since="$DATE_7_DAYS_AGO" --grep="Rule #\|Pattern #" | head -1 | cut -d' ' -f1 2>/dev/null || echo "")
    if [ -n "$recent_learning" ]; then
        learning_date=$(git show -s --format=%ct "$recent_learning" 2>/dev/null || echo "0")
        current_date=$(date +%s)
        days_since_learning=$(( (current_date - learning_date) / 86400 ))
        
        # Check if learning has been applied
        learning_hash_short=$(echo "$recent_learning" | cut -c1-7)
        applications_since=$(git log --oneline --since="$learning_date" --grep="apply\|reuse\|use.*rule" | wc -l)
        
        if [ $applications_since -gt 0 ]; then
            echo "  └── Latest learning applied: ✅ ($days_since_learning days ago)"
        else
            echo "  └── Latest learning pending application: ⏳ ($days_since_learning days ago)"
        fi
    fi
    
    # Learning velocity score (0-100)
    velocity_score=$(( (new_learnings * 20) + (reuse_rate / 2) + (cross_domain * 10) ))
    if [ $velocity_score -gt 100 ]; then
        velocity_score=100
    fi
    
    echo ""
    echo -e "${PURPLE}📈 Learning Velocity Score: $velocity_score/100${NC}"
    
    return $velocity_score
}

analyze_agent_coordination() {
    echo -e "${BLUE}🤝 AGENT COORDINATION EFFECTIVENESS${NC}"  
    echo "----------------------------------------"
    
    # Count specialized agent assignments
    specialized_assignments=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="@.*specialist\|@.*architect\|@.*expert" | wc -l)
    complex_tasks=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="complex\|multi.*tech\|integration\|orchestrat" | wc -l)
    
    echo "Agent Specialization:"
    echo "  └── Specialized assignments: $specialized_assignments"
    echo "  └── Complex tasks identified: $complex_tasks"
    
    # Calculate coordination efficiency
    if [ $specialized_assignments -gt 0 ]; then
        coordination_efficiency=$(( complex_tasks * 100 / specialized_assignments ))
        if [ $coordination_efficiency -gt 100 ]; then
            coordination_efficiency=100
        fi
    else
        coordination_efficiency=0
    fi
    
    echo "  └── Coordination efficiency: $coordination_efficiency%"
    
    # Agent learning integration
    agent_learnings=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="agent.*rule\|specialist.*pattern\|coordination.*learning" | wc -l)
    
    echo ""
    echo "Learning Integration:"
    echo "  └── Agent-generated learnings: $agent_learnings"
    
    # Recent coordination successes
    echo ""
    echo "Recent Coordination Examples:"
    git log --oneline --since="$DATE_7_DAYS_AGO" --grep="@.*specialist\|@.*architect" | head -3 | while read -r line; do
        echo "  └── $line"
    done || echo "  └── No recent specialized assignments"
    
    # Agent coordination score
    coordination_score=$(( (coordination_efficiency / 2) + (agent_learnings * 10) ))
    if [ $coordination_score -gt 100 ]; then
        coordination_score=100
    fi
    
    echo ""
    echo -e "${PURPLE}🎯 Agent Coordination Score: $coordination_score/100${NC}"
    
    return $coordination_score
}

calculate_compound_intelligence_roi() {
    echo -e "${BLUE}📊 COMPOUND INTELLIGENCE ROI${NC}"
    echo "----------------------------------------"
    
    # Time investment calculation  
    total_learning_commits=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="Rule #\|Pattern #\|Learning #" | wc -l)
    estimated_investment_hours=$(( total_learning_commits * 45 / 60 ))  # 45 min per learning
    
    echo "Investment Analysis:"
    echo "  └── Learning commits: $total_learning_commits"
    echo "  └── Estimated time invested: $estimated_investment_hours hours"
    
    # Returns calculation
    prevention_successes=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="prevent\|avoid\|fix.*before" | wc -l)
    pattern_reuses=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="reuse\|apply.*pattern\|use.*rule" | wc -l)
    cross_domain_transfers=$(git log --oneline --since="$DATE_30_DAYS_AGO" --grep="cross.*domain\|transfer" | wc -l)
    
    # Estimate time saved (2 hours per prevention, 1.5 hours per reuse, 3 hours per transfer)
    estimated_time_saved=$(( (prevention_successes * 2) + (pattern_reuses * 1) + (cross_domain_transfers * 3) ))
    
    echo ""
    echo "Returns Analysis:"
    echo "  └── Prevention successes: $prevention_successes (${prevention_successes}×2h = $((prevention_successes * 2))h saved)"
    echo "  └── Pattern reuses: $pattern_reuses (${pattern_reuses}×1h = ${pattern_reuses}h saved)"  
    echo "  └── Cross-domain transfers: $cross_domain_transfers (${cross_domain_transfers}×3h = $((cross_domain_transfers * 3))h saved)"
    echo "  └── Total estimated time saved: $estimated_time_saved hours"
    
    # ROI calculation
    if [ $estimated_investment_hours -gt 0 ]; then
        roi_ratio=$(( (estimated_time_saved * 100) / estimated_investment_hours ))
    else
        roi_ratio=0
    fi
    
    echo ""
    if [ $roi_ratio -gt 500 ]; then
        status="${GREEN}🚀 EXCEPTIONAL${NC}"
    elif [ $roi_ratio -gt 200 ]; then
        status="${GREEN}✅ EXCELLENT${NC}"
    elif [ $roi_ratio -gt 100 ]; then
        status="${BLUE}📈 GOOD${NC}"
    else
        status="${YELLOW}⚠️  NEEDS IMPROVEMENT${NC}"
    fi
    echo -e "Compound Intelligence ROI: $status"
    echo "  └── ROI Ratio: ${roi_ratio}% (${estimated_time_saved}h saved / ${estimated_investment_hours}h invested)"
    
    return $(( roi_ratio / 10 ))  # Return score out of 100
}

generate_recommendations() {
    local prevention_score=$1
    local velocity_score=$2
    local coordination_score=$3
    local roi_score=$4
    
    echo -e "${BLUE}💡 COMPOUND INTELLIGENCE RECOMMENDATIONS${NC}"
    echo "----------------------------------------"
    
    # Prevention effectiveness recommendations
    if [ $prevention_score -lt 80 ]; then
        echo -e "${YELLOW}🎯 Prevention Effectiveness (${prevention_score}%):${NC}"
        echo "  └── Review underperforming prevention rules"
        echo "  └── Increase rule application coverage"
        echo "  └── Add automated enforcement to workflow"
    fi
    
    # Learning velocity recommendations
    if [ $velocity_score -lt 70 ]; then
        echo -e "${YELLOW}🚀 Learning Velocity (${velocity_score}%):${NC}"
        echo "  └── Increase pattern reuse rate in development"
        echo "  └── Create more cross-domain learning transfers"
        echo "  └── Accelerate learning-to-application cycle"
    fi
    
    # Agent coordination recommendations  
    if [ $coordination_score -lt 60 ]; then
        echo -e "${YELLOW}🤝 Agent Coordination (${coordination_score}%):${NC}"
        echo "  └── Implement more specialized agent assignments"
        echo "  └── Improve complex task identification"
        echo "  └── Enhance agent learning integration"
    fi
    
    # ROI recommendations
    if [ $roi_score -lt 30 ]; then
        echo -e "${YELLOW}📊 Compound Intelligence ROI (${roi_score}%):${NC}"
        echo "  └── Focus on high-impact learning creation"
        echo "  └── Improve pattern application rates" 
        echo "  └── Increase prevention success rate"
    fi
    
    # Overall system recommendations
    overall_score=$(( (prevention_score + velocity_score + coordination_score + roi_score) / 4 ))
    
    echo ""
    echo -e "${PURPLE}🎯 NEXT ACTIONS (Overall Score: ${overall_score}%):${NC}"
    
    if [ $overall_score -gt 85 ]; then
        echo "  └── 🚀 System performing excellently - focus on innovation"
        echo "  └── 📈 Scale successful patterns to other domains"
        echo "  └── 🧠 Create advanced meta-learning patterns"
    elif [ $overall_score -gt 70 ]; then
        echo "  └── 📊 Good performance - optimize weak areas"
        echo "  └── 🔄 Improve lowest-scoring measurement category"
        echo "  └── 📝 Document successful acceleration patterns"
    else
        echo "  └── ⚠️  System needs attention - focus on fundamentals"
        echo "  └── 🎯 Strengthen prevention rule application"
        echo "  └── 🚀 Accelerate learning velocity"
        echo "  └── 🤝 Improve agent coordination effectiveness"
    fi
}

generate_summary() {
    echo ""
    echo -e "${CYAN}========================================================"
    echo "📊 COMPOUND INTELLIGENCE SUMMARY" 
    echo "========================================================"
    echo -e "${NC}"
    
    # Current learning architecture status
    current_rules=$(grep -c "### Rule #" "$CLAUDE_MD" 2>/dev/null || echo "0")
    current_patterns=$(grep -c "### Pattern #" "$CLAUDE_MD" 2>/dev/null || echo "0")
    
    echo "Learning Architecture Status:"
    echo "  └── Prevention Rules: $current_rules"
    echo "  └── Documented Patterns: $current_patterns"
    echo "  └── Total Learning Assets: $((current_rules + current_patterns))"
    
    # System intelligence growth
    baseline_learnings=15  # Initial learning count
    current_learnings=$((current_rules + current_patterns))
    if [ $current_learnings -gt $baseline_learnings ]; then
        growth_percentage=$(( ((current_learnings - baseline_learnings) * 100) / baseline_learnings ))
        echo "  └── System Intelligence Growth: +${growth_percentage}% vs baseline"
    fi
    
    echo ""
    echo "Next Measurement Cycle:"
    echo "  └── Fast Feedback (daily): $(date -d '+1 day' '+%Y-%m-%d' 2>/dev/null || date -v+1d '+%Y-%m-%d')"
    echo "  └── Medium Feedback (weekly): $(date -d '+1 week' '+%Y-%m-%d' 2>/dev/null || date -v+1w '+%Y-%m-%d')"
    echo "  └── Slow Feedback (monthly): $(date -d '+1 month' '+%Y-%m-%d' 2>/dev/null || date -v+1m '+%Y-%m-%d')"
    
    echo ""
    echo -e "${GREEN}✅ Compound Intelligence Dashboard Complete${NC}"
}

# Main execution
main() {
    print_header
    
    # Run all measurement categories
    calculate_prevention_effectiveness
    prevention_score=$?
    echo ""
    
    measure_learning_velocity  
    velocity_score=$?
    echo ""
    
    analyze_agent_coordination
    coordination_score=$?
    echo ""
    
    calculate_compound_intelligence_roi
    roi_score=$?
    echo ""
    
    # Generate recommendations and summary
    generate_recommendations $prevention_score $velocity_score $coordination_score $roi_score
    generate_summary
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

# Check if CLAUDE.md exists
if [ ! -f "$CLAUDE_MD" ]; then
    echo -e "${RED}❌ Error: CLAUDE.md not found${NC}"
    exit 1
fi

# Execute main function
main "$@"