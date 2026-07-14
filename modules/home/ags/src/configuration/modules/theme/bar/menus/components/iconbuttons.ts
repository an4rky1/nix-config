import { opt } from '../../../../../../lib/options';
import { secondaryColors } from '../../../colors/secondary';
import { tertiaryColors } from '../../../colors/tertiary';

export default {
    passive: opt(secondaryColors.text),
    active: opt(tertiaryColors.lavender),
};
