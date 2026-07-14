import { Gtk } from 'astal/gtk4';

export const BluetoothDisabled = (): JSX.Element => {
    return (
        <box
            className={'bluetooth-items'}
            vertical
            expand
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.CENTER}
        >
            <label className={'bluetooth-disabled dim'} hexpand label={'Bluetooth is disabled'} />
        </box>
    );
};
