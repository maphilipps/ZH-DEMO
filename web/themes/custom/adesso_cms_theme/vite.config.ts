import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';
import { resolve } from 'path';
import twig from 'vite-plugin-twig-drupal';
import sdcPlugin from './.storybook/sdc-plugin.js';

const componentDir = resolve(import.meta.dirname, './components');

const port = 5173;
const origin = `https://adesso-cms.ddev.site:${port}`;

// Function to determine origin based on request
const getOrigin = (req: any) => {
  const host = req.headers.host;
  if (host === 'web' || host === 'adesso-cms-web' || host?.match(/^172\.19\.0\.\d+/)) {
    return `http://${host}:${port}`;
  }
  return origin;
};

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
    rollupOptions: {
      input: [
        ...globSync('./src/js/adesso.js'),
        ...globSync('./src/css/adesso.css')
      ],
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
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
    allowedHosts: [
      '.ddev.site',
      'web',
      'adesso-cms-web',
      '172.19.0.5',
      '172.18.0.4',
      'localhost',
      'backstop'
    ],
    cors: {
      origin: [
        /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
        /https?:\/\/web(:\d+)?$/,
        /https?:\/\/172\.19\.0\.\d+(:\d+)?$/,
        /https?:\/\/adesso-cms-web(:\d+)?$/,
        /https?:\/\/localhost(:\d+)?$/,
        /http?:\/\/backstop(:\d+)?$/
      ]
    },
    // Enhanced HMR configuration for better DDEV integration
    hmr: {
      host: 'adesso-cms.ddev.site',
      port: port,
      clientPort: port
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
