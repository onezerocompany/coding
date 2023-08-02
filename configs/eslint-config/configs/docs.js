/**
 * @file ESLint configuration for JavaScript and JavaScript Documentation.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

module.exports = {
  plugins: ['jsdoc'],
  files: ['*.js?(x)', '*.ts?(x)'],
  excludedFiles: ['*.test.js', '*.test.ts', '*.spec.js', '*.spec.ts'],
  extends: ['../rules/javascript/docs.js', 'prettier'],
};
