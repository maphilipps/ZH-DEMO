---
description: Detect and prevent identification and authentication failures in Drupal as defined in OWASP Top 10:2021-A07
globs: *.php, *.inc, *.module, *.install, *.info.yml, *.theme
alwaysApply: false
---
# Drupal Identification and Authentication Failures Standards (OWASP A07:2021)

This rule enforces security best practices to prevent identification and authentication failures in Drupal applications, as defined in OWASP Top 10:2021-A07.

<rule>
name: drupal_authentication_failures
description: Detect and prevent identification and authentication failures in Drupal as defined in OWASP Top 10:2021-A07
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme|yml)$"
  - type: file_path
    pattern: ".*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Weak or missing password policies
      - pattern: "UserPasswordConstraint|PasswordPolicy|user\\.settings\\.yml"
        message: "Ensure strong password policies are configured to require complexity, length, and prevent common passwords."
        
      # Pattern 2: Custom authentication without proper validation
      - pattern: "(authenticate|login|auth).*function[^}]*return\\s+(TRUE|true|1)\\s*;"
        message: "Custom authentication functions should implement proper validation and not return TRUE without checks."
        
      # Pattern 3: Improper password comparison
      - pattern: "==\\s*\\$password|===\\s*\\$password|strcmp\\(|password_verify\\([^,]+,[^,]+\\$plainTextPassword"
        message: "Avoid direct password comparison. Use Drupal's built-in password verification services."
        
      # Pattern 4: Credentials in code
      - pattern: "(username|user|pass|password|pwd)\\s*=\\s*['\"][^'\"]+['\"]"
        message: "Hardcoded credentials detected. Store credentials securely outside of code."
        
      # Pattern 5: Missing or weak CSRF protection
      - pattern: "drupal_get_token\\(|form_token|\\$form\\[['\"]#token['\"]\\]\\s*=|drupal_valid_token\\("
        message: "Ensure proper CSRF protection is implemented for all authenticated actions."
        
      # Pattern 6: Insecure session management
      - pattern: "setcookie\\(|session_regenerate_id\\(false\\)|session_regenerate_id\\([^\\)]*"
        message: "Use Drupal's session management. If custom code is required, ensure secure session handling practices."
        
      # Pattern 7: Missing account lockout protection
      - pattern: "user\\.flood\\.yml|flood_control|UserFloodControl|user_failed_login_"
        message: "Ensure proper account lockout and flood control mechanisms are configured to prevent brute force attacks."
        
      # Pattern 8: Insecure password reset implementation
      - pattern: "user_pass_reset|password_reset|reset.*token"
        message: "Verify password reset functionality uses secure tokens with proper expiration and validation."
        
      # Pattern 9: Lack of multi-factor authentication
      - pattern: "tfa|two_factor|multi_factor|2fa"
        message: "Consider implementing multi-factor authentication for sensitive operations or user roles."
        
      # Pattern 10: Default or test accounts
      - pattern: "\\$user->name\\s*=\\s*['\"]admin['\"]|\\$name\\s*=\\s*['\"]admin['\"]|->values\\(['\"](mdc:name|mail)['\"]\\)\\s*->\\s*set\\(['\"][^\\'\"]+['\"]\\)"
        message: "Avoid creating default administrator accounts or test users in production code."

  - type: suggest
    message: |
      **Drupal Authentication Security Best Practices:**
      
      1. **Password Policies:**
         - Use Drupal's Password Policy module for enforcing strong passwords
         - Configure minimum password length (12+ characters recommended)
         - Require complexity (uppercase, lowercase, numbers, special characters)
         - Implement password rotation for sensitive roles
         - Check passwords against known breached password databases
      
      2. **Authentication Infrastructure:**
         - Use Drupal's core authentication mechanisms rather than custom solutions
         - Implement proper account lockout after failed login attempts
         - Consider multi-factor authentication (TFA module) for privileged accounts
         - Implement session timeout for inactivity
         - Use HTTPS for all authentication traffic
      
      3. **Session Management:**
         - Use Drupal's session management system rather than PHP's session functions
         - Configure secure session cookie settings in settings.php
         - Implement proper session regeneration on privilege changes
         - Consider using the Session Limit module to restrict concurrent sessions
         - Properly destroy sessions on logout
      
      4. **Account Management:**
         - Implement proper account provisioning and deprovisioning processes
         - Use email verification for new account registration
         - Implement secure password reset mechanisms with limited-time tokens
         - Apply the principle of least privilege for user roles
         - Regularly audit user accounts and permissions
      
      5. **Authentication Hardening:**
         - Monitor for authentication failures and suspicious patterns
         - Implement IP-based and username-based flood control
         - Log authentication events for security monitoring
         - Consider CAPTCHA or reCAPTCHA for login forms
         - Use OAuth or SAML for single sign-on where appropriate

  - type: validate
    conditions:
      # Check 1: Proper password handling
      - pattern: "password_verify\\(|UserPassword|\\\\Drupal::service\\(['\"]password['\"]\\)"
        message: "Using Drupal's password services correctly."
      
      # Check 2: CSRF token implementation
      - pattern: "\\$form\\[['\"]#token['\"]\\]\\s*=\\s*['\"][^'\"]+['\"]"
        message: "Form includes CSRF protection token."
      
      # Check 3: Proper session management
      - pattern: "\\$request->getSession\\(\\)|\\\\Drupal::service\\(['\"]session['\"]\\)"
        message: "Using Drupal's session management services."
      
      # Check 4: User flood control
      - pattern: "user\\.flood\\.yml|flood|user_login_final_validate"
        message: "Implementing user flood protection."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - authentication
    - identification
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:authentication
    - standard:owasp-top10
    - risk:a07-authentication-failures
  references:
    - "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"
    - "https://www.drupal.org/docs/security-in-drupal/drupal-security-best-practices"
    - "https://www.drupal.org/project/tfa"
    - "https://www.drupal.org/project/password_policy"
</rule> 