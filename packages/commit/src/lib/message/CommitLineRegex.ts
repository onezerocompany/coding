/**
 * @file Contains the regex for parsing commit messages.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/*
 * Regex that matches the following groups:
 * - emoji (either a unicode emoji or a github emoji tag)
 * - category (text after the emoji and a space)
 * - scope (text between parentheses directly attached to the category)
 * - breaking (an exclamation mark behind the scope closing parenthesis)
 * - subject (text after the optional breaking exclamation mark and a space)
 * Format is:
 * <emoji> <category>(<scope>)<breaking><:> <subject>
 */
export const commitLineRegex =
  /^(?:(?:(?<githubEmoji>:[a-z0-9_]{1,}:)|(?<emoji>[^a-zA-Z\d$&+,:;=?@#|'<>.^*()%!{}\s-]{1,}))\s)?(?<category>[a-z/]{1,})\((?<scope>[a-z-]{1,})\)(?<breaking>!)?(?::)?\s(?<subject>(?:[a-z0-9-/]{1,}\s?){1,})$/gu;

/**
 * Parses the first line of a commit message.
 *
 * @param line - The first line of the commit message.
 * @returns The commit message object.
 * @example const match = messageRegex.exec('🐛 (core) Fix a bug');
 */
export function parseCommitLine(line: string): {
  match: boolean;
  githubEmoji?: string | undefined;
  emoji?: string | undefined;
  category?: string | undefined;
  scope?: string | undefined;
  breaking: boolean;
  subject?: string | undefined;
} {
  const match = new RegExp(commitLineRegex, 'gu').exec(line);
  if (!match) {
    return { match: false, breaking: false };
  }
  return {
    match: true,
    githubEmoji: match.groups?.['githubEmoji'],
    emoji: match.groups?.['emoji'],
    category: match.groups?.['category'],
    scope: match.groups?.['scope'],
    breaking: match.groups?.['breaking'] === '!',
    subject: match.groups?.['subject'],
  };
}
