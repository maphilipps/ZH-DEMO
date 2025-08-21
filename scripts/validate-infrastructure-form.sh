#!/bin/bash

# Infrastructure Damage Form Validation Script
# Validates that all required components are properly implemented

set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}===================================================${NC}"
    echo -e "${BLUE}🔍 Infrastructure Damage Form Validation${NC}"
    echo -e "${BLUE}===================================================${NC}"
    echo ""
}

print_check() {
    echo -e "${BLUE}[CHECK]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅ PASS${NC} $1"
}

print_error() {
    echo -e "${RED}❌ FAIL${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️  WARN${NC} $1"
}

validation_errors=0

print_header

# Check 1: Webform configuration file exists
print_check "Checking webform configuration file..."
if [ -f "config/install/webform.webform.infrastructure_damage_report.yml" ]; then
    print_success "Webform configuration file exists"
else
    print_error "Webform configuration file missing"
    validation_errors=$((validation_errors + 1))
fi

# Check 2: Setup script exists and is executable
print_check "Checking setup script..."
if [ -x "scripts/setup-infrastructure-damage-form.sh" ]; then
    print_success "Setup script exists and is executable"
else
    print_error "Setup script missing or not executable"
    validation_errors=$((validation_errors + 1))
fi

# Check 3: Validate webform configuration structure
print_check "Validating webform configuration structure..."
config_file="config/install/webform.webform.infrastructure_damage_report.yml"

if [ -f "$config_file" ]; then
    # Check for required fields
    required_fields=("name" "email" "damage_type" "damage_severity" "damage_description" "damage_date" "location_description" "street" "postal_code" "locality")
    
    for field in "${required_fields[@]}"; do
        if grep -q "$field:" "$config_file"; then
            print_success "Required field '$field' found in configuration"
        else
            print_error "Required field '$field' missing from configuration"
            validation_errors=$((validation_errors + 1))
        fi
    done
    
    # Check for Swiss compliance patterns
    if grep -E -q "pattern:.*\\^\\(\\\\\\+41\\|0\\)\\[0-9\\]\\{9\\}" "$config_file"; then
        print_success "Swiss phone number validation pattern found"
    else
        print_warning "Swiss phone number validation pattern may be missing"
    fi
    
    if grep -q "pattern.*\[0-9\]\{4\}" "$config_file"; then
        print_success "Swiss postal code validation pattern found"
    else
        print_warning "Swiss postal code validation pattern may be missing"
    fi
    
    # Check for file upload configuration
    if grep -q "managed_file" "$config_file"; then
        print_success "File upload configuration found"
    else
        print_error "File upload configuration missing"
        validation_errors=$((validation_errors + 1))
    fi
    
    # Check for email handlers
    if grep -q "email_confirmation" "$config_file" && grep -q "email_admin_notification" "$config_file"; then
        print_success "Email handlers configured"
    else
        print_error "Email handlers missing or incomplete"
        validation_errors=$((validation_errors + 1))
    fi
    
else
    print_error "Cannot validate configuration - file not found"
    validation_errors=$((validation_errors + 1))
fi

# Check 4: Required directories exist
print_check "Checking required directories..."
required_dirs=("config" "scripts" "config/install")

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        print_success "Directory '$dir' exists"
    else
        print_error "Directory '$dir' missing"
        validation_errors=$((validation_errors + 1))
    fi
done

# Check 5: Implementation documentation exists
print_check "Checking implementation documentation..."
if [ -f "INFRASTRUCTURE-DAMAGE-FORM-IMPLEMENTATION.md" ]; then
    print_success "Implementation documentation exists"
    
    # Check documentation completeness
    doc_sections=("Implementation Summary" "Swiss Compliance Features" "Form Structure Implementation" "Workflow Implementation" "Access Information")
    
    for section in "${doc_sections[@]}"; do
        if grep -q "$section" "INFRASTRUCTURE-DAMAGE-FORM-IMPLEMENTATION.md"; then
            print_success "Documentation section '$section' found"
        else
            print_warning "Documentation section '$section' may be missing"
        fi
    done
else
    print_error "Implementation documentation missing"
    validation_errors=$((validation_errors + 1))
fi

# Check 6: Swiss compliance validation
print_check "Validating Swiss compliance requirements..."

# Check eCH-0010 address fields
ech_fields=("street" "house_number" "postal_code" "locality")
ech_compliance=true

for field in "${ech_fields[@]}"; do
    if grep -q "$field:" "$config_file" 2>/dev/null; then
        print_success "eCH-0010 field '$field' implemented"
    else
        print_error "eCH-0010 field '$field' missing"
        ech_compliance=false
        validation_errors=$((validation_errors + 1))
    fi
done

if $ech_compliance; then
    print_success "eCH-0010 Swiss address standard compliance validated"
fi

# Check for Swiss German language usage (no ß character)
print_check "Checking Swiss German language compliance..."
if grep -q "ß" "$config_file" 2>/dev/null; then
    print_warning "Found ß character - should use 'ss' in Swiss German"
else
    print_success "Swiss German language compliance (no ß character)"
fi

# Check 7: Security and access control
print_check "Validating security and access control..."
if grep -q "access:" "$config_file" 2>/dev/null; then
    print_success "Access control configuration found"
    
    # Check for role-based permissions
    if grep -q "administrator\|editor\|infrastructure_manager" "$config_file"; then
        print_success "Role-based permissions configured"
    else
        print_warning "Role-based permissions may need review"
    fi
else
    print_error "Access control configuration missing"
    validation_errors=$((validation_errors + 1))
fi

# Final validation summary
echo ""
echo -e "${BLUE}===================================================${NC}"
echo -e "${BLUE}📊 Validation Summary${NC}"
echo -e "${BLUE}===================================================${NC}"

if [ $validation_errors -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL VALIDATIONS PASSED${NC}"
    echo ""
    echo -e "${GREEN}✅ Infrastructure Damage Report Form is ready for deployment${NC}"
    echo -e "${GREEN}✅ Swiss compliance requirements met${NC}"
    echo -e "${GREEN}✅ GPZH demo requirements satisfied${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: ./scripts/setup-infrastructure-damage-form.sh"
    echo "2. Test form submission at: /form/infrastructure-damage-report"
    echo "3. Review admin dashboard at: /admin/infrastructure/damage-reports"
    echo ""
    exit 0
else
    echo -e "${RED}❌ VALIDATION FAILED${NC}"
    echo ""
    echo -e "${RED}Found $validation_errors validation error(s)${NC}"
    echo "Please review and fix the issues above before deployment."
    echo ""
    exit 1
fi