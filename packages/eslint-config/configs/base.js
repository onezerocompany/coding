/**
 * @file ESLint configuration for JavaScript and JavaScript Jest files.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand
 */

module.exports = {
  plugins: ['import'],
  // Load all the rules for plain JavaScript
  extends: [
    // Rules for JavaScript
    '../rules/javascript/errors.js',
    '../rules/javascript/es6.js',
    '../rules/javascript/practices.js',
    '../rules/javascript/strict.js',
    '../rules/javascript/style.js',
    '../rules/javascript/variables.js',
    // Rules for eslint-plugin-import
    '../rules/import/default.js',
    // Disable prettier rules
    'prettier',
  ],
  overrides: [
    // Documentation for JavaScript
    {
      plugins: ['jsdoc'],
      files: ['*.js?(x)', '*.ts?(x)'],
      excludedFiles: ['*.test.js', '*.test.ts', '*.spec.js', '*.spec.ts'],
      extends: ['../rules/javascript/docs.js', 'prettier'],
    },
    // Rules for jest test files
    {
      plugins: ['jest'],
      files: ['*.spec.js', '*.test.js', '*.spec.ts', '*.test.ts'],
      extends: ['../rules/jest/all.js', 'prettier'],
      env: {
        jest: true,
      },
      rules: {
        'max-lines-per-function': 'off',
        'eslint/require-await': 'off',
      },
    },
  ],
};
