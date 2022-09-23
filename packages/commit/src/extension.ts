/**
 * @file This file is the entry point for the extension.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { ExtensionContext } from 'vscode';
import { commands } from 'vscode';

/**
 * Activation function for the extension.
 *
 * @param context - The extension context.
 * @example activate(context);
 */
export function activate(context: ExtensionContext): void {
  /** Listen for the creation command. */
  const disposable = commands.registerCommand(
    'onezero-commit.createCommit',
    async () => {
      // Start with running the pre-commit hook.
    },
  );

  context.subscriptions.push(disposable);
}
