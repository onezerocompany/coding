export interface FileType {
  id: string;
  name: string;
  extensions: string[];
}

export const file_types = [
  {
    id: 'typescript',
    name: 'TypeScript',
    extensions: ['ts', 'tsx'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extensions: ['js', 'jsx'],
  },
  {
    id: 'json',
    name: 'JSON',
    extensions: ['json'],
  },
  {
    id: 'yaml',
    name: 'YAML',
    extensions: ['yaml', 'yml'],
  },
  {
    id: 'markdown',
    name: 'Markdown',
    extensions: ['md', 'markdown'],
  },
];

export function getFileTypeForExtension(
  extension: string,
): FileType | undefined {
  return file_types.find((type) => type.extensions.includes(extension));
}
