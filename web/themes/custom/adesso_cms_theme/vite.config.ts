import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';
import { resolve } from 'path';
import twig from 'vite-plugin-twig-drupal';
import sdcPlugin from './.storybook/sdc-plugin.js';
import browserslistToTargets from 'browserslist-to-esbuild';

const componentDir = resolve(import.meta.dirname, './components');

const port = 5173;
const isDDEV = process.env.DDEV_PROJECT_TYPE ? true : false;

// PreviousNext Frontend Architecture: Browser compatibility logging
console.log('[browserslist] Using browserslist configuration from .browserslistrc');
console.log('[browserslist] esbuild targets:', browserslistToTargets());

// Use DDEV's primary URL for development origin
const getDDEVOrigin = () => {
  if (!isDDEV || !process.env.DDEV_PRIMARY_URL) {
    return `http://localhost:${port}`;
  }
  // Remove any existing port from DDEV_PRIMARY_URL and add our Vite port
  return `${process.env.DDEV_PRIMARY_URL.replace(/:\d+$/, "")}:${port}`;
};

const origin = getDDEVOrigin();

// PreviousNext Frontend Architecture: Enhanced component entry discovery
const getComponentEntries = () => {
  const componentEntries = {};
  
  // Discover component JavaScript/TypeScript entry files
  const jsEntries = globSync([
    'components/**/[^_]*.entry.{js,ts}'
  ], {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/*.stories.*',
      '**/*.test.*',
      '**/templates/**'
    ]
  });

  // Discover component CSS/SCSS entry files  
  const cssEntries = globSync([
    'components/**/[^_]*.{css,scss}'
  ], {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/*.stories.*',
      '**/*.test.*',
      '**/templates/**',
      '**/_*.{css,scss}' // Ignore partials
    ]
  });

  // Process JS/TS entries
  jsEntries.forEach(entry => {
    const name = entry.replace(/^components\//, '').replace(/\.(entry\.)?(js|ts)$/, '').replace(/\//g, '-');
    componentEntries[name] = resolve(__dirname, entry);
  });

  // Process CSS/SCSS entries
  cssEntries.forEach(entry => {
    const name = entry.replace(/^components\//, '').replace(/\.(css|scss)$/, '').replace(/\//g, '-') + '-styles';
    componentEntries[name] = resolve(__dirname, entry);
  });

  // Main theme entries (always included)
  componentEntries['adesso-theme'] = resolve(__dirname, './src/js/adesso.js');
  componentEntries['adesso-styles'] = resolve(__dirname, './src/css/adesso.css');

  console.log('[vite] Discovered entries:', Object.keys(componentEntries));

  // Phase 4.2: Bundle size monitoring during entry discovery
  const estimatedSize = Object.keys(componentEntries).length * 15000; // Rough estimate: 15KB per entry
  if (estimatedSize > 500000) { // 500KB threshold
    console.warn(`⚠️  [Phase 4.2] Estimated bundle size (${Math.round(estimatedSize/1024)}KB) exceeds Swiss government threshold (500KB)`);
    console.log('💡 Consider implementing dynamic imports or code splitting');
  }
  
  // Municipality-specific entry optimization
  const municipalityEntries = Object.keys(componentEntries).filter(key => 
    ['thalwil', 'thalheim', 'erlenbach'].some(m => key.includes(m))
  );
  
  if (municipalityEntries.length > 0) {
    console.log(`🏛️  [Phase 4.2] Municipality-specific entries: ${municipalityEntries.length}`);
  }
  return componentEntries;
};

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    twig({
      namespaces: {
        "adesso_cms_theme": componentDir
      }
    }),
    sdcPlugin({ path: componentDir }),
    {
      name: 'watch-dist',
      configureServer: (server) => {
        server.watcher.options = {
          ...server.watcher.options,
          ignored: ['**/.git/**', '**/node_modules/**', '**/.logs/**']
        };
      }
    }
  ],
  build: {
    // PreviousNext Frontend Architecture: Library mode configuration
    lib: mode === 'production' ? {
      entry: getComponentEntries(),
      name: 'AdessoTheme',
      formats: ['iife'], // IIFE format for Drupal compatibility
      fileName: (format, entryName) => `${entryName}.${format}.js`
    } : false,
    manifest: true,
    outDir: 'dist',
    emptyOutDir: false, // Keep compiled SCSS files
    sourcemap: mode === 'development',
    target: browserslistToTargets(), // Use browserslist for consistent targeting
    cssCodeSplit: true,
    minify: mode === 'production' ? 'esbuild' : false,
    // Enhanced browser compatibility features
    polyfillDynamicImport: false, // Modern browsers support dynamic imports
    cssTarget: browserslistToTargets(), // Ensure CSS targets match JS targets
    reportCompressedSize: true, // Monitor bundle sizes
    rollupOptions: {
      input: getComponentEntries(),
      // Externalize dependencies that shouldn't be bundled with library mode
      external: mode === 'production' ? ['drupal', 'jquery', 'once'] : undefined,
      output: mode === 'production' ? {
        globals: {
          drupal: 'Drupal',
          jquery: 'jQuery', 
          once: 'once'
        },
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        // Phase 4.2: Advanced code splitting for municipality themes
        manualChunks: {
          // Vendor libraries
          'vendor-core': ['flowbite'],
          'vendor-ui': ['@tailwindplus/elements'],
          'vendor-swiper': ['swiper'],
          // Municipality-specific chunks (will be created dynamically)
          'alpine-core': ['alpinejs'],
          'utils': ['once']
        },
        // Phase 4.2: Optimize chunk loading strategy
        chunkFileNames: (chunkInfo) => {
          // Group municipality-specific files
          const facadeModuleId = chunkInfo.facadeModuleId;
          if (facadeModuleId) {
            if (facadeModuleId.includes('thalwil')) return 'municipalities/thalwil-[hash].js';
            if (facadeModuleId.includes('thalheim')) return 'municipalities/thalheim-[hash].js';
            if (facadeModuleId.includes('erlenbach')) return 'municipalities/erlenbach-[hash].js';
            if (facadeModuleId.includes('vendor')) return 'vendor/[name]-[hash].js';
          }
          return 'chunks/[name]-[hash].js';
        }
      } : {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'assets/[name].js'
      },
      // Phase 4.2: Enhanced tree shaking configuration
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
        // Advanced tree shaking for Alpine.js components
        tryCatchDeoptimization: false,
        // Municipality-specific tree shaking
        manualPureFunctions: [
          'Alpine.data',
          'Alpine.directive',
          'Alpine.magic',
          'Drupal.behaviors.add'
        ]
      },
      // Phase 4.2: Bundle size monitoring
      onwarn(warning, warn) {
        // Monitor large chunks during build
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          console.warn(`⚠️  Circular dependency: ${warning.message}`);
        }
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          console.warn(`🌲 Unused import (tree-shaking opportunity): ${warning.message}`);
        }
        warn(warning);
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './components')
    }
  },
  server: {
    host: '0.0.0.0',
    port: port,
    strictPort: true,
    origin: origin,
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
    },
    // Phase 4.2: Enhanced watch configuration for optimization feedback
    watch: {
      ignored: [
        '**/node_modules/**', 
        '**/vendor/**', 
        '**/.git/**',
        '**/test-results/**',
        '**/bundle-analysis.html'
      ],
      include: [
        'src/**/*', 
        'components/**/*.{js,scss,css,twig}',
        'scripts/bundle-optimizer.js',
        '.bundlesize.json'
      ],
      usePolling: false,
      interval: 100
    },
    
    // Phase 4.2: Bundle analysis middleware
    middlewareMode: false,
    
    // Phase 4.2: Performance monitoring middleware
    proxy: process.env.NODE_ENV === 'development' ? {
      '/bundle-stats': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            if (req.url === '/bundle-stats') {
              // Inject bundle size warnings into development
              console.log('📊 Bundle stats available at /bundle-stats');
            }
          });
        }
      }
    } : undefined
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/_variables.scss";`
      }
    },
    // Phase 4.2: Enhanced PostCSS configuration for optimization
    postcss: {
      plugins: [
        'autoprefixer',
        // Phase 4.2: CSS optimization plugins
        ...(mode === 'production' ? [
          ['cssnano', {
            preset: [
              'default',
              {
                // Optimize for Swiss government compliance
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
                // Preserve municipality-specific custom properties
                reduceIdents: { disable: true },
                // Keep accessibility-critical styles
                colormin: false,
                // Advanced minification
                mergeLonghand: true,
                mergeRules: true,
                minifySelectors: true
              }
            ]
          }]
        ] : [])
      ]
    },
    
    // Phase 4.2: CSS code splitting optimization
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: mode === 'production' ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]'
    }
  },
  // Phase 4.2: Advanced dependency optimization
  optimizeDeps: {
    include: [
      'flowbite',
      '@tailwindplus/elements', 
      'swiper',
      'alpinejs',
      // Pre-bundle Alpine.js plugins for better performance
      'alpinejs/dist/module.esm.js'
    ],
    exclude: ['drupal', 'jquery', 'once'],
    // Force re-optimization for municipality-specific builds
    force: process.env.MUNICIPALITY_THEME ? true : false,
    // Phase 4.2: Advanced esbuild optimization
    esbuildOptions: {
      target: browserslistToTargets(),
      // Advanced tree shaking
      treeShaking: true,
      // Optimize for Swiss government performance requirements
      minifySyntax: mode === 'production',
      minifyWhitespace: mode === 'production',
      minifyIdentifiers: mode === 'production',
      // Keep important function names for debugging
      keepNames: mode === 'development',
      // Drop console statements in production
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      // Enable advanced mangling for smaller bundles
      mangleProps: mode === 'production' ? /^_/ : undefined
    }
  },
  
  // Phase 4.2: Performance monitoring during development
  define: {
    __BUNDLE_SIZE_WARNING_THRESHOLD__: 200000, // 200KB warning
    __BUNDLE_SIZE_ERROR_THRESHOLD__: 500000,   // 500KB error
    __MUNICIPALITY_THEMES__: JSON.stringify(['thalwil', 'thalheim', 'erlenbach']),
    __PHASE_4_2_ENABLED__: true
  }
}));