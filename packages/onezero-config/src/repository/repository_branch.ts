export enum RepositoryBranchType {
  main = 'main',
  other = 'other',
}

export class RepositoryBranch {
  public name: string;
  public type: RepositoryBranchType;

  public constructor({
    name,
    type = RepositoryBranchType.other,
  }: {
    name: string;
    type?: RepositoryBranchType;
  }) {
    this.name = name;
    this.type = type;
  }
}
