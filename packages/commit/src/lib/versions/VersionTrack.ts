export enum VersionTrack {
  live = 'live',
  beta = 'beta',
  alpha = 'alpha',
}

export const orderedTracks: VersionTrack[] = [
  VersionTrack.alpha,
  VersionTrack.beta,
  VersionTrack.live,
];
