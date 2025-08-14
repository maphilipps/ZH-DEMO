#!/bin/bash
# adesso CMS Smart Installer - Automated Method Detection & Execution
# Intelligently detects optimal installation method and executes with fallbacks

set -euo pipefail

echo "🤖 adesso CMS Smart Installer - Automated Method Detection"
echo "⚡ Analyzing environment and selecting optimal installation method..."
echo "⏰ Start Time: $(date)"

# Color coding for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logging functions
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

info() {
    echo -e "${PURPLE}ℹ️  $1${NC}"
}

analyze() {
    echo -e "${CYAN}🔍 $1${NC}"
}

# Environment analysis and scoring
analyze_environment() {
    analyze "Performing comprehensive environment analysis..."
    
    local analysis_score=0
    local max_analysis_score=100
    local environment_report=""
    
    # Check DDEV status (20 points)
    if ddev describe >/dev/null 2>&1; then
        success "DDEV environment: READY"
        analysis_score=$((analysis_score + 20))
        environment_report="${environment_report}\n✅ DDEV: Running and accessible"
    else
        warning "DDEV environment: NEEDS START"
        analysis_score=$((analysis_score + 10))
        environment_report="${environment_report}\n⚠️  DDEV: Needs to be started"
        
        log "Starting DDEV environment..."
        if ddev start; then
            success "DDEV started successfully"
            analysis_score=$((analysis_score + 10))
        else
            error "DDEV start failed"
            environment_report="${environment_report}\n❌ DDEV: Failed to start"
        fi
    fi
    
    # Check custom installer profile availability (25 points)
    if [ -f "web/profiles/adesso_cms_installer/adesso_cms_installer.profile" ]; then
        success "Custom installer profile: DETECTED"
        analysis_score=$((analysis_score + 15))
        environment_report="${environment_report}\n✅ Custom Profile: Available"
        
        # Test installer profile functionality
        if ddev drush site-install adesso_cms_installer --help >/dev/null 2>&1; then
            success "Custom installer profile: FUNCTIONAL"
            analysis_score=$((analysis_score + 10))
            environment_report="${environment_report}\n✅ Custom Profile: Functional"
        else
            warning "Custom installer profile: HAS ISSUES"
            environment_report="${environment_report}\n⚠️  Custom Profile: Dependency issues detected"
        fi
    else
        info "Custom installer profile: NOT AVAILABLE"
        environment_report="${environment_report}\n📋 Custom Profile: Not available"
    fi
    
    # Check recipe chain availability (20 points)
    local recipe_score=0
    local core_recipes_found=0
    local adesso_recipes_found=0
    
    # Core recipes check
    if [ -d "core/recipes" ]; then
        core_recipes_found=$(find core/recipes -name "recipe.yml" 2>/dev/null | wc -l)
        success "Core recipes: FOUND ($core_recipes_found available)"
        recipe_score=$((recipe_score + 10))
    else
        warning "Core recipes: NOT FOUND"
    fi
    
    # Custom recipes check
    if [ -d "recipes" ]; then
        adesso_recipes_found=$(find recipes -name "recipe.yml" 2>/dev/null | wc -l)
        success "adesso recipes: FOUND ($adesso_recipes_found available)"
        recipe_score=$((recipe_score + 10))
    else
        warning "adesso recipes: NOT FOUND"
    fi
    
    analysis_score=$((analysis_score + recipe_score))
    environment_report="${environment_report}\n📦 Recipes: Core($core_recipes_found) + Custom($adesso_recipes_found)"
    
    # Check configuration export availability (15 points)
    if [ -d "config-export" ] && [ "$(ls -A config-export 2>/dev/null)" ]; then
        local config_files=$(find config-export -name "*.yml" 2>/dev/null | wc -l)
        success "Configuration export: AVAILABLE ($config_files files)"
        analysis_score=$((analysis_score + 15))
        environment_report="${environment_report}\n⚙️  Config Export: $config_files files available"
    else
        info "Configuration export: LIMITED"
        analysis_score=$((analysis_score + 5))
        environment_report="${environment_report}\n📋 Config Export: Limited or not available"
    fi
    
    # Check theme availability (10 points)
    if [ -d "web/themes/custom/adesso_cms_theme" ]; then
        success "adesso CMS theme: AVAILABLE"
        analysis_score=$((analysis_score + 10))
        environment_report="${environment_report}\n🎨 Theme: adesso CMS theme available"
    else
        info "adesso CMS theme: NOT AVAILABLE"
        analysis_score=$((analysis_score + 3))
        environment_report="${environment_report}\n🎨 Theme: Will use fallback themes"
    fi
    
    # System resources check (10 points)
    local memory_available=$(free -m 2>/dev/null | awk 'NR==2{printf "%.0f", $7/1024}' 2>/dev/null || echo "unknown")
    local disk_available=$(df -BG . 2>/dev/null | awk 'NR==2{print $4}' | sed 's/G//' || echo "unknown")
    
    if [[ "$memory_available" =~ ^[0-9]+$ ]] && [ "$memory_available" -gt 1 ]; then
        success "System resources: ADEQUATE (${memory_available}GB RAM, ${disk_available}GB disk)"
        analysis_score=$((analysis_score + 10))
        environment_report="${environment_report}\n💾 Resources: Adequate (${memory_available}GB RAM, ${disk_available}GB disk)"
    else
        warning "System resources: LIMITED"
        analysis_score=$((analysis_score + 5))
        environment_report="${environment_report}\n💾 Resources: Limited or unknown"
    fi
    
    # Calculate final environment score
    local environment_percentage=$((analysis_score * 100 / max_analysis_score))
    
    log "Environment analysis completed"
    echo -e "$environment_report"
    echo ""
    success "Environment Score: $analysis_score/$max_analysis_score ($environment_percentage%)"
    
    # Return score for decision making
    echo "$environment_percentage"
}

# Intelligent method selection based on environment analysis
select_optimal_method() {
    local environment_score=$1
    
    analyze "Selecting optimal installation method based on environment analysis..."
    
    # Method selection logic with confidence scoring
    local selected_method=""
    local confidence=""
    local fallback_chain=""
    
    # High confidence environment (80%+)
    if [ "$environment_score" -ge 80 ]; then
        # Check if custom installer is truly functional
        if [ -f "web/profiles/adesso_cms_installer/adesso_cms_installer.profile" ] && \
           ddev drush site-install adesso_cms_installer --help >/dev/null 2>&1; then
            selected_method="1"
            confidence="HIGH"
            fallback_chain="1→2→3→4"
            success "TIER 1 selected: Custom Installer Profile (High confidence environment)"
        else
            selected_method="2"
            confidence="HIGH"
            fallback_chain="2→3→4"
            success "TIER 2 selected: Complete Recipe Chain (Custom installer not functional)"
        fi
    
    # Medium confidence environment (60-79%)
    elif [ "$environment_score" -ge 60 ]; then
        selected_method="2"
        confidence="MEDIUM"
        fallback_chain="2→3→4"
        warning "TIER 2 selected: Complete Recipe Chain (Medium confidence environment)"
    
    # Low confidence environment (40-59%)
    elif [ "$environment_score" -ge 40 ]; then
        selected_method="3"
        confidence="MEDIUM"
        fallback_chain="3→4"
        warning "TIER 3 selected: Core-Only Installation (Low confidence environment)"
    
    # Very low confidence environment (<40%)
    else
        selected_method="4"
        confidence="LOW"
        fallback_chain="4"
        warning "TIER 4 selected: Manual Configuration (Very low confidence environment)"
    fi
    
    info "Selection Confidence: $confidence"
    info "Fallback Chain: $fallback_chain"
    
    echo "$selected_method"
}

# Execute installation method with comprehensive error handling
execute_installation() {
    local method=$1
    local method_name=""
    local script_name=""
    local expected_duration=""
    
    # Method configuration
    case $method in
        1)
            method_name="Custom Installer Profile"
            script_name="drush site-install adesso_cms_installer"
            expected_duration="10-15 minutes"
            ;;
        2)
            method_name="Complete Recipe Chain"
            script_name="./install-complete-recipe-chain.sh"
            expected_duration="15-25 minutes"
            ;;
        3)
            method_name="Core-Only Installation"
            script_name="./install-core-only.sh"
            expected_duration="8-12 minutes"
            ;;
        4)
            method_name="Manual Configuration"
            script_name="./install-manual-config.sh"
            expected_duration="10-20 minutes"
            ;;
        *)
            error "Invalid installation method: $method"
            return 1
            ;;
    esac
    
    log "Executing TIER $method: $method_name"
    info "Expected Duration: $expected_duration"
    info "Script: $script_name"
    
    local start_time=$(date +%s)
    local execution_success=false
    local error_output=""
    
    # Execute installation method with timeout and error capture
    case $method in
        1)
            # TIER 1: Custom Installer Profile
            if timeout 1800 ddev drush site-install adesso_cms_installer --yes \
                --account-name=admin \
                --account-pass=admin \
                --site-name="adesso CMS" \
                --locale=de 2>&1; then
                execution_success=true
            else
                error_output="Custom installer profile execution failed"
            fi
            ;;
        2|3|4)
            # TIER 2, 3, 4: External scripts
            if [ -f "$script_name" ] && [ -x "$script_name" ]; then
                if timeout 1800 "$script_name" 2>&1; then
                    execution_success=true
                else
                    error_output="Script execution failed or timed out: $script_name"
                fi
            else
                error_output="Installation script not found or not executable: $script_name"
            fi
            ;;
    esac
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    local duration_minutes=$((duration / 60))
    local duration_seconds=$((duration % 60))
    
    if [ "$execution_success" = true ]; then
        success "TIER $method execution completed successfully"
        info "Execution time: ${duration_minutes}m ${duration_seconds}s"
        return 0
    else
        error "TIER $method execution failed"
        error "Error: $error_output"
        info "Failed after: ${duration_minutes}m ${duration_seconds}s"
        return 1
    fi
}

# Comprehensive post-installation validation
validate_installation() {
    log "Performing comprehensive installation validation..."
    
    local validation_score=0
    local max_validation_score=25
    local validation_report=""
    
    # Database connectivity (5 points)
    if ddev drush status --field=database-status 2>/dev/null | grep -q "Connected"; then
        success "Database connectivity: PASS"
        validation_score=$((validation_score + 5))
        validation_report="${validation_report}\n✅ Database: Connected and accessible"
    else
        error "Database connectivity: FAIL"
        validation_report="${validation_report}\n❌ Database: Connection failed"
    fi
    
    # System bootstrap (5 points)
    if ddev drush status --field=bootstrap 2>/dev/null | grep -q "Successful"; then
        success "System bootstrap: PASS"
        validation_score=$((validation_score + 5))
        validation_report="${validation_report}\n✅ Bootstrap: System fully bootstrapped"
    else
        error "System bootstrap: FAIL"
        validation_report="${validation_report}\n❌ Bootstrap: System bootstrap failed"
    fi
    
    # Web server accessibility (5 points)
    if curl -s -o /dev/null -w "%{http_code}" "https://adesso-cms.ddev.site" | grep -q "200\|30[0-9]"; then
        success "Web server: ACCESSIBLE"
        validation_score=$((validation_score + 5))
        validation_report="${validation_report}\n✅ Web Server: Site accessible via HTTPS"
    else
        warning "Web server: LIMITED ACCESS"
        validation_score=$((validation_score + 2))
        validation_report="${validation_report}\n⚠️  Web Server: Limited or indirect access"
    fi
    
    # Admin user validation (3 points)
    if ddev drush user:information admin >/dev/null 2>&1; then
        if ddev drush user:information admin --format=json 2>/dev/null | jq -e '.roles[]' | grep -q "administrator"; then
            success "Admin user: FULLY CONFIGURED"
            validation_score=$((validation_score + 3))
            validation_report="${validation_report}\n✅ Admin User: Full administrator access"
        else
            warning "Admin user: EXISTS (limited permissions)"
            validation_score=$((validation_score + 2))
            validation_report="${validation_report}\n⚠️  Admin User: User exists but limited permissions"
        fi
    else
        error "Admin user: NOT FOUND"
        validation_report="${validation_report}\n❌ Admin User: Administrator account not found"
    fi
    
    # Content management capability (4 points)
    local content_types_available=0
    if ddev drush entity:list node_type 2>/dev/null | grep -q "page"; then
        ((content_types_available++))
    fi
    if ddev drush entity:list node_type 2>/dev/null | grep -q "article"; then
        ((content_types_available++))
    fi
    if ddev drush entity:list node_type 2>/dev/null | grep -q "news"; then
        ((content_types_available++))
    fi
    
    if [ $content_types_available -ge 2 ]; then
        success "Content management: FULLY FUNCTIONAL ($content_types_available content types)"
        validation_score=$((validation_score + 4))
        validation_report="${validation_report}\n✅ Content: $content_types_available content types available"
    elif [ $content_types_available -eq 1 ]; then
        warning "Content management: BASIC ($content_types_available content type)"
        validation_score=$((validation_score + 2))
        validation_report="${validation_report}\n⚠️  Content: Basic content management available"
    else
        error "Content management: LIMITED"
        validation_report="${validation_report}\n❌ Content: No standard content types detected"
    fi
    
    # Theme and presentation (3 points)
    local current_theme=$(ddev drush config:get system.theme default 2>/dev/null)
    if [[ "$current_theme" =~ adesso_cms_theme ]]; then
        success "Theme: adesso CMS THEME ACTIVE"
        validation_score=$((validation_score + 3))
        validation_report="${validation_report}\n✅ Theme: adesso CMS theme fully active"
    elif [ -n "$current_theme" ] && [ "$current_theme" != "null" ]; then
        warning "Theme: FALLBACK THEME ACTIVE ($current_theme)"
        validation_score=$((validation_score + 2))
        validation_report="${validation_report}\n⚠️  Theme: Using fallback theme ($current_theme)"
    else
        warning "Theme: DEFAULT SYSTEM THEME"
        validation_score=$((validation_score + 1))
        validation_report="${validation_report}\n⚠️  Theme: System default theme"
    fi
    
    # Calculate validation percentage
    local validation_percentage=$((validation_score * 100 / max_validation_score))
    
    echo -e "$validation_report"
    echo ""
    success "Validation Score: $validation_score/$max_validation_score ($validation_percentage%)"
    
    # Return validation results
    echo "$validation_percentage"
}

# Generate comprehensive installation report
generate_final_report() {
    local environment_score=$1
    local selected_method=$2
    local validation_score=$3
    local installation_time=$4
    local fallback_attempts=$5
    
    local overall_success_rate=$(( (environment_score + validation_score) / 2 ))
    
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo "🤖 adesso CMS Smart Installer - Final Installation Report"
    echo "════════════════════════════════════════════════════════════════"
    echo "🕒 Completion Time: $(date)"
    echo "⏱️  Total Installation Time: $installation_time"
    echo ""
    echo "📊 PERFORMANCE METRICS"
    echo "▸ Environment Analysis Score: $environment_score%"
    echo "▸ Installation Validation Score: $validation_score%"
    echo "▸ Overall Success Rate: $overall_success_rate%"
    echo "▸ Fallback Attempts Used: $fallback_attempts"
    echo ""
    echo "🎯 INSTALLATION METHOD"
    
    case $selected_method in
        1) echo "▸ Selected Method: TIER 1 - Custom Installer Profile" ;;
        2) echo "▸ Selected Method: TIER 2 - Complete Recipe Chain" ;;
        3) echo "▸ Selected Method: TIER 3 - Core-Only Installation" ;;
        4) echo "▸ Selected Method: TIER 4 - Manual Configuration" ;;
    esac
    
    echo "▸ Method Confidence: Based on environment analysis"
    echo ""
    
    # Final status determination
    if [ $validation_score -ge 80 ] && [ $overall_success_rate -ge 75 ]; then
        success "🎉 SMART INSTALLATION COMPLETED SUCCESSFULLY!"
        echo ""
        echo "🌐 Access your adesso CMS:"
        echo "   Site URL: https://adesso-cms.ddev.site"
        echo "   Admin Login: admin / admin"
        echo ""
        echo "✨ Available Features:"
        echo "   • Core content management system"
        echo "   • Admin interface and user management"
        echo "   • Theme system and basic customization"
        echo "   • Database connectivity and data persistence"
        echo ""
        echo "🚀 Recommended Next Steps:"
        echo "   1. Log in and explore the admin interface"
        echo "   2. Create test content to validate functionality"
        echo "   3. Configure additional features as needed"
        echo "   4. Review and customize theme and layout"
        echo "   5. Set up content workflows and user permissions"
        
        return 0
    elif [ $validation_score -ge 60 ] && [ $overall_success_rate -ge 60 ]; then
        warning "⚠️  SMART INSTALLATION PARTIALLY SUCCESSFUL"
        echo ""
        echo "🔧 System Status: Functional with limitations"
        echo "🌐 Site accessible at: https://adesso-cms.ddev.site"
        echo ""
        echo "⚠️  Known Limitations:"
        echo "   • Some features may require manual configuration"
        echo "   • Advanced functionality may not be fully available"
        echo "   • Manual setup may be needed for optimal performance"
        echo ""
        echo "🛠️  Recommended Actions:"
        echo "   1. Complete configuration via admin interface"
        echo "   2. Test core functionality thoroughly"
        echo "   3. Consider running specific tier installation for missing features"
        
        return 2
    else
        error "❌ SMART INSTALLATION FAILED"
        echo ""
        echo "🚨 Installation did not meet minimum requirements"
        echo "💔 Validation Score: $validation_score% (minimum 60% required)"
        echo "📊 Overall Success: $overall_success_rate% (minimum 60% required)"
        echo ""
        echo "🆘 Emergency Actions:"
        echo "   1. Review installation logs for specific errors"
        echo "   2. Check DDEV environment: ddev describe"
        echo "   3. Verify system requirements and dependencies"
        echo "   4. Consider emergency Docker deployment"
        echo ""
        echo "📞 Support Escalation:"
        echo "   • Contact technical support with this report"
        echo "   • Provide full installation logs"
        echo "   • Consider infrastructure-level troubleshooting"
        
        return 1
    fi
}

# Main smart installation orchestration
main() {
    echo "🎬 Starting intelligent installation orchestration..."
    
    local start_time=$(date +%s)
    local fallback_attempts=0
    local selected_method=""
    local final_validation_score=0
    
    # Step 1: Environment Analysis
    log "Phase 1: Environment Analysis"
    local environment_score
    environment_score=$(analyze_environment) || {
        error "Environment analysis failed critically"
        exit 1
    }
    
    # Step 2: Method Selection
    log "Phase 2: Optimal Method Selection"
    selected_method=$(select_optimal_method "$environment_score") || {
        error "Method selection failed"
        exit 1
    }
    
    # Step 3: Installation Execution with Fallbacks
    log "Phase 3: Installation Execution"
    local installation_success=false
    local current_method=$selected_method
    
    while [ $current_method -le 4 ] && [ "$installation_success" = false ]; do
        log "Attempting TIER $current_method installation..."
        
        if execute_installation "$current_method"; then
            installation_success=true
            success "Installation successful with TIER $current_method"
        else
            warning "TIER $current_method failed - attempting fallback..."
            ((fallback_attempts++))
            ((current_method++))
            
            if [ $current_method -le 4 ]; then
                log "Falling back to TIER $current_method"
            else
                error "All installation methods exhausted"
                break
            fi
        fi
    done
    
    # Step 4: Installation Validation
    if [ "$installation_success" = true ]; then
        log "Phase 4: Installation Validation"
        final_validation_score=$(validate_installation) || {
            warning "Validation completed with issues"
        }
    else
        error "Installation execution failed completely"
        final_validation_score=0
    fi
    
    # Step 5: Final Report Generation
    local end_time=$(date +%s)
    local total_duration=$((end_time - start_time))
    local duration_minutes=$((total_duration / 60))
    local duration_seconds=$((total_duration % 60))
    local installation_time="${duration_minutes}m ${duration_seconds}s"
    
    log "Phase 5: Final Report Generation"
    generate_final_report "$environment_score" "$current_method" "$final_validation_score" \
                         "$installation_time" "$fallback_attempts"
}

# Execute main function with comprehensive error handling
if ! main "$@"; then
    echo ""
    error "🚨 SMART INSTALLER CRITICAL FAILURE"
    echo "📞 Emergency escalation required - contact technical support immediately"
    echo "📋 Please provide complete terminal output for troubleshooting"
    exit 1
fi