import React from 'react';

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
const heading = <h1>This is a heading</h1>;
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
// generate a world
const world = new HelloWorld();
const worldName = world.testing({
  test: 'hey',
  some_parameter: 'hello',
});

export { HelloWorld, heading, button, worldName };
