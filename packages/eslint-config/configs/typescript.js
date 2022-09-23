/**
 * @file Contains the rules for TypeScript projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand
 */

module.exports = {
  parserOptions: { sourceType: 'module' },
  extends: ['./base.js'],
  overrides: [
    {
      files: '*.ts?(x)',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        '../rules/typescript/extension.js',
        '../rules/typescript/typescript.js',
        '../rules/typescript/style.js',
        'prettier',
      ],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    },
  ],
};
