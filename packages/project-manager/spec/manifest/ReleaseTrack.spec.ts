import {
  ReleaseTrack,
  releaseTracks,
} from '../../src/lib/manifest/ReleaseTrack';

describe('releaseTrack', () => {
  it('should be an enum', () => {
    expect(ReleaseTrack).toEqual({
      stable: 'stable',
      beta: 'beta',
      alpha: 'alpha',
    });
  });
  it('should have a list of all release tracks in the correct order', () => {
    expect(releaseTracks).toEqual(['stable', 'beta', 'alpha']);
  });
});
