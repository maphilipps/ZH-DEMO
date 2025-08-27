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
    rollupOptions: {
      // Don't bundle external dependencies for Drupal compatibility
      external: (id) => {
        return ['alpinejs', 'swiper', 'lucide'].some(external => id.includes(external));
      },
      output: {
        // Optimized asset naming for Drupal library integration
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          
          // Different naming patterns for different asset types
          if (/\.(css|scss)$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${extType}`;
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${extType}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${extType}`;
          }
          return `assets/misc/[name]-[hash].${extType}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
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
        additionalData: `@import "./src/scss/_variables.scss";`
      }
    },
    // PostCSS optimization
    postcss: './postcss.config.js'
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
