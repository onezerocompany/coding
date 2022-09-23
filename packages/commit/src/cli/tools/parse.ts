/**
 * @file Contains the tool for parsing the commit message.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { stringify as stringifyYaml } from 'yaml';
import { findGitRoot } from '../../lib/utils/git';
import { parseMessage } from '../../lib/message/parseMessage';
import { CommitMessage } from '../../lib/message/CommitMessage';

/**
 * Tool for parsing commit messages.
 *
 * @param options - The options for the tool.
 * @param options.message - The commit message to parse.
 * @param options.file - The file to read the commit message from.
 * @param options.commit - The commit to parse.
 * @param options.json - Whether to output the result as JSON.
 * @param options.yaml - Whether to output the result as YAML.
 * @example
 *   parse({ message: 'feat: add a new feature' });
 */
export function tool(options: {
  message: string;
  file: string;
  commit: string;
  json: boolean;
  yaml: boolean;
}): void {
  let parsed = new CommitMessage();
  if (options.commit) {
    const message = execSync('git log --format=%B -n 1', {
      cwd: findGitRoot(),
    });
    parsed = parseMessage(message.toString());
  } else if (options.file) {
    const content = readFileSync(resolve(process.cwd(), options.file), 'utf8');
    parsed = parseMessage(content);
  } else if (options.message) {
    parsed = parseMessage(options.message);
  } else {
    process.stdout.write('please provide a message, file or commit to parse\n');
  }

  if (options.yaml) {
    process.stdout.write(`${stringifyYaml(parsed)}\n`);
  } else {
    const indent = 2;
    process.stdout.write(`${JSON.stringify(parsed, null, indent)}\n`);
  }
}
