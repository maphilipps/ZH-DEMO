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
# Phase 2 validation script

echo "=== Phase 2 Completion Validation ==="

# 1. Municipal reference scanning (modules and services)
echo "Checking module namespaces..."
if grep -r "namespace Drupal\\municipal" web/modules/custom/; then
    echo "❌ Municipal module namespaces detected"
    exit 1
fi

# 2. Service registration validation
echo "Validating service registration..."
ddev drush service:list | grep municipal && {
    echo "❌ Municipal services still registered"
    exit 1
}

# 3. Database connectivity test
echo "Testing database connectivity..."
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

# 5. AI agent functionality test
echo "Testing AI agent functionality..."
ddev drush ai:test-content-generation || {
    echo "❌ AI agents not functioning"
    exit 1
}

# 6. Basic functionality test
echo "Testing basic application functionality..."
ddev test:functional || {
    echo "❌ Functional tests failed"
    exit 1
}

echo "✅ Phase 2 validation complete"
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