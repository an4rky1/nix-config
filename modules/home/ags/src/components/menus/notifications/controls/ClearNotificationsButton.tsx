import { bind } from 'astal';
import AstalNotifd from 'gi://AstalNotifd?version=0.1';
import options from '../../../../configuration';
import { isPrimaryClick } from '../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../lib/shared/eventHandlers';
import { clearNotifications, removingNotifications } from '../../../../lib/shared/notifications';

const notifdService = AstalNotifd.get_default();

const { clearDelay } = options.notifications;

export const ClearNotificationsButton = (): JSX.Element => {
    return (
        <button
            className={'clear-notifications-button'}
            tooltipText={'Clear Notifications'}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (!isPrimaryClick(event)) {
                        return;
                    }

                    if (removingNotifications.get() === true) {
                        return;
                    }

                    clearNotifications(notifdService.get_notifications(), clearDelay.get());
                });
            }}
        >
            <label
                className={bind(removingNotifications).as((removing) => {
                    return removing === true
                        ? 'clear-notifications-label txt-icon removing'
                        : 'clear-notifications-label txt-icon';
                })}
                label={''}
            />
        </button>
    );
};
