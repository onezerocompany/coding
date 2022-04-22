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

function rules(plugins: string[]): {
  required: string[];
  banned: string[];
} {
  // create the list of rules that are required
  const required: string[] = [...plugins.map((rule) => `${rule}/`)];
  // create a banned rules list by removing the required rules
  const banned = [...bannedRules].filter(
    (rule) => !required.includes(`${rule}/`),
  );

  // add the default rules to the required list
  required.push(...defaultRules);

  return {
    required,
    banned,
  };
}

export { rules };
