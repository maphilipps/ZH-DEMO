---
description: Detect and prevent vulnerabilities related to outdated or vulnerable components in Drupal as defined in OWASP Top 10:2021-A06
globs: *.php, *.install, *.module, *.inc, *.theme, *.yml, *.info
alwaysApply: false
---
# Drupal Vulnerable and Outdated Components Standards (OWASP A06:2021)

This rule enforces security best practices to prevent vulnerabilities related to outdated or vulnerable components in Drupal applications, as defined in OWASP Top 10:2021-A06.

<rule>
name: drupal_vulnerable_components
description: Detect and prevent vulnerabilities related to outdated or vulnerable components in Drupal as defined in OWASP Top 10:2021-A06
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|info\\.yml|json)$"
  - type: file_path
    pattern: ".*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Outdated Drupal core version declaration
      - pattern: "core:\\s*('|\")8\\.[0-6](mdc:'|\")|core_version_requirement:\\s*('|\")[^9].+('|\")"
        message: "Potentially outdated Drupal core version detected. Consider upgrading to the latest secure version of Drupal 9 or 10."
        
      # Pattern 2: Usage of deprecated functions
      - pattern: "drupal_set_message\\(|format_date\\(|drupal_render\\(|entity_load\\(|variable_get\\(|variable_set\\("
        message: "Deprecated function detected. Use modern replacements to ensure compatibility and security updates."
        
      # Pattern 3: Known vulnerable libraries referenced
      - pattern: "jquery\\.min\\.js\\?v=1\\.|jquery-1\\.|jquery-2\\.|ckeditor/|tinymce/|angular\\.js@1\\."
        message: "Potentially vulnerable JavaScript library version detected. Update to the latest secure version."
        
      # Pattern 4: Direct inclusion of external scripts without SRI
      - pattern: "<script\\s+src=['\"]http|<script\\s+src=['\"]//|<link\\s+[^>]*href=['\"]http"
        message: "External scripts or stylesheets without Subresource Integrity (SRI) checks detected. Add integrity and crossorigin attributes."
        
      # Pattern 5: Use of obsolete or removed modules
      - pattern: "module:\\s*('[^']*captcha'|'recaptcha'|'xmlrpc'|'openid'|'php')"
        message: "Potentially vulnerable or deprecated module detected. Consider using more secure alternatives."
        
      # Pattern 6: Hard-coded versions in composer.json
      - pattern: "\"drupal/[^\"]+\":\\s*\"(~|\\^)?[0-9]\\.[0-9]\\.[0-9]\"" 
        message: "Hard-coded specific version detected in composer.json. Consider using version ranges to receive security updates."
        
      # Pattern 7: Outdated or insecure PHP API usage
      - pattern: "mysql_|split\\(|ereg\\(|eregi\\(|create_function\\(|each\\("
        message: "Deprecated or insecure PHP function detected. Use modern alternatives for better security."
        
      # Pattern 8: Usage of contrib modules without version constraints
      - pattern: "type:\\s*module\\s*\\nname:"
        message: "Ensure your module specifies core_version_requirement to prevent installation on unsupported Drupal versions."
        
      # Pattern 9: Missing security advisories handling in composer.json
      - pattern: "composer\\.json"
        message: "Consider adding drupal/core-security-advisories as a dev dependency to detect known vulnerable packages."
        
      # Pattern 10: Direct usage of vulnerable sanitization functions
      - pattern: "check_plain\\(|filter_xss\\(|filter_xss_admin\\("
        message: "Legacy text sanitization function detected. Use Html::escape() or Xss::filter() instead."

  - type: suggest
    message: |
      **Drupal Component Security Best Practices:**
      
      1. **Update Management:**
         - Keep Drupal core updated to the latest secure version
         - Subscribe to the Drupal Security Newsletter
         - Implement a regular update schedule (monthly at minimum)
         - Use security advisories checking in your development workflow
         - Implement Composer's security-advisories metadata
      
      2. **Dependency Management:**
         - Use Composer for managing all dependencies
         - Specify version constraints that allow security updates
         - Add drupal/core-security-advisories as a dev dependency
         - Regularly run `composer update --with-dependencies`
         - Use `composer outdated` to identify outdated packages
      
      3. **API Usage:**
         - Use modern Drupal APIs rather than deprecated functions
         - Migrate away from jQuery to modern JavaScript where possible
         - Implement Subresource Integrity (SRI) for external resources
         - Update custom code to use current best practices
         - Follow the Drupal API deprecation policies
      
      4. **Security Monitoring:**
         - Implement automated vulnerability scanning in CI/CD
         - Use tools like Drupal Check or Upgrade Status module
         - Monitor the Drupal security advisories page
         - Implement automated updates for non-critical dependencies
         - Set up alerts for security issues in used components
      
      5. **Module Management:**
         - Remove unused modules from your codebase
         - Prefer well-maintained modules with security teams
         - Implement proper version constraints in module info files
         - Consider the security impact before adding new dependencies
         - Document your dependency management practices

  - type: validate
    conditions:
      # Check 1: Proper core version requirement
      - pattern: "core_version_requirement:\\s*[\"']\\^(8\\.8|8\\.9|9|10)\\.[0-9]+[\"']"
        message: "Using proper core version requirements."
      
      # Check 2: Use of modern APIs
      - pattern: "\\\\Drupal::messenger\\(\\)|->messenger\\(\\)|\\\\Drupal::service\\('messenger'\\)"
        message: "Using modern message API instead of deprecated functions."
      
      # Check 3: Proper composer usage
      - pattern: "\"require\":\\s*\\{[^}]*\"drupal/core(-recommended)?\":\\s*\"\\^[0-9]+\\.[0-9]+\""
        message: "Using proper version constraints in Composer."
      
      # Check 4: SRI implementation
      - pattern: "integrity=[\"'][a-zA-Z0-9\\+/=\\-_]+[\"']\\s+crossorigin=[\"']anonymous[\"']"
        message: "Properly implementing Subresource Integrity."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - dependencies
    - vulnerable-components
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:dependencies
    - standard:owasp-top10
    - risk:a06-vulnerable-components
  references:
    - "https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/"
    - "https://www.drupal.org/docs/security-in-drupal/staying-up-to-date"
    - "https://www.drupal.org/docs/upgrading-drupal"
    - "https://www.drupal.org/docs/develop/using-composer/managing-dependencies-for-a-drupal-project"
</rule> 