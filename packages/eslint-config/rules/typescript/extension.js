/**
 * @file ESLint rules to add TypeScript support to base rules.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** All JavaScript ESLint rules. */
const rules = [
  require('../javascript/errors').rules,
  require('../javascript/es6').rules,
  require('../javascript/practices').rules,
  require('../javascript/strict').rules,
  require('../javascript/style').rules,
  require('../javascript/variables').rules,
].reduce((result, current) => Object.assign(result, current));

module.exports = {
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
    'brace-style': ['off'],
    '@typescript-eslint/brace-style': rules['brace-style'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
    'comma-dangle': ['off'],
    '@typescript-eslint/comma-dangle': rules['comma-dangle'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
    'comma-spacing': ['off'],
    '@typescript-eslint/comma-spacing': rules['comma-spacing'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
    'default-param-last': ['off'],
    '@typescript-eslint/default-param-last': rules['default-param-last'],

    // // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
    'dot-notation': ['off'],
    '@typescript-eslint/dot-notation': rules['dot-notation'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
    'func-call-spacing': ['off'],
    '@typescript-eslint/func-call-spacing': rules['func-call-spacing'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    'indent': ['off'],
    '@typescript-eslint/indent': rules.indent,

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
    'init-declarations': ['off'],
    '@typescript-eslint/init-declarations': rules['init-declarations'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
    'keyword-spacing': ['off'],
    '@typescript-eslint/keyword-spacing': rules['keyword-spacing'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
    'lines-between-class-members': ['off'],
    '@typescript-eslint/lines-between-class-members':
      rules['lines-between-class-members'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
    'no-array-constructor': ['off'],
    '@typescript-eslint/no-array-constructor': rules['no-array-constructor'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
    'no-dupe-class-members': ['off'],
    '@typescript-eslint/no-dupe-class-members': rules['no-dupe-class-members'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
    'no-duplicate-imports': ['off'],
    '@typescript-eslint/no-duplicate-imports': rules['no-duplicate-imports'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
    'no-empty-function': ['off'],
    '@typescript-eslint/no-empty-function': rules['no-empty-function'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
    'no-extra-parens': ['off'],
    '@typescript-eslint/no-extra-parens': rules['no-extra-parens'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
    'no-extra-semi': ['off'],
    '@typescript-eslint/no-extra-semi': rules['no-extra-semi'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
    'no-implied-eval': ['off'],
    '@typescript-eslint/no-implied-eval': rules['no-implied-eval'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
    'no-invalid-this': ['off'],
    '@typescript-eslint/no-invalid-this': rules['no-invalid-this'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
    'no-loop-func': ['off'],
    '@typescript-eslint/no-loop-func': rules['no-loop-func'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
    'no-loss-of-precision': ['off'],
    '@typescript-eslint/no-loss-of-precision': rules['no-loss-of-precision'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    'no-magic-numbers': ['off'],
    '@typescript-eslint/no-magic-numbers': rules['no-magic-numbers'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
    'no-redeclare': ['off'],
    '@typescript-eslint/no-redeclare': rules['no-redeclare'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md]
    'no-shadow': ['off'],
    '@typescript-eslint/no-shadow': rules['no-shadow'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
    'no-throw-literal': ['off'],
    '@typescript-eslint/no-throw-literal': rules['no-throw-literal'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    'no-unused-expressions': ['off'],
    '@typescript-eslint/no-unused-expressions': rules['no-unused-expressions'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': rules['no-unused-vars'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': ['off'],
    '@typescript-eslint/no-use-before-define': rules['no-use-before-define'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    'no-useless-constructor': ['off'],
    '@typescript-eslint/no-useless-constructor':
      rules['no-useless-constructor'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
    'object-curly-spacing': ['off'],
    '@typescript-eslint/object-curly-spacing': rules['object-curly-spacing'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
    'quotes': ['off'],
    '@typescript-eslint/quotes': rules.quotes,

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
    'require-await': ['off'],
    '@typescript-eslint/require-await': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    'no-return-await': ['off'],
    '@typescript-eslint/return-await': rules['no-return-await'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
    'semi': ['off'],
    '@typescript-eslint/semi': rules.semi,

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren':
      rules['space-before-function-paren'],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': rules['space-infix-ops'],
  },
};
