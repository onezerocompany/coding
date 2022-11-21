import { parseReleaseCreationSettings } from '../../src/lib/manifest/ReleaseCreationSettings';

describe('release creation settings', () => {
  it('should parse release creation settings', () => {
    const settings = parseReleaseCreationSettings({
      tag_template: '{major}.{minor}.{patch}',
      commit_url: 'http://github.com/onezero-company/coding/commit/{{commit}}',
      changelog_fallback: '- no changes',
    });
    expect(settings).toEqual({
      tag_template: '{major}.{minor}.{patch}',
      commit_url: 'http://github.com/onezero-company/coding/commit/{{commit}}',
      changelog_fallback: '- no changes',
    });
  });
  it('should parse an empty release creation settings', () => {
    const settings = parseReleaseCreationSettings({});
    expect(settings).toEqual({
      tag_template: '{major}.{minor}.{patch}',
      commit_url: '',
      changelog_fallback: '- Minor bug fixes and improvements.',
    });
  });
});
