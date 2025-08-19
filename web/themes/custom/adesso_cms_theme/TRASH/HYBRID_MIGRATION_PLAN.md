# SDC Hybrid Migration Plan - Korrigierte Version

**Datum:** 2025-08-07  
**Status:** Planung korrigiert - Storybook unterstützt Twig-Slots bereits!  
**Geschätzte Dauer:** 80 Stunden (2 Wochen) ✅  
**Templates insgesamt:** 42+ Templates

## ✅ **WICHTIGE KORREKTUR: Storybook-Integration bereits verfügbar**

### Bestehende Infrastruktur (bereits funktionsfähig)
- **vite-plugin-twig-drupal v1.6.1** ✅ Importiert Twig-Components direkt
- **Page Component** ✅ Demonstriert funktionierende Slot-Patterns
- **SDC Plugin** ✅ Verwaltet Component-Dependencies automatisch

### Twig-Component Composition in Storybook (Best Practice)
```javascript
// Beispiel: Accordion mit komponiertem Content
export const ComposedAccordion = {
  args: {
    theme: 'default',
    slots: {
      items: `
        ${accordionItemComponent({
          title: 'Services',
          content: cardGroupComponent({ cards: serviceCards })
        })}
        ${accordionItemComponent({
          title: 'FAQ', 
          content: textComponent({ content: faqContent })
        })}
      `
    }
  }
};
```

## 🎯 Migration-Übersicht

### Ziel
Migration von Properties-Only Ansatz zu Hybrid-Ansatz (Properties für Konfiguration + Slots für Content)

### Drastisch reduzierte Komplexität durch bestehende Infrastruktur

### Betroffene Components
**Bleiben Properties-Only:** `button`, `heading`, `logo`, `stat-card`, `download-item`, `badge`  
**Migrieren zu Hybrid:** `accordion`, `carousel`, `card-group`, `pricing`, `hero`, `gallery`, `sidebyside`, `text`, `newsletter-form`, `media`, `embed`, `slider`, `recent-cards`, `logo-collection`, `block-reference`, `bento-grid`

## 📂 Vollständige Template-Aufstellung

### Phase 1 Components (25 Templates)

#### Accordion Component (4 Templates)
```
✅ components/accordion/accordion.component.yml      ← Slots: items
✅ components/accordion/accordion.twig               ← {{ items }} slot
✅ components/accordion/accordion-item.twig          ← Sub-component
✅ templates/paragraph--accordion.html.twig          ← {% embed %} pattern
✅ templates/paragraph--accordion-item.html.twig     ← Item template
```

#### Card-Group Component (5 Templates) 
```
✅ components/card-group/card-group.component.yml    ← Slots: cards
✅ components/card-group/card-group.twig             ← {{ cards }} slot
✅ components/card-group/card.twig                   ← Sub-component
✅ templates/paragraph--card-group.html.twig         ← {% embed %} pattern
✅ templates/paragraph--card.html.twig               ← Item template
✅ templates/field--paragraph--field-media--card.html.twig ← Field template
```

#### Carousel Component (4 Templates)
```
✅ components/carousel/carousel.component.yml        ← Slots: items
✅ components/carousel/carousel.twig                 ← {{ items }} slot
✅ components/carousel/carousel-item.twig            ← Sub-component
✅ templates/paragraph--carousel.html.twig           ← {% embed %} pattern
✅ templates/paragraph--carousel-item.html.twig      ← Item template
```

#### Gallery Component (3 Templates)
```
✅ components/gallery/gallery.component.yml          ← Slots: items
✅ components/gallery/gallery.twig                   ← {{ items }} slot
✅ templates/paragraph--gallery.html.twig            ← {% embed %} pattern
✅ templates/field--paragraph--field-media-item--gallery.html.twig ← Field template
```

#### Pricing Component (4 Templates)
```
✅ components/pricing/pricing.component.yml          ← Slots: cards
✅ components/pricing/pricing.twig                   ← {{ cards }} slot
✅ components/pricing/pricing-card.twig              ← Sub-component
✅ templates/paragraph--pricing.html.twig            ← {% embed %} pattern
✅ templates/paragraph--pricing-card.html.twig       ← Item template
```

#### Hero Component (2 Templates)
```
✅ components/hero/hero.component.yml                ← Slots: media, actions, content
✅ components/hero/hero.twig                         ← Multiple slots
✅ templates/paragraph--hero.html.twig               ← {% embed %} pattern
```

### Phase 2 Components (10+ Templates)

#### Sidebyside Component (3 Templates)
```
🔄 components/sidebyside/sidebyside.component.yml    ← Slots: media, content, features
🔄 components/sidebyside/sidebyside.twig             ← Multiple slots
🔄 templates/paragraph--sidebyside.html.twig         ← {% embed %} pattern
🔄 templates/node--teaser.html.twig                  ← Node template (falls verwendet)
```

#### Text Component (2 Templates)
```
🔄 components/text/text.component.yml                ← Slots: content
🔄 components/text/text.twig                         ← {{ content }} slot
🔄 templates/paragraph--text.html.twig               ← {% embed %} pattern
```

#### Newsletter Form Component (2 Templates)
```
🔄 components/newsletter-form/newsletter-form.component.yml ← Slots: form
🔄 components/newsletter-form/newsletter-form.twig          ← {{ form }} slot
🔄 templates/paragraph--newsletter.html.twig               ← {% embed %} pattern
```

#### Recent Cards Component (3 Templates)
```
🔄 components/recent-cards/recent-cards.component.yml       ← Slots: cards
🔄 components/recent-cards/recent-cards.twig                ← {{ cards }} slot
🔄 templates/views-view-unformatted--recent-cards.html.twig ← View template
🔄 templates/node--card.html.twig                           ← Node template
```

### Phase 3 Components (7+ Templates)

#### Media/Embed/Slider Components
```
⏳ components/media/media.component.yml               ← Slots: media
⏳ templates/paragraph--media.html.twig              ← {% embed %} pattern
⏳ components/embed/embed.component.yml              ← Slots: content
⏳ templates/paragraph--embed.html.twig              ← {% embed %} pattern
⏳ components/slider/slider.component.yml            ← Slots: items
⏳ components/slider/slider-item.twig                ← Sub-component
⏳ templates/paragraph--slider.html.twig             ← {% embed %} pattern
⏳ templates/paragraph--slider-item.html.twig        ← Item template
```

#### View Integration Components
```
⏳ components/logo-collection/logo-collection.component.yml ← Slots: logos
⏳ templates/paragraph--logo-collection.html.twig          ← {% embed %} pattern
⏳ components/block-reference/block-reference.component.yml ← Slots: content
⏳ templates/paragraph--block-reference.html.twig          ← {% embed %} pattern
⏳ components/bento-grid/bento-grid.component.yml          ← Slots: items
```

## 🔄 Template-Pattern Migration

### Alt: Properties-Only Pattern
```twig
{# paragraph--component.html.twig #}
{% include 'adesso_cms_theme:component-name' with {
  items: items_data,
  settings: settings_data
} %}
```

### Neu: Hybrid Pattern
```twig
{# paragraph--component.html.twig #}
{% embed 'adesso_cms_theme:component-name' with {
  layout: settings.layout,
  theme: settings.theme
} %}
  {% block items %}
    {% for item in content.field_items %}
      {% include 'adesso_cms_theme:component-item' with item %}
    {% endfor %}
  {% endblock %}
{% endembed %}
```

## 🧪 Testing-Strategie

### Pro Template
- **BackstopJS:** Visual regression für alle Varianten
- **Storybook:** Stories für Slot-Variationen
- **Unit Tests:** Template-Logic Tests
- **Integration Tests:** Drupal Field-Rendering

### Gesamte Test-Suite
- **42+ Templates** einzeln testen
- **Sub-Components** isoliert testen
- **Field-Templates** mit verschiedenen Datentypen
- **View-Templates** mit Mock-Daten
- **Node-Templates** mit verschiedenen Node-Types

## ⏱️ Zeitschätzung (Drastisch korrigiert dank Storybook-Infrastruktur)

### Phase 1 (Woche 1) - Core Components
- **Section-Header Pilot:** 2 Stunden (Pattern etablieren)
- **Accordion:** 4 Stunden (Templates + Composed Stories)
- **Card-Group:** 5 Stunden (5 Templates + Component Composition)
- **Hero:** 3 Stunden (Multi-Slot Implementation)
- **Carousel/Gallery:** 6 Stunden (Item-Component Composition)
- **Testing:** 8 Stunden (BackstopJS + Composition Tests)
**Subtotal:** 28 Stunden

### Phase 2 (Woche 2) - Completion & Polish
- **Verbleibende Components:** 18 Stunden (Pricing, Sidebyside, Text, etc.)
- **Complex Composition Stories:** 6 Stunden (Landing Page Demo)
- **View Integration:** 4 Stunden (Recent-Cards etc.)
- **Documentation:** 8 Stunden (Pattern Guide + Examples)
- **Final Testing:** 8 Stunden (Performance + Validation)
- **Code Review:** 4 Stunden (Pattern Consistency)
- **Deployment:** 4 Stunden (Rollout + Training)
**Subtotal:** 52 Stunden

**Gesamt:** 80 Stunden (2 Wochen) ✅

### Einsparungen durch bestehende Infrastruktur:
- ~~Storybook Adapter Development:~~ **-40 Stunden**
- ~~Cache Strategy Research:~~ **-20 Stunden**  
- ~~Performance Baseline Setup:~~ **-15 Stunden**
- ~~Complex Integration Debugging:~~ **-25 Stunden**
**Total gespart:** 100 Stunden!

## 🚨 Risiken & Mitigationen

### Hohe Komplexität
- **Risiko:** 42+ Templates gleichzeitig ändern
- **Mitigation:** Phasenweise Migration mit Rollback-Punkten

### Field-Template Dependencies
- **Risiko:** Field-Templates können andere Components beeinflussen
- **Mitigation:** Vollständige Dependency-Analyse vor Änderungen

### View/Node-Template Integration
- **Risiko:** Views und Nodes funktionieren anders als Paragraphs
- **Mitigation:** Separate Testszenarien für View/Node-Integration

## ✅ Definition of Done

### Pro Template
- [ ] Schema mit Slots erweitert
- [ ] Twig-Template auf Slots umgestellt  
- [ ] Drupal-Template auf {% embed %} umgestellt
- [ ] BackstopJS Test erstellt/aktualisiert
- [ ] Storybook Story aktualisiert
- [ ] Unit Tests passing
- [ ] Code Review abgeschlossen

### Pro Phase
- [ ] Alle Templates der Phase migriert
- [ ] Vollständige Test-Suite passing
- [ ] Visual Regression ohne Unterschiede
- [ ] Integration Tests passing
- [ ] Staging Deployment erfolgreich

### Gesamt-Projekt
- [ ] Alle 42+ Templates migriert
- [ ] Keine Breaking Changes für Content-Editoren
- [ ] Performance-Benchmarks unverändert/verbessert
- [ ] Vollständige Dokumentation
- [ ] Produktions-Deployment erfolgreich

## 📋 Nächste Schritte

1. **Feature Branch** `feature/sdc-hybrid-migration` erstellen
2. **Backup-Strategie** für alle Templates etablieren
3. **Phase 1** mit Accordion Component beginnen
4. **Continuous Testing** ab erstem Template
5. **Rollback-Plan** für jeden Meilenstein

---

*Erstellt am: 2025-08-07*  
*Letzte Aktualisierung: 2025-08-07*