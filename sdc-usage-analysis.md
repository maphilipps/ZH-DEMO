# SDC Komponenten Nutzungsanalyse - adesso CMS Theme

## Verfügbare SDC-Komponenten (45 gesamt)

```
accordion, accordion-item, alerts, badge, block-reference, button, card, card-group, carousel, carousel-item, divider, download, download-item, embed, gallery, gallery-item, heading, hero, image, logo, logo-block, logo-collection, main-menu, media, modal, newsletter-form, pager, popover, pricing, pricing-card, recent-card-item, recent-cards, rich-text, shadow, sidebyside, site-footer, site-header, slider, slider-item, stat-card, text, video
```

## GENUTZTE Komponenten (31)

### Über Drupal Paragraph-Typen (21)
- accordion (paragraphs.paragraphs_type.accordion.yml)
- accordion_item (paragraphs.paragraphs_type.accordion_item.yml) 
- card (paragraphs.paragraphs_type.card.yml)
- card_group (paragraphs.paragraphs_type.card_group.yml)
- carousel (paragraphs.paragraphs_type.carousel.yml)
- carousel_item (paragraphs.paragraphs_type.carousel_item.yml)
- embed (paragraphs.paragraphs_type.embed.yml)
- gallery (paragraphs.paragraphs_type.gallery.yml)
- hero (paragraphs.paragraphs_type.hero.yml)
- logo_collection (paragraphs.paragraphs_type.logo_collection.yml)
- media (paragraphs.paragraphs_type.media.yml)
- newsletter-form (paragraphs.paragraphs_type.newsletter.yml)
- pricing (paragraphs.paragraphs_type.pricing.yml)
- pricing_card (paragraphs.paragraphs_type.pricing_card.yml)
- sidebyside (paragraphs.paragraphs_type.sidebyside.yml)
- slider (paragraphs.paragraphs_type.slider.yml)
- slider_item (paragraphs.paragraphs_type.slider_item.yml)
- stat-card (paragraphs.paragraphs_type.stats_item.yml)
- text (paragraphs.paragraphs_type.text.yml)
- download-item (über paragraph templates)
- block-reference (über paragraph templates)

### Über Theme-Templates (4)
- button (block--system-branding-block.html.twig, page-title.html.twig)
- heading (page-title.html.twig, node--article--full.html.twig) 
- logo (block--system-branding-block.html.twig)
- site-footer (block--footer.html.twig)

### Über Komponenten-Includes (6)
- gallery-item (von gallery.twig)
- main-menu (von site-header.twig)
- pager (von pager templates)
- recent-card-item, recent-cards (von node templates)
- site-header (von region--header.html.twig)

## UNGENUTZTE Komponenten (14 - können gelöscht werden)

### Ohne Drupal-Integration
- **alerts** - Nur Storybook, keine Drupal-Integration
- **badge** - Nur Storybook, keine Drupal-Integration  
- **divider** - Nur Storybook, keine Drupal-Integration
- **image** - Nur Storybook, keine Drupal-Integration
- **modal** - Nur Storybook, keine Drupal-Integration
- **popover** - Nur Storybook, keine Drupal-Integration
- **rich-text** - Nur Storybook, keine Drupal-Integration
- **shadow** - Nur Storybook, keine Drupal-Integration
- **video** - Nur Storybook, keine Drupal-Integration

### Veraltete/Überflüssige Komponenten
- **download** - Ersetzt durch download-item
- **logo-block** - Ersetzt durch logo-collection
- **bullet** - Paragraph-Typ existiert, aber keine SDC-Komponente

### Fragmentierte Komponenten  
- **views** - Paragraph-Typ existiert, aber keine entsprechende SDC-Komponente

## Empfohlene Aktionen

### 1. Sofort löschbar (9 Komponenten)
```bash
rm -rf web/themes/custom/adesso_cms_theme/components/{alerts,badge,divider,image,modal,popover,rich-text,shadow,video}
```

### 2. Zu prüfen und vermutlich löschbar (5 Komponenten)
- **download** - Prüfen ob noch irgendwo verwendet
- **logo-block** - Prüfen ob noch irgendwo verwendet  
- **bullet** - Paragraph ohne SDC - konsistent machen oder löschen
- **views** - SDC ohne Paragraph - konsistent machen oder löschen

### 3. Storybook Stories bereinigen
- Alle gelöschten Komponenten aus Storybook-Navigation entfernen
- Fehlerhafte Twig-Imports in bestehenden Stories reparieren

## Validierung mit Vitest

Zur finalen Verifikation sollte das Vitest-Addon für Storybook implementiert werden:

```bash
npm install --save-dev @storybook/experimental-addon-test vitest
```

Dies erlaubt automatisierte Tests aller Stories um sicherzustellen, dass nur funktionierende Komponenten verbleiben.