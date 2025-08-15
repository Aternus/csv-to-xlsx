import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginJest from 'eslint-plugin-jest';

import {globalIgnores} from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
  },
  {
    files: ['cli/**', 'src/**', 'test/**', '*.js', '*.mjs', '*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['test/**'],
    plugins: {
      jest: pluginJest,
    },
  },
  globalIgnores([
    '.github/**',
    '.husky/**',
    '.idea/**',
    '**/bin/',
    '**/dist/',
    '**/package-lock.json',
  ]),
);
