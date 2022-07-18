import { resolve } from 'path';
import { readFileSync } from 'fs';
import { debug, getInput } from '@actions/core';
import { parse } from 'yaml';
import { Settings } from './Settings';
import type { SettingsJSON } from './Settings';

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
  const settings = parse(content) as SettingsJSON;

  return new Settings(settings);
}
