import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('commit-check', () => {
  it('dist should be up-to-date', async () => {
    // generate reference
    expect.hasAssertions();
    execSync('npx ncc build src/index.ts -o dist-reference', {
      cwd: resolve(__dirname, '..'),
    });
    // load the reference
    const reference = readFileSync(
      resolve(__dirname, '..', 'dist-reference', 'index.js'),
      'utf8',
    );

    // load the dist
    const dist = readFileSync(
      resolve(__dirname, '..', 'dist', 'index.js'),
      'utf8',
    );

    // compare
    expect(dist).toEqual(reference);
  });
});
