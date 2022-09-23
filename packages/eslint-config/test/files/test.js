/**
 * @file Example file for testing JavaScript eslint rules.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** An array of mixed types. */
const array = [1, 'test', 0, 'hello'];
/** The World. */
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
   * The name of the universe.
   *
   * @returns The name of the universe.
   * @example world.universeName();
   */
  universeName() {
    switch (this.universe) {
      /** The original universe. */
      case 'original':
        return 'Original Universe';
      /** The divergent universe. */
      case 'divergent':
        return 'Diverged Universe';
      /** Any other universe. */
      default:
        return 'Unknown Universe';
    }
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
// Generate a world
/** The world is the HelloWorld. */
const world = HelloWorld;

world.testing({
  test: 'hey',
  some_parameter: 'hello',
});
