import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';
import { resolve } from 'path';
import twig from 'vite-plugin-twig-drupal';
import sdcPlugin from './.storybook/sdc-plugin.js';
import browserslistToEsbuild from 'browserslist-to-esbuild';

const componentDir = resolve(import.meta.dirname, './components');

const port = 5173;
const isDDEV = process.env.DDEV_PROJECT_TYPE ? true : false;

// Use DDEV's primary URL for development origin
const getDDEVOrigin = () => {
  if (!isDDEV || !process.env.DDEV_PRIMARY_URL) {
    return `http://localhost:${port}`;
  }
  // Remove any existing port from DDEV_PRIMARY_URL and add our Vite port
  return `${process.env.DDEV_PRIMARY_URL.replace(/:\d+$/, "")}:${port}`;
};

const origin = getDDEVOrigin();

export default defineConfig({
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
    },
    {
      name: 'build-cleanup',
      writeBundle: {
        order: 'post',
        async handler(options, bundle) {
          // Advanced build cleanup for production
          if (process.env.NODE_ENV === 'production') {
            // Use dynamic import for ES modules
            const { existsSync, readdirSync, unlinkSync } = await import('fs');
            const { join } = await import('path');
            const outDir = options.dir || 'dist';
            
            // Clean up old hashed files (keep only latest 2 versions)
            try {
              const assetsDir = join(outDir, 'assets');
              if (existsSync(assetsDir)) {
                const files = readdirSync(assetsDir);
                
                // Group files by base name
                const fileGroups = {};
                files.forEach(file => {
                  const match = file.match(/^(.+)\.[a-f0-9]{8}\.(js|css)$/);
                  if (match) {
                    const baseName = match[1];
                    const ext = match[2];
                    const key = `${baseName}.${ext}`;
                    if (!fileGroups[key]) fileGroups[key] = [];
                    fileGroups[key].push(file);
                  }
                });
                
                // Remove old files (keep only 2 latest)
                Object.values(fileGroups).forEach(group => {
                  if (group.length > 2) {
                    group.sort().slice(0, -2).forEach(oldFile => {
                      try {
                        unlinkSync(join(assetsDir, oldFile));
                      } catch (e) {
                        // Ignore cleanup errors
                      }
                    });
                  }
                });
              }
            } catch (e) {
              // Ignore cleanup errors in production
            }
          }
        }
      }
    }
  ],
  build: {
    // Library mode configuration for Drupal asset building
    lib: {
      entry: {
        adesso: './src/js/adesso.js',
        styles: './src/css/adesso.css'
      },
      formats: ['es']
    },
    manifest: true,
    outDir: 'dist',
    emptyOutDir: false, // Keep compiled SCSS files
    sourcemap: process.env.NODE_ENV === 'development', // Source maps only in development
    target: browserslistToEsbuild(), // Use browserslist for consistent targeting
    cssCodeSplit: true, // Enable CSS code splitting for better performance
    // Enhanced chunk size optimization
    chunkSizeWarningLimit: 300, // Warn about chunks larger than 300KB
    // Advanced minification for production
    minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        properties: {
          regex: /^_/  // Mangle private properties
        }
      },
      format: {
        comments: false // Remove all comments
      }
    },
    // Rollup optimizations for better tree shaking
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
    rollupOptions: {
      // Don't bundle external dependencies for Drupal compatibility
      external: (id) => {
        return ['alpinejs', 'swiper', 'lucide'].some(external => id.includes(external));
      },
      output: {
        // Enhanced asset naming for optimal caching and performance
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          const baseName = info[0];
          
          // Optimized naming patterns for different asset types
          if (/\.(css|scss)$/i.test(assetInfo.name)) {
            // Shorter hash for CSS files to reduce manifest size
            return `assets/css/[name].[hash:8].${extType}`;
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(assetInfo.name)) {
            // Include size hint for images to improve cache efficiency
            return `assets/img/[name].[hash:8].${extType}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            // Font-specific optimization with shorter path
            return `assets/font/[name].[hash:8].${extType}`;
          }
          // Shorter misc path for other assets
          return `assets/misc/[name].[hash:8].${extType}`;
        },
        // Optimized chunk naming with shorter hashes
        chunkFileNames: (chunkInfo) => {
          // Use dynamic imports for better naming
          const name = chunkInfo.name || 'chunk';
          return `assets/js/${name}.[hash:8].js`;
        },
        // Entry file optimization for main files
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'entry';
          return `assets/js/${name}.[hash:8].js`;
        },
        // Advanced chunk optimization for vendor splitting
        manualChunks: (id) => {
          // Separate vendor libraries for better caching
          if (id.includes('node_modules')) {
            if (id.includes('alpinejs')) return 'vendor-alpine';
            if (id.includes('swiper')) return 'vendor-swiper';
            if (id.includes('lucide')) return 'vendor-lucide';
            return 'vendor-common';
          }
          // Separate component chunks for code splitting
          if (id.includes('/components/')) {
            const match = id.match(/components\/([^\/]+)\//);
            if (match) return `comp-${match[1]}`;
          }
        },
        // Ensure proper formatting for ES modules
        format: 'es'
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
      credentials: true
    },
    // Optimized watch configuration for DDEV container performance
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/vendor/**', 
        '**/.git/**',
        '**/dist/**',
        '**/.ddev/**',
        '**/core/**',
        '**/contrib/**'
      ],
      include: [
        'src/**/*',
        'components/**/*.{js,scss,css,twig}',
        '*.config.{js,ts,mjs}',
        'package.json'
      ],
      usePolling: isDDEV, // Use polling in DDEV for reliable file watching
      interval: isDDEV ? 300 : 100 // Slower polling in container environments
    },
    // Improved HMR for container environments
    hmr: {
      port: isDDEV ? 5174 : undefined,
      host: isDDEV ? '0.0.0.0' : 'localhost'
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/_variables.scss";`,
        charset: false, // Remove charset for smaller files
        quietDeps: true, // Silence dependency warnings
        verbose: false, // Reduce logging in production
        sourceMapContents: process.env.NODE_ENV === 'development' // Source map contents only in dev
      }
    },
    // PostCSS optimization with advanced configuration
    postcss: './postcss.config.js',
    // Enhanced CSS module support
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: process.env.NODE_ENV === 'production' 
        ? '[hash:base64:5]' 
        : '[name]__[local]__[hash:base64:5]'
    },
    // Transformer optimizations
    transformer: 'postcss',
    // Lightning CSS for ultra-fast processing (when available)
    lightningcss: process.env.NODE_ENV === 'production' ? {
      minify: true,
      targets: {
        chrome: 95,
        firefox: 91,
        safari: 14
      }
    } : false
  },
  // Optimizations for production builds
  optimizeDeps: {
    include: [
      'alpinejs',
      'swiper/bundle',
      'lucide'
    ],
    exclude: [
      '@tailwindcss/vite'
    ]
  },
  // Enhanced esbuild configuration using browserslist
  esbuild: {
    target: browserslistToEsbuild(),
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none'
  }
});
