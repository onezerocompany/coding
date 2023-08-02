import { FileGraphEntryType } from './FileGraphEntryType';

export class FileGraphEntry {
  public path: string;
  public type: FileGraphEntryType;
  public hash: string;
  public children: FileGraphEntry[];
  public counters: {
    files: number;
    directories: number;
  };

  public content?: Buffer;

  public project?: string;

  constructor({
    path,
    type,
    hash = '',
    content,
    children = [],
    counters = {
      files: 0,
      directories: 0,
    },
  }: {
    path: string;
    type: FileGraphEntryType;
    hash?: string;
    content?: Buffer;
    children?: FileGraphEntry[];
    counters?: {
      files: number;
      directories: number;
    };
  }) {
    this.path = path;
    this.type = type;
    this.hash = hash;
    this.content = content;
    this.children = children;
    this.counters = counters;
  }
}
