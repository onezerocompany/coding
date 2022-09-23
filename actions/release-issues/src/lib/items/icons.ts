/**
 * @file List of emojis to use for the release action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

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
  [ItemStatus.awaitingItem]: { icon: '🚦', code: 'vertical_traffic_light' },
  [ItemStatus.pending]: { icon: '⏳', code: 'hourglass_flowing_sand' },
  [ItemStatus.skipped]: { icon: '⏭️', code: 'next_track_button' },
  [ItemStatus.unknown]: { icon: '❓', code: 'question' },
};
