import type { PromptObject } from 'prompts';

export interface FileItem {
  title: string;
  value: string[];
  selected: boolean;
}

export function filesQuestion(files: FileItem[]): PromptObject {
  return {
    type: 'autocompleteMultiselect',
    name: 'files',
    message: 'Files',
    choices: files,
    min: 1,
    max: 15,
    hint: 'select the files you want to commit',
    format: (items: string[][]) =>
      items.flat().reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) acc.push(item);
        return acc;
      }, []),
  };
}
