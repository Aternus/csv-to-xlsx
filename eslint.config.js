const globals = require('globals');
const eslint = require('@eslint/js');
const tsESLint = require('typescript-eslint');
const {defineConfig, globalIgnores} = require('eslint/config');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const pluginJest = require('eslint-plugin-jest');

const config = defineConfig([
  {
    name: 'source-code',
    files: ['cli/**/*.ts', 'src/**/*.ts', 'test/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tsESLint.configs.recommended,
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
    extends: [pluginJest.configs['flat/recommended']],
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

module.exports = config;
