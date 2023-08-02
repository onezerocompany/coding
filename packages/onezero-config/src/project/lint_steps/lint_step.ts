export enum LintStepType {
  prettier = 'prettier',
  eslint = 'eslint',
}

export class LintStep {
  public id: string;
  public name: string;
  public type: LintStepType;
  public dependsOn?: string[];

  public constructor({
    id,
    name,
    type,
    dependsOn,
  }: {
    id: string;
    name: string;
    type: LintStepType;
    dependsOn?: string[];
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.dependsOn = dependsOn;
  }
}
