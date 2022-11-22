/**
 * @file Main entry point for the action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { Context } from './context/Context';

/**
 * Main entry point function for the action.
 *
 * @example await main();
 */
async function main(): Promise<void> {
  await Context.default.initialize();
  await Context.default.curentState?.executeNextAction();
}

// eslint-disable-next-line no-void
void main();
