# Municipality Color Migration Guide

## Overview

This guide provides a standardized process for implementing custom color schemes for different municipalities within the ZH-DEMO multi-site Drupal system. Based on the successful Bruchtal theme migration from blue to red, this process ensures consistency, accessibility, and maintainability across all municipal sites.

## Prerequisites

### Technical Requirements
- Drupal 11.2.2 multi-site setup
- Tailwind CSS v4 with fallback to v3
- DDEV local development environment
- Access to municipal brand guidelines
- WCAG 2.1 AA accessibility compliance tools

### Design Requirements
- Municipal logo in SVG format
- Primary brand color specification
- Contrast validation documentation
- Swiss eCH-0059 compliance verification

## Migration Process

### Phase 1: Planning and Preparation

#### 1.1 Brand Analysis
```bash
# Document current brand requirements
- Municipal logo colors (hex values)
- Brand guidelines (if available)
- Accessibility requirements
- Special considerations (cultural, historical)
```

#### 1.2 Color Palette Generation
Using the primary brand color, generate a complete scale:

**Tools:**
- [Tailwind Color Palette Generator](https://tailwindcss.com/docs/customizing-colors)
- [Accessible Color Palette Builder](https://accessiblecolor.com)
- [Contrast Ratio Checker](https://webaim.org/resources/contrastchecker/)

**Process:**
1. Identify primary color (typically 600 level)
2. Generate 50-950 scale using HSL adjustments
3. Validate accessibility ratios
4. Test with color blindness simulators

#### 1.3 Accessibility Validation
```bash
# Required contrast ratios
- Normal text on background: ≥4.5:1
- Large text on background: ≥3:1
- UI components: ≥3:1
- Focus indicators: ≥3:1

# Swiss eCH-0059 additional requirements
- Touch targets: ≥44px
- Font size: ≥16px
- Color independence: No info by color alone
```

### Phase 2: Implementation

#### 2.1 Directory Structure
```
web/themes/custom/[municipality_theme]/
├── src/css/
│   ├── adesso.css              # Tailwind v4 config
│   ├── prose-themes.css        # Theme variants
│   └── theme-variables.css     # Additional variables
├── static/images/
│   └── [municipality]-logo.svg # Municipal logo
├── tailwind.config.cjs         # Tailwind v3 fallback
└── components/                 # SDC components
```

#### 2.2 Tailwind CSS v4 Configuration
**File**: `src/css/adesso.css`

```css
@theme {
  /* Update primary color scale */
  --color-primary: #[PRIMARY_HEX];
  --color-primary-50: #[LIGHTEST];
  --color-primary-100: #[VERY_LIGHT];
  --color-primary-200: #[LIGHT];
  --color-primary-300: #[LIGHT_MEDIUM];
  --color-primary-400: #[MEDIUM_LIGHT];
  --color-primary-500: #[MEDIUM];
  --color-primary-600: var(--color-primary);
  --color-primary-700: #[DARK];
  --color-primary-800: #[DARKER];
  --color-primary-900: #[DARKEST];
  --color-primary-950: #[ULTRA_DARK];
  
  /* Keep existing secondary and neutral colors */
  --color-secondary: oklch(76.75% 0.16089370062474417 102.29484006182389);
  --color-neutral: var(--color-slate-800);
  /* ... existing neutral scale ... */
}
```

#### 2.3 Legacy Tailwind v3 Configuration
**File**: `tailwind.config.cjs`

```javascript
module.exports = {
  // ... existing config
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#[LIGHTEST]',
          100: '#[VERY_LIGHT]',
          200: '#[LIGHT]',
          300: '#[LIGHT_MEDIUM]',
          400: '#[MEDIUM_LIGHT]',
          500: '#[MEDIUM]',
          600: '#[PRIMARY_HEX]',
          700: '#[DARK]',
          800: '#[DARKER]',
          900: '#[DARKEST]',
          950: '#[ULTRA_DARK]',
        },
      },
    },
  },
  // ... existing plugins
};
```

#### 2.4 Theme Variant Updates
**File**: `src/css/prose-themes.css`

```css
/* Default Theme - White background */
[data-theme="default"] {
  --color-primary: #[PRIMARY_HEX];
  --color-primary-600: #[PRIMARY_HEX];
  --color-primary-700: #[DARK];
  /* ... complete scale ... */
}

/* Light Theme - Tinted background */
[data-theme="light"] {
  --color-primary: #[DARK]; /* Better contrast on light bg */
  --color-neutral-50: rgba([PRIMARY_RGB], 0.05);
  --color-neutral-100: rgba([PRIMARY_RGB], 0.1);
  /* ... adjusted tints ... */
}

/* Dark Theme - Dark background */
[data-theme="dark"] {
  --color-primary: #[MEDIUM_LIGHT]; /* Lighter for dark bg */
  /* ... inverted scale ... */
}
```

#### 2.5 Logo Integration
**File**: `static/images/[municipality]-logo.svg`

```svg
<!-- Ensure SVG uses the primary color -->
<svg>
  <path fill="#[PRIMARY_HEX]" />
  <!-- Municipal text and symbols -->
</svg>
```

### Phase 3: Testing and Validation

#### 3.1 Automated Testing
```bash
# DDEV environment setup
ddev start
ddev drush cr

# Theme build and validation
ddev theme build
ddev theme storybook

# Accessibility testing
ddev exec npm run test:accessibility
ddev backstop reference
ddev backstop test
```

#### 3.2 Manual Testing Checklist
```bash
# Visual Testing
□ Logo displays correctly at all sizes
□ Primary color appears consistently
□ Theme variants function properly
□ Interactive states work (hover, focus, active)

# Accessibility Testing
□ Color contrast meets WCAG 2.1 AA
□ Focus indicators are visible
□ Color blind simulation passes
□ Screen reader navigation works
□ Touch targets are adequate (≥44px)

# Functional Testing
□ Forms submit correctly
□ Navigation remains functional
□ Search filters work
□ Admin interface displays properly
□ Print styles are readable
```

#### 3.3 Cross-browser Validation
```bash
# Test matrix
□ Chrome 88+ (Desktop/Mobile)
□ Firefox 85+ (Desktop/Mobile)
□ Safari 14+ (Desktop/Mobile)
□ Edge 88+ (Desktop)
□ Internet Explorer 11 (graceful degradation)
```

### Phase 4: Deployment

#### 4.1 Pre-deployment Checklist
```bash
# Code review
□ All files updated consistently
□ No hardcoded old colors remain
□ CSS builds without errors
□ Storybook generates correctly

# Performance validation
□ CSS bundle size unchanged
□ Core Web Vitals maintained
□ Load times acceptable
□ Critical path rendering optimized
```

#### 4.2 Deployment Commands
```bash
# Production build
ddev theme build

# Clear all caches
ddev drush cr

# Test production build
ddev exec npm run test:production

# Deploy to staging
# (Site-specific deployment commands)
```

#### 4.3 Post-deployment Validation
```bash
# Immediate checks
□ Site loads without errors
□ Colors display correctly
□ Interactive elements function
□ Mobile responsiveness maintained

# 24-hour monitoring
□ Core Web Vitals remain stable
□ No accessibility regressions
□ User feedback collection
□ Error log monitoring
```

## Municipality-Specific Examples

### Example 1: Forest Green Theme (Thalheim)
```css
/* Hypothetical forest municipality */
--color-primary: #059669; /* Emerald-600 */
--color-primary-50: #ecfdf5;
--color-primary-100: #d1fae5;
/* ... complete green scale ... */
```

### Example 2: Lake Blue Theme (Erlenbach)
```css
/* Hypothetical lakeside municipality */
--color-primary: #0284c7; /* Sky-600 */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
/* ... complete blue scale ... */
```

### Example 3: Mountain Purple Theme (Thalwil)
```css
/* Hypothetical mountain municipality */
--color-primary: #7c3aed; /* Violet-600 */
--color-primary-50: #f5f3ff;
--color-primary-100: #ede9fe;
/* ... complete purple scale ... */
```

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue: Colors not updating after changes
```bash
# Solution
ddev drush cr
ddev theme build
# Clear browser cache
```

#### Issue: Accessibility contrast failures
```bash
# Solution
# Adjust primary-600 to darker shade
# Test with WebAIM contrast checker
# Update prose-themes.css accordingly
```

#### Issue: Storybook not reflecting changes
```bash
# Solution
ddev theme storybook --reload
# Check component props and variants
```

#### Issue: Legacy browser compatibility
```bash
# Solution
# Verify Tailwind v3 config matches v4
# Test CSS custom property fallbacks
# Check progressive enhancement
```

### Performance Optimization

#### CSS Bundle Size Management
```bash
# Monitor CSS output size
ddev exec ls -la dist/css/

# Purge unused colors
# Review Tailwind purge configuration
# Consider critical CSS extraction
```

#### Build Time Optimization
```bash
# Parallel processing
ddev theme build --parallel

# Cache configuration
# Optimize asset pipeline
# Consider incremental builds
```

## Quality Assurance Standards

### Color System Requirements
1. **Complete Scale**: Always implement 50-950 color scale
2. **Accessibility**: Minimum WCAG 2.1 AA compliance
3. **Swiss Standards**: eCH-0059 compliance mandatory
4. **Consistency**: All theme variants updated together
5. **Documentation**: Complete style guide per municipality

### Testing Requirements
1. **Automated**: Accessibility, performance, visual regression
2. **Manual**: Cross-browser, mobile, print styles
3. **User**: Municipality staff validation
4. **Stakeholder**: Municipal authority approval

### Documentation Standards
1. **Technical**: Implementation details and rationale
2. **Design**: Style guide with usage examples
3. **Process**: Migration steps and lessons learned
4. **Maintenance**: Update procedures and schedules

## Maintenance and Updates

### Regular Maintenance Schedule
- **Monthly**: Accessibility compliance check
- **Quarterly**: Browser compatibility validation
- **Annually**: Complete color system review
- **As needed**: Municipal brand guideline updates

### Version Control Best Practices
```bash
# Branch naming convention
feature/[municipality]-color-update

# Commit message format
feat(theme): Update [municipality] colors to [color-name]

# Tag releases
git tag -a v[municipality]-[version] -m "Color system update"
```

### Documentation Updates
- Update style guides after each migration
- Maintain change log for all color modifications
- Archive previous versions for reference
- Document lessons learned and improvements

---

**Guide Version**: 1.0  
**Last Updated**: 2025-01-19  
**Next Review**: 2025-07-19  
**Maintained By**: Technical Project Management Team