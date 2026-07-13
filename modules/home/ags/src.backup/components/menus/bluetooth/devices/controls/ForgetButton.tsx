import { ActionButton } from './ActionButton';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { forgetBluetoothDevice } from '../helpers';
import { isPrimaryClick } from 'src/lib/events/mouse';
import { onPrimaryClick } from 'src/lib/shared/eventHandlers';

export const ForgetButton = ({ device }: ForgetButtonProps): JSX.Element => {
    return (
        <ActionButton
            name={'delete'}
            tooltipText={'Forget'}
            label={'󰆴'}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (isPrimaryClick(event)) {
                        forgetBluetoothDevice(device);
                    }
                });
            }}
        />
    );
};

interface ForgetButtonProps {
    device: AstalBluetooth.Device;
}
