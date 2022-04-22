import { resolve } from 'path';
import type { ESLint } from 'eslint';
import { rules } from './rules';
import { setupEslint } from './setupEslint';

enum PluginKey {
  import = 'import',
  vue = 'vue',
  react = 'react',
  reactHooks = 'react-hooks',
  jsxA11y = 'jsx-a11y',
  typescript = '@typescript-eslint',
  next = '@next/next',
  jestPlugin = 'jest',
}

enum ConfigFile {
  javascript = 'base',
  typescript = 'typescript',
  react = 'react',
  next = 'next',
  vue3 = 'vue3',
}

enum TestFile {
  javascript = 'test.js',
  javascriptReact = 'test.jsx',
  typescript = 'test.ts',
  typescriptReact = 'test.tsx',
  vue = 'test.vue',
  javascriptJest = 'test.spec.js',
  typescriptJest = 'test.spec.ts',
}

function checkRules(
  fileRules: { required: string[]; banned: string[] },
  config: { rules: Record<string, unknown>; plugins: string[] },
  errors: string[],
  file: TestFile,
): void {
  // check no banned rules are found in the config
  for (const bannedRule of fileRules.banned) {
    if (
      Object.keys(config.rules).some((rule) => rule.includes(`${bannedRule}/`))
    ) {
      errors.push(`[config: ${file}] has banned rule ${bannedRule}`);
    }
  }

  // check no required rules are not found in the config
  for (const requiredRule of fileRules.required) {
    if (
      !Object.keys(config.rules).some((rule) => rule.includes(requiredRule))
    ) {
      errors.push(`[config: ${file}] is missing required rule ${requiredRule}`);
    }
  }
}

class ConfigValidator {
  public eslint: ESLint;
  public config: ConfigFile;
  public testFiles: TestFile[];
  public plugins: PluginKey[];

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

  public async validate(): Promise<string[]> {
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

        // lint the file
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

  private checkPlugins(
    config: { rules: Record<string, unknown>; plugins: string[] },
    errors: string[],
    file: TestFile,
  ): void {
    // check all plugins are found in the config
    for (const plugin of this.plugins) {
      if (!config.plugins.includes(plugin)) {
        errors.push(`[config: ${file}]  is missing plugin ${plugin}`);
      }
    }

    // check no plugins are found that are not specified
    for (const plugin of config.plugins) {
      if (!this.plugins.includes(plugin as PluginKey)) {
        errors.push(`[config: ${file}] has unknown plugin ${plugin}`);
      }
    }
  }
}

export { ConfigValidator, TestFile, PluginKey, ConfigFile };
