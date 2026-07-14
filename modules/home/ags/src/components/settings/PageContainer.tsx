import { bind, Variable } from 'astal';
import { Gtk } from 'astal/gtk4';
import { StackTransitionMap } from './constants';
import options from '../../configuration';
import { isPrimaryClick } from '../../lib/events/mouse';
import { onPrimaryClick } from '../../lib/shared/eventHandlers';
import { ThemesMenu } from './pages/theme';
import { SettingsPage, settingsPages } from './helpers';
import { SettingsMenu } from './pages/config';

const { transition, transitionTime } = options.menus;

const CurrentPage = Variable<SettingsPage>('Configuration');
const LastPage = Variable<SettingsPage>('Configuration');

export const PageContainer = (): JSX.Element => {
    return (
        <box className={'settings-page-container'} halign={Gtk.Align.FILL} vertical>
            <box className={'settings-page-container2'} halign={Gtk.Align.FILL} hexpand>
                <box className="option-pages-container" halign={Gtk.Align.CENTER} hexpand>
                    {settingsPages.map((page) => {
                        return (
                            <button
                                className={bind(CurrentPage).as(
                                    (v) => `pager-button ${v === page ? 'active' : ''} category`,
                                )}
                                label={page}
                                setup={(self) => {
                                    onPrimaryClick(self, (_, event) => {
                                        if (isPrimaryClick(event)) {
                                            LastPage.set(CurrentPage.get());
                                            CurrentPage.set(page as SettingsPage);
                                        }
                                    });
                                }}
                                halign={Gtk.Align.CENTER}
                            />
                        );
                    })}
                </box>
            </box>
            <stack
                className="themes-menu-stack"
                transitionType={bind(transition).as((transitionType) => StackTransitionMap[transitionType])}
                transitionDuration={bind(transitionTime)}
                shown={bind(CurrentPage)}
                vexpand={false}
                hexpand
            >
                <SettingsMenu />
                <ThemesMenu />
            </stack>
        </box>
    );
};
