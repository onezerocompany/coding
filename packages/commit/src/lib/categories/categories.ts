/**
 * @file
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { VersionBump } from '../versions/VersionBump';

/** Types of changelogs. */
export enum ChangelogDomain {
  /** Changelog for internal usage. */
  internal = 'internal',
  /** Changelog for external publication. */
  external = 'external',
}

/** Category of a commit. */
export interface CommitCategory {
  /** Tag that identifies the category. */
  tag: string;
  /** An emoji visually representing the category. */
  emoji: string;
  /** Name of the category meant for public display. */
  displayName: string;
  /** Description of the category. */
  description: string;
  /** Details for generating changelogs. */
  changelog: {
    /** The title of the category in a changelog. */
    title: string;
    /** What type of changelogs this category shows up in. */
    type: ChangelogDomain;
  };
  /** Details for versioning related to this category. */
  versioning: {
    /** What bump. */
    bump: VersionBump;
    /** Whether this category can cause a breaking change. */
    canBreak: boolean;
  };
}

/* eslint-disable max-lines */
export const categories: CommitCategory[] = [
  // Feature
  {
    tag: 'feat/new',
    emoji: ':tada:',
    displayName: 'New Feature',
    description: 'Introduce new functionality',
    changelog: {
      title: 'New Features',
      type: ChangelogDomain.external,
    },
    versioning: {
      bump: VersionBump.minor,
      canBreak: true,
    },
  },
  // Feature improve
  {
    tag: 'feat/impr',
    emoji: ':star2:',
    displayName: 'Improve Feature',
    description: 'Improve existing functionality',
    changelog: {
      title: 'Feature Improvements',
      type: ChangelogDomain.external,
    },
    versioning: {
      bump: VersionBump.minor,
      canBreak: false,
    },
  },
  // Feature deprecate
  {
    tag: 'feat/depr',
    emoji: ':anger:',
    displayName: 'Deprecate Feature',
    description: 'Deprecate existing functionality',
    changelog: {
      title: 'Deprecated Features',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Feature remove
  {
    tag: 'feat/rem',
    emoji: ':bomb:',
    displayName: 'Remove Feature',
    description: 'Remove existing functionality',
    changelog: {
      title: 'Removed Features',
      type: ChangelogDomain.external,
    },
    versioning: {
      bump: VersionBump.minor,
      canBreak: true,
    },
  },
  // Bugfix
  {
    tag: 'bug/fix',
    emoji: ':beetle:',
    displayName: 'Bug Fix',
    description: 'Fix broken functionality or code',
    changelog: {
      title: 'Bug Fixes',
      type: ChangelogDomain.external,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Hotfix
  {
    tag: 'bug/hot',
    emoji: ':fire:',
    displayName: 'Hotfix',
    description: 'Fix a critical bug and release immediately',
    changelog: {
      title: 'Bug Fixes',
      type: ChangelogDomain.external,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Minorfix
  {
    tag: 'bug/minor',
    emoji: ':bug:',
    displayName: 'Minor Fix',
    description: 'Fix a minor bug with a small impact',
    changelog: {
      title: 'Minor Bug Fixes',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Test
  {
    tag: 'test',
    emoji: ':microscope:',
    displayName: 'Test',
    description: 'Add new tests or fix existing tests',
    changelog: {
      title: 'Tests',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Chore
  {
    tag: 'chore',
    emoji: ':broom:',
    displayName: 'Chore',
    description: "Misc. changes that don't change functionality",
    changelog: {
      title: 'Chores',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Scrips
  {
    tag: 'scripts',
    emoji: ':hammer:',
    displayName: 'Scripts',
    description: 'Changes to supporting scripts',
    changelog: {
      title: 'Scripts',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Editor
  {
    tag: 'editor',
    emoji: ':computer:',
    displayName: 'IDE / Editor',
    description: 'Changes to IDE or editor settings',
    changelog: {
      title: 'IDE / Editor',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Docs
  {
    tag: 'docs',
    emoji: ':open_book:',
    displayName: 'Documentation',
    description: 'Updates the documentation',
    changelog: {
      title: 'Documentation',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Ci
  {
    tag: 'ci/cd',
    emoji: ':robot:',
    displayName: 'Continuous Integration',
    description: 'Update the CI/CD pipeline',
    changelog: {
      title: 'CI/CD',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Deploy
  {
    tag: 'deploy',
    emoji: ':rocket:',
    displayName: 'Deployment',
    description: 'Update deployment scripts or configuration',
    changelog: {
      title: 'Deployment',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: true,
    },
  },
  // Wip
  {
    tag: 'wip',
    emoji: ':construction:',
    displayName: 'Work in Progress',
    description: 'Unfinished work or ongoing development',
    changelog: {
      title: 'Work in Progress',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Dependencies
  {
    tag: 'depend',
    emoji: ':link:',
    displayName: 'Dependencies',
    description: 'Add, remove, or update dependencies',
    changelog: {
      title: 'Dependencies',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: true,
    },
  },
  // Metadata
  {
    tag: 'metadata',
    emoji: ':memo:',
    displayName: 'Metadata',
    description: 'Change metadata files of the project',
    changelog: {
      title: 'Metadata',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // License
  {
    tag: 'license',
    emoji: ':bookmark_tabs:',
    displayName: 'License',
    description: 'Change the license',
    changelog: {
      title: 'License',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Typo
  {
    tag: 'code/typo',
    emoji: ':writing_hand:',
    displayName: 'Code Typo',
    description: 'Fix a typo in the code itself',
    changelog: {
      title: 'Code Typos',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Cleanup
  {
    tag: 'code/clean',
    emoji: ':soap:',
    displayName: 'Code Cleanup',
    description: 'Remove code that is no longer needed',
    changelog: {
      title: 'Code Cleanup',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Comment
  {
    tag: 'code/comm',
    emoji: ':speech_balloon:',
    displayName: 'Code Comment',
    description: 'Improve comments in the code',
    changelog: {
      title: 'Code Comments',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Style -> changes to the formatting of the code or linter
  {
    tag: 'code/style',
    emoji: ':art:',
    displayName: 'Style',
    description: 'Change how the code looks, for readability',
    changelog: {
      title: 'Style',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Refactor -> changes to the code that do not affect the functionality
  {
    tag: 'code/ref',
    emoji: ':arrows_counterclockwise:',
    displayName: 'Refactor',
    description: 'Change the code without affecting functionality',
    changelog: {
      title: 'Refactor',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Performance -> changes to the code that affect performance
  {
    tag: 'code/perf',
    emoji: ':bullettrain_side:',
    displayName: 'Performance',
    description: 'Change the code to make it perform better',
    changelog: {
      title: 'Performance',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Security -> fix security issues
  {
    tag: 'sec/fix',
    emoji: ':lock:',
    displayName: 'Security Fix',
    description: 'Fix security issues, of existing functionality',
    changelog: {
      title: 'Security Fixes',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Security -> fix security issues
  {
    tag: 'sec/impr',
    emoji: ':lock_with_ink_pen:',
    displayName: 'Security Improvement',
    description: 'Improve security design and implementation',
    changelog: {
      title: 'Security Improvements',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.minor,
      canBreak: true,
    },
  },
  // Infrastructure
  {
    tag: 'infra',
    emoji: ':children_crossing:',
    displayName: 'Infrastructure',
    description: 'Change infrastructure definitions',
    changelog: {
      title: 'Infrastructure',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.none,
      canBreak: false,
    },
  },
  // Localization -> fix localization issues
  {
    tag: 'locale',
    emoji: ':globe_with_meridians:',
    displayName: 'Localization',
    description: 'Add, update, or remove localization',
    changelog: {
      title: 'Localization',
      type: ChangelogDomain.external,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: true,
    },
  },
  // Assets -> add new assets or update existing assets
  {
    tag: 'assets',
    emoji: ':package:',
    displayName: 'Assets',
    description: 'Add, update or remove assets (images, fonts, etc.)',
    changelog: {
      title: 'Assets',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: true,
    },
  },
  // Accessibility
  {
    tag: 'a11y',
    emoji: ':guide_dog:',
    displayName: 'Accessibility',
    description: 'Improve accessibility of the app',
    changelog: {
      title: 'Accessibility',
      type: ChangelogDomain.external,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: true,
    },
  },
  // Seo
  {
    tag: 'seo',
    emoji: ':mag:',
    displayName: 'SEO',
    description: 'Improve discoverability of the project',
    changelog: {
      title: 'SEO',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Log
  {
    tag: 'logging',
    emoji: ':scroll:',
    displayName: 'Logging',
    description: 'Change the logging implementation',
    changelog: {
      title: 'Logging',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Health
  {
    tag: 'health',
    emoji: ':satellite:',
    displayName: 'Healthchecks',
    description: 'Add, update or remove healthchecks',
    changelog: {
      title: 'Healthchecks',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Business
  {
    tag: 'business',
    emoji: ':necktie:',
    displayName: 'Business',
    description: 'Add, update or remove business logic',
    changelog: {
      title: 'Business Logic',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Auth
  {
    tag: 'auth',
    emoji: ':passport_control:',
    displayName: 'Authentication',
    description: 'Change authentication implementation',
    changelog: {
      title: 'Authentication',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Data models
  {
    tag: 'data/mod',
    emoji: ':notebook_with_decorative_cover:',
    displayName: 'Data Models',
    description: 'Add, update or remove data models',
    changelog: {
      title: 'Data Models',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Database
  {
    tag: 'data/db',
    emoji: ':books:',
    displayName: 'Database',
    description: 'Change database implementation',
    changelog: {
      title: 'Database',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: true,
    },
  },
  // Cache
  {
    tag: 'data/cache',
    emoji: ':clock10:',
    displayName: 'Cache',
    description: 'Change cache implementation',
    changelog: {
      title: 'Cache',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Storage
  {
    tag: 'data/store',
    emoji: ':floppy_disk:',
    displayName: 'Storage',
    description: 'Change storage implementation',
    changelog: {
      title: 'Storage',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
  // Egg
  {
    tag: 'easteregg',
    emoji: ':egg:',
    displayName: 'Easter Egg',
    description: 'Add, update or remove an easter egg',
    changelog: {
      title: 'Easter Egg',
      type: ChangelogDomain.internal,
    },
    versioning: {
      bump: VersionBump.patch,
      canBreak: false,
    },
  },
];
/* eslint-enable max-lines */

/**
 * Gets a category by its tag.
 *
 * @param tag - The tag of the category.
 * @returns The category.
 * @example
 *   const category = getCategory('feat');
 */
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
        type: ChangelogDomain.internal,
      },
      versioning: {
        bump: VersionBump.none,
        canBreak: false,
      },
    }
  );
}
