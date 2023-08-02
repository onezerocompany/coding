import { LintStep, LintStepType } from './lint_step';

export class PrettierLintStep extends LintStep {
  public configPackage: string;

  public constructor({
    configPackage = '@onezerocompany/prettier-config',
    ...rest
  }: {
    configPackage: string;
  } & Omit<LintStep, 'type'>) {
    super({
      type: LintStepType.prettier,
      ...rest,
    });

    this.configPackage = configPackage;
  }

  public get packageJsonContents(): Record<string, unknown> {
    return {
      devDependencies: {
        [this.configPackage]: '*',
      },
      prettier: this.configPackage,
      scripts: {
        'lint:prettier': `prettier --check .`,
        'lint:prettier:fix': `prettier --write .`,
      },
    };
  }
}
