/**
 * @file Main entry point for the action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import { sharedContext } from './context/sharedContext';

/**
 * Main entry point function for the action.
 *
 * @example await main();
 */
async function main(): Promise<void> {
  await sharedContext.initialize();
  await sharedContext.curentState?.runActions({
    manifest: sharedContext.projectManifest,
    context: sharedContext,
  });
  info('Done.');
}

// eslint-disable-next-line no-void
void main();
