/**
 * @file Settings for the release action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ReleaseTrack } from '@onezerocompany/commit';
import type { TrackSettingsJSON } from './TrackSettings';
import { TrackSettings } from './TrackSettings';

/** Settings for the release action. */
export interface SettingsJSON {
  /** GitHub users to be assigned to the created issue. */
  assignees: string[];
  /** Settings for the Alpha release track. */
  alpha: TrackSettingsJSON;
  /** Settings for the Beta release track. */
  beta: TrackSettingsJSON;
  /** Settings for the Stable release track. */
  stable: TrackSettingsJSON;
}

/** Settings for the release action. */
export class Settings {
  /** GitHub assignees. */
  public assignees: string[];

  /** Alpha track settings. */
  public alpha: TrackSettings;

  /** Beta track settings. */
  public beta: TrackSettings;

  /** Stable track settings. */
  public stable: TrackSettings;

  /**
   * Create a new instance of the Settings object.
   *
   * @param json - JSON object to create the instance from.
   * @example
   *   const settings = new Settings({
   *     assignees: ['luca'],
   *     alpha: { ... },
   *     beta: { ... },
   *     stable: { ... },
   *   });
   */
  public constructor(json?: SettingsJSON) {
    this.assignees = json?.assignees ?? [];
    this.alpha = new TrackSettings({
      forTrack: ReleaseTrack.alpha,
      json: json?.alpha,
    });
    this.beta = new TrackSettings({
      forTrack: ReleaseTrack.beta,
      json: json?.beta,
    });
    this.stable = new TrackSettings({
      forTrack: ReleaseTrack.stable,
      json: json?.stable,
    });
  }

  /**
   * Outputs the settings as a JSON object.
   *
   * @returns JSON representation of the Settings object.
   * @example
   *   const settings = new Settings({ ... });
   *   const json = settings.json;
   */
  public get json(): SettingsJSON {
    return {
      assignees: this.assignees,
      alpha: this.alpha.json,
      beta: this.beta.json,
      stable: this.stable.json,
    };
  }
}
