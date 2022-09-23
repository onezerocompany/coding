/**
 * @file Contains the commit message object definition.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { CommitCategory } from '../categories/categories';
import { categoryForTag } from '../categories/categories';
import { emojiForShortcode } from '../categories/emoji/emoji';

/** JSON version of a commit message object. */
interface CommitMessageJSON {
  /** List of files in the commit. */
  files: string[];
  /** Category of the commit. */
  category: string;
  /** Scope of the commit. */
  scope: string;
  /** Short description of the commit. */
  subject: string;
  /** Message body of the commit. */
  messageBody: string;
  /** Whether the commit is a breaking change. */
  breaking: boolean;
  /** Issue numbers related to the commit. */
  issues: number[];
  /** Usernames of the authors of the commit. */
  coAuthors: string[];
  /** Sign-off on the commit. */
  signedOff: string;
}

/** Commit message object. */
export class CommitMessage {
  /** Files in the commit. */
  public files: string[];

  /** Category of the commit. */
  public category: CommitCategory;

  /** Scope of the commit. */
  public scope: string;

  /** Subject of the commit. */
  public subject: string;

  /** Message body of the commit. */
  public messageBody: string;

  /** Whether the commit is a breaking change. */
  public breaking: boolean;

  /** Issues related to the commit. */
  public issues: number[];

  /** Authors of the commit. */
  public coAuthors: string[];

  /** Sign-off on the commit. */
  public signedOff: string;

  /**
   * Creates a new commit message object.
   *
   * @param input - The input to create the commit message from.
   * @param input.files - The files in the commit.
   * @param input.category - The category of the commit.
   * @param input.scope - The scope of the commit.
   * @param input.subject - The subject of the commit.
   * @param input.messageBody - The message body of the commit.
   * @param input.breaking - Whether the commit is a breaking change.
   * @param input.issues - The issues related to the commit.
   * @param input.authors - The authors of the commit.
   * @param input.signedOff - The sign-off on the commit.
   * @example
   *   const message = new CommitMessage({
   *     files: ['package.json'],
   *     category: 'build',
   *     scope: 'commit',
   *     subject: 'Add commit message object',
   *     messageBody: 'This commit adds the commit message object.',
   *     breaking: false,
   *     issues: [1],
   *     authors: ['Luca Silverentand <luca@onezero.company>'],
   *     signedOff: 'Luca Silverentand <luca@onezero.company>',
   *   });
   */
  public constructor(input?: {
    files?: string[];
    category?: string;
    scope?: string;
    subject?: string;
    messageBody?: string;
    breaking?: boolean;
    issues?: number[];
    authors?: string[];
    signedOff?: string;
  }) {
    this.files = input?.files?.flat() ?? [];
    this.category = categoryForTag(input?.category);
    this.scope = input?.scope ?? 'general';
    this.subject = input?.subject ?? 'made some changes';
    this.messageBody = input?.messageBody ?? '';
    this.breaking = input?.breaking ?? false;
    this.issues = input?.issues ?? [];
    this.coAuthors = input?.authors ?? [];
    this.signedOff = input?.signedOff ?? '';
  }

  /**
   * The actual string used for creating the commit.
   *
   * @returns The commit message.
   * @example
   *   const message = new CommitMessage({ ... });
   *   console.log(message.toString());
   */
  public get message(): string {
    const lines = [
      `${this.category.emoji} ${this.category.tag}(${this.scope})${
        this.breaking ? '!' : ''
      }: ${this.subject}`,
      this.messageBody,
      [
        this.issues.map((issue) => `Closes #${issue}`).join('\n'),
        this.coAuthors.map((author) => `Co-authored-by: ${author}`).join('\n'),
        this.signedOff ? `Signed-off-by: ${this.signedOff}` : '',
      ].join('\n'),
    ];
    return lines
      .filter((line) => line.length > 0)
      .join('\n\n')
      .trim();
  }

  /**
   * Display version of the commit message meant for displaying to the user.
   *
   * @returns The display version of the commit message.
   * @example
   *   const message = new CommitMessage({ ... });
   *   console.log(message.display);
   */
  public get displayString(): string {
    const lines = this.message
      .replace(this.category.emoji, emojiForShortcode(this.category.emoji))
      .split('\n');

    const maxLineLength = lines.reduce(
      (max, line) => Math.max(max, line.length),
      0,
    );

    const extraChars = 8;
    const sideChars = 2;

    const newLines = [
      `╭${'─'.repeat(maxLineLength + extraChars - sideChars)}╮`,
      `│   ${' '.repeat(maxLineLength)}   │`,
      ...lines.map((line) => `│   ${line.padEnd(maxLineLength)}   │`),
      `│   ${' '.repeat(maxLineLength)}   │`,
      `╰${'─'.repeat(maxLineLength + extraChars - sideChars)}╯`,
    ];

    return newLines.join('\n');
  }

  /**
   * JSON representation of the commit message.
   *
   * @returns The JSON representation of the commit message.
   * @example
   *   const message = new CommitMessage({ ... });
   *   const json = commitMessage.json;
   */
  public get json(): CommitMessageJSON {
    return {
      files: this.files,
      category: this.category.tag,
      scope: this.scope,
      subject: this.subject,
      messageBody: this.messageBody,
      breaking: this.breaking,
      issues: this.issues,
      coAuthors: this.coAuthors,
      signedOff: this.signedOff,
    };
  }

  /**
   * Recreate a commit message from a JSON representation.
   *
   * @param input - The JSON representation of the commit message.
   * @returns The commit message.
   * @example
   *   const json = { ... };
   *   const message = CommitMessage.fromJSON(json);
   */
  public static fromJson(input: CommitMessageJSON): CommitMessage {
    return new CommitMessage({
      files: input.files,
      category: input.category,
      scope: input.scope,
      subject: input.subject,
      messageBody: input.messageBody,
      breaking: input.breaking,
      issues: input.issues,
      authors: input.coAuthors,
      signedOff: input.signedOff,
    });
  }
}
