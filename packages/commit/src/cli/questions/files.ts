/**
 * @file Prompt object to ask for the files to commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';

/** Object representing a file that was changed, added or deleted. */
export interface FileItem {
  /** The name of the file (including extension). */
  title: string;
  /** List of files related to this file entry, can be multiple in case of a rename. */
  value: string[];
  /** Whether the file was selected by the user or not. */
  selected: boolean;
}

/**
 * Create a prompt object based on a list of files.
 *
 * @param files - The list of files to create the prompt object for.
 * @returns The prompt object.
 * @example
 *   const files = [
 *     'example.ts',
 *   ]
 *   const prompt = filesQuestion(files)
 */
export function filesQuestion(files: FileItem[]): PromptObject {
  return {
    type: 'autocompleteMultiselect',
    name: 'files',
    message: 'Files',
    choices: files,
    min: 1,
    hint: 'select the files you want to commit',
    /**
     * Formats the user's input.
     *
     * @param items - The user's input.
     * @returns The formatted input.
     * @example filesQuestion.format(items);
     */
    format: (items: string[][]) =>
      items.flat().reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) acc.push(item);
        return acc;
      }, []),
  };
}
