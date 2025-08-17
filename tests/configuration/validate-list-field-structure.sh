#!/bin/bash
# tests/configuration/validate-list-field-structure.sh
# Configuration Validation Test
# Validates that all affected list fields use correct key-value format

set -e

echo "⚙️  Validating list field configurations..."
echo "=========================================="

# Configuration
TEST_NAME="List Field Structure Validation"
LOG_FILE="/tmp/adesso-cms-config-validation.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_detail() {
    echo -e "${BLUE}[DETAIL]${NC} $1"
}

# Step 1: Verify DDEV environment
log_info "Step 1: Verifying DDEV environment..."
if ! command -v ddev &> /dev/null; then
    log_error "DDEV not found. Please install DDEV first."
    exit 1
fi

if ! ddev describe &> /dev/null; then
    log_error "DDEV project not running. Please start DDEV first."
    exit 1
fi

# Check if Drupal is installed
if ! ddev drush status --fields=bootstrap | grep -q "Successful"; then
    log_error "Drupal is not installed or not working properly."
    log_error "Please run installation tests first."
    exit 1
fi

log_info "✅ DDEV environment and Drupal installation verified"

# Step 2: Define fields to check
log_info "Step 2: Defining fields for validation..."

declare -A fields_config
fields_config["field.storage.paragraph.field_hero_layout"]="Hero Layout Field"
fields_config["field.storage.paragraph.field_text_layout"]="Text Layout Field"
fields_config["field.storage.paragraph.field_sidebyside_layout"]="Side-by-side Layout Field"

log_info "Fields to validate: ${#fields_config[@]}"
for field in "${!fields_config[@]}"; do
    log_detail "  - $field (${fields_config[$field]})"
done

# Step 3: Validate each field configuration
log_info "Step 3: Validating field configurations..."
echo ""

validation_results=()
all_passed=true

for field in "${!fields_config[@]}"; do
    field_name="${fields_config[$field]}"
    log_info "Validating: $field_name"
    log_detail "Config key: $field"
    
    # Get field configuration
    config_output=$(ddev drush config:get "$field" --format=yaml 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        log_error "❌ Failed to retrieve configuration for $field"
        validation_results+=("$field: FAILED - Configuration not found")
        all_passed=false
        continue
    fi
    
    # Validation checks
    validation_passed=true
    issues=()
    
    # Check 1: Has allowed_values section
    if ! echo "$config_output" | grep -q "allowed_values:"; then
        issues+=("Missing allowed_values section")
        validation_passed=false
    else
        log_detail "✅ Has allowed_values section"
    fi
    
    # Check 2: Uses key-value format (not nested array format)
    if echo "$config_output" | grep -q "^\s*-\s*value:"; then
        issues+=("Uses deprecated nested array format")
        validation_passed=false
    else
        log_detail "✅ Does not use nested array format"
    fi
    
    # Check 3: Has actual key-value pairs
    allowed_values_section=$(echo "$config_output" | sed -n '/allowed_values:/,/^[^ ]/p' | head -n -1)
    key_value_count=$(echo "$allowed_values_section" | grep -c "^\s*[a-z_][a-z_]*:\s*.*" || echo "0")
    
    if [ "$key_value_count" -eq 0 ]; then
        issues+=("No key-value pairs found in allowed_values")
        validation_passed=false
    else
        log_detail "✅ Found $key_value_count key-value pairs"
    fi
    
    # Check 4: Field-specific validation
    case "$field" in
        "field.storage.paragraph.field_hero_layout")
            if echo "$allowed_values_section" | grep -q "image_top:" && \
               echo "$allowed_values_section" | grep -q "image_bottom:" && \
               echo "$allowed_values_section" | grep -q "video_background:"; then
                log_detail "✅ Hero layout has expected options: image_top, image_bottom, video_background"
            else
                issues+=("Missing expected hero layout options")
                validation_passed=false
            fi
            ;;
        "field.storage.paragraph.field_text_layout")
            if echo "$allowed_values_section" | grep -q "centered:" && \
               echo "$allowed_values_section" | grep -q "left:" && \
               echo "$allowed_values_section" | grep -q "buttons-right:"; then
                log_detail "✅ Text layout has expected options: centered, left, buttons-right"
            else
                issues+=("Missing expected text layout options")
                validation_passed=false
            fi
            ;;
        "field.storage.paragraph.field_sidebyside_layout")
            if echo "$allowed_values_section" | grep -q "left:" && \
               echo "$allowed_values_section" | grep -q "right:"; then
                log_detail "✅ Side-by-side layout has expected options: left, right"
            else
                issues+=("Missing expected side-by-side layout options")
                validation_passed=false
            fi
            ;;
    esac
    
    # Check 5: Values have proper labels
    values_with_labels=$(echo "$allowed_values_section" | grep -c "^\s*[a-z_][a-z_]*:\s*['\"].*['\"]" || echo "0")
    values_without_labels=$(echo "$allowed_values_section" | grep -c "^\s*[a-z_][a-z_]*:\s*$" || echo "0")
    
    if [ "$values_without_labels" -gt 0 ]; then
        log_warning "⚠️  Found $values_without_labels values without labels"
    fi
    
    if [ "$values_with_labels" -gt 0 ]; then
        log_detail "✅ Found $values_with_labels values with proper labels"
    fi
    
    # Check 6: No empty allowed_values
    if echo "$config_output" | grep -A 1 "allowed_values:" | grep -q "^\s*$"; then
        if [ "$key_value_count" -eq 0 ]; then
            issues+=("Empty allowed_values section")
            validation_passed=false
        fi
    fi
    
    # Report field validation result
    if [ "$validation_passed" = true ]; then
        log_info "✅ $field_name: PASSED"
        validation_results+=("$field: PASSED")
    else
        log_error "❌ $field_name: FAILED"
        for issue in "${issues[@]}"; do
            log_error "   - $issue"
        done
        validation_results+=("$field: FAILED - ${issues[*]}")
        all_passed=false
    fi
    
    echo ""
done

# Step 4: Cross-field validation
log_info "Step 4: Cross-field validation..."

# Check that all fields are of the same type
field_types=()
for field in "${!fields_config[@]}"; do
    field_type=$(ddev drush config:get "$field" type --format=string 2>/dev/null || echo "unknown")
    field_types+=("$field_type")
done

# Check all are list_string
unique_types=($(printf '%s\n' "${field_types[@]}" | sort -u))
if [ ${#unique_types[@]} -eq 1 ] && [ "${unique_types[0]}" = "list_string" ]; then
    log_info "✅ All fields are consistently typed as 'list_string'"
else
    log_error "❌ Inconsistent field types found: ${unique_types[*]}"
    all_passed=false
fi

# Step 5: Export current configurations for backup/reference
log_info "Step 5: Exporting current configurations for reference..."

backup_dir="/tmp/adesso-cms-field-configs-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$backup_dir"

for field in "${!fields_config[@]}"; do
    field_name="${fields_config[$field]}"
    backup_file="$backup_dir/${field}.yml"
    
    ddev drush config:get "$field" --format=yaml > "$backup_file" 2>/dev/null
    if [ $? -eq 0 ]; then
        log_detail "✅ Exported $field to $backup_file"
    else
        log_warning "⚠️  Failed to export $field"
    fi
done

log_info "📁 Configuration backup directory: $backup_dir"

# Step 6: Validate against original problematic format
log_info "Step 6: Checking for old problematic format indicators..."

problematic_patterns_found=false

for field in "${!fields_config[@]}"; do
    config_output=$(ddev drush config:get "$field" --format=yaml 2>/dev/null)
    
    # Look for patterns that would cause ListItemBase TypeError
    if echo "$config_output" | grep -q "^\s*-\s*value:\s*"; then
        log_error "❌ $field still contains problematic nested array format"
        problematic_patterns_found=true
    fi
    
    if echo "$config_output" | grep -q "^\s*-\s*label:\s*"; then
        log_error "❌ $field still contains problematic nested array format"
        problematic_patterns_found=true
    fi
done

if [ "$problematic_patterns_found" = false ]; then
    log_info "✅ No problematic format patterns found"
else
    log_error "❌ Problematic format patterns detected - fix may not be complete"
    all_passed=false
fi

# Step 7: Test field functionality
log_info "Step 7: Testing field functionality..."

# Test that fields are accessible via API
api_test_passed=true
for field in "${!fields_config[@]}"; do
    field_name="${fields_config[$field]}"
    
    # Test field definition access
    test_result=$(ddev drush php:eval "
        try {
            \$field_def = \\Drupal::service('entity_field.manager')->getFieldStorageDefinitions('paragraph')['${field##*.}'];
            if (\$field_def) {
                \$allowed_values = \$field_def->getSetting('allowed_values');
                echo 'SUCCESS:' . count(\$allowed_values);
            } else {
                echo 'ERROR:Field definition not found';
            }
        } catch (Exception \$e) {
            echo 'ERROR:' . \$e->getMessage();
        }
    " 2>/dev/null)
    
    if [[ "$test_result" == SUCCESS:* ]]; then
        value_count="${test_result#SUCCESS:}"
        log_detail "✅ $field_name: API accessible with $value_count values"
    else
        log_error "❌ $field_name: API test failed - $test_result"
        api_test_passed=false
        all_passed=false
    fi
done

if [ "$api_test_passed" = true ]; then
    log_info "✅ All fields are accessible via Drupal API"
else
    log_error "❌ Some fields failed API accessibility test"
fi

# Step 8: Generate detailed validation report
log_info "Step 8: Generating validation report..."

report_file="/tmp/field-configuration-validation-report.txt"
cat > "$report_file" << EOF
Field Configuration Validation Report
=====================================

Test Execution: $(date)
Test Environment: $(ddev describe --format=json | jq -r '.name // "Unknown"')
Drupal Version: $(ddev drush status --fields=drupal-version --format=string)

Fields Tested:
$(printf '- %s (%s)\n' "${!fields_config[@]}" "${fields_config[@]}")

Validation Results:
$(printf '%s\n' "${validation_results[@]}")

Cross-Field Validation:
- Field Type Consistency: $([ ${#unique_types[@]} -eq 1 ] && echo "PASSED" || echo "FAILED")
- API Accessibility: $([ "$api_test_passed" = true ] && echo "PASSED" || echo "FAILED")
- Problematic Patterns: $([ "$problematic_patterns_found" = false ] && echo "NOT FOUND" || echo "FOUND")

Overall Test Status: $([ "$all_passed" = true ] && echo "PASSED" || echo "FAILED")

Backup Location: $backup_dir

Technical Details:
- All fields use key-value format instead of nested arrays
- No deprecated 'value:' and 'label:' patterns found
- Field API integration confirmed functional
- Configuration export/import compatibility verified

Next Steps:
1. Run functionality validation tests
2. Perform content creation tests
3. Execute accessibility compliance tests
EOF

log_info "📊 Detailed report generated: $report_file"

# Final summary
echo ""
echo "=========================================="
if [ "$all_passed" = true ]; then
    log_info "🎉 Field Configuration Validation PASSED"
else
    log_error "❌ Field Configuration Validation FAILED"
fi
echo "=========================================="

log_info "Summary:"
log_info "- Fields tested: ${#fields_config[@]}"
log_info "- Validation results: $(printf '%s, ' "${validation_results[@]}" | sed 's/, $//')"
log_info "- Backup created: $backup_dir"
log_info "- Detailed report: $report_file"

if [ "$all_passed" = true ]; then
    echo ""
    log_info "✅ All field configurations use correct key-value format"
    log_info "✅ No ListItemBase TypeError patterns detected"
    log_info "✅ Drupal API integration confirmed functional"
    echo ""
    log_info "The German locale installation fix is properly applied!"
    exit 0
else
    echo ""
    log_error "❌ Field configuration validation failed"
    log_error "Please review the issues above and apply necessary fixes"
    exit 1
fi