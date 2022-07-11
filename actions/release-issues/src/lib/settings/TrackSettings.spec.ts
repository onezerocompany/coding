import { Track } from './Track';
import { TrackSettings } from './TrackSettings';

describe('Track settings', () => {
  it('should work without providing anything', () => {
    const settings = new TrackSettings();
    expect(settings.enabled).toBe(true);
    expect(settings.version.template).toBe('{{version}}');
    expect(settings.requirements.tests).toEqual([]);
    expect(settings.release.manual).toBe(true);
    expect(settings.release.waitForTracks).toEqual([]);
    expect(settings.release.platforms).toEqual([]);
    expect(settings.release.allowedUsers).toEqual([]);
  });
  it('should setup correct default alpha settings', () => {
    const settings = new TrackSettings({ track: Track.alpha });
    expect(settings.enabled).toBe(false);
    expect(settings.version.template).toBe('{{version}}-alpha');
    expect(settings.requirements.tests).toEqual([]);
    expect(settings.release.manual).toBe(true);
    expect(settings.release.waitForTracks).toEqual([]);
    expect(settings.release.platforms).toEqual([]);
    expect(settings.release.allowedUsers).toEqual([]);
  });
  it('should setup correct default beta settings', () => {
    const settings = new TrackSettings({ track: Track.beta });
    expect(settings.enabled).toBe(false);
    expect(settings.version.template).toBe('{{version}}-beta');
    expect(settings.requirements.tests).toEqual([]);
    expect(settings.release.manual).toBe(true);
    expect(settings.release.waitForTracks).toEqual([]);
    expect(settings.release.platforms).toEqual([]);
    expect(settings.release.allowedUsers).toEqual([]);
  });
  it('should setup correct default release settings', () => {
    const settings = new TrackSettings({ track: Track.release });
    expect(settings.enabled).toBe(true);
    expect(settings.version.template).toBe('{{version}}');
    expect(settings.requirements.tests).toEqual([]);
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
        requirements: {
          tests: [
            {
              action: 'test',
              coverage: 50,
            },
            {
              action: 'test_2',
              coverage: 80,
            },
          ],
        },
        release: {
          manual: false,
          waitForTracks: ['alpha', 'beta'],
          platforms: ['linux', 'macos', 'windows', 'fake'],
          allowedUsers: ['lucasilverentand'],
        },
      },
    });
    expect(settings.enabled).toBe(false);
    expect(settings.version.template).toBe('v{version}-test');
    expect(settings.requirements.tests).toEqual([
      {
        action: 'test',
        coverage: 50,
      },
      {
        action: 'test_2',
        coverage: 80,
      },
    ]);
    expect(settings.release.manual).toBe(false);
    expect(settings.release.waitForTracks).toEqual(['alpha', 'beta']);
    expect(settings.release.platforms).toEqual(['linux', 'macos', 'windows']);
    expect(settings.release.allowedUsers).toEqual(['lucasilverentand']);
  });
});
