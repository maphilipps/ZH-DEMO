# TASK: Infrastrukturschäden-Meldeformular Implementation

**Status**: `ready-for-dev`
**Priority**: HIGH
**Deadline**: Demo-Präsentation GPZH
**Assigned**: Building Lane

## 📋 Requirements Specification

### Business Requirements
- **Formular**: "Meldung an die Gemeinde betreffend Infrastrukturschäden"
- **Zielgruppe**: Bürger melden Schäden an öffentlicher Infrastruktur
- **Verwaltung**: Durch Gemeindemitarbeitende ohne Programmierkenntnisse
- **Demo**: 100 Test-Einreichungen für GPZH-Präsentation

### Technical Architecture (vom drupal-solution-architect)
```
Komponenten-Stack:
├── Webform Module (Core)
├── Views (Tabellarische Darstellung)
├── Content Moderation (Workflow)
├── SDC Components (UI)
└── E-Mail Notifications
```

## 🏗️ Implementation Steps

### Phase 1: Webform Setup
1. **Webform erstellen**: `/admin/structure/webform/add`
   - Machine name: `infrastructure_damage_report`
   - Title: "Meldung Infrastrukturschäden"

2. **Felder konfigurieren**:
   ```yaml
   Kontaktdaten:
     - vorname: Textfield (required)
     - nachname: Textfield (required)
     - email: Email (required)
     - telefon: Tel (Swiss format: +41 XX XXX XX XX)
     - strasse: Textfield (eCH-0010)
     - hausnummer: Textfield (eCH-0010)
     - plz: Number (4 digits)
     - ort: Textfield

   Schadensmeldung:
     - schadensart: Select (siehe Liste unten)
     - beschreibung: Textarea (required)
     - standort: Textfield (Genaue Ortsangabe)
     - koordinaten: Geolocation (optional)
     - dringlichkeit: Radios (Niedrig/Mittel/Hoch/Notfall)
     - foto: Managed file (max 3 Bilder, 5MB)
     - datum_feststellung: Date (DD.MM.YYYY)

   Status (Admin only):
     - status: Select (Neu/In Bearbeitung/Erledigt/Abgelehnt)
     - zugewiesen_an: Entity reference (User)
     - notizen_intern: Textarea
   ```

3. **Schadenskategorien**:
   - Strassenschaden (Schlagloch, Riss, Absenkung)
   - Gehweg/Trottoir
   - Strassenbeleuchtung
   - Signalisation (Verkehrszeichen, Markierung)
   - Kanalisation/Abwasser
   - Spielplatz
   - Parkanlage/Grünfläche
   - Brücke/Unterführung
   - Öffentliches Gebäude
   - Sonstiges

### Phase 2: Workflow Configuration
1. **Status-Workflow**:
   ```
   Neu (default) → In Bearbeitung → Erledigt
                 ↓
              Abgelehnt
   ```

2. **E-Mail Templates**:
   - Eingangsbestätigung an Melder
   - Statusänderung an Melder
   - Neue Meldung an Verwaltung
   - Zuweisung an Mitarbeiter

3. **Permissions**:
   ```yaml
   Anonymous:
     - Create webform submission
   
   Authenticated:
     - Create webform submission
     - View own submissions
   
   Redakteur:
     - View all submissions
     - Edit submission status
     - Add internal notes
   
   Administrator:
     - Full access
   ```

### Phase 3: Views Dashboard
1. **Übersichtstabelle** (`/admin/infrastruktur-schaeden`):
   - Columns: ID, Datum, Schadensart, Ort, Status, Dringlichkeit, Zugewiesen
   - Filters: Status, Schadensart, Dringlichkeit, Zeitraum
   - Bulk operations: Status ändern, Zuweisen, Export

2. **Statistik-Dashboard**:
   - Schäden nach Kategorie (Pie Chart)
   - Status-Verteilung (Bar Chart)
   - Zeitlicher Verlauf (Line Chart)
   - Durchschnittliche Bearbeitungszeit

### Phase 4: Test Data Generation
```bash
# Drush command für 100 Test-Einreichungen
drush zh-demo:generate-infrastructure-reports 100

# Lord of the Rings Theme:
- Théoden meldet Schlagloch am Rohan-Platz
- Gandalf: Defekte Beleuchtung Bruchtal-Weg
- Aragorn: Beschädigte Brücke über Anduin
- Legolas: Spielplatz Düsterwald renovierungsbedürftig
- Gimli: Kanaldeckel lose bei Moria-Strasse
```

### Phase 5: SDC Integration
1. **Form Embed Component**:
   ```twig
   {% include 'adesso_cms_theme:infrastructure-form' with {
     title: 'Schaden melden',
     form: webform_entity
   } %}
   ```

2. **Status Badge Component**:
   ```twig
   {% include 'adesso_cms_theme:status-badge' with {
     status: submission.status,
     variant: status_color_map[submission.status]
   } %}
   ```

## ✅ Acceptance Criteria

### Functional
- [ ] Formular kann von Bürgern ohne Login ausgefüllt werden
- [ ] Alle Pflichtfelder haben Validierung
- [ ] Foto-Upload funktioniert (max 3 Bilder, je 5MB)
- [ ] E-Mail-Bestätigung wird versendet
- [ ] Status-Workflow funktioniert vollständig
- [ ] Tabellarische Übersicht mit Filtern
- [ ] CSV-Export möglich
- [ ] 100 Test-Datensätze vorhanden

### Non-Functional
- [ ] Performance: < 2 Sekunden Ladezeit
- [ ] Mobile responsive
- [ ] WCAG 2.1 AA compliant
- [ ] Swiss eCH-0010 Adressformat
- [ ] Datenschutz: SSL, keine Daten in Logs

### Demo Requirements
- [ ] Formular live ausfüllbar in Demo
- [ ] Status-Änderung demonstrierbar
- [ ] Filter und Suche funktioniert
- [ ] Statistik-Dashboard zeigt Daten
- [ ] Test-Daten mit LOTR-Referenzen

## 🚀 Commands & URLs

```bash
# Webform erstellen
ddev drush webform:generate infrastructure_damage_report

# Test-Daten generieren
ddev drush zh-demo:generate-infrastructure-reports 100

# Cache clear
ddev drush cr

# URLs
- Formular: /form/infrastructure-damage-report
- Dashboard: /admin/infrastructure-damage
- Statistik: /admin/reports/infrastructure
```

## 📦 Dependencies
- Webform module (enabled)
- Views (core)
- Content Moderation (core)
- Geolocation module (optional)
- Charts module (für Statistiken)

## 🎯 Success Metrics
- Formular in < 30 Sekunden ausfüllbar
- Verwaltung findet Meldungen in < 5 Sekunden
- Status-Update in < 10 Sekunden
- 0 Fehler bei 100 Test-Submissions

---

**Ready for Building Lane Implementation**

Koordination: @building-lane-orchestrator
Implementierung: @drupal-11-lead-developer + @municipality-portal-specialist
Review: @swiss-compliance-specialist + @qa-testing-specialist