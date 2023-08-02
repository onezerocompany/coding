/**
 * @file Contains the recommended rules for Vue.js projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/attributes-order.md
    'vue/attributes-order': 'warn',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/component-tags-order.md
    'vue/component-tags-order': 'warn',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-lone-template.md
    'vue/no-lone-template': 'warn',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-multiple-slot-args.md
    'vue/no-multiple-slot-args': 'warn',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-v-html.md
    'vue/no-v-html': 'warn',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/order-in-components.md
    'vue/order-in-components': 'warn',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/this-in-template.md
    'vue/this-in-template': 'warn',
  },
};
