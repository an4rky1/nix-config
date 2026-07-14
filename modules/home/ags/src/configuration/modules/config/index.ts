import { opt } from '../../../lib/options';
import { ScalingPriority } from '../../../lib/options/types';
import bar from './bar';
import notifications from './notifications';
import menus from './menus';

export default {
    scalingPriority: opt<ScalingPriority>('gdk'),
    terminal: opt('$TERM'),
    tear: opt(false),
    wallpaper: {
        enable: opt(true),
        image: opt(''),
        pywal: opt(false),
    },
    hyprpanel: {
        restartAgs: opt(true),
        restartCommand: opt('hyprpanel -q; hyprpanel'),
        useLazyLoading: opt(true),
    },
    dummy: opt(true),
    bar,
    menus,
    notifications,
};
