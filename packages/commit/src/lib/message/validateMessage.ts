/**
 * @file Contains functions to validate commit messages.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { categoryForTag } from '../categories/categories';
import { shortcodeForEmoji } from '../categories/emoji/emoji';
import { ScopeValidator } from './validators/ScopeValidator';
import { SubjectValidator } from './validators/SubjectValidator';
import { parseMessage } from './parseMessage';
import {
  ValidationError,
  ValidationErrorLevel,
} from './validators/ValidationError';
import { BodyValidator } from './validators/BodyValidator';
import { AuthorsValidator } from './validators/AuthorsValidator';
import { parseCommitLine } from './CommitLineRegex';

/**
 * Validates an emoji in the first line of a commit message.
 *
 * @param message - The message to validate.
 * @returns The validation errors.
 * @example
 *   validateEmoji(':beetle: bug/fix(login) fix login');
 */
function validateEmoji(message: string): ValidationError[] {
  const [firstLine] = message.split('\n');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {
    emoji,
    githubEmoji,
    category: categoryTag,
  } = parseCommitLine(firstLine ?? '');

  if (typeof categoryTag !== 'string')
    return [
      new ValidationError({
        message: 'missing category',
        level: ValidationErrorLevel.fatal,
      }),
    ];

  const category = categoryForTag(categoryTag);
  if (typeof emoji === 'string') {
    const shortcode = shortcodeForEmoji(emoji);
    if (shortcode !== category.emoji) {
      return [
        new ValidationError({
          message: `invalid emoji for category ${category.tag}`,
          level: ValidationErrorLevel.fatal,
        }),
      ];
    }
  } else if (typeof githubEmoji === 'string') {
    if (category.emoji !== githubEmoji) {
      return [
        new ValidationError({
          message: `invalid emoji for category ${category.tag}`,
          level: ValidationErrorLevel.fatal,
        }),
      ];
    }
  }

  return [];
}

/**
 * Validates the category part of the first line in a commit message.
 *
 * @param message - The message to validate.
 * @returns The validation errors.
 * @example
 *   validateCategory(':beetle: bug/fix(login) fix login');
 */
function validateCategory(message: string): ValidationError[] {
  const [firstLine] = message.split('\n');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { category: categoryId } = parseCommitLine(firstLine!);
  const category = categoryForTag(categoryId);
  if (category.tag !== 'unknown') return [];
  return [
    new ValidationError({
      message: 'unknown category',
      level: ValidationErrorLevel.fatal,
    }),
  ];
}

const allowedFooterPrefixes = ['co-authored-by:', 'closes', 'signed-off-by:'];
/**
 * Validates the footer of a commit message.
 *
 * @param message - The message to validate.
 * @param bodyContent - The content of the body.
 * @returns The validation errors.
 * @example
 *   validateFooter(':beetle: bug/fix(login) fix login', 'fix login');
 */
function validateFooter(
  message: string,
  bodyContent: string,
): ValidationError[] {
  // Remove first line and remove bodyContent

  const footer = message
    .substring(message.indexOf('\n') + 1)
    .replace(bodyContent, '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n')
    .trim();
  // Return when no footer
  if (!footer || !message.includes('\n')) return [];
  // Check the lines of the footer
  for (const line of footer.split('\n')) {
    if (
      !allowedFooterPrefixes.some((prefix) =>
        line.toLowerCase().trim().startsWith(prefix),
      )
    ) {
      return [
        new ValidationError({
          message: `unrecognized prefix in footer line: ${line}`,
          level: ValidationErrorLevel.fatal,
        }),
      ];
    }
  }
  return [];
}

/**
 * Validates a commit message.
 *
 * @param message - The message to validate.
 * @returns The validation errors.
 * @example
 *   validateCommitMessage(':beetle: bug/fix(login) fix login');
 */
function findMessageErrors(message: string): {
  stoppedEarly: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];
  const parsed = parseMessage(message);

  if (!parsed.formatted) {
    errors.push(
      new ValidationError({
        message: 'message is formatted incorrectly',
        level: ValidationErrorLevel.fatal,
      }),
    );
    return { stoppedEarly: true, errors };
  }

  errors.push(...validateCategory(message));
  if (errors.length > 0) return { stoppedEarly: true, errors };
  errors.push(...validateEmoji(message));
  errors.push(...new ScopeValidator(parsed.scope).errors);
  errors.push(
    ...new SubjectValidator({ subject: parsed.subject, maxLength: 48 }).errors,
  );
  if (parsed.messageBody) {
    errors.push(...new BodyValidator(parsed.messageBody).errors);
  }
  for (const author of parsed.coAuthors) {
    errors.push(...new AuthorsValidator(author).errors);
  }
  errors.push(...validateFooter(message, parsed.messageBody));
  return {
    stoppedEarly: false,
    errors,
  };
}

/**
 * Validates a commit message.
 *
 * @param inputs - The inputs to validate.
 * @param inputs.message - The message to validate.
 * @returns The validation errors.
 * @example
 *   validateMessage(':beetle: bug/fix(login) fix login');
 */
export function validateMessage({ message }: { message: string }): {
  valid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];
  if (message) {
    if (message.toLowerCase().startsWith('merge')) {
      // Skipping validation for merge commits
      return { valid: true, errors };
    }

    const { stoppedEarly, errors: messageErrors } = findMessageErrors(message);
    errors.push(...messageErrors);
    if (stoppedEarly) return { valid: false, errors };
  } else {
    errors.push(
      new ValidationError({
        level: ValidationErrorLevel.fatal,
        message: 'no commit message provided',
      }),
    );
  }
  return { valid: errors.length === 0, errors };
}
