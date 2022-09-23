/**
 * @file Contains the tools for validating the commit message.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { validateMessage } from '../../lib/message/validateMessage';
import type { ValidationError } from '../../lib/message/validators/ValidationError';

/**
 * Tool for validating commit messages.
 *
 * @param options - The options for the tool.
 * @param options.message - The commit message to validate.
 * @param options.file - The file to read the commit message from.
 * @example
 *   validate({ message: 'feat: add a new feature' });
 */
export function tool(options: { message: string; file: string }): void {
  const errors: ValidationError[] = [];
  if (options.file) {
    const message = readFileSync(resolve(process.cwd(), options.file), 'utf8');
    errors.push(...validateMessage({ message }).errors);
  } else {
    errors.push(...validateMessage({ message: options.message }).errors);
  }

  if (errors.length === 0) {
    process.stdout.write('✅ Valid commit message\n');
  } else {
    for (const validationError of errors) {
      process.stdout.write(`${validationError.displayString}\n`);
    }
    process.exit(1);
  }
}
