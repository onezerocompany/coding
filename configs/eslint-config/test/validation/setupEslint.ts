/**
 * @file
 * @copyright 2021 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { ESLint } from 'eslint';

/**
 * Setup an instance of ESLint with the given config file.
 *
 * @param config - Filename of the config file to use (without extension).
 * @returns An instance of ESLint.
 * @example
 *   // Returns an instance of ESLint with the config file "configs/typescript.js"
 *   const eslint = setupEslint('typescript');
 */
export function setupEslint(config: string): ESLint {
  return new ESLint({
    // Do not load configs from the project itself
    useEslintrc: false,
    // Setup the base config
    baseConfig: {
      root: true,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: resolve(__dirname, '..', '..', 'tsconfig.json'),
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // Load the config
    overrideConfigFile: resolve(__dirname, `../../configs/${config}.js`),
  });
}
