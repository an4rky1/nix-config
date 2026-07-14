import { Option } from '../../../shared/Option';
import { Header } from '../../../shared/Header';

import options from '../../../../../configuration';
import { Gtk } from 'astal/gtk4';

import Scrollable from '../../../../shared/Scrollable';

export const PowerMenuTheme = (): JSX.Element => {
    return (
        <Scrollable
            name={'Power Menu'}
            className="menu-theme-page power paged-container"
            vscroll={Gtk.PolicyType.AUTOMATIC}
            hscroll={Gtk.PolicyType.AUTOMATIC}
            vexpand={true}
        >
            <box vertical>
                {/* Background Section */}
                <Header title="Background" />
                <Option
                    opt={options.theme.bar.menus.menu.power.background.color}
                    title="Background"
                    type="color"
                />

                {/* Border Section */}
                <Header title="Border" />
                <Option opt={options.theme.bar.menus.menu.power.border.color} title="Border" type="color" />

                {/* Shutdown Button Section */}
                <Header title="Shutdown Button" />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.shutdown.background}
                    title="Label Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.shutdown.icon_background}
                    title="Icon Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.shutdown.text}
                    title="Label Text"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.shutdown.icon}
                    title="Icon"
                    type="color"
                />

                {/* Reboot Button Section */}
                <Header title="Reboot Button" />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.restart.background}
                    title="Label Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.restart.icon_background}
                    title="Icon Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.restart.text}
                    title="Label Text"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.restart.icon}
                    title="Icon"
                    type="color"
                />

                {/* Logout Button Section */}
                <Header title="Logout Button" />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.logout.background}
                    title="Label Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.logout.icon_background}
                    title="Icon Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.logout.text}
                    title="Label Text"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.logout.icon}
                    title="Icon"
                    type="color"
                />

                {/* Sleep Button Section */}
                <Header title="Sleep Button" />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.sleep.background}
                    title="Label Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.sleep.icon_background}
                    title="Icon Background"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.sleep.text}
                    title="Label Text"
                    type="color"
                />
                <Option
                    opt={options.theme.bar.menus.menu.power.buttons.sleep.icon}
                    title="Icon"
                    type="color"
                />
            </box>
        </Scrollable>
    );
};
