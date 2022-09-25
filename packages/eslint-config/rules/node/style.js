/**
 * @file Contains rules to enforce Node.js style.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-deprecated-api.md */
    'node/no-deprecated-api': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/exports-style.md */
    'node/exports-style': ['warn', 'exports'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/file-extension-in-import.md */
    'node/file-extension-in-import': ['off'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/buffer.md */
    'node/prefer-global/buffer': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/console.md */
    'node/prefer-global/console': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/process.md */
    'node/prefer-global/process': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/text-decoder.md */
    'node/prefer-global/text-decoder': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/text-encoder.md */
    'node/prefer-global/text-encoder': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/url-search-params.md */
    'node/prefer-global/url-search-params': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/url.md */
    'node/prefer-global/url': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-promises/dns.md */
    'node/prefer-promises/dns': ['warn'],

    /* https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-promises/fs.md */
    'node/prefer-promises/fs': ['warn'],
  },
};
