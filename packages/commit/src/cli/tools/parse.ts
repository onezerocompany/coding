import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { stringify as stringifyYaml } from 'yaml';
import { findGitRoot } from '../../lib/utils/git';
import { parseMessage } from '../../lib/message/parseMessage';
import { CommitMessage } from '../../lib/message/CommitMessage';

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
