/**
 * @file Contains the definition of a commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { CommitMessage } from '../message/CommitMessage';
import type { CommitMessageJSON } from '../message/CommitMessage';
import { parseMessage } from '../message/parseMessage';

/** Json definition of a commit object. */
export interface CommitJson {
  /** Hash of the commit. */
  hash: string;
  /** Commit message json. */
  message: CommitMessageJSON;
}

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
  public constructor({
    hash,
    message,
  }: {
    hash: string;
    message: CommitMessage;
  }) {
    this.hash = hash;
    this.message = message;
  }

  /**
   * Convert the commit to a json object.
   *
   * @returns The json object.
   */
  public get json(): CommitJson {
    return {
      hash: this.hash,
      message: this.message.json,
    };
  }

  /**
   * Convert a string to a commit.
   *
   * @param parameteres - Parameters of the function.
   * @param parameteres.hash - Hash of the commit.
   * @param parameteres.message - Message of the commit.
   * @returns The commit object.
   * @example Commit.fromString({
   *   hash,
   *   message,
   * });
   */
  public static fromString({
    hash,
    message,
  }: {
    hash: string;
    message: string;
  }): Commit {
    return new Commit({
      hash,
      message: parseMessage(message),
    });
  }

  /**
   * Convert a json object to a commit.
   *
   * @param json - Json object.
   * @returns The commit object.
   * @example Commit.fromJson(json);
   */
  public static fromJson(json: CommitJson): Commit {
    return new Commit({
      hash: json.hash,
      message: CommitMessage.fromJson(json.message),
    });
  }
}
