#!/bin/bash

# Specialized Frustration Detector Agent
# Detects real user frustration and documents it in CLAUDE.md
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
    echo "Usage: $0 <user-prompt>"
    echo ""
    echo "Detects frustration in user prompts and updates CLAUDE.md with learnings"
    echo ""
    echo "Examples:"
    echo "  $0 'This is not working again, I need it fixed now!'"
    echo "  $0 'Warum funktioniert das nicht? Das ist frustrierend!'"
}

# Advanced frustration detection patterns
detect_frustration_level() {
    local message="$1"
    local message_lower=$(echo "$message" | tr '[:upper:]' '[:lower:]')
    local score=0
    local patterns=()
    
    # High-impact frustration indicators (3 points each)
    if echo "$message_lower" | grep -qiE "(not working again|still broken|keep failing|broken again|immer noch kaputt|schon wieder|geht immer noch nicht)"; then
        score=$((score + 3))
        patterns+=("repeated_failure")
    fi
    
    if echo "$message_lower" | grep -qiE "(need.* now|urgent|asap|sofort|jetzt|dringend|schnell)"; then
        score=$((score + 3))
        patterns+=("time_pressure")
    fi
    
    if echo "$message_lower" | grep -qiE "(stupid|dumb|ridiculous|shit|fuck|verdammt|scheisse|blöd|dumm)"; then
        score=$((score + 3))
        patterns+=("strong_negative_emotion")
    fi
    
    # Medium-impact indicators (2 points each)  
    if echo "$message_lower" | grep -qiE "(frustrating|annoying|irritating|frustrierend|nervig|ätzend)"; then
        score=$((score + 2))
        patterns+=("explicit_frustration")
    fi
    
    if echo "$message_lower" | grep -qiE "(why.*(not|doesn't)|what's wrong|was ist los|warum.* nicht|was läuft falsch)"; then
        score=$((score + 2))
        patterns+=("confusion_frustration")
    fi
    
    if echo "$message_lower" | grep -qiE "(told you|said before|bereits gesagt|schon erwähnt|hab.* schon)"; then
        score=$((score + 2))
        patterns+=("repetition_frustration")
    fi
    
    # Low-impact indicators (1 point each)
    if echo "$message_lower" | grep -qiE "(error|fail|broken|problem|issue|fehler|kaputt|problem)"; then
        score=$((score + 1))
        patterns+=("technical_issues")
    fi
    
    if echo "$message_lower" | grep -qiE "(don't understand|unclear|confusing|verstehe nicht|unklar|verwirrend)"; then
        score=$((score + 1))
        patterns+=("confusion")
    fi
    
    # German-specific frustration expressions (2 points each)
    if echo "$message_lower" | grep -qiE "(oh mann|echt jetzt|ne oder|ey|mensch|alter|boah)"; then
        score=$((score + 2))
        patterns+=("german_frustration_expressions")
    fi
    
    # GPZH-specific frustration (extra weight)
    if echo "$message_lower" | grep -qiE "(demo|bruchtal|presentation|forms|drupal|ddev|präsentation)"; then
        score=$((score + 1))
        patterns+=("gpzh_context")
    fi
    
    # Determine frustration level
    local level="none"
    if [ $score -ge 8 ]; then
        level="critical"
    elif [ $score -ge 5 ]; then
        level="high" 
    elif [ $score -ge 3 ]; then
        level="medium"
    elif [ $score -ge 1 ]; then
        level="low"
    fi
    
    echo "$level:$score:$(IFS=,; echo "${patterns[*]}")"
}

# Extract the specific problem from the frustration
extract_problem() {
    local message="$1"
    local message_lower=$(echo "$message" | tr '[:upper:]' '[:lower:]')
    
    # Try to identify the core issue
    if echo "$message_lower" | grep -qiE "(form.*(not|doesn't)|formular.*(nicht|geht nicht))"; then
        echo "Form functionality issues"
    elif echo "$message_lower" | grep -qiE "(ddev|docker|container)"; then
        echo "Development environment problems"  
    elif echo "$message_lower" | grep -qiE "(drupal|module|config)"; then
        echo "Drupal configuration issues"
    elif echo "$message_lower" | grep -qiE "(theme|css|styling|design)"; then
        echo "Frontend/theming problems"
    elif echo "$message_lower" | grep -qiE "(demo|presentation|bruchtal)"; then
        echo "Demo preparation challenges"
    elif echo "$message_lower" | grep -qiE "(swiss|compliance|ech|accessibility)"; then
        echo "Swiss compliance requirements"
    elif echo "$message_lower" | grep -qiE "(performance|slow|timeout)"; then
        echo "Performance optimization needed"
    else
        echo "General development frustration"
    fi
}

# Generate immediate solution
generate_solution() {
    local problem="$1"
    local patterns="$2"
    
    case "$problem" in
        "Form functionality issues")
            echo "- Run form validation: ddev drush webform:repair"
            echo "- Test specific form: Use Playwright for automated form testing"
            echo "- Check form configuration: Review webform settings in admin"
            ;;
        "Development environment problems")
            echo "- Restart environment: ddev restart"
            echo "- Check logs: ddev logs --follow"
            echo "- Verify setup: ddev describe"
            ;;
        "Drupal configuration issues")  
            echo "- Clear caches: ddev drush cr"
            echo "- Import config: ddev drush cim" 
            echo "- Check status: ddev drush status"
            ;;
        "Frontend/theming problems")
            echo "- Rebuild theme: ddev theme build"
            echo "- Start dev server: ddev theme dev"
            echo "- Check component library: ddev theme storybook"
            ;;
        "Demo preparation challenges")
            echo "- Run demo checklist: Review CLAUDE.md demo preparation section"
            echo "- Test all forms: Validate 4 required demo forms work"
            echo "- Performance check: Run Core Web Vitals audit"
            ;;
        "Swiss compliance requirements")
            echo "- Run accessibility audit: Use mcp__a11y-accessibility tools"
            echo "- Validate eCH standards: Check Swiss compliance patterns"
            echo "- Review documentation: Check CLAUDE.md compliance section"
            ;;
        "Performance optimization needed")
            echo "- Audit performance: Run lighthouse audit"
            echo "- Check Core Web Vitals: Use browser audit tools"
            echo "- Optimize assets: Review theme build process"
            ;;
        *)
            echo "- Check project documentation: Review CLAUDE.md"
            echo "- Use specialized agents: @drupal-solution-architect for guidance"
            echo "- Break down the problem: Use TodoWrite tool for task management"
            ;;
    esac
    
    # Add pattern-specific solutions
    if echo "$patterns" | grep -q "repeated_failure"; then
        echo "- Document pattern: Add to CLAUDE.md Failure-to-Knowledge section"
        echo "- Create test: Prevent this failure from recurring"
    fi
    
    if echo "$patterns" | grep -q "time_pressure"; then
        echo "- Focus on MVP: Identify critical features only"  
        echo "- Use automation: Leverage existing workflows"
    fi
    
    if echo "$patterns" | grep -q "german_frustration"; then
        echo "- Lass uns das systematisch angehen (Let's approach this systematically)"
        echo "- Pause and breathe: Complex problems need structured solutions"
    fi
}

# Update CLAUDE.md with the frustration learning
update_claude_md() {
    local problem="$1" 
    local level="$2"
    local score="$3"
    local solution="$4"
    local timestamp=$(date '+%Y-%m-%d %H:%M')
    
    # Create the learning entry
    local learning_entry="#### Frustration Detected: $problem
- **Level**: $level (score: $score)
- **Detected**: $timestamp  
- **Immediate Solutions Applied**:
$solution
- **Rule**: Monitor this pattern for recurring issues → Create preventive measures"
    
    # Add to the Failure-to-Knowledge Conversions section
    if ! grep -q "#### Frustration Detected:" "$CLAUDE_MD" 2>/dev/null; then
        # Add new section if it doesn't exist
        local temp_file=$(mktemp)
        awk '
        /^### Failure-to-Knowledge Conversions/ {
            print $0
            print "*Every bug becomes permanent prevention knowledge*"
            print ""
            print "#### Known Issues → Tests → Rules"
            getline; print $0
            print ""
            print "'"$learning_entry"'"
            print ""
            next
        }
        { print }
        ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
    else
        # Insert before the existing Known Issues section
        local temp_file=$(mktemp)
        awk '
        /^#### Known Issues → Tests → Rules/ {
            print "'"$learning_entry"'"
            print ""
        }
        { print }
        ' "$CLAUDE_MD" > "$temp_file" && mv "$temp_file" "$CLAUDE_MD"
    fi
    
    echo -e "${GREEN}✓ Updated CLAUDE.md with frustration learning${NC}"
}

# Main frustration detection logic
main() {
    if [ $# -eq 0 ] || [ -z "$1" ]; then
        echo -e "${YELLOW}No user prompt provided - skipping frustration detection${NC}"
        exit 0
    fi
    
    local user_prompt="$1"
    
    # Skip very short prompts (likely not meaningful)
    if [ ${#user_prompt} -lt 10 ]; then
        exit 0
    fi
    
    echo -e "${PURPLE}🔍 Analyzing user prompt for frustration patterns...${NC}"
    
    # Detect frustration
    local detection_result=$(detect_frustration_level "$user_prompt")
    local level=$(echo "$detection_result" | cut -d: -f1)
    local score=$(echo "$detection_result" | cut -d: -f2)  
    local patterns=$(echo "$detection_result" | cut -d: -f3)
    
    # Only process if frustration detected
    if [ "$level" = "none" ] || [ "$score" -eq 0 ]; then
        echo -e "${GREEN}✓ No significant frustration detected${NC}"
        exit 0
    fi
    
    # Display detection results
    case "$level" in
        "critical")
            echo -e "${RED}🚨 CRITICAL FRUSTRATION DETECTED${NC}"
            ;;
        "high")  
            echo -e "${RED}⚠️  HIGH FRUSTRATION DETECTED${NC}"
            ;;
        "medium")
            echo -e "${YELLOW}⚡ MEDIUM FRUSTRATION DETECTED${NC}"
            ;;
        "low")
            echo -e "${BLUE}ℹ️  LOW FRUSTRATION DETECTED${NC}"
            ;;
    esac
    
    echo -e "  Score: $score"
    echo -e "  Patterns: $patterns"
    
    # Extract the core problem
    local problem=$(extract_problem "$user_prompt")
    echo -e "  Problem: $problem"
    
    # Generate immediate solutions  
    echo -e "${BLUE}🔧 Generating immediate solutions...${NC}"
    local solution=$(generate_solution "$problem" "$patterns")
    echo -e "${solution}"
    
    # Update CLAUDE.md with learning (only for medium+ frustrations)
    if [ "$level" != "low" ]; then
        update_claude_md "$problem" "$level" "$score" "$solution"
        echo -e "${GREEN}📝 Documented frustration in CLAUDE.md for compounding learning${NC}"
    fi
    
    echo ""
    echo -e "${PURPLE}This frustration detection helps improve the system - every frustration becomes better documentation and prevention.${NC}"
}

# Run main function
main "$@"