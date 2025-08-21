import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/utils/test-utils.js'],
    include: ['components/**/*.test.js', 'tests/**/*.test.js'],
    exclude: ['node_modules', 'dist', 'storybook-static', 'backstop_data'],
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'storybook-static/',
        'backstop_data/',
        'tests/',
        '**/*.stories.js',
        '**/*.config.js',
        '**/*.config.ts'
      ]
    },
    // Enable source maps for better debugging
    sourcemap: true,
    // Timeout settings for CI/CD
    testTimeout: 10000,
    hookTimeout: 10000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './components'),
      '@tests': path.resolve(__dirname, './tests')
    }
  },
  // Enable source maps in development
  css: {
    devSourcemap: true
  },
  build: {
    sourcemap: true
  }
});