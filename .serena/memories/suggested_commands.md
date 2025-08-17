# Essential Development Commands

## DDEV Environment Management
```bash
# Start/Stop Environment
ddev start                    # Initialize DDEV environment
ddev stop                     # Stop DDEV environment
ddev restart                  # Restart all services

# Database Operations
ddev import-db [file.sql.gz]  # Import database backup
ddev export-db                # Export current database
ddev mysql                    # Access MySQL CLI

# Drupal Operations
ddev drush cr                 # Clear Drupal cache
ddev drush cex                # Export configuration
ddev drush cim                # Import configuration
ddev drush uli                # Generate admin login link
```

## Theme Development (Main Working Directory)
```bash
# Navigate to theme directory
cd web/themes/custom/adesso_cms_theme

# Frontend Development
npm run dev                   # Start Vite dev server with HMR
npm run build                 # Production build
npm run watch                 # Watch for changes
npm run storybook             # Start Storybook server (port 6006)

# Testing & Quality Assurance
npm run test                  # Run Vitest unit tests
npm run test:e2e              # Run Playwright E2E tests
npm run qa:full               # Complete QA pipeline
npm run visual:test           # Run visual regression tests
npm run lint:all              # Run ESLint and Stylelint

# Performance Testing
npm run lighthouse            # Run Lighthouse audit
npm run qa:performance        # Performance testing pipeline
```

## DDEV Theme Integration Commands
```bash
# These commands work from project root via DDEV
ddev theme dev               # Start Vite dev server (localhost:5173)
ddev theme storybook         # Start Storybook server (localhost:6006)
ddev theme build             # Production build
ddev theme watch             # Watch mode with HMR
ddev npm run test            # Run theme tests
```

## Content Management
```bash
# Content Operations
ddev drush generate:content  # Generate sample content
ddev drush config:export     # Export all configuration
ddev drush config:import     # Import configuration changes

# AI Content Features
ddev drush ai:alt-text       # Generate AI alt text for images
ddev drush ai:suggestions    # AI content suggestions
```

## Performance & Optimization
```bash
# Cache Management
ddev drush cr                # Clear all caches
ddev drush cc css-js         # Clear CSS/JS aggregation
ddev drush image:flush       # Clear image style cache

# Performance Testing
npm run lighthouse           # Core Web Vitals audit
npm run build:analyze        # Bundle size analysis
```

## Quality Assurance Pipeline
```bash
# Full QA Pipeline
npm run qa:full              # Complete QA: tests, linting, performance
npm run qa:validate          # Code quality validation
npm run qa:visual            # Visual regression testing

# Individual QA Steps
npm run lint:js              # JavaScript linting
npm run lint:css             # CSS linting
npm run test:coverage        # Test coverage report
```

## German Market Specific
```bash
# Brand Compliance
npm run lint:brand           # Check "adesso" lowercase compliance
ddev drush locale:import     # Import German translations
ddev drush config:export de  # Export German configuration
```

## Quick Development Workflow
```bash
# Daily workflow
ddev start                   # Start environment
cd web/themes/custom/adesso_cms_theme
npm run dev                  # Start development with HMR
npm run storybook            # (In new terminal) Start Storybook

# Before committing
npm run qa:full              # Run complete QA pipeline
ddev drush cex               # Export any config changes
```

## System Information
- **Node.js**: >=18.0.0 required
- **npm**: >=8.0.0 required  
- **Browser Support**: > 1%, last 2 versions, not dead
- **Development URLs**: 
  - Site: https://adesso-cms.ddev.site
  - Vite HMR: http://localhost:5173
  - Storybook: http://localhost:6006