#!/bin/bash

# Slot Migration Testing Validation Script - Issue #56
# Testing Rule #1 Enforcement: Comprehensive validation before claiming success

set -e  # Exit immediately if a command exits with a non-zero status

echo "🧪 Slot Migration Testing Infrastructure Validation"
echo "=================================================="
echo ""
echo "Testing Rule #1: Never claim tests pass when failures exist"
echo "This script validates the complete testing infrastructure setup"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Validation functions
validate_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "  ✅ ${GREEN}$description${NC}: $file"
        return 0
    else
        echo -e "  ❌ ${RED}$description MISSING${NC}: $file"
        return 1
    fi
}

validate_directory() {
    local dir=$1
    local description=$2
    
    if [ -d "$dir" ]; then
        echo -e "  ✅ ${GREEN}$description${NC}: $dir"
        return 0
    else
        echo -e "  ❌ ${RED}$description MISSING${NC}: $dir"
        return 1
    fi
}

validate_npm_script() {
    local script=$1
    local description=$2
    
    if npm run | grep -q "^  $script$"; then
        echo -e "  ✅ ${GREEN}$description${NC}: npm run $script"
        return 0
    else
        echo -e "  ❌ ${RED}$description MISSING${NC}: npm run $script"
        return 1
    fi
}

# Main validation
echo -e "${BLUE}1. Testing Infrastructure Files${NC}"
echo "================================="

validation_failed=0

# Core testing files
validate_file "tests/slot-migration-validation.test.js" "Slot Migration Tests" || validation_failed=1
validate_file "backstop-component-migration.json" "BackstopJS Migration Config" || validation_failed=1
validate_file ".storybook/test-runner-config.js" "Storybook Test Runner Config" || validation_failed=1
validate_file "performance-migration-benchmark.js" "Performance Benchmark Script" || validation_failed=1
validate_file "SLOT_MIGRATION_TESTING_GUIDE.md" "Testing Documentation" || validation_failed=1

echo ""
echo -e "${BLUE}2. BackstopJS Directory Structure${NC}"
echo "=================================="

# BackstopJS directories (create if missing)
if [ ! -d "backstop_data" ]; then
    echo -e "  📁 ${YELLOW}Creating BackstopJS directories...${NC}"
    mkdir -p backstop_data/{migration_reference,migration_test,engine_scripts,migration_html_report,migration_json_report}
fi

validate_directory "backstop_data" "BackstopJS Data Directory" || validation_failed=1

echo ""
echo -e "${BLUE}3. NPM Scripts Validation${NC}"
echo "=========================="

# Migration testing scripts
validate_npm_script "migration:test" "Migration Test Suite" || validation_failed=1
validate_npm_script "migration:slots" "Slot Functionality Tests" || validation_failed=1
validate_npm_script "migration:visual" "Visual Regression Tests" || validation_failed=1
validate_npm_script "migration:visual:reference" "Visual Reference Creation" || validation_failed=1
validate_npm_script "migration:performance" "Performance Benchmark" || validation_failed=1
validate_npm_script "migration:storybook" "Storybook Integration Tests" || validation_failed=1
validate_npm_script "migration:full" "Complete Migration Test Suite" || validation_failed=1

echo ""
echo -e "${BLUE}4. Component Migration Status${NC}"
echo "============================="

# Check migrated components
components=("embed" "stat-card" "newsletter-form" "gallery" "accordion" "card-group")

for component in "${components[@]}"; do
    component_dir="components/${component}"
    if [ -d "$component_dir" ]; then
        if [ -f "${component_dir}/${component}.component.yml" ]; then
            if grep -q "slots:" "${component_dir}/${component}.component.yml"; then
                echo -e "  ✅ ${GREEN}${component}${NC}: Slot implementation found"
            else
                echo -e "  ⚠️  ${YELLOW}${component}${NC}: No slots detected in component.yml"
                validation_failed=1
            fi
        else
            echo -e "  ❌ ${RED}${component}${NC}: Component file missing"
            validation_failed=1
        fi
    else
        echo -e "  ❌ ${RED}${component}${NC}: Component directory missing"
        validation_failed=1
    fi
done

echo ""
echo -e "${BLUE}5. Dependencies Validation${NC}"
echo "========================="

# Check required dependencies
required_deps=("@storybook/test-runner" "backstopjs" "vitest" "@playwright/test" "axe-playwright")

for dep in "${required_deps[@]}"; do
    if npm list "$dep" &> /dev/null; then
        echo -e "  ✅ ${GREEN}$dep${NC}: Installed"
    else
        echo -e "  ❌ ${RED}$dep${NC}: Missing - run npm install"
        validation_failed=1
    fi
done

echo ""
echo -e "${BLUE}6. DDEV Environment Check${NC}"
echo "========================"

# Check DDEV environment
if command -v ddev &> /dev/null; then
    if ddev status | grep -q "running"; then
        echo -e "  ✅ ${GREEN}DDEV Environment${NC}: Running"
        
        # Check if site is accessible
        if ddev exec "curl -s -o /dev/null -w '%{http_code}' http://localhost" | grep -q "200\|301\|302"; then
            echo -e "  ✅ ${GREEN}Drupal Site${NC}: Accessible"
        else
            echo -e "  ⚠️  ${YELLOW}Drupal Site${NC}: May not be fully accessible"
        fi
    else
        echo -e "  ❌ ${RED}DDEV Environment${NC}: Not running - run 'ddev start'"
        validation_failed=1
    fi
else
    echo -e "  ❌ ${RED}DDEV${NC}: Not installed or not in PATH"
    validation_failed=1
fi

echo ""
echo -e "${BLUE}7. Testing Infrastructure Summary${NC}"
echo "=================================="

if [ $validation_failed -eq 0 ]; then
    echo -e "✅ ${GREEN}SUCCESS: All testing infrastructure validated${NC}"
    echo ""
    echo "🚀 Ready to run migration tests:"
    echo "   ddev npm run migration:slots      # Functionality tests"
    echo "   ddev npm run migration:storybook  # Storybook integration"
    echo "   ddev npm run migration:visual     # Visual regression"
    echo "   ddev npm run migration:performance # Performance benchmarks"
    echo "   ddev npm run migration:full       # Complete test suite"
    echo ""
    echo "📚 Documentation: SLOT_MIGRATION_TESTING_GUIDE.md"
    echo ""
    echo "🇩🇪 German Compliance: WCAG 2.1 AA + eCH-0059 validation enabled"
    echo "📊 Performance Target: 35%+ improvement across 6 migrated components"
    echo ""
else
    echo -e "❌ ${RED}FAILED: Testing infrastructure validation failed${NC}"
    echo ""
    echo "🔧 Fix the issues above before running migration tests"
    echo "💡 Check SLOT_MIGRATION_TESTING_GUIDE.md for troubleshooting"
    echo ""
    exit 1
fi

# Optional: Run a quick smoke test if requested
if [ "$1" = "--smoke-test" ]; then
    echo -e "${BLUE}8. Smoke Test Execution${NC}"
    echo "======================="
    
    echo -e "  🧪 ${YELLOW}Running basic slot functionality test...${NC}"
    
    if ddev npm run migration:slots; then
        echo -e "  ✅ ${GREEN}Smoke test passed${NC}"
    else
        echo -e "  ❌ ${RED}Smoke test failed${NC}"
        echo "  🔧 Fix slot migration issues before proceeding"
        exit 1
    fi
fi

echo "🎯 Testing Rule #1 Enforcement: Infrastructure ready for comprehensive validation"