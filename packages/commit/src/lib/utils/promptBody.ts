/**
 * @file Contains the body editor utility.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { spawnSync } from 'child_process';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { cwd, env } from 'process';
import { BodyValidator } from '../message/validators/BodyValidator';

/**
 * Read the body file and return the content.
 *
 * @param tmpFilePath - The path to the temporary file.
 * @returns The content of the file.
 * @example readBodyFile('temp-body.txt')
 */
function readBodyFile(tmpFilePath: string): string {
  let content = readFileSync(tmpFilePath, 'utf8');
  // Put lines longer than 72 characters on a new line
  const maxCharsPerLine = 72;

  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .flatMap((line) =>
      line.split(' ').reduce<string[]>((acc, word) => {
        if (acc.length === 0) return [word];

        const lastLine = acc[acc.length - 1] ?? '';
        if (lastLine.length + word.length >= maxCharsPerLine) {
          acc.push(word);
        } else {
          acc[acc.length - 1] = `${lastLine} ${word}`;
        }
        return acc;
      }, []),
    );

  content = lines.join('\n');
  return content;
}

const instructions = `
  # Please enter the commit body below.
  # Lines starting with '#' will be ignored
  # empty lines around the message will be trimmed
  # whitespaces around lines will also be removed
  # make sure you start the message with a capital letter
  # and end with a period, question mark or exclamation mark
  # --------------------------------------------------
  # save this file and close the editor to return
`
  .split('\n')
  .map((line) => line.trim())
  .join('\n')
  .trim();

/**
 * Create a commit body file in the git root directory.
 *
 * @param previous - The previous body (if any).
 * @returns The path to the temporary file.
 * @example createBodyFile('This is the previous body.')
 */
export function promptBody(previous?: string | null): BodyValidator {
  // Create a temporary file with instructions

  // Create a temporary file

  const tmpFilePath = resolve(cwd(), '.commit-body.tmp');
  writeFileSync(
    tmpFilePath,
    (previous?.length ?? 0) > 0 ? previous ?? '' : instructions,
    {
      mode: 0o644,
    },
  );

  /*
   * In case the `code` command is available, use it to open the file
   * use which to check if the command is available
   */
  if (spawnSync('which', ['code']).status === 0) {
    spawnSync('code', ['-w', tmpFilePath], { stdio: 'ignore' });
  } else {
    spawnSync(env['EDITOR'] ?? 'vi', [tmpFilePath], {
      stdio: 'inherit',
    });
  }

  // Read the file
  const content = readBodyFile(tmpFilePath);

  // Remove the temporary file
  rmSync(tmpFilePath);

  return new BodyValidator(content);
}
