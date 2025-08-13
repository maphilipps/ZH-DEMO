# Testing Strategy & Quality Assurance Guide

This folder contains comprehensive testing infrastructure for the adesso CMS Drupal 11 project, implementing enterprise-grade quality assurance following Lullabot best practices.

## Linear-First Testing Workflow

### **Automatic Linear Task Creation**
All testing activities automatically create Linear tasks:
```yaml
Epic: "Quality Assurance - [Feature/Component Name]"
Tasks:
  - ADC-QA-001: Test strategy planning and requirements
  - ADC-QA-002: Test implementation and automation
  - ADC-QA-003: Quality gate validation and reporting
  - ADC-QA-004: Performance and accessibility compliance
```

## Testing Architecture

### **Multi-Layer Testing Strategy**
```yaml
Testing Pyramid:
  Unit Tests (Vitest):
    - Component logic testing
    - JavaScript function validation
    - Drupal service testing
    
  Integration Tests (Drupal):
    - Module integration testing
    - Configuration validation
    - API endpoint testing
    
  Visual Regression (BackstopJS):
    - Component appearance validation
    - Responsive design testing
    - Cross-browser visual consistency
    
  E2E Tests (Playwright):
    - User workflow validation
    - Complete feature testing
    - Cross-browser compatibility
    
  Performance Tests (Lighthouse):
    - Core Web Vitals monitoring
    - Load time optimization
    - Resource utilization analysis
    
  Accessibility Tests (WCAG 2.1 AA):
    - Automated accessibility scanning
    - Screen reader compatibility
    - Keyboard navigation testing
```

## Test Suite Configuration

### **Vitest Unit Testing**
```javascript
// vitest.config.js
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      }
    }
  }
});
```

### **Playwright E2E Configuration**
```javascript
// playwright.config.js
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'https://adesso-cms.ddev.site',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 12'] } }
  ]
});
```

### **BackstopJS Visual Regression**
```json
{
  "id": "adesso_cms_visual_regression",
  "viewports": [
    { "label": "phone", "width": 375, "height": 667 },
    { "label": "tablet", "width": 768, "height": 1024 },
    { "label": "desktop", "width": 1200, "height": 800 }
  ],
  "scenarios": [
    {
      "label": "homepage",
      "url": "https://adesso-cms.ddev.site",
      "delay": 2000,
      "removeSelectors": [".dynamic-content"]
    }
  ],
  "paths": {
    "bitmaps_reference": "tests/visual/reference",
    "bitmaps_test": "tests/visual/test",
    "html_report": "tests/visual/reports"
  }
}
```

## Quality Gates Implementation

### **Pre-Development Quality Gates**
```yaml
Before Development:
  1. Test Strategy Validation:
     - Testing requirements defined in Linear task
     - Acceptance criteria include testable outcomes
     - Performance benchmarks established
     - Accessibility requirements specified
     
  2. Test Environment Preparation:
     - DDEV environment ready and validated
     - Test data prepared and documented
     - Browser testing matrix defined
     - Performance baseline established
```

### **Development Quality Gates**
```yaml
During Development:
  1. Unit Test Requirements:
     - Minimum 90% code coverage
     - All critical functions tested
     - Edge cases validated
     - Error handling tested
     
  2. Component Testing:
     - Storybook stories created
     - Visual regression tests updated
     - Accessibility attributes tested
     - Responsive behavior validated
     
  3. Integration Testing:
     - Module integration verified
     - API endpoints tested
     - Configuration imports validated
     - Cross-browser compatibility checked
```

### **Pre-Merge Quality Gates**
```yaml
Before Code Merge:
  1. Automated Test Validation:
     - All unit tests passing (>90% coverage)
     - Visual regression tests approved
     - E2E test scenarios successful
     - Performance benchmarks met
     
  2. Accessibility Compliance:
     - WCAG 2.1 AA automated tests passing
     - Color contrast validation successful
     - Screen reader compatibility verified
     - Keyboard navigation functional
     
  3. Performance Standards:
     - Core Web Vitals scores >90
     - Lighthouse performance audit passed
     - Resource optimization validated
     - Load time requirements met
```

## Testing Commands

### **Development Testing**
```bash
# Unit testing with Vitest
ddev npm run test                     # Run all unit tests
ddev npm run test:watch               # Watch mode for development
ddev npm run test:coverage            # Generate coverage report
ddev npm run test:ui                  # Interactive testing UI

# Visual regression testing
ddev npm run test:visual:reference    # Create reference images
ddev npm run test:visual:test         # Run visual comparison
ddev npm run test:visual:approve      # Approve visual changes

# E2E testing with Playwright
ddev npm run test:e2e                 # Run all E2E tests
ddev npm run test:e2e:headed          # Run with browser visible
ddev npm run test:e2e:debug           # Debug mode with breakpoints
ddev npm run test:e2e:report          # Generate test report
```

### **Quality Assurance Pipeline**
```bash
# Comprehensive QA pipeline
ddev npm run qa:full                  # Complete QA suite
ddev npm run qa:performance           # Performance testing only
ddev npm run qa:accessibility         # Accessibility testing only
ddev npm run qa:security              # Security scanning

# CI/CD integration
ddev npm run ci:test                  # CI-optimized test suite
ddev npm run ci:report                # Generate CI reports
ddev npm run ci:artifacts             # Collect test artifacts
```

### **Accessibility Testing**
```bash
# WCAG 2.1 AA compliance testing
ddev npm run test:a11y:scan           # Automated accessibility scan
ddev npm run test:a11y:contrast       # Color contrast validation
ddev npm run test:a11y:keyboard       # Keyboard navigation test
ddev npm run test:a11y:screen-reader  # Screen reader compatibility
```

## Test Data Management

### **Test Content Strategy**
```yaml
Test Data Types:
  1. Minimal Test Data:
     - Basic content types and fields
     - Essential configuration
     - Minimal user roles and permissions
     
  2. Realistic Test Data:
     - Representative content volume
     - Real-world user scenarios
     - Complex content relationships
     
  3. Performance Test Data:
     - Large content volumes
     - Complex media libraries
     - Stress testing scenarios
```

### **Test Database Management**
```bash
# Database testing operations
ddev drush sql-drop -y                # Reset database for testing
ddev drush site:install --existing-config  # Install with config
ddev drush test:data:generate         # Generate test content
ddev drush test:data:minimal          # Minimal test data only
```

## Agent Integration

### **Primary Testing Agents**
- `qa-testing-specialist` - Comprehensive testing coordination
- `performance-optimizer` - Performance testing and optimization
- `drupal-11-lead-developer` - Integration testing support
- `sdc-component-specialist` - Component testing validation

### **MCP Integration for Testing**
```yaml
Browser Tools MCP:
  - mcp__browser-tools__runAccessibilityAudit: WCAG compliance
  - mcp__browser-tools__runPerformanceAudit: Core Web Vitals
  - mcp__browser-tools__runSEOAudit: SEO validation
  
Playwright MCP:
  - mcp__playwright__browser_snapshot: Visual testing
  - mcp__playwright__browser_click: User interaction testing
  - mcp__playwright__browser_take_screenshot: Documentation
  
A11y MCP:
  - mcp__a11y-accessibility__test_accessibility: Comprehensive WCAG testing
  - mcp__a11y-accessibility__check_color_contrast: Color compliance
  - mcp__a11y-accessibility__check_aria_attributes: ARIA validation
```

## Testing Scenarios

### **Component Testing Scenarios**
```javascript
// Example: SDC component testing
describe('Hero Component', () => {
  test('renders with required props', () => {
    const props = {
      title: 'Test Title',
      content: 'Test Content',
      image: '/test-image.jpg'
    };
    
    render(HeroComponent, { props });
    expect(screen.getByRole('heading')).toHaveTextContent('Test Title');
  });
  
  test('meets accessibility requirements', async () => {
    const { container } = render(HeroComponent, { props });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### **E2E Testing Scenarios**
```javascript
// Example: Content creation workflow
test('Content editor creates news article with AI suggestions', async ({ page }) => {
  // Login as content editor
  await page.goto('/user/login');
  await page.fill('[name="name"]', 'editor');
  await page.fill('[name="pass"]', 'password');
  await page.click('[type="submit"]');
  
  // Navigate to content creation
  await page.goto('/node/add/news');
  
  // Fill out form with AI assistance
  await page.fill('[name="title[0][value]"]', 'AI-Enhanced Article');
  await page.click('[data-ai-suggest="content"]');
  
  // Verify AI suggestions appear
  await expect(page.locator('.ai-suggestions')).toBeVisible();
  
  // Complete and publish
  await page.click('[name="op"]');
  await expect(page.locator('.messages--status')).toContainText('has been created');
});
```

### **Performance Testing Scenarios**
```javascript
// Example: Core Web Vitals validation
test('Homepage meets Core Web Vitals requirements', async ({ page }) => {
  await page.goto('/');
  
  const metrics = await page.evaluate(() => {
    return new Promise(resolve => {
      new PerformanceObserver(list => {
        const entries = list.getEntries();
        const vitals = {};
        
        entries.forEach(entry => {
          if (entry.name === 'LCP') vitals.lcp = entry.value;
          if (entry.name === 'FID') vitals.fid = entry.value;
          if (entry.name === 'CLS') vitals.cls = entry.value;
        });
        
        resolve(vitals);
      }).observe({ entryTypes: ['web-vitals'] });
    });
  });
  
  expect(metrics.lcp).toBeLessThan(2500); // Good LCP
  expect(metrics.fid).toBeLessThan(100);  // Good FID
  expect(metrics.cls).toBeLessThan(0.1);  // Good CLS
});
```

## AI Integration Testing

### **AI Functionality Testing**
```javascript
// AI content generation testing
test('AI content suggestions work correctly', async ({ page }) => {
  await page.goto('/node/add/page');
  
  // Trigger AI content suggestion
  await page.click('[data-ai-trigger="content-suggest"]');
  
  // Wait for AI response
  await page.waitForSelector('[data-ai-response]');
  
  // Verify suggestion quality
  const suggestion = await page.textContent('[data-ai-response]');
  expect(suggestion.length).toBeGreaterThan(100);
  expect(suggestion).not.toContain('error');
});

// AI alt-text generation testing
test('AI generates alt text for uploaded images', async ({ page }) => {
  await page.goto('/node/add/news');
  
  // Upload test image
  await page.setInputFiles('[type="file"]', 'tests/fixtures/test-image.jpg');
  
  // Wait for AI processing
  await page.waitForSelector('[data-ai-alt-text]');
  
  // Verify alt text was generated
  const altText = await page.inputValue('[name="field_image[0][alt]"]');
  expect(altText.length).toBeGreaterThan(10);
  expect(altText).toMatch(/^[A-Z]/); // Starts with capital letter
});
```

## German Market Testing

### **Localization Testing**
```yaml
German Market Requirements:
  1. Language Testing:
     - German content rendering correctly
     - Date/time format validation (DD.MM.YYYY)
     - Currency format testing (EUR)
     - Number format validation (comma decimal)
     
  2. Brand Compliance:
     - "adesso" always lowercase validation
     - Brand color compliance
     - Typography standards
     
  3. GDPR Compliance:
     - Cookie consent functionality
     - Privacy policy accessibility
     - Data export/deletion workflows
     - Contact form data handling
```

### **Multi-Language Testing**
```javascript
// Example: Multi-language content testing
test('Content displays correctly in German and English', async ({ page }) => {
  // Test German version
  await page.goto('/de/unternehmen');
  await expect(page.locator('h1')).toContainText('Über adesso');
  
  // Test English version  
  await page.goto('/en/company');
  await expect(page.locator('h1')).toContainText('About adesso');
  
  // Verify language switcher
  const langSwitcher = page.locator('[data-drupal-selector="language-interface"]');
  await expect(langSwitcher).toBeVisible();
});
```

## Continuous Integration

### **CI/CD Pipeline Integration**
```yaml
GitHub Actions Integration:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup DDEV
        uses: ddev/github-action-setup-ddev@v1
      - name: Start DDEV
        run: ddev start
      - name: Run test suite
        run: ddev npm run ci:test
      - name: Generate reports
        run: ddev npm run ci:report
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: tests/reports/
```

## Linear Workflow Integration

### **Testing Task Examples**
```markdown
User: "Ensure new component meets accessibility standards"

Linear Tasks Created:
- ADC-A11Y-001: Accessibility requirements analysis
- ADC-A11Y-002: Automated WCAG 2.1 AA testing implementation
- ADC-A11Y-003: Screen reader compatibility validation
- ADC-A11Y-004: Keyboard navigation testing
- ADC-A11Y-005: Color contrast compliance verification
```

### **Performance Testing Request**
```markdown
User: "Validate Core Web Vitals performance"

Linear Tasks Created:
- ADC-PERF-001: Performance baseline measurement
- ADC-PERF-002: Core Web Vitals automated testing
- ADC-PERF-003: Performance regression detection
- ADC-PERF-004: Optimization recommendations
- ADC-PERF-005: Performance monitoring setup
```

This comprehensive testing strategy ensures that all development work meets enterprise quality standards, maintains WCAG 2.1 AA accessibility compliance, achieves excellent Core Web Vitals performance, and validates German market requirements while integrating seamlessly with Linear workflow management.