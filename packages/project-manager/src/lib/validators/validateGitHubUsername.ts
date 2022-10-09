/**
 * @file Contains a validator for GitHub usernames.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/**
 * Validates a GitHub username.
 *
 * It checks for the following:
 * - Makes sure the username is not empty and does not contain any spaces.
 * - The username must have a length of at least 1 character and a maximum of 39 characters.
 * - The username can only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
 *
 * @param username - The GitHub username to validate.
 * @returns `true` if the username is valid, `false` otherwise.
 * @example const valid = validateGitHubUsername('lucasilverentand'); // true
 */
export function validateGitHubUsername(username: string): boolean {
  return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/iu.test(username);
}
