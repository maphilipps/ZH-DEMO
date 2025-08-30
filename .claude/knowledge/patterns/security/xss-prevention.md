# XSS Prevention in Twig Templates

**Pattern ID**: security_xss_twig_01  
**Category**: Security  
**Triage Level**: CRITICAL  
**First Seen**: PR #[pending]  
**Last Updated**: 2025-01-30  
**Frequency**: [to be tracked]

## Problem

User input rendered without proper escaping in Twig templates creates XSS (Cross-Site Scripting) vulnerabilities, allowing attackers to inject malicious JavaScript into the application.

### Common Scenarios
- Displaying user names, comments, or profile information
- Rendering user-generated content in templates  
- Outputting data from form submissions
- Displaying content from external APIs or databases

### Code Examples - VULNERABLE

```twig
{# DANGEROUS - Direct output without escaping #}
<h1>Welcome {{ user.name }}</h1>
<div class="content">{{ post.content }}</div>
<input value="{{ form_data.title }}" />

{# DANGEROUS - Using raw filter incorrectly #}
<div>{{ user_comment|raw }}</div>
```

## Solution

Always escape user input using Twig's escape filter (`|e`) or appropriate escaping context.

### Code Examples - SECURE

```twig
{# SAFE - Escaped for HTML context #}
<h1>Welcome {{ user.name|e }}</h1>
<div class="content">{{ post.content|e }}</div>

{# SAFE - Escaped for HTML attribute context #}
<input value="{{ form_data.title|e('html_attr') }}" />

{# SAFE - Escaped for JavaScript context #}
<script>
var username = {{ user.name|e('js') }};
</script>

{# SAFE - Escaped for CSS context #}
<style>
.user-color { background: {{ user.color|e('css') }}; }
</style>

{# SAFE - Escaped for URL context #}
<a href="{{ base_url }}/user/{{ user.id|e('url') }}">Profile</a>
```

### Escape Context Reference

| Context | Filter | Usage |
|---------|--------|-------|
| HTML Content | `\|e` or `\|e('html')` | Default for most content |
| HTML Attributes | `\|e('html_attr')` | Inside HTML attribute values |
| JavaScript | `\|e('js')` | Inside JavaScript strings |
| CSS | `\|e('css')` | Inside CSS property values |
| URL | `\|e('url')` | Inside URLs or query parameters |

## Prevention Strategy

### 1. Default Escaping Policy
Configure Twig to escape by default in `twig.yaml`:
```yaml
twig:
    autoescape: 'html'
    strict_variables: true
```

### 2. Code Review Checklist
- [ ] All user input variables use appropriate escape filters
- [ ] `|raw` filter is never used with user input
- [ ] Context-specific escaping is used (html_attr, js, css, url)
- [ ] Input validation is implemented server-side
- [ ] Content Security Policy (CSP) headers are configured

### 3. Automated Detection
```bash
# Search for potential XSS vulnerabilities in templates
grep -r "{{.*}}" templates/ | grep -v "|e"
```

### 4. Testing Strategy
```php
// Test XSS prevention in templates
public function testTemplateEscapesUserInput() {
    $malicious_input = '<script>alert("XSS")</script>';
    $output = $this->renderTemplate('user_profile.html.twig', [
        'user' => ['name' => $malicious_input]
    ]);
    
    // Should contain escaped version, not executable script
    $this->assertStringContains('&lt;script&gt;', $output);
    $this->assertStringNotContains('<script>', $output);
}
```

## Related Patterns

- [Input Validation](input-validation.md) - Server-side validation as first defense
- [Content Security Policy](../architecture/csp-implementation.md) - Additional XSS protection
- [CSRF Protection](csrf-protection.md) - Related security measure

## Context from PR Reviews

### Common Reviewer Comments
- "This user input should be escaped to prevent XSS attacks"
- "Use |e filter for any user-generated content"  
- "Don't forget to escape attributes differently than content"
- "Consider using context-specific escaping filters"

### Resolution Examples
```twig
# Before (from PR review)
<div class="user-bio">{{ user.biography }}</div>

# After (reviewer suggestion applied)  
<div class="user-bio">{{ user.biography|e }}</div>
```

## Prevention Rule

**Rule XSS-001**: Always escape user input in Twig templates with |e filter to prevent XSS attacks

## Success Metrics

- **Zero XSS vulnerabilities** in security scans
- **100% of user input** properly escaped in templates
- **Reduced review comments** about missing escaping
- **Faster code reviews** due to consistent escaping practices

## Implementation Guide

1. **Audit existing templates** for unescaped variables
2. **Add appropriate escape filters** based on context
3. **Configure default autoescape** in Twig settings
4. **Add linting rules** to catch unescaped variables
5. **Update code review checklist** to include XSS checks
6. **Train team** on different escaping contexts

## Tools and Resources

- [Twig Escaping Documentation](https://twig.symfony.com/doc/3.x/filters/escape.html)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Content Security Policy Generator](https://report-uri.com/home/generate)

---

**Generated from PR review patterns • Last updated: 2025-01-30**