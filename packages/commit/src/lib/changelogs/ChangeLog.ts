/**
 * @file Defines a changelog.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { categories, ChangelogDomain } from '../categories/categories';
import type { Commit } from '../commits/Commit';
import type { CommitCategory } from '../categories/categories';
import { projectManifest } from '../global';

/**
 * Generates a list of categories based on a list of commits.
 *
 * @param commits - The commits to generate the categories from.
 * @returns The list of categories.
 * @example const categories = categoriesInCommitsList(commits);
 */
function categoriesInCommitsList(commits: Commit[]): CommitCategory[] {
  return commits
    .reduce((categoriesList, commit) => {
      const { category } = commit.message;
      if (!categoriesList.includes(category) && category.tag !== 'unknown') {
        categoriesList.push(category);
      }
      return categoriesList;
    }, Array<CommitCategory>())
    .sort(
      // Sort them by order in the categories list
      (lhs, rhs) => categories.indexOf(lhs) - categories.indexOf(rhs),
    );
}

/**
 * Creates a list item from a `CommitMessage`.
 *
 * @param parameters - The parameters to create the list item from.
 * @param parameters.commit - The commit to create the list item from.
 * @param parameters.markdown - Whether to use markdown.
 * @param parameters.domain - The domain of the changelog.
 * @returns The list item.
 * @example const item = listItemFromCommitMessage(message);
 */
function itemFromCommit({
  commit,
  domain,
  markdown,
}: {
  commit: Commit;
  domain: ChangelogDomain;
  markdown: boolean;
}): string {
  const { scope, subject } = commit.message;
  if (markdown) {
    if (
      domain === ChangelogDomain.internal &&
      projectManifest.release.commit_url.includes('{{commit}}')
    ) {
      const link = projectManifest.release.commit_url.replace(
        '{{commit}}',
        commit.hash,
      );
      return `- [${subject}](${link}) (${scope})\n`;
    }
    return `- ${subject}\n`;
  }
  if (domain === ChangelogDomain.internal) {
    return `- ${subject} (${scope})\n`;
  }
  return ` - ${subject}\n`;
}

/** Defines a changelog.  */
export class ChangeLog {
  /** Type of changelog. */
  public domain: ChangelogDomain;
  /** List of commits in this changelog. */
  public commits: Commit[];
  /** Whether the changelog should be output in markdown. */
  public markdown: boolean;
  /** Header message displayed above the message. */
  public header: string | undefined;
  /** Footer message displayed under the message. */
  public footer: string | undefined;

  /**
   * Creates a new changelog.
   *
   * @param parameters - The changelog parameters.
   * @param parameters.domain - The changelog type.
   * @param parameters.markdown - Whether the changelog should be in markdown format.
   * @param parameters.commits - The commits to include in the changelog.
   * @param parameters.header - The header to include in the changelog.
   * @param parameters.footer - The footer to include in the changelog.
   * @example new Changelog(ChangeLogType.internal, commits, true, 'header', 'footer');
   */
  public constructor({
    domain,
    markdown,
    commits,
    header,
    footer,
  }: {
    domain: ChangelogDomain;
    markdown?: boolean;
    commits: Commit[];
    header?: string | undefined;
    footer?: string | undefined;
  }) {
    this.domain = domain;
    this.commits = commits;
    this.header = header;
    this.footer = footer;
    this.markdown = markdown ?? false;
  }

  /**
   * Returns a text representation of the changelog.
   *
   * @returns The text representation of the changelog.
   */
  public get text(): string {
    let content = '';

    if (typeof this.header === 'string') content += this.header;

    const allowedTypes =
      this.domain === ChangelogDomain.internal
        ? [ChangelogDomain.internal, ChangelogDomain.external]
        : [ChangelogDomain.external];

    const filteredCommits = this.commits.filter((commit) =>
      allowedTypes.includes(commit.message.category.changelog.type),
    );
    const usedCategories = categoriesInCommitsList(filteredCommits);

    if (usedCategories.length > 0) {
      for (const category of usedCategories) {
        if (this.markdown) content += `#### ${category.changelog.title}\n`;
        else content += `${category.changelog.title}:\n`;

        for (const commit of this.commits.filter(
          (item) => item.message.category === category,
        )) {
          content += itemFromCommit({
            commit,
            ...this,
          });
        }
        content += '\n';
      }
    } else {
      content += projectManifest.release.changelog_fallback;
    }

    if (typeof this.footer === 'string') content += this.footer;

    return content.trim();
  }
}
