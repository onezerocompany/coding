'use strict';

const Ajv = require('ajv-draft-04');
const fetch = require('node-fetch');

const ajv = new Ajv();

describe('check if prettier-config is valid', () => {
  it('should be valid', async () => {
    expect.assertions(1);
    const schema = await (
      await fetch('http://json.schemastore.org/prettierrc')
    ).json();

    const validate = ajv.compile(schema);
    const config = require('./config');
    expect(validate(config)).toBe(true);
  });
});
