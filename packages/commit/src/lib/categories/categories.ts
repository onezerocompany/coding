/* eslint-disable max-lines */
export enum ChangeLogType {
  internal = 'internal',
  external = 'external',
}

export enum VersionBumpType {
  none = 'none',
  patch = 'patch',
  minor = 'minor',
  major = 'major',
}

export interface CommitCategory {
  tag: string;
  emoji: string;
  displayName: string;
  description: string;
  changelog: {
    title: string;
    type: ChangeLogType;
  };
  versioning: {
    bump: VersionBumpType;
    canBreak: boolean;
  };
}

export const categories: CommitCategory[] = [
  // feature
  {
    tag: 'feat/new',
    emoji: ':tada:',
    displayName: 'New Feature',
    description: 'Introduce new functionality',
    changelog: {
      title: 'New Features',
      type: ChangeLogType.external,
    },
    versioning: {
      bump: VersionBumpType.minor,
      canBreak: true,
    },
  },
  // feature improve
  {
    tag: 'feat/impr',
    emoji: ':star2:',
    displayName: 'Improve Feature',
    description: 'Improve existing functionality',
    changelog: {
      title: 'Feature Improvements',
      type: ChangeLogType.external,
    },
    versioning: {
      bump: VersionBumpType.minor,
      canBreak: false,
    },
  },
  // feature deprecate
  {
    tag: 'feat/depr',
    emoji: ':anger:',
    displayName: 'Deprecate Feature',
    description: 'Deprecate existing functionality',
    changelog: {
      title: 'Deprecated Features',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // feature remove
  {
    tag: 'feat/rem',
    emoji: ':bomb:',
    displayName: 'Remove Feature',
    description: 'Remove existing functionality',
    changelog: {
      title: 'Removed Features',
      type: ChangeLogType.external,
    },
    versioning: {
      bump: VersionBumpType.minor,
      canBreak: true,
    },
  },
  // bugfix
  {
    tag: 'bug/fix',
    emoji: ':beetle:',
    displayName: 'Bug Fix',
    description: 'Fix broken functionality or code',
    changelog: {
      title: 'Bug Fixes',
      type: ChangeLogType.external,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // hotfix
  {
    tag: 'bug/hot',
    emoji: ':fire:',
    displayName: 'Hotfix',
    description: 'Fix a critical bug and release immediately',
    changelog: {
      title: 'Bug Fixes',
      type: ChangeLogType.external,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // minorfix
  {
    tag: 'bug/minor',
    emoji: ':bug:',
    displayName: 'Minor Fix',
    description: 'Fix a minor bug with a small impact',
    changelog: {
      title: 'Minor Bug Fixes',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // test
  {
    tag: 'test',
    emoji: ':microscope:',
    displayName: 'Test',
    description: 'Add new tests or fix existing tests',
    changelog: {
      title: 'Tests',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // chore
  {
    tag: 'chore',
    emoji: ':broom:',
    displayName: 'Chore',
    description: "Misc. changes that don't change functionality",
    changelog: {
      title: 'Chores',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // scrips
  {
    tag: 'scripts',
    emoji: ':hammer:',
    displayName: 'Scripts',
    description: 'Changes to supporting scripts',
    changelog: {
      title: 'Scripts',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // editor
  {
    tag: 'editor',
    emoji: ':computer:',
    displayName: 'IDE / Editor',
    description: 'Changes to IDE or editor settings',
    changelog: {
      title: 'IDE / Editor',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // docs
  {
    tag: 'docs',
    emoji: ':open_book:',
    displayName: 'Documentation',
    description: 'Updates the documentation',
    changelog: {
      title: 'Documentation',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // ci
  {
    tag: 'ci/cd',
    emoji: ':robot:',
    displayName: 'Continuous Integration',
    description: 'Update the CI/CD pipeline',
    changelog: {
      title: 'CI/CD',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // deploy
  {
    tag: 'deploy',
    emoji: ':rocket:',
    displayName: 'Deployment',
    description: 'Update deployment scripts or configuration',
    changelog: {
      title: 'Deployment',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: true,
    },
  },
  // wip
  {
    tag: 'wip',
    emoji: ':construction:',
    displayName: 'Work in Progress',
    description: 'Unfinished work or ongoing development',
    changelog: {
      title: 'Work in Progress',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // dependencies
  {
    tag: 'depend',
    emoji: ':link:',
    displayName: 'Dependencies',
    description: 'Add, remove, or update dependencies',
    changelog: {
      title: 'Dependencies',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: true,
    },
  },
  // metadata
  {
    tag: 'metadata',
    emoji: ':memo:',
    displayName: 'Metadata',
    description: 'Change metadata files of the project',
    changelog: {
      title: 'Metadata',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // license
  {
    tag: 'license',
    emoji: ':bookmark_tabs:',
    displayName: 'License',
    description: 'Change the license',
    changelog: {
      title: 'License',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // typo
  {
    tag: 'code/typo',
    emoji: ':writing_hand:',
    displayName: 'Code Typo',
    description: 'Fix a typo in the code itself',
    changelog: {
      title: 'Code Typos',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // cleanup
  {
    tag: 'code/clean',
    emoji: ':soap:',
    displayName: 'Code Cleanup',
    description: 'Remove code that is no longer needed',
    changelog: {
      title: 'Code Cleanup',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // comment
  {
    tag: 'code/comm',
    emoji: ':speech_balloon:',
    displayName: 'Code Comment',
    description: 'Improve comments in the code',
    changelog: {
      title: 'Code Comments',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // style -> changes to the formatting of the code or linter
  {
    tag: 'code/style',
    emoji: ':art:',
    displayName: 'Style',
    description: 'Change how the code looks, for readability',
    changelog: {
      title: 'Style',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // refactor -> changes to the code that do not affect the functionality
  {
    tag: 'code/ref',
    emoji: ':arrows_counterclockwise:',
    displayName: 'Refactor',
    description: 'Change the code without affecting functionality',
    changelog: {
      title: 'Refactor',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // performance -> changes to the code that affect performance
  {
    tag: 'code/perf',
    emoji: ':bullettrain_side:',
    displayName: 'Performance',
    description: 'Change the code to make it perform better',
    changelog: {
      title: 'Performance',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // security -> fix security issues
  {
    tag: 'sec/fix',
    emoji: ':lock:',
    displayName: 'Security Fix',
    description: 'Fix security issues, of existing functionality',
    changelog: {
      title: 'Security Fixes',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // security -> fix security issues
  {
    tag: 'sec/impr',
    emoji: ':lock_with_ink_pen:',
    displayName: 'Security Improvement',
    description: 'Improve security design and implementation',
    changelog: {
      title: 'Security Improvements',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.minor,
      canBreak: true,
    },
  },
  // infrastructure
  {
    tag: 'infra',
    emoji: ':children_crossing:',
    displayName: 'Infrastructure',
    description: 'Change infrastructure definitions',
    changelog: {
      title: 'Infrastructure',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.none,
      canBreak: false,
    },
  },
  // localization -> fix localization issues
  {
    tag: 'locale',
    emoji: ':globe_with_meridians:',
    displayName: 'Localization',
    description: 'Add, update, or remove localization',
    changelog: {
      title: 'Localization',
      type: ChangeLogType.external,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: true,
    },
  },
  // assets -> add new assets or update existing assets
  {
    tag: 'assets',
    emoji: ':package:',
    displayName: 'Assets',
    description: 'Add, update or remove assets (images, fonts, etc.)',
    changelog: {
      title: 'Assets',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: true,
    },
  },
  // accessibility
  {
    tag: 'a11y',
    emoji: ':guide_dog:',
    displayName: 'Accessibility',
    description: 'Improve accessibility of the app',
    changelog: {
      title: 'Accessibility',
      type: ChangeLogType.external,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: true,
    },
  },
  // seo
  {
    tag: 'seo',
    emoji: ':mag:',
    displayName: 'SEO',
    description: 'Improve discoverability of the project',
    changelog: {
      title: 'SEO',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // log
  {
    tag: 'logging',
    emoji: ':scroll:',
    displayName: 'Logging',
    description: 'Change the logging implementation',
    changelog: {
      title: 'Logging',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // health
  {
    tag: 'health',
    emoji: ':satellite:',
    displayName: 'Healthchecks',
    description: 'Add, update or remove healthchecks',
    changelog: {
      title: 'Healthchecks',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // business
  {
    tag: 'business',
    emoji: ':necktie:',
    displayName: 'Business',
    description: 'Add, update or remove business logic',
    changelog: {
      title: 'Business Logic',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // auth
  {
    tag: 'auth',
    emoji: ':passport_control:',
    displayName: 'Authentication',
    description: 'Change authentication implementation',
    changelog: {
      title: 'Authentication',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // data models
  {
    tag: 'data/mod',
    emoji: ':notebook_with_decorative_cover:',
    displayName: 'Data Models',
    description: 'Add, update or remove data models',
    changelog: {
      title: 'Data Models',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // database
  {
    tag: 'data/db',
    emoji: ':books:',
    displayName: 'Database',
    description: 'Change database implementation',
    changelog: {
      title: 'Database',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: true,
    },
  },
  // cache
  {
    tag: 'data/cache',
    emoji: ':clock10:',
    displayName: 'Cache',
    description: 'Change cache implementation',
    changelog: {
      title: 'Cache',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // storage
  {
    tag: 'data/store',
    emoji: ':floppy_disk:',
    displayName: 'Storage',
    description: 'Change storage implementation',
    changelog: {
      title: 'Storage',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
  // egg
  {
    tag: 'easteregg',
    emoji: ':egg:',
    displayName: 'Easter Egg',
    description: 'Add, update or remove an easter egg',
    changelog: {
      title: 'Easter Egg',
      type: ChangeLogType.internal,
    },
    versioning: {
      bump: VersionBumpType.patch,
      canBreak: false,
    },
  },
];

export function categoryForTag(tag?: string): CommitCategory {
  const result = categories.find((category) => category.tag === tag);
  return (
    result ?? {
      tag: 'unknown',
      emoji: ':question:',
      displayName: 'Unknown',
      description: 'Unknown change',
      changelog: {
        title: 'Unknown',
        type: ChangeLogType.internal,
      },
      versioning: {
        bump: VersionBumpType.none,
        canBreak: false,
      },
    }
  );
}
