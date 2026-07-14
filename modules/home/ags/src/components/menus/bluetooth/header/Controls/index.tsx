import { Gtk } from 'astal/gtk4';
import Separator from '../../../../shared/Separator';
import { ToggleSwitch } from './ToggleSwitch';
import { DiscoverButton } from './DiscoverButton';

export const Controls = (): JSX.Element => {
    return (
        <box className="controls-container" valign={Gtk.Align.START}>
            <ToggleSwitch />
            <Separator className="menu-separator bluetooth" />
            <DiscoverButton />
        </box>
    );
};
