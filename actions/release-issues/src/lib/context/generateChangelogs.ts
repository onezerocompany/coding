import type { CommitCategory } from '@onezerocompany/commit';
import { ChangeLogType, VersionTrack } from '@onezerocompany/commit';
import type { Commit } from '../definitions/Commit';
import type { Settings } from '../settings/Settings';

const trackChangelogTypes: { [key in VersionTrack]: ChangeLogType[] } = {
  [VersionTrack.alpha]: [ChangeLogType.external, ChangeLogType.internal],
  [VersionTrack.beta]: [ChangeLogType.external],
  [VersionTrack.live]: [ChangeLogType.external],
};

function addCommitToSection(
  track: VersionTrack,
  sections: Array<{ category: CommitCategory; commits: Commit[] }>,
  commit: Commit,
): void {
  if (
    trackChangelogTypes[track].includes(commit.message.category.changelog.type)
  ) {
    // check if sections has a section for this category
    const section = sections.find(
      (item) => item.category === commit.message.category,
    );
    if (section) {
      // add commit to section
      section.commits.push(commit);
    } else {
      // create new section
      sections.push({
        category: commit.message.category,
        commits: [commit],
      });
    }
  }
}

function changelogForTrack(
  settings: Settings,
  track: VersionTrack,
  commits: Commit[],
): string {
  const trackSettings = settings[track];

  const sections: Array<{
    category: CommitCategory;
    commits: Commit[];
  }> = [];

  // loop over all commit categories and find commits that match the category
  for (const commit of commits) {
    addCommitToSection(track, sections, commit);
  }

  // convert sections to regular text
  let changelog = '';
  for (const section of sections) {
    changelog += `\n\n${section.category.changelog.title}`;
    for (const commit of section.commits) {
      changelog += `\n- ${commit.message.subject}`;
    }
  }

  if (changelog.trim() === '') changelog = trackSettings.changelog.fallback;
  return `${trackSettings.changelog.header}\n\n${changelog}\n\n${trackSettings.changelog.footer}`.trim();
}

export function generateChangelogs(
  settings: Settings,
  commits: Commit[],
): {
  [key in VersionTrack]: string;
} {
  return {
    [VersionTrack.alpha]: changelogForTrack(
      settings,
      VersionTrack.alpha,
      commits,
    ),
    [VersionTrack.beta]: changelogForTrack(
      settings,
      VersionTrack.beta,
      commits,
    ),
    [VersionTrack.live]: changelogForTrack(
      settings,
      VersionTrack.live,
      commits,
    ),
  };
}
