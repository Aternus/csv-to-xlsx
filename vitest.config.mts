import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    name: 'Test',
    environment: 'node',
    dir: './test',
  },
});
