'use strict';

const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const Ajv = require('ajv-draft-04');
const nodeFetch = require('node-fetch');

const ajv = new Ajv({
  strict: false,
  allErrors: true,
});

let schema = null;

describe('check if tsconfigs is valid', () => {
  const baseFiles = readdirSync(resolve(__dirname, 'bases'));

  beforeAll(async () => {
    schema = await (
      await nodeFetch('http://json.schemastore.org/tsconfig')
    ).json();
  });

  for (const file of baseFiles) {
    // eslint-disable-next-line no-loop-func
    it(`${file} should be valid`, () => {
      expect.assertions(1);
      const filePath = resolve(__dirname, 'bases', file);
      const fileContent = JSON.parse(readFileSync(filePath, 'utf8'));
      const validate = ajv.compile(schema);
      const valid = validate(fileContent);
      expect(valid).toBe(true);
    });
  }
});
