import { parseCommitLine } from './CommitLineRegex';

describe('commit line regex', () => {
  it('should match a commit line with github emoji', () => {
    const line = ':star: feat/new(global) add new feature';
    const parsed = parseCommitLine(line);
    expect(parsed.match).toBe(true);
    expect(parsed.githubEmoji).toBe(':star:');
    expect(parsed.emoji).toBeUndefined();
    expect(parsed.category).toBe('feat/new');
    expect(parsed.scope).toBe('global');
    expect(parsed.subject).toBe('add new feature');
    expect(parsed.breaking).toBe(false);
  });
  it('should match a breaking commit line with emoji', () => {
    const line = '⭐️ feat/new(global)! add new feature';
    const parsed = parseCommitLine(line);
    expect(parsed.match).toBe(true);
    expect(parsed.githubEmoji).toBeUndefined();
    expect(parsed.emoji).toBe('⭐️');
    expect(parsed.category).toBe('feat/new');
    expect(parsed.scope).toBe('global');
    expect(parsed.subject).toBe('add new feature');
    expect(parsed.breaking).toBe(true);
  });
  it('should match a commit line with a colon', () => {
    const line = '⭐️ feat/new(global): add new feature';
    const parsed = parseCommitLine(line);
    expect(parsed.match).toBe(true);
    expect(parsed.githubEmoji).toBeUndefined();
    expect(parsed.emoji).toBe('⭐️');
    expect(parsed.category).toBe('feat/new');
    expect(parsed.scope).toBe('global');
    expect(parsed.subject).toBe('add new feature');
    expect(parsed.breaking).toBe(false);
  });
  it('should match a commit line with a colon and a breaking change', () => {
    const line = ':star: feat/new(global)!: add new feature';
    const parsed = parseCommitLine(line);
    expect(parsed.match).toBe(true);
    expect(parsed.githubEmoji).toBe(':star:');
    expect(parsed.emoji).toBeUndefined();
    expect(parsed.category).toBe('feat/new');
    expect(parsed.scope).toBe('global');
    expect(parsed.subject).toBe('add new feature');
    expect(parsed.breaking).toBe(true);
  });
  it('should not match a merge commit', () => {
    const line = "Merge branch 'master' into develop";
    const parsed = parseCommitLine(line);
    expect(parsed.match).toBe(false);
  });
  it('should not match an empty line', () => {
    const line = '';
    const parsed = parseCommitLine(line);
    expect(parsed.match).toBe(false);
    expect(parsed.githubEmoji).toBeUndefined();
    expect(parsed.emoji).toBeUndefined();
    expect(parsed.category).toBeUndefined();
    expect(parsed.scope).toBeUndefined();
    expect(parsed.subject).toBeUndefined();
    expect(parsed.breaking).toBe(false);
  });
});
