/**
 * @file Contains the rules for Node.js projects.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand
 */

module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
    },
  },
  globals: {
    // ECMAScript
    ArrayBuffer: 'readonly',
    Atomics: 'readonly',
    BigInt: 'readonly',
    BigInt64Array: 'readonly',
    BigUint64Array: 'readonly',
    DataView: 'readonly',
    Float32Array: 'readonly',
    Float64Array: 'readonly',
    Int16Array: 'readonly',
    Int32Array: 'readonly',
    Int8Array: 'readonly',
    Map: 'readonly',
    Promise: 'readonly',
    Proxy: 'readonly',
    Reflect: 'readonly',
    Set: 'readonly',
    SharedArrayBuffer: 'readonly',
    Symbol: 'readonly',
    Uint16Array: 'readonly',
    Uint32Array: 'readonly',
    Uint8Array: 'readonly',
    Uint8ClampedArray: 'readonly',
    WeakMap: 'readonly',
    WeakSet: 'readonly',

    // ECMAScript (experimental)
    globalThis: 'readonly',

    // ECMA-404
    Intl: 'readonly',

    // Web Standard
    TextDecoder: 'readonly',
    TextEncoder: 'readonly',
    URL: 'readonly',
    URLSearchParams: 'readonly',
    WebAssembly: 'readonly',
    clearInterval: 'readonly',
    clearTimeout: 'readonly',
    console: 'readonly',
    queueMicrotask: 'readonly',
    setInterval: 'readonly',
    setTimeout: 'readonly',

    // Node.js
    Buffer: 'readonly',
    GLOBAL: 'readonly',
    clearImmediate: 'readonly',
    global: 'readonly',
    process: 'readonly',
    root: 'readonly',
    setImmediate: 'readonly',
  },
  plugins: ['node'],
  extends: [
    './typescript.js',
    '../rules/node/errors.js',
    '../rules/node/style.js',
    'prettier',
  ],
};
