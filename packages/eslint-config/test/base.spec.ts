import {
  ConfigFile,
  ConfigValidator,
  PluginKey,
  TestFile,
} from './validation/ConfigValidator';

describe('base config', () => {
  it('should work with regular JavaScript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.javascript,
        testFiles: [TestFile.javascript],
        plugins: [PluginKey.import],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
  it('should work with Jest JavaScript files', async () => {
    expect.assertions(1);
    await expect(
      new ConfigValidator({
        config: ConfigFile.javascript,
        testFiles: [TestFile.javascriptJest],
        plugins: [PluginKey.import, PluginKey.jestPlugin],
      }).validate(),
    ).resolves.toStrictEqual([]);
  });
});
