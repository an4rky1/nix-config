import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import { RevealerTransitionMap } from '../../settings/constants.js';
import options from '../../../configuration';
import DropdownMenu from '../shared/dropdown/index.js';
import { Brightness } from './brightness/index.js';
import { EnergyProfiles } from './profiles/index.js';

const { transition } = options.menus;

export default (): JSX.Element => {
    return (
        <DropdownMenu
            name={'energymenu'}
            transition={bind(transition).as((transition) => RevealerTransitionMap[transition])}
        >
            <box className={'menu-items energy'} halign={Gtk.Align.FILL} hexpand>
                <box className={'menu-items-container energy'} halign={Gtk.Align.FILL} hexpand vertical>
                    <Brightness />
                    <EnergyProfiles />
                </box>
            </box>
        </DropdownMenu>
    );
};
