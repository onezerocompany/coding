import {
  ConfigFile,
  ConfigValidator,
  PluginKey,
  TestFile,
} from './validation/ConfigValidator';

describe('vue config', () => {
  it('should work with regular JavaScript and JSX files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.vue3,
        testFiles: [TestFile.javascript, TestFile.javascriptReact],
        plugins: [
          PluginKey.import,
          PluginKey.react,
          PluginKey.reactHooks,
          PluginKey.jsxA11y,
          PluginKey.vue,
        ],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
  it('should work with regular Typescript and TSX files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.vue3,
        testFiles: [TestFile.typescript, TestFile.typescriptReact],
        plugins: [
          PluginKey.import,
          PluginKey.typescript,
          PluginKey.react,
          PluginKey.reactHooks,
          PluginKey.jsxA11y,
          PluginKey.vue,
        ],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
  it('should work with Jest JavaScript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.vue3,
        testFiles: [TestFile.javascriptJest],
        plugins: [
          PluginKey.import,
          PluginKey.jestPlugin,
          PluginKey.react,
          PluginKey.reactHooks,
          PluginKey.jsxA11y,
          PluginKey.vue,
        ],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
  it('should work with Jest Typescript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.vue3,
        testFiles: [TestFile.typescriptJest],
        plugins: [
          PluginKey.import,
          PluginKey.jestPlugin,
          PluginKey.typescript,
          PluginKey.react,
          PluginKey.reactHooks,
          PluginKey.jsxA11y,
          PluginKey.vue,
        ],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
});
