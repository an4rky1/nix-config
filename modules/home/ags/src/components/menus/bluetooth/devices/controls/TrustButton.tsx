import { bind } from 'astal';
import { ActionButton } from './ActionButton';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { isPrimaryClick } from '../../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../../lib/shared/eventHandlers';

export const TrustButton = ({ device }: TrustButtonProps): JSX.Element => {
    return (
        <ActionButton
            name={'untrust'}
            tooltipText={bind(device, 'trusted').as((trusted) => (trusted ? 'Untrust' : 'Trust'))}
            label={bind(device, 'trusted').as((trusted) => (trusted ? '' : '󱖡'))}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (isPrimaryClick(event)) {
                        device.set_trusted(!device.trusted);
                    }
                });
            }}
        />
    );
};

interface TrustButtonProps {
    device: AstalBluetooth.Device;
}
