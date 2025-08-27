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

  // Enhanced Storybook-specific Vite configuration for optimal performance
  viteFinal: async (config) => {
    // CRITICAL: Override library mode from main vite.config.ts for browser compatibility
    config.build = config.build || {};
    config.build.lib = false; // Disable library mode for Storybook
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = undefined; // Include all dependencies for browser

    // Advanced performance optimizations for Storybook builds
    config.build.chunkSizeWarningLimit = 600; // Higher limit for Storybook complexity
    config.build.minify = 'esbuild'; // Faster minification for dev builds
    config.build.assetsInlineLimit = 8192; // Inline larger assets in Storybook

    // CRITICAL: Ensure all dependencies are bundled for browser execution with optimizations
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      'alpinejs',
      'swiper/bundle', 
      'lucide',
      'glob',
      'path',
      ...(config.optimizeDeps.include || [])
    ];
    config.optimizeDeps.exclude = [
      '@tailwindcss/vite',
      ...(config.optimizeDeps.exclude || [])
    ];

    // Enhanced esbuild optimization for Storybook
    config.esbuild = config.esbuild || {};
    config.esbuild.target = 'es2020'; // Modern target for faster builds
    config.esbuild.keepNames = true; // Keep function names for debugging
    config.esbuild.minifyIdentifiers = false; // Preserve readability in dev

    // Fix Node.js polyfills for browser environment
    config.define = config.define || {};
    config.define.global = 'globalThis';
    config.define.process = JSON.stringify({ env: {} });

    // Configure server for DDEV hostname support
    config.server = config.server || {};
    config.server.host = '0.0.0.0';
    config.server.allowedHosts = [
      'localhost',
      '127.0.0.1',
      'zh-demo.ddev.site',
      'zh-demo.ddev.site:6006', 
      '.ddev.site'
    ];

    // Configure CORS for DDEV
    config.server.cors = {
      origin: [
        'https://zh-demo.ddev.site',
        'https://zh-demo.ddev.site:6006',
        'https://zh-demo.ddev.site:6007',
        'http://localhost:6006',
        'http://127.0.0.1:6006'
      ],
      credentials: true
    };

    // Disable host checking for development
    config.server.disableHostCheck = true;

    // Browser-compatible build target with better caching
    config.build.target = ['es2020', 'chrome80', 'firefox75'];

    // Enhanced caching for Storybook preview builds
    config.cacheDir = '.storybook/.vite-cache';
    
    // Optimized file watching for better HMR performance
    config.server = config.server || {};
    config.server.watch = {
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**',
        '**/storybook-static/**',
        '**/.storybook/.vite-cache/**'
      ],
      usePolling: false, // Disable polling for better performance
    };

    // Basic CSS configuration for Storybook compatibility
    config.css = config.css || {};
    config.css.devSourcemap = true;

    return config;
  }
};

export default config;
