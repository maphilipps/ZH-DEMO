---
description: Detect and prevent security logging and monitoring failures in Drupal as defined in OWASP Top 10:2021-A09
globs: *.php, *.install, *.module, *.inc, *.theme, *.yml
alwaysApply: false
---
# Drupal Security Logging and Monitoring Failures Standards (OWASP A09:2021)

This rule enforces security best practices to prevent logging and monitoring failures in Drupal applications, as defined in OWASP Top 10:2021-A09.

<rule>
name: drupal_logging_failures
description: Detect and prevent security logging and monitoring failures in Drupal as defined in OWASP Top 10:2021-A09
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme|yml)$"
  - type: file_path
    pattern: ".*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Missing critical event logging
      - pattern: "(delete|update|create|execute|grant|revoke|config|schema).*function[^}]*\\{(?![^}]*(log|watchdog|logger))"
        message: "Critical operations should include logging. Implement proper logging for security-relevant actions."
        
      # Pattern 2: Suppressed error logging
      - pattern: "@include|@require|@eval|error_reporting\\(0\\)|ini_set\\(['\"](mdc:display_errors|log_errors)['\"],\\s*['\"]0['\"]\\)"
        message: "Avoid suppressing errors and warnings. Implement proper error handling and logging instead."
        
      # Pattern 3: Improper exception handling without logging
      - pattern: "catch\\s*\\([^{]*\\)\\s*\\{(?![^}]*log|[^}]*watchdog|[^}]*logger)"
        message: "Exceptions should be properly logged, especially in security-critical sections."
        
      # Pattern 4: Disabled watchdog
      - pattern: "dblog\\.settings\\.yml|syslog\\.settings\\.yml|logging\\.settings\\.yml"
        message: "Ensure logging is properly configured and not disabled. Verify log verbosity and retention policies."
        
      # Pattern 5: Missing authentication event logging
      - pattern: "(login|authenticate|logout|password).*function[^}]*\\{(?![^}]*(log|watchdog|logger))"
        message: "Authentication events should always be logged for security monitoring and auditing."
        
      # Pattern 6: Failure to log access control decisions
      - pattern: "AccessResult::(allowed|forbidden|neutral)\\([^)]*\\)(?![^;]*(log|watchdog|logger))"
        message: "Consider logging significant access control decisions, especially denials, for security monitoring."
        
      # Pattern 7: Missing logging in file operations
      - pattern: "(file_save|file_delete|file_move|file_copy)[^;]*;(?![^;]*(log|watchdog|logger))"
        message: "File operations should be logged, especially for security-sensitive files."
        
      # Pattern 8: Insufficient detail in log messages
      - pattern: "(\\->log|watchdog)\\([^,)]*,[^,)]*\\)"
        message: "Log messages should include sufficient context and detail for effective security monitoring."
        
      # Pattern 9: Failure to log configuration changes
      - pattern: "\\$config->set\\([^;]*;(?![^;]*(log|watchdog|logger))"
        message: "Configuration changes should be logged to maintain an audit trail and detect unauthorized changes."
        
      # Pattern 10: Missing logs for API access
      - pattern: "class\\s+[a-zA-Z0-9_]+Resource.+\\{[^}]*function\\s+[a-zA-Z0-9_]+\\([^{]*\\)\\s*\\{(?![^}]*(log|watchdog|logger))"
        message: "API endpoint access should be logged for security monitoring, especially for sensitive operations."

  - type: suggest
    message: |
      **Drupal Security Logging & Monitoring Best Practices:**
      
      1. **Comprehensive Logging Implementation:**
         - Use Drupal's Logger Factory service: `\Drupal::logger('module_name')`
         - Implement proper log levels: emergency, alert, critical, error, warning, notice, info, debug
         - Include context in log messages with relevant identifiers and information
         - Log security-relevant events consistently across the application
         - Structure log messages to facilitate automated analysis
      
      2. **Critical Events to Log:**
         - Authentication events (login attempts, failures, logouts)
         - Access control decisions (particularly denials)
         - All administrative actions
         - Data modification operations on sensitive information
         - Configuration and settings changes
         - File operations (uploads, downloads of sensitive content)
         - API access and usage
      
      3. **Logging Configuration:**
         - Configure appropriate log retention periods based on security requirements
         - Implement log rotation to maintain performance
         - Consider using syslog for centralized logging
         - Protect log files from unauthorized access and modification
         - Configure appropriate verbosity for different environments
      
      4. **Monitoring Implementation:**
         - Define security-relevant log patterns to monitor
         - Implement log aggregation and analysis
         - Set up alerts for suspicious activity patterns
         - Establish response procedures for security events
         - Consider integration with SIEM solutions
      
      5. **Error Handling:**
         - Log exceptions with appropriate error levels
         - Include stack traces in development but not production
         - Implement custom error handlers that ensure proper logging
         - Avoid suppressing errors that might indicate security issues
         - Monitor for patterns in error logs that could indicate attacks

  - type: validate
    conditions:
      # Check 1: Proper logger usage
      - pattern: "\\\\Drupal::logger\\([^)]+\\)->\\w+\\(|\\$this->logger->\\w+\\("
        message: "Using Drupal's logger service correctly."
      
      # Check 2: Context in log messages
      - pattern: "->\\w+\\([^,]+,\\s*[^,]+,\\s*\\["
        message: "Including context information in log messages."
      
      # Check 3: Logging configuration
      - pattern: "dblog\\.settings|syslog\\.settings|logging\\.yml"
        message: "Configuring logging appropriately."
      
      # Check 4: Exception logging
      - pattern: "catch[^{]*\\{[^}]*logger|catch[^{]*\\{[^}]*watchdog|catch[^{]*\\{[^}]*log"
        message: "Properly logging exceptions."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - logging
    - monitoring
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:logging
    - standard:owasp-top10
    - risk:a09-logging-monitoring
  references:
    - "https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/"
    - "https://www.drupal.org/docs/8/api/logging-api/overview"
    - "https://www.drupal.org/docs/develop/security-in-drupal/writing-secure-code-for-drupal"
    - "https://www.drupal.org/docs/8/modules/syslog"
</rule> 