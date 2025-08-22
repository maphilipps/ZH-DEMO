# Production Deployment Checklist - zh.adessocms.de

## 📋 Pre-Deployment Verification

### Local Environment
- [ ] All code committed to main branch
- [ ] Latest pull from repository
- [ ] Theme assets built (`ddev theme build`)
- [ ] All tests passing (`ddev exec npm run test:full`)
- [ ] Database export created (`ddev export-db --file=zh-demo-production.sql.gz`)
- [ ] Configuration exported (`ddev drush cex`)

### Server Requirements
- [ ] Ubuntu 22.04 LTS installed
- [ ] Minimum 4GB RAM
- [ ] 20GB disk space available
- [ ] Root/sudo access available
- [ ] DNS configured for all domains

## 🚀 Phase 1: Server Preparation (2 hours)

### System Setup
- [ ] System packages updated (`apt update && apt upgrade`)
- [ ] Firewall configured (ports 22, 80, 443 only)
- [ ] User 'claude' created with sudo access
- [ ] SSH key-based authentication configured
- [ ] Root login disabled
- [ ] Password authentication disabled

### Security Hardening
- [ ] Fail2ban installed and configured
- [ ] Automatic security updates enabled
- [ ] Swap file configured (if needed)
- [ ] Time zone set to Europe/Zurich

## 🐳 Phase 2: Docker & DDEV Installation (1 hour)

### Docker Installation
- [ ] Docker repository added
- [ ] Docker CE installed
- [ ] Docker service running
- [ ] User 'claude' added to docker group
- [ ] Docker hello-world test successful

### DDEV Installation
- [ ] DDEV installed via official script
- [ ] DDEV version verified (latest stable)
- [ ] DDEV commands accessible

## ⚙️ Phase 3: DDEV Global Configuration (30 minutes)

### Production Settings
- [ ] `--router-bind-all-interfaces` configured
- [ ] `--omit-containers=ddev-ssh-agent` set
- [ ] `--use-hardened-images` enabled
- [ ] `--performance-mode=none` set
- [ ] `--use-letsencrypt` configured
- [ ] `--letsencrypt-email` set
- [ ] `--auto-restart-containers` enabled

## 📦 Phase 4: Project Setup (1.5 hours)

### Code Deployment
- [ ] Repository cloned/synced to `/home/claude/dev/zh-demo-1`
- [ ] Production config copied (`.ddev/config.prod.yaml` → `.ddev/config.yaml`)
- [ ] Additional hostnames configured for all domains
- [ ] Composer dependencies installed (`--no-dev --optimize-autoloader`)
- [ ] Theme assets built for production

### Multi-Site Configuration
- [ ] sites.php updated with production domains
- [ ] Directory structure for each site verified
- [ ] Settings files prepared for each site

## 💾 Phase 5: Data Import (1 hour)

### Database Migration
- [ ] Database exported from local
- [ ] Database imported to production
- [ ] Database credentials verified
- [ ] Drupal status check successful

### Files Migration
- [ ] Public files synced
- [ ] Private files directory created
- [ ] File permissions corrected
- [ ] Media files accessible

### Backup Creation
- [ ] Pre-production snapshot created
- [ ] Snapshot verified in list
- [ ] Rollback procedure tested

## 🌐 Phase 6: Production Launch (30 minutes)

### DDEV Start
- [ ] `ddev start` executed successfully
- [ ] All containers running
- [ ] No error messages in logs

### SSL/HTTPS Verification
- [ ] Let's Encrypt certificate generated
- [ ] HTTPS redirect working
- [ ] SSL certificate valid for all domains
- [ ] SSL Labs test score A or better

### Domain Testing
- [ ] zh.adessocms.de accessible
- [ ] www.zh.adessocms.de redirects correctly
- [ ] bruchtal.zh.adessocms.de loads
- [ ] thalwil.zh.adessocms.de loads
- [ ] thalheim.zh.adessocms.de loads
- [ ] erlenbach.zh.adessocms.de loads

## ✅ Phase 7: Validation & Testing (2 hours)

### Functionality Testing
- [ ] Admin login working
- [ ] Content creation functional
- [ ] Forms submitting correctly
- [ ] Workflow processes operational
- [ ] Search functionality working
- [ ] Media upload successful

### Performance Validation
- [ ] Core Web Vitals >90
- [ ] TTFB <600ms
- [ ] Page load time <2 seconds
- [ ] Database queries optimized
- [ ] Caching working correctly

### Swiss Compliance
- [ ] CH-DSG requirements met
- [ ] eCH-0059 accessibility validated
- [ ] German localization correct
- [ ] Date formats (DD.MM.YYYY)
- [ ] No ß character usage
- [ ] Sie-Form addressing

### Security Verification
- [ ] Security headers present
- [ ] HTTPS-only access enforced
- [ ] Admin paths protected
- [ ] File upload restrictions working
- [ ] Error messages hidden from users

## 📧 External Services

### SMTP Configuration
- [ ] External SMTP provider selected (SendGrid/Mailgun)
- [ ] SMTP credentials configured
- [ ] Test email sent successfully
- [ ] Contact forms delivering emails
- [ ] System notifications working

## 📊 Monitoring Setup

### Logging & Monitoring
- [ ] Error logging configured
- [ ] Log rotation set up
- [ ] Uptime monitoring configured
- [ ] Performance monitoring active
- [ ] SSL expiry monitoring enabled

### Backup Strategy
- [ ] Daily snapshot schedule configured
- [ ] Off-site backup solution implemented
- [ ] Restore procedure documented
- [ ] Recovery time tested

## 🚨 Post-Deployment

### Documentation
- [ ] Server access details documented
- [ ] Deployment steps recorded
- [ ] Known issues documented
- [ ] Contact information updated

### Handover
- [ ] Admin credentials shared securely
- [ ] Monitoring access provided
- [ ] Support procedures explained
- [ ] Emergency contacts provided

## 📝 Sign-Off

### Technical Approval
- [ ] All tests passed
- [ ] Performance requirements met
- [ ] Security validated
- [ ] Compliance confirmed

### Business Approval
- [ ] Content verified
- [ ] Functionality demonstrated
- [ ] Training completed
- [ ] Go-live approved

---

## Emergency Contacts

- **Technical Lead**: [Name] - [Phone] - [Email]
- **DevOps Engineer**: [Name] - [Phone] - [Email]  
- **Project Manager**: [Name] - [Phone] - [Email]
- **DDEV Support**: GitHub Issues / Discord

## Rollback Procedure

If critical issues occur:
1. Run `/home/claude/dev/zh-demo-1/scripts/production-rollback.sh`
2. Follow prompts to restore from snapshot
3. Document incident
4. Contact technical lead

## Monitoring Commands

```bash
# Check status
./scripts/production-monitoring.sh

# Continuous monitoring
./scripts/production-monitoring.sh continuous

# View logs
ddev logs --follow

# Check performance
ddev exec npm run test:performance
```

---

**Deployment Date**: _________________
**Deployed By**: _________________
**Sign-off By**: _________________