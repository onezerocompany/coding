/**
 * @file Contains the rules for Vue 3 projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand
 */

module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue'],
  extends: [
    './react.js',
    '../rules/vue/basics.js',
    '../rules/vue/essentials.js',
    '../rules/vue/strongly-recommended.js',
    '../rules/vue/recommended.js',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
    },
  ],
  env: {
    browser: true,
  },
};
