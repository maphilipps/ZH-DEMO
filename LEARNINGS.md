# GPZH Development Learnings

## 🎯 Critical Success Patterns

### **DDEV Snapshot Workflow**
- ✅ **Before every major change**: Create named snapshot
- ✅ **After successful iteration**: Update progress snapshot
- ✅ **After 3 failed attempts**: Reset and restart with learnings
- ✅ **Read this file**: Before starting any new task

### **tmux-cli Parallel Development**
- ✅ **Always use tmux-cli**: For parallel development streams
- ✅ **Monitor all panes**: Real-time feedback on all processes
- ✅ **Capture sessions**: Document development progress
- ✅ **Session persistence**: Resume work exactly where left off

### **Playwright MCP Verification**
- ✅ **Every change verified**: Immediate Playwright testing
- ✅ **Municipality-wide testing**: All 3 sites (Thalwil, Thalheim, Erlenbach)
- ✅ **Performance gates**: >90 Core Web Vitals, <2s load times
- ✅ **Evidence-based PRs**: Include Playwright test results

---

## 📚 Technical Learnings

### **Multi-Site Configuration Lessons**
- ✅ **Separate config directories**: Each municipality has own sync folder
- ✅ **Database prefixes**: Isolate data per municipality (thalwil_, thalheim_, erlenbach_)
- ✅ **Domain mapping**: Proper sites.php configuration essential
- ✅ **DDEV hostnames**: Add all municipality URLs to .ddev/config.yaml

### **AI Integration Best Practices**
- ✅ **Content suggestions**: Test across all content types
- ✅ **Alt-text generation**: Verify quality and cultural appropriateness
- ✅ **Translation workflows**: DE→FR→IT pipeline validation
- ✅ **Performance impact**: Monitor AI API response times

### **Swiss Compliance Requirements**
- ✅ **WCAG 2.1 AA**: Automated testing with axe-core
- ✅ **eCH-0059**: Additional Swiss accessibility standards
- ✅ **DSGVO/CH-DSG**: Data protection compliance verification
- ✅ **Core Web Vitals**: Mobile and desktop performance standards

---

## ⚠️ Common Pitfalls & Solutions

### **DDEV Environment Issues**
- ❌ **Problem**: Sites not accessible after config changes
- ✅ **Solution**: Always restart DDEV after sites.php modifications
- ✅ **Prevention**: Test all URLs immediately after configuration

### **Multi-Site Database Conflicts**
- ❌ **Problem**: Content bleeding between municipalities
- ✅ **Solution**: Verify database prefixes in settings.local.php
- ✅ **Prevention**: Test content isolation after setup

### **AI Feature Performance**
- ❌ **Problem**: Slow response times affecting user experience
- ✅ **Solution**: Implement caching for AI suggestions
- ✅ **Prevention**: Monitor API response times during development

### **Configuration Export/Import**
- ❌ **Problem**: Config conflicts between municipalities
- ✅ **Solution**: Use separate sync directories per site
- ✅ **Prevention**: Always drush cex after changes, test import

---

## 🚀 Optimization Strategies

### **Development Velocity**
- 🏃‍♂️ **tmux-cli sessions**: Parallel development streams
- 🔄 **Snapshot recovery**: Quick rollback on failures
- 🧪 **Automated testing**: Playwright MCP verification
- 📋 **Evidence documentation**: Screenshots and test results

### **Quality Assurance**
- 🎯 **Municipality testing**: All 3 sites for every change
- 📊 **Performance monitoring**: Continuous Core Web Vitals tracking
- ♿ **Accessibility validation**: Automated and manual testing
- 🔒 **Security scanning**: Regular vulnerability assessments

### **Demo Preparation**
- 📱 **Mobile optimization**: Touch-friendly navigation
- 🤖 **AI showcase**: Practical business value demonstrations
- 🇨🇭 **Swiss standards**: Compliance as competitive advantage
- ⚡ **Performance**: Sub-2-second load times consistently

---

## 📝 Iteration Log

### **GPZH-30: Multi-Site Configuration** 
- **Iteration 1**: ✅ Basic multi-site setup successful
- **Iteration 2**: ✅ Database isolation implemented
- **Iteration 3**: ✅ DDEV hostname configuration complete
- **Learning**: Always test URL accessibility immediately after configuration changes

### **Next Tasks Queue**
1. **GPZH-30 completion**: Drupal MCP module installation
2. **Branch reviews**: Address pending PR feedback
3. **Demo content**: Municipality-specific customization
4. **AI features**: Content suggestions and alt-text validation

---

## 🔄 Before Starting New Work

### **Pre-Task Checklist**
- [ ] Read this LEARNINGS.md file completely
- [ ] Create DDEV snapshot with descriptive name
- [ ] Set up tmux-cli session with required panes
- [ ] Verify all 3 municipality sites are accessible
- [ ] Check current branch status and Jira ticket details

### **During Development**
- [ ] Test changes on all 3 municipalities immediately
- [ ] Use Playwright MCP for verification after each significant change
- [ ] Document any new learnings or issues encountered
- [ ] Create progress snapshots after successful iterations

### **Post-Development**
- [ ] Run full Playwright test suite across all municipalities
- [ ] Verify performance and accessibility compliance
- [ ] Export configurations (drush cex) for all affected sites
- [ ] Update this LEARNINGS.md with new insights
- [ ] Create final success snapshot before PR creation

---

## 💡 Success Principles

### **Robust Development**
- **Fail fast, recover faster**: Use snapshots liberally
- **Test early, test often**: Playwright verification on every change
- **Document everything**: Learnings prevent repeated mistakes
- **Parallel efficiency**: tmux-cli maximizes development velocity

### **Swiss Excellence Standards**
- **Quality over speed**: Perfect compliance over quick delivery
- **Evidence-based decisions**: Playwright results guide development
- **Municipality-centric**: Every feature tested across all 3 sites
- **Performance-first**: Core Web Vitals as quality gate

### **Team Collaboration**
- **Clear documentation**: Every change well-documented
- **Evidence-based PRs**: Include test results and screenshots
- **Consistent patterns**: Follow established workflows
- **Knowledge sharing**: Update learnings for team benefit

---

*Letzte Aktualisierung: 2025-01-18*
*Nächster Review: Nach jedem GPZH Task*