import { EnvironmentType } from '@onezerocompany/project-manager';
import { Commit } from '@onezerocompany/commit';
import { ReleaseState } from '../../src/release/ReleaseState';
import { ReleaseEnvironment } from '../../src/release/ReleaseEnvironment';
import { sharedContext } from '../../src/context/sharedContext';

describe('release issue text', () => {
  it('should generate issue text', () => {
    const state = new ReleaseState();
    state.environments = [
      new ReleaseEnvironment({
        id: 'firebase',
        type: EnvironmentType.firebaseHosting,
        deployed: false,
        githubName: 'Firebase',
        needs: [],
        changelog: {
          generate: true,
          headers: [],
          footers: [],
        },
      }),
    ];
    state.commits = [
      new Commit({
        hash: '1234567890',
        message: '⭐️ feat/new(project) new feature',
      }),
    ];
    expect(
      state.issueText({
        manifest: sharedContext.projectManifest,
      }),
    ).toMatchSnapshot();
  });
});
