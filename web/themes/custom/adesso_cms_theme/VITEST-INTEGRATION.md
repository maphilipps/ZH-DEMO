# Vitest Integration für adesso CMS

## Übersicht

Diese Dokumentation beschreibt die Vitest-Integration für Storybook-basierte Component-Tests im adesso CMS Theme.

## Features

### 1. Storybook Vitest Addon
- **Addon**: `@storybook/experimental-addon-test`
- **Integration**: Vitest-Tests direkt in Storybook-UI
- **Konfiguration**: Automatische Story-basierte Test-Generierung

### 2. Automatische Test-Hooks
- **File Watching**: Automatische Test-Ausführung bei Component-Änderungen
- **Debouncing**: 500ms Verzögerung zur Vermeidung exzessiver Test-Läufe
- **File Types**: `.stories.js`, `.twig`, `.scss`, `.behavior.js`, `.component.yml`

### 3. QA-Integration
- **QA Agent Support**: Automatische Vitest-Ausführung in QA-Workflows
- **Coverage Reports**: Test-Coverage-Berichte für Component-Stories
- **Quality Gates**: Integration in 4-Phasen Enhanced Workflow

## Verfügbare Commands

### Grundlegende Test-Commands
```bash
ddev theme test              # Vitest im Watch-Modus
ddev theme test:stories      # Alle Story-Tests ausführen
ddev theme test:coverage     # Tests mit Coverage-Report
ddev theme test:ui           # Vitest UI öffnen
```

### Watch-Commands
```bash
ddev theme test:watch                # Vitest Watch-Modus
ddev theme test:watch:components     # Component-File-Watcher für Tests
ddev theme watch:with-tests          # Vollständiger Watch mit Tests
```

### QA-Commands
```bash
ddev theme qa:validate      # QA-Validation mit Vitest
```

## File Watching Details

### Überwachte Dateien
- `components/**/*.stories.js` - Storybook Stories
- `components/**/*.twig` - Component Templates  
- `components/**/*.scss` - Component Styles
- `components/**/*.behavior.js` - Component JavaScript
- `components/**/*.component.yml` - SDC Schema Definitionen

### Debouncing
- **Verzögerung**: 500ms nach letzter Dateiänderung
- **Grund**: Verhindert exzessive Test-Läufe bei schnellen Änderungen
- **Konfiguration**: In package.json `--debounce 500` Parameter

## Storybook Integration

### Addon-Konfiguration
Das Vitest-Addon ist in `.storybook/main.cjs` konfiguriert:
```javascript
addons: [
  // ... andere Addons
  getAbsolutePath('@storybook/experimental-addon-test'),
]
```

### Test-Setup
Die Vitest-Konfiguration in `vitest.config.js` verwendet das Storybook-Plugin:
```javascript
plugins: [
  storybookTest({
    storybookScript: 'npm run storybook:test'
  })
]
```

## QA-Workflow Integration

### Phase 3: Comprehensive Validation
- **Vitest-Ausführung**: Parallel zu Playwright und Accessibility-Tests
- **Coverage-Validation**: Minimum 80% Story-Coverage, 70% Component-Coverage
- **Results-Integration**: Aggregierte Quality-Reports

### Agent-Koordination
- **qa-playwright-expert**: Koordiniert Vitest + Playwright
- **a11y-review-specialist**: Accessibility-Tests in Stories
- **end-to-end-validator**: Umfassende Validation mit Vitest-Results

## Performance

### Execution Targets
- **Complete Test Suite**: <2 Minuten
- **Individual Component**: <10 Sekunden
- **Test Startup**: <30 Sekunden

### Resource Limits
- **Memory**: <1GB während Test-Ausführung
- **CPU**: <90% Peak, <20% Idle
- **DDEV Resources**: <80% Container-Auslastung

## Coverage Requirements

### Minimum Thresholds
- **Story Coverage**: ≥80% aller SDC Components
- **Component Coverage**: ≥70% definierter Interaktionen
- **Regression Coverage**: Alle kritischen User-Workflows

### Coverage Reports
```bash
ddev theme test:coverage     # Generiert Coverage-Report
```

## Troubleshooting

### Häufige Probleme

#### 1. Browser Dependencies fehlen
```bash
ddev exec "npx playwright install-deps"
ddev exec "npx playwright install"
```

#### 2. Test-Failures
- Überprüfe Story-Format und Component-Schema
- Validiere Storybook-Konfiguration
- Teste Component-Isolation

#### 3. Performance-Probleme
- Reduziere parallel Tests
- Überprüfe DDEV-Resources
- Nutze Test-Caching

### Debug-Commands
```bash
ddev theme test --reporter=verbose    # Detaillierte Test-Ausgabe
ddev theme test:ui                    # Vitest UI für Debugging
ddev logs                             # DDEV Container-Logs
```

## Best Practices

### Story-Development
1. **Isolation**: Stories sollten isoliert testbar sein
2. **Args**: Nutze Story-Args für verschiedene Test-Szenarien
3. **Interactions**: Implementiere User-Interaktionen in Stories
4. **Accessibility**: Inkludiere A11y-Tests in Story-Definitionen

### Component-Testing
1. **Schema-Validation**: Teste Component.yml Schema-Compliance
2. **Template-Rendering**: Validiere Twig-Template-Output
3. **Style-Integration**: Teste CSS/SCSS-Integration
4. **Behavior-Testing**: Validiere JavaScript-Verhalten

### Performance-Optimization
1. **Selective Testing**: Teste nur geänderte Components wenn möglich
2. **Parallel Execution**: Nutze parallele Test-Ausführung optimal
3. **Caching**: Implementiere Test-Result-Caching
4. **Resource Monitoring**: Überwache DDEV-Resource-Usage

## Weiterführende Links

- [Storybook Vitest Addon Docs](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
- [Vitest Configuration](https://vitest.dev/config/)
- [adesso CMS Component Guidelines](./CLAUDE.md)
- [DDEV Documentation](https://ddev.readthedocs.io/)