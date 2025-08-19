# Theme Selector Feature - Production Deployment Strategy

## Executive Summary

This document outlines the comprehensive production deployment strategy for the standardized theme selector feature that now appears directly under the Title field in all paragraph forms. The deployment involves configuration updates for 25+ paragraph types, field type migration from boolean to list_string, frontend asset compilation, and comprehensive testing validation.

## Deployment Overview

**Feature Summary:**
- Theme field weight standardized to 1 across all paragraph types
- Field type migrated from boolean to list_string
- Enhanced admin forms with interactive theme preview
- Responsive design and accessibility improvements
- Comprehensive test coverage with PHPUnit, Vitest, BackstopJS

**Impact Assessment:**
- Configuration changes: 25+ paragraph form display configurations
- Data migration: Existing boolean theme values to list_string format
- Frontend assets: New CSS/JS for admin forms
- Cache invalidation: Form cache, theme cache, render cache
- Testing: Visual regression tests, accessibility validation

---

## Phase 1: Pre-Deployment Preparation

### 1.1 Environment Validation

#### Staging Environment Setup
```bash
# Ensure staging environment is up-to-date
ddev start
ddev pull production

# Verify database state
ddev drush status
ddev drush sql-query "SELECT COUNT(*) FROM paragraph__field_theme"

# Check configuration status
ddev drush cst
```

#### Configuration Validation Checklist
- [ ] All 25+ paragraph form display configurations exported
- [ ] Theme field configuration consistent across all paragraph types
- [ ] Field storage configuration updated to list_string
- [ ] Form display weight set to 1 for all theme fields
- [ ] No configuration conflicts or dependencies

### 1.2 Asset Compilation Validation

#### Frontend Build Process
```bash
cd web/themes/custom/adesso_cms_theme

# Install dependencies
ddev npm install

# Run production build
ddev npm run build

# Validate build artifacts
ls -la dist/assets/
```

#### Build Validation Checklist
- [ ] CSS assets compiled successfully
- [ ] JavaScript assets bundled and minified
- [ ] Theme selector admin styles included
- [ ] Interactive preview functionality working
- [ ] No build errors or warnings

### 1.3 Test Suite Execution

#### Comprehensive Testing
```bash
# Run PHP unit tests
ddev composer test

# Run frontend tests
cd web/themes/custom/adesso_cms_theme
ddev npm run test

# Run visual regression tests
ddev npm run visual:reference
ddev npm run visual:test

# Run accessibility tests
ddev npm run test:accessibility
```

#### Testing Validation Checklist
- [ ] All PHPUnit tests passing
- [ ] All Vitest frontend tests passing
- [ ] Visual regression tests show expected changes only
- [ ] Accessibility tests pass WCAG 2.1 AA standards
- [ ] Form functionality tests passing
- [ ] Theme preview functionality validated

---

## Phase 2: Data Migration Strategy

### 2.1 Pre-Migration Analysis

#### Data Assessment Query
```sql
-- Analyze existing theme field data
SELECT 
    p.type as paragraph_type,
    COUNT(*) as total_paragraphs,
    SUM(CASE WHEN tcet.field_theme_value = 1 THEN 1 ELSE 0 END) as dark_theme_count,
    SUM(CASE WHEN tcet.field_theme_value = 0 THEN 1 ELSE 0 END) as light_theme_count
FROM paragraphs_item p
LEFT JOIN paragraph__field_theme tcet ON p.id = tcet.entity_id
GROUP BY p.type
ORDER BY total_paragraphs DESC;
```

### 2.2 Migration Script Development

#### Data Migration Script
```bash
#!/bin/bash
# scripts/deploy/migrate-theme-field-data.sh

echo "Starting theme field data migration..."

# Backup current data
ddev drush sql-dump --structure-tables-key=common > backup/pre-migration-$(date +%Y%m%d_%H%M%S).sql

# Run migration queries
ddev drush sql-query "
UPDATE paragraph__field_theme 
SET field_theme_value = 'dark' 
WHERE field_theme_value = '1';

UPDATE paragraph__field_theme 
SET field_theme_value = 'light' 
WHERE field_theme_value = '0';
"

echo "Theme field data migration completed."
```

### 2.3 Migration Validation

#### Post-Migration Verification
```sql
-- Verify migration results
SELECT 
    field_theme_value,
    COUNT(*) as count
FROM paragraph__field_theme
GROUP BY field_theme_value;
```

---

## Phase 3: Staging Deployment & Validation

### 3.1 Staging Deployment Process

#### Configuration Import Sequence
```bash
# 1. Database backup
ddev snapshot create pre-theme-selector-deployment

# 2. Configuration import
ddev drush cim -y

# 3. Database updates
ddev drush updb -y

# 4. Entity schema updates
ddev drush entup -y

# 5. Cache clear
ddev drush cr

# 6. Asset compilation
cd web/themes/custom/adesso_cms_theme
ddev npm run build
```

### 3.2 Staging Validation Tests

#### Functional Testing Checklist
- [ ] All paragraph types display theme selector field
- [ ] Theme selector positioned correctly (weight 1, under title)
- [ ] Interactive theme preview working
- [ ] Form submissions saving theme values correctly
- [ ] Existing content displays with correct themes
- [ ] Admin forms responsive and accessible

#### Performance Testing
```bash
# Check page load times
ddev drush watchdog-show --type=php --severity=error

# Monitor memory usage
ddev exec htop

# Test form rendering performance
# Navigate to various paragraph edit forms and measure load times
```

### 3.3 Cross-Browser Testing

#### Browser Compatibility Matrix
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Phase 4: Production Deployment Execution

### 4.1 Pre-Deployment Checklist

#### Final Validation
- [ ] Staging environment fully tested and validated
- [ ] All team members notified of deployment window
- [ ] Rollback plan tested and ready
- [ ] Monitoring systems prepared
- [ ] Support team on standby

#### Deployment Window Planning
- **Recommended Time:** Off-peak hours (late evening/early morning)
- **Estimated Duration:** 45-60 minutes
- **Rollback Window:** 2 hours maximum

### 4.2 Production Deployment Steps

#### Step 1: Environment Preparation
```bash
# 1. Create full database backup
ddev drush sql-dump > backup/production-backup-$(date +%Y%m%d_%H%M%S).sql

# 2. Enable maintenance mode
ddev drush sset system.maintenance_mode 1
ddev drush cr

# 3. Verify backup integrity
ddev drush sql-query "SELECT COUNT(*) FROM paragraph__field_theme"
```

#### Step 2: Configuration and Migration
```bash
# 4. Import configurations
ddev drush cim -y

# 5. Run data migration
bash scripts/deploy/migrate-theme-field-data.sh

# 6. Update database schema
ddev drush updb -y
ddev drush entup -y
```

#### Step 3: Asset Deployment
```bash
# 7. Compile production assets
cd web/themes/custom/adesso_cms_theme
npm ci --production
npm run build

# 8. Clear all caches
ddev drush cr
```

#### Step 4: Validation and Go-Live
```bash
# 9. Run post-deployment tests
ddev drush status
ddev drush cst

# 10. Disable maintenance mode
ddev drush sset system.maintenance_mode 0
ddev drush cr

# 11. Warm up caches
curl -s https://yoursite.com > /dev/null
```

### 4.3 Deployment Monitoring

#### Real-time Monitoring
- [ ] Application error logs
- [ ] Database performance metrics
- [ ] Page load times
- [ ] Form submission success rates
- [ ] User activity patterns

---

## Phase 5: Post-Deployment Validation

### 5.1 Immediate Validation (First 30 minutes)

#### Critical Function Tests
```bash
# Test paragraph creation workflow
# 1. Navigate to /node/add/page
# 2. Add various paragraph types
# 3. Verify theme selector appears and functions
# 4. Test theme preview functionality
# 5. Save and verify theme application
```

#### System Health Checks
- [ ] No critical errors in logs
- [ ] All paragraph forms loading correctly
- [ ] Theme selector functionality working
- [ ] Existing content displaying properly
- [ ] Performance within acceptable ranges

### 5.2 Extended Validation (First 4 hours)

#### User Acceptance Testing
- [ ] Content editors can use new theme selector
- [ ] Theme preview functionality intuitive
- [ ] Form performance acceptable
- [ ] No accessibility regressions
- [ ] Mobile/tablet functionality confirmed

#### Data Integrity Verification
```sql
-- Verify all theme data migrated correctly
SELECT 
    p.type,
    tcet.field_theme_value,
    COUNT(*) as count
FROM paragraphs_item p
JOIN paragraph__field_theme tcet ON p.id = tcet.entity_id
GROUP BY p.type, tcet.field_theme_value
ORDER BY p.type, tcet.field_theme_value;
```

### 5.3 Performance Monitoring

#### Metrics to Track
```bash
# Page load times
# Average form rendering time: < 500ms
# Theme preview interaction: < 200ms
# Form submission time: < 1000ms

# Resource usage
# Memory usage should remain stable
# CPU usage spikes should be temporary
# Database query performance maintained
```

---

## Phase 6: Rollback Strategy

### 6.1 Rollback Triggers

#### Automatic Rollback Scenarios
- Critical errors preventing form submissions
- Data corruption or loss
- Performance degradation > 100%
- Security vulnerabilities discovered

#### Manual Rollback Scenarios
- User acceptance issues
- Compatibility problems
- Unexpected behavior patterns

### 6.2 Rollback Procedures

#### Emergency Rollback (< 15 minutes)
```bash
# 1. Enable maintenance mode
ddev drush sset system.maintenance_mode 1

# 2. Restore database backup
ddev drush sql-drop -y
ddev drush sql-cli < backup/production-backup-TIMESTAMP.sql

# 3. Revert configuration
git checkout HEAD~1 config/
ddev drush cim -y

# 4. Restore previous assets
git checkout HEAD~1 web/themes/custom/adesso_cms_theme/dist/

# 5. Clear caches and disable maintenance
ddev drush cr
ddev drush sset system.maintenance_mode 0
```

#### Partial Rollback Options
```bash
# Rollback only theme field configurations
ddev drush config-delete field.field.paragraph.*.field_theme
ddev drush cim --partial

# Rollback only frontend assets
git checkout HEAD~1 web/themes/custom/adesso_cms_theme/dist/
ddev drush cc css-js
```

### 6.3 Post-Rollback Actions

#### Immediate Actions
- [ ] Verify system functionality restored
- [ ] Communicate rollback to stakeholders
- [ ] Document rollback reasons and process
- [ ] Plan remediation for identified issues

#### Follow-up Actions
- [ ] Investigate root cause of rollback
- [ ] Update deployment procedures
- [ ] Schedule re-deployment with fixes
- [ ] Conduct post-mortem analysis

---

## Phase 7: GitLab CI/CD Pipeline Integration

### 7.1 Pipeline Enhancements

#### Updated .gitlab-ci.yml Additions
```yaml
# Theme Selector Deployment Stage
deploy_theme_selector:
  stage: deploy
  script:
    - echo "Deploying theme selector feature..."
    - ddev start
    - ddev composer install --no-dev --optimize-autoloader
    - cd web/themes/custom/adesso_cms_theme
    - ddev npm ci --production
    - ddev npm run build
    - ddev drush cim -y
    - bash scripts/deploy/migrate-theme-field-data.sh
    - ddev drush updb -y
    - ddev drush cr
    - ddev npm run visual:test
  artifacts:
    reports:
      junit: theme-selector-tests.xml
    paths:
      - web/themes/custom/adesso_cms_theme/dist/
    expire_in: 1 week
  only:
    - main
    - release/*
```

### 7.2 Automated Testing Integration

#### Pre-deployment Testing
```yaml
theme_selector_tests:
  stage: test
  script:
    - cd web/themes/custom/adesso_cms_theme
    - npm install
    - npm run test
    - npm run lint:js
    - npm run visual:test
  artifacts:
    reports:
      junit: vitest-report.xml
      coverage: coverage/clover.xml
```

### 7.3 Deployment Notifications

#### Slack/Teams Integration
```yaml
notify_deployment:
  stage: notify
  script:
    - curl -X POST -H 'Content-type: application/json' 
      --data '{"text":"Theme Selector feature deployed to production"}' 
      $SLACK_WEBHOOK_URL
  only:
    - main
```

---

## Phase 8: Documentation and Knowledge Transfer

### 8.1 Deployment Runbook

#### Quick Reference Commands
```bash
# Full deployment sequence
./scripts/deploy/theme-selector-full-deploy.sh

# Rollback sequence
./scripts/deploy/theme-selector-rollback.sh

# Health check
./scripts/deploy/theme-selector-health-check.sh

# Performance monitoring
./scripts/deploy/theme-selector-monitor.sh
```

### 8.2 Training Materials

#### Content Editor Training
- [ ] Theme selector usage guide
- [ ] Interactive preview functionality
- [ ] Best practices for theme selection
- [ ] Troubleshooting common issues

#### Developer Documentation
- [ ] Theme selector architecture documentation
- [ ] Configuration management procedures
- [ ] Testing procedures and expectations
- [ ] Performance optimization guidelines

### 8.3 Support Procedures

#### Issue Escalation Matrix
1. **Level 1:** Form display issues, minor UI problems
2. **Level 2:** Data integrity concerns, performance issues
3. **Level 3:** System-wide failures, security concerns

#### Common Issues and Solutions
```markdown
**Issue:** Theme selector not appearing
**Solution:** Clear form cache, verify field configuration

**Issue:** Theme preview not working
**Solution:** Check JavaScript console, verify asset compilation

**Issue:** Performance degradation
**Solution:** Review database queries, check cache configuration
```

---

## Success Metrics and KPIs

### 8.1 Technical Metrics
- **Deployment Success Rate:** 100%
- **Rollback Rate:** < 5%
- **Form Load Time:** < 500ms average
- **Error Rate:** < 0.1%
- **Test Coverage:** > 90%

### 8.2 User Experience Metrics
- **User Adoption Rate:** Track theme selector usage
- **Task Completion Time:** Measure form submission efficiency
- **User Satisfaction:** Collect feedback from content editors
- **Support Ticket Volume:** Monitor theme-related issues

### 8.3 Performance Metrics
- **Page Load Time:** Maintain < 2s average
- **Server Response Time:** < 200ms for form requests
- **Memory Usage:** No significant increase
- **Database Performance:** Query time < 100ms average

---

## Risk Assessment and Mitigation

### 8.1 High-Risk Scenarios

#### Data Loss Risk
- **Probability:** Low
- **Impact:** High
- **Mitigation:** Multiple backup layers, tested restore procedures

#### Performance Degradation
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Performance testing, monitoring, quick rollback

#### User Experience Issues
- **Probability:** Medium
- **Impact:** Medium  
- **Mitigation:** Comprehensive testing, user training, gradual rollout

### 8.2 Contingency Plans

#### Extended Downtime
- Communicate with stakeholders
- Implement emergency rollback
- Activate incident response team
- Document lessons learned

#### Partial Functionality Loss
- Identify affected components
- Implement temporary workarounds
- Deploy targeted fixes
- Monitor for side effects

---

## Conclusion

This deployment strategy provides a comprehensive framework for safely deploying the theme selector feature to production. The multi-phase approach ensures thorough testing, careful execution, and robust rollback capabilities while minimizing risk and downtime.

**Key Success Factors:**
1. Thorough pre-deployment testing in staging
2. Careful data migration with validation
3. Comprehensive monitoring and validation
4. Quick rollback capabilities
5. Clear documentation and communication

**Timeline Summary:**
- **Phase 1-3 (Staging):** 2-3 days
- **Phase 4 (Production Deployment):** 1-2 hours
- **Phase 5 (Post-Deployment Validation):** 4-24 hours
- **Phase 6-8 (Documentation & Monitoring):** Ongoing

The strategy balances thorough preparation with efficient execution, ensuring a successful deployment of this critical theme selector enhancement to the Adesso CMS platform.