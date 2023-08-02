/**
 * @file Contains essential rules for Vue.js projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/multi-word-component-names.md
    'vue/multi-word-component-names': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-arrow-functions-in-watch.md
    'vue/no-arrow-functions-in-watch': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-async-in-computed-properties.md
    'vue/no-async-in-computed-properties': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-computed-properties-in-data.md
    'vue/no-computed-properties-in-data': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-data-object-declaration.md
    'vue/no-deprecated-data-object-declaration': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-destroyed-lifecycle.md
    'vue/no-deprecated-destroyed-lifecycle': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-dollar-listeners-api.md
    'vue/no-deprecated-dollar-listeners-api': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-dollar-scopedslots-api.md
    'vue/no-deprecated-dollar-scopedslots-api': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-events-api.md
    'vue/no-deprecated-events-api': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-filter.md
    'vue/no-deprecated-filter': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-functional-template.md
    'vue/no-deprecated-functional-template': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-html-element-is.md
    'vue/no-deprecated-html-element-is': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-inline-template.md
    'vue/no-deprecated-inline-template': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-props-default-this.md
    'vue/no-deprecated-props-default-this': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-router-link-tag-prop.md
    'vue/no-deprecated-router-link-tag-prop': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-scope-attribute.md
    'vue/no-deprecated-scope-attribute': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-slot-attribute.md
    'vue/no-deprecated-slot-attribute': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-slot-scope-attribute.md
    'vue/no-deprecated-slot-scope-attribute': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-v-bind-sync.md
    'vue/no-deprecated-v-bind-sync': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-v-is.md
    'vue/no-deprecated-v-is': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-v-on-native-modifier.md
    'vue/no-deprecated-v-on-native-modifier': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-v-on-number-modifiers.md
    'vue/no-deprecated-v-on-number-modifiers': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-vue-config-keycodes.md
    'vue/no-deprecated-vue-config-keycodes': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-dupe-keys.md
    'vue/no-dupe-keys': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-dupe-v-else-if.md
    'vue/no-dupe-v-else-if': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-duplicate-attributes.md
    'vue/no-duplicate-attributes': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-export-in-script-setup.md
    'vue/no-export-in-script-setup': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-lifecycle-after-await.md
    'vue/no-lifecycle-after-await': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-mutating-props.md
    'vue/no-mutating-props': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-parsing-error.md
    'vue/no-parsing-error': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-ref-as-operand.md
    'vue/no-ref-as-operand': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-reserved-keys.md
    'vue/no-reserved-keys': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-reserved-props.md
    'vue/no-reserved-props': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-setup-props-destructure.md
    'vue/no-setup-props-destructure': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-shared-component-data.md
    'vue/no-shared-component-data': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-side-effects-in-computed-properties.md
    'vue/no-side-effects-in-computed-properties': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-template-key.md
    'vue/no-template-key': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-textarea-mustache.md
    'vue/no-textarea-mustache': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-unused-components.md
    'vue/no-unused-components': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-unused-vars.md
    'vue/no-unused-vars': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-use-v-if-with-v-for.md
    'vue/no-use-v-if-with-v-for': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-useless-template-attributes.md
    'vue/no-useless-template-attributes': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-v-for-template-key-on-child.md
    'vue/no-v-for-template-key-on-child': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-watch-after-await.md
    'vue/no-watch-after-await': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-component-is.md
    'vue/require-component-is': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-prop-type-constructor.md
    'vue/require-prop-type-constructor': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-render-return.md
    'vue/require-render-return': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-slots-as-functions.md
    'vue/require-slots-as-functions': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-toggle-inside-transition.md
    'vue/require-toggle-inside-transition': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-v-for-key.md
    'vue/require-v-for-key': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-valid-default-prop.md
    'vue/require-valid-default-prop': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/return-in-computed-property.md
    'vue/return-in-computed-property': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/return-in-emits-validator.md
    'vue/return-in-emits-validator': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/use-v-on-exact.md
    'vue/use-v-on-exact': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-define-emits.md
    'vue/valid-define-emits': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-define-props.md
    'vue/valid-define-props': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-next-tick.md
    'vue/valid-next-tick': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-template-root.md
    'vue/valid-template-root': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-bind.md
    'vue/valid-v-bind': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-cloak.md
    'vue/valid-v-cloak': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-else-if.md
    'vue/valid-v-else-if': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-else.md
    'vue/valid-v-else': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-for.md
    'vue/valid-v-for': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-html.md
    'vue/valid-v-html': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-if.md
    'vue/valid-v-if': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-is.md
    'vue/valid-v-is': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-memo.md
    'vue/valid-v-memo': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-model.md
    'vue/valid-v-model': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-on.md
    'vue/valid-v-on': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-once.md
    'vue/valid-v-once': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-pre.md
    'vue/valid-v-pre': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-show.md
    'vue/valid-v-show': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-slot.md
    'vue/valid-v-slot': 'error',

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-text.md
    'vue/valid-v-text': 'error',
  },
};
