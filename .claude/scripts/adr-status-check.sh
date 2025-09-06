#!/bin/bash

# ADR Status Validation Script
# MADR 4.0.0 compliant status checking for Municipal Portal ADRs
# Usage: ddev exec .claude/scripts/adr-status-check.sh path/to/adr.md
# Usage: .claude/scripts/adr-status-check.sh path/to/adr.md --validate-all

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Global variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
VALIDATION_ERRORS=0
VALIDATION_WARNINGS=0

# Usage information
show_usage() {
    echo "ADR Status Validation Script"
    echo ""
    echo "Usage:"
    echo "  $0 <adr-file>                    # Validate single ADR"
    echo "  $0 --validate-all                # Validate all ADRs"
    echo "  $0 --status-report               # Generate status report"
    echo "  $0 --help                        # Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 .claude/adrs/adr-001-forms.md"
    echo "  ddev exec $0 .claude/adrs/adr-001-forms.md"
    echo ""
}

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
    ((VALIDATION_WARNINGS++))
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    ((VALIDATION_ERRORS++))
}

# Validate ADR file exists and is readable
validate_file_access() {
    local adr_file="$1"
    
    if [[ ! -f "$adr_file" ]]; then
        log_error "ADR file not found: $adr_file"
        return 1
    fi
    
    if [[ ! -r "$adr_file" ]]; then
        log_error "ADR file not readable: $adr_file"
        return 1
    fi
    
    return 0
}

# Extract status from ADR file
get_adr_status() {
    local adr_file="$1"
    local status
    
    # Look for various status formats
    status=$(grep -i "status.*:" "$adr_file" | head -1 | sed 's/.*:\s*//g' | tr -d '{}*`' | tr '[:upper:]' '[:lower:]' | xargs)
    
    if [[ -z "$status" ]]; then
        status=$(grep -i "**status**" "$adr_file" | head -1 | sed 's/.*:\s*//g' | tr -d '{}*`' | tr '[:upper:]' '[:lower:]' | xargs)
    fi
    
    echo "$status"
}

# Extract ADR metadata
get_adr_metadata() {
    local adr_file="$1"
    local field="$2"
    
    case "$field" in
        "title")
            grep "^# ADR-" "$adr_file" | head -1 | sed 's/^# ADR-[0-9]*: //'
            ;;
        "number")
            grep "^# ADR-" "$adr_file" | head -1 | sed 's/^# ADR-\([0-9]*\):.*/\1/'
            ;;
        "date")
            grep -i "date.*:" "$adr_file" | head -1 | sed 's/.*:\s*//g' | tr -d '*`' | xargs
            ;;
        "decision_makers")
            grep -i "decision makers.*:" "$adr_file" | head -1 | sed 's/.*:\s*//g' | tr -d '*`'
            ;;
        "template_version")
            grep -i "template version.*:" "$adr_file" | head -1 | sed 's/.*:\s*//g' | tr -d '*`'
            ;;
    esac
}

# Validate status value
validate_status_value() {
    local status="$1"
    local valid_statuses=("proposed" "accepted" "active" "deprecated" "superseded")
    
    for valid_status in "${valid_statuses[@]}"; do
        if [[ "$status" == "$valid_status" ]]; then
            return 0
        fi
    done
    
    log_error "Invalid status: '$status'. Valid statuses: ${valid_statuses[*]}"
    return 1
}

# Check required sections for status
validate_required_sections() {
    local adr_file="$1"
    local status="$2"
    local sections_found=0
    local required_sections=()
    
    case "$status" in
        "proposed")
            required_sections=("Context" "Decision" "Consequences" "Municipal Portal" "Implementation")
            ;;
        "accepted")
            required_sections=("Context" "Decision" "Consequences" "Municipal Portal" "Implementation" "Validation")
            ;;
        "active")
            required_sections=("Context" "Decision" "Consequences" "Municipal Portal" "Implementation" "Validation" "Monitoring")
            ;;
        "deprecated"|"superseded")
            required_sections=("Context" "Decision" "Consequences" "Municipal Portal" "Future Evolution" "Related Decisions")
            ;;
    esac
    
    for section in "${required_sections[@]}"; do
        if grep -q "^## .*$section" "$adr_file"; then
            ((sections_found++))
        else
            log_warning "Missing section for $status status: '$section'"
        fi
    done
    
    log_info "Found $sections_found/${#required_sections[@]} required sections for $status status"
}

# Validate Swiss compliance sections
validate_swiss_compliance() {
    local adr_file="$1"
    local compliance_found=0
    local compliance_errors=0
    
    log_info "Validating Swiss Government compliance sections..."
    
    # WCAG 2.1 AA Accessibility Compliance
    if grep -q -i -E "WCAG|accessibility|a11y" "$adr_file"; then
        if grep -q -i "WCAG 2\.1 AA\|WCAG2\.1AA" "$adr_file"; then
            log_success "✅ WCAG 2.1 AA accessibility compliance documented"
            ((compliance_found++))
        else
            log_warning "⚠️ Accessibility mentioned but WCAG 2.1 AA standard not specified"
        fi
    else
        log_error "❌ WCAG 2.1 AA accessibility compliance not addressed"
        ((compliance_errors++))
    fi
    
    # CH-DSG Data Protection
    if grep -q -i -E "CH-DSG|data protection|privacy|datenschutz" "$adr_file"; then
        if grep -q -i "CH-DSG\|Swiss.*data" "$adr_file"; then
            log_success "✅ CH-DSG data protection compliance documented"
            ((compliance_found++))
        else
            log_warning "⚠️ Data protection mentioned but CH-DSG standard not specified"
        fi
    else
        log_error "❌ CH-DSG data protection compliance not addressed"
        ((compliance_errors++))
    fi
    
    # eCH-0059 E-Government Standards
    if grep -q -i -E "eCH|e-government|egovernment" "$adr_file"; then
        if grep -q -i "eCH-0059\|eCH.*0059" "$adr_file"; then
            log_success "✅ eCH-0059 e-government standards documented"
            ((compliance_found++))
        else
            log_warning "⚠️ E-government mentioned but eCH-0059 standard not specified"
        fi
    else
        log_warning "⚠️ eCH-0059 e-government standards not addressed"
    fi
    
    # Multilingual Support (German/French/Italian)
    local lang_count=0
    if grep -q -i -E "german|deutsch" "$adr_file"; then ((lang_count++)); fi
    if grep -q -i -E "french|français|französ" "$adr_file"; then ((lang_count++)); fi
    if grep -q -i -E "italian|italiano" "$adr_file"; then ((lang_count++)); fi
    
    if [[ $lang_count -ge 2 ]]; then
        log_success "✅ Multilingual support documented ($lang_count languages)"
        ((compliance_found++))
    elif [[ $lang_count -eq 1 ]]; then
        log_warning "⚠️ Limited multilingual documentation (only 1 language mentioned)"
    else
        log_warning "⚠️ Swiss multilingual requirements not addressed"
    fi
    
    # Canton Zürich specific requirements
    if grep -q -i -E "zürich|zurich|canton|kanton" "$adr_file"; then
        log_success "✅ Canton Zürich considerations documented"
        ((compliance_found++))
    else
        log_warning "⚠️ Canton Zürich specific considerations not mentioned"
    fi
    
    # Overall compliance assessment
    local total_areas=5
    if [[ $compliance_found -ge 4 ]]; then
        log_success "Swiss compliance: Excellent ($compliance_found/$total_areas areas covered)"
    elif [[ $compliance_found -ge 3 ]]; then
        log_success "Swiss compliance: Good ($compliance_found/$total_areas areas covered)"
    elif [[ $compliance_found -ge 2 ]]; then
        log_warning "Swiss compliance: Partial ($compliance_found/$total_areas areas covered)"
    else
        log_error "Swiss compliance: Insufficient ($compliance_found/$total_areas areas covered)"
    fi
    
    return $compliance_errors
}

# Validate multi-municipality considerations
validate_multi_municipality() {
    local adr_file="$1"
    local municipalities=("Thalwil" "Thalheim" "Erlenbach")
    local municipality_mentions=0
    
    for municipality in "${municipalities[@]}"; do
        if grep -q -i "$municipality" "$adr_file"; then
            ((municipality_mentions++))
        fi
    done
    
    if [[ $municipality_mentions -gt 0 ]]; then
        log_success "Multi-municipality considerations documented ($municipality_mentions municipalities mentioned)"
    else
        log_warning "Multi-municipality impact not documented"
    fi
}

# Check for stakeholder identification using Municipal Portal patterns
validate_stakeholders() {
    local adr_file="$1"
    local stakeholder_categories=0
    local stakeholder_details=0
    
    log_info "Validating Municipal Portal stakeholder identification..."
    
    # Primary Stakeholder Categories (5 categories)
    local categories=("Citizens" "Municipal.*Officials\|Municipal.*Staff" "Technical.*Team\|Development.*Team" "Compliance.*Officer" "External.*Partner")
    local category_names=("Citizens" "Municipal Officials" "Technical Team" "Compliance Officers" "External Partners")
    
    for i in "${!categories[@]}"; do
        if grep -q -i -E "${categories[$i]}" "$adr_file"; then
            log_success "✅ ${category_names[$i]} stakeholder category identified"
            ((stakeholder_categories++))
        fi
    done
    
    # Check for stakeholder sub-categories and details
    local subcategories=("elderly.*citizen\|disability\|disabilities" "department.*head\|front.*line\|administrative.*staff" "architect\|developer\|devops\|qa" "data.*protection.*officer\|DPO\|legal.*counsel" "canton\|municipality\|hosting.*provider")
    
    for subcategory in "${subcategories[@]}"; do
        if grep -q -i -E "$subcategory" "$adr_file"; then
            ((stakeholder_details++))
        fi
    done
    
    # Check for specific Municipal Portal stakeholders
    local municipal_specific=0
    if grep -q -i -E "accessibility.*specialist\|WCAG.*specialist" "$adr_file"; then
        log_success "✅ Accessibility specialist identified"
        ((municipal_specific++))
    fi
    
    if grep -q -i -E "translation.*coordinator\|multilingual.*coordinator" "$adr_file"; then
        log_success "✅ Multilingual coordinator identified"
        ((municipal_specific++))
    fi
    
    if grep -q -i -E "canton.*representative\|zürich.*representative" "$adr_file"; then
        log_success "✅ Canton representative identified"
        ((municipal_specific++))
    fi
    
    # Check for stakeholder engagement patterns
    local engagement_patterns=0
    if grep -q -i -E "consultation\|feedback\|review\|approval" "$adr_file"; then
        ((engagement_patterns++))
    fi
    
    if grep -q -i -E "user.*testing\|acceptance.*testing\|pilot.*testing" "$adr_file"; then
        ((engagement_patterns++))
    fi
    
    if grep -q -i -E "training\|communication.*plan\|notification" "$adr_file"; then
        ((engagement_patterns++))
    fi
    
    # Assessment and reporting
    if [[ $stakeholder_categories -ge 4 ]]; then
        log_success "Stakeholder coverage: Excellent ($stakeholder_categories/5 categories identified)"
    elif [[ $stakeholder_categories -ge 3 ]]; then
        log_success "Stakeholder coverage: Good ($stakeholder_categories/5 categories identified)"
    elif [[ $stakeholder_categories -ge 2 ]]; then
        log_warning "Stakeholder coverage: Partial ($stakeholder_categories/5 categories identified)"
    else
        log_error "Stakeholder coverage: Insufficient ($stakeholder_categories/5 categories identified)"
    fi
    
    if [[ $stakeholder_details -gt 0 ]]; then
        log_success "Detailed stakeholder analysis: $stakeholder_details subcategories documented"
    else
        log_warning "Limited detailed stakeholder analysis"
    fi
    
    if [[ $municipal_specific -gt 0 ]]; then
        log_success "Municipal-specific stakeholders: $municipal_specific specialized roles identified"
    else
        log_warning "Municipal-specific stakeholder roles not clearly identified"
    fi
    
    if [[ $engagement_patterns -ge 2 ]]; then
        log_success "Stakeholder engagement patterns: Well documented"
    elif [[ $engagement_patterns -eq 1 ]]; then
        log_warning "Stakeholder engagement patterns: Basic documentation"
    else
        log_error "Stakeholder engagement patterns: Not documented"
    fi
}

# Validate ADR cross-references
validate_cross_references() {
    local adr_file="$1"
    
    if grep -q "ADR-[0-9]" "$adr_file" || grep -q "Related.*Decision" "$adr_file"; then
        log_success "Cross-references to other ADRs found"
    else
        log_warning "No cross-references to related ADRs found"
    fi
}

# Validate MADR 4.0.0 template compliance
validate_madr_compliance() {
    local adr_file="$1"
    local madr_score=0
    local madr_errors=0
    
    log_info "Validating MADR 4.0.0 template compliance..."
    
    # Check template version declaration
    local template_version=$(get_adr_metadata "$adr_file" "template_version")
    if [[ "$template_version" == *"MADR 4.0.0"* ]]; then
        log_success "✅ MADR 4.0.0 template version declared"
        ((madr_score++))
    else
        log_error "❌ MADR 4.0.0 template version not declared"
        ((madr_errors++))
    fi
    
    # Check for MADR 4.0.0 required sections
    local madr_sections=("Metadata" "Context.*Problem.*Statement\|Problem.*Statement" "Considered.*Options\|Options.*Considered" "Decision.*Outcome" "Consequences")
    local madr_section_names=("Metadata" "Context and Problem Statement" "Considered Options" "Decision Outcome" "Consequences")
    
    for i in "${!madr_sections[@]}"; do
        if grep -q -E "^## ${madr_sections[$i]}" "$adr_file"; then
            log_success "✅ ${madr_section_names[$i]} section found"
            ((madr_score++))
        else
            log_error "❌ ${madr_section_names[$i]} section missing"
            ((madr_errors++))
        fi
    done
    
    # Check for decision drivers
    if grep -q -i -E "decision.*driver|driver.*factor" "$adr_file"; then
        log_success "✅ Decision drivers documented"
        ((madr_score++))
    else
        log_warning "⚠️ Decision drivers not clearly documented"
    fi
    
    # Check for options analysis
    if grep -q -i -E "pros.*and.*cons|advantages.*disadvantages" "$adr_file"; then
        log_success "✅ Options pros/cons analysis found"
        ((madr_score++))
    else
        log_warning "⚠️ Options pros/cons analysis not found"
    fi
    
    # Check for status workflow compliance
    local status=$(get_adr_status "$adr_file")
    local valid_madr_statuses=("proposed" "accepted" "active" "deprecated" "superseded")
    local status_valid=false
    
    for valid_status in "${valid_madr_statuses[@]}"; do
        if [[ "$status" == "$valid_status" ]]; then
            status_valid=true
            break
        fi
    done
    
    if [[ "$status_valid" == true ]]; then
        log_success "✅ MADR 4.0.0 status workflow compliance"
        ((madr_score++))
    else
        log_error "❌ Status not compliant with MADR 4.0.0 workflow"
        ((madr_errors++))
    fi
    
    # Check for related decisions section (MADR 4.0.0 enhancement)
    if grep -q -E "^## Related.*Decision" "$adr_file"; then
        log_success "✅ Related Decisions section found (MADR 4.0.0 enhancement)"
        ((madr_score++))
    else
        log_warning "⚠️ Related Decisions section not found"
    fi
    
    # Overall MADR compliance assessment
    local total_madr_requirements=9
    if [[ $madr_score -ge 7 ]]; then
        log_success "MADR 4.0.0 compliance: Excellent ($madr_score/$total_madr_requirements)"
    elif [[ $madr_score -ge 5 ]]; then
        log_success "MADR 4.0.0 compliance: Good ($madr_score/$total_madr_requirements)"
    elif [[ $madr_score -ge 3 ]]; then
        log_warning "MADR 4.0.0 compliance: Partial ($madr_score/$total_madr_requirements)"
    else
        log_error "MADR 4.0.0 compliance: Insufficient ($madr_score/$total_madr_requirements)"
    fi
    
    return $madr_errors
}

# Main validation function for single ADR
validate_adr() {
    local adr_file="$1"
    local filename=$(basename "$adr_file")
    
    log_info "Validating ADR: $filename"
    echo "=================================="
    
    # Basic file validation
    if ! validate_file_access "$adr_file"; then
        return 1
    fi
    
    # Extract and validate status
    local status=$(get_adr_status "$adr_file")
    local title=$(get_adr_metadata "$adr_file" "title")
    local date=$(get_adr_metadata "$adr_file" "date")
    
    log_info "Title: $title"
    log_info "Status: $status"
    log_info "Date: $date"
    
    if [[ -z "$status" ]]; then
        log_error "No status found in ADR"
        return 1
    fi
    
    # Validate status value
    if ! validate_status_value "$status"; then
        return 1
    fi
    
    log_success "Status '$status' is valid"
    
    # Status-specific validations
    log_info "Validating requirements for '$status' status..."
    
    validate_required_sections "$adr_file" "$status"
    validate_swiss_compliance "$adr_file"
    validate_multi_municipality "$adr_file"
    validate_stakeholders "$adr_file"
    validate_cross_references "$adr_file"
    
    # MADR 4.0.0 template validation
    validate_madr_compliance "$adr_file"
    
    echo ""
    
    return 0
}

# Validate all ADRs in project
validate_all_adrs() {
    log_info "Validating all ADRs in project..."
    echo "=================================="
    
    local adr_files
    mapfile -t adr_files < <(find "$PROJECT_ROOT" -name "adr-*.md" -o -name "ADR-*.md" | sort)
    
    if [[ ${#adr_files[@]} -eq 0 ]]; then
        log_warning "No ADR files found in project"
        return 1
    fi
    
    log_info "Found ${#adr_files[@]} ADR files"
    echo ""
    
    local processed=0
    local failed=0
    
    for adr_file in "${adr_files[@]}"; do
        if validate_adr "$adr_file"; then
            ((processed++))
        else
            ((failed++))
        fi
    done
    
    echo "=================================="
    log_info "Validation Summary:"
    log_info "  Processed: $processed ADRs"
    log_info "  Failed: $failed ADRs"
    log_info "  Warnings: $VALIDATION_WARNINGS"
    log_info "  Errors: $VALIDATION_ERRORS"
    
    if [[ $failed -eq 0 && $VALIDATION_ERRORS -eq 0 ]]; then
        log_success "All ADRs validation passed!"
        return 0
    else
        log_error "ADR validation completed with issues"
        return 1
    fi
}

# Generate status report
generate_status_report() {
    log_info "Generating ADR Status Report..."
    echo "=================================="
    
    local adr_files
    mapfile -t adr_files < <(find "$PROJECT_ROOT" -name "adr-*.md" -o -name "ADR-*.md" | sort)
    
    if [[ ${#adr_files[@]} -eq 0 ]]; then
        log_warning "No ADR files found in project"
        return 1
    fi
    
    # Status counters
    declare -A status_counts
    status_counts["proposed"]=0
    status_counts["accepted"]=0
    status_counts["active"]=0
    status_counts["deprecated"]=0
    status_counts["superseded"]=0
    status_counts["unknown"]=0
    
    echo "ADR Status Report"
    echo "-----------------"
    printf "%-60s %-12s %-12s\n" "ADR File" "Status" "Date"
    echo "$(printf '%-60s %-12s %-12s\n' '' '' '' | tr ' ' '-')"
    
    for adr_file in "${adr_files[@]}"; do
        local filename=$(basename "$adr_file")
        local status=$(get_adr_status "$adr_file")
        local date=$(get_adr_metadata "$adr_file" "date")
        
        [[ -z "$status" ]] && status="unknown"
        [[ -z "$date" ]] && date="N/A"
        
        printf "%-60s %-12s %-12s\n" "$filename" "$status" "$date"
        
        if [[ -n "${status_counts[$status]}" ]]; then
            ((status_counts["$status"]++))
        else
            ((status_counts["unknown"]++))
        fi
    done
    
    echo ""
    echo "Status Summary:"
    echo "---------------"
    for status in "proposed" "accepted" "active" "deprecated" "superseded" "unknown"; do
        if [[ ${status_counts[$status]} -gt 0 ]]; then
            printf "%-12s: %d\n" "$status" "${status_counts[$status]}"
        fi
    done
    
    echo ""
    log_info "Total ADRs: ${#adr_files[@]}"
}

# Main script logic
main() {
    case "${1:-}" in
        --help|-h)
            show_usage
            exit 0
            ;;
        --validate-all)
            validate_all_adrs
            exit $?
            ;;
        --status-report)
            generate_status_report
            exit $?
            ;;
        "")
            show_usage
            exit 1
            ;;
        *)
            if [[ -f "$1" ]]; then
                validate_adr "$1"
                exit $?
            else
                log_error "File not found: $1"
                show_usage
                exit 1
            fi
            ;;
    esac
}

# Run main function with all arguments
main "$@"