import { KbLabelType } from '../../../../../components/bar/modules/kblayout/helpers/types';
import { opt } from '../../../../../lib/options';

export default {
    label: opt(true),
    labelType: opt<KbLabelType>('code'),
    icon: opt('󰌌'),
    leftClick: opt(''),
    rightClick: opt(''),
    middleClick: opt(''),
    scrollUp: opt(''),
    scrollDown: opt(''),
};
