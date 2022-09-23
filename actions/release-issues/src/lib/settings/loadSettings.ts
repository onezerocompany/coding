/**
 * @file Loading settings from a JSON file in the repository.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { readFileSync } from 'fs';
import { debug, getInput } from '@actions/core';
import { parse } from 'yaml';
import { Settings } from './Settings';
import type { SettingsJSON } from './Settings';

/**
 * Load settings from a JSON file in the repository.
 *
 * @returns The settings.
 * @example loadSettings();
 */
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
  debug(`Loaded settings: ${JSON.stringify(settings, null)}`);

  return new Settings(settings);
}
