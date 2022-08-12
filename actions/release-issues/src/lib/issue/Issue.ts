import { parseMessage, VersionTrack } from '@onezerocompany/commit';
import type { VersionJSON } from '@onezerocompany/commit/dist/lib/versions/Version';
import { Version } from '@onezerocompany/commit/dist/lib/versions/Version';
import type { Globals } from '../../globals';
import type { Commit } from '../definitions/Commit';
import type { Item, ItemJSON } from '../items/Item';
import type { ItemType } from '../items/ItemType';
import { getSections } from './getSections';

export interface IssueJSON {
  number: number | undefined;
  title: string;
  version: VersionJSON;
  items: ItemJSON[];
  commitish: string;
  changelogs: { [key in VersionTrack]: string };
  commits: Array<{ sha: string; message: string }>;
}

export interface ItemSection {
  track: VersionTrack;
  title: string;
  items: Item[];
}

export class Issue {
  public number: number;
  public version: Version;
  public sections: ItemSection[];
  // sha of the commit that this issue is for
  public commitish: string;
  // dict of strings with VersionTrack as key
  public changelogs: { [key in VersionTrack]: string };
  // list of commits for this issue
  public commits: Commit[];

  private readonly preloadedItems: ItemJSON[] = [];

  public constructor(inputs?: {
    number?: number;
    version: Version;
    commitish: string;
    changelogs: { [key in VersionTrack]: string };
    commits: Commit[];
    items: ItemJSON[];
  }) {
    this.number = inputs?.number ?? -1;
    this.version = inputs?.version ?? new Version();
    this.sections = [];
    this.commitish = inputs?.commitish ?? '';
    this.changelogs = {
      [VersionTrack.alpha]: inputs?.changelogs[VersionTrack.alpha] ?? '',
      [VersionTrack.beta]: inputs?.changelogs[VersionTrack.beta] ?? '',
      [VersionTrack.live]: inputs?.changelogs[VersionTrack.live] ?? '',
    };
    this.commits = inputs?.commits ?? [];
    this.preloadedItems = inputs?.items ?? [];
  }

  public get title(): string {
    return `🚀 Release ${this.version.displayString()}`;
  }

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

    lines.push([
      '<!-- DO NOT EDIT BELOW THIS LINE -->',
      '<!-- JSON BEGIN',
      JSON.stringify(this.json),
      'JSON END -->',
      '### Details',
      `\`version: ${this.version.displayString()}\``,
    ]);

    return lines
      .map((line) => line.join('\n'))
      .join('\n\n---\n\n')
      .trim();
  }

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

  public itemForId(id: string): Item | null {
    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.id === id) return item;
      }
    }
    return null;
  }

  public itemForType(type: ItemType, track: VersionTrack): Item | null {
    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.type === type && item.metadata.track === track) return item;
      }
    }
    return null;
  }

  public setup(globals: Globals): void {
    this.sections = getSections(globals);
    // preload items
    for (const preloadItem of this.preloadedItems) {
      const item = this.itemForId(preloadItem.id);
      if (item) item.status = preloadItem.status;
    }
  }

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
