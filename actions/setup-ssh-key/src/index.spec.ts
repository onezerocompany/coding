import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('commit-check', () => {
  it('dist should be up-to-date', async () => {
    expect.hasAssertions();

    // Generate references
    execSync('npx ncc build -m src/index.ts -o dist-reference/main', {
      cwd: resolve(__dirname, '..'),
    });
    execSync('npx ncc build -m src/post.ts -o dist-reference/post', {
      cwd: resolve(__dirname, '..'),
    });

    // Load the references
    const mainReference = readFileSync(
      resolve(__dirname, '..', 'dist-reference', 'main', 'index.js'),
      'utf8',
    );

    const postReference = readFileSync(
      resolve(__dirname, '..', 'dist-reference', 'post', 'index.js'),
      'utf8',
    );

    // Load the main dist
    const mainDist = readFileSync(
      resolve(__dirname, '..', 'dist', 'main', 'index.js'),
      'utf8',
    );

    // Load the post dist
    const postDist = readFileSync(
      resolve(__dirname, '..', 'dist', 'post', 'index.js'),
      'utf8',
    );

    // Compare
    expect(mainDist).toEqual(mainReference);
    expect(postDist).toEqual(postReference);
  });
});
