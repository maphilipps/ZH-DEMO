import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/experimental-addon-test/vitest-plugin';

import * as projectAnnotations from './preview.js';

// Apply Storybook's default project annotations
beforeAll(() => {
  setProjectAnnotations(projectAnnotations);
});