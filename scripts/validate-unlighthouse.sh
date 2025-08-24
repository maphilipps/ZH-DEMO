#!/bin/bash

# Unlighthouse Integration Validation Script
# This script validates that the Unlighthouse integration is working correctly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

echo "============================================="
echo "🏔️ Unlighthouse Integration Validation"
echo "   GPZH Demo System - Issue #18"
echo "============================================="
echo ""

# 1. Check if DDEV is running
print_info "1. Checking DDEV status..."
if ! ddev status | grep -q "zh-demo"; then
    print_error "DDEV is not running. Please run 'ddev start' first."
    exit 1
fi
print_success "DDEV is running"

# 2. Check if unlighthouse container is running
print_info "2. Checking Unlighthouse container..."
if ! docker ps --filter "name=ddev-zh-demo-unlighthouse" --format "{{.Names}}" | grep -q "ddev-zh-demo-unlighthouse"; then
    print_error "Unlighthouse container is not running"
    exit 1
fi
print_success "Unlighthouse container is running"

# 3. Check if site is accessible
print_info "3. Checking site accessibility..."
if ! curl -s -k --max-time 10 "https://zh-demo.ddev.site" > /dev/null; then
    print_error "Site is not accessible at https://zh-demo.ddev.site"
    exit 1
fi
print_success "Site is accessible"

# 4. Check configuration file
print_info "4. Validating configuration files..."
if [ ! -f "unlighthouse.config.ts" ]; then
    print_error "unlighthouse.config.ts not found"
    exit 1
fi
if [ ! -f ".ddev/docker-compose.unlighthouse.yaml" ]; then
    print_error "Docker compose file not found"
    exit 1
fi
print_success "Configuration files exist"

# 5. Check DDEV command
print_info "5. Checking DDEV unlighthouse command..."
if [ ! -f ".ddev/commands/web/unlighthouse" ]; then
    print_error "DDEV unlighthouse command not found"
    exit 1
fi
if [ ! -x ".ddev/commands/web/unlighthouse" ]; then
    print_error "DDEV unlighthouse command is not executable"
    exit 1
fi
print_success "DDEV command is ready"

# 6. Test command help
print_info "6. Testing command help..."
echo ""
ddev unlighthouse --help
echo ""

# 7. Check if Unlighthouse service port is accessible
print_info "7. Checking Unlighthouse service port..."
if curl -s -k --max-time 5 "https://zh-demo.ddev.site:5678" | grep -q "404\|error"; then
    print_warning "Unlighthouse UI not yet active (normal until first scan)"
else
    print_success "Unlighthouse service port responding"
fi

# 8. Test quick demo scan (if user confirms)
echo ""
print_info "8. Ready for demo scan test..."
echo "Would you like to run a quick demo validation scan? (y/N)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    print_info "Running quick demo validation scan..."
    ddev unlighthouse --demo-check
else
    print_info "Skipping demo scan (run 'ddev unlighthouse --demo-check' manually)"
fi

echo ""
print_success "🎉 Unlighthouse integration validation complete!"
echo ""
echo "Available commands:"
echo "  ddev unlighthouse              # Full scan (mobile + desktop)"
echo "  ddev unlighthouse --demo-check # Quick demo validation"
echo "  ddev unlighthouse --mobile     # Mobile-only scan"
echo "  ddev unlighthouse --desktop    # Desktop-only scan"
echo ""
echo "Results will be available at: https://zh-demo.ddev.site:5678"
echo ""
echo "Swiss Compliance Features:"
echo "  ✓ WCAG 2.1 AA accessibility testing"
echo "  ✓ eCH-0059 Swiss Government Standards"
echo "  ✓ Performance budgets (90+ required)"
echo "  ✓ Mobile touch target validation (44px minimum)"
echo "  ✓ Font size validation (16px minimum)"
echo ""