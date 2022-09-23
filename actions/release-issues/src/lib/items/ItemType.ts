/**
 * @file Contains types of items that can be used in the release action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Types of items there are. */
export enum ItemType {
  /** Changelog approval, whether the changelog is ready to be released. */
  changelogApproved = 'changelogApproved',
  /** Release clearance, whether the release is ready to be created. */
  releaseClearance = 'releaseClearance',
  /** Release creation, whether the release has been created. */
  releaseCreation = 'releaseCreation',
}
