/**
 * @file Functions for generating a changelog.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { CommitCategory } from '@onezerocompany/commit';
import { ChangeLogType } from '@onezerocompany/commit';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { ReleaseTrack } from '@onezerocompany/project-manager';
import { randomItem } from '../../utils/randomItem';
import type { Commit } from '../definitions/Commit';

/** Changelog types that are included in the changelog for each track. */
const trackChangelogTypes: { [key in ReleaseTrack]: ChangeLogType[] } = {
  [ReleaseTrack.alpha]: [ChangeLogType.external, ChangeLogType.internal],
  [ReleaseTrack.beta]: [ChangeLogType.external],
  [ReleaseTrack.stable]: [ChangeLogType.external],
};

/**
 * Adds a commit to a changelog section.
 *
 * @param track - The track that the commit belongs to.
 * @param sections - A list of sections where the commit should be added to one of them.
 * @param commit - The commit to add.
 * @example
 * addCommitToSection(ReleaseTrack.alpha, [], {
 *   message: {
 *     subject: 'Test commit',
 *     body: '',
 *     footer: '',
 *   },
 *   type: ChangeLogType.internal,
 *   category: CommitCategory.build,
 * });
 */
function addCommitToSection(
  track: ReleaseTrack,
  sections: Array<{ category: CommitCategory; commits: Commit[] }>,
  commit: Commit,
): void {
  if (
    trackChangelogTypes[track].includes(commit.message.category.changelog.type)
  ) {
    // Check if sections has a section for this category

    const section = sections.find(
      (item) => item.category === commit.message.category,
    );
    if (section) {
      // Add commit to section
      section.commits.push(commit);
    } else {
      // Create new section
      sections.push({
        category: commit.message.category,
        commits: [commit],
      });
    }
  }
}

/**
 * Generate a changelog for a specific release track.
 *
 * @param projectManifest - The project manifest.
 * @param track - The track to generate the changelog for.
 * @param commits - A list of commits to include in the changelog.
 * @returns The changelog.
 * @example generateChangelog(settings, ReleaseTrack.alpha, [ ... ]);
 */
function changelogForTrack(
  projectManifest: ProjectManifest,
  track: ReleaseTrack,
  commits: Commit[],
): string {
  const sections: Array<{
    category: CommitCategory;
    commits: Commit[];
  }> = [];

  // Loop over all commit categories and find commits that match the category
  for (const commit of commits) {
    addCommitToSection(track, sections, commit);
  }

  // Convert sections to regular text
  let changelog = '';
  for (const section of sections) {
    changelog += `\n\n${section.category.changelog.title}`;
    for (const commit of section.commits) {
      changelog += `\n- ${commit.message.subject}`;
    }
  }

  const trackSettings = projectManifest.releaseTracks[track];
  if (changelog.trim() === '')
    changelog = trackSettings?.changelog.fallbackMessage ?? '';
  const header = randomItem(trackSettings?.changelog.headers ?? []);
  const footer = randomItem(trackSettings?.changelog.footers ?? []);
  return `${header}\n\n${changelog}\n\n${footer}`.trim();
}

/**
 * Generate all changelogs for a release.
 *
 * @param projectManifest - The project manifest.
 * @param commits - A list of commits to include in the changelog.
 * @returns A list of changelogs for each track.
 * @example generateChangelogs(settings, commits);
 */
export function generateChangelogs(
  projectManifest: ProjectManifest,
  commits: Commit[],
): Record<ReleaseTrack, string> {
  // Loop over all tracks and generate changelog
  return {
    [ReleaseTrack.alpha]: changelogForTrack(
      projectManifest,
      ReleaseTrack.alpha,
      commits,
    ),
    [ReleaseTrack.beta]: changelogForTrack(
      projectManifest,
      ReleaseTrack.beta,
      commits,
    ),
    [ReleaseTrack.stable]: changelogForTrack(
      projectManifest,
      ReleaseTrack.stable,
      commits,
    ),
  };
}
