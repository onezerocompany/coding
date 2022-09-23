import { ReleaseTrack } from '@onezerocompany/commit';
import { Platform } from '../definitions/Platform';
import { TrackSettings } from './TrackSettings';

describe('track settings', () => {
  it('should work without providing anything', () => {
    const settings = new TrackSettings();
    expect(settings.enabled).toBe(true);
    expect(settings.version.template).toBe('{{version}}');
    expect(settings.release.manual).toBe(true);
    expect(settings.release.waitForTracks).toEqual([]);
    expect(settings.release.platforms).toEqual([]);
    expect(settings.release.allowedUsers).toEqual([]);
  });
  it('should setup correct default alpha settings', () => {
    const settings = new TrackSettings({ forTrack: ReleaseTrack.alpha });
    expect(settings.enabled).toBe(false);
    expect(settings.version.template).toBe('{{version}}-alpha');
    expect(settings.release.manual).toBe(true);
    expect(settings.release.waitForTracks).toEqual([]);
    expect(settings.release.platforms).toEqual([]);
    expect(settings.release.allowedUsers).toEqual([]);
  });
  it('should setup correct default beta settings', () => {
    const settings = new TrackSettings({ forTrack: ReleaseTrack.beta });
    expect(settings.enabled).toBe(false);
    expect(settings.version.template).toBe('{{version}}-beta');
    expect(settings.release.manual).toBe(true);
    expect(settings.release.waitForTracks).toEqual([]);
    expect(settings.release.platforms).toEqual([]);
    expect(settings.release.allowedUsers).toEqual([]);
  });
  it('should setup correct default release settings', () => {
    const settings = new TrackSettings({ forTrack: ReleaseTrack.stable });
    expect(settings.enabled).toBe(true);
    expect(settings.version.template).toBe('{{version}}');
    expect(settings.release.manual).toBe(true);
    expect(settings.release.waitForTracks).toEqual([]);
    expect(settings.release.platforms).toEqual([]);
    expect(settings.release.allowedUsers).toEqual([]);
  });
  it('should work with a json object', () => {
    const settings = new TrackSettings({
      json: {
        enabled: false,
        version: {
          template: 'v{version}-test',
        },
        release: {
          manual: false,
          waitForTracks: [ReleaseTrack.alpha, ReleaseTrack.beta],
          platforms: [Platform.linux, Platform.macos, Platform.windows],
          allowedUsers: ['lucasilverentand'],
        },
        changelog: {
          footer: '',
          header: '',
          fallback: '- minor bug fixes and improvements',
        },
      },
    });
    expect(settings.enabled).toBe(false);
    expect(settings.version.template).toBe('v{version}-test');
    expect(settings.release.manual).toBe(false);
    expect(settings.release.waitForTracks).toEqual(['alpha', 'beta']);
    expect(settings.release.platforms).toEqual(['linux', 'macos', 'windows']);
    expect(settings.release.allowedUsers).toEqual(['lucasilverentand']);
  });
});
