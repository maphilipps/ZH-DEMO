#!/bin/bash

# adesso CMS Configuration Management Script
# Handles Recipe Installation and Configuration Import/Export Coordination

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DRUSH="$PROJECT_ROOT/vendor/bin/drush"
DDEV_PREFIX=""

# Check if we're in DDEV environment
if command -v ddev &> /dev/null && [ "$IS_DDEV_PROJECT" = "true" ]; then
    DDEV_PREFIX="ddev "
    DRUSH="ddev drush"
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Function to create database backup
create_backup() {
    local backup_file="config-backup-$(date +%Y%m%d-%H%M%S).sql"
    log_info "Creating database backup: $backup_file"
    $DRUSH sql:dump --gzip --result-file="$backup_file"
    log_success "Backup created: $backup_file.gz"
}

# Function to export configuration
export_config() {
    log_info "Exporting current configuration..."
    $DRUSH config:export --yes
    log_success "Configuration exported to config-export/"
}

# Function to check configuration status
check_config_status() {
    log_info "Checking configuration status..."
    local status_output
    status_output=$($DRUSH config:status --format=table)
    
    if echo "$status_output" | grep -q "No differences"; then
        log_success "Configuration is synchronized"
        return 0
    else
        log_warning "Configuration differences detected:"
        echo "$status_output"
        return 1
    fi
}

# Function to import configuration
import_config() {
    log_info "Importing configuration..."
    
    # Check if there are any changes to import
    if $DRUSH config:status | grep -q "No differences"; then
        log_info "No configuration changes to import"
        return 0
    fi
    
    # Show diff before import
    log_info "Configuration differences to be imported:"
    $DRUSH config:diff
    
    # Import configuration
    $DRUSH config:import --yes
    log_success "Configuration imported successfully"
}

# Function to install recipe
install_recipe() {
    local recipe_path="$1"
    
    if [ -z "$recipe_path" ]; then
        log_error "Recipe path is required"
        return 1
    fi
    
    if [ ! -f "$recipe_path/recipe.yml" ]; then
        log_error "Recipe file not found: $recipe_path/recipe.yml"
        return 1
    fi
    
    log_info "Installing recipe: $recipe_path"
    
    # Create backup before recipe installation
    create_backup
    
    # Install recipe
    $DRUSH recipe:install "$recipe_path"
    
    log_success "Recipe installed: $recipe_path"
    
    # Export configuration after recipe installation
    log_info "Exporting configuration after recipe installation..."
    export_config
}

# Function to validate installation
validate_installation() {
    log_info "Validating installation..."
    
    # Check if site is accessible
    if ! $DRUSH status | grep -q "Drupal bootstrap.*Successful"; then
        log_error "Site bootstrap failed"
        return 1
    fi
    
    # Check for errors in watchdog
    local errors
    errors=$($DRUSH watchdog:show --type=php --severity=error --count=10 --format=table || true)
    
    if [ -n "$errors" ] && [ "$errors" != "No log messages available." ]; then
        log_warning "Recent PHP errors detected:"
        echo "$errors"
    fi
    
    # Check configuration status
    check_config_status
    
    log_success "Installation validation completed"
}

# Function to sync from recipe to config
sync_recipe_to_config() {
    local recipe_name="$1"
    
    log_info "Syncing recipe '$recipe_name' configuration to config-export..."
    
    # Install or reinstall recipe
    install_recipe "recipes/$recipe_name"
    
    # Export current configuration
    export_config
    
    log_success "Recipe '$recipe_name' synced to configuration"
}

# Function to detect environment
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

# Function to apply environment-specific overrides
apply_environment_overrides() {
    local env=$(detect_environment)
    log_info "Applying $env environment overrides..."
    
    case $env in
        "local")
            # Enable development modules if available
            $DRUSH pm:enable devel -y || true
            $DRUSH pm:enable stage_file_proxy -y || true
            ;;
        "staging")
            # Staging-specific configurations
            $DRUSH config:set system.logging error_level hide -y
            ;;
        "production")
            # Production hardening
            $DRUSH config:set system.logging error_level hide -y
            $DRUSH config:set system.performance css.preprocess 1 -y
            $DRUSH config:set system.performance js.preprocess 1 -y
            ;;
    esac
    
    log_success "Environment overrides applied for: $env"
}

# Function to show usage
show_usage() {
    echo "adesso CMS Configuration Management"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  export                     Export current configuration"
    echo "  import                     Import configuration from config-export"
    echo "  status                     Check configuration status"
    echo "  backup                     Create database backup"
    echo "  install-recipe <path>      Install a recipe"
    echo "  sync-recipe <name>         Sync recipe to configuration"
    echo "  validate                   Validate installation"
    echo "  full-sync                  Full synchronization (backup + export + import)"
    echo "  environment-setup          Apply environment-specific settings"
    echo "  help                       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 install-recipe recipes/adesso_cms_base"
    echo "  $0 sync-recipe adesso_cms_paragraphs"
    echo "  $0 full-sync"
    echo "  $0 environment-setup"
}

# Main command handling
case "${1:-help}" in
    "export")
        export_config
        ;;
    "import")
        import_config
        ;;
    "status")
        check_config_status
        ;;
    "backup")
        create_backup
        ;;
    "install-recipe")
        install_recipe "$2"
        ;;
    "sync-recipe")
        sync_recipe_to_config "$2"
        ;;
    "validate")
        validate_installation
        ;;
    "full-sync")
        log_info "Starting full configuration synchronization..."
        create_backup
        export_config
        check_config_status
        apply_environment_overrides
        validate_installation
        log_success "Full synchronization completed"
        ;;
    "environment-setup")
        apply_environment_overrides
        ;;
    "help"|*)
        show_usage
        ;;
esac