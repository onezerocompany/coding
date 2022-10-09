/**
 * @file Contains the definition of the globals object.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { getInput } from '@actions/core';
import { getOctokit } from '@actions/github';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { loadManifestFromProject } from '@onezerocompany/project-manager';
import type { Context } from './lib/context/Context';
import { loadContext } from './lib/context/loadContext';

/** Variables shared by the entire action. */
export interface Globals {
  /** Context object for the action. */
  context: Context;
  /** Settings object for the action. */
  projectManifest: ProjectManifest;
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
  const projectManifest = loadManifestFromProject();
  const context = await loadContext(projectManifest, graphql);
  const globals = { context, projectManifest, octokit, graphql };
  context.issue.setup(globals);
  await context.issue.update(globals);
  return globals;
}
