# adesso CMS - Enterprise CI/CD Pipeline Documentation

## 🎯 Overview

This repository contains a comprehensive enterprise-grade CI/CD pipeline for **adesso CMS**, implementing Lullabot best practices with German market compliance and advanced quality assurance.

### 🔧 Technology Stack Integration
- **Drupal 11.2.2** with complete CMS suite
- **Vite 6.2.0** + **Tailwind CSS v4** build pipeline
- **Node.js 20** + **PHP 8.3** + **MariaDB 10.11**
- **Storybook 8.6.7** component documentation
- **AI Integration** with OpenAI, Anthropic, and Groq providers

---

## 🚀 CI/CD Workflows

### 1. **Main CI Pipeline** (`.github/workflows/ci.yml`)

**🎯 Purpose**: Comprehensive quality assurance with 8 quality gates
**⚡ Runtime**: < 10 minutes (optimized parallel execution)
**🔄 Triggers**: Push to main/develop, Pull Requests

#### Quality Gates:
1. **🔍 Project Analysis & Setup** - Change detection and caching
2. **📊 Code Quality & Standards** - PSR-12, Drupal standards, ESLint
3. **🧪 Unit & Component Testing** - Vitest with >90% coverage
4. **🏗️ Build & Asset Compilation** - Vite production builds
5. **🐘 Drupal Integration** - Full Drupal installation and configuration
6. **♿ Accessibility Compliance** - WCAG 2.1 AA validation
7. **👁️ Visual Regression Testing** - BackstopJS component testing
8. **🔒 Security Scanning** - Vulnerability detection and compliance
9. **🎭 End-to-End Testing** - Playwright E2E validation
10. **⚡ Performance Audit** - Core Web Vitals monitoring

### 2. **Deployment Pipeline** (`.github/workflows/deploy.yml`)

**🎯 Purpose**: Blue-green deployment with zero downtime
**🛡️ Security**: Manual approval for production deployments
**🔄 Triggers**: Release creation, workflow dispatch

#### Deployment Flow:
- **Pre-deployment validation** with brand compliance
- **Artifact building** with production optimization
- **Staging deployment** with health checks
- **Production approval gate** with manual review
- **Blue-green production deployment**
- **Post-deployment monitoring** with alerting

### 3. **Security Pipeline** (`.github/workflows/security.yml`)

**🎯 Purpose**: Comprehensive security scanning and compliance
**🔄 Schedule**: Daily at 3 AM UTC + dependency changes
**🛡️ Coverage**: Dependencies, secrets, Drupal security, code analysis

#### Security Scans:
- **Composer & NPM** vulnerability scanning
- **Secret detection** in codebase
- **Drupal security** configuration analysis
- **GDPR compliance** for German market
- **Code quality security** analysis

### 4. **PR Preview Environment** (`.github/workflows/pr-preview.yml`)

**🎯 Purpose**: Automated preview environments for pull requests
**🌐 URL Pattern**: `https://pr-{number}.preview.adesso-cms.com`
**🧹 Cleanup**: Automatic when PR is closed

#### Preview Features:
- **Isolated environments** per PR
- **Automated testing** on preview
- **Stakeholder review** links
- **German brand compliance** validation
- **Performance monitoring** on preview

### 5. **Performance Monitoring** (`.github/workflows/performance.yml`)

**🎯 Purpose**: Continuous performance monitoring and optimization
**📊 Metrics**: Core Web Vitals, Lighthouse scores, accessibility
**🔄 Schedule**: Twice daily (6 AM, 6 PM UTC)

#### Performance Audits:
- **Core Web Vitals** monitoring (LCP, FID, CLS)
- **Lighthouse comprehensive** audits
- **Accessibility performance** analysis
- **Regression detection** with alerting
- **German market optimization** recommendations

---

## 🇩🇪 German Market Compliance

### Brand Compliance: "adesso wird immer klein geschrieben"
All workflows enforce the German brand standard that "adesso" must always be lowercase:

```bash
# Automated brand validation in every workflow
if grep -r "ADESSO\|Adesso" --include="*.php" --include="*.twig" --include="*.yml" .; then
  echo "❌ Brand violation: 'adesso wird immer klein geschrieben'"
  exit 1
fi
```

### GDPR & Data Protection
- **Secret scanning** for personal data patterns
- **German phone number** detection (pattern: `+49|0[0-9]{2,3}[0-9]{7,8}`)
- **Email address** validation in code
- **Data compliance** checks for German market

### Performance Standards
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Lighthouse Performance**: >85% score required
- **German CDN optimization** for European edge locations
- **Mobile performance** optimized for German network conditions

---

## 🔧 Configuration Files

### PHPStan Configuration (`phpstan.neon`)
```yaml
parameters:
  level: 6
  paths:
    - web/modules/custom
    - web/themes/custom
  drupal:
    drupal_root: web
```

### Lighthouse Budget (Performance Monitoring)
```json
{
  "performance": 85,
  "accessibility": 95,
  "best-practices": 90,
  "seo": 90
}
```

### DDEV Integration
All workflows leverage existing DDEV configuration:
- **PHP 8.3** with required extensions
- **MariaDB 10.11** for database services
- **Node.js 20** with Vite development server
- **Composer 2** dependency management

---

## 🚦 Quality Gates & Thresholds

### Code Quality Requirements
| Standard | Tool | Requirement |
|----------|------|-------------|
| PHP | PHPCS | PSR-12 + Drupal standards |
| JavaScript | ESLint | Airbnb configuration |
| CSS | Stylelint | Standard configuration |
| Static Analysis | PHPStan | Level 6 analysis |

### Testing Requirements
| Test Type | Tool | Coverage |
|-----------|------|----------|
| Unit Tests | Vitest | >90% coverage |
| E2E Tests | Playwright | Critical user journeys |
| Visual Regression | BackstopJS | Component consistency |
| Accessibility | Axe Core | WCAG 2.1 AA compliance |

### Performance Requirements
| Metric | Threshold | German Market Standard |
|--------|-----------|----------------------|
| Lighthouse Performance | >85% | >90% preferred |
| LCP (Largest Contentful Paint) | <2.5s | <2.0s optimal |
| FID (First Input Delay) | <100ms | <75ms optimal |
| CLS (Cumulative Layout Shift) | <0.1 | <0.05 optimal |

### Security Requirements
| Scan Type | Tool | Action on Failure |
|-----------|------|------------------|
| Dependency Vulnerabilities | Composer Audit, NPM Audit | Block deployment |
| Secret Detection | Custom patterns | Block deployment |
| Code Security | PHPCS Security | Warning + review |
| Drupal Security | Configuration analysis | Block deployment |

---

## 🎮 Usage Guide

### Running Individual Workflows

#### 1. Manual CI Pipeline Trigger
```bash
# Trigger main CI pipeline manually
gh workflow run ci.yml
```

#### 2. Deploy to Staging
```bash
# Deploy specific version to staging
gh workflow run deploy.yml \
  -f environment=staging \
  -f deploy_tag=v1.2.3
```

#### 3. Production Deployment
```bash
# Create release to trigger production deployment
gh release create v1.2.3 \
  --title "adesso CMS v1.2.3" \
  --notes "Production release with new features"
```

#### 4. Performance Audit
```bash
# Run performance audit on production
gh workflow run performance.yml \
  -f environment=production \
  -f audit_type=full
```

#### 5. Security Scan
```bash
# Run comprehensive security scan
gh workflow run security.yml
```

### Local Development Integration

#### DDEV Commands for CI/CD Alignment
```bash
# Match CI environment locally
ddev start
ddev theme build    # Production build like CI
ddev theme test     # Run tests like CI
```

#### Pre-commit Validation
```bash
# Run same checks as CI pipeline locally
composer install --no-dev --optimize-autoloader
cd web/themes/custom/adesso_cms_theme
npm ci
npm run build
npm run test:coverage
npm run lint:js
```

---

## 📊 Monitoring & Reporting

### GitHub Actions Dashboard
All workflows provide comprehensive reporting through GitHub Actions UI:
- **Real-time status** for all quality gates
- **Performance metrics** with trend analysis
- **Security vulnerability** reports with details
- **Accessibility compliance** scores and violations
- **Deployment status** with environment health checks

### Artifacts & Reports
Each workflow generates downloadable artifacts:
- **Test coverage reports** (Vitest + Codecov)
- **Lighthouse performance** reports (JSON + HTML)
- **Security audit results** (JSON format)
- **Visual regression** comparison images
- **Accessibility audit** detailed reports

### Notifications & Alerts
- **Slack integration** for deployment notifications
- **Email alerts** for security vulnerabilities
- **GitHub status checks** block merge on failures
- **Performance regression** alerts for Core Web Vitals

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. Build Failures
```bash
# Check Node.js version alignment
node --version  # Should be 20.x
npm --version   # Should be 10.x+

# Clear npm cache
npm cache clean --force
```

#### 2. Test Failures
```bash
# Run tests locally with same environment
cd web/themes/custom/adesso_cms_theme
npm run test:coverage
npm run lint:js
```

#### 3. Security Scan Failures
```bash
# Update dependencies to fix vulnerabilities
composer audit
npm audit fix
```

#### 4. Performance Regression
```bash
# Analyze bundle size
cd web/themes/custom/adesso_cms_theme
npm run build
# Check dist/ folder size and contents
```

#### 5. German Brand Compliance Failures
```bash
# Check for uppercase "adesso" violations
grep -r "ADESSO\|Adesso" --include="*.php" --include="*.twig" --include="*.yml" .
# Replace with lowercase "adesso"
```

### Debugging Workflows
```bash
# View workflow logs
gh run list --workflow=ci.yml
gh run view <run-id> --log

# Download artifacts for analysis
gh run download <run-id>
```

---

## 🚀 Best Practices

### Development Workflow
1. **Create feature branch** from main/develop
2. **Implement changes** with tests
3. **Run local validation** to match CI
4. **Create pull request** (triggers PR preview)
5. **Review preview environment** with stakeholders
6. **Address CI feedback** from quality gates
7. **Merge after approval** (triggers deployment)

### German Market Optimization
1. **Always use lowercase "adesso"** in all content
2. **Test German language** content and functionality
3. **Optimize for German CDN** edge locations
4. **Validate GDPR compliance** for data handling
5. **Monitor Core Web Vitals** for German users

### Security Best Practices
1. **Never commit secrets** or API keys
2. **Update dependencies** regularly
3. **Review security scans** before deployment
4. **Use environment variables** for configuration
5. **Follow Drupal security** best practices

---

## 📈 Performance Optimization

### Frontend Optimization
- **Vite build optimization** with tree shaking
- **Tailwind CSS purging** for minimal bundle size
- **Image optimization** with WebP format
- **Lazy loading** for images and components
- **Service worker** for caching strategy

### Backend Optimization
- **Drupal render caching** optimization
- **Database query** optimization with PHPStan
- **Composer autoloader** optimization
- **OPcache configuration** for production
- **Memory limit** optimization for CI/CD

### German Market Specific
- **CDN configuration** for European edge locations
- **Core Web Vitals** monitoring for German users
- **Mobile performance** optimization for German networks
- **Accessibility optimization** for inclusive German audience

---

## 🎯 Roadmap & Future Enhancements

### Planned Improvements
- [ ] **AI-powered performance** optimization suggestions
- [ ] **Advanced visual regression** testing with AI comparison
- [ ] **Multi-language testing** automation for German/English content
- [ ] **Real User Monitoring** (RUM) integration for German market metrics
- [ ] **Progressive Web App** optimization and testing
- [ ] **Carbon footprint** monitoring for sustainable web practices

### Integration Opportunities
- [ ] **Kubernetes deployment** pipeline for scalability
- [ ] **Terraform infrastructure** as code integration
- [ ] **Advanced monitoring** with Prometheus and Grafana
- [ ] **Machine learning** performance prediction
- [ ] **Automated dependency** updates with intelligent testing

---

## 🤝 Contributing

### Pipeline Contributions
1. **Fork repository** and create feature branch
2. **Implement workflow** improvements or new features
3. **Test thoroughly** in development environment
4. **Document changes** in this README
5. **Submit pull request** with detailed description

### German Market Compliance
All contributions must maintain:
- ✅ **Brand compliance**: adesso wird immer klein geschrieben
- ✅ **GDPR compliance**: Data protection standards
- ✅ **Performance standards**: Core Web Vitals optimization
- ✅ **Accessibility standards**: WCAG 2.1 AA compliance

---

## 📞 Support & Contact

### Technical Support
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and improvements
- **Pull Requests**: For direct contributions and fixes

### German Market Expertise
For German market-specific requirements, localization, and compliance questions, please reference the German brand guidelines and GDPR compliance documentation.

---

## 📄 License & Attribution

**Enterprise CI/CD Pipeline for adesso CMS**
- 🎯 Optimized for German market compliance
- 🔒 Lullabot Enterprise standards implementation  
- 🇩🇪 German brand compliance: "adesso wird immer klein geschrieben"
- ⚡ Performance-first approach with Core Web Vitals focus

🚀 **Generated with [Claude Code](https://claude.ai/code)**

**Co-Authored-By: Claude <noreply@anthropic.com>**

---

*Last Updated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")*