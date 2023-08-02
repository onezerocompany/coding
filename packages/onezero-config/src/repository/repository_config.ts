import { Project } from '../project/project';
import { AuthorDetails } from './author_details';
import { License } from './license';
import { RepositoryBranch } from './repository_branch';
import { RepositoryDetails } from './repository_details';

export class RepositoryConfig {
  public displayName: string;

  public repo: RepositoryDetails;
  public author: AuthorDetails;
  public license: License;

  public branches!: RepositoryBranch[];
  public projects!: Project[];

  constructor({
    displayName,
    repo,
    author,
    license = License.none,
    branches = [],
    projects = [],
  }: {
    displayName: string;
    repo: RepositoryDetails;
    author: AuthorDetails;
    license?: License;
    branches?: RepositoryBranch[];
    projects?: Project[];
  }) {
    this.displayName = displayName;
    this.repo = repo;
    this.author = author;
    this.license = license;
    this.branches = branches;
    this.projects = projects;
  }
}
