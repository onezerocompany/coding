import {
  parsePermission,
  parsePermissionArray,
} from '../../src/lib/manifest/UserSettings';

describe('permission object', () => {
  it('should parse a permission correctly', () => {
    const permission = parsePermission({
      username: 'luca',
      assign_issue: true,
      environments: [
        {
          id: 'firebase',
          deploy: true,
          edit_changelog: true,
        },
      ],
    });
    expect(permission).toEqual({
      username: 'luca',
      assign_issue: true,
      environments: [
        {
          id: 'firebase',
          edit_changelog: true,
          deploy: true,
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
            id: 'firebase-hosting',
            edit_changelog: true,
            deploy: true,
          },
        ],
      },
      {
        username: 'john',
        assign_issue: true,
        environments: [
          {
            id: 'apple-app-store',
            edit_changelog: true,
            deploy: true,
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
            id: 'firebase-hosting',
            edit_changelog: true,
            deploy: true,
          },
        ],
      },
      {
        username: 'john',
        assign_issue: true,
        environments: [
          {
            id: 'apple-app-store',
            edit_changelog: true,
            deploy: true,
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
