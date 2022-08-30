export enum VersionTrack {
  live = 'live',
  beta = 'beta',
  alpha = 'alpha',
}

export const versionTrackOrder: VersionTrack[] = [
  VersionTrack.alpha,
  VersionTrack.beta,
  VersionTrack.live,
];
