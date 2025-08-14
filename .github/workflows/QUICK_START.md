# 🚀 CI/CD Quick Start Guide

## Essential Commands for Developers

### 🔧 Local Development
```bash
# Start development environment
ddev start
ddev theme dev          # Vite dev server (localhost:5173)
ddev theme storybook    # Storybook (localhost:6006)

# Quality checks before committing
ddev theme test         # Unit tests
ddev theme qa:full      # Complete QA pipeline
ddev export-all         # Export configuration
```

### 📝 Creating Linear Tasks
```bash
# Branch naming convention
git checkout -b feature/linear-ADC-123-short-description
git checkout -b bugfix/linear-ADC-456-fix-description
git checkout -b hotfix/linear-ADC-789-critical-fix
```

### 🔍 Quality Gates Checklist

Before creating a PR, ensure:
- [ ] ✅ **Code Quality**: ESLint/Stylelint pass
- [ ] 🧪 **Unit Tests**: >90% coverage
- [ ] 🏗️ **Build**: Production build succeeds
- [ ] 👁️ **Visual**: No regression detected
- [ ] 🔒 **Security**: No vulnerabilities
- [ ] ♿ **Accessibility**: WCAG 2.1 AA compliant
- [ ] 🎭 **E2E**: User workflows functional

### 🚨 Emergency Procedures

#### Hotfix Process
```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/linear-ADC-XXX-critical-issue

# After fix, create PR to main
# Deployment: Use workflow_dispatch -> production
```

#### Rollback Process
```bash
# If deployment fails
# 1. Use GitHub Actions to trigger rollback
# 2. Revert commits if necessary
# 3. Update Linear task status
```

## 🎯 Common Workflows

### 1. New Feature Development
```bash
# 1. Create Linear task
# 2. Create feature branch
git checkout -b feature/linear-ADC-123-new-component

# 3. Develop with quality checks
ddev theme dev
ddev theme test:watch

# 4. Before committing
ddev theme qa:full

# 5. Create PR (triggers all quality gates)
# 6. Review & merge after approval
```

### 2. Configuration Changes
```bash
# 1. Make changes in Drupal admin
# 2. Export configuration
ddev export-all

# 3. Commit configuration
git add config-export/
git commit -m "feat: Update content type configuration

Completes ADC-XXX

🤖 Generated with Claude Code"

# 4. CI will validate configuration import
```

### 3. Theme/Component Updates
```bash
# 1. Update component
cd web/themes/custom/adesso_cms_theme

# 2. Update tests
npm run test:watch

# 3. Update visual baselines if needed
npm run visual:reference

# 4. Validate build
npm run build
npm run qa:full

# 5. Update Storybook documentation
npm run storybook
```

## 📊 Pipeline Status Indicators

### ✅ Green (All Gates Pass)
- Ready for deployment
- All quality standards met
- Security clearance approved

### 🟡 Yellow (Non-Critical Issues)
- Some gates failed but not blocking
- Performance warnings
- Minor accessibility issues

### 🔴 Red (Deployment Blocked)
- Critical quality gates failed
- Security vulnerabilities found
- Build or test failures

## 🔗 Quick Links

- **Linear Workspace**: [venneker-gruppe](https://linear.app/venneker-gruppe)
- **GitHub Actions**: [Pipeline Status](../../actions)
- **Storybook**: `ddev theme storybook`
- **Local Site**: `https://adesso-cms.ddev.site`

## 💡 Pro Tips

1. **Run QA locally**: Always run `ddev theme qa:full` before pushing
2. **Use feature flags**: For experimental features, use feature flags
3. **Monitor pipeline**: Watch GitHub Actions for early feedback
4. **Update baselines**: Keep visual regression baselines current
5. **Document changes**: Update Storybook stories for new components

## 🆘 Getting Help

### Slack Channels
- `#adesso-cms-dev` - Development questions
- `#adesso-cms-ops` - CI/CD and deployment issues
- `#adesso-cms-design` - Design and UX discussions

### Documentation
- [Full CI/CD Documentation](./README.md)
- [DDEV Commands](./.ddev/commands/web/)
- [Theme Documentation](../web/themes/custom/adesso_cms_theme/README.md)

### Emergency Contacts
- **On-call Developer**: Check Slack status
- **DevOps Team**: @devops-team in Slack
- **Security Issues**: security@adesso.de