import eslint from '@eslint/js';
import pluginVitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const config = defineConfig([
  {
    name: 'source-code',
    files: ['cli/**/*.ts', 'src/**/*.ts', 'test/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    name: 'source-code-tests',
    files: ['test/**/*.ts'],
    extends: [pluginVitest.configs.recommended],
  },
  {
    name: 'config-files-commonjs',
    files: ['**/*.js'],
    extends: [eslint.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    name: 'config-files-module',
    files: ['**/*.mjs'],
    extends: [eslint.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  // ignore files
  globalIgnores([
    '.github/**',
    '.husky/**',
    '.idea/**',
    '**/bin/',
    '**/dist/',
    '**/package-lock.json',
  ]),
]);

export default config;
