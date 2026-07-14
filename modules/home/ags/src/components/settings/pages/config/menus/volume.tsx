import { Option } from '../../../shared/Option';
import { Header } from '../../../shared/Header';
import options from '../../../../../configuration';
import { Gtk } from 'astal/gtk4';

import Scrollable from '../../../../shared/Scrollable';

export const VolumeMenuSettings = (): JSX.Element => {
    return (
        <Scrollable name={'Volume'} vscroll={Gtk.PolicyType.AUTOMATIC}>
            <box className="bar-theme-page paged-container" vertical>
                <Header title="Volume" />
                <Option
                    opt={options.menus.volume.raiseMaximumVolume}
                    title="Allow Raising Volume Above 100%"
                    subtitle="Allows up to 150% volume"
                    type="boolean"
                />
            </box>
        </Scrollable>
    );
};
