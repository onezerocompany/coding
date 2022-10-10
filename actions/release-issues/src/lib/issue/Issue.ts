/**
 * @file Contains the definition of Issue objects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { parseMessage } from '@onezerocompany/commit';
import type { VersionJSON } from '@onezerocompany/commit/dist/lib/versions/Version';
import { Version } from '@onezerocompany/commit/dist/lib/versions/Version';
import { ReleaseTrack } from '@onezerocompany/project-manager';
import type { Globals } from '../../globals';
import type { Commit } from '../definitions/Commit';
import type { Item, ItemJSON } from '../items/Item';
import { ItemStatus } from '../items/ItemStatus';
import type { ItemType } from '../items/ItemType';
import { getSections } from './getSections';

/** JSON representation of an Issue. */
export interface IssueJSON {
  /** Number of the issue. */
  number: number | undefined;
  /** Title of the issue. */
  title: string;
  /** Version number associated with the issue. */
  version: VersionJSON;
  /** Items associated with the issue. */
  items: ItemJSON[];
  /** The SHA of the commit that created the issue. */
  commitish: string;
  /** Changelogs generated for the issue. */
  changelogs: { [key in ReleaseTrack]: string };
  /** List of commit objects associated with the issue. */
  commits: Array<{
    /** SHA of the commit. */
    sha: string;
    /** Message of the commit. */
    message: string;
  }>;
}

/** Section of items associated with a release track. */
export interface ItemSection {
  /** The track the section belongs to. */
  track: ReleaseTrack;
  /** Title of the section. */
  title: string;
  /** Items in the section. */
  items: Item[];
}

/** Definition of an Issue object. */
export class Issue {
  /** Number of the issue. */
  public number: number;

  /** Version number associated with the issue. */
  public version: Version;

  /** Sections of items associated with the issue. */
  public sections: ItemSection[];

  /** SHA of the commit that this was created from (the last commit). */
  public commitish: string;

  /** Generated changelogs for the issue. */
  public changelogs: { [key in ReleaseTrack]: string };

  /** List of commits that are in this issue. */
  public commits: Commit[];

  /** Items that were created in a previous run of this action. */
  private readonly preloadedItems: ItemJSON[] = [];

  /**
   * Creates a new Issue object.
   *
   * @param inputs - The inputs for the action.
   * @param inputs.number - The number of the issue.
   * @param inputs.version - The version number associated with the issue.
   * @param inputs.commitish - The SHA of the commit that created the issue.
   * @param inputs.changelogs - The changelogs generated for the issue.
   * @param inputs.commits - The list of commit objects associated with the issue.
   * @param inputs.items - The items associated with the issue.
   * @returns The new Issue object.
   * @example new Issue({ number: 1, version: '1.0.0', commitish: 'abc123' });
   */
  public constructor(inputs?: {
    number?: number;
    version: Version;
    commitish: string;
    changelogs: { [key in ReleaseTrack]: string };
    commits: Commit[];
    items: ItemJSON[];
  }) {
    this.number = inputs?.number ?? -1;
    this.version = inputs?.version ?? new Version();
    this.sections = [];
    this.commitish = inputs?.commitish ?? '';
    this.changelogs = {
      [ReleaseTrack.alpha]: inputs?.changelogs[ReleaseTrack.alpha] ?? '',
      [ReleaseTrack.beta]: inputs?.changelogs[ReleaseTrack.beta] ?? '',
      [ReleaseTrack.stable]: inputs?.changelogs[ReleaseTrack.stable] ?? '',
    };
    this.commits = inputs?.commits ?? [];
    this.preloadedItems = inputs?.items ?? [];
  }

  /**
   * Title for the issue.
   *
   * @returns The title of the issue.
   */
  public get title(): string {
    return `🚀 Release ${this.version.displayString()}`;
  }

  /**
   * Returns the content for the issue body.
   *
   * @returns The content for the issue body.
   */
  public get content(): string {
    const lines: string[][] = [];

    for (const section of this.sections) {
      lines.push([
        `### ${section.title}`,
        `<!-- changelog-start:${section.track} --> `,
        '```',
        this.changelogs[section.track],
        '```',
        `<!-- changelog-end:${section.track} -->`,
        ...section.items.map((item) => item.statusLine),
      ]);
    }

    let sections = lines.map((line) => line.join('\n')).join('\n\n---\n\n');

    return (sections += [
      '<!-- DO NOT EDIT BELOW THIS LINE -->',
      '<!-- JSON BEGIN',
      JSON.stringify(this.json),
      'JSON END -->',
    ].join('\n'));
  }

  /**
   * JSON representation of the issue.
   *
   * @returns The JSON representation of the issue.
   */
  public get json(): IssueJSON {
    return {
      number: this.number,
      title: this.title,
      version: this.version.json,
      items: this.sections.flatMap((section) =>
        section.items.map((item) => item.json),
      ),
      commitish: this.commitish,
      changelogs: this.changelogs,
      commits: this.commits.map((commit) => ({
        sha: commit.sha,
        message: commit.message.message,
      })),
    };
  }

  /**
   * Indicates whether all the items are either succeeded or skipped.
   *
   * @returns Whether all the items are done.
   */
  public get allItemsDone(): boolean {
    return this.sections.every((section) =>
      section.items.every(
        (item) =>
          item.status === ItemStatus.succeeded ||
          item.status === ItemStatus.skipped,
      ),
    );
  }

  /**
   * Recreate an issue from a JSON object.
   *
   * @param inputs - Input object for the issue creation.
   * @param inputs.number - Number of the issue.
   * @param inputs.json - JSON object to recreate the issue from.
   * @returns The recreated issue.
   * @example Issue.fromJSON({ number: 1, json: { ... } })
   */
  public static fromJson(inputs: { number: number; json: IssueJSON }): Issue {
    return new Issue({
      number: inputs.number,
      version: Version.fromJson(inputs.json.version),
      commitish: inputs.json.commitish,
      changelogs: inputs.json.changelogs,
      commits: inputs.json.commits.map((commit) => ({
        sha: commit.sha,
        message: parseMessage(commit.message),
      })),
      items: inputs.json.items,
    });
  }

  /**
   * Fetches an item based on it's identifier.
   *
   * @param id - The identifier of the item.
   * @returns The item if it exists, otherwise null.
   * @example const item = issue.getItem('s8d3j...');
   */
  public itemForId(id: string): Item | null {
    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.id === id) return item;
      }
    }
    return null;
  }

  /**
   * Fetches an item based on it's type and the release track it's on.
   *
   * @param type - The type of the item.
   * @param track - The release track the item is on.
   * @returns The item if it exists, otherwise null.
   * @example const item = issue.itemForType('changelog', 'alpha');
   */
  public itemForType(type: ItemType, track: ReleaseTrack): Item | null {
    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.type === type && item.metadata.track === track) return item;
      }
    }
    return null;
  }

  /**
   * Setup the issue for the release.
   *
   * @param globals - Global variables.
   * @example await issue.setup();
   */
  public setup(globals: Globals): void {
    this.sections = getSections(globals);
    // Preload items
    for (const preloadItem of this.preloadedItems) {
      const item = this.itemForId(preloadItem.id);
      if (item) item.status = preloadItem.status;
    }
  }

  /**
   * Update the items in the issue.
   *
   * @param globals - The global variables.
   * @example issue.updateItems(globals);
   */
  public async update(globals: Globals): Promise<void> {
    await Promise.all(
      this.sections.flatMap((section) =>
        section.items.map(async (item) => {
          await item.update(globals);
        }),
      ),
    );
  }
}
