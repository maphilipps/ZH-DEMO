#\!/bin/bash

# BackstopJS Automated Testing Hook
# Runs after each task completion to ensure visual regression testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="/Users/marc.philipps/Sites/adesso-cms"
THEME_ROOT="$PROJECT_ROOT/web/themes/custom/adesso_cms_theme"
BACKSTOP_CONFIG="$PROJECT_ROOT/backstop.json"
BACKSTOP_REPORT="$PROJECT_ROOT/backstop_data/html_report/index.html"

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}║     BackstopJS Visual Regression Testing Hook                 ║${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"

# Step 1: Build the theme
echo -e "\n${YELLOW}📦 Building theme assets...${NC}"
cd "$THEME_ROOT"
if ddev npm run build 2>&1 | grep -q "error"; then
    echo -e "${RED}✗ Theme build failed${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Theme built successfully${NC}"
fi

# Step 2: Clear Drupal cache
echo -e "\n${YELLOW}🔄 Clearing Drupal cache...${NC}"
cd "$PROJECT_ROOT"
if ddev drush cr 2>&1 | grep -q "error"; then
    echo -e "${RED}✗ Cache clear failed${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Cache cleared successfully${NC}"
fi

# Step 3: Run BackstopJS tests
echo -e "\n${YELLOW}🎨 Running BackstopJS visual regression tests...${NC}"
echo -e "${BLUE}Testing scenarios:${NC}"
echo "  • Landing Page - Welcome adesso CMS"
echo "  • Basic Page - Our Product Vision"
echo "  • Basic Page - Events"
echo "  • Basic Page - Complete Paragraph Showcase"

# Run backstop test and capture result
BACKSTOP_OUTPUT=$(ddev backstop test 2>&1)
BACKSTOP_EXIT_CODE=$?

# Parse results
if echo "$BACKSTOP_OUTPUT" | grep -q "Test completed"; then
    PASSED=$(echo "$BACKSTOP_OUTPUT" | grep -oP 'Passed: \K\d+' || echo "0")
    FAILED=$(echo "$BACKSTOP_OUTPUT" | grep -oP 'Failed: \K\d+' || echo "0")
    
    if [ "$BACKSTOP_EXIT_CODE" -eq 0 ]; then
        echo -e "\n${GREEN}═══════════════════════════════════════════════════════════════${NC}"
        echo -e "${GREEN}║     ✓ All visual regression tests passed\!                    ║${NC}"
        echo -e "${GREEN}║     Passed: $PASSED scenarios                                              ║${NC}"
        echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
    else
        echo -e "\n${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
        echo -e "${YELLOW}║     ⚠ Visual differences detected                            ║${NC}"
        echo -e "${YELLOW}║     Passed: $PASSED | Failed: $FAILED                                      ║${NC}"
        echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
        
        echo -e "\n${BLUE}Review the differences:${NC}"
        echo -e "  ${BLUE}→${NC} Report: file://$BACKSTOP_REPORT"
        echo -e "\n${YELLOW}If changes are intentional:${NC}"
        echo -e "  ${GREEN}→${NC} Run: ddev backstop approve"
        echo -e "\n${YELLOW}If changes are unexpected:${NC}"
        echo -e "  ${RED}→${NC} Review and fix the issues"
    fi
else
    echo -e "\n${RED}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}║     ✗ BackstopJS test execution failed                       ║${NC}"
    echo -e "${RED}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}Error output:${NC}"
    echo "$BACKSTOP_OUTPUT" | tail -20
fi

# Step 4: Quick health check of showcase page
echo -e "\n${YELLOW}🔍 Checking showcase page health...${NC}"
SHOWCASE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://adesso-cms.ddev.site/complete-paragraph-showcase)

if [ "$SHOWCASE_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ Showcase page is accessible (HTTP $SHOWCASE_STATUS)${NC}"
else
    echo -e "${YELLOW}⚠ Showcase page returned HTTP $SHOWCASE_STATUS${NC}"
fi

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}║     Hook execution complete                                   ║${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"

# Return appropriate exit code
exit $BACKSTOP_EXIT_CODE
