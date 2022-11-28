/**
 * @file Contains the context for the release tracker action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { loadManifestFromProject } from '@onezerocompany/project-manager';
import type { ReleaseState } from '../release/ReleaseState';
import { loadCurrentState } from './loadCurrentState';
import { loadPreviousState } from './loadPreviousState';

/** Context for the action. */
export class Context {
  /** Static version of the context. */
  public static default = new Context();

  /** Manifest of the project with all the settings. */
  public static readonly projectManifest = loadManifestFromProject();

  /** Previous state of the release to compare to. */
  public previousState: ReleaseState | null = null;
  /** Current state of the release. */
  public curentState: ReleaseState | null = null;

  /**
   * Initializes the context for the action.
   *
   * @example await Context.default.initialize();
   */
  public async initialize(): Promise<void> {
    this.previousState = loadPreviousState();
    this.curentState = loadCurrentState({
      manifest: Context.projectManifest,
    });
  }
}
