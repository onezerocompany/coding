/**
 * @file Main entry point for the action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import { sharedContext } from './context/sharedContext';
import { setOutputs } from './utils/setOutputs';

/**
 * Main entry point function for the action.
 *
 * @example await main();
 */
async function main(): Promise<void> {
  await sharedContext.initialize();
  await sharedContext.curentState?.runActions({
    context: sharedContext,
  });
  if (sharedContext.curentState)
    setOutputs({ release: sharedContext.curentState });
  info('Done.');
}

// eslint-disable-next-line no-void
void main();
