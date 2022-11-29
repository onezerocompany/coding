import { EnvironmentType } from '../../src';
import {
  parseEnvironmentSettings,
  parseEnvironmentSettingsArray,
} from '../../src/lib/manifest/EnvironmentSettings';

describe('environment settings', () => {
  it('should parse environment settings', () => {
    const settings = parseEnvironmentSettings({
      id: 'test',
      type: 'firebase-hosting',
      github_name: 'github-test',
      auto_release: true,
      changelog: {
        generate: true,
        type: 'github',
        headers: ['header1', 'header2'],
        footers: ['footer1', 'footer2'],
      },
      version_template: '{major}.{minor}.{patch}',
    });
    expect(settings).toEqual({
      type: EnvironmentType.firebaseHosting,
      github_name: 'github-test',
      auto_release: true,
      changelog: {
        generate: true,
        headers: ['header1', 'header2'],
        footers: ['footer1', 'footer2'],
      },
      version_template: '{major}.{minor}.{patch}',
    });
  });
  it('should parse an empty environment settings', () => {
    const settings = parseEnvironmentSettings({});
    expect(settings).toEqual({
      type: EnvironmentType.firebaseHosting,
      github_name: '',
      auto_release: false,
      changelog: {
        generate: false,
        headers: [],
        footers: [],
      },
      version_template: '{major}.{minor}.{patch}',
    });
  });
  it('should parse an array correctly', () => {
    const settings = parseEnvironmentSettingsArray([
      {
        type: 'firebase-hosting',
        github_name: 'github-test',
        auto_release: true,
        changelog: {
          generate: true,
          headers: ['header1', 'header2'],
          footers: ['footer1', 'footer2'],
        },
        version_template: '{major}.{minor}.{patch}',
      },
    ]);
    expect(settings).toEqual([
      {
        type: EnvironmentType.firebaseHosting,
        github_name: 'github-test',
        auto_release: true,
        changelog: {
          generate: true,
          headers: ['header1', 'header2'],
          footers: ['footer1', 'footer2'],
        },
        version_template: '{major}.{minor}.{patch}',
      },
    ]);
  });
  it('should parse an empty array correctly', () => {
    const settings = parseEnvironmentSettingsArray([]);
    expect(settings).toEqual([]);
  });
  it('should parse a non array correctly', () => {
    const settings = parseEnvironmentSettingsArray({});
    expect(settings).toEqual([]);
  });
});
