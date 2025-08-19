#!/bin/bash

# GPZH Subthemes Build Script
# Builds all municipality subthemes with Tailwind CSS v4

set -e

echo "🏛️ Building GPZH Municipality Subthemes..."

THEMES_DIR="/Users/marc.philipps/Sites/zh-demo/web/themes/custom"
THEMES=("zh_thalwil" "zh_thalheim" "zh_erlenbach")

for theme in "${THEMES[@]}"; do
    echo "🔨 Building $theme theme..."
    
    cd "$THEMES_DIR/$theme"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo "❌ package.json not found for $theme"
        continue
    fi
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies for $theme..."
        npm install
    fi
    
    # Build the theme
    echo "🏗️ Building assets for $theme..."
    npm run build
    
    # Check if build was successful
    if [ -f "dist/${theme}.css" ]; then
        echo "✅ $theme built successfully"
    else
        echo "❌ Build failed for $theme"
    fi
    
    echo ""
done

echo "🎯 All municipality subthemes built!"
echo ""
echo "📋 Next steps:"
echo "1. Enable subthemes in Drupal: ddev drush theme:enable zh_thalwil zh_thalheim zh_erlenbach"
echo "2. Configure site-specific themes in sites.php"
echo "3. Test themes on each municipality site"