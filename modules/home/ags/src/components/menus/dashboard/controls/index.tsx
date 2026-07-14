import { Gtk } from 'astal/gtk4';
import {
    BluetoothButton,
    MicrophoneButton,
    NotificationsButton,
    PlaybackButton,
    WifiButton,
} from './ControlButtons';
import { JSXElement } from '../../../../core/types';

export const Controls = ({ isEnabled }: ControlsProps): JSXElement => {
    if (!isEnabled) {
        return null;
    }

    return (
        <box
            className={'dashboard-card controls-container'}
            halign={Gtk.Align.FILL}
            valign={Gtk.Align.FILL}
            expand
        >
            <WifiButton />
            <BluetoothButton />
            <NotificationsButton />
            <PlaybackButton />
            <MicrophoneButton />
        </box>
    );
};

interface ControlsProps {
    isEnabled: boolean;
}
