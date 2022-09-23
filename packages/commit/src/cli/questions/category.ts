/**
 * @file Prompt object to ask for the category of the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';
import type { CommitCategory } from '../../lib/categories/categories';
import { categories } from '../../lib/categories/categories';
import { emojiForShortcode } from '../../lib/categories/emoji/emoji';

export const categoryQuestion: PromptObject = {
  type: 'autocomplete',
  name: 'category',
  message: 'Category',
  max: 1,
  choices: categories.map((category) => ({
    title: `${emojiForShortcode(category.emoji)} ${category.displayName}`,
    value: category,
    description: category.description,
  })),

  /**
   * Provide suggestions for the user to choose from.
   *
   * @param input - The user's input.
   * @param choices - The choices to choose from.
   * @returns The suggestions.
   * @example categoryQuestion.suggest('feat', choices);
   */
  async suggest(input: string, choices: unknown[]): Promise<unknown[]> {
    return new Promise((resolve) => {
      const filteredChoices = choices.filter(
        (choice: unknown) =>
          (choice as { title: string }).title
            .toLowerCase()
            .includes(input.toLowerCase()) ||
          (choice as { value: CommitCategory }).value.tag.includes(input),
      );
      resolve(filteredChoices);
    });
  },

  /**
   * Format the user's input.
   *
   * @param choice - The user's choice.
   * @returns The formatted choice.
   * @example categoryQuestion.format(choice);
   */
  format: (choice: CommitCategory) => choice.tag,
};
