import { BuildStep, BuildStepType } from './build_step';

export class TypescriptBuildStep extends BuildStep {
  public rootDir: string;
  public outDir: string;
  public declarations?: boolean;
  public sourcemaps?: boolean;

  public constructor({
    rootDir,
    outDir,
    declarations,
    sourcemaps,
    ...superValues
  }: {
    rootDir: string;
    outDir: string;
    declarations?: boolean;
    sourcemaps?: boolean;
  } & Omit<BuildStep, 'type'>) {
    super({
      ...superValues,
      type: BuildStepType.typescript,
    });
    this.rootDir = rootDir;
    this.outDir = outDir;
    this.declarations = declarations;
    this.sourcemaps = sourcemaps;
  }
}
