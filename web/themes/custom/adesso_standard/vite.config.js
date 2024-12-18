import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // Root des Projekts
  base: '/themes/custom/adesso_standard/', // Pfad zu deinem Custom-Theme
  build: {
    outDir: 'dist', // Ordner für die generierten Dateien
    emptyOutDir: true, // Vorherigen Build löschen
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './js/adesso-standard.js'), // Passe dies an deine Haupt-JS-Datei an
        styles: path.resolve(__dirname, './scss/main.scss'),
      },
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js', // Verweis auf die PostCSS-Konfiguration
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      host: 'localhost',
    },
  },
});
