# Color System Testing Checklist

## Overview

This comprehensive testing checklist ensures that color system updates maintain accessibility, functionality, and visual consistency across all municipal themes in the ZH-DEMO system. Use this checklist for every color migration to guarantee Swiss compliance and quality standards.

## Pre-Testing Setup

### Environment Preparation
```bash
# Start clean DDEV environment
□ ddev start
□ ddev drush cr
□ ddev theme build

# Verify test URLs
□ Main site: zh-demo.ddev.site
□ Municipality site: [municipality].zh-demo.ddev.site
□ Admin interface: /admin/content
□ Storybook: :6006
```

### Testing Tools Setup
```bash
# Install testing dependencies
□ npm install (if needed)
□ Browser extensions installed:
  - WAVE Web Accessibility Evaluator
  - Axe DevTools
  - ColorZilla
  - Lighthouse

# Prepare test devices
□ Desktop browser (Chrome, Firefox, Safari, Edge)
□ Mobile device (iOS/Android)
□ Tablet device
□ Screen reader software (if available)
```

## Color System Validation

### 1. Color Accuracy Testing

#### Primary Color Implementation
```bash
□ Primary color (#[HEX]) displays correctly in:
  - Navigation active states
  - Primary buttons
  - Logo elements
  - Link colors
  - Focus rings
  - Form elements

□ Color scale consistency (50-950):
  - All shades generate properly
  - Progressive lightness/darkness
  - No duplicate values
  - Proper hex format
```

#### CSS Implementation Check
```bash
□ Tailwind v4 configuration updated
□ Tailwind v3 fallback matches
□ CSS custom properties working
□ Theme variants implemented:
  - Default theme (white background)
  - Light theme (tinted background)
  - Dark theme (dark background)
□ Prose theme variables updated
```

### 2. Visual Consistency Testing

#### Component Visual Validation
```bash
□ Header/Navigation:
  - Logo colors match specification
  - Active/hover states correct
  - Dropdown menus styled consistently
  - Mobile menu functioning

□ Buttons and CTAs:
  - Primary button: correct background/text
  - Secondary button: correct border/text
  - Tertiary button: correct hover states
  - Disabled states: proper opacity/color

□ Links and Typography:
  - Body text links: primary-600
  - Hover states: primary-700
  - Visited links: appropriate color
  - Focus states: visible and consistent

□ Forms:
  - Input borders: neutral colors
  - Focus states: primary color
  - Error states: red variants
  - Success states: green variants
  - Placeholder text: neutral-400
```

#### Layout and Spacing
```bash
□ Cards and panels:
  - Border colors consistent
  - Background tints (light theme)
  - Shadow colors unchanged
  - Content hierarchy maintained

□ Tables:
  - Header backgrounds
  - Border colors
  - Hover states
  - Striped rows (if applicable)

□ Charts and graphs:
  - Primary color in data visualization
  - Legend colors consistent
  - Accessibility color patterns
```

## Accessibility Compliance Testing

### 3. WCAG 2.1 AA Validation

#### Color Contrast Testing
```bash
□ Primary text on white background: ≥4.5:1
□ Primary text on light theme background: ≥4.5:1
□ Primary color on white background: ≥4.5:1
□ Primary color on dark backgrounds: ≥4.5:1
□ Secondary text colors: ≥4.5:1
□ Placeholder text: ≥4.5:1
□ Form labels: ≥4.5:1

# Tools for testing:
# - WebAIM Contrast Checker
# - Chrome DevTools Contrast Ratio
# - Colour Contrast Analyser (TPGi)
```

#### Focus Indicator Testing
```bash
□ All interactive elements have focus indicators
□ Focus indicators meet 3:1 contrast ratio
□ Focus indicators visible on all backgrounds
□ Keyboard navigation functional
□ Tab order logical and complete
□ Focus trap working in modals

# Test with keyboard only:
# Tab, Shift+Tab, Enter, Space, Arrow keys
```

#### Color Independence Testing
```bash
□ No information conveyed by color alone
□ Error states include icons/text
□ Success states include icons/text
□ Required fields marked with * or text
□ Status indicators include text/icons
□ Charts include patterns/labels
```

### 4. Swiss eCH-0059 Compliance

#### Font and Size Requirements
```bash
□ Base font size: ≥16px (current: 20px)
□ Minimum text size: 16px maintained
□ Heading hierarchy preserved
□ Line height adequate (≥1.5)
□ Letter spacing not reduced
```

#### Touch Target Requirements
```bash
□ All buttons: ≥44px × 44px
□ All links: ≥44px touch area
□ Form controls: ≥44px
□ Navigation items: ≥44px
□ Icon buttons: ≥44px
□ Close buttons: ≥44px

# Test with mobile device
# Use browser dev tools mobile simulation
```

#### Language and Cultural Requirements
```bash
□ German text uses Swiss conventions (ss not ß)
□ Formal addressing (Sie-Form) maintained
□ Municipal terminology correct
□ Cultural sensitivity observed
□ Multi-language support functional (if applicable)
```

### 5. Color Blindness Testing

#### Simulation Testing
```bash
# Test with color blindness simulators:
□ Deuteranopia (red-green, most common)
□ Protanopia (red-green)
□ Tritanopia (blue-yellow)
□ Achromatopsia (complete)

# Browser tools:
# - Chrome DevTools Vision Deficiencies
# - Stark browser extension
# - Colorblinding.com simulator
```

#### Alternative Indicators
```bash
□ Form validation uses icons + color
□ Status messages include text + color
□ Navigation uses position + color
□ Charts use patterns + color
□ Important information has multiple cues
```

## Functional Testing

### 6. Interactive Element Testing

#### Form Functionality
```bash
□ All forms submit successfully
□ Validation messages display correctly
□ Required field indicators visible
□ Error states functional
□ Success confirmations working
□ File upload interfaces operational
□ Multi-step forms navigate properly
```

#### Navigation Testing
```bash
□ Main navigation functional
□ Breadcrumb navigation working
□ Footer links operational
□ Search functionality intact
□ Pagination controls working
□ Mobile menu operational
□ Dropdown menus functional
```

#### Interactive Components
```bash
□ Accordions expand/collapse
□ Tabs switch content
□ Modals open/close
□ Tooltips display correctly
□ Carousels/sliders functional
□ Image galleries operational
□ Video players working
```

### 7. Content Management Testing

#### Admin Interface
```bash
□ Drupal admin theme unaffected
□ Content editing forms functional
□ WYSIWYG editor working
□ Media library operational
□ Menu management functional
□ Block placement working
□ Configuration pages accessible
```

#### Content Creation
```bash
□ New content saves correctly
□ Media uploads functional
□ Image alt-text working
□ Link insertion operational
□ Text formatting preserved
□ Content preview accurate
□ Publishing workflow functional
```

## Cross-Browser Testing

### 8. Browser Compatibility Matrix

#### Desktop Browsers
```bash
□ Chrome (current version):
  - Color display accurate
  - Interactions functional
  - Performance acceptable
  - CSS custom properties working

□ Firefox (current version):
  - Color display accurate
  - Interactions functional
  - Performance acceptable
  - CSS custom properties working

□ Safari (current version):
  - Color display accurate
  - Interactions functional
  - Performance acceptable
  - CSS custom properties working

□ Edge (current version):
  - Color display accurate
  - Interactions functional
  - Performance acceptable
  - CSS custom properties working
```

#### Mobile Browsers
```bash
□ Chrome Mobile (iOS/Android):
  - Touch interactions working
  - Responsive design intact
  - Performance acceptable
  - Colors display correctly

□ Safari Mobile (iOS):
  - Touch interactions working
  - Responsive design intact
  - Performance acceptable
  - Colors display correctly

□ Firefox Mobile:
  - Basic functionality tested
  - Major issues documented
```

#### Legacy Browser Testing
```bash
□ Internet Explorer 11 (if required):
  - Basic functionality preserved
  - Graceful degradation working
  - Fallback colors displaying
  - Critical features functional
```

## Performance Testing

### 9. Core Web Vitals Validation

#### Performance Metrics
```bash
□ Largest Contentful Paint (LCP): <2.5s
□ First Input Delay (FID): <100ms
□ Cumulative Layout Shift (CLS): <0.1
□ First Contentful Paint (FCP): <1.8s
□ Time to Interactive (TTI): <3.8s

# Test with:
# - Chrome DevTools Lighthouse
# - WebPageTest.org
# - Real user monitoring (if available)
```

#### CSS Performance
```bash
□ CSS bundle size unchanged or decreased
□ Critical CSS loading properly
□ Unused CSS purged appropriately
□ Font loading optimized
□ Color calculations not impacting render time
```

### 10. Visual Regression Testing

#### Automated Visual Testing
```bash
□ BackstopJS reference screenshots updated
□ BackstopJS test run passes
□ All components visually consistent
□ No unintended layout shifts
□ Responsive breakpoints maintained

# Run commands:
# ddev backstop reference
# ddev backstop test
```

#### Manual Visual Comparison
```bash
□ Before/after screenshots compared
□ Component library (Storybook) updated
□ Print styles validated
□ Email templates tested (if applicable)
□ PDF generation verified
```

## Special Case Testing

### 11. Municipal-Specific Testing

#### Content Type Validation
```bash
□ News articles display correctly
□ Event listings functional
□ Contact forms working
□ Directory listings operational
□ Document downloads functional
□ Image galleries working
```

#### Workflow Testing
```bash
□ Content approval workflows functional
□ User role permissions maintained
□ Guest editor access working
□ Form submission workflows operational
□ Email notifications sending
```

### 12. Integration Testing

#### External Services
```bash
□ Google Maps integration working
□ Social media widgets functional
□ Email service integration operational
□ Payment gateway (if applicable) working
□ Analytics tracking functional
□ Search engine integration working
```

#### API Endpoints
```bash
□ REST API responses unchanged
□ JSON API functionality maintained
□ External integrations working
□ Webhooks operational
□ Third-party connectors functional
```

## Documentation and Sign-off

### 13. Testing Documentation

#### Test Results Documentation
```bash
□ All test results recorded
□ Issues identified and categorized
□ Screenshots captured for issues
□ Performance metrics documented
□ Accessibility audit results saved
□ Cross-browser test matrix completed
```

#### Issue Tracking
```bash
□ Critical issues: Must fix before deployment
□ Major issues: Fix within sprint
□ Minor issues: Schedule for next iteration
□ Enhancement requests: Add to backlog
□ Documentation updates needed
```

### 14. Stakeholder Approval

#### Technical Sign-off
```bash
□ Development team approval
□ QA team validation complete
□ Performance requirements met
□ Accessibility compliance verified
□ Security considerations reviewed
```

#### Business Sign-off
```bash
□ Municipal stakeholder approval
□ Design consistency verified
□ Brand guidelines compliance confirmed
□ User experience validation complete
□ Content team approval received
```

## Post-Deployment Monitoring

### 15. Production Validation

#### Immediate Checks (First 24 hours)
```bash
□ Site loading without errors
□ Colors displaying correctly
□ Critical user journeys functional
□ Form submissions working
□ Search functionality operational
□ Mobile experience maintained
```

#### Extended Monitoring (First Week)
```bash
□ Core Web Vitals remain stable
□ Error rates within normal range
□ User feedback collected and reviewed
□ Accessibility complaints monitored
□ Browser compatibility issues tracked
□ Performance metrics stable
```

## Rollback Procedures

### 16. Emergency Procedures

#### Rollback Checklist
```bash
□ Database backup available
□ Code repository tagged
□ Previous CSS assets available
□ Deployment rollback procedure tested
□ Communication plan prepared
□ Team notifications ready
```

#### Quick Fix Procedures
```bash
□ Hot-fix process documented
□ CSS override capabilities tested
□ Cache clearing procedures verified
□ Content editing workarounds prepared
□ Stakeholder notification process ready
```

---

## Testing Summary Report Template

### Project Information
- **Municipality**: [Name]
- **Primary Color**: [Hex Value]
- **Testing Date**: [Date]
- **Tester**: [Name/Team]
- **Environment**: [Staging/Production]

### Test Results Summary
- **Total Tests**: [Number]
- **Passed**: [Number]
- **Failed**: [Number]
- **Skipped**: [Number]
- **Critical Issues**: [Number]

### Accessibility Compliance
- **WCAG 2.1 AA**: [Pass/Fail]
- **eCH-0059**: [Pass/Fail]
- **Color Contrast**: [Lowest Ratio Found]
- **Color Blindness**: [Pass/Fail]

### Performance Results
- **LCP**: [Time]
- **FID**: [Time]
- **CLS**: [Score]
- **Overall Score**: [Number/100]

### Browser Compatibility
- **Chrome**: [Pass/Issues]
- **Firefox**: [Pass/Issues]
- **Safari**: [Pass/Issues]
- **Edge**: [Pass/Issues]
- **Mobile**: [Pass/Issues]

### Recommendation
- [ ] **Deploy to Production** - All tests passed
- [ ] **Fix Critical Issues First** - Major problems identified
- [ ] **Needs Significant Rework** - Multiple failures

**Sign-off**: ___________________ **Date**: ___________

---

**Checklist Version**: 1.0  
**Last Updated**: 2025-01-19  
**Compatible With**: Drupal 11.2.2, Tailwind CSS v4  
**Maintained By**: Technical Project Management Team