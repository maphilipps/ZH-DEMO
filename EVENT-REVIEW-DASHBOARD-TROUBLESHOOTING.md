# Event Review Dashboard - Troubleshooting Guide
## GPZH Präqualifikation - Gemeinde Bruchtal (PR #11)
### Problemlösung und technische Unterstützung

---

## 🎯 Übersicht

Diese Anleitung hilft bei der Diagnose und Lösung häufiger Probleme mit dem Event Review Dashboard. Sie richtet sich an IT-Verantwortliche, Systemadministratoren und technische Ansprechpartner in den Gemeinden.

### Problemkategorien
- **🚨 Kritische Fehler:** System nicht erreichbar
- **⚠️ Funktionale Probleme:** Features funktionieren nicht
- **🔧 Konfigurationsfehler:** Falsche Einstellungen
- **📧 Email-Probleme:** Benachrichtigungen funktionieren nicht
- **🐌 Performance-Probleme:** System reagiert langsam
- **👥 Berechtigungsfehler:** Zugriff verweigert

---

## 🚨 Kritische System-Probleme

### Problem: Dashboard komplett nicht erreichbar

#### Symptome:
- 404 Error beim Aufruf von `/admin/content/events/review`
- "Page not found" oder "Access denied"
- Kompletter Server-Ausfall

#### Diagnose:
```bash
# Prüfen ob DDEV läuft
ddev status

# Website-Status prüfen
curl -I https://bruchtal.zh-demo.ddev.site/

# Route existiert?
ddev drush route:get event_review.dashboard

# Module aktiviert?
ddev drush pm:list | grep event_review
```

#### Lösungen:

**Solution 1: DDEV Container Problem**
```bash
# Container neu starten
ddev restart

# Bei persistenten Problemen: Rebuild
ddev rebuild

# Logs prüfen
ddev logs web
```

**Solution 2: Module nicht aktiviert**
```bash
# Event Review Module aktivieren
ddev drush en event_review -y

# Dependencies prüfen
ddev drush en views_bulk_operations content_moderation -y

# Configuration importieren
ddev drush cim -y

# Caches leeren
ddev drush cr
```

**Solution 3: Routing-Problem**
```bash
# Router rebuild
ddev drush php:eval "\Drupal::service('router.builder')->rebuild();"

# Permissions rebuild
ddev drush php:eval "drupal_flush_all_caches();"
```

### Problem: White Screen of Death (WSOD)

#### Symptome:
- Leere weisse Seite beim Dashboard-Aufruf
- Keine Fehlermeldung sichtbar
- Andere Seiten funktionieren

#### Diagnose:
```bash
# PHP Fehler-Logs prüfen
ddev logs web | grep ERROR

# Drupal Logs prüfen
ddev drush watchdog:show --severity=error

# Memory Limit prüfen
ddev exec php -i | grep memory_limit
```

#### Lösungen:

**Solution 1: Memory-Problem**
```bash
# Memory Limit erhöhen in .ddev/config.yaml
# php_version: "8.3"
# webserver_type: apache-fpm
# phpmyadmin_enabled: true
# additional_hostnames: []
# additional_fqdns: []
# mariadb_version: "10.11"
# nodejs_version: "18"
# timezone: Europe/Zurich
# php_memory_limit: "512M"  # Erhöhen auf 1G

ddev restart
```

**Solution 2: Views Cache Problem**
```bash
# Views Caches spezifisch leeren
ddev drush views:rebuild

# Alle Caches aggressiv leeren
ddev drush cr views
ddev drush cr container
ddev drush cr config
```

**Solution 3: Database-Problem**
```bash
# Database Updates laufen
ddev drush updb -y

# Entity Schema Updates
ddev drush entup -y

# Field purge falls nötig
ddev drush field:purge
```

---

## ⚠️ Dashboard Funktions-Probleme

### Problem: Events werden nicht angezeigt

#### Symptome:
- Dashboard lädt, aber zeigt keine Events
- "Keine Inhalte verfügbar" Meldung
- Leere Tabelle trotz vorhandener Events

#### Diagnose:
```bash
# Prüfen ob Events existieren
ddev drush entity:count node event

# View Configuration prüfen
ddev drush config:get views.view.event_review_dashboard

# View Preview testen
ddev drush views:preview event_review_dashboard
```

#### Lösungen:

**Solution 1: View Filter-Problem**
```bash
# View Configuration neu importieren
ddev drush config:import --partial views.view.event_review_dashboard

# View Cache leeren
ddev drush views:rebuild event_review_dashboard

# Views Data Tables rebuild
ddev drush php:eval "drupal_flush_all_caches();"
```

**Solution 2: Content Moderation States**
```bash
# Moderation States prüfen
ddev drush config:get workflows.workflow.event_approval

# Events mit korrektem Status erstellen
ddev drush entity:create node \
  --bundle=event \
  --title="Test Event" \
  --moderation_state="draft"
```

**Solution 3: Permissions-Problem**
```bash
# View-spezifische Permissions prüfen
ddev drush user:role:list editor

# Permissions neu setzen
ddev drush config:set user.role.editor permissions.+ "access event review dashboard"
```

### Problem: Bulk Operations funktionieren nicht

#### Symptome:
- Checkboxes nicht sichtbar
- "Ausführen" Button nicht funktional
- VBO Actions werden nicht angezeigt

#### Diagnose:
```bash
# VBO Module Status
ddev drush pm:list | grep views_bulk_operations

# VBO Actions registriert?
ddev drush debug:plugin action | grep event

# View VBO Configuration
ddev drush config:get views.view.event_review_dashboard display.default.display_options.fields.views_bulk_operations_bulk_form
```

#### Lösungen:

**Solution 1: VBO Module Problem**
```bash
# VBO neu installieren
composer require drupal/views_bulk_operations:^4.3
ddev drush en views_bulk_operations -y

# VBO Actions registrieren
ddev drush cache:rebuild
```

**Solution 2: Custom Actions nicht gefunden**
```bash
# Event Review Module Actions prüfen
ls -la web/modules/custom/event_review/src/Plugin/Action/

# Services neu laden
ddev drush php:eval "\Drupal::service('kernel')->rebuildContainer();"

# Plugin Cache leeren
ddev drush cache:rebuild container
```

**Solution 3: View Configuration korrupt**
```bash
# View komplett neu importieren
ddev drush config:delete views.view.event_review_dashboard
ddev drush config:import --partial views.view.event_review_dashboard

# Oder manuell reparieren über UI:
# /admin/structure/views/view/event_review_dashboard
```

---

## 📧 Email-System Probleme

### Problem: Emails werden nicht versendet

#### Symptome:
- Nach Approve/Reject keine Email beim Antragsteller
- "Email sent" Bestätigung, aber Email kommt nicht an
- Emails landen im Spam

#### Diagnose:
```bash
# Mail System Status prüfen
ddev drush config:get system.mail

# Recent Mail Logs
ddev logs web | grep -i mail

# Test Email senden
ddev drush php:eval "
\$result = \Drupal::service('plugin.manager.mail')->mail(
  'event_review', 
  'event_approved', 
  'test@example.com', 
  'de', 
  ['event_title' => 'Test Event', 'user_name' => 'Test User']
);
print_r(\$result);
"
```

#### Lösungen:

**Solution 1: SMTP Konfiguration (Production)**
```bash
# SMTP Module installieren falls nicht vorhanden
composer require drupal/smtp
ddev drush en smtp -y

# SMTP Einstellungen für Gemeinde Bruchtal:
# Server: mail.bruchtal.ch
# Port: 587 (STARTTLS) oder 465 (SSL)
# Username: noreply@bruchtal.ch
# Authentication: Login
```

**Solution 2: Development Email Testing**
```bash
# Mailhog für lokale Entwicklung
# DDEV hat Mailhog bereits integriert
# Zugang: https://zh-demo.ddev.site:8026

# Alle Emails werden hier angezeigt
# Kein echter Versand in Development
```

**Solution 3: Email Templates Problem**
```bash
# Template Hooks prüfen
grep -r "hook_mail" web/modules/custom/event_review/

# Template Reload
ddev drush cache:rebuild theme

# Template Debugging aktivieren
ddev config --xdebug-enabled=true
```

### Problem: Email-Inhalte falsch/leer

#### Symptome:
- Emails kommen an, aber ohne Inhalt
- Falsche Sprache (English statt Swiss German)
- Municipal Branding fehlt

#### Diagnose:
```bash
# Mail Templates prüfen
grep -A 20 -B 5 "event_approved\|event_rejected" web/modules/custom/event_review/event_review.module

# Language Settings
ddev drush config:get system.site default_langcode

# Mail Variables verfügbar?
ddev drush php:eval "
\$node = \Drupal\node\Entity\Node::load(1);
if (\$node) {
  print 'Event found: ' . \$node->getTitle();
  print 'Email: ' . \$node->getOwner()->getEmail();
}
"
```

#### Lösungen:

**Solution 1: Template Variables**
```bash
# Event Review Module Email Templates prüfen
# In event_review.module sollten sein:
# - event_review_mail_event_approved()
# - event_review_mail_event_rejected()

# Module Code prüfen:
cat web/modules/custom/event_review/event_review.module | grep -A 30 "function.*mail"
```

**Solution 2: Swiss German Localization**
```bash
# German Language Pack installieren falls fehlt
composer require drupal/language
ddev drush en language locale -y

# Swiss German als Default
ddev drush config:set system.site default_langcode de

# Interface Translation
ddev drush locale:update
```

---

## 🔧 Konfigurationsfehler

### Problem: Permissions "Access denied"

#### Symptome:
- "Sie haben keine Berechtigung diese Seite zu sehen"
- Dashboard URL returns 403 Forbidden
- Editor-Rolle funktioniert nicht

#### Diagnose:
```bash
# User Roles prüfen
ddev drush user:role:list

# Editor Permissions prüfen
ddev drush config:get user.role.editor permissions

# Custom Permissions definiert?
cat web/modules/custom/event_review/event_review.permissions.yml

# User hat richtige Rolle?
ddev drush user:info admin
```

#### Lösungen:

**Solution 1: Permissions neu setzen**
```bash
# Event Review Permissions für Editor
ddev drush user:role:add-perm editor "access event review dashboard"
ddev drush user:role:add-perm editor "use event_approval transition approve"  
ddev drush user:role:add-perm editor "use event_approval transition reject"

# Permissions Cache leeren
ddev drush cache:rebuild permissions
```

**Solution 2: Role Assignment**
```bash
# Test User mit Editor Rolle erstellen
ddev drush user:create test_editor \
  --mail="test@bruchtal.ch" \
  --password="SecurePass123!"

# Editor Rolle zuweisen
ddev drush user:role:add editor test_editor

# Login Link generieren
ddev drush uli --name=test_editor --uri=bruchtal.zh-demo.ddev.site
```

**Solution 3: Custom Permissions Module Problem**
```bash
# Permissions.yml Syntax prüfen
cat web/modules/custom/event_review/event_review.permissions.yml

# Module neu aktivieren um Permissions zu registrieren
ddev drush dis event_review -y
ddev drush en event_review -y
ddev drush cr
```

### Problem: Workflow States funktionieren nicht

#### Symptome:
- Status-Änderung nicht möglich
- "Genehmigen" / "Ablehnen" Buttons fehlen
- Moderation States zeigen falsche Werte

#### Diagnose:
```bash
# Workflow Configuration prüfen
ddev drush config:get workflows.workflow.event_approval

# Content Type hat Moderation?
ddev drush config:get node.type.event third_party_settings.content_moderation

# Transitions verfügbar?
ddev drush config:get workflows.workflow.event_approval type_settings.states
```

#### Lösungen:

**Solution 1: Workflow Configuration**
```bash
# Workflow komplett neu importieren
ddev drush config:import --partial workflows.workflow.event_approval

# Content Type Moderation aktivieren
ddev drush config:set node.type.event third_party_settings.content_moderation.enabled true
ddev drush config:set node.type.event third_party_settings.content_moderation.allowed_moderation_states.0 draft
ddev drush config:set node.type.event third_party_settings.content_moderation.allowed_moderation_states.1 published  
ddev drush config:set node.type.event third_party_settings.content_moderation.allowed_moderation_states.2 rejected
ddev drush config:set node.type.event third_party_settings.content_moderation.default_moderation_state draft
```

**Solution 2: Content Moderation Module**
```bash
# Content Moderation Dependencies
ddev drush en content_moderation workflows -y

# Entity Schema Updates nach Moderation
ddev drush entup -y

# Moderation Cache rebuild
ddev drush cache:rebuild container
```

---

## 🐌 Performance-Probleme

### Problem: Dashboard lädt sehr langsam

#### Symptome:
- >5 Sekunden Ladezeit für Dashboard
- Timeout Errors bei vielen Events
- Browser "hängt" beim Laden

#### Diagnose:
```bash
# Performance Profiling
ddev exec curl -w "@/curl-format.txt" -o /dev/null -s "https://bruchtal.zh-demo.ddev.site/admin/content/events/review"

# Database Query Performance
ddev drush sqlq "SHOW PROCESSLIST;"

# Views Query Debug
ddev drush views:analyze event_review_dashboard

# Server Load
ddev exec top
```

#### Lösungen:

**Solution 1: Database Optimization**
```bash
# Views Query Optimization
# Index für häufig verwendete Filter:

ddev drush sqlq "
CREATE INDEX idx_event_moderation_state 
ON node_field_data (type, moderation_state);

CREATE INDEX idx_event_created 
ON node_field_data (type, created);

CREATE INDEX idx_event_owner
ON node_field_data (type, uid);
"
```

**Solution 2: Views Configuration**
```bash
# Paging aktivieren um Speicher zu sparen
ddev drush config:set views.view.event_review_dashboard display.default.display_options.pager.type mini

# Items per page limitieren
ddev drush config:set views.view.event_review_dashboard display.default.display_options.pager.options.items_per_page 50

# Cache aktivieren
ddev drush config:set views.view.event_review_dashboard display.default.display_options.cache.type tag
```

**Solution 3: Server-Optimierung**
```bash
# PHP Memory für DDEV erhöhen
echo "web_environment:
  - PHP_MEMORY_LIMIT=1G" >> .ddev/config.yaml

ddev restart

# OPcache aktivieren (Production)
# opcache.enable=1
# opcache.memory_consumption=128
# opcache.max_accelerated_files=10000
```

### Problem: Bulk Operations dauern sehr lange

#### Symptome:
- Timeout bei >20 Events gleichzeitig
- "Maximum execution time exceeded"
- Nur Teil der Events wird verarbeitet

#### Diagnose:
```bash
# PHP Execution Time
ddev exec php -i | grep max_execution_time

# Memory Usage während Bulk Operations
ddev logs web | grep "Fatal error"

# VBO Queue Status
ddev drush queue:list
```

#### Lösungen:

**Solution 1: Batch Processing**
```bash
# VBO Batch Settings optimieren
# In views.view.event_review_dashboard:
# views_bulk_operations_bulk_form:
#   batch: true
#   batch_size: 10

ddev drush config:set views.view.event_review_dashboard display.default.display_options.fields.views_bulk_operations_bulk_form.batch true
ddev drush config:set views.view.event_review_dashboard display.default.display_options.fields.views_bulk_operations_bulk_form.batch_size 10
```

**Solution 2: PHP Limits erhöhen**
```bash
# .ddev/config.yaml erweitern:
# web_environment:
#   - PHP_MAX_EXECUTION_TIME=300
#   - PHP_MEMORY_LIMIT=1G

echo "web_environment:
  - PHP_MAX_EXECUTION_TIME=300
  - PHP_MEMORY_LIMIT=1G" >> .ddev/config.yaml

ddev restart
```

---

## 👥 User Management Probleme

### Problem: Neue Editor können sich nicht anmelden

#### Symptome:
- Login schlägt fehl trotz korrekter Daten
- "Unbekannter Benutzername oder falsches Passwort"
- Account existiert aber funktioniert nicht

#### Diagnose:
```bash
# User Account prüfen
ddev drush user:info username

# Account Status
ddev drush sqlq "SELECT uid, name, mail, status, created FROM users_field_data WHERE name='username';"

# Login Attempts (falls Flood Control)
ddev drush sqlq "SELECT * FROM flood WHERE event='user.http_login';"
```

#### Lösungen:

**Solution 1: Account Status**
```bash
# Account aktivieren falls blockiert
ddev drush user:unblock username

# Status überprüfen
ddev drush user:info username

# Bei Bedarf Password zurücksetzen
ddev drush user:password username "NewSecurePassword123!"
```

**Solution 2: Flood Control Problem**
```bash
# Flood Entries löschen
ddev drush sqlq "DELETE FROM flood WHERE event='user.http_login';"

# IP-basierte Flood Control prüfen
ddev drush sqlq "DELETE FROM flood WHERE event='user.failed_login_ip';"

# Cache nach Flood-Reset leeren
ddev drush cr
```

**Solution 3: Role Assignment Problem**
```bash
# Editor Rolle explizit zuweisen
ddev drush user:role:add editor username

# Permissions nach Role-Change
ddev drush cache:rebuild permissions

# User Login Test
ddev drush uli --name=username --uri=bruchtal.zh-demo.ddev.site
```

---

## 🔍 Debugging Tools & Methoden

### Debug Mode aktivieren

```bash
# Drupal Debug Mode
ddev drush config:set system.logging error_level verbose

# Twig Debug aktivieren
ddev drush config:set system.logging error_level verbose
echo '$settings["twig_debug"] = TRUE;' >> web/sites/default/settings.local.php

# Development Services
cp web/sites/example.settings.local.php web/sites/default/settings.local.php
```

### Log Analysis

```bash
# Drupal Watchdog Logs
ddev drush watchdog:show --count=50 --severity=error

# Webserver Error Logs
ddev logs web | grep ERROR | tail -20

# Database Slow Query Log
ddev logs db | grep "Query_time" | tail -10

# Mail System Logs
ddev logs web | grep -i mail | tail -10
```

### Database Debugging

```bash
# Event Review spezifische Queries
ddev drush sqlq "
SELECT n.nid, n.title, n.status, fm.moderation_state, n.created 
FROM node_field_data n 
LEFT JOIN content_moderation_state_field_data fm ON n.nid = fm.content_entity_id 
WHERE n.type = 'event' 
ORDER BY n.created DESC 
LIMIT 10;
"

# User Permissions Check
ddev drush sqlq "
SELECT r.rid, r.label, p.permission 
FROM user__roles ur 
JOIN config c ON CONCAT('user.role.', ur.roles_target_id) = c.name 
JOIN user_role r ON ur.roles_target_id = r.id
JOIN role_permission p ON r.id = p.rid
WHERE ur.entity_id = 1 AND p.permission LIKE '%event%';
"
```

### Module-spezifisches Debugging

```bash
# Event Review Module Status
ddev drush pm:info event_review

# Services Registry
ddev drush debug:container | grep event

# Plugin Discovery
ddev drush debug:plugin action | grep -i event

# Route Information
ddev drush debug:route | grep event_review
```

---

## 📋 Diagnostik-Checkliste

### Grundlegende System-Prüfung
- [ ] **DDEV Status:** `ddev status` zeigt "running"
- [ ] **Drupal Bootstrap:** Website lädt ohne Fehler
- [ ] **Module aktiv:** `event_review` und `views_bulk_operations` enabled
- [ ] **Configuration:** Workflow und View konfiguriert
- [ ] **Permissions:** Editor Role hat korrekte Berechtigungen

### Dashboard-spezifische Prüfung
- [ ] **Route erreichbar:** `/admin/content/events/review` lädt
- [ ] **Events sichtbar:** Mindestens Testdaten werden angezeigt
- [ ] **Filter funktional:** Status-Filter verändert Ergebnisse
- [ ] **VBO verfügbar:** Checkboxes und Actions dropdown vorhanden
- [ ] **Einzelaktionen:** Approve/Reject für individuelle Events funktioniert

### Email-System Prüfung
- [ ] **SMTP konfiguriert:** Mail-Settings sind korrekt
- [ ] **Templates geladen:** Email-Templates in Swiss German verfügbar
- [ ] **Test erfolgreich:** Test-Email kommt korrekt an
- [ ] **Variables funktional:** Placeholders werden korrekt ersetzt
- [ ] **Branding vorhanden:** Gemeinde Bruchtal Kontaktdaten enthalten

### Performance-Prüfung
- [ ] **Ladezeit <3s:** Dashboard lädt in akzeptabler Zeit
- [ ] **Bulk Operations:** >10 Events können gleichzeitig verarbeitet werden
- [ ] **Memory ausreichend:** Keine Out-of-Memory Errors
- [ ] **Database optimiert:** Queries laufen effizient

---

## 🆘 Eskalations-Matrix

### Level 1: Erste Hilfe (Selbsthilfe)
**Dauer:** 15-30 Minuten
- Cache leeren: `ddev drush cr`
- DDEV restart: `ddev restart`
- Browser Cache leeren (Ctrl+F5)
- Login neu versuchen

### Level 2: Technische Analyse (IT-Support)
**Dauer:** 1-2 Stunden
- Log-Analyse durchführen
- Configuration Import/Export
- Database-Queries analysieren
- Module De-/Reaktivierung

### Level 3: Development Support (Experten)
**Dauer:** 2-4 Stunden
- Code-Debugging
- Custom Module Analyse
- Database Schema Probleme
- Complex Configuration Issues

### Level 4: Vendor Support (GPZH Team)
**Dauer:** 4-8 Stunden
- Drupal Core Issues
- Module Compatibility Problems
- Architecture-level Problems
- Multi-site Configuration Issues

---

## 📞 Support-Kontakte

### Gemeinde Bruchtal (Demo)
- **IT-Support:** `it@bruchtal.ch` / +41 44 123 45 67 Ext. 123
- **Systemadmin:** `admin@bruchtal.ch` / +41 44 123 45 67 Ext. 100
- **24/7 Notfall:** `notfall@bruchtal.ch` / +41 79 123 45 67

### GPZH Projekt Support
- **Technical Lead:** `tech@gpzh.ch`
- **Project Manager:** `pm@gpzh.ch`  
- **Drupal Experts:** `drupal@gpzh.ch`

### External Vendors
- **Drupal Community:** drupal.org/support
- **Swiss eCH Standards:** support@ech.ch
- **Hosting Provider:** support@hostingprovider.ch

---

## 📚 Weiterführende Dokumentation

### Projekt-Dokumentation
- **Setup Guide:** `EVENT-REVIEW-DASHBOARD-SETUP.md`
- **User Guide:** `EVENT-REVIEW-DASHBOARD-USER-GUIDE.md`  
- **Technical Implementation:** `EVENT-REVIEW-DASHBOARD-IMPLEMENTATION.md`
- **Demo Scenarios:** `/web/modules/custom/event_review/docs/DEMO_SCENARIOS.md`

### Drupal Resources
- **Views Documentation:** drupal.org/docs/user_guide/en/views-concept.html
- **Content Moderation:** drupal.org/docs/8/core/modules/content-moderation
- **VBO Module:** drupal.org/project/views_bulk_operations

### Swiss Standards
- **eCH-0039 Events:** ech.ch/de/ech/ech-0039
- **eCH-0010 Addresses:** ech.ch/de/ech/ech-0010
- **Municipal Requirements:** admin.ch/gemeinden

---

*Troubleshooting Guide Version: 1.0*  
*Letzte Aktualisierung: 21.08.2025*  
*Für: GPZH Event Review Dashboard (PR #11)*  
*Support Level: Municipal IT + GPZH Technical Team*