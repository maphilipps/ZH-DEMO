# Coding Standards & Conventions

## PHP Standards (Drupal)
- **PSR-12**: PHP coding standards with Drupal-specific extensions
- **Drupal Coding Standards**: Follow official Drupal coding guidelines
- **Security**: Input validation, sanitization, and CSRF protection
- **Performance**: Efficient database queries and caching strategies

## JavaScript Standards
- **ESLint**: Airbnb configuration with Storybook plugin
- **ES6+**: Modern JavaScript features and syntax
- **Alpine.js**: Component behavior patterns for interactivity
- **Modules**: ES6 import/export for code organization

## CSS Standards
- **Tailwind CSS v4**: Utility-first CSS framework
- **Stylelint**: CSS linting with standard configuration
- **PostCSS**: Modern CSS processing with Autoprefixer
- **Responsive Design**: Mobile-first approach

## Component Development Standards
### SDC (Single Directory Components)
- **Structure**: Each component in its own directory with:
  - `component.yml` - Schema definition
  - `component.twig` - Template
  - `component.behavior.js` - Alpine.js behavior (if needed)
  - `component.css` - Component-specific styles
  - `component.stories.js` - Storybook story

### Naming Conventions
- **Components**: kebab-case (e.g., `hero-section`, `pricing-card`)
- **CSS Classes**: BEM methodology with Tailwind utilities
- **JavaScript**: camelCase for variables, PascalCase for components
- **Files**: lowercase with hyphens for separation

## Accessibility Standards
- **WCAG 2.1 AA**: Mandatory compliance level
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA**: Appropriate ARIA attributes and roles
- **Focus Management**: Keyboard navigation support
- **Color Contrast**: Minimum 4.5:1 ratio for normal text

## Performance Standards
- **Core Web Vitals**: Target >90 scores for all metrics
- **Image Optimization**: WebP format with responsive sizes
- **Code Splitting**: Lazy loading for non-critical components
- **Bundle Size**: Monitor and optimize asset sizes

## German Market Compliance
- **Brand Guidelines**: "adesso wird immer klein geschrieben" (always lowercase)
- **GDPR Compliance**: Privacy-focused data handling
- **German Language**: Proper German typography and formatting
- **Cultural Appropriateness**: German market-specific content guidelines

## Testing Standards
### Unit Testing (Vitest)
- **Coverage**: Minimum 90% test coverage
- **Component Testing**: Test component logic and interactions
- **Mock Data**: Realistic test data for components

### Visual Regression (BackstopJS)
- **Scenarios**: Test all component variations
- **Breakpoints**: Desktop, tablet, and mobile views
- **States**: Default, hover, focus, and error states

### E2E Testing (Playwright)
- **User Journeys**: Complete user workflows
- **Cross-browser**: Chrome, Firefox, and Safari testing
- **Accessibility**: Automated accessibility testing

## Documentation Standards
### Storybook Documentation
- **Stories**: Cover all component variations
- **Controls**: Interactive controls for props
- **Documentation**: Usage guidelines and examples
- **Accessibility**: Document accessibility features

### Code Comments
- **Purpose**: Explain why, not what
- **Complex Logic**: Document business logic and decisions
- **API Documentation**: JSDoc for JavaScript functions
- **Drupal Hooks**: Document custom hook implementations

## Git Workflow Standards
- **Branch Naming**: `feature/ADC-XXX-description`, `bugfix/ADC-XXX-description`
- **Commit Messages**: Conventional commits with Linear task references
- **Pull Requests**: Include Linear task link and testing checklist
- **Code Review**: Minimum 2 reviewers for all changes

## Quality Gates
### Pre-commit
- Linting passes (ESLint, Stylelint)
- Unit tests pass
- No console errors or warnings

### Pre-merge
- All tests passing (unit, visual, E2E)
- Accessibility audit passes
- Performance benchmarks met
- Code review approved by 2+ reviewers

### Post-deploy
- Performance monitoring active
- Error monitoring configured
- Success metrics validated