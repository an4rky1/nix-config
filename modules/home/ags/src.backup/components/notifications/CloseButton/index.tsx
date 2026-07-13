import { Gtk } from 'astal/gtk4';
import AstalNotifd from 'gi://AstalNotifd?version=0.1';

export const CloseButton = ({ notification }: CloseButtonProps): JSX.Element => {
    return (
        <button
            className={'close-notification-button'}
            onClicked={() => {
                notification.dismiss();
            }}
        >
            <label className={'txt-icon notification-close'} label={'󰅜'} halign={Gtk.Align.CENTER}></label>
        </button>
    );
};

interface CloseButtonProps {
    notification: AstalNotifd.Notification;
}
