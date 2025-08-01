/**
 * @type { import('@storybook/html-vite').StorybookConfig }
 *
 * Storybook configuration for adesso CMS theme components.
 * Enhanced with Drupal JSON Stories support for Storybook 8.x compatibility.
 * Uses @tailwindcss/vite plugin for full Tailwind CSS v4 integration.
 */


const config = {
  stories: [
    '../components/**/*.stories.js',
    '../components/**/*.mdx'
  ],

  addons: [// Drupal JSON Stories addon integration
    '@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/html-vite',
    options: {}
  },

  docs: {
    defaultName: 'Documentation'
  },

  typescript: {
    reactDocgen: false
  },

  core: {
    disableTelemetry: true
  },

  // Enhanced features for JSON story support
  features: {
    buildStoriesJson: true,
    storyStoreV7: true
  },

  // Vite configuration for DDEV compatibility
  viteFinal: async (config) => {
    // Configure server for DDEV hostname support
    config.server = config.server || {};
    config.server.host = '0.0.0.0';
    config.server.allowedHosts = [
      'localhost',
      '127.0.0.1',
      'adesso-cms.ddev.site',
      'adesso-cms.ddev.site:6006',
      '.ddev.site'
    ];

    // Configure CORS for DDEV
    config.server.cors = {
      origin: [
        'https://adesso-cms.ddev.site',
        'https://adesso-cms.ddev.site:6006',
        'https://adesso-cms.ddev.site:6007',
        'http://localhost:6006',
        'http://127.0.0.1:6006'
      ],
      credentials: true
    };

    // Disable host checking for development
    config.server.disableHostCheck = true;

    return config;
  }
};

export default config;
