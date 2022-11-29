/**
 * @file Contains definitions of the changelog settings per environment type.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ChangelogDomain } from '@onezerocompany/commit';
import { EnvironmentType } from '@onezerocompany/project-manager';

/** Declaration of changelog settings per release environment type. */
export const environmentChangelogs: Record<
  EnvironmentType,
  {
    domain: ChangelogDomain;
  }
> = {
  [EnvironmentType.appleAppStore]: {
    domain: ChangelogDomain.external,
  },
  [EnvironmentType.appleTestFlightExternal]: {
    domain: ChangelogDomain.external,
  },
  [EnvironmentType.appleTestFlightInternal]: {
    domain: ChangelogDomain.internal,
  },
  [EnvironmentType.firebaseHosting]: {
    domain: ChangelogDomain.internal,
  },
  [EnvironmentType.githubContainerRegistry]: {
    domain: ChangelogDomain.internal,
  },
  [EnvironmentType.githubNpmRegistry]: {
    domain: ChangelogDomain.internal,
  },
  [EnvironmentType.googlePlay]: {
    domain: ChangelogDomain.external,
  },
  [EnvironmentType.googlePlayTestingClosed]: {
    domain: ChangelogDomain.external,
  },
  [EnvironmentType.googlePlayTestingExternal]: {
    domain: ChangelogDomain.external,
  },
  [EnvironmentType.googlePlayTestingInternal]: {
    domain: ChangelogDomain.internal,
  },
};
