# SDC Storybook Template

Standard-Template für Drupal Single Directory Components (SDC) mit Storybook Integration basierend auf der civictheme Referenz-Struktur.

## Template Struktur

### 1. Template: `component-name.stories.js`

```js
// phpcs:ignoreFile

import Component from './component-name.twig';

const meta = {
  title: 'Category/ComponentName',
  component: Component,
  argTypes: {
    // Auto-generiert aus component.component.yml Schema
    property_name: {
      name: 'Display Name',
      description: 'Property description from schema',
      control: { type: 'text' }, // oder 'select', 'boolean', 'object'
      table: {
        type: { summary: 'string' }, // aus schema type
        defaultValue: { summary: '' },
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

// Default Story
export const ComponentName = {
  parameters: {
    layout: 'padded', // oder 'centered', 'fullscreen'
  },
  args: {
    // Einfache Property-Werte
    property_name: 'Default value',
    boolean_prop: false,
    enum_prop: 'default',
  },
};

// Variant Stories
export const VariantName = {
  args: {
    ...ComponentName.args,
    property_name: 'Variant value',
  },
};
```

## Beispiel: Button Component

Basierend auf `/web/themes/custom/adesso_cms_theme/components/button/button.component.yml`:

```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/10.1.x/core/modules/sdc/src/metadata.schema.json
name: Button
description: General/Button component
props:
  type: object
  properties:
    url:
      type: string
      title: url
      description: The URL the button links to
    text:
      type: string
      title: text
      description: The text inside the button
    icon:
      type: string
      title: icon
      description: The icon to display inside the button
    variant:
      type: string
      title: variant
      description: The button variant
      enum:
        - default
        - destructive
        - outline
        - secondary
        - ghost
        - link
    size:
      type: string
      title: size
      description: The button size
      enum:
        - default
        - sm
        - lg
        - icon
```

### Entsprechende Story: `button.stories.js`

```js
// phpcs:ignoreFile

import Component from './button.twig';

const meta = {
  title: 'General/Button',
  component: Component,
  argTypes: {
    url: {
      name: 'URL',
      description: 'The URL the button links to',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    text: {
      name: 'Text',
      description: 'The text inside the button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    icon: {
      name: 'Icon',
      description: 'The icon to display inside the button',
      control: { type: 'select' },
      options: ['', 'arrow-right', 'download', 'external-link', 'mail'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    variant: {
      name: 'Variant',
      description: 'The button variant',
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      name: 'Size',
      description: 'The button size',
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'default' },
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

export const Button = {
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'Get Started',
    variant: 'default',
    size: 'default',
  },
};

export const Secondary = {
  args: {
    ...Button.args,
    text: 'Learn More',
    variant: 'secondary',
  },
};

export const WithIcon = {
  args: {
    ...Button.args,
    text: 'Download',
    icon: 'download',
  },
};

export const AsLink = {
  args: {
    ...Button.args,
    text: 'Visit Site',
    url: 'https://example.com',
    icon: 'external-link',
  },
};
```

## Mapping Rules: Schema → ArgTypes

### Control Types
- `string` → `{ type: 'text' }`
- `string` mit `enum` → `{ type: 'select' }`, `options: [enum values]`
- `boolean` → `{ type: 'boolean' }`
- `object` → `{ type: 'object' }`
- `array` → `{ type: 'object' }`

### Table Summary
- Schema `type: string` → `{ summary: 'string' }`
- Schema `type: boolean` → `{ summary: 'boolean' }`
- Schema mit `enum` → `{ summary: 'enum' }`
- Schema `type: object` → `{ summary: 'object' }`
- Schema `type: array` → `{ summary: 'array' }`

## Story Categories

Standard-Kategorien für adesso CMS Komponenten:

- **General**: Basis-Komponenten (Button, Link, Text)
- **Editorial**: Content-Komponenten (Accordion, Hero, Text Block)
- **Media**: Medien-Komponenten (Image, Video, Gallery)
- **Navigation**: Navigation-Komponenten (Menu, Breadcrumb, Pager)
- **Layout**: Layout-Komponenten (Container, Grid, Card Group)
- **Form**: Formular-Komponenten (Input, Select, Checkbox)

## Layout Parameter

- `centered`: Für kleine Komponenten (Button, Icon)
- `padded`: Für Content-Komponenten (Accordion, Card)
- `fullscreen`: Für große Layout-Komponenten (Hero, Header)

## Best Practices

1. **Direkter Twig Import**: `import Component from './component-name.twig';`
2. **Meta mit Component**: `component: Component` (nicht als String)
3. **Einfache Args**: Keine render functions, nur einfache Property-Objekte
4. **Schema-basierte ArgTypes**: Automatische Generierung aus `.component.yml`
5. **Minimale Struktur**: Nur notwendige Stories, fokussierte Varianten
6. **Tags autodocs**: Für automatische Dokumentation
7. **Konsistente Naming**: Story-Namen entsprechen Komponentennamen

## Validierung

Jede Story muss:
1. ✅ Direkten Twig Import verwenden
2. ✅ Meta-Objekt mit `component: Component` haben
3. ✅ ArgTypes basierend auf Schema definieren
4. ✅ Einfache Story-Exports ohne render functions
5. ✅ `tags: ['autodocs']` enthalten
6. ✅ Sinnvolle Default-Args haben
7. ✅ Varianten als separate Named Exports

## Zusätzliche Beispiele

### Accordion Component (Komplexere Datenstrukturen)

```js
// phpcs:ignoreFile

import Component from './accordion.twig';

const meta = {
  title: 'Editorial/Accordion',
  component: Component,
  argTypes: {
    title: {
      name: 'Title',
      description: 'Main heading for the accordion group',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    accordion_items: {
      name: 'Accordion Items',
      description: 'Array of accordion items containing title and content',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    is_dark: {
      name: 'Dark Theme',
      description: 'Enable dark theme variant',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

export const Accordion = {
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Frequently Asked Questions',
    accordion_items: [
      {
        title: 'What is SDC?',
        content: 'Single Directory Components are a Drupal theming approach...',
        expanded: false,
      },
      {
        title: 'How does Storybook integration work?',
        content: 'Storybook reads the component schema and generates controls...',
        expanded: false,
      },
    ],
    is_dark: false,
  },
};

export const Dark = {
  args: {
    ...Accordion.args,
    is_dark: true,
  },
};
```

### Media Component (Mit komplexen Objekten)

```js
// phpcs:ignoreFile

import Component from './media.twig';

const meta = {
  title: 'Media/Media',
  component: Component,
  argTypes: {
    media_type: {
      name: 'Media Type',
      description: 'Type of media to display',
      control: { type: 'select' },
      options: ['image', 'video', 'audio'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'image' },
      },
    },
    media_object: {
      name: 'Media Object',
      description: 'Media data including URL, alt text, and metadata',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    aspect_ratio: {
      name: 'Aspect Ratio',
      description: 'Display aspect ratio for consistent sizing',
      control: { type: 'select' },
      options: ['16:9', '4:3', '1:1', 'auto'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: '16:9' },
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

export const Media = {
  parameters: {
    layout: 'padded',
  },
  args: {
    media_type: 'image',
    media_object: {
      url: 'https://picsum.photos/800/600',
      alt: 'Sample image description',
      title: 'Sample Image',
      width: 800,
      height: 600,
    },
    aspect_ratio: '16:9',
  },
};

export const Video = {
  args: {
    ...Media.args,
    media_type: 'video',
    media_object: {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Sample Video',
      thumbnail: 'https://picsum.photos/800/450',
    },
  },
};
```

## Fazit

Dieses Template gewährleistet:

- **Konsistenz**: Einheitliche Struktur für alle SDC Stories
- **Einfachheit**: Minimale, fokussierte Implementierung
- **Kompatibilität**: Direkter Twig Import wie civictheme
- **Automatisierung**: Schema-basierte ArgTypes-Generierung
- **Dokumentation**: Integrierte autodocs für bessere DX
- **Erweiterbarkeit**: Flexible Struktur für komplexe Komponenten

Die Template folgt den bewährten Praktiken von civictheme und bietet eine solide Grundlage für die SDC-Storybook Integration in adesso CMS.
EOF < /dev/null