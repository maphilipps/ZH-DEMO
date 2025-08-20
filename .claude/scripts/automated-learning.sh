#!/bin/bash

# Automated Learning System
# Learns from PRs, bugs, and reviews to continuously improve the system

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
KNOWLEDGE_DIR="$PROJECT_DIR/.claude/knowledge"
LEARNING_DIR="$KNOWLEDGE_DIR/learning"

# Ensure directories exist
mkdir -p "$LEARNING_DIR"/{prs,bugs,reviews,patterns,trends}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

usage() {
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  learn-pr <title> <description> <feedback> <status>"
    echo "  learn-bug <title> <root-cause> <solution> <status> <severity>"
    echo "  learn-review <type> <feedback> <outcome>"
    echo "  analyze-trends"
    echo "  generate-insights"
    echo "  export-knowledge"
    echo "  status"
    echo ""
    echo "Examples:"
    echo "  $0 learn-pr 'Add Swiss validation' 'eCH-0059 compliance' 'Good tests' merged"
    echo "  $0 learn-bug 'Form timeout' 'Database connection' 'Connection pooling' fixed high"
    echo "  $0 learn-review code 'Missing error handling' 'Added try-catch blocks'"
    echo "  $0 analyze-trends"
    echo "  $0 status"
}

learn_from_pr() {
    local title="$1"
    local description="$2"
    local feedback="$3" 
    local status="$4"
    
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local pr_id="pr_${timestamp}"
    local pr_file="$LEARNING_DIR/prs/${pr_id}.json"
    
    # Extract learning patterns from PR
    local patterns=()
    local technologies=()
    local best_practices=()
    
    # Detect technology patterns
    if echo "$description $feedback" | grep -qiE "(drupal|module|hook)"; then
        technologies+=("drupal")
    fi
    if echo "$description $feedback" | grep -qiE "(swiss|ech|compliance)"; then
        technologies+=("swiss_compliance")
    fi
    if echo "$description $feedback" | grep -qiE "(form|webform|validation)"; then
        technologies+=("forms")
    fi
    if echo "$description $feedback" | grep -qiE "(theme|css|styling|component)"; then
        technologies+=("frontend")
    fi
    if echo "$description $feedback" | grep -qiE "(performance|optimization|speed)"; then
        technologies+=("performance")
    fi
    if echo "$description $feedback" | grep -qiE "(ai|gpt|openai)"; then
        technologies+=("ai_integration")
    fi
    
    # Extract best practices from feedback
    if echo "$feedback" | grep -qiE "(test|testing|unit test|integration test)"; then
        best_practices+=("comprehensive_testing")
    fi
    if echo "$feedback" | grep -qiE "(document|documentation|comment)"; then
        best_practices+=("good_documentation")
    fi
    if echo "$feedback" | grep -qiE "(error handling|exception|try.catch)"; then
        best_practices+=("error_handling")
    fi
    if echo "$feedback" | grep -qiE "(security|validation|sanitize)"; then
        best_practices+=("security_practices")
    fi
    if echo "$feedback" | grep -qiE "(accessibility|a11y|wcag)"; then
        best_practices+=("accessibility")
    fi
    
    # Determine success patterns
    local success_indicators=()
    if [ "$status" = "merged" ]; then
        success_indicators+=("successful_merge")
        if echo "$feedback" | grep -qiE "(good|excellent|great|perfect|clean)"; then
            success_indicators+=("positive_feedback")
        fi
    fi
    
    # Create PR learning record
    cat > "$pr_file" << EOF
{
  "id": "$pr_id",
  "timestamp": "$(date -Iseconds)",
  "type": "pull_request",
  "title": "$title",
  "description": "$description",
  "feedback": "$feedback",
  "status": "$status",
  "technologies": $(printf '"%s"\n' "${technologies[@]}" | jq -R . | jq -s . 2>/dev/null || echo "[]"),
  "best_practices": $(printf '"%s"\n' "${best_practices[@]}" | jq -R . | jq -s . 2>/dev/null || echo "[]"),
  "success_indicators": $(printf '"%s"\n' "${success_indicators[@]}" | jq -R . | jq -s . 2>/dev/null || echo "[]"),
  "learning_extracted": false
}
EOF

    echo -e "${GREEN}📚 PR Learning captured:${NC} $pr_id"
    echo -e "  Title: $title"
    echo -e "  Status: $status"
    echo -e "  Technologies: ${technologies[*]:-none}"
    echo -e "  Best practices: ${best_practices[*]:-none}"
    
    # Store in memory system
    if command -v claude-code >/dev/null 2>&1; then
        claude-code --eval "
        import { createEntity } from 'mcp__server-memory';
        createEntity({
            name: '$pr_id',
            type: 'pr_learning',
            observations: ['$title', '$description', 'Feedback: $feedback', 'Status: $status']
        });
        " >/dev/null 2>&1 || true
    fi
    
    # Auto-extract insights for successful PRs
    if [ "$status" = "merged" ]; then
        extract_pr_insights "$pr_id"
    fi
}

learn_from_bug() {
    local title="$1"
    local root_cause="$2"
    local solution="$3"
    local status="$4"
    local severity="$5"
    
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local bug_id="bug_${timestamp}"
    local bug_file="$LEARNING_DIR/bugs/${bug_id}.json"
    
    # Extract patterns from bug
    local bug_categories=()
    local prevention_strategies=()
    
    # Categorize bug type
    if echo "$root_cause $solution" | grep -qiE "(database|connection|query|sql)"; then
        bug_categories+=("database")
        prevention_strategies+=("add_database_monitoring")
        prevention_strategies+=("implement_connection_pooling")
    fi
    if echo "$root_cause $solution" | grep -qiE "(validation|input|form|user data)"; then
        bug_categories+=("validation")
        prevention_strategies+=("add_input_validation_tests")
        prevention_strategies+=("implement_sanitization")
    fi
    if echo "$root_cause $solution" | grep -qiE "(permission|access|security|auth)"; then
        bug_categories+=("security")
        prevention_strategies+=("add_security_tests")
        prevention_strategies+=("implement_access_controls")
    fi
    if echo "$root_cause $solution" | grep -qiE "(performance|slow|timeout|memory)"; then
        bug_categories+=("performance")
        prevention_strategies+=("add_performance_monitoring")
        prevention_strategies+=("implement_caching")
    fi
    if echo "$root_cause $solution" | grep -qiE "(swiss|compliance|ech|accessibility)"; then
        bug_categories+=("compliance")
        prevention_strategies+=("add_compliance_tests")
        prevention_strategies+=("implement_validation_rules")
    fi
    
    # Create bug learning record
    cat > "$bug_file" << EOF
{
  "id": "$bug_id",
  "timestamp": "$(date -Iseconds)",
  "type": "bug_report",
  "title": "$title",
  "root_cause": "$root_cause",
  "solution": "$solution",
  "status": "$status",
  "severity": "$severity",
  "categories": $(printf '"%s"\n' "${bug_categories[@]}" | jq -R . | jq -s . 2>/dev/null || echo "[]"),
  "prevention_strategies": $(printf '"%s"\n' "${prevention_strategies[@]}" | jq -R . | jq -s . 2>/dev/null || echo "[]"),
  "learning_extracted": false
}
EOF

    echo -e "${RED}🐛 Bug Learning captured:${NC} $bug_id"
    echo -e "  Title: $title"
    echo -e "  Severity: $severity"
    echo -e "  Status: $status"
    echo -e "  Categories: ${bug_categories[*]:-none}"
    echo -e "  Prevention: ${prevention_strategies[*]:-none}"
    
    # Store in memory system
    if command -v claude-code >/dev/null 2>&1; then
        claude-code --eval "
        import { createEntity } from 'mcp__server-memory';
        createEntity({
            name: '$bug_id',
            type: 'bug_learning',
            observations: ['$title', 'Root cause: $root_cause', 'Solution: $solution', 'Severity: $severity']
        });
        " >/dev/null 2>&1 || true
    fi
    
    # Auto-integrate with failure-to-knowledge system
    if [ -f "$SCRIPT_DIR/failure-to-knowledge.sh" ]; then
        "$SCRIPT_DIR/failure-to-knowledge.sh" capture-failure bug "$title" "${bug_categories[0]:-general}" "$severity"
    fi
}

learn_from_review() {
    local review_type="$1"
    local feedback="$2"
    local outcome="$3"
    
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local review_id="review_${review_type}_${timestamp}"
    local review_file="$LEARNING_DIR/reviews/${review_id}.json"
    
    # Extract review insights
    local review_focus=()
    local improvements=()
    
    # Identify review focus areas
    if echo "$feedback" | grep -qiE "(test|testing|coverage)"; then
        review_focus+=("testing")
    fi
    if echo "$feedback" | grep -qiE "(performance|optimization|speed)"; then
        review_focus+=("performance")  
    fi
    if echo "$feedback" | grep -qiE "(security|vulnerability|access)"; then
        review_focus+=("security")
    fi
    if echo "$feedback" | grep -qiE "(accessibility|a11y|wcag)"; then
        review_focus+=("accessibility")
    fi
    if echo "$feedback" | grep -qiE "(documentation|comment|readme)"; then
        review_focus+=("documentation")
    fi
    if echo "$feedback" | grep -qiE "(swiss|compliance|ech)"; then
        review_focus+=("swiss_compliance")
    fi
    
    # Extract improvements made
    if echo "$outcome" | grep -qiE "(add|implement|create)"; then
        improvements+=("implementation")
    fi
    if echo "$outcome" | grep -qiE "(fix|resolve|correct)"; then
        improvements+=("bug_fix")
    fi
    if echo "$outcome" | grep -qiE "(improve|enhance|optimize)"; then
        improvements+=("enhancement")
    fi
    if echo "$outcome" | grep -qiE "(document|explain|clarify)"; then
        improvements+=("documentation")
    fi
    
    # Create review learning record
    cat > "$review_file" << EOF
{
  "id": "$review_id",
  "timestamp": "$(date -Iseconds)",
  "type": "code_review",
  "review_type": "$review_type",
  "feedback": "$feedback",
  "outcome": "$outcome",
  "review_focus": $(printf '"%s"\n' "${review_focus[@]}" | jq -R . | jq -s . 2>/dev/null || echo "[]"),
  "improvements": $(printf '"%s"\n' "${improvements[@]}" | jq -R . | jq -s . 2>/dev/null || echo "[]"),
  "learning_extracted": false
}
EOF

    echo -e "${CYAN}🔍 Review Learning captured:${NC} $review_id"
    echo -e "  Type: $review_type"
    echo -e "  Focus areas: ${review_focus[*]:-none}"
    echo -e "  Improvements: ${improvements[*]:-none}"
    
    # Store in memory system
    if command -v claude-code >/dev/null 2>&1; then
        claude-code --eval "
        import { createEntity } from 'mcp__server-memory';
        createEntity({
            name: '$review_id',
            type: 'review_learning',
            observations: ['$review_type review', 'Feedback: $feedback', 'Outcome: $outcome']
        });
        " >/dev/null 2>&1 || true
    fi
}

extract_pr_insights() {
    local pr_id="$1"
    local pr_file="$LEARNING_DIR/prs/${pr_id}.json"
    
    echo -e "${BLUE}💡 Extracting insights from:${NC} $pr_id"
    
    # Extract data from PR
    local technologies=($(jq -r '.technologies[]' "$pr_file" 2>/dev/null))
    local best_practices=($(jq -r '.best_practices[]' "$pr_file" 2>/dev/null))
    local title=$(jq -r '.title' "$pr_file")
    local feedback=$(jq -r '.feedback' "$pr_file")
    
    # Create reusable patterns
    local pattern_file="$LEARNING_DIR/patterns/pr_pattern_$(date '+%Y%m%d_%H%M%S').md"
    cat > "$pattern_file" << EOF
# PR Success Pattern: $title

## Technologies Used
${technologies[*]:-none}

## Best Practices Applied
${best_practices[*]:-none}

## What Worked Well
$feedback

## Reusable Elements
$(extract_reusable_elements "$title" "$feedback")

## Implementation Guidelines
$(generate_implementation_guidelines "${technologies[@]}" "${best_practices[@]}")

---
Generated from: $pr_id
Date: $(date)
EOF

    echo -e "${GREEN}✓ Pattern extracted:${NC} $pattern_file"
    
    # Mark PR as having learning extracted
    local temp_file=$(mktemp)
    jq '.learning_extracted = true' "$pr_file" > "$temp_file" && mv "$temp_file" "$pr_file"
}

extract_reusable_elements() {
    local title="$1"
    local feedback="$2"
    
    echo "Based on the successful PR '$title' with feedback '$feedback':"
    echo ""
    
    if echo "$feedback" | grep -qiE "test"; then
        echo "- Comprehensive testing approach validates changes"
        echo "- Tests should cover edge cases and integration scenarios"
    fi
    
    if echo "$feedback" | grep -qiE "documentation"; then
        echo "- Clear documentation improves maintainability" 
        echo "- Code comments should explain business logic"
    fi
    
    if echo "$feedback" | grep -qiE "error"; then
        echo "- Proper error handling prevents user-facing issues"
        echo "- Graceful fallbacks improve user experience"
    fi
    
    if echo "$title $feedback" | grep -qiE "swiss|compliance"; then
        echo "- Swiss compliance requires systematic validation"
        echo "- eCH standards should be validated automatically"
    fi
}

generate_implementation_guidelines() {
    local technologies=("$@")
    
    echo "Implementation guidelines for this pattern:"
    echo ""
    
    for tech in "${technologies[@]}"; do
        case "$tech" in
            "drupal")
                echo "- Follow Drupal coding standards and best practices"
                echo "- Use appropriate hooks and APIs"
                echo "- Test with multiple Drupal versions"
                ;;
            "swiss_compliance")
                echo "- Validate against eCH-0059 standards"
                echo "- Test accessibility with automated tools"
                echo "- Document compliance measures"
                ;;
            "forms")
                echo "- Validate all form inputs"
                echo "- Test submission workflows"
                echo "- Handle errors gracefully"
                ;;
            "frontend")
                echo "- Test responsive design"
                echo "- Validate component rendering"
                echo "- Check cross-browser compatibility"
                ;;
            "performance")
                echo "- Monitor Core Web Vitals"
                echo "- Test with realistic data volumes"
                echo "- Profile memory usage"
                ;;
            "ai_integration")
                echo "- Test AI API reliability"
                echo "- Handle API failures gracefully"  
                echo "- Monitor API usage and costs"
                ;;
        esac
    done
}

analyze_trends() {
    echo -e "${PURPLE}📈 Analyzing learning trends...${NC}"
    
    # Analyze PR trends
    echo -e "\n${YELLOW}PR Success Patterns:${NC}"
    if find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.status == "merged") | .technologies[]' {} \; 2>/dev/null | head -1 >/dev/null; then
        echo "  Most successful technologies:"
        find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.status == "merged") | .technologies[]' {} \; 2>/dev/null | sort | uniq -c | sort -nr | head -5 | while read count tech; do
            echo "    $tech: $count successful PRs"
        done
        
        echo "  Most effective best practices:"
        find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.status == "merged") | .best_practices[]' {} \; 2>/dev/null | sort | uniq -c | sort -nr | head -5 | while read count practice; do
            echo "    $practice: $count successful PRs"
        done
    else
        echo "  No PR data available yet"
    fi
    
    # Analyze bug patterns
    echo -e "\n${YELLOW}Bug Prevention Patterns:${NC}"
    if find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r '.categories[]' {} \; 2>/dev/null | head -1 >/dev/null; then
        echo "  Most common bug categories:"
        find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r '.categories[]' {} \; 2>/dev/null | sort | uniq -c | sort -nr | head -5 | while read count category; do
            echo "    $category: $count bugs"
        done
        
        echo "  Most effective prevention strategies:"
        find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r '.prevention_strategies[]' {} \; 2>/dev/null | sort | uniq -c | sort -nr | head -5 | while read count strategy; do
            echo "    $strategy: $count implementations"
        done
    else
        echo "  No bug data available yet"
    fi
    
    # Analyze review patterns
    echo -e "\n${YELLOW}Review Focus Trends:${NC}"
    if find "$LEARNING_DIR/reviews" -name "*.json" -exec jq -r '.review_focus[]' {} \; 2>/dev/null | head -1 >/dev/null; then
        echo "  Most reviewed areas:"
        find "$LEARNING_DIR/reviews" -name "*.json" -exec jq -r '.review_focus[]' {} \; 2>/dev/null | sort | uniq -c | sort -nr | head -5 | while read count focus; do
            echo "    $focus: $count reviews"
        done
    else
        echo "  No review data available yet"
    fi
}

generate_insights() {
    echo -e "${BLUE}🧠 Generating system insights...${NC}"
    
    local insights_file="$LEARNING_DIR/insights_$(date '+%Y%m%d_%H%M%S').md"
    
    cat > "$insights_file" << EOF
# Automated Learning Insights

Generated: $(date)

## System Learning Summary

$(analyze_learning_effectiveness)

## Recommended Actions

$(generate_action_recommendations)

## Success Patterns to Replicate

$(extract_success_patterns)

## Failure Patterns to Avoid

$(extract_failure_patterns)

## GPZH-Specific Learnings

$(extract_gpzh_patterns)

---
Auto-generated by automated-learning.sh
EOF

    echo -e "${GREEN}✓ Insights generated:${NC} $insights_file"
}

analyze_learning_effectiveness() {
    local total_prs=$(find "$LEARNING_DIR/prs" -name "*.json" 2>/dev/null | wc -l || echo "0")
    local successful_prs=$(find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.status == "merged") | .id' {} \; 2>/dev/null | wc -l || echo "0")
    local total_bugs=$(find "$LEARNING_DIR/bugs" -name "*.json" 2>/dev/null | wc -l || echo "0")
    local resolved_bugs=$(find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r 'select(.status == "fixed" or .status == "resolved") | .id' {} \; 2>/dev/null | wc -l || echo "0")
    
    echo "The system has processed $total_prs PRs with $successful_prs successful merges."
    echo "Bug tracking shows $total_bugs reported issues with $resolved_bugs resolved."
    
    if [ "$total_prs" -gt 0 ]; then
        local success_rate=$((successful_prs * 100 / total_prs))
        echo "PR success rate: ${success_rate}%"
    fi
    
    if [ "$total_bugs" -gt 0 ]; then
        local resolution_rate=$((resolved_bugs * 100 / total_bugs))
        echo "Bug resolution rate: ${resolution_rate}%"
    fi
}

generate_action_recommendations() {
    echo "Based on current learning data:"
    echo ""
    
    # Check if we have enough data
    local total_learning=$(( $(find "$LEARNING_DIR/prs" -name "*.json" 2>/dev/null | wc -l || echo "0") + $(find "$LEARNING_DIR/bugs" -name "*.json" 2>/dev/null | wc -l || echo "0") ))
    
    if [ "$total_learning" -lt 5 ]; then
        echo "1. Continue collecting learning data - need more examples to identify patterns"
        echo "2. Document successes and failures as they occur"
        echo "3. Use the learning system consistently for all PRs and bug fixes"
    else
        echo "1. Focus on technologies and practices that have shown success"
        echo "2. Implement prevention strategies for common bug categories"
        echo "3. Replicate successful PR patterns in new development"
        echo "4. Create automated tests for common failure scenarios"
    fi
}

extract_success_patterns() {
    echo "Successful patterns identified:"
    echo ""
    
    # Extract from successful PRs
    if find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.status == "merged") | .best_practices[]' {} \; 2>/dev/null | head -1 >/dev/null; then
        echo "Best practices from successful PRs:"
        find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.status == "merged") | .best_practices[]' {} \; 2>/dev/null | sort | uniq | while read practice; do
            echo "- $practice"
        done
    else
        echo "- No success patterns available yet"
    fi
}

extract_failure_patterns() {
    echo "Failure patterns to avoid:"
    echo ""
    
    if find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r '.root_cause' {} \; 2>/dev/null | head -1 >/dev/null; then
        echo "Common failure root causes:"
        find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r '.root_cause' {} \; 2>/dev/null | sort | uniq | while read cause; do
            echo "- $cause"
        done
    else
        echo "- No failure patterns identified yet"
    fi
}

extract_gpzh_patterns() {
    echo "GPZH-specific learning patterns:"
    echo ""
    
    # Look for GPZH-related learning
    local gpzh_prs=$(find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.title | test("(?i)(gpzh|bruchtal|swiss|form|demo)")) | .title' {} \; 2>/dev/null)
    local gpzh_bugs=$(find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r 'select(.title | test("(?i)(gpzh|bruchtal|swiss|form|demo)")) | .title' {} \; 2>/dev/null)
    
    if [ -n "$gpzh_prs" ]; then
        echo "GPZH-related successful PRs:"
        echo "$gpzh_prs" | while read pr; do
            echo "- $pr"
        done
    fi
    
    if [ -n "$gpzh_bugs" ]; then
        echo "GPZH-related issues resolved:"
        echo "$gpzh_bugs" | while read bug; do
            echo "- $bug"
        done
    fi
    
    if [ -z "$gpzh_prs" ] && [ -z "$gpzh_bugs" ]; then
        echo "- No GPZH-specific patterns identified yet"
    fi
}

export_knowledge() {
    echo -e "${CYAN}📦 Exporting learning knowledge...${NC}"
    
    local export_file="$LEARNING_DIR/knowledge_export_$(date '+%Y%m%d_%H%M%S').json"
    
    # Compile all learning data
    cat > "$export_file" << EOF
{
  "export_timestamp": "$(date -Iseconds)",
  "prs": [
$(find "$LEARNING_DIR/prs" -name "*.json" -exec cat {} \; 2>/dev/null | sed 's/$/,/' | sed '$s/,$//')
  ],
  "bugs": [
$(find "$LEARNING_DIR/bugs" -name "*.json" -exec cat {} \; 2>/dev/null | sed 's/$/,/' | sed '$s/,$//')
  ],
  "reviews": [
$(find "$LEARNING_DIR/reviews" -name "*.json" -exec cat {} \; 2>/dev/null | sed 's/$/,/' | sed '$s/,$//')
  ]
}
EOF

    echo -e "${GREEN}✓ Knowledge exported:${NC} $export_file"
    
    # Create summary
    local summary_file="${export_file%.json}_summary.md"
    cat > "$summary_file" << EOF
# Learning Knowledge Export Summary

Export Date: $(date)

## Statistics
- PRs: $(find "$LEARNING_DIR/prs" -name "*.json" 2>/dev/null | wc -l || echo "0")
- Bugs: $(find "$LEARNING_DIR/bugs" -name "*.json" 2>/dev/null | wc -l || echo "0")  
- Reviews: $(find "$LEARNING_DIR/reviews" -name "*.json" 2>/dev/null | wc -l || echo "0")

## Files Exported
- Full data: $export_file
- Summary: $summary_file

## Usage
Import this knowledge into other projects or systems to transfer learned patterns and best practices.
EOF

    echo -e "${GREEN}✓ Export summary:${NC} $summary_file"
}

show_status() {
    echo -e "${BLUE}🎓 Automated Learning System Status${NC}"
    echo ""
    
    # Statistics
    local total_prs=$(find "$LEARNING_DIR/prs" -name "*.json" 2>/dev/null | wc -l || echo "0")
    local total_bugs=$(find "$LEARNING_DIR/bugs" -name "*.json" 2>/dev/null | wc -l || echo "0")
    local total_reviews=$(find "$LEARNING_DIR/reviews" -name "*.json" 2>/dev/null | wc -l || echo "0")
    local total_patterns=$(find "$LEARNING_DIR/patterns" -name "*.md" 2>/dev/null | wc -l || echo "0")
    
    echo -e "${YELLOW}Learning Statistics:${NC}"
    echo "  PRs analyzed: $total_prs"
    echo "  Bugs learned from: $total_bugs"
    echo "  Reviews processed: $total_reviews"
    echo "  Patterns extracted: $total_patterns"
    echo ""
    
    # Recent learning activity
    echo -e "${YELLOW}Recent Learning Activity:${NC}"
    {
        find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r '"PR: \(.timestamp) - \(.title)"' {} \; 2>/dev/null
        find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r '"BUG: \(.timestamp) - \(.title)"' {} \; 2>/dev/null
        find "$LEARNING_DIR/reviews" -name "*.json" -exec jq -r '"REVIEW: \(.timestamp) - \(.review_type)"' {} \; 2>/dev/null
    } | sort -r | head -10
    
    # Learning effectiveness
    local successful_prs=$(find "$LEARNING_DIR/prs" -name "*.json" -exec jq -r 'select(.status == "merged") | .id' {} \; 2>/dev/null | wc -l || echo "0")
    local resolved_bugs=$(find "$LEARNING_DIR/bugs" -name "*.json" -exec jq -r 'select(.status == "fixed" or .status == "resolved") | .id' {} \; 2>/dev/null | wc -l || echo "0")
    
    if [ "$total_prs" -gt 0 ]; then
        local pr_success_rate=$((successful_prs * 100 / total_prs))
        echo ""
        echo -e "${GREEN}PR Success Rate: ${pr_success_rate}%${NC}"
    fi
    
    if [ "$total_bugs" -gt 0 ]; then
        local bug_resolution_rate=$((resolved_bugs * 100 / total_bugs))
        echo -e "${GREEN}Bug Resolution Rate: ${bug_resolution_rate}%${NC}"
    fi
}

# Main command handling
case "${1:-}" in
    "learn-pr")
        if [ $# -ne 5 ]; then
            echo "Error: learn-pr requires title, description, feedback, status arguments"
            usage
            exit 1
        fi
        learn_from_pr "$2" "$3" "$4" "$5"
        ;;
    "learn-bug")
        if [ $# -ne 6 ]; then
            echo "Error: learn-bug requires title, root-cause, solution, status, severity arguments"
            usage
            exit 1
        fi
        learn_from_bug "$2" "$3" "$4" "$5" "$6"
        ;;
    "learn-review")
        if [ $# -ne 4 ]; then
            echo "Error: learn-review requires type, feedback, outcome arguments"
            usage
            exit 1
        fi
        learn_from_review "$2" "$3" "$4"
        ;;
    "analyze-trends")
        analyze_trends
        ;;
    "generate-insights")
        generate_insights
        ;;
    "export-knowledge")
        export_knowledge
        ;;
    "status")
        show_status
        ;;
    *)
        usage
        exit 1
        ;;
esac