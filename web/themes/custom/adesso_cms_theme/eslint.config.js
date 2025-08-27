import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
        // Drupal globals
        Drupal: 'readonly',
        drupalSettings: 'readonly',
        jQuery: 'readonly',
        $: 'readonly',
        // DDEV globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      // Drupal-specific rules
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^(Drupal|drupalSettings)$',
        argsIgnorePattern: '^_'
      }],
      'no-undef': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      // Code style rules
      'indent': ['error', 2],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      // Function rules for Drupal behaviors
      'func-names': ['error', 'always', { generators: 'never' }],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }]
    }
  },
  {
    files: ['components/**/*.behavior.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        // Drupal behavior globals
        Drupal: 'readonly',
        drupalSettings: 'readonly',
        jQuery: 'readonly',
        $: 'readonly',
        once: 'readonly'
      }
    },
    rules: {
      // Stricter rules for component behaviors
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022
      }
    },
    rules: {
      // Modern ES module rules
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'import/extensions': 'off'
    }
  },
  {
    files: ['.storybook/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      // Storybook configuration rules
      'no-unused-vars': 'warn',
      'import/no-extraneous-dependencies': 'off'
    }
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    },
    rules: {
      // Test-specific rules
      'no-unused-vars': 'warn'
    }
  }
];