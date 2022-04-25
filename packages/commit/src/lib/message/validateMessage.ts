import { categoryForTag } from '../categories/categories';
import { ScopeValidator } from './validators/ScopeValidator';
import { SubjectValidator } from './validators/SubjectValidator';
import { parseMessage, firstLineRegex } from './parseMessage';
import {
  ValidationError,
  ValidationErrorLevel,
} from './validators/ValidationError';
import { BodyValidator } from './validators/BodyValidator';
import { AuthorsValidator } from './validators/AuthorsValidator';

function validateEmoji(message: string): ValidationError[] {
  const [firstLine] = message.split('\n');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = firstLineRegex.exec(firstLine!);
  const emoji = match?.groups?.['emoji'];
  const category = categoryForTag(match?.groups?.['category']);
  if (category.emoji === emoji) return [];

  return [
    new ValidationError({
      message: 'incorrect emoji for used category',
      level: ValidationErrorLevel.fatal,
    }),
  ];
}

function validateCategory(message: string): ValidationError[] {
  const [firstLine] = message.split('\n');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = firstLineRegex.exec(firstLine!);
  const category = categoryForTag(match?.groups?.['category']);
  if (category.tag !== 'unknown') return [];
  return [
    new ValidationError({
      message: 'unknown category',
      level: ValidationErrorLevel.fatal,
    }),
  ];
}

const allowedFooterPrefixes = ['co-authored-by:', 'closes', 'signed-off-by:'];
function validateFooter(
  message: string,
  bodyContent: string,
): ValidationError[] {
  // remove first line and remove bodyContent
  const footer = message
    .substring(message.indexOf('\n') + 1)
    .replace(bodyContent, '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n')
    .trim();
  // return when no footer
  if (!footer || !message.includes('\n')) return [];
  // check the lines of the footer
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

// eslint-disable-next-line max-lines-per-function
export function validateMessage(inputs: { message: string }): {
  valid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];
  if (inputs.message) {
    if (inputs.message.toLowerCase().startsWith('merge')) {
      // skipping validation for merge commits
      return { valid: true, errors };
    }
    const parsed = parseMessage(inputs.message);
    errors.push(...validateCategory(inputs.message));
    if (errors.length > 0) return { valid: false, errors };
    errors.push(...validateEmoji(inputs.message));
    errors.push(...new ScopeValidator(parsed.scope).errors);
    errors.push(...new SubjectValidator(parsed.subject).errors);
    if (parsed.messageBody) {
      errors.push(...new BodyValidator(parsed.messageBody).errors);
    }
    for (const author of parsed.coAuthors) {
      errors.push(...new AuthorsValidator(author).errors);
    }
    errors.push(...validateFooter(inputs.message, parsed.messageBody));
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
