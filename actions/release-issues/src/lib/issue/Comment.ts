import type { Track } from '../settings/Track';

export class Comment {
  public content: string;
  public releasesTrack?: Track;

  public constructor(content: string) {
    this.content = content;
  }
}
