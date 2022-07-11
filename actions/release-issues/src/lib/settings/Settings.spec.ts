import { Settings } from './Settings';

describe('Settings', () => {
  it('should work without json', () => {
    const settings = new Settings();
    expect(settings.alpha.enabled).toBe(false);
    expect(settings.beta.enabled).toBe(false);
    expect(settings.release.enabled).toBe(true);
  });
  it('should work with json', () => {
    const settings = new Settings({
      alpha: {
        enabled: true,
      },
      beta: {
        enabled: true,
      },
      release: {
        enabled: false,
      },
    });
    expect(settings.alpha.enabled).toBe(true);
    expect(settings.beta.enabled).toBe(true);
    expect(settings.release.enabled).toBe(false);
  });
});
