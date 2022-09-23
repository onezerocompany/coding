/**
 * @file ESLint rules for variables.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    // https://eslint.org/docs/rules/init-declarations
    'init-declarations': ['warn', 'always'],

    // https://eslint.org/docs/rules/no-delete-var
    'no-delete-var': ['error'],

    // https://eslint.org/docs/rules/no-label-var
    'no-label-var': ['error'],

    // https://eslint.org/docs/rules/no-restricted-globals
    'no-restricted-globals': 'off',

    // https://eslint.org/docs/rules/no-shadow
    'no-shadow': [
      'error',
      {
        builtinGlobals: true,
        hoist: 'all',
      },
    ],

    // https://eslint.org/docs/rules/no-shadow-restricted-names
    'no-shadow-restricted-names': ['error'],

    // https://eslint.org/docs/rules/no-undef
    'no-undef': ['error', { typeof: true }],

    // https://eslint.org/docs/rules/no-undef-init
    'no-undef-init': ['warn'],

    // https://eslint.org/docs/rules/no-undefined
    'no-undefined': ['error'],

    // https://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': ['warn'],

    // https://eslint.org/docs/rules/no-use-before-define
    'no-use-before-define': ['error'],
  },
};
