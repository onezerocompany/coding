import { categoryForTag } from '../categories/categories';
import { parseMessage } from './parseMessage';

describe('message parsing', () => {
  it('should parse a message with a single line', () => {
    const message = ':open_book: docs(readme): add readme to the project';
    const parsed = parseMessage(message);
    expect(parsed).toEqual({
      category: categoryForTag('docs'),
      scope: 'readme',
      subject: 'add readme to the project',
      messageBody: '',
      breaking: false,
      issues: [],
      coAuthors: [],
      files: [],
      signedOff: '',
      formatted: true,
    });
  });
  it('should parse a breaking message with a single line', () => {
    const message = ':open_book: docs(readme)!: add readme to the project';
    const parsed = parseMessage(message);
    expect(parsed).toEqual({
      category: categoryForTag('docs'),
      scope: 'readme',
      subject: 'add readme to the project',
      messageBody: '',
      breaking: true,
      issues: [],
      coAuthors: [],
      files: [],
      signedOff: '',
      formatted: true,
    });
  });
  it('should parse a message with multiple lines', () => {
    const commitMessage = `:open_book: docs(readme): add readme to the project

      This is a longer message body.
      This is a second line.

      Closes #123
      Co-authored-by: Cookie Dough <cookie.dough@example.com>
      Co-authored-by: John Doe <john.doe@example.com>
      Signed-off-by: Jane Doe <jane.doe@example.com>
      `
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    const parsed = parseMessage(commitMessage);
    const issueNumber = 123;
    expect(parsed).toEqual({
      category: categoryForTag('docs'),
      scope: 'readme',
      subject: 'add readme to the project',
      messageBody: `This is a longer message body.
      This is a second line.`
        .split('\n')
        .map((line) => line.trim())
        .join('\n'),
      breaking: false,
      issues: [issueNumber],
      coAuthors: [
        'Cookie Dough <cookie.dough@example.com>',
        'John Doe <john.doe@example.com>',
      ],
      files: [],
      signedOff: 'Jane Doe <jane.doe@example.com>',
      formatted: true,
    });
  });
  it('first line reader should handle empty line', () => {
    const parsed = parseMessage('');
    expect(parsed).toEqual({
      category: categoryForTag('unknown'),
      scope: '',
      subject: '',
      messageBody: '',
      breaking: false,
      issues: [],
      coAuthors: [],
      files: [],
      signedOff: '',
      formatted: false,
    });
  });
  it('should parse multiple issues correctly', () => {
    const commitMessage = `:open_book: docs(readme): add readme to the project

      This is a longer message body.
      This is a second line.

      Closes #123
      Fixes #456
    `
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    const parsed = parseMessage(commitMessage);
    const issueNumber = 123;
    const issueNumber2 = 456;
    expect(parsed).toEqual({
      category: categoryForTag('docs'),
      scope: 'readme',
      subject: 'add readme to the project',
      messageBody: `This is a longer message body.
      This is a second line.`
        .split('\n')
        .map((line) => line.trim())
        .join('\n'),
      breaking: false,
      issues: [issueNumber, issueNumber2],
      coAuthors: [],
      files: [],
      signedOff: '',
      formatted: true,
    });
  });
});
