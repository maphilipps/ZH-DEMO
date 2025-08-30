import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';
import { resolve } from 'path';
import twig from 'vite-plugin-twig-drupal';
import sdcPlugin from './.storybook/sdc-plugin.js';

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

// Automatic entry discovery with fallback to manual entries
const getEntries = () => {
  const autoEntries = globSync([
    '**/*.entry.{js,jsx}',
    '**/*.css'
  ], {
    ignore: [
      '**/_*.css',
      'node_modules/**',
      'vendor/**',
      'web/sites/**',
      'web/core/**',
      'web/modules/contrib/**',
      'web/themes/contrib/**',
      'dist/**',
      'storybook-static/**'
    ]
  });

  // Fallback to current manual entries if no auto entries found
  if (autoEntries.length === 0) {
    return [
      ...globSync('./src/js/adesso.js'),
      ...globSync('./src/css/adesso.css')
    ];
  }

  return autoEntries;
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
    manifest: true,
    outDir: 'dist',
    emptyOutDir: false, // Keep compiled SCSS files
    sourcemap: mode === 'development',
    cssCodeSplit: true,
    rollupOptions: {
      input: getEntries(),
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'assets/[name].js'
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
    // Watch additional file types for better HMR
    watch: {
      ignored: ['**/node_modules/**', '**/vendor/**', '**/.git/**'],
      include: ['src/**/*', 'components/**/*.{js,scss,css,twig}'],
      usePolling: false, // Better performance in container environments
      interval: 100 // Polling interval for file changes
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/_variables.scss";`
      }
    }
  }
}));
