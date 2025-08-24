# Bruchtal Municipality Style Guide

## Brand Identity

### Logo
**Primary Logo**: Bruchtal Municipality Logo with Red Flower Symbol  
**Tagline**: "Leben am See" (Life by the Lake)  
**Usage**: Municipal headers, official communications, digital platforms

### Color Palette

#### Primary Red Color System
The Bruchtal theme uses a sophisticated red color palette that conveys trust, vitality, and community spirit while maintaining Swiss governmental standards.

```css
/* Primary Color Scale */
--color-primary-50:  #fef2f2  /* Lightest tint - backgrounds */
--color-primary-100: #fee2e2  /* Very light - subtle highlights */
--color-primary-200: #fecaca  /* Light - disabled states */
--color-primary-300: #fca5a5  /* Light medium - borders */
--color-primary-400: #f87171  /* Medium light - secondary actions */
--color-primary-500: #ef4444  /* Medium - alerts, notifications */
--color-primary-600: #dc2626  /* Brand primary - main actions */
--color-primary-700: #b91c1c  /* Dark - hover states */
--color-primary-800: #991b1b  /* Darker - pressed states */
--color-primary-900: #7f1d1d  /* Darkest - text on light */
--color-primary-950: #450a0a  /* Ultra dark - high contrast */
```

#### Usage Guidelines

**Primary-600 (#DC2626)** - Main Brand Color
- Navigation active states
- Primary buttons and CTAs
- Logo flower symbol
- Important links and actions

**Primary-700 (#B91C1C)** - Interactive States
- Button hover states
- Active form elements
- Pressed/clicked states
- Secondary brand applications

**Primary-50 (#FEF2F2)** - Subtle Backgrounds
- Light theme section backgrounds
- Notification backgrounds
- Card highlights
- Form field focus rings

**Primary-100 (#FEE2E2)** - Content Backgrounds
- Panel backgrounds in light theme
- Table header backgrounds
- Subtle content sections

**Primary-200-400** - Supporting Elements
- Borders and dividers
- Icon tints
- Chart and graph elements
- Secondary information

**Primary-800-950** - High Contrast Text
- Dark theme text
- High emphasis text
- Error states
- Critical information

### Neutral Color System

```css
/* Neutral Gray Scale */
--color-neutral-50:  #f8fafc  /* Very light backgrounds */
--color-neutral-100: #f1f5f9  /* Light backgrounds */
--color-neutral-200: #e2e8f0  /* Borders, dividers */
--color-neutral-300: #cbd5e1  /* Disabled text */
--color-neutral-400: #94a3b8  /* Placeholder text */
--color-neutral-500: #64748b  /* Secondary text */
--color-neutral-600: #475569  /* Body text */
--color-neutral-700: #334155  /* Emphasized text */
--color-neutral-800: #1e293b  /* Headings */
--color-neutral-900: #0f172a  /* High contrast text */
--color-neutral-950: #020617  /* Maximum contrast */
```

## Theme Variants

### Default Theme (White Background)
**Background**: White (#FFFFFF)  
**Primary Text**: Neutral-800 (#1e293b)  
**Primary Color**: Primary-600 (#dc2626)  
**Use Case**: Main content areas, forms, standard pages

### Light Theme (Tinted Background)
**Background**: Primary-50 (#fef2f2)  
**Primary Text**: Neutral-800 (#1e293b)  
**Primary Color**: Primary-700 (#b91c1c) - enhanced contrast  
**Use Case**: Hero sections, feature highlights, call-to-action areas

### Dark Theme (Dark Background)
**Background**: Neutral-900 (#0f172a)  
**Primary Text**: Neutral-200 (#e2e8f0)  
**Primary Color**: Primary-400 (#f87171) - optimized for dark backgrounds  
**Use Case**: Evening mode, accessibility preferences, modern interfaces

## Typography

### Font Family
**Primary**: Inter (Google Fonts)  
**Fallback**: System UI, -apple-system, BlinkMacSystemFont, sans-serif  
**Weight Range**: 100-900 (Hairline to Black)  

### Size Scale
**Base Size**: 20px (1.25rem)  
**Minimum Size**: 16px for accessibility compliance  
**Scale**: Tailwind CSS default scale (text-sm to text-9xl)

### Usage Guidelines
```css
/* Headings */
h1: font-weight-700, large sizes (text-4xl+)
h2: font-weight-700, medium-large (text-2xl-3xl)
h3: font-weight-600, medium (text-xl-2xl)
h4: font-weight-600, regular (text-lg-xl)
h5-h6: font-weight-500, small-medium (text-base-lg)

/* Body Text */
p: font-weight-400, text-base (20px)
small: font-weight-400, text-sm (16px)
caption: font-weight-400, text-xs (14px)
```

## Component Specifications

### Buttons

#### Primary Button
```css
background: primary-600 (#dc2626)
color: white
hover: primary-700 (#b91c1c)
focus: primary-600 with focus ring
padding: 0.5rem 1rem (8px 16px)
border-radius: 0.375rem (6px)
```

#### Secondary Button
```css
background: transparent
color: primary-600 (#dc2626)
border: 1px solid primary-600
hover: primary-600 background, white text
focus: primary-600 with focus ring
```

#### Tertiary Button
```css
background: transparent
color: primary-600 (#dc2626)
hover: primary-50 (#fef2f2) background
focus: primary-600 with focus ring
```

### Links
```css
color: primary-600 (#dc2626)
hover: primary-700 (#b91c1c) + underline
visited: primary-800 (#991b1b)
focus: focus ring + underline
```

### Form Elements
```css
border: neutral-300 (#cbd5e1)
focus: primary-600 border + focus ring
error: red-500 border
success: green-500 border
placeholder: neutral-400 (#94a3b8)
```

### Navigation
```css
background: white / neutral-50
active: primary-600 (#dc2626) background
hover: primary-100 (#fee2e2) background
text: neutral-800 (#1e293b)
```

## Accessibility Requirements

### Contrast Ratios
- **Normal Text**: Minimum 4.5:1 (Current: 4.82:1 ✓)
- **Large Text**: Minimum 3:1 (Exceeded ✓)
- **UI Components**: Minimum 3:1 (Exceeded ✓)

### Swiss eCH-0059 Compliance
- **Touch Targets**: Minimum 44px × 44px
- **Font Size**: Minimum 16px
- **Color Blindness**: Tested with deuteranopia/protanopia
- **Focus Indicators**: Clearly visible on all interactive elements

### Implementation
```css
/* Focus Ring System */
.focus-visible {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
}

/* Minimum Touch Target */
button, a[role="button"] {
  min-height: 44px;
  min-width: 44px;
}
```

## Usage Examples

### Hero Section (Light Theme)
```html
<section data-theme="light" class="bg-primary-50 text-neutral-800">
  <h1 class="text-4xl font-bold text-neutral-900">
    Gemeinde Bruchtal
  </h1>
  <p class="text-xl text-neutral-700">Leben am See</p>
  <button class="bg-primary-700 text-white hover:bg-primary-800">
    Mehr erfahren
  </button>
</section>
```

### Form Section (Default Theme)
```html
<form data-theme="default" class="bg-white">
  <input class="border-neutral-300 focus:border-primary-600" />
  <button class="bg-primary-600 text-white hover:bg-primary-700">
    Senden
  </button>
</form>
```

### Navigation Menu
```html
<nav class="bg-white border-b border-neutral-200">
  <a href="#" class="text-neutral-800 hover:bg-primary-100 hover:text-primary-800">
    Startseite
  </a>
  <a href="#" class="bg-primary-600 text-white" aria-current="page">
    Aktuell
  </a>
</nav>
```

## Brand Applications

### Digital Platforms
- Municipal website headers
- Online service portals
- Mobile applications
- Email templates
- Social media profiles

### Print Materials
- Letterheads and official documents
- Brochures and information materials
- Signage and wayfinding
- Business cards and stationery

### Signage Guidelines
- Use primary-600 for main brand elements
- Ensure 4.5:1 contrast on all backgrounds
- Maintain minimum 16px font size for readability
- Apply consistent spacing and hierarchy

## Implementation Notes

### CSS Custom Properties
The color system uses CSS custom properties for dynamic theming:

```css
/* Implementation in components */
.button-primary {
  background-color: var(--color-primary-600);
  color: var(--color-primary-foreground);
}

.button-primary:hover {
  background-color: var(--color-primary-700);
}
```

### Tailwind CSS Classes
```css
/* Common utility classes */
.text-primary { color: var(--color-primary-600) }
.bg-primary { background-color: var(--color-primary-600) }
.border-primary { border-color: var(--color-primary-600) }
.hover:bg-primary-700:hover { background-color: var(--color-primary-700) }
```

### JavaScript Integration
```javascript
// Theme switching (if implemented)
document.documentElement.setAttribute('data-theme', 'light');

// Color value access
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary-600');
```

## Quality Assurance

### Testing Checklist
- [ ] All color combinations meet WCAG 2.1 AA standards
- [ ] Focus states are clearly visible
- [ ] Color blind users can navigate effectively
- [ ] Print versions maintain readability
- [ ] Dark mode variants display correctly
- [ ] Mobile responsiveness preserved

### Browser Support
- Chrome 88+ (full CSS custom property support)
- Firefox 85+ (full support)
- Safari 14+ (full support)
- Edge 88+ (full support)
- Graceful degradation for older browsers

---

**Style Guide Version**: 1.0  
**Effective Date**: 2025-01-19  
**Next Review**: 2026-01-19  
**Approved By**: Bruchtal Municipal Design Committee