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
  format: (choice: CommitCategory) => choice.tag,
};
