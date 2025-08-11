# BackstopJS Hook Integration Guide

## Quick Start

The BackstopJS testing hook has been successfully created and is ready to use. Here's how to integrate it into your workflow:

### 1. Immediate Usage

Run tests manually at any time:
```bash
cd /Users/marc.philipps/Sites/adesso-cms
.claude/hooks/run-backstop-tests.sh
```

### 2. Claude Code Integration

To have this run automatically after each task:

**Option A: Direct Execution**
Add to your task completion workflow:
```bash
# After completing any task
.claude/hooks/after-task-backstop.sh
```

**Option B: Via NPM Script**
Add to `package.json`:
```json
"scripts": {
  "post-task": ".claude/hooks/run-backstop-tests.sh"
}
```

### 3. Git Hooks Integration

To run before commits:
```bash
# Create git pre-commit hook
cat > .git/hooks/pre-commit << 'HOOK'
#\!/bin/bash
.claude/hooks/run-backstop-tests.sh
HOOK
chmod +x .git/hooks/pre-commit
```

## Test Coverage

The hook automatically tests these critical pages:
- ✅ Landing Page - Welcome adesso CMS
- ✅ Basic Page - Our Product Vision
- ✅ Basic Page - Events
- ✅ Basic Page - Complete Paragraph Showcase

Each page is tested on:
- 📱 Mobile (375x667)
- 💻 Desktop (1920x1080)

## Workflow

### Standard Development Flow

1. **Make Changes** → Work on your feature/fix
2. **Auto Test** → Hook runs automatically
3. **Review Results** → Check if visual changes are expected
4. **Approve/Fix** → Either approve changes or fix issues
5. **Commit** → Safe to commit with confidence

### Handling Test Results

**✅ All Tests Pass**
```bash
# Output will show:
✅ All visual regression tests passed\!
```
No action needed - proceed with confidence\!

**⚠️ Visual Differences Detected**
```bash
# Output will show:
⚠️ Visual differences detected. Review: backstop_data/html_report/index.html
```

**Review the changes:**
1. Open the report: `open backstop_data/html_report/index.html`
2. Review each difference
3. Decide:
   - **Expected changes**: Run `ddev backstop approve`
   - **Unexpected changes**: Fix the issues and re-test

**❌ Test Execution Failed**
```bash
# Check for:
- DDEV not running: `ddev start`
- Build errors: `cd web/themes/custom/adesso_cms_theme && ddev npm run build`
- Cache issues: `ddev drush cr`
```

## Configuration

### Modify Test Scenarios

Edit `backstop.json` to add/remove test scenarios:
```json
{
  "scenarios": [
    {
      "label": "Your New Page",
      "url": "http://web/your-page-path",
      "delay": 5000
    }
  ]
}
```

### Adjust Hook Behavior

Edit `.claude/hooks/hooks.json`:
```json
{
  "hooks": {
    "after-task": {
      "enabled": true,           // Toggle on/off
      "continueOnError": true,    // Don't block on failures
      "timeout": 120000           // Adjust timeout (ms)
    }
  }
}
```

## Benefits

1. **🛡️ Protection**: Catch visual regressions before they reach production
2. **⚡ Speed**: Automated testing saves manual QA time
3. **📊 Documentation**: Visual history of all UI changes
4. **🎯 Confidence**: Know exactly what changed and why
5. **🤝 Collaboration**: Share visual reports with team

## Commands Reference

```bash
# Run tests
.claude/hooks/run-backstop-tests.sh

# Update reference images (after approving changes)
ddev backstop reference

# Approve current changes
ddev backstop approve

# Open report in browser
ddev backstop openReport

# Run with detailed output
.claude/hooks/after-task-backstop.sh
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Hook not found | `chmod +x .claude/hooks/*.sh` |
| DDEV not running | `ddev start` |
| Build fails | `cd web/themes/custom/adesso_cms_theme && ddev npm install` |
| Tests timeout | Increase timeout in `hooks.json` |
| Wrong URL | Check DDEV URL: `ddev describe` |

### Debug Mode

For verbose output:
```bash
bash -x .claude/hooks/run-backstop-tests.sh
```

## Success Metrics

The hook is working correctly when:
- ✅ Runs automatically after tasks
- ✅ Builds theme successfully
- ✅ Clears cache without errors
- ✅ Executes BackstopJS tests
- ✅ Provides clear pass/fail feedback
- ✅ Links to HTML reports for review

## Next Steps

1. **Baseline**: If needed, update reference images:
   ```bash
   ddev backstop reference
   ```

2. **Customize**: Add your critical pages to `backstop.json`

3. **Integrate**: Add to your CI/CD pipeline

4. **Monitor**: Review reports regularly to track UI evolution

---

**Hook Status**: ✅ READY TO USE
**Location**: `/Users/marc.philipps/Sites/adesso-cms/.claude/hooks/`
**Support**: Review `.claude/hooks/README.md` for detailed documentation
EOF < /dev/null