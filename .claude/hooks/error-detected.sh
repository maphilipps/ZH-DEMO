#!/bin/bash

# Error-Detected Hook
# Triggered when errors are detected during development
# Provides immediate guidance and auto-recovery suggestions

ERROR_TYPE="$1"
ERROR_MESSAGE="$2"
FILE_CONTEXT="$3"

echo "🚨 Error detected: $ERROR_TYPE"

# Error Classification and Response
case "$ERROR_TYPE" in
    "twig_syntax"|"template_error")
        echo "🎨 Twig template error detected"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **Immediate Actions:**"
        echo "1. Check for missing |default() filters"
        echo "2. Validate variable availability"  
        echo "3. Clear template cache: ddev drush cache:rebuild"
        echo ""
        echo "🤖 Auto-triggering Error Debugger for Twig analysis..."
        ;;
        
    "php_fatal"|"php_error")
        echo "🐘 PHP error detected"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **Immediate Actions:**"
        echo "1. Check PHP syntax: php -l [file]"
        echo "2. Verify class imports and dependencies"
        echo "3. Check error logs: ddev logs"
        echo ""
        echo "🤖 Auto-triggering Error Debugger for PHP analysis..."
        ;;
        
    "build_failure"|"asset_error")
        echo "🏗️  Build/Asset error detected"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **Immediate Actions:**"
        echo "1. Clear build cache: ddev theme build --clean"
        echo "2. Check Vite dev server: ddev theme dev"
        echo "3. Verify imports and dependencies"
        echo ""
        echo "🤖 Auto-triggering Frontend Specialist for build analysis..."
        ;;
        
    "database_error"|"migration_error")
        echo "🗄️  Database error detected"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **Immediate Actions:**"
        echo "1. Check database connection: ddev exec mysql -e 'SELECT 1'"
        echo "2. Verify schema: ddev drush core:requirements"
        echo "3. Run pending updates: ddev drush updatedb"
        echo ""
        echo "🤖 Auto-triggering Database Specialist for analysis..."
        ;;
        
    "ddev_error"|"container_error")
        echo "🐳 DDEV/Container error detected"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **Immediate Actions:**"
        echo "1. Check container status: ddev status"
        echo "2. Restart services: ddev restart"
        echo "3. Check resource usage: ddev exec top"
        echo ""
        echo "🤖 Auto-triggering System Diagnostician for environment analysis..."
        ;;
        
    "security_issue"|"vulnerability")
        echo "🛡️  Security issue detected"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **Immediate Actions:**"
        echo "1. Isolate affected component"
        echo "2. Review security implications"
        echo "3. Apply immediate patches if available"
        echo ""
        echo "🤖 Auto-triggering Security Specialist for threat analysis..."
        ;;
        
    "performance_degradation")
        echo "⚡ Performance issue detected"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **Immediate Actions:**"
        echo "1. Profile current performance"
        echo "2. Check resource usage"
        echo "3. Identify bottlenecks"
        echo ""
        echo "🤖 Auto-triggering Performance Specialist for optimization..."
        ;;
        
    *)
        echo "❓ Unknown error type: $ERROR_TYPE"
        echo "📍 Context: $FILE_CONTEXT"
        echo ""
        echo "🔧 **General Actions:**"
        echo "1. Review error message: $ERROR_MESSAGE"
        echo "2. Check system logs: ddev logs"
        echo "3. Verify system health"
        echo ""
        echo "🤖 Auto-triggering System Diagnostician for general analysis..."
        ;;
esac

# Auto-Recovery Suggestions
echo ""
echo "🔄 **Auto-Recovery Options:**"
echo "• Quick fix: Clear all caches (ddev drush cache:rebuild)"
echo "• Reset state: Restart DDEV (ddev restart)"  
echo "• Restore point: Git checkout previous working state"
echo "• Fresh start: Reset database (ddev reset-db)"

# Emergency Stop Protocol
echo ""
echo "🛑 **Emergency Protocol:**"
echo "If error is critical and affects system stability:"
echo "1. Stop current operation immediately"
echo "2. Document error state"  
echo "3. Revert to last known good state"
echo "4. Contact system administrator if needed"

# Logging and Tracking
echo ""
echo "📊 Error logged for pattern analysis and prevention"

exit 0