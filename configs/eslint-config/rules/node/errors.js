/**
 * @file Contains rules meant to prevent errors in Node.js projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-callback-literal.md */
    'node/no-callback-literal': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-exports-assign.md */
    'node/no-exports-assign': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-extraneous-import.md */
    'node/no-extraneous-import': ['error'],

    /* https://github.com/mysticatea/eslint-pxxlugin-node/blob/HEAD/docs/rules/no-extraneous-require.md */
    'node/no-extraneous-require': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-missing-import.md */
    'node/no-missing-import': [
      'error',
      {
        allowModules: [],
        resolvePaths: [],
        tryExtensions: ['.js', '.json', '.node', '.ts'],
      },
    ],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-missing-require.md */
    'node/no-missing-require': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-bin.md */
    'node/no-unpublished-bin': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-import.md */
    'node/no-unpublished-import': ['off'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-require.md */
    'node/no-unpublished-require': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/es-builtins.md */
    'node/no-unsupported-features/es-builtins': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/es-syntax.md */
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules'],
      },
    ],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/node-builtins.md */
    'node/no-unsupported-features/node-builtins': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/process-exit-as-throw.md */
    'node/process-exit-as-throw': ['error'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/shebang.md */
    'node/shebang': ['error'],
  },
};
