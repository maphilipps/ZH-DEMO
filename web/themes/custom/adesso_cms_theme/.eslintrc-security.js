/**
 * ESLint Security Configuration for GPZH Municipal Portal
 * Phase 3.3 - Security-focused linting rules for Swiss government compliance
 * 
 * Implements eCH-0194 Swiss cybersecurity standards for JavaScript security
 */

module.exports = {
  extends: [
    '@eslint/js/configs/recommended',
    'plugin:security/recommended'
  ],
  plugins: ['security'],
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  globals: {
    // Drupal globals
    Drupal: 'readonly',
    drupalSettings: 'readonly',
    jQuery: 'readonly',
    once: 'readonly',
    // Alpine.js
    Alpine: 'readonly',
    // Swiper
    Swiper: 'readonly'
  },
  rules: {
    // Security-focused rules for Swiss government compliance
    
    // XSS Prevention - Critical for municipal portals
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-non-literal-require': 'error',
    'security/detect-object-injection': 'error',
    'security/detect-possible-timing-attacks': 'warn',
    'security/detect-pseudoRandomBytes': 'error',
    'security/detect-unescaped-output': 'error',
    
    // Swiss government security requirements
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-console': 'warn', // Allow for development, warn for production
    
    // Content Security Policy compliance
    'no-inline-comments': 'off', // Allow inline comments for documentation
    
    // Municipal portal specific security
    'no-alert': 'error', // No alert dialogs in government portals
    'no-confirm': 'error', // No confirm dialogs
    'no-with': 'error', // Avoid with statements
    
    // Data protection and privacy
    'no-debugger': 'error',
    'no-unused-vars': ['error', { 
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false 
    }],
    
    // Accessibility security (government requirement)
    'no-global-assign': 'error',
    'no-implicit-globals': 'error',
    
    // Swiss compliance specific rules
    'prefer-const': 'error',
    'no-var': 'error',
    'strict': ['error', 'global'],
    
    // Municipal data handling security
    'no-empty': 'error',
    'no-empty-function': 'warn',
    'no-magic-numbers': ['warn', { 
      ignore: [0, 1, -1],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false 
    }],
    
    // Government portal performance security
    'no-loop-func': 'error',
    'no-new-wrappers': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',
    
    // Municipal portal error handling
    'handle-callback-err': 'error',
    'no-path-concat': 'error',
    'no-process-exit': 'error'
  },
  overrides: [
    {
      // Drupal behavior files
      files: ['**/*.behavior.js'],
      rules: {
        // Allow Drupal-specific patterns
        'no-unused-vars': ['error', { args: 'none' }],
        'security/detect-object-injection': 'warn' // Drupal behaviors use object injection patterns
      }
    },
    {
      // Storybook files
      files: ['**/*.stories.js', '**/*.stories.data.js', '.storybook/**/*.js'],
      rules: {
        // Relaxed rules for story files
        'no-console': 'off',
        'security/detect-object-injection': 'off',
        'no-magic-numbers': 'off'
      }
    },
    {
      // Test files
      files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
      rules: {
        // Relaxed rules for tests
        'no-console': 'off',
        'security/detect-eval-with-expression': 'off',
        'no-magic-numbers': 'off'
      }
    }
  ],
  // Security-focused environment configuration
  settings: {
    // Swiss government security context
    'security/government-compliance': 'eCH-0194',
    'security/portal-type': 'municipal',
    'security/citizen-data': 'protected'
  }
};