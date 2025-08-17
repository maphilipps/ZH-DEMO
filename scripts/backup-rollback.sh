#!/bin/bash

# adesso CMS Backup and Rollback Strategy
# Comprehensive backup and rollback system for database and configuration

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="$PROJECT_ROOT/backups"
CONFIG_BACKUP_DIR="$BACKUP_DIR/config"
DB_BACKUP_DIR="$BACKUP_DIR/database"
FILES_BACKUP_DIR="$BACKUP_DIR/files"
DRUSH="ddev drush"

# Ensure backup directories exist
mkdir -p "$BACKUP_DIR" "$CONFIG_BACKUP_DIR" "$DB_BACKUP_DIR" "$FILES_BACKUP_DIR"

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

# Function to generate timestamp
get_timestamp() {
    date +%Y%m%d-%H%M%S
}

# Function to create comprehensive backup
create_full_backup() {
    local timestamp=$(get_timestamp)
    local backup_name="${1:-full-backup-$timestamp}"
    
    log_info "Creating full backup: $backup_name"
    
    # Create backup metadata
    local metadata_file="$BACKUP_DIR/$backup_name.json"
    cat > "$metadata_file" << EOF
{
    "backup_name": "$backup_name",
    "timestamp": "$timestamp",
    "environment": "$(detect_environment)",
    "drupal_version": "$(get_drupal_version)",
    "database_file": "$backup_name-database.sql.gz",
    "config_archive": "$backup_name-config.tar.gz",
    "files_archive": "$backup_name-files.tar.gz",
    "created_by": "$(whoami)",
    "server_hostname": "$(hostname)"
}
EOF
    
    # Database backup
    log_info "Backing up database..."
    $DRUSH sql:dump --gzip --result-file="$DB_BACKUP_DIR/$backup_name-database.sql"
    
    # Configuration backup
    log_info "Backing up configuration..."
    tar -czf "$CONFIG_BACKUP_DIR/$backup_name-config.tar.gz" -C "$PROJECT_ROOT" config-export
    
    # Files backup
    log_info "Backing up files..."
    if [ -d "$PROJECT_ROOT/web/sites/default/files" ]; then
        tar -czf "$FILES_BACKUP_DIR/$backup_name-files.tar.gz" -C "$PROJECT_ROOT/web/sites/default" files
    fi
    
    log_success "Full backup created: $backup_name"
    log_info "Backup metadata: $metadata_file"
}

# Function to create database-only backup
create_db_backup() {
    local timestamp=$(get_timestamp)
    local backup_name="${1:-db-backup-$timestamp}"
    
    log_info "Creating database backup: $backup_name"
    $DRUSH sql:dump --gzip --result-file="$DB_BACKUP_DIR/$backup_name.sql"
    log_success "Database backup created: $backup_name.sql.gz"
}

# Function to create configuration-only backup
create_config_backup() {
    local timestamp=$(get_timestamp)
    local backup_name="${1:-config-backup-$timestamp}"
    
    log_info "Creating configuration backup: $backup_name"
    
    # Export current configuration first
    $DRUSH config:export --yes
    
    # Create configuration archive
    tar -czf "$CONFIG_BACKUP_DIR/$backup_name.tar.gz" -C "$PROJECT_ROOT" config-export
    
    log_success "Configuration backup created: $backup_name.tar.gz"
}

# Function to list available backups
list_backups() {
    log_info "Available backups:"
    
    if [ -d "$BACKUP_DIR" ]; then
        find "$BACKUP_DIR" -name "*.json" -type f | while read -r metadata_file; do
            if [ -f "$metadata_file" ]; then
                local backup_name=$(basename "$metadata_file" .json)
                local timestamp=$(jq -r '.timestamp // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
                local environment=$(jq -r '.environment // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
                echo "  - $backup_name ($timestamp, $environment)"
            fi
        done
    else
        log_warning "No backup directory found"
    fi
}

# Function to restore from full backup
restore_full_backup() {
    local backup_name="$1"
    
    if [ -z "$backup_name" ]; then
        log_error "Backup name is required"
        return 1
    fi
    
    local metadata_file="$BACKUP_DIR/$backup_name.json"
    
    if [ ! -f "$metadata_file" ]; then
        log_error "Backup metadata not found: $metadata_file"
        return 1
    fi
    
    log_warning "DESTRUCTIVE OPERATION: This will restore the site to backup state"
    echo "Backup: $backup_name"
    echo "Timestamp: $(jq -r '.timestamp' "$metadata_file")"
    echo "Environment: $(jq -r '.environment' "$metadata_file")"
    echo ""
    read -p "Are you sure you want to continue? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        log_info "Restore cancelled"
        return 0
    fi
    
    # Create a backup before restore
    log_info "Creating pre-restore backup..."
    create_full_backup "pre-restore-$(get_timestamp)"
    
    # Restore database
    local db_file=$(jq -r '.database_file' "$metadata_file")
    if [ -f "$DB_BACKUP_DIR/$db_file" ]; then
        log_info "Restoring database from $db_file..."
        $DRUSH sql:drop --yes
        gunzip -c "$DB_BACKUP_DIR/$db_file" | $DRUSH sql:cli
    fi
    
    # Restore configuration
    local config_file=$(jq -r '.config_archive' "$metadata_file")
    if [ -f "$CONFIG_BACKUP_DIR/$config_file" ]; then
        log_info "Restoring configuration from $config_file..."
        rm -rf "$PROJECT_ROOT/config-export"
        tar -xzf "$CONFIG_BACKUP_DIR/$config_file" -C "$PROJECT_ROOT"
        $DRUSH config:import --yes
    fi
    
    # Restore files
    local files_file=$(jq -r '.files_archive' "$metadata_file")
    if [ -f "$FILES_BACKUP_DIR/$files_file" ]; then
        log_info "Restoring files from $files_file..."
        rm -rf "$PROJECT_ROOT/web/sites/default/files"
        tar -xzf "$FILES_BACKUP_DIR/$files_file" -C "$PROJECT_ROOT/web/sites/default"
    fi
    
    # Clear caches
    $DRUSH cache:rebuild
    
    log_success "Full restore completed from backup: $backup_name"
}

# Function to restore database only
restore_database() {
    local backup_file="$1"
    
    if [ -z "$backup_file" ]; then
        log_error "Database backup file is required"
        return 1
    fi
    
    if [ ! -f "$DB_BACKUP_DIR/$backup_file" ]; then
        log_error "Database backup file not found: $DB_BACKUP_DIR/$backup_file"
        return 1
    fi
    
    log_warning "DESTRUCTIVE OPERATION: This will replace the current database"
    read -p "Are you sure you want to continue? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        log_info "Database restore cancelled"
        return 0
    fi
    
    # Create pre-restore backup
    create_db_backup "pre-db-restore-$(get_timestamp)"
    
    log_info "Restoring database from $backup_file..."
    $DRUSH sql:drop --yes
    
    if [[ "$backup_file" == *.gz ]]; then
        gunzip -c "$DB_BACKUP_DIR/$backup_file" | $DRUSH sql:cli
    else
        $DRUSH sql:cli < "$DB_BACKUP_DIR/$backup_file"
    fi
    
    # Clear caches
    $DRUSH cache:rebuild
    
    log_success "Database restored from: $backup_file"
}

# Function to restore configuration only
restore_configuration() {
    local config_archive="$1"
    
    if [ -z "$config_archive" ]; then
        log_error "Configuration archive is required"
        return 1
    fi
    
    if [ ! -f "$CONFIG_BACKUP_DIR/$config_archive" ]; then
        log_error "Configuration archive not found: $CONFIG_BACKUP_DIR/$config_archive"
        return 1
    fi
    
    log_warning "This will replace the current configuration"
    read -p "Are you sure you want to continue? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        log_info "Configuration restore cancelled"
        return 0
    fi
    
    # Create pre-restore backup
    create_config_backup "pre-config-restore-$(get_timestamp)"
    
    log_info "Restoring configuration from $config_archive..."
    rm -rf "$PROJECT_ROOT/config-export"
    tar -xzf "$CONFIG_BACKUP_DIR/$config_archive" -C "$PROJECT_ROOT"
    $DRUSH config:import --yes
    
    log_success "Configuration restored from: $config_archive"
}

# Function to clean old backups
cleanup_backups() {
    local days="${1:-30}"
    
    log_info "Cleaning backups older than $days days..."
    
    find "$BACKUP_DIR" -name "*.json" -mtime +$days -type f | while read -r metadata_file; do
        local backup_name=$(basename "$metadata_file" .json)
        log_info "Removing old backup: $backup_name"
        
        # Remove associated files
        rm -f "$metadata_file"
        rm -f "$DB_BACKUP_DIR/$backup_name"*.sql*
        rm -f "$CONFIG_BACKUP_DIR/$backup_name"*.tar.gz
        rm -f "$FILES_BACKUP_DIR/$backup_name"*.tar.gz
    done
    
    log_success "Backup cleanup completed"
}

# Function to verify backup integrity
verify_backup() {
    local backup_name="$1"
    
    if [ -z "$backup_name" ]; then
        log_error "Backup name is required"
        return 1
    fi
    
    local metadata_file="$BACKUP_DIR/$backup_name.json"
    
    if [ ! -f "$metadata_file" ]; then
        log_error "Backup metadata not found: $metadata_file"
        return 1
    fi
    
    log_info "Verifying backup: $backup_name"
    
    local errors=0
    
    # Check database backup
    local db_file=$(jq -r '.database_file' "$metadata_file")
    if [ ! -f "$DB_BACKUP_DIR/$db_file" ]; then
        log_error "Database backup file missing: $db_file"
        ((errors++))
    fi
    
    # Check configuration backup
    local config_file=$(jq -r '.config_archive' "$metadata_file")
    if [ ! -f "$CONFIG_BACKUP_DIR/$config_file" ]; then
        log_error "Configuration backup file missing: $config_file"
        ((errors++))
    fi
    
    # Check files backup
    local files_file=$(jq -r '.files_archive' "$metadata_file")
    if [ "$files_file" != "null" ] && [ ! -f "$FILES_BACKUP_DIR/$files_file" ]; then
        log_error "Files backup file missing: $files_file"
        ((errors++))
    fi
    
    if [ $errors -eq 0 ]; then
        log_success "Backup verification passed: $backup_name"
    else
        log_error "Backup verification failed with $errors errors"
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

get_drupal_version() {
    $DRUSH status drupal-version --format=string 2>/dev/null || echo "unknown"
}

# Function to show usage
show_usage() {
    echo "adesso CMS Backup and Rollback System"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Backup Commands:"
    echo "  full-backup [name]         Create full backup (database + config + files)"
    echo "  db-backup [name]           Create database backup only"
    echo "  config-backup [name]       Create configuration backup only"
    echo "  list                       List available backups"
    echo "  verify <backup_name>       Verify backup integrity"
    echo "  cleanup [days]             Clean backups older than X days (default: 30)"
    echo ""
    echo "Restore Commands:"
    echo "  restore-full <backup_name> Restore full backup"
    echo "  restore-db <backup_file>   Restore database only"
    echo "  restore-config <archive>   Restore configuration only"
    echo ""
    echo "Examples:"
    echo "  $0 full-backup pre-recipe-install"
    echo "  $0 restore-full full-backup-20250816-143000"
    echo "  $0 restore-db db-backup-20250816-143000.sql.gz"
    echo "  $0 cleanup 7"
}

# Main command handling
case "${1:-help}" in
    "full-backup")
        create_full_backup "$2"
        ;;
    "db-backup")
        create_db_backup "$2"
        ;;
    "config-backup")
        create_config_backup "$2"
        ;;
    "list")
        list_backups
        ;;
    "verify")
        verify_backup "$2"
        ;;
    "cleanup")
        cleanup_backups "$2"
        ;;
    "restore-full")
        restore_full_backup "$2"
        ;;
    "restore-db")
        restore_database "$2"
        ;;
    "restore-config")
        restore_configuration "$2"
        ;;
    "help"|*)
        show_usage
        ;;
esac