/**
 * @file Loading settings from a JSON file in the repository.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { debug, getInput } from '@actions/core';
import { parse } from 'yaml';
import { Settings } from './Settings';
import type { SettingsJSON } from './Settings';

/**
 * Function that gets the path to the settings file.
 *
 * @returns The path to the settings file.
 * @throws If the file does not exist.
 * @example
 *   const filePath = getSettingsFilePath();
 */
function getSettingsPath(): string {
  const file = getInput('settings_file', {
    trimWhitespace: true,
    required: false,
  });

  let filePath = resolve(
    process.cwd(),
    file.length === 0 ? '.release-settings.yml' : file,
  );
  // If the file does not exist, try the other extension.
  if (!existsSync(filePath)) {
    if (filePath.endsWith('.yml')) {
      filePath = filePath.replace('.yml', '.yaml');
    } else {
      filePath = filePath.replace('.yaml', '.yml');
    }
  }

  // In case the file does not exist, throw an error.
  if (!existsSync(filePath)) {
    throw new Error(`The settings file "${filePath}" does not exist.`);
  }

  return filePath;
}

/**
 * Load settings from a JSON file in the repository.
 *
 * @returns The settings.
 * @example loadSettings();
 */
export function loadSettings(): Settings {
  try {
    const filePath = getSettingsPath();
    debug(`Loading settings from ${filePath}`);

    const content = readFileSync(filePath, 'utf8');
    const settings = parse(content) as SettingsJSON;
    debug(`Loaded settings: ${JSON.stringify(settings, null)}`);

    return new Settings(settings);
  } catch {
    debug('No settings file found. Using default settings.');
    return new Settings();
  }
}
