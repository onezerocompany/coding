import type { CommitCategory } from '../categories/categories';
import { categoryForTag } from '../categories/categories';
import { emojiForShortcode } from '../categories/emoji/emoji';

interface CommitMessageJSON {
  files: string[];
  category: string;
  scope: string;
  subject: string;
  messageBody: string;
  breaking: boolean;
  issues: number[];
  coAuthors: string[];
  signedOff: string;
}

export class CommitMessage {
  public files: string[];
  public category: CommitCategory;
  public scope: string;
  public subject: string;
  public messageBody: string;
  public breaking: boolean;
  public issues: number[];
  public coAuthors: string[];
  public signedOff: string;

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
