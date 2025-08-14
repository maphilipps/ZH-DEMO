#!/bin/bash

# adesso CMS Installer Test Runner
# Comprehensive test execution script with database cleanup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT=$(pwd)
TEST_DIR="${PROJECT_ROOT}/tests/installer"
RESULTS_DIR="${PROJECT_ROOT}/test-results"

# Default test suite
TEST_SUITE=${1:-"comprehensive"}
BROWSER=${2:-"chrome"}
HEADLESS=${3:-"true"}

echo -e "${BLUE}🚀 adesso CMS Installer Test Suite${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""

# Function to log with timestamp
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if DDEV is installed
    if ! command -v ddev &> /dev/null; then
        error "DDEV is not installed or not in PATH"
        exit 1
    fi
    
    # Check if Node.js and npm are available
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        error "npm is not installed"
        exit 1
    fi
    
    # Check if Playwright is installed
    if ! npm list @playwright/test &> /dev/null; then
        warn "Playwright not found, installing..."
        npm install @playwright/test
        npx playwright install
    fi
    
    log "Prerequisites check completed ✅"
}

# Function to ensure DDEV is running
ensure_ddev_running() {
    log "Ensuring DDEV is running..."
    
    if ! ddev status &> /dev/null; then
        log "Starting DDEV..."
        ddev start
    else
        log "DDEV is already running ✅"
    fi
    
    # Wait for services to be ready
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if ddev exec "curl -s -o /dev/null -w '%{http_code}' http://localhost" 2>/dev/null | grep -q "200\|404\|403"; then
            log "DDEV services are ready ✅"
            break
        fi
        
        # Alternative check: try to access the actual site
        if curl -s -k "https://adesso-cms.ddev.site" &> /dev/null; then
            log "DDEV services are ready ✅"
            break
        fi
        
        if [ $attempt -eq $max_attempts ]; then
            error "DDEV services failed to start after $max_attempts attempts"
            exit 1
        fi
        
        log "Waiting for DDEV services... (attempt $attempt/$max_attempts)"
        sleep 2
        ((attempt++))
    done
}

# Function to clean environment
clean_environment() {
    log "Cleaning test environment..."
    
    # Drop database
    log "Dropping database..."
    ddev drush sql-drop -y || warn "Database drop failed (may not exist)"
    
    # Remove Drupal installation files
    log "Removing Drupal installation files..."
    ddev exec "rm -rf /var/www/html/web/sites/default/settings.php" || true
    ddev exec "rm -rf /var/www/html/web/sites/default/settings.local.php" || true
    ddev exec "rm -rf /var/www/html/web/sites/default/files" || true
    ddev exec "rm -f /var/www/html/web/sites/default/.ht.sqlite" || true
    
    # Clear any caches
    log "Clearing caches..."
    ddev exec "rm -rf /var/www/html/web/sites/default/files/php" || true
    ddev exec "rm -rf /var/www/html/web/sites/default/files/config" || true
    
    log "Environment cleaned ✅"
}

# Function to run specific test suite
run_test_suite() {
    local suite=$1
    local browser=$2
    local headless=$3
    
    log "Running test suite: $suite with browser: $browser (headless: $headless)"
    
    # Create results directory
    mkdir -p "$RESULTS_DIR"
    
    # Set environment variables
    export DDEV_PRIMARY_URL=$(ddev describe -j | jq -r '.raw.primary_url' 2>/dev/null || echo "https://adesso-cms.ddev.site")
    export CLEANUP_AFTER_TESTS=${CLEANUP_AFTER_TESTS:-"true"}
    
    # Run tests based on suite
    case $suite in
        "smoke")
            log "Running smoke tests..."
            npx playwright test --config="$TEST_DIR/playwright.config.js" \
                --project="smoke-tests" \
                --reporter=list,html,json \
                tests/installer/smoke.spec.js
            ;;
        
        "comprehensive")
            log "Running comprehensive installer tests..."
            npx playwright test --config="$TEST_DIR/playwright.config.js" \
                --project="comprehensive-tests" \
                --reporter=list,html,json \
                tests/installer/installer-comprehensive.spec.js
            ;;
        
        "performance")
            log "Running performance tests..."
            npx playwright test --config="$TEST_DIR/playwright.config.js" \
                --project="performance-tests" \
                --reporter=list,html,json \
                tests/installer/performance.spec.js
            ;;
        
        "accessibility")
            log "Running accessibility tests..."
            npx playwright test --config="$TEST_DIR/playwright.config.js" \
                --project="accessibility-tests" \
                --reporter=list,html,json \
                tests/installer/accessibility.spec.js
            ;;
        
        "visual")
            log "Running visual regression tests..."
            npx playwright test --config="$TEST_DIR/playwright.config.js" \
                --project="visual-tests" \
                --reporter=list,html,json \
                tests/installer/visual.spec.js
            ;;
        
        "all")
            log "Running all test suites..."
            npx playwright test --config="$TEST_DIR/playwright.config.js" \
                --reporter=list,html,json
            ;;
        
        *)
            error "Unknown test suite: $suite"
            echo "Available suites: smoke, comprehensive, performance, accessibility, visual, all"
            exit 1
            ;;
    esac
}

# Function to generate final report
generate_report() {
    log "Generating test report..."
    
    if [ -f "$RESULTS_DIR/installer-summary.json" ]; then
        local summary=$(cat "$RESULTS_DIR/installer-summary.json")
        local total=$(echo "$summary" | jq -r '.totalTests')
        local passed=$(echo "$summary" | jq -r '.passed')
        local failed=$(echo "$summary" | jq -r '.failed')
        local skipped=$(echo "$summary" | jq -r '.skipped')
        local duration=$(echo "$summary" | jq -r '.duration')
        
        echo ""
        echo -e "${BLUE}📊 Test Results Summary${NC}"
        echo -e "${BLUE}========================${NC}"
        echo -e "Total Tests: $total"
        echo -e "Passed: ${GREEN}$passed ✅${NC}"
        echo -e "Failed: ${RED}$failed ❌${NC}"
        echo -e "Skipped: ${YELLOW}$skipped ⏭️${NC}"
        echo -e "Duration: $(($duration / 1000))s"
        echo ""
        
        if [ "$failed" -gt 0 ]; then
            echo -e "${RED}❌ Some tests failed. Check the detailed report at:${NC}"
            echo -e "${BLUE}   file://$RESULTS_DIR/installer-report/index.html${NC}"
            return 1
        else
            echo -e "${GREEN}✅ All tests passed!${NC}"
        fi
    else
        warn "No test summary found"
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [TEST_SUITE] [BROWSER] [HEADLESS]"
    echo ""
    echo "TEST_SUITE options:"
    echo "  smoke         - Quick smoke tests"
    echo "  comprehensive - Full installer configuration tests (default)"
    echo "  performance   - Performance and timeout tests"
    echo "  accessibility - Accessibility compliance tests"
    echo "  visual        - Visual regression tests"
    echo "  all           - Run all test suites"
    echo ""
    echo "BROWSER options:"
    echo "  chrome        - Google Chrome (default)"
    echo "  firefox       - Mozilla Firefox"
    echo "  safari        - Safari (macOS only)"
    echo ""
    echo "HEADLESS options:"
    echo "  true          - Run in headless mode (default)"
    echo "  false         - Run with browser UI visible"
    echo ""
    echo "Examples:"
    echo "  $0                           # Run comprehensive tests with Chrome headless"
    echo "  $0 smoke chrome false        # Run smoke tests with Chrome UI visible"
    echo "  $0 all firefox true          # Run all tests with Firefox headless"
    echo ""
    echo "Environment variables:"
    echo "  CLEANUP_AFTER_TESTS=false   # Skip final cleanup (useful for debugging)"
    echo "  DDEV_PRIMARY_URL=...         # Override DDEV URL detection"
}

# Main execution
main() {
    # Check for help flag
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_usage
        exit 0
    fi
    
    # Start execution
    log "Starting adesso CMS installer tests..."
    log "Suite: $TEST_SUITE, Browser: $BROWSER, Headless: $HEADLESS"
    
    # Run all steps
    check_prerequisites
    ensure_ddev_running
    clean_environment
    
    # Run tests with error handling
    if run_test_suite "$TEST_SUITE" "$BROWSER" "$HEADLESS"; then
        log "Tests completed successfully ✅"
        generate_report
    else
        error "Tests failed ❌"
        generate_report
        exit 1
    fi
}

# Trap for cleanup on script exit
cleanup_on_exit() {
    if [ "$?" -ne 0 ]; then
        error "Script failed. Check logs above for details."
        
        # Show quick debug info
        echo ""
        echo "Debug information:"
        echo "- DDEV Status: $(ddev status 2>&1 | head -1)"
        echo "- Project URL: ${DDEV_PRIMARY_URL:-'Not detected'}"
        echo "- Test Results: $RESULTS_DIR"
    fi
}

trap cleanup_on_exit EXIT

# Execute main function
main "$@"