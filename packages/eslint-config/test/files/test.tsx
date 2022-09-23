/**
 * @file Example file for testing TypeScript React eslint rules.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand
 */

import type { ReactElement } from 'react';
import React from 'react';

/** Types of universes. */
enum Universe {
  /** The original world. */
  original = 'original',
  /** The divirged version of the original. */
  diverged = 'diverged',
}

/** An array of mixed types. */
const array = [1, 'test', 0, 'hello'];

/** Hello world class. */
class HelloWorld {
  /** The thing that needs a hello.  */
  public hello = 'world';

  /** The type of universe this world is in. */
  public universe = Universe.original;

  /**
   * Another Function.
   *
   * @returns The hello world string.
   * @example anotherFunc();
   */
  public anotherFunc(): string {
    return this.hello;
  }

  /**
   * Testing function.
   *
   * @param input - The input to test.
   * @returns The input.
   * @example testing({ hello: 'world' });
   */
  public testing(input: Record<string, string>): string {
    return `${this.hello} ${array[3]?.toString() ?? ''} ${input['test'] ?? ''}`;
  }
}

/** Create a new HelloWorld. */
const world = new HelloWorld();

/** The name of the new world. */
const worldName = world.testing({
  test: 'hey',
  some_parameter: 'hello',
});

/** A heading element. */
const heading: ReactElement = <h1>This is a heading</h1>;

/**
 * A button.
 *
 * @example <button />
 */
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
