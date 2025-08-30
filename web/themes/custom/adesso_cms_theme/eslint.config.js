import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        // Drupal globals - preserved from original config
        Drupal: true,
        drupalSettings: true,
        once: true,
        drupalTranslations: true,
        jQuery: true,
        $: true,
        // Modern frontend globals
        Alpine: true,
        Swiper: true,
        Prism: true
      }
    }
  },
  {
    rules: {
      // Core JavaScript quality rules
      'no-console': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'consistent-return': 'warn',
      'no-unused-vars': 'warn',
      
      // Code style rules (preserved from original)
      'indent': ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'always'],
      'camelcase': 'off',
      'eqeqeq': 'error',
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true
        }
      ],
      
      // Function and variable rules
      'new-cap': 'error',
      'one-var': ['error', 'never'],
      'brace-style': ['error', 'stroustrup'],
      'valid-jsdoc': 'warn',
      'block-scoped-var': 'warn',
      'curly': 'error',
      
      // Security and best practices
      'no-alert': 'warn',
      'no-eval': 'error',
      'no-implicit-coercion': 'error',
      'no-loop-func': 'error',
      'no-script-url': 'error',
      'no-sequences': 'error',
      'no-useless-concat': 'error',
      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true
        }
      ],
      
      // Formatting rules
      'eol-last': 'error',
      'no-trailing-spaces': 'error',
      'no-underscore-dangle': 'error',
      'require-jsdoc': 'warn',
      'space-before-blocks': 'error',
      'yoda': 'error',
      'no-case-declarations': 'off'
    }
  },
  {
    files: ['gulpfile.js', 'gulp-tasks/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    ignores: [
      'node_modules/**',
      'vendor/**',
      'dist/**',
      'storybook-static/**',
      'web/core/**',
      'web/sites/**',
      'web/modules/contrib/**',
      'web/themes/contrib/**',
      'web/libraries/**',
      'build/**'
    ]
  }
];