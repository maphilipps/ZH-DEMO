# Municipal Editor Guide - Event Review Dashboard
## Gemeinde Bruchtal - Leben am See

### Übersicht
Dieses Handbuch erklärt Ihnen als Gemeindemitarbeiter/in, wie Sie das Event Review Dashboard zur effizienten Verwaltung von Veranstaltungsanmeldungen nutzen.

---

## 🎯 Zugang zum Event Review Dashboard

### Navigation
1. Melden Sie sich in der Verwaltungsoberfläche an
2. Navigieren Sie zu: **Inhalt** → **Event Review**
3. Direkter Link: `/admin/content/events/review`

### Berechtigungen
Nur Benutzer mit der Rolle **Editor** oder **Administrator** können auf das Dashboard zugreifen.

---

## 📋 Dashboard Funktionen

### Übersichtsliste
Das Dashboard zeigt alle eingereichten Veranstaltungsanmeldungen mit folgenden Informationen:

| Spalte | Beschreibung |
|--------|--------------|
| **Auswahl** | Checkbox für Bulk-Aktionen |
| **Veranstaltung** | Titel der Veranstaltung (klickbar für Details) |
| **Eingereicht von** | Name des Antragstellers |
| **Eingereicht am** | Datum und Zeit der Einreichung (DD.MM.YYYY HH:MM) |
| **Status** | Aktueller Bearbeitungsstand |
| **Aktionen** | Verfügbare Aktionen für diese Veranstaltung |

### Status-Übersicht
- **Entwurf** (Gelb): Neu eingereichte Veranstaltung, wartet auf Bearbeitung
- **Genehmigt** (Grün): Veranstaltung wurde genehmigt und ist öffentlich sichtbar
- **Abgelehnt** (Rot): Veranstaltung wurde abgelehnt und benötigt Überarbeitung

---

## ✅ Veranstaltungen genehmigen

### Einzelne Genehmigung
1. Klicken Sie auf den **Titel der Veranstaltung** um die Details zu prüfen
2. Überprüfen Sie alle Angaben:
   - Datum und Uhrzeit
   - Veranstaltungsort
   - Beschreibung
   - Erwartete Teilnehmerzahl
   - Kontaktinformationen
3. Klicken Sie auf **Bearbeiten** → **Status ändern zu: Genehmigt**
4. Speichern Sie die Änderung

### Bulk-Genehmigung
1. Wählen Sie mehrere Veranstaltungen mit den Checkboxes aus
2. Wählen Sie im Dropdown **Genehmigen**
3. Klicken Sie **Ausführen**
4. Bestätigen Sie die Aktion

**Automatische Email:** Der Antragsteller erhält automatisch eine Bestätigungs-Email in professionellem Swiss German.

---

## ❌ Veranstaltungen ablehnen

### Einzelne Ablehnung
1. Prüfen Sie die Veranstaltungsdetails sorgfältig
2. Klicken Sie auf **Bearbeiten**
3. Wählen Sie **Status ändern zu: Abgelehnt**
4. **Wichtig:** Füllen Sie das Feld **Ablehnungsgrund** aus
5. Speichern Sie die Änderung

### Bulk-Ablehnung mit Grund
1. Wählen Sie die abzulehnenden Veranstaltungen aus
2. Wählen Sie **Ablehnen** aus dem Dropdown
3. Geben Sie einen **Ablehnungsgrund** ein
4. Klicken Sie **Ausführen**

**Automatische Email:** Der Antragsteller erhält eine höfliche Ablehnungs-Email mit dem Grund und Anweisungen zur Überarbeitung.

---

## 🔍 Filter und Suche

### Verfügbare Filter
- **Status:** Filtern nach Entwurf/Genehmigt/Abgelehnt
- **Eingereicht zwischen:** Datumsbereich eingrenzen
- **Eingereicht von:** Suche nach spezifischem Antragsteller

### Sortierung
Klicken Sie auf die Spaltenüberschriften zum Sortieren:
- **Standard:** Neueste Einreichungen zuerst
- **Veranstaltung:** Alphabetisch nach Titel
- **Eingereicht von:** Alphabetisch nach Name

---

## 📧 Email-Kommunikation

### Automatische Benachrichtigungen
Das System sendet automatisch professionelle Emails:

#### Genehmigung
```
Betreff: Ihre Veranstaltungsanmeldung wurde genehmigt - Gemeinde Bruchtal

Sehr geehrte/r [Name],

Wir freuen uns, Ihnen mitteilen zu können, dass Ihre 
Veranstaltungsanmeldung "[Titel]" genehmigt wurde.

Details Ihrer Veranstaltung:
- Titel: [Veranstaltungsname]
- Datum: [DD.MM.YYYY HH:MM]

Ihre Veranstaltung ist nun öffentlich sichtbar und wird 
auf der Gemeinde-Website angezeigt.

Freundliche Grüsse
Gemeinde Bruchtal
Leben am See
```

#### Ablehnung
```
Betreff: Ihre Veranstaltungsanmeldung benötigt Überarbeitung - Gemeinde Bruchtal

Sehr geehrte/r [Name],

Vielen Dank für Ihre Veranstaltungsanmeldung "[Titel]". 
Leider können wir diese in der aktuellen Form noch nicht genehmigen.

Grund der Ablehnung:
[Ihr eingegebener Ablehnungsgrund]

Bitte überarbeiten Sie Ihre Anmeldung entsprechend und reichen 
Sie diese erneut ein. Bei Fragen stehen wir Ihnen gerne zur Verfügung.

Kontakt:
Gemeindekanzlei Gemeinde Bruchtal
Email: info@bruchtal.ch
Telefon: +41 44 123 45 67

Freundliche Grüsse
Gemeinde Bruchtal
Leben am See
```

---

## ⚖️ Genehmigungsrichtlinien

### Automatische Genehmigung
Folgende Veranstaltungen können automatisch genehmigt werden:
- **Private Anlässe** unter 50 Personen (Geburtstage, Familienfeiern)
- **Vereinsveranstaltungen** zu Standardzeiten (08:00-22:00) in Standardlokalen
- Veranstaltungen von **registrierten Vereinen** (FC Bruchtal, Turnverein, etc.)

### Manuelle Prüfung erforderlich
- **Öffentliche Veranstaltungen** (immer)
- **Kommerzielle Events** (Gewerbebewilligung prüfen)
- Veranstaltungen **ausserhalb Standardzeiten** (vor 08:00, nach 22:00)
- Events mit **mehr als 100 Teilnehmern**
- Veranstaltungen an **öffentlichen Plätzen**

### Häufige Ablehnungsgründe
- **Unvollständige Angaben** zur Veranstaltung
- **Terminkonflikt** mit anderen Gemeindeveranstaltungen
- **Zusätzliche Bewilligungen** erforderlich (Lärm, Verkehr)
- **Sicherheitsbedenken** bezüglich der geplanten Veranstaltung
- **Nachweis der Haftpflichtversicherung** fehlt
- **Verstoss gegen Ruhezeiten** (vor 08:00, nach 22:00)

---

## 🇨🇭 Swiss Compliance Standards

### eCH-0039 Event Standards
Prüfen Sie bei jeder Veranstaltung:
- ✅ **Vollständige Kontaktdaten** des Veranstalters
- ✅ **Exakte Datum/Zeit-Angaben** (DD.MM.YYYY HH:MM Format)
- ✅ **Veranstaltungsort** mit vollständiger Adresse
- ✅ **Beschreibung** der geplanten Aktivitäten
- ✅ **Erwartete Teilnehmerzahl**

### Datenschutz (CH-DSG)
- Alle Daten werden **nur für Verwaltungszwecke** verwendet
- **30-Tage Soft-Delete** bei Löschung
- **Jährliche Datenüberprüfung** erforderlich
- Keine Weitergabe an Dritte ohne Einwilligung

### Zugänglichkeit (WCAG 2.1 AA)
- Dashboard funktioniert mit **Screen Readern**
- **Tastaturnavigation** vollständig unterstützt
- **Hoher Kontrast** für bessere Lesbarkeit
- **Schriftgrösse** mindestens 16px

---

## 🔧 Fehlerbehebung

### Dashboard lädt nicht
1. Browser-Cache leeren (Ctrl+F5)
2. Andere Browser testen
3. IT-Support kontaktieren: `it@bruchtal.ch`

### Emails werden nicht versendet
1. Prüfen Sie die Email-Adresse des Antragstellers
2. Kontrollieren Sie Spam-Ordner
3. Melden Sie technische Probleme an IT-Support

### Berechtigung verweigert
1. Prüfen Sie Ihre Benutzerrolle (Editor/Administrator erforderlich)
2. Melden Sie sich ab und wieder an
3. Kontaktieren Sie Administrator: `admin@bruchtal.ch`

---

## 📞 Support Kontakte

### Technischer Support
- **Email:** it@bruchtal.ch
- **Telefon:** +41 44 123 45 67 (Durchwahl 123)
- **Verfügbarkeit:** Mo-Fr 08:00-17:00

### Verwaltung
- **Gemeindekanzlei:** info@bruchtal.ch
- **Telefon:** +41 44 123 45 67
- **Öffnungszeiten:** Mo-Fr 08:00-12:00, 13:30-17:00

---

## 📈 Statistiken und Berichte

### Monatliche Auswertung
Das System erstellt automatisch Berichte über:
- Anzahl eingereichte Veranstaltungen
- Genehmigungsquote
- Häufigste Ablehnungsgründe
- Bearbeitungszeiten

### Export-Funktionen
- **CSV-Export** aller Veranstaltungen
- **PDF-Berichte** für Gemeindeverwaltung
- **Jahresstatistiken** für Gemeinderat

---

*Letzte Aktualisierung: 20.08.2025*  
*Version: 1.0*  
*Gemeinde Bruchtal - Leben am See*