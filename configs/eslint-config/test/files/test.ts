/**
 * @file Example file for testing TypeScript eslint rules.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Types of universes. */
enum Universe {
  /** The original world. */
  original = 'original',
  /** The divirged version of the original. */
  diverged = 'diverged',
}

/** Settings for the world. */
interface WorldSettings {
  /** The degree with which stuff falls down. */
  gravity: number;
  /** How fast tiny particles move. */
  temperature: number;
}

/** Simple Array of mixed types. */
const array = [1, 'test', 0, 'hello'];

/** The world object. */
class HelloWorld {
  /** What is hello? */
  public hello = 'world';
  /** Type of universe the world is in. */
  public universe = Universe.original;
  /** Settings for the created world.  */
  public settings: WorldSettings = {
    gravity: 9.81,
    temperature: 20,
  };

  /**
   * The name of the universe the world is in.
   *
   * @returns The name of the universe.
   */
  public get universeName(): string {
    switch (this.universe) {
      /** The original universe. */
      case Universe.original:
        return 'Original Universe';
      /** The diverged universe. */
      case Universe.diverged:
        return 'Diverged Universe';
      /** Any other universe. */
      default:
        return 'Unknown Universe';
    }
  }

  /**
   * Just another testing function.
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
   * @param input.test - Test value.
   * @returns The processed input.
   * @example testing('hello');
   */
  public testing(input: Record<string, string>): string {
    return `${this.hello} ${array[3]?.toString() ?? ''} ${input['test'] ?? ''}`;
  }
}

/** An instance of a world.       */
const world = new HelloWorld();
/** The name of the world. */
const worldName = world.testing({
  test: 'hey',
  some_parameter: 'hello',
});

export { world, worldName };
