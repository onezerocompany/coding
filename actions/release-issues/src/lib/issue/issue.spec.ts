import { Issue } from './Issue';

describe('issues', () => {
  it('should create an instance', () => {
    const issue = new Issue();
    expect(issue.json).toEqual({
      // eslint-disable-next-line no-undefined
      number: undefined,
      title: '🚀 Release 0.0.1',
      version: {
        display: '0.0.1',
        includeRelease: false,
        includeTrack: true,
        major: 0,
        minor: 0,
        patch: 1,
        template: '{major}.{minor}.{patch}-{track}',
        track: 'live',
      },
    });
  });
});
