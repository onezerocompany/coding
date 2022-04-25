import { IssuesValidator } from './IssuesValidator';

describe('issues validator', () => {
  it('should accept correct format', () => {
    const validator = new IssuesValidator('1, 2, 3');
    expect(validator.valid).toBe(true);
    expect(validator.errors).toEqual([]);
  });
  it('should accept correct format without spacing', () => {
    const validator = new IssuesValidator('1,2,3');
    expect(validator.valid).toBe(true);
    expect(validator.errors).toEqual([]);
  });
  it('should accept empty as valid', () => {
    const validator = new IssuesValidator('');
    expect(validator.valid).toBe(true);
    expect(validator.errors).toEqual([]);
  });
  it('should accept single issue', () => {
    const validator = new IssuesValidator('1');
    expect(validator.valid).toBe(true);
    expect(validator.errors).toEqual([]);
  });
  it('should decline incorrect format', () => {
    const validator = new IssuesValidator('1-2-14');
    expect(validator.valid).toBe(
      '❗️ fatal - invalid format for issue: 1-2-14',
    );
    expect(validator.errors).toEqual([
      {
        level: 'fatal',
        message: 'invalid format for issue: 1-2-14',
      },
    ]);
  });
  it('should normalize correctly', () => {
    const validator = new IssuesValidator('1, 2, 3');
    expect(validator.normalized).toBe('1,2,3');
  });
  it('should parse issues correctly', () => {
    const firstIssue = 1;
    const secondIssue = 86;
    const thirdIssue = 31;
    const validator = new IssuesValidator(
      `${firstIssue}, ${secondIssue}, ${thirdIssue}`,
    );
    expect(validator.parsed).toEqual([firstIssue, secondIssue, thirdIssue]);
  });
});
