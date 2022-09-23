/**
 * @file Contains functions to parse a commit message.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { categoryForTag } from '../categories/categories';
import { CommitMessage } from './CommitMessage';

const issueTags = ['close', 'closes', 'closed', 'fixes', 'fixed'];

const firstLineRegex =
  /^(?<emoji>:.*:)\s*(?<category>.*?)(?:\((?<scope>.*?)\))?(?<breaking>!)?:\s*(?<subject>.*)$/u;

/**
 * Reads the first line of the commit message.
 *
 * @param line - The first line of the commit message.
 * @param commitMessage - The commit message object.
 * @example
 *   readFirstLine(':bug: (core) Fix a bug', commitMessage);
 */
function readFirstLine(line: string, commitMessage: CommitMessage): void {
  const match = firstLineRegex.exec(line);
  commitMessage.category = categoryForTag(match?.groups?.['category'] ?? '');
  commitMessage.scope = match?.groups?.['scope'] ?? '';
  commitMessage.subject = match?.groups?.['subject'] ?? '';
  commitMessage.breaking = match?.groups?.['breaking'] === '!';
}

/**
 * Extracts the issue number from a line.
 *
 * @param line - The line to extract the issue number from.
 * @param commitMessage - The commit message object.
 * @example
 *   const issueNumber = extractIssueNumber('Fixes #123', commitMessage);
 */
function extractIssueNumber(line: string, commitMessage: CommitMessage): void {
  const issue = line.substring(line.indexOf('#') + 1).trim();
  if (issue.length > 0) {
    commitMessage.issues.push(parseInt(issue, 10));
  }
}

/**
 * Parses a string into a commit message object.
 *
 * @param message - The commit message.
 * @returns The commit message object.
 * @example
 *   const commitMessage = parseMessage('Fixes #123');
 */
function parseMessage(message: string): CommitMessage {
  const commitMessage = new CommitMessage();
  let reachedFooter = false;
  for (const [index, line] of message.split('\n').entries()) {
    if (index === 0) {
      readFirstLine(line, commitMessage);
    } else if (line.toLowerCase().startsWith('co-authored-by')) {
      commitMessage.coAuthors.push(
        line.substring('co-authored-by:'.length).trim(),
      );
      reachedFooter = true;
    } else if (line.toLowerCase().startsWith('signed-off-by')) {
      commitMessage.signedOff = line.substring('signed-off-by:'.length).trim();
      reachedFooter = true;
    } else if (issueTags.some((tag) => line.toLowerCase().startsWith(tag))) {
      extractIssueNumber(line, commitMessage);
      reachedFooter = true;
    } else if (!reachedFooter) {
      commitMessage.messageBody =
        `${commitMessage.messageBody}\n${line}`.trim();
    }
  }

  return commitMessage;
}

export { firstLineRegex, parseMessage };
