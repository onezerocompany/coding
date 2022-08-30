export enum VersionBump {
  none = 'none',
  patch = 'patch',
  minor = 'minor',
  major = 'major',
}

export const versionBumpOrder = [
  VersionBump.none,
  VersionBump.patch,
  VersionBump.minor,
  VersionBump.major,
];
