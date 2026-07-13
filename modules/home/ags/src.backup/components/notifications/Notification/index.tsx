import AstalNotifd from 'gi://AstalNotifd?version=0.1';
import { Gtk, Widget } from 'astal/gtk4';
import { isSecondaryClick } from 'src/lib/events/mouse';
import { onSecondaryClick } from 'src/lib/shared/eventHandlers';
import { Actions } from '../Actions';
import { Body } from '../Body';
import { CloseButton } from '../CloseButton';
import { Header } from '../Header';
import { notifHasImg } from '../helpers';
import { Image } from '../Image';

const NotificationContent = ({ actionBox, notification }: NotificationContentProps): JSX.Element => {
    return (
        <box
            className={`notification-card-content ${!notifHasImg(notification) ? 'noimg' : ''}`}
            hexpand
            vertical
        >
            <Header notification={notification} />
            <Body notification={notification} />
            {actionBox}
        </box>
    );
};

export const NotificationCard = ({
    notification,
    showActions,
    ...props
}: NotificationCardProps): JSX.Element => {
    let actionBox: ActionBox | null;

    if (notification.get_actions().length) {
        actionBox = <Actions notification={notification} showActions={showActions} />;
    } else {
        actionBox = null;
    }

    return (
        <box
            setup={(self) => {
                onSecondaryClick(self, (_, event) => {
                    if (isSecondaryClick(event)) {
                        notification.dismiss();
                    }
                });
            }}
            onHover={() => {
                if (actionBox !== null && showActions === true) {
                    actionBox.revealChild = true;
                }
            }}
            onHoverLost={() => {
                if (actionBox !== null && showActions === true) {
                    actionBox.revealChild = false;
                }
            }}
        >
            <box className={'notification-card'} {...props} hexpand valign={Gtk.Align.START}>
                <Image notification={notification} />
                <NotificationContent notification={notification} actionBox={actionBox} />
                <CloseButton notification={notification} />
            </box>
        </box>
    );
};

interface NotificationCardProps extends Widget.BoxProps {
    notification: AstalNotifd.Notification;
    showActions: boolean;
}

interface ActionBox extends Gtk.Widget {
    revealChild?: boolean;
}

interface NotificationContentProps {
    actionBox: ActionBox | null;
    notification: AstalNotifd.Notification;
}
