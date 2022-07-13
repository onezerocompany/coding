import { debug, getInput } from '@actions/core';
import { Settings } from '../settings/Settings';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'yaml';

export function loadSettings(): Settings {
  const file = getInput('settings_file', {
    trimWhitespace: true,
    required: false,
  });
  const filePath = resolve(
    process.cwd(),
    file.length === 0 ? '.release-settings.yml' : file,
  );
  debug(`Loading settings from ${filePath}`);

  const content = readFileSync(filePath, 'utf8');
  const settings = parse(content);

  return new Settings(settings);
}
