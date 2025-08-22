# Event Review Dashboard - Setup & Installation Guide
## GPZH Präqualifikation - Gemeinde Bruchtal (PR #11)

### 🎯 Overview
Complete installation and configuration guide for the Municipal Event Review Dashboard implementing Swiss standards for the GPZH demonstration project. This guide ensures successful deployment of PR #11 features for the 35-minute Canton Zürich presentation.

---

## 📋 Prerequisites

### System Requirements
- **Drupal:** 11.2.2+ with multisite configuration
- **PHP:** 8.3+ with required extensions
- **Database:** MariaDB 10.11+ or MySQL 8.0+
- **DDEV:** 1.22+ for local development environment
- **Composer:** 2.5+ for dependency management

### Required Drupal Modules
```bash
# Core modules (should be enabled)
- content_moderation
- workflows  
- views
- user
- node

# Contrib modules (added via composer)
- views_bulk_operations:^4.3
```

### Content Types Required
- **Event content type** with required fields:
  - Title (title)
  - Body (body) 
  - Event Date (field_event_date)
  - Location (field_location)
  - Event Type (field_event_type)
  - Rejection Reason (field_rejection_reason) - NEW

---

## 🔧 Installation Steps

### Step 1: Environment Preparation
```bash
# Ensure DDEV environment is running
ddev start

# Verify current branch and PR status
git status
git log --oneline -10

# Check if you're on the correct branch for PR #11
git branch
```

### Step 2: Dependency Installation
```bash
# Install required Composer dependencies
composer require drupal/views_bulk_operations:^4.3

# Update dependencies if needed
ddev composer install

# Verify VBO module is available
ddev drush pm:list | grep views_bulk_operations
```

### Step 3: Module Activation
```bash
# Enable required modules
ddev drush en views_bulk_operations -y
ddev drush en event_review -y

# Verify modules are enabled
ddev drush pm:list --status=enabled | grep -E "(views_bulk_operations|event_review)"
```

### Step 4: Configuration Import
```bash
# Import all configuration changes from PR #11
ddev drush cim -y

# Verify specific configurations were imported
ddev drush cget workflows.workflow.event_approval
ddev drush cget views.view.event_review_dashboard
ddev drush cget user.role.editor
```

### Step 5: Database Updates
```bash
# Run database updates if needed
ddev drush updb -y

# Update entity schemas
ddev drush entup -y

# Clear all caches
ddev drush cr
```

### Step 6: Field Configuration Verification
```bash
# Verify field_rejection_reason was created
ddev drush field:info field_rejection_reason

# Check event content type has all required fields
ddev drush entity:info node:event
```

---

## 👥 User Roles & Permissions Setup

### Step 1: Editor Role Configuration
```bash
# Check if editor role exists
ddev drush user:role:list

# Grant Event Review permissions to Editor role
ddev drush config:set user.role.editor permissions.34 "access event review dashboard"
ddev drush config:set user.role.editor permissions.35 "use event_approval transition approve"
ddev drush config:set user.role.editor permissions.36 "use event_approval transition reject"
ddev drush config:set user.role.editor permissions.37 "use event_approval transition resubmit"
```

### Step 2: Test User Creation
```bash
# Create test municipal editor user
ddev drush user:create municipal_editor \
  --mail="editor@bruchtal.ch" \
  --password="SecurePass123!"

# Assign editor role
ddev drush user:role:add editor municipal_editor

# Generate admin login link
ddev drush uli --name=municipal_editor --uri=bruchtal.zh-demo.ddev.site
```

---

## 📧 Email Configuration

### Step 1: SMTP Settings (Production)
```bash
# Configure for Gemeinde Bruchtal
ddev drush config:set system.site mail "noreply@bruchtal.ch"
ddev drush config:set system.site name "Gemeinde Bruchtal"

# In production, configure SMTP module:
# - SMTP Server: mail.bruchtal.ch
# - From Address: noreply@bruchtal.ch  
# - From Name: Gemeinde Bruchtal
```

### Step 2: Email Templates Verification
```bash
# Check if email templates are properly loaded
ddev drush config:get event_review.settings

# Test email functionality (optional)
ddev drush php:eval "
\$mail_manager = \Drupal::service('plugin.manager.mail');
\$module = 'event_review';
\$key = 'event_approved';
\$to = 'test@example.com';
\$params['event_title'] = 'Test Event';
\$params['user_name'] = 'Test User';
\$langcode = 'de';
\$send = TRUE;
\$result = \$mail_manager->mail(\$module, \$key, \$to, \$langcode, \$params, NULL, \$send);
print_r(\$result);
"
```

---

## 🗂️ Demo Content Setup

### Step 1: Create Test Events
```bash
# Option A: Use provided demo script
ddev exec php web/modules/custom/event_review/scripts/create_demo_events.php

# Option B: Manual creation via Drush
ddev drush entity:create node \
  --bundle=event \
  --title="Kindergeburtstag im Vereinsheim" \
  --field_event_date="2025-09-15T14:00:00" \
  --field_location="Vereinsheim FC Bruchtal" \
  --field_event_type="private" \
  --moderation_state="draft"

ddev drush entity:create node \
  --bundle=event \
  --title="Sommerfest am Seeufer" \
  --field_event_date="2025-09-20T18:00:00" \
  --field_location="Seepromenade Bruchtal, 8803 Bruchtal" \
  --field_event_type="public" \
  --moderation_state="draft"
```

### Step 2: Demo User Creation
```bash
# Create demo event submitters
ddev drush user:create thorin.eichenschild \
  --mail="thorin.eichenschild@reitverein-bruchtal.ch" \
  --password="Demo123!"

ddev drush user:create gandalf.grau \
  --mail="gandalf.grau@kulturverein-bruchtal.ch" \
  --password="Demo123!"
```

---

## 🚀 Dashboard Access & Testing

### Step 1: Access Dashboard
```bash
# Generate admin login for Bruchtal site
ddev drush uli --uri=bruchtal.zh-demo.ddev.site

# Dashboard URL
# https://bruchtal.zh-demo.ddev.site/admin/content/events/review
```

### Step 2: Functionality Testing
1. **Login as Editor** using generated link
2. **Navigate to Event Review Dashboard**
3. **Verify all events are listed** with correct status
4. **Test filtering** by status, date, user
5. **Test bulk operations:**
   - Select multiple events
   - Choose "Approve" action
   - Execute and verify email notifications
6. **Test individual approval/rejection**

### Step 3: Email Testing
```bash
# Check if emails are being sent (in development)
ddev logs web | grep "mail"

# In production, verify SMTP configuration
# Check /admin/config/system/smtp
```

---

## 🔍 Verification Checklist

### ✅ Module Installation
- [ ] `views_bulk_operations` module enabled
- [ ] `event_review` module enabled and functional
- [ ] All dependencies resolved

### ✅ Configuration Import
- [ ] `event_approval` workflow created
- [ ] `event_review_dashboard` view operational  
- [ ] `field_rejection_reason` field available
- [ ] Editor role has correct permissions

### ✅ Dashboard Functionality
- [ ] Dashboard accessible at `/admin/content/events/review`
- [ ] Events list displays correctly
- [ ] Filter functions work (status, date, user)
- [ ] Bulk approve/reject actions functional
- [ ] Individual event approve/reject works

### ✅ Email System
- [ ] Approval emails sent in Swiss German
- [ ] Rejection emails include reason field
- [ ] Municipal branding present (Gemeinde Bruchtal)
- [ ] Professional Sie-form addressing

### ✅ Swiss Compliance
- [ ] Swiss date format (DD.MM.YYYY HH:MM)
- [ ] Swiss German interface labels
- [ ] eCH-0039 compliant field validation
- [ ] Municipal contact information included

### ✅ Demo Readiness
- [ ] Test events created (draft status)
- [ ] Demo scenarios ready for presentation
- [ ] Performance acceptable (<2 seconds load time)
- [ ] Mobile responsive design

---

## 🚨 Troubleshooting Installation Issues

### Issue: VBO Module Missing
```bash
# Solution: Install via composer
composer require drupal/views_bulk_operations:^4.3
ddev drush en views_bulk_operations -y
```

### Issue: Configuration Import Fails
```bash
# Solution: Check configuration dependencies
ddev drush config:status
ddev drush config:import --partial

# If specific configs fail, import individually
ddev drush config:import --partial \
  --source=/var/www/html/config/sync \
  workflows.workflow.event_approval
```

### Issue: Field Storage Conflicts
```bash
# Solution: Clear field caches and reimport
ddev drush field:purge
ddev drush cr
ddev drush cim -y
```

### Issue: Permissions Not Working
```bash
# Solution: Rebuild permissions and clear caches
ddev drush php:eval "\Drupal::service('router.builder')->rebuild();"
ddev drush cr
```

### Issue: Dashboard Not Accessible
```bash
# Solution: Check route and permissions
ddev drush route:get event_review.dashboard
ddev drush user:role:list editor
```

---

## 📊 Performance Optimization

### Database Optimization
```bash
# Index key fields for dashboard performance
# (Should be handled by field configuration)

# Clear views cache
ddev drush views:rebuild
ddev drush cr views
```

### Caching Configuration
```bash
# Ensure proper caching for production
ddev drush config:set system.performance cache.page.max_age 3600
ddev drush config:set system.performance css.preprocess 1
ddev drush config:set system.performance js.preprocess 1
```

---

## 🇨🇭 Swiss Compliance Validation

### Date Format Verification
```bash
# Verify Swiss date format in dashboard
# Should display: DD.MM.YYYY HH:MM format

# Test via browser at dashboard URL
# Check event dates are formatted correctly
```

### Language Standards Check
```bash
# Verify Swiss German labels
# No "ß" characters (use "ss")
# Sie-form addressing in emails
# Professional municipal terminology
```

### eCH-0039 Compliance Check
```bash
# All required event fields present:
# - Title, Date, Location, Description
# - Contact information
# - Event categorization
```

---

## 🎯 Post-Installation Next Steps

### For GPZH Demo Preparation
1. **Create demo scenarios** (see DEMO_SCENARIOS.md)
2. **Test presentation flow** (15-minute segment)
3. **Prepare stakeholder talking points**
4. **Verify performance metrics** (Core Web Vitals >90)

### For Production Deployment
1. **Configure production SMTP** settings
2. **Set up monitoring** for email delivery
3. **Train municipal staff** using user guide
4. **Schedule regular maintenance** tasks

### For Municipality Customization
1. **Update contact information** for each municipality
2. **Customize municipal rules** in service configuration
3. **Adjust email templates** for municipality branding
4. **Configure municipality-specific workflows**

---

## 📞 Support Information

### Technical Support
- **Repository:** ZH-DEMO project
- **Module Path:** `/web/modules/custom/event_review/`
- **Documentation:** See docs/ folder in module

### Demo Support (Gemeinde Bruchtal)
- **Dashboard URL:** `https://bruchtal.zh-demo.ddev.site/admin/content/events/review`
- **Admin Access:** `ddev drush uli --uri=bruchtal.zh-demo.ddev.site`
- **Demo Contact:** `demo@bruchtal.ch`

---

*Setup Guide Version: 1.0*  
*Last Updated: 21.08.2025*  
*Compatible with: Drupal 11.2.2, PR #11*  
*Municipality: Gemeinde Bruchtal - Leben am See*