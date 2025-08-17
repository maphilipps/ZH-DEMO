#!/bin/bash

# adesso CMS Configuration Validation and Testing Pipeline
# Comprehensive validation system for configuration integrity and compliance

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DRUSH="ddev drush"
VALIDATION_RESULTS_DIR="$PROJECT_ROOT/validation-results"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Ensure validation results directory exists
mkdir -p "$VALIDATION_RESULTS_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_check() {
    echo -e "${PURPLE}[CHECK]${NC} $1"
}

# Global validation results
VALIDATION_ERRORS=0
VALIDATION_WARNINGS=0
VALIDATION_PASSES=0

# Function to increment counters
increment_error() {
    ((VALIDATION_ERRORS++))
}

increment_warning() {
    ((VALIDATION_WARNINGS++))
}

increment_pass() {
    ((VALIDATION_PASSES++))
}

# Function to validate configuration synchronization
validate_config_sync() {
    log_check "Validating configuration synchronization..."
    
    local config_status
    config_status=$($DRUSH config:status --format=table 2>/dev/null || echo "ERROR")
    
    if [[ "$config_status" == *"No differences"* ]]; then
        log_success "Configuration is synchronized"
        increment_pass
    elif [[ "$config_status" == "ERROR" ]]; then
        log_error "Failed to check configuration status"
        increment_error
    else
        log_error "Configuration is not synchronized"
        echo "$config_status"
        increment_error
    fi
}

# Function to validate required modules
validate_required_modules() {
    log_check "Validating required modules are enabled..."
    
    local required_modules=(
        "node"
        "user"
        "system"
        "field"
        "text"
        "image"
        "media"
        "paragraphs"
        "gin"
        "navigation"
    )
    
    for module in "${required_modules[@]}"; do
        if $DRUSH pm:list --status=enabled --format=list | grep -q "^$module$"; then
            log_success "Module enabled: $module"
            increment_pass
        else
            log_error "Required module not enabled: $module"
            increment_error
        fi
    done
}

# Function to validate database schema
validate_database_schema() {
    log_check "Validating database schema integrity..."
    
    # Check for database updates
    local updates
    updates=$($DRUSH updatedb:status --format=list 2>/dev/null || echo "ERROR")
    
    if [[ "$updates" == "ERROR" ]]; then
        log_error "Failed to check database updates"
        increment_error
    elif [[ -z "$updates" || "$updates" == "No database updates required" ]]; then
        log_success "Database schema is up to date"
        increment_pass
    else
        log_warning "Database updates pending:"
        echo "$updates"
        increment_warning
    fi
}

# Function to validate entity integrity
validate_entity_integrity() {
    log_check "Validating entity integrity..."
    
    # Check for orphaned content
    local orphaned_nodes
    orphaned_nodes=$($DRUSH sql:query "SELECT COUNT(*) FROM node WHERE type NOT IN (SELECT type FROM node_type)" 2>/dev/null || echo "0")
    
    if [[ "$orphaned_nodes" -gt 0 ]]; then
        log_error "Found $orphaned_nodes orphaned nodes"
        increment_error
    else
        log_success "No orphaned nodes found"
        increment_pass
    fi
    
    # Check for missing field storage
    local missing_fields
    missing_fields=$($DRUSH entity:updates --format=list 2>/dev/null || echo "")
    
    if [[ -n "$missing_fields" ]]; then
        log_warning "Entity updates required:"
        echo "$missing_fields"
        increment_warning
    else
        log_success "Entity schema is consistent"
        increment_pass
    fi
}

# Function to validate German brand compliance
validate_german_brand_compliance() {
    log_check "Validating German brand compliance..."
    
    # Check site name
    local site_name
    site_name=$($DRUSH config:get system.site name --format=string 2>/dev/null || echo "")
    
    if [[ "$site_name" == *"adesso"* && "$site_name" != *"Adesso"* && "$site_name" != *"ADESSO"* ]]; then
        log_success "Site name follows adesso brand guidelines (lowercase)"
        increment_pass
    else
        log_error "Site name violates brand guidelines: $site_name (adesso must be lowercase)"
        increment_error
    fi
    
    # Check site slogan
    local site_slogan
    site_slogan=$($DRUSH config:get system.site slogan --format=string 2>/dev/null || echo "")
    
    if [[ "$site_slogan" == *"adesso"* && "$site_slogan" != *"Adesso"* && "$site_slogan" != *"ADESSO"* ]]; then
        log_success "Site slogan follows adesso brand guidelines"
        increment_pass
    elif [[ -z "$site_slogan" ]]; then
        log_warning "Site slogan is empty"
        increment_warning
    else
        log_error "Site slogan violates brand guidelines: $site_slogan"
        increment_error
    fi
}

# Function to validate AI configuration
validate_ai_configuration() {
    log_check "Validating AI configuration..."
    
    # Check if AI modules are enabled
    local ai_modules=(
        "ai"
        "ai_content_suggestions"
        "ai_image_alt_text"
    )
    
    for module in "${ai_modules[@]}"; do
        if $DRUSH pm:list --status=enabled --format=list | grep -q "^$module$"; then
            log_success "AI module enabled: $module"
            increment_pass
            
            # Check AI provider configuration
            if [[ "$module" == "ai" ]]; then
                local providers
                providers=$($DRUSH config:get ai.settings providers --format=list 2>/dev/null || echo "")
                
                if [[ -n "$providers" ]]; then
                    log_success "AI providers configured"
                    increment_pass
                else
                    log_warning "No AI providers configured"
                    increment_warning
                fi
            fi
        else
            log_warning "AI module not enabled: $module"
            increment_warning
        fi
    done
}

# Function to validate media configuration
validate_media_configuration() {
    log_check "Validating media configuration..."
    
    # Check media types
    local media_types
    media_types=$($DRUSH config:get --format=list 2>/dev/null | grep "^media.type." | wc -l)
    
    if [[ "$media_types" -gt 0 ]]; then
        log_success "Media types configured: $media_types"
        increment_pass
    else
        log_error "No media types configured"
        increment_error
    fi
    
    # Check image styles
    local image_styles
    image_styles=$($DRUSH config:get --format=list 2>/dev/null | grep "^image.style." | wc -l)
    
    if [[ "$image_styles" -gt 10 ]]; then
        log_success "Image styles configured: $image_styles"
        increment_pass
    else
        log_warning "Limited image styles configured: $image_styles"
        increment_warning
    fi
}

# Function to validate paragraph configuration
validate_paragraph_configuration() {
    log_check "Validating paragraph configuration..."
    
    # Check if paragraphs module is enabled
    if $DRUSH pm:list --status=enabled --format=list | grep -q "^paragraphs$"; then
        log_success "Paragraphs module enabled"
        increment_pass
        
        # Check paragraph types
        local paragraph_types
        paragraph_types=$($DRUSH config:get --format=list 2>/dev/null | grep "^paragraphs.paragraphs_type." | wc -l)
        
        if [[ "$paragraph_types" -gt 5 ]]; then
            log_success "Paragraph types configured: $paragraph_types"
            increment_pass
        else
            log_warning "Limited paragraph types configured: $paragraph_types"
            increment_warning
        fi
    else
        log_error "Paragraphs module not enabled"
        increment_error
    fi
}

# Function to validate security configuration
validate_security_configuration() {
    log_check "Validating security configuration..."
    
    # Check trusted host patterns
    local trusted_hosts
    trusted_hosts=$($DRUSH config:get system.site trusted_host_patterns --format=list 2>/dev/null || echo "")
    
    if [[ -n "$trusted_hosts" ]]; then
        log_success "Trusted host patterns configured"
        increment_pass
    else
        log_warning "No trusted host patterns configured"
        increment_warning
    fi
    
    # Check if security modules are enabled
    local security_modules=(
        "captcha"
        "honeypot"
    )
    
    for module in "${security_modules[@]}"; do
        if $DRUSH pm:list --status=enabled --format=list | grep -q "^$module$"; then
            log_success "Security module enabled: $module"
            increment_pass
        else
            log_warning "Security module not enabled: $module"
            increment_warning
        fi
    done
}

# Function to validate performance configuration
validate_performance_configuration() {
    log_check "Validating performance configuration..."
    
    # Check caching configuration
    local page_cache
    page_cache=$($DRUSH config:get system.performance cache.page.max_age --format=string 2>/dev/null || echo "0")
    
    if [[ "$page_cache" -gt 0 ]]; then
        log_success "Page caching enabled: ${page_cache}s"
        increment_pass
    else
        log_warning "Page caching disabled"
        increment_warning
    fi
    
    # Check CSS/JS aggregation (environment dependent)
    local environment=$(detect_environment)
    local css_preprocess
    css_preprocess=$($DRUSH config:get system.performance css.preprocess --format=string 2>/dev/null || echo "false")
    
    if [[ "$environment" == "production" && "$css_preprocess" == "1" ]]; then
        log_success "CSS aggregation enabled for production"
        increment_pass
    elif [[ "$environment" == "local" && "$css_preprocess" == "0" ]]; then
        log_success "CSS aggregation disabled for development"
        increment_pass
    else
        log_warning "CSS aggregation setting may not be optimal for $environment environment"
        increment_warning
    fi
}

# Function to validate theme configuration
validate_theme_configuration() {
    log_check "Validating theme configuration..."
    
    # Check default theme
    local default_theme
    default_theme=$($DRUSH config:get system.theme default --format=string 2>/dev/null || echo "")
    
    if [[ -n "$default_theme" ]]; then
        log_success "Default theme configured: $default_theme"
        increment_pass
    else
        log_error "No default theme configured"
        increment_error
    fi
    
    # Check admin theme
    local admin_theme
    admin_theme=$($DRUSH config:get system.theme admin --format=string 2>/dev/null || echo "")
    
    if [[ "$admin_theme" == "gin" ]]; then
        log_success "Admin theme correctly set to Gin"
        increment_pass
    else
        log_warning "Admin theme not set to Gin: $admin_theme"
        increment_warning
    fi
}

# Function to validate watchdog for critical errors
validate_system_health() {
    log_check "Validating system health..."
    
    # Check for recent critical errors
    local critical_errors
    critical_errors=$($DRUSH watchdog:show --type=php --severity=error --count=5 --format=table 2>/dev/null || echo "")
    
    if [[ -z "$critical_errors" || "$critical_errors" == *"No log messages"* ]]; then
        log_success "No recent critical errors found"
        increment_pass
    else
        log_error "Recent critical errors found:"
        echo "$critical_errors"
        increment_error
    fi
    
    # Check PHP memory usage
    local memory_limit
    memory_limit=$($DRUSH status php-memory-limit --format=string 2>/dev/null || echo "unknown")
    
    if [[ "$memory_limit" != "unknown" ]]; then
        log_success "PHP memory limit: $memory_limit"
        increment_pass
    else
        log_warning "Could not determine PHP memory limit"
        increment_warning
    fi
}

# Function to run complete validation
run_complete_validation() {
    log_info "Starting comprehensive configuration validation..."
    
    local validation_report="$VALIDATION_RESULTS_DIR/validation-report-$TIMESTAMP.txt"
    
    {
        echo "adesso CMS Configuration Validation Report"
        echo "Generated: $(date)"
        echo "Environment: $(detect_environment)"
        echo "=========================================="
        echo ""
    } > "$validation_report"
    
    # Run all validation checks
    validate_config_sync
    validate_required_modules
    validate_database_schema
    validate_entity_integrity
    validate_german_brand_compliance
    validate_ai_configuration
    validate_media_configuration
    validate_paragraph_configuration
    validate_security_configuration
    validate_performance_configuration
    validate_theme_configuration
    validate_system_health
    
    # Generate summary
    local total_checks=$((VALIDATION_ERRORS + VALIDATION_WARNINGS + VALIDATION_PASSES))
    
    {
        echo ""
        echo "Validation Summary:"
        echo "=================="
        echo "Total Checks: $total_checks"
        echo "Passed: $VALIDATION_PASSES"
        echo "Warnings: $VALIDATION_WARNINGS"
        echo "Errors: $VALIDATION_ERRORS"
        echo ""
    } >> "$validation_report"
    
    log_info "Validation completed. Report saved to: $validation_report"
    log_info "Summary: $VALIDATION_PASSES passed, $VALIDATION_WARNINGS warnings, $VALIDATION_ERRORS errors"
    
    if [[ $VALIDATION_ERRORS -eq 0 ]]; then
        log_success "Configuration validation PASSED"
        return 0
    else
        log_error "Configuration validation FAILED with $VALIDATION_ERRORS errors"
        return 1
    fi
}

# Function to run quick validation
run_quick_validation() {
    log_info "Running quick configuration validation..."
    
    validate_config_sync
    validate_required_modules
    validate_system_health
    
    if [[ $VALIDATION_ERRORS -eq 0 ]]; then
        log_success "Quick validation PASSED"
        return 0
    else
        log_error "Quick validation FAILED"
        return 1
    fi
}

# Helper functions
detect_environment() {
    if [ "$IS_DDEV_PROJECT" = "true" ]; then
        echo "local"
    elif [ -n "$STAGING_ENV" ]; then
        echo "staging"
    elif [ -n "$PRODUCTION_ENV" ]; then
        echo "production"
    else
        echo "local"
    fi
}

# Function to show usage
show_usage() {
    echo "adesso CMS Configuration Validation Pipeline"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  full                       Run complete validation suite"
    echo "  quick                      Run quick validation checks"
    echo "  config-sync                Validate configuration synchronization"
    echo "  modules                    Validate required modules"
    echo "  database                   Validate database schema"
    echo "  entities                   Validate entity integrity"
    echo "  brand                      Validate German brand compliance"
    echo "  ai                         Validate AI configuration"
    echo "  media                      Validate media configuration"
    echo "  paragraphs                 Validate paragraph configuration"
    echo "  security                   Validate security configuration"
    echo "  performance                Validate performance configuration"
    echo "  themes                     Validate theme configuration"
    echo "  health                     Validate system health"
    echo "  help                       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 full                    # Run complete validation"
    echo "  $0 quick                   # Run quick checks"
    echo "  $0 brand                   # Check brand compliance only"
}

# Main command handling
case "${1:-help}" in
    "full")
        run_complete_validation
        ;;
    "quick")
        run_quick_validation
        ;;
    "config-sync")
        validate_config_sync
        ;;
    "modules")
        validate_required_modules
        ;;
    "database")
        validate_database_schema
        ;;
    "entities")
        validate_entity_integrity
        ;;
    "brand")
        validate_german_brand_compliance
        ;;
    "ai")
        validate_ai_configuration
        ;;
    "media")
        validate_media_configuration
        ;;
    "paragraphs")
        validate_paragraph_configuration
        ;;
    "security")
        validate_security_configuration
        ;;
    "performance")
        validate_performance_configuration
        ;;
    "themes")
        validate_theme_configuration
        ;;
    "health")
        validate_system_health
        ;;
    "help"|*)
        show_usage
        ;;
esac