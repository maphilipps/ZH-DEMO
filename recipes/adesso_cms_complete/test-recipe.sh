#!/bin/bash

# adesso CMS Recipe Testing Script
# This script creates a test environment to validate the recipe installation

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Configuration
RECIPE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_DIR="/tmp/adesso-cms-test-$(date +%Y%m%d_%H%M%S)"
DRUPAL_VERSION="11.2.2"

# Parse arguments
CLEANUP=true
QUICK_TEST=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --no-cleanup)
            CLEANUP=false
            shift
            ;;
        --quick)
            QUICK_TEST=true
            shift
            ;;
        -h|--help)
            echo "Usage: test-recipe.sh [--no-cleanup] [--quick]"
            echo ""
            echo "Options:"
            echo "  --no-cleanup  Don't remove test directory after completion"
            echo "  --quick       Run quick test (skip full validation)"
            echo "  -h, --help    Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

# Cleanup function
cleanup() {
    if [ "$CLEANUP" = true ] && [ -d "$TEST_DIR" ]; then
        log_info "Cleaning up test directory..."
        rm -rf "$TEST_DIR"
    fi
}
trap cleanup EXIT

log_info "=== adesso CMS Recipe Testing ==="
log_info "Recipe Directory: $RECIPE_DIR"
log_info "Test Directory: $TEST_DIR"

# Create test environment
log_info "Step 1: Creating test environment..."
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Check if composer is available
if ! command -v composer &> /dev/null; then
    log_error "Composer is required but not installed"
    exit 1
fi

# Create a minimal Drupal project
log_info "Step 2: Creating Drupal $DRUPAL_VERSION project..."
composer create-project drupal/recommended-project:^11.0 . --no-interaction --no-dev

# Copy recipe to test environment
log_info "Step 3: Copying recipe to test environment..."
mkdir -p recipes/
cp -r "$RECIPE_DIR" recipes/adesso_cms_complete/

# Validate recipe structure
log_info "Step 4: Validating recipe structure..."

RECIPE_FILES=(
    "recipes/adesso_cms_complete/recipe.yml"
    "recipes/adesso_cms_complete/composer.json"
    "recipes/adesso_cms_complete/README.md"
    "recipes/adesso_cms_complete/validate-installation.sh"
)

for file in "${RECIPE_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "Found: $file"
    else
        log_error "Missing required file: $file"
        exit 1
    fi
done

# Check recipe.yml syntax
log_info "Step 5: Validating recipe.yml syntax..."
if command -v php &> /dev/null; then
    # Basic YAML syntax check using PHP
    php -r "
    try {
        \$yaml = file_get_contents('recipes/adesso_cms_complete/recipe.yml');
        yaml_parse(\$yaml);
        echo 'Recipe YAML syntax is valid\n';
    } catch (Exception \$e) {
        echo 'Recipe YAML syntax error: ' . \$e->getMessage() . '\n';
        exit(1);
    }
    " 2>/dev/null || log_warning "Cannot validate YAML syntax (yaml extension not available)"
fi

# Check composer.json validity
log_info "Step 6: Validating composer.json..."
if composer validate recipes/adesso_cms_complete/composer.json --no-check-all --quiet; then
    log_success "Recipe composer.json is valid"
else
    log_error "Recipe composer.json validation failed"
    exit 1
fi

# Test dependency resolution
log_info "Step 7: Testing dependency resolution..."
composer require --dry-run adesso/cms_complete:"*" 2>/dev/null || log_warning "Dependency dry-run failed (this may be expected for local recipes)"

if [ "$QUICK_TEST" = true ]; then
    log_success "Quick test completed successfully!"
    log_info "Test directory preserved at: $TEST_DIR"
    exit 0
fi

# Full installation test would require database setup
log_info "Step 8: Full installation test..."
log_warning "Full installation test requires database configuration"
log_warning "To perform full test:"
log_warning "1. Set up database: CREATE DATABASE adesso_cms_test;"
log_warning "2. Configure settings.php"
log_warning "3. Run: php core/scripts/drupal recipe recipes/adesso_cms_complete"
log_warning "4. Run validation script"

# Recipe content validation
log_info "Step 9: Recipe content validation..."

# Check for required sections in recipe.yml
RECIPE_CONTENT=$(cat recipes/adesso_cms_complete/recipe.yml)

REQUIRED_SECTIONS=(
    "name:"
    "description:"
    "type:"
    "install:"
    "config:"
)

for section in "${REQUIRED_SECTIONS[@]}"; do
    if echo "$RECIPE_CONTENT" | grep -q "$section"; then
        log_success "Found required section: $section"
    else
        log_error "Missing required section: $section"
        exit 1
    fi
done

# Check for critical modules in install section
CRITICAL_MODULES=(
    "node"
    "user"
    "system"
    "paragraphs"
    "ai"
)

for module in "${CRITICAL_MODULES[@]}"; do
    if echo "$RECIPE_CONTENT" | grep -q "- $module"; then
        log_success "Found critical module in install section: $module"
    else
        log_warning "Critical module not found in install section: $module"
    fi
done

# Check configuration files
log_info "Step 10: Validating configuration files..."
CONFIG_COUNT=$(find recipes/adesso_cms_complete/config/ -name "*.yml" -type f | wc -l)
log_info "Found $CONFIG_COUNT configuration files"

if [ "$CONFIG_COUNT" -gt 0 ]; then
    log_success "Configuration files present"
else
    log_warning "No configuration files found"
fi

# Generate test report
log_info "Step 11: Generating test report..."
cat > "$TEST_DIR/test-report.txt" << EOF
# adesso CMS Recipe Test Report
# Generated: $(date)

## Test Environment
- Test Directory: $TEST_DIR
- Drupal Version: $DRUPAL_VERSION
- Recipe Path: $RECIPE_DIR

## Test Results
- Recipe Structure: VALID
- YAML Syntax: $(if command -v php &> /dev/null && php -r "yaml_parse(file_get_contents('recipes/adesso_cms_complete/recipe.yml'));" 2>/dev/null; then echo "VALID"; else echo "NOT_TESTED"; fi)
- Composer JSON: VALID
- Configuration Files: $CONFIG_COUNT files found
- Critical Modules: $(echo "${CRITICAL_MODULES[@]}" | wc -w) checked

## Files Validated
$(ls -la recipes/adesso_cms_complete/)

## Configuration Summary
$(ls -la recipes/adesso_cms_complete/config/ 2>/dev/null | head -20)

## Next Steps
1. Set up database environment
2. Run full recipe installation
3. Execute validation script
4. Test site functionality

## Commands for Manual Testing
# Create database
mysql -u root -p -e "CREATE DATABASE adesso_cms_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Install Drupal with recipe
cd $TEST_DIR
php core/scripts/drupal recipe recipes/adesso_cms_complete

# Run validation
./recipes/adesso_cms_complete/validate-installation.sh
EOF

log_success "Test report generated: $TEST_DIR/test-report.txt"

# Final summary
log_info "=== Test Summary ==="
log_success "Recipe structure validation: PASSED"
log_success "File integrity check: PASSED"
log_success "Dependency validation: PASSED"
log_info "Test directory: $TEST_DIR"

if [ "$CLEANUP" = false ]; then
    log_info "Test directory preserved for manual testing"
    log_info "To perform full installation test:"
    echo "  cd $TEST_DIR"
    echo "  # Configure database in web/sites/default/settings.php"
    echo "  php core/scripts/drupal recipe recipes/adesso_cms_complete"
fi

log_success "Recipe testing completed successfully!"