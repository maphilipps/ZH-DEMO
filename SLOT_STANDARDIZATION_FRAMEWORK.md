# SDC Slot Standardization Framework

## **Problem Analysis**

We have 46 Single Directory Components with only 4 using proper slot definitions. The remaining components use **4 different anti-patterns** for handling Drupal fields:

### **Anti-Pattern #1: Direct Field Values as Props** (5 components)
```twig
paragraph.field_title.value
paragraph.field_pre_headline.value
```
**Problems**: Bypasses Drupal field templates, loses contextual rendering, no caching benefits

### **Anti-Pattern #2: Complex Field Extraction** (3 components) 
```twig
content.field_title['#items'].getString()
content.field_pre_headline['#items'].getString()
```
**Problems**: Complex syntax, fragile when field data structure changes, difficult maintenance

### **Anti-Pattern #3: Render + Strip Pattern** (8 components)
```twig
content.field_title|render|striptags
content.field_pre_headline|render|striptags
```
**Problems**: Double processing overhead, strips semantic HTML, loses field formatting

### **Anti-Pattern #4: Raw Field Render** (4 components - CORRECT)
```twig
content.field_title
content.field_pre_headline  
```
**Correct**: Uses Drupal field templates, maintains semantic structure, proper caching

---

## **Universal Slot Pattern Schema**

All SDC components should follow this standardized slot structure:

```yaml
slots:
  # STANDARD: Title content slot (replaces field_title anti-patterns)
  title:
    title: 'Title Content'
    description: 'Main heading/title field content (field_title, etc.)'
    required: false
  
  # STANDARD: Pre-headline content slot  
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text field content (field_pre_headline, etc.)'
    required: false
  
  # STANDARD: Main content slot
  content:
    title: 'Main Content'
    description: 'Primary component content and body fields'
    required: true
  
  # STANDARD: Summary/excerpt content slot
  summary:
    title: 'Summary Content'
    description: 'Summary or excerpt field content (field_summary, etc.)'
    required: false
    
  # STANDARD: Media content slot
  media:
    title: 'Media Content'
    description: 'Images, videos, or other media field content (field_media, etc.)'
    required: false
    
  # STANDARD: Prefix slot (for Drupal integration)
  prefix:
    title: 'Prefix Content'
    description: 'Frontend editing tools and title_prefix/title_suffix'
    required: false
```

---

## **Component.yml Slot Standards**

### **Atoms** (11 components)
**Recommended slots**: `content` only
```yaml
slots:
  content:
    title: 'Button Content'
    description: 'Button text or HTML content'
    required: false
```

### **Molecules** (15 components)  
**Recommended slots**: `title`, `content`, `media` (as needed)
```yaml
slots:
  title:
    title: 'Title Content'
    description: 'Component title field content'
    required: false
  content:
    title: 'Main Content'
    description: 'Primary content area'
    required: true
  media:
    title: 'Media Content'  
    description: 'Optional media content'
    required: false
```

### **Organisms** (14 components)
**Recommended slots**: Full slot suite
```yaml
slots:
  prefix:
    title: 'Prefix Content'
    description: 'Frontend editing tools and prefix content'
    required: false
  title:
    title: 'Title Content'
    description: 'Main heading content'
    required: false
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline content'
    required: false
  summary:
    title: 'Summary Content'
    description: 'Summary or excerpt content'
    required: false
  content:
    title: 'Main Content'
    description: 'Primary content area'
    required: true
  media:
    title: 'Media Content'
    description: 'Media elements'
    required: false
```

### **Templates** (4 components)
**Recommended slots**: Layout-specific slots
```yaml
slots:
  header:
    title: 'Header Content'
    description: 'Page header content'
    required: false
  main:
    title: 'Main Content'
    description: 'Primary page content'
    required: true
  sidebar:
    title: 'Sidebar Content'
    description: 'Optional sidebar content'
    required: false
  footer:
    title: 'Footer Content'
    description: 'Page footer content'
    required: false
```

---

## **Template Pattern Standards**

### **Current Anti-Pattern** (WRONG):
```twig
{% include 'adesso_cms_theme:newsletter-form' with { 
  pre_headline: paragraph.field_pre_headline.value,  // WRONG: Direct field value
  title: paragraph.field_title.value,               // WRONG: Direct field value
  summary: content.field_summary,                   // MIXED: Correct field template
  is_dark: wrapper_theme == 'dark', 
} only %}
```

### **Correct Pattern** (SLOT-BASED):
```twig
{% embed 'adesso_cms_theme:newsletter-form' with {
  is_dark: wrapper_theme == 'dark'
} %}
  {% block title %}
    {{ content.field_title }}
  {% endblock %}
  
  {% block pre_headline %}
    {{ content.field_pre_headline }}
  {% endblock %}
  
  {% block summary %}
    {{ content.field_summary }}
  {% endblock %}
{% endembed %}
```

### **Standard Paragraph Template Pattern**:
```twig
{# Standard paragraph wrapper configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}
{% set wrapper_css_class = [
  'paragraph',
  'paragraph--type--' ~ paragraph.bundle|clean_class,
  view_mode ? 'paragraph--view-mode--' ~ view_mode|clean_class,
  not paragraph.isPublished() ? 'paragraph--unpublished'
]|join(' ') %}

{# STANDARD: Use embed + slots pattern for all components #}
{% embed 'adesso_cms_theme:paragraph-wrapper' with {
  theme: wrapper_theme,
  spacing: wrapper_spacing,
  tag: wrapper_tag,
  className: wrapper_css_class,
  attributes: attributes
} %}
  
  {% block prefix %}
    {{ title_prefix }}
    {{ title_suffix }}
  {% endblock %}
  
  {% block content %}
    {% embed 'adesso_cms_theme:COMPONENT_NAME' with {
      // Component-specific props only (variants, themes, etc.)
    } %}
      
      {% block title %}
        {{ content.field_title }}
      {% endblock %}
      
      {% block pre_headline %}
        {{ content.field_pre_headline }}
      {% endblock %}
      
      {% block summary %}
        {{ content.field_summary }}
      {% endblock %}
      
      {% block content %}
        {{ content.field_content }}
      {% endblock %}
      
      {% block media %}
        {{ content.field_media }}
      {% endblock %}
      
    {% endembed %}
  {% endblock %}
{% endembed %}
```

---

## **Migration Strategies by Anti-Pattern**

### **Strategy 1: Direct Field Values → Slots**
```yaml
# BEFORE (Anti-pattern #1)
- paragraph.field_title.value
- paragraph.field_pre_headline.value

# AFTER (Slot-based)  
- {% block title %}{{ content.field_title }}{% endblock %}
- {% block pre_headline %}{{ content.field_pre_headline }}{% endblock %}
```

### **Strategy 2: Complex Extraction → Slots**
```yaml
# BEFORE (Anti-pattern #2)
- content.field_title['#items'].getString()
- content.field_pre_headline['#items'].getString()

# AFTER (Slot-based)
- {% block title %}{{ content.field_title }}{% endblock %}
- {% block pre_headline %}{{ content.field_pre_headline }}{% endblock %}
```

### **Strategy 3: Render + Strip → Slots** 
```yaml
# BEFORE (Anti-pattern #3)
- content.field_title|render|striptags
- content.field_pre_headline|render|striptags

# AFTER (Slot-based)
- {% block title %}{{ content.field_title }}{% endblock %}
- {% block pre_headline %}{{ content.field_pre_headline }}{% endblock %}
```

---

## **Benefits of Slot Standardization**

### **Performance Benefits**
- Eliminates double rendering (render + striptags)
- Maintains Drupal field caching
- Reduces template processing overhead

### **Maintenance Benefits**  
- Single pattern across all components
- Field structure changes handled automatically
- Consistent slot API across components

### **Developer Experience Benefits**
- Clear content relationship understanding
- Consistent embed patterns
- Better IDE support and autocomplete

### **Semantic Benefits**
- Preserves field template semantic HTML
- Maintains accessibility attributes
- Proper heading hierarchy preservation

---

## **Implementation Priority**

### **Phase 1: High-Impact Components** (8 components with render|striptags)
1. embed
2. gallery 
3. card-group/paragraph--card
4. card-group/paragraph--card-group
5. carousel/paragraph--carousel-item
6. And 3 others using render|striptags pattern

### **Phase 2: Field Value Components** (5 components with .value)
1. newsletter-form
2. stat-card
3. And 3 others using direct field values

### **Phase 3: Complex Extraction Components** (3 components with getString())
1. accordion
2. card-group
3. 1 other component using complex extraction

### **Phase 4: Validation and Documentation**
- Verify all 46 components follow slot standards
- Update component library documentation
- Add prevention rules to CLAUDE.md

---

## **Quality Assurance Checklist**

### **Component Schema Validation**
- [ ] All components have proper slot definitions
- [ ] Slot descriptions are clear and consistent
- [ ] Required/optional flags are appropriate
- [ ] Slot names follow naming conventions

### **Template Pattern Validation**
- [ ] All paragraph templates use embed + slots pattern
- [ ] No direct field value extraction (paragraph.field_title.value)
- [ ] No complex field extraction (['#items'].getString())
- [ ] No render + striptags processing
- [ ] Field templates used directly (content.field_title)

### **Performance Validation**
- [ ] No double rendering
- [ ] Drupal field caching maintained
- [ ] Component caching not broken

### **Semantic Validation**  
- [ ] Field template HTML preserved
- [ ] Accessibility attributes maintained
- [ ] Heading hierarchy correct

---

This framework provides a systematic approach to standardizing all 46 components while maintaining backward compatibility and improving performance, maintainability, and developer experience.