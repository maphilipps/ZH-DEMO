# BackstopJS Automated Testing Hook

This hook automatically runs BackstopJS visual regression tests after each task completion to ensure UI consistency.

## Features

- **Automatic Execution**: Runs after every task completion
- **Full Pipeline**: Builds theme, clears cache, runs tests
- **Visual Feedback**: Color-coded output with clear status messages
- **Health Check**: Verifies showcase page accessibility
- **Smart Reporting**: Direct links to HTML reports for review

## Installation

The hook is already installed in `.claude/hooks/`. To activate:

1. **For Claude Code Integration**:
   ```bash
   # The hook is automatically available
   .claude/hooks/run-backstop-tests.sh
   ```

2. **For Manual Testing**:
   ```bash
   # Run the simple version
   .claude/hooks/run-backstop-tests.sh
   
   # Or run the detailed version
   .claude/hooks/after-task-backstop.sh
   ```

## Configuration

The hook uses the existing `backstop.json` configuration with 4 test scenarios:

1. Landing Page - Welcome adesso CMS
2. Basic Page - Our Product Vision
3. Basic Page - Events
4. Basic Page - Complete Paragraph Showcase

Each scenario is tested on:
- Mobile viewport (375x667)
- Desktop viewport (1920x1080)

## Usage

### Automatic (After Task Completion)

The hook runs automatically when tasks are completed. No manual intervention needed.

### Manual Testing

```bash
# Quick test
.claude/hooks/run-backstop-tests.sh

# Detailed test with colored output
.claude/hooks/after-task-backstop.sh
```

### Handling Test Results

**When tests pass:**
- All green checkmarks
- No action needed

**When visual differences are detected:**
1. Review the HTML report: `backstop_data/html_report/index.html`
2. If changes are intentional: `ddev backstop approve`
3. If changes are bugs: Fix the issues and re-run

## Files

- `after-task-backstop.sh` - Main hook script with detailed output
- `run-backstop-tests.sh` - Simple wrapper for quick testing
- `hooks.json` - Hook configuration for Claude Code
- `README.md` - This documentation

## Troubleshooting

**Hook not running?**
- Ensure scripts are executable: `chmod +x .claude/hooks/*.sh`
- Check DDEV is running: `ddev status`

**Tests failing consistently?**
- Update reference images: `ddev backstop reference`
- Clear all caches: `ddev drush cr`
- Rebuild theme: `cd web/themes/custom/adesso_cms_theme && ddev npm run build`

**Page not accessible?**
- Check DDEV status: `ddev status`
- Verify URL: https://adesso-cms.ddev.site/complete-paragraph-showcase

## Benefits

1. **Early Detection**: Catches visual regressions immediately
2. **Consistency**: Ensures UI remains stable across changes
3. **Documentation**: Creates visual history of changes
4. **Confidence**: Validates that styling changes work as expected
5. **Automation**: No manual testing needed for basic visual QA

## Integration with CI/CD

This hook can be integrated into CI/CD pipelines by calling:
```bash
.claude/hooks/run-backstop-tests.sh
```

Exit codes:
- `0` - All tests passed
- `1` - Visual differences detected or execution failed
EOF < /dev/null