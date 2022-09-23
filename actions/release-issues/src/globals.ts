/**
 * @file Contains the definition of the globals object.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { getInput } from '@actions/core';
import { getOctokit } from '@actions/github';
import type { Context } from './lib/context/Context';
import { loadContext } from './lib/context/loadContext';
import { loadSettings } from './lib/settings/loadSettings';
import type { Settings } from './lib/settings/Settings';

/** Variables shared by the entire action. */
export interface Globals {
  /** Context object for the action. */
  context: Context;
  /** Settings object for the action. */
  settings: Settings;
  /** Octokit instance for the action. */
  octokit: ReturnType<typeof getOctokit>;
  /** GraphQL instance for the action. */
  graphql: ReturnType<typeof getOctokit>['graphql'];
}

/**
 * Loads the globals object for the action.
 *
 * @returns Globals object for the action.
 * @example const globals = await loadGlobals();
 */
export async function getGlobals(): Promise<Globals> {
  const octokit = getOctokit(getInput('token'));
  const { graphql } = octokit;
  const settings = loadSettings();
  const context = await loadContext(settings, graphql);
  const globals = { context, settings, octokit, graphql };
  context.issue.setup(globals);
  await context.issue.update(globals);
  return globals;
}
