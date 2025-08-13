# BackstopJS Screenshots Übersicht

## Screenshot-Verzeichnisse

Die BackstopJS Screenshots befinden sich unter:

```
web/backstop_data/
├── bitmaps_reference/     # Referenz-Screenshots (Baseline)
├── bitmaps_test/         # Test-Screenshots (aktuelle Aufnahmen)
└── html_report/          # HTML-Report für Vergleiche
```

## Screenshot-Typen

### Vollseitige Screenshots
- **Landing Pages**:
  - `adesso-cms_Landing_Page_-_Welcome_adesso_CMS_*`
  - `adesso-cms_Landing_Page_-_Landing_Page_Demo_*`
- **Basic Pages**:
  - `adesso-cms_Basic_Page_-_Our_Product_Vision_*`
  - `adesso-cms_Basic_Page_-_Events_*`

### Header-Komponenten Screenshots
- **Landing Page Headers**: 
  - `adesso-cms_Header_Component_-_Landing_Page_*`
- **Basic Page Headers**:
  - `adesso-cms_Header_Component_-_Basic_Page_*`

## Viewports

Jeder Screenshot wird in zwei Größen erstellt:
- **Mobile**: 375px x 667px (`*_0_mobile.png`)
- **Desktop**: 1920px x 1080px (`*_1_desktop.png`)

## Wichtige Kommandos

```bash
# Neue Referenz-Screenshots erstellen (vor Änderungen!)
ddev backstop reference

# Test gegen Referenz ausführen
ddev backstop test

# Änderungen genehmigen (neue Baseline setzen)
ddev backstop approve

# HTML-Report öffnen
open web/backstop_data/html_report/index.html
```

## Timing-Konfiguration

- **Delay**: 5000ms (5 Sekunden) - wartet auf Vite und Asset-Loading
- **ReadySelector**: `img, .site-header, nav` - wartet auf wichtige Elemente
- **Full-Page Screenshots**: Automatisches Scrollen für vollständige Erfassung
- **Image Loading**: Wartet auf alle Bilder inklusive lazy-loaded content
- **Async Limits**: Optimal für Performance konfiguriert

## Screenshot-Verbesserungen

✅ **Vollständige Seitenhöhe**: Erfasst die komplette Seite, nicht nur den Viewport  
✅ **Vite-Kompatibilität**: 5 Sekunden Wartezeit für Asset-Loading  
✅ **Lazy Loading**: Automatisches Scrollen triggert alle Inhalte  
✅ **Stabile Screenshots**: Deaktivierte Animationen für konsistente Ergebnisse  
✅ **CORS-Fix**: Container-interne Domains in Vite CORS konfiguriert

## Vite CORS Konfiguration

BackstopJS greift über die interne Container-Domain `http://web/` zu. 
Folgende Domains sind in `vite.config.ts` für CORS erlaubt:

```typescript
cors: {
  origin: [
    /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,  // DDEV-Domains
    /https?:\/\/web(:\d+)?$/,                                   // Container 'web'
    /https?:\/\/172\.19\.0\.\d+(:\d+)?$/,                      // Container-IPs
    /https?:\/\/adesso-cms-web(:\d+)?$/                        // Container-Name
  ]
}
```

## Workflow

1. **Vor Änderungen**: `ddev backstop reference` ausführen
2. **Nach Änderungen**: `ddev backstop test` zur Überprüfung
3. **Bei gewollten Änderungen**: `ddev backstop approve` für neue Baseline
4. **Bei ungewollten Änderungen**: Code korrigieren und erneut testen