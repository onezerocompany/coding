/**
 * @file Release environment class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { ChangelogSettings } from '@onezerocompany/project-manager';
import { EnvironmentType } from '@onezerocompany/project-manager';
import { isDefined } from '../utils/isDefined';
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
    issueCommentId,
  }: {
    id: string;
    type: EnvironmentType;
    needs: string[];
    githubName: string;
    deployed: boolean;
    changelog: ChangelogSettings;
    issueCommentId?: number | undefined;
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
      issueCommentId: json.issue_comment_id,
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
          )?.deployed === true,
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
