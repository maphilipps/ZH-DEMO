# DDEV Development Environment Guide

This folder contains DDEV configuration for the adesso CMS Drupal 11 project with comprehensive development tooling and enterprise workflow integration.

## Linear-First Development Environment

### **Automatic Linear Task Creation**
All DDEV environment work automatically creates Linear tasks:
```yaml
Epic: "Development Environment Enhancement"
Tasks:
  - ADC-DDEV-001: Environment configuration and optimization
  - ADC-DDEV-002: Service integration and testing
  - ADC-DDEV-003: Performance tuning and monitoring
  - ADC-DDEV-004: Documentation and team onboarding
```

## DDEV Configuration Overview

### **Current Environment Stack**
```yaml
Services:
  web:
    - drupal11 with PHP 8.3
    - nginx-fpm for optimal performance
    - Node.js 20 with Corepack
    - Vite dev server (:5173)
    - Storybook server (:6006)
    
  db:
    - MariaDB 10.11 enterprise-grade
    - Optimized for Drupal performance
    
  backstop:
    - Visual regression testing
    - BackstopJS scenarios
    
  selenium-chrome:
    - E2E testing with Playwright
    - Browser automation support
    
  mailpit:
    - Email testing and debugging
    - SMTP server simulation
```

### **Development Services**
```bash
# Core development commands
ddev start                    # Initialize full environment
ddev stop                     # Stop all services
ddev restart                  # Restart with fresh containers

# Theme development
ddev theme dev               # Vite HMR development (:5173)
ddev theme build             # Production asset compilation
ddev theme watch             # Watch mode with live reload
ddev theme storybook         # Component documentation (:6006)

# Database operations
ddev drush sql-drop -y       # Reset database (testing)
ddev drush cr                # Clear Drupal caches
ddev drush cex               # Export configuration
ddev drush cim               # Import configuration

# Testing services
npm run test                 # Run Vitest unit tests
npm run test:e2e             # Playwright E2E tests
npm run test:visual          # BackstopJS visual regression
npm run test:a11y            # Accessibility compliance
```

## Enterprise Development Workflow

### **1. Environment Initialization**
```bash
# Starting development with Linear integration
# Linear task: "Initialize development environment for [feature/fix]"

# Fresh environment setup
ddev start --fresh                    # Clean container start
ddev composer install                 # Install PHP dependencies
ddev npm install                      # Install Node.js dependencies
ddev drush site:install               # Install Drupal (if needed)
```

### **2. Feature Development Process**
```yaml
Development Cycle:
  1. Feature Branch Creation:
     - Linear task created automatically
     - Branch: feature/linear-[TASK-ID]-[description]
     - DDEV environment specific to branch
     
  2. Development Environment:
     - ddev theme dev → Start Vite HMR
     - ddev theme storybook → Component development
     - Real-time asset compilation
     
  3. Testing Integration:
     - Unit tests run on file changes
     - Visual regression testing via BackstopJS
     - E2E testing with Playwright automation
     
  4. Quality Assurance:
     - Automated accessibility testing
     - Performance monitoring with Core Web Vitals
     - Cross-browser compatibility validation
```

### **3. AI Integration Development**
```bash
# AI-enhanced development environment
ddev drush ai:status                  # Check AI provider status
ddev drush ai:test-connection         # Validate AI API connectivity
ddev drush ai:generate-content        # Test content generation
ddev drush ai:moderate-content        # Test content moderation
```

## Service Configuration

### **Web Service Optimization**
```yaml
# .ddev/config.yaml highlights
php_version: "8.3"
type: drupal11
docroot: web
nodejs_version: "20"

# Performance optimizations
upload_dirs:
  - web/sites/default/files
  - private

# Development tools
hooks:
  post-start:
    - exec: composer install
    - exec: npm install
```

### **Database Performance Tuning**
```yaml
# MariaDB optimization for Drupal
Database Settings:
  innodb_buffer_pool_size: 256M
  query_cache_size: 64M
  max_connections: 100
  slow_query_log: enabled
  
# Development-specific settings
Development Mode:
  sql_mode: TRADITIONAL
  character_set_server: utf8mb4
  collation_server: utf8mb4_unicode_ci
```

### **Frontend Development Configuration**
```javascript
// Vite configuration for DDEV
export default {
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      port: 5173,
      host: 'localhost'
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.js',
        style: 'src/style.css'
      }
    }
  }
}
```

## Testing Environment Integration

### **Automated Testing Pipeline**
```bash
# Comprehensive testing in DDEV
ddev exec npm run test:full           # Complete testing suite

# Individual test types
ddev exec npm run test:unit           # Vitest unit tests
ddev exec npm run test:e2e            # Playwright E2E
ddev exec npm run test:visual         # BackstopJS visual regression
ddev exec npm run test:performance    # Lighthouse performance
ddev exec npm run test:accessibility  # WCAG 2.1 AA compliance
```

### **Quality Gate Integration**
```yaml
Pre-Commit Quality Gates:
  1. Code Quality:
     - ESLint validation for JavaScript
     - Stylelint validation for CSS
     - PHP_CodeSniffer for Drupal standards
     
  2. Performance Testing:
     - Lighthouse audit via DDEV
     - Core Web Vitals measurement
     - Asset optimization verification
     
  3. Accessibility Validation:
     - Automated WCAG 2.1 AA testing
     - Color contrast verification
     - Screen reader compatibility
```

## Agent Integration

### **Primary Agents for DDEV Management**
- `drupal-devops-engineer` - Environment configuration and optimization
- `drupal-11-lead-developer` - Development workflow coordination
- `qa-testing-specialist` - Testing pipeline integration
- `performance-optimizer` - Environment performance tuning

### **MCP Integration**
```yaml
DDEV + MCP Automation:
  Browser Tools:
    - Automated site auditing in development
    - Performance monitoring during development
    - Accessibility testing integration
    
  Playwright Integration:
    - E2E testing via DDEV services
    - Cross-browser testing automation
    - User workflow validation
    
  Memory Management:
    - Development environment patterns
    - Performance optimization history
    - Configuration decision documentation
```

## Environment Troubleshooting

### **Common Issues & Solutions**
```bash
# Service startup issues
ddev logs                            # Check all service logs
ddev logs web                        # Check web service specifically
ddev logs db                         # Check database logs

# Port conflicts
ddev describe                        # Show current port assignments
netstat -tlnp | grep :8080          # Check for port conflicts
ddev restart                         # Restart with fresh ports

# Performance issues
ddev exec htop                       # Monitor container resources
ddev exec free -h                    # Check memory usage
docker system prune                  # Clean up Docker resources
```

### **Database Issues**
```bash
# Database connectivity problems
ddev mysql                           # Test database connection
ddev drush sql:connect               # Test Drupal database access
ddev drush sql:drop -y && ddev drush site:install  # Reset database

# Configuration sync issues
ddev drush cex -y                    # Export current config
ddev drush cim -y                    # Import stored config
ddev drush cr                        # Clear caches
```

### **Frontend Development Issues**
```bash
# Node.js/npm issues
ddev exec node --version             # Check Node.js version
ddev exec npm --version              # Check npm version
ddev exec rm -rf node_modules && npm install  # Reinstall packages

# Vite/build issues
ddev theme clean                     # Clean build artifacts
ddev theme build --verbose          # Debug build process
ddev exec npm run dev -- --debug     # Debug development server
```

## German Market Development

### **Localization Environment**
```bash
# German locale development
ddev drush locale:import de [file]    # Import German translations
ddev drush config:set system.site default_langcode de  # Set German default
ddev drush cr                        # Clear language caches
```

### **GDPR Compliance Testing**
```yaml
Privacy Testing in DDEV:
  - Cookie consent functionality
  - Data export/deletion workflows
  - Privacy policy integration
  - Contact form data handling
```

## Performance Optimization

### **Development Performance**
```bash
# Optimize DDEV for development speed
ddev config --performance-mode=none  # Disable performance mode for dev
ddev config --nfs-mount-enabled=true # Enable NFS for file sync speed
ddev restart                         # Apply changes
```

### **Memory Management**
```yaml
Resource Allocation:
  Web Container: 2GB RAM minimum
  Database: 512MB buffer pool
  Node.js: 1GB heap size
  
Optimization Techniques:
  - Use DDEV mutagen for file sync
  - Enable opcache for PHP performance
  - Configure MariaDB query cache
  - Use Redis for Drupal caching
```

## Linear Workflow Integration

### **Environment Setup Tasks**
```markdown
User: "Set up development environment for new team member"

Linear Tasks Created:
- ADC-ENV-001: DDEV installation and configuration
- ADC-ENV-002: Database setup and content import
- ADC-ENV-003: Frontend tooling configuration
- ADC-ENV-004: Testing environment validation
- ADC-ENV-005: Team onboarding and documentation
```

### **Performance Optimization Tasks**
```markdown
User: "Optimize development environment performance"

Linear Tasks Created:
- ADC-PERF-DEV-001: Environment performance baseline
- ADC-PERF-DEV-002: Container resource optimization
- ADC-PERF-DEV-003: File sync performance improvement
- ADC-PERF-DEV-004: Database query optimization
- ADC-PERF-DEV-005: Frontend build process enhancement
```

This DDEV environment provides enterprise-grade development capabilities with comprehensive testing, performance monitoring, and seamless integration with the Linear workflow management system.