---
description: Detect and prevent security misconfigurations in Drupal as defined in OWASP Top 10:2021-A05
globs: *.php, *.install, *.module, *.inc, *.theme, *.yml, *.info
alwaysApply: false
---
# Drupal Security Misconfiguration Standards (OWASP A05:2021)

This rule enforces security best practices to prevent misconfiguration vulnerabilities in Drupal applications, as defined in OWASP Top 10:2021-A05.

<rule>
name: drupal_security_misconfiguration
description: Detect and prevent security misconfigurations in Drupal as defined in OWASP Top 10:2021-A05
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme|yml|info\\.yml)$"
  - type: file_path
    pattern: ".*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Development settings in production code
      - pattern: "\\$settings\\['update_free_access'\\]\\s*=\\s*TRUE|\\$settings\\['cache'\\]\\s*=\\s*FALSE|\\$settings\\['rebuild_access'\\]\\s*=\\s*TRUE|\\$config\\['system\\.performance'\\]\\['cache'\\]\\s*=\\s*FALSE"
        message: "Development settings detected in production code. Ensure these settings are only enabled in development environments."
        
      # Pattern 2: Missing or weak trusted host patterns
      - pattern: "settings\\.php|settings\\.local\\.php"
        message: "Verify that $settings['trusted_host_patterns'] is properly configured to prevent HTTP Host header attacks."
        
      # Pattern 3: Debugging/error display enabled
      - pattern: "\\$config\\['system\\.logging'\\]\\['error_level'\\]\\s*=\\s*'verbose'|ini_set\\('display_errors'\\s*,\\s*'1'\\)|error_reporting\\(E_ALL\\)"
        message: "Error display should be disabled in production. Use 'hide' for error_level in production."
        
      # Pattern 4: Insecure file permissions settings
      - pattern: "\\$settings\\['file_chmod_directory'\\]\\s*=\\s*0777|\\$settings\\['file_chmod_file'\\]\\s*=\\s*0666"
        message: "Excessively permissive file permissions detected. Use more restrictive permissions."
        
      # Pattern 5: Disabled or misconfigured CSP headers
      - pattern: "\\.htaccess|sites/default/default\\.settings\\.php"
        message: "Ensure Content-Security-Policy headers are properly configured to prevent XSS attacks."
        
      # Pattern 6: Insecure session cookie settings
      - pattern: "session\\.cookie_secure\\s*=\\s*0|session\\.cookie_httponly\\s*=\\s*0|\\$settings\\['cookie_secure_only'\\]\\s*=\\s*FALSE"
        message: "Session cookies should be secure and HTTP-only in production environments."
        
      # Pattern 7: Missing or misconfigured private file path
      - pattern: "settings\\.php"
        message: "Ensure $settings['file_private_path'] is properly configured for storing sensitive files."
        
      # Pattern 8: Development modules enabled in production
      - pattern: "core\\.extension\\.yml"
        message: "Check for development modules (devel, webprofiler, etc.) that should not be enabled in production."
        
      # Pattern 9: Default or demo content in production
      - pattern: "function\\s+[a-zA-Z0-9_]+_install\\(\\)"
        message: "Remove or secure default/demo content and users in production environments."
        
      # Pattern 10: Missing or misconfigured security headers
      - pattern: "\\.htaccess|nginx\\.conf"
        message: "Verify X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, and Referrer-Policy headers are properly configured."

  - type: suggest
    message: |
      **Drupal Security Configuration Best Practices:**
      
      1. **Environment-Specific Configurations:**
         - Use `settings.local.php` for environment-specific settings
         - Maintain separate development, staging, and production configurations
         - Never enable development settings in production: update_free_access, rebuild_access, etc.
         - Use environment variables or secrets management for sensitive information
      
      2. **Essential Security Settings:**
         - Configure trusted_host_patterns to prevent HTTP Host header attacks
         - Set secure file permissions (e.g., 0755 for directories, 0644 for files)
         - Configure private file path for sensitive uploads
         - Set file_scan_ignore_directories to prevent public access to sensitive directories
         - Implement secure session cookie settings (HTTPOnly, Secure, SameSite)
      
      3. **Error Handling:**
         - Disable verbose error reporting in production with $config['system.logging']['error_level'] = 'hide'
         - Configure custom error pages that don't leak system information
         - Implement appropriate logging without exposing sensitive data
      
      4. **Security Headers:**
         - Set Content-Security-Policy to restrict resource origins
         - Configure X-Frame-Options to prevent clickjacking
         - Enable X-Content-Type-Options to prevent MIME-type sniffing
         - Set Referrer-Policy to control information in HTTP referers
      
      5. **Module & Extension Security:**
         - Disable and uninstall unnecessary modules in production
         - Keep core and contributed modules updated
         - Remove development modules from production (devel, webprofiler, etc.)
         - Implement proper configuration management workflows

  - type: validate
    conditions:
      # Check 1: Proper trusted host patterns
      - pattern: "\\$settings\\['trusted_host_patterns'\\]\\s*=\\s*\\[\\s*['\"][^\"']+['\"]"
        message: "Trusted host patterns are properly configured."
      
      # Check 2: Secure session cookie settings
      - pattern: "\\$settings\\['cookie_secure_only'\\]\\s*=\\s*TRUE|session\\.cookie_secure\\s*=\\s*1"
        message: "Secure cookie settings are properly configured."
      
      # Check 3: Private file path configuration
      - pattern: "\\$settings\\['file_private_path'\\]\\s*=\\s*(\"|')[^\"']+(\"|')"
        message: "Private file path is configured for sensitive files."
      
      # Check 4: Production error settings
      - pattern: "\\$config\\['system\\.logging'\\]\\['error_level'\\]\\s*=\\s*'hide'"
        message: "Error reporting is properly configured for production."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - configuration
    - misconfiguration
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:configuration
    - standard:owasp-top10
    - risk:a05-misconfiguration
  references:
    - "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"
    - "https://www.drupal.org/docs/security-in-drupal/securing-your-site"
    - "https://www.drupal.org/docs/security-in-drupal/drupal-security-best-practices"
    - "https://www.drupal.org/docs/8/security/writing-secure-code-for-drupal-8"
</rule> 