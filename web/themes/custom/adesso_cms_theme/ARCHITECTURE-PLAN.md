# Drupal SDC Integration Architektur Plan

## ❌ Falsches Verständnis (vorher)
Storybook als austauschbare Frontend-Präsentation

## ✅ Korrektes Verständnis (jetzt)
**Storybook → SDC → Drupal Template Override**

## 🏗️ Tatsächliche Architektur

### 1. **Storybook** (Component Development)
```
components/site-header/site-header.stories.js
```
- **Zweck**: Component Development & Testing
- **Rolle**: Entwicklungsumgebung für Komponenten
- **Wichtig**: NICHT austauschbar, sondern integraler Bestandteil

### 2. **SDC (Single Directory Components)**
```
components/site-header/
├── site-header.component.yml  # Schema Definition
├── site-header.twig           # Base Component Template
└── site-header.stories.js     # Storybook Stories
```

**Schema Definition** (`site-header.component.yml`):
- Props Definition mit Typen
- Drupal-SDC-Schema-Compliance
- Komponenten-Metadaten

**Component Template** (`site-header.twig`):
- Basis-Twig-Template
- Verwendet Props aus Schema
- Flowbite/Tailwind Integration

### 3. **Drupal Template Override**
```
components/site-header/templates/region--header.html.twig
```
- **Zweck**: Integration mit Drupal-Daten
- **Funktion**: Verbindung zwischen Drupal & SDC
- **Datenquellen**: Drupal Config, Menus, User State

## 🔄 Entwicklungsworkflow

### Phase 1: Storybook Development
1. **Component Stories** entwickeln
2. **Props & Variants** definieren
3. **Interaktivität** testen
4. **Accessibility** prüfen

### Phase 2: SDC Integration
1. **Schema** (`component.yml`) definieren
2. **Twig Template** erstellen
3. **Props** von Storybook übernehmen
4. **Drupal-Compliance** sicherstellen

### Phase 3: Drupal Integration
1. **Template Override** erstellen
2. **Drupal-Daten** mappen
3. **Theme Integration** testen
4. **Production** deployment

## 🎯 Korrekter Plan

### Frontend-Entwickler Workflow

#### Option A: Vollständige Integration
```bash
# 1. Storybook Development
ddev theme storybook

# 2. Component Development
# - Entwicklung in site-header.stories.js
# - Testing & Variants

# 3. SDC Schema Update
# - component.yml anpassen
# - Props definieren

# 4. Template Integration
# - site-header.twig aktualisieren
# - Drupal Template Override prüfen

# 5. Drupal Testing
ddev launch
```

#### Option B: Storybook-fokussierte Entwicklung
```bash
# Frontend-Entwickler arbeitet nur in Storybook
# Drupal-Integration durch Backend-Entwickler

# Frontend:
- site-header.stories.js ✅
- Design & Interaktivität ✅
- Accessibility ✅

# Backend:
- site-header.component.yml ✅
- site-header.twig ✅
- templates/region--header.html.twig ✅
```

## 📋 Neue Strategie

### 1. **Storybook als Entwicklungsumgebung beibehalten**
- Storybook ist integraler Bestandteil
- Component Development & Testing
- Nicht austauschbar

### 2. **SDC als Brücke zwischen Storybook & Drupal**
- Schema-driven Development
- Props aus Storybook in SDC übernehmen
- Drupal-Compliance sicherstellen

### 3. **Klare Verantwortlichkeiten**
- **Frontend-Entwickler**: Storybook Stories
- **Backend-Entwickler**: SDC Schema & Templates
- **Gemeinsam**: Component Design & Props

### 4. **Storybook Enhancement Template überdenken**
```javascript
// Statt QA-fokussierte Enhancement
// Einfache, SDC-kompatible Stories

export const Default = {
  render: Template,
  args: {
    // Props aus component.yml
    site_name: 'Adesso CMS',
    show_logo: true,
    menu_items: mockMenuItems,
    // ...
  }
};
```

## 🔧 Implementierungsplan

### Sofort
1. **Storybook Stories** auf SDC-Props abstimmen
2. **Enhancement Template** vereinfachen
3. **Dokumentation** korrigieren

### Kurzfristig
1. **Component.yml** und **Stories** synchronisieren
2. **Template Overrides** prüfen
3. **Workflow** dokumentieren

### Langfristig
1. **Automated SDC Schema Generation** aus Storybook
2. **Component Library** Publikation
3. **Design System** Integration

## 💡 Erkenntnisse

1. **Storybook ist nicht austauschbar** - es ist der Entwicklungskernel
2. **SDC ist die Brücke** - zwischen Component Development & Drupal
3. **Template Overrides sind der Integrationspunkt** - Drupal-Daten zu Components
4. **Props müssen synchron bleiben** - zwischen Stories, Schema und Templates

## 📝 Nächste Schritte

1. **Bestehende Stories** auf SDC-Props abstimmen
2. **Component Schemas** validieren
3. **Template Overrides** dokumentieren
4. **Workflow für Frontend-Entwickler** definieren