export enum TagTemplateSegment {
  major,
  minor,
  patch,
  build,
  commit,
  date,
  time,
  branch,
  project,
  repository,
}

export class ReleaseScheme {
  public tagTemplate: (TagTemplateSegment | string)[];

  public constructor({
    tagTemplate = [
      TagTemplateSegment.major,
      TagTemplateSegment.minor,
      TagTemplateSegment.patch,
    ],
  }: {
    tagTemplate?: TagTemplateSegment[];
  }) {
    this.tagTemplate = tagTemplate;
  }
}
