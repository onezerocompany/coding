import { getInput } from '@actions/core';
import { getOctokit } from '@actions/github';
import type { Context } from './lib/context/Context';
import { loadContext } from './lib/context/loadContext';
import { loadSettings } from './lib/settings/loadSettings';
import type { Settings } from './lib/settings/Settings';

export const jsonIndent = 2;

export interface Globals {
  context: Context;
  settings: Settings;
  octokit: ReturnType<typeof getOctokit>;
  graphql: ReturnType<typeof getOctokit>['graphql'];
}

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
