import { VersionTrack } from '@onezerocompany/commit';

const releasingSentences = [
  ['release', 'track', '{{track}}'],
  ['clear', '{{track}}', 'track'],
];
const negativeWords = ['no', 'not', "don't", 'do not'];

export class Comment {
  public content: string;
  public user: string;

  public constructor(inputs: { content: string; user: string }) {
    this.content = inputs.content;
    this.user = inputs.user;
  }

  public get releasesTrack(): { releases: boolean; track?: VersionTrack } {
    // loop through possible tracks
    for (const track of Object.values(VersionTrack)) {
      const trackReleaseSentences = releasingSentences.map((words) =>
        words.map((word) => word.replace('{{track}}', track)),
      );

      const sentenceIsNegated = negativeWords.some((negativeWord) =>
        this.content.includes(negativeWord),
      );

      for (const sentence of trackReleaseSentences) {
        /*
         * check if the comment contains the words in the sentence in the correct order
         * also any other words in the sentence are ignored
         */
        const sentenceIsInComment = sentence.every((word) =>
          this.content.includes(word),
        );
        if (sentenceIsInComment && !sentenceIsNegated) {
          return { releases: true, track };
        }
      }
    }
    return { releases: false };
  }
}
