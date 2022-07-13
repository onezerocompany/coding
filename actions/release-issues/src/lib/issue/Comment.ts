import type { Track } from '../settings/Track';

export class Comment {
  content: string;
  releasesTrack?: Track;

  constructor(content: string) {
    this.content = content;
  }
}
