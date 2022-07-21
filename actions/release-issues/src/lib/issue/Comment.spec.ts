import { VersionTrack } from '@onezerocompany/commit';
import { Comment } from './Comment';

describe('issue comment', () => {
  const releasingSentences = [
    'release {{track}} track',
    'release track {{track}}',
    'please release the {{track}} track',
    'clear the {{track}} track',
    'clear {{track}} track',
    'mark the {{track}} track as released',
  ];

  for (const track of Object.values(VersionTrack)) {
    for (const sentence of releasingSentences) {
      const comment = new Comment({
        content: sentence.replace('{{track}}', track),
        user: '',
      });
      it(`${comment.content} should be a release comment`, () => {
        expect.assertions(1);
        expect(comment.releasesTrack).toEqual({ releases: true, track });
      });
    }
  }

  const nonReleasingSentences = ['{{track}} track'];

  for (const track of Object.values(VersionTrack)) {
    for (const sentence of nonReleasingSentences) {
      const comment = new Comment({
        content: sentence.replace('{{track}}', track),
        user: '',
      });
      it(`${comment.content} should not be a release comment`, () => {
        expect.assertions(1);
        expect(comment.releasesTrack).toEqual({ releases: false });
      });
    }
  }
});
