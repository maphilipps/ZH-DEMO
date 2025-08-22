# 🚀 [DEPLOYMENT] Production Deployment: GPZH Präqualifikation Demo System to zh.adessocms.de

## 📋 Issue Summary

**Type:** Production Deployment  
**Priority:** Critical  
**Environment:** Production (zh.adessocms.de)  
**Compliance:** Swiss Government Standards Required  
**Timeline:** 24 hours over 3 business days  
**Target Date:** [TO BE SCHEDULED]

## 🏷️ Labels
`deployment` `production` `switzerland` `government` `critical` `security` `infrastructure` `compliance` `ch-dsg` `ech-0059` `ddev` `drupal-11`

## 📝 Description

This issue tracks the critical production deployment of the GPZH (Gemeindeportale Zürich) Präqualifikation Demo System to zh.adessocms.de. This deployment is for the Canton of Zurich's municipal portal prequalification process, demonstrating our technical capabilities for managing 160+ municipality portals with full Swiss compliance and government security standards.

### Business Context
- **Purpose:** Official demonstration system for Canton of Zurich stakeholders
- **Audience:** Government officials, technical evaluators, municipality representatives
- **Impact:** Critical for prequalification success in GPZH tender process
- **Compliance:** Mandatory Swiss data protection (CH-DSG) and accessibility (eCH-0059) standards

## 🔧 Technical Requirements

### Server Infrastructure
```yaml
Server Details:
  Host: 91.99.18.69
  Access: ssh root@91.99.18.69
  User: claude (sudo enabled)
  Password: [SECURE - See Vault]
  Project Path: /home/claude/dev/zh-demo-1
  Domain: zh.adessocms.de
  DNS: Configured and propagated
```

### Technology Stack
```yaml
Application:
  CMS: Drupal 11.2.2
  Container: DDEV 1.23.x
  Database: MariaDB 10.11
  PHP: 8.3
  Web Server: nginx
  Cache: Redis
  Search: Solr (optional)

Frontend:
  Build Tool: Vite 6.2.0
  CSS Framework: Tailwind CSS v4
  JavaScript: Alpine.js
  Components: SDC (Single Directory Components)
  
AI Integration:
  Provider: OpenAI GPT-4o
  Module: Drupal AI Suite
  Features: Content suggestions, alt-text generation
```

### Security Requirements
```yaml
SSL/TLS:
  Certificate: Let's Encrypt
  Rating: A+ (SSL Labs)
  HSTS: Enabled
  Protocol: TLS 1.3

Access Control:
  SSH: Key-based authentication only
  Firewall: UFW configured
  Ports: 22, 80, 443 only
  Fail2ban: Configured for SSH and web

Drupal Security:
  Security Kit: Configured
  Content Security Policy: Enabled
  Trusted Host Patterns: Set
  Private Files: Protected
```

## ✅ Acceptance Criteria

### Infrastructure Setup
- [ ] Server provisioned with Ubuntu 22.04 LTS
- [ ] DDEV installed and configured for production
- [ ] MariaDB 10.11 database server operational
- [ ] Redis cache configured and operational
- [ ] Nginx web server configured with security headers
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Firewall configured with minimal port exposure
- [ ] Fail2ban configured for intrusion prevention
- [ ] Server monitoring with Prometheus/Grafana
- [ ] Backup system configured (daily snapshots)

### Application Deployment
- [ ] Drupal 11.2.2 deployed via DDEV
- [ ] Production configuration imported successfully
- [ ] Database migrated without errors
- [ ] Media files synchronized
- [ ] Cron jobs configured and operational
- [ ] Email sending configured (SMTP)
- [ ] Error logging configured (Sentry/Rollbar)
- [ ] Production mode enabled (aggregation, caching)

### Swiss Compliance
- [ ] CH-DSG data protection implemented
- [ ] eCH-0059 accessibility standards met
- [ ] eCH-0010 address format compliance
- [ ] Swiss German language standards (no ß)
- [ ] DD.MM.YYYY date format configured
- [ ] Data residency in Switzerland confirmed
- [ ] Cookie consent mechanism implemented
- [ ] Privacy policy and impressum pages created

### Performance Targets
- [ ] Core Web Vitals score >90
- [ ] First Contentful Paint <1.8s
- [ ] Largest Contentful Paint <2.5s
- [ ] Total Blocking Time <300ms
- [ ] Cumulative Layout Shift <0.1
- [ ] Time to Interactive <3.8s
- [ ] Page load time <2 seconds (3G connection)
- [ ] CDN configured for static assets

### Security Validation
- [ ] Security audit passed (OWASP Top 10)
- [ ] Penetration testing completed
- [ ] XSS protection validated
- [ ] CSRF tokens functioning
- [ ] SQL injection prevention confirmed
- [ ] File upload restrictions enforced
- [ ] Admin interface protected (/admin)
- [ ] Rate limiting configured

### Monitoring & Operations
- [ ] Uptime monitoring active (99.9% SLA)
- [ ] Application performance monitoring (APM)
- [ ] Error tracking configured
- [ ] Log aggregation operational
- [ ] Alerting rules configured
- [ ] Incident response procedures documented
- [ ] Runbook created for common issues

## 📅 Timeline & Phases

### Phase 1: Infrastructure Setup (4 hours)
**Day 1 - Morning**
- [ ] 09:00-10:00: Server provisioning and OS configuration
- [ ] 10:00-11:00: DDEV installation and production configuration
- [ ] 11:00-12:00: Database and cache setup
- [ ] 12:00-13:00: Security hardening and firewall configuration

### Phase 2: Application Deployment (6 hours)
**Day 1 - Afternoon & Day 2 - Morning**
- [ ] 14:00-16:00: Code deployment and configuration import
- [ ] 16:00-17:00: Database migration and content sync
- [ ] Day 2 09:00-11:00: Module configuration and AI setup
- [ ] 11:00-12:00: Theme build and asset optimization

### Phase 3: Security & Compliance (4 hours)
**Day 2 - Afternoon**
- [ ] 13:00-14:00: SSL configuration and security headers
- [ ] 14:00-15:00: Swiss compliance validation
- [ ] 15:00-16:00: Security audit and penetration testing
- [ ] 16:00-17:00: Documentation and compliance reports

### Phase 4: Testing & Validation (8 hours)
**Day 3 - Full Day**
- [ ] 09:00-11:00: Functional testing (all forms and workflows)
- [ ] 11:00-13:00: Performance testing and optimization
- [ ] 14:00-16:00: Accessibility and compliance testing
- [ ] 16:00-17:00: User acceptance testing (UAT)

### Phase 5: Go-Live & Monitoring (2 hours)
**Day 3 - Late Afternoon**
- [ ] 17:00-18:00: DNS cutover and go-live
- [ ] 18:00-19:00: Post-deployment validation and monitoring setup

## 🔗 Dependencies

### Prerequisites
- [ ] Source code repository access granted
- [ ] Production server credentials secured
- [ ] SSL certificate domain validation completed
- [ ] DNS records prepared for cutover
- [ ] Backup of current demo environment
- [ ] API keys for OpenAI GPT-4o provisioned
- [ ] SMTP credentials for email service
- [ ] Monitoring service accounts created

### External Dependencies
- DNS propagation time (up to 48 hours)
- SSL certificate issuance (Let's Encrypt)
- Swiss data center availability
- Third-party service APIs (OpenAI, SMTP)

### Team Dependencies
- DevOps engineer for infrastructure
- Security specialist for audit
- Compliance officer for Swiss standards
- QA team for testing validation

## ⚠️ Risk Assessment

### High-Risk Items
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| DNS propagation delays | Medium | High | Pre-configure DNS 48h in advance |
| SSL certificate issues | Low | High | Have backup wildcard certificate ready |
| Database migration failures | Medium | Critical | Test migration on staging, have rollback script |
| Performance degradation | Medium | High | Load testing before go-live, CDN configuration |
| Security vulnerabilities | Low | Critical | Pre-deployment security audit, WAF configuration |

### Medium-Risk Items
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| DDEV production issues | Low | Medium | Have Docker Compose fallback ready |
| Email delivery problems | Medium | Medium | Configure multiple SMTP providers |
| Caching conflicts | Medium | Low | Clear cache procedures documented |
| Module compatibility | Low | Medium | Test all modules on staging first |

### Contingency Plans
- **Rollback Window:** 30 minutes maximum
- **Backup Strategy:** Hourly snapshots during deployment
- **Communication Plan:** Stakeholder notification procedures
- **War Room:** Dedicated Slack channel #gpzh-deployment

## 🧪 Testing Strategy

### Pre-Deployment Testing
```bash
# Local validation
ddev exec drush core:status
ddev exec drush config:status
ddev exec npm run test:full
ddev exec composer validate
```

### Functional Testing
- [ ] All 4 required forms submit successfully
- [ ] User registration and login workflows
- [ ] Content creation and editing
- [ ] Media upload and management
- [ ] Search functionality
- [ ] Multi-language switching
- [ ] Email notifications

### Performance Testing
```bash
# Load testing
ab -n 1000 -c 10 https://zh.adessocms.de/
lighthouse https://zh.adessocms.de --view

# Core Web Vitals
npm run test:performance
```

### Security Testing
```bash
# Security scanning
nikto -h https://zh.adessocms.de
nmap -sV -p- 91.99.18.69
sqlmap -u "https://zh.adessocms.de/search?q=test"
```

### Accessibility Testing
```bash
# WCAG compliance
axe https://zh.adessocms.de
pa11y https://zh.adessocms.de --standard WCAG2AA
```

### Swiss Compliance Validation
- [ ] eCH-0059 accessibility checklist
- [ ] CH-DSG data protection audit
- [ ] Language standards verification
- [ ] Date/time format validation
- [ ] Address format compliance

## 🔄 Rollback Plan

### Rollback Triggers
- Critical security vulnerability discovered
- Performance degradation >50%
- Data corruption or loss
- Complete service failure
- Compliance violation detected

### Rollback Procedure
```bash
# Step 1: Immediate notification
echo "ROLLBACK INITIATED" | mail -s "URGENT: ZH-DEMO Rollback" ops@adesso.ch

# Step 2: Stop current deployment
cd /home/claude/dev/zh-demo-1
ddev stop

# Step 3: Restore from backup
ddev snapshot restore pre-deployment-backup

# Step 4: Restart services
ddev start
ddev drush cr

# Step 5: Verify restoration
ddev drush core:status
curl -I https://zh.adessocms.de

# Step 6: Update DNS if needed
# Point zh.adessocms.de back to staging if critical
```

### Recovery Time Objectives
- **RTO:** 30 minutes maximum
- **RPO:** 1 hour maximum data loss
- **Validation:** 15 minutes post-rollback

## 📊 Success Metrics

### Technical KPIs
- Deployment completed within 24-hour window
- Zero critical security vulnerabilities
- Core Web Vitals score >90
- 99.9% uptime in first 7 days
- <2 second page load time

### Business KPIs
- Successful demonstration to stakeholders
- All required features operational
- Swiss compliance certification ready
- Positive feedback from Canton of Zurich
- Ready for 160+ municipality scaling

## 📝 Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Monitor application logs for errors
- [ ] Verify all cron jobs executing
- [ ] Check email delivery logs
- [ ] Validate backup processes
- [ ] Update documentation

### Week 1
- [ ] Performance baseline establishment
- [ ] Security audit report
- [ ] Compliance documentation
- [ ] Stakeholder demo sessions
- [ ] Team retrospective

### Ongoing
- [ ] Weekly security updates
- [ ] Monthly performance reviews
- [ ] Quarterly compliance audits
- [ ] Continuous monitoring
- [ ] Documentation updates

## 👥 Assignees

- **Project Lead:** @drupal-technical-pm
- **DevOps Lead:** @drupal-devops-engineer
- **Security Lead:** @swiss-compliance-specialist
- **QA Lead:** @qa-testing-specialist
- **Development Lead:** @drupal-11-lead-developer

## 🔗 Related Issues

- #[Previous Issue]: Local development environment setup
- #[Previous Issue]: Staging deployment
- #[Previous Issue]: Security audit findings
- #[Previous Issue]: Performance optimization
- #[Previous Issue]: Swiss compliance implementation

## 📚 Documentation

- [Deployment Runbook](./docs/deployment-runbook.md)
- [Security Checklist](./docs/security-checklist.md)
- [Swiss Compliance Guide](./docs/swiss-compliance.md)
- [Rollback Procedures](./docs/rollback-procedures.md)
- [Monitoring Dashboard](https://monitoring.adessocms.de/zh-demo)

## 💬 Comments

Please use this issue for all deployment-related discussions. For urgent matters, use Slack channel #gpzh-deployment or escalate to the project lead immediately.

---

**Approval Required From:**
- [ ] Project Manager
- [ ] Technical Lead
- [ ] Security Officer
- [ ] Compliance Officer
- [ ] Client Representative

**Deployment Window Confirmed:** [ ] Yes [ ] No

**Final Go/No-Go Decision:** [ ] GO [ ] NO-GO

---

*This deployment specification follows Swiss government project standards and includes all mandatory compliance requirements for the Canton of Zurich municipal portal system.*