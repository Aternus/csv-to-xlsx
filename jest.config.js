/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import("jest").Config} **/
module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test.
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage. Allowed values are babel (default) or v8.
  coverageProvider: 'v8',

  // The test environment that will be used for testing.
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers.
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/test/tsconfig.json',
      },
    ],
  },

  // A list of paths to directories that Jest should use to search for files in.
  roots: ['<rootDir>/test'],
};
