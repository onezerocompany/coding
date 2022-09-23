/**
 * @file ESLint rules for following best practices.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Maximum cyclomatic complexity allowed in a program. */
const maxComplexity = 20;

module.exports = {
  rules: {
    // https://eslint.org/docs/rules/accessor-pairs
    'accessor-pairs': ['warn'],

    // https://eslint.org/docs/rules/array-callback-return
    'array-callback-return': ['error'],

    // https://eslint.org/docs/rules/block-scoped-var
    'block-scoped-var': ['error'],

    // https://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': ['warn'],

    // https://eslint.org/docs/rules/complexity
    'complexity': ['warn', maxComplexity],

    // https://eslint.org/docs/rules/consistent-return
    'consistent-return': ['warn'],

    // https://eslint.org/docs/rules/curly
    'curly': ['warn', 'multi'],

    // https://eslint.org/docs/rules/default-case
    'default-case': ['error'],

    // https://eslint.org/docs/rules/default-case-last
    'default-case-last': ['warn'],

    // https://eslint.org/docs/rules/default-param-last
    'default-param-last': ['warn'],

    // https://eslint.org/docs/rules/dot-location
    'dot-location': ['warn', 'property'],

    // https://eslint.org/docs/rules/dot-notation
    'dot-notation': ['warn'],

    // https://eslint.org/docs/rules/eqeqeq
    'eqeqeq': ['error'],

    // https://eslint.org/docs/rules/grouped-accessor-pairs
    'grouped-accessor-pairs': ['warn', 'setBeforeGet'],

    // https://eslint.org/docs/rules/guard-for-in
    'guard-for-in': ['error'],

    // https://eslint.org/docs/rules/max-classes-per-file
    'max-classes-per-file': ['error'],

    // https://eslint.org/docs/rules/no-alert
    'no-alert': ['error'],

    // https://eslint.org/docs/rules/no-caller
    'no-caller': ['error'],

    // https://eslint.org/docs/rules/no-case-declarations
    'no-case-declarations': ['error'],

    // https://eslint.org/docs/rules/no-constructor-return
    'no-constructor-return': ['error'],

    // https://eslint.org/docs/rules/no-div-regex
    'no-div-regex': ['warn'],

    // https://eslint.org/docs/rules/no-else-return
    'no-else-return': ['warn'],

    // https://eslint.org/docs/rules/no-empty-function
    'no-empty-function': ['warn'],

    // https://eslint.org/docs/rules/no-empty-pattern
    'no-empty-pattern': ['warn'],

    // https://eslint.org/docs/rules/no-eq-null
    'no-eq-null': ['warn'],

    // https://eslint.org/docs/rules/no-eval
    'no-eval': ['error'],

    // https://eslint.org/docs/rules/no-extend-native
    'no-extend-native': ['error'],

    // https://eslint.org/docs/rules/no-extra-bind
    'no-extra-bind': ['warn'],

    // https://eslint.org/docs/rules/no-extra-label
    'no-extra-label': ['warn'],

    // https://eslint.org/docs/rules/no-fallthrough
    'no-fallthrough': ['error'],

    // https://eslint.org/docs/rules/no-floating-decimal
    'no-floating-decimal': ['warn'],

    // https://eslint.org/docs/rules/no-global-assign
    'no-global-assign': ['error'],

    // https://eslint.org/docs/rules/no-implicit-coercion
    'no-implicit-coercion': ['warn'],

    // https://eslint.org/docs/rules/no-implicit-globals
    'no-implicit-globals': ['warn'],

    // https://eslint.org/docs/rules/no-implied-eval
    'no-implied-eval': ['error'],

    // https://eslint.org/docs/rules/no-invalid-this
    'no-invalid-this': ['error'],

    // https://eslint.org/docs/rules/no-iterator
    'no-iterator': ['error'],

    // https://eslint.org/docs/rules/no-labels
    'no-labels': ['error'],

    // https://eslint.org/docs/rules/no-lone-blocks
    'no-lone-blocks': ['error'],

    // https://eslint.org/docs/rules/no-loop-func
    'no-loop-func': ['error'],

    // https://eslint.org/docs/rules/no-magic-numbers
    'no-magic-numbers': [
      'warn',
      {
        ignoreDefaultValues: true,
        ignoreArrayIndexes: true,
        ignore: [-1, 0, 1],
        detectObjects: false,
        enforceConst: true,
      },
    ],

    // https://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': ['warn'],

    // https://eslint.org/docs/rules/no-multi-str
    'no-multi-str': ['warn'],

    // https://eslint.org/docs/rules/no-new
    'no-new': ['warn'],

    // https://eslint.org/docs/rules/no-new-func
    'no-new-func': ['error'],

    // https://eslint.org/docs/rules/no-new-wrappers
    'no-new-wrappers': ['error'],

    // https://eslint.org/docs/rules/no-nonoctal-decimal-escape
    'no-nonoctal-decimal-escape': ['warn'],

    // https://eslint.org/docs/rules/no-octal
    'no-octal': ['error'],

    // https://eslint.org/docs/rules/no-octal-escape
    'no-octal-escape': ['warn'],

    // https://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': ['warn'],

    // https://eslint.org/docs/rules/no-proto
    'no-proto': ['error'],

    // https://eslint.org/docs/rules/no-redeclare
    'no-redeclare': ['warn'],

    // https://eslint.org/docs/rules/no-restricted-properties
    'no-restricted-properties': 'off',

    // https://eslint.org/docs/rules/no-return-assign
    'no-return-assign': ['error'],

    // https://eslint.org/docs/rules/no-return-await
    'no-return-await': ['warn'],

    // https://eslint.org/docs/rules/no-script-url
    'no-script-url': ['error'],

    // https://eslint.org/docs/rules/no-self-assign
    'no-self-assign': ['warn'],

    // https://eslint.org/docs/rules/no-self-compare
    'no-self-compare': ['warn'],

    // https://eslint.org/docs/rules/no-sequences
    'no-sequences': ['error'],

    // https://eslint.org/docs/rules/no-throw-literal
    'no-throw-literal': ['error'],

    // https://eslint.org/docs/rules/no-unmodified-loop-condition
    'no-unmodified-loop-condition': ['warn'],

    // https://eslint.org/docs/rules/no-unused-expressions
    'no-unused-expressions': ['error'],

    // https://eslint.org/docs/rules/no-unused-labels
    'no-unused-labels': ['warn'],

    // https://eslint.org/docs/rules/no-useless-call
    'no-useless-call': ['error'],

    // https://eslint.org/docs/rules/no-useless-catch
    'no-useless-catch': ['error'],

    // https://eslint.org/docs/rules/no-useless-concat
    'no-useless-concat': ['warn'],

    // https://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': ['warn'],

    // https://eslint.org/docs/rules/no-useless-return
    'no-useless-return': ['error'],

    // https://eslint.org/docs/rules/no-void
    'no-void': ['error'],

    // https://eslint.org/docs/rules/no-warning-comments
    'no-warning-comments': ['warn'],

    // https://eslint.org/docs/rules/no-with
    'no-with': ['error'],

    // https://eslint.org/docs/rules/prefer-named-capture-group
    'prefer-named-capture-group': ['warn'],

    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    'prefer-promise-reject-errors': ['warn'],

    // https://eslint.org/docs/rules/prefer-regex-literals
    'prefer-regex-literals': ['warn'],

    // https://eslint.org/docs/rules/radix
    'radix': ['error', 'always'],

    // https://eslint.org/docs/rules/require-await
    'require-await': ['error'],

    // https://eslint.org/docs/rules/require-unicode-regexp
    'require-unicode-regexp': ['error'],

    // https://eslint.org/docs/rules/vars-on-top
    'vars-on-top': ['warn'],

    // https://eslint.org/docs/rules/wrap-iife
    'wrap-iife': ['error', 'inside'],

    // https://eslint.org/docs/rules/yoda
    'yoda': ['warn'],
  },
};
