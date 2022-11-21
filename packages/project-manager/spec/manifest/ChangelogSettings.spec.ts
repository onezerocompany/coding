import {
  ChangelogType,
  parseChangelogSettings,
} from '../../src/lib/manifest/ChangelogSettings';

describe('changelog settings', () => {
  it('should parse a changelog setting correctly', () => {
    const changelogSetting = parseChangelogSettings({
      generate: true,
      type: 'github',
      headers: ['This is a header'],
      footers: ['This is a footer'],
    });
    expect(changelogSetting).toEqual({
      generate: true,
      type: ChangelogType.github,
      headers: ['This is a header'],
      footers: ['This is a footer'],
    });
  });
  it('should parse an empty object correctly', () => {
    const changelogSetting = parseChangelogSettings({});
    expect(changelogSetting).toEqual({
      generate: false,
      type: ChangelogType.github,
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
      type: ChangelogType.github,
      headers: [],
      footers: [],
    });
  });
  it('should parse an incorrect object correctly', () => {
    const changelogSetting = parseChangelogSettings([]);
    expect(changelogSetting).toEqual({
      generate: false,
      type: ChangelogType.github,
      headers: [],
      footers: [],
    });
  });
});
