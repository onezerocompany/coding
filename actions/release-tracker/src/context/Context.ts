/**
 * @file Contains the context for the release tracker action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug } from '@actions/core';
import { loadManifestFromProject } from '@onezerocompany/project-manager';
import type { ReleaseState } from '../release/ReleaseState';
import { loadCurrentState } from './loadCurrentState';
import { loadPreviousState } from './loadPreviousState';
import type { ReleaseFile } from './loadReleaseFiles';
import { loadReleaseFiles } from './loadReleaseFiles';
import type { PreviousRelease } from './PreviousRelease';

/** Context for the action. */
export class Context {
  /** Manifest of the project with all the settings. */
  public readonly projectManifest = loadManifestFromProject();

  /** Previous state of the release to compare to. */
  public previousState: ReleaseState | null = null;
  /** Current state of the release. */
  public curentState: ReleaseState | null = null;

  /** Last published issue text. */
  public currentIssueText = '';

  /** SHA of the previous release. */
  public previousRelease: PreviousRelease = {};

  /** Files to attach to the release. */
  public releaseFiles: ReleaseFile[] = [];

  /**
   * Initializes the context for the action.
   *
   * @example await Context.default.initialize();
   */
  public async initialize(): Promise<void> {
    const { state: previousState, currentIssueText } = loadPreviousState();
    this.previousState = previousState;
    this.currentIssueText = currentIssueText;
    const { state: currentState } = loadCurrentState({
      manifest: this.projectManifest,
      previousState: this.previousState,
      context: this,
    });
    this.curentState = currentState;
    this.releaseFiles = loadReleaseFiles();
    const jsonIndentation = 2;
    debug(
      `Initialized context:\n${JSON.stringify(this, null, jsonIndentation)}`,
    );
  }
}
