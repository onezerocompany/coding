/**
 * @file Contains the rules for Next.js projects.
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
  plugins: ['@next/next'],
  extends: ['./react.js', '../rules/next/all.js', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
};
