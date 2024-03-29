/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Version } from './Version';
import { VersionBump } from './VersionBump';

describe('version', () => {
  it('default version should be 0.0.1', () => {
    const version = new Version();
    expect(version.major).toBe(0);
    expect(version.minor).toBe(0);
    expect(version.patch).toBe(1);
    expect(version.displayString).toBe('0.0.1');
  });
  it('should work with other template', () => {
    const version = new Version({
      major: 1,
      minor: 0,
      patch: 0,
      template: '{major}.{minor}.{patch} stable',
    });
    expect(version.major).toBe(1);
    expect(version.minor).toBe(0);
    expect(version.patch).toBe(0);
    expect(version.displayString).toBe('1.0.0 stable');
  });
  it('major bump should work correctly', () => {
    const version = new Version({ major: 0, minor: 2, patch: 6 });
    version.bump(VersionBump.major);
    expect(version.major).toBe(1);
    expect(version.minor).toBe(0);
    expect(version.patch).toBe(0);
    expect(version.displayString).toBe('1.0.0');
  });
  it('minor bump should work correctly', () => {
    const version = new Version({ major: 0, minor: 2, patch: 6 });
    version.bump(VersionBump.minor);
    expect(version.major).toBe(0);
    expect(version.minor).toBe(3);
    expect(version.patch).toBe(0);
    expect(version.displayString).toBe('0.3.0');
  });
  it('patch bump should work correctly', () => {
    const version = new Version({ major: 0, minor: 2, patch: 6 });
    version.bump(VersionBump.patch);
    expect(version.major).toBe(0);
    expect(version.minor).toBe(2);
    expect(version.patch).toBe(7);
    expect(version.displayString).toBe('0.2.7');
  });
  it('none bump should work correctly', () => {
    const version = new Version({ major: 0, minor: 2, patch: 6 });
    version.bump(VersionBump.none);
    expect(version.major).toBe(0);
    expect(version.minor).toBe(2);
    expect(version.patch).toBe(6);
    expect(version.displayString).toBe('0.2.6');
  });
  it('should sort correctly', () => {
    const list = [
      new Version({ major: 0, minor: 2, patch: 6 }),
      new Version({ major: 0, minor: 3, patch: 7 }),
      new Version({ major: 0, minor: 3, patch: 7 }),
      new Version({ major: 0, minor: 2, patch: 7 }),
      new Version({ major: 2, minor: 2, patch: 7 }),
      new Version({ major: 0, minor: 2, patch: 1 }),
      new Version({ major: 1, minor: 1, patch: 6 }),
      new Version({ major: 1, minor: 4, patch: 0 }),
    ]
      .sort(Version.sort)
      .map((version) => version.displayString);
    expect(list).toEqual([
      '0.2.1',
      '0.2.6',
      '0.2.7',
      '0.3.7',
      '0.3.7',
      '1.1.6',
      '1.4.0',
      '2.2.7',
    ]);
  });
  it('should create correct json object', () => {
    const version = new Version({ major: 0, minor: 2, patch: 6 });
    expect(version.json).toEqual({
      major: 0,
      minor: 2,
      patch: 6,
      template: '{major}.{minor}.{patch}',
    });
  });
  it('should create correct version from perfect string', () => {
    const version = Version.fromString('0.2.6');
    expect(version.major).toBe(0);
    expect(version.minor).toBe(2);
    expect(version.patch).toBe(6);
    expect(version.displayString).toBe('0.2.6');
  });
  it('should create correct version from clobbered string', () => {
    const version = Version.fromString('!v0.2.6 alpha version');
    expect(version.major).toBe(0);
    expect(version.minor).toBe(2);
    expect(version.patch).toBe(6);
    expect(version.displayString).toBe('0.2.6');
  });
  it('should create a release version by default', () => {
    const version = Version.fromJson({
      major: 0,
      minor: 2,
      patch: 6,
      template: '{major}.{minor}.{patch}',
    });
    expect(version.major).toBe(0);
    expect(version.minor).toBe(2);
    expect(version.patch).toBe(6);
    expect(version.displayString).toBe('0.2.6');
  });
  it('should work with an empty string', () => {
    const version = Version.fromString('');
    expect(version.major).toBe(0);
    expect(version.minor).toBe(0);
    expect(version.patch).toBe(0);
    expect(version.displayString).toBe('0.0.0');
  });
});
