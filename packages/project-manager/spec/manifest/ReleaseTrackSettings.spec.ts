import { Platform } from '../../src/lib/manifest/Platform';
import { parseReleaseTracks } from '../../src/lib/manifest/ReleaseTrackSettings';

describe('releaseTrackSettings', () => {
  it('should parse release tracks correctly', () => {
    const releaseTracks = parseReleaseTracks({
      alpha: {
        waitForTracks: ['beta'],
        changelog: {
          fallbackMessage: 'Fallback message',
          includeInternal: true,
          autoApproval: true,
          headers: ['This is a header.'],
          footers: ['This is a footer.'],
        },
        release: {
          versionTemplate: '{{version}}',
          tagTemplate: '{{version}}',
          autoRelease: true,
        },
        platforms: [Platform.android, Platform.ios],
      },
    });
    expect(releaseTracks).toEqual({
      alpha: {
        enabled: true,
        waitForTracks: ['beta'],
        changelog: {
          fallbackMessage: 'Fallback message',
          includeInternal: true,
          autoApproval: true,
          headers: ['This is a header.'],
          footers: ['This is a footer.'],
        },
        release: {
          versionTemplate: '{{version}}',
          tagTemplate: '{{version}}',
          autoRelease: true,
        },
        platforms: [Platform.android, Platform.ios],
      },
    });
  });
  it('should parse an empty object correctly', () => {
    const releaseTracks = parseReleaseTracks({
      stable: {},
    });
    expect(releaseTracks).toEqual({
      stable: {
        enabled: true,
        waitForTracks: [],
        changelog: {
          fallbackMessage: 'Minor changes and bug fixes.',
          includeInternal: false,
          autoApproval: false,
          headers: [],
          footers: [],
        },
        release: {
          versionTemplate: '{{version}}',
          tagTemplate: '{{version}}',
          autoRelease: false,
        },
        platforms: [],
      },
    });
  });
  it('should parse an object with incorrect values correctly', () => {
    const releaseTracks = parseReleaseTracks({
      stable: {
        enabled: true,
        waitForTracks: 'beta',
        changelog: {
          fallbackMessage: 123,
          includeInternal: 'true',
          autoApproval: 'true',
          headers: 'This is a header.',
          footers: 'This is a footer.',
        },
        release: {
          versionTemplate: 123,
          tagTemplate: 123,
          autoRelease: 'true',
        },
        platforms: 'android',
      },
    });
    expect(releaseTracks).toEqual({
      stable: {
        enabled: true,
        waitForTracks: [],
        changelog: {
          fallbackMessage: 'Minor changes and bug fixes.',
          includeInternal: false,
          autoApproval: false,
          headers: [],
          footers: [],
        },
        release: {
          versionTemplate: '{{version}}',
          tagTemplate: '{{version}}',
          autoRelease: false,
        },
        platforms: [],
      },
    });
  });
});
