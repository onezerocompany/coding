import { ItemStatus } from './ItemStatus';

export const icons: {
  [key in ItemStatus]: {
    icon: string;
    code: string;
  };
} = {
  [ItemStatus.succeeded]: { icon: '✅', code: 'white_check_mark' },
  [ItemStatus.failed]: { icon: '❌', code: 'x' },
  [ItemStatus.inProgress]: { icon: '🔄', code: 'arrows_counterclockwise' },
  [ItemStatus.pending]: { icon: '⏳', code: 'hourglass_flowing_sand' },
  [ItemStatus.skipped]: { icon: '⏭️', code: 'next_track_button' },
  [ItemStatus.unknown]: { icon: '❓', code: 'question_mark' },
};
