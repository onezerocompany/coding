import { CommitMessage } from './CommitMessage';

describe('commit message', () => {
  it('all commit message parts should work correctly', () => {
    const issueNumber = 123;
    const commitMessage = new CommitMessage({
      files: ['README.md'],
      category: 'docs',
      scope: 'readme',
      subject: 'add readme to the project',
      breaking: false,
      authors: ['Jane Doe <jane.doe@example.com>'],
      issues: [issueNumber],
      messageBody: 'This is a longer message body.\nThis is a second line.',
      signedOff: 'John Doe <john.doe@example.com>',
    });
    expect(commitMessage.message).toBe(
      `:open_book: docs(readme): add readme to the project
      
      This is a longer message body.
      This is a second line.
      
      Closes #123
      Co-authored-by: Jane Doe <jane.doe@example.com>
      Signed-off-by: John Doe <john.doe@example.com>`
        .split('\n')
        .map((line) => line.trim())
        .join('\n'),
    );
  });
  it('minimal commit should output correct message', () => {
    const commitMessage = new CommitMessage({
      files: ['README.md'],
      category: 'docs',
      scope: 'readme',
      subject: 'add readme to the project',
      breaking: false,
      authors: [],
    });
    expect(commitMessage.message).toBe(
      `:open_book: docs(readme): add readme to the project`,
    );
  });
  it('breaking commit should add exclaimation mark', () => {
    const commitMessage = new CommitMessage({
      files: ['README.md'],
      category: 'docs',
      scope: 'readme',
      subject: 'add readme to the project',
      breaking: true,
      authors: [],
    });
    expect(commitMessage.message).toBe(
      `:open_book: docs(readme)!: add readme to the project`,
    );
  });
  it('display string should be correct', () => {
    const commitMessage = new CommitMessage({
      files: ['README.md'],
      category: 'docs',
      scope: 'readme',
      subject: 'add readme to the project',
      breaking: false,
      authors: ['Jane Doe <jane.doe@example.com>'],
      issues: [1],
    });
    expect(commitMessage.displayString).toBe(
      `
      -------------------------------------------------------
      |                                                     |
      |   📖 docs(readme): add readme to the project        |
      |                                                     |
      |   Closes #1                                         |
      |   Co-authored-by: Jane Doe <jane.doe@example.com>   |
      |                                                     |
      -------------------------------------------------------
      `
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
        .trim(),
    );
  });
});
