import type { ReactElement } from 'react';
import React from 'react';

enum Universe {
  original = 'original',
  diverged = 'diverged',
}

const array = [1, 'test', 0, 'hello'];

class HelloWorld {
  // what needs a hello?
  public hello = 'world';
  public universe = Universe.original;

  public anotherFunc(): string {
    return this.hello;
  }

  public testing(input: Record<string, string>): string {
    return `${this.hello} ${array[3]?.toString() ?? ''} ${input['test'] ?? ''}`;
  }
}

// generate a world
const world = new HelloWorld();
const worldName = world.testing({
  test: 'hey',
  some_parameter: 'hello',
});
const heading: ReactElement = <h1>This is a heading</h1>;
const button: ReactElement = (
  <button
    type="button"
    onClick={(): void => {
      world.anotherFunc();
    }}
  >
    <p>This is a button</p>
  </button>
);

export { Universe, worldName, heading, button };
