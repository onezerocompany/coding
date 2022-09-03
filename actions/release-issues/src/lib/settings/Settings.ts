import { VersionTrack } from '@onezerocompany/commit';
import type { TrackSettingsJSON } from './TrackSettings';
import { TrackSettings } from './TrackSettings';

export interface SettingsJSON {
  assignees: string[];
  alpha: TrackSettingsJSON;
  beta: TrackSettingsJSON;
  live: TrackSettingsJSON;
}

export class Settings {
  public assignees: string[];
  public alpha: TrackSettings;
  public beta: TrackSettings;
  public live: TrackSettings;

  public constructor(json: SettingsJSON) {
    this.assignees = json.assignees;
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
      assignees: this.assignees,
      alpha: this.alpha.json,
      beta: this.beta.json,
      live: this.live.json,
    };
  }
}
