/**
 * @type { import('@storybook/html-vite').StorybookConfig }
 *
 * Streamlined Storybook configuration following PNX patterns.
 * Maintains DDEV compatibility with simplified setup.
 */

const config = {
  stories: [
    '../components/**/*.stories.js',
    '../components/**/*.mdx'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y'
  ],

  framework: {
    name: '@storybook/html-vite',
    options: {}
  },

  core: {
    disableTelemetry: true
  },

  features: {
    buildStoriesJson: true,
    storyStoreV7: true
  },

  // Test runner configuration for PnX architecture
  testRunner: {
    name: '@storybook/test-runner',
    options: {
      configPath: '.storybook/test-runner-jest.config.js'
    }
  },

  // DDEV-compatible Vite configuration (preserved)
  viteFinal: async (config) => {
    // Configure server for DDEV hostname support
    config.server = config.server || {};
    config.server.host = '0.0.0.0';
    
    // Simplified CORS configuration
    config.server.cors = {
      origin: [
        'https://adesso-cms.ddev.site',
        'https://adesso-cms.ddev.site:6006',
        /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/
      ],
      credentials: true
    };

    return config;
  }
};

export default config;
