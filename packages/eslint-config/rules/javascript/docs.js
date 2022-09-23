/**
 * @file ESLint rules for JSDoc comments.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/* eslint-disable max-lines */
module.exports = {
  rules: {
    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-access
     * Checks that `@access` tags are valid.
     */
    'jsdoc/check-access': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-alignment
     * Checks that block tags are aligned properly.
     */
    'jsdoc/check-alignment': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-examples
     * Checks that examples within JSDoc adhere to ESLint rules.
     *
     * !!! THis rule is disabled because it is not compatible with ESLint 8.x
     */
    'jsdoc/check-examples': ['off'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-indentation
     * Checks that the indentation in JSDoc is correct.
     */
    'jsdoc/check-indentation': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-line-alignment
     * Checks that the text following the `@` in a JSDoc block tag is aligned.
     */
    'jsdoc/check-line-alignment': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-param-names
     * Checks that parameter names in JSDoc match those in the function declaration.
     */
    'jsdoc/check-param-names': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-property-names
     * Checks that property names in JSDoc are not duplicated on the same block and that nested properties have defined roots.
     */
    'jsdoc/check-property-names': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-syntax
     * Checks that the syntax in JSDoc is valid.
     */
    'jsdoc/check-syntax': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-tag-names
     * Checks that block tag names are valid.
     */
    'jsdoc/check-tag-names': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-types
     * Checks that types in JSDoc are valid.
     */
    'jsdoc/check-types': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-check-values
     * Checks that values in JSDoc conform to the expected type.
     */
    'jsdoc/check-values': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-empty-tags
     * Checks for empty block tags.
     */
    'jsdoc/empty-tags': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-implements-on-classes
     * Requires that all functions have an `@implements` tag.
     */
    'jsdoc/implements-on-classes': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-match-description
     * Checks that the description in JSDoc matches the one in the function declaration.
     */
    'jsdoc/match-description': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-match-name
     * Checks that the name in JSDoc matches the one in the function declaration.
     */
    'jsdoc/match-name': ['off'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-multiline-blocks
     * Checks that multiline block tags are followed by a blank line.
     */
    'jsdoc/multiline-blocks': [
      'warn',
      {
        noMultilineBlocks: true,
        minimumLengthForMultiline: 100,
      },
    ],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-newline-after-description
     * Checks that there is a blank line after the description.
     */
    'jsdoc/newline-after-description': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-no-bad-blocks
     * This rule checks for multi-line-style comments which fail to meet the criteria of a jsdoc block
     */
    'jsdoc/no-bad-blocks': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-no-defaults
     * Reports default values being used on the relevant block.
     */
    'jsdoc/no-defaults': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-no-types
     * Reports types being used on the relevant block.
     */
    'jsdoc/no-types': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-no-undefined-types
     * Reports types being used on the relevant block.
     */
    'jsdoc/no-undefined-types': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-asterisk-prefix
     * Requires that block description, explicit `@param` and `@returns` tags, and `@throws` tags are prefixed with a `*`.
     */
    'jsdoc/require-asterisk-prefix': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-description
     * Requires that block or function description is present.
     */
    'jsdoc/require-description': [
      'warn',
      { contexts: ['any'], exemptedBy: ['deprecated', 'file'] },
    ],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-description-complete-sentence
     * Requires that block or function description is present and not just an isolated fragment.
     */
    'jsdoc/require-description-complete-sentence': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-example
     * Requires that examples are provided for functions.
     */
    'jsdoc/require-example': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-file-overview
     * Requires that file overview documentation is present.
     */
    'jsdoc/require-file-overview': [
      'warn',
      {
        tags: {
          file: {
            mustExist: true,
            preventDuplicates: true,
          },
          license: {
            mustExist: true,
            preventDuplicates: true,
          },
          author: {
            mustExist: true,
            preventDuplicates: true,
          },
          copyright: {
            mustExist: true,
            preventDuplicates: true,
          },
        },
      },
    ],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-hyphen-before-param-description
     * Requires that all `@param` tags have a hyphen and description.
     */
    'jsdoc/require-hyphen-before-param-description': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-jsdoc
     * Requires that all functions are documented.
     */
    'jsdoc/require-jsdoc': [
      'warn',
      {
        contexts: [
          // Classes
          'ClassDeclaration',
          'ClassExpression',
          'MethodDefinition',
          'TSMethodSignature',
          'PropertyDefinition',
          'AbstractPropertyDefinition',
          // Functions
          'ArrowFunctionExpression',
          'FunctionDeclaration',
          // Interfaces

          'TSInterfaceDeclaration',
          'TSInterfaceDeclaration TSPropertySignature',
          // Enums
          'TSEnumDeclaration',
          'TSEnumMember',
          // Switch
          'SwitchCase',
        ],
      },
    ],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-param
     * Requires that all function parameters are documented.
     */
    'jsdoc/require-param': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-param-description
     * Requires that all `@param` tags have a description value.
     */
    'jsdoc/require-param-description': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-param-name
     * Requires that all `@param` tags have a name value.
     */
    'jsdoc/require-param-name': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-param-type
     * Requires that all `@param` tags have a type value.
     */
    'jsdoc/require-param-type': ['off'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-returns
     * Requires that all functions have a `@returns` tag.
     */
    'jsdoc/require-returns': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-returns-check
     * Requires that all `@returns` tags have a description value.
     */
    'jsdoc/require-returns-check': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-returns-description
     * Requires that all `@returns` tags have a description value.
     */
    'jsdoc/require-returns-description': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-returns-type
     * Requires that all `@returns` tags have a type value.
     */
    'jsdoc/require-returns-type': ['off'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-valid-types
     * Checks that types in jsdoc comments are defined.
     */
    'jsdoc/valid-types': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-property
     * Requires that all `@property` tags have a description value.
     */
    'jsdoc/require-property': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-property-description
     * Requires that all `@property` tags have a description value.
     */
    'jsdoc/require-property-description': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-property-name
     * Requires that all `@property` tags have a name value.
     */
    'jsdoc/require-property-name': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-property-type
     * Requires that all `@property` tags have a type value.
     */
    'jsdoc/require-property-type': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-yields
     * Requires that all `@yields` tags have a description value.
     */
    'jsdoc/require-yields': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-yields-check
     * Requires that all `@yields` tags have a description value.
     */
    'jsdoc/require-yields-check': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-no-missing-syntax
     * This rule lets you report if certain always expected comment structures are missing.
     */
    'jsdoc/no-missing-syntax': ['off'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-no-missing-syntax
     * This rule lets you report if certain always expected comment structures are missing.
     */
    'jsdoc/no-multi-asterisks': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-no-restricted-syntax
     * Reports invalid block tag names.
     */
    'jsdoc/no-restricted-syntax': ['off'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-require-throws
     * Requires that all functions have `@throws` or `@rejects` tags.
     */
    'jsdoc/require-throws': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-sort-tags
     * Requires that all `@param` tags are sorted alphabetically by name.
     */
    'jsdoc/sort-tags': ['warn'],

    /*
     * https://github.com/gajus/eslint-plugin-jsdoc#user-content-eslint-plugin-jsdoc-rules-tag-lines
     * Requires that all block tags are separated by a blank line.
     */
    'jsdoc/tag-lines': ['warn'],
  },
};
