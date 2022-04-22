import { resolve } from 'path';
import { ESLint } from 'eslint';

export function setupEslint(config: string): ESLint {
  return new ESLint({
    // do not load configs from the project itself
    useEslintrc: false,
    // setup the base config
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
    // load the config
    overrideConfigFile: resolve(__dirname, `../../configs/${config}.js`),
  });
}
