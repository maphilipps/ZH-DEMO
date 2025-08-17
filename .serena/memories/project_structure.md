# Project Structure

## Directory Organization

### Frontend Theme (Main Development Area)
```
/web/themes/custom/adesso_cms_theme/
├── components/           # 25+ SDC components (hero, gallery, accordion, etc.)
├── src/                 # Source assets (CSS, JS)
├── .storybook/          # Component documentation
├── tests/               # Component and visual tests
├── dist/                # Built assets
├── static/              # Static assets
└── templates/           # Twig templates
```

### Custom Modules
```
/web/modules/custom/
├── adesso_cms/          # Main CMS module
├── adesso_cms_content/  # Content-related functionality
└── adesso_cms_blocks/   # Custom block types
```

### Configuration Management
```
/config-export/          # Comprehensive Drupal configuration (1000+ files)
/recipes/
├── adesso_cms_starter/  # Site initialization recipe
└── adesso_cms_paragraphs/ # Custom paragraph components
```

### Project Root
- **DDEV Configuration**: Local development environment
- **Testing Setup**: Playwright, BackstopJS, Vitest configurations
- **Documentation**: Architecture guides and deployment checklists
- **Scripts**: Installation and deployment automation

## Component Architecture

### SDC (Single Directory Components)
- **25+ Components**: hero, gallery, accordion, carousel, pricing cards, etc.
- **Storybook Integration**: Component documentation and testing
- **Alpine.js Behaviors**: Interactive enhancements
- **Accessibility Focus**: WCAG 2.1 AA compliance built-in

### Content Types
- **Page**: Landing pages with paragraph builders
- **News**: Blog-style content with media integration
- **Person**: Team member profiles
- **Project**: Portfolio/case study content
- **Event**: Event management with geolocation

### Media Management
- **Multiple Image Styles**: 50+ responsive image configurations
- **AI Integration**: Automated alt text generation
- **WebP Support**: Modern image format optimization
- **Focal Point**: Advanced image cropping system

## Development Workflow Areas

### Primary Development Focus
1. **Theme Development**: `/web/themes/custom/adesso_cms_theme/`
2. **Component Creation**: SDC components with Storybook
3. **AI Integration**: Content generation and enhancement features
4. **Performance Optimization**: Core Web Vitals and caching
5. **Configuration Management**: Drupal configuration via recipes