#!/bin/bash
# validate-sdc-compliance.sh
# Comprehensive Single Directory Component compliance validation suite
# Orchestrates all validation scripts for slot standardization framework
# Based on CLAUDE.md Prevention Rule #21: Slot Standardization Framework

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_DIR="$(dirname "$SCRIPT_DIR")"
SCRIPTS_DIR="$SCRIPT_DIR"

# Validation results tracking
TOTAL_VIOLATIONS=0
FIELD_VIOLATIONS=0
COMPONENT_VIOLATIONS=0
TEMPLATE_VIOLATIONS=0
VALIDATION_ERRORS=0

# Performance tracking
START_TIME=$(date +%s)

echo -e "${BOLD}${CYAN}🚀 SDC Compliance Validation Suite${NC}"
echo "===================================="
echo "Comprehensive validation for slot standardization framework"
echo "Issue #56 architectural improvements validation"
echo ""
echo -e "${BLUE}📋 Validation Phases:${NC}"
echo "  1. Field Pattern Anti-Pattern Detection"
echo "  2. Component Slot Standards Validation"  
echo "  3. Template Pattern Compliance Check"
echo "  4. Performance Impact Assessment"
echo "  5. Migration Status Report"
echo ""

# Function to run validation phase with error handling
run_validation_phase() {
    local phase_name="$1"
    local script_name="$2"
    local phase_number="$3"
    
    echo -e "${BOLD}${BLUE}Phase $phase_number: $phase_name${NC}"
    echo "$(printf '=%.0s' {1..50})"
    
    local script_path="$SCRIPTS_DIR/$script_name"
    
    if [[ ! -f "$script_path" ]]; then
        echo -e "${RED}❌ ERROR: Validation script not found: $script_path${NC}"
        VALIDATION_ERRORS=$((VALIDATION_ERRORS + 1))
        return 1
    fi
    
    if [[ ! -x "$script_path" ]]; then
        echo -e "${RED}❌ ERROR: Validation script not executable: $script_path${NC}"
        VALIDATION_ERRORS=$((VALIDATION_ERRORS + 1))
        return 1
    fi
    
    # Run the validation script and capture exit code
    local exit_code=0
    "$script_path" || exit_code=$?
    
    # Parse violations from script output (assumes scripts report violation counts)
    case "$script_name" in
        "validate-field-patterns.sh")
            FIELD_VIOLATIONS=$exit_code
            ;;
        "validate-component-slots.sh")
            COMPONENT_VIOLATIONS=$exit_code
            ;;
        "validate-template-patterns.sh") 
            TEMPLATE_VIOLATIONS=$exit_code
            ;;
    esac
    
    TOTAL_VIOLATIONS=$((TOTAL_VIOLATIONS + exit_code))
    
    if [ $exit_code -eq 0 ]; then
        echo -e "${GREEN}✅ Phase $phase_number completed successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Phase $phase_number completed with $exit_code violations${NC}"
    fi
    
    echo ""
    return $exit_code
}

# Function to assess performance impact
assess_performance_impact() {
    echo -e "${BOLD}${BLUE}Phase 4: Performance Impact Assessment${NC}"
    echo "$(printf '=%.0s' {1..50})"
    
    local components_dir="$THEME_DIR/components"
    
    # Count different template patterns
    local embed_templates=$(find "$components_dir/*/templates" -name "*.twig" -exec grep -l "{% embed" {} \; 2>/dev/null | wc -l)
    local include_templates=$(find "$components_dir/*/templates" -name "*.twig" -exec grep -l "{% include" {} \; 2>/dev/null | wc -l)
    local slot_templates=$(find "$components_dir/*/templates" -name "*.twig" -exec grep -l "{% block" {} \; 2>/dev/null | wc -l)
    local field_extraction_templates=$(find "$components_dir" -name "*.twig" -exec grep -l "\.value\|\.getString\|render|striptags" {} \; 2>/dev/null | wc -l)
    
    # Count component definitions
    local total_components=$(find "$components_dir" -name "*.component.yml" | wc -l)
    local components_with_slots=$(find "$components_dir" -name "*.component.yml" -exec grep -l "slots:" {} \; 2>/dev/null | wc -l)
    
    echo "📊 Component Architecture Analysis:"
    echo "   Total Components: $total_components"
    echo "   Components with Slots: $components_with_slots ($(( components_with_slots * 100 / total_components ))%)"
    echo ""
    echo "📊 Template Pattern Distribution:"
    echo "   Embed Patterns: $embed_templates templates (optimal)"
    echo "   Include Patterns: $include_templates templates (suboptimal)"  
    echo "   Slot Block Usage: $slot_templates templates"
    echo "   Field Extraction Anti-Patterns: $field_extraction_templates templates (performance impact)"
    echo ""
    
    # Calculate performance score
    local optimal_patterns=$((embed_templates + slot_templates))
    local suboptimal_patterns=$((include_templates + field_extraction_templates))
    local total_patterns=$((optimal_patterns + suboptimal_patterns))
    
    if [ $total_patterns -gt 0 ]; then
        local performance_score=$(( optimal_patterns * 100 / total_patterns ))
        echo "🎯 Performance Score: $performance_score% (${optimal_patterns}/${total_patterns} optimal patterns)"
        
        if [ $performance_score -ge 90 ]; then
            echo -e "   ${GREEN}✅ Excellent performance profile${NC}"
        elif [ $performance_score -ge 75 ]; then
            echo -e "   ${YELLOW}⚠️  Good performance, room for improvement${NC}"
        else
            echo -e "   ${RED}❌ Performance concerns - significant optimization needed${NC}"
        fi
    fi
    
    echo ""
}

# Function to generate migration status report
generate_migration_report() {
    echo -e "${BOLD}${BLUE}Phase 5: Migration Status Report${NC}"
    echo "$(printf '='.s{1..50})"
    
    local components_dir="$THEME_DIR/components"
    
    echo "📈 Slot Standardization Migration Status:"
    echo ""
    
    # Analyze migration progress by component category
    declare -A component_groups
    component_groups[Atoms]=0
    component_groups[Molecules]=0  
    component_groups[Organisms]=0
    component_groups[Templates]=0
    
    declare -A migrated_groups
    migrated_groups[Atoms]=0
    migrated_groups[Molecules]=0
    migrated_groups[Organisms]=0
    migrated_groups[Templates]=0
    
    # Count components by group and migration status
    while IFS= read -r -d '' component_file; do
        local group=$(grep "group:" "$component_file" | sed 's/.*group:[[:space:]]*//' | tr -d '"'"'"' | xargs)
        
        if [[ -n "$group" ]]; then
            component_groups["$group"]=$((component_groups["$group"] + 1))
            
            # Check if component has slots (migrated)
            if grep -q "slots:" "$component_file"; then
                migrated_groups["$group"]=$((migrated_groups["$group"] + 1))
            fi
        fi
    done < <(find "$components_dir" -name "*.component.yml" -print0 2>/dev/null || true)
    
    # Report migration progress by group
    for group in Atoms Molecules Organisms Templates; do
        local total=${component_groups[$group]}
        local migrated=${migrated_groups[$group]}
        
        if [ $total -gt 0 ]; then
            local percentage=$(( migrated * 100 / total ))
            echo "   $group: $migrated/$total migrated (${percentage}%)"
            
            if [ $percentage -eq 100 ]; then
                echo -e "      ${GREEN}✅ Complete${NC}"
            elif [ $percentage -ge 80 ]; then
                echo -e "      ${YELLOW}🔄 Nearly complete${NC}"
            elif [ $percentage -ge 50 ]; then
                echo -e "      ${YELLOW}⚠️  In progress${NC}"
            else
                echo -e "      ${RED}❌ Needs attention${NC}"
            fi
        fi
    done
    
    echo ""
    
    # Identify specific components needing migration
    echo "🎯 Components Requiring Migration:"
    local needs_migration=false
    
    while IFS= read -r -d '' component_file; do
        if ! grep -q "slots:" "$component_file"; then
            local component_name=$(basename "$(dirname "$component_file")")
            local group=$(grep "group:" "$component_file" | sed 's/.*group:[[:space:]]*//' | tr -d '"'"'"' | xargs)
            echo "   - $component_name ($group)"
            needs_migration=true
        fi
    done < <(find "$components_dir" -name "*.component.yml" -print0 2>/dev/null || true)
    
    if [ "$needs_migration" = false ]; then
        echo -e "   ${GREEN}✅ All components have slot definitions${NC}"
    fi
    
    echo ""
}

# Function to provide fix recommendations
provide_fix_recommendations() {
    echo -e "${BOLD}${PURPLE}🔧 Fix Recommendations${NC}"
    echo "$(printf '='.s{1..50})"
    
    if [ $FIELD_VIOLATIONS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Field Pattern Issues ($FIELD_VIOLATIONS violations):${NC}"
        echo "   1. Replace paragraph.field_*.value with slot blocks"
        echo "   2. Use {{ content.field_title }} in {% block title %}"
        echo "   3. Eliminate double processing (render|striptags)"
        echo "   🔗 Reference: FIELD_TITLE_MIGRATION_GUIDE.md"
        echo ""
    fi
    
    if [ $COMPONENT_VIOLATIONS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Component Slot Issues ($COMPONENT_VIOLATIONS violations):${NC}"
        echo "   1. Add slot definitions to component.yml files"
        echo "   2. Follow atomic design slot standards"
        echo "   3. Document slot purpose and requirements"
        echo "   🔗 Reference: COMPONENT_SLOT_STANDARDS.md"
        echo ""
    fi
    
    if [ $TEMPLATE_VIOLATIONS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Template Pattern Issues ($TEMPLATE_VIOLATIONS violations):${NC}"
        echo "   1. Replace {% include %} with {% embed %} for field content"
        echo "   2. Move field content to slot blocks"
        echo "   3. Ensure component templates define matching slots"
        echo "   🔗 Reference: TEMPLATE_PATTERN_STANDARDS.md"
        echo ""
    fi
    
    if [ $TOTAL_VIOLATIONS -eq 0 ]; then
        echo -e "${GREEN}✅ No violations found - architecture is compliant!${NC}"
        echo "   Continue maintaining these patterns for new components."
    fi
}

# Function to generate summary report
generate_summary_report() {
    local end_time=$(date +%s)
    local duration=$((end_time - START_TIME))
    
    echo ""
    echo -e "${BOLD}${CYAN}📋 Validation Summary${NC}"
    echo "======================================"
    echo "Execution Time: ${duration}s"
    echo "Validation Errors: $VALIDATION_ERRORS"
    echo ""
    echo "Violation Breakdown:"
    echo "  - Field Pattern Violations: $FIELD_VIOLATIONS"
    echo "  - Component Slot Violations: $COMPONENT_VIOLATIONS"  
    echo "  - Template Pattern Violations: $TEMPLATE_VIOLATIONS"
    echo "  - Total Violations: $TOTAL_VIOLATIONS"
    echo ""
    
    if [ $VALIDATION_ERRORS -gt 0 ]; then
        echo -e "${RED}❌ VALIDATION FAILED: $VALIDATION_ERRORS script errors${NC}"
        echo "Fix script issues and re-run validation."
        return 2
    elif [ $TOTAL_VIOLATIONS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  COMPLIANCE ISSUES: $TOTAL_VIOLATIONS violations found${NC}"
        echo "Address violations to complete slot standardization migration."
        return 1
    else
        echo -e "${GREEN}✅ VALIDATION PASSED: Full SDC compliance achieved!${NC}"
        echo "Architecture follows slot standardization framework."
        return 0
    fi
}

# Main execution flow
echo "🚀 Starting comprehensive validation..."
echo ""

# Phase 1: Field Pattern Validation
run_validation_phase "Field Pattern Anti-Pattern Detection" "validate-field-patterns.sh" "1"

# Phase 2: Component Slot Validation  
run_validation_phase "Component Slot Standards Validation" "validate-component-slots.sh" "2"

# Phase 3: Template Pattern Validation
run_validation_phase "Template Pattern Compliance Check" "validate-template-patterns.sh" "3"

# Phase 4: Performance Assessment
assess_performance_impact

# Phase 5: Migration Status
generate_migration_report

# Provide fix recommendations based on results
provide_fix_recommendations

# Generate final summary
FINAL_EXIT_CODE=0
generate_summary_report || FINAL_EXIT_CODE=$?

echo ""
echo -e "${BOLD}${BLUE}🔗 Related Documentation:${NC}"
echo "  - CLAUDE.md Prevention Rule #21: Slot Standardization Framework"
echo "  - SLOT_STANDARDIZATION_FRAMEWORK.md: Architecture guidelines"
echo "  - FIELD_TITLE_MIGRATION_GUIDE.md: Step-by-step migration"
echo "  - COMPONENT_SLOT_STANDARDS.md: Atomic design slot requirements"
echo "  - TEMPLATE_PATTERN_STANDARDS.md: Best practices and patterns"

exit $FINAL_EXIT_CODE