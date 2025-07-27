#!/bin/bash

# Post-Implementation Hook
# Triggered after code implementation (Edit, Write, MultiEdit, Task)
# Runs quality checks and validation

# Read JSON input from stdin
INPUT=$(cat)

# Extract file path from JSON input (handles different tool formats)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | cut -d'"' -f4)
if [ -z "$FILE_PATH" ]; then
    # Try alternative format for different tools
    FILE_PATH=$(echo "$INPUT" | grep -o '"path":"[^"]*"' | cut -d'"' -f4)
fi

echo "🔍 Post-implementation quality validation for: $FILE_PATH"

# Quality Gate 1: Syntax and Linting
echo "📋 Running syntax and linting checks..."

# Check for PHP syntax errors
if echo "$FILE_PATH" | grep -q "\.php$"; then
    echo "🐘 Checking PHP syntax..."
    if ! ddev exec find web/themes -name "*.php" -exec php -l {} \; > /dev/null 2>&1; then
        echo "❌ PHP syntax errors detected!"
        echo "🔧 Consider running: ddev drush cache:rebuild"
        exit 1
    fi
fi

# Check for Twig syntax
if echo "$FILE_PATH" | grep -q "\.twig$"; then
    echo "🎨 Twig templates modified - cache rebuild recommended"
    echo "🔧 Run: ddev drush cache:rebuild"
fi

# Quality Gate 2: Asset Building
if echo "$FILE_PATH" | grep -q -E "\.(js|css|scss|ts)$"; then
    echo "🏗️  Frontend assets modified - running build check..."
    if ddev theme build > /dev/null 2>&1; then
        echo "✅ Frontend build successful"
    else
        echo "❌ Frontend build failed!"
        echo "🔧 Check: ddev theme dev for errors"
        exit 1
    fi
fi

# Quality Gate 3: Storybook Validation
if echo "$FILE_PATH" | grep -q "components/"; then
    echo "📚 Component changes detected - Storybook validation recommended"
    echo "🔧 Run: ddev theme storybook to validate"
fi

# Quality Gate 4: Site Accessibility Check
echo "🌐 Checking site accessibility..."
if ddev launch > /dev/null 2>&1; then
    echo "✅ Site is accessible"
else
    echo "❌ Site accessibility issues detected!"
    echo "🔧 Run system diagnostician for analysis"
    exit 1
fi

# Quality Gate 5: Performance Baseline
echo "⚡ Performance baseline check..."
# This would integrate with performance monitoring tools

echo "✅ Post-implementation validation completed"
echo "🎯 Ready for user testing and review"

exit 0