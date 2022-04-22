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

export { world, worldName };
