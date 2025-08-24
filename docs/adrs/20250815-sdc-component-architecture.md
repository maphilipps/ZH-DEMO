# ADR-20250815: Single Directory Component (SDC) Architecture

## Status
Accepted

## Context

With Drupal 11's introduction of Single Directory Components (SDC), we need to establish a comprehensive architecture for component development that integrates with our modern frontend tooling (Vite, Storybook, Tailwind CSS v4).

Traditional Drupal theming approaches have limitations:
- **Scattered files**: Templates, CSS, and JS spread across directories
- **Poor reusability**: Components difficult to share and maintain
- **Development friction**: Complex build processes and hot reloading
- **Design system gaps**: Inconsistent component documentation

SDC offers a solution but requires architectural decisions for:
- Component organization and naming conventions
- Integration with Storybook for documentation
- Build pipeline integration with Vite
- State management with Alpine.js
- Testing strategies for components

## Decision

We will adopt a **comprehensive SDC architecture** with the following structure:

### Component Organization
```
web/themes/custom/adesso_cms_theme/components/
├── atoms/                    # Basic building blocks
│   ├── button/
│   ├── icon/
│   └── link/
├── molecules/                # Simple component combinations
│   ├── card/
│   ├── navigation-item/
│   └── form-field/
├── organisms/                # Complex UI sections
│   ├── header/
│   ├── hero/
│   └── footer/
└── templates/                # Full page layouts
    ├── page/
    ├── node/
    └── paragraph/
```

### Standard Component Structure
```
component-name/
├── component-name.component.yml     # Component definition
├── component-name.twig             # Template
├── component-name.css              # Styles (Tailwind)
├── component-name.js               # Behavior (Alpine.js)
├── component-name.stories.js       # Storybook stories
├── component-name.test.js          # Vitest tests
└── README.md                       # Component documentation
```

### Integration Framework
- **Storybook integration** for component development and documentation
- **Vite build pipeline** with HMR for rapid development
- **Tailwind CSS v4** for utility-first styling
- **Alpine.js** for reactive component behavior
- **Vitest** for component unit testing

## Consequences

### Positive
- **Encapsulation**: All component assets in single directory
- **Reusability**: Components easily shared across projects
- **Development speed**: Hot reloading and component isolation
- **Documentation**: Storybook provides living style guide
- **Testing**: Component-level testing improves quality
- **Maintainability**: Clear organization reduces complexity

### Negative
- **Learning curve**: New development patterns for team
- **Build complexity**: Additional tooling and configuration
- **Migration effort**: Existing components need restructuring
- **File proliferation**: More files per component
- **Dependency management**: Complex inter-component dependencies

## Performance Implications

### Build Optimization
- **Component tree shaking** to eliminate unused components
- **CSS purging** with Tailwind CSS for minimal bundle sizes
- **JavaScript splitting** for component-specific code
- **Image optimization** with responsive image variants

### Runtime Performance
- **Lazy loading** for above-the-fold components
- **Progressive enhancement** with Alpine.js
- **Minimal JavaScript** footprint for basic components
- **Efficient CSS** with utility classes and minimal custom styles

### Performance Targets
- **Component load time**: <100ms for basic components
- **Bundle size**: <50KB for core component library
- **Lighthouse score**: >90 for component-heavy pages
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

## Security Considerations

### Component Security
- **Input sanitization** in all component templates
- **XSS prevention** with proper Twig escaping
- **Content Security Policy** compliance
- **Dependency scanning** for npm packages

### Build Security
- **Package vulnerability scanning** in CI/CD pipeline
- **Source map protection** in production builds
- **Asset integrity** with subresource integrity hashes
- **Access control** for component development tools

## Multi-language Support

### Internationalization Strategy
- **Translation support** for component strings
- **RTL layout support** with logical CSS properties
- **Cultural adaptation** for icons and imagery
- **Language-specific styling** when required

### Component Localization
```yaml
# Example: button.component.yml
name: Button
props:
  text:
    type: string
    title: Button Text
    translatable: true
  variant:
    type: string
    enum: ['primary', 'secondary', 'tertiary']
```

## Implementation

### Phase 1: Foundation Setup (Week 1)
- Configure SDC module and base architecture
- Set up Storybook integration with Vite
- Create component template and documentation standards
- Establish build pipeline with hot reloading

### Phase 2: Core Components (Week 2-3)
- Develop atomic components (buttons, icons, links)
- Create molecular components (cards, forms, navigation)
- Implement Tailwind CSS integration
- Add Alpine.js behavior patterns

### Phase 3: Complex Components (Week 4-5)
- Build organism-level components (header, hero, footer)
- Develop template-level layouts
- Implement advanced interactions
- Add comprehensive testing coverage

### Phase 4: Optimization (Week 6)
- Performance optimization and bundle analysis
- Accessibility testing and improvements
- Documentation completion
- Team training and knowledge transfer

## Component Development Workflow

### New Component Creation
```
1. @sdc-component-specialist → Component architecture and structure
2. @tailwind-v4-expert → Styling with utility classes
3. @alpine-js-frontend-developer → Interactive behavior
4. @storybook-sdc-maintainer → Documentation and stories
5. @qa-testing-specialist → Testing and validation
```

### Component Enhancement
```
1. @sdc-component-specialist → Requirements analysis
2. Appropriate specialist → Implementation
3. @qa-testing-specialist → Testing and validation
4. @storybook-sdc-maintainer → Documentation updates
```

## Testing Strategy

### Component Testing Levels
```javascript
// Example: Vitest component test
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/dom'
import Button from './button.twig'

describe('Button Component', () => {
  it('renders with correct text', () => {
    const result = render(Button, {
      text: 'Click me',
      variant: 'primary'
    })
    expect(result.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

### Testing Coverage Requirements
- **Unit tests**: All component logic and behavior
- **Integration tests**: Component interactions and data flow
- **Visual tests**: Storybook visual regression testing
- **Accessibility tests**: Automated a11y validation
- **Performance tests**: Bundle size and runtime performance

## Quality Gates

### Component Quality Standards
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: <50KB per component bundle
- **Browser support**: Modern browsers (ES2020+)
- **Mobile-first**: Responsive design by default
- **Documentation**: Complete Storybook stories and README

### Code Review Requirements
- **Component architecture** review by SDC specialist
- **Styling review** by Tailwind expert
- **Behavior review** by Alpine.js specialist
- **Testing review** by QA specialist
- **Documentation review** by Storybook maintainer

## Migration Strategy

### Existing Component Migration
1. **Audit current components** and identify conversion candidates
2. **Prioritize by usage** and business impact
3. **Convert incrementally** to minimize disruption
4. **Maintain backwards compatibility** during transition
5. **Remove legacy components** after full migration

### Team Training Plan
- **SDC concepts** and architecture overview
- **Development workflow** with new tooling
- **Component testing** strategies and tools
- **Storybook usage** for documentation and development
- **Performance optimization** techniques

## Monitoring

### Development Metrics
- **Component creation velocity**: New components per sprint
- **Reusability score**: Component usage across pages
- **Documentation coverage**: Percentage of documented components
- **Test coverage**: Automated test coverage percentage

### Performance Monitoring
- **Bundle size tracking**: Component library size over time
- **Load time metrics**: Component rendering performance
- **User experience**: Core Web Vitals for component-heavy pages
- **Build time**: Development and production build performance

### Success Criteria
- **>95% component coverage** in Storybook
- **<5s build time** for development environment
- **>90 Lighthouse score** for component-heavy pages
- **<1s component switching** in development

## Future Considerations

### Advanced Features Roadmap
- **Component variants** with design tokens
- **Automated testing** with visual regression
- **Design system integration** with Figma
- **Component analytics** for usage tracking
- **Cross-project sharing** with component registry

### Technology Evolution
- **Web Components** integration for framework-agnostic sharing
- **CSS Container Queries** for advanced responsive design
- **Progressive Web App** features for offline component usage
- **Design tokens** for systematic design consistency

---

*This SDC architecture establishes a modern, maintainable foundation for component development that scales with project growth while maintaining high standards for performance, accessibility, and developer experience.*