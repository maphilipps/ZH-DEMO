# 🚀 [DEPLOYMENT] DDEV Production Deployment: ZH-DEMO zu zh.adessocms.de

## 📋 Issue Summary

**Type:** DDEV Production Deployment  
**Priority:** Critical  
**Environment:** Production Server (91.99.18.69 → zh.adessocms.de)  
**Compliance:** Swiss Government Standards Required  
**Timeline:** 8 Stunden mit DDEV Casual Hosting  
**Target Date:** [TO BE SCHEDULED]

## 🏷️ Labels
`ddev-production` `casual-hosting` `switzerland` `government` `letsencrypt` `hardened-images` `zh-demo`

## 📝 Description

Diese Issue folgt dem **offiziellen DDEV Production Deployment Guide** für die Bereitstellung des ZH-DEMO Systems auf zh.adessocms.de. DDEV bietet "Casual Hosting mit Let's Encrypt" für öffentliche Webserver - ideal für Demonstrations- und CI-Sites wie unsere GPZH Präqualifikation.

### Business Context
- **Zweck:** GPZH Demo System für Kanton Zürich Stakeholder
- **Zielgruppe:** Regierungsbeamte, technische Evaluatoren, Gemeinde-Vertreter
- **Impact:** Kritisch für GPZH Tender Präqualifikation
- **Hosting:** DDEV Casual Hosting mit Let's Encrypt HTTPS

### DDEV Production Warnings
⚠️ **Sicherheitshinweis**: Es gibt kein Security-Team hinter diesem Ansatz, obwohl Hardened Images verwendet werden.
✅ **Geeignet für**: Sites mit bescheidenem Traffic, CI/Staging, Demo-Sites wie GPZH
⚠️ **Server-Wartung**: Sie sind für Firewall und Server-Wartung verantwortlich!

## 🔧 DDEV Production Requirements

### Server Infrastructure
```yaml
Server Details:
  Host: 91.99.18.69
  Access: ssh root@91.99.18.69  
  User: claude (sudo enabled, password: [VAULT])
  OS: Ubuntu 22.04 LTS (empfohlen)
  Project Path: /home/claude/dev/zh-demo-1
  Domain: zh.adessocms.de
  DNS: Konfiguriert und propagiert
  Firewall: Nur Ports 22, 80, 443
```

### DDEV Production Stack
```yaml
DDEV Configuration:
  Version: Latest DDEV
  Mode: Casual Hosting
  Images: Hardened Images (--use-hardened-images)  
  Router: Bind All Interfaces (--router-bind-all-interfaces)
  SSL: Let's Encrypt automatisch
  Containers: Omit SSH Agent (--omit-containers=ddev-ssh-agent)
  Performance: None (--performance-mode=none)

Application Stack:
  CMS: Drupal 11.2.2
  Database: MariaDB 10.11 (via DDEV)
  Web Server: nginx (DDEV hardened)
  PHP: 8.3 (DDEV configuration)
  HTTPS: Let's Encrypt automatisch
  Email: Externes SMTP (SendGrid/Mailgun)
```

## ✅ Acceptance Criteria - DDEV Deployment

### Phase 1: Server Preparation (2 Stunden)
- [ ] Ubuntu 22.04 Server provisioniert
- [ ] Firewall konfiguriert: `ufw allow 80 && ufw allow 443 && ufw allow 22 && ufw enable`
- [ ] Packages aktualisiert und Server gehärtet
- [ ] SSH Key-basierte Authentifizierung für User "claude"

### Phase 2: Docker & DDEV Installation (1 Stunde)
```bash
# Docker Installation (Ubuntu/Debian)
- [ ] sudo apt update && sudo apt install -y build-essential apt-transport-https ca-certificates jq curl software-properties-common file
- [ ] curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
- [ ] sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
- [ ] sudo apt update && sudo apt install -y docker-ce
- [ ] sudo chmod 666 /var/run/docker*

# DDEV Installation  
- [ ] curl -fsSL https://ddev.com/install.sh | bash
- [ ] ddev version (Installations-Validierung)
```

### Phase 3: DDEV Global Production Configuration (30 Minuten)
```bash
# DDEV für Production Hosting konfigurieren
- [ ] ddev config global --router-bind-all-interfaces --omit-containers=ddev-ssh-agent --use-hardened-images --performance-mode=none --use-letsencrypt [email protected]
- [ ] ddev config global --auto-restart-containers  # Auto-restart bei Problemen
```

### Phase 4: Projekt Setup & Konfiguration (1.5 Stunden)
```bash
# Projekt nach /home/claude/dev/zh-demo-1 deployen
- [ ] cd /home/claude/dev/zh-demo-1
- [ ] ddev config --project-type=drupal11
- [ ] ddev config --additional-hostnames=zh.adessocms.de,www.zh.adessocms.de
- [ ] .ddev/config.yaml für Production optimiert
```

### Phase 5: Daten Import & Snapshot Handling (1 Stunde)  
```bash
# Database & Files Import
- [ ] ddev import-db --file=/pfad/zur/database.sql.gz
- [ ] ddev import-files (oder rsync für user-generated files)

# WICHTIG: Snapshot Management
- [ ] ddev snapshot create pre-production-backup
- [ ] **HINWEIS**: ddev snapshot restore importiert IMMER den neuesten Snapshot
- [ ] Snapshot-Liste validiert: ddev snapshot list
```

### Phase 6: Production Start & Let's Encrypt (30 Minuten)
```bash
# Production Deployment
- [ ] ddev start
- [ ] Let's Encrypt Zertifikat automatisch generiert
- [ ] HTTPS zh.adessocms.de erreichbar
- [ ] ddev describe (URL & Service Validierung)
```

## 📧 Email Configuration (SMTP Extern)

**Wichtig**: DDEV bietet KEINEN SMTP Service in Production!
```yaml
SMTP Integration:
  Provider: SendGrid, Postmark oder Mailgun
  Drupal Config: /sites/default/settings.php
  Mailpit: Deaktiviert in Hardened Images
```

### Drupal SMTP Konfiguration:
```php
# sites/default/settings.php
$config['system.mail']['interface']['default'] = 'smtp';
$config['smtp.settings']['smtp_host'] = 'smtp.sendgrid.net';
$config['smtp.settings']['smtp_port'] = '587';
$config['smtp.settings']['smtp_username'] = '[SMTP_USER]';
$config['smtp.settings']['smtp_password'] = '[SMTP_PASS]';
```

## 🔒 DDEV Production Security

### Hardened Images Security
```yaml
Security Features:
  - Unprivileged User: Docker läuft ohne Root
  - No Sudo: Container hat kein sudo access  
  - Removed Tools: SSH, Git entfernt in Production
  - Firewall: Nur 80, 443, 22 offen
  - Let's Encrypt: Automatische SSL/TLS
```

### Security Limitations:
⚠️ **Code Access**: Malicious Website-Angriffe können Code ändern (mounted auf Host)  
✅ **Host Protection**: Angriffe können normalerweise dem Host nicht signifikant schaden

## 🧪 DDEV Testing Strategy

### Pre-Deployment Testing (Local)
```bash
# Lokale Validierung vor Deployment
- [ ] ddev start (lokal funktional)
- [ ] ddev snapshot create local-backup
- [ ] ddev export-db (für Production Import)
- [ ] ddev drush core:status
- [ ] npm run test:full
```

### Post-Deployment Validation
```bash
# Production Validation
- [ ] curl -I https://zh.adessocms.de (HTTPS funktional)
- [ ] ddev logs (Service-Status prüfen)
- [ ] ddev exec drush core:status
- [ ] Let's Encrypt Zertifikat gültig (SSL Labs Test)
```

## 📊 Swiss Compliance mit DDEV

### CH-DSG Compliance in DDEV Production
```yaml
Data Protection:
  - Hosting: Server in EU/Schweiz location  
  - SSL/TLS: Let's Encrypt automatisch
  - Logs: Docker logs für Audit-Trail
  - Backup: ddev snapshot + externe Sicherung
  - Email: DSGVO-konformer SMTP Provider
```

### eCH-0059 Accessibility
- [ ] WCAG 2.1 AA Testing nach Deployment
- [ ] Performance >90 Core Web Vitals
- [ ] Screen Reader Testing

## ⚠️ DDEV Production Limitations & Risks

### Traffic & Scaling Limitations
| Limitation | Impact | Mitigation |
|------------|--------|------------|
| Unbekannter Traffic-Limit | Medium | Server-Monitoring implementieren |
| Nicht skalierbar | Low | VM-Größe erhöhen bei Bedbedarf |
| Kein Managed Hosting | High | Server-Wartung = unsere Verantwortung |
| Single Point of Failure | Medium | Backup-Strategie & Monitoring |

### DDEV-Spezifische Risiken
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Let's Encrypt Fehler | Low | High | docker logs ddev-router debugging |
| Traefik Config Probleme | Medium | Medium | rm -f config/<project>.yaml && ddev poweroff && ddev start |
| Container Restart Issues | Medium | Low | --auto-restart-containers aktiviert |
| Hardened Image Limits | Low | Low | Externe SMTP für Email |

## 🔄 DDEV Rollback Plan

### Rollback Triggers
- DDEV Container Probleme
- Let's Encrypt SSL Probleme  
- Website Performance Degradation
- Security Incident

### DDEV Rollback Procedure
```bash
# Step 1: Sofortiger Rollback
- [ ] ddev poweroff  # Alle Container stoppen
- [ ] ddev snapshot list  # Verfügbare Snapshots zeigen

# Step 2: Letzten bekannten Snapshot wiederherstellen
- [ ] ddev snapshot restore  # Importiert AUTOMATISCH den neuesten Snapshot
- [ ] ddev start  # Container mit wiederhergestellten Daten starten

# Step 3: Validierung
- [ ] ddev drush core:status
- [ ] curl -I https://zh.adessocms.de
- [ ] ddev logs (auf Errors prüfen)

# Step 4: DNS Fallback (falls kritisch)
- [ ] DNS temporär auf Staging umleiten
```

### Recovery Time Objectives
- **RTO**: 15 Minuten mit ddev snapshot restore
- **RPO**: Letzter Snapshot (empfohlen: täglich)
- **Validierung**: 5 Minuten Post-Rollback

## 🚨 DDEV Troubleshooting

### Häufige DDEV Production Probleme
```bash
# Let's Encrypt SSL Probleme
- [ ] docker logs ddev-router  # SSL Debug Logs
- [ ] ddev describe  # URL & SSL Status

# Traefik Configuration Reset  
- [ ] docker exec -it ddev-router bash -c "rm -f config/zh-demo.yaml"
- [ ] rm -rf .ddev/traefik
- [ ] ddev poweroff && ddev start

# Container Probleme
- [ ] ddev logs web  # Web Container Logs  
- [ ] ddev logs db   # Database Container Logs
- [ ] docker ps      # Container Status prüfen
```

## 📅 DDEV Deployment Timeline

### Gesamt: 8 Stunden (1 Arbeitstag)

#### Phase 1: Server & Docker Setup (3 Stunden)
**09:00-12:00**
- [ ] Ubuntu Server Provisioning & Hardening
- [ ] Docker Installation & Configuration
- [ ] DDEV Installation & Global Config

#### Phase 2: DDEV Production Deployment (3 Stunden)  
**13:00-16:00**
- [ ] Projekt Setup & DDEV Configuration
- [ ] Database & Files Import
- [ ] DDEV Start & Let's Encrypt Setup

#### Phase 3: Swiss Compliance & Testing (2 Stunden)
**16:00-18:00**
- [ ] SMTP Configuration & Email Testing
- [ ] Swiss Compliance Validation
- [ ] Performance & Accessibility Testing
- [ ] Backup & Snapshot Strategy

## 📋 Post-Deployment DDEV Operations

### Täglich
- [ ] ddev logs monitoring für Errors
- [ ] SSL Zertifikat Status prüfen
- [ ] ddev snapshot create daily-backup

### Wöchentlich  
- [ ] Server Package Updates
- [ ] DDEV Updates prüfen: ddev version
- [ ] Let's Encrypt Renewal Validierung

### Monatlich
- [ ] Security Audit & Penetration Test
- [ ] Performance Baseline Review
- [ ] Disaster Recovery Test mit snapshot restore

## 👥 DDEV Deployment Team

- **DDEV Lead**: @drupal-devops-engineer
- **Security**: @swiss-compliance-specialist  
- **Testing**: @qa-testing-specialist
- **Project**: @drupal-technical-pm

## 📚 DDEV Documentation & Resources

- [DDEV Official Hosting Guide](https://ddev.readthedocs.io/en/stable/users/topics/hosting/)
- [DDEV Hardened Images](https://github.com/ddev/ddev/issues/2446)
- [Let's Encrypt with DDEV](https://ddev.readthedocs.io/en/stable/users/usage/faq/)
- [DDEV Casual Webhosting Feature](https://ddev.com/blog/watch-ddev-local-new-casual-webhosting-feature/)

## 💬 DDEV Support & Communication

**DDEV Issues**: GitHub Issues bei ddev/ddev  
**Urgent**: Slack #zh-demo-deployment  
**Let's Encrypt Debugging**: `docker logs ddev-router`

---

## ✅ Final Approval Required

- [ ] DDEV Deployment Strategy approved
- [ ] Let's Encrypt Email configured
- [ ] Swiss Compliance validated  
- [ ] Server Security hardened
- [ ] Snapshot Strategy confirmed

**DDEV Go/No-Go Decision**: [ ] GO [ ] NO-GO

---

*Diese DDEV Production Deployment Spezifikation folgt dem offiziellen DDEV Hosting Guide und berücksichtigt Swiss Government Standards für die ZH-DEMO Präqualifikation.*