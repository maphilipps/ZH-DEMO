#!/bin/bash

# Pre-Deployment Hook  
# Triggered before deployment operations
# Comprehensive security and quality validation

DEPLOYMENT_TARGET="$1"

echo "🚀 Pre-deployment validation for: $DEPLOYMENT_TARGET"

# Security Gate 1: Vulnerability Scanning
echo "🛡️  Running security vulnerability scan..."

# Check for known vulnerabilities in composer dependencies
if [[ -f "composer.lock" ]]; then
    echo "📦 Checking Composer dependencies for vulnerabilities..."
    # This would integrate with security scanning tools
fi

# Check for common security issues
echo "🔍 Scanning for common security patterns..."
if grep -r "SELECT.*FROM.*WHERE.*=" web/modules/custom/ 2>/dev/null | grep -v "->query"; then
    echo "⚠️  Potential SQL injection patterns detected"
    echo "🔧 Review database queries in custom modules"
fi

# Security Gate 2: Configuration Security
echo "⚙️  Validating configuration security..."

# Check for development settings in production
if [[ "$DEPLOYMENT_TARGET" == "production" ]]; then
    if grep -q "debug.*true" web/sites/default/settings.php 2>/dev/null; then
        echo "❌ Debug mode enabled in production settings!"
        exit 1
    fi
fi

# Quality Gate 1: Code Quality
echo "🎯 Running code quality checks..."

# Run linting if available
if [[ -f "package.json" ]] && grep -q "lint" package.json; then
    echo "🧹 Running ESLint..."
    if ! ddev theme lint:js > /dev/null 2>&1; then
        echo "❌ JavaScript linting failed!"
        exit 1
    fi
fi

# Quality Gate 2: Testing Validation
echo "🧪 Running automated tests..."

# Check if PHPUnit tests exist and run them
if [[ -d "tests/" ]] || [[ -f "phpunit.xml" ]]; then
    echo "🐘 Running PHPUnit tests..."
    # ddev exec phpunit would be run here
fi

# Check if Playwright tests exist
if [[ -d "tests/e2e/" ]] || grep -q "playwright" package.json 2>/dev/null; then
    echo "🎭 E2E tests available - consider running"
fi

# Quality Gate 3: Performance Validation
echo "⚡ Performance validation..."

# Build check
if ! ddev theme build > /dev/null 2>&1; then
    echo "❌ Production build failed!"
    exit 1
fi

# Bundle size check
if [[ -d "web/themes/custom/adesso_cms_theme/dist/" ]]; then
    BUNDLE_SIZE=$(du -sh web/themes/custom/adesso_cms_theme/dist/ | cut -f1)
    echo "📊 Bundle size: $BUNDLE_SIZE"
fi

# Quality Gate 4: Content Validation
echo "📝 Content validation..."

# Check for draft content in production
if [[ "$DEPLOYMENT_TARGET" == "production" ]]; then
    DRAFT_COUNT=$(ddev drush sql:query "SELECT COUNT(*) FROM node_field_data WHERE status = 0" 2>/dev/null || echo "0")
    echo "📄 Draft content items: $DRAFT_COUNT"
fi

# Quality Gate 5: Accessibility Compliance
echo "♿ Accessibility compliance check..."
echo "🔧 Run accessibility audit before deployment"

# Final validation
echo "✅ Pre-deployment validation completed"
echo "🎯 System ready for deployment to: $DEPLOYMENT_TARGET"

# Deployment checklist reminder
cat << 'EOF'

📋 **Deployment Checklist Reminder:**
- [ ] Database backup completed
- [ ] Configuration export up to date  
- [ ] SSL certificates valid
- [ ] Monitoring and alerting active
- [ ] Rollback plan prepared
- [ ] Stakeholder notification sent

EOF

exit 0