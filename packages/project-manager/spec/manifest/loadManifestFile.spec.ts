import { loadManifestFromProject } from '../../src';

describe('loading manifest file', () => {
  it('should load manifest file', () => {
    const manifest = loadManifestFromProject();
    expect(manifest).toBeDefined();
  });
});
