const array = [1, 'test', 0, 'hello'];
const HelloWorld = {
  hello: 'world',
  universe: 'original',
  anotherFunc() {
    return this.hello;
  },
  testing(input) {
    return `${this.hello} ${array[3].toString() || ''} ${input.test || ''}`;
  },
};
// generate a world
const world = HelloWorld;

world.testing({
  test: 'hey',
  some_parameter: 'hello',
});
