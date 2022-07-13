import { Version } from '@onezerocompany/commit';
import type { VersionJSON } from '@onezerocompany/commit/dist/lib/versions/Version';
import { context } from '../context/Context';
import type { Item } from '../items/Item';
import type { Comment } from './Comment';
import { sectionsForSettings } from './sections';

export interface IssueJSON {
  number: number;
  title: string;
  body: string;
  version: VersionJSON;
}

export interface ItemSection {
  title: string;
  items: Item[];
}

export class Issue {
  number?: number;
  version: Version;
  comments: Comment[];
  sections: ItemSection[];

  get title() {
    return `🚀 ${this.version.displayString} [Release Tracker]`;
  }
  get body() {
    let lines: string[][] = [];
    lines.push([
      '<!-- JSON BEGIN',
      JSON.stringify(this.toJson()),
      'JSON END -->',
    ]);
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

  public toJson() {
    return JSON.stringify({
      version: this.version.toJson(),
    });
  }

  public static fromJson(json: IssueJSON) {
    return new Issue({
      comments: [],
      version: Version.fromJson(json.version),
    });
  }

  constructor(inputs?: { comments: Comment[]; version: Version }) {
    this.version = inputs?.version ?? new Version();
    this.comments = inputs?.comments ?? [];
    this.sections = sectionsForSettings(context.settings);
  }
}
