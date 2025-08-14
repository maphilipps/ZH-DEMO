#!/bin/bash

# adesso CMS Installation Validation Script
# This script validates that all required modules and configurations are properly installed

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "\033[0;34m[INFO]\033[0m $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

VALIDATION_FAILED=false

log_info "=== adesso CMS Installation Validation ==="

# Check if Drupal is installed
if ! drush status bootstrap 2>/dev/null | grep -q "Successful"; then
    log_error "Drupal is not properly installed"
    VALIDATION_FAILED=true
else
    log_success "Drupal core is properly installed"
fi

# Check critical modules
CRITICAL_MODULES=(
    "node"
    "user"
    "system"
    "paragraphs"
    "ai"
    "adesso_cms_theme"
)

log_info "Checking critical modules..."
for module in "${CRITICAL_MODULES[@]}"; do
    if drush pm:list --status=enabled --format=list | grep -q "^$module$"; then
        log_success "Module '$module' is enabled"
    else
        log_error "Critical module '$module' is not enabled"
        VALIDATION_FAILED=true
    fi
done

# Check AI configuration
log_info "Checking AI configuration..."
if drush config:get ai.settings provider 2>/dev/null | grep -q "anthropic\|openai"; then
    log_success "AI provider is configured"
else
    log_warning "AI provider may not be properly configured"
fi

# Check theme configuration
log_info "Checking theme configuration..."
DEFAULT_THEME=$(drush config:get system.theme default 2>/dev/null | grep -oP "default: '\K[^']+")
if [ "$DEFAULT_THEME" = "adesso_cms_theme" ]; then
    log_success "Default theme is set to adesso_cms_theme"
else
    log_warning "Default theme is '$DEFAULT_THEME' (expected: adesso_cms_theme)"
fi

# Check content types
log_info "Checking content types..."
CONTENT_TYPES=("page" "news" "event" "person" "project")
for type in "${CONTENT_TYPES[@]}"; do
    if drush config:get node.type.$type 2>/dev/null >/dev/null; then
        log_success "Content type '$type' is configured"
    else
        log_error "Content type '$type' is missing"
        VALIDATION_FAILED=true
    fi
done

# Check paragraph types
log_info "Checking paragraph types..."
PARAGRAPH_TYPES=("accordion" "hero" "text" "card_group" "gallery")
for type in "${PARAGRAPH_TYPES[@]}"; do
    if drush config:get paragraphs.paragraphs_type.$type 2>/dev/null >/dev/null; then
        log_success "Paragraph type '$type' is configured"
    else
        log_warning "Paragraph type '$type' may be missing"
    fi
done

# Final validation result
if [ "$VALIDATION_FAILED" = true ]; then
    log_error "Installation validation FAILED - Please check the errors above"
    exit 1
else
    log_success "Installation validation PASSED - adesso CMS is properly configured"
    exit 0
fi
