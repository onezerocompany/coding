/**
 * @file Contains functions that help validate a configuration.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import type { ESLint } from 'eslint';
import { rules } from './rules';
import { setupEslint } from './setupEslint';

/** Identifiers for plugins used in configs. */
enum PluginKey {
  /** Plugin for checking import statements. */
  import = 'import',
  /** Plugin for checking Vue. */
  vue = 'vue',
  /** Plugin to check React syntax. */
  react = 'react',
  /** Plugin for checking React Hooks. */
  reactHooks = 'react-hooks',
  /** Plugin to ensure accessibility in React projects.  */
  jsxA11y = 'jsx-a11y',
  /** Plugin for adding TypeScript support to ESLint. */
  typescript = '@typescript-eslint',
  /** Plugin for checking Next projects. */
  next = '@next/next',
  /** Plugin to ensure documentation is written for code. */
  jsdoc = 'jsdoc',
  /** Plugin for adding jest. */
  jestPlugin = 'jest',
}

/** Identifiers for the different configs we publish. */
enum ConfigFile {
  /** The config file for JavaScript projects. */
  javascript = 'base',
  /** The config file for TypeScript projects. */
  typescript = 'typescript',
  /** The config file for React projects. */
  react = 'react',
  /** The config file for Next projects.  */
  next = 'next',
  /** The config file for Vue projects. */
  vue3 = 'vue3',
}

/** Names of the files we should test. */
enum TestFile {
  /** A JavaScript test file. */
  javascript = 'test.js',
  /** A JavaScript React test file. */
  javascriptReact = 'test.jsx',
  /** A TypeScript test file. */
  typescript = 'test.ts',
  /** A TypeScript React test file. */
  typescriptReact = 'test.tsx',
  /** A Vue test file. */
  vue = 'test.vue',
  /** A JavaScript based Jest test file. */
  javascriptJest = 'test.spec.js',
  /** A TypeScript based Jest test file. */
  typescriptJest = 'test.spec.ts',
}

/**
 * Checks a given configuration against a set.
 *
 * @param fileRules - The rules to check against.
 * @param fileRules.required - The rules that are required to be present.
 * @param fileRules.banned - The rules that are not allowed to be present.
 * @param config - The configuration to check.
 * @param config.rules - The rules to check.
 * @param config.plugins - The plugins to check.
 * @param errors - The errors that have been found.
 * @param file - The file that is being checked.
 * @example
 * checkConfig(
 *   rules.javascript,
 *   config,
 *   errors,
 *   ConfigFile.javascript);
 */
function checkRules(
  fileRules: {
    required: string[];
    banned: string[];
  },
  config: {
    rules: Record<string, unknown>;
    plugins: string[];
  },
  errors: string[],
  file: TestFile,
): void {
  // Check no banned rules are found in the config
  for (/** A rule that was banned. */
  const bannedRule of fileRules.banned) {
    if (
      Object.keys(config.rules).some((rule) => rule.includes(`${bannedRule}/`))
    ) {
      errors.push(`[config: ${file}] has banned rule ${bannedRule}`);
    }
  }

  // Check no required rules are not found in the config
  for (/** A rule taht was required. */
  const requiredRule of fileRules.required) {
    if (
      !Object.keys(config.rules).some((rule) => rule.includes(requiredRule))
    ) {
      errors.push(`[config: ${file}] is missing required rule ${requiredRule}`);
    }
  }
}

/** Validates an ESLint configuration based on test files, the config and a list of plugins. */
class ConfigValidator {
  /** The instance of ESLint to use for the validator. */
  public eslint: ESLint;

  /** The config that needs to be validated. */
  public config: ConfigFile;

  /** A list of files we should be testing the config against. */
  public testFiles: TestFile[];

  /** A list of plugins that should be found in the config. */
  public plugins: PluginKey[];

  /**
   * Creates a new ConfigValidator.
   *
   * @param input - The input to create the ConfigValidator with.
   * @param input.config - The configuration to validate.
   * @param input.testFiles - The test files to validate against.
   * @param input.plugins - The plugins that should be used by the configuration.
   * @example
   * new ConfigValidator({
   *   config: ConfigFile.javascript,
   *   testFiles: [TestFile.javascript],
   *   plugins: [PluginKey.import],
   * });
   */
  public constructor(input: {
    config: ConfigFile;
    testFiles: TestFile[];
    plugins: PluginKey[];
  }) {
    this.eslint = setupEslint(input.config);
    this.config = input.config;
    this.testFiles = input.testFiles;
    this.plugins = input.plugins;
  }

  /**
   * Runs the validation.
   *
   * @example await validator.validate();
   */
  public async validate(): Promise<string[]> {
    /** The results of the validation. */
    const results = await Promise.all(
      this.testFiles.map(async (file) => {
        const filePath = resolve(__dirname, `../files/${file}`);
        const fileRules = rules(this.plugins);
        const errors: string[] = [];

        const config = (await this.eslint.calculateConfigForFile(
          filePath,
        )) as unknown as {
          rules: Record<string, unknown>;
          plugins: string[];
        };

        checkRules(fileRules, config, errors, file);
        this.checkPlugins(config, errors, file);

        // Lint the file
        for (const result of await this.eslint.lintFiles(filePath)) {
          errors.push(
            ...result.messages.map(
              (message) => `[file: ${file}] ${message.message}`,
            ),
          );
        }

        return errors;
      }),
    );
    return results.flatMap((result) => result);
  }

  /**
   * Checks whether the plugins are found in the config.
   * Also checks whether the config has any extra plugins.
   *
   * @param config - The config to check.
   * @param config.rules - The rules that are found in the config.
   * @param config.plugins - The plugins that are found in the config.
   * @param errors - The errors that are found in the config.
   * @param file - The file that is being checked.
   * @example
   *   const errors: string[] = [];
   *   checkPlugins({
   *     rules: {
   *       'import/no-extraneous-dependencies': 'error',
   *     },
   *     plugins: ['import'],
   *   }, errors, TestFile.javascript);
   */
  private checkPlugins(
    config: {
      rules: Record<string, unknown>;
      plugins: string[];
    },
    errors: string[],
    file: TestFile,
  ): void {
    // Check all plugins are found in the config
    for (const plugin of this.plugins) {
      if (!config.plugins.includes(plugin)) {
        errors.push(`[config: ${file}]  is missing plugin ${plugin}`);
      }
    }

    // Check no plugins are found that are not specified
    for (const plugin of config.plugins) {
      if (!this.plugins.includes(plugin as PluginKey)) {
        errors.push(`[config: ${file}] has unknown plugin ${plugin}`);
      }
    }
  }
}

export { ConfigValidator, TestFile, PluginKey, ConfigFile };
