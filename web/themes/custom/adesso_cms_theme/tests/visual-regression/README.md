# Visual Regression Testing with BackstopJS

This directory contains the configuration and scripts for visual regression testing of the Adesso CMS theme components using BackstopJS.

## Overview

Visual regression testing helps ensure that changes to the theme don't break the visual appearance of components and layouts. This is especially important during architectural refactoring of SDC (Single Directory Components).

## Directory Structure

```
tests/visual-regression/
├── README.md                    # This documentation
├── engine_scripts/             # BackstopJS engine scripts
│   └── puppet/
│       ├── onBefore.js         # Setup script run before each test
│       └── onReady.js          # Preparation script run before screenshot
├── reference/                  # Reference screenshots (baseline)
├── test/                       # Test screenshots (current state)
├── html_report/               # HTML test reports
└── ci_report/                 # CI-friendly JSON reports
```

## Test Scenarios

The BackstopJS configuration covers the following scenarios:

### Full Page Tests
- **Homepage**: Complete homepage layout
- **Landing Page**: Landing page with special header
- **Article Page**: Standard article page layout
- **Events Page**: Events listing page

### Component-Specific Tests
- **Site Header**: Global site header component
- **Page Header**: Standard page header component  
- **Landing Page Header**: Special landing page header
- **Main Navigation**: Navigation menu states
- **Mobile Menu**: Mobile navigation (opened state)
- **Site Footer**: Footer component

### Responsive Tests
All scenarios are tested across three viewports:
- **Mobile**: 375x667 (iPhone SE)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1920x1080 (Standard desktop)

### Interactive Tests
- **Navigation Hover**: Hover states on navigation items
- **Mobile Menu**: Mobile menu in opened state

## Usage

### Prerequisites

1. Ensure DDEV environment is running:
   ```bash
   ddev start
   ```

2. Ensure the site is accessible at `http://adesso-cms.ddev.site`

3. Install dependencies:
   ```bash
   ddev ssh
   cd /var/www/html/web/themes/custom/adesso_cms_theme
   npm install
   ```

### Generating Reference Screenshots

Before making any changes, generate baseline reference screenshots:

```bash
# Using npm scripts (recommended)
npm run visual:reference

# Or directly with BackstopJS
npm run backstop:reference
```

This will:
- Take screenshots of all scenarios across all viewports
- Save them as reference images in `tests/visual-regression/reference/`
- These serve as your "golden master" images for comparison

### Running Visual Tests

After making changes to components or templates:

```bash
# Run visual regression tests
npm run visual:test

# Or directly with BackstopJS
npm run backstop:test
```

This will:
- Take new screenshots of all scenarios
- Compare them with reference images
- Generate a detailed HTML report showing differences
- Open the report in your browser automatically

### Reviewing and Approving Changes

When intentional visual changes are made:

1. **Review the report**: Look at the generated HTML report to see all differences
2. **Verify changes are intentional**: Ensure the differences are expected
3. **Approve changes**: Update reference images with new screenshots

```bash
# Approve all changes (updates reference images)
npm run visual:approve

# Or directly with BackstopJS
npm run backstop:approve
```

### Opening Reports

To view the latest test report:

```bash
npm run visual:report
# Or
npm run backstop:openReport
```

## Development Workflow

### Before Refactoring

1. Ensure your local environment matches production/staging
2. Generate fresh reference screenshots:
   ```bash
   npm run visual:reference
   ```
3. Commit the reference images to version control

### During Development

1. Make your code changes
2. Run visual tests frequently:
   ```bash
   npm run visual:test
   ```
3. Review any unexpected differences immediately

### After Changes

1. Run final visual test:
   ```bash
   npm run visual:test
   ```
2. If changes are intentional, approve them:
   ```bash
   npm run visual:approve
   ```
3. Commit updated reference images

## DDEV Integration

### Running Tests in DDEV

All commands should be run within the DDEV container for consistency:

```bash
# Enter DDEV container
ddev ssh

# Navigate to theme directory
cd /var/www/html/web/themes/custom/adesso_cms_theme

# Run visual tests
npm run visual:test
```

### DDEV Configuration

The BackstopJS configuration is set up to work with DDEV's default URL structure:
- Base URL: `http://adesso-cms.ddev.site`
- Assumes standard Drupal URL patterns

## Troubleshooting

### Common Issues

1. **Site not accessible**: Ensure DDEV is running and site loads at configured URL
2. **Timeout errors**: Increase delays in scenarios or check for loading states
3. **Inconsistent screenshots**: Check for animations, loading states, or dynamic content
4. **Permission errors**: Ensure proper file permissions in test directories

### Test URLs

The configuration assumes these URLs exist:
- `/` - Homepage
- `/landing-page` - Landing page example
- `/node/1` - Example article (adjust ID as needed)
- `/events` - Events page

Update the `backstop.json` file if your URLs differ.

### Debugging

Enable debug mode in `backstop.json`:
```json
{
  "debug": true,
  "debugWindow": true
}
```

This will show the browser window during testing and provide more verbose output.

## Configuration

The main configuration is in `/backstop.json` at the theme root. Key settings:

- **viewports**: Screen sizes to test
- **scenarios**: Test cases and selectors
- **paths**: Directory structure for reports and screenshots
- **engine**: Puppeteer browser automation
- **engineOptions**: Browser launch arguments

## CI/CD Integration

For automated testing in GitLab CI:

```yaml
visual_regression:
  stage: test
  script:
    - cd web/themes/custom/adesso_cms_theme
    - npm install
    - npm run backstop:test
  artifacts:
    when: always
    paths:
      - web/themes/custom/adesso_cms_theme/tests/visual-regression/html_report/
    expire_in: 1 week
  only:
    - merge_requests
```

## Best Practices

1. **Consistent Environment**: Always test in the same environment (DDEV)
2. **Clean Data**: Use consistent test data across all test runs
3. **Regular Updates**: Update reference images when intentional changes are made
4. **Review Changes**: Always review visual differences before approving
5. **Component Isolation**: Test components in isolation when possible
6. **Responsive Testing**: Ensure all breakpoints are covered

## Maintenance

### Updating Test Scenarios

To add new test scenarios:

1. Edit `backstop.json`
2. Add new scenario objects to the `scenarios` array
3. Run `npm run visual:reference` to generate new baseline images

### Cleaning Up

To remove all test data and start fresh:

```bash
# Remove all generated screenshots and reports
rm -rf tests/visual-regression/reference/
rm -rf tests/visual-regression/test/
rm -rf tests/visual-regression/html_report/
rm -rf tests/visual-regression/ci_report/

# Generate fresh reference images
npm run visual:reference
```