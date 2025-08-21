# 🔗 PR-Issue Linking Guide

## Automatic Issue Linking in GitHub

### ✅ Best Practices for PR-Issue Linking

#### 1. Use Linking Keywords in PR Title
```bash
# Good - Will automatically link and close issue when merged
"feat: Add user dashboard (fixes #13)"
"fix: Resolve form validation (closes #15)"
"docs: Update README (resolves #17)"
```

#### 2. Use Linking Keywords in PR Body
```markdown
## 🔗 Fixes #13
<!-- or -->
Closes #13
<!-- or -->
Resolves #13
```

### 📝 Linking Keywords that Auto-Close Issues

These keywords in PR title or body will automatically close the linked issue when PR is merged:
- `fixes #123`
- `closes #123`
- `resolves #123`
- `fix #123`
- `close #123`
- `resolve #123`

### 🔄 Keywords for Reference Only (Won't Auto-Close)
- `refs #123`
- `ref #123`
- `references #123`
- `see #123`
- `re #123`

## 🚀 Helper Scripts

### Start Working on Issue
```bash
# Creates branch and updates issue status
./.github/scripts/start-issue.sh 13
```

### Create PR with Automatic Linking
```bash
# Creates PR that will auto-close issue when merged
./.github/scripts/create-pr.sh 13 "Add user dashboard module"
```

### Manual PR Creation with Linking
```bash
gh pr create \
  --title "feat: Add user dashboard (fixes #13)" \
  --body "## 🔗 Fixes #13\n\nImplementation details..." \
  --base main
```

## 📊 GitHub UI Indicators

When properly linked:
- ✅ Issue shows "1 linked pull request"
- ✅ PR shows issue in "Development" section
- ✅ Issue timeline shows PR activity
- ✅ Issue auto-closes when PR merges

## ❌ Common Mistakes to Avoid

```bash
# Bad - No automatic linking
"feat: Add user dashboard"  # Missing issue reference

# Bad - Wrong keyword (won't auto-close)
"feat: Add user dashboard (issue #13)"  # Use "fixes" instead

# Bad - Wrong format
"feat: Add user dashboard fixes#13"  # Need space before #
```

## 🎯 Complete Example

```bash
# 1. Start work on issue
./.github/scripts/start-issue.sh 13

# 2. Make changes
git add .
git commit -m "feat: implement user dashboard widgets (refs #13)"

# 3. Push branch
git push -u origin feature/issue-13-user-dashboard

# 4. Create PR with auto-linking
./.github/scripts/create-pr.sh 13 "feat: User Dashboard Module"

# Result: PR will be linked to Issue #13 and will auto-close it when merged
```

## 📋 PR Template Usage

The PR template (`.github/pull_request_template.md`) automatically includes:
```markdown
## 🔗 Fixes #[ISSUE_NUMBER]
```

Just replace `[ISSUE_NUMBER]` with the actual number!

---

*Following these practices ensures clean issue tracking and automatic workflow management in GitHub.*