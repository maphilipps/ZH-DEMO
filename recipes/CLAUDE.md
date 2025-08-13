# Drupal 11 Recipe Development Guide

This folder contains Drupal 11 recipes for modular site installation and configuration. Recipes are Drupal 11's new system for reproducible, composable site building.

## Linear-First Recipe Development

### **Automatic Linear Task Creation**
All recipe development work automatically creates Linear tasks with this structure:
```yaml
Epic: "Recipe Development - [Recipe Name]"
Tasks:
  - ADC-RECIPE-001: Recipe architecture and dependencies
  - ADC-RECIPE-002: Configuration export and validation
  - ADC-RECIPE-003: Testing and documentation
  - ADC-RECIPE-004: Integration and deployment
```

## Recipe Architecture

### **Available Recipes**
- `adesso_cms_starter/` - Complete CMS installation with AI integration
- `adesso_cms_paragraphs/` - 25+ paragraph component types
- `adesso_cms_ai_suite/` - AI provider configuration and content tools
- `adesso_cms_complete/` - Full-featured CMS with all enhancements

### **Recipe Structure**
```yaml
# recipe.yml structure
name: 'Recipe Name'
description: 'Description for admins'
type: 'Site'
recipes:
  - dependency_recipe_1
  - dependency_recipe_2
install:
  - required_module_1
  - required_module_2
config:
  import:
    config:
      - config.file.name
    config/optional:
      - optional.config.file
```

## Development Workflow

### **1. Recipe Creation Process**
```bash
# Linear task: "Create new recipe for [functionality]"
# Agent sequence: drupal-configuration-expert → qa-testing-specialist

1. Create recipe directory: /recipes/[recipe-name]/
2. Define recipe.yml with dependencies
3. Export required configuration
4. Test recipe application
5. Document installation process
```

### **2. Configuration Management**
```yaml
Configuration Types:
  Required Config:
    - Essential for recipe functionality
    - Located in config/install/
    
  Optional Config:
    - Enhances functionality but not required
    - Located in config/optional/
    
  Content Config:
    - Default content and entities
    - Located in content/
```

### **3. Testing Strategy**
```bash
# Recipe validation commands
ddev drush recipe:list                    # List available recipes
ddev drush recipe:inspect [recipe-name]   # Validate recipe structure
ddev drush recipe:apply [recipe-name]     # Apply recipe to site

# Automated testing
npm run test:recipes                      # Run recipe validation tests
npm run test:install                      # Test installation process
```

## Quality Gates for Recipe Development

### **Pre-Development Gates**
- Linear task created with clear acceptance criteria
- Recipe dependencies identified and validated
- Configuration export strategy planned
- Testing approach documented

### **Development Gates**
- Recipe.yml syntax validation
- Configuration import/export testing
- Dependency resolution verification
- Installation process documentation

### **Pre-Merge Gates**
- Recipe application tested on clean install
- All configuration validated
- Dependencies confirmed working
- Documentation complete and accurate

## Agent Integration

### **Primary Agents for Recipe Development**
- `drupal-configuration-expert` - Recipe architecture and config management
- `drupal-11-lead-developer` - Implementation and integration
- `qa-testing-specialist` - Testing and validation
- `documentation-specialist` - Recipe documentation

### **MCP Integration**
- **GitHub MCP**: Automated PR creation for recipe updates
- **Context7 MCP**: Validate against Drupal community recipe patterns
- **Memory MCP**: Document recipe patterns and lessons learned

## Common Recipe Patterns

### **AI Integration Recipe**
```yaml
# AI content generation and moderation
recipes:
  - drupal_cms_content_type_base
config:
  import:
    config:
      - ai.settings.yml
      - ai_provider_anthropic.settings.yml
      - ai_provider_openai.settings.yml
```

### **Component Library Recipe**
```yaml
# SDC component installation
recipes:
  - drupal_cms_content_type_base
install:
  - components
  - paragraphs
config:
  import:
    config:
      - paragraphs.paragraphs_type.*
      - core.entity_view_display.paragraph.*
```

### **Performance Recipe**
```yaml
# Core Web Vitals optimization
install:
  - advagg
  - imageapi_optimize
config:
  import:
    config:
      - system.performance.yml
      - advagg.settings.yml
```

## German Market Compliance

### **Brand Requirements**
- All recipe names and descriptions use "adesso" (lowercase)
- German language as primary locale in recipes
- GDPR-compliant configuration defaults
- German-specific field labels and content

### **Localization Support**
```yaml
# Multi-language recipe pattern
config:
  import:
    config:
      - language.entity.de.yml
      - language.entity.en.yml
      - locale.settings.yml
```

## Best Practices

### **Recipe Design Principles**
1. **Single Responsibility**: Each recipe focuses on one functional area
2. **Composability**: Recipes can be combined safely
3. **Dependency Management**: Clear dependency chains without circular references
4. **Environment Parity**: Same result across dev/staging/production

### **Configuration Management**
1. **Export Strategy**: Use `ddev drush cex` for comprehensive exports
2. **Selective Import**: Only include necessary configuration
3. **Optional Components**: Use config/optional for non-essential features
4. **UUID Management**: Remove UUIDs for reusability

### **Testing Requirements**
1. **Clean Install**: Test recipe on fresh Drupal installation
2. **Dependency Testing**: Verify all recipe dependencies work correctly
3. **Rollback Testing**: Ensure recipes can be safely removed if needed
4. **Performance Impact**: Measure installation time and resource usage

## Troubleshooting

### **Common Issues**
```yaml
Recipe Validation Errors:
  Missing Dependencies:
    - Check recipes: section in recipe.yml
    - Verify dependency recipes exist and are valid
    
  Configuration Conflicts:
    - Review config imports for conflicts
    - Check field storage and entity dependencies
    
  Installation Failures:
    - Verify module dependencies are available
    - Check for configuration schema mismatches
```

### **Debugging Commands**
```bash
# Recipe validation
ddev drush recipe:inspect [recipe-name] --verbose

# Configuration debugging  
ddev drush config:status
ddev drush config:import --preview=full

# Clear caches after changes
ddev drush cr
```

## Linear Integration Examples

### **Recipe Enhancement Request**
```markdown
User: "Add AI content suggestions to news articles"

Linear Tasks Created:
- ADC-AI-NEWS-001: Analyze news content type requirements  
- ADC-AI-NEWS-002: Design AI integration for news workflow
- ADC-AI-NEWS-003: Update adesso_cms_ai_suite recipe
- ADC-AI-NEWS-004: Test AI suggestions in news editing
- ADC-AI-NEWS-005: Document editorial workflow changes
```

### **Performance Recipe Request**
```markdown
User: "Optimize Core Web Vitals for better Google rankings"

Linear Tasks Created:
- ADC-PERF-001: Baseline performance measurement
- ADC-PERF-002: Create performance optimization recipe
- ADC-PERF-003: Implement caching and aggregation settings
- ADC-PERF-004: Validate Core Web Vitals improvements
- ADC-PERF-005: Document performance configuration
```

This recipe development approach ensures that all configuration changes follow enterprise standards, maintain German market compliance, and integrate seamlessly with the overall adesso CMS architecture.