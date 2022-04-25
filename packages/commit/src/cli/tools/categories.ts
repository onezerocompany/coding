import Table from 'cli-table';
import { stringify as stringifyYAML } from 'yaml';
import { categories } from '../../lib/categories/categories';
import { emojiForShortcode } from '../../lib/categories/emoji/emoji';

// eslint-disable-next-line max-lines-per-function
function printMarkdownTable(): void {
  const defaultBreakLength = 9;
  const defaultEmojiLength = 2;
  const sizes = categories.reduce(
    (acc, category) => {
      if (category.tag.length > (acc[1] ?? 0)) acc[1] = category.tag.length;
      if (category.displayName.length > (acc[2] ?? 0))
        acc[2] = category.displayName.length;
      if (category.description.length > (acc[3] ?? 0))
        acc[3] = category.description.length;
      if (category.versioning.bump.length > (acc[4] ?? 0))
        acc[4] = category.versioning.bump.length;
      return acc;
    },
    [defaultEmojiLength, 0, 0, 0, 0, defaultBreakLength],
  );

  process.stdout.write(
    `${[
      `|    | ${'Tag'.padEnd(sizes[1] ?? 0)} | ${'Name'.padEnd(
        sizes[2] ?? 0,
      )} | ${'Description'.padEnd(sizes[3] ?? 0)} | ${'Bump'.padEnd(
        sizes[4] ?? 0,
      )} | ${'Can Break'.padEnd(sizes[5] ?? 0, '-')} |`,
      `| -- | ${'-'.padEnd(sizes[1] ?? 0, '-')} | ${'-'.padEnd(
        sizes[2] ?? 0,
        '-',
      )} | ${'-'.padEnd(sizes[3] ?? 0, '-')} | ${'-'.padEnd(
        sizes[4] ?? 0,
        '-',
      )} | ${'-'.padEnd(sizes[5] ?? 0, '-')} |`,
      ...categories.map((category) =>
        [
          '',
          emojiForShortcode(category.emoji).padEnd(sizes[0] ?? 0),
          category.tag.padEnd(sizes[1] ?? 0),
          category.displayName.padEnd(sizes[2] ?? 0),
          category.description.padEnd(sizes[3] ?? 0),
          category.versioning.bump.padEnd(sizes[4] ?? 0),
          (category.versioning.canBreak ? 'Yes' : 'No').padEnd(sizes[5] ?? 0),
          '',
        ]
          .join(' | ')
          .trim(),
      ),
    ].join('\n')}\n`,
  );
}

// eslint-disable-next-line max-lines-per-function
export function tool(options: {
  json: boolean;
  yaml: boolean;
  markdown: boolean;
}): void {
  if (options.json) {
    const indentSpaces = 2;
    process.stdout.write(`${JSON.stringify(categories, null, indentSpaces)}\n`);
  } else if (options.yaml) {
    process.stdout.write(`${stringifyYAML(categories)}\n`);
  } else if (options.markdown) {
    printMarkdownTable();
  } else {
    const table = new Table({
      head: ['', 'Tag', 'Name', 'Description', 'Bump', 'Can Break'],
    });
    for (const category of categories) {
      table.push([
        emojiForShortcode(category.emoji),
        category.tag,
        category.displayName,
        category.description,
        category.versioning.bump,
        category.versioning.canBreak ? 'Yes' : 'No',
      ]);
    }
    process.stdout.write(`${table.toString()}\n`);
  }
}
