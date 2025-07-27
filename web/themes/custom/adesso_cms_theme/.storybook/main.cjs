/**
 * @file
 * Storybook configuration - Austauschbar für Frontend-Entwickler
 * Diese Konfiguration ist unabhängig von Drupal-Integration
 * Drupal-Integration befindet sich in components/drupal-integration/
 */

const { dirname, join } = require('path');

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

module.exports = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  
  addons: [
    getAbsolutePath('@storybook/addon-essentials'), // includes actions, controls, docs, viewport, backgrounds
    getAbsolutePath('@storybook/addon-links'),
    // getAbsolutePath('@storybook/addon-actions'), // REMOVED: Already included in essentials
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@storybook/experimental-addon-test'),
    // Optional addons - können von Frontend-Entwicklern angepasst werden
    // '@storybook/addon-interactions',
    // '@storybook/addon-mdx-gfm',
    // '@chromatic-com/storybook',
    // '@storybook/addon-a11y',
  ],
  
  framework: {
    name: getAbsolutePath('@storybook/html-webpack5'),
    options: {}
  },
  
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  
  staticDirs: [
    { from: '../dist', to: '/dist' },
    { from: '../static', to: '/static' }
  ],
  
  features: {
    buildStoriesJson: true,
    // Enable controlled hot reload for stable development
    hotReload: true,
    // interactionsDebugger: true, // Optional für Frontend-Entwickler
  },

  tags: ['test'],
  
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  webpackFinal: async (config) => {
    // Optimize file watching to prevent infinite reload
    config.watchOptions = {
      aggregateTimeout: 1000, // Increased debounce time
      poll: false,
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/storybook-static/**',
        '**/.git/**',
        '**/coverage/**',
        '**/test-results/**',
        '**/vendor/**',
        '**/.ddev/**',
        '**/build/**',
        '**/.cache/**'
      ]
    };

    // Add support for CSS
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: false, // Disable source maps for better performance
          },
        },
        'postcss-loader',
      ],
    });
    
    // Add support for TWIG files (as raw text for now)
    config.module.rules.push({
      test: /\.twig$/,
      type: 'asset/source',
    });
    
    return config;
  },
  
  env: (config) => ({
    ...config,
    STORYBOOK_THEME_PATH: '/themes/custom/adesso_cms_theme',
  }),
  
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="/dist/assets/adesso.css">
  `,
};