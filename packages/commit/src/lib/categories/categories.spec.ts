import githubEmoji from './emoji/github.json';
import type { CommitCategory } from './categories';
import { categories } from './categories';
import { emojiForShortcode } from './emoji/emoji';

describe('categories', () => {
  for (const category of categories.reduce<CommitCategory[]>((acc, curr) => {
    if (!acc.some((check: CommitCategory) => check.tag === curr.tag)) {
      acc.push(curr);
    }
    return acc;
  }, [])) {
    describe(`${category.displayName}`, () => {
      it('tag is unique', () => {
        expect.assertions(1);
        expect(
          categories.filter(
            (matchCategory) =>
              // eslint-disable-next-line jest/no-conditional-in-test
              matchCategory.tag === category.tag,
          ),
        ).toHaveLength(1);
      });
      it('description is unique', () => {
        expect.assertions(1);
        expect(
          categories.filter(
            (matchCategory) =>
              // eslint-disable-next-line jest/no-conditional-in-test
              matchCategory.description === category.description,
          ),
        ).toHaveLength(1);
      });
      it('tag is between 3 and 10 characters', () => {
        expect.hasAssertions();
        const maxTagLength = 10;
        expect(category.tag.length).toBeLessThanOrEqual(maxTagLength);
        const minTagLength = 3;
        expect(category.tag.length).toBeGreaterThanOrEqual(minTagLength);
      });
      it('description should be between 10 and 50 characters', () => {
        expect.hasAssertions();
        const maxDescriptionLength = 50;
        expect(category.description.length).toBeLessThanOrEqual(
          maxDescriptionLength,
        );
        const minDescriptionLength = 10;
        expect(category.description.length).toBeGreaterThanOrEqual(
          minDescriptionLength,
        );
      });
      it('emoji is unique', () => {
        expect.assertions(1);
        expect(
          categories.filter(
            (matchCategory) =>
              // eslint-disable-next-line jest/no-conditional-in-test
              matchCategory.emoji === category.emoji,
          ),
        ).toHaveLength(1);
      });
      it('emoji is in github emoji list', () => {
        expect.assertions(1);
        expect(
          (githubEmoji as Record<string, string>)[
            category.emoji.replaceAll(':', '')
          ],
        ).toBeDefined();
      });
      it('emoji shortcode resolves to unicode emoji', () => {
        expect.assertions(1);
        expect(emojiForShortcode(category.emoji)).not.toBe('?');
      });
    });
  }
});
