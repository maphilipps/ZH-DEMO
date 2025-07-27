import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';

export default defineConfig({
  plugins: [
    storybookTest({
      storybookScript: 'npm run storybook:test'
    })
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      instances: [
        {
          browser: 'chromium',
          provider: 'playwright',
        }
      ],
      headless: false, // Set to false temporarily to test setup
    },
    setupFiles: ['./.storybook/vitest.setup.js'],
  },
});