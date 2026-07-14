import { bind } from 'astal';
import { ActionButton } from './ActionButton';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { isPrimaryClick } from '../../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../../lib/shared/eventHandlers';

export const ConnectButton = ({ device }: ConnectButtonProps): JSX.Element => {
    return (
        <ActionButton
            name={'disconnect'}
            tooltipText={bind(device, 'connected').as((connected) => (connected ? 'Disconnect' : 'Connect'))}
            label={bind(device, 'connected').as((connected) => (connected ? '󱘖' : ''))}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (isPrimaryClick(event) && device.connected) {
                        device.disconnect_device((res) => {
                            console.info(res);
                        });
                    } else {
                        device.connect_device((res) => {
                            console.info(res);
                        });
                    }
                });
            }}
        />
    );
};

interface ConnectButtonProps {
    device: AstalBluetooth.Device;
}
