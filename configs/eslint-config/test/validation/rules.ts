/**
 * @file Generate rules based on provided plugins and a set of default and banned rules.
 * @copyright Luca Silverentand <luca@onezero.company>
 * @license MIT
 * @author 2022 OneZero Company
 */

const defaultRules = [
  'no',
  'spacing',
  'prefer',
  'assign',
  'return',
  'max',
  'useless',
  'newline',
  'style',
  'func',
];

const bannedRules = [
  'import/',
  'vue/',
  'react/',
  'react-hooks/',
  'jsx-a11y/',
  '@typescript-eslint/',
  '@next/next/',
  'jest/',
];

/**
 * Generates a list of rules that are required and banned.
 *
 * @param plugins - Plugins to generate the rules for.
 * @returns List of required and banned rules generated from the provided plugins.
 * @example
 *   const rules = generateRules(["import", "react"]);
 *
 *   // Returns
 *   const exampleRules = {
 *     required: [
 *       "import/no-unresolved",
 *       "import/named",
 *       "react/jsx-uses-react",
 *       // ... (truncated)
 *     ],
 *     banned: [
 *       "vue/",
 *       "react-hooks/",
 *       "jsx-a11y/",
 *       // ... (truncated)
 *     ],
 *   };
 */
export function rules(plugins: string[]): {
  required: string[];
  banned: string[];
} {
  // Create the list of rules that are required

  const required: string[] = [...plugins.map((rule) => `${rule}/`)];
  // Create a banned rules list by removing the required rules

  const banned = [...bannedRules].filter(
    (rule) => !required.includes(`${rule}/`),
  );

  // Add the default rules to the required list
  required.push(...defaultRules);

  return {
    required,
    banned,
  };
}
