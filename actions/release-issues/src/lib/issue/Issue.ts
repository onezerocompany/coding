import type { VersionJSON } from '@onezerocompany/commit/dist/lib/versions/Version';
import { Version } from '@onezerocompany/commit/dist/lib/versions/Version';
import type { Globals } from '../../globals';
import type { Item } from '../items/Item';
import type { Comment } from './Comment';
import { getSections } from './getSections';

export interface IssueJSON {
  number: number | undefined;
  title: string;
  version: VersionJSON;
}

export interface ItemSection {
  title: string;
  items: Item[];
}

export class Issue {
  public number?: number;
  public version: Version;
  public comments: Comment[];
  public sections: ItemSection[];

  public constructor(inputs?: { comments: Comment[]; version: Version }) {
    this.version = inputs?.version ?? new Version();
    this.comments = inputs?.comments ?? [];
    this.sections = [];
  }

  public get title(): string {
    return `🚀 Release ${this.version.displayString}`;
  }

  public get content(): string {
    const lines: string[][] = [];
    lines.push(['<!-- JSON BEGIN', JSON.stringify(this.json), 'JSON END -->']);
    lines.push([
      '### Details',
      `\`version: ${this.version.displayString}\``,
      '---',
    ]);

    for (const section of this.sections) {
      lines.push([
        `### ${section.title}`,
        ...section.items.map((item) => item.statusLine),
        '---',
      ]);
    }

    return lines
      .map((line) => line.join('\n'))
      .join('\n\n')
      .trim();
  }

  public get json(): IssueJSON {
    return {
      number: this.number,
      title: this.title,
      version: this.version.json,
    };
  }

  public static fromJson(json: IssueJSON): Issue {
    return new Issue({
      comments: [],
      version: Version.fromJson(json.version),
    });
  }

  public setup(globals: Globals): void {
    // this.sections = await getSections(globals);
    this.sections = getSections(globals);
  }

  public async update(globals: Globals): Promise<void> {
    // loop over all items
    const updates = [];
    for (const section of this.sections) {
      for (const item of section.items) {
        updates.push(item.update(globals));
      }
    }
    await Promise.all(updates);
  }
}
