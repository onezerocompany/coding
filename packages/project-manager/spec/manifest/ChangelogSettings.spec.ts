import { parseChangelogSettings } from '../../src/lib/manifest/ChangelogSettings';

describe('changelog settings', () => {
  it('should parse a changelog setting correctly', () => {
    const changelogSetting = parseChangelogSettings({
      generate: true,
      headers: ['This is a header'],
      footers: ['This is a footer'],
    });
    expect(changelogSetting).toEqual({
      generate: true,
      headers: ['This is a header'],
      footers: ['This is a footer'],
    });
  });
  it('should parse an empty object correctly', () => {
    const changelogSetting = parseChangelogSettings({});
    expect(changelogSetting).toEqual({
      generate: false,
      headers: [],
      footers: [],
    });
  });
  it('should parse an object with incorrect values correctly', () => {
    const changelogSetting = parseChangelogSettings({
      generate: 'true',
      type: 123,
      headers: 'This is a header',
      footers: 'This is a footer',
    });
    expect(changelogSetting).toEqual({
      generate: false,
      headers: [],
      footers: [],
    });
  });
  it('should parse an incorrect object correctly', () => {
    const changelogSetting = parseChangelogSettings([]);
    expect(changelogSetting).toEqual({
      generate: false,
      headers: [],
      footers: [],
    });
  });
});
