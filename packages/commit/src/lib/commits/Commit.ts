/**
 * @file Contains the definition of a commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { CommitMessage } from '../message/CommitMessage';
import { parseMessage } from '../message/parseMessage';

/** Commit object definition. */
export class Commit {
  /** Hash of the commit. */
  public hash: string;
  /** Message of the commit. */
  public message: CommitMessage;

  /**
   * Create a new commit.
   *
   * @param parameters - Hash of the commit.
   * @param parameters.hash - Hash of the commit.
   * @param parameters.message - Message of the commit.
   * @example new Commit({ hash, message });
   */
  public constructor({ hash, message }: { hash: string; message: string }) {
    this.hash = hash;
    this.message = parseMessage(message);
  }
}
