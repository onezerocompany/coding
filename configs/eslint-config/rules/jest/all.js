/**
 * @file ESLint rules for Jest projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/* eslint-disable id-length */
module.exports = {
  rules: {
    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/consistent-test-it.md
    'jest/consistent-test-it': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/expect-expect.md
    'jest/expect-expect': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-nested-describe.md
    'jest/max-nested-describe': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md
    'jest/no-alias-methods': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-commented-out-tests.md
    'jest/no-commented-out-tests': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md
    'jest/no-conditional-expect': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-in-test.md
    'jest/no-conditional-in-test': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-deprecated-functions.md
    'jest/no-deprecated-functions': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-disabled-tests.md
    'jest/no-disabled-tests': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-done-callback.md
    'jest/no-done-callback': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-duplicate-hooks.md
    'jest/no-duplicate-hooks': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-export.md
    'jest/no-export': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-focused-tests.md
    'jest/no-focused-tests': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-hooks.md
    'jest/no-hooks': ['off'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-identical-title.md
    'jest/no-identical-title': ['error'],

    /*
     * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-if.md
     * deprecated in favor of no-conditional-expect
     */
    'jest/no-if': ['off'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-interpolation-in-snapshots.md
    'jest/no-interpolation-in-snapshots': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-jasmine-globals.md
    'jest/no-jasmine-globals': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-jest-import.md
    'jest/no-jest-import': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-large-snapshots.md
    'jest/no-large-snapshots': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-mocks-import.md
    'jest/no-mocks-import': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-restricted-matchers.md
    'jest/no-restricted-matchers': ['off'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-standalone-expect.md
    'jest/no-standalone-expect': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-prefixes.md
    'jest/no-test-prefixes': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-return-statement.md
    'jest/no-test-return-statement': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-called-with.md
    'jest/prefer-called-with': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-comparison-matcher.md
    'jest/prefer-comparison-matcher': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-equality-matcher.md
    'jest/prefer-equality-matcher': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-assertions.md
    'jest/prefer-expect-assertions': [
      'warn',
      {
        onlyFunctionsWithAsyncKeyword: true,
        onlyFunctionsWithExpectInLoop: true,
        onlyFunctionsWithExpectInCallback: true,
      },
    ],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-resolves.md
    'jest/prefer-expect-resolves': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-on-top.md
    'jest/prefer-hooks-on-top': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-lowercase-title.md
    'jest/prefer-lowercase-title': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-snapshot-hint.md
    'jest/prefer-snapshot-hint': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-spy-on.md
    'jest/prefer-spy-on': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-strict-equal.md
    'jest/prefer-strict-equal': ['off'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-be.md
    'jest/prefer-to-be': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-contain.md
    'jest/prefer-to-contain': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-have-length.md
    'jest/prefer-to-have-length': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-todo.md
    'jest/prefer-todo': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-hook.md
    'jest/require-hook': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-to-throw-message.md
    'jest/require-to-throw-message': ['off'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-top-level-describe.md
    'jest/require-top-level-describe': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
    'jest/unbound-method': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-describe-callback.md
    'jest/valid-describe-callback': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect-in-promise.md
    'jest/valid-expect-in-promise': ['error'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect.md
    'jest/valid-expect': ['warn'],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-title.md
    'jest/valid-title': ['warn'],
  },
};
