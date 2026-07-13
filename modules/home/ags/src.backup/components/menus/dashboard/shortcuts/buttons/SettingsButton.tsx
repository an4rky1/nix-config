import { App, Gdk, Gtk } from 'astal/gtk4';
import { SettingsDialogLoader } from 'src/components/settings/lazyLoader';
import { onPrimaryClick } from 'src/lib/shared/eventHandlers';

export const SettingsButton = (): JSX.Element => {
    return (
        <button
            className={'dashboard-button'}
            tooltipText={'HyprPanel Configuration'}
            vexpand
            setup={(self) => {
                onPrimaryClick(self, async (_, event) => {
                    const buttonClicked = event.get_button()[1];

                    if (buttonClicked !== Gdk.BUTTON_PRIMARY) {
                        return;
                    }

                    App.get_window('dashboardmenu')?.set_visible(false);
                    const loader = SettingsDialogLoader.getInstance();
                    await loader.toggle();
                });
            }}
        >
            <label className={'button-label txt-icon'} label={'󰒓'} />
        </button>
    );
};
