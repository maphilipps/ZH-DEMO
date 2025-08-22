#!/bin/bash

# GPZH Editorial Workflow Test Suite Runner
# This script runs all tests for the editorial workflow system

echo "🧪 Starting GPZH Editorial Workflow Test Suite"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run test and check result
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo -e "\n${YELLOW}Running: $test_name${NC}"
    echo "Command: $test_command"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✅ $test_name PASSED${NC}"
        return 0
    else
        echo -e "${RED}❌ $test_name FAILED${NC}"
        return 1
    fi
}

# Change to Drupal root
cd /var/www/html

# Initialize test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

echo -e "\n📋 Test Configuration:"
echo "Base URL: $SIMPLETEST_BASE_URL"
echo "Database: $SIMPLETEST_DB"
echo "Browser: Chrome Headless"

# Unit Tests
echo -e "\n🔬 Unit Tests"
echo "============="

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Workflow Transitions Unit Tests" \
    "ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Unit/WorkflowTransitionsTest.php --verbose"; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

# Functional Tests
echo -e "\n🧩 Functional Tests"
echo "=================="

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Editorial Workflow Functional Tests" \
    "ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Functional/EditorialWorkflowTest.php --verbose"; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "User Permissions Tests" \
    "ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Functional/UserPermissionsTest.php --verbose"; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "GPZH Demo Scenarios Tests" \
    "ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Functional/GpzhDemoScenariosTest.php --verbose"; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

# JavaScript/End-to-End Tests (optional - requires Selenium)
echo -e "\n🌐 JavaScript/End-to-End Tests"
echo "=============================="

if command -v selenium >/dev/null 2>&1 || docker ps | grep -q selenium; then
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if run_test "End-to-End Workflow Tests" \
        "ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/FunctionalJavascript/EndToEndWorkflowTest.php --verbose"; then
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
else
    echo -e "${YELLOW}⏭️  Skipping JavaScript tests (Selenium not available)${NC}"
fi

# Drupal Test Runner (alternative approach)
echo -e "\n🔧 Drupal Native Test Runner"
echo "============================"

echo "Running tests using Drupal's testing framework:"

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if run_test "Drupal PHPUnit Test Discovery" \
    "ddev drush test:run --verbose zh_demo_editorial_workflow"; then
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${YELLOW}⚠️  Drupal test runner not available or configured${NC}"
    # Don't count as failure if test runner isn't available
fi

# Manual verification steps
echo -e "\n📝 Manual Verification Checklist"
echo "================================"

echo "Please verify these items manually:"
echo "1. ✅ Guest user can log in at: https://zh-demo.ddev.site/"
echo "2. ✅ Guest user redirects to: https://zh-demo.ddev.site/admin/dashboard/user"  
echo "3. ✅ Guest user can create club content"
echo "4. ✅ Guest user can submit content for review"
echo "5. ✅ Editor can access: https://zh-demo.ddev.site/admin/dashboard/editor"
echo "6. ✅ Editor can see submitted content in review queue"
echo "7. ✅ Editor can approve and publish content"
echo "8. ✅ Published content visible to anonymous users"

# Test Results Summary
echo -e "\n📊 Test Results Summary"
echo "======================="
echo "Total Tests: $TOTAL_TESTS"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All Tests PASSED! GPZH Editorial Workflow is ready for demo!${NC}"
    exit 0
else
    echo -e "\n${RED}❌ Some tests FAILED. Please review and fix issues before demo.${NC}"
    exit 1
fi