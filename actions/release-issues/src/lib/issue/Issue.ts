import type { VersionJSON } from '@onezerocompany/commit/dist/lib/versions/Version';
import { Version } from '@onezerocompany/commit/dist/lib/versions/Version';
import type { Globals } from '../../globals';
import type { Item, ItemJSON } from '../items/Item';
import { getSections } from './getSections';

export interface IssueJSON {
  number: number | undefined;
  title: string;
  version: VersionJSON;
  items: ItemJSON[];
}

export interface ItemSection {
  title: string;
  items: Item[];
}

export class Issue {
  public number: number;
  public version: Version;
  public sections: ItemSection[];

  public constructor(inputs?: { number?: number; version: Version }) {
    this.number = inputs?.number ?? -1;
    this.version = inputs?.version ?? new Version();
    this.sections = [];
  }

  public get title(): string {
    return `🚀 Release ${this.version.displayString}`;
  }

  public get content(): string {
    const lines: string[][] = [];
    lines.push([
      '<!-- JSON BEGIN',
      JSON.stringify(this.json),
      'JSON END -->',
      '### Details',
      `\`version: ${this.version.displayString}\``,
    ]);

    for (const section of this.sections) {
      lines.push([
        `### ${section.title}`,
        ...section.items.map((item) => item.statusLine),
      ]);
    }

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
    };
  }

  public static fromJson(inputs: { number: number; json: IssueJSON }): Issue {
    return new Issue({
      number: inputs.number,
      version: Version.fromJson(inputs.json.version),
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

  public setup(globals: Globals): void {
    this.sections = getSections(globals);
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
