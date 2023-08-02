/**
 * @file ESLint rules for TypeScript style.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        format: ['strictCamelCase'],
        leadingUnderscore: 'forbid',
        selector: ['variableLike', 'enumMember', 'parameterProperty', 'method'],
        trailingUnderscore: 'forbid',
      },
      {
        format: ['strictCamelCase'],
        leadingUnderscore: 'require',
        selector: ['variableLike', 'enumMember', 'parameterProperty', 'method'],
        trailingUnderscore: 'forbid',
        modifiers: ['unused'],
      },
      {
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        selector: 'typeLike',
        trailingUnderscore: 'forbid',
      },
    ],
  },
};
