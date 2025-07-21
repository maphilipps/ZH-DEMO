# Main Menu Component

Ein moderner Header mit Flowbite Mega Menu für Drupal 11, der SDC (Single Directory Components) Best Practices folgt.

## Features

- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Flowbite Mega Menu Integration
- ✅ Dark Mode Support
- ✅ Accessibility (ARIA-Attribute, Keyboard Navigation)
- ✅ Drupal 11 SDC Best Practices
- ✅ Storybook Integration
- ✅ Konfigurierbare Eigenschaften

## Verwendung

### In Twig Templates

```twig
{% include 'adesso_cms_theme:main-menu' with {
  show_logo: true,
  site_logo: '/path/to/logo.svg',
  show_site_name: true,
  site_name: 'Meine Website',
  enable_mega_menu: true,
  show_login_button: true,
  show_register_button: true,
  login_url: '/user/login',
  register_url: '/user/register',
  items: menu_items,
  mega_menu_content: mega_menu_content
} %}
```

### In Drupal Menüs

Die Komponente wird automatisch für das Hauptmenü verwendet über die Template-Überschreibung `menu--main.html.twig`.

## Eigenschaften

| Eigenschaft | Typ | Standard | Beschreibung |
|-------------|-----|----------|--------------|
| `show_logo` | boolean | `true` | Logo anzeigen |
| `site_logo` | string | - | Pfad zum Logo |
| `show_site_name` | boolean | `true` | Site-Name anzeigen |
| `site_name` | string | - | Name der Website |
| `enable_mega_menu` | boolean | `true` | Mega Menu aktivieren |
| `show_login_button` | boolean | `true` | Login-Button anzeigen |
| `show_register_button` | boolean | `true` | Registrieren-Button anzeigen |
| `login_url` | string | `/user/login` | URL für Login |
| `register_url` | string | `/user/register` | URL für Registrierung |
| `items` | array | - | Menü-Items |
| `mega_menu_content` | object | - | Mega Menu Inhalt |

## Menü-Items Struktur

```php
$items = [
  [
    'title' => 'Startseite',
    'url' => '/',
  ],
  [
    'title' => 'Über uns',
    'url' => '/about',
    'below' => [
      [
        'title' => 'Unser Team',
        'url' => '/about/team',
      ],
      // ... weitere Untermenü-Items
    ],
  ],
];
```

## Mega Menu Content Struktur

```php
$mega_menu_content = [
  'sections' => [
    [
      'title' => 'Über uns',
      'description' => 'Lernen Sie unser Team kennen.',
      'links' => [
        [
          'title' => 'Unser Team',
          'url' => '/about/team',
        ],
        // ... weitere Links
      ],
    ],
    // ... weitere Sektionen
  ],
];
```

## JavaScript Funktionalität

Die Komponente bietet folgende JavaScript-Features:

- **Mobile Menu Toggle**: Hamburger-Menü für mobile Geräte
- **Mega Menu Dropdown**: Erweiterte Dropdown-Funktionalität
- **Keyboard Navigation**: ESC-Taste schließt Mega Menu
- **Click Outside**: Klick außerhalb schließt Mega Menu
- **Responsive Behavior**: Automatische Anpassung an Bildschirmgröße

## CSS Klassen

### Hauptklassen

- `.header-nav`: Hauptnavigation Container
- `.header-nav-link`: Navigation Links
- `.header-button`: Standard Buttons
- `.header-button-primary`: Primäre Buttons
- `.mega-menu-dropdown`: Mega Menu Container
- `.mobile-menu-button`: Mobile Menü Button

### Utility Klassen

- `.flowbite-dropdown`: Flowbite Dropdown Styling
- `.flowbite-collapse`: Flowbite Collapse Animationen

## Storybook

Die Komponente ist vollständig in Storybook integriert mit verschiedenen Stories:

- **Default**: Standard-Konfiguration
- **Mobile**: Mobile Ansicht
- **Tablet**: Tablet Ansicht
- **WithoutLogo**: Ohne Logo
- **WithoutSiteName**: Ohne Site-Name
- **WithoutMegaMenu**: Ohne Mega Menu
- **WithoutActionButtons**: Ohne Action Buttons
- **DarkMode**: Dark Mode

### Storybook starten

```bash
ddev theme storybook
```

## Entwicklung

### Komponente neu kompilieren

```bash
ddev theme build
```

### CSS/JS Watch Mode

```bash
ddev theme watch
```

### Storybook Build

```bash
ddev theme build:stories
```

## Abhängigkeiten

- **Flowbite**: UI-Komponenten-Bibliothek
- **Tailwind CSS**: Utility-First CSS Framework
- **Drupal 11**: CMS mit SDC Support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

Die Komponente folgt WCAG 2.1 AA Standards:

- ✅ ARIA-Attribute für Screen Reader
- ✅ Keyboard Navigation
- ✅ Focus Management
- ✅ Color Contrast Compliance
- ✅ Semantic HTML

## Lizenz

Diese Komponente ist Teil des Adesso CMS Themes und unter der gleichen Lizenz lizenziert. 
