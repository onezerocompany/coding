import { readFileSync } from 'fs';
import { resolve } from 'path';
import { validateMessage } from '../../lib/message/validateMessage';
import type { ValidationError } from '../../lib/message/validators/ValidationError';

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
