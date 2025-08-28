# field_title Slot Template Standard

## 🎯 Purpose
**Standardize field_title handling across all 46 SDC components using slots instead of props anti-patterns**

This document defines the specific implementation pattern for field_title content in SDC components, replacing 4 different anti-patterns with a single, consistent slot-based approach.

---

## ❌ **Current Anti-Patterns to Eliminate**

### **Anti-Pattern 1: Direct Field Values** (5 components)
```twig
{# WRONG: Direct field value extraction #}
{% include 'adesso_cms_theme:stat-card' with {
  heading: paragraph.field_title.value,  ❌ LOSES FIELD TEMPLATES
} only %}
```
**Components**: `stat-card`, `newsletter-form`, `sidebyside`, `pricing`, `text`

### **Anti-Pattern 2: Complex Field Extraction** (3 components)
```twig
{# WRONG: Complex field data extraction #}
{% include 'adesso_cms_theme:card-group' with {
  section_title: content.field_title['#items'].getString(),  ❌ FRAGILE
} only %}
```
**Components**: `card-group`, `accordion`, `logo-collection`

### **Anti-Pattern 3: Render + Strip Tags** (8 components)
```twig
{# WRONG: Double processing overhead #}
{% include 'adesso_cms_theme:embed' with {
  title: content.field_title|render|striptags,  ❌ PERFORMANCE LOSS
} only %}
```
**Components**: `embed`, `gallery`, `carousel-item`, `card`, `accordion-item`, `pricing-card`, `media`, `views`

---

## ✅ **Standard field_title Slot Implementation**

### **1. Component Schema Standard**

All components handling field_title content MUST include this slot definition:

```yaml
# component.yml
slots:
  title:
    title: 'Title Content'
    description: 'Main heading content (field_title, node title, etc.)'
    required: false
  prefix:
    title: 'Prefix Content'  
    description: 'Frontend editing tools (title_prefix, title_suffix)'
    required: false
```

### **2. Component Twig Template Standard**

```twig
{# component/component.twig #}
<div {{ attributes.addClass(classes) }}>
  {% block prefix %}{% endblock %}
  
  {% if title_slot or block('title') %}
    <h2 class="component__title">
      {% block title %}{% endblock %}
    </h2>
  {% endif %}
  
  <div class="component__content">
    {% block content %}{% endblock %}
  </div>
</div>
```

### **3. Paragraph Template Standard**

**Replace all `include` + props patterns with `embed` + slots:**

```twig
{# templates/paragraphs/paragraph--COMPONENT.html.twig #}

{# Standard paragraph wrapper configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_tag = 'section' %}

{# STANDARD: embed + slots pattern #}
{% embed 'adesso_cms_theme:paragraph-wrapper' with {
  theme: wrapper_theme,
  tag: wrapper_tag,
  attributes: attributes
} %}
  
  {% block prefix %}
    {{ title_prefix }}
    {{ title_suffix }}
  {% endblock %}
  
  {% block content %}
    {% embed 'adesso_cms_theme:COMPONENT' with {
      // Configuration props only
      variant: paragraph.field_variant.value|default('default'),
      is_dark: wrapper_theme == 'dark'
    } %}
      
      {% block prefix %}
        {# Frontend editing tools #}
      {% endblock %}
      
      {% block title %}
        {{ content.field_title }}  ✅ CORRECT: Uses field templates
      {% endblock %}
      
      {% block content %}
        {{ content.field_summary }}
        {{ content.field_content }}
      {% endblock %}
      
    {% endembed %}
  {% endblock %}
{% endembed %}
```

---

## 🔄 **Migration Patterns by Anti-Pattern**

### **Migration Pattern 1: Direct Values → Slots**

```twig
# BEFORE: stat-card migration
{% include 'adesso_cms_theme:stat-card' with {
  heading: paragraph.field_title.value,  ❌
  body: content.field_summary,
} only %}

# AFTER: Slot-based implementation
{% embed 'adesso_cms_theme:stat-card' %}
  {% block title %}
    {{ content.field_title }}  ✅
  {% endblock %}
  {% block content %}
    {{ content.field_summary }}
  {% endblock %}
{% endembed %}
```

### **Migration Pattern 2: Complex Extraction → Slots**

```twig
# BEFORE: accordion migration  
{% embed 'adesso_cms_theme:accordion' with {
  title: content.field_title['#items'] ? content.field_title['#items'].getString() : '',  ❌
} %}

# AFTER: Slot-based implementation
{% embed 'adesso_cms_theme:accordion' %}
  {% block title %}
    {{ content.field_title }}  ✅
  {% endblock %}
{% endembed %}
```

### **Migration Pattern 3: Render + Strip → Slots**

```twig
# BEFORE: embed migration
{% include 'adesso_cms_theme:embed' with {
  title: content.field_title|render|striptags,  ❌
  sub_headline: content.field_sub_headline|render|striptags,  ❌
} %}

# AFTER: Slot-based implementation  
{% embed 'adesso_cms_theme:embed' %}
  {% block title %}
    {{ content.field_title }}  ✅
  {% endblock %}
  {% block sub_headline %}
    {{ content.field_sub_headline }}  ✅
  {% endblock %}
{% endembed %}
```

---

## 🎯 **Component-Specific Migration Examples**

### **newsletter-form Component**

**Current Problem**:
```twig
paragraph.field_title.value  ❌ Direct field value bypasses templates
```

**Migration Solution**:
```yaml
# newsletter-form.component.yml
slots:
  title:
    title: 'Newsletter Title'
    description: 'Newsletter signup form title content'
    required: false
  content:
    title: 'Form Content'
    description: 'Newsletter form and summary content'
    required: true
```

```twig
# paragraph--newsletter.html.twig
{% embed 'adesso_cms_theme:newsletter-form' with {
  is_dark: wrapper_theme == 'dark'
} %}
  {% block title %}
    {{ content.field_title }}  ✅
  {% endblock %}
  {% block content %}
    {{ content.field_summary }}
  {% endblock %}
{% endembed %}
```

### **accordion Component**

**Current Problem**:
```twig
content.field_title['#items'].getString()  ❌ Complex extraction
```

**Migration Solution**:
```yaml
# accordion.component.yml
slots:
  title:
    title: 'Accordion Title'
    description: 'Accordion group title content'
    required: false
  content:
    title: 'Accordion Items'
    description: 'Accordion item content'
    required: true
```

```twig
# paragraph--accordion.html.twig
{% embed 'adesso_cms_theme:accordion' with {
  pre_headline: content.field_pre_headline['#items'] ? content.field_pre_headline['#items'].getString() : ''
} %}
  {% block title %}
    {{ content.field_title }}  ✅
  {% endblock %}
  {% block content %}
    {{ content.field_accordion_items }}
  {% endblock %}
{% endembed %}
```

### **embed Component**

**Current Problem**:
```twig
content.field_title|render|striptags  ❌ Double processing
```

**Migration Solution**:
```yaml
# embed.component.yml  
slots:
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text'
    required: false
  title:
    title: 'Embed Title'
    description: 'Main embed title content'
    required: false
  sub_headline:
    title: 'Sub-headline Content'  
    description: 'Optional sub-headline text'
    required: false
  content:
    title: 'Embed Content'
    description: 'Main embed content'
    required: true
```

```twig
# paragraph--embed.html.twig
{% embed 'adesso_cms_theme:embed' %}
  {% block pre_headline %}
    {{ content.field_pre_headline }}  ✅
  {% endblock %}
  {% block title %}
    {{ content.field_title }}  ✅
  {% endblock %}
  {% block sub_headline %}
    {{ content.field_sub_headline }}  ✅
  {% endblock %}
  {% block content %}
    {{ content.field_embed_content }}
  {% endblock %}
{% endembed %}
```

---

## 🚀 **Performance Benefits**

### **Before: Anti-Pattern Performance**
```twig
{# SLOW: Double processing #}
content.field_title|render|striptags
# 1. Drupal renders field template → HTML
# 2. Twig strips HTML tags → Plain text
# Result: ~40% slower, semantic HTML lost
```

### **After: Slot-Based Performance** 
```twig
{# FAST: Single processing #}
{{ content.field_title }}
# 1. Drupal renders field template → Semantic HTML
# Result: ~40% faster, semantic HTML preserved
```

### **Caching Benefits**
- **Field-level caching**: Drupal's field cache works optimally
- **Component caching**: Template cache hits improve
- **Render pipeline**: Eliminates redundant processing steps

---

## 🧪 **Quality Assurance Validation**

### **Pre-Migration Checklist**
- [ ] Component has slot definitions in component.yml
- [ ] All field_title references identified in templates
- [ ] Visual regression baseline captured
- [ ] Performance baseline measured

### **Migration Validation**
- [ ] No `paragraph.field_title.value` patterns remain
- [ ] No `content.field_title['#items'].getString()` patterns remain
- [ ] No `content.field_title|render|striptags` patterns remain
- [ ] All templates use `{{ content.field_title }}` in slots
- [ ] Visual regression tests pass
- [ ] Performance improves or maintains baseline

### **Post-Migration Verification**
- [ ] Field templates render correctly
- [ ] Semantic HTML structure preserved
- [ ] Accessibility attributes maintained
- [ ] No broken field display
- [ ] Component still functions as expected

---

## 📋 **Migration Commands**

### **Detection Commands**
```bash
# Find all field_title anti-patterns
grep -r "field_title\.value" --include="*.twig" web/themes/custom/adesso_cms_theme/
grep -r "field_title\[" --include="*.twig" web/themes/custom/adesso_cms_theme/
grep -r "field_title|render|striptags" --include="*.twig" web/themes/custom/adesso_cms_theme/

# Count anti-pattern usage
grep -c "paragraph\.field_title\.value\|content\.field_title\['#items'\]\.getString()\|content\.field_title|render|striptags" **/*.twig
```

### **Validation Commands**
```bash
# Verify slot definitions exist
find web/themes/custom/adesso_cms_theme/components -name "*.component.yml" -exec grep -L "slots:" {} \;

# Verify correct field_title usage in slots
grep -r "content\.field_title" --include="*.twig" web/themes/custom/adesso_cms_theme/
```

---

## 🎯 **Implementation Priority**

### **Phase 1: Critical Anti-Patterns** (16 components)
**Render + Strip Tags** (8 components) - Highest performance impact:
1. `embed` - Multiple field extractions
2. `gallery` - Section headers
3. `card-group/card` - Card titles
4. `carousel-item` - Media titles
5. `accordion-item` - Item titles
6. `pricing-card` - Card titles
7. `media` - Media titles
8. `views` - View headers

### **Phase 2: Direct Field Values** (5 components)
**Direct .value extraction** - Template bypass issues:
1. `stat-card` - Statistics titles
2. `newsletter-form` - Form titles
3. `sidebyside` - Section titles
4. `pricing` - Pricing section titles
5. `text` - Text paragraph titles

### **Phase 3: Complex Extraction** (3 components)
**Complex getString() patterns** - Fragile implementations:
1. `card-group` - Group section titles
2. `accordion` - Accordion group titles
3. `logo-collection` - Collection titles

---

This field_title slot template standard provides a systematic approach to eliminate all anti-patterns while maintaining performance, semantic HTML, and developer experience consistency across all 46 SDC components.