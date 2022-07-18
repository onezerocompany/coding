/*
 * this config contains only the basic rules for plain JavaScript projects.
 */

module.exports = {
  plugins: ['import'],
  // load all the rules for plain JavaScript
  extends: [
    // rules for JavaScript
    '../rules/javascript/errors.js',
    '../rules/javascript/es6.js',
    '../rules/javascript/practices.js',
    '../rules/javascript/strict.js',
    '../rules/javascript/style.js',
    '../rules/javascript/variables.js',
    // rules for eslint-plugin-import
    '../rules/import/default.js',
    // disable prettier rules
    'prettier',
  ],
  overrides: [
    // rules for jest test files
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
