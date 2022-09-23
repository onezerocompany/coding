/**
 * @file Example file for testing JavaScript React eslint rules.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import React from 'react';

/** An array of mixed types. */
const array = [1, 'test', 0, 'hello'];
/** The hello world. */
const HelloWorld = {
  hello: 'world',
  universe: 'original',

  /**
   * Another Function.
   *
   * @returns The string 'hello world'.
   * @example anotherFunc()
   */
  anotherFunc() {
    return this.hello;
  },

  /**
   * Test Function.
   *
   * @param input - The input to test.
   * @returns The input.
   * @example testing('hello world')
   */
  testing(input) {
    return `${this.hello} ${array[3].toString() || ''} ${input.test || ''}`;
  },
};

/** The first heading. */
const heading = <h1>This is a heading</h1>;

/**
 * A button to test.
 *
 * @example <Button />
 */
const button = (
  <button
    type="button"
    onClick={() => {
      HelloWorld.anotherFunc();
    }}
  >
    <p>This is a button</p>
  </button>
);

/** Create a new hello world. */
const world = new HelloWorld();

/** The name of the world. */
const worldName = world.testing({
  test: 'hey',
  some_parameter: 'hello',
});

export { HelloWorld, heading, button, worldName };
