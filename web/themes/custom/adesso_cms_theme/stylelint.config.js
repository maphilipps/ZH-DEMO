const config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-scss'
  ],
  plugins: [
    'stylelint-scss'
  ],
  defaultSeverity: 'warning',
  rules: {
    // Tailwind CSS v4 support (preserved from original)
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'config',
          'import'
        ]
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'theme',
          'screen'
        ]
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'user-select'
        ]
      }
    ],
    
    // Original rules preserved
    'color-named': [
      'never',
      {
        ignore: ['inside-function']
      }
    ],
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'config'
        ]
      }
    ],

    // NEW: PNX-inspired BEM pattern enforcement
    'selector-class-pattern': [
      '^([a-z])([a-z0-9]+)(-[a-z0-9]+)?(((--)?(__)?)([a-z0-9]+)(-[a-z0-9]+)?)?$',
      {
        message: 'Expected class selector to be BEM selector matching either .block__element or .block--modifier',
        severity: 'warning' // Start with warnings for gradual adoption
      }
    ],
    'selector-nested-pattern': [
      '^&',
      {
        message: 'Expected nested selector to start with "&"'
      }
    ],
    
    // PNX-inspired modern CSS rules
    'custom-property-empty-line-before': null,
    'import-notation': 'string'
  },
  ignoreFiles: [
    'node_modules/**/*',
    'vendor/**/*',
    'dist/**/*',
    'storybook-static/**/*',
    'build/**/*',
    // Ignore Drupal core and contrib
    'web/core/**/*',
    'web/sites/**/*',
    'web/modules/contrib/**/*',
    'web/themes/contrib/**/*',
    'web/libraries/**/*'
  ]
};

export default config;