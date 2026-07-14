import { opt } from '../../../../../lib/options';
import { SystrayIconMap } from './types';

export default {
    ignore: opt<string[]>([]),
    customIcons: opt<SystrayIconMap>({}),
};
