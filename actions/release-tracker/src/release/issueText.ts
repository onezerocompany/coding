/**
 * @file Contains a function to generate issue text.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ChangeLog, ChangelogDomain } from '@onezerocompany/commit';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import type { ReleaseState } from './ReleaseState';

/**
 * Generates a textual representation of a Release State.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.state - The release state.
 * @param parameters.manifest - The manifest of the project.
 * @returns The textual representation of the release state.
 * @example const text = issueText({ state });
 */
export function issueText({
  state,
  manifest,
}: {
  state: ReleaseState;
  manifest: ProjectManifest;
}): string {
  let content = '## Release Details\n\n';
  content +=
    '###### Edit the changelogs in the comments below and tick the checkboxes to release to each individual environment.\n\n';

  content += `${
    new ChangeLog({
      domain: ChangelogDomain.internal,
      commits: state.commits ?? [],
      markdown: true,
    }).text
  }\n\n`;

  const version = state.version?.displayString ?? '0.0.1';
  content += `Created from release: [${version}](${manifest.release.release_url.replace(
    '{{release}}',
    version,
  )})\n\n`;

  // Convert json to base64
  const json = JSON.stringify(state.json);
  const base64 = Buffer.from(json).toString('base64');

  content += `<!-- JSON BEGIN${base64}JSON END -->`;

  return content;
}
