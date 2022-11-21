/**
 * @file Functions for getting content between a beginning and ending tag.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand
 */

/**
 * Fetches a string between two tags in a string.
 *
 * @param before - The tag before the content.
 * @param after - The tag after the contents.
 * @param content - The string to search.
 * @returns The content between the tags.
 * @example
 *   const content = "This is an example. <!-- before -->Hello world!<!-- after -->";
 *   // Returns "Hello world!"
 *   const result = getContentBetweenTags("<!-- before -->", "<!-- after -->", content);
 */
export function getContentBetweenTags(
  before: string,
  after: string,
  content: string,
): string {
  const beforeIndex = content.indexOf(before);
  const afterIndex = content.indexOf(after);
  if (beforeIndex === -1 || afterIndex === -1) {
    return '';
  }
  return content.substring(beforeIndex + before.length, afterIndex);
}
