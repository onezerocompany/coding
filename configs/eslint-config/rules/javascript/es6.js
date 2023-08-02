/**
 * @file ESLint rules for ECMAScript 6 (ES6) syntax.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */
module.exports = {
  rules: {
    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': ['warn', 'as-needed'],

    // https://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['warn', 'always'],

    // https://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': [
      'warn',
      {
        after: true,
        before: true,
      },
    ],

    // https://eslint.org/docs/rules/constructor-super
    'constructor-super': ['error'],

    // https://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': ['warn', 'both'],

    // https://eslint.org/docs/rules/no-class-assign
    'no-class-assign': ['error'],

    // https://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': ['error'],

    // https://eslint.org/docs/rules/no-const-assign
    'no-const-assign': ['error'],

    // https://eslint.org/docs/rules/no-dupe-class-members
    'no-dupe-class-members': ['error'],

    // https://eslint.org/docs/rules/no-duplicate-imports
    'no-duplicate-imports': ['error', { includeExports: true }],

    // https://eslint.org/docs/rules/no-new-symbol
    'no-new-symbol': ['error'],

    // https://eslint.org/docs/rules/no-restricted-exports
    'no-restricted-exports': ['off'],

    // https://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': ['off'],

    // https://eslint.org/docs/rules/no-this-before-super
    'no-this-before-super': ['error'],

    // https://eslint.org/docs/rules/no-useless-computed-key
    'no-useless-computed-key': ['warn'],

    // https://eslint.org/docs/rules/no-useless-constructor
    'no-useless-constructor': ['warn'],

    // https://eslint.org/docs/rules/no-useless-rename
    'no-useless-rename': ['warn'],

    // https://eslint.org/docs/rules/no-var
    'no-var': ['error'],

    // https://eslint.org/docs/rules/object-shorthand
    'object-shorthand': ['warn'],

    // https://eslint.org/docs/rules/prefer-arrow-callback
    'prefer-arrow-callback': [
      'warn',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],

    // https://eslint.org/docs/rules/prefer-const
    'prefer-const': ['warn'],

    // https://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'warn',
      {
        array: true,
        object: true,
      },
    ],

    // https://eslint.org/docs/rules/prefer-numeric-literals
    'prefer-numeric-literals': ['error'],

    // https://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': ['warn'],

    // https://eslint.org/docs/rules/prefer-spread
    'prefer-spread': ['warn'],

    // https://eslint.org/docs/rules/prefer-template
    'prefer-template': ['warn'],

    // https://eslint.org/docs/rules/require-yield
    'require-yield': ['error'],

    // https://eslint.org/docs/rules/rest-spread-spacing
    'rest-spread-spacing': ['warn', 'never'],

    // https://eslint.org/docs/rules/sort-imports
    'sort-imports': ['off'],

    // https://eslint.org/docs/rules/symbol-description
    'symbol-description': ['error'],

    // https://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': ['warn', 'always'],

    // https://eslint.org/docs/rules/yield-star-spacing
    'yield-star-spacing': ['warn', 'after'],
  },
};
