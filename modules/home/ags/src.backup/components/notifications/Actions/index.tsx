import { execAsync } from 'astal';
import { Gtk } from 'astal/gtk4';
import AstalNotifd from 'gi://AstalNotifd?version=0.1';
import { isPrimaryClick } from 'src/lib/events/mouse';
import { onPrimaryClick } from 'src/lib/shared/eventHandlers';

const ActionButton = ({ notification, action }: ActionButtonProps): JSX.Element => {
    return (
        <button
            className={'notification-action-buttons'}
            hexpand
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (!isPrimaryClick(event)) {
                        return;
                    }

                    if (action.id.includes('scriptAction:-')) {
                        execAsync(`${action.id.replace('scriptAction:-', '')}`).catch((err) =>
                            console.error(err),
                        );
                        notification.dismiss();
                    } else {
                        notification.invoke(action.id);
                        notification.dismiss();
                    }
                });
            }}
        >
            <box halign={Gtk.Align.CENTER} hexpand>
                <label
                    className={'notification-action-buttons-label'}
                    label={action.label}
                    hexpand
                    max_width_chars={15}
                    truncate
                    wrap
                />
            </box>
        </button>
    );
};

export const Actions = ({ notification, showActions }: ActionProps): JSX.Element => {
    return (
        <revealer
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
            revealChild={showActions ? false : true}
        >
            <box>
                <box className={'notification-card-actions'} hexpand valign={Gtk.Align.END}>
                    {notification.get_actions().map((action) => {
                        return <ActionButton notification={notification} action={action} />;
                    })}
                </box>
            </box>
        </revealer>
    );
};

interface ActionProps {
    notification: AstalNotifd.Notification;
    showActions: boolean;
}

interface ActionButtonProps {
    notification: AstalNotifd.Notification;
    action: AstalNotifd.Action;
}
