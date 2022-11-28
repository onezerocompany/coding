import {
  parsePermission,
  parsePermissionArray,
} from '../../src/lib/manifest/UserSettings';
import { EnvironmentType } from '../../src/lib/manifest/EnvironmentType';

describe('permission object', () => {
  it('should parse a permission correctly', () => {
    const permission = parsePermission({
      username: 'luca',
      assign_issue: true,
      environments: [
        {
          type: 'firebase-hosting',
          release: true,
          edit_changelog: true,
        },
      ],
    });
    expect(permission).toEqual({
      username: 'luca',
      assign_issue: true,
      environments: [
        {
          type: EnvironmentType.firebaseHosting,
          edit_changelog: true,
          release: true,
        },
      ],
    });
  });
  it('should parse an empty object correctly', () => {
    const permission = parsePermission({});
    expect(permission).toEqual({
      username: '',
      assign_issue: false,
      environments: [],
    });
  });
  it('should parse an object with incorrect values correctly', () => {
    const permission = parsePermission({
      username: 123,
      assign_issue: 'true',
      environments: {},
    });
    expect(permission).toEqual({
      username: '',
      assign_issue: false,
      environments: [],
    });
  });
  it('should parse permission array correctly', () => {
    const permission = parsePermissionArray([
      {
        username: 'luca',
        assign_issue: true,
        environments: [
          {
            type: 'firebase-hosting',
            edit_changelog: true,
            release: true,
          },
        ],
      },
      {
        username: 'john',
        assign_issue: true,
        environments: [
          {
            type: 'apple-app-store',
            edit_changelog: true,
            release: true,
          },
        ],
      },
    ]);
    expect(permission).toEqual([
      {
        username: 'luca',
        assign_issue: true,
        environments: [
          {
            type: EnvironmentType.firebaseHosting,
            edit_changelog: true,
            release: true,
          },
        ],
      },
      {
        username: 'john',
        assign_issue: true,
        environments: [
          {
            type: EnvironmentType.appleAppStore,
            edit_changelog: true,
            release: true,
          },
        ],
      },
    ]);
  });
  it('should parse an empty array correctly', () => {
    const permission = parsePermissionArray([]);
    expect(permission).toEqual([]);
  });
  it('should parse an array that is not an array', () => {
    const permission = parsePermissionArray({});
    expect(permission).toEqual([]);
  });
});
