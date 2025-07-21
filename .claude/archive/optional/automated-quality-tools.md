# Automated Code Quality Tools Integration

## Comprehensive Quality Assurance Pipeline

### PHP Quality Tools (Drupal Standards)

#### Composer Configuration
```json
// composer.json - Development dependencies
{
  "require-dev": {
    "drupal/coder": "^8.3",
    "phpstan/phpstan": "^1.0",
    "phpstan/phpstan-drupal": "^1.0",
    "phpmd/phpmd": "^2.13",
    "sebastian/phpcpd": "^6.0",
    "squizlabs/php_codesniffer": "^3.7",
    "dealerdirect/phpcodesniffer-composer-installer": "^1.0"
  },
  "scripts": {
    "drupal-standards": [
      "phpcs --standard=Drupal,DrupalPractice --extensions=php,module,inc,install,test,profile,theme,css,js",
      "phpstan analyse --configuration=phpstan.neon",
      "phpmd web/themes/custom,web/modules/custom text phpmd.xml"
    ],
    "drupal-fix": [
      "phpcbf --standard=Drupal,DrupalPractice --extensions=php,module,inc,install,test,profile,theme"
    ]
  }
}
```

#### PHPStan Configuration
```neon
# phpstan.neon
includes:
  - vendor/phpstan/phpstan-drupal/extension.neon
  - vendor/phpstan/phpstan-drupal/config/drupal-phpunit-hack.neon

parameters:
  level: 8
  paths:
    - web/modules/custom
    - web/themes/custom
  excludePaths:
    - web/themes/custom/*/node_modules/*
    - web/themes/custom/*/vendor/*
  
  # Drupal-specific configurations
  drupal:
    drupal_root: web
  
  # Accessibility-focused rules
  customRulesetUsed: true
  reportUnmatchedIgnoredErrors: false
  
  # Performance and security checks
  checkMissingIterableValueType: true
  checkGenericClassInNonGenericObjectType: true
```

#### PHPMD Configuration
```xml
<!-- phpmd.xml -->
<ruleset name="Drupal Custom Rules"
         xmlns="http://pmd.sf.net/ruleset/1.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://pmd.sf.net/ruleset/1.0.0 http://pmd.sf.net/ruleset_xml_schema.xsd"
         xsi:noNamespaceSchemaLocation="http://pmd.sf.net/ruleset_xml_schema.xsd">
  
  <description>Drupal coding standards with accessibility and security focus</description>
  
  <!-- Code Size Rules -->
  <rule ref="rulesets/codesize.xml/CyclomaticComplexity">
    <properties>
      <property name="reportLevel" value="10"/>
    </properties>
  </rule>
  
  <rule ref="rulesets/codesize.xml/NPathComplexity">
    <properties>
      <property name="minimum" value="200"/>
    </properties>
  </rule>
  
  <!-- Design Rules -->
  <rule ref="rulesets/design.xml/ExitExpression"/>
  <rule ref="rulesets/design.xml/EvalExpression"/>
  <rule ref="rulesets/design.xml/GotoStatement"/>
  
  <!-- Naming Rules -->
  <rule ref="rulesets/naming.xml/ShortVariable">
    <properties>
      <property name="minimum" value="3"/>
    </properties>
  </rule>
  
  <!-- Security-focused rules -->
  <rule ref="rulesets/design.xml/EvalExpression"/>
  <rule ref="rulesets/controversial.xml/Superglobals"/>
</ruleset>
```

### Frontend Quality Tools

#### ESLint Configuration for Drupal
```json
// web/themes/custom/adesso_cms_theme/.eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@drupal/eslint-config-drupal",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": [
    "@typescript-eslint",
    "jsx-a11y"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true
  },
  "globals": {
    "Drupal": "readonly",
    "drupalSettings": "readonly",
    "drupalTranslations": "readonly",
    "domready": "readonly",
    "jQuery": "readonly",
    "_": "readonly",
    "matchMedia": "readonly",
    "Backbone": "readonly",
    "Modernizr": "readonly",
    "CKEDITOR": "readonly"
  },
  "rules": {
    // Accessibility rules (critical for adesso CMS)
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/interactive-supports-focus": "error",
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/no-autofocus": "error",
    "jsx-a11y/no-noninteractive-element-interactions": "error",
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    
    // Drupal-specific rules
    "no-var": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "error",
    "object-shorthand": "error",
    "quote-props": ["error", "as-needed"]
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module"
      }
    }
  ]
}
```

#### Stylelint Configuration for Drupal
```json
// web/themes/custom/adesso_cms_theme/.stylelintrc.json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-prettier"
  ],
  "plugins": [
    "stylelint-scss",
    "stylelint-a11y"
  ],
  "rules": {
    // Drupal formatting standards
    "indentation": 2,
    "max-line-length": 80,
    "no-eol-whitespace": true,
    "no-missing-end-of-source-newline": true,
    
    // Property ordering (Drupal standards)
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "flex",
      "flex-direction",
      "flex-wrap",
      "align-items",
      "justify-content",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "margin",
      "padding",
      "border",
      "background",
      "color",
      "font",
      "line-height",
      "text-align",
      "text-decoration"
    ],
    
    // Accessibility rules (critical)
    "a11y/content-property-no-static-value": true,
    "a11y/font-size-is-readable": true,
    "a11y/line-height-is-vertical-rhythmed": true,
    "a11y/media-prefers-reduced-motion": true,
    "a11y/no-display-none": true,
    "a11y/no-obsolete-attribute": true,
    "a11y/no-obsolete-element": true,
    "a11y/no-outline-none": true,
    "a11y/no-spread-text": true,
    "a11y/no-text-align-justify": true,
    
    // PostCSS support
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen"
        ]
      }
    ],
    
    // Drupal-specific naming conventions
    "selector-class-pattern": [
      "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
      {
        "message": "Expected class selector to use BEM naming convention"
      }
    ]
  }
}
```

### Accessibility Testing Tools

#### Axe-Core Integration
```json
// web/themes/custom/adesso_cms_theme/package.json
{
  "scripts": {
    "test:a11y": "start-server-and-test storybook http://localhost:6006 test:a11y:run",
    "test:a11y:run": "axe http://localhost:6006 --include .sb-show-main --exclude .sb-bar --reporter json > accessibility-report.json"
  },
  "devDependencies": {
    "@axe-core/cli": "^4.8.0",
    "@storybook/addon-a11y": "^7.6.0",
    "start-server-and-test": "^2.0.0"
  }
}
```

#### Pa11y Configuration
```json
// web/themes/custom/adesso_cms_theme/.pa11yrc.json
{
  "standard": "WCAG2AA",
  "reporter": "json",
  "level": "error",
  "threshold": 0,
  "includeNotices": true,
  "includeWarnings": true,
  "chromeLaunchConfig": {
    "executablePath": "/usr/bin/google-chrome-stable",
    "args": [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  },
  "actions": [
    "wait for element .page to be visible"
  ],
  "urls": [
    "http://localhost:8080",
    "http://localhost:8080/node/1",
    "http://localhost:8080/admin"
  ]
}
```

### Performance Testing Tools

#### Lighthouse CI Configuration
```json
// web/themes/custom/adesso_cms_theme/lighthouserc.json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:8080",
        "http://localhost:8080/node/1"
      ],
      "startServerCommand": "ddev start",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.85}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.8}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Automated Quality Workflows

#### GitHub Actions Workflow
```yaml
# .github/workflows/quality-assurance.yml
name: Code Quality & Accessibility

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  php-quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.2'
        extensions: mbstring, xml, pdo_mysql
        
    - name: Install dependencies
      run: composer install --prefer-dist --no-progress
      
    - name: PHP CodeSniffer (Drupal Standards)
      run: vendor/bin/phpcs --standard=Drupal,DrupalPractice --extensions=php,module,inc,install,test,profile,theme web/themes/custom/ web/modules/custom/
      
    - name: PHPStan Analysis
      run: vendor/bin/phpstan analyse --configuration=phpstan.neon
      
    - name: PHP Mess Detector
      run: vendor/bin/phpmd web/themes/custom,web/modules/custom text phpmd.xml

  frontend-quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: web/themes/custom/adesso_cms_theme/package-lock.json
        
    - name: Install theme dependencies
      working-directory: web/themes/custom/adesso_cms_theme
      run: npm ci
      
    - name: ESLint
      working-directory: web/themes/custom/adesso_cms_theme
      run: npm run lint:js
      
    - name: Stylelint
      working-directory: web/themes/custom/adesso_cms_theme
      run: npm run lint:css
      
    - name: Build theme
      working-directory: web/themes/custom/adesso_cms_theme
      run: npm run build

  accessibility-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup DDEV
      uses: ddev/github-action-setup-ddev@v1
      
    - name: Start DDEV
      run: ddev start
      
    - name: Install Drupal
      run: ddev drush site:install --yes
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install axe-core CLI
      run: npm install -g @axe-core/cli
      
    - name: Run accessibility tests
      run: |
        ddev launch &
        sleep 10
        axe http://localhost:8080 --reporter json > accessibility-report.json
        
    - name: Upload accessibility report
      uses: actions/upload-artifact@v4
      with:
        name: accessibility-report
        path: accessibility-report.json

  performance-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup DDEV
      uses: ddev/github-action-setup-ddev@v1
      
    - name: Start DDEV
      run: ddev start
      
    - name: Install Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install Lighthouse CI
      run: npm install -g @lhci/cli
      
    - name: Run Lighthouse CI
      working-directory: web/themes/custom/adesso_cms_theme
      run: lhci autorun
      
    - name: Upload Lighthouse report
      uses: actions/upload-artifact@v4
      with:
        name: lighthouse-report
        path: web/themes/custom/adesso_cms_theme/.lighthouseci/
```

### DDEV Integration Commands

#### Quality Check Scripts
```bash
#!/bin/bash
# scripts/quality-check.sh

echo "🔍 Running comprehensive quality checks..."

echo "📋 PHP CodeSniffer (Drupal Standards)..."
ddev exec "vendor/bin/phpcs --standard=Drupal,DrupalPractice --extensions=php,module,inc,install,test,profile,theme web/themes/custom/ web/modules/custom/" || exit 1

echo "🔧 PHPStan Analysis..."
ddev exec "vendor/bin/phpstan analyse --configuration=phpstan.neon" || exit 1

echo "🎨 Frontend Linting..."
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run lint:js && npm run lint:css" || exit 1

echo "♿ Accessibility Testing..."
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run test:a11y" || exit 1

echo "⚡ Performance Testing..."
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run test:performance" || exit 1

echo "✅ All quality checks passed!"
```

#### Auto-fix Script
```bash
#!/bin/bash
# scripts/auto-fix.sh

echo "🔧 Auto-fixing code quality issues..."

echo "📝 PHP Code Beautifier..."
ddev exec "vendor/bin/phpcbf --standard=Drupal,DrupalPractice --extensions=php,module,inc,install,test,profile,theme web/themes/custom/ web/modules/custom/"

echo "🎨 ESLint Auto-fix..."
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run lint:js -- --fix"

echo "💄 Stylelint Auto-fix..."
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run lint:css -- --fix"

echo "✨ Auto-fixes completed!"
```

This comprehensive quality assurance system ensures that all code meets Drupal 11 standards while maintaining accessibility, security, and performance requirements throughout the development lifecycle.