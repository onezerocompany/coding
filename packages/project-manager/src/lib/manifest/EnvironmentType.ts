/**
 * @file Contains.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Platforms we publish to. */
export enum EnvironmentType {
  /** Firebase Hosting. */
  firebaseHosting = 'firebase-hosting',
  /** Google Play. */
  googlePlay = 'google-play',
  /** Google Play Testing Internal. */
  googlePlayTestingInternal = 'google-play-testing-internal',
  /** Google Play Testing Closed. */
  googlePlayTestingClosed = 'google-play-testing-closed',
  /** Google Play Testing Open. */
  googlePlayTestingExternal = 'google-play-testing-open',
  /** Apple App Store. */
  appleAppStore = 'apple-app-store',
  /** Apple TestFlight Internal. */
  appleTestFlightInternal = 'apple-testflight-internal',
  /** Apple TestFlight External. */
  appleTestFlightExternal = 'apple-testflight-external',
  /** GitHub Container Registry. */
  githubContainerRegistry = 'github-container-registry',
  /** GitHub NPM Registry. */
  githubNpmRegistry = 'github-npm-registry',
}

export const environmentTypes = Object.values(EnvironmentType);
