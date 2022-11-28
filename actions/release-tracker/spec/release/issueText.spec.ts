import { EnvironmentType } from '@onezerocompany/project-manager';
import { Commit } from '@onezerocompany/commit';
import { DeploymentStatus } from '../../src/release/DeploymentStatus';
import { ReleaseState } from '../../src/release/ReleaseState';
import { Context } from '../../src/context/Context';

describe('release issue text', () => {
  it('should generate issue text', () => {
    const state = new ReleaseState();
    state.environments = [
      {
        type: EnvironmentType.firebaseHosting,
        deployed: false,
        status: DeploymentStatus.pending,
        github_name: 'Firebase',
      },
    ];
    state.commits = [
      new Commit({
        hash: '1234567890',
        message: '⭐️ feat/new(project) new feature',
      }),
    ];
    expect(
      state.issueText({
        manifest: Context.projectManifest,
      }),
    ).toMatchSnapshot();
  });
});
