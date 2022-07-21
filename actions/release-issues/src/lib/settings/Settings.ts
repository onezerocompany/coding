import { VersionTrack } from '@onezerocompany/commit';
import type { TrackSettingsJSON } from './TrackSettings';
import { TrackSettings } from './TrackSettings';

export interface SettingsJSON {
  alpha: TrackSettingsJSON;
  beta: TrackSettingsJSON;
  live: TrackSettingsJSON;
}

export class Settings {
  public alpha: TrackSettings;
  public beta: TrackSettings;
  public live: TrackSettings;

  public constructor(json: SettingsJSON) {
    this.alpha = new TrackSettings({
      forTrack: VersionTrack.alpha,
      json: json.alpha,
    });
    this.beta = new TrackSettings({
      forTrack: VersionTrack.beta,
      json: json.beta,
    });
    this.live = new TrackSettings({
      forTrack: VersionTrack.live,
      json: json.live,
    });
  }

  public get json(): SettingsJSON {
    return {
      alpha: this.alpha.json,
      beta: this.beta.json,
      live: this.live.json,
    };
  }
}
