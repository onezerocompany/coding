import { spawnSync } from 'child_process';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { cwd, env } from 'process';
import { BodyValidator } from '../message/validators/BodyValidator';

// eslint-disable-next-line max-lines-per-function
export function promptBody(previous?: string | null): BodyValidator {
  // create a temporary file with instructions
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

  // create a temporary file
  const tmpFilePath = resolve(cwd(), 'temp-body.txt');
  writeFileSync(
    tmpFilePath,
    (previous?.length ?? 0) > 0 ? previous ?? '' : instructions,
    {
      mode: 0o644,
    },
  );

  // open the editor
  spawnSync(env['EDITOR'] ?? 'vi', [tmpFilePath], {
    stdio: 'inherit',
  });

  // read the file
  let content = readFileSync(tmpFilePath, 'utf8');
  // put lines longer than 72 characters on a new line
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

  // remove the temporary file
  rmSync(tmpFilePath);

  return new BodyValidator(content);
}
