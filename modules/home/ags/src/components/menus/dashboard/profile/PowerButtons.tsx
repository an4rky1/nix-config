import { isPrimaryClick } from '../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../lib/shared/eventHandlers';
import { handleClick } from './helpers';
import { PowerOptions } from '../../../../lib/options/types';

const PowerActionButton = (icon: string, tooltip: string, action: PowerOptions): JSX.Element => {
    return (
        <button
            className={`dashboard-button ${action}`}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (isPrimaryClick(event)) {
                        handleClick(action);
                    }
                });
            }}
            tooltip_text={tooltip}
            vexpand
        >
            <label className={'txt-icon'} label={icon} />
        </button>
    );
};

export const ShutDown = (): JSX.Element => {
    return PowerActionButton('󰐥', 'Shut Down', 'shutdown');
};

export const Reboot = (): JSX.Element => {
    return PowerActionButton('󰜉', 'Reboot', 'reboot');
};

export const LogOut = (): JSX.Element => {
    return PowerActionButton('󰿅', 'Log Out', 'logout');
};

export const Sleep = (): JSX.Element => {
    return PowerActionButton('󰤄', 'Sleep', 'sleep');
};
