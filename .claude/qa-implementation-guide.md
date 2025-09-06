# QA Framework Implementation Guide

## Quick Start für Essentielle Agenten

### Sofort Umsetzbare QA-Integration

#### 1. Git Hooks Setup (5 Minuten)
```bash
# .git/hooks/pre-commit
#!/bin/bash
echo "🔍 QA Validation läuft..."

# Code Standards Check
vendor/bin/phpcs --standard=Drupal --extensions=php,module,inc,install,test,profile,theme,css,info,txt,md,yml web/modules/custom/ web/themes/custom/

# Security Scan
composer audit

# Configuration Validation
drush config:status

echo "✅ QA Validation abgeschlossen"
```

#### 2. Agent QA Template Integration
Jeder essentielle Agent erhält diese QA-Erweiterung in seinem System Prompt:

```yaml
qa_integration:
  before_task:
    - "Validate prerequisites and dependencies"
    - "Check current code quality baseline"
    - "Verify security compliance requirements"
  
  during_task:
    - "Monitor code quality in real-time"
    - "Validate against performance budgets"
    - "Ensure accessibility compliance"
  
  after_task:
    - "Run comprehensive quality checks"
    - "Generate quality metrics report"
    - "Update documentation and ADRs"
```

## Agent-Spezifische Implementierung

### drupal-project-initializer QA Integration

**System Prompt Erweiterung:**
```yaml
qa_validation_steps:
  project_setup:
    - name: "Environment Validation"
      command: "ddev describe && composer validate"
      success_criteria: "All services running, composer.json valid"
    
    - name: "Security Baseline"
      command: "composer audit && drush pm:security-php"
      success_criteria: "No security vulnerabilities found"
    
    - name: "Performance Baseline"
      command: "lighthouse --chrome-flags='--headless' http://zh-demo.ddev.site"
      success_criteria: "Performance score > 90"
    
    - name: "Accessibility Baseline"
      command: "axe --chrome --disable-dev-shm-usage http://zh-demo.ddev.site"
      success_criteria: "No accessibility violations"

qa_reporting:
  - "Generate initial quality baseline report"
  - "Document performance benchmarks"
  - "Create accessibility compliance checklist"
  - "Set up continuous monitoring alerts"
```

### drupal-module-developer QA Integration

**System Prompt Erweiterung:**
```yaml
development_qa_gates:
  code_generation:
    validation:
      - "Validate generated code against Drupal coding standards"
      - "Check for common security anti-patterns"
      - "Verify performance implications of generated code"
    tools:
      - "phpcs --standard=Drupal"
      - "phpstan analyse --level=6"
      - "psalm --show-info=true"
  
  testing_integration:
    requirements:
      - "Generate PHPUnit tests for all public methods"
      - "Create functional tests for user-facing features"
      - "Implement integration tests for API endpoints"
    coverage_targets:
      - "Unit test coverage: >80%"
      - "Functional test coverage: >70%"
      - "Integration test coverage: >60%"
  
  documentation_quality:
    standards:
      - "All public methods must have proper DocBlocks"
      - "Generate API documentation for all endpoints"
      - "Update relevant ADRs with implementation decisions"
```

### drupal-theme-specialist QA Integration

**System Prompt Erweiterung:**
```yaml
frontend_qa_validation:
  component_quality:
    sdc_validation:
      - "Validate component schema against SDC standards"
      - "Check Twig template syntax and best practices"
      - "Verify component accessibility compliance"
    
    storybook_integration:
      - "Generate comprehensive Storybook stories"
      - "Include accessibility testing in stories"
      - "Create visual regression test cases"
  
  performance_optimization:
    css_optimization:
      - "Minimize CSS bundle size"
      - "Optimize critical rendering path"
      - "Validate Tailwind CSS purging"
    
    responsive_design:
      - "Test across all breakpoints"
      - "Validate touch target sizes"
      - "Check content reflow patterns"
  
  accessibility_compliance:
    automated_checks:
      - "Run axe-core on all components"
      - "Validate color contrast ratios"
      - "Check keyboard navigation patterns"
    
    manual_verification:
      - "Test with screen readers"
      - "Validate multilingual content (DE/FR/IT)"
      - "Check government accessibility standards"
```

### ddev-orchestrator QA Integration

**System Prompt Erweiterung:**
```yaml
infrastructure_qa:
  environment_validation:
    setup_checks:
      - "Validate Docker container security"
      - "Check service configuration consistency"
      - "Verify backup and restore procedures"
    
    performance_monitoring:
      - "Monitor container resource usage"
      - "Validate database performance metrics"
      - "Check cache configuration effectiveness"
  
  security_hardening:
    container_security:
      - "Scan containers for vulnerabilities"
      - "Validate network isolation"
      - "Check file permission configurations"
    
    service_security:
      - "Validate database access controls"
      - "Check SSL/TLS configuration"
      - "Verify service authentication"
```

## Automatisierung Scripts

### QA Validation Runner
```bash
#!/bin/bash
# .claude/scripts/qa-runner.sh

echo "🚀 Starting comprehensive QA validation..."

# Code Quality
echo "📊 Running code quality checks..."
vendor/bin/phpcs --standard=Drupal --extensions=php,module,inc web/modules/custom/
vendor/bin/phpstan analyse web/modules/custom/ --level=6

# Security
echo "🔒 Running security scans..."
composer audit
drush pm:security-php

# Performance
echo "⚡ Running performance tests..."
lighthouse --chrome-flags='--headless' --output=json --output-path=./reports/lighthouse.json http://zh-demo.ddev.site

# Accessibility  
echo "♿ Running accessibility audits..."
axe --chrome --disable-dev-shm-usage --save ./reports/axe-results.json http://zh-demo.ddev.site

# Tests
echo "🧪 Running test suites..."
vendor/bin/phpunit --coverage-html=./reports/coverage web/modules/custom/
npm test -- --coverage --coverageDirectory=./reports/js-coverage

echo "✅ QA validation completed. Check ./reports/ for detailed results."
```

### Quality Metrics Collector
```bash
#!/bin/bash
# .claude/scripts/collect-metrics.sh

echo "📈 Collecting quality metrics..."

# Create metrics directory
mkdir -p ./metrics/$(date +%Y-%m-%d)
METRICS_DIR="./metrics/$(date +%Y-%m-%d)"

# Code Quality Metrics
echo "Collecting code quality metrics..."
vendor/bin/phpcs --report=json --standard=Drupal web/modules/custom/ > "$METRICS_DIR/phpcs.json"
vendor/bin/phpstan analyse web/modules/custom/ --error-format=json > "$METRICS_DIR/phpstan.json"

# Performance Metrics
echo "Collecting performance metrics..."
lighthouse --chrome-flags='--headless' --output=json http://zh-demo.ddev.site > "$METRICS_DIR/lighthouse.json"

# Accessibility Metrics
echo "Collecting accessibility metrics..."
axe --chrome --save "$METRICS_DIR/accessibility.json" http://zh-demo.ddev.site

# Test Coverage Metrics
echo "Collecting test coverage..."
vendor/bin/phpunit --coverage-clover="$METRICS_DIR/coverage.xml" web/modules/custom/

# Generate Summary Report
python3 .claude/scripts/generate-qa-report.py "$METRICS_DIR"

echo "✅ Metrics collected in $METRICS_DIR"
```

### QA Report Generator (Python)
```python
#!/usr/bin/env python3
# .claude/scripts/generate-qa-report.py

import json
import sys
from datetime import datetime

def generate_qa_report(metrics_dir):
    """Generate comprehensive QA report from collected metrics."""
    
    report = {
        'timestamp': datetime.now().isoformat(),
        'summary': {},
        'details': {}
    }
    
    # Process code quality metrics
    try:
        with open(f'{metrics_dir}/phpcs.json') as f:
            phpcs_data = json.load(f)
            report['summary']['code_quality_score'] = calculate_code_quality_score(phpcs_data)
            report['details']['code_standards'] = phpcs_data
    except FileNotFoundError:
        print("Warning: PHPCS metrics not found")
    
    # Process performance metrics
    try:
        with open(f'{metrics_dir}/lighthouse.json') as f:
            lighthouse_data = json.load(f)
            report['summary']['performance_score'] = lighthouse_data['categories']['performance']['score'] * 100
            report['details']['performance'] = lighthouse_data
    except FileNotFoundError:
        print("Warning: Lighthouse metrics not found")
    
    # Process accessibility metrics
    try:
        with open(f'{metrics_dir}/accessibility.json') as f:
            accessibility_data = json.load(f)
            report['summary']['accessibility_violations'] = len(accessibility_data.get('violations', []))
            report['details']['accessibility'] = accessibility_data
    except FileNotFoundError:
        print("Warning: Accessibility metrics not found")
    
    # Generate quality score
    report['summary']['overall_quality_score'] = calculate_overall_score(report['summary'])
    
    # Save report
    with open(f'{metrics_dir}/qa-report.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    # Generate human-readable summary
    generate_summary_report(report, metrics_dir)
    
    return report

def calculate_code_quality_score(phpcs_data):
    """Calculate code quality score from PHPCS data."""
    total_files = phpcs_data.get('totals', {}).get('files', 1)
    total_errors = phpcs_data.get('totals', {}).get('errors', 0)
    total_warnings = phpcs_data.get('totals', {}).get('warnings', 0)
    
    # Simple scoring algorithm
    violations_per_file = (total_errors + total_warnings) / total_files
    score = max(0, 100 - (violations_per_file * 10))
    return round(score, 2)

def calculate_overall_score(summary):
    """Calculate overall quality score from individual metrics."""
    scores = []
    
    if 'code_quality_score' in summary:
        scores.append(summary['code_quality_score'])
    
    if 'performance_score' in summary:
        scores.append(summary['performance_score'])
    
    # Accessibility: 100 if no violations, decrease based on violation count
    if 'accessibility_violations' in summary:
        accessibility_score = max(0, 100 - (summary['accessibility_violations'] * 10))
        scores.append(accessibility_score)
    
    return round(sum(scores) / len(scores), 2) if scores else 0

def generate_summary_report(report, metrics_dir):
    """Generate human-readable summary report."""
    
    summary_text = f"""
# QA Report Summary - {report['timestamp']}

## Overall Quality Score: {report['summary'].get('overall_quality_score', 'N/A')}/100

### Code Quality
- Score: {report['summary'].get('code_quality_score', 'N/A')}/100

### Performance
- Score: {report['summary'].get('performance_score', 'N/A')}/100

### Accessibility
- Violations: {report['summary'].get('accessibility_violations', 'N/A')}

## Recommendations
"""
    
    # Add recommendations based on scores
    overall_score = report['summary'].get('overall_quality_score', 0)
    
    if overall_score < 70:
        summary_text += "- 🔴 Critical: Overall quality below acceptable threshold\n"
    elif overall_score < 85:
        summary_text += "- 🟡 Warning: Quality improvements needed\n"
    else:
        summary_text += "- 🟢 Good: Quality metrics within acceptable range\n"
    
    # Performance recommendations
    perf_score = report['summary'].get('performance_score', 0)
    if perf_score < 80:
        summary_text += "- ⚡ Optimize performance: Consider image optimization, caching, code splitting\n"
    
    # Accessibility recommendations
    a11y_violations = report['summary'].get('accessibility_violations', 0)
    if a11y_violations > 0:
        summary_text += f"- ♿ Fix {a11y_violations} accessibility violations\n"
    
    with open(f'{metrics_dir}/qa-summary.md', 'w') as f:
        f.write(summary_text)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python3 generate-qa-report.py <metrics_directory>")
        sys.exit(1)
    
    metrics_dir = sys.argv[1]
    report = generate_qa_report(metrics_dir)
    print(f"✅ QA report generated: {metrics_dir}/qa-report.json")
    print(f"📊 Summary available: {metrics_dir}/qa-summary.md")
```

## CI/CD Integration (GitHub Actions)

```yaml
# .github/workflows/qa-validation.yml
name: QA Validation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  quality-assurance:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.2'
        extensions: mbstring, xml, ctype, iconv, intl, pdo_sqlite, mysql, gd
        
    - name: Install Dependencies
      run: composer install --no-interaction --prefer-dist --optimize-autoloader
      
    - name: Code Quality Check
      run: |
        vendor/bin/phpcs --standard=Drupal --extensions=php,module,inc web/modules/custom/
        vendor/bin/phpstan analyse web/modules/custom/ --level=6
        
    - name: Security Scan
      run: composer audit
      
    - name: Run Tests
      run: |
        vendor/bin/phpunit --coverage-clover=coverage.xml web/modules/custom/
        
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install Node Dependencies
      run: npm ci
      
    - name: Frontend Tests
      run: npm test -- --coverage
      
    - name: Accessibility Audit
      uses: treosh/lighthouse-ci-action@v9
      with:
        configPath: './lighthouserc.js'
        
    - name: Generate QA Report
      run: |
        mkdir -p ./reports
        python3 .claude/scripts/generate-qa-report.py ./reports
        
    - name: Upload QA Artifacts
      uses: actions/upload-artifact@v3
      with:
        name: qa-reports
        path: ./reports/
```

## Monitoring Dashboard Setup

### Quality Metrics Dashboard (JSON Config)
```json
{
  "dashboard": {
    "title": "Drupal QA Metrics Dashboard",
    "widgets": [
      {
        "type": "metric",
        "title": "Overall Quality Score",
        "source": "qa-reports/qa-report.json",
        "path": "summary.overall_quality_score",
        "target": 85,
        "thresholds": {
          "critical": 70,
          "warning": 80,
          "good": 85
        }
      },
      {
        "type": "trend",
        "title": "Performance Trend",
        "source": "metrics",
        "metric": "performance_score",
        "period": "30d"
      },
      {
        "type": "count",
        "title": "Accessibility Violations",
        "source": "qa-reports/qa-report.json",
        "path": "summary.accessibility_violations",
        "target": 0
      },
      {
        "type": "coverage",
        "title": "Test Coverage",
        "source": "reports/coverage.xml",
        "target": 80
      }
    ]
  }
}
```

## Nächste Schritte

1. **Immediate Setup (Tag 1)**:
   - Git hooks implementieren
   - Basis QA Scripts einrichten
   - Erste Agent QA Integration

2. **Week 1**:
   - Vollständige CI/CD Pipeline
   - Metriken-Sammlung aktivieren
   - Dashboard einrichten

3. **Week 2**:
   - Agent-spezifische QA verfeinern
   - Performance Benchmarks etablieren
   - Team Training durchführen

4. **Ongoing**:
   - Metriken überwachen
   - QA Prozesse optimieren
   - Feedback integrieren

Dieses Framework bietet sofort umsetzbare Qualitätssicherung mit minimalem Overhead und maximalem Impact für alle essentiellen Agenten.