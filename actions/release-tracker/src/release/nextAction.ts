/**
 * @file Contains the function to determine the next action to take for state release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { Context } from '../context/Context';
import { isDefined } from '../utils/isDefined';
import { ReleaseAction } from './ReleaseAction';
import type { ReleaseState } from './ReleaseState';

/**
 * Determines the next action to take for state release.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.context - The context.
 * @param parameters.state - The release state.
 * @returns The next action to take.
 * @example await determineAction();
 */
export function nextAction({
  context,
  state,
}: {
  context: Context;
  state: ReleaseState;
}): ReleaseAction {
  if (!isDefined(state.version)) return ReleaseAction.loadVersion;
  if (!isDefined(state.commits)) return ReleaseAction.loadCommits;
  if (!isDefined(state.releaseId)) return ReleaseAction.createRelease;
  if (state.needsFileAttach) return ReleaseAction.attachFile;
  if (!isDefined(state.issueTrackerNumber))
    return ReleaseAction.createTrackerIssue;
  if (state.needsCommentCreation) return ReleaseAction.createEnvironmentComment;
  if (!isDefined(state.trackerLabelId)) return ReleaseAction.attachTrackerLabel;
  if (state.needsAssign({ manifest: context.projectManifest }))
    return ReleaseAction.assignIssue;
  if (state.commentNeedsUpdate) return ReleaseAction.updateEnvironmentComment;
  if (state.needsDeploy) return ReleaseAction.deploy;
  // Update issue must be last, to not cause too many writes.
  if (
    context.currentIssueText !==
    state.issueText({ manifest: context.projectManifest })
  )
    return ReleaseAction.updateIssue;
  return ReleaseAction.none;
}
