export enum BuildStepType {
  typescript = 'typescript',
  shell = 'shell',
}

export class BuildStep {
  public id: string;
  public name: string;
  public type: BuildStepType;
  public dependsOn?: string[];

  public constructor({
    id,
    name,
    type,
    dependsOn,
  }: {
    id: string;
    name: string;
    type: BuildStepType;
    dependsOn?: string[];
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.dependsOn = dependsOn;
  }
}
