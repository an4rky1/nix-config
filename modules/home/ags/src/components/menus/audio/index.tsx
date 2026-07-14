import DropdownMenu from '../shared/dropdown/index.js';
import { VolumeSliders } from './active/index.js';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import { AvailableDevices } from './available/index.js';
import { RevealerTransitionMap } from '../../settings/constants.js';
import options from '../../../configuration';

export default (): JSX.Element => {
    return (
        <DropdownMenu
            name="audiomenu"
            transition={bind(options.menus.transition).as((transition) => RevealerTransitionMap[transition])}
        >
            <box className={'menu-items audio'} halign={Gtk.Align.FILL} hexpand>
                <box className={'menu-items-container audio'} halign={Gtk.Align.FILL} vertical hexpand>
                    <VolumeSliders />
                    <AvailableDevices />
                </box>
            </box>
        </DropdownMenu>
    );
};
