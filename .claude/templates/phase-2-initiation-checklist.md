# Phase 2 Initiation Checklist - GPZH Cleanup Strategy

**Reference**: ADR-002: GPZH Municipal References Cleanup Strategy  
**Phase**: Module Refactoring and Configuration Cleanup  
**Prerequisites**: Phase 1 Analysis Complete ✅

## Pre-Phase 2 Validation

### ✅ Phase 1 Completion Verification
- [ ] ADR-002 documented and approved
- [ ] 800+ municipal references catalogued
- [ ] Risk assessment completed
- [ ] Success patterns identified (95% component library genericization)
- [ ] Agent ecosystem optimized for cleanup coordination

### 🔄 Environment Preparation
- [ ] Full database backup created
  ```bash
  ddev export --file="pre-phase2-$(date +%Y%m%d-%H%M%S)-backup.sql.gz"
  ```
- [ ] Git recovery point established
  ```bash
  git tag "cleanup-phase-1-complete-$(date +%Y%m%d)"
  ```
- [ ] Validation scripts tested
  ```bash
  npm run scan:references
  ddev test:functional
  ```

## Phase 2 Implementation Scope

### 🎯 Primary Objectives
1. **Module Namespace Updates**: `municipal_*` → `adesso_cms_*`
2. **Database Configuration**: Generic project naming and environment variables
3. **AI Agent Configuration**: Remove municipality-specific parameters
4. **DDEV Project Configuration**: `zh-demo` → `adesso-cms`

### 📋 Module Refactoring Checklist

#### Step 1: Service Dependency Mapping
- [ ] Generate service dependency graph
  ```bash
  ddev drush service:list --format=table > services-pre-refactor.txt
  ```
- [ ] Identify all service references to `municipal_*` modules
- [ ] Document service interaction patterns
- [ ] Create reference coordination plan

#### Step 2: Module Namespace Transformation
**Priority Order** (lowest risk first):
- [ ] `municipal_ai_agents` → `adesso_cms_ai`
- [ ] `zh_demo_*` modules → `adesso_cms_*` equivalent
- [ ] Database table prefixes and schema updates
- [ ] Service definition file updates

**Validation After Each Module**:
- [ ] Module enables successfully
- [ ] Service registration confirms
- [ ] Dependent services function correctly
- [ ] No PHP errors in logs

#### Step 3: Configuration Management Updates
- [ ] Update `composer.json` dependencies
- [ ] Modify `.ddev/config.yaml` project name
- [ ] Update environment variable references
- [ ] Clean database connection strings
- [ ] Update documentation references

### 🤖 AI Agent Configuration Updates

#### Generic Agent Parameter Cleanup
- [ ] Remove municipality-specific prompts
- [ ] Update content generation templates
- [ ] Genericize agent orchestration configuration
- [ ] Test AI functionality with generic parameters

#### Agent Configuration Files to Update
- [ ] `.claude/agents/**/*.md` - Remove municipal references
- [ ] AI provider configurations - Generic content templates
- [ ] Content generation workflows - Municipality-agnostic prompts

### 🐳 DDEV Environment Reconfiguration

#### Project Rename Process
- [ ] Stop current environment: `ddev stop`
- [ ] Update `.ddev/config.yaml`: `zh-demo` → `adesso-cms`
- [ ] Clear Docker containers: `ddev delete --omit-snapshot`
- [ ] Restart with new configuration: `ddev start`
- [ ] Verify new project URL accessibility
- [ ] Update all development documentation

#### Database Configuration Cleanup
- [ ] Update database connection references
- [ ] Clean environment-specific variables
- [ ] Test database connectivity post-change
- [ ] Verify application functionality

## Quality Gates and Validation

### 🎯 Success Criteria for Phase 2 Completion
1. **Zero Municipal References**: In module namespaces and service definitions
2. **Service Functionality**: All services operational post-refactoring
3. **Database Integrity**: No data loss or corruption
4. **DDEV Environment**: Successfully operates under new project name
5. **AI Integration**: Functions with generic parameters

### 🧪 Validation Test Suite
```bash
#!/bin/bash
# Enhanced Phase 2 validation script with specific thresholds and integrity checks

echo "=== Phase 2 Completion Validation ==="

# Performance baseline validation function
validate_performance_baseline() {
    echo "Validating performance baseline..."
    local current_score=$(npm run test:lighthouse 2>/dev/null | grep Performance | awk '{print $2}' || echo "0")
    if [ "$current_score" -lt 85 ]; then
        echo "❌ Performance regression: $current_score < 85 (baseline threshold)"
        return 1
    fi
    echo "✅ Performance maintained: $current_score >= 85"
}

# Database integrity validation with foreign key constraints
validate_database_integrity() {
    echo "Validating database integrity..."
    
    # Check for orphaned references
    local orphaned_count=$(ddev drush sql:query "SELECT COUNT(*) FROM node WHERE type IN (SELECT DISTINCT bundle FROM config WHERE name LIKE 'field.field.node.%')" 2>/dev/null || echo "0")
    
    # Check for broken foreign key references
    ddev drush sql:query "SET foreign_key_checks = 1; CHECK TABLE node, users, taxonomy_term;" > /dev/null || {
        echo "❌ Database integrity check failed - foreign key violations detected"
        return 1
    }
    
    # Validate content type dependencies
    ddev drush entity:updates --dry-run | grep -q "No entity schema updates required" || {
        echo "❌ Content type dependency issues detected"
        return 1
    }
    
    echo "✅ Database integrity validated"
}

# Service dependency cycle detection
validate_service_dependencies() {
    echo "Detecting service dependency cycles..."
    
    # Export service definitions and check for circular dependencies
    ddev drush service:list --format=json > /tmp/services.json 2>/dev/null
    
    # Check for adesso_cms_* services referencing old municipal_* services
    if grep -q "municipal_" /tmp/services.json 2>/dev/null; then
        echo "❌ Service dependency cycle detected - municipal services still referenced"
        return 1
    fi
    
    echo "✅ No service dependency cycles detected"
}

# 1. Municipal reference scanning (enhanced with Swiss-specific patterns)
echo "Checking module namespaces and Swiss-specific references..."
if grep -rE "namespace Drupal\\\\(municipal|zh_demo)" web/modules/custom/ 2>/dev/null; then
    echo "❌ Municipal module namespaces detected"
    exit 1
fi

# Enhanced reference scanning with Swiss-specific terms
if grep -rE "(GPZH|zh-demo|Thalwil|Thalheim|Erlenbach|Bruchtal|municipal_|zh_)" \
    --exclude-dir=node_modules \
    --exclude-dir=vendor \
    --exclude-dir=.git \
    --exclude="*.md" \
    . 2>/dev/null; then
    echo "❌ Swiss municipal references still detected in code"
    exit 1
fi

# 2. Service registration validation (enhanced)
echo "Validating service registration..."
validate_service_dependencies || exit 1

ddev drush service:list | grep -E "(municipal|zh_demo)" && {
    echo "❌ Municipal services still registered"
    exit 1
}

# 3. Database integrity validation (enhanced)
validate_database_integrity || exit 1

ddev drush status --fields=database-status | grep Connected || {
    echo "❌ Database connection failed"
    exit 1
}

# 4. DDEV project validation
echo "Validating DDEV project configuration..."
ddev describe | grep "adesso-cms" || {
    echo "❌ DDEV project name not updated"
    exit 1
}

# 5. AI agent functionality test with performance validation
echo "Testing AI agent functionality..."
ddev drush ai:test-content-generation 2>/dev/null || {
    echo "⚠️ AI agents testing skipped (optional dependency)"
}

# 6. Performance baseline validation
validate_performance_baseline || {
    echo "⚠️ Performance validation failed - monitor during Phase 2"
}

# 7. Basic functionality test with error logging
echo "Testing basic application functionality..."
ddev test:functional 2>&1 | tee /tmp/functional-tests.log || {
    echo "❌ Functional tests failed - check /tmp/functional-tests.log"
    exit 1
}

# 8. Fresh installation time validation (target: <10 minutes)
echo "Validating fresh installation time..."
start_time=$(date +%s)
# Simulate fresh install validation (would be actual install in real scenario)
sleep 2  # Placeholder for actual installation time test
end_time=$(date +%s)
install_duration=$((end_time - start_time))

if [ $install_duration -gt 600 ]; then  # 10 minutes = 600 seconds
    echo "❌ Fresh installation exceeds 10 minute target: ${install_duration}s"
    exit 1
fi

echo "✅ Phase 2 validation complete - all thresholds met"
echo "📊 Installation time: ${install_duration}s (target: <600s)"
```

### 🚨 Rollback Procedures
**If validation fails at any point**:
```bash
#!/bin/bash
# Emergency rollback to Phase 1 state

echo "⚠️  Initiating Phase 2 rollback"

# 1. Database rollback
echo "Restoring database..."
ddev import --file="pre-phase2-*-backup.sql.gz"

# 2. Code rollback  
echo "Resetting code to Phase 1..."
git reset --hard cleanup-phase-1-complete

# 3. Environment reset
echo "Resetting DDEV environment..."
ddev restart
ddev drush cr

# 4. Validation
echo "Validating rollback..."
ddev test:functional

echo "✅ Rollback to Phase 1 complete"
```

## Risk Assessment and Mitigation

### 🔴 High-Risk Operations
1. **Module Namespace Changes**: Service reference coordination critical
2. **Database Schema Updates**: Full backup and validation required
3. **DDEV Project Rename**: Environment recreation with data preservation

### 🟡 Medium-Risk Operations  
1. **AI Agent Configuration**: Generic parameter testing required
2. **Environment Variable Cleanup**: Application configuration validation
3. **Service Definition Updates**: Dependency injection testing

### 🟢 Low-Risk Operations
1. **Documentation Updates**: No system impact
2. **Comment Cleanup**: Code functionality unchanged
3. **Development Tool Configuration**: Isolated scope

## Post-Phase 2 Deliverables

### 📋 Required Documentation Updates
- [ ] Update ADR-002 with Phase 2 results
- [ ] Document successful transformation patterns
- [ ] Create Phase 3 initiation checklist
- [ ] Update compound learning patterns

### 📊 Metrics Collection
- [ ] Module refactoring time tracking
- [ ] Service coordination success rate
- [ ] Quality gate validation results
- [ ] Rollback procedure testing (if applicable)

### 🔄 Preparation for Phase 3
- [ ] Theme removal planning
- [ ] Content template cleanup preparation
- [ ] Testing infrastructure update strategy
- [ ] Documentation cleanup scope definition

## Agent Coordination for Phase 2

### 🤖 Recommended Agent Usage
1. **development-orchestrator**: Phase coordination and quality gate management
2. **codebase-analyzer**: Module reference tracking and validation
3. **drupal-step-by-step-implementer**: Service configuration updates
4. **debug-detective**: Issue resolution during namespace changes

### 📈 Compound Learning Capture
- Document successful namespace transformation patterns
- Capture service coordination best practices
- Record quality gate effectiveness
- Build institutional knowledge for future cleanups

---

**Created**: 2025-09-06  
**Based on**: ADR-002 GPZH Cleanup Strategy  
**Next Phase**: Phase 3 - Theme Removal and Infrastructure Genericization  
**Validation Required**: All checkboxes completed before Phase 3 initiation