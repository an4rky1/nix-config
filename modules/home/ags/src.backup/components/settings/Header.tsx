import { App, Gtk } from 'astal/gtk4';
import icons from 'src/lib/icons/icons';
import options from 'src/configuration';
import Icon from 'src/components/shared/Icon';
import { isPrimaryClick } from 'src/lib/events/mouse';

export const Header = (): JSX.Element => {
    return (
        <centerbox className="header">
            <button
                className="reset"
                onClicked={(_, event) => {
                    if (isPrimaryClick(event)) {
                        options.reset();
                    }
                }}
                tooltipText={'Reset All Settings'}
                halign={Gtk.Align.START}
                valign={Gtk.Align.START}
            >
                <Icon icon={icons.ui.refresh} />
            </button>
            <box />
            <button
                className="close"
                halign={Gtk.Align.END}
                valign={Gtk.Align.START}
                onClicked={(_, event) => {
                    if (isPrimaryClick(event)) {
                        App.get_window('settings-dialog')?.set_visible(false);
                    }
                }}
            >
                <Icon icon={icons.ui.close} />
            </button>
        </centerbox>
    );
};
