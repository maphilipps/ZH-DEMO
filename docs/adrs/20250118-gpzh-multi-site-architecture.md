# ADR-001: Multi-Site Architecture Strategy for GPZH

**Date:** 2025-01-18  
**Status:** Accepted  
**Context:** GPZH (Gemeindeportale Zürich) project architecture decisions  
**Ticket:** GPZH-30  

## Summary

Define the multi-site architecture strategy for the ZH-DEMO prototype, enabling multiple municipalities to be served from a single Drupal 11.2.2 installation while maintaining content isolation and municipal-specific branding.

## Context

The GPZH project requires serving multiple municipalities (Thalwil, Thalheim, Erlenbach) from a single CMS installation for the präqualification demonstration. Each municipality needs:

- Distinct visual branding and design patterns
- Isolated content management 
- Separate administrative access
- Municipal-specific configuration
- Shared technical infrastructure and updates

## Decision

Implement **Drupal Multi-Site Architecture** with the following structure:

### **Multi-Site Configuration**

```yaml
Directory Structure:
  web/sites/
    default/         # Main administration site
    thalwil/         # Modern urban municipality
    thalheim/        # Rural wine country municipality  
    erlenbach/       # Lake Zurich community
```

### **Domain Mapping**

```php
// web/sites/sites.php
$sites['thalwil.zh-demo.ddev.site'] = 'thalwil';
$sites['thalheim.zh-demo.ddev.site'] = 'thalheim';
$sites['erlenbach.zh-demo.ddev.site'] = 'erlenbach';
$sites['zh-demo.ddev.site'] = 'default';
```

### **Database Isolation Strategy**

Each municipality uses a separate database with shared configuration:

```php
// Individual site settings.php
$databases['default']['default'] = [
  'database' => 'db_thalwil',  // Municipality-specific DB
  'username' => 'db',
  'password' => 'db',
  'prefix' => 'thalwil_',      // Additional prefix for isolation
  'host' => 'db',
  'port' => '3306',
  'driver' => 'mysql',
];
```

### **Configuration Management**

Separate configuration sync directories per municipality:

```yaml
Configuration Directories:
  config/sync_thalwil/    # Thalwil-specific config
  config/sync_thalheim/   # Thalheim-specific config  
  config/sync_erlenbach/  # Erlenbach-specific config
  config/sync/            # Shared base configuration
```

### **Theme Architecture**

Municipality-specific theme variants with shared base:

```yaml
Theme Structure:
  web/themes/custom/adesso_cms_theme/
    ├── base/               # Shared theme foundation
    ├── variants/
    │   ├── thalwil/       # Modern urban design
    │   ├── thalheim/      # Rural/wine country design
    │   └── erlenbach/     # Lakeside community design
    └── components/         # Shared SDC components
```

## Rationale

### **Benefits**

1. **Resource Efficiency**
   - Single Drupal core installation
   - Shared module updates and security patches
   - Reduced hosting and maintenance costs
   - Centralized administration capabilities

2. **Development Efficiency**
   - Shared codebase for common functionality
   - Reusable components across municipalities
   - Consistent development workflows
   - Single CI/CD pipeline

3. **Content Isolation**
   - Complete data separation between municipalities
   - Independent content management workflows
   - Municipal-specific user access control
   - Isolated backup and recovery procedures

4. **Design Flexibility**
   - Municipality-specific branding and themes
   - Tailored user experiences per community
   - Flexible feature configuration per site
   - Independent content architecture

### **Trade-offs**

1. **Complexity**
   - More complex initial setup and configuration
   - Careful coordination required for shared updates
   - Testing across multiple sites required

2. **Performance Considerations**
   - Slight overhead for site resolution
   - Additional database connections
   - Careful cache management required

3. **Deployment Coordination**
   - Changes affect multiple sites simultaneously
   - Rollback procedures more complex
   - Testing requirements increased

## Implementation Details

### **DDEV Configuration**

```yaml
# .ddev/config.yaml additions
additional_hostnames:
  - thalwil.zh-demo.ddev.site
  - thalheim.zh-demo.ddev.site
  - erlenbach.zh-demo.ddev.site
```

### **Development Workflow**

```bash
# Multi-site testing commands
ddev drush --uri=thalwil.zh-demo.ddev.site cr
ddev drush --uri=thalheim.zh-demo.ddev.site cex
ddev drush --uri=erlenbach.zh-demo.ddev.site uli

# Performance testing across all sites
@playwright-test-municipality --all-sites --include-performance
```

### **Configuration Deployment**

```bash
# Municipality-specific configuration deployment
ddev drush --uri=thalwil.zh-demo.ddev.site cim --source=../config/sync_thalwil
ddev drush --uri=thalheim.zh-demo.ddev.site cim --source=../config/sync_thalheim
ddev drush --uri=erlenbach.zh-demo.ddev.site cim --source=../config/sync_erlenbach
```

## Testing Strategy

### **Multi-Site Validation**

1. **Content Isolation Testing**
   - Verify no content leakage between sites
   - Test user access restrictions
   - Validate database separation

2. **Performance Testing**
   - Core Web Vitals across all municipalities
   - Load testing with multiple site access
   - Database performance monitoring

3. **Configuration Testing**
   - Independent configuration imports
   - Site-specific feature validation
   - Theme switching verification

### **Automated Testing**

```javascript
// Playwright multi-site testing
const municipalities = ['thalwil', 'thalheim', 'erlenbach'];

test.describe('Multi-site architecture', () => {
  municipalities.forEach(municipality => {
    test(`${municipality} site accessibility`, async ({ page }) => {
      await page.goto(`https://${municipality}.zh-demo.ddev.site`);
      // Accessibility testing
      const results = await axe(page);
      expect(results).toHaveNoViolations();
    });
  });
});
```

## Security Considerations

### **Access Control**

- Site-specific user accounts and roles
- Administrative access isolation
- Cross-site privilege escalation prevention
- Secure file directory separation

### **Data Protection**

- GDPR/CH-DSG compliance per municipality
- Independent data export/deletion capabilities
- Isolated backup procedures
- Separate log file management

## Performance Implications

### **Expected Impact**

- **Initial Load**: +200ms for site resolution overhead
- **Database Performance**: Minimal impact with proper indexing
- **Cache Efficiency**: Site-specific cache invalidation
- **Core Web Vitals**: Target >90 score maintained across all sites

### **Monitoring Strategy**

```bash
# Performance monitoring commands
@browser-audit-performance --municipality="all" --track-metrics
@lighthouse-test --all-sites --mobile --desktop
ddev drush --uri=thalwil.zh-demo.ddev.site watchdog:show
```

## Future Considerations

### **Scalability**

- Additional municipalities can be easily added
- Shared infrastructure scales efficiently
- Configuration patterns are reusable
- Development workflows remain consistent

### **Migration Path**

- Each municipality can be extracted to independent installation if needed
- Configuration export enables easy migration
- Database separation simplifies data portability
- Theme variants can become standalone themes

## Success Criteria

1. **Technical Validation**
   - All three municipalities accessible via distinct URLs
   - Complete content isolation verified
   - Performance targets met (<2s load times)
   - Configuration management working independently

2. **User Experience**
   - Municipality-specific branding functional
   - Content management workflows intuitive
   - Administrative access properly segregated
   - Mobile responsiveness across all sites

3. **Development Efficiency**
   - Single codebase maintenance
   - Shared component library functional
   - Automated testing across all sites
   - CI/CD pipeline operational

## Conclusion

The multi-site architecture provides an optimal balance of resource efficiency, development productivity, and municipal autonomy for the GPZH project. This approach enables compelling demonstration of shared infrastructure benefits while maintaining the distinct municipal identities required for the präqualification presentation.

**Next Steps:**
1. Complete DDEV hostname configuration
2. Implement theme variant system
3. Establish automated testing workflows
4. Document municipality-specific customization procedures

---

**Related ADRs:**
- ADR-002: AI Integration Approach
- ADR-003: MCP Workflow Automation  
- ADR-004: Swiss Compliance Implementation

**Implementation Status:** ✅ COMPLETED (GPZH-30)