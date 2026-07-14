import { opt } from '../../../../../lib/options';
import { UnitType } from '../../../../../lib/units/temperature/types';

export default {
    icon: opt(''),
    sensor: opt('auto'),
    label: opt(true),
    round: opt(true),
    showUnit: opt(true),
    unit: opt<UnitType>('metric'),
    pollingInterval: opt(2000),
    leftClick: opt(''),
    rightClick: opt(''),
    middleClick: opt(''),
    scrollUp: opt(''),
    scrollDown: opt(''),
};
