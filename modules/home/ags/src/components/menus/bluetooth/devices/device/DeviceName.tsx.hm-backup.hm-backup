import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';

export const DeviceName = ({ device }: DeviceNameProps): JSX.Element => {
    return (
        <label
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.START}
            className="menu-button-name bluetooth"
            truncate
            wrap
            label={bind(device, 'alias')}
        />
    );
};

interface DeviceNameProps {
    device: AstalBluetooth.Device;
}
