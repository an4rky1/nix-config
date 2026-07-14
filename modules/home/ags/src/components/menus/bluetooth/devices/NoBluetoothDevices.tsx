import { Gtk } from 'astal/gtk4';

export const NoBluetoothDevices = (): JSX.Element => {
    return (
        <box
            className={'bluetooth-items'}
            vertical
            expand
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.CENTER}
        >
            <label className={'no-bluetooth-devices dim'} hexpand label={'No devices currently found'} />
            <label className={'search-bluetooth-label dim'} hexpand label={"Press '󰑐' to search"} />
        </box>
    );
};
