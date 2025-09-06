---
description: Complete DDEV workflow integration patterns for Drupal development with containerized services, performance optimization, and compound engineering practices
author: DDEV Integration Team
version: 1.0
globs: [".ddev/**/*", "docker-compose*.yml", "package.json", "vite.config.js", ".storybook/**/*"]
tags: ["ddev", "containerization", "drupal-environment", "workflow-automation", "performance-optimization"]
---

# DDEV Workflow Integration

**Objective:** Establish comprehensive DDEV-based development workflows that create exponentially improving development experiences through containerized services, automation, and performance optimization.

## Core DDEV Configuration

### Project Type Standards
```yaml
# .ddev/config.yaml - Essential Configuration
name: zh-demo
type: drupal11                    # MUST use drupal11 for Drupal 11 projects
docroot: web
php_version: "8.3"               # MUST use PHP 8.3+ for Drupal 11
webserver_type: nginx-fpm        # MUST use nginx-fpm for performance
database:
  type: mariadb
  version: "10.11"               # MUST use MariaDB 10.11+ for Drupal 11
nodejs_version: "20"             # MUST use Node.js 20 LTS
corepack_enable: true            # Enable modern package managers (pnpm, yarn)
composer_version: "2"           # MUST use Composer 2.x
```

### Performance Optimization
```yaml
# .ddev/config.yaml - Performance Settings
performance_mode: global         # Use global performance settings
xdebug_enabled: false           # Disable Xdebug by default (enable via `ddev xdebug`)
use_dns_when_possible: true     # Use DNS for better performance
default_container_timeout: "180" # Extended timeout for complex operations

# Web environment for optimal performance
web_environment:
  - NODE_OPTIONS=--max-old-space-size=2048  # Increase Node.js memory
  - VITE_DEV_SERVER_HOST=0.0.0.0           # Vite dev server binding
  - VITE_DEV_SERVER_PORT=5173               # Standardized Vite port
  - GPZH_DEMO_MODE=true                     # Project-specific flag
  - DDEV_PRIMARY_URL=https://zh-demo.ddev.site

# Additional packages for frontend tooling
webimage_extra_packages: [xdg-utils, pkg-config, libpixman-1-dev, libcairo2-dev, libpango1.0-dev, make]
```

### Service Integration
```yaml
# .ddev/config.yaml - Frontend Development Services
web_extra_exposed_ports:
  - name: storybook
    container_port: 6006
    http_port: 6007
    https_port: 6006
  - name: vite
    container_port: 5173
    http_port: 5172
    https_port: 5173

web_extra_daemons:
  - name: node.js
    command: tail -F package.json > /dev/null
    directory: /var/www/html
```

## Development Workflow Automation

### Post-Start Hooks
```yaml
# .ddev/config.yaml - Automated Setup Hooks
hooks:
  post-start:
    - exec: echo "================================================================================="
    - exec: echo "                    ZH-DEMO - GPZH PROTOTYP BEREIT"
    - exec: echo "================================================================================="
    - exec: echo "Theme development commands:"
    - exec: echo "  ddev theme dev"
    - exec: echo "  ddev theme watch"
    - exec: echo "  ddev theme build"
    - exec: echo ""
    - exec: echo "Storybook (manual start):"
    - exec: echo "  ddev theme storybook"
    - exec: echo "====================================================================="
    - exec: |
        # Auto-configure Vite settings
        if ! grep -q "settings\['vite'\]\['devServerUrl'\]" /var/www/html/web/sites/default/settings.ddev.php; then
          echo "" >> /var/www/html/web/sites/default/settings.ddev.php
          echo "// Vite development server configuration for DDEV" >> /var/www/html/web/sites/default/settings.ddev.php
          echo "\$settings['vite']['devServerUrl'] = 'https://zh-demo.ddev.site:5173';" >> /var/www/html/web/sites/default/settings.ddev.php
        fi
  post-composer:
    - exec: drush cache:rebuild
    - exec: drush config:import --partial --source=config/sync
  post-db-import:
    - exec: drush cache:rebuild
    - exec: drush config:import --partial --source=config/sync
    - exec: drush updatedb -y
    - exec: drush cr
```

### Custom Commands Integration

#### Theme Development Commands
```bash
#!/bin/bash
# .ddev/commands/web/theme
## Description: Theme development commands (dev|watch|build|storybook)
## Usage: theme [dev|watch|build|storybook]

case "$1" in
  "dev")
    echo "Starting Vite development server..."
    cd /var/www/html/web/themes/custom/adesso_cms_theme && npm run dev
    ;;
  "watch")
    echo "Starting Vite in watch mode..."
    cd /var/www/html/web/themes/custom/adesso_cms_theme && npm run watch
    ;;
  "build")
    echo "Building production assets..."
    cd /var/www/html/web/themes/custom/adesso_cms_theme && npm run build
    ;;
  "storybook")
    echo "Starting Storybook..."
    cd /var/www/html/web/themes/custom/adesso_cms_theme && npm run storybook
    ;;
  *)
    echo "Usage: ddev theme [dev|watch|build|storybook]"
    echo ""
    echo "Commands:"
    echo "  dev       - Start Vite development server with hot reload"
    echo "  watch     - Watch for changes and rebuild automatically"
    echo "  build     - Build production-ready assets"
    echo "  storybook - Start Storybook component documentation"
    ;;
esac
```

#### Quality Assurance Commands
```bash
#!/bin/bash
# .ddev/commands/web/qa
## Description: Run quality assurance checks (phpcs|phpstan|tests|all)
## Usage: qa [phpcs|phpstan|tests|security|all]

case "$1" in
  "phpcs")
    echo "Running PHP Code Sniffer..."
    ./vendor/bin/phpcs --standard=Drupal,DrupalPractice web/modules/custom/ web/themes/custom/
    ;;
  "phpstan")
    echo "Running PHPStan static analysis..."
    ./vendor/bin/phpstan analyse web/modules/custom/ --level=8
    ;;
  "tests")
    echo "Running PHPUnit tests..."
    ./vendor/bin/phpunit web/modules/custom/
    ;;
  "security")
    echo "Running security audit..."
    composer audit
    ;;
  "all")
    echo "Running complete quality assurance suite..."
    $0 phpcs && $0 phpstan && $0 tests && $0 security
    ;;
  *)
    echo "Usage: ddev qa [phpcs|phpstan|tests|security|all]"
    echo ""
    echo "Commands:"
    echo "  phpcs     - Check coding standards compliance"
    echo "  phpstan   - Run static analysis"
    echo "  tests     - Run PHPUnit test suite"
    echo "  security  - Check for security vulnerabilities"
    echo "  all       - Run all quality checks"
    ;;
esac
```

#### Database Management Commands
```bash
#!/bin/bash
# .ddev/commands/web/dbsync
## Description: Database synchronization commands (backup|restore|sync-prod)
## Usage: dbsync [backup|restore <backup-name>|sync-prod]

case "$1" in
  "backup")
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
    echo "Creating database backup: $BACKUP_NAME"
    drush sql:dump --structure-tables-key=common --gzip --result-file="../.ddev/db-backups/$BACKUP_NAME.sql"
    echo "Backup saved as: $BACKUP_NAME.sql.gz"
    ;;
  "restore")
    if [ -z "$2" ]; then
      echo "Please specify backup file name"
      ls ../.ddev/db-backups/
      exit 1
    fi
    echo "Restoring database from: $2"
    drush sql:drop -y
    gunzip -c "../.ddev/db-backups/$2" | drush sql:cli
    drush cache:rebuild
    ;;
  "sync-prod")
    echo "Syncing database from production (be careful!)..."
    read -p "Are you sure you want to overwrite local database? (y/N): " -r
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      # Implementation depends on production setup
      echo "Production sync would happen here"
    fi
    ;;
  *)
    echo "Usage: ddev dbsync [backup|restore <backup-name>|sync-prod]"
    echo ""
    echo "Available backups:"
    ls ../.ddev/db-backups/ 2>/dev/null || echo "  No backups found"
    ;;
esac
```

## Frontend Integration Patterns

### Vite Configuration for DDEV
```javascript
// web/themes/custom/adesso_cms_theme/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    https: {
      key: '/etc/ssl/certs/master.key',
      cert: '/etc/ssl/certs/master.crt',
    },
    hmr: {
      host: 'zh-demo.ddev.site',
      port: 5173,
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './src/js/main.js',
        components: './src/js/components.js',
      },
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name].[hash].css';
          }
          return 'assets/[name].[hash].[ext]';
        },
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});
```

### Storybook Configuration
```javascript
// web/themes/custom/adesso_cms_theme/.storybook/main.js
/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      host: '0.0.0.0',
      port: 6006,
    };
    return config;
  },
};

export default config;
```

## Development Best Practices

### DDEV Service Orchestration

**MUST** use these patterns for service management:

```bash
# Project startup sequence
ddev start                    # Start all services
ddev composer install        # Install PHP dependencies  
ddev theme dev               # Start frontend development
```

**SHOULD** use these patterns for daily development:

```bash
# Development workflow
ddev ssh                     # Enter web container
ddev logs -f                 # Follow container logs
ddev xdebug                  # Enable Xdebug when needed
ddev theme watch             # Auto-rebuild assets
```

### Performance Monitoring

```yaml
# .ddev/docker-compose.performance.yaml
services:
  web:
    environment:
      - NEW_RELIC_ENABLED=false
      - BLACKFIRE_ENABLED=false
    volumes:
      - type: bind
        source: ./.ddev/performance
        target: /mnt/performance
        bind:
          propagation: cached
```

### Backup and Recovery Automation

```bash
#!/bin/bash
# .ddev/commands/web/snapshot
## Description: Create complete project snapshot (code + db + files)
## Usage: snapshot [create|restore <snapshot-name>|list]

SNAPSHOT_DIR="../.ddev/snapshots"
mkdir -p "$SNAPSHOT_DIR"

case "$1" in
  "create")
    SNAPSHOT_NAME="snapshot-$(date +%Y%m%d-%H%M%S)"
    echo "Creating project snapshot: $SNAPSHOT_NAME"
    
    # Database backup
    drush sql:dump --structure-tables-key=common --gzip --result-file="$SNAPSHOT_DIR/$SNAPSHOT_NAME-db.sql"
    
    # Files backup
    tar -czf "$SNAPSHOT_DIR/$SNAPSHOT_NAME-files.tar.gz" -C web/sites/default files 2>/dev/null || true
    
    # Git state
    git log -1 --oneline > "$SNAPSHOT_DIR/$SNAPSHOT_NAME-git.txt"
    
    echo "Snapshot created: $SNAPSHOT_NAME"
    ;;
  "restore")
    if [ -z "$2" ]; then
      echo "Please specify snapshot name"
      ls "$SNAPSHOT_DIR"/*-db.sql.gz 2>/dev/null | sed 's/.*\///;s/-db.sql.gz//'
      exit 1
    fi
    echo "Restoring snapshot: $2"
    
    # Restore database
    drush sql:drop -y
    gunzip -c "$SNAPSHOT_DIR/$2-db.sql.gz" | drush sql:cli
    
    # Restore files
    [ -f "$SNAPSHOT_DIR/$2-files.tar.gz" ] && tar -xzf "$SNAPSHOT_DIR/$2-files.tar.gz" -C web/sites/default/
    
    drush cache:rebuild
    echo "Snapshot restored: $2"
    ;;
  "list")
    echo "Available snapshots:"
    ls "$SNAPSHOT_DIR"/*-db.sql.gz 2>/dev/null | sed 's/.*\///;s/-db.sql.gz//' || echo "  No snapshots found"
    ;;
  *)
    echo "Usage: ddev snapshot [create|restore <snapshot-name>|list]"
    ;;
esac
```

## Agent Integration Points

### When to Use `ddev-orchestrator` Agent

**MUST** use for:
- Complete DDEV project setup and configuration
- Service orchestration and dependency management  
- Performance optimization and container tuning
- Custom command creation and automation scripts

**SHOULD** delegate to other agents:
- `drupal-environment-setup` for Drupal-specific configuration
- `drupal-performance-optimizer` for application-level optimization
- `drupal-deployment-manager` for production deployment preparation

### Compound Engineering Integration

Every DDEV configuration change MUST:
1. **Document in ADR**: Why specific DDEV settings were chosen
2. **Update Memory Bank**: Capture lessons about container performance
3. **Create Rules**: Add patterns that improve future DDEV setups
4. **Measure Improvement**: Track development speed improvements

### Quality Gates

**Pre-commit DDEV Validation**:
- [ ] DDEV configuration syntax is valid (`ddev config --check`)
- [ ] All required services start successfully (`ddev start`)
- [ ] Custom commands execute without errors
- [ ] Frontend services (Vite, Storybook) are accessible
- [ ] Database operations complete successfully

**Development Environment Health**:
- [ ] Container resource usage is optimized
- [ ] Development server response times < 200ms
- [ ] Asset rebuilding completes in < 10 seconds
- [ ] Database operations complete in < 5 seconds
- [ ] All exposed ports are properly configured

This rule ensures DDEV becomes a compound engineering multiplier, where each optimization makes all future development faster and more reliable.