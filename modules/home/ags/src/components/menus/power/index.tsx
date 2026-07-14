import PopupWindow from '../shared/popup/index.js';
import powermenu from './helpers/actions.js';
import icons from '../../../lib/icons/icons.js';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import Icon from '../../shared/Icon';
import { RevealerTransitionMap } from '../../settings/constants.js';
import options from '../../../configuration';
import { isPrimaryClick } from '../../../lib/events/mouse';
import { Action } from './types';

const { transition } = options.menus;

const SysButton = ({ action, label }: SysButtonProps): JSX.Element => {
    return (
        <button
            className={`widget-button powermenu-button-${action}`}
            onClicked={(_, event) => {
                if (isPrimaryClick(event)) {
                    powermenu.action(action);
                }
            }}
        >
            <box className={'system-button widget-box'} vertical vexpand valign={Gtk.Align.FILL}>
                <Icon
                    className={`system-button_icon txt-icon ${action}`}
                    icon={icons.powermenu[action]}
                    vexpand
                />
                <label className={`system-button_label ${action}`} label={label} vexpand />
            </box>
        </button>
    );
};

export default (): JSX.Element => (
    <PopupWindow
        name={'powermenu'}
        transition={bind(transition).as((transition) => RevealerTransitionMap[transition])}
    >
        <box className={'powermenu horizontal'}>
            <SysButton action={'shutdown'} label={'SHUTDOWN'} />
            <SysButton action={'logout'} label={'LOG OUT'} />
            <SysButton action={'reboot'} label={'REBOOT'} />
            <SysButton action={'sleep'} label={'SLEEP'} />
        </box>
    </PopupWindow>
);

interface SysButtonProps {
    action: Action;
    label: string;
}
