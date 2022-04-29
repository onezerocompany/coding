import type { PromptObject } from 'prompts';
import { categoryForTag } from '../../lib/categories/categories';
import { SubjectValidator } from '../../lib/message/validators/SubjectValidator';

let maxLength = 0;
export const subjectQuestion: PromptObject = {
  type: 'text',
  name: 'subject',
  message: 'Subject',
  initial(_, answers: Record<string, unknown>) {
    const { category } = answers;
    const categoryDetails = categoryForTag(category as string);
    const firstLine = `${categoryDetails.emoji} ${categoryDetails.tag}(${
      answers['scope'] as string
    })${answers['breaking'] === true ? '!' : ''}: `;
    maxLength = firstLine.length;
    return '';
  },
  validate(subject: string) {
    return new SubjectValidator({
      subject,
      maxLength,
    }).valid;
  },
  format(subject: string) {
    return new SubjectValidator({
      subject,
      maxLength,
    }).parsed;
  },
};
