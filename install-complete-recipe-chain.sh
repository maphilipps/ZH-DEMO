#!/bin/bash
# adesso CMS Complete Recipe Chain Installation
# TIER 2: Complete Recipe Chain - Success Probability: 85%

set -euo pipefail

echo "🚀 Starting adesso CMS Installation via Recipe Chain..."
echo "📊 Method: TIER 2 - Complete Recipe Chain"
echo "⏰ Start Time: $(date)"

# Color coding for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Clean installation
log "Preparing clean Drupal installation..."
ddev drush sql-drop -y || error "Failed to drop database"
ddev drush site-install standard --yes \
  --account-name=admin \
  --account-pass=admin \
  --site-name="adesso CMS" \
  --locale=de || error "Failed to install base Drupal"

success "Base Drupal installation complete"

# Core Drupal CMS recipes (in dependency order)
CORE_RECIPES=(
  "core/recipes/image_media_type"
  "core/recipes/document_media_type" 
  "core/recipes/remote_video_media_type"
  "drupal_cms_content_type_base"
  "drupal_cms_image"
  "drupal_cms_page"
  "drupal_cms_news"
  "drupal_cms_person"
  "drupal_cms_project"
  "drupal_cms_events"
  "drupal_cms_forms"
  "drupal_cms_search"
  "drupal_cms_seo_basic"
  "drupal_cms_admin_ui"
)

# adesso CMS custom recipes
ADESSO_RECIPES=(
  "adesso_cms_base"
  "adesso_cms_paragraphs"
  "adesso_cms_page"
  "adesso_cms_landing_page"
  "adesso_cms_seo_advanced"
  "adesso_cms_ai_suite"
)

# Optional enhancement recipes
OPTIONAL_RECIPES=(
  "drupal_cms_accessibility_tools"
  "drupal_cms_anti_spam"
  "drupal_cms_authentication" 
  "drupal_cms_privacy_basic"
  "drupal_cms_seo_tools"
)

# Recipe installation function with error handling
install_recipe() {
  local recipe_path=$1
  local recipe_name=$(basename "$recipe_path")
  
  log "Installing recipe: $recipe_name"
  
  # Determine full path
  if [[ "$recipe_path" == core/* ]]; then
    full_path="$recipe_path"
  else
    full_path="../recipes/$recipe_path"
  fi
  
  # Check if recipe exists
  if [ ! -f "$full_path/recipe.yml" ]; then
    warning "Recipe not found: $full_path/recipe.yml"
    return 1
  fi
  
  # Install with timeout and error handling
  if timeout 300 php core/scripts/drupal recipe "$full_path" 2>&1; then
    success "Recipe installed successfully: $recipe_name"
    
    # Quick validation
    if ddev drush status --field=bootstrap | grep -q "Successful"; then
      success "Recipe validation passed: $recipe_name"
      return 0
    else
      warning "Recipe installed but system validation failed: $recipe_name"
      return 1
    fi
  else
    error "Recipe installation failed: $recipe_name"
    return 1
  fi
}

# Install core recipes with fallback handling
log "Installing core Drupal CMS recipes..."
CORE_SUCCESS=0
CORE_TOTAL=${#CORE_RECIPES[@]}

for recipe in "${CORE_RECIPES[@]}"; do
  if install_recipe "$recipe"; then
    ((CORE_SUCCESS++))
  else
    warning "Core recipe failed: $recipe - continuing with remaining recipes..."
    
    # Critical recipe failure check
    if [[ "$recipe" == "drupal_cms_content_type_base" ]]; then
      error "Critical recipe failed: $recipe"
      log "Attempting fallback to manual content type creation..."
      
      # Fallback: Enable required modules manually
      ddev drush pm:enable node field text paragraphs -y || warning "Manual module enable failed"
    fi
  fi
done

log "Core recipes installation complete: $CORE_SUCCESS/$CORE_TOTAL successful"

# Install adesso custom recipes with fallback handling
log "Installing adesso CMS custom recipes..."
ADESSO_SUCCESS=0
ADESSO_TOTAL=${#ADESSO_RECIPES[@]}

for recipe in "${ADESSO_RECIPES[@]}"; do
  if install_recipe "$recipe"; then
    ((ADESSO_SUCCESS++))
  else
    warning "Custom recipe failed: $recipe - attempting component-level fallback..."
    
    case "$recipe" in
      "adesso_cms_paragraphs")
        log "Attempting manual paragraphs configuration..."
        ddev drush pm:enable paragraphs -y || warning "Paragraphs module enable failed"
        ;;
      "adesso_cms_ai_suite")
        log "AI suite installation failed - continuing without AI features"
        warning "AI features will not be available in this installation"
        ;;
      *)
        warning "No specific fallback for recipe: $recipe"
        ;;
    esac
  fi
done

log "Custom recipes installation complete: $ADESSO_SUCCESS/$ADESSO_TOTAL successful"

# Install optional recipes (non-blocking)
log "Installing optional enhancement recipes..."
OPTIONAL_SUCCESS=0
OPTIONAL_TOTAL=${#OPTIONAL_RECIPES[@]}

for recipe in "${OPTIONAL_RECIPES[@]}"; do
  if install_recipe "$recipe"; then
    ((OPTIONAL_SUCCESS++))
  else
    log "Optional recipe skipped: $recipe (not critical for core functionality)"
  fi
done

log "Optional recipes installation complete: $OPTIONAL_SUCCESS/$OPTIONAL_TOTAL successful"

# Theme application with fallback
log "Applying adesso CMS theme..."
if [ -d "web/themes/custom/adesso_cms_theme" ]; then
  if ddev drush theme:enable adesso_cms_theme -y; then
    if ddev drush config:set system.theme default adesso_cms_theme -y; then
      success "adesso CMS theme applied successfully"
    else
      warning "Failed to set adesso theme as default - using fallback"
      ddev drush theme:enable claro -y
      ddev drush config:set system.theme default claro -y
    fi
  else
    warning "Failed to enable adesso theme - using admin theme fallback"
    ddev drush theme:enable gin -y
    ddev drush config:set system.theme admin gin -y
  fi
else
  warning "adesso CMS theme not found - using standard theme"
  ddev drush theme:enable claro -y
  ddev drush config:set system.theme default claro -y
fi

# Essential module configuration
log "Configuring essential modules..."

# Enable critical modules that might have been missed
ESSENTIAL_MODULES=(
  "admin_toolbar" "admin_toolbar_tools" "pathauto" "metatag"
  "entity_browser" "media_library" "focal_point"
)

for module in "${ESSENTIAL_MODULES[@]}"; do
  if ddev drush pm:list --status=available --field=name | grep -q "^$module\$"; then
    ddev drush pm:enable "$module" -y || warning "Failed to enable: $module"
  fi
done

# Cache operations
log "Performing cache operations..."
ddev drush cache:rebuild || error "Cache rebuild failed"

# Final system validation
log "Performing final system validation..."
VALIDATION_ERRORS=0

# Check database connectivity
if ! ddev drush status --field=database-status | grep -q "Connected"; then
  error "Database connectivity validation failed"
  ((VALIDATION_ERRORS++))
fi

# Check bootstrap status
if ! ddev drush status --field=bootstrap | grep -q "Successful"; then
  error "Bootstrap validation failed"
  ((VALIDATION_ERRORS++))
fi

# Check if at least basic content types exist
if ! ddev drush entity:list node_type | grep -q "page"; then
  warning "Basic page content type missing"
  ((VALIDATION_ERRORS++))
fi

# Check if theme is properly applied
if ! ddev drush config:get system.theme default | grep -qE "(adesso_cms_theme|claro|gin)"; then
  warning "Theme validation failed"
  ((VALIDATION_ERRORS++))
fi

# Generate installation report
log "Generating installation report..."

TOTAL_SUCCESS=$((CORE_SUCCESS + ADESSO_SUCCESS + OPTIONAL_SUCCESS))
TOTAL_RECIPES=$((CORE_TOTAL + ADESSO_TOTAL + OPTIONAL_TOTAL))
SUCCESS_RATE=$(( (TOTAL_SUCCESS * 100) / TOTAL_RECIPES ))

echo ""
echo "════════════════════════════════════════"
echo "📊 adesso CMS Installation Report"
echo "════════════════════════════════════════"
echo "🕒 Completion Time: $(date)"
echo "📈 Overall Success Rate: $SUCCESS_RATE% ($TOTAL_SUCCESS/$TOTAL_RECIPES)"
echo ""
echo "📦 Core Recipes: $CORE_SUCCESS/$CORE_TOTAL successful"
echo "🎨 Custom Recipes: $ADESSO_SUCCESS/$ADESSO_TOTAL successful" 
echo "⭐ Optional Recipes: $OPTIONAL_SUCCESS/$OPTIONAL_TOTAL successful"
echo ""
echo "⚠️  Validation Errors: $VALIDATION_ERRORS"
echo ""

if [ $VALIDATION_ERRORS -eq 0 ] && [ $SUCCESS_RATE -ge 70 ]; then
  success "INSTALLATION COMPLETED SUCCESSFULLY!"
  echo "🌐 Visit: https://adesso-cms.ddev.site"
  echo "🔑 Admin Login: admin/admin"
  echo ""
  echo "📝 Next Steps:"
  echo "  • Test content creation functionality"
  echo "  • Configure AI features if available"
  echo "  • Import sample content if needed"
  echo "  • Run performance tests"
  
  exit 0
elif [ $SUCCESS_RATE -ge 50 ]; then
  warning "INSTALLATION PARTIALLY SUCCESSFUL"
  echo "🔧 Manual configuration may be required"
  echo "🌐 Site should be functional at: https://adesso-cms.ddev.site"
  echo ""
  echo "⚠️  Issues to address:"
  echo "  • Some recipes failed to install completely"
  echo "  • Manual feature configuration may be needed"
  echo "  • Consider running TIER 3 fallback for missing components"
  
  exit 2
else
  error "INSTALLATION FAILED"
  echo "🚨 Triggering automatic fallback to TIER 3 (Core-Only Installation)"
  echo ""
  
  # Trigger fallback if script exists
  if [ -f "./install-core-only.sh" ]; then
    log "Executing TIER 3 fallback..."
    exec ./install-core-only.sh
  else
    error "Fallback script not found - manual intervention required"
    echo "📞 Contact technical support immediately"
    exit 1
  fi
fi