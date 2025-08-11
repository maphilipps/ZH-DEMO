#\!/bin/bash

# Simple BackstopJS test runner for Claude Code integration
# Usage: .claude/hooks/run-backstop-tests.sh

cd /Users/marc.philipps/Sites/adesso-cms

echo "🚀 Starting BackstopJS automated testing..."

# Build theme, clear cache, and test
cd web/themes/custom/adesso_cms_theme && ddev npm run build && \
cd /Users/marc.philipps/Sites/adesso-cms && \
ddev drush cr && \
ddev backstop test

# Capture exit code
EXIT_CODE=$?

# Provide feedback
if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ All visual regression tests passed\!"
else
    echo "⚠️  Visual differences detected. Review: backstop_data/html_report/index.html"
    echo "   To approve changes: ddev backstop approve"
fi

exit $EXIT_CODE
