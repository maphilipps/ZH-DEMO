# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**adesso CMS / ZH-DEMO** - Drupal 11.2 municipal portal system for Swiss Canton Zurich prequalification processes. A multi-site architecture serving three municipalities (Thalwil, Thalheim, Erlenbach) with shared components and municipality-specific theming.

## Architecture

This is a **Drupal 11.2.2** enterprise CMS with modern frontend tooling:
- **Backend**: Drupal with extensive contrib modules, paragraph-based content modeling
- **Frontend**: Vite 6.2 + TailwindCSS v4 + Alpine.js + Storybook component library
- **AI Integration**: Anthropic Claude & OpenAI GPT for content generation and alt-text
- **Development**: DDEV containerized environment with custom commands

Key architectural patterns:
- **Content Architecture**: Node types (landing_page, news, page, person, project) with 20+ paragraph component types
- **Component System**: Single Directory Components (SDC) with Twig templates and Storybook documentation  
- **Multi-site Theming**: Base theme with municipality-specific variants
- **Configuration Management**: YAML-driven with version control

## Development Commands

### DDEV Environment
```bash
# Start development environment
./launch-adesso-cms.sh
ddev start

# Frontend development
ddev theme build          # Production build
ddev theme storybook      # Component library (:6006)  
ddev npm run dev          # Vite dev server (:5173)

# Database and cache
ddev drush cr             # Clear caches
ddev drush cex -y         # Export configuration
ddev drush cim -y         # Import configuration
ddev export-contents      # Export demo content
```

### Theme Development
```bash
# Main theme: web/themes/custom/adesso_cms_theme/
npm run build             # Production build with optimization
npm run dev               # Development with HMR
npm run storybook         # Start Storybook server
npm run test:e2e          # Playwright tests
npm run visual:test       # Visual regression testing
npm run qa:full           # All quality checks
```

### Quality Assurance
```bash
# Testing and validation
npm run test              # Vitest unit tests
npm run lint:js           # ESLint JavaScript
npm run backstop:test     # Visual regression
unlighthouse              # Performance audit
phpstan analyse           # Static analysis (level 6)
```

## Core Architecture Patterns

### Content Modeling
- **Paragraphs System**: Flexible content blocks with nested relationships
- **Field Architecture**: Consistent naming (`field_title`, `field_content`, `field_theme`, `field_seo_*`)
- **Display Modes**: default, teaser, card, search_index with responsive image styles
- **Media Management**: Focal point cropping, WebP optimization, lazy loading

### Component Development
Every SDC component follows this structure:
```yaml
# component.yml schema
properties:
  title: { type: string }
  theme: { type: string, enum: [light, dark, primary] }
  content: { type: string, format: html }
slots:
  content: { title: "Main Content" }
```

Component location: `web/themes/custom/adesso_cms_theme/components/`

### Frontend Build System
- **Vite 6.2**: Hot module replacement, asset optimization
- **TailwindCSS v4**: Utility-first with custom design tokens
- **Alpine.js**: Lightweight JavaScript reactivity
- **PostCSS**: CSS processing and optimization

### AI Integration Services
Key AI modules and their purposes:
- `ai_image_alt_text`: Automated accessibility improvements
- `ai_content_suggestions`: Content optimization recommendations  
- `ai_translate`: Multi-language support
- `ai_provider_anthropic`: Claude API integration
- `ai_provider_openai`: GPT API integration

## Key Dependencies

### PHP Dependencies (composer.json)
- **Drupal Core**: ^11.2.2
- **Content**: paragraphs (1.17), webform (6.3), search_api (1.36)
- **Media**: focal_point (2.1), svg_image (3.1), webp (1.0)
- **AI Stack**: ai (1.1), ai_agents (1.1), ai_provider_anthropic (1.1)
- **Performance**: autosave_form (1.10), automatic_updates (4.0)

### Node.js Dependencies (theme package.json)
- **Build Tools**: vite (6.2.0), tailwindcss (4.0.0)
- **Testing**: playwright (1.49.1), vitest (3.2.4), backstopjs (6.3.25)
- **Storybook**: @storybook/html-vite (8.6.7)
- **UI Libraries**: swiper (11.2.10), flowbite (3.1.2)

## Testing Strategy

### Multi-Browser Testing
- **Playwright**: Chrome, Firefox, Safari + mobile devices
- **Visual Regression**: BackstopJS with 0.1% threshold
- **Performance**: Unlighthouse with 90%+ targets
- **Accessibility**: eCH-0059 compliance validation

### Component Testing
- **Unit Tests**: Vitest for JavaScript functionality
- **Integration**: Storybook interaction testing
- **Visual**: Component screenshots across viewports
- **E2E**: User journey validation

## Performance Requirements

### Core Web Vitals Targets
- **Performance**: >90%
- **Accessibility**: >95% 
- **SEO/Best Practices**: >90%
- **Mobile + Desktop**: Consistent scores

### Optimization Patterns
- Responsive images with focal points (WebP format)
- Critical CSS inlining with lazy loading
- Component-level lazy loading
- Asset optimization through Vite
- Database query optimization

## Municipality Theming

### Multi-Site Structure
```bash
web/themes/custom/
├── adesso_cms_theme/     # Base theme with SDC components  
├── zh_thalwil/           # Modern urban (blue theme)
├── zh_thalheim/          # Traditional rural (earth tones)
└── zh_erlenbach/         # Lakeside tourism (blue/white)
```

Each municipality has:
- Custom color schemes and typography
- Municipality-specific logos and assets  
- Tailored component styling
- Consistent navigation and functionality

## Configuration Management

### YAML Configuration
Extensive configuration in `config/` directory:
- Field configuration and storage
- Entity display modes  
- View configurations
- Module settings
- Image style definitions

### Content Export/Import
Use Default Content module for demo content deployment:
```bash
ddev export-contents      # Export to recipes/adesso_cms_starter/content/
```

## Development Guidelines

### Code Standards
- **PHP**: PSR-12 compliance, PHPStan level 6
- **JavaScript**: ESLint with Airbnb config
- **CSS**: Tailwind utility-first approach
- **Twig**: Drupal coding standards with SDC patterns

### Workflow
1. Create feature branch from main
2. Develop with `ddev npm run dev` 
3. Test with full QA suite
4. Visual regression validation
5. Performance audit
6. Code review and merge

### Security
- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate user input in custom modules
- Follow Drupal security best practices

This system demonstrates enterprise-grade Drupal architecture optimized for government/municipal use cases with comprehensive AI integration, modern frontend development, and extensive quality assurance processes.