/**
 * @file Contains an object definition of a repository.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Repository information. */
export interface RepoInfo {
  /** Name of the owner of the repository (e.g. 'onezerocompany'). */
  owner: string;
  /** Name of the repository itself (e.g. 'coding'). */
  repo: string;
  /** A unique id in the GitHub Graph representing the repo. */
  id: string;
  /** A unique id for the 'release-issue' label in the GitHub Graph. */
  trackerLabelId: string;
}
