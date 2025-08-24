# ZH Demo Editorial Workflow Test Suite

Comprehensive test suite for the GPZH Editorial Workflow system covering the complete editorial workflow from content creation to publication.

## 🎯 Test Coverage

### Test Scenarios Covered

#### 1. **Complete Editorial Workflow** (`EditorialWorkflowTest.php`)
- ✅ Guest user creates content (Draft state)
- ✅ Guest user submits for review (Review state)  
- ✅ Editor sees content in dashboard
- ✅ Editor reviews and approves content (Published state)
- ✅ Published content visible to anonymous users
- ✅ All GPZH content types: Vereine, Firmen, Events, Gastgewerbe

#### 2. **User Permissions** (`UserPermissionsTest.php`)
- ✅ Guest Editor permissions (create own, submit for review)
- ✅ Editor permissions (moderate any content, publish/unpublish)
- ✅ Anonymous user permissions (view published only)
- ✅ Authenticated user baseline permissions
- ✅ Role assignment and inheritance

#### 3. **Workflow State Transitions** (`WorkflowTransitionsTest.php`)
- ✅ Valid/invalid state transitions (Draft → Review → Published)
- ✅ Role-based transition permissions
- ✅ Content type workflow eligibility
- ✅ Workflow state properties and validation

#### 4. **End-to-End User Experience** (`EndToEndWorkflowTest.php`)
- ✅ Complete GPZH demo workflow with JavaScript interactions
- ✅ Real-time dashboard updates
- ✅ Multiple content type handling
- ✅ Login redirect functionality

#### 5. **GPZH Demo Scenarios** (`GpzhDemoScenariosTest.php`)
- ✅ **Demo Segment 3**: Backend für Gemeindemitarbeitende (15 Min)
- ✅ Directory management (Vereine, Firmen, Gastgewerbe)
- ✅ Guest account workflow with approval process
- ✅ WYSIWYG content creation with rich formatting
- ✅ Media integration capabilities
- ✅ Statistics accuracy for dashboard presentation
- ✅ Error handling and edge cases

## 🚀 Running Tests

### Quick Test Run
```bash
# Run all tests
ddev exec /var/www/html/web/modules/custom/zh_demo_editorial_workflow/run-tests.sh
```

### Individual Test Suites
```bash
# Unit tests only
ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Unit/ --verbose

# Functional tests only  
ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Functional/ --verbose

# JavaScript tests only (requires Selenium)
ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/FunctionalJavascript/ --verbose
```

### Specific Test Classes
```bash
# Test complete workflow
ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Functional/EditorialWorkflowTest.php

# Test GPZH demo scenarios
ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Functional/GpzhDemoScenariosTest.php
```

## 📋 Manual Verification Checklist

After automated tests pass, manually verify:

### 1. Guest User Workflow
- [ ] Login as `guest` user works
- [ ] Redirects to `/admin/dashboard/user`
- [ ] Can create club/company/event/hospitality content
- [ ] Can submit content for review
- [ ] Cannot directly publish content

### 2. Editor Workflow  
- [ ] Login as editor works
- [ ] Access `/admin/dashboard/editor` shows statistics
- [ ] Access `/admin/content/review` shows submitted content
- [ ] Can approve/reject submitted content
- [ ] Dashboard statistics update correctly

### 3. Public Access
- [ ] Anonymous users can view published content
- [ ] Anonymous users cannot view draft/review content
- [ ] Published content shows correct formatting

### 4. Workflow States
- [ ] Draft → Review transition works
- [ ] Review → Published transition works
- [ ] Published → Unpublished transition works (editor only)
- [ ] Invalid transitions are blocked

## 🎭 GPZH Demo Scenarios

The test suite specifically covers the **35-minute GPZH presentation** structure:

### Demo Segment 3: Backend für Gemeindemitarbeitende (15 Min)

1. **Directory Management** (5 Min)
   - Create/edit Vereine (clubs)
   - Create/edit Firmen (companies)
   - Create/edit Gastgewerbe (hospitality)
   - Bulk management capabilities

2. **Guest Account Workflow** (5 Min)  
   - Guest submits content → Review state
   - Editor dashboard shows submission
   - Editor approves → Published state
   - Content becomes publicly visible

3. **Content Creation Features** (3 Min)
   - WYSIWYG editor with rich formatting
   - Media integration (images, PDFs)
   - Preview functionality

4. **Dashboard Features** (2 Min)
   - Real-time statistics
   - Content overview and filtering
   - User role management

## 🔧 Test Environment Requirements

### Required Modules
- `content_moderation` (Drupal core)
- `workflows` (Drupal core) 
- `node` (Drupal core)
- `user` (Drupal core)
- `dashboard` (contrib)

### Required Roles
- `guest_editor` - Can create and submit content
- `editor` - Can moderate and publish content

### Required Content Types
- `club` (Verein)
- `company` (Firma)
- `event` (Event)
- `hospitality` (Gastgewerbe)

### Workflow Configuration
- **Workflow ID**: `basic_editorial`
- **States**: draft → review → published
- **Transitions**: 
  - submit_for_review (guest_editor)
  - publish (editor only)
  - unpublish (editor only)

## 📊 Expected Test Results

When all tests pass, the system demonstrates:

✅ **Complete Editorial Workflow**: 100% functional  
✅ **User Permission System**: Properly configured  
✅ **Content Moderation**: Working as designed  
✅ **Dashboard Functionality**: Statistics and management working  
✅ **GPZH Demo Ready**: All demo scenarios validated  

## 🛠️ Troubleshooting

### Common Issues

**Tests fail due to missing content types:**
```bash
ddev drush config:import --partial
```

**Permission errors:**
```bash
ddev drush user:role:add guest_editor guest
ddev drush user:role:add editor [editor_username]
```

**Workflow not configured:**
```bash
ddev drush config:get workflows.workflow.basic_editorial
```

**Dashboard not accessible:**
```bash
ddev drush pm:enable dashboard
ddev drush cr
```

### Debug Mode
Run tests with more verbose output:
```bash
ddev exec vendor/bin/phpunit web/modules/custom/zh_demo_editorial_workflow/tests/src/Functional/EditorialWorkflowTest.php --debug --verbose
```

## 🎯 Success Criteria

The test suite validates that the GPZH Editorial Workflow system is ready for the 35-minute demo presentation with:

- **Reliable workflow**: No failures in state transitions
- **Proper permissions**: Users can only do what they should
- **Dashboard functionality**: Real-time statistics and management
- **Public accessibility**: Published content visible to all
- **Demo scenarios**: All presentation scenarios tested and working

When all tests pass: **🎉 System is demo-ready! 🎉**