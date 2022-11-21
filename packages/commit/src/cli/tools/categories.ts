/**
 * @file Tools for printing the categories to the console.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { stdout } from 'process';
import Table from 'cli-table';
import { stringify as stringifyYAML } from 'yaml';
import { categories } from '../../lib/categories/categories';
import { emojiForShortcode } from '../../lib/categories/emoji/emoji';

/**
 * Calculates the sizes of the columns for the table.
 *
 * @returns The sizes of the columns.
 * @example
 *   const sizes = markdownTableColumSizes();
 */
function markdownTableColumSizes(): number[] {
  const defaultBreakLength = 9;
  const defaultEmojiLength = 2;
  return categories.reduce(
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
}

/**
 * Generate the header for the markdown table.
 *
 * @param sizes - The sizes of the columns.
 * @returns The header for the categories table.
 * @example
 *   markdownTableHeader();
 */
function markdownTableHeader(sizes: number[]): string[] {
  return [
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
  ];
}

/**
 * Print the categories to the console in a markdown table.
 *
 * @example
 *   printMarkdownTable();
 */
function printMarkdownTable(): void {
  const sizes = markdownTableColumSizes();

  stdout.write(
    `${[
      ...markdownTableHeader(sizes),
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

/**
 * Tool for outputting the categories to the console in different formats.
 *
 * @param options - The options for the tool.
 * @param options.json - Whether to output the categories as JSON.
 * @param options.yaml - Whether to output the categories as YAML.
 * @param options.markdown - Whether to output the categories as a markdown table.
 * @example
 *  // output a json string
 *  tool({ json: true });
 *  // output a yaml string
 *  tool({ yaml: true });
 *  // output a markdown table
 *  tool({ markdown: true });
 */
export function tool(options: {
  json: boolean;
  yaml: boolean;
  markdown: boolean;
}): void {
  if (options.json) {
    const indentSpaces = 2;
    stdout.write(`${JSON.stringify(categories, null, indentSpaces)}\n`);
  } else if (options.yaml) {
    stdout.write(`${stringifyYAML(categories)}\n`);
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
    stdout.write(`${table.toString()}\n`);
  }
}
