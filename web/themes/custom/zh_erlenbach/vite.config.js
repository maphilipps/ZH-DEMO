import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        erlenbach: resolve(__dirname, 'src/css/erlenbach.css'),
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
    port: 3003,
    host: 'localhost',
  },
});