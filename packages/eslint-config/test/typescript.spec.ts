import {
  ConfigFile,
  ConfigValidator,
  PluginKey,
  TestFile,
} from './validation/ConfigValidator';

describe('typescript config', () => {
  it('should work with regular JavaScript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.typescript,
        testFiles: [TestFile.javascript],
        plugins: [PluginKey.import, PluginKey.jsdoc, PluginKey.jsdoc],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
  it('should work with regular Typescript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.typescript,
        testFiles: [TestFile.typescript],
        plugins: [PluginKey.import, PluginKey.typescript, PluginKey.jsdoc],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
  it('should work with Jest JavaScript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.typescript,
        testFiles: [TestFile.javascriptJest],
        plugins: [PluginKey.import, PluginKey.jestPlugin],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
  it('should work with Jest Typescript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.typescript,
        testFiles: [TestFile.typescriptJest],
        plugins: [PluginKey.import, PluginKey.jestPlugin, PluginKey.typescript],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
});
