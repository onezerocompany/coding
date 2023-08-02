export enum TestStepType {
  jest = 'jest',
}

export class TestStep {
  public id: string;
  public name: string;
  public type: TestStepType;
  public dependsOn?: string[];

  public constructor({
    id,
    name,
    type,
    dependsOn,
  }: {
    id: string;
    name: string;
    type: TestStepType;
    dependsOn?: string[];
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.dependsOn = dependsOn;
  }
}
