import { App, Gtk } from 'astal/gtk4';
import { BarEventMarginsProps, EventBoxPaddingProps } from './types';

const EventBoxPadding = ({ className, windowName }: EventBoxPaddingProps): JSX.Element => {
    return (
        <box
            className={className}
            hexpand
            vexpand={false}
            canFocus={false}
            setup={(self) => {
                const gesture = new Gtk.GestureClick();
                gesture.connect('pressed', () => App.toggle_window(windowName));
                self.add_controller(gesture);
            }}
        >
            <box />
        </box>
    );
};

export const BarEventMargins = ({ windowName, location = 'top' }: BarEventMarginsProps): JSX.Element => {
    if (location === 'top') {
        return (
            <box className="event-box-container">
                <EventBoxPadding className="mid-eb event-top-padding-static" windowName={windowName} />
                <EventBoxPadding className="mid-eb event-top-padding" windowName={windowName} />
            </box>
        );
    } else {
        return (
            <box className="event-box-container">
                <EventBoxPadding className="mid-eb event-bottom-padding-static" windowName={windowName} />
            </box>
        );
    }
};
