import { TestStep, TestStepType } from './test_step';

export class JestTestStep extends TestStep {
  public typescript: boolean;
  public coverage: boolean;

  public constructor({
    typescript,
    coverage,
    ...rest
  }: {
    typescript: boolean;
    coverage: boolean;
  } & Omit<TestStep, 'type'>) {
    super({
      type: TestStepType.jest,
      ...rest,
    });

    this.typescript = typescript;
    this.coverage = coverage;
  }
}
