import {
  parsePermission,
  parsePermissionArray,
} from '../../src/lib/manifest/PermissionSettings';

describe('permission object', () => {
  it('should parse a permission correctly', () => {
    const permission = parsePermission({
      username: 'luca',
      assignIssue: true,
      canEditChangelog: true,
      canReleaseTracks: ['stable'],
    });
    expect(permission).toEqual({
      username: 'luca',
      assignIssue: true,
      canEditChangelog: true,
      canReleaseTracks: ['stable'],
    });
  });
  it('should parse an empty object correctly', () => {
    const permission = parsePermission({});
    expect(permission).toEqual({
      username: '',
      assignIssue: false,
      canEditChangelog: false,
      canReleaseTracks: [],
    });
  });
  it('should parse an object with incorrect values correctly', () => {
    const permission = parsePermission({
      username: 123,
      assignIssue: 'true',
      canEditChangelog: 'false',
      canReleaseTracks: 'stable',
    });
    expect(permission).toEqual({
      username: '',
      assignIssue: false,
      canEditChangelog: false,
      canReleaseTracks: [],
    });
  });
  it('should parse permission array correctly', () => {
    const permission = parsePermissionArray([
      {
        username: 'luca',
        assignIssue: true,
        canEditChangelog: true,
        canReleaseTracks: ['stable', 'beta', 'alpha'],
      },
      {
        username: 'john',
        assignIssue: true,
        canEditChangelog: true,
        canReleaseTracks: ['stable'],
      },
    ]);
    expect(permission).toEqual([
      {
        username: 'luca',
        assignIssue: true,
        canEditChangelog: true,
        canReleaseTracks: ['stable', 'beta', 'alpha'],
      },
      {
        username: 'john',
        assignIssue: true,
        canEditChangelog: true,
        canReleaseTracks: ['stable'],
      },
    ]);
  });
  it('should parse an empty array correctly', () => {
    const permission = parsePermissionArray([]);
    expect(permission).toEqual([]);
  });
});
