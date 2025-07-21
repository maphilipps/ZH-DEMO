import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';

const port = 5173;
const origin = `https://adesso-cms.ddev.site:${port}`;

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    manifest: true,
    rollupOptions: {
      input: [
        ...globSync('./src/js/adesso.js'),
        ...globSync('./src/css/adesso.css')
      ],
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: port,
    strictPort: true,
    origin: origin,
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/
    }
  }
});
