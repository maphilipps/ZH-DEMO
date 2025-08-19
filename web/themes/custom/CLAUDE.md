# GPZH Theme Development - Multi-Municipality Frontend

Dieses Verzeichnis enthält die Frontend-Themes für das **GPZH (Gemeindeportale Zürich) Prototyp-System**. 

## 🎯 Theme-Architektur für GPZH Demo

### **Multi-Site Theme-Strategie**
```yaml
Base Theme: adesso_cms_theme (Main theme with SDC components)
Sub-Themes per Municipality:
  - zh_thalwil: Modern urban municipality (tech-forward)
  - zh_thalheim: Traditional rural municipality (agriculture focus)  
  - zh_erlenbach: Lakeside municipality (tourism oriented)
```

## 📁 Verzeichnis-Struktur

### **adesso_cms_theme/ (Base Theme)**
- **25+ SDC Components**: Single Directory Components with Storybook documentation
- **Modern Frontend Stack**: Vite 6.2.0, Tailwind CSS v4, Alpine.js
- **Component Library**: Hero, Gallery, Forms, Navigation, Cards, etc.
- **WYSIWYG Integration**: Components for content editors per GPZH requirements

### **Municipality Sub-Themes**
```yaml
zh_thalwil/:
  - Individual color scheme (modern blue/green)
  - Municipality-specific logos and assets
  - Custom CSS overrides for urban aesthetic

zh_thalheim/:
  - Traditional color scheme (warm earth tones)
  - Rural municipality branding
  - Agricultural-focused component styling

zh_erlenbach/:
  - Lakeside color scheme (blue/white)
  - Tourism-oriented styling
  - Lake Zurich scenic elements
```

## 🔧 GPZH-Spezifische Theme-Features

### **Responsive Navigation per GPZH Vorlage**
- **Kurze Navigationswege**: Optimierte Menü-Struktur
- **Mobile-First Design**: Touch-optimierte Navigation
- **Individuelles Design**: Pro Gemeinde angepasst
- **Accessibility**: WCAG 2.1 AA + eCH-0059 compliant

### **Component Integration für GPZH Demo**
```yaml
Forms Integration:
  - Feedback-Formular (embedded via webform_embed paragraph)
  - Meldung Infrastrukturschäden 
  - Anmeldung für Anlässe
  - Anfrage für Raumnutzung

Backend Components:
  - WYSIWYG Page Builder Integration
  - Media embedding (Flyers, Images)
  - Structured data display (Directory views)
  - Search and filter interfaces
```

## 🚀 Development Workflow

### **GPZH Theme Commands**
```bash
# Theme Development für Demo
ddev theme dev                    # Vite dev server (:5173)
ddev theme build                  # Production build for demo
ddev theme storybook             # Component documentation (:6006)

# Multi-Site Theme Testing
ddev launch thalwil.zh-demo.ddev.site    # Test Thalwil theme
ddev launch thalheim.zh-demo.ddev.site   # Test Thalheim theme  
ddev launch erlenbach.zh-demo.ddev.site  # Test Erlenbach theme
```

### **Performance Optimization für GPZH Demo**
```yaml
Core Web Vitals Target >90:
  - Vite asset optimization (tree-shaking, minification)
  - Tailwind CSS purging unused styles
  - Image optimization (WebP, responsive images)
  - Critical CSS inline loading
  - Component lazy-loading for better performance
```

## 📊 Agent Assignments für Theme-Entwicklung

### **Specialized Agents**
- **@sdc-component-architect**: Component development and Storybook integration
- **@frontend-theming-specialist**: Vite, Tailwind CSS v4, responsive design
- **@drupal-frontend-theming-specialist**: Drupal theming, Twig templates
- **@swiss-compliance-specialist**: WCAG 2.1 AA + eCH-0059 accessibility
- **@municipality-portal-specialist**: Government UX patterns, citizen services

### **Theme-Specific Tasks**
```yaml
Component Development:
  - "Create accessible form component" → @sdc-component-architect + @swiss-compliance-specialist
  - "Optimize navigation for mobile" → @frontend-theming-specialist
  - "Add municipality branding" → @drupal-frontend-theming-specialist

Performance Tasks:
  - "Optimize Core Web Vitals" → @frontend-theming-specialist + @drupal-performance-specialist
  - "Test across all municipalities" → @qa-testing-specialist
```

## 🎨 GPZH Design-System

### **Municipality Color Schemes**
```css
/* Thalwil - Modern Urban */
--primary: #2563eb;    /* Blue */
--secondary: #10b981;  /* Green */
--accent: #f59e0b;     /* Amber */

/* Thalheim - Traditional Rural */
--primary: #7c2d12;    /* Brown */
--secondary: #15803d;  /* Forest Green */ 
--accent: #dc2626;     /* Red */

/* Erlenbach - Lakeside Tourism */
--primary: #0ea5e9;    /* Sky Blue */
--secondary: #6366f1;  /* Indigo */
--accent: #84cc16;     /* Lime */
```

### **Typography & Accessibility**
```yaml
Swiss Standards Compliance:
  - Font sizes: minimum 16px body text
  - Color contrast ratio >4.5:1
  - Touch targets minimum 44px
  - German language support (Swiss High German)
  - Screen reader compatibility
```

## 📱 Demo-Bereitschaft Checkliste

### **Theme Demo Requirements**
- [ ] Alle 3 Gemeinde-Themes responsiv und funktional
- [ ] SDC Components in Storybook dokumentiert  
- [ ] Performance Score >90 Core Web Vitals
- [ ] WCAG 2.1 AA + eCH-0059 accessibility compliance
- [ ] Mobile Touch-Navigation optimiert
- [ ] WYSIWYG Components für Content-Editoren verfügbar

### **Component Integration Tests**
- [ ] Form embedding funktioniert (webform_embed paragraph)
- [ ] Media-Integration (Bilder, Flyers) funktional
- [ ] Directory views styled und filterbar
- [ ] Search interface implementiert und styled

### **Multi-Site Consistency**
- [ ] Navigation konsistent über alle Gemeinden
- [ ] Component behavior identisch
- [ ] Performance gleichmäßig hoch
- [ ] Accessibility standards erfüllt

Dieses Theme-System ist optimal auf die GPZH Präqualifikations-Anforderungen abgestimmt und bietet eine solide Basis für die 35-minütige Systemdemonstration vor dem Kanton Zürich.