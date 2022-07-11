import { Track } from './Track';
import { TrackSettings } from './TrackSettings';

export class Settings {
  alpha: TrackSettings;
  beta: TrackSettings;
  release: TrackSettings;

  constructor(json?: any) {
    const settings = json ? json : {};
    this.alpha = new TrackSettings({
      track: Track.alpha,
      json: settings.alpha,
    });
    this.beta = new TrackSettings({
      track: Track.beta,
      json: settings.beta,
    });
    this.release = new TrackSettings({
      track: Track.release,
      json: settings.release,
    });
  }
}
