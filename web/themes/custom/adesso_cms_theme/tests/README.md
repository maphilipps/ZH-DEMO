# GPZH Demo System - Comprehensive Test Infrastructure

This directory contains the complete testing infrastructure for the Adesso CMS theme, specifically designed for the GPZH (Gemeindeportale Zürich) prequalification demonstration system.

## 🎯 Testing Strategy Overview

Our testing strategy ensures Swiss compliance, accessibility standards, and optimal performance for municipal portals:

- **Unit Testing**: Component-level testing with Vitest and Storybook integration
- **E2E Testing**: End-to-end browser testing with Playwright
- **Visual Regression**: BackstopJS for UI consistency
- **Accessibility**: eCH-0059 and WCAG 2.1 AA compliance testing
- **Performance**: Core Web Vitals >90 target validation
- **Swiss Compliance**: Municipal form workflows and data protection standards

## 🛠️ Test Infrastructure Components

### Core Testing Technologies
- **Vitest**: Fast unit testing framework with browser testing capabilities
- **Playwright**: Browser automation for E2E testing with Swiss compliance focus
- **BackstopJS**: Visual regression testing for theme consistency
- **Storybook**: Component documentation and isolation testing
- **@storybook/experimental-addon-test**: Bridge between Storybook and Vitest

## Quick Start

### Run All Tests
```bash
# Single command to test ALL components
ddev theme test:all

# Or individually:
ddev theme test:stories         # Run component tests
ddev theme test:stories:watch   # Watch mode
ddev theme test:stories:ui      # UI mode
ddev theme test:stories:coverage # With coverage
```

### Test Structure
```
tests/
├── utils/
│   └── test-utils.js          # Common testing utilities
└── README.md                  # This file

components/
├── button/
│   ├── button.stories.js      # Storybook stories
│   ├── button.test.js         # Component tests
│   └── button.twig            # Component template
├── accordion/
│   ├── accordion.stories.js
│   ├── accordion.test.js
│   └── accordion.twig
└── ... (22 total components)
```

## Testing Approach

### 1. Story-Based Testing
Tests use `@storybook/test` to compose stories and test them:

```javascript
import { composeStories } from '@storybook/test';
import * as stories from './component.stories.js';

const { Default, Variant1, Variant2 } = composeStories(stories);

describe('Component', () => {
  it('should render default variant', () => {
    const html = Default.render(Default.args);
    expect(html).toContain('expected content');
  });
});
```

### 2. Test Categories

#### Rendering Tests
- Component renders without errors
- Correct content is displayed
- Props are properly applied
- All variants render correctly

#### Accessibility Tests
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Focus management
- Proper ARIA attributes

#### Interaction Tests
- Click events
- Keyboard events
- Form submissions
- State changes

#### Responsive Tests
- Mobile, tablet, desktop viewports
- Responsive classes
- Layout behavior

#### Integration Tests
- Component composition
- Third-party library integration (Flowbite)
- Cross-browser compatibility

### 3. Test Utilities

The `tests/utils/test-utils.js` file provides common utilities:

```javascript
import { 
  waitForElement,
  waitForFlowbite,
  clickElement,
  keyboardEvent,
  testBasicAccessibility,
  testResponsiveBehavior,
  testComponentVariants,
  commonTests
} from '../../tests/utils/test-utils.js';

// Use common test patterns
commonTests.renderWithoutErrors(Component.render, Component.args);
commonTests.hasRequiredClasses(container, ['required', 'classes']);
commonTests.isKeyboardNavigable(container);

// Test accessibility
testBasicAccessibility(container);

// Test responsive behavior
testResponsiveBehavior(container);

// Test component variants
testComponentVariants(renderFunction, variants);
```

## Writing Component Tests

### 1. Basic Test Structure

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { composeStories } from '@storybook/test';
import * as stories from './component.stories.js';
import { commonTests, testBasicAccessibility } from '../../tests/utils/test-utils.js';

const { Default, Variant1 } = composeStories(stories);

describe('Component Name', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Rendering', () => {
    commonTests.renderWithoutErrors(Default.render, Default.args);
    
    it('should render with correct content', () => {
      const html = Default.render(Default.args);
      container.innerHTML = html;
      
      // Your specific assertions
      expect(container.querySelector('.component')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      const html = Default.render(Default.args);
      container.innerHTML = html;
    });

    testBasicAccessibility(container);
  });
});
```

### 2. Testing Interactive Components

```javascript
describe('Interactions', () => {
  it('should handle click events', () => {
    const html = Default.render(Default.args);
    container.innerHTML = html;
    
    const button = container.querySelector('button');
    let clicked = false;
    
    button.addEventListener('click', () => {
      clicked = true;
    });
    
    clickElement(button);
    expect(clicked).toBe(true);
  });
});
```

### 3. Testing Async Components

```javascript
describe('Async Behavior', () => {
  it('should handle async initialization', async () => {
    const html = Default.render(Default.args);
    container.innerHTML = html;
    
    // Wait for Flowbite or other async libraries
    await waitForFlowbite();
    
    const element = await waitForElement('.dynamic-content');
    expect(element).toBeInTheDocument();
  });
});
```

## Configuration

### Vitest Configuration
The `vitest.config.js` is configured for:
- Browser testing with Playwright
- Storybook integration
- Coverage reporting
- Test file patterns
- Proper timeouts for async operations

### Storybook Integration
The `.storybook/main.cjs` includes:
- `@storybook/experimental-addon-test` addon
- `@storybook/addon-a11y` for accessibility testing
- `@storybook/addon-interactions` for interaction testing

## Coverage Reports

Generate coverage reports:
```bash
ddev theme test:stories:coverage
```

Coverage excludes:
- Node modules
- Storybook files
- Test utilities
- Built assets

## Best Practices

### 1. Test Organization
- Group tests by functionality (Rendering, Accessibility, Interactions)
- Use descriptive test names
- Test edge cases and error conditions
- Test both happy path and failure scenarios

### 2. Accessibility Testing
- Test keyboard navigation for all interactive elements
- Verify ARIA attributes and roles
- Check color contrast and focus indicators
- Test with screen reader considerations

### 3. Responsive Testing
- Test at multiple viewport sizes
- Verify responsive classes work correctly
- Test touch interactions on mobile

### 4. Performance Considerations
- Keep tests fast and focused
- Use beforeEach for common setup
- Mock heavy dependencies when needed
- Avoid testing implementation details

## Troubleshooting

### Common Issues

#### Tests not finding components
```bash
# Check that stories are properly exported
ddev theme build:stories

# Verify test file patterns in vitest.config.js
```

#### Storybook not starting for tests
```bash
# Ensure Storybook can start manually
ddev theme storybook

# Check for port conflicts (6006)
```

#### Browser tests failing
```bash
# Check Playwright installation
ddev exec "cd web/themes/custom/adesso_cms_theme && npx playwright install"

# Verify browser configuration in vitest.config.js
```

#### Async operations timing out
- Increase timeouts in vitest.config.js
- Use proper waiting utilities from test-utils.js
- Check for proper cleanup in beforeEach/afterEach

### Debug Mode

Run tests in debug mode:
```bash
ddev theme test:stories:ui  # Opens browser UI for debugging
```

View test in browser:
```bash
ddev theme test:stories:watch  # Watch mode with hot reload
```

## Integration with CI/CD

The test suite is designed to work in CI/CD environments:
- Headless browser testing
- Coverage reporting
- JUnit XML output support
- Fail-fast on accessibility violations

## Adding New Component Tests

1. Create `component.test.js` next to `component.stories.js`
2. Import your stories using `composeStories`
3. Follow the established test patterns
4. Include all test categories (Rendering, Accessibility, Interactions)
5. Add component-specific edge cases
6. Update this README if you add new testing utilities

## Resources

- [Storybook Testing Addon](https://storybook.js.org/addons/@storybook/addon-test)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Testing](https://playwright.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [adesso CMS Accessibility Standards](.claude/adesso-accessibility-standards.md)