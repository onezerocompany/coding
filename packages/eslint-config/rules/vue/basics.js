/**
 * @file Contains the basic rules for Vue.js projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/comment-directive.md
    'vue/comment-directive': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/jsx-uses-vars.md
    'vue/jsx-uses-vars': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-setup-uses-vars.md
    'vue/script-setup-uses-vars': 'error',
  },
};
