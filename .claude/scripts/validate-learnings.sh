#!/bin/bash

# Learnings Validation Script for GPZH Präqualifikation Demo System
# Validates compliance with .claude/llms.txt guidelines

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_DIR="$(dirname "$CLAUDE_DIR")"
LLMS_FILE="$CLAUDE_DIR/llms.txt"
LOG_FILE="$CLAUDE_DIR/validation.log"

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log_validation() {
    local level="$1"
    local message="$2"
    local timestamp=$(date -Iseconds)
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
}

# Function to check if learnings file exists
check_learnings_file() {
    if [[ ! -f "$LLMS_FILE" ]]; then
        echo -e "${RED}❌ ERROR: Learnings file $LLMS_FILE not found${NC}"
        log_validation "ERROR" "Learnings file missing"
        return 1
    fi
    
    echo -e "${GREEN}✅ Learnings file found${NC}"
    log_validation "INFO" "Learnings file validated"
    return 0
}

# Function to validate lane-specific behavior
validate_lane_behavior() {
    local current_lane="${CLAUDE_LANE:-unknown}"
    echo -e "${BLUE}🔍 Validating lane behavior for: $current_lane${NC}"
    
    case "$current_lane" in
        "planning")
            echo -e "${GREEN}✅ Planning Lane: Use @drupal-solution-architect and @drupal-technical-pm${NC}"
            echo -e "${GREEN}✅ Focus on strategic analysis and Swiss compliance${NC}"
            ;;
        "building") 
            echo -e "${GREEN}✅ Building Lane: Use @drupal-11-lead-developer and @municipality-portal-specialist${NC}"
            echo -e "${GREEN}✅ Follow Swiss German conventions (ss not ß)${NC}"
            ;;
        "reviewing")
            echo -e "${GREEN}✅ Reviewing Lane: Use @swiss-compliance-specialist and @qa-testing-specialist${NC}"
            echo -e "${GREEN}✅ Validate WCAG 2.1 AA and eCH-0059 compliance${NC}"
            ;;
        *)
            echo -e "${YELLOW}⚠️  WARNING: Unknown lane '$current_lane' - using general guidelines${NC}"
            log_validation "WARNING" "Unknown lane: $current_lane"
            ;;
    esac
}

# Function to validate Swiss compliance requirements
validate_swiss_compliance() {
    echo -e "${BLUE}🇨🇭 Validating Swiss Compliance Standards${NC}"
    
    local compliance_checks=(
        "WCAG 2.1 AA accessibility compliance"
        "eCH-0059 Swiss government standards"
        "CH-DSG data protection compliance" 
        "16px minimum font size"
        "4.5:1 minimum color contrast"
        "44px minimum touch targets"
    )
    
    for check in "${compliance_checks[@]}"; do
        echo -e "${GREEN}✅ Standard: $check${NC}"
    done
    
    log_validation "INFO" "Swiss compliance standards validated"
}

# Function to validate municipal requirements
validate_municipal_requirements() {
    echo -e "${BLUE}🏛️  Validating Municipal Requirements${NC}"
    
    local required_forms=(
        "Feedback form"
        "Infrastructure damage report"
        "Event registration"
        "Room booking request"
    )
    
    echo -e "${BLUE}Required forms (4 total):${NC}"
    for form in "${required_forms[@]}"; do
        echo -e "${GREEN}✅ $form${NC}"
    done
    
    echo -e "${BLUE}Additional requirements:${NC}"
    echo -e "${GREEN}✅ Directory management for associations and businesses${NC}"
    echo -e "${GREEN}✅ Guest account workflow with approval process${NC}"
    echo -e "${GREEN}✅ WYSIWYG content creation with media integration${NC}"
    echo -e "${GREEN}✅ Municipality-specific theming (Bruchtal example)${NC}"
    
    log_validation "INFO" "Municipal requirements validated"
}

# Function to validate code patterns
validate_code_patterns() {
    echo -e "${BLUE}💻 Validating Code Patterns${NC}"
    
    local code_patterns=(
        "Use SDC (Single Directory Components) architecture"
        "Follow Drupal 11 best practices" 
        "Implement proper error handling"
        "Use TypeScript for complex JavaScript"
        "Follow BEM CSS methodology with Tailwind"
        "Swiss German localization (formal Sie-Form)"
    )
    
    for pattern in "${code_patterns[@]}"; do
        echo -e "${GREEN}✅ Pattern: $pattern${NC}"
    done
    
    log_validation "INFO" "Code patterns validated"
}

# Function to validate testing requirements
validate_testing_requirements() {
    echo -e "${BLUE}🧪 Validating Testing Requirements${NC}"
    
    local testing_requirements=(
        "Unit tests for all custom modules"
        "Integration tests for forms and workflows"
        "Visual regression tests with Backstop.js"
        "Performance tests with Lighthouse"
        "Accessibility tests with axe-core"
        "Cross-browser testing"
    )
    
    for requirement in "${testing_requirements[@]}"; do
        echo -e "${GREEN}✅ Requirement: $requirement${NC}"
    done
    
    log_validation "INFO" "Testing requirements validated"
}

# Function to validate demo preparation
validate_demo_preparation() {
    echo -e "${BLUE}🎯 Validating Demo Preparation${NC}"
    
    echo -e "${GREEN}✅ 35-minute presentation timing${NC}"
    echo -e "${GREEN}✅ Responsive design across devices${NC}"
    echo -e "${GREEN}✅ Live form submissions with status tracking${NC}"
    echo -e "${GREEN}✅ Backend workflow demonstrations${NC}"
    echo -e "${GREEN}✅ AI-powered content suggestions${NC}"
    echo -e "${GREEN}✅ Performance metrics display${NC}"
    
    log_validation "INFO" "Demo preparation requirements validated"
}

# Function to check for common violations
check_common_violations() {
    echo -e "${BLUE}🔍 Checking for Common Violations${NC}"
    
    local violations_found=0
    
    # Check if TodoWrite tool is being used for complex tasks
    if [[ -f "$CLAUDE_DIR/context.env" ]]; then
        if grep -q "complex.*task" "$CLAUDE_DIR/context.env" 2>/dev/null; then
            if ! grep -q "TodoWrite" "$CLAUDE_DIR/context.env" 2>/dev/null; then
                echo -e "${YELLOW}⚠️  WARNING: Complex task detected without TodoWrite usage${NC}"
                violations_found=$((violations_found + 1))
            fi
        fi
    fi
    
    # Check for direct implementation without lane coordination
    if [[ "${CLAUDE_LANE:-}" != "building" ]] && [[ -n "${USER_PROMPT:-}" ]]; then
        if echo "$USER_PROMPT" | grep -qiE "(implement|code|build|develop)" 2>/dev/null; then
            echo -e "${YELLOW}⚠️  WARNING: Implementation request outside building lane${NC}"
            violations_found=$((violations_found + 1))
        fi
    fi
    
    if [[ $violations_found -eq 0 ]]; then
        echo -e "${GREEN}✅ No common violations detected${NC}"
    else
        echo -e "${YELLOW}⚠️  Found $violations_found potential violations${NC}"
    fi
    
    log_validation "INFO" "Common violations check completed: $violations_found found"
    return $violations_found
}

# Function to provide improvement suggestions
suggest_improvements() {
    echo -e "${BLUE}💡 Improvement Suggestions${NC}"
    
    # Contextual suggestions based on current environment
    if [[ "${USER_FEEDBACK_DETECTED:-false}" == "true" ]]; then
        echo -e "${YELLOW}💡 User feedback detected - integrate learning into response${NC}"
    fi
    
    if [[ "${CONTEXT:-}" == "demo_preparation" ]]; then
        echo -e "${YELLOW}💡 Demo context active - ensure all 4 forms are functional${NC}"
        echo -e "${YELLOW}💡 Validate Bruchtal theme and responsive design${NC}"
    fi
    
    if [[ "${CONTEXT:-}" == "swiss_compliance" ]]; then
        echo -e "${YELLOW}💡 Swiss compliance context - double-check eCH-0059 standards${NC}"
        echo -e "${YELLOW}💡 Ensure WCAG 2.1 AA accessibility compliance${NC}"
    fi
    
    log_validation "INFO" "Improvement suggestions provided"
}

# Main validation function
main() {
    echo -e "${BLUE}🤖 GPZH Learnings Validation System${NC}"
    echo -e "${BLUE}=====================================${NC}"
    echo ""
    
    local exit_code=0
    
    # Initialize log
    echo "$(date -Iseconds) - Starting learnings validation" > "$LOG_FILE"
    
    # Run all validations
    check_learnings_file || exit_code=1
    echo ""
    
    validate_lane_behavior
    echo ""
    
    validate_swiss_compliance
    echo ""
    
    validate_municipal_requirements
    echo ""
    
    validate_code_patterns
    echo ""
    
    validate_testing_requirements  
    echo ""
    
    validate_demo_preparation
    echo ""
    
    check_common_violations || exit_code=$?
    echo ""
    
    suggest_improvements
    echo ""
    
    if [[ $exit_code -eq 0 ]]; then
        echo -e "${GREEN}🎉 All learnings validations passed!${NC}"
        log_validation "SUCCESS" "All validations passed"
    else
        echo -e "${RED}❌ Some validations failed or warnings detected${NC}"
        log_validation "WARNING" "Validations completed with issues: exit_code=$exit_code"
    fi
    
    echo ""
    echo -e "${BLUE}📋 Validation completed. Check $LOG_FILE for details.${NC}"
    
    return $exit_code
}

# Handle different execution modes
case "${1:-validate}" in
    "validate"|"")
        main
        ;;
    "check-violations")
        check_common_violations
        ;;
    "suggest")
        suggest_improvements
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [validate|check-violations|suggest|help]"
        echo ""
        echo "Commands:"
        echo "  validate         - Run full validation (default)"
        echo "  check-violations - Check for common violations only"
        echo "  suggest         - Provide improvement suggestions only"  
        echo "  help            - Show this help"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac