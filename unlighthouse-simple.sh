#!/bin/bash

echo "🚀 ZH-DEMO Unlighthouse Scanner (Simple Version)"
echo "=============================================="

# Check if DDEV site is accessible
if curl -s -f https://zh-demo.ddev.site > /dev/null; then
    echo "✅ ZH-DEMO site is accessible"
    SITE_URL="https://zh-demo.ddev.site"
else
    echo "❌ ZH-DEMO site not accessible. Please start DDEV first with 'ddev start'"
    exit 1
fi

echo "🔍 Starting Unlighthouse scan of $SITE_URL"
echo ""

# Parse arguments for different scan types
case "$1" in
    --demo-check)
        echo "🎯 Running DEMO CHECK scan (3 samples, mobile + desktop)"
        npx unlighthouse@latest --site "$SITE_URL" --samples 3 --port 5679 --host 0.0.0.0
        ;;
    --mobile)
        echo "📱 Running MOBILE scan (375px viewport)"
        npx unlighthouse@latest --site "$SITE_URL" --device mobile --port 5679 --host 0.0.0.0
        ;;
    --desktop)
        echo "💻 Running DESKTOP scan (1200px viewport)"
        npx unlighthouse@latest --site "$SITE_URL" --device desktop --port 5679 --host 0.0.0.0
        ;;
    --help)
        echo "🔍 ZH-DEMO Unlighthouse Commands:"
        echo ""
        echo "./unlighthouse-simple.sh              Full scan (mobile + desktop)"
        echo "./unlighthouse-simple.sh --demo-check Quick demo validation (3 samples)"
        echo "./unlighthouse-simple.sh --mobile     Mobile-only scan (375px)"
        echo "./unlighthouse-simple.sh --desktop    Desktop-only scan (1200px)"
        echo "./unlighthouse-simple.sh --help       This help message"
        echo ""
        echo "🌐 Results available at: http://localhost:5679"
        echo "📊 Swiss Compliance: WCAG 2.1 AA + eCH-0059"
        exit 0
        ;;
    *)
        echo "🔍 Running FULL scan (all pages, mobile + desktop)"
        echo "This may take 5-10 minutes..."
        npx unlighthouse@latest --site "$SITE_URL" --port 5679 --host 0.0.0.0
        ;;
esac

echo ""
echo "✅ Unlighthouse scan completed!"
echo "🌐 View results: http://localhost:5679"
echo "📊 Swiss Compliance Report: WCAG 2.1 AA + eCH-0059 validation"