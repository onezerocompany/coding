import { Issue } from './Issue';

describe('issues', () => {
  it('should create an instance', () => {
    const issue = new Issue();
    expect(issue.json).toEqual({
      // eslint-disable-next-line no-undefined
      commitish: '',
      number: -1,
      title: '🚀 Release 0.0.1',
      version: {
        major: 0,
        minor: 0,
        patch: 1,
        template: '{major}.{minor}.{patch}-{track}',
      },
      items: [],
      changelogs: {
        alpha: '',
        beta: '',
        live: '',
      },
      commits: [],
    });
  });
});
