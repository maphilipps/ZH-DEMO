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
    manifest: true,
    outDir: 'dist',
    emptyOutDir: false, // Keep compiled SCSS files
    sourcemap: true, // Enable source maps for better debugging and testing
    rollupOptions: {
      input: [
        ...globSync('./src/js/adesso.js'),
        ...globSync('./src/css/adesso.css')
      ],
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
        sourcemap: true // Enable source maps in output
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
});
