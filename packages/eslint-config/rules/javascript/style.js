/* eslint-disable max-lines */
/**
 * @file ESLint rules for enforcing code style.
 * @copyright Luca Silverentand
 * @license MIT
 * @author 2022 OneZero Company
 */

/** The indentation level that should be used when writing programs. */
const indentLevel = 2;

module.exports = {
  rules: {
    // https://eslint.org/docs/rules/array-bracket-newline
    'array-bracket-newline': [
      'warn',
      {
        minItems: 5,
        multiline: true,
      },
    ],

    // https://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': [
      'warn',
      'always',
      {
        arraysInArrays: false,
        objectsInArrays: false,
        singleValue: true,
      },
    ],

    // https://eslint.org/docs/rules/array-element-newline
    'array-element-newline': [
      'warn',
      {
        ArrayExpression: {
          minItems: 5,
          multiline: true,
        },
        ArrayPattern: {
          minItems: 5,
          multiline: true,
        },
      },
    ],

    // https://eslint.org/docs/rules/block-spacing
    'block-spacing': ['warn', 'always'],

    // https://eslint.org/docs/rules/brace-style
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],

    // https://eslint.org/docs/rules/camelcase
    'camelcase': ['off'],

    // https://eslint.org/docs/rules/capitalized-comments
    'capitalized-comments': [
      'warn',
      'always',
      {
        ignoreConsecutiveComments: false,
        ignoreInlineComments: false,
      },
    ],

    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['warn', 'always-multiline'],

    // https://eslint.org/docs/rules/comma-spacing
    'comma-spacing': ['warn'],

    // https://eslint.org/docs/rules/comma-style
    'comma-style': ['warn', 'last'],

    // https://eslint.org/docs/rules/computed-property-spacing
    'computed-property-spacing': ['warn', 'never'],

    // https://eslint.org/docs/rules/consistent-this
    'consistent-this': ['error', 'that'],

    // https://eslint.org/docs/rules/eol-last
    'eol-last': ['warn', 'never'],

    // https://eslint.org/docs/rules/func-call-spacing
    'func-call-spacing': ['warn', 'never'],

    // https://eslint.org/docs/rules/func-name-matching
    'func-name-matching': ['error'],

    // https://eslint.org/docs/rules/func-names
    'func-names': ['error'],

    // https://eslint.org/docs/rules/func-style
    'func-style': ['error', 'declaration'],

    // https://eslint.org/docs/rules/function-call-argument-newline
    'function-call-argument-newline': ['warn', 'consistent'],

    // https://eslint.org/docs/rules/function-paren-newline
    'function-paren-newline': ['warn', 'multiline'],

    // https://eslidint.org/docs/rules/id-denylist
    'id-denylist': [
      'warn',
      'cb',
      'callback',
      'data',
      'request',
      'response',
      'error',
      'err',
      'e',
      'req',
      'res',
      'body',
    ],

    // https://eslint.org/docs/rules/id-length
    'id-length': [
      'warn',
      {
        exceptions: ['id', 'it', '_'],
        max: 30,
        min: 3,
      },
    ],

    // https://eslint.org/docs/rules/id-match
    'id-match': ['off'],

    // https://eslint.org/docs/rules/implicit-arrow-linebreak
    'implicit-arrow-linebreak': ['warn'],

    // https://eslint.org/docs/rules/indent
    'indent': ['warn', indentLevel],

    // https://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': ['warn', 'prefer-double'],

    // https://eslint.org/docs/rules/key-spacing
    'key-spacing': [
      'warn',
      {
        afterColon: true,
        align: 'colon',
        beforeColon: true,
        mode: 'strict',
      },
    ],

    // https://eslint.org/docs/rules/keyword-spacing
    'keyword-spacing': ['warn'],

    // https://eslint.org/docs/rules/line-comment-position
    'line-comment-position': ['warn', 'above'],

    // https://eslint.org/docs/rules/linebreak-style
    'linebreak-style': ['warn', 'unix'],

    // https://eslint.org/docs/rules/lines-around-comment
    'lines-around-comment': [
      'warn',
      {
        afterBlockComment: false,
        afterLineComment: false,
        allowArrayEnd: true,
        allowArrayStart: true,
        allowBlockEnd: true,
        allowBlockStart: true,
        allowClassEnd: true,
        allowClassStart: true,
        allowObjectEnd: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],

    // https://eslint.org/docs/rules/lines-between-class-members
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],

    // https://eslint.org/docs/rules/max-depth
    'max-depth': ['warn', { max: 3 }],

    // https://eslint.org/docs/rules/max-len
    'max-len': [
      'warn',
      {
        code: 80,
        comments: 120,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],

    // https://eslint.org/docs/rules/max-lines
    'max-lines': [
      'warn',
      { max: 250, skipBlankLines: true, skipComments: true },
    ],

    // https://eslint.org/docs/rules/max-lines-per-function
    'max-lines-per-function': [
      'warn',
      { max: 50, skipBlankLines: true, skipComments: true },
    ],

    // https://eslint.org/docs/rules/max-nested-callbacks
    'max-nested-callbacks': ['warn', { max: 4 }],

    // https://eslint.org/docs/rules/max-params
    'max-params': ['warn', { max: 4 }],

    // https://eslint.org/docs/rules/max-statements
    'max-statements': ['warn', { max: 30 }],

    // https://eslint.org/docs/rules/max-statements-per-line
    'max-statements-per-line': ['warn', { max: 2 }],

    // https://eslint.org/docs/rules/multiline-comment-style
    'multiline-comment-style': ['warn', 'starred-block'],

    // https://eslint.org/docs/rules/multiline-ternary
    'multiline-ternary': ['warn', 'never'],

    // https://eslint.org/docs/rules/new-cap
    'new-cap': [
      'error',
      {
        capIsNew: true,
        newIsCap: true,
      },
    ],

    // https://eslint.org/docs/rules/new-parens
    'new-parens': ['warn', 'never'],

    // https://eslint.org/docs/rules/newline-per-chained-call
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 2 }],

    // https://eslint.org/docs/rules/no-array-constructor
    'no-array-constructor': ['error'],

    // https://eslint.org/docs/rules/no-bitwise
    'no-bitwise': ['error'],

    // https://eslint.org/docs/rules/no-continue
    'no-continue': ['error'],

    // https://eslint.org/docs/rules/no-inline-comments
    'no-inline-comments': ['off'],

    // https://eslint.org/docs/rules/no-lonely-if
    'no-lonely-if': ['warn'],

    // https://eslint.org/docs/rules/no-mixed-operators
    'no-mixed-operators': ['warn'],

    // https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
    'no-mixed-spaces-and-tabs': ['warn'],

    // https://eslint.org/docs/rules/no-multi-assign
    'no-multi-assign': ['error'],

    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],

    // https://eslint.org/docs/rules/no-negated-condition
    'no-negated-condition': ['warn'],

    // https://eslint.org/docs/rules/no-nested-ternary
    'no-nested-ternary': ['warn'],

    // https://eslint.org/docs/rules/no-new-object
    'no-new-object': ['warn'],

    // https://eslint.org/docs/rules/no-plusplus
    'no-plusplus': ['warn'],

    // https://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': ['off'],

    // https://eslint.org/docs/rules/no-tabs
    'no-tabs': ['warn'],

    // https://eslint.org/docs/rules/no-ternary
    'no-ternary': ['off'],

    // https://eslint.org/docs/rules/no-trailing-spaces
    'no-trailing-spaces': [
      'warn',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],

    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': [
      'warn',
      {
        allowFunctionParams: false,
        allow: [],
      },
    ],

    // https://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': ['warn'],

    // https://eslint.org/docs/rules/no-whitespace-before-property
    'no-whitespace-before-property': ['warn'],

    // https://eslint.org/docs/rules/nonblock-statement-body-position
    'nonblock-statement-body-position': ['warn'],

    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': [
      'warn',
      {
        consistent: false,
        minProperties: 2,
        multiline: true,
      },
    ],

    // https://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': [
      'warn',
      'always',
      {
        arraysInObjects: false,
        objectsInObjects: false,
      },
    ],

    // https://eslint.org/docs/rules/object-property-newline
    'object-property-newline': [
      'warn',
      { allowAllPropertiesOnSameLine: false },
    ],

    // https://eslint.org/docs/rules/one-var
    'one-var': [
      'warn',
      {
        initialized: 'never',
        uninitialized: 'always',
      },
    ],

    // https://eslint.org/docs/rules/one-var-declaration-per-line
    'one-var-declaration-per-line': ['warn', 'initializations'],

    // https://eslint.org/docs/rules/operator-assignment
    'operator-assignment': ['warn', 'always'],

    // https://eslint.org/docs/rules/operator-linebreak
    'operator-linebreak': ['warn', 'before'],

    // https://eslint.org/docs/rules/padded-blocks
    'padded-blocks': [
      'warn',
      {
        blocks: 'never',
        classes: 'always',
        switches: 'never',
      },
      { allowSingleLineBlocks: true },
    ],

    // https://eslint.org/docs/rules/padding-line-between-statements
    'padding-line-between-statements': [
      'warn',
      // Single-line variable declarations should never have a blank line between them
      {
        blankLine: 'never',
        prev: ['singleline-const', 'singleline-let', 'singleline-var'],
        next: ['singleline-const', 'singleline-let', 'singleline-var'],
      },
      {
        blankLine: 'always',
        prev: ['import', 'cjs-import'],
        next: ['singleline-const', 'singleline-let', 'singleline-var'],
      },
      {
        blankLine: 'never',
        prev: ['import', 'cjs-import'],
        next: ['import', 'cjs-import'],
      },
      // Multi-line variable declarations should have a blank line between them
      {
        blankLine: 'always',
        prev: ['import', 'multiline-const', 'multiline-let', 'multiline-var'],
        next: ['multiline-const', 'multiline-let', 'multiline-var'],
      },
    ],

    // https://eslint.org/docs/rules/prefer-exponentiation-operator
    'prefer-exponentiation-operator': ['error'],

    // https://eslint.org/docs/rules/prefer-object-spread
    'prefer-object-spread': ['warn'],

    // https://eslint.org/docs/rules/quote-props
    'quote-props': ['warn', 'consistent-as-needed', { keywords: true }],

    // https://eslint.org/docs/rules/quotes
    'quotes': [
      'warn',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: false,
      },
    ],

    // https://eslint.org/docs/rules/semi
    'semi': ['warn', 'always', { omitLastInOneLineBlock: true }],

    // https://eslint.org/docs/rules/semi-spacing
    'semi-spacing': [
      'warn',
      {
        after: true,
        before: false,
      },
    ],

    // https://eslint.org/docs/rules/semi-style
    'semi-style': ['warn', 'last'],

    // https://eslint.org/docs/rules/sort-keys
    'sort-keys': ['off'],

    // https://eslint.org/docs/rules/sort-vars
    'sort-vars': ['off'],

    // https://eslint.org/docs/rules/space-before-blocks
    'space-before-blocks': ['warn', 'always'],

    // https://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        asyncArrow: 'never',
        named: 'never',
      },
    ],

    // https://eslint.org/docs/rules/space-in-parens
    'space-in-parens': ['warn', 'never'],

    // https://eslint.org/docs/rules/space-infix-ops
    'space-infix-ops': ['warn'],

    // https://eslint.org/docs/rules/space-unary-ops
    'space-unary-ops': [
      'warn',
      {
        nonwords: true,
        words: true,
      },
    ],

    // https://eslint.org/docs/rules/spaced-comment
    'spaced-comment': ['warn', 'always'],

    // https://eslint.org/docs/rules/switch-colon-spacing
    'switch-colon-spacing': [
      'warn',
      {
        after: true,
        before: false,
      },
    ],

    // https://eslint.org/docs/rules/template-tag-spacing
    'template-tag-spacing': ['warn', 'always'],

    // https://eslint.org/docs/rules/unicode-bom
    'unicode-bom': ['error', 'never'],

    // https://eslint.org/docs/rules/wrap-regex
    'wrap-regex': ['error'],
  },
};
