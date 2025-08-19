import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        thalheim: resolve(__dirname, 'src/css/thalheim.css'),
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
    port: 3002,
    host: 'localhost',
  },
});