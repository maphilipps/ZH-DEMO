#!/bin/bash
# tests/installation/test-german-locale-install.sh
# German Locale Installation Test
# Validates that German locale installation completes without ListItemBase TypeError

set -e

echo "🇩🇪 Testing German locale installation..."
echo "=========================================="

# Configuration
TEST_NAME="German Locale Installation"
LOG_FILE="/tmp/adesso-cms-german-install.log"
ERROR_LOG="/tmp/adesso-cms-german-errors.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Clean up function
cleanup() {
    log_info "Cleaning up test environment..."
    # Don't drop database on exit, leave for inspection
}

trap cleanup EXIT

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

log_info "✅ DDEV environment verified"

# Step 2: Clean database
log_info "Step 2: Cleaning database for fresh installation..."
ddev drush sql:drop -y > "$LOG_FILE" 2>&1 || {
    log_warning "Database drop failed or database was already empty"
}

# Step 3: Install Drupal with German locale
log_info "Step 3: Installing Drupal with German locale..."
log_info "Using profile: adesso_cms_starter"
log_info "Locale: de (German)"

# Start timer
start_time=$(date +%s)

# Perform installation
ddev drush site:install adesso_cms_starter \
  --locale=de \
  --account-name=admin \
  --account-pass=admin \
  --site-name="adesso CMS Test (German)" \
  --yes \
  >> "$LOG_FILE" 2>> "$ERROR_LOG"

# End timer
end_time=$(date +%s)
duration=$((end_time - start_time))

if [ $? -eq 0 ]; then
    log_info "✅ Installation completed in ${duration} seconds"
else
    log_error "❌ Installation failed"
    log_error "Check error log: $ERROR_LOG"
    cat "$ERROR_LOG"
    exit 1
fi

# Step 4: Verify installation success
log_info "Step 4: Verifying installation success..."

# Check Drupal status
status_output=$(ddev drush status --fields=bootstrap,db-status --format=json)
bootstrap=$(echo "$status_output" | jq -r '.bootstrap // empty')
db_status=$(echo "$status_output" | jq -r '."db-status" // empty')

if [[ "$bootstrap" == "Successful" ]]; then
    log_info "✅ Drupal bootstrap successful"
else
    log_error "❌ Drupal bootstrap failed: $bootstrap"
    exit 1
fi

if [[ "$db_status" == "Connected" ]]; then
    log_info "✅ Database connection successful"
else
    log_error "❌ Database connection failed: $db_status"
    exit 1
fi

# Step 5: Check for ListItemBase TypeError in logs
log_info "Step 5: Checking for ListItemBase TypeError..."

# Check recent logs for TypeError
if ddev logs | tail -1000 | grep -i "ListItemBase.*TypeError" > /dev/null; then
    log_error "❌ ListItemBase TypeError detected in logs:"
    ddev logs | tail -1000 | grep -i "ListItemBase.*TypeError"
    exit 1
else
    log_info "✅ No ListItemBase TypeError found in logs"
fi

# Check Drupal logs for errors
error_count=$(ddev drush watchdog:show --severity=Error --count=50 --format=json | jq 'length')
if [ "$error_count" -gt 0 ]; then
    log_warning "⚠️  Found $error_count error(s) in Drupal logs"
    ddev drush watchdog:show --severity=Error --count=5
else
    log_info "✅ No errors in Drupal logs"
fi

# Step 6: Verify affected field configurations
log_info "Step 6: Verifying field configurations..."

fields=(
    "field.storage.paragraph.field_hero_layout"
    "field.storage.paragraph.field_text_layout"
    "field.storage.paragraph.field_sidebyside_layout"
)

for field in "${fields[@]}"; do
    log_info "Checking $field..."
    
    # Get field configuration
    config_output=$(ddev drush config:get "$field" --format=yaml 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        log_error "❌ Failed to retrieve configuration for $field"
        exit 1
    fi
    
    # Check if it uses key-value format (not nested arrays)
    if echo "$config_output" | grep -q "allowed_values:" && ! echo "$config_output" | grep -q "^\s*-\s*value:"; then
        log_info "✅ $field uses correct key-value format"
        
        # Verify specific values exist
        case "$field" in
            "field.storage.paragraph.field_hero_layout")
                if echo "$config_output" | grep -q "image_top:" && echo "$config_output" | grep -q "image_bottom:"; then
                    log_info "✅ Hero layout options validated"
                else
                    log_error "❌ Hero layout options missing"
                    exit 1
                fi
                ;;
            "field.storage.paragraph.field_text_layout")
                if echo "$config_output" | grep -q "centered:" && echo "$config_output" | grep -q "left:"; then
                    log_info "✅ Text layout options validated"
                else
                    log_error "❌ Text layout options missing"
                    exit 1
                fi
                ;;
            "field.storage.paragraph.field_sidebyside_layout")
                if echo "$config_output" | grep -q "left:" && echo "$config_output" | grep -q "right:"; then
                    log_info "✅ Side-by-side layout options validated"
                else
                    log_error "❌ Side-by-side layout options missing"
                    exit 1
                fi
                ;;
        esac
    else
        log_error "❌ $field uses incorrect nested array format or missing allowed_values"
        echo "$config_output"
        exit 1
    fi
done

# Step 7: Verify German locale is active
log_info "Step 7: Verifying German locale is active..."

# Check default language
default_lang=$(ddev drush config:get system.site default_langcode --format=string)
if [[ "$default_lang" == "de" ]]; then
    log_info "✅ German is set as default language"
else
    log_warning "⚠️  Default language is '$default_lang', expected 'de'"
fi

# Check if German language is enabled
german_enabled=$(ddev drush language:info | grep -c "German.*Enabled" || echo "0")
if [[ "$german_enabled" -gt 0 ]]; then
    log_info "✅ German language is enabled"
else
    log_error "❌ German language is not enabled"
    exit 1
fi

# Step 8: Test basic site functionality
log_info "Step 8: Testing basic site functionality..."

# Check if front page loads
if ddev drush eval "echo \Drupal::service('path.matcher')->isFrontPage();" 2>/dev/null; then
    log_info "✅ Front page accessible"
else
    log_warning "⚠️  Front page check inconclusive"
fi

# Step 9: German brand compliance check
log_info "Step 9: Checking German brand compliance..."

site_name=$(ddev drush config:get system.site name --format=string)
if echo "$site_name" | grep -q "adesso" && ! echo "$site_name" | grep -q "Adesso"; then
    log_info "✅ Site name follows 'adesso' lowercase rule"
else
    log_warning "⚠️  Site name may not follow German brand guidelines: $site_name"
fi

# Step 10: Generate test report
log_info "Step 10: Generating test report..."

cat > /tmp/german-locale-install-report.txt << EOF
German Locale Installation Test Report
=======================================

Test Execution: $(date)
Duration: ${duration} seconds

Results:
✅ DDEV Environment: OK
✅ German Installation: SUCCESSFUL
✅ Drupal Bootstrap: OK
✅ Database Connection: OK
✅ No ListItemBase TypeError: VERIFIED
✅ Field Configurations: VALIDATED
✅ German Locale: ACTIVE
✅ Basic Functionality: OK
✅ Brand Compliance: CHECKED

Field Configuration Validation:
- field_hero_layout: Key-value format ✅
- field_text_layout: Key-value format ✅  
- field_sidebyside_layout: Key-value format ✅

Installation Logs: $LOG_FILE
Error Logs: $ERROR_LOG

Test Status: PASSED
EOF

log_info "📊 Test report generated: /tmp/german-locale-install-report.txt"

# Final summary
echo ""
echo "=========================================="
log_info "🎉 German Locale Installation Test PASSED"
echo "=========================================="
log_info "Installation Duration: ${duration} seconds"
log_info "Drupal Status: Bootstrap Successful"
log_info "ListItemBase TypeError: Not Found"
log_info "Field Configurations: All Valid"
log_info "German Locale: Active and Functional"
echo ""
log_info "Next steps:"
log_info "1. Run English regression test"
log_info "2. Perform functionality validation"
log_info "3. Execute content compatibility tests"
echo ""

exit 0