import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        thalwil: resolve(__dirname, 'src/css/thalwil.css'),
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name].js',
      },
    },
    minify: 'esbuild',
    sourcemap: true,
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  server: {
    port: 3001,
    host: 'localhost',
  },
});