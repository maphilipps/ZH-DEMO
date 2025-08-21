#!/bin/bash

# Frustration Detector System  
# Detects user frustration patterns and provides automated solutions

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
KNOWLEDGE_DIR="$PROJECT_DIR/.claude/knowledge"
FRUSTRATION_DIR="$KNOWLEDGE_DIR/frustrations"

# Ensure directories exist
mkdir -p "$FRUSTRATION_DIR"/{patterns,solutions,sessions}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

usage() {
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  detect <message> <context>"
    echo "  analyze <conversation-file>"
    echo "  train"
    echo "  suggest-solution <frustration-id>"
    echo "  status"
    echo ""
    echo "Examples:"
    echo "  $0 detect 'Drupal errors keep happening' development"
    echo "  $0 analyze /path/to/conversation.txt"
    echo "  $0 train"
    echo "  $0 status"
}

# Initialize pattern arrays
init_patterns() {
    # Frustration detection patterns
    FRUSTRATION_PATTERNS_repeated_errors="(error|fail|broken|not work|doesn't work|keep getting|again|still|repeatedly)"
    FRUSTRATION_PATTERNS_time_pressure="(urgent|deadline|quickly|asap|need now|running out|time)"
    FRUSTRATION_PATTERNS_confusion="(don't understand|confused|unclear|how do|what does|why)"
    FRUSTRATION_PATTERNS_complexity="(too complex|complicated|overwhelming|too much|hard to)"
    FRUSTRATION_PATTERNS_documentation="(no documentation|unclear docs|missing info|can't find)"
    FRUSTRATION_PATTERNS_performance="(slow|timeout|hanging|frozen|takes forever|performance)"
    FRUSTRATION_PATTERNS_gpzh_specific="(demo|presentation|bruchtal|forms|swiss|compliance|35 minute)"

    # GPZH-specific solution patterns
    GPZH_SOLUTIONS_demo_prep="Use: ./claude/gpzh-workflows.sh demo for automated 35-minute demo preparation"
    GPZH_SOLUTIONS_forms_issues="Use: ./claude/gpzh-workflows.sh forms for municipal forms implementation"
    GPZH_SOLUTIONS_compliance="Use: ./claude/gpzh-workflows.sh compliance for Swiss compliance validation"
    GPZH_SOLUTIONS_performance="Use: ./claude/gpzh-workflows.sh performance for Core Web Vitals optimization"
    GPZH_SOLUTIONS_bruchtal_theme="Check: web/themes/custom/adesso_cms_theme/ and ddev theme dev"
    GPZH_SOLUTIONS_ddev_issues="Try: ddev restart, ddev describe, ddev logs --follow"
}

# Get pattern by name
get_frustration_pattern() {
    local pattern_name="$1"
    local var_name="FRUSTRATION_PATTERNS_${pattern_name}"
    echo "${!var_name:-}"
}

# Get solution by name
get_gpzh_solution() {
    local solution_name="$1"
    local var_name="GPZH_SOLUTIONS_${solution_name}"
    echo "${!var_name:-}"
}

detect_frustration() {
    local message="$1"
    local context="$2"
    
    # Initialize patterns
    init_patterns
    
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local frustration_id="frustration_${context}_${timestamp}"
    
    echo -e "${PURPLE}🔍 Analyzing frustration patterns...${NC}"
    
    # Convert to lowercase for pattern matching
    local message_lower=$(echo "$message" | tr '[:upper:]' '[:lower:]')
    
    # Detect frustration patterns
    local detected_patterns=()
    local frustration_score=0
    
    # Check each pattern type
    for pattern_name in repeated_errors time_pressure confusion complexity documentation performance gpzh_specific; do
        local pattern=$(get_frustration_pattern "$pattern_name")
        if [ -n "$pattern" ] && echo "$message_lower" | grep -qiE "$pattern"; then
            detected_patterns+=("$pattern_name")
            frustration_score=$((frustration_score + 1))
        fi
    done
    
    # Check for GPZH-specific frustrations
    local gpzh_context=""
    if echo "$message_lower" | grep -qiE "(demo|presentation|bruchtal|forms|swiss|compliance)"; then
        gpzh_context="gpzh_specific"
        frustration_score=$((frustration_score + 2)) # Higher weight for GPZH issues
    fi
    
    # Determine frustration level
    local frustration_level="low"
    if [ $frustration_score -ge 4 ]; then
        frustration_level="critical"
    elif [ $frustration_score -ge 2 ]; then
        frustration_level="high"
    elif [ $frustration_score -ge 1 ]; then
        frustration_level="medium"
    fi
    
    # Create frustration record
    local frustration_file="$FRUSTRATION_DIR/sessions/${frustration_id}.json"
    cat > "$frustration_file" << EOF
{
  "id": "$frustration_id",
  "timestamp": "$(date -Iseconds)",
  "message": "$message",
  "context": "$context",
  "detected_patterns": $(printf '"%s"\n' "${detected_patterns[@]}" | jq -R . | jq -s .),
  "gpzh_context": "$gpzh_context",
  "frustration_score": $frustration_score,
  "frustration_level": "$frustration_level",
  "suggested_solutions": [],
  "resolved": false
}
EOF

    # Output detection results
    if [ $frustration_score -gt 0 ]; then
        case "$frustration_level" in
            "critical")
                echo -e "${RED}🚨 CRITICAL FRUSTRATION DETECTED${NC}"
                ;;
            "high")
                echo -e "${RED}⚠️  HIGH FRUSTRATION DETECTED${NC}"
                ;;
            "medium")
                echo -e "${YELLOW}⚡ MEDIUM FRUSTRATION DETECTED${NC}"
                ;;
        esac
        
        echo -e "  ID: $frustration_id"
        echo -e "  Score: $frustration_score"
        echo -e "  Patterns: ${detected_patterns[*]}"
        
        # Auto-suggest solutions for high/critical frustrations
        if [ "$frustration_level" = "high" ] || [ "$frustration_level" = "critical" ]; then
            echo -e "${BLUE}🔧 Auto-suggesting solutions...${NC}"
            suggest_solution "$frustration_id"
        fi
    else
        echo -e "${GREEN}✓ No significant frustration detected${NC}"
    fi
    
    # Store in memory system
    if command -v claude-code >/dev/null 2>&1 && [ $frustration_score -gt 0 ]; then
        claude-code --eval "
        import { createEntity } from 'mcp__server-memory';
        createEntity({
            name: '$frustration_id',
            type: 'frustration',
            observations: ['$message', 'Context: $context', 'Level: $frustration_level', 'Score: $frustration_score']
        });
        " >/dev/null 2>&1 || true
    fi
}

suggest_solution() {
    local frustration_id="$1"
    local frustration_file="$FRUSTRATION_DIR/sessions/${frustration_id}.json"
    
    if [ ! -f "$frustration_file" ]; then
        echo -e "${RED}Error:${NC} Frustration $frustration_id not found"
        return 1
    fi
    
    echo -e "${BLUE}💡 Generating solutions for:${NC} $frustration_id"
    
    # Extract frustration info
    local patterns=($(jq -r '.detected_patterns[]' "$frustration_file" 2>/dev/null))
    local gpzh_context=$(jq -r '.gpzh_context' "$frustration_file")
    local context=$(jq -r '.context' "$frustration_file")
    
    local solutions=()
    
    # GPZH-specific solutions first
    if [ "$gpzh_context" = "gpzh_specific" ]; then
        init_patterns
        local message_lower=$(jq -r '.message' "$frustration_file" | tr '[:upper:]' '[:lower:]')
        
        # Check each GPZH solution
        if echo "$message_lower" | grep -qiE "(demo|presentation|35|minute)"; then
            local solution=$(get_gpzh_solution "demo_prep")
            [ -n "$solution" ] && solutions+=("$solution")
        fi
        if echo "$message_lower" | grep -qiE "(form|submit|validation|feedback)"; then
            local solution=$(get_gpzh_solution "forms_issues")
            [ -n "$solution" ] && solutions+=("$solution")
        fi
        if echo "$message_lower" | grep -qiE "(swiss|compliance|ech|accessibility)"; then
            local solution=$(get_gpzh_solution "compliance")
            [ -n "$solution" ] && solutions+=("$solution")
        fi
        if echo "$message_lower" | grep -qiE "(slow|performance|timeout|vitals)"; then
            local solution=$(get_gpzh_solution "performance")
            [ -n "$solution" ] && solutions+=("$solution")
        fi
        if echo "$message_lower" | grep -qiE "(theme|bruchtal|styling|css)"; then
            local solution=$(get_gpzh_solution "bruchtal_theme")
            [ -n "$solution" ] && solutions+=("$solution")
        fi
        if echo "$message_lower" | grep -qiE "(ddev|environment|container|docker)"; then
            local solution=$(get_gpzh_solution "ddev_issues")
            [ -n "$solution" ] && solutions+=("$solution")
        fi
    fi
    
    # Pattern-based solutions
    for pattern in "${patterns[@]}"; do
        case "$pattern" in
            "repeated_errors")
                solutions+=("Use .claude/scripts/failure-to-knowledge.sh to convert errors into prevention patterns")
                solutions+=("Check logs with: ddev logs --follow")
                ;;
            "time_pressure")
                solutions+=("Use automated workflows: ./claude/gpzh-workflows.sh <workflow>")
                solutions+=("Focus on MVP: identify critical features only")
                ;;
            "confusion")
                solutions+=("Check project documentation in CLAUDE.md")
                solutions+=("Use specialized agents: @drupal-solution-architect for guidance")
                ;;
            "complexity")
                solutions+=("Break down into smaller tasks using TodoWrite tool")
                solutions+=("Use three-lane development for parallel work")
                ;;
            "documentation")
                solutions+=("Search codebase: use Grep tool for examples")
                solutions+=("Check Drupal.org documentation")
                ;;
            "performance")
                solutions+=("Run performance audit: ddev exec npm run test:performance")
                solutions+=("Check Core Web Vitals: ./claude/gpzh-workflows.sh performance")
                ;;
        esac
    done
    
    # Context-specific solutions
    case "$context" in
        "development"|"coding")
            solutions+=("Use git status and git diff to understand changes")
            solutions+=("Test in isolation: create minimal reproduction case")
            ;;
        "demo"|"presentation")
            solutions+=("Run full demo preparation: ./claude/gpzh-workflows.sh demo")
            solutions+=("Test all demo scenarios before presentation")
            ;;
        "deployment"|"production")
            solutions+=("Check environment: ddev describe")
            solutions+=("Validate configuration: ddev drush cst")
            ;;
    esac
    
    # Remove duplicates and add general solutions
    solutions+=("Clear caches: ddev drush cr")
    solutions+=("Restart environment: ddev restart")
    solutions+=("Check system status: ddev status")
    
    # Update frustration record with solutions
    local unique_solutions=($(printf '%s\n' "${solutions[@]}" | sort -u))
    local temp_file=$(mktemp)
    jq --argjson sols "$(printf '%s\n' "${unique_solutions[@]}" | jq -R . | jq -s .)" \
       '.suggested_solutions = $sols' \
       "$frustration_file" > "$temp_file" && mv "$temp_file" "$frustration_file"
    
    # Display solutions
    echo -e "${GREEN}Suggested solutions:${NC}"
    for i in "${!unique_solutions[@]}"; do
        echo "  $((i+1)). ${unique_solutions[$i]}"
    done
}

analyze_conversation() {
    local conversation_file="$1"
    
    if [ ! -f "$conversation_file" ]; then
        echo -e "${RED}Error:${NC} Conversation file not found: $conversation_file"
        return 1
    fi
    
    echo -e "${BLUE}📖 Analyzing conversation for frustration patterns...${NC}"
    
    # Count frustration indicators
    local error_count=$(grep -ciE "(error|fail|broken|not work)" "$conversation_file" 2>/dev/null || echo "0")
    local confusion_count=$(grep -ciE "(don't understand|confused|unclear|how do|what does)" "$conversation_file" 2>/dev/null || echo "0")
    local urgency_count=$(grep -ciE "(urgent|quickly|asap|deadline)" "$conversation_file" 2>/dev/null || echo "0")
    local gpzh_count=$(grep -ciE "(demo|bruchtal|forms|swiss|compliance)" "$conversation_file" 2>/dev/null || echo "0")
    
    local total_frustration=$((error_count + confusion_count + urgency_count))
    
    echo -e "${YELLOW}Conversation Analysis:${NC}"
    echo "  Error/failure mentions: $error_count"
    echo "  Confusion indicators: $confusion_count"  
    echo "  Urgency indicators: $urgency_count"
    echo "  GPZH context mentions: $gpzh_count"
    echo "  Total frustration score: $total_frustration"
    
    if [ $total_frustration -gt 5 ]; then
        echo -e "${RED}⚠️  High frustration conversation detected${NC}"
        echo -e "${BLUE}💡 Recommended actions:${NC}"
        echo "  • Break down complex tasks into smaller steps"
        echo "  • Use automated workflows for GPZH tasks"
        echo "  • Focus on documentation and clear communication"
    elif [ $total_frustration -gt 2 ]; then
        echo -e "${YELLOW}⚡ Moderate frustration detected${NC}"
        echo -e "${BLUE}💡 Consider:${NC}"
        echo "  • Provide clearer explanations"
        echo "  • Use specialized agents for complex tasks"
    else
        echo -e "${GREEN}✓ Conversation appears frustration-free${NC}"
    fi
}

train_detector() {
    echo -e "${BLUE}🎓 Training frustration detector...${NC}"
    
    # Analyze all previous frustration sessions
    local total_sessions=$(find "$FRUSTRATION_DIR/sessions" -name "*.json" 2>/dev/null | wc -l || echo "0")
    
    if [ "$total_sessions" -eq 0 ]; then
        echo -e "${YELLOW}No training data found. Start using the detector to collect data.${NC}"
        return 0
    fi
    
    echo "  Analyzing $total_sessions frustration sessions..."
    
    # Pattern frequency analysis
    local patterns_file=$(mktemp)
    find "$FRUSTRATION_DIR/sessions" -name "*.json" -exec jq -r '.detected_patterns[]' {} \; 2>/dev/null | sort | uniq -c | sort -nr > "$patterns_file"
    
    echo -e "${YELLOW}Most common frustration patterns:${NC}"
    head -10 "$patterns_file" | while read count pattern; do
        echo "  $pattern: $count occurrences"
    done
    
    # Context analysis  
    echo -e "${YELLOW}Frustration by context:${NC}"
    find "$FRUSTRATION_DIR/sessions" -name "*.json" -exec jq -r '.context' {} \; 2>/dev/null | sort | uniq -c | sort -nr | head -5
    
    # GPZH-specific patterns
    local gpzh_sessions=$(find "$FRUSTRATION_DIR/sessions" -name "*.json" -exec jq -r 'select(.gpzh_context == "gpzh_specific") | .id' {} \; 2>/dev/null | wc -l || echo "0")
    echo -e "${YELLOW}GPZH-specific frustrations:${NC} $gpzh_sessions sessions"
    
    # Create training summary
    local training_file="$FRUSTRATION_DIR/patterns/training_$(date '+%Y%m%d_%H%M%S').json"
    cat > "$training_file" << EOF
{
  "timestamp": "$(date -Iseconds)",
  "total_sessions": $total_sessions,
  "gpzh_sessions": $gpzh_sessions,
  "common_patterns": $(head -10 "$patterns_file" | jq -R 'split(" ") | {count: (.[0] | tonumber), pattern: (.[1:] | join(" "))}' | jq -s .),
  "recommendations": [
    "Focus on GPZH-specific automated solutions",
    "Improve documentation for common confusion patterns", 
    "Create preventive measures for repeated error patterns"
  ]
}
EOF

    echo -e "${GREEN}✓ Training complete. Results saved to:${NC} $training_file"
    rm "$patterns_file"
}

show_status() {
    echo -e "${BLUE}🎯 Frustration Detector Status${NC}"
    echo ""
    
    # Statistics
    local total_sessions=$(find "$FRUSTRATION_DIR/sessions" -name "*.json" 2>/dev/null | wc -l || echo "0")
    local high_frustrations=$(find "$FRUSTRATION_DIR/sessions" -name "*.json" -exec jq -r 'select(.frustration_level == "high" or .frustration_level == "critical") | .id' {} \; 2>/dev/null | wc -l || echo "0")
    local resolved_frustrations=$(find "$FRUSTRATION_DIR/sessions" -name "*.json" -exec jq -r 'select(.resolved == true) | .id' {} \; 2>/dev/null | wc -l || echo "0")
    local gpzh_frustrations=$(find "$FRUSTRATION_DIR/sessions" -name "*.json" -exec jq -r 'select(.gpzh_context == "gpzh_specific") | .id' {} \; 2>/dev/null | wc -l || echo "0")
    
    echo -e "${YELLOW}Statistics:${NC}"
    echo "  Total frustration sessions: $total_sessions"
    echo "  High/Critical frustrations: $high_frustrations"
    echo "  Resolved frustrations: $resolved_frustrations"
    echo "  GPZH-specific frustrations: $gpzh_frustrations"
    echo ""
    
    # Recent high frustrations
    echo -e "${YELLOW}Recent high frustrations:${NC}"
    find "$FRUSTRATION_DIR/sessions" -name "*.json" -exec jq -r 'select(.frustration_level == "high" or .frustration_level == "critical") | "\(.timestamp) - \(.frustration_level) - \(.message)"' {} \; 2>/dev/null | sort -r | head -5
    
    # Success rate
    if [ "$total_sessions" -gt 0 ]; then
        local success_rate=$((resolved_frustrations * 100 / total_sessions))
        echo ""
        echo -e "${GREEN}Resolution success rate: ${success_rate}%${NC}"
    fi
}

# Main command handling
case "${1:-}" in
    "detect")
        if [ $# -ne 3 ]; then
            echo "Error: detect requires message and context arguments"
            usage
            exit 1
        fi
        detect_frustration "$2" "$3"
        ;;
    "analyze")
        if [ $# -ne 2 ]; then
            echo "Error: analyze requires conversation file argument"
            usage
            exit 1
        fi
        analyze_conversation "$2"
        ;;
    "train")
        train_detector
        ;;
    "suggest-solution")
        if [ $# -ne 2 ]; then
            echo "Error: suggest-solution requires frustration-id argument"
            usage
            exit 1
        fi
        suggest_solution "$2"
        ;;
    "status")
        show_status
        ;;
    *)
        usage
        exit 1
        ;;
esac