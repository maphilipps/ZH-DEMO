#!/bin/bash

# SDC Component Validation Script
# Validates all component schemas for completeness and standardization

echo "🔍 SDC Component Schema Validation Report"
echo "========================================"
echo

# Get component count
TOTAL_COMPONENTS=$(find components -name "*.component.yml" | wc -l)
echo "📊 Total Components Found: $TOTAL_COMPONENTS"
echo

# Initialize counters
MISSING_GROUP=0
MISSING_LIBRARY_DEPS=0
WRONG_SCHEMA=0
FULLY_STANDARDIZED=0

echo "🚨 MISSING STANDARDIZATION:"
echo "----------------------------------------"

# Check for missing group property
echo "Missing 'group' property:"
for file in components/*/*.component.yml; do
    if ! grep -q "^group:" "$file"; then
        echo "  ❌ $file"
        ((MISSING_GROUP++))
    fi
done
echo

# Check for missing libraryDependencies
echo "Missing 'libraryDependencies' property:"
for file in components/*/*.component.yml; do
    if ! grep -q "^libraryDependencies:" "$file"; then
        echo "  ❌ $file"
        ((MISSING_LIBRARY_DEPS++))
    fi
done
echo

# Check for wrong schema version
echo "Wrong schema version (not Drupal 11.x):"
for file in components/*/*.component.yml; do
    if ! grep -q "11\.x" "$file"; then
        echo "  ❌ $file"
        ((WRONG_SCHEMA++))
    fi
done
echo

# Count fully standardized components
echo "✅ FULLY STANDARDIZED COMPONENTS:"
echo "----------------------------------------"
for file in components/*/*.component.yml; do
    HAS_GROUP=$(grep -q "^group:" "$file" && echo "yes" || echo "no")
    HAS_DEPS=$(grep -q "^libraryDependencies:" "$file" && echo "yes" || echo "no") 
    HAS_SCHEMA=$(grep -q "11\.x" "$file" && echo "yes" || echo "no")
    
    if [[ "$HAS_GROUP" == "yes" && "$HAS_DEPS" == "yes" && "$HAS_SCHEMA" == "yes" ]]; then
        echo "  ✅ $file"
        ((FULLY_STANDARDIZED++))
    fi
done
echo

# Summary statistics
echo "📈 STANDARDIZATION SUMMARY:"
echo "----------------------------------------"
echo "Total Components: $TOTAL_COMPONENTS"
echo "Fully Standardized: $FULLY_STANDARDIZED"
echo "Missing Group: $MISSING_GROUP"
echo "Missing LibraryDependencies: $MISSING_LIBRARY_DEPS"
echo "Wrong Schema: $WRONG_SCHEMA"
echo
echo "Completion Rate: $(echo "scale=1; $FULLY_STANDARDIZED * 100 / $TOTAL_COMPONENTS" | bc -l)%"
echo

# Validation status
if [[ $FULLY_STANDARDIZED -eq $TOTAL_COMPONENTS ]]; then
    echo "🎉 STATUS: FULLY STANDARDIZED"
    exit 0
else
    REMAINING=$((TOTAL_COMPONENTS - FULLY_STANDARDIZED))
    echo "⚠️  STATUS: $REMAINING COMPONENTS NEED STANDARDIZATION"
    exit 1
fi