import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/utils/test-utils.js'],
    include: ['components/**/*.test.js', 'tests/**/*.test.js'],
    exclude: ['node_modules', 'dist', 'storybook-static']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './components')
    }
  }
});