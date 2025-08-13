#!/bin/bash

#
# Visual Regression Testing Setup Script for Adesso CMS Theme
# 
# This script sets up BackstopJS visual regression testing for the theme.
# Run this script after installing dependencies to initialize the testing environment.
#

set -e

echo "🎨 Setting up Visual Regression Testing for Adesso CMS Theme"
echo "============================================================="

# Check if we're in the right directory
if [ ! -f "backstop.json" ]; then
    echo "❌ Error: backstop.json not found. Please run this script from the theme root directory."
    exit 1
fi

# Check if DDEV is running
echo "🔍 Checking DDEV status..."
if ! command -v ddev &> /dev/null; then
    echo "❌ Error: DDEV command not found. Please ensure DDEV is installed."
    exit 1
fi

# Check if site is accessible
echo "🌐 Checking if site is accessible..."
if ! curl -s -f "http://adesso-cms.ddev.site" > /dev/null; then
    echo "❌ Error: Site not accessible at http://adesso-cms.ddev.site"
    echo "   Please ensure DDEV is running with: ddev start"
    exit 1
fi

# Install BackstopJS if not already installed
echo "📦 Checking BackstopJS installation..."
if ! npm list backstopjs &> /dev/null; then
    echo "📦 Installing BackstopJS..."
    npm install
else
    echo "✅ BackstopJS is already installed"
fi

# Create initial directory structure
echo "📁 Creating directory structure..."
mkdir -p tests/visual-regression/reference
mkdir -p tests/visual-regression/test
mkdir -p tests/visual-regression/html_report
mkdir -p tests/visual-regression/ci_report

# Check if reference images exist
if [ -d "tests/visual-regression/reference" ] && [ "$(ls -A tests/visual-regression/reference)" ]; then
    echo "📸 Reference images already exist"
    echo "   To regenerate reference images, run: npm run visual:reference"
else
    echo "📸 Generating initial reference images..."
    echo "   This may take a few minutes..."
    
    if npm run backstop:reference; then
        echo "✅ Reference images generated successfully"
    else
        echo "❌ Failed to generate reference images"
        echo "   Please check your DDEV setup and site accessibility"
        exit 1
    fi
fi

echo ""
echo "🎉 Visual Regression Testing Setup Complete!"
echo ""
echo "📋 Available Commands:"
echo "   npm run visual:reference  - Generate new reference images"
echo "   npm run visual:test       - Run visual regression tests"
echo "   npm run visual:approve    - Approve visual changes"
echo "   npm run visual:report     - Open latest test report"
echo ""
echo "📖 Quick Start:"
echo "   1. Make your theme changes"
echo "   2. Run: npm run visual:test"
echo "   3. Review the HTML report that opens"
echo "   4. If changes are intentional: npm run visual:approve"
echo ""
echo "📚 Documentation: tests/visual-regression/README.md"
echo ""

# Verify setup by running a quick test
echo "🧪 Running a quick test to verify setup..."
if npm run backstop:test > /dev/null 2>&1; then
    echo "✅ Setup verification successful!"
else
    echo "⚠️  Setup verification failed, but this might be expected if changes exist"
    echo "   Run 'npm run visual:test' to see detailed results"
fi

echo ""
echo "🚀 You're ready to start visual regression testing!"