import { ReleaseScheme } from './release_scheme';
import { BuildStep } from './build_steps/build_step';
import { LintStep } from './lint_steps/lint_step';
import { TestStep } from './test_steps/test_step';

export enum ProjectType {
  node = 'node',
  flutter = 'flutter',
  astro = 'astro',
  other = 'other',
}

export class Project {
  path: string;

  id: string;
  name: string;
  type: ProjectType;

  build_steps?: BuildStep[];
  lint_steps?: LintStep[];
  test_steps?: TestStep[];

  release_scheme?: ReleaseScheme;

  public constructor({
    path,

    id,
    name,
    type = ProjectType.other,

    build_steps = [],
    lint_steps = [],
    test_steps = [],

    release_scheme = new ReleaseScheme({}),
  }: {
    id: string;
    name: string;
    path: string;
    type?: ProjectType;
    build_steps?: BuildStep[];
    lint_steps?: LintStep[];
    test_steps?: TestStep[];
    release_scheme?: ReleaseScheme;
  }) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.type = type;
    this.build_steps = build_steps;
    this.lint_steps = lint_steps;
    this.test_steps = test_steps;
    this.release_scheme = release_scheme;
  }
}
