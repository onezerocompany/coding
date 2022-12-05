/**
 * @file Release environment class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ChangeLog } from '@onezerocompany/commit';
import type { ChangelogSettings } from '@onezerocompany/project-manager';
import { EnvironmentType } from '@onezerocompany/project-manager';
import { isDefined } from '../utils/isDefined';
import { randomItem } from '../utils/randomItem';
import { environmentChangelogs } from './environmentChangelogs';
import { environmentCommentText } from './environmentCommentText';
import type { ReleaseState } from './ReleaseState';

/** Json definition of release environment. */
export interface ReleaseEnvironmentJson {
  /** Environment Id. */
  id: string;
  /** Needs other environments. */
  needs: string[];
  /** Name of the environment on GitHub. */
  github_name: string;
  /** Whether the environment should be deployed. */
  deployed: boolean;
  /** Environment type. */
  type: string;
  /** Issue comment id. */
  issue_comment_id?: number | undefined;
  /** Changelog related settings. */
  changelog: ChangelogSettings;
  /** Text of the changelog. */
  changelog_text: string;
  /** Content of the comment. */
  comment_content: string;
}

/** Release environment. */
export class ReleaseEnvironment {
  /** Environment Id. */
  public id: string;
  /** Needs other environments. */
  public needs: string[];
  /** Name of the environment on GitHub. */
  public githubName: string;
  /** Whether the environment should be deployed. */
  public deployed: boolean;
  /** Environment type. */
  public type: EnvironmentType;
  /** Issue comment id. */
  public issueCommentId?: number;
  /** Changelog related settings. */
  public changelog: ChangelogSettings;
  /** Edited changelog text. */
  public changelogText: string;
  /** Content of the comment. */
  public commentContent: string;

  /**
   * Creates a new release environment.
   *
   * @param parameters - Release environment parameters.
   * @param parameters.id - Environment Id.
   * @param parameters.type - Environment type.
   * @param parameters.needs - Needs other environments.
   * @param parameters.deployed - Whether the environment should be deployed.
   * @param parameters.githubName - Name of the environment on GitHub.
   * @param parameters.changelog - Changelog related settings.
   * @param parameters.issueCommentId - Issue comment id.
   * @param parameters.changelogText - Edited changelog text.
   * @param parameters.commentContent - Content of the comment.
   * @returns New release environment.
   * @example const releaseEnvironment = new ReleaseEnvironment({ id: 'staging' });
   */
  public constructor({
    id,
    type,
    needs,
    githubName,
    deployed,
    changelog,
    changelogText,
    issueCommentId,
    commentContent,
  }: {
    id: string;
    type: EnvironmentType;
    needs: string[];
    githubName: string;
    deployed: boolean;
    changelog: ChangelogSettings;
    changelogText?: string;
    issueCommentId?: number | undefined;
    commentContent: string;
  }) {
    this.id = id;
    this.type = type;
    this.needs = needs;
    this.githubName = githubName;
    this.deployed = deployed;
    this.changelog = changelog;
    if (isDefined(issueCommentId)) {
      this.issueCommentId = issueCommentId;
    }
    this.changelogText = changelogText ?? '';
    this.commentContent = commentContent;
  }

  /**
   * Outputs the json string for this.
   *
   * @returns JSON object.
   */
  public get json(): ReleaseEnvironmentJson {
    return {
      id: this.id,
      needs: this.needs,
      github_name: this.githubName,
      deployed: this.deployed,
      type: this.type as string,
      issue_comment_id: this.issueCommentId,
      changelog: this.changelog,
      changelog_text: this.changelogText,
      comment_content: this.commentContent,
    };
  }

  /**
   * Convert a json object to a release environment.
   *
   * @param parameters - Convert a json object to a release environment parameters.
   * @param parameters.json - JSON object.
   * @returns Release environment.
   * @example const releaseEnvironment = ReleaseEnvironment.fromJson({ json });
   */
  public static fromJson({
    json,
  }: {
    json: ReleaseEnvironmentJson;
  }): ReleaseEnvironment {
    return new ReleaseEnvironment({
      id: json.id,
      type: json.type as EnvironmentType,
      needs: json.needs,
      githubName: json.github_name,
      deployed: json.deployed,
      changelog: json.changelog,
      changelogText: json.changelog_text,
      issueCommentId: json.issue_comment_id,
      commentContent: json.comment_content,
    });
  }

  /**
   * Generated changelog text for this environment.
   *
   * @param parameters - Parameters for generating changelog text.
   * @param parameters.state - State.
   * @returns Changelog text.
   * @example releaseEnvironment.changelogText({ releaseState, release, state });
   */
  public originalChangelogText({ state }: { state: ReleaseState }): string {
    const { domain } = environmentChangelogs[this.type];
    return new ChangeLog({
      commits: state.commits ?? [],
      domain,
      header: randomItem(this.changelog.headers),
      footer: randomItem(this.changelog.footers),
      markdown: false,
    }).text;
  }

  /**
   * Text used for creating the comment.
   *
   * @param parameters - Parameters.
   * @param parameters.state - Release state.
   * @returns Comment text.
   * @example const text = releaseEnvironment.commentText({ state });
   */
  public commentText({ state }: { state: ReleaseState }): string {
    return environmentCommentText({
      environment: this,
      state,
    });
  }

  /**
   * Waiting for other environments.
   *
   * @param parameters - Waiting for other environments parameters.
   * @param parameters.state - Release state.
   * @returns Whether the environment is waiting for other environments.
   * @example const waiting = releaseEnvironment.waiting({ state });
   */
  public waiting({ state }: { state: ReleaseState }): boolean {
    return this.needs
      .map(
        (environmentId) =>
          state.environments.find(
            (environment) => environment.id === environmentId,
          )?.deployed !== true,
      )
      .some((waiting) => waiting);
  }
}

/**
 * Converts an array of unknown objects to a ReleaseEnvironment array.
 *
 * @param environments - The array of unknown objects to convert.
 * @returns The ReleaseEnvironment array.
 * @example const environments = parseReleaseEnvironmentsArray(environments);
 */
export function parseReleaseEnvironmentsArray(
  environments: Array<Record<string, unknown>>,
): ReleaseEnvironment[] {
  return environments.map(
    (environment) =>
      new ReleaseEnvironment({
        id: typeof environment['id'] === 'string' ? environment['id'] : '',
        type:
          typeof environment['type'] === 'string'
            ? (environment['type'] as EnvironmentType)
            : EnvironmentType.firebaseHosting,
        needs:
          Array.isArray(environment['needs']) &&
          environment['needs'].every((need) => typeof need === 'string')
            ? (environment['needs'] as string[])
            : [],
        githubName:
          typeof environment['github_name'] === 'string'
            ? environment['github_name']
            : '',
        deployed:
          typeof environment['deployed'] === 'boolean'
            ? environment['deployed']
            : false,
        commentContent:
          typeof environment['comment_content'] === 'string'
            ? environment['comment_content']
            : '',
        changelog: {
          generate: environment['changelog'] === true,
          headers:
            Array.isArray(environment['changelog']) &&
            environment['changelog'].every(
              (header) => typeof header === 'string',
            )
              ? (environment['changelog'] as string[])
              : [],
          footers:
            Array.isArray(environment['changelog']) &&
            environment['changelog'].every(
              (footer) => typeof footer === 'string',
            )
              ? (environment['changelog'] as string[])
              : [],
        },
      }),
  );
}
