import { Track } from './Track';
import type { TrackSettingsJSON } from './TrackSettings';
import { TrackSettings } from './TrackSettings';

export interface SettingsJSON {
  alpha: TrackSettingsJSON;
  beta: TrackSettingsJSON;
  release: TrackSettingsJSON;
}

export class Settings {
  public alpha: TrackSettings;
  public beta: TrackSettings;
  public release: TrackSettings;

  public constructor(json: SettingsJSON) {
    this.alpha = new TrackSettings({
      track: Track.alpha,
      json: json.alpha,
    });
    this.beta = new TrackSettings({
      track: Track.beta,
      json: json.beta,
    });
    this.release = new TrackSettings({
      track: Track.release,
      json: json.release,
    });
  }

  public get json(): SettingsJSON {
    return {
      alpha: this.alpha.json,
      beta: this.beta.json,
      release: this.release.json,
    };
  }
}
