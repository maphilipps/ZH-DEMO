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
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-actions'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
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
  
  staticDirs: ['../dist', '../assets'],
  
  features: {
    buildStoriesJson: true,
    // interactionsDebugger: true, // Optional für Frontend-Entwickler
  },
  
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  webpackFinal: async (config) => {
    // Add support for CSS
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
          },
        },
        'postcss-loader',
      ],
    });
    
    return config;
  },
  
  env: (config) => ({
    ...config,
    STORYBOOK_THEME_PATH: '/themes/custom/adesso_cms_theme',
  }),
};