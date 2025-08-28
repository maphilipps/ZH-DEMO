# Template Pattern Standards

## **Standard Paragraph Template Architecture**

All paragraph templates should follow this consistent embed + slots pattern to eliminate field handling anti-patterns.

---

## **Universal Paragraph Template Pattern**

### **Standard Template Structure**:
```twig
{#
/**
 * @file
 * [Component] paragraph template using paragraph-wrapper component with embed pattern.
 */
#}

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
  
  {# STANDARD: Drupal integration prefix slot #}
  {% block prefix %}
    {{ title_prefix }}
    {{ title_suffix }}
  {% endblock %}
  
  {# STANDARD: Component embed with slots #}
  {% block content %}
    {% embed 'adesso_cms_theme:COMPONENT_NAME' with {
      {# Props for behavior/styling only #}
      is_dark: wrapper_theme == 'dark',
      variant: paragraph.field_variant.value|default('default'),
      layout: paragraph.field_layout.value|default('vertical')
    } %}
      
      {# CONTENT SLOTS: Use field templates directly #}
      
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

## **Anti-Pattern vs Correct Pattern Examples**

### **❌ WRONG: Include + Props Pattern**
```twig
{# ANTI-PATTERN: Using include with field values as props #}
{% include 'adesso_cms_theme:newsletter-form' with { 
  pre_headline: paragraph.field_pre_headline.value,      // ❌ Direct field value
  title: paragraph.field_title.value,                   // ❌ Bypasses field template
  summary: content.field_summary|render|striptags,      // ❌ Double processing
  is_dark: wrapper_theme == 'dark', 
} only %}
```

**Problems**:
- Bypasses Drupal field templates
- Mixed pattern (some direct values, some render|striptags)
- No semantic HTML preservation
- Cache inefficiency

### **✅ CORRECT: Embed + Slots Pattern**
```twig
{# CORRECT PATTERN: Using embed with slots #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  is_dark: wrapper_theme == 'dark'                      // ✅ Props for behavior only
} %}
  
  {% block pre_headline %}
    {{ content.field_pre_headline }}                    // ✅ Field template
  {% endblock %}
  
  {% block title %}
    {{ content.field_title }}                          // ✅ Semantic HTML preserved
  {% endblock %}
  
  {% block summary %}
    {{ content.field_summary }}                        // ✅ Single processing
  {% endblock %}
  
{% endembed %}
```

**Benefits**:
- Uses Drupal field templates
- Consistent pattern across all fields
- Preserves semantic HTML structure
- Better caching and performance

---

## **Component-Specific Template Examples**

### **Newsletter Form Template** (MIGRATED)

**File**: `newsletter-form/templates/paragraph--newsletter.html.twig`

```twig
{#
/**
 * @file
 * Newsletter paragraph template using paragraph-wrapper component with embed pattern.
 */
#}

{# Newsletter paragraph configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}
{% set wrapper_css_class = [
  'paragraph',
  'paragraph--type--' ~ paragraph.bundle|clean_class,
  view_mode ? 'paragraph--view-mode--' ~ view_mode|clean_class,
  not paragraph.isPublished() ? 'paragraph--unpublished'
]|join(' ') %}

{# Embed the paragraph-wrapper component using slots #}
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
    {% embed 'adesso_cms_theme:newsletter-form' with {
      is_dark: wrapper_theme == 'dark'
    } %}
      
      {% block pre_headline %}
        {{ content.field_pre_headline }}
      {% endblock %}
      
      {% block title %}
        {{ content.field_title }}
      {% endblock %}
      
      {% block summary %}
        {{ content.field_summary }}
      {% endblock %}
      
    {% endembed %}
  {% endblock %}
{% endembed %}
```

---

### **Accordion Template** (MIGRATED)

**File**: `accordion/templates/paragraph--accordion.html.twig`

```twig
{#
/**
 * @file
 * Accordion paragraph template using paragraph-wrapper component with embed pattern.
 */
#}

{# Accordion paragraph configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}
{% set wrapper_css_class = [
  'paragraph',
  'paragraph--type--' ~ paragraph.bundle|clean_class,
  view_mode ? 'paragraph--view-mode--' ~ view_mode|clean_class,
  not paragraph.isPublished() ? 'paragraph--unpublished'
]|join(' ') %}

{# Embed the paragraph-wrapper component using slots #}
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
    <div class="mx-auto max-w-3xl">
      {% embed 'adesso_cms_theme:accordion' with {
        is_dark: wrapper_theme == 'dark'
      } %}
        
        {% block title %}
          {{ content.field_title }}
        {% endblock %}
        
        {% block pre_headline %}
          {{ content.field_pre_headline }}
        {% endblock %}
        
        {% block accordion_items %}
          {{ content.field_accordion_item }}
        {% endblock %}
        
      {% endembed %}
    </div>
  {% endblock %}
{% endembed %}
```

---

### **Embed Template** (MIGRATED)

**File**: `embed/templates/paragraph--embed.html.twig`

```twig
{#
/**
 * @file
 * Embed paragraph template using paragraph-wrapper component with embed pattern.
 */
#}

{# Embed paragraph configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}
{% set wrapper_css_class = [
  'paragraph',
  'paragraph--type--' ~ paragraph.bundle|clean_class,
  view_mode ? 'paragraph--view-mode--' ~ view_mode|clean_class,
  not paragraph.isPublished() ? 'paragraph--unpublished'
]|join(' ') %}

{# Embed the paragraph-wrapper component using slots #}
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
    {% embed 'adesso_cms_theme:embed' %}
      
      {% block pre_headline %}
        {{ content.field_pre_headline }}
      {% endblock %}
      
      {% block title %}
        {{ content.field_title }}
      {% endblock %}
      
      {% block sub_headline %}
        {{ content.field_sub_headline }}
      {% endblock %}
      
      {% block embed %}
        {{ content.field_script }}
      {% endblock %}
      
    {% endembed %}
  {% endblock %}
{% endembed %}
```

---

### **Gallery Template** (MIGRATED)

**File**: `gallery/templates/paragraph--gallery.html.twig`

```twig
{#
/**
 * @file
 * Gallery paragraph template using paragraph-wrapper component with embed pattern.
 */
#}

{# Gallery paragraph configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}
{% set wrapper_css_class = [
  'paragraph',
  'paragraph--type--' ~ paragraph.bundle|clean_class,
  view_mode ? 'paragraph--view-mode--' ~ view_mode|clean_class,
  not paragraph.isPublished() ? 'paragraph--unpublished'
]|join(' ') %}

{# Embed the paragraph-wrapper component using slots #}
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
    {% embed 'adesso_cms_theme:gallery' with {
      layout: paragraph.field_layout.value|default('grid'),
      is_dark: wrapper_theme == 'dark'
    } %}
      
      {% block pre_headline %}
        {{ content.field_pre_headline }}
      {% endblock %}
      
      {% block title %}
        {{ content.field_title }}
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

## **Template Architecture Principles**

### **1. Consistent Wrapper Configuration**
```twig
{# STANDARD: Always use these exact variable patterns #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}
{% set wrapper_css_class = [
  'paragraph',
  'paragraph--type--' ~ paragraph.bundle|clean_class,
  view_mode ? 'paragraph--view-mode--' ~ view_mode|clean_class,
  not paragraph.isPublished() ? 'paragraph--unpublished'
]|join(' ') %}
```

### **2. Props vs Slots Separation**
```twig
{# Props: Behavioral and styling configuration only #}
{% embed 'adesso_cms_theme:component' with {
  is_dark: wrapper_theme == 'dark',              // ✅ Behavioral prop
  variant: paragraph.field_variant.value,        // ✅ Styling prop
  layout: paragraph.field_layout.value           // ✅ Layout prop
} %}

{# Slots: Content from Drupal fields only #}
{% block title %}
  {{ content.field_title }}                     // ✅ Content slot
{% endblock %}
```

### **3. Field Template Usage**
```twig
{# ALWAYS: Use content.field_name pattern #}
{{ content.field_title }}          // ✅ Uses field template
{{ content.field_media }}          // ✅ Preserves field formatting
{{ content.field_content }}        // ✅ Maintains semantic HTML

{# NEVER: Use these anti-patterns #}
{{ paragraph.field_title.value }}              // ❌ Bypasses field template
{{ content.field_title|render|striptags }}     // ❌ Double processing
{{ content.field_title['#items'].getString() }} // ❌ Complex extraction
```

### **4. Conditional Content Handling**
```twig
{# SIMPLE: Slots handle empty content automatically #}
{% block title %}
  {{ content.field_title }}         // ✅ Auto-handles empty fields
{% endblock %}

{# COMPLEX: When conditional logic needed #}
{% block media %}
  {% if content.field_media|render|trim %}
    <div class="media-wrapper">
      {{ content.field_media }}
    </div>
  {% endif %}
{% endblock %}
```

---

## **Component Template Updates Required**

### **Components Needing Slot Support** (Component.yml updates):

1. **newsletter-form** - Add: pre_headline, title, summary slots
2. **accordion** - Add: title, pre_headline, accordion_items slots  
3. **embed** - Add: pre_headline, title, sub_headline, embed slots
4. **gallery** - Add: pre_headline, title, content, media slots
5. **section-header** - Add: pre_headline, title, subtitle slots
6. **stat-card** - Add: title, content, media slots
7. **video** - Add: title, content, description slots
8. **file-upload-preview** - Add: content, actions slots

### **Paragraph Templates Needing Migration** (Template updates):

1. **newsletter-form/templates/paragraph--newsletter.html.twig**
2. **accordion/templates/paragraph--accordion.html.twig**  
3. **embed/templates/paragraph--embed.html.twig**
4. **gallery/templates/paragraph--gallery.html.twig**
5. **stat-card/templates/paragraph--stats-item.html.twig**
6. **card-group/templates/paragraph--card.html.twig**
7. **card-group/templates/paragraph--card-group.html.twig**
8. **carousel/templates/paragraph--carousel-item.html.twig**

---

## **Quality Assurance Patterns**

### **Template Validation Checklist**:
```twig
{# ✅ CHECK: Standard wrapper configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}

{# ✅ CHECK: Uses embed pattern #}
{% embed 'adesso_cms_theme:paragraph-wrapper' with { ... } %}

{# ✅ CHECK: Drupal integration in prefix block #}
{% block prefix %}
  {{ title_prefix }}
  {{ title_suffix }}
{% endblock %}

{# ✅ CHECK: Component embed with slots #}
{% embed 'adesso_cms_theme:component' with { ... } %}

{# ✅ CHECK: Field templates in slots (no anti-patterns) #}
{% block title %}
  {{ content.field_title }}          // ✅ Field template
{% endblock %}

{# ❌ FAIL: Any anti-patterns present #}
{{ paragraph.field_title.value }}              // ❌ Direct value
{{ content.field_title|render|striptags }}     // ❌ Render + strip
{{ content.field_title['#items'].getString() }} // ❌ Complex extraction
```

### **Performance Validation**:
- No double rendering patterns
- Field templates used directly  
- Minimal conditional logic
- Proper caching context preservation

### **Semantic Validation**:
- Field template HTML preserved
- Heading hierarchy maintained
- Accessibility attributes intact
- Link structure preserved

---

## **Migration Process for Templates**

### **Step 1: Component Schema Update**
1. Add slot definitions to component.yml
2. Keep existing props for behavior/styling
3. Test component independently in Storybook

### **Step 2: Component Template Update** 
1. Update component.twig to expect slots instead of props
2. Use `{% block slot_name %}` pattern
3. Test component with slot content

### **Step 3: Paragraph Template Migration**
1. Replace `{% include %}` with `{% embed %}`
2. Move content from props to slot blocks
3. Use `{{ content.field_name }}` pattern
4. Remove all anti-patterns

### **Step 4: Integration Testing**
1. Test paragraph rendering in Drupal
2. Verify field template preservation
3. Check performance impact
4. Validate accessibility compliance

This template pattern ensures consistent, performant, and maintainable paragraph templates across all 46 components while eliminating field handling anti-patterns.